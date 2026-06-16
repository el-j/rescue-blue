export const PETITION_URL = 'https://www.change.org/p/%C3%A4ndern-der-afd-darstellung-in-medien-von-blau-zu-braun'

export const PETITION_SOURCES = [
  {
    url: `https://corsproxy.io/?url=${encodeURIComponent(PETITION_URL)}`,
    responseType: 'text',
  },
  {
    url: `https://api.allorigins.win/raw?url=${encodeURIComponent(PETITION_URL)}`,
    responseType: 'text',
  },
  {
    url: `https://api.allorigins.win/get?url=${encodeURIComponent(PETITION_URL)}`,
    responseType: 'json',
  },
] as const

function extractCount(value: string): number | null {
  const digitsOnly = value.replace(/[^\d]/g, '')
  if (!digitsOnly) {
    return null
  }

  const count = Number(digitsOnly)
  return Number.isFinite(count) && count > 0 ? count : null
}

function parseSignatureCountFromHtml(html: string): number | null {
  const document = new DOMParser().parseFromString(html, 'text/html')
  const selectors = [
    '[data-cy="petition-signature-count"]',
    '[data-testid="petition-signature-count"]',
    '[aria-label*="signature" i]',
    '[aria-label*="supporter" i]',
    '[class*="signature"]',
    '[class*="supporter"]',
  ]

  for (const selector of selectors) {
    for (const element of document.querySelectorAll(selector)) {
      const count = extractCount(element.textContent ?? '')
      if (count) {
        return count
      }
    }
  }

  const htmlMatch = html.match(/"(?:displayed_)?signature_count"\s*:\s*"?([\d.,]+)"?/i)
    ?? html.match(/"supporters?_count"\s*:\s*"?([\d.,]+)"?/i)
    ?? html.match(/"supporters?Count"\s*:\s*"?([\d.,]+)"?/i)

  return htmlMatch ? extractCount(htmlMatch[1]) : null
}

export function parseSignatureCount(payload: unknown): number | null {
  if (typeof payload === 'string') {
    const trimmedPayload = payload.trim()
    if (!trimmedPayload) {
      return null
    }

    if (trimmedPayload.startsWith('<')) {
      return parseSignatureCountFromHtml(trimmedPayload)
    }

    try {
      return parseSignatureCount(JSON.parse(trimmedPayload))
    } catch {
      return extractCount(trimmedPayload)
    }
  }

  if (Array.isArray(payload)) {
    for (const entry of payload) {
      const count = parseSignatureCount(entry)
      if (count) {
        return count
      }
    }

    return null
  }

  if (!payload || typeof payload !== 'object') {
    return null
  }

  if ('contents' in payload && typeof payload.contents === 'string') {
    return parseSignatureCount(payload.contents)
  }

  const signatureKeys = [
    'signature_count',
    'displayed_signature_count',
    'supporter_count',
    'supporters_count',
    'supportersCount',
    'count',
  ] as const

  for (const key of signatureKeys) {
    if (key in payload) {
      const count = Number((payload as Record<typeof key, unknown>)[key])
      if (Number.isFinite(count) && count > 0) {
        return count
      }
    }
  }

  for (const value of Object.values(payload)) {
    const count = parseSignatureCount(value)
    if (count) {
      return count
    }
  }

  return null
}
