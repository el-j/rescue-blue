import { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingDown, 
  Newspaper, 
  Palette, 
  ExternalLink, 
  ShieldAlert,
  ArrowRight,
  Bookmark,
  Globe
} from 'lucide-react'
import { getPolicyDangers, getPolicyDangersUI } from '../i18n'
import type { Locale, Translation } from '../i18n'
import { SocialChart } from './charts/SocialChart'
import { EconomyChart } from './charts/EconomyChart'
import { PressChart } from './charts/PressChart'
import { CultureChart } from './charts/CultureChart'
import { CrimeChart } from './charts/CrimeChart'
import { AlliancesChart } from './charts/AlliancesChart'

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
      case 'alliances':
        return <Globe size={size} />
      default:
        return <ShieldAlert size={size} />
    }
  }

  // Custom SVG Graphic Renderers for each category
  const renderChart = () => {
    switch (activeTab) {
      case 'social':
        return <SocialChart ui={ui} />
      case 'economy':
        return <EconomyChart ui={ui} />
      case 'press':
        return <PressChart ui={ui} />
      case 'culture':
        return <CultureChart ui={ui} />
      case 'crime':
        return (
          <CrimeChart 
            ui={ui} 
            lang={lang} 
            crimeToggle={crimeToggle} 
            setCrimeToggle={setCrimeToggle} 
          />
        )
      case 'alliances':
        return <AlliancesChart ui={ui} lang={lang} />
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
