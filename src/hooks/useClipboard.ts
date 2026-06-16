import { useState } from 'react'

export function useClipboard(resetDelay = 2000) {
  const [isCopied, setIsCopied] = useState(false)

  function copy(text: string) {
    void navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), resetDelay)
    })
  }

  return { isCopied, copy }
}
