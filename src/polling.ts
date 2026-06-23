export type PollBar = {
  key: 'cdu' | 'afd' | 'spd' | 'greens' | 'left' | 'others'
  pct: number
  labelDe: string
  labelEn: string
  defaultColor: string
  isAfd: boolean
}

export type PollingSnapshot = {
  bars: PollBar[]
  instituteName: string
  surveyDate: string
  surveyPeriod: {
    start: string
    end: string
  } | null
  methodName: string | null
  surveyedPersons: number | null
  apiUpdatedAt: string | null
  sourceUrl: string
}

export const POLLING_REFRESH_MS = 7 * 24 * 60 * 60 * 1000
export const POLLING_LOCKED_INSTITUTE = 'INSA'
export const POLLING_SOURCE_URL = 'https://dawum.de/Bundestag/'
export const POLLING_API_DOCS_URL = 'https://dawum.de/API/'

const POLLING_API_URL = 'https://api.dawum.de/'

export const POLLING_SOURCES = [
  {
    url: POLLING_API_URL,
    responseType: 'json',
  },
  {
    url: `https://corsproxy.io/?url=${encodeURIComponent(POLLING_API_URL)}`,
    responseType: 'json',
  },
  {
    url: `https://api.allorigins.win/get?url=${encodeURIComponent(POLLING_API_URL)}`,
    responseType: 'json',
  },
] as const

const BASE_BARS: PollBar[] = [
  { key: 'cdu', pct: 22, labelDe: 'CDU/CSU', labelEn: 'CDU/CSU', defaultColor: 'bg-black border border-black', isAfd: false },
  { key: 'afd', pct: 29, labelDe: 'AfD', labelEn: 'AfD', defaultColor: 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20', isAfd: true },
  { key: 'spd', pct: 13, labelDe: 'SPD', labelEn: 'SPD', defaultColor: 'bg-red-600', isAfd: false },
  { key: 'greens', pct: 14, labelDe: 'GRÜNE', labelEn: 'GREENS', defaultColor: 'bg-green-600', isAfd: false },
  { key: 'left', pct: 10, labelDe: 'LINKE', labelEn: 'LEFT', defaultColor: 'bg-pink-600', isAfd: false },
  { key: 'others', pct: 6, labelDe: 'Sonstige', labelEn: 'Others', defaultColor: 'bg-neutral-600', isAfd: false },
]

const PARTY_IDS = {
  cdu: '1',
  afd: '7',
  spd: '2',
  greens: '4',
  left: '5',
} as const

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim()
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

function roundOne(value: number): number {
  return Math.round(value * 10) / 10
}

function formatIsoDate(date: unknown): string | null {
  if (typeof date !== 'string' || !date) {
    return null
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null
}

function normalizeApiPayload(payload: unknown): Record<string, unknown> | null {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if ('contents' in payload && typeof (payload as Record<string, unknown>).contents === 'string') {
    try {
      return JSON.parse((payload as Record<string, string>).contents)
    } catch {
      return null
    }
  }

  return payload as Record<string, unknown>
}

export function parsePollingSnapshot(payload: unknown): PollingSnapshot | null {
  const data = normalizeApiPayload(payload)
  if (!data) {
    return null
  }

  const surveys = data.Surveys
  if (!surveys || typeof surveys !== 'object') {
    return null
  }

  const institutes = (data.Institutes && typeof data.Institutes === 'object')
    ? (data.Institutes as Record<string, unknown>)
    : null

  const bundestagSurveys = Object.values(surveys as Record<string, unknown>)
    .filter((survey): survey is Record<string, unknown> => !!survey && typeof survey === 'object')
    .filter((survey) => String(survey.Parliament_ID ?? '') === '0')
    .filter((survey) => {
      const instituteId = String(survey.Institute_ID ?? '')
      const institute = institutes?.[instituteId]
      const instituteName = institute && typeof institute === 'object'
        ? String((institute as Record<string, unknown>).Name ?? '')
        : ''
      return instituteName === POLLING_LOCKED_INSTITUTE
    })
    .filter((survey) => typeof survey.Date === 'string')
    .sort((a, b) => String(b.Date).localeCompare(String(a.Date)))

  if (bundestagSurveys.length === 0) {
    return null
  }

  const latest = bundestagSurveys[0]
  const results = latest.Results
  if (!results || typeof results !== 'object') {
    return null
  }

  const resultMap = results as Record<string, unknown>

  const cdu = asNumber(resultMap[PARTY_IDS.cdu])
  const afd = asNumber(resultMap[PARTY_IDS.afd])
  const spd = asNumber(resultMap[PARTY_IDS.spd])
  const greens = asNumber(resultMap[PARTY_IDS.greens])
  const left = asNumber(resultMap[PARTY_IDS.left])

  if ([cdu, afd, spd, greens, left].some((value) => value === null)) {
    return null
  }

  const selectedTotal = (cdu ?? 0) + (afd ?? 0) + (spd ?? 0) + (greens ?? 0) + (left ?? 0)
  const others = Math.max(0, roundOne(100 - selectedTotal))

  const bars = BASE_BARS.map((bar) => {
    const pctByKey: Record<PollBar['key'], number> = {
      cdu: cdu ?? bar.pct,
      afd: afd ?? bar.pct,
      spd: spd ?? bar.pct,
      greens: greens ?? bar.pct,
      left: left ?? bar.pct,
      others,
    }

    return {
      ...bar,
      pct: roundOne(pctByKey[bar.key]),
    }
  })

  const instituteId = String(latest.Institute_ID ?? '')
  const institute = institutes?.[instituteId]
  const instituteName = institute && typeof institute === 'object' && typeof (institute as Record<string, unknown>).Name === 'string'
    ? String((institute as Record<string, unknown>).Name)
    : POLLING_LOCKED_INSTITUTE

  const methods = (data.Methods && typeof data.Methods === 'object')
    ? (data.Methods as Record<string, unknown>)
    : null
  const methodId = String(latest.Method_ID ?? '')
  const method = methods?.[methodId]
  const methodName = method && typeof method === 'object' && typeof (method as Record<string, unknown>).Name === 'string'
    ? String((method as Record<string, unknown>).Name)
    : null

  const surveyPeriod = latest.Survey_Period && typeof latest.Survey_Period === 'object'
    ? {
        start: formatIsoDate((latest.Survey_Period as Record<string, unknown>).Date_Start) ?? String((latest.Survey_Period as Record<string, unknown>).Date_Start ?? ''),
        end: formatIsoDate((latest.Survey_Period as Record<string, unknown>).Date_End) ?? String((latest.Survey_Period as Record<string, unknown>).Date_End ?? ''),
      }
    : null

  const database = data.Database && typeof data.Database === 'object'
    ? (data.Database as Record<string, unknown>)
    : null

  return {
    bars,
    instituteName,
    surveyDate: formatIsoDate(latest.Date) ?? String(latest.Date),
    surveyPeriod,
    methodName,
    surveyedPersons: asNumber(latest.Surveyed_Persons),
    apiUpdatedAt: typeof database?.Last_Update === 'string' ? database.Last_Update : null,
    sourceUrl: POLLING_SOURCE_URL,
  }
}

export function getDefaultPollingBars(): PollBar[] {
  return BASE_BARS.map((bar) => ({ ...bar }))
}
