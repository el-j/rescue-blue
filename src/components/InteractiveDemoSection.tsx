import { useState, useEffect, useRef, useCallback } from 'react'
import { Paintbrush, ToggleLeft, ToggleRight } from 'lucide-react'
import type { PollBar } from '../polling'
import type { Locale, Translation } from '../i18n'
import { DemoSourceInfo } from './demo/DemoSourceInfo'
import { DemoComparisonBlock } from './demo/DemoComparisonBlock'

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
}

export function InteractiveDemoSection({ lang, t, bars, sourceInfo, isLivePollData, standInfo, sourceUrl, sourceMethodUrl, sandboxState, onCycleSandboxState, instituteName }: DemoProps) {
  const isBrownActive = sandboxState === 'brown' || sandboxState === 'dream'
  const isDreamActive = sandboxState === 'dream'
  const [isInstituteInfoOpen, setIsInstituteInfoOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [dreamProgress, setDreamProgress] = useState<number | null>(null)
  const hasStartedDreamRef = useRef(false)

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

      // 2. Define target percentages at progress = 1.0 (CDU at 10%, Sonstige boosted by 4%, remainder to leftist parties)
      const targetAfd = 0.0
      const targetCdu = Math.min(originalCduPct, 10.0)

      const originalSpdPct = bars.find((b) => b.key === 'spd')?.pct ?? 0
      const originalGreensPct = bars.find((b) => b.key === 'greens')?.pct ?? 0
      const originalLeftPct = bars.find((b) => b.key === 'left')?.pct ?? 0
      const originalOthersPct = bars.find((b) => b.key === 'others')?.pct ?? 0
      const targetOthers = originalOthersPct + 4.0

      const targetSumValue = bars.reduce((sum, b) => sum + b.pct, 0)
      const remainder = targetSumValue - (targetAfd + targetCdu + targetOthers)
      const leftistSum = originalSpdPct + originalGreensPct + originalLeftPct

      const targetMap: Record<string, number> = {
        afd: targetAfd,
        cdu: targetCdu,
        others: targetOthers,
      }

      if (leftistSum > 0) {
        targetMap.spd = remainder * (originalSpdPct / leftistSum)
        targetMap.greens = remainder * (originalGreensPct / leftistSum)
        targetMap.left = remainder * (originalLeftPct / leftistSum)
      } else {
        targetMap.spd = remainder / 3
        targetMap.greens = remainder / 3
        targetMap.left = remainder / 3
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

  // Filter out AfD if its percentage is 0 (at the end of dream state)
  const displayBars = displayBarsAll.filter((bar) => !(bar.isAfd && bar.pct <= 0))

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
    <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl md:p-8">
      <div className="absolute top-0 right-0 p-4">
        <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">{t.demoSandbox}</span>
      </div>
      <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
        <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
      </h2>
      <p className="text-sm leading-relaxed text-neutral-400">{t.demoDesc}</p>
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
      <div className="mb-4 rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8">
        <div className="relative flex h-64 items-end justify-between border-b border-neutral-800 pb-2 md:h-72">
          {displayBars.map((bar, index) => {
            const heightPx = Math.round((bar.pct / maxPct) * 200)
            const barColor = bar.isAfd
              ? (isAfdBrown
                  ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40'
                  : bar.defaultColor)
              : bar.defaultColor
            const label = lang === 'de' ? bar.labelDe : bar.labelEn
            const pctLabel = Number.isInteger(bar.pct) ? String(bar.pct) : bar.pct.toFixed(1)

            return (
              <div key={index} className="flex flex-col items-center transition-all duration-500" style={{ width: `${100 / displayBars.length}%` }}>
                <span className={`mb-2 text-xs font-bold ${bar.isAfd ? 'font-black text-white' : 'text-neutral-400'}`}>{pctLabel} %</span>
                <button
                  onClick={bar.isAfd ? () => onCycleSandboxState() : undefined}
                  className={`relative w-full rounded-t-md overflow-hidden transition-all duration-700 ${barColor} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''} ${bar.key === 'cdu' ? 'cdu-bar' : ''}`}
                  style={{ height: `${heightPx}px` }}
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
                <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs ${bar.isAfd ? (isAfdBrown ? 'font-black text-amber-500' : 'font-black text-cyan-400') : 'text-neutral-500'}`}>
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
        <DemoComparisonBlock
          t={t}
          displayAfdPct={displayAfdPct}
          othersCombinedPct={othersCombinedPct}
          comparisonMax={comparisonMax}
          isAfdBrown={isAfdBrown}
        />
      )}

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase">{t.demoOption}</span>
          <span className="text-sm font-bold text-neutral-200">{t.demoQuestion}</span>
        </div>
        <button
          onClick={onCycleSandboxState}
          className={`w-full rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all sm:w-auto ${
            sandboxState === 'default'
              ? 'border border-blue-500/30 bg-blue-600 text-blue-100 hover:bg-blue-500'
              : sandboxState === 'brown'
              ? 'border border-purple-800/50 bg-purple-900 text-purple-200 hover:bg-purple-800'
              : 'border border-amber-800/50 bg-amber-900 text-amber-200 hover:bg-amber-800'
          }`}
          type="button"
        >
          {sandboxState === 'default'
            ? t.demoSwitch
            : sandboxState === 'brown'
            ? t.demoDreamSwitch
            : t.demoReset}
        </button>
      </div>
    </section>
  )
}
