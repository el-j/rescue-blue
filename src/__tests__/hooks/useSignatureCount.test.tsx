import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSignatureCount } from '../../hooks/useSignatureCount'

describe('useSignatureCount', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts in loading state', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: vi.fn().mockResolvedValue({}) }))
    const { result } = renderHook(() => useSignatureCount())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.signatureCount).toBeNull()
    expect(result.current.isLive).toBe(false)
  })

  it('sets signatureCount and isLive=true when fetch succeeds with valid count', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ count: 12345 }),
    }))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.signatureCount).toBe(12345)
    expect(result.current.isLive).toBe(true)
  })

  it('sets isLive=false when fetch responds with count=0', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ count: 0 }),
    }))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.signatureCount).toBeNull()
    expect(result.current.isLive).toBe(false)
  })

  it('sets isLive=false when fetch response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    }))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.isLive).toBe(false)
    expect(result.current.signatureCount).toBeNull()
  })

  it('sets isLive=false when fetch throws a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.isLive).toBe(false)
    expect(result.current.signatureCount).toBeNull()
  })

  it('sets isLive=false when count is non-finite (NaN)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ count: 'not-a-number' }),
    }))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.isLive).toBe(false)
  })

  it('handles string number in count field', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ count: '9999' }),
    }))
    const { result } = renderHook(() => useSignatureCount())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.signatureCount).toBe(9999)
    expect(result.current.isLive).toBe(true)
  })

  it('does not update state after unmount (cleanup)', async () => {
    let resolvePromise!: (value: unknown) => void
    const fetchPromise = new Promise((resolve) => { resolvePromise = resolve })
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(fetchPromise))
    const { unmount } = renderHook(() => useSignatureCount())
    // Unmount before fetch completes
    unmount()
    // Now resolve — should not throw or update
    resolvePromise({ ok: true, json: () => Promise.resolve({ count: 100 }) })
    // Give microtasks time to settle
    await new Promise((resolve) => setTimeout(resolve, 50))
    // No assertion needed — just verifying no errors thrown
  })
})
