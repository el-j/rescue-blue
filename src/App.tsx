import { useMemo } from 'react'
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
  NewsArchiveSection,
  PolicyDangersSection,
} from './components'
import {
  getTranslation,
  getSayings,
  getOpenLetters,
  getFaqs,
  getFacts,
  getScienceContent,
  getLocaleCode,
  type Locale,
} from './i18n'
import { useAppState } from './hooks/useAppState'
import { formatDisplayDate, formatDisplayDateTime } from './utils/format'

// Base path (no extension) — HeroSection builds responsive srcset variants from this
const HERO_IMAGE_BASE = `${import.meta.env.BASE_URL}hero-image-rescue-blue-no-text`

interface AppProps {
  initialLang?: Locale
}

export default function App({ initialLang }: AppProps = {}) {
  const {
    lang,
    theme,
    sandboxState,
    setSandboxState,
    activeTab,
    setActiveTab,
    activeLetterTarget,
    setActiveLetterTarget,
    openFaq,
    setOpenFaq,
    openObjection,
    setOpenObjection,
    selectedStateId,
    setSelectedStateId,
    signatureCount,
    isLive,
    isLoadingSignatures,
    pollingSnapshot,
    isLivePollingData,
    handleChangeLanguage,
    handleToggleTheme,
    news,
  } = useAppState({ initialLang })

  const t = getTranslation(lang)
  const science = getScienceContent(lang)
  const sayings = getSayings(lang)
  const letters = getOpenLetters(lang)
  const faqs = getFaqs(lang)
  const facts = getFacts(lang)
  const activeSnapshot = pollingSnapshot?.[selectedStateId] ?? pollingSnapshot?.['0'] ?? null
  const pollingBars = activeSnapshot?.bars ?? getDefaultPollingBars()
  const formattedSignatureCount = signatureCount?.toLocaleString(getLocaleCode(lang))
  const ctaBody = formattedSignatureCount
    ? `${t.ctaBodyPre} ${formattedSignatureCount} ${t.ctaBodyMid}`
    : t.ctaBodyLoading

  const pollSourceInfo = useMemo(() => {
    if (!activeSnapshot) {
      return `${t.demoSourceApi} · ${t.demoSourceInstitute}: ${POLLING_LOCKED_INSTITUTE}`
    }

    const stateName = lang === 'de' ? activeSnapshot.nameDe : activeSnapshot.nameEn
    const sourcePrefix = stateName ? `${t.demoSourceApi} (${stateName})` : t.demoSourceApi

    const segments = [
      sourcePrefix,
      `${t.demoSourceInstitute}: ${activeSnapshot.instituteName}`,
      `${t.demoSourceDate}: ${formatDisplayDate(activeSnapshot.surveyDate, lang)}`,
    ]

    if (activeSnapshot.surveyPeriod?.start && activeSnapshot.surveyPeriod?.end) {
      segments.push(
        `${t.demoSourceFieldwork}: ${formatDisplayDate(activeSnapshot.surveyPeriod.start, lang)} - ${formatDisplayDate(activeSnapshot.surveyPeriod.end, lang)}`,
      )
    }

    if (activeSnapshot.surveyedPersons) {
      segments.push(`${t.demoSourceSample}: n=${Math.round(activeSnapshot.surveyedPersons)}`)
    }

    if (activeSnapshot.methodName) {
      segments.push(`${t.demoSourceMethod}: ${activeSnapshot.methodName}`)
    }

    return segments.join(' · ')
  }, [lang, activeSnapshot, t.demoSourceApi, t.demoSourceDate, t.demoSourceFieldwork, t.demoSourceInstitute, t.demoSourceMethod, t.demoSourceSample])

  const pollingStandInfo = activeSnapshot?.apiUpdatedAt
    ? formatDisplayDateTime(activeSnapshot.apiUpdatedAt, lang)
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
      <HeroSection
        lang={lang}
        t={t}
        heroImageBase={HERO_IMAGE_BASE}
        formattedSignatureCount={formattedSignatureCount}
        isLoadingSignatures={isLoadingSignatures}
        isLive={isLive}
        news={news}
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
            sourceUrl={activeSnapshot?.sourceUrl ?? 'https://dawum.de/Bundestag/'}
            sourceMethodUrl={POLLING_API_DOCS_URL}
            sandboxState={sandboxState}
            onCycleSandboxState={() => {
              setSandboxState((current) => {
                if (current === 'default') return 'brown'
                if (current === 'brown') return 'dream'
                return 'default'
              })
            }}
            onSetSandboxState={setSandboxState}
            instituteName={activeSnapshot?.instituteName ?? POLLING_LOCKED_INSTITUTE}
            selectedStateId={selectedStateId}
            onSelectStateId={setSelectedStateId}
            pollingSnapshot={pollingSnapshot}
          />

          <WhySection t={t} />
          <PolicyDangersSection lang={lang} t={t} />
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

          <NewsArchiveSection
            lang={lang}
            news={news.slice(4)}
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
