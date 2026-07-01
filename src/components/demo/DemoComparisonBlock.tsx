import type { Translation } from '../../i18n'

interface DemoComparisonBlockProps {
  t: Translation
  displayAfdPct: number
  othersCombinedPct: number
  comparisonMax: number
  isAfdBrown: boolean
}

export function DemoComparisonBlock({
  t,
  displayAfdPct,
  othersCombinedPct,
  comparisonMax,
  isAfdBrown,
}: DemoComparisonBlockProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8 animate-in">
      <p className="mb-4 text-center text-xs font-bold tracking-wider text-neutral-400 uppercase">
        {t.comparisonTitle}
      </p>
      <div className="flex items-end justify-center gap-8 sm:gap-16" style={{ height: '280px' }}>
        {/* AfD bar */}
        <div className="flex flex-col items-center" style={{ width: '120px' }}>
          <span className="mb-2 text-lg font-black text-white">{displayAfdPct.toFixed(1)} %</span>
          <div
            className={`w-full rounded-t-lg transition-all duration-500 ${isAfdBrown ? 'shadow-lg shadow-amber-950/40' : 'shadow-lg shadow-cyan-500/20'}`}
            style={{
              height: `${Math.round((displayAfdPct / comparisonMax) * 200)}px`,
              background: isAfdBrown
                ? 'linear-gradient(to top, #78350f, #92400e, #b45309)'
                : 'linear-gradient(to top, #06b6d4, #22d3ee)',
              borderTop: isAfdBrown ? '3px solid #d97706' : '3px solid #67e8f9',
            }}
          />
          <span className={`mt-3 text-sm font-black ${isAfdBrown ? 'text-amber-500' : 'text-cyan-400'}`}>
            AfD
          </span>
        </div>

        {/* All Others (rainbow) bar */}
        <div className="flex flex-col items-center" style={{ width: '120px' }}>
          <span className="mb-2 text-lg font-black text-white">{othersCombinedPct.toFixed(1)} %</span>
          <div
            className="w-full rounded-t-lg shadow-lg transition-all duration-500 rainbow-bar"
            style={{
              height: `${Math.round((othersCombinedPct / comparisonMax) * 200)}px`,
              borderTop: '3px solid rgba(255,255,255,0.5)',
            }}
          />
          <span className="mt-3 text-sm font-black rainbow-text">
            {t.allOthersLabel}
          </span>
        </div>
      </div>

      {/* Ratio message */}
      <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-center">
        <p className="text-sm font-bold text-emerald-300">
          {(othersCombinedPct / Math.max(displayAfdPct, 0.1)).toFixed(1)}{t.comparisonRatio}
        </p>
        <p className="mt-1 text-xs text-emerald-400/70">
          {t.comparisonMessage}
        </p>
      </div>
    </div>
  )
}
