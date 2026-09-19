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
      <nav className={`fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg-nav)] px-4 py-3 backdrop-blur-md transition-transform duration-300 md:px-6 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase shrink-0 min-w-0">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <a href="https://change.org/rette-blau" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              <span className="sm:hidden text-xs font-black tracking-wider text-[var(--text-primary)] uppercase">Rette Blau</span>
              <span className="hidden sm:inline text-xs md:text-sm font-black tracking-wider text-[var(--text-primary)] uppercase">{t.navCampaign}</span>
            </a>
          </div>
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-3 font-mono text-xs shrink-0 flex-nowrap">
            <a href="#warum" className="hidden text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] xl:block uppercase tracking-wider">{t.navWhy}</a>
            <a href="#risiken" className="hidden text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] xl:block uppercase tracking-wider">{t.navRisks}</a>
            <a href="#hintergrund" className="hidden text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] xl:block uppercase tracking-wider">{t.navScience}</a>
            <a href="#brief" className="hidden text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] xl:block uppercase tracking-wider">{t.navLetter}</a>
            <a href="#kultur" className="hidden text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] xl:block uppercase tracking-wider">{t.navCulture}</a>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] p-1.5 sm:p-2 text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
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
            <div className="relative shrink-0" ref={langRef}>
              <button
                onClick={() => setIsLangOpen((c) => !c)}
                className="flex items-center gap-1 border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-1.5 font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label={t.langLabel}
                aria-expanded={isLangOpen}
                type="button"
                id="language-picker-button"
              >
                <Globe size={14} />
                <span>{lang}</span>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 z-50 mt-1 w-48 border border-[var(--border)] bg-[var(--bg-primary)] p-1 shadow-2xl"
                  id="language-picker-popover"
                >
                  <div className="divide-y divide-[var(--border)]">
                    {LOCALE_INFO.map((locale) => (
                      <button
                        key={locale.code}
                        type="button"
                        onClick={() => {
                          onChangeLanguage(locale.code)
                          setIsLangOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                          lang === locale.code
                            ? 'bg-blue-600 text-white'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase opacity-75 w-6">{locale.code}</span>
                        <span>{locale.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 border border-[var(--border)] bg-[var(--bg-primary)] p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
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
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 px-2.5 py-1.5 sm:px-3.5 text-xs font-bold text-white uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.navSign || ctaLabel}</span>
              <span className="sm:hidden">✍️</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </a>
          </div>
        </div>
      </nav>

      {isShareOpen && <ShareModal t={t} onClose={() => setIsShareOpen(false)} />}
    </>
  )
}
