import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Globe, Moon, Share2, Sun, X } from 'lucide-react'
import { useScrollVisibility } from '../hooks/useScrollVisibility'
import { PETITION_URL } from '../petition'
import { LOCALE_INFO, type Locale, type Theme, type Translation } from '../i18n'
import { ShareModal } from './ShareModal'

interface HeaderProps {
  lang: Locale
  t: Translation
  theme: Theme
  onChangeLanguage: (locale: Locale) => void
  onToggleTheme: () => void
}

export function SiteHeader({ lang, t, theme, onChangeLanguage, onToggleTheme }: HeaderProps) {
  const isVisible = useScrollVisibility()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Close language popover on outside click
  useEffect(() => {
    if (!isLangOpen) return
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
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

  const currentLocaleInfo = LOCALE_INFO.find((l) => l.code === lang)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg-nav)] px-4 py-3 backdrop-blur-md transition-transform duration-300 md:px-6 md:py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
            <span className="text-sm font-bold tracking-wider text-[var(--text-primary)] uppercase">{t.navCampaign}</span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
            <a href="#warum" className="hidden text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:block md:text-sm">{t.navWhy}</a>
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
                <span className="hidden sm:inline">{currentLocaleInfo?.flag}</span>
              </button>

              {isLangOpen && (
                <>
                  {/* Mobile backdrop */}
                  <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden" onClick={() => setIsLangOpen(false)} />

                  {/* Popover / bottom sheet */}
                  <div className="fixed bottom-0 left-0 right-0 z-50 animate-in rounded-t-2xl border-t border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-2xl sm:absolute sm:top-full sm:right-0 sm:bottom-auto sm:left-auto sm:mt-2 sm:w-56 sm:rounded-xl sm:border sm:p-2"
                    id="language-picker-popover"
                  >
                    {/* Mobile header */}
                    <div className="mb-3 flex items-center justify-between sm:hidden">
                      <span className="text-sm font-bold text-[var(--text-primary)]">{t.langLabel}</span>
                      <button
                        onClick={() => setIsLangOpen(false)}
                        className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        type="button"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-0.5">
                      {LOCALE_INFO.map((locale) => (
                        <button
                          key={locale.code}
                          onClick={() => {
                            onChangeLanguage(locale.code)
                            setIsLangOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all sm:py-2 ${
                            lang === locale.code
                              ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 font-bold'
                              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                          }`}
                          type="button"
                        >
                          <span className="text-lg">{locale.flag}</span>
                          <span>{locale.nativeName}</span>
                          {lang === locale.code && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
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
