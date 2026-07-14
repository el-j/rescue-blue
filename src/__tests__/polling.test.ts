import { describe, expect, it } from 'vitest'
import {
  getDefaultPollingBars,
  parsePollingSnapshot,
  POLLING_LOCKED_INSTITUTE,
  POLLING_SOURCE_URL,
} from '../polling'

// ---------------------------------------------------------------------------
// Helpers – minimal valid payload builder
// ---------------------------------------------------------------------------

function buildPayload(overrides: Record<string, unknown> = {}) {
  return {
    Database: { Last_Update: '2026-06-01T00:00:00+02:00' },
    Institutes: { '5': { Name: 'Forsa' } },
    Methods: { '4': { Name: 'Online' } },
    Surveys: {
      '1': {
        Date: '2026-06-01',
        Parliament_ID: '0',
        Institute_ID: '5',
        Method_ID: '4',
        Surveyed_Persons: '1500',
        Survey_Period: { Date_Start: '2026-05-28', Date_End: '2026-05-31' },
        Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10, '0': 6 },
      },
    },
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// parsePollingSnapshot – happy path
// ---------------------------------------------------------------------------

describe('parsePollingSnapshot', () => {
  it('parses a valid DAWUM payload and returns a snapshot', () => {
    const snapshot = parsePollingSnapshot(buildPayload())
    expect(snapshot).not.toBeNull()
    expect(snapshot?.instituteName).toBe('Forsa')
    expect(snapshot?.surveyDate).toBe('2026-06-01')
    expect(snapshot?.sourceUrl).toBe(POLLING_SOURCE_URL)
  })

  it('computes correct bar percentages', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    const afd = snapshot.bars.find((b) => b.key === 'afd')
    const cdu = snapshot.bars.find((b) => b.key === 'cdu')
    const others = snapshot.bars.find((b) => b.key === 'others')
    expect(afd?.pct).toBe(29)
    expect(cdu?.pct).toBe(22)
    // others = 100 - (22+29+13+14+10) = 12
    expect(others?.pct).toBe(12)
  })

  it('returns correct methodName when Methods entry exists', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    expect(snapshot.methodName).toBe('Online')
  })

  it('returns null methodName when Method_ID is missing from Methods', () => {
    const payload = buildPayload({ Methods: {} })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.methodName).toBeNull()
  })

  it('returns correct surveyPeriod when Survey_Period exists', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    expect(snapshot.surveyPeriod).toEqual({ start: '2026-05-28', end: '2026-05-31' })
  })

  it('returns null surveyPeriod when Survey_Period is absent', () => {
    const payload = buildPayload()
    // Remove Survey_Period from the survey
    ;(payload.Surveys['1'] as Record<string, unknown>).Survey_Period = undefined
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.surveyPeriod).toBeNull()
  })

  it('returns surveyedPersons as a number', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    expect(snapshot.surveyedPersons).toBe(1500)
  })

  it('returns null surveyedPersons when field is missing', () => {
    const payload = buildPayload()
    delete (payload.Surveys['1'] as Record<string, unknown>).Surveyed_Persons
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.surveyedPersons).toBeNull()
  })

  it('returns correct apiUpdatedAt from Database.Last_Update', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    expect(snapshot.apiUpdatedAt).toBe('2026-06-01T00:00:00+02:00')
  })

  it('returns null apiUpdatedAt when Database is missing', () => {
    const payload = buildPayload({ Database: null })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.apiUpdatedAt).toBeNull()
  })

  it('falls back to POLLING_LOCKED_INSTITUTE when Institute has no Name', () => {
    const payload = buildPayload({ Institutes: { '5': { Id: 5 } } })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.instituteName).toBe(POLLING_LOCKED_INSTITUTE)
  })

  it('falls back to POLLING_LOCKED_INSTITUTE when Institutes dict is missing', () => {
    const payload = buildPayload({ Institutes: null })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.instituteName).toBe(POLLING_LOCKED_INSTITUTE)
  })

  it('selects the most recent survey when multiple surveys exist', () => {
    const payload = buildPayload({
      Surveys: {
        older: {
          Date: '2026-05-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 20, '7': 25, '2': 15, '4': 12, '5': 9 },
        },
        newer: {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.surveyDate).toBe('2026-06-01')
    expect(snapshot.bars.find((b) => b.key === 'afd')?.pct).toBe(29)
  })

  it('skips surveys that are not for Parliament_ID 0 (Bundestag)', () => {
    const payload = buildPayload({
      Surveys: {
        landtag: {
          Date: '2026-06-15',
          Parliament_ID: '1', // Not Bundestag
          Institute_ID: '5',
          Results: { '1': 30, '7': 30, '2': 15, '4': 10, '5': 5 },
        },
        bundestag: {
          Date: '2026-05-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.surveyDate).toBe('2026-05-01')
  })

  it('skips surveys with incomplete Results and tries next', () => {
    const payload = buildPayload({
      Surveys: {
        bad: {
          Date: '2026-06-10',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': null }, // missing required parties
        },
        good: {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.surveyDate).toBe('2026-06-01')
  })

  it('returns null when Surveys is empty', () => {
    const payload = buildPayload({ Surveys: {} })
    expect(parsePollingSnapshot(payload)).toBeNull()
  })

  it('skips INSA surveys and returns null when only INSA surveys are available', () => {
    const payload = buildPayload({
      Institutes: { '5': { Name: 'INSA' } },
      Surveys: {
        '1': {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
      },
    })
    expect(parsePollingSnapshot(payload)).toBeNull()
  })

  it('skips INSA survey and picks the next non-INSA survey', () => {
    const payload = buildPayload({
      Institutes: { '5': { Name: 'INSA' }, '3': { Name: 'Infratest dimap' } },
      Surveys: {
        'newer-insa': {
          Date: '2026-06-15',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
        'older-infratest': {
          Date: '2026-06-10',
          Parliament_ID: '0',
          Institute_ID: '3',
          Results: { '1': 25, '7': 27, '2': 15, '4': 13, '5': 9 },
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot).not.toBeNull()
    expect(snapshot.instituteName).toBe('Infratest dimap')
    expect(snapshot.surveyDate).toBe('2026-06-10')
  })

  it('returns null when Surveys field is missing', () => {
    const payload = buildPayload({ Surveys: null })
    expect(parsePollingSnapshot(payload)).toBeNull()
  })

  it('returns null for null input', () => {
    expect(parsePollingSnapshot(null)).toBeNull()
  })

  it('returns null for string input', () => {
    expect(parsePollingSnapshot('not an object')).toBeNull()
  })

  it('returns null for empty object', () => {
    expect(parsePollingSnapshot({})).toBeNull()
  })

  it('unwraps allorigins contents wrapper and parses', () => {
    const inner = {
      Database: { Last_Update: '2026-06-01' },
      Institutes: { '5': { Name: 'Forsa' } },
      Methods: {},
      Surveys: {
        '1': {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
        },
      },
    }
    const snapshot = parsePollingSnapshot({ contents: JSON.stringify(inner) })
    expect(snapshot).not.toBeNull()
    expect(snapshot?.bars.find((b) => b.key === 'afd')?.pct).toBe(29)
  })

  it('returns null when allorigins contents is invalid JSON', () => {
    expect(parsePollingSnapshot({ contents: 'not json' })).toBeNull()
  })

  it('clamps others to 0 when survey values sum to > 100', () => {
    // This tests roundOne and Math.max(0, ...) in the others calculation
    const payload = buildPayload({
      Surveys: {
        '1': {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': 30, '7': 30, '2': 20, '4': 15, '5': 10 },
          // sum = 105, others should clamp to 0
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.bars.find((b) => b.key === 'others')?.pct).toBe(0)
  })

  it('handles string number values in Results (comma-separated)', () => {
    const payload = buildPayload({
      Surveys: {
        '1': {
          Date: '2026-06-01',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: { '1': '22,5', '7': '29,0', '2': '13,5', '4': '14,0', '5': '10,0' },
        },
      },
    })
    const snapshot = parsePollingSnapshot(payload)!
    expect(snapshot.bars.find((b) => b.key === 'cdu')?.pct).toBe(22.5)
    expect(snapshot.bars.find((b) => b.key === 'afd')?.pct).toBe(29)
  })

  it('preserves all bar metadata (isAfd, defaultColor, labels)', () => {
    const snapshot = parsePollingSnapshot(buildPayload())!
    const afdBar = snapshot.bars.find((b) => b.key === 'afd')!
    expect(afdBar.isAfd).toBe(true)
    expect(afdBar.labelDe).toBe('AfD')
    expect(afdBar.labelEn).toBe('AfD')
    expect(afdBar.defaultColor).toContain('cyan')
    const cduBar = snapshot.bars.find((b) => b.key === 'cdu')!
    expect(cduBar.isAfd).toBe(false)
  })

  it('surveyDate falls back gracefully for non-ISO date strings', () => {
    const payload = buildPayload()
    ;(payload.Surveys['1'] as Record<string, unknown>).Date = 'January 2026'
    const snapshot = parsePollingSnapshot(payload)!
    // formatIsoDate returns null for non-ISO, so it falls back to the raw string
    expect(snapshot.surveyDate).toBe('January 2026')
  })
})

// ---------------------------------------------------------------------------
// getDefaultPollingBars
// ---------------------------------------------------------------------------

describe('getDefaultPollingBars', () => {
  it('returns 6 bars', () => {
    const bars = getDefaultPollingBars()
    expect(bars).toHaveLength(6)
  })

  it('returns a fresh copy on each call (not the same reference)', () => {
    const a = getDefaultPollingBars()
    const b = getDefaultPollingBars()
    expect(a).not.toBe(b)
    a[0].pct = 999
    expect(b[0].pct).not.toBe(999)
  })

  it('includes an AfD bar with isAfd=true', () => {
    const bars = getDefaultPollingBars()
    const afd = bars.find((b) => b.key === 'afd')
    expect(afd).toBeDefined()
    expect(afd?.isAfd).toBe(true)
  })

  it('all non-AfD bars have isAfd=false', () => {
    const bars = getDefaultPollingBars()
    const nonAfd = bars.filter((b) => b.key !== 'afd')
    expect(nonAfd.every((b) => !b.isAfd)).toBe(true)
  })

  it('bars have expected party keys', () => {
    const bars = getDefaultPollingBars()
    const keys = bars.map((b) => b.key)
    expect(keys).toContain('cdu')
    expect(keys).toContain('afd')
    expect(keys).toContain('spd')
    expect(keys).toContain('greens')
    expect(keys).toContain('left')
    expect(keys).toContain('others')
  })
})
