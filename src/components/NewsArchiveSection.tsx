import { ExternalLink, Newspaper, Calendar } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getTranslation, type Locale } from '../i18n'
import type { NewsArticle } from './HeroSection'

interface NewsArchiveSectionProps {
  lang: Locale
  news: NewsArticle[]
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
    <section className="">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
            <span>DOKUMENTEN-ARCHIV</span>
          </div>
          <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            <Newspaper className="text-blue-600 dark:text-blue-400 shrink-0" size={24} />
            {t.archiveTitle}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)] font-medium">
            {t.archiveSub}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            {news.length} {news.length === 1 ? t.archiveEntry : t.archiveEntries}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsExpanded((prev) => !prev)
              if (!isExpanded) setPage(1)
            }}
            className="px-3.5 py-1.5 font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider transition-colors hover:border-blue-600 cursor-pointer"
          >
            {isExpanded ? t.archiveCollapse : t.archiveExpand}
          </button>
        </div>
      </div>

      {/* Content list */}
      <div className="p-6 md:p-8">
        {news.length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-[var(--text-muted)]">
            {t.noNews}
          </div>
        ) : !isExpanded ? (
          <div className="space-y-3">
            <div className="border border-[var(--border)] bg-[var(--bg-secondary)]/30 px-4 py-3 text-center">
              <p className="text-xs font-mono text-[var(--text-secondary)]">{t.archiveCollapsedHint}</p>
            </div>
            <div className="max-h-96 overflow-y-auto border border-[var(--border)] divide-y divide-[var(--border)]">
              {news.map((item, idx) => {
                const primarySource = getPrimarySource(item)
                return (
                  <div key={idx} className="p-4 transition-colors hover:bg-[var(--bg-secondary)]/40">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {item.date}
                      </span>
                      {primarySource && (
                        <a
                          href={primarySource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-blue-600 dark:hover:text-blue-400 uppercase"
                        >
                          <span>{primarySource.name}</span>
                          <ExternalLink size={10} className="shrink-0" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {getLocalizedText(item.title)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((dateStr) => (
              <div key={dateStr} className="border border-[var(--border)]">
                {/* Date header */}
                <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] px-4 py-2.5 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                  <Calendar size={13} />
                  {dateStr}
                </div>
                {/* List of articles for this date */}
                <div className="divide-y divide-[var(--border)]">
                  {groupedByDate[dateStr].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-secondary)]/40 transition-colors"
                    >
                      {/* Left: Source Badges & Title */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap gap-2">
                          {item.sources && item.sources.length > 0 ? (
                            item.sources.map((src, sIdx) => (
                              <span 
                                key={sIdx} 
                                className="font-mono text-[10px] font-bold tracking-wide uppercase text-blue-600 dark:text-blue-400"
                              >
                                {src.name}
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-[10px] font-bold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                              {item.source}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                          {getLocalizedText(item.title)}
                        </h4>
                      </div>

                      {/* Right: Named outbound links */}
                      <div className="flex flex-wrap gap-x-2 gap-y-1 shrink-0 text-xs mt-1 sm:mt-0 font-mono">
                        {item.sources && item.sources.length > 0 ? (
                          item.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-1"
                            >
                              <span>{src.name}</span>
                              <ExternalLink size={10} className="shrink-0 text-[var(--text-muted)]" />
                            </a>
                          ))
                        ) : (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-1"
                          >
                            <span>{t.readMore}</span>
                            <ExternalLink size={10} className="shrink-0 text-[var(--text-muted)]" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 border border-[var(--border)] bg-[var(--bg-secondary)] p-4 md:flex-row md:justify-between font-mono text-xs">
                <span className="text-[var(--text-muted)]">
                  {t.archiveShowingLabel} {pageStart}-{pageEnd} / {news.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.archivePrevPage}
                  </button>
                  <span className="font-bold text-[var(--text-secondary)]">
                    {t.archivePageLabel} {currentPage}/{totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
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
