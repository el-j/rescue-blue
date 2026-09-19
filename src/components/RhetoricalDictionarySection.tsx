import { BookMarked, ArrowRight } from 'lucide-react'
import type { Translation, WordsMeaning } from '../i18n'

interface RhetoricalDictionaryProps {
  t: Translation
  entries: WordsMeaning
}

export function RhetoricalDictionarySection({ t, entries }: RhetoricalDictionaryProps) {
  return (
    <section
      id="woerter-bedeutung"
      className="editorial-card p-6 md:p-8 space-y-6"
    >
      <div className="border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">GLOSSAR / SPRACHKRITIK</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          <BookMarked size={22} className="text-blue-600 dark:text-blue-400" />
          {t.wordsMeaningTitle}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
          {t.wordsMeaningSubtitle}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-all hover:border-blue-500/40"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2 mb-2">
              <span className="text-sm font-bold text-[var(--text-primary)] tracking-wide">
                „{entry.word}“
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Narrativ</span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <ArrowRight size={13} className="text-rose-500 shrink-0 mt-0.5" />
              <span className="text-xs font-medium leading-relaxed text-[var(--text-secondary)]">
                {entry.meaning}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
