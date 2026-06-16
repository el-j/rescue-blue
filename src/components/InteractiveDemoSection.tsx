import { useState } from 'react'
import { CircleHelp, ExternalLink, Paintbrush } from 'lucide-react'
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
  const maxPct = Math.max(...bars.map((bar) => bar.pct), 1)
  const [isInstituteInfoOpen, setIsInstituteInfoOpen] = useState(false)

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

      <div className="mb-6 rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8">
        <div className="relative flex h-56 items-end justify-between border-b border-neutral-800 pb-2 md:h-64">
          {bars.map((bar, index) => {
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
