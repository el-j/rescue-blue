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
    <section id="kultur" className="editorial-card p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">04 / KULTURERBE</span>
            <span className="h-px w-12 bg-[var(--border)]" />
          </div>
          <h3 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            <BookOpen size={22} className="text-blue-600 dark:text-blue-400" />
            {t.cultureH}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t.cultureSub}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-1">
          <button
            onClick={() => onChangeTab('sprache')}
            className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'sprache'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            type="button"
          >
            {t.tabLang}
          </button>
          <button
            onClick={() => onChangeTab('symbolik')}
            className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'symbolik'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            type="button"
          >
            {t.tabSym}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sayings[activeTab].map((item, index) => (
          <article
            key={index}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 transition-all hover:border-blue-500/40"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
              <h4 className="text-base md:text-lg font-bold text-[var(--text-primary)]">
                {item.phrase}
              </h4>
              <span className="font-mono text-[10px] uppercase tracking-wider rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 text-[var(--text-muted)]">
                {item.origin}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
