import { ExternalLink, Newspaper, Calendar } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getTranslation, type Locale } from '../i18n'
import type { NewsArticle } from './HeroSection'

interface NewsArchiveSectionProps {
  lang: Locale
  news: NewsArticle[]
}

const getSourceBadgeClass = (source: string) => {
  const s = source.toLowerCase()
  if (s.includes('spiegel')) {
    return 'border-rose-500/20 bg-rose-500/10 text-rose-400'
  }
  if (s.includes('zeit')) {
    return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
  }
  if (s.includes('taz')) {
    return 'border-red-500/20 bg-red-500/10 text-red-400'
  }
  if (s.includes('correctiv')) {
    return 'border-amber-500/20 bg-amber-500/10 text-amber-400'
  }
  if (s.includes('volksverpetzer')) {
    return 'border-lime-500/20 bg-lime-500/10 text-lime-400'
  }
  if (s.includes('tagesschau')) {
    return 'border-blue-500/20 bg-blue-500/10 text-blue-400'
  }
  if (s.includes('süddeutsche')) {
    return 'border-teal-500/20 bg-teal-500/10 text-teal-400'
  }
  return 'border-neutral-700 bg-neutral-800 text-neutral-300'
}

export function NewsArchiveSection({ lang, news }: NewsArchiveSectionProps) {
  const t = getTranslation(lang)
  const [isExpanded, setIsExpanded] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.max(1, Math.ceil(news.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return news.slice(start, start + pageSize)
  }, [news, currentPage])

  const getLocalizedText = (field: string | Record<string, string> | undefined) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] ?? field['de'] ?? ''
  }

  // Group current page by date
  const groupedByDate = pageItems.reduce<Record<string, NewsArticle[]>>((acc, item) => {
    const d = item.date
    if (!acc[d]) {
      acc[d] = []
    }
    acc[d].push(item)
    return acc
  }, {})

  // Get sorted unique dates (newest first) for this page
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a))

  const pageStart = news.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const pageEnd = Math.min(currentPage * pageSize, news.length)

  const getPrimarySource = (item: NewsArticle) => {
    if (item.sources && item.sources.length > 0) {
      return item.sources[0]
    }
    if (item.url) {
      return {
        name: item.source || t.readMore,
        url: item.url,
      }
    }
    return null
  }

  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
              <Newspaper className="text-blue-500 shrink-0" size={28} />
              {t.archiveTitle}
            </h2>
            <p className="text-sm text-neutral-400 font-medium">
              {t.archiveSub}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs font-semibold text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              {news.length} {news.length === 1 ? t.archiveEntry : t.archiveEntries}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsExpanded((prev) => !prev)
                if (!isExpanded) setPage(1)
              }}
              className="rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-colors hover:text-white"
            >
              {isExpanded ? t.archiveCollapse : t.archiveExpand}
            </button>
          </div>
        </div>

        {/* Content list grouped by date */}
        {news.length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-neutral-500">
            {t.noNews}
          </div>
        ) : !isExpanded ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 px-4 py-3 text-center">
              <p className="text-sm text-neutral-400">{t.archiveCollapsedHint}</p>
            </div>
            <div className="max-h-96 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/10">
              <div className="divide-y divide-neutral-800/60">
                {news.map((item, idx) => {
                  const primarySource = getPrimarySource(item)
                  return (
                    <div key={idx} className="p-3 transition-colors hover:bg-neutral-900/40">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                          {item.date}
                        </span>
                        {primarySource && (
                          <a
                            href={primarySource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded border border-neutral-700 bg-neutral-900/70 px-2 py-0.5 text-[10px] font-semibold text-neutral-300 transition-colors hover:text-blue-400"
                          >
                            <span>{primarySource.name}</span>
                            <ExternalLink size={10} className="shrink-0" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-300">
                        {getLocalizedText(item.title)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((dateStr) => (
              <div key={dateStr} className="border border-neutral-800/80 bg-neutral-950/15 rounded-xl overflow-hidden shadow-inner">
                {/* Date header */}
                <div className="bg-neutral-900/60 border-b border-neutral-800/80 px-4 py-2 flex items-center gap-2 text-xs font-bold text-blue-400 font-mono">
                   <Calendar size={12} />
                  {dateStr}
                </div>
                {/* List of articles for this date */}
                <div className="divide-y divide-neutral-800/50">
                  {groupedByDate[dateStr].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-900/50 transition-all duration-150 group"
                    >
                      {/* Left: Source Badges & Title */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap gap-1.5">
                          {item.sources && item.sources.length > 0 ? (
                            item.sources.map((src, sIdx) => (
                              <span 
                                key={sIdx} 
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase leading-none ${getSourceBadgeClass(src.name)}`}
                              >
                                {src.name}
                              </span>
                            ))
                          ) : (
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase leading-none ${getSourceBadgeClass(item.source || 'Unknown')}`}>
                              {item.source}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors leading-snug">
                          {getLocalizedText(item.title)}
                        </h4>
                      </div>

                      {/* Right: Named outbound links */}
                      <div className="flex flex-wrap gap-x-2 gap-y-1 shrink-0 text-xs mt-1 sm:mt-0">
                        {item.sources && item.sources.length > 0 ? (
                          item.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-blue-400 font-semibold transition-all border border-neutral-800 bg-neutral-900/50 hover:border-blue-500/20 hover:bg-neutral-900 px-2.5 py-1 rounded-lg"
                            >
                              <span>{src.name}</span>
                              <ExternalLink size={10} className="shrink-0 text-neutral-500" />
                            </a>
                          ))
                        ) : (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-blue-400 font-semibold transition-all border border-neutral-800 bg-neutral-900/50 hover:border-blue-500/20 hover:bg-neutral-900 px-2.5 py-1 rounded-lg"
                          >
                            <span>{t.readMore}</span>
                            <ExternalLink size={10} className="shrink-0 text-neutral-500" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/20 px-4 py-3 md:flex-row md:justify-between">
                <span className="text-xs text-neutral-400">
                  {t.archiveShowingLabel} {pageStart}-{pageEnd} / {news.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.archivePrevPage}
                  </button>
                  <span className="text-xs font-semibold text-neutral-400">
                    {t.archivePageLabel} {currentPage}/{totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.archiveNextPage}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
