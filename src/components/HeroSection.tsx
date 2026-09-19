import { Shield, Users, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react'
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
    <header className="hero-fullscreen relative w-full pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
      {/* Subtle editorial watermark lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Editorial Masthead / Kicker */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase shadow-xs">
            <Shield size={13} className="text-blue-500 dark:text-blue-400" />
            <span>{t.badge}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
            <span className="font-mono text-[10px] text-[var(--text-muted)]">RETTE-BLAU.DE</span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase sm:text-6xl lg:text-7xl">
            {headline}
          </h1>

          {/* Subline with Chromatic Accent */}
          <p className="mt-4 max-w-3xl text-xl font-bold tracking-normal text-blue-600 dark:text-blue-400 sm:text-2xl lg:text-3xl">
            {subline}
          </p>

          {/* Editorial Lead Paragraph */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {t.heroBody}
          </p>
        </div>

        {/* Chromatic Confrontation: Broadcast Television vs Historical Reality */}
        <div className="mt-10 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-6 shadow-xl">
            {/* Status Quo Card: ARD / ZDF Euphemism */}
            <div className="flex flex-col justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Status Quo in ARD & ZDF
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Medien-Praxis</span>
                </div>
                <div className="h-3 w-full rounded-full bg-blue-600 mb-3" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  AfD als friedliches „Blau“
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                  Blau signalisiert Ruhe, Europa, Frieden und Seriosität. Durch diese Farbwahl wird rechtsextreme Ideologie visuell verharmlost und normalisiert.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-500/15 flex items-center gap-1.5 text-[11px] font-semibold text-rose-500 dark:text-rose-400">
                <AlertCircle size={13} />
                <span>Fatale psychologische Verharmlosung</span>
              </div>
            </div>

            {/* Demand Card: Accurate Historical Color */}
            <div className="flex flex-col justify-between rounded-xl border border-amber-800/30 bg-amber-950/15 p-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-[#54331a]" />
                    {t.heroImgText1 || 'Historische Richtigkeit'}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Forderung</span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#54331a] mb-3" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Braun für völkischen Nationalismus
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                  Braun ist im kollektiven Gedächtnis die unmissverständliche Farbe des Rechtsextremismus. Diagramme müssen diese politische Realität ehrlich widerspiegeln.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-800/20 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={13} />
                <span>Visuelle Medienethik & historische Klarheit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Counters & High-Conversion Action Bar */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Verified Signature Counter Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
            <Users size={15} className="text-blue-500 dark:text-blue-400" />
            <span>
              {t.sigCount}{' '}
              <strong className="font-mono text-sm font-bold text-[var(--text-primary)]">
                {isLoadingSignatures ? (
                  <span className="inline-block h-4 w-12 animate-pulse rounded bg-[var(--border)] align-middle" />
                ) : (
                  formattedSignatureCount ?? '—'
                )}
              </strong>{' '}
              {t.sigSupport}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
              {isLive ? t.sigLive : t.sigFallback}
            </span>
          </div>

          {/* Primary Petition CTA Button */}
          <div className="w-full max-w-md flex flex-col items-center">
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-center text-sm md:text-base font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-[0.99]"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">
              {t.ctaExternalHint} · Kostenlos & unabhängig
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
