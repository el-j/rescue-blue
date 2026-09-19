import { BookOpen } from 'lucide-react'
import type { ContentTab, Sayings, Translation } from '../i18n'

interface CultureProps {
  t: Translation
  sayings: Sayings
  activeTab: ContentTab
  onChangeTab: (tab: ContentTab) => void
}

export function CultureSection({ t, sayings, activeTab, onChangeTab }: CultureProps) {
  return (
    <section id="kultur" className="border border-[var(--border)] bg-[var(--bg-primary)]">
      {/* Section Header with Tabs */}
      <div className="border-b border-[var(--border)] p-6 md:p-8 bg-[var(--bg-secondary)] flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
            <span>05 / KULTURERBE</span>
          </div>
          <h3 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            <BookOpen size={22} className="text-blue-600 dark:text-blue-400" />
            {t.cultureH}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t.cultureSub}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[var(--border)] bg-[var(--bg-primary)] p-0.5 font-mono text-xs">
          <button
            onClick={() => onChangeTab('sprache')}
            className={`px-4 py-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'sprache'
                ? 'bg-blue-600 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            type="button"
          >
            {t.tabLang}
          </button>
          <button
            onClick={() => onChangeTab('symbolik')}
            className={`px-4 py-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'symbolik'
                ? 'bg-blue-600 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            type="button"
          >
            {t.tabSym}
          </button>
        </div>
      </div>

      {/* Cultural Saying Ledger Rows */}
      <div className="p-6 md:p-8">
        <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
          {sayings[activeTab].map((item, index) => (
            <article
              key={index}
              className="p-5 md:p-6 transition-colors hover:bg-[var(--bg-secondary)]/50"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                <h4 className="text-base md:text-lg font-bold text-[var(--text-primary)]">
                  {item.phrase}
                </h4>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {item.origin}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
