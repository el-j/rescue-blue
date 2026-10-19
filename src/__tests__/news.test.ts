import { describe, expect, it } from "vitest";
import {
  deduplicateSources,
  extractDirectUrl,
  getOriginSources,
  getPrimaryArticleUrl,
  isPaywallUrl,
  normalizeUrl,
} from "../utils/news";

describe("news utility functions", () => {
  describe("normalizeUrl", () => {
    it("normalizes www, protocols, and trailing slashes", () => {
      expect(normalizeUrl("https://www.zeit.de/politik/artikel/")).toBe(
        "zeit.de/politik/artikel",
      );
      expect(normalizeUrl("http://zeit.de/politik/artikel")).toBe(
        "zeit.de/politik/artikel",
      );
    });

    it("returns empty string for empty input", () => {
      expect(normalizeUrl("")).toBe("");
    });
  });

  describe("extractDirectUrl and isPaywallUrl", () => {
    it("extracts direct URL from archive wrappers", () => {
      expect(
        extractDirectUrl(
          "https://archive.ph/https://www.spiegel.de/politik/artikel-1",
        ),
      ).toBe("https://www.spiegel.de/politik/artikel-1");
      expect(
        extractDirectUrl(
          "https://archive.today/2024.01.01-000000/https://www.zeit.de/artikel-2",
        ),
      ).toBe("https://www.zeit.de/artikel-2");
      expect(extractDirectUrl("https://www.spiegel.de/politik/artikel-1")).toBe(
        "https://www.spiegel.de/politik/artikel-1",
      );
    });

    it("identifies paywall domains correctly", () => {
      expect(isPaywallUrl("https://www.spiegel.de/politik/artikel-1")).toBe(
        true,
      );
      expect(isPaywallUrl("https://zeit.de/politik/artikel-2")).toBe(true);
      expect(
        isPaywallUrl("https://www.sueddeutsche.de/politik/artikel-3"),
      ).toBe(true);
      expect(isPaywallUrl("https://correctiv.org/faktencheck/artikel-4")).toBe(
        false,
      );
      expect(isPaywallUrl("https://tagesschau.de/inland/artikel-5")).toBe(
        false,
      );
    });
  });

  describe("deduplicateSources with paywall expansion", () => {
    it("automatically generates both normal and archive link for paywalled publishers", () => {
      // Input only has direct Spiegel link
      const directOnly = [
        { name: "Spiegel", url: "https://www.spiegel.de/politik/artikel-1" },
      ];
      const expanded1 = deduplicateSources(directOnly);
      expect(expanded1).toHaveLength(2);
      expect(expanded1[0]).toEqual({
        name: "Spiegel",
        url: "https://www.spiegel.de/politik/artikel-1",
      });
      expect(expanded1[1]).toEqual({
        name: "Spiegel (Archiv)",
        url: "https://archive.ph/https://www.spiegel.de/politik/artikel-1",
      });

      // Input only has archive link
      const archiveOnly = [
        {
          name: "Spiegel (Archiv)",
          url: "https://archive.ph/https://www.spiegel.de/politik/artikel-1",
        },
      ];
      const expanded2 = deduplicateSources(archiveOnly);
      expect(expanded2).toHaveLength(2);
      expect(expanded2[0]).toEqual({
        name: "Spiegel",
        url: "https://www.spiegel.de/politik/artikel-1",
      });
      expect(expanded2[1]).toEqual({
        name: "Spiegel (Archiv)",
        url: "https://archive.ph/https://www.spiegel.de/politik/artikel-1",
      });
    });

    it("deduplicates identical source names and duplicate URLs", () => {
      const sources = [
        { name: "Zeit Online", url: "https://www.zeit.de/artikel-1" },
        {
          name: "Zeit Online (Archiv)",
          url: "https://archive.ph/https://www.zeit.de/artikel-1",
        },
        { name: "Zeit Online", url: "https://zeit.de/artikel-1/" },
        {
          name: "Zeit Online (Archiv)",
          url: "https://archive.ph/https://www.zeit.de/artikel-1/",
        },
      ];

      const deduped = deduplicateSources(sources);
      expect(deduped).toHaveLength(2);
      expect(deduped[0]).toEqual({
        name: "Zeit Online",
        url: "https://www.zeit.de/artikel-1",
      });
      expect(deduped[1]).toEqual({
        name: "Zeit Online (Archiv)",
        url: "https://archive.ph/https://www.zeit.de/artikel-1",
      });
    });

    it("does not create archive links for non-paywalled sources", () => {
      const deduped = deduplicateSources(
        undefined,
        "https://correctiv.org/faktencheck",
        "CORRECTIV",
      );
      expect(deduped).toEqual([
        { name: "CORRECTIV", url: "https://correctiv.org/faktencheck" },
      ]);
    });
  });

  describe("getOriginSources", () => {
    it("filters out archive links to keep only original news sources", () => {
      const sources = [
        { name: "Zeit Online", url: "https://www.zeit.de/artikel-1" },
        {
          name: "Zeit Online (Archiv)",
          url: "https://archive.ph/https://www.zeit.de/artikel-1",
        },
      ];

      const origins = getOriginSources(sources);
      expect(origins).toHaveLength(1);
      expect(origins[0].name).toBe("Zeit Online");
    });
  });

  describe("getPrimaryArticleUrl", () => {
    it("returns origin source url when available", () => {
      const article = {
        title: "Test Title",
        date: "2026-10-18",
        excerpt: "Test excerpt",
        sources: [
          {
            name: "Spiegel (Archiv)",
            url: "https://archive.ph/https://www.spiegel.de/artikel-1",
          },
        ],
      };
      expect(getPrimaryArticleUrl(article)).toBe(
        "https://www.spiegel.de/artikel-1",
      );
    });
  });
});
