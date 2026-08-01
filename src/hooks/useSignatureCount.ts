import { useEffect, useState } from 'react'

interface SignatureCountResult {
  signatureCount: number | null
  isLive: boolean
  isLoading: boolean
}

export function useSignatureCount(): SignatureCountResult {
  const [signatureCount, setSignatureCount] = useState<number | null>(null)
  const [isLive, setIsLive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}signature-count.json`, {
          cache: 'no-store',
        })
        if (!response.ok) throw new Error('not ok')
        const data = (await response.json()) as { count?: unknown }
        const count = Number(data.count)
        if (!isCancelled) {
          if (Number.isFinite(count) && count > 0) {
            setSignatureCount(count)
            setIsLive(false)
          } else {
            setIsLive(false)
          }
        }
      } catch {
        if (!isCancelled) setIsLive(false)
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    }

    void load()
    return () => { isCancelled = true }
  }, [])

  return { signatureCount, isLive, isLoading }
}
