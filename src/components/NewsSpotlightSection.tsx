import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Radio } from "lucide-react";
import type { Locale, Translation } from "../i18n";
import type { NewsArticle } from "./HeroSection";
import {
  deduplicateSources,
  getOriginSources,
  getPrimaryArticleUrl,
} from "../utils/news";

interface NewsSpotlightSectionProps {
  lang: Locale;
  t: Translation;
  news: NewsArticle[];
}

function getLocalizedText(
  lang: Locale,
  field: string | Record<string, string> | undefined,
) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field.de ?? "";
}

export function NewsSpotlightSection({
  lang,
  t,
  news,
}: NewsSpotlightSectionProps) {
  const items = useMemo(() => news.slice(0, 4), [news]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlideStopped, setIsAutoSlideStopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTouchDown = () => {
    setIsAutoSlideStopped(true);
  };

  useEffect(() => {
    if (items.length <= 1 || isAutoSlideStopped || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length, isAutoSlideStopped, isHovered]);

  const activeIndex = items.length > 0 ? currentIndex % items.length : 0;
  const active = items[activeIndex];

  const cleanSources = useMemo(() => {
    if (!active) return [];
    return deduplicateSources(
      active.sources,
      active.url,
      active.source || t.readMore,
    );
  }, [active, t.readMore]);

  const originSources = useMemo(
    () => getOriginSources(cleanSources),
    [cleanSources],
  );
  const primaryUrl = useMemo(
    () => (active ? getPrimaryArticleUrl(active) : undefined),
    [active],
  );

  if (items.length === 0 || !active) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--bg-secondary)] py-6"
      onTouchStart={handleTouchDown}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          handleTouchDown();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header bar: Live Wire Badge + Carousel Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Radio size={14} />
              {t.latestNewsTitle}
            </span>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + items.length) % items.length,
                  )
                }
                className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                aria-label={t.newsPrevLabel}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % items.length)
                }
                className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                aria-label={t.newsNextLabel}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="flex min-h-0 flex-col">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5 font-bold uppercase tracking-wide">
              {originSources.length > 0 ? (
                originSources.map((src, idx) => (
                  <span
                    key={src.url || idx}
                    className="inline-flex items-center gap-1.5"
                  >
                    {idx > 0 && (
                      <span className="text-[var(--text-muted)] select-none">
                        ·
                      </span>
                    )}
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                    >
                      {src.name}
                    </a>
                  </span>
                ))
              ) : active.source ? (
                active.url ? (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                  >
                    {active.source}
                  </a>
                ) : (
                  <span className="text-blue-600 dark:text-blue-400">
                    {active.source}
                  </span>
                )
              ) : null}
            </div>
            {active.date && (
              <span className="text-[var(--text-muted)]">{active.date}</span>
            )}
          </div>

          <h3 className="mb-2 text-lg md:text-xl font-bold leading-snug text-[var(--text-primary)]">
            {primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
              >
                {getLocalizedText(lang, active.title)}
              </a>
            ) : (
              getLocalizedText(lang, active.title)
            )}
          </h3>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-4xl">
            {getLocalizedText(lang, active.excerpt)}
          </p>

          <div className="mt-4 flex min-h-8 flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            {cleanSources.map((src, idx) => (
              <a
                key={src.url || idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>{src.name}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          {items.length > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-xs">
              <span className="text-[var(--text-muted)] uppercase tracking-wider">
                {activeIndex + 1} / {items.length}
              </span>
              <div className="flex gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`${t.newsSlideLabel} ${idx + 1}`}
                    className={`h-1.5 transition-all cursor-pointer ${
                      idx === activeIndex
                        ? "w-6 bg-blue-600"
                        : "w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
