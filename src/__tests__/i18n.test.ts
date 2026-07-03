import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  applyTheme,
  BAR_TEMPLATE,
  detectLocale,
  detectTheme,
  getFaqs,
  getFacts,
  getLocaleCode,
  getOpenLetters,
  getPolicyDangers,
  getPolicyDangersUI,
  getSayings,
  getScienceContent,
  getTranslation,
  LOCALE_INFO,
  persistLocale,
  persistTheme,
  SUPPORTED_LOCALES,
} from '../i18n'

// ---------------------------------------------------------------------------
// SUPPORTED_LOCALES & LOCALE_INFO
// ---------------------------------------------------------------------------

describe('SUPPORTED_LOCALES', () => {
  it('contains exactly 9 locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(9)
  })

  it('includes de and en', () => {
    expect(SUPPORTED_LOCALES).toContain('de')
    expect(SUPPORTED_LOCALES).toContain('en')
  })
})

describe('LOCALE_INFO', () => {
  it('has one entry per supported locale', () => {
    expect(LOCALE_INFO).toHaveLength(SUPPORTED_LOCALES.length)
  })

  it('each entry has code, nativeName, flag, bcp47', () => {
    for (const info of LOCALE_INFO) {
      expect(info.code).toBeTruthy()
      expect(info.nativeName).toBeTruthy()
      expect(info.flag).toBeTruthy()
      expect(info.bcp47).toBeTruthy()
    }
  })
})

// ---------------------------------------------------------------------------
// getLocaleCode
// ---------------------------------------------------------------------------

describe('getLocaleCode', () => {
  it('returns de-DE for de', () => {
    expect(getLocaleCode('de')).toBe('de-DE')
  })

  it('returns en-GB for en', () => {
    expect(getLocaleCode('en')).toBe('en-GB')
  })

  it('returns fr-FR for fr', () => {
    expect(getLocaleCode('fr')).toBe('fr-FR')
  })

  it('returns de-DE as fallback for unknown (via TypeScript cast)', () => {
    // Force cast to test the fallback branch
    expect(getLocaleCode('xx' as 'de')).toBe('de-DE')
  })
})

// ---------------------------------------------------------------------------
// getTranslation
// ---------------------------------------------------------------------------

describe('getTranslation', () => {
  it('returns a DE translation object with expected keys', () => {
    const t = getTranslation('de')
    expect(t).toBeDefined()
    expect(typeof t.navSign).toBe('string')
  })

  it('returns an EN translation object with different navSign text', () => {
    const tDe = getTranslation('de')
    const tEn = getTranslation('en')
    expect(tDe.navSign).not.toBe(tEn.navSign)
  })

  it('returns translation objects for all supported locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const t = getTranslation(locale)
      expect(t).toBeDefined()
      expect(typeof t.navSign).toBe('string')
    }
  })
})

// ---------------------------------------------------------------------------
// getSayings / getOpenLetters / getFaqs / getFacts / getScienceContent
// ---------------------------------------------------------------------------

describe('getSayings', () => {
  it('returns sayings with at least one key for DE', () => {
    const sayings = getSayings('de')
    expect(Object.keys(sayings).length).toBeGreaterThan(0)
  })
})

describe('getOpenLetters', () => {
  it('returns open letters for EN', () => {
    const letters = getOpenLetters('en')
    expect(letters).toBeDefined()
  })
})

describe('getFaqs', () => {
  it('returns array of FAQ items for DE', () => {
    const faqs = getFaqs('de')
    expect(Array.isArray(faqs)).toBe(true)
    expect(faqs.length).toBeGreaterThan(0)
  })

  it('each FAQ has question and answer', () => {
    const faqs = getFaqs('de')
    for (const faq of faqs) {
      expect(typeof faq.q).toBe('string')
      expect(typeof faq.a).toBe('string')
    }
  })
})

describe('getFacts', () => {
  it('returns facts for EN', () => {
    const facts = getFacts('en')
    expect(facts).toBeDefined()
  })
})

describe('getScienceContent', () => {
  it('returns science content object for DE', () => {
    const sc = getScienceContent('de')
    expect(sc).toBeDefined()
  })
})

describe('getPolicyDangers', () => {
  it('returns policy dangers for DE', () => {
    const pd = getPolicyDangers('de')
    expect(pd).toBeDefined()
  })
})

describe('getPolicyDangersUI', () => {
  it('returns policy dangers UI strings for DE', () => {
    const pdui = getPolicyDangersUI('de')
    expect(pdui).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// detectLocale
// ---------------------------------------------------------------------------

describe('detectLocale', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(window.navigator, 'language', {
      value: 'de-DE',
      configurable: true,
      writable: true,
    })
    Object.defineProperty(window.navigator, 'languages', {
      value: ['de-DE'],
      configurable: true,
      writable: true,
    })
  })

  it('returns stored locale from localStorage if valid', () => {
    localStorage.setItem('rescue-blue-lang', 'fr')
    expect(detectLocale()).toBe('fr')
  })

  it('ignores invalid stored locale and falls back to browser language', () => {
    localStorage.setItem('rescue-blue-lang', 'zz')
    Object.defineProperty(window.navigator, 'languages', {
      value: ['en-US'],
      configurable: true,
      writable: true,
    })
    expect(detectLocale()).toBe('en')
  })

  it('detects browser language "en-US" as "en"', () => {
    Object.defineProperty(window.navigator, 'languages', {
      value: ['en-US'],
      configurable: true,
      writable: true,
    })
    expect(detectLocale()).toBe('en')
  })

  it('detects browser language "tr" directly', () => {
    Object.defineProperty(window.navigator, 'languages', {
      value: ['tr'],
      configurable: true,
      writable: true,
    })
    expect(detectLocale()).toBe('tr')
  })

  it('defaults to "de" when browser language is not supported', () => {
    Object.defineProperty(window.navigator, 'languages', {
      value: ['zh-CN'],
      configurable: true,
      writable: true,
    })
    expect(detectLocale()).toBe('de')
  })
})

// ---------------------------------------------------------------------------
// persistLocale
// ---------------------------------------------------------------------------

describe('persistLocale', () => {
  beforeEach(() => localStorage.clear())

  it('writes the locale to localStorage', () => {
    persistLocale('en')
    expect(localStorage.getItem('rescue-blue-lang')).toBe('en')
  })

  it('overwrites a previously stored locale', () => {
    persistLocale('de')
    persistLocale('ru')
    expect(localStorage.getItem('rescue-blue-lang')).toBe('ru')
  })
})

// ---------------------------------------------------------------------------
// detectTheme
// ---------------------------------------------------------------------------

describe('detectTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
  })
  afterEach(() => vi.unstubAllGlobals())

  it('returns stored "light" theme from localStorage', () => {
    localStorage.setItem('rescue-blue-theme', 'light')
    expect(detectTheme()).toBe('light')
  })

  it('returns stored "dark" theme from localStorage', () => {
    localStorage.setItem('rescue-blue-theme', 'dark')
    expect(detectTheme()).toBe('dark')
  })

  it('ignores invalid stored theme and uses matchMedia', () => {
    localStorage.setItem('rescue-blue-theme', 'blue')
    // matchMedia prefers-color-scheme: light returns false → dark
    expect(detectTheme()).toBe('dark')
  })

  it('returns "light" when matchMedia says prefers light', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({ matches: true })),
    )
    expect(detectTheme()).toBe('light')
  })

  it('returns "dark" when matchMedia says prefers dark', () => {
    expect(detectTheme()).toBe('dark')
  })
})

// ---------------------------------------------------------------------------
// persistTheme
// ---------------------------------------------------------------------------

describe('persistTheme', () => {
  beforeEach(() => localStorage.clear())

  it('writes the theme to localStorage', () => {
    persistTheme('light')
    expect(localStorage.getItem('rescue-blue-theme')).toBe('light')
  })

  it('can overwrite to dark', () => {
    persistTheme('light')
    persistTheme('dark')
    expect(localStorage.getItem('rescue-blue-theme')).toBe('dark')
  })
})

// ---------------------------------------------------------------------------
// applyTheme
// ---------------------------------------------------------------------------

describe('applyTheme', () => {
  it('adds "light-theme" class for light theme', () => {
    applyTheme('light')
    expect(document.documentElement.classList.contains('light-theme')).toBe(true)
  })

  it('removes "light-theme" class for dark theme', () => {
    document.documentElement.classList.add('light-theme')
    applyTheme('dark')
    expect(document.documentElement.classList.contains('light-theme')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// BAR_TEMPLATE
// ---------------------------------------------------------------------------

describe('BAR_TEMPLATE', () => {
  it('has 6 entries', () => {
    expect(BAR_TEMPLATE).toHaveLength(6)
  })

  it('has exactly one AfD entry with isAfd=true', () => {
    const afdBars = BAR_TEMPLATE.filter((b) => b.isAfd)
    expect(afdBars).toHaveLength(1)
    expect(afdBars[0].labelDe).toBe('AfD')
  })

  it('all non-AfD bars have isAfd=false', () => {
    const nonAfd = BAR_TEMPLATE.filter((b) => !b.isAfd)
    expect(nonAfd).toHaveLength(5)
  })

  it('each bar has pct, labelDe, labelEn, defaultColor', () => {
    for (const bar of BAR_TEMPLATE) {
      expect(typeof bar.pct).toBe('number')
      expect(typeof bar.labelDe).toBe('string')
      expect(typeof bar.labelEn).toBe('string')
      expect(typeof bar.defaultColor).toBe('string')
    }
  })
})
