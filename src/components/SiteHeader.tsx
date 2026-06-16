import { useState } from 'react'
import { ArrowUpRight, Globe, Share2 } from 'lucide-react'
import { useScrollVisibility } from '../hooks/useScrollVisibility'
import { PETITION_URL } from '../petition'
import type { Locale, Translation } from '../i18n'
import { ShareModal } from './ShareModal'

interface HeaderProps {
  lang: Locale
  t: Translation
  onToggleLanguage: () => void
}

export function SiteHeader({ lang, t, onToggleLanguage }: HeaderProps) {
  const isVisible = useScrollVisibility()
  const [isShareOpen, setIsShareOpen] = useState(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:px-6 md:py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
            <span className="text-sm font-bold tracking-wider text-white uppercase">{t.navCampaign}</span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
            <a href="#warum" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navWhy}</a>
            <a href="#hintergrund" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navScience}</a>
            <a href="#brief" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navLetter}</a>
            <a href="#kultur" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navCulture}</a>
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-all hover:bg-neutral-700"
              aria-label="Toggle language"
              type="button"
            >
              <Globe size={13} />
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-all hover:bg-neutral-700"
              aria-label={t.navShare}
              type="button"
            >
              <Share2 size={14} />
            </button>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-500 md:px-3.5"
            >
              <span className="hidden md:inline">{t.navSign}</span>
              <span className="md:hidden">✍️</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      {isShareOpen && <ShareModal t={t} onClose={() => setIsShareOpen(false)} />}
    </>
  )
}
