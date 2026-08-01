import { useState } from 'react'

export type HeroCtaVariant = 'A' | 'B'

const STORAGE_KEY = 'rescue-blue-exp-hero-cta-v1'

function resolveVariant(): HeroCtaVariant {
  if (typeof window === 'undefined') {
    return 'A'
  }

  const existing = window.localStorage.getItem(STORAGE_KEY)
  if (existing === 'A' || existing === 'B') {
    return existing
  }

  const assigned: HeroCtaVariant = Math.random() < 0.5 ? 'A' : 'B'
  window.localStorage.setItem(STORAGE_KEY, assigned)
  return assigned
}

export function useAbVariant(): HeroCtaVariant {
  const [variant] = useState<HeroCtaVariant>(() => resolveVariant())

  return variant
}
