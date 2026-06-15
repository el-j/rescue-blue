import { useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  MessageSquare,
  Paintbrush,
  Shield,
  Users,
} from 'lucide-react'
import { PETITION_URL } from './petition'
import type { PollBar } from './polling'
import { type ContentTab, type Facts, type Faqs, type LetterTarget, type Letters, type Locale, type ScienceContent, type Sayings, type Translation } from './i18n'

const IMPRINT_URL = `${import.meta.env.BASE_URL}imprint.html`

interface HeaderProps {
  lang: Locale
  t: Translation
  onToggleLanguage: () => void
}

interface HeroProps {
  lang: Locale
  t: Translation
  heroImageUrl: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  isLive: boolean
}

interface DemoProps {
  lang: Locale
  t: Translation
  bars: PollBar[]
  sourceInfo: string
  isLivePollData: boolean
  standInfo: string
  sourceUrl: string
  sourceMethodUrl: string
  isBrownActive: boolean
  onToggleBrown: () => void
}

interface ScienceProps {
  science: ScienceContent
  openObjection: number | null
  onToggleObjection: (index: number) => void
}

interface CultureProps {
  t: Translation
  sayings: Sayings
  activeTab: ContentTab
  onChangeTab: (tab: ContentTab) => void
}

interface LetterProps {
  t: Translation
  letters: Letters
  activeLetterTarget: LetterTarget
  onChangeTarget: (target: LetterTarget) => void
}

interface SidebarProps {
  lang: Locale
  t: Translation
  ctaBody: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  facts: Facts
  faqs: Faqs
  openFaq: number | null
  onToggleFaq: (index: number) => void
}

interface BottomCtaProps {
  t: Translation
  ctaBody: string
}

interface FooterProps {
  t: Translation
}

export function SiteHeader({ lang, t, onToggleLanguage }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 animate-pulse" />
          <span className="text-sm font-bold tracking-wider text-white uppercase">{t.navCampaign}</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
          <a href="#warum" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navWhy}</a>
          <a href="#hintergrund" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navScience}</a>
          <a href="#brief" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navLetter}</a>
          <a href="#kultur" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navCulture}</a>
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-all hover:bg-neutral-700"
            aria-label="Toggle language"
            type="button"
          >
            <Globe size={13} />
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-500 md:px-3.5"
          >
            <span className="hidden md:inline">{t.navSign}</span>
            <span className="md:hidden">✍️</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </nav>
  )
}

export function HeroSection({ lang, t, heroImageUrl, formattedSignatureCount, isLoadingSignatures, isLive }: HeroProps) {
  return (
    <header className="relative px-4 pt-12 pb-10 text-center md:px-6 md:pt-16 md:pb-12">
      <div className="mx-auto max-w-5xl">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 uppercase">
          <Shield size={12} /> {t.badge}
        </span>
        <h1 className="mb-3 text-4xl leading-none font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
          {t.heroH1}
        </h1>
        <p className="mb-5 text-lg font-extrabold tracking-[0.18em] text-blue-500 uppercase sm:text-2xl lg:text-3xl">{t.heroSub}</p>
        <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-neutral-300 sm:text-lg md:mb-10 md:text-xl">{t.heroBody}</p>

        <div className="mb-8 flex justify-center px-2 md:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-semibold shadow-inner md:rounded-full md:px-5 md:text-sm">
            <Users size={18} className="text-blue-400 animate-pulse" />
            <span className="text-center text-neutral-300">
              {t.sigCount}{' '}
              <strong className="text-base font-black text-white md:text-lg">
                {isLoadingSignatures
                  ? <span className="inline-block h-5 w-12 rounded bg-neutral-800 align-middle animate-pulse" />
                  : (formattedSignatureCount ?? '—')}
              </strong>{' '}
              {t.sigSupport}
            </span>
            <span className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
              <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
              {isLive ? t.sigLive : t.sigFallback}
            </span>
          </div>
        </div>

        <div className="relative mx-auto mb-4 max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl animate-float">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-40">
            {[
              { left: '15%', delay: '0.2s', dur: '1.8s' },
              { left: '30%', delay: '0.8s', dur: '2.2s' },
              { left: '45%', delay: '0.4s', dur: '1.5s' },
              { left: '60%', delay: '1.1s', dur: '2.5s' },
              { left: '75%', delay: '0.1s', dur: '1.9s' },
              { left: '90%', delay: '0.6s', dur: '2.1s' },
            ].map((drop, index) => (
              <div key={index} className="rain-drop" style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.dur }} />
            ))}
          </div>
          <img
            src={heroImageUrl}
            alt={lang === 'de'
              ? 'Kampagnenmotiv der Aktion Rettet das Blau mit Herzsymbol und blauem Farbraum'
              : 'Campaign visual for Rescue the Blue with a heart symbol and blue colour field'}
            className="block w-full select-none object-cover object-center aspect-11/10 md:aspect-video"
          />
          <div className="relative z-20 p-4 md:p-0">
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-800/80 bg-neutral-950/85 p-4 backdrop-blur-md md:absolute md:bottom-6 md:right-6 md:left-6 md:flex-row md:items-center">
              <div className="text-left">
                <p className="text-sm font-black tracking-wide text-white uppercase">{t.heroImgCaption}</p>
                <p className="text-xs text-neutral-400">{t.heroImgSub}</p>
              </div>
              <a
                href={PETITION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
              >
                {t.heroImgCta} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function InteractiveDemoSection({ lang, t, bars, sourceInfo, isLivePollData, standInfo, sourceUrl, sourceMethodUrl, isBrownActive, onToggleBrown }: DemoProps) {
  const maxPct = Math.max(...bars.map((bar) => bar.pct), 1)
  const [isInstituteInfoOpen, setIsInstituteInfoOpen] = useState(false)

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl md:p-8">
      <div className="absolute top-0 right-0 p-4">
        <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">{t.demoSandbox}</span>
      </div>
      <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
        <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
      </h2>
      <p className="text-sm leading-relaxed text-neutral-400">{t.demoDesc}</p>
      <div className="mb-6 mt-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-200">{t.demoSourceLabel}:</span>
          <button
            onClick={() => setIsInstituteInfoOpen((current) => !current)}
            aria-expanded={isInstituteInfoOpen}
            aria-controls="institute-help-popover"
            className="inline-flex min-h-8 items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold uppercase text-neutral-300 transition-colors hover:border-blue-500/40 hover:text-blue-300"
            type="button"
          >
            <CircleHelp size={11} /> {t.demoSourceWhyInstituteLabel}
          </button>
          <span>{sourceInfo}</span>
          <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-300">
            {isLivePollData ? t.demoSourceLive : t.demoSourceFallback}
          </span>
        </div>
        {isInstituteInfoOpen && (
          <div
            id="institute-help-popover"
            className="mt-2 rounded-lg border border-blue-500/20 bg-blue-950/20 px-3 py-2 text-xs leading-relaxed text-neutral-300"
          >
            {t.demoSourceWhyInstituteTooltip}
          </div>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-200">{t.demoSourceStand}:</span>
          <span>{standInfo}</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold tracking-wide text-neutral-300 uppercase transition-colors hover:border-blue-500/40 hover:text-blue-300"
          >
            {t.demoSourceButton} <ExternalLink size={12} />
          </a>
          <a
            href={sourceMethodUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold tracking-wide text-neutral-300 uppercase transition-colors hover:border-blue-500/40 hover:text-blue-300"
          >
            API <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8">
        <div className="relative flex h-56 items-end justify-between border-b border-neutral-800 pb-2 md:h-64">
          {bars.map((bar, index) => {
            const heightPx = Math.round((bar.pct / maxPct) * 200)
            const barColor = bar.isAfd
              ? (isBrownActive
                  ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40'
                  : bar.defaultColor)
              : bar.defaultColor
            const label = lang === 'de' ? bar.labelDe : bar.labelEn
            const pctLabel = Number.isInteger(bar.pct) ? String(bar.pct) : bar.pct.toFixed(1)

            return (
              <div key={index} className="flex w-1/6 flex-col items-center">
                <span className={`mb-2 text-xs font-bold ${bar.isAfd ? 'font-black text-white' : 'text-neutral-400'}`}>{pctLabel} %</span>
                <button
                  onClick={bar.isAfd ? () => onToggleBrown() : undefined}
                  className={`w-full rounded-t-md transition-all duration-700 ${barColor} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''}`}
                  style={{ height: `${heightPx}px` }}
                  aria-label={bar.isAfd ? (isBrownActive ? t.demoReset : t.demoSwitch) : label}
                  disabled={!bar.isAfd}
                  type="button"
                />
                <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs ${bar.isAfd ? (isBrownActive ? 'font-black text-amber-500' : 'font-black text-cyan-400') : 'text-neutral-500'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase">{t.demoOption}</span>
          <span className="text-sm font-bold text-neutral-200">{t.demoQuestion}</span>
        </div>
        <button
          onClick={onToggleBrown}
          className={`w-full rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all sm:w-auto ${isBrownActive ? 'border border-amber-800/50 bg-amber-900 text-amber-200 hover:bg-amber-800' : 'border border-blue-500/30 bg-blue-600 text-blue-100 hover:bg-blue-500'}`}
          type="button"
        >
          {isBrownActive ? t.demoReset : t.demoSwitch}
        </button>
      </div>
    </section>
  )
}

export function WhySection({ t }: { t: Translation }) {
  return (
    <section id="warum" className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight text-white uppercase">{t.whyH2}</h2>
      <p className="text-base leading-relaxed text-neutral-400">{t.whyIntro}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-red-500/30">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard1H}</h3>
          <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard1}</p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-blue-500/30">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <CheckCircle size={20} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard2H}</h3>
          <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard2}</p>
        </div>
      </div>
    </section>
  )
}

export function ScientificBackgroundSection({ science, openObjection, onToggleObjection }: ScienceProps) {
  return (
    <section id="hintergrund" className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white uppercase">{science.sectionH}</h2>
        <p className="mt-1 text-sm text-neutral-500">{science.sectionSub}</p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
        <h3 className="mb-5 flex items-center gap-2 text-base font-black tracking-tight text-blue-400 uppercase md:text-lg">
          <BookOpen size={18} /> {science.part1H}
        </h3>
        <div className="space-y-5">
          {science.foundations.map((foundation, fi) => (
            <div key={fi} className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
              <h4 className="mb-4 text-sm font-bold text-white md:text-base">{foundation.title}</h4>
              <div className="space-y-3">
                {foundation.points.map((point, pi) => (
                  <div key={pi} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <div>
                      <span className="text-xs font-bold text-blue-300">{point.label}: </span>
                      <span className="text-xs leading-relaxed text-neutral-400">{point.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
        <h3 className="mb-5 flex items-center gap-2 text-base font-black tracking-tight text-amber-400 uppercase md:text-lg">
          <Shield size={18} /> {science.part2H}
        </h3>
        <div className="space-y-3">
          {science.objections.map((obj, oi) => (
            <div key={oi} className="overflow-hidden rounded-xl border border-neutral-800">
              <button
                onClick={() => onToggleObjection(oi)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-neutral-300 transition-all hover:bg-neutral-900 hover:text-white"
                aria-expanded={openObjection === oi}
                type="button"
              >
                <span>{obj.title}</span>
                {openObjection === oi ? <ChevronUp size={14} className="shrink-0 text-amber-400" /> : <ChevronDown size={14} className="shrink-0 text-neutral-500" />}
              </button>
              {openObjection === oi && (
                <div className="space-y-3 border-t border-neutral-800 px-4 pt-3 pb-4">
                  {obj.rebuttals.map((rebuttal, ri) => (
                    <div key={ri} className="flex gap-3">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-amber-300">{rebuttal.label}: </span>
                        <span className="text-xs leading-relaxed text-neutral-400">{rebuttal.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CultureSection({ t, sayings, activeTab, onChangeTab }: CultureProps) {
  return (
    <section id="kultur" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-white uppercase md:text-xl">
            <BookOpen size={20} className="text-blue-500" /> {t.cultureH}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">{t.cultureSub}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onChangeTab('sprache')}
            className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'sprache' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >{t.tabLang}</button>
          <button
            onClick={() => onChangeTab('symbolik')}
            className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'symbolik' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >{t.tabSym}</button>
        </div>
      </div>
      <div className="space-y-4">
        {sayings[activeTab].map((item, index) => (
          <div key={index} className="rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 transition-all hover:border-blue-500/30">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
              <h4 className="text-base font-bold text-white md:text-lg">{item.phrase}</h4>
              <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] tracking-wider text-neutral-400 uppercase">{item.origin}</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function OpenLetterSection({ t, letters, activeLetterTarget, onChangeTarget }: LetterProps) {
  return (
    <section id="brief" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
          <MessageSquare size={22} className="text-blue-500" /> {t.letterH}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">{t.letterSub}</p>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-2">
        {(['oeffentlich', 'privat', 'rundfunkrat'] as const).map((key) => (
          <button
            key={key}
            onClick={() => onChangeTarget(key)}
            className={`rounded-lg border px-2 py-3 text-center text-[10px] font-bold tracking-wider uppercase transition-all md:text-xs ${activeLetterTarget === key ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >
            {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
          </button>
        ))}
      </div>
      <div className="max-h-72 space-y-4 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs leading-relaxed text-neutral-300 md:p-6 md:text-sm">
        <p className="font-bold text-neutral-400">{letters[activeLetterTarget].to}</p>
        <p className="border-t border-neutral-800 pt-3">{letters[activeLetterTarget].subject}</p>
        {letters[activeLetterTarget].body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

export function SidebarPanels({ lang, t, ctaBody, formattedSignatureCount, isLoadingSignatures, facts, faqs, openFaq, onToggleFaq }: SidebarProps) {
  return (
    <aside className="space-y-6 lg:col-span-4">
      <div className="sticky top-20 rounded-2xl border border-blue-800/40 bg-linear-to-br from-blue-900/40 to-blue-950/60 p-6 shadow-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20">
          <span className="text-2xl">✍️</span>
        </div>
        <h3 className="mb-2 text-lg font-black tracking-tight text-white uppercase">{t.ctaBanner}</h3>
        <p className="mb-5 text-sm leading-relaxed text-neutral-400">{ctaBody}</p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
        >
          {t.ctaBtn} <ExternalLink size={15} />
        </a>
        <p className="text-center text-xs text-neutral-600">{t.ctaInfo}</p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-300">
            {lang === 'de' ? 'Unterschriften' : 'Signatures'}
          </span>
          <Users size={16} className="text-blue-400" aria-hidden="true" />
        </div>
        <p className="text-3xl font-black text-white" aria-live="polite">
          {isLoadingSignatures
            ? <span className="inline-block h-8 w-24 rounded bg-neutral-800 animate-pulse" />
            : (formattedSignatureCount ?? '—')}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {lang === 'de' ? 'und es werden täglich mehr!' : 'and growing every day!'}
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <h4 className="text-sm font-black tracking-wider text-white uppercase">
          {lang === 'de' ? 'Schnell-Fakten' : 'Quick Facts'}
        </h4>
        {facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="mt-0.5 text-xl">{fact.emoji}</span>
            <div>
              <p className="text-sm font-bold text-white">{fact.label}</p>
              <p className="text-xs text-neutral-500">{fact.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <h4 className="mb-4 text-sm font-black tracking-wider text-white uppercase">FAQ</h4>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-neutral-800">
              <button
                onClick={() => onToggleFaq(index)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-neutral-300 transition-all hover:bg-neutral-900 hover:text-white"
                aria-expanded={openFaq === index}
                type="button"
              >
                <span>{faq.q}</span>
                {openFaq === index ? <ChevronUp size={14} className="shrink-0 text-blue-400" /> : <ChevronDown size={14} className="shrink-0 text-neutral-500" />}
              </button>
              {openFaq === index && (
                <div className="border-t border-neutral-800 px-4 pt-3 pb-3 text-xs leading-relaxed text-neutral-400">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export function BottomCta({ t, ctaBody }: BottomCtaProps) {
  return (
    <div className="border-t border-neutral-800 bg-linear-to-r from-blue-950/40 via-neutral-950 to-blue-950/40 px-4 py-10 text-center md:px-6">
      <h2 className="mb-3 text-2xl font-black tracking-tight text-white uppercase md:text-4xl">{t.ctaBanner}</h2>
      <p className="mx-auto mb-6 max-w-xl text-base text-neutral-400">{ctaBody}</p>
      <a
        href={PETITION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 md:text-base"
      >
        {t.ctaBtn} <ArrowUpRight size={18} />
      </a>
    </div>
  )
}

export function SiteFooter({ t }: FooterProps) {
  return (
    <footer className="border-t border-neutral-800 px-4 py-8 text-center md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-left">
          <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Rettet das Blau
          </p>
          <p className="mt-1 text-xs text-neutral-500">{t.footerTagline}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <a
            href={IMPRINT_URL}
            className="text-sm font-semibold text-neutral-300 transition-colors hover:text-white"
          >
            {t.footerImprint}
          </a>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            {t.footerLink} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
