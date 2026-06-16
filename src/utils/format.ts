import { getLocaleCode, type Locale } from '../i18n'

export function formatDisplayDate(value: string, lang: Locale): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) return value
  return parsedDate.toLocaleDateString(getLocaleCode(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDisplayDateTime(value: string, lang: Locale): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) return value
  return parsedDate.toLocaleString(getLocaleCode(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
