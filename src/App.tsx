import { useEffect, useMemo, useState } from 'react'
import { PETITION_SOURCES, parseSignatureCount } from './petition'
import {
  POLLING_API_DOCS_URL,
  POLLING_LOCKED_INSTITUTE,
  POLLING_REFRESH_MS,
  POLLING_SOURCES,
  getDefaultPollingBars,
  parsePollingSnapshot,
  type PollingSnapshot,
} from './polling'
import {
  BottomCta,
  CultureSection,
  HeroSection,
  InteractiveDemoSection,
  OpenLetterSection,
  ScientificBackgroundSection,
  SidebarPanels,
  SiteFooter,
  SiteHeader,
  WhySection,
} from './components'
import {
  FAQS,
  FACTS,
  SCIENCE_CONTENT,
  blueSayings,
  getLocaleCode,
  openLetters,
  translations,
  type ContentTab,
  type LetterTarget,
  type Locale,
} from './i18n'

const HERO_IMAGE_URL = `${import.meta.env.BASE_URL}Gemini_Generated_Image_vc7befvc7befvc7b.png`

function formatDisplayDate(value: string, lang: Locale): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString(getLocaleCode(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function formatDisplayDateTime(value: string, lang: Locale): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleString(getLocaleCode(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function App() {
  const [lang, setLang] = useState<Locale>('de')
  const [signatureCount, setSignatureCount] = useState<number | null>(null)
  const [isLive, setIsLive] = useState(false)
  const [isLoadingSignatures, setIsLoadingSignatures] = useState(true)
  const [isBrownActive, setIsBrownActive] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentTab>('sprache')
  const [activeLetterTarget, setActiveLetterTarget] = useState<LetterTarget>('oeffentlich')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openObjection, setOpenObjection] = useState<number | null>(null)
  const [pollingSnapshot, setPollingSnapshot] = useState<PollingSnapshot | null>(null)
  const [isLivePollingData, setIsLivePollingData] = useState(false)

  const t = translations[lang]
  const science = SCIENCE_CONTENT[lang]
  const sayings = blueSayings[lang]
  const letters = openLetters[lang]
  const faqs = FAQS[lang]
  const facts = FACTS[lang]
  const pollingBars = pollingSnapshot?.bars ?? getDefaultPollingBars()
  const formattedSignatureCount = signatureCount?.toLocaleString(getLocaleCode(lang))
  const ctaBody = formattedSignatureCount
    ? `${t.ctaBodyPre} ${formattedSignatureCount} ${t.ctaBodyMid}`
    : t.ctaBodyLoading
  const pollSourceInfo = useMemo(() => {
    if (!pollingSnapshot) {
      return `${t.demoSourceApi} · ${t.demoSourceInstitute}: ${POLLING_LOCKED_INSTITUTE}`
    }

    const segments = [
      t.demoSourceApi,
      `${t.demoSourceInstitute}: ${pollingSnapshot.instituteName}`,
      `${t.demoSourceDate}: ${formatDisplayDate(pollingSnapshot.surveyDate, lang)}`,
    ]

    if (pollingSnapshot.surveyPeriod?.start && pollingSnapshot.surveyPeriod?.end) {
      segments.push(
        `${t.demoSourceFieldwork}: ${formatDisplayDate(pollingSnapshot.surveyPeriod.start, lang)} - ${formatDisplayDate(pollingSnapshot.surveyPeriod.end, lang)}`,
      )
    }

    if (pollingSnapshot.surveyedPersons) {
      segments.push(`${t.demoSourceSample}: n=${Math.round(pollingSnapshot.surveyedPersons)}`)
    }

    if (pollingSnapshot.methodName) {
      segments.push(`${t.demoSourceMethod}: ${pollingSnapshot.methodName}`)
    }

    return segments.join(' · ')
  }, [lang, pollingSnapshot, t.demoSourceApi, t.demoSourceDate, t.demoSourceFieldwork, t.demoSourceInstitute, t.demoSourceMethod, t.demoSourceSample])
  const pollingStandInfo = pollingSnapshot?.apiUpdatedAt
    ? formatDisplayDateTime(pollingSnapshot.apiUpdatedAt, lang)
    : t.demoSourceFallback

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchSignatureCount() {
      setIsLoadingSignatures(true)

      async function tryFetch(source: typeof PETITION_SOURCES[number]): Promise<number | null> {
        try {
          const response = await fetch(source.url, {
            signal: controller.signal,
            cache: 'no-store',
          })
          if (!response.ok) return null
          const data = source.responseType === 'json'
            ? (await response.json()) as unknown
            : await response.text()
          return parseSignatureCount(data)
        } catch {
          return null
        }
      }

      try {
        const results = await Promise.allSettled([
          ...PETITION_SOURCES.map(tryFetch),
        ])

        if (isCancelled) return

        const counts = results
          .map((r) => (r.status === 'fulfilled' ? r.value : null))
          .filter((c): c is number => typeof c === 'number')

        if (counts.length > 0) {
          setSignatureCount(Math.max(...counts))
          setIsLive(true)
        } else {
          setIsLive(false)
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSignatures(false)
        }
      }
    }

    void fetchSignatureCount()
    const interval = window.setInterval(() => {
      void fetchSignatureCount()
    }, 120000)

    return () => {
      isCancelled = true
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchPollingSnapshot() {
      async function tryFetch(source: typeof POLLING_SOURCES[number]): Promise<PollingSnapshot | null> {
        try {
          const response = await fetch(source.url, {
            signal: controller.signal,
            cache: 'no-store',
          })
          if (!response.ok) return null

          const payload = source.responseType === 'json'
            ? (await response.json()) as unknown
            : await response.text()

          return parsePollingSnapshot(payload)
        } catch {
          return null
        }
      }

      const snapshots = await Promise.allSettled([
        ...POLLING_SOURCES.map(tryFetch),
      ])

      if (isCancelled) return

      const validSnapshot = snapshots
        .map((result) => (result.status === 'fulfilled' ? result.value : null))
        .find((snapshot): snapshot is PollingSnapshot => snapshot !== null)

      if (validSnapshot) {
        setPollingSnapshot(validSnapshot)
        setIsLivePollingData(true)
      } else {
        setIsLivePollingData(false)
      }
    }

    void fetchPollingSnapshot()
    const interval = window.setInterval(() => {
      void fetchPollingSnapshot()
    }, POLLING_REFRESH_MS)

    return () => {
      isCancelled = true
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-900 text-neutral-100 antialiased" style={{ WebkitFontSmoothing: 'antialiased' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 h-112.5 w-full max-w-7xl -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px] animate-pulse-glow" />

      <SiteHeader lang={lang} t={t} onToggleLanguage={() => setLang((current) => (current === 'de' ? 'en' : 'de'))} />
      <HeroSection
        lang={lang}
        t={t}
        heroImageUrl={HERO_IMAGE_URL}
        formattedSignatureCount={formattedSignatureCount}
        isLoadingSignatures={isLoadingSignatures}
        isLive={isLive}
      />

      <main className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:px-6 lg:mt-8 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <InteractiveDemoSection
            lang={lang}
            t={t}
            bars={pollingBars}
            sourceInfo={pollSourceInfo}
            isLivePollData={isLivePollingData}
            standInfo={pollingStandInfo}
            sourceUrl={pollingSnapshot?.sourceUrl ?? 'https://dawum.de/Bundestag/'}
            sourceMethodUrl={POLLING_API_DOCS_URL}
            isBrownActive={isBrownActive}
            onToggleBrown={() => setIsBrownActive((current) => !current)}
          />

          <WhySection t={t} />
          <ScientificBackgroundSection
            science={science}
            openObjection={openObjection}
            onToggleObjection={setOpenObjection}
          />

          <CultureSection
            t={t}
            sayings={sayings}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />

          <OpenLetterSection
            t={t}
            letters={letters}
            activeLetterTarget={activeLetterTarget}
            onChangeTarget={setActiveLetterTarget}
          />
        </div>

        <SidebarPanels
          lang={lang}
          t={t}
          ctaBody={ctaBody}
          formattedSignatureCount={formattedSignatureCount}
          isLoadingSignatures={isLoadingSignatures}
          facts={facts}
          faqs={faqs}
          openFaq={openFaq}
          onToggleFaq={setOpenFaq}
        />
      </main>

      <BottomCta t={t} ctaBody={ctaBody} />
      <SiteFooter t={t} />
    </div>
  )
}
