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
      className=""
    >
      <div className="border-b border-[var(--border)] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          <span>06 / GLOSSAR & SPRACHKRITIK</span>
        </div>
        <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          <BookMarked size={22} className="text-blue-600 dark:text-blue-400" />
          {t.wordsMeaningTitle}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)] max-w-3xl">
          {t.wordsMeaningSubtitle}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-4 md:p-5 flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-6 hover:bg-[var(--bg-secondary)]/40 transition-colors"
            >
              <div className="md:w-1/3 shrink-0">
                <span className="text-base font-bold text-[var(--text-primary)] tracking-wide">
                  „{entry.word}“
                </span>
              </div>
              <div className="flex items-start gap-2.5 md:w-2/3">
                <ArrowRight size={15} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry.meaning}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
