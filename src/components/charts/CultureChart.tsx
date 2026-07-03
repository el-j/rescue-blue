import type { PolicyDangersUI } from '../../i18n'

interface CultureChartProps {
  ui: PolicyDangersUI
}

export function CultureChart({ ui }: CultureChartProps) {
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center">
        {ui.courtDismissalTitle}
      </h4>
      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col items-center justify-center">
        <svg className="w-40 h-40" viewBox="0 0 120 120">
          {/* Background Ring */}
          <circle cx="60" cy="60" r="45" fill="none" stroke="#1f2937" strokeWidth="9" />
          
          {/* Progress Ring representing 100% */}
          <circle 
            cx="60" 
            cy="60" 
            r="45" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="9" 
            strokeDasharray="282.7" 
            strokeDashoffset="0"
            strokeLinecap="round" 
            className="origin-center -rotate-90"
          />

          {/* Middle Text info */}
          <text x="60" y="58" textAnchor="middle" className="text-[18px] svg-text-primary font-black">100%</text>
          <text x="60" y="74" textAnchor="middle" className="text-[8px] svg-text-red font-extrabold uppercase tracking-wide">
            {ui.courtDismissed}
          </text>
        </svg>
        <div className="text-center mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-300">
            Verwaltungsgericht Hannover (2023) / Schulbehörden
          </span>
        </div>
      </div>
      <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
        Rechtsextreme Angriffe auf freie Kunst, kritisches Schultheater und Lehrkräfte scheiterten ausnahmslos vor deutschen Gerichten, da die verfassungsrechtliche Kunstfreiheit und das Neutralitätsgebot politischen Druck untersagen.
      </p>
    </div>
  )
}
