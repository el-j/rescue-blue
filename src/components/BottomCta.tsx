import { ArrowUpRight } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Translation } from '../i18n'

interface BottomCtaProps {
  t: Translation
  ctaBody: string
  ctaLabel: string
  onCtaClick: () => void
}

export function BottomCta({ t, ctaBody, ctaLabel, onCtaClick }: BottomCtaProps) {
  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-16 text-center md:px-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
          JETZT HANDELN
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.ctaBanner}
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          {ctaBody}
        </p>
        <div className="pt-2">
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCtaClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99]"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="text-xs text-[var(--text-muted)] pt-1">{t.ctaExternalHint} · Kostenlos & unabhängig</p>
      </div>
    </div>
  )
}
