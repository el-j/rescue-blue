/**
 * InteractiveDemoSection tests
 *
 * We render it through App (which wires all props) to avoid duplicating
 * the complex prop wiring. This keeps tests realistic and integration-like
 * while still targeting the component's specific behaviours.
 */
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

function setupApp() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: false, json: vi.fn().mockResolvedValue({}) }),
  )
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
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
    value: ['de-DE'],
    configurable: true,
    writable: true,
  })
  localStorage.clear()
}

describe('InteractiveDemoSection — sandbox state machine', () => {
  beforeEach(setupApp)
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('starts in default state — shows default AfD bar label', () => {
    render(<App />)
    expect(screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })).toHaveLength(1)
  })

  it('cycles default → brown state when toolbar button is clicked once', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    await user.click(btn)
    expect(screen.getAllByRole('button', { name: 'Beste Zukunft visualisieren' })).toHaveLength(1)
  })

  it('cycles brown → dream state on second click', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    await user.click(btn)
    await user.click(btn)
    expect(screen.getAllByRole('button', { name: 'Traum beenden' })).toHaveLength(1)
  })

  it('cycles dream → default state on third click', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    await user.click(btn)
    await user.click(btn)
    await user.click(btn)
    expect(screen.getAllByRole('button', { name: 'Jetzt umfärben auf Braun' })).toHaveLength(1)
  })

  it('shows the dream banner when in dream state', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    await user.click(btn) // → brown
    await user.click(btn) // → dream
    // Dream banner should appear
    expect(screen.getByText(/ZUKUNFTSVISION/i)).toBeInTheDocument()
  })

  it('hides the dream banner when returning to default state', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })[0]
    await user.click(btn)
    await user.click(btn)
    await user.click(btn)
    expect(screen.queryByText(/ZUKUNFTSVISION/i)).not.toBeInTheDocument()
  })
})

describe('InteractiveDemoSection — comparison toggle', () => {
  beforeEach(setupApp)
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('shows AfD vs. Alle Anderen columns when comparison mode is toggled on', async () => {
    const user = userEvent.setup()
    render(<App />)
    const compButtons = screen.getAllByRole('button', { name: 'Mehrheit umschalten' })
    await user.click(compButtons[0])
    // In comparison mode, the ratio card message should appear
    expect(screen.getAllByText(/so viele Menschen wählen NICHT die AfD/i).length).toBeGreaterThan(0)
  })

  it('hides comparison columns when comparison mode is toggled off', async () => {
    const user = userEvent.setup()
    render(<App />)
    const compButtons = screen.getAllByRole('button', { name: 'Mehrheit umschalten' })
    await user.click(compButtons[0])
    await user.click(compButtons[0])
    // Ratio card should disappear
    expect(screen.queryByText(/so viele Menschen wählen NICHT die AfD/i)).not.toBeInTheDocument()
  })
})

describe('InteractiveDemoSection — toolbar visibility in German', () => {
  beforeEach(setupApp)
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('renders two toolbar buttons for cycle-mode (desktop + mobile)', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: 'Visualisierungs-Option wechseln' })
    expect(buttons).toHaveLength(2)
  })

  it('renders two toolbar buttons for comparison-mode (desktop + mobile)', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: 'Mehrheit umschalten' })
    expect(buttons).toHaveLength(2)
  })
})

describe('InteractiveDemoSection — English locale toolbar', () => {
  beforeEach(() => {
    setupApp()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('renders English toolbar titles when language is switched to EN', async () => {
    const user = userEvent.setup()
    render(<App />)
    // Open language picker (German label initially)
    await user.click(screen.getByRole('button', { name: 'Sprache' }))
    await user.click(screen.getByRole('button', { name: /en\s*English/i }))
    // After switching to English, the toolbar titles should be in English
    expect(screen.getAllByRole('button', { name: 'Switch visualization mode' })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: 'Toggle majority chart' })).toHaveLength(2)
  })
})
