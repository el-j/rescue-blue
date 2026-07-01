import type { PolicyDangersUI } from '../../i18n'

interface PressChartProps {
  ui: PolicyDangersUI
}

export function PressChart({ ui }: PressChartProps) {
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center">
        {ui.pressFreedomTitle}
      </h4>
      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Horizontal axis grid */}
          <line x1="90" y1="20" x2="90" y2="160" stroke="#374151" />
          <line x1="180" y1="20" x2="180" y2="160" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="270" y1="20" x2="270" y2="160" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="360" y1="20" x2="360" y2="160" stroke="#1f2937" strokeDasharray="3 3" />

          {/* X axis labels */}
          <text x="90" y="172" textAnchor="middle" className="text-[8px] fill-neutral-600 font-bold">0</text>
          <text x="180" y="172" textAnchor="middle" className="text-[8px] fill-neutral-600 font-bold">50</text>
          <text x="270" y="172" textAnchor="middle" className="text-[8px] fill-neutral-600 font-bold">75</text>
          <text x="360" y="172" textAnchor="middle" className="text-[8px] fill-neutral-600 font-bold">100</text>

          {/* Germany Bar */}
          <text x="80" y="47" textAnchor="end" className="text-[10px] fill-neutral-300 font-bold">Deutschland</text>
          <rect x="90" y="35" width="221" height="20" className="fill-neutral-600/80" rx="3" />
          <text x="320" y="49" className="text-[10px] fill-neutral-300 font-bold">82 / 100</text>

          {/* Poland under PiS Bar */}
          <text x="80" y="97" textAnchor="end" className="text-[10px] fill-neutral-400 font-bold">Polen (PiS)</text>
          <rect x="90" y="85" width="148" height="20" className="fill-red-500/50" rx="3" />
          <text x="245" y="99" className="text-[10px] fill-red-400 font-bold">55 / 100</text>

          {/* Hungary under Fidesz Bar */}
          <text x="80" y="147" textAnchor="end" className="text-[10px] fill-red-400/80 font-bold">Ungarn</text>
          <rect x="90" y="135" width="113" height="20" className="fill-red-500" rx="3" />
          <text x="210" y="149" className="text-[10px] fill-red-500 font-bold">42 / 100</text>
        </svg>
      </div>
      <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
        * Score-Vergleich zeigt die Erosion der Medienfreiheit nach der autokratischen Übernahme öffentlicher Rundfunkanstalten in Polen (Führungswechsel) und Ungarn (Einschränkung ausländischer Eigner).
      </p>
    </div>
  )
}
