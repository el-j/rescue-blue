import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { parseSignatureCount } from './petition'
import { parsePollingSnapshot } from './polling'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('switches between German and English copy', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Blau retten.' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle language' }))

    expect(screen.getByRole('heading', { name: 'Rescue Blue.' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Switch to Brown' })).toHaveLength(2)
  })

  it('toggles the interactive colour demo', async () => {
    const user = userEvent.setup()

    render(<App />)

    const toggleButton = screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })[1]
    await user.click(toggleButton)

    expect(screen.getAllByRole('button', { name: 'Zurücksetzen auf Blau' })).toHaveLength(2)
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

  it('ignores non-locked institutes and keeps INSA-only selection', () => {
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
    expect(snapshot?.instituteName).toBe('INSA')
    expect(snapshot?.surveyDate).toBe('2026-06-13')
    expect(snapshot?.bars.find((bar) => bar.key === 'afd')?.pct).toBe(29)
  })
})