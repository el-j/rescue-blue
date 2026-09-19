import { AlertTriangle, CheckCircle } from 'lucide-react'
import type { Translation } from '../i18n'

export function WhySection({ t }: { t: Translation }) {
  return (
    <section id="warum" className="space-y-6">
      {/* Section Header with Editorial Indexing */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">01 / DOKUMENTATION</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.whyH2}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-[var(--text-secondary)] max-w-3xl">
          {t.whyIntro}
        </p>
      </div>

      {/* Two-Column Editorial Spread */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
        {/* Investigative Problem Focus */}
        <article className="editorial-card relative overflow-hidden p-6 md:p-8 flex flex-col justify-between border-l-4 border-l-rose-500">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-2xl font-black text-rose-500/80">01</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                <AlertTriangle size={18} />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
              {t.whyCard1H}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.whyCard1}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            Visuelle Psychologie & Framing
          </div>
        </article>

        {/* Historical Context & Demand */}
        <article className="editorial-card relative overflow-hidden p-6 md:p-8 flex flex-col justify-between border-l-4 border-l-amber-600">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-2xl font-black text-amber-600/80">02</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <CheckCircle size={18} />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
              {t.whyCard2H}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.whyCard2}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            Historische Kontinuität & Ethik
          </div>
        </article>
      </div>
    </section>
  )
}
