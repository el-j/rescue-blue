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
        <h2 className="text-2xl font-black tracking-tight text-white uppercase">{science.sectionH}</h2>
        <p className="mt-1 text-sm text-neutral-500">{science.sectionSub}</p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
        <h3 className="mb-5 flex items-center gap-2 text-base font-black tracking-tight text-blue-400 uppercase md:text-lg">
          <BookOpen size={18} /> {science.part1H}
        </h3>
        <div className="space-y-5">
          {science.foundations.map((foundation, fi) => (
            <div key={fi} className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
              <h4 className="mb-4 text-sm font-bold text-white md:text-base">{foundation.title}</h4>
              <div className="space-y-3">
                {foundation.points.map((point, pi) => (
                  <div key={pi} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <div>
                      <span className="text-xs font-bold text-blue-300">{point.label}: </span>
                      <span className="text-xs leading-relaxed text-neutral-400">{point.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
        <h3 className="mb-5 flex items-center gap-2 text-base font-black tracking-tight text-amber-400 uppercase md:text-lg">
          <Shield size={18} /> {science.part2H}
        </h3>
        <div className="space-y-3">
          {science.objections.map((obj, oi) => (
            <div key={oi} className="overflow-hidden rounded-xl border border-neutral-800">
              <button
                onClick={() => onToggleObjection(oi)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-neutral-300 transition-all hover:bg-neutral-900 hover:text-white"
                aria-expanded={openObjection === oi}
                type="button"
              >
                <span>{obj.title}</span>
                {openObjection === oi ? <ChevronUp size={14} className="shrink-0 text-amber-400" /> : <ChevronDown size={14} className="shrink-0 text-neutral-500" />}
              </button>
              {openObjection === oi && (
                <div className="space-y-3 border-t border-neutral-800 px-4 pt-3 pb-4">
                  {obj.rebuttals.map((rebuttal, ri) => (
                    <div key={ri} className="flex gap-3">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-amber-300">{rebuttal.label}: </span>
                        <span className="text-xs leading-relaxed text-neutral-400">{rebuttal.text}</span>
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
