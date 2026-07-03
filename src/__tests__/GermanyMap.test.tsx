/**
 * GermanyMap tests
 *
 * Tests key logic functions (getStateColor, getStrongestParty, etc.) exercised
 * via the rendered output. We render GermanyMap in isolation with crafted props.
 */
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GermanyMap } from '../components/demo/GermanyMap'
import type { ParliamentsSnapshot } from '../polling'

const mockSnapshot: ParliamentsSnapshot = {
  '0': {
    bars: [
      { key: 'afd', pct: 29, labelDe: 'AfD', labelEn: 'AfD', defaultColor: 'bg-cyan-500', isAfd: true },
      { key: 'cdu', pct: 22, labelDe: 'CDU/CSU', labelEn: 'CDU/CSU', defaultColor: 'bg-black', isAfd: false },
      { key: 'spd', pct: 13, labelDe: 'SPD', labelEn: 'SPD', defaultColor: 'bg-red-600', isAfd: false },
      { key: 'greens', pct: 14, labelDe: 'GRÜNE', labelEn: 'GREENS', defaultColor: 'bg-green-600', isAfd: false },
      { key: 'left', pct: 10, labelDe: 'LINKE', labelEn: 'LEFT', defaultColor: 'bg-pink-600', isAfd: false },
      { key: 'others', pct: 6, labelDe: 'Sonstige', labelEn: 'Others', defaultColor: 'bg-neutral-600', isAfd: false },
    ],
    instituteName: 'INSA',
    surveyDate: '2026-06-01',
    surveyPeriod: null,
    methodName: 'Online',
    surveyedPersons: 1500,
    apiUpdatedAt: '2026-06-01',
    sourceUrl: 'https://dawum.de',
  },
  // Thüringen — AfD is strongest at 35%
  '14': {
    bars: [
      { key: 'afd', pct: 35, labelDe: 'AfD', labelEn: 'AfD', defaultColor: 'bg-cyan-500', isAfd: true },
      { key: 'cdu', pct: 20, labelDe: 'CDU/CSU', labelEn: 'CDU/CSU', defaultColor: 'bg-black', isAfd: false },
      { key: 'spd', pct: 10, labelDe: 'SPD', labelEn: 'SPD', defaultColor: 'bg-red-600', isAfd: false },
      { key: 'greens', pct: 8, labelDe: 'GRÜNE', labelEn: 'GREENS', defaultColor: 'bg-green-600', isAfd: false },
      { key: 'left', pct: 10, labelDe: 'LINKE', labelEn: 'LEFT', defaultColor: 'bg-pink-600', isAfd: false },
      { key: 'others', pct: 5, labelDe: 'Sonstige', labelEn: 'Others', defaultColor: 'bg-neutral-600', isAfd: false },
    ],
    instituteName: 'INSA',
    surveyDate: '2026-06-01',
    surveyPeriod: null,
    methodName: 'Online',
    surveyedPersons: 500,
    apiUpdatedAt: null,
    sourceUrl: 'https://dawum.de',
  },
}

function renderMap(props: Partial<Parameters<typeof GermanyMap>[0]> = {}) {
  const defaultProps = {
    selectedStateId: '0',
    onSelectStateId: vi.fn(),
    pollingSnapshot: mockSnapshot,
    sandboxState: 'default' as const,
    dreamProgress: null,
    lang: 'de',
  }
  return render(<GermanyMap {...defaultProps} {...props} />)
}

describe('GermanyMap — selector dropdown', () => {
  afterEach(cleanup)

  it('renders the dropdown with Bund (Deutschland) as default', () => {
    renderMap()
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    // The selected option should show the federal label
    expect(screen.getByText(/Bund \(Deutschland\)/i)).toBeInTheDocument()
  })

  it('calls onSelectStateId when a state is selected', async () => {
    const user = userEvent.setup()
    const onSelectStateId = vi.fn()
    renderMap({ onSelectStateId })
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '14')
    expect(onSelectStateId).toHaveBeenCalledWith('14')
  })

  it('deselects and resets to federal (0) when the already-selected state is re-clicked', async () => {
    const user = userEvent.setup()
    const onSelectStateId = vi.fn()
    renderMap({ selectedStateId: '14', onSelectStateId })
    const select = screen.getByRole('combobox')
    // Re-select the current state to deselect
    await user.selectOptions(select, '14')
    expect(onSelectStateId).toHaveBeenCalledWith('0')
  })

  it('shows state options in the dropdown', () => {
    renderMap()
    // There should be state options beyond just the federal option
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.options.length).toBeGreaterThan(1)
  })
})

describe('GermanyMap — renders SVG map', () => {
  afterEach(cleanup)

  it('renders an SVG element', () => {
    renderMap()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders state path elements within the SVG', () => {
    renderMap()
    const paths = document.querySelectorAll('svg path')
    expect(paths.length).toBeGreaterThan(0)
  })
})

describe('GermanyMap — null pollingSnapshot', () => {
  afterEach(cleanup)

  it('renders without crashing when pollingSnapshot is null', () => {
    expect(() => renderMap({ pollingSnapshot: null })).not.toThrow()
  })

  it('still shows the dropdown with default option when pollingSnapshot is null', () => {
    renderMap({ pollingSnapshot: null })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})

describe('GermanyMap — sandbox state prop', () => {
  afterEach(cleanup)

  it('renders without crashing in brown state', () => {
    expect(() => renderMap({ sandboxState: 'brown' })).not.toThrow()
  })

  it('renders without crashing in dream state with dreamProgress', () => {
    expect(() => renderMap({ sandboxState: 'dream', dreamProgress: 0.5 })).not.toThrow()
  })

  it('renders without crashing in dream state with dreamProgress=0', () => {
    expect(() => renderMap({ sandboxState: 'dream', dreamProgress: 0 })).not.toThrow()
  })

  it('renders without crashing in dream state with dreamProgress=1', () => {
    expect(() => renderMap({ sandboxState: 'dream', dreamProgress: 1 })).not.toThrow()
  })
})

describe('GermanyMap — percentage display in dropdown', () => {
  afterEach(cleanup)

  it('shows percentage label in state options', () => {
    renderMap()
    // Options should include percentage text
    const select = screen.getByRole('combobox') as HTMLSelectElement
    const optionsText = Array.from(select.options).map((o) => o.text).join(' ')
    expect(optionsText).toMatch(/%/)
  })
})
