import type { PolicyDangersUI } from '../../i18n'

interface EconomyChartProps {
  ui: PolicyDangersUI
}

export function EconomyChart({ ui }: EconomyChartProps) {
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center">
        {ui.gdpChartTitle}
      </h4>
      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Grid Lines */}
          <line x1="50" y1="30" x2="360" y2="30" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="50" y1="80" x2="360" y2="80" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="50" y1="130" x2="360" y2="130" stroke="#1f2937" strokeDasharray="3 3" />

          {/* Y Axis Labels */}
          <text x="10" y="34" className="text-[9px] svg-text-muted font-semibold">120%</text>
          <text x="10" y="84" className="text-[9px] svg-text-muted font-semibold">110%</text>
          <text x="10" y="134" className="text-[9px] svg-text-muted font-semibold">100%</text>

          {/* X Axis Timeline Markers */}
          <line x1="50" y1="130" x2="360" y2="130" stroke="#374151" />
          <text x="50" y="148" textAnchor="middle" className="text-[8px] svg-text-muted font-semibold">Year 0</text>
          <text x="153" y="148" textAnchor="middle" className="text-[8px] svg-text-muted font-semibold">Year 5</text>
          <text x="256" y="148" textAnchor="middle" className="text-[8px] svg-text-muted font-semibold">Year 10</text>
          <text x="360" y="148" textAnchor="middle" className="text-[8px] svg-text-muted font-semibold">Year 15</text>

          {/* Line 1: Synthetic Control (Normal progression) */}
          <path 
            d="M 50 130 Q 120 100, 200 85 T 360 40" 
            fill="none" 
            stroke="#4b5563" 
            strokeWidth="2.5" 
          />
          
          {/* Line 2: Populist (AfD Economic model trajectory) */}
          <path 
            d="M 50 130 Q 120 115, 200 110 T 360 85" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* Divergence gap label */}
          <line x1="360" y1="40" x2="360" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="338" y="53" width="44" height="18" rx="4" className="svg-bg-red-pill" />
          <text x="360" y="66" textAnchor="middle" className="text-[9px] svg-text-red font-black">-10%</text>

          {/* Chart Legends */}
          <g transform="translate(60, 162)">
            <line x1="0" y1="4" x2="15" y2="4" stroke="#4b5563" strokeWidth="2.5" />
            <text x="22" y="8" className="text-[8px] svg-text-secondary font-semibold">{ui.gdpControlLine}</text>

            <line x1="170" y1="4" x2="185" y2="4" stroke="#ef4444" strokeWidth="3" />
            <text x="192" y="8" className="text-[8px] svg-text-red font-bold">{ui.gdpPopulistLine}</text>
          </g>
        </svg>
      </div>
    </div>
  )
}
