import { cleanup, fireEvent, render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NewsSpotlightSection } from '../components/NewsSpotlightSection'
import { getTranslation } from '../i18n'
import type { NewsArticle } from '../components/HeroSection'

describe('NewsSpotlightSection', () => {
  const t = getTranslation('de')

  const sampleNews: NewsArticle[] = [
    {
      title: 'Rechtsextremismus: Ostbeauftragte fordert Schutzschild',
      date: '2026-10-18',
      excerpt: 'Angesichts des AfD-Siegs in Sachsen-Anhalt müsse die Zivilgesellschaft besser geschützt werden.',
      sources: [
        { name: 'Zeit Online', url: 'https://www.zeit.de/politik/schutzschild' },
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/politik/schutzschild' },
        // Duplicates that might come in from duplicate feeds
        { name: 'Zeit Online', url: 'https://zeit.de/politik/schutzschild/' },
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/politik/schutzschild/' },
      ],
    },
    {
      title: 'Zweiter Bericht über Extremismus',
      date: '2026-10-17',
      excerpt: 'Weiterer Bericht zum Thema Extremismus.',
      sources: [
        { name: 'Spiegel', url: 'https://spiegel.de/politik/bericht-2' },
      ],
    },
  ]

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders origin notice and headline as clickable links without duplicates', () => {
    render(<NewsSpotlightSection lang="de" t={t} news={sampleNews} />)

    // Check header origin notice
    // It should render "Zeit Online" only ONCE, and it should NOT include "(Archiv)" in the origin line
    const originLinks = screen.getAllByRole('link', { name: 'Zeit Online' })
    // originLinks[0] is in the origin header notice, originLinks[1] is in the bottom buttons bar
    expect(originLinks.length).toBe(2)
    expect(originLinks[0]).toHaveAttribute('href', 'https://www.zeit.de/politik/schutzschild')
    expect(originLinks[0]).toHaveAttribute('target', '_blank')
    expect(originLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')

    // Archive should only be in the bottom button links, and only ONCE
    const archiveLinks = screen.getAllByRole('link', { name: /Zeit Online \(Archiv\)/i })
    expect(archiveLinks.length).toBe(1)
    expect(archiveLinks[0]).toHaveAttribute('href', 'https://archive.ph/https://www.zeit.de/politik/schutzschild')

    // Check headline is also a clickable link
    const headlineLink = screen.getByRole('link', {
      name: /Rechtsextremismus: Ostbeauftragte fordert Schutzschild/i,
    })
    expect(headlineLink).toBeInTheDocument()
    expect(headlineLink).toHaveAttribute('href', 'https://www.zeit.de/politik/schutzschild')
  })

  it('renders both normal page and archive page links for paywalled articles like Spiegel', () => {
    const spiegelNews: NewsArticle[] = [
      {
        title: 'Rechtsgutachten der GFF',
        date: '2026-06-25',
        excerpt: 'Ein 1.500-seitiges Gutachten stuft die AfD als verfassungswidrig ein.',
        sources: [
          {
            name: 'Spiegel (Archiv)',
            url: 'https://archive.ph/https://www.spiegel.de/politik/deutschland/artikel-gff',
          },
        ],
      },
    ]

    render(<NewsSpotlightSection lang="de" t={t} news={spiegelNews} />)

    // Top origin notice should show "Spiegel" (direct link)
    const originLinks = screen.getAllByRole('link', { name: 'Spiegel' })
    expect(originLinks.length).toBe(2) // 1 in origin notice, 1 in bottom buttons
    expect(originLinks[0]).toHaveAttribute('href', 'https://www.spiegel.de/politik/deutschland/artikel-gff')

    // Bottom buttons should contain both normal Spiegel and Spiegel (Archiv)
    const archiveLink = screen.getByRole('link', { name: 'Spiegel (Archiv)' })
    expect(archiveLink).toBeInTheDocument()
    expect(archiveLink).toHaveAttribute('href', 'https://archive.ph/https://www.spiegel.de/politik/deutschland/artikel-gff')
  })

  it('auto-slides after 8 seconds by default', () => {
    render(<NewsSpotlightSection lang="de" t={t} news={sampleNews} />)

    expect(
      screen.getByText('Rechtsextremismus: Ostbeauftragte fordert Schutzschild'),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(8000)
    })

    expect(
      screen.getByText('Zweiter Bericht über Extremismus'),
    ).toBeInTheDocument()
  })

  it('stops auto-slide on touch down so mobile users can read without sliding further', () => {
    const { container } = render(<NewsSpotlightSection lang="de" t={t} news={sampleNews} />)

    const section = container.querySelector('section')!
    expect(section).toBeInTheDocument()

    // Trigger touch down
    fireEvent.touchStart(section)

    // Advance timer past 8 seconds
    act(() => {
      vi.advanceTimersByTime(16000)
    })

    // Article should still be on the first one, NOT slid further
    expect(
      screen.getByText('Rechtsextremismus: Ostbeauftragte fordert Schutzschild'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Zweiter Bericht über Extremismus'),
    ).not.toBeInTheDocument()
  })

  it('pauses auto-slide on mouse hover and resumes when mouse leaves', () => {
    const { container } = render(<NewsSpotlightSection lang="de" t={t} news={sampleNews} />)

    const section = container.querySelector('section')!

    // Mouse enters
    fireEvent.mouseEnter(section)

    act(() => {
      vi.advanceTimersByTime(8000)
    })

    // Should remain on the first article
    expect(
      screen.getByText('Rechtsextremismus: Ostbeauftragte fordert Schutzschild'),
    ).toBeInTheDocument()

    // Mouse leaves
    fireEvent.mouseLeave(section)

    act(() => {
      vi.advanceTimersByTime(8000)
    })

    // Now should advance
    expect(
      screen.getByText('Zweiter Bericht über Extremismus'),
    ).toBeInTheDocument()
  })
})
