import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Globe, Moon, Share2, Sun } from 'lucide-react'
import { useScrollVisibility } from '../hooks/useScrollVisibility'
import { PETITION_URL } from '../petition'
import { LOCALE_INFO, type Locale, type Theme, type Translation } from '../i18n'
import { ShareModal } from './ShareModal'

interface HeaderProps {
  lang: Locale
  t: Translation
  ctaLabel: string
  theme: Theme
  onChangeLanguage: (locale: Locale) => void
  onToggleTheme: () => void
  onSignCtaClick: () => void
}

export function SiteHeader({ lang, t, ctaLabel, theme, onChangeLanguage, onToggleTheme, onSignCtaClick }: HeaderProps) {
  const isVisible = useScrollVisibility()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Close language popover on outside click
  useEffect(() => {
    if (!isLangOpen) return
    function handleClick(e: MouseEvent | TouchEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [isLangOpen])

  // Close on Escape
  useEffect(() => {
    if (!isLangOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsLangOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isLangOpen])



  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg-nav)] px-4 py-3 backdrop-blur-md transition-transform duration-300 md:px-6 md:py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
            <a href="https://change.org/rette-blau" target="_blank" rel="noopener noreferrer"><span className="text-sm font-bold tracking-wider text-[var(--text-primary)] uppercase">{t.navCampaign}</span></a>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
            <a href="#warum" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navWhy}</a>
            <a href="#risiken" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navRisks}</a>
            <a href="#hintergrund" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navScience}</a>
            <a href="#brief" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navLetter}</a>
            <a href="#kultur" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navCulture}</a>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              type="button"
              id="theme-toggle"
            >
              {theme === 'dark'
                ? <Sun size={15} className="text-amber-400" />
                : <Moon size={15} className="text-blue-500" />
              }
            </button>

            {/* Language picker */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen((c) => !c)}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                aria-label={t.langLabel}
                aria-expanded={isLangOpen}
                type="button"
                id="language-picker-button"
              >
                <Globe size={14} />
                <span className="uppercase">{lang}</span>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-2xl animate-in"
                  id="language-picker-popover"
                >
                  <div className="space-y-0.5">
                    {LOCALE_INFO.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => {
                          onChangeLanguage(locale.code)
                          setIsLangOpen(false)
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium transition-all ${
                          lang === locale.code
                            ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 font-bold'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                        }`}
                        type="button"
                      >
                        <span className="text-[10px] font-bold bg-[var(--bg-hover)] px-1.5 py-0.5 rounded text-[var(--text-muted)] w-8 text-center uppercase">{locale.code}</span>
                        <span>{locale.nativeName}</span>
                        {lang === locale.code && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              aria-label={t.navShare}
              type="button"
            >
              <Share2 size={14} />
            </button>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSignCtaClick}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-500 md:px-3.5"
            >
              <span className="hidden md:inline">{ctaLabel}</span>
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
