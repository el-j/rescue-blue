import { ChevronDown, ChevronUp, ExternalLink, Users } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Facts, Faqs, Locale, Translation } from '../i18n'

interface SidebarProps {
  lang: Locale
  t: Translation
  ctaBody: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  facts: Facts
  faqs: Faqs
  openFaq: number | null
  onToggleFaq: (index: number) => void
}

export function SidebarPanels({ lang, t, ctaBody, formattedSignatureCount, isLoadingSignatures, facts, faqs, openFaq, onToggleFaq }: SidebarProps) {
  return (
    <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-0.5">
      <div className="rounded-2xl border border-blue-800/40 bg-linear-to-br from-blue-900/40 to-blue-950/60 p-6 shadow-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20">
          <span className="text-2xl">✍️</span>
        </div>
        <h3 className="mb-2 text-lg font-black tracking-tight text-white uppercase">{t.ctaBanner}</h3>
        <p className="mb-5 text-sm leading-relaxed text-neutral-400">{ctaBody}</p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
        >
          {t.ctaBtn} <ExternalLink size={15} />
        </a>
        <p className="text-center text-xs text-neutral-600">{t.ctaInfo}</p>
      </div> 

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-300">
            {t.sidebarSignatures}
          </span>
          <Users size={16} className="text-blue-400" aria-hidden="true" />
        </div>
        <p className="text-3xl font-black text-white" aria-live="polite">
          {isLoadingSignatures
            ? <span className="inline-block h-8 w-24 rounded bg-neutral-800 animate-pulse" />
            : (formattedSignatureCount ?? '—')}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {t.sidebarGrowing}
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <h4 className="text-sm font-black tracking-wider text-white uppercase">
          {t.sidebarQuickFacts}
        </h4>
        {facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="mt-0.5 text-xl">{fact.emoji}</span>
            <div>
              <p className="text-sm font-bold text-white">{fact.label}</p>
              <p className="text-xs text-neutral-500">{fact.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
