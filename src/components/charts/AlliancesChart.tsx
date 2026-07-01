import type { Locale, PolicyDangersUI } from '../../i18n'

interface AlliancesChartProps {
  ui: PolicyDangersUI
  lang: Locale
}

export function AlliancesChart({ ui, lang }: AlliancesChartProps) {
  const chartTitle = lang === 'de' ? 'Netzwerk & Verbindungen der AfD' : 'AfD Network & Connections'
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center">
        {chartTitle}
      </h4>
      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Connecting lines */}
          {/* Center to ESN */}
          <line x1="200" y1="90" x2="90" y2="50" stroke="#4b5563" strokeWidth="2" strokeDasharray="3 3" />
          
          {/* Center to Russia */}
          <line x1="200" y1="90" x2="310" y2="50" stroke="#ef4444" strokeWidth="2.5" className="animate-pulse" />
          
          {/* Center to China */}
          <line x1="200" y1="90" x2="200" y2="140" stroke="#ef4444" strokeWidth="2.5" className="animate-pulse" />

          {/* Node 1: ESN (EU Parliament Group) */}
          <circle cx="90" cy="50" r="18" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
          <text x="90" y="54" textAnchor="middle" className="text-[10px] fill-neutral-300 font-bold">ESN</text>
          <text x="90" y="24" textAnchor="middle" className="text-[9px] fill-neutral-300 font-bold uppercase tracking-wide">
            {ui.nodeESN}
          </text>

          {/* Node 2: Russia / Voice of Europe */}
          <circle cx="310" cy="50" r="18" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
          <text x="310" y="54" textAnchor="middle" className="text-[10px] fill-red-200 font-bold">VoE</text>
          <text x="310" y="24" textAnchor="middle" className="text-[9px] fill-red-400 font-bold uppercase tracking-wide">
            {ui.nodeRussia}
          </text>

          {/* Node 3: China / Espionage */}
          <circle cx="200" cy="140" r="18" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
          <text x="200" y="144" textAnchor="middle" className="text-[10px] fill-red-200 font-bold">CN</text>
          <text x="200" y="172" textAnchor="middle" className="text-[9px] fill-red-400 font-bold uppercase tracking-wide">
            {ui.nodeChina}
          </text>

          {/* Center Node: AfD */}
          <circle cx="200" cy="90" r="22" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
          <text x="200" y="94" textAnchor="middle" className="text-[11px] fill-white font-black">AfD</text>
        </svg>
      </div>
      <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
        {lang === 'de'
          ? "* Verbindungen: Die AfD bildet im Europaparlament mit extremen EU-Gegnern die ESN-Fraktion. Ermittlungsbehörden führen Razzien und Spionage-Untersuchungen im Kontext russischer Zahlungsnetzwerke (Voice of Europe) und chinesischer Geheimdienste durch."
          : "* Connections: The AfD leads the far-right ESN group in the European Parliament. Authorities are investigating corrupt funding networks linked to Russia (Voice of Europe) and espionage files connected to Chinese intelligence agencies."
        }
      </p>
    </div>
  )
}
