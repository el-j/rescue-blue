import { useEffect, useState } from 'react'
import { PETITION_SOURCES, parseSignatureCount } from './petition'
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

  const t = translations[lang]
  const science = SCIENCE_CONTENT[lang]
  const sayings = blueSayings[lang]
  const letters = openLetters[lang]
  const faqs = FAQS[lang]
  const facts = FACTS[lang]
  const formattedSignatureCount = signatureCount?.toLocaleString(getLocaleCode(lang))
  const ctaBody = formattedSignatureCount
    ? `${t.ctaBodyPre} ${formattedSignatureCount} ${t.ctaBodyMid}`
    : t.ctaBodyLoading

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
