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
    return 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400'
  }
  if (s.includes('zeit')) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  }
  if (s.includes('taz')) {
    return 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
  }
  if (s.includes('correctiv')) {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
  }
  if (s.includes('volksverpetzer')) {
    return 'border-lime-500/30 bg-lime-500/10 text-lime-600 dark:text-lime-400'
  }
  if (s.includes('tagesschau')) {
    return 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400'
  }
  if (s.includes('süddeutsche')) {
    return 'border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400'
  }
  return 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
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
    <section className="editorial-card p-6 md:p-8 space-y-6">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">DOKUMENTEN-ARCHIV</span>
            <span className="h-px w-12 bg-[var(--border)]" />
          </div>
          <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            <Newspaper className="text-blue-600 dark:text-blue-400 shrink-0" size={24} />
            {t.archiveTitle}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)] font-medium">
            {t.archiveSub}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-1.5 font-mono text-xs font-semibold text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            {news.length} {news.length === 1 ? t.archiveEntry : t.archiveEntries}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsExpanded((prev) => !prev)
              if (!isExpanded) setPage(1)
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            {isExpanded ? t.archiveCollapse : t.archiveExpand}
          </button>
        </div>
      </div>

      {/* Content list grouped by date */}
      {news.length === 0 ? (
        <div className="py-12 text-center text-sm font-semibold text-[var(--text-muted)]">
          {t.noNews}
        </div>
      ) : !isExpanded ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-center">
            <p className="text-sm text-[var(--text-secondary)]">{t.archiveCollapsedHint}</p>
          </div>
          <div className="max-h-96 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/50">
            <div className="divide-y divide-[var(--border-subtle)]">
              {news.map((item, idx) => {
                const primarySource = getPrimarySource(item)
                return (
                  <div key={idx} className="p-3.5 transition-colors hover:bg-[var(--bg-hover)]">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        {item.date}
                      </span>
                      {primarySource && (
                        <a
                          href={primarySource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--text-secondary)] transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <span>{primarySource.name}</span>
                          <ExternalLink size={10} className="shrink-0" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
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
            <div key={dateStr} className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-secondary)]/30">
              {/* Date header */}
              <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] px-4 py-2.5 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                <Calendar size={13} />
                {dateStr}
              </div>
              {/* List of articles for this date */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {groupedByDate[dateStr].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-hover)] transition-colors group"
                  >
                    {/* Left: Source Badges & Title */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {item.sources && item.sources.length > 0 ? (
                          item.sources.map((src, sIdx) => (
                            <span 
                              key={sIdx} 
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide uppercase leading-none ${getSourceBadgeClass(src.name)}`}
                            >
                              {src.name}
                            </span>
                          ))
                        ) : (
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wide uppercase leading-none ${getSourceBadgeClass(item.source || 'Unknown')}`}>
                            {item.source}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
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
                            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all border border-[var(--border)] bg-[var(--bg-card)] hover:border-blue-500/40 px-2.5 py-1 rounded-lg"
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
                          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all border border-[var(--border)] bg-[var(--bg-card)] hover:border-blue-500/40 px-2.5 py-1 rounded-lg"
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
            <div className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 md:flex-row md:justify-between">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {t.archiveShowingLabel} {pageStart}-{pageEnd} / {news.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t.archivePrevPage}
                </button>
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {t.archivePageLabel} {currentPage}/{totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t.archiveNextPage}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
