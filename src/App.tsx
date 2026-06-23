import { useEffect, useMemo, useState } from 'react'
import {
  POLLING_API_DOCS_URL,
  POLLING_LOCKED_INSTITUTE,
  getDefaultPollingBars,
} from './polling'
import {
  AlsoSupportSection,
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
  FaqSection,
} from './components'
import {
  getTranslation,
  getSayings,
  getOpenLetters,
  getFaqs,
  getFacts,
  getScienceContent,
  getLocaleCode,
  detectLocale,
  persistLocale,
  detectTheme,
  persistTheme,
  applyTheme,
  type ContentTab,
  type LetterTarget,
  type Locale,
  type Theme,
} from './i18n'
import { useSignatureCount } from './hooks/useSignatureCount'
import { usePollingSnapshot } from './hooks/usePollingSnapshot'
import { formatDisplayDate, formatDisplayDateTime } from './utils/format'

const HERO_IMAGE_URL = `${import.meta.env.BASE_URL}hero-rescue-blue.png`

export default function App() {
  const [lang, setLang] = useState<Locale>(detectLocale)
  const [theme, setTheme] = useState<Theme>(detectTheme)
  const [isBrownActive, setIsBrownActive] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentTab>('sprache')
  const [activeLetterTarget, setActiveLetterTarget] = useState<LetterTarget>('oeffentlich')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openObjection, setOpenObjection] = useState<number | null>(null)

  const { signatureCount, isLive, isLoading: isLoadingSignatures } = useSignatureCount()
  const { pollingSnapshot, isLive: isLivePollingData } = usePollingSnapshot()

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleChangeLanguage = (newLang: Locale) => {
    setLang(newLang)
    persistLocale(newLang)
  }

  const handleToggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      persistTheme(next)
      return next
    })
  }

  const t = getTranslation(lang)
  const science = getScienceContent(lang)
  const sayings = getSayings(lang)
  const letters = getOpenLetters(lang)
  const faqs = getFaqs(lang)
  const facts = getFacts(lang)
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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased" style={{ WebkitFontSmoothing: 'antialiased' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 h-112.5 w-full max-w-7xl -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px] animate-pulse-glow" />

      <SiteHeader
        lang={lang}
        t={t}
        theme={theme}
        onChangeLanguage={handleChangeLanguage}
        onToggleTheme={handleToggleTheme}
      />
      <div className="h-14 md:h-16" aria-hidden="true" />
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
            instituteName={pollingSnapshot?.instituteName ?? POLLING_LOCKED_INSTITUTE}
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

          <FaqSection
            t={t}
            faqs={faqs}
            openFaq={openFaq}
            onToggleFaq={setOpenFaq}
          />
        </div>

        <SidebarPanels
          t={t}
          ctaBody={ctaBody}
          formattedSignatureCount={formattedSignatureCount}
          isLoadingSignatures={isLoadingSignatures}
          facts={facts}
        />
      </main>

      <AlsoSupportSection lang={lang} t={t} />
      <BottomCta t={t} ctaBody={ctaBody} />
      <SiteFooter t={t} />
    </div>
  )
}
