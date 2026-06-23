import { useState, useEffect, useRef, useCallback } from 'react'
import { CircleHelp, ExternalLink, Paintbrush, ToggleLeft, ToggleRight } from 'lucide-react'
import type { PollBar } from '../polling'
import type { Locale, Translation } from '../i18n'

interface DemoProps {
  lang: Locale
  t: Translation
  bars: PollBar[]
  sourceInfo: string
  isLivePollData: boolean
  standInfo: string
  sourceUrl: string
  sourceMethodUrl: string
  isBrownActive: boolean
  onToggleBrown: () => void
}

export function InteractiveDemoSection({ lang, t, bars, sourceInfo, isLivePollData, standInfo, sourceUrl, sourceMethodUrl, isBrownActive, onToggleBrown }: DemoProps) {
  const [isInstituteInfoOpen, setIsInstituteInfoOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [animatedAfdPct, setAnimatedAfdPct] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasStartedDrainRef = useRef(false)

  const afdBar = bars.find((bar) => bar.isAfd)
  const originalAfdPct = afdBar?.pct ?? 0

  // When brown is activated, start a timer that slowly drains the AfD value
  useEffect(() => {
    if (isBrownActive && !hasStartedDrainRef.current) {
      hasStartedDrainRef.current = true

      const totalDuration = 300000 // 5 minutes in milliseconds
      const intervalMs = 50
      const totalTicks = totalDuration / intervalMs
      const decrementStep = (originalAfdPct - 0.5) / totalTicks

      // Small delay before starting the drain for dramatic effect
      const startDelay = setTimeout(() => {
        setAnimatedAfdPct(originalAfdPct)
        timerRef.current = setInterval(() => {
          setAnimatedAfdPct((prev) => {
            if (prev === null) return null
            const next = prev - decrementStep
            if (next <= 0.5) {
              if (timerRef.current) clearInterval(timerRef.current)
              return 0.5
            }
            return next
          })
        }, intervalMs)
      }, 600)

      return () => {
        clearTimeout(startDelay)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }

    if (!isBrownActive) {
      hasStartedDrainRef.current = false
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      
      const resetTimeout = setTimeout(() => {
        setAnimatedAfdPct(null)
      }, 0)

      return () => {
        clearTimeout(resetTimeout)
      }
    }
  }, [isBrownActive, originalAfdPct])

  // Compute the displayed AfD percentage
  const displayAfdPct = isBrownActive && animatedAfdPct !== null ? animatedAfdPct : originalAfdPct

  // Redistribute drained AfD points to SPD, Grüne, Linke, Sonstige (not CDU)
  const drainedPoints = originalAfdPct - displayAfdPct
  const recipientKeys = new Set(['spd', 'greens', 'left', 'others'])
  const recipientTotal = bars
    .filter((bar) => recipientKeys.has(bar.key))
    .reduce((sum, bar) => sum + bar.pct, 0)

  const displayBars = bars.map((bar) => {
    if (bar.isAfd) {
      return { ...bar, pct: displayAfdPct }
    }
    if (drainedPoints > 0 && recipientKeys.has(bar.key) && recipientTotal > 0) {
      const share = bar.pct / recipientTotal
      return { ...bar, pct: Math.round((bar.pct + drainedPoints * share) * 10) / 10 }
    }
    return { ...bar }
  })

  const maxPct = Math.max(...displayBars.map((bar) => bar.pct), 1)

  // Compute "all others" combined percentage (from display bars, so it includes redistributed values)
  const othersCombinedPct = displayBars
    .filter((bar) => !bar.isAfd)
    .reduce((sum, bar) => sum + bar.pct, 0)

  // For the comparison view, the max needs to account for the combined bar
  const comparisonMax = Math.max(othersCombinedPct, displayAfdPct, 1)

  const toggleComparison = useCallback(() => {
    setShowComparison((prev) => !prev)
  }, [])

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl md:p-8">
      <div className="absolute top-0 right-0 p-4">
        <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">{t.demoSandbox}</span>
      </div>
      <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
        <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
      </h2>
      <p className="text-sm leading-relaxed text-neutral-400">{t.demoDesc}</p>
      <div className="mb-6 mt-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-200">{t.demoSourceLabel}:</span>
          <button
            onClick={() => setIsInstituteInfoOpen((current) => !current)}
            aria-expanded={isInstituteInfoOpen}
            aria-controls="institute-help-popover"
            className="inline-flex min-h-8 items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold uppercase text-neutral-300 transition-colors hover:border-blue-500/40 hover:text-blue-300"
            type="button"
          >
            <CircleHelp size={11} /> {t.demoSourceWhyInstituteLabel}
          </button>
          <span>{sourceInfo}</span>
          <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-300">
            {isLivePollData ? t.demoSourceLive : t.demoSourceFallback}
          </span>
        </div>
        {isInstituteInfoOpen && (
          <div
            id="institute-help-popover"
            className="mt-2 rounded-lg border border-blue-500/20 bg-blue-950/20 px-3 py-2 text-xs leading-relaxed text-neutral-300"
          >
            {t.demoSourceWhyInstituteTooltip}
          </div>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-200">{t.demoSourceStand}:</span>
          <span>{standInfo}</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold tracking-wide text-neutral-300 uppercase transition-colors hover:border-blue-500/40 hover:text-blue-300"
          >
            {t.demoSourceButton} <ExternalLink size={12} />
          </a>
          <a
            href={sourceMethodUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold tracking-wide text-neutral-300 uppercase transition-colors hover:border-blue-500/40 hover:text-blue-300"
          >
            API <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Dream scenario banner — visible when brown is active */}
      {isBrownActive && (
        <div className="dream-banner mb-4 animate-in rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 px-4 py-3 text-center">
          <p className="text-sm font-black tracking-wide text-amber-300 uppercase">
            ✨ {t.dreamBanner} ✨
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-400/70">
            {t.dreamBody}
          </p>
        </div>
      )}

      {/* Main bar chart */}
      <div className="mb-4 rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8">
        <div className="relative flex h-56 items-end justify-between border-b border-neutral-800 pb-2 md:h-64">
          {displayBars.map((bar, index) => {
            const heightPx = Math.round((bar.pct / maxPct) * 200)
            const barColor = bar.isAfd
              ? (isBrownActive
                  ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40'
                  : bar.defaultColor)
              : bar.defaultColor
            const label = lang === 'de' ? bar.labelDe : bar.labelEn
            const pctLabel = Number.isInteger(bar.pct) ? String(bar.pct) : bar.pct.toFixed(1)

            return (
              <div key={index} className="flex w-1/6 flex-col items-center">
                <span className={`mb-2 text-xs font-bold ${bar.isAfd ? 'font-black text-white' : 'text-neutral-400'}`}>{pctLabel} %</span>
                <button
                  onClick={bar.isAfd ? () => onToggleBrown() : undefined}
                  className={`w-full rounded-t-md transition-all duration-700 ${barColor} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''}`}
                  style={{ height: `${heightPx}px` }}
                  aria-label={bar.isAfd ? (isBrownActive ? t.demoReset : t.demoSwitch) : label}
                  disabled={!bar.isAfd}
                  type="button"
                />
                <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs ${bar.isAfd ? (isBrownActive ? 'font-black text-amber-500' : 'font-black text-cyan-400') : 'text-neutral-500'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparison toggle */}
      <div className="mb-6 flex items-center justify-center">
        <button
          onClick={toggleComparison}
          className="group inline-flex items-center gap-3 rounded-xl border border-neutral-700/60 bg-neutral-900/80 px-5 py-3 text-sm font-semibold text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800/80 hover:text-white"
          type="button"
          aria-pressed={showComparison}
          id="comparison-toggle"
        >
          {showComparison
            ? <ToggleRight size={28} className="text-emerald-400 transition-colors" />
            : <ToggleLeft size={28} className="text-neutral-500 transition-colors group-hover:text-neutral-300" />
          }
          <span>{t.comparisonToggle}</span>
        </button>
      </div>

      {/* Comparison bars: AfD vs All Others */}
      {showComparison && (
        <div className="mb-6 overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8 animate-in">
          <p className="mb-4 text-center text-xs font-bold tracking-wider text-neutral-400 uppercase">
            {t.comparisonTitle}
          </p>
          <div className="flex items-end justify-center gap-8 sm:gap-16" style={{ height: '240px' }}>
            {/* AfD bar */}
            <div className="flex flex-col items-center" style={{ width: '120px' }}>
              <span className="mb-2 text-lg font-black text-white">{displayAfdPct.toFixed(1)} %</span>
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${isBrownActive ? 'shadow-lg shadow-amber-950/40' : 'shadow-lg shadow-cyan-500/20'}`}
                style={{
                  height: `${Math.round((displayAfdPct / comparisonMax) * 200)}px`,
                  background: isBrownActive
                    ? 'linear-gradient(to top, #78350f, #92400e, #b45309)'
                    : 'linear-gradient(to top, #06b6d4, #22d3ee)',
                  borderTop: isBrownActive ? '3px solid #d97706' : '3px solid #67e8f9',
                }}
              />
              <span className={`mt-3 text-sm font-black ${isBrownActive ? 'text-amber-500' : 'text-cyan-400'}`}>
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
      )}

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase">{t.demoOption}</span>
          <span className="text-sm font-bold text-neutral-200">{t.demoQuestion}</span>
        </div>
        <button
          onClick={onToggleBrown}
          className={`w-full rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all sm:w-auto ${isBrownActive ? 'border border-amber-800/50 bg-amber-900 text-amber-200 hover:bg-amber-800' : 'border border-blue-500/30 bg-blue-600 text-blue-100 hover:bg-blue-500'}`}
          type="button"
        >
          {isBrownActive ? t.demoReset : t.demoSwitch}
        </button>
      </div>
    </section>
  )
}
