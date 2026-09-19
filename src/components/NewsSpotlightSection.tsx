import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Radio } from 'lucide-react'
import type { Locale, Translation } from '../i18n'
import type { NewsArticle } from './HeroSection'

interface NewsSpotlightSectionProps {
  lang: Locale
  t: Translation
  news: NewsArticle[]
}

function getLocalizedText(lang: Locale, field: string | Record<string, string> | undefined) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] ?? field.de ?? ''
}

export function NewsSpotlightSection({ lang, t, news }: NewsSpotlightSectionProps) {
  const items = useMemo(() => news.slice(0, 4), [news])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [items.length])

  if (items.length === 0) {
    return null
  }

  const activeIndex = currentIndex % items.length
  const active = items[activeIndex]

  return (
    <section className="mx-auto mt-6 max-w-6xl px-4 md:px-6">
      <div className="editorial-card p-5 md:p-6">
        {/* Header bar: Live Wire Badge + Carousel Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Radio size={14} />
              {t.latestNewsTitle}
            </span>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                aria-label={t.newsPrevLabel}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                aria-label={t.newsNextLabel}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {active.sources && active.sources.length > 0
                ? active.sources.map((s) => s.name).join(' · ')
                : active.source}
            </span>
            {active.date && (
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {active.date}
              </span>
            )}
          </div>

          <h3 className="mb-2 text-base md:text-xl font-bold leading-snug text-[var(--text-primary)]">
            {getLocalizedText(lang, active.title)}
          </h3>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {getLocalizedText(lang, active.excerpt)}
          </p>

          <div className="mt-4 flex min-h-9 flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
            {(active.sources && active.sources.length > 0 ? active.sources : active.url ? [{ name: t.readMore, url: active.url }] : []).map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>{src.name}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Dot Indicators */}
        {items.length > 1 && (
          <div className="mt-4 flex gap-2 justify-center">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${t.newsSlideLabel} ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? 'w-8 bg-blue-600 dark:bg-blue-500' : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
