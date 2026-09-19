import { ArrowUpRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Facts, Translation } from '../i18n'

interface SidebarProps {
  t: Translation
  ctaLabel: string
  ctaBody: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  facts: Facts
  onCtaClick: () => void
}

export function SidebarPanels({ t, ctaLabel, ctaBody, formattedSignatureCount, isLoadingSignatures, facts, onCtaClick }: SidebarProps) {
  return (
    <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-0.5">
      {/* Primary Action Docket */}
      <div className="border border-[var(--border)] bg-[var(--bg-secondary)] p-6 border-t-2 border-t-blue-600">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ShieldCheck size={14} />
            Bürgerinitiative
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">WeAct / Campact</span>
        </div>

        <h3 className="mb-2 text-xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.ctaBanner}
        </h3>

        <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
          {ctaBody}
        </p>

        <a
          href={PETITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="group flex w-full items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors active:translate-y-0.5"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span>{t.ctaExternalHint}</span>
        </div>
        <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">{t.ctaInfo}</p>
      </div> 

      {/* Official Signature Counter Ticker */}
      <div className="border border-[var(--border)] bg-[var(--bg-primary)] p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {t.sidebarSignatures}
          </span>
          <Users size={16} className="text-blue-500" aria-hidden="true" />
        </div>
        <p className="editorial-numeral text-4xl font-extrabold text-[var(--text-primary)]" aria-live="polite">
          {isLoadingSignatures
            ? <span className="inline-block h-9 w-24 bg-[var(--border)] animate-pulse" />
            : (formattedSignatureCount ?? '—')}
        </p>
        <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t.sidebarGrowing}
        </p>
      </div>

      {/* Editorial Fact Sheet */}
      <div className="border border-[var(--border)] bg-[var(--bg-primary)] p-6 space-y-4">
        <div className="border-b border-[var(--border)] pb-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
            {t.sidebarQuickFacts}
          </h4>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {facts.map((fact, index) => (
            <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-left">
              <span className="mt-0.5 text-base shrink-0 select-none">{fact.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">{fact.label}</p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">{fact.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
