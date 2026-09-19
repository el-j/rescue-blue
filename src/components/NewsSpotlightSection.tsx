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
    <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)] py-6">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header bar: Live Wire Badge + Carousel Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
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
                className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                aria-label={t.newsPrevLabel}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
                className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                aria-label={t.newsNextLabel}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {active.sources && active.sources.length > 0
                ? active.sources.map((s) => s.name).join(' · ')
                : active.source}
            </span>
            {active.date && (
              <span className="text-[var(--text-muted)]">
                {active.date}
              </span>
            )}
          </div>

          <h3 className="mb-2 text-lg md:text-xl font-bold leading-snug text-[var(--text-primary)]">
            {getLocalizedText(lang, active.title)}
          </h3>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-4xl">
            {getLocalizedText(lang, active.excerpt)}
          </p>

          <div className="mt-4 flex min-h-8 flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            {(active.sources && active.sources.length > 0 ? active.sources : active.url ? [{ name: t.readMore, url: active.url }] : []).map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>{src.name}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          {items.length > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-xs">
              <span className="text-[var(--text-muted)] uppercase tracking-wider">
                {activeIndex + 1} / {items.length}
              </span>
              <div className="flex gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`${t.newsSlideLabel} ${idx + 1}`}
                    className={`h-1.5 transition-all cursor-pointer ${
                      idx === activeIndex ? 'w-6 bg-blue-600' : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
