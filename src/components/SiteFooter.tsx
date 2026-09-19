import { ExternalLink } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Translation } from '../i18n'

const IMPRINT_URL = `${import.meta.env.BASE_URL}imprint.html`

interface FooterProps {
  t: Translation
}

export function SiteFooter({ t }: FooterProps) {
  const brand = t.footerBrand

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)] px-4 py-10 text-center md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold tracking-wider text-[var(--text-primary)] uppercase">
            <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500" />
            {brand}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{t.footerTagline}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
          <a
            href={IMPRINT_URL}
            className="text-xs md:text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            {t.footerImprint}
          </a>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors hover:underline"
          >
            {t.footerLink} <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </footer>
  )
}
