import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useClipboard } from '../../hooks/useClipboard'

describe('useClipboard', () => {
  beforeEach(() => {
    // Stub navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
      writable: true,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('initially isCopied is false', () => {
    const { result } = renderHook(() => useClipboard())
    expect(result.current.isCopied).toBe(false)
  })

  it('sets isCopied to true after copying', async () => {
    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      result.current.copy('hello world')
    })
    expect(result.current.isCopied).toBe(true)
  })

  it('calls navigator.clipboard.writeText with the correct text', async () => {
    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      result.current.copy('test text')
    })
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
  })

  it('resets isCopied to false after the default reset delay (2000ms)', async () => {
    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      result.current.copy('text')
    })
    expect(result.current.isCopied).toBe(true)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.isCopied).toBe(false)
  })

  it('resets isCopied to false after a custom reset delay', async () => {
    const { result } = renderHook(() => useClipboard(500))
    await act(async () => {
      result.current.copy('text')
    })
    expect(result.current.isCopied).toBe(true)
    act(() => {
      vi.advanceTimersByTime(499)
    })
    expect(result.current.isCopied).toBe(true)
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current.isCopied).toBe(false)
  })

  it('does not reset before the delay has elapsed', async () => {
    const { result } = renderHook(() => useClipboard(2000))
    await act(async () => {
      result.current.copy('text')
    })
    act(() => {
      vi.advanceTimersByTime(1999)
    })
    expect(result.current.isCopied).toBe(true)
  })
})
