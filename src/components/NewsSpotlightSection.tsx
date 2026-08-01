import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react'
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
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-xl md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-black tracking-tight text-white uppercase md:text-xl">
            <Newspaper size={18} className="text-blue-500" /> {t.latestNewsTitle}
          </h2>
          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
                className="rounded-lg border border-neutral-700 bg-neutral-900/70 p-2 text-neutral-300 transition-colors hover:text-white"
                aria-label={t.newsPrevLabel}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
                className="rounded-lg border border-neutral-700 bg-neutral-900/70 p-2 text-neutral-300 transition-colors hover:text-white"
                aria-label={t.newsNextLabel}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
            {active.sources && active.sources.length > 0
              ? active.sources.map((s) => s.name).join(' · ')
              : active.source}
          </p>
          <h3 className="text-base font-bold leading-snug text-white md:text-xl">
            {getLocalizedText(lang, active.title)}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            {getLocalizedText(lang, active.excerpt)}
          </p>
          <div className="pt-2">
            {(active.sources && active.sources.length > 0 ? active.sources : active.url ? [{ name: t.readMore, url: active.url }] : []).map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 inline-flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-900/60 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-blue-400"
              >
                <span>{src.name}</span>
                <ExternalLink size={11} />
              </a>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <div className="mt-4 flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${t.newsSlideLabel} ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === activeIndex ? 'w-6 bg-blue-500' : 'w-2 bg-neutral-700 hover:bg-neutral-500'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
