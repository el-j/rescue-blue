import { CircleHelp, ExternalLink } from 'lucide-react'
import type { Translation } from '../../i18n'

interface DemoSourceInfoProps {
  t: Translation
  instituteName?: string
  isInstituteInfoOpen: boolean
  setIsInstituteInfoOpen: (val: boolean | ((prev: boolean) => boolean)) => void
  sourceInfo: string
  isLivePollData: boolean
  standInfo: string
  sourceUrl: string
  sourceMethodUrl: string
}

export function DemoSourceInfo({
  t,
  instituteName,
  isInstituteInfoOpen,
  setIsInstituteInfoOpen,
  sourceInfo,
  isLivePollData,
  standInfo,
  sourceUrl,
  sourceMethodUrl,
}: DemoSourceInfoProps) {
  return (
    <div className="mb-6 mt-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs text-neutral-400">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-neutral-200">{t.demoSourceLabel}:</span>
        {instituteName === 'INSA' && (
          <button
            onClick={() => setIsInstituteInfoOpen((current) => !current)}
            aria-expanded={isInstituteInfoOpen}
            aria-controls="institute-help-popover"
            className="inline-flex min-h-8 items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-[10px] font-bold uppercase text-neutral-300 transition-colors hover:border-blue-500/40 hover:text-blue-300"
            type="button"
          >
            <CircleHelp size={11} /> {t.demoSourceWhyInstituteLabel}
          </button>
        )}
        <span>{sourceInfo}</span>
        <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-300">
          {isLivePollData ? t.demoSourceLive : t.demoSourceFallback}
        </span>
      </div>
      {instituteName === 'INSA' && isInstituteInfoOpen && (
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
  )
}
