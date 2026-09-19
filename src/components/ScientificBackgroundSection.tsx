import { BookOpen, ChevronDown, ChevronUp, Shield } from 'lucide-react'
import type { ScienceContent } from '../i18n'

interface ScienceProps {
  science: ScienceContent
  openObjection: number | null
  onToggleObjection: (index: number) => void
}

export function ScientificBackgroundSection({ science, openObjection, onToggleObjection }: ScienceProps) {
  return (
    <section id="hintergrund" className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">03 / WISSENSCHAFTLICHE GRUNDLAGEN</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {science.sectionH}
        </h2>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{science.sectionSub}</p>
      </div>

      <div className="editorial-card p-6 md:p-8 space-y-5">
        <h3 className="flex items-center gap-2 text-base md:text-lg font-extrabold tracking-tight text-blue-600 dark:text-blue-400 uppercase">
          <BookOpen size={18} /> {science.part1H}
        </h3>
        <div className="space-y-4">
          {science.foundations.map((foundation, fi) => (
            <div key={fi} className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
              <h4 className="mb-3 text-sm md:text-base font-bold text-[var(--text-primary)]">{foundation.title}</h4>
              <div className="space-y-2.5">
                {foundation.points.map((point, pi) => (
                  <div key={pi} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{point.label}: </span>
                      <span className="text-xs leading-relaxed text-[var(--text-secondary)]">{point.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editorial-card p-6 md:p-8 space-y-5">
        <h3 className="flex items-center gap-2 text-base md:text-lg font-extrabold tracking-tight text-amber-600 dark:text-amber-400 uppercase">
          <Shield size={18} /> {science.part2H}
        </h3>
        <div className="space-y-3">
          {science.objections.map((obj, oi) => (
            <div key={oi} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
              <button
                onClick={() => onToggleObjection(oi)}
                className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-hover)]"
                aria-expanded={openObjection === oi}
                type="button"
              >
                <span>{obj.title}</span>
                {openObjection === oi ? (
                  <ChevronUp size={16} className="shrink-0 text-amber-500" />
                ) : (
                  <ChevronDown size={16} className="shrink-0 text-[var(--text-muted)]" />
                )}
              </button>
              {openObjection === oi && (
                <div className="space-y-3 border-t border-[var(--border)] bg-[var(--bg-card)]/50 px-5 pt-3.5 pb-4">
                  {obj.rebuttals.map((rebuttal, ri) => (
                    <div key={ri} className="flex gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{rebuttal.label}: </span>
                        <span className="text-xs leading-relaxed text-[var(--text-secondary)]">{rebuttal.text}</span>
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
