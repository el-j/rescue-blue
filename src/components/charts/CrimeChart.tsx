import type { Locale, PolicyDangersUI } from '../../i18n'

interface CrimeChartProps {
  ui: PolicyDangersUI
  lang: Locale
  crimeToggle: 'all' | 'violent' | 'hate'
  setCrimeToggle: (val: 'all' | 'violent' | 'hate') => void
}

export function CrimeChart({ ui, lang, crimeToggle, setCrimeToggle }: CrimeChartProps) {
  let valRight = 42544
  let valLeft = 13490
  let maxScale = 45000
  let formattedRight = "42.544"
  let formattedLeft = "13.490"
  let labelSuffix = lang === 'de' ? 'Gesamt' : 'Total'

  if (crimeToggle === 'violent') {
    valRight = 1598
    valLeft = 1087
    maxScale = 2000
    formattedRight = "1.598"
    formattedLeft = "1.087"
    labelSuffix = lang === 'de' ? 'Gewalt' : 'Violent'
  } else if (crimeToggle === 'hate') {
    valRight = 4870
    valLeft = 1460
    maxScale = 5000
    formattedRight = "4.870"
    formattedLeft = "1.460"
    labelSuffix = lang === 'de' ? 'Hass' : 'Hate'
  }
  
  const rightHeight = (valRight / maxScale) * 140
  const leftHeight = (valLeft / maxScale) * 140

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          {ui.pmkChartTitle}
        </h4>
        {/* Crime 3-state toggle controls */}
        <div className="inline-flex rounded-lg bg-neutral-900 p-0.5 border border-neutral-800 shrink-0">
          <button
            onClick={() => setCrimeToggle('all')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === 'all'
                ? 'bg-red-500/10 text-red-400 border border-red-500/10'
                : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
            }`}
          >
            {ui.pmkCrimes}
          </button>
          <button
            onClick={() => setCrimeToggle('violent')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === 'violent'
                ? 'bg-red-500/10 text-red-400 border border-red-500/10'
                : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
            }`}
          >
            {ui.pmkViolent}
          </button>
          <button
            onClick={() => setCrimeToggle('hate')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === 'hate'
                ? 'bg-red-500/10 text-red-400 border border-red-500/10'
                : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
            }`}
          >
            {ui.pmkHate}
          </button>
        </div>
      </div>

      <div className="relative w-full h-[220px] bg-neutral-950/40 rounded-xl border border-neutral-900 p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Horizontal Grid lines */}
          <line x1="50" y1="20" x2="350" y2="20" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="50" y1="90" x2="350" y2="90" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="50" y1="160" x2="350" y2="160" stroke="#374151" />

          {/* Y Axis scale indicators */}
          <text x="10" y="24" className="text-[9px] fill-neutral-500 font-semibold">
            {crimeToggle === 'all' ? "45.000" : (crimeToggle === 'violent' ? "2.000" : "5.000")}
          </text>
          <text x="10" y="94" className="text-[9px] fill-neutral-500 font-semibold">
            {crimeToggle === 'all' ? "22.500" : (crimeToggle === 'violent' ? "1.000" : "2.500")}
          </text>
          <text x="10" y="164" className="text-[9px] fill-neutral-500 font-semibold">0</text>

          {/* Bar 1: Right-wing PMK */}
          <rect 
            x="90" 
            y={160 - rightHeight} 
            width="70" 
            height={rightHeight} 
            className="fill-red-500" 
            rx="4" 
          />
          <text 
            x="125" 
            y={150 - rightHeight} 
            textAnchor="middle" 
            className="text-[11px] fill-red-400 font-black"
          >
            {formattedRight}
          </text>
          <text x="125" y="174" textAnchor="middle" className="text-[9px] fill-neutral-400 font-bold uppercase">
            {lang === 'de' ? 'Rechts' : 'Right'} ({labelSuffix})
          </text>

          {/* Bar 2: Left-wing PMK */}
          <rect 
            x="240" 
            y={160 - leftHeight} 
            width="70" 
            height={leftHeight} 
            className="fill-neutral-600/80" 
            rx="4" 
          />
          <text 
            x="275" 
            y={150 - leftHeight} 
            textAnchor="middle" 
            className="text-[11px] fill-neutral-300 font-black"
          >
            {formattedLeft}
          </text>
          <text x="275" y="174" textAnchor="middle" className="text-[9px] fill-neutral-400 font-bold uppercase">
            {lang === 'de' ? 'Links' : 'Left'} ({labelSuffix})
          </text>
        </svg>
      </div>
      
      <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
        {crimeToggle === 'violent'
          ? (lang === 'de' 
              ? "* Gewalttaten (2025): Rechts motivierte Gewaltdelikte lagen bei 1.598 Delikten, das ist 1,47-mal so häufig wie linksextrem motivierte Gewalttaten (1.087 Delikte)."
              : "* Violent Crimes (2025): Right-wing violent crimes stood at 1,598, which is 1.47 times more frequent than left-wing violent crimes (1,087).")
          : (crimeToggle === 'hate'
              ? (lang === 'de' 
                  ? "* Hasskommentare (2025): Mit 4.870 Fällen im Internet ist die rechts motivierte Hasskriminalität 3,33-mal so hoch wie die links motivierte Hasskriminalität (1.460 Delikte)."
                  : "* Hate Postings (2025): Right-wing politically motivated hate postings on the internet stood at 4,870, which is 3.33 times more frequent than left-wing postings (1,460).")
              : (lang === 'de' 
                  ? "* Gesamtstraftaten (2025): Mit 42.544 Delikten ist die rechts motivierte politische Kriminalität 3,15-mal so hoch wie die links motivierte Kriminalität (13.490 Delikte)."
                  : "* Total Offences (2025): Right-wing politically motivated crime stood at 42,544, which is 3.15 times more frequent than left-wing crime (13,490)."))
        }
      </p>
    </div>
  )
}
