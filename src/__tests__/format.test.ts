import { describe, expect, it } from 'vitest'
import { formatDisplayDate, formatDisplayDateTime } from '../utils/format'
import type { Locale } from '../i18n'

const LOCALES: Locale[] = ['de', 'en', 'fr', 'es', 'tr', 'uk', 'pl', 'it', 'ru']

describe('formatDisplayDate', () => {
  it('formats a valid ISO date string in German locale', () => {
    const result = formatDisplayDate('2026-06-15', 'de')
    // de-DE: DD.MM.YYYY
    expect(result).toMatch(/15\.06\.2026/)
  })

  it('formats a valid ISO date string in English locale', () => {
    const result = formatDisplayDate('2026-06-15', 'en')
    // en-GB: DD/MM/YYYY
    expect(result).toContain('2026')
    expect(result).toContain('06')
    expect(result).toContain('15')
  })

  it('returns the raw value for an invalid date string', () => {
    const result = formatDisplayDate('not-a-date', 'de')
    expect(result).toBe('not-a-date')
  })

  it('returns the raw value for an empty string', () => {
    const result = formatDisplayDate('', 'de')
    expect(result).toBe('')
  })

  it('formats correctly for all supported locales', () => {
    for (const locale of LOCALES) {
      const result = formatDisplayDate('2026-06-15', locale)
      // All should contain '2026' somewhere in the output
      expect(result).toContain('2026')
    }
  })

  it('handles year boundary dates correctly', () => {
    const result = formatDisplayDate('2026-01-01', 'de')
    expect(result).toContain('2026')
    expect(result).toContain('01')
  })

  it('handles leap day dates correctly', () => {
    const result = formatDisplayDate('2024-02-29', 'de')
    expect(result).toContain('2024')
  })
})

describe('formatDisplayDateTime', () => {
  it('formats a valid ISO datetime string in German locale', () => {
    const result = formatDisplayDateTime('2026-06-15T10:30:00+02:00', 'de')
    expect(result).toContain('2026')
    // German datetime should show hours and minutes
    expect(result).toMatch(/\d{2}:\d{2}/)
  })

  it('formats a valid ISO datetime string in English locale', () => {
    const result = formatDisplayDateTime('2026-06-15T10:30:00+00:00', 'en')
    expect(result).toContain('2026')
  })

  it('returns the raw value for an invalid datetime string', () => {
    const result = formatDisplayDateTime('not-a-datetime', 'de')
    expect(result).toBe('not-a-datetime')
  })

  it('returns empty string for empty input', () => {
    const result = formatDisplayDateTime('', 'de')
    expect(result).toBe('')
  })

  it('formats correctly for all supported locales without throwing', () => {
    for (const locale of LOCALES) {
      const result = formatDisplayDateTime('2026-06-15T12:00:00+00:00', locale)
      expect(result).toBeTruthy()
      expect(result).toContain('2026')
    }
  })

  it('handles midnight UTC datetime', () => {
    const result = formatDisplayDateTime('2026-06-01T00:00:00Z', 'de')
    expect(result).toContain('2026')
  })
})
