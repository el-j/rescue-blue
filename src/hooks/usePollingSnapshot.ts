import { useEffect, useState } from 'react'
import type { PollingSnapshot } from '../polling'

interface PollingSnapshotResult {
  pollingSnapshot: PollingSnapshot | null
  isLive: boolean
}

export function usePollingSnapshot(): PollingSnapshotResult {
  const [pollingSnapshot, setPollingSnapshot] = useState<PollingSnapshot | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    let isCancelled = false

    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}polling-snapshot.json`, {
          cache: 'no-store',
        })
        if (!response.ok) throw new Error('not ok')
        const snapshot = (await response.json()) as PollingSnapshot
        if (!isCancelled) {
          setPollingSnapshot(snapshot)
          setIsLive(true)
        }
      } catch {
        if (!isCancelled) setIsLive(false)
      }
    }

    void load()
    return () => { isCancelled = true }
  }, [])

  return { pollingSnapshot, isLive }
}
