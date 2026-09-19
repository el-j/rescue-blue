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
    <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-20 text-center md:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          JETZT HANDELN · BLAU RETTEN
        </span>
        <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-[var(--text-primary)]">
          {t.ctaBanner}
        </h2>
        <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
          {ctaBody}
        </p>
        <div className="pt-4">
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCtaClick}
            className="group inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-base md:text-lg font-bold uppercase tracking-wider transition-colors active:translate-y-0.5"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">{t.ctaExternalHint} · Kostenlos & unabhängig</p>
      </div>
    </div>
  )
}
