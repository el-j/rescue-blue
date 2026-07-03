import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollVisibility } from '../../hooks/useScrollVisibility'

describe('useScrollVisibility', () => {
  beforeEach(() => {
    // Reset scrollY to 0
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true initially (visible)', () => {
    const { result } = renderHook(() => useScrollVisibility())
    expect(result.current).toBe(true)
  })

  it('stays visible when scroll is below threshold (< 60px)', () => {
    const { result } = renderHook(() => useScrollVisibility(60))
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })

  it('becomes hidden when scrolling down past threshold', () => {
    const { result } = renderHook(() => useScrollVisibility(60))
    // First scroll below threshold to set lastScrollY
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    // Now scroll down past threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })

  it('becomes visible again when scrolling back up', () => {
    const { result } = renderHook(() => useScrollVisibility(60))
    // Scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    // Then scroll up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })

  it('stays visible when at top (scrollY < threshold even if threshold changes)', () => {
    const { result } = renderHook(() => useScrollVisibility(60))
    // Scroll down then back to top
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })

  it('uses default threshold of 60 when none provided', () => {
    const { result } = renderHook(() => useScrollVisibility())
    // Scroll to exactly threshold boundary
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 59, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })

  it('respects custom threshold', () => {
    const { result } = renderHook(() => useScrollVisibility(200))
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    // 150 < 200 so still visible
    expect(result.current).toBe(true)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 250, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    // Scrolled down past threshold — hidden
    expect(result.current).toBe(false)
  })

  it('removes the scroll listener on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollVisibility())
    unmount()
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
