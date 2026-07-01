import type { PolicyDangersUI } from '../../i18n'

interface SocialChartProps {
  ui: PolicyDangersUI
}

export function SocialChart({ ui }: SocialChartProps) {
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center">
        {ui.diwChartTitle}
      </h4>
      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Horizontal Grid lines */}
          <line x1="30" y1="30" x2="380" y2="30" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="30" y1="70" x2="380" y2="70" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="30" y1="110" x2="380" y2="110" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="30" y1="140" x2="380" y2="140" stroke="#374151" strokeWidth="1" /> {/* Zero Baseline */}

          {/* Y Axis Labels */}
          <text x="5" y="34" className="text-[9px] fill-neutral-500 font-semibold">+12%</text>
          <text x="5" y="74" className="text-[9px] fill-neutral-500 font-semibold">+6%</text>
          <text x="5" y="114" className="text-[9px] fill-neutral-500 font-semibold">+3%</text>
          <text x="5" y="144" className="text-[9px] fill-neutral-500 font-semibold">0%</text>

          {/* Bar 1: Low Income (0%) */}
          <rect x="40" y="140" width="50" height="1" className="fill-neutral-700" />
          <text x="65" y="132" textAnchor="middle" className="text-[10px] fill-neutral-400 font-bold">0%</text>

          {/* Bar 2: Middle Income (-0.4%) */}
          <rect x="130" y="140" width="50" height="5" className="fill-red-500/70" rx="1" />
          <text x="155" y="160" textAnchor="middle" className="text-[9px] fill-red-400 font-bold">-0.4%</text>

          {/* Bar 3: High Income (+3%) */}
          <rect x="220" y="110" width="50" height="30" className="fill-neutral-600/80" rx="3" />
          <text x="245" y="102" textAnchor="middle" className="text-[10px] fill-neutral-300 font-bold">+3.0%</text>

          {/* Bar 4: Richest 1% (+12%) */}
          <rect x="310" y="30" width="50" height="110" className="fill-red-500" rx="3" />
          <text x="335" y="22" textAnchor="middle" className="text-[11px] fill-red-400 font-black">+12.0%</text>

          {/* X Axis Labels */}
          <text x="65" y="172" textAnchor="middle" className="text-[8px] fill-neutral-500 font-bold uppercase">Gering</text>
          <text x="155" y="172" textAnchor="middle" className="text-[8px] fill-neutral-500 font-bold uppercase">Mittel</text>
          <text x="245" y="172" textAnchor="middle" className="text-[8px] fill-neutral-500 font-bold uppercase">Hoch</text>
          <text x="335" y="172" textAnchor="middle" className="text-[8px] fill-red-400/80 font-bold uppercase">Top 1%</text>
        </svg>
      </div>
      <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
        * Gering & Mittel erhalten kaum Entlastung oder erleiden reale Verluste durch gekürzte soziale Infrastruktur. Die Spitzensteuererleichterungen fließen einseitig an das oberste 1%.
      </p>
    </div>
  )
}
