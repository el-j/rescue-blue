import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { parseSignatureCount } from './petition'
import { parsePollingSnapshot } from './polling'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      }),
    )
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    Object.defineProperty(window.navigator, 'language', {
      value: 'de-DE',
      configurable: true,
      writable: true,
    })
    Object.defineProperty(window.navigator, 'languages', {
      value: ['de-DE', 'de'],
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('switches between German and English copy', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Blau retten.', level: 1 })).toBeInTheDocument()

    // Open language picker
    fireEvent.click(screen.getByRole('button', { name: 'Sprache' }))
    // Click English option
    fireEvent.click(screen.getByRole('button', { name: /en\s*English/i }))

    expect(screen.getByRole('heading', { name: 'Rescue Blue.', level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Switch to Brown' })).toHaveLength(1)
    expect(screen.getAllByRole('button', { name: 'Switch visualization mode' })).toHaveLength(1)
  })

  it('cycles the interactive demo sandbox states', async () => {
    const user = userEvent.setup()

    render(<App />)

    // Mode cycle is triggered via the dedicated toolbar button (use first — desktop inline one)
    const toggleButton = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    
    // 1st Click -> changes to brown state: AfD bar becomes "Beste Zukunft visualisieren"
    await user.click(toggleButton)
    expect(screen.getAllByRole('button', { name: 'Beste Zukunft visualisieren' })).toHaveLength(1)

    // 2nd Click -> activates dream state: AfD bar becomes "Traum beenden"
    await user.click(toggleButton)
    expect(screen.getAllByRole('button', { name: 'Traum beenden' })).toHaveLength(1)

    // 3rd Click -> resets to default: AfD bar becomes "Jetzt umfärben auf Braun"
    await user.click(toggleButton)
    expect(screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })).toHaveLength(1)
  })

  it('opens a FAQ answer', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Warum sollte Blau überhaupt problematisch sein?' }))

    expect(
      screen.getByText(/Blau ist die Selbstwahlfarbe der AfD/i),
    ).toBeInTheDocument()
  })

  it('parses signature counts from Change.org html responses', () => {
    expect(
      parseSignatureCount('<div data-cy="petition-signature-count">12,345 supporters</div>'),
    ).toBe(12345)

    expect(
      parseSignatureCount({
        contents: '<section aria-label="Signatures"><span>67.890</span></section>',
      }),
    ).toBe(67890)
  })

  it('parses signature counts from json payload variants', () => {
    expect(
      parseSignatureCount('{"petition":{"signature_count":4321}}'),
    ).toBe(4321)

    expect(
      parseSignatureCount([{ ignored: true }, { displayed_signature_count: 9876 }]),
    ).toBe(9876)
  })

  it('returns null for malformed petition payloads', () => {
    expect(parseSignatureCount('not valid json')).toBeNull()
    expect(parseSignatureCount({ petition: { id: 1234 } })).toBeNull()
  })

  it('parses latest Bundestag Sonntagsfrage snapshot from DAWUM payload', () => {
    const snapshot = parsePollingSnapshot({
      Database: { Last_Update: '2026-06-13T12:08:36+02:00' },
      Institutes: {
        '5': { Name: 'INSA' },
      },
      Methods: {
        '4': { Name: 'Online + Telefon' },
      },
      Surveys: {
        '100': {
          Date: '2026-06-13',
          Parliament_ID: '0',
          Institute_ID: '5',
          Method_ID: '4',
          Surveyed_Persons: '1203',
          Survey_Period: {
            Date_Start: '2026-06-08',
            Date_End: '2026-06-12',
          },
          Results: {
            '1': 22,
            '2': 13,
            '4': 14,
            '5': 10,
            '7': 29,
            '3': 3,
            '23': 3,
            '0': 6,
          },
        },
      },
    })

    expect(snapshot).not.toBeNull()
    expect(snapshot?.instituteName).toBe('INSA')
    expect(snapshot?.bars.find((bar) => bar.key === 'cdu')?.pct).toBe(22)
    expect(snapshot?.bars.find((bar) => bar.key === 'afd')?.pct).toBe(29)
    expect(snapshot?.bars.find((bar) => bar.key === 'others')?.pct).toBe(12)
  })

  it('parses DAWUM payload wrapped in allorigins contents', () => {
    const snapshot = parsePollingSnapshot({
      contents: JSON.stringify({
        Database: {},
        Institutes: { '5': { Name: 'INSA' } },
        Methods: {},
        Surveys: {
          '10': {
            Date: '2026-06-10',
            Parliament_ID: '0',
            Institute_ID: '5',
            Results: {
              '1': 24,
              '2': 15,
              '4': 13,
              '5': 8,
              '7': 30,
              '3': 5,
              '23': 2,
              '0': 3,
            },
          },
        },
      }),
    })

    expect(snapshot).not.toBeNull()
    expect(snapshot?.bars.find((bar) => bar.key === 'others')?.pct).toBe(10)
  })

  it('selects the latest valid survey across all institutes', () => {
    const snapshot = parsePollingSnapshot({
      Database: {},
      Institutes: {
        '5': { Name: 'INSA' },
        '2': { Name: 'Forsa' },
      },
      Methods: {},
      Surveys: {
        'newer-forsa': {
          Date: '2026-06-14',
          Parliament_ID: '0',
          Institute_ID: '2',
          Results: {
            '1': 30,
            '2': 12,
            '4': 10,
            '5': 7,
            '7': 34,
          },
        },
        'older-insa': {
          Date: '2026-06-13',
          Parliament_ID: '0',
          Institute_ID: '5',
          Results: {
            '1': 22,
            '2': 13,
            '4': 14,
            '5': 10,
            '7': 29,
          },
        },
      },
    })

    expect(snapshot).not.toBeNull()
    expect(snapshot?.instituteName).toBe('Forsa')
    expect(snapshot?.surveyDate).toBe('2026-06-14')
    expect(snapshot?.bars.find((bar) => bar.key === 'afd')?.pct).toBe(34)
  })

  it('renders decision makers with roles and support statuses', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Check that the decision makers section header is present
    expect(screen.getByText('Status der Entscheidungsträger')).toBeInTheDocument()

    // It should render decision makers from Öffentlich-rechtlich by default
    expect(screen.getByText('Florian Hager')).toBeInTheDocument()
    expect(screen.getByText('intendanz@hr.de')).toBeInTheDocument()
    expect(screen.getByText('ARD-Vorsitzender & Intendant des Hessischen Rundfunks (hr)')).toBeInTheDocument()
    expect(screen.getAllByText('Ausstehend').length).toBeGreaterThan(0) // Status for Florian Hager

    expect(screen.getByText('Bettina Schausten')).toBeInTheDocument()
    // Bettina Schausten is now also pending (Ausstehend)
    expect(screen.getAllByText('Ausstehend').length).toBeGreaterThan(1)

    // Let's click the "Rundfunkräte" target tab
    const rundfunkratTab = screen.getByRole('button', { name: 'Rundfunkräte' })
    await user.click(rundfunkratTab)

    // Should now show Rolf Zurbrüggen and status "Ausstehend"
    expect(screen.getByText('Rolf Zurbrüggen')).toBeInTheDocument()
    expect(screen.getAllByText('Ausstehend').length).toBeGreaterThan(0)
  })

  it('fetches and displays news articles in the spotlight section', async () => {
    const mockNews = [
      {
        title: 'Verbotene Losung: Höcke erneut zu Geldstrafe verurteilt',
        date: '2026-06-18',
        excerpt: 'Das Landgericht Halle hat den Thüringer AfD-Chef Björn Höcke erneut verurteilt.',
        sources: [
          {
            name: 'Spiegel / Taz',
            url: 'https://spiegel.de/mock'
          }
        ]
      },
      {
        title: 'Analyse: Medienhäuser diskutieren Farbcodes neu',
        date: '2026-06-19',
        excerpt: 'Mehrere Redaktionen beraten über transparente Darstellung politischer Positionen.',
        sources: [
          {
            name: 'Tagesschau',
            url: 'https://tagesschau.de/mock'
          }
        ]
      }
    ]

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url) => {
        if (typeof url === 'string' && url.endsWith('news.json')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockNews)
          })
        }
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({})
        })
      })
    )

    const user = userEvent.setup()
    render(<App />)

    // Initially, the first spotlight article should be visible.
    expect(await screen.findByText(/Verbotene Losung: Höcke erneut/i)).toBeInTheDocument()

    // Click the second spotlight dot.
    const dot2 = await screen.findByRole('button', { name: /Artikel 2/i })
    await user.click(dot2)

    // Now it should show the second spotlight article.
    expect(await screen.findByText(/Analyse: Medienhäuser diskutieren Farbcodes neu/i)).toBeInTheDocument()
    expect(screen.getByText(/Mehrere Redaktionen beraten über transparente Darstellung politischer Positionen/i)).toBeInTheDocument()
    expect(screen.getAllByText('Tagesschau').length).toBeGreaterThan(0)

    // Clicking "next article" cycles back to the first item.
    const nextBtn = screen.getByRole('button', { name: /Nächster Artikel/i })
    await user.click(nextBtn)

    expect(await screen.findByText(/Verbotene Losung: Höcke erneut/i)).toBeInTheDocument()
  })
})