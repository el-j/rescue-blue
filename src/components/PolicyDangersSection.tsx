import { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingDown, 
  Newspaper, 
  Palette, 
  ExternalLink, 
  ShieldAlert,
  ArrowRight,
  Bookmark
} from 'lucide-react'
import { getPolicyDangers, getPolicyDangersUI } from '../i18n'
import type { Locale, Translation } from '../i18n'

interface PolicyDangersSectionProps {
  lang: Locale
  t: Translation
}

export function PolicyDangersSection({ lang, t }: PolicyDangersSectionProps) {
  const data = getPolicyDangers(lang)
  const ui = getPolicyDangersUI(lang)
  const [activeTab, setActiveTab] = useState(data[0]?.id || 'social')
  const [viewMode, setViewMode] = useState<'chart' | 'text'>('chart')
  const [crimeToggle, setCrimeToggle] = useState<'all' | 'violent' | 'hate'>('all')

  const title = t.dangersTitle
  const subtitle = t.dangersSubtitle
  const sourceLabel = t.dangersSourceLabel
  const activeData = data.find((item) => item.id === activeTab) || data[0]

  // Reset view mode to chart whenever active tab changes
  useEffect(() => {
    setViewMode('chart')
  }, [activeTab])

  // Mapping tab IDs to appropriate Lucide Icons
  const getTabIcon = (id: string, size = 18) => {
    switch (id) {
      case 'social':
        return <Users size={size} />
      case 'economy':
        return <TrendingDown size={size} />
      case 'press':
        return <Newspaper size={size} />
      case 'culture':
        return <Palette size={size} />
      case 'crime':
        return <ShieldAlert size={size} />
      default:
        return <ShieldAlert size={size} />
    }
  }

  // Custom SVG Graphic Renderers for each category
  const renderChart = () => {
    switch (activeTab) {
      case 'social': {
        // DIW Tax Benefits Bar Chart
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
      case 'economy': {
        // Funke et al GDP divergence Line Chart
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
                <text x="10" y="34" className="text-[9px] fill-neutral-500 font-semibold">120%</text>
                <text x="10" y="84" className="text-[9px] fill-neutral-500 font-semibold">110%</text>
                <text x="10" y="134" className="text-[9px] fill-neutral-500 font-semibold">100%</text>

                {/* X Axis Timeline Markers */}
                <line x1="50" y1="130" x2="360" y2="130" stroke="#374151" />
                <text x="50" y="148" textAnchor="middle" className="text-[8px] fill-neutral-500 font-semibold">Year 0</text>
                <text x="153" y="148" textAnchor="middle" className="text-[8px] fill-neutral-500 font-semibold">Year 5</text>
                <text x="256" y="148" textAnchor="middle" className="text-[8px] fill-neutral-500 font-semibold">Year 10</text>
                <text x="360" y="148" textAnchor="middle" className="text-[8px] fill-neutral-500 font-semibold">Year 15</text>

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
                />

                {/* Divergence gap label */}
                <line x1="360" y1="40" x2="360" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="338" y="53" width="44" height="18" rx="4" className="fill-red-950/90 stroke-red-500/30" />
                <text x="360" y="66" textAnchor="middle" className="text-[9px] fill-red-400 font-black">-10%</text>

                {/* Chart Legends */}
                <g transform="translate(60, 162)">
                  <line x1="0" y1="4" x2="15" y2="4" stroke="#4b5563" strokeWidth="2.5" />
                  <text x="22" y="8" className="text-[8px] fill-neutral-400 font-semibold">{ui.gdpControlLine}</text>

                  <line x1="170" y1="4" x2="185" y2="4" stroke="#ef4444" strokeWidth="3" />
                  <text x="192" y="8" className="text-[8px] fill-red-400 font-bold">{ui.gdpPopulistLine}</text>
                </g>
              </svg>
            </div>
          </div>
        )
      }
      case 'press': {
        // RSF Press Freedom Comparison
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
      case 'culture': {
        // 100% court dismissal circular gauge
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
                <text x="60" y="58" textAnchor="middle" className="text-[18px] fill-white font-black">100%</text>
                <text x="60" y="74" textAnchor="middle" className="text-[8px] fill-red-400 font-extrabold uppercase tracking-wide">
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
      case 'crime': {
        // BKA Crime comparison bar chart
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
      default:
        return null
    }
  }

  return (
    <section id="risiken" className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all">
      {/* Glow highlight */}
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-red-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
            <ShieldAlert size={12} />
            Focus Point
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-neutral-400 max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Subnavigation (Left Panel on large screen, Top Panel on small screen) */}
          <div className="flex flex-row overflow-x-auto gap-2 pb-2 lg:pb-0 lg:flex-col lg:overflow-x-visible lg:col-span-4 shrink-0 border-b border-neutral-900 lg:border-b-0 lg:border-r lg:border-neutral-900/60 lg:pr-4 scrollbar-thin">
            {data.map((item) => {
              const isActive = item.id === activeTab
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 shrink-0 text-left cursor-pointer border ${
                    isActive 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 font-bold shadow-lg shadow-red-950/20' 
                      : 'bg-neutral-900/30 border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 hover:border-neutral-800'
                  }`}
                  type="button"
                >
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-red-500/20 text-red-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    {getTabIcon(item.id, 16)}
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              )
            })}
          </div>

          {/* Details Content (Right Panel) */}
          <div className="lg:col-span-8 space-y-6 min-h-[360px] flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              
              {/* Header inside Panel: Title & Segmented Control */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {activeData.title}
                  </h3>
                  <div className="inline-block">
                    <div className="flex items-center gap-1.5 rounded-lg bg-red-500/5 border border-red-500/10 px-2.5 py-1 text-xs font-bold text-red-400 shadow-inner">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      {activeData.metric}
                    </div>
                  </div>
                </div>

                {/* View Mode Toggle Switch */}
                <div className="inline-flex rounded-xl bg-neutral-900/80 p-1 border border-neutral-800 shrink-0">
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'chart'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-inner'
                        : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
                    }`}
                  >
                    {ui.viewChart}
                  </button>
                  <button
                    onClick={() => setViewMode('text')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'text'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-inner'
                        : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
                    }`}
                  >
                    {ui.viewText}
                  </button>
                </div>
              </div>

              {/* Toggle Content rendering */}
              <div className="min-h-[220px] flex items-center justify-center">
                {viewMode === 'chart' ? (
                  renderChart()
                ) : (
                  <div className="space-y-4 w-full">
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {activeData.description}
                    </p>
                    <ul className="space-y-3 pt-2">
                      {activeData.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-950/50 text-red-500">
                            <ArrowRight size={10} />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

            {/* Source & Citation Footer Card */}
            <div className="mt-6 rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-neutral-500 shrink-0">
                  <Bookmark size={18} />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                    {sourceLabel}
                  </span>
                  <p className="text-xs font-semibold text-neutral-300">
                    {activeData.citation}
                  </p>
                </div>
              </div>
              
              <a
                href={activeData.citationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-red-400 transition-all border border-neutral-800 bg-neutral-900/60 hover:border-red-500/20 px-3 py-1.5 rounded-lg shrink-0"
              >
                <span>Link</span>
                <ExternalLink size={10} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
