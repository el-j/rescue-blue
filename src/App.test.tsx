import { cleanup, render, screen } from '@testing-library/react'
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
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Blau retten.' })).toBeInTheDocument()

    // Open language picker
    await user.click(screen.getByRole('button', { name: 'Sprache' }))
    // Click English option
    await user.click(screen.getByRole('button', { name: /en\s*English/i }))

    expect(screen.getByRole('heading', { name: 'Rescue Blue.' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Switch to Brown' })).toHaveLength(2)
  })

  it('cycles the interactive demo sandbox states', async () => {
    const user = userEvent.setup()

    render(<App />)

    // Initial state: "Jetzt umfärben auf Braun"
    const toggleButton = screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })[1]
    
    // 1st Click -> changes to brown state: button becomes "Beste Zukunft visualisieren"
    await user.click(toggleButton)
    expect(screen.getAllByRole('button', { name: 'Beste Zukunft visualisieren' })).toHaveLength(2)

    // 2nd Click -> activates dream state: button becomes "Zurücksetzen auf Blau"
    const dreamButton = screen.getAllByRole('button', { name: 'Beste Zukunft visualisieren' })[1]
    await user.click(dreamButton)
    expect(screen.getAllByRole('button', { name: 'Zurücksetzen auf Blau' })).toHaveLength(2)

    // 3rd Click -> resets to default: button becomes "Jetzt umfärben auf Braun"
    const resetButton = screen.getAllByRole('button', { name: 'Zurücksetzen auf Blau' })[1]
    await user.click(resetButton)
    expect(screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })).toHaveLength(2)
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

  it('fetches and displays news articles in the hero slider', async () => {
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

    // Initially, it should display the campaign visual slide
    expect(screen.getByText('Unser Kampagnen-Visual')).toBeInTheDocument()

    // Find the second slide dot (waiting for it to load) and click it
    const dot2 = await screen.findByRole('button', { name: /Go to slide 2/i })
    await user.click(dot2)

    // Now it should show the news slide details
    expect(screen.getAllByText('Verbotene Losung: Höcke erneut zu Geldstrafe verurteilt')[0]).toBeInTheDocument()
    expect(screen.getByText('Das Landgericht Halle hat den Thüringer AfD-Chef Björn Höcke erneut verurteilt.')).toBeInTheDocument()
    expect(screen.getAllByText('Spiegel / Taz')[0]).toBeInTheDocument()
    expect(screen.getAllByText('2026-06-18')[0]).toBeInTheDocument()

    // Test clicking the Next button (Arrow)
    const nextBtn = screen.getByRole('button', { name: /Next Slide/i })
    await user.click(nextBtn)

    // Clicking Next should cycle back to slide 1 (Campaign visual)
    expect(screen.getByText('Unser Kampagnen-Visual')).toBeInTheDocument()
  })
})