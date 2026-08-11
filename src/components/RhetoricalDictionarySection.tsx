import { BookMarked } from 'lucide-react'
import type { Translation, WordsMeaning } from '../i18n'

interface RhetoricalDictionaryProps {
  t: Translation
  entries: WordsMeaning
}

export function RhetoricalDictionarySection({ t, entries }: RhetoricalDictionaryProps) {
  return (
    <section
      id="woerter-bedeutung"
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-xl md:p-8"
    >
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-[var(--text-primary)] uppercase md:text-2xl">
          <BookMarked size={22} className="text-blue-500" />
          {t.wordsMeaningTitle}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{t.wordsMeaningSubtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 transition-all hover:border-blue-500/30"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-[var(--text-primary)]">{entry.word}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-400">
                <span className="text-[var(--text-muted)]">=</span>
                <span className="leading-snug">{entry.meaning}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
