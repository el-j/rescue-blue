import { useEffect, useMemo, useRef } from 'react'
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
  NewsSpotlightSection,
  OpenLetterSection,
  RhetoricalDictionarySection,
  ScientificBackgroundSection,
  SidebarPanels,
  SiteFooter,
  SiteHeader,
  TrustSection,
  EditorialPolicySection,
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
  getWordsMeaning,
  type Locale,
} from './i18n'
import { useAppState } from './hooks/useAppState'
import { useAbVariant } from './hooks/useAbVariant'
import { formatDisplayDate, formatDisplayDateTime } from './utils/format'
import { trackConversionEvent } from './utils/analytics'

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
  const abVariant = useAbVariant()
  const seenFunnelSteps = useRef(new Set<string>())
  const science = getScienceContent(lang)
  const sayings = getSayings(lang)
  const letters = getOpenLetters(lang)
  const faqs = getFaqs(lang)
  const facts = getFacts(lang)
  const wordsMeaning = getWordsMeaning(lang)
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

  const heroHeadline = abVariant === 'B' ? t.heroH1Alt : t.heroH1
  const heroSubline = abVariant === 'B' ? t.heroSubAlt : t.heroSub
  const heroCtaLabel = abVariant === 'B' ? t.heroImgText2Alt : t.heroImgText2
  const ctaButtonLabel = abVariant === 'B' ? t.ctaBtnAlt : t.ctaBtn

  useEffect(() => {
    trackConversionEvent('page_view', {
      lang,
      variant: abVariant,
      path: typeof window !== 'undefined' ? window.location.pathname : '/',
    })
    trackConversionEvent('ab_impression', {
      experiment: 'hero-cta-copy-v1',
      variant: abVariant,
    })
  }, [lang, abVariant])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }
    if (typeof window.IntersectionObserver === 'undefined') {
      return
    }

    const tracked: Array<[string, string]> = [
      ['header.hero-fullscreen', 'hero_visible'],
      ['#transparenz', 'trust_visible'],
      ['#editorial-policy', 'editorial_policy_visible'],
      ['#warum', 'why_visible'],
      ['#risiken', 'risks_visible'],
      ['#hintergrund', 'science_visible'],
      ['#brief', 'open_letter_visible'],
      ['#faq', 'faq_visible'],
      ['#kultur', 'culture_visible'],
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const step = entry.target.getAttribute('data-funnel-step')
          if (!step || seenFunnelSteps.current.has(step)) continue
          seenFunnelSteps.current.add(step)
          trackConversionEvent('funnel_step', { step, variant: abVariant, lang })
        }
      },
      { threshold: 0.35 },
    )

    for (const [selector, step] of tracked) {
      const element = document.querySelector(selector)
      if (element) {
        element.setAttribute('data-funnel-step', step)
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [abVariant, lang])

  const handleTrackedLanguageChange = (newLang: Locale) => {
    trackConversionEvent('language_change', {
      from: lang,
      to: newLang,
      variant: abVariant,
    })
    handleChangeLanguage(newLang)
  }

  const handleTrackedCtaClick = (surface: string) => {
    trackConversionEvent('cta_click', {
      surface,
      variant: abVariant,
      lang,
    })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased" style={{ WebkitFontSmoothing: 'antialiased' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 h-112.5 w-full max-w-7xl -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px] animate-pulse-glow" />

      <SiteHeader
        lang={lang}
        t={t}
        ctaLabel={ctaButtonLabel}
        theme={theme}
        onChangeLanguage={handleTrackedLanguageChange}
        onToggleTheme={handleToggleTheme}
        onSignCtaClick={() => handleTrackedCtaClick('header_nav')}
      />
      <HeroSection
        t={t}
        headline={heroHeadline}
        subline={heroSubline}
        ctaLabel={heroCtaLabel}
        heroImageBase={HERO_IMAGE_BASE}
        formattedSignatureCount={formattedSignatureCount}
        isLoadingSignatures={isLoadingSignatures}
        isLive={isLive}
        onCtaClick={() => handleTrackedCtaClick('hero')}
      />

      <TrustSection t={t} />
      <EditorialPolicySection t={t} />
      <NewsSpotlightSection lang={lang} t={t} news={news} />

      <main className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:px-6 lg:mt-8 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <WhySection t={t} />

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
            selectedStateId={selectedStateId}
            onSelectStateId={setSelectedStateId}
            pollingSnapshot={pollingSnapshot}
          />

          <PolicyDangersSection lang={lang} t={t} />
          <ScientificBackgroundSection
            science={science}
            openObjection={openObjection}
            onToggleObjection={setOpenObjection}
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

          <RhetoricalDictionarySection t={t} entries={wordsMeaning} />

          <CultureSection
            t={t}
            sayings={sayings}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />

          <NewsArchiveSection
            lang={lang}
            news={news.slice(4)}
          />
        </div>

        <SidebarPanels
          t={t}
          ctaLabel={ctaButtonLabel}
          ctaBody={ctaBody}
          formattedSignatureCount={formattedSignatureCount}
          isLoadingSignatures={isLoadingSignatures}
          facts={facts}
          onCtaClick={() => handleTrackedCtaClick('sidebar')}
        />
      </main>

      <AlsoSupportSection lang={lang} t={t} />
      <BottomCta t={t} ctaBody={ctaBody} ctaLabel={ctaButtonLabel} onCtaClick={() => handleTrackedCtaClick('bottom')} />
      <SiteFooter t={t} />
    </div>
  )
}
