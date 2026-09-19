import type { Translation } from '../i18n'

export function WhySection({ t }: { t: Translation }) {
  return (
    <section id="warum" className="border border-[var(--border)] bg-[var(--bg-primary)]">
      {/* Section Masthead */}
      <div className="border-b border-[var(--border)] p-6 md:p-8 bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          <span>01 / DOKUMENTATION</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.whyH2}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)] max-w-3xl">
          {t.whyIntro}
        </p>
      </div>

      {/* Two-Column Broadsheet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {/* Investigative Problem Focus */}
        <article className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-[var(--border)] pb-3">
              <span className="font-mono text-3xl font-black text-rose-600 dark:text-rose-400">01</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Visuelle Verharmlosung
              </span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
              {t.whyCard1H}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.whyCard1}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            Visuelle Psychologie & Framing
          </div>
        </article>

        {/* Historical Context & Demand */}
        <article className="p-6 md:p-8 flex flex-col justify-between bg-[var(--bg-secondary)]">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-[var(--border)] pb-3">
              <span className="font-mono text-3xl font-black text-amber-600 dark:text-amber-400">02</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Historische Zuordnung
              </span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
              {t.whyCard2H}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.whyCard2}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            Historische Kontinuität & Ethik
          </div>
        </article>
      </div>
    </section>
  )
}
