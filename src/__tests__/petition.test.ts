import { describe, expect, it } from 'vitest'
import { parseSignatureCount } from '../petition'

describe('parseSignatureCount', () => {
  // -------------------------------------------------------------------------
  // HTML payloads
  // -------------------------------------------------------------------------

  describe('HTML string parsing', () => {
    it('extracts count from data-cy="petition-signature-count"', () => {
      expect(
        parseSignatureCount('<div data-cy="petition-signature-count">12,345 supporters</div>'),
      ).toBe(12345)
    })

    it('extracts count from data-testid="petition-signature-count"', () => {
      expect(
        parseSignatureCount('<div data-testid="petition-signature-count">99.999</div>'),
      ).toBe(99999)
    })

    it('extracts count from aria-label containing "signature"', () => {
      // The selector [aria-label*="signature" i] extracts from textContent of the element
      expect(
        parseSignatureCount('<button aria-label="67890 signatures">67890</button>'),
      ).toBe(67890)
    })

    it('extracts count from aria-label containing "supporter"', () => {
      expect(
        parseSignatureCount('<div aria-label="5000 supporters">5000</div>'),
      ).toBe(5000)
    })

    it('falls back to regex for JSON embedded in HTML', () => {
      const html = '<script>{"signature_count": "45678"}</script>'
      expect(parseSignatureCount(html)).toBe(45678)
    })

    it('falls back to displayed_signature_count key in embedded JSON', () => {
      const html = '<script>{"displayed_signature_count": 7000}</script>'
      expect(parseSignatureCount(html)).toBe(7000)
    })

    it('falls back to supportersCount camelCase in embedded JSON', () => {
      const html = '<script>{"supportersCount": 3300}</script>'
      expect(parseSignatureCount(html)).toBe(3300)
    })

    it('returns null for HTML with no signature selectors or JSON', () => {
      expect(parseSignatureCount('<html><body><p>Hello</p></body></html>')).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // JSON string payloads
  // -------------------------------------------------------------------------

  describe('JSON string parsing', () => {
    it('parses petition.signature_count from JSON string', () => {
      expect(parseSignatureCount('{"petition":{"signature_count":4321}}')).toBe(4321)
    })

    it('parses displayed_signature_count from JSON string', () => {
      expect(parseSignatureCount('{"displayed_signature_count":8888}')).toBe(8888)
    })

    it('parses supporter_count from JSON string', () => {
      expect(parseSignatureCount('{"supporter_count":1111}')).toBe(1111)
    })

    it('parses plain numeric string via extractCount fallback for non-JSON-parseable strings', () => {
      // Strings with commas are not valid JSON and go through extractCount directly
      expect(parseSignatureCount('12,345')).toBe(12345)
    })

    it('extracts number from non-JSON text with digits', () => {
      expect(parseSignatureCount('Currently 2500 have signed!')).toBe(2500)
    })
  })

  // -------------------------------------------------------------------------
  // Object payloads
  // -------------------------------------------------------------------------

  describe('object payload parsing', () => {
    it('reads signature_count field', () => {
      expect(parseSignatureCount({ signature_count: 1234 })).toBe(1234)
    })

    it('reads displayed_signature_count field', () => {
      expect(parseSignatureCount({ displayed_signature_count: 5678 })).toBe(5678)
    })

    it('reads supporter_count field', () => {
      expect(parseSignatureCount({ supporter_count: 999 })).toBe(999)
    })

    it('reads supporters_count field', () => {
      expect(parseSignatureCount({ supporters_count: 333 })).toBe(333)
    })

    it('reads supportersCount camelCase field', () => {
      expect(parseSignatureCount({ supportersCount: 222 })).toBe(222)
    })

    it('reads count field', () => {
      expect(parseSignatureCount({ count: 777 })).toBe(777)
    })

    it('recursively traverses nested object', () => {
      expect(parseSignatureCount({ petition: { signature_count: 4321 } })).toBe(4321)
    })

    it('unwraps allorigins contents field', () => {
      expect(
        parseSignatureCount({
          contents: '<section aria-label="Signatures"><span>67.890</span></section>',
        }),
      ).toBe(67890)
    })

    it('returns null when object has no recognized keys', () => {
      expect(parseSignatureCount({ petition: { id: 1234 } })).toBeNull()
    })

    it('returns null for empty object', () => {
      expect(parseSignatureCount({})).toBeNull()
    })

    it('returns null for zero count', () => {
      expect(parseSignatureCount({ count: 0 })).toBeNull()
    })

    it('returns null for negative count', () => {
      expect(parseSignatureCount({ count: -5 })).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // Array payloads
  // -------------------------------------------------------------------------

  describe('array payload parsing', () => {
    it('returns count from first array element with a recognized key', () => {
      expect(
        parseSignatureCount([{ ignored: true }, { displayed_signature_count: 9876 }]),
      ).toBe(9876)
    })

    it('returns null for empty array', () => {
      expect(parseSignatureCount([])).toBeNull()
    })

    it('returns null when no array element has recognized keys', () => {
      expect(parseSignatureCount([{ x: 1 }, { y: 2 }])).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // Edge cases / null/invalid payloads
  // -------------------------------------------------------------------------

  describe('invalid payloads', () => {
    it('returns null for null', () => {
      expect(parseSignatureCount(null)).toBeNull()
    })

    it('returns null for undefined', () => {
      expect(parseSignatureCount(undefined)).toBeNull()
    })

    it('returns null for a number (not a recognized type)', () => {
      // Numbers go through the object path and have no string keys
      expect(parseSignatureCount(42)).toBeNull()
    })

    it('returns null for empty string', () => {
      expect(parseSignatureCount('')).toBeNull()
    })

    it('returns null for whitespace-only string', () => {
      expect(parseSignatureCount('   ')).toBeNull()
    })

    it('returns null for non-JSON text without digits', () => {
      expect(parseSignatureCount('no numbers here')).toBeNull()
    })

    it('returns null for false', () => {
      expect(parseSignatureCount(false)).toBeNull()
    })
  })
})
