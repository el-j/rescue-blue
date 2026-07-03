import { useState, useEffect, useRef, useCallback } from 'react'
import { Paintbrush } from 'lucide-react'
import type { PollBar, ParliamentsSnapshot } from '../polling'
import type { Locale, Translation } from '../i18n'
import { DemoSourceInfo } from './demo/DemoSourceInfo'
import { GermanyMap } from './demo/GermanyMap'

interface DemoProps {
  lang: Locale
  t: Translation
  bars: PollBar[]
  sourceInfo: string
  isLivePollData: boolean
  standInfo: string
  sourceUrl: string
  sourceMethodUrl: string
  sandboxState: 'default' | 'brown' | 'dream'
  onCycleSandboxState: () => void
  instituteName?: string
  selectedStateId: string
  onSelectStateId: (id: string) => void
  pollingSnapshot: ParliamentsSnapshot | null
}

export function InteractiveDemoSection({
  lang,
  t,
  bars,
  sourceInfo,
  isLivePollData,
  standInfo,
  sourceUrl,
  sourceMethodUrl,
  sandboxState,
  onCycleSandboxState,
  instituteName,
  selectedStateId,
  onSelectStateId,
  pollingSnapshot,
}: DemoProps) {
  const isBrownActive = sandboxState === 'brown' || sandboxState === 'dream'
  const isDreamActive = sandboxState === 'dream'
  const [isInstituteInfoOpen, setIsInstituteInfoOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [dreamProgress, setDreamProgress] = useState<number | null>(null)
  const hasStartedDreamRef = useRef(false)
  const sandboxRef = useRef<HTMLDivElement>(null)
  const [isSandboxInView, setIsSandboxInView] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSandboxInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (sandboxRef.current) {
      observer.observe(sandboxRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 4500)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const handleCycleSandboxState = () => {
    let msg: string
    if (sandboxState === 'default') {
      msg = lang === 'de'
        ? '⚠️ Mehrheits-Check: Farbige Markierung der Bundesländer nach der jeweils stärksten Kraft (AfD-Mehrheiten in Braun).'
        : '⚠️ Plurality Check: States colored by their current majority party (AfD pluralities in Brown).'
    } else if (sandboxState === 'brown') {
      msg = lang === 'de'
        ? '✨ Traum-Vision: Ein demokratisches, progressives Ergebnis (Grüne und Linke gleichauf bei 26%) ohne Rechtsextremismus.'
        : '✨ Progressive Dream: A democratic progressive majority (Greens and Left equal at 26%) without right-wing extremism.'
    } else {
      msg = lang === 'de'
        ? '🇩🇪 Standard-Modus: Aktuelle offizielle Umfrageergebnisse der Wahlforschungsinstitute.'
        : '🇩🇪 Default Mode: Current official polling results from research institutes.'
    }
    onCycleSandboxState()
    setToastMessage(msg)
  }

  const afdBar = bars.find((bar) => bar.isAfd)
  const originalAfdPct = afdBar?.pct ?? 0

  const cduBar = bars.find((bar) => bar.key === 'cdu')
  const originalCduPct = cduBar?.pct ?? 0

  const totalDuration = 60000 // 60 seconds (1 minute) in milliseconds

  // When dream state is activated, start a requestAnimationFrame loop that updates progress based on system time
  useEffect(() => {
    let animationFrameId: number | null = null
    let startDelayId: ReturnType<typeof setTimeout> | null = null

    if (isDreamActive && !hasStartedDreamRef.current) {
      hasStartedDreamRef.current = true
      setDreamProgress(0)

      // Small delay before starting the drain for dramatic effect
      startDelayId = setTimeout(() => {
        const startTime = Date.now()

        const tick = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / totalDuration, 1)
          setDreamProgress(progress)

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(tick)
          }
        }
        animationFrameId = requestAnimationFrame(tick)
      }, 600)
    }

    return () => {
      if (startDelayId) clearTimeout(startDelayId)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)

      if (!isDreamActive) {
        hasStartedDreamRef.current = false
        setDreamProgress(null)
      }
    }
  }, [isDreamActive])

  // Compute the displayed percentages
  let displayBarsRaw = bars.map((bar) => ({ ...bar }))

  if (isDreamActive && dreamProgress !== null) {
    const progress = dreamProgress

    if (progress < 0.8) {
      // Normal drain transition logic up to progress 0.8
      const displayAfdPct = originalAfdPct - (originalAfdPct - 0.5) * progress
      let displayCduPct = originalCduPct
      if (originalCduPct > 20) {
        displayCduPct = originalCduPct - (originalCduPct - 20) * progress
      }

      const drainedPoints = (originalAfdPct - displayAfdPct) + (originalCduPct - displayCduPct)
      const recipientKeys = new Set(['spd', 'greens', 'left', 'others'])
      const recipientTotal = bars
        .filter((bar) => recipientKeys.has(bar.key))
        .reduce((sum, bar) => sum + bar.pct, 0)

      displayBarsRaw = bars.map((bar) => {
        if (bar.isAfd) {
          return { ...bar, pct: displayAfdPct }
        }
        if (bar.key === 'cdu') {
          return { ...bar, pct: displayCduPct }
        }
        if (drainedPoints > 0 && recipientKeys.has(bar.key) && recipientTotal > 0) {
          const share = bar.pct / recipientTotal
          return { ...bar, pct: bar.pct + drainedPoints * share }
        }
        return { ...bar }
      })
    } else {
      // Transition from progress 0.8 state to final target state at progress 1.0
      // 1. Calculate Phase 1 state at progress = 0.8
      const displayAfdPctAt08 = originalAfdPct - (originalAfdPct - 0.5) * 0.8
      let displayCduPctAt08 = originalCduPct
      if (originalCduPct > 20) {
        displayCduPctAt08 = originalCduPct - (originalCduPct - 20) * 0.8
      }

      const drainedPointsAt08 = (originalAfdPct - displayAfdPctAt08) + (originalCduPct - displayCduPctAt08)
      const recipientKeys = new Set(['spd', 'greens', 'left', 'others'])
      const recipientTotal = bars
        .filter((bar) => recipientKeys.has(bar.key))
        .reduce((sum, bar) => sum + bar.pct, 0)

      const p1Bars = bars.map((bar) => {
        if (bar.isAfd) {
          return { ...bar, pct: displayAfdPctAt08 }
        }
        if (bar.key === 'cdu') {
          return { ...bar, pct: displayCduPctAt08 }
        }
        if (drainedPointsAt08 > 0 && recipientKeys.has(bar.key) && recipientTotal > 0) {
          const share = bar.pct / recipientTotal
          return { ...bar, pct: bar.pct + drainedPointsAt08 * share }
        }
        return { ...bar }
      })

      // 2. Define target percentages at progress = 1.0 (CDU at 10%, SPD at 10%, Greens & Left at 35% each, Others at 10%)
      const targetMap: Record<string, number> = {
        afd: 0.0,
        cdu: 10.0,
        spd: 10.0,
        greens: 35.0,
        left: 35.0,
        others: 10.0,
      }

      // 3. Interpolate between p1Bars and targetMap
      const p2 = (progress - 0.8) / 0.2 // goes from 0.0 to 1.0
      displayBarsRaw = p1Bars.map((bar) => {
        const startVal = bar.pct
        const endVal = targetMap[bar.key] ?? bar.pct
        return {
          ...bar,
          pct: startVal + (endVal - startVal) * p2,
        }
      })
    }
  }

  const displayAfdPct = displayBarsRaw.find((b) => b.isAfd)?.pct ?? originalAfdPct
  const cduBrownFactor = isDreamActive ? Math.min(Math.max((5.0 - displayAfdPct) / 5.0, 0), 1) : 0

  // Round values to 1 decimal place
  const displayBarsAll = displayBarsRaw.map((bar) => {
    return { ...bar, pct: Math.round(bar.pct * 10) / 10 }
  })

  // Adjust for rounding errors to ensure the sum of displayBarsAll matches targetSum exactly
  const currentSum = Math.round(displayBarsAll.reduce((sum, b) => sum + b.pct, 0) * 10) / 10
  const targetSum = Math.round(bars.reduce((sum, b) => sum + b.pct, 0) * 10) / 10
  const diff = Math.round((targetSum - currentSum) * 10) / 10

  if (diff !== 0) {
    const othersBar = displayBarsAll.find((b) => b.key === 'others')
    if (othersBar) {
      othersBar.pct = Math.round((othersBar.pct + diff) * 10) / 10
    }
  }

  // Filter out parties if their percentage is 0 (at the end of dream state, keeping others)
  const displayBars = displayBarsAll.filter((bar) => !(bar.pct <= 0 && bar.key !== 'others'))

  const maxPct = Math.max(...displayBars.map((bar) => bar.pct), 1)

  // Compute "all others" combined percentage (from display bars, so it includes redistributed values)
  const othersCombinedPct = displayBars
    .filter((bar) => !bar.isAfd)
    .reduce((sum, bar) => sum + bar.pct, 0)

  // For the comparison view, the max needs to account for the combined bar
  const comparisonMax = Math.max(othersCombinedPct, displayAfdPct, 1)

  const isAfdBrown = isBrownActive || isDreamActive

  const toggleComparison = useCallback(() => {
    setShowComparison((prev) => !prev)
  }, [])

  return (
    <section ref={sandboxRef} className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5 shadow-xl md:p-8">
      {/* Top-right: SANDBOX badge + desktop controls toolbar */}
      <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
        {/* Desktop-only inline controls toolbar */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-1 shadow-sm">
          {/* Mode status */}
          <span className="pl-2.5 pr-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] border-r border-[var(--border)]">
            {sandboxState === 'default'
              ? (lang === 'de' ? 'Standard' : 'Default')
              : sandboxState === 'brown'
              ? (lang === 'de' ? 'Warnung' : 'Warning')
              : (lang === 'de' ? 'Traum' : 'Dream')}
          </span>
          {/* Cycle mode */}
          <button
            onClick={handleCycleSandboxState}
            className={`p-1.5 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 cursor-pointer ${
              sandboxState === 'default'
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20'
                : sandboxState === 'brown'
                ? 'bg-amber-600/10 border-amber-500/30 text-amber-400 hover:bg-amber-600/20'
                : 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20'
            }`}
            title={lang === 'de' ? 'Visualisierungs-Option wechseln' : 'Switch visualization mode'}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/>
              <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/>
            </svg>
          </button>
          {/* Comparison toggle */}
          <button
            onClick={toggleComparison}
            className={`p-1.5 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 cursor-pointer ${
              showComparison
                ? 'bg-purple-600/20 border-purple-500/40 text-purple-400 hover:bg-purple-600/30 shadow-inner'
                : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title={lang === 'de' ? 'Mehrheit umschalten' : 'Toggle majority chart'}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="10" width="4" height="10" rx="1" />
            </svg>
          </button>
        </div>
        {/* Badge */}
        <span className="rounded border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase">{t.demoSandbox}</span>
      </div>
      <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-[var(--text-primary)] uppercase md:text-2xl">
        <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
      </h2>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{t.demoDesc}</p>
      <DemoSourceInfo
        t={t}
        instituteName={instituteName}
        isInstituteInfoOpen={isInstituteInfoOpen}
        setIsInstituteInfoOpen={setIsInstituteInfoOpen}
        sourceInfo={sourceInfo}
        isLivePollData={isLivePollData}
        standInfo={standInfo}
        sourceUrl={sourceUrl}
        sourceMethodUrl={sourceMethodUrl}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:items-stretch mt-4">
        
        {/* Left Column: Germany Map & state details */}
        <div className="md:col-span-5 flex flex-col items-center gap-4 h-full">
          <div className="text-center md:text-left w-full space-y-1">
            <h3 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wider flex items-center justify-center md:justify-start">
              {t.mapHeadline}
            </h3>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              {t.mapSub}
            </p>
          </div>

          {/* Interactive Map */}
          <GermanyMap
            selectedStateId={selectedStateId}
            onSelectStateId={onSelectStateId}
            pollingSnapshot={pollingSnapshot}
            sandboxState={sandboxState}
            dreamProgress={dreamProgress}
            lang={lang}
          />
        </div>

        {/* Right Column: Bar Chart & Controls */}
        <div className="md:col-span-7 flex flex-col h-full justify-between space-y-6 md:border-l md:border-[var(--border)] md:pl-6">
          {/* Dream scenario banner — visible when dreamstate is active */}
          {isDreamActive && (
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
          <div className="h-full flex flex-col justify-between flex-grow">
            <div className="relative flex flex-grow h-full min-h-[310px] items-end justify-around border-b border-[var(--border)] pb-2">
              {showComparison ? (
                <>
                  {/* AfD Column */}
                  <div className="flex flex-col items-center justify-end h-full transition-all duration-500 animate-in" style={{ width: '40%' }}>
                    <span className="mb-2 text-xs font-bold text-[var(--text-primary)]">{(displayAfdPct > 0 ? displayAfdPct : 0).toFixed(1)} %</span>
                    <div
                      className={`w-16 rounded-t-md transition-all duration-700 ${isAfdBrown ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40' : 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20'}`}
                      style={{ height: `${((displayAfdPct > 0 ? displayAfdPct : 0) / comparisonMax) * 85}%` }}
                    />
                    <span className={`mt-2 text-[10px] font-black tracking-wide md:text-xs ${isAfdBrown ? 'text-amber-500' : 'text-cyan-400'}`}>
                      AfD
                    </span>
                  </div>

                  {/* All Others Column */}
                  <div className="flex flex-col items-center justify-end h-full transition-all duration-500 animate-in" style={{ width: '40%' }}>
                    <span className="mb-2 text-xs font-bold text-[var(--text-primary)]">{othersCombinedPct.toFixed(1)} %</span>
                    <div
                      className="w-16 rounded-t-md transition-all duration-700 rainbow-bar shadow-lg"
                      style={{ height: `${(othersCombinedPct / comparisonMax) * 85}%`, borderTop: '2px solid rgba(255,255,255,0.5)' }}
                    />
                    <span className="mt-2 text-[10px] font-black tracking-wide md:text-xs rainbow-text">
                      {t.allOthersLabel}
                    </span>
                  </div>
                </>
              ) : (
                displayBars.map((bar, index) => {
                  const barColor = bar.isAfd
                    ? (isAfdBrown
                        ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40'
                        : bar.defaultColor)
                    : bar.defaultColor
                  const label = lang === 'de' ? bar.labelDe : bar.labelEn
                  const pctLabel = Number.isInteger(bar.pct) ? String(bar.pct) : bar.pct.toFixed(1)

                  return (
                    <div key={index} className="flex flex-col items-center justify-end h-full transition-all duration-500" style={{ width: `${100 / displayBars.length}%` }}>
                      <span className={`mb-2 text-xs font-bold ${bar.isAfd ? 'font-black text-[var(--text-primary)]' : 'text-neutral-400'}`}>{pctLabel} %</span>
                      <button
                        onClick={bar.isAfd ? () => handleCycleSandboxState() : undefined}
                        className={`relative w-full rounded-t-md overflow-hidden transition-all duration-700 ${barColor} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''} ${bar.key === 'cdu' ? 'cdu-bar' : ''}`}
                        style={{ height: `${(bar.pct / maxPct) * 85}%` }}
                        aria-label={bar.isAfd ? (sandboxState === 'default' ? t.demoSwitch : sandboxState === 'brown' ? t.demoDreamSwitch : t.demoReset) : label}
                        disabled={!bar.isAfd}
                        type="button"
                      >
                        {bar.key === 'cdu' && isDreamActive && (
                          <>
                            <div
                              className="absolute inset-0 bg-[linear-gradient(to_top,#140b02,#2a180a)] pointer-events-none"
                              style={{ opacity: cduBrownFactor }}
                            />
                            <div
                              className="absolute top-0 left-0 right-0 h-[2px] bg-amber-900/50 pointer-events-none"
                              style={{ opacity: cduBrownFactor }}
                            />
                          </>
                        )}
                      </button>
                      <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs text-center ${bar.isAfd ? (isAfdBrown ? 'font-black text-amber-500' : 'font-black text-cyan-400') : 'text-[var(--text-muted)]'}`}>
                        {label}
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            {/* Ratio message displayed inline below comparison bars */}
            {showComparison && (
              <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-4 py-2 text-center animate-in">
                <p className="text-xs font-bold text-emerald-300">
                  {(othersCombinedPct / Math.max(displayAfdPct, 0.1)).toFixed(1)}{t.comparisonRatio}
                </p>
                <p className="mt-0.5 text-[10px] text-emerald-400/70">
                  {t.comparisonMessage}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile-only: Sticky Flying Controls Toolbar (hidden on md+, which uses the top-right inline toolbar) */}
      <div 
        className={`fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-1.5 shadow-2xl transition-all duration-300 select-none ${
          isSandboxInView ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        {/* Compact Visualization Mode Status */}
        <span className="pl-3 pr-2 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] border-r border-[var(--border)]">
          {sandboxState === 'default'
            ? (lang === 'de' ? 'Standard' : 'Default')
            : sandboxState === 'brown'
            ? (lang === 'de' ? 'Warnung' : 'Warning')
            : (lang === 'de' ? 'Traum' : 'Dream')}
        </span>

        {/* Change Color Mode Button */}
        <button
          onClick={handleCycleSandboxState}
          className={`p-2 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 cursor-pointer ${
            sandboxState === 'default'
              ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20'
              : sandboxState === 'brown'
              ? 'bg-amber-600/10 border-amber-500/30 text-amber-400 hover:bg-amber-600/20'
              : 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20'
          }`}
          title={lang === 'de' ? 'Visualisierungs-Option wechseln' : 'Switch visualization mode'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/>
            <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/>
          </svg>
        </button>

        {/* Comparison Toggle Button */}
        <button
          onClick={toggleComparison}
          className={`p-2 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 cursor-pointer ${
            showComparison
              ? 'bg-purple-600/20 border-purple-500/40 text-purple-400 hover:bg-purple-600/30 shadow-inner'
              : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          title={lang === 'de' ? 'Mehrheit umschalten' : 'Toggle majority chart'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="4" width="4" height="16" rx="1" />
            <rect x="15" y="10" width="4" height="10" rx="1" />
          </svg>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && isSandboxInView && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 shadow-2xl text-center flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="text-xs font-semibold text-[var(--text-primary)] leading-normal">{toastMessage}</span>
        </div>
      )}
    </section>
  )
}
