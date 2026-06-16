import { useEffect, useRef, useState } from 'react'

export function useScrollVisibility(threshold = 60): boolean {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y < threshold) {
        setIsVisible(true)
      } else if (y > lastScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isVisible
}
