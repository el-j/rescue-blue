import { describe, expect, it } from 'vitest'
import {
  deduplicateSources,
  getOriginSources,
  getPrimaryArticleUrl,
  normalizeUrl,
} from '../utils/news'

describe('news utility functions', () => {
  describe('normalizeUrl', () => {
    it('normalizes www, protocols, and trailing slashes', () => {
      expect(normalizeUrl('https://www.zeit.de/politik/artikel/')).toBe('zeit.de/politik/artikel')
      expect(normalizeUrl('http://zeit.de/politik/artikel')).toBe('zeit.de/politik/artikel')
    })

    it('returns empty string for empty input', () => {
      expect(normalizeUrl('')).toBe('')
    })
  })

  describe('deduplicateSources', () => {
    it('deduplicates identical source names and duplicate URLs', () => {
      const sources = [
        { name: 'Zeit Online', url: 'https://www.zeit.de/artikel-1' },
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/artikel-1' },
        { name: 'Zeit Online', url: 'https://zeit.de/artikel-1/' },
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/artikel-1/' },
      ]

      const deduped = deduplicateSources(sources)
      expect(deduped).toHaveLength(2)
      expect(deduped[0]).toEqual({ name: 'Zeit Online', url: 'https://www.zeit.de/artikel-1' })
      expect(deduped[1]).toEqual({
        name: 'Zeit Online (Archiv)',
        url: 'https://archive.ph/https://www.zeit.de/artikel-1',
      })
    })

    it('falls back to single url/source if sources array is empty', () => {
      const deduped = deduplicateSources(undefined, 'https://correctiv.org/faktencheck', 'CORRECTIV')
      expect(deduped).toEqual([{ name: 'CORRECTIV', url: 'https://correctiv.org/faktencheck' }])
    })
  })

  describe('getOriginSources', () => {
    it('filters out archive links to keep only original news sources', () => {
      const sources = [
        { name: 'Zeit Online', url: 'https://www.zeit.de/artikel-1' },
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/artikel-1' },
      ]

      const origins = getOriginSources(sources)
      expect(origins).toHaveLength(1)
      expect(origins[0].name).toBe('Zeit Online')
    })

    it('returns original list if all sources are archives', () => {
      const sources = [
        { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/artikel-1' },
      ]
      expect(getOriginSources(sources)).toEqual(sources)
    })
  })

  describe('getPrimaryArticleUrl', () => {
    it('returns origin source url when available', () => {
      const article = {
        title: 'Test Title',
        date: '2026-10-18',
        excerpt: 'Test excerpt',
        sources: [
          { name: 'Zeit Online', url: 'https://www.zeit.de/artikel-1' },
          { name: 'Zeit Online (Archiv)', url: 'https://archive.ph/https://www.zeit.de/artikel-1' },
        ],
      }
      expect(getPrimaryArticleUrl(article)).toBe('https://www.zeit.de/artikel-1')
    })
  })
})
