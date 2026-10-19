import type { NewsArticle, NewsSource } from '../components/HeroSection'

export function normalizeUrl(url: string): string {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '')
    const path = parsed.pathname.replace(/\/$/, '')
    return `${host}${path}`
  } catch {
    return url.trim().toLowerCase().replace(/\/$/, '')
  }
}

export function deduplicateSources(
  sources: NewsSource[] | undefined,
  fallbackUrl?: string,
  fallbackSource?: string
): NewsSource[] {
  const rawSources: NewsSource[] =
    sources && sources.length > 0
      ? sources
      : fallbackUrl
        ? [{ name: fallbackSource || 'Quelle', url: fallbackUrl }]
        : []

  const seenNames = new Set<string>()
  const seenUrls = new Set<string>()
  const result: NewsSource[] = []

  for (const src of rawSources) {
    if (!src || !src.url) continue
    const nameKey = src.name.trim().toLowerCase()
    const urlKey = normalizeUrl(src.url)

    if (seenNames.has(nameKey) || seenUrls.has(urlKey)) {
      continue
    }

    seenNames.add(nameKey)
    seenUrls.add(urlKey)
    result.push(src)
  }

  return result
}

export function getOriginSources(sources: NewsSource[]): NewsSource[] {
  const nonArchive = sources.filter(
    (s) => !/\((archiv|archive)\)/i.test(s.name)
  )
  return nonArchive.length > 0 ? nonArchive : sources
}

export function getPrimaryArticleUrl(article: NewsArticle): string | undefined {
  const deduped = deduplicateSources(article.sources, article.url, article.source)
  const origins = getOriginSources(deduped)
  return origins[0]?.url || deduped[0]?.url || article.url
}
