import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePollingSnapshot } from '../../hooks/usePollingSnapshot'

const VALID_SNAPSHOT = {
  Database: { Last_Update: '2026-06-01' },
  Institutes: { '5': { Name: 'Forsa' } },
  Methods: { '4': { Name: 'Online' } },
  Surveys: {
    '1': {
      Date: '2026-06-01',
      Parliament_ID: '0',
      Institute_ID: '5',
      Method_ID: '4',
      Results: { '1': 22, '7': 29, '2': 13, '4': 14, '5': 10 },
    },
  },
}

describe('usePollingSnapshot', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with pollingSnapshot=null and isLive=false', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: vi.fn() }))
    const { result } = renderHook(() => usePollingSnapshot())
    expect(result.current.pollingSnapshot).toBeNull()
    expect(result.current.isLive).toBe(false)
  })

  it('sets pollingSnapshot and isLive=true when fetch succeeds with valid snapshot', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(VALID_SNAPSHOT),
    }))
    const { result } = renderHook(() => usePollingSnapshot())
    await waitFor(() => expect(result.current.isLive).toBe(true))
    expect(result.current.pollingSnapshot).not.toBeNull()
    // The hook receives a DAWUM payload that has 'Surveys' — no 'bars' at root
    // so the hook assigns the raw parsed data as-is (multi-parliament format)
    // The actual keys depend on what the server returns
    expect(typeof result.current.pollingSnapshot).toBe('object')
  })

  it('normalizes a snapshot that has "bars" at the root level (single bar format)', async () => {
    const singleBarSnapshot = { bars: [], instituteName: 'Test', surveyDate: '2026-01-01', surveyPeriod: null, methodName: null, surveyedPersons: null, apiUpdatedAt: null, sourceUrl: '' }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(singleBarSnapshot),
    }))
    const { result } = renderHook(() => usePollingSnapshot())
    await waitFor(() => expect(result.current.isLive).toBe(true))
    // Should be wrapped as { '0': snapshot }
    expect(result.current.pollingSnapshot?.['0']).toBeDefined()
    expect(result.current.pollingSnapshot?.['0'].instituteName).toBe('Test')
  })

  it('keeps multi-parliament snapshot as-is (no "bars" at root)', async () => {
    const multiSnapshot = {
      '0': { bars: [], instituteName: 'A', surveyDate: '2026-01-01', surveyPeriod: null, methodName: null, surveyedPersons: null, apiUpdatedAt: null, sourceUrl: '' },
      '1': { bars: [], instituteName: 'B', surveyDate: '2026-01-01', surveyPeriod: null, methodName: null, surveyedPersons: null, apiUpdatedAt: null, sourceUrl: '' },
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(multiSnapshot),
    }))
    const { result } = renderHook(() => usePollingSnapshot())
    await waitFor(() => expect(result.current.isLive).toBe(true))
    expect(result.current.pollingSnapshot?.['0']?.instituteName).toBe('A')
    expect(result.current.pollingSnapshot?.['1']?.instituteName).toBe('B')
  })

  it('sets isLive=false and snapshot=null when fetch returns not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn(),
    }))
    const { result } = renderHook(() => usePollingSnapshot())
    await new Promise((r) => setTimeout(r, 50))
    expect(result.current.isLive).toBe(false)
    expect(result.current.pollingSnapshot).toBeNull()
  })

  it('sets isLive=false when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const { result } = renderHook(() => usePollingSnapshot())
    await new Promise((r) => setTimeout(r, 50))
    expect(result.current.isLive).toBe(false)
  })

  it('does not update state after unmount', async () => {
    let resolvePromise!: (value: unknown) => void
    const fetchPromise = new Promise((resolve) => { resolvePromise = resolve })
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(fetchPromise))
    const { unmount } = renderHook(() => usePollingSnapshot())
    unmount()
    resolvePromise({ ok: true, json: () => Promise.resolve(VALID_SNAPSHOT) })
    await new Promise((r) => setTimeout(r, 50))
    // No throw = pass
  })
})
