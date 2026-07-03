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

  // Get the strongest party (plurality/majority) in a state snapshot
  const getStrongestParty = (stateId: string): { key: string; pct: number } => {
    if (!pollingSnapshot || !pollingSnapshot[stateId]) return { key: 'others', pct: 0 }
    const stateData = pollingSnapshot[stateId]
    if (!stateData.bars || stateData.bars.length === 0) return { key: 'others', pct: 0 }
    
    let maxBar = stateData.bars[0]
    for (const bar of stateData.bars) {
      if (bar.pct > maxBar.pct) {
        maxBar = bar
      }
    }
    return { key: maxBar.key, pct: maxBar.pct }
  }

  // Get RGB color of a party
  const getPartyColorRgb = (partyKey: string): string => {
    switch (partyKey) {
      case 'afd':
        return '6, 182, 212' // Cyan
      case 'cdu':
        return '64, 64, 64' // Slate Grey/Charcoal for CDU
      case 'spd':
        return '239, 68, 68' // Red
      case 'greens':
        return '34, 197, 94' // Green
      case 'left':
        return '236, 72, 153' // Pink/Magenta
      default:
        return '115, 115, 115' // Slate Grey for others
    }
  }

  // Calculate choropleth color based on sandbox selection and majority party strength
  const getStateColor = (stateId: string, isActive: boolean, afdPct: number) => {
    const strongest = getStrongestParty(stateId)
    const afdMajority = strongest.key === 'afd'
    
    // Default/Normal state: Color by the current majority party color!
    let colorRgb = getPartyColorRgb(strongest.key)
    let startOpacity = Math.max(0.4, Math.min(1.0, strongest.pct / 50))

    if (sandboxState === 'brown') {
      if (afdMajority) {
        colorRgb = '180, 83, 9' // Brown for AfD majority
        startOpacity = Math.max(0.4, Math.min(1.0, afdPct / 45))
      } else {
        colorRgb = getPartyColorRgb(strongest.key) // Keep majority color otherwise
      }
    } else if (sandboxState === 'dream' && dreamProgress !== null) {
      // Morph towards a beautiful progressive Green
      let startRgb = getPartyColorRgb(strongest.key)
      if (afdMajority) {
        startRgb = '180, 83, 9' // Brown
      }

      const [startR, startG, startB] = startRgb.split(',').map(Number)
      const [endR, endG, endB] = [34, 197, 94] // Progressive Green

      const r = Math.round(startR + (endR - startR) * dreamProgress)
      const g = Math.round(startG + (endG - startG) * dreamProgress)
      const b = Math.round(startB + (endB - startB) * dreamProgress)
      colorRgb = `${r}, ${g}, ${b}`

      const endOpacity = 0.5
      startOpacity = startOpacity + (endOpacity - startOpacity) * dreamProgress
    }

    return isActive
      ? `rgba(${colorRgb}, 0.95)`
      : `rgba(${colorRgb}, ${startOpacity * 0.45})`
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
    <div className="flex flex-col items-center w-full h-full flex-grow">
      <div className="relative w-full max-w-[320px] md:max-w-[340px] aspect-[586/793] flex flex-col justify-between h-full flex-grow">
        
        <div className="w-full">
          {/* Combined Country/Federal Selector Dropdown */}
          <select
            value={selectedStateId}
            onChange={(e) => handleSelectState(e.target.value)}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500/50 ${
              selectedStateId === '0'
                ? sandboxState === 'brown'
                  ? 'active-btn-brown shadow-sm'
                  : sandboxState === 'dream'
                  ? 'active-btn-dream shadow-sm'
                  : 'active-btn-default shadow-sm'
                : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-primary)]'
            }`}
          >
            <option value="0" className="bg-[var(--bg-card)] text-[var(--text-primary)]">
              {lang === 'de' ? '🇩🇪 Bund (Deutschland)' : '🇩🇪 Federal (Germany)'}
              {` — ${(() => {
                const originalPct = getAfdPct('0')
                const pct = (sandboxState === 'dream' && dreamProgress !== null)
                  ? originalPct * (1 - dreamProgress)
                  : originalPct
                return pct.toFixed(1)
              })()}%`}
            </option>
            {pollingSnapshot &&
              Object.entries(pollingSnapshot)
                .filter(([id]) => id !== '0')
                .map(([id, snap]) => {
                  const originalPct = getAfdPct(id)
                  const pct = (sandboxState === 'dream' && dreamProgress !== null)
                    ? originalPct * (1 - dreamProgress)
                    : originalPct
                  const name = lang === 'de' ? snap.nameDe : snap.nameEn
                  return (
                    <option key={id} value={id} className="bg-[var(--bg-card)] text-[var(--text-primary)]">
                      {name} — {pct.toFixed(1)}%
                    </option>
                  )
                })}
          </select>
        </div>

        {/* SVG Geographic map of Germany */}
        <svg 
          className="w-full h-full min-h-[310px] select-none mt-2" 
          viewBox="0 0 586 793"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Country Outer Background Silhouette / Drop Shadow effect */}
          <g 
            stroke="var(--border)" 
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
            stroke="var(--border)" 
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
              
              const strongest = getStrongestParty(id)
              const isAfdMajority = strongest.key === 'afd'
              const activeStroke = sandboxState === 'brown' && isAfdMajority
                ? '#f59e0b'
                : sandboxState === 'dream'
                ? '#34d399'
                : strongest.key === 'spd'
                ? '#ef4444'
                : strongest.key === 'greens'
                ? '#22c55e'
                : strongest.key === 'left'
                ? '#ec4899'
                : strongest.key === 'cdu'
                ? '#737373'
                : '#22d3ee'

              const strokeColor = isActive ? activeStroke : 'var(--border)'

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
            
            const strongest = getStrongestParty(id)
            const isAfdMajority = strongest.key === 'afd'
            const activeCircleBg = sandboxState === 'dream'
              ? '#059669'
              : (sandboxState === 'brown' && isAfdMajority)
              ? '#9a3412'
              : strongest.key === 'spd'
              ? '#b91c1c'
              : strongest.key === 'greens'
              ? '#15803d'
              : strongest.key === 'left'
              ? '#be185d'
              : strongest.key === 'cdu'
              ? '#404040'
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
