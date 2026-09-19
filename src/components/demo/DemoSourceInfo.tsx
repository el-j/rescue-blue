import { ExternalLink } from 'lucide-react'
import type { Translation } from '../../i18n'

interface DemoSourceInfoProps {
  t: Translation
  sourceInfo: string
  isLivePollData: boolean
  standInfo: string
  sourceUrl: string
  sourceMethodUrl: string
}

export function DemoSourceInfo({
  t,
  sourceInfo,
  isLivePollData,
  standInfo,
  sourceUrl,
  sourceMethodUrl,
}: DemoSourceInfoProps) {
  return (
    <div className="mb-6 mt-2 border-l-2 border-l-blue-600 border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-xs text-[var(--text-secondary)] font-mono">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider">{t.demoSourceLabel}:</span>
        <span>{sourceInfo}</span>
        <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          {isLivePollData ? t.demoSourceLive : t.demoSourceFallback}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-2 text-[11px]">
        <span className="font-bold text-[var(--text-primary)]">{t.demoSourceStand}:</span>
        <span>{standInfo}</span>
        <span className="text-[var(--border-strong)]">|</span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase hover:underline"
        >
          {t.demoSourceButton} <ExternalLink size={11} />
        </a>
        <a
          href={sourceMethodUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase hover:underline"
        >
          API <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}
