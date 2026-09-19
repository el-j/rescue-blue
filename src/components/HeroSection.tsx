import { ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Translation } from '../i18n'

export interface NewsSource {
  name: string
  url: string
}

export interface NewsArticle {
  title: string | Record<string, string>
  source?: string
  url?: string
  date: string
  excerpt: string | Record<string, string>
  sources?: NewsSource[]
}

interface HeroProps {
  t: Translation
  headline: string
  subline: string
  ctaLabel: string
  heroImageBase: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  isLive: boolean
  onCtaClick: () => void
}

export function HeroSection({
  t,
  headline,
  subline,
  ctaLabel,
  formattedSignatureCount,
  isLoadingSignatures,
  isLive,
  onCtaClick,
}: HeroProps) {
  return (
    <header className="hero-fullscreen relative w-full pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Editorial Masthead Folio Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-[var(--border)] pb-3 mb-10 text-[11px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--text-primary)]">RETTE-BLAU.DE</span>
            <span className="text-[var(--border-strong)]">/</span>
            <span>{t.badge}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${isLive ? 'bg-blue-600 animate-pulse' : 'bg-emerald-500'}`} />
            <span>{isLive ? 'KAMPAGNE AKTIV · CHANGE.ORG' : 'OFFIZIELLES DOKUMENT'}</span>
          </div>
        </div>

        {/* Main Typographic Manifesto Header */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[var(--text-primary)]">
            {headline}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-blue-600 dark:text-blue-400 max-w-4xl">
            {subline}
          </p>

          <p className="editorial-lead max-w-3xl pt-2">
            {t.heroBody}
          </p>
        </div>

        {/* Chromatic Confrontation: Democratic Blue vs Historical Brown Split Broadsheet */}
        <div className="mt-12 border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {/* Status Quo Panel: ARD & ZDF Euphemism in Blue */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-blue-50/70 dark:bg-blue-950/20">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-blue-200 dark:border-blue-500/20 pb-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  01 / Status Quo in ARD & ZDF
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600 dark:text-[var(--text-muted)]">Medien-Praxis</span>
              </div>
              
              <div className="h-2 w-16 bg-blue-600 mb-4" />
              
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                AfD als friedliches „Blau“
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-800 dark:text-[var(--text-secondary)]">
                Blau signalisiert Ruhe, Vernunft, Europa und Seriosität. Durch diese unkritische Farbwahl wird eine in Teilen gesichert rechtsextreme Ideologie visuell verharmlost und normalisiert.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-blue-200 dark:border-blue-500/20 flex items-center gap-2 text-xs font-bold text-red-700 dark:text-rose-400 uppercase tracking-wide">
              <AlertCircle size={15} />
              <span>Fatale psychologische Verharmlosung</span>
            </div>
          </div>

          {/* Forderung Panel: Historical Truth in Brown */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-[#f7f2ed] dark:bg-amber-950/20">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-[#ddcdbe] dark:border-amber-600/20 pb-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4a2608] dark:text-[#f3b584]">
                  02 / {t.heroImgText1 || 'Historische Richtigkeit'}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600 dark:text-[var(--text-muted)]">Forderung</span>
              </div>
              
              <div className="h-2 w-16 bg-[#54331a] mb-4" />
              
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                Braun für völkischen Nationalismus
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-800 dark:text-[var(--text-secondary)]">
                Braun ist im kollektiven Gedächtnis die unmissverständliche Farbe des Rechtsextremismus. Grafische Diagramme der Leitmedien müssen die politische Realität ehrlich benennen.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ddcdbe] dark:border-amber-600/20 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
              <CheckCircle2 size={15} />
              <span>Visuelle Medienethik & historische Klarheit</span>
            </div>
          </div>
        </div>

        {/* Monumental Signature Counter & Direct Action Broadsheet Bar */}
        <div className="mt-6 border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-5">
            <span className="editorial-numeral text-5xl sm:text-6xl md:text-7xl font-extrabold text-[var(--text-primary)] leading-none">
              {isLoadingSignatures ? (
                <span className="inline-block h-12 w-28 animate-pulse bg-[var(--border)]" />
              ) : (
                formattedSignatureCount ?? '93'
              )}
            </span>
            <div className="space-y-0.5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
                {t.sidebarSignatures || 'Unterschriften'} {t.sidebarGrowing ? `· ${t.sidebarGrowing}` : ''}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {t.sigCount} {formattedSignatureCount ?? '93'} {t.sigSupport} ({isLive ? t.sigLive : t.sigFallback})
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-colors active:translate-y-0.5"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight size={18} />
            </a>
            <span className="text-[11px] text-[var(--text-muted)]">
              {t.ctaExternalHint} · 100% unabhängig
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

