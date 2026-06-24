import deLocale from './locales/de.json'
import enLocale from './locales/en.json'
import frLocale from './locales/fr.json'
import esLocale from './locales/es.json'
import trLocale from './locales/tr.json'
import ukLocale from './locales/uk.json'
import plLocale from './locales/pl.json'
import itLocale from './locales/it.json'
import ruLocale from './locales/ru.json'

export const SUPPORTED_LOCALES = ['de', 'en', 'fr', 'es', 'tr', 'uk', 'pl', 'it', 'ru'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export type LocaleInfo = {
  code: Locale
  nativeName: string
  flag: string
  bcp47: string
}

export const LOCALE_INFO: LocaleInfo[] = [
  { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪', bcp47: 'de-DE' },
  { code: 'en', nativeName: 'English', flag: '🇬🇧', bcp47: 'en-GB' },
  { code: 'fr', nativeName: 'Français', flag: '🇫🇷', bcp47: 'fr-FR' },
  { code: 'es', nativeName: 'Español', flag: '🇪🇸', bcp47: 'es-ES' },
  { code: 'tr', nativeName: 'Türkçe', flag: '🇹🇷', bcp47: 'tr-TR' },
  { code: 'uk', nativeName: 'Українська', flag: '🇺🇦', bcp47: 'uk-UA' },
  { code: 'pl', nativeName: 'Polski', flag: '🇵🇱', bcp47: 'pl-PL' },
  { code: 'it', nativeName: 'Italiano', flag: '🇮🇹', bcp47: 'it-IT' },
  { code: 'ru', nativeName: 'Русский', flag: '🇷🇺', bcp47: 'ru-RU' },
]

type LocaleData = typeof deLocale

const localeData: Record<Locale, LocaleData> = {
  de: deLocale,
  en: enLocale,
  fr: frLocale as LocaleData,
  es: esLocale as LocaleData,
  tr: trLocale as LocaleData,
  uk: ukLocale as LocaleData,
  pl: plLocale as LocaleData,
  it: itLocale as LocaleData,
  ru: ruLocale as LocaleData,
}

// --- Public API (same shape as before so components don't break) ---

export type Translation = LocaleData['translations']
export type Sayings = LocaleData['sayings']
export type Letters = LocaleData['openLetters']
export type Facts = LocaleData['facts']
export type Faqs = LocaleData['faqs']
export type ScienceContent = LocaleData['science']
export type ContentTab = keyof LocaleData['sayings']
export type LetterTarget = keyof LocaleData['openLetters']

export function getTranslation(lang: Locale): Translation {
  return localeData[lang].translations
}

export function getSayings(lang: Locale): Sayings {
  return localeData[lang].sayings
}

export function getOpenLetters(lang: Locale): Letters {
  return localeData[lang].openLetters
}

export function getFaqs(lang: Locale): Faqs {
  return localeData[lang].faqs
}

export function getFacts(lang: Locale): Facts {
  return localeData[lang].facts
}

export function getScienceContent(lang: Locale): ScienceContent {
  return localeData[lang].science
}

export function getLocaleCode(lang: Locale): string {
  return LOCALE_INFO.find((l) => l.code === lang)?.bcp47 ?? 'de-DE'
}

// --- Browser language detection ---

export function detectLocale(): Locale {
  // Check localStorage first
  const stored = localStorage.getItem('rescue-blue-lang')
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale
  }

  // Check browser languages
  const browserLangs = navigator.languages ?? [navigator.language]
  for (const browserLang of browserLangs) {
    const langCode = browserLang.split('-')[0].toLowerCase()
    if (SUPPORTED_LOCALES.includes(langCode as Locale)) {
      return langCode as Locale
    }
  }

  return 'de'
}

export function persistLocale(lang: Locale): void {
  localStorage.setItem('rescue-blue-lang', lang)
}

// --- Theme detection ---

export type Theme = 'dark' | 'light'

export function detectTheme(): Theme {
  const stored = localStorage.getItem('rescue-blue-theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function persistTheme(theme: Theme): void {
  localStorage.setItem('rescue-blue-theme', theme)
}

export function applyTheme(theme: Theme): void {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme')
  } else {
    document.documentElement.classList.remove('light-theme')
  }
}

// --- Legacy compat: BAR_TEMPLATE ---

export const BAR_TEMPLATE = [
  { pct: 22, labelDe: 'CDU/CSU', labelEn: 'CDU/CSU', defaultColor: 'bg-neutral-950 border border-neutral-700', isAfd: false },
  { pct: 29, labelDe: 'AfD', labelEn: 'AfD', defaultColor: 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20', isAfd: true },
  { pct: 13, labelDe: 'SPD', labelEn: 'SPD', defaultColor: 'bg-red-600', isAfd: false },
  { pct: 14, labelDe: 'GRÜNE', labelEn: 'GREENS', defaultColor: 'bg-green-600', isAfd: false },
  { pct: 10, labelDe: 'LINKE', labelEn: 'LEFT', defaultColor: 'bg-pink-600', isAfd: false },
  { pct: 6, labelDe: 'Sonstige', labelEn: 'Others', defaultColor: 'bg-neutral-600', isAfd: false },
] as const
