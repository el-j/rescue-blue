import type { NewsArticle, NewsSource } from '../components/HeroSection'

export const PAYWALL_DOMAINS = [
  'zeit.de',
  'spiegel.de',
  'sueddeutsche.de',
  'welt.de',
  'faz.net',
  'focus.de',
  'tagesspiegel.de',
  'handelsblatt.com',
  'nzz.ch',
]

export function extractDirectUrl(url: string): string {
  if (!url) return ''
  const trimmed = url.trim()
  const parts = trimmed.split(/(?=https?:\/\/)/i).filter((p) => /^https?:\/\//i.test(p))
  if (parts.length > 1) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]
      if (!/archive\.(?:ph|today|is|li|vn|md)|web\.archive\.org/i.test(p)) {
        return p
      }
    }
  }
  return trimmed
}

export function isPaywallUrl(url: string): boolean {
  const direct = extractDirectUrl(url)
  try {
    const host = new URL(direct).hostname.toLowerCase()
    return PAYWALL_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

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
  const inputSources: NewsSource[] =
    sources && sources.length > 0
      ? sources
      : fallbackUrl
        ? [{ name: fallbackSource || 'Quelle', url: fallbackUrl }]
        : []

  // Expand paywalled sources so both normal link and archive link are guaranteed
  const expanded: NewsSource[] = []
  for (const src of inputSources) {
    if (!src || !src.url) continue
    const directUrl = extractDirectUrl(src.url)
    const isArchive =
      /\((archiv|archive)\)/i.test(src.name) ||
      /archive\.(?:ph|today|is|li|vn|md)|web\.archive\.org/i.test(src.url)
    const baseName = src.name.replace(/\s*\((archiv|archive)\)/i, '').trim()

    if (isPaywallUrl(src.url) || (isArchive && isPaywallUrl(directUrl))) {
      expanded.push({
        name: baseName,
        url: directUrl,
      })
      expanded.push({
        name: `${baseName} (Archiv)`,
        url: `https://archive.ph/${directUrl}`,
      })
    } else {
      expanded.push(src)
    }
  }

  // Deduplicate while preserving order: normal link followed by archive link
  const seenNames = new Set<string>()
  const seenUrls = new Set<string>()
  const result: NewsSource[] = []

  for (const src of expanded) {
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
