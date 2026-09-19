import { useState } from 'react'
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

const normalizeCitationUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
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
  const viewLabel = t.dangersViewLabel
  const activeData = data.find((item) => item.id === activeTab) || data[0]
  const safeCitationUrl = normalizeCitationUrl(activeData.citationUrl)
  const archiveCitationUrl = safeCitationUrl
    ? `https://archive.ph/${encodeURIComponent(safeCitationUrl)}`
    : null

  const handlePrevSlide = () => {
    const currentIndex = data.findIndex((item) => item.id === activeTab)
    const prevIndex = (currentIndex - 1 + data.length) % data.length
    setActiveTab(data[prevIndex].id)
    setViewMode('chart')
  }

  const handleNextSlide = () => {
    const currentIndex = data.findIndex((item) => item.id === activeTab)
    const nextIndex = (currentIndex + 1) % data.length
    setActiveTab(data[nextIndex].id)
    setViewMode('chart')
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleNextSlide()
    } else if (isRightSwipe) {
      handlePrevSlide()
    }
  }



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
    <section id="risiken" className="p-6 md:p-8 space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-6 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 tracking-widest uppercase flex items-center gap-1.5">
              <ShieldAlert size={14} />
              03 / FOKUSBERICHT & EMPIRISCHE ANALYSE
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)] max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Desktop Tab Layout Grid */}
        <div className="hidden lg:grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Subnavigation (Left Panel) */}
          <div className="lg:col-span-4 flex flex-col gap-1 shrink-0 border-r border-[var(--border)] pr-4">
            {data.map((item) => {
              const isActive = item.id === activeTab
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setViewMode('chart')
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold transition-colors shrink-0 text-left cursor-pointer border ${
                    isActive 
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-500 font-bold' 
                      : 'bg-transparent border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                  type="button"
                >
                  <span className={`p-1 ${isActive ? 'text-rose-500' : 'text-[var(--text-muted)]'}`}>
                    {getTabIcon(item.id, 16)}
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              )
            })}
          </div>

          {/* Details Content (Right Panel) */}
          <div className="lg:col-span-8 space-y-6 min-h-[360px] flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Header inside Panel: Title & Segmented Control */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                    {activeData.title}
                  </h3>
                  <div className="inline-block">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-rose-500 uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                      {activeData.metric}
                    </div>
                  </div>
                </div>

                {/* View Mode Toggle Switch */}
                <div className="inline-flex border border-[var(--border)] bg-[var(--bg-secondary)] p-0.5 shrink-0 font-mono text-xs">
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                      viewMode === 'chart'
                        ? 'bg-[var(--bg-primary)] text-rose-500 border border-[var(--border)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent'
                    }`}
                  >
                    {ui.viewChart}
                  </button>
                  <button
                    onClick={() => setViewMode('text')}
                    className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                      viewMode === 'text'
                        ? 'bg-[var(--bg-primary)] text-rose-500 border border-[var(--border)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent'
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
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {activeData.description}
                    </p>
                    <ul className="space-y-3 pt-2">
                      {activeData.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center text-rose-500 font-bold">
                            <ArrowRight size={12} />
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
            <div className="mt-6 border border-[var(--border)] bg-[var(--bg-secondary)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[var(--text-muted)] shrink-0">
                  <Bookmark size={16} />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {sourceLabel}
                  </span>
                  <p className="text-xs font-semibold text-[var(--text-primary)] font-sans">
                    {activeData.citation}
                  </p>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 shrink-0 text-xs">
                {safeCitationUrl && (
                  <a
                    href={safeCitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 font-bold text-[var(--text-primary)] hover:text-rose-500 transition-colors px-3 py-1"
                  >
                    <span>Original</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {archiveCitationUrl && (
                  <a
                    href={archiveCitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 font-bold text-[var(--text-primary)] hover:text-rose-500 transition-colors px-3 py-1"
                  >
                    <span>Archive</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel Layout (visible on mobile/tablet, hidden on desktop) */}
        <div className="block lg:hidden space-y-4">
          <div 
            className="flex flex-col justify-between min-h-[420px] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Card Header */}
            <div className="border-b border-[var(--border)] pb-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="p-2 border border-[var(--border)] bg-[var(--bg-secondary)] text-rose-500 shrink-0">
                  {getTabIcon(activeTab, 20)}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight truncate">
                  {activeData.title}
                </h3>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-rose-500 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="truncate">{activeData.metric}</span>
                </span>
              </div>
            </div>

            {/* View Mode Toggle Controls */}
            <div className="mt-4 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {viewLabel}
              </span>
              <div className="inline-flex border border-[var(--border)] bg-[var(--bg-secondary)] p-0.5 shrink-0 font-mono text-xs">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                    viewMode === 'chart'
                      ? 'bg-[var(--bg-primary)] text-rose-500 border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent'
                  }`}
                >
                  {ui.viewChart}
                </button>
                <button
                  onClick={() => setViewMode('text')}
                  className={`px-3 py-1 font-bold transition-colors cursor-pointer ${
                    viewMode === 'text'
                      ? 'bg-[var(--bg-primary)] text-rose-500 border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent'
                  }`}
                >
                  {ui.viewText}
                </button>
              </div>
            </div>

            {/* Interactive Chart/Text Area */}
            <div className="py-4 flex-grow flex items-center justify-center min-h-[220px]">
              {viewMode === 'chart' ? (
                renderChart()
              ) : (
                <div className="space-y-4 w-full">
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    {activeData.description}
                  </p>
                  <ul className="space-y-2.5 pt-1">
                    {activeData.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-rose-500 font-bold">
                          <ArrowRight size={10} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Citation Card */}
            <div className="border border-[var(--border)] bg-[var(--bg-secondary)] p-3.5 flex flex-col gap-3 font-mono">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[var(--text-muted)] shrink-0">
                  <Bookmark size={16} />
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wide">
                    {sourceLabel}
                  </span>
                  <p className="text-[11px] font-semibold text-[var(--text-primary)] font-sans truncate">
                    {activeData.citation}
                  </p>
                </div>
              </div>
              <div className={`grid w-full gap-2 ${safeCitationUrl && archiveCitationUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {safeCitationUrl && (
                  <a
                    href={safeCitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-rose-500 transition-colors py-1.5"
                  >
                    <span>Original</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {archiveCitationUrl && (
                  <a
                    href={archiveCitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-rose-500 transition-colors py-1.5"
                  >
                    <span>Archive</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>

            {/* Carousel Navigation Toolbar */}
            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 font-mono">
              <button
                onClick={handlePrevSlide}
                className="flex items-center justify-center p-2 border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Previous Danger Slide"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>

              <div className="flex gap-2">
                {data.map((item, idx) => {
                  const isActive = item.id === activeTab
                  return (
                    <button
                      key={`dot-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id)
                        setViewMode('chart')
                      }}
                      className={`h-1.5 transition-all duration-300 cursor-pointer ${
                        isActive ? 'w-6 bg-rose-500' : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                      }`}
                      aria-label={`Go to danger slide ${idx + 1}`}
                    />
                  )
                })}
              </div>

              <button
                onClick={handleNextSlide}
                className="flex items-center justify-center p-2 border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Next Danger Slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
