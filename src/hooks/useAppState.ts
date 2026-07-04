import { useState, useEffect } from 'react'
import type { Locale, Theme, ContentTab, LetterTarget } from '../i18n'
import { detectLocale, detectTheme, persistLocale, persistTheme, applyTheme } from '../i18n'
import { useSignatureCount } from './useSignatureCount'
import { usePollingSnapshot } from './usePollingSnapshot'

import type { NewsArticle } from '../components/HeroSection'

export interface AppStateOptions {
  initialLang?: Locale
}

export function useAppState({ initialLang }: AppStateOptions = {}) {
  const [lang, setLang] = useState<Locale>(initialLang || detectLocale)
  const [theme, setTheme] = useState<Theme>(detectTheme)
  const [sandboxState, setSandboxState] = useState<'default' | 'brown' | 'dream'>('default')
  const [activeTab, setActiveTab] = useState<ContentTab>('sprache')
  const [activeLetterTarget, setActiveLetterTarget] = useState<LetterTarget>('oeffentlich')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openObjection, setOpenObjection] = useState<number | null>(null)
  const [selectedStateId, setSelectedStateId] = useState<string>('0')
  const [news, setNews] = useState<NewsArticle[]>([])

  const { signatureCount, isLive, isLoading: isLoadingSignatures } = useSignatureCount()
  const { pollingSnapshot, isLive: isLivePollingData } = usePollingSnapshot()

  // Fetch news on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}news.json`)
      .then((res) => {
        if (res.ok) return res.json()
        return []
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setNews(data)
        }
      })
      .catch((err) => {
        console.error('Error fetching news:', err)
      })
  }, [])

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleChangeLanguage = (newLang: Locale) => {
    setLang(newLang)
    persistLocale(newLang)
  }

  const handleToggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      persistTheme(next)
      return next
    })
  }

  return {
    lang,
    setLang,
    theme,
    setTheme,
    sandboxState,
    setSandboxState,
    activeTab,
    setActiveTab,
    activeLetterTarget,
    setActiveLetterTarget,
    openFaq,
    setOpenFaq,
    openObjection,
    setOpenObjection,
    selectedStateId,
    setSelectedStateId,
    signatureCount,
    isLive,
    isLoadingSignatures,
    pollingSnapshot,
    isLivePollingData,
    handleChangeLanguage,
    handleToggleTheme,
    news,
    setNews,
  }
}
