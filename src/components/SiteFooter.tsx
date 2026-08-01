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
    <footer className="border-t border-neutral-800 px-4 py-8 text-center md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-left">
          <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> {brand}
          </p>
          <p className="mt-1 text-xs text-neutral-500">{t.footerTagline}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <a
            href={IMPRINT_URL}
            className="text-sm font-semibold text-neutral-300 transition-colors hover:text-white"
          >
            {t.footerImprint}
          </a>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            {t.footerLink} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
