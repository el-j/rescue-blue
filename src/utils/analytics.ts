export type ConversionEventName =
  | 'ab_impression'
  | 'cta_click'
  | 'funnel_step'
  | 'language_change'
  | 'page_view'

export interface ConversionEventPayload {
  [key: string]: string | number | boolean | null | undefined
}

interface ConversionEvent {
  event: ConversionEventName
  ts: string
  payload: ConversionEventPayload
}

declare global {
  interface Window {
    dataLayer?: ConversionEvent[]
  }
}

function getAnalyticsEndpoint(): string | undefined {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined
  if (!endpoint) return undefined
  return endpoint.trim() || undefined
}

export function trackConversionEvent(event: ConversionEventName, payload: ConversionEventPayload = {}): void {
  if (typeof window === 'undefined') return

  const entry: ConversionEvent = {
    event,
    ts: new Date().toISOString(),
    payload,
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(entry)

  const endpoint = getAnalyticsEndpoint()
  if (!endpoint) return

  const body = JSON.stringify(entry)

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const sent = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))
    if (sent) return
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics must never break UX flow.
  })
}
