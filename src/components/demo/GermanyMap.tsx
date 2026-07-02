import type { ParliamentsSnapshot } from '../../polling'
import { GERMANY_STATE_PATHS } from './GermanyMapData'

interface GermanyMapProps {
  selectedStateId: string
  onSelectStateId: (id: string) => void
  pollingSnapshot: ParliamentsSnapshot | null
  sandboxState: 'default' | 'brown' | 'dream'
  dreamProgress: number | null
  lang: 'de' | 'en' | string
}

export function GermanyMap({
  selectedStateId,
  onSelectStateId,
  pollingSnapshot,
  sandboxState,
  dreamProgress,
  lang,
}: GermanyMapProps) {
  // Helper to extract AfD percentage from a state snapshot
  const getAfdPct = (stateId: string): number => {
    if (!pollingSnapshot || !pollingSnapshot[stateId]) return 0
    const afdBar = pollingSnapshot[stateId].bars.find((b) => b.key === 'afd')
    return afdBar ? afdBar.pct : 0
  }

  // Check if AfD is the strongest party (has majority/plurality) in a state snapshot
  const isAfdStrongest = (stateId: string): boolean => {
    if (!pollingSnapshot || !pollingSnapshot[stateId]) return false
    const stateData = pollingSnapshot[stateId]
    if (!stateData.bars || stateData.bars.length === 0) return false
    
    let maxBar = stateData.bars[0]
    for (const bar of stateData.bars) {
      if (bar.pct > maxBar.pct) {
        maxBar = bar
      }
    }
    return maxBar.key === 'afd'
  }

  // Calculate choropleth color based on sandbox selection and AfD strength
  const getStateColor = (stateId: string, isActive: boolean, afdPct: number) => {
    // Scale opacity from 0.25 (10% AfD or below) to 1.0 (30% AfD or above)
    const baseOpacity = Math.max(0.25, Math.min(1.0, (afdPct - 5) / 25))
    
    let colorRgb = '6, 182, 212' // Default: Cyan/Blue
    const afdMajority = isAfdStrongest(stateId)

    if (sandboxState === 'brown') {
      // Only color brown if AfD has the majority/plurality in that state
      if (afdMajority) {
        colorRgb = '180, 83, 9' // Brown
      } else {
        colorRgb = '6, 182, 212' // Cyan/Blue
      }
    } else if (sandboxState === 'dream' && dreamProgress !== null) {
      // Morph colors towards a beautiful progressive Green
      const startR = afdMajority ? 180 : 6
      const startG = afdMajority ? 83 : 182
      const startB = afdMajority ? 9 : 212

      const endR = 34
      const endG = 197
      const endB = 94

      const r = Math.round(startR + (endR - startR) * dreamProgress)
      const g = Math.round(startG + (endG - startG) * dreamProgress)
      const b = Math.round(startB + (endB - startB) * dreamProgress)
      colorRgb = `${r}, ${g}, ${b}`
    }

    return isActive
      ? `rgba(${colorRgb}, 0.95)`
      : `rgba(${colorRgb}, ${baseOpacity * 0.45})`
  }

  // Handle click on state: toggles selection (deselects if clicked again)
  const handleSelectState = (id: string) => {
    if (selectedStateId === id) {
      if (id !== '0') {
        onSelectStateId('0') // Reset to Federal/Deutschland
      }
    } else {
      onSelectStateId(id)
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[280px] aspect-[586/793] bg-neutral-900/30 rounded-2xl border border-neutral-900/80 p-3 shadow-inner flex flex-col justify-between">
        
        {/* National/Federal selector node at the top of the map */}
        <button
          onClick={() => handleSelectState('0')}
          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all border flex items-center justify-between cursor-pointer ${
            selectedStateId === '0'
              ? sandboxState === 'brown'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : sandboxState === 'dream'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
          type="button"
        >
          <span>{lang === 'de' ? '🇩🇪 Bund (Deutschland)' : '🇩🇪 Federal (Germany)'}</span>
          <span className="font-extrabold font-mono text-[10px]">
            {(() => {
              const originalPct = getAfdPct('0')
              const pct = (sandboxState === 'dream' && dreamProgress !== null)
                ? originalPct * (1 - dreamProgress)
                : originalPct
              return pct.toFixed(1)
            })()} %
          </span>
        </button>

        {/* SVG Geographic map of Germany */}
        <svg 
          className="w-full h-full min-h-[310px] select-none mt-2" 
          viewBox="0 0 586 793"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Country Outer Background Silhouette / Drop Shadow effect */}
          <g 
            stroke="rgba(0, 0, 0, 0.6)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinejoin="round" 
            strokeLinecap="round"
            className="pointer-events-none"
          >
            {Object.entries(GERMANY_STATE_PATHS).map(([id, state]) => (
              <path key={`bg-${id}`} d={state.d} />
            ))}
          </g>

          {/* 2. Country Outer Glow/Outline */}
          <g 
            stroke="rgba(255, 255, 255, 0.08)" 
            strokeWidth="5" 
            fill="none" 
            strokeLinejoin="round" 
            strokeLinecap="round"
            className="pointer-events-none"
          >
            {Object.entries(GERMANY_STATE_PATHS).map(([id, state]) => (
              <path key={`outline-${id}`} d={state.d} />
            ))}
          </g>

          {/* 3. State Paths with individual choropleth styling and click handlers */}
          <g strokeLinejoin="round" strokeLinecap="round">
            {Object.entries(GERMANY_STATE_PATHS).map(([id, state]) => {
              const isActive = selectedStateId === id
              const originalPct = getAfdPct(id)
              const pct = (sandboxState === 'dream' && dreamProgress !== null)
                ? originalPct * (1 - dreamProgress)
                : originalPct
              
              const color = getStateColor(id, isActive, pct)
              
              const isAfdMajority = isAfdStrongest(id)
              const activeStroke = sandboxState === 'brown' && isAfdMajority
                ? '#f59e0b'
                : sandboxState === 'dream'
                ? '#34d399'
                : '#22d3ee'

              const strokeColor = isActive ? activeStroke : 'rgba(0, 0, 0, 0.35)'

              return (
                <path
                  key={`path-${id}`}
                  d={state.d}
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth={isActive ? 2.5 : 1}
                  onClick={() => handleSelectState(id)}
                  className="transition-all duration-300 cursor-pointer hover:brightness-110 hover:stroke-neutral-300"
                >
                  <title>{`${lang === 'de' ? state.nameDe : state.nameEn} (AfD: ${pct.toFixed(1)}%)`}</title>
                </path>
              )
            })}
          </g>

          {/* 4. Interactive Bubbles/Labels overlay positioned at the center of each state */}
          {Object.entries(GERMANY_STATE_PATHS).map(([id, state]) => {
            const isActive = selectedStateId === id
            const originalPct = getAfdPct(id)
            const pct = (sandboxState === 'dream' && dreamProgress !== null)
              ? originalPct * (1 - dreamProgress)
              : originalPct
            
            const isAfdMajority = isAfdStrongest(id)
            const activeCircleBg = sandboxState === 'brown' && isAfdMajority
              ? '#9a3412'
              : sandboxState === 'dream'
              ? '#059669'
              : '#0891b2'

            return (
              <g
                key={`bubble-${id}`}
                transform={`translate(${state.labelX}, ${state.labelY})`}
                onClick={() => handleSelectState(id)}
                className="cursor-pointer select-none group"
              >
                {/* SVG Circle representing the state node */}
                <circle
                  r="18"
                  fill={isActive ? activeCircleBg : 'rgba(23, 23, 23, 0.88)'}
                  stroke={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isActive ? 2.2 : 1}
                  className="transition-all duration-300 group-hover:scale-110 group-hover:stroke-neutral-300"
                />
                
                {/* Abbreviation (SH, BY, BE, etc.) */}
                <text
                  textAnchor="middle"
                  y="-2"
                  className="text-[9px] fill-white font-extrabold tracking-wide pointer-events-none"
                >
                  {state.label}
                </text>

                {/* Percentage value */}
                <text
                  textAnchor="middle"
                  y="9"
                  className="text-[8px] fill-white/80 font-bold font-mono pointer-events-none"
                >
                  {pct > 0 ? `${pct.toFixed(0)}%` : '—'}
                </text>

                {/* Tooltip */}
                <title>
                  {`${lang === 'de' ? state.nameDe : state.nameEn} (AfD: ${pct.toFixed(1)}%)`}
                </title>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
