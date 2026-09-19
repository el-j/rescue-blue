import { BookOpen, ChevronDown, ChevronUp, Shield } from 'lucide-react'
import type { ScienceContent } from '../i18n'

interface ScienceProps {
  science: ScienceContent
  openObjection: number | null
  onToggleObjection: (index: number) => void
}

export function ScientificBackgroundSection({ science, openObjection, onToggleObjection }: ScienceProps) {
  return (
    <section id="hintergrund" className="">
      {/* Dossier Header */}
      <div className="border-b border-[var(--border)] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          <span>04 / WISSENSCHAFTLICHE GRUNDLAGEN</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {science.sectionH}
        </h2>
        <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--text-secondary)] max-w-3xl">
          {science.sectionSub}
        </p>
      </div>

      {/* Part 1: Media Ethics Foundations */}
      <div className="p-6 md:p-8 border-b border-[var(--border)] space-y-6">
        <h3 className="flex items-center gap-2 text-base md:text-lg font-extrabold tracking-tight text-blue-600 dark:text-blue-400 uppercase">
          <BookOpen size={18} /> {science.part1H}
        </h3>
        <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
          {science.foundations.map((foundation, fi) => (
            <div key={fi} className="p-5 md:p-6 bg-[var(--bg-secondary)]/40">
              <h4 className="mb-3 text-base font-bold text-[var(--text-primary)] tracking-tight">
                {foundation.title}
              </h4>
              <div className="space-y-4">
                {foundation.points.map((point, pi) => (
                  <div key={pi} className="space-y-1">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide block">
                      {point.label}
                    </span>
                    <p className="text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Objections & Rebuttals Accordion */}
      <div className="p-6 md:p-8 space-y-6 bg-[var(--bg-secondary)]/20">
        <h3 className="flex items-center gap-2 text-base md:text-lg font-extrabold tracking-tight text-amber-600 dark:text-amber-400 uppercase">
          <Shield size={18} /> {science.part2H}
        </h3>
        <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
          {science.objections.map((obj, oi) => (
            <div key={oi} className="bg-[var(--bg-primary)]">
              <button
                onClick={() => onToggleObjection(oi)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] cursor-pointer"
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
                <div className="space-y-4 border-t border-[var(--border)] bg-[var(--bg-secondary)] p-5">
                  {obj.rebuttals.map((rebuttal, ri) => (
                    <div key={ri} className="space-y-1">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide block">
                        {rebuttal.label}
                      </span>
                      <p className="text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
                        {rebuttal.text}
                      </p>
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
