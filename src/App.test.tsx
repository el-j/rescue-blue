import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { parseSignatureCount } from './petition'

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
})