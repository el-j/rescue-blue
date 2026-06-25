import { useState, useEffect, useRef } from 'react'
import { Shield, Users, ChevronLeft, ChevronRight, Newspaper, ExternalLink } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Locale, Translation } from '../i18n'

export interface NewsSource {
  name: string
  url: string
}

export interface NewsArticle {
  title: string | Record<string, string>
  source?: string
  url?: string
  date: string
  excerpt: string | Record<string, string>
  sources?: NewsSource[]
}

interface HeroProps {
  lang: Locale
  t: Translation
  heroImageUrl: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  isLive: boolean
  news?: NewsArticle[]
}

export function HeroSection({
  lang,
  t,
  heroImageUrl,
  formattedSignatureCount,
  isLoadingSignatures,
  isLive,
  news = [],
}: HeroProps) {
  const latestNews = news.slice(0, 4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)

  const getLocalizedText = (field: string | Record<string, string> | undefined) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] ?? field['de'] ?? ''
  }

  // Total slides = 1 (Campaign visual) + news articles length
  const totalSlides = 1 + latestNews.length

  // Start autoplay timer
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 7000) // Cycle every 7 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [totalSlides, isPaused])

  // Keyboard navigation (← →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalSlides])

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50
    if (deltaX > threshold) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    } else if (deltaX < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }
    touchStartX.current = null
  }

  return (
    <header
      className="hero-fullscreen relative w-full min-h-screen overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Full-screen hero image background ── */}
      <img
        src={heroImageUrl}
        alt={
          lang === 'de'
            ? 'Kampagnenmotiv der Aktion Rettet das Blau'
            : 'Campaign visual for Rescue the Blue'
        }
        className="absolute inset-0 h-full w-full object-cover object-center z-0"
      />

      {/* Gradient overlays for text readability */}
      <div className="hero-gradient-overlay absolute inset-0 z-[1]" />

      {/* Rain drops animation (visible on slide 0) */}
      <div
        className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-500 ${
          currentIndex === 0 ? 'opacity-30' : 'opacity-0'
        }`}
      >
        {[
          { left: '15%', delay: '0.2s', dur: '1.8s' },
          { left: '30%', delay: '0.8s', dur: '2.2s' },
          { left: '45%', delay: '0.4s', dur: '1.5s' },
          { left: '60%', delay: '1.1s', dur: '2.5s' },
          { left: '75%', delay: '0.1s', dur: '1.9s' },
          { left: '90%', delay: '0.6s', dur: '2.1s' },
        ].map((drop, index) => (
          <div
            key={index}
            className="rain-drop"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.dur,
            }}
          />
        ))}
      </div>

      {/* ── Navigation Chevrons ── */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-3 md:left-6 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/30 hover:bg-black/50 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-sm border border-white/10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-3 md:right-6 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/30 hover:bg-black/50 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-sm border border-white/10"
            aria-label="Next Slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* ── Dots Indicator Pagination ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i
                  ? 'w-7 bg-blue-500 shadow-lg shadow-blue-500/40'
                  : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
           SLIDE 0 — Campaign Visual + Hero Content
         ════════════════════════════════════════════════════════════ */}
      <div
        className={`hero-slide-campaign absolute inset-0 z-20 flex flex-col items-center justify-between text-center px-4 md:px-8 pt-18 md:pt-22 pb-8 transition-all duration-700 ${
          currentIndex === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* ─── Top group: Badge + Title + Subtitle ─── */}
        <div className="flex flex-col items-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-300 uppercase backdrop-blur-sm shadow-lg">
            <Shield size={12} /> {t.badge}
          </span>
          <h1 className="mb-2 text-3xl leading-none font-black tracking-tight text-white uppercase sm:text-4xl lg:text-5xl xl:text-6xl drop-shadow-lg">
            {t.heroH1}
          </h1>
          <p className="text-base font-extrabold tracking-[0.18em] text-blue-400 uppercase sm:text-xl lg:text-2xl drop-shadow-md">
            {t.heroSub}
          </p>
        </div>

        {/* ─── Center spacer — keeps the hand clear ─── */}
        <div className="flex-1" />

        {/* ─── Bottom group: Body + Signature + Petition ─── */}
        <div className="flex flex-col items-center w-full gap-3 max-w-4xl">
          <p className="mx-auto max-w-3xl text-xs leading-relaxed text-white/75 sm:text-sm md:text-base drop-shadow-sm">
            {t.heroBody}
          </p>

          {/* Signature count bar */}
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-white/15 bg-black/35 px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md md:rounded-full md:px-5 md:text-sm">
              <Users size={16} className="text-blue-400 animate-pulse" />
              <span className="text-center text-white/80">
                {t.sigCount}{' '}
                <strong className="text-base font-black text-white md:text-lg">
                  {isLoadingSignatures ? (
                    <span className="inline-block h-5 w-12 rounded bg-white/20 align-middle animate-pulse" />
                  ) : (
                    formattedSignatureCount ?? '—'
                  )}
                </strong>{' '}
                {t.sigSupport}
              </span>
              <span className="flex items-center gap-1 rounded border border-blue-400/30 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase">
                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${isLive ? 'animate-ping' : ''}`} />
                {isLive ? t.sigLive : t.sigFallback}
              </span>
            </div>
          </div>

          {/* Petition banners */}
          <div className="w-full max-w-[92%] sm:max-w-[75%] md:max-w-[55%] lg:max-w-[45%] flex flex-col items-center gap-0.5 mb-4">
            <div className="w-full bg-[#3c2415]/90 text-white text-[10px] xs:text-xs sm:text-sm md:text-base font-extrabold py-2 px-4 uppercase tracking-wider select-none text-center shadow-lg backdrop-blur-sm">
              {t.heroImgText1}
            </div>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto w-full block bg-[#1a4b7c]/90 hover:bg-[#2263a5] text-white text-[10px] xs:text-xs sm:text-sm md:text-base font-extrabold py-2 px-4 uppercase tracking-wider transition-all duration-200 text-center shadow-lg backdrop-blur-sm active:scale-[0.99]"
            >
              {t.heroImgText2}
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
           SLIDES 1..N — News Articles
         ════════════════════════════════════════════════════════════ */}
      {latestNews.map((article, idx) => {
        const isSelected = currentIndex === idx + 1
        return (
          <div
            key={idx}
            className={`hero-news-slide absolute inset-0 z-20 flex flex-col justify-between px-6 pt-20 pb-20 md:px-16 md:pt-24 md:pb-20 lg:px-24 text-left backdrop-blur-sm transition-all duration-500 ${
              isSelected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background decorative soft glow */}
            <div className="absolute top-0 right-0 h-80 w-80 -translate-y-12 translate-x-12 rounded-full bg-rose-500/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-12 -translate-x-12 rounded-full bg-blue-500/10 blur-[80px]" />

            {/* News Slide Header */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                <Newspaper size={12} /> {t.newsBadge}
              </span>
              <span className="hero-news-date text-xs font-semibold font-mono">
                {article.date}
              </span>
            </div>

            {/* News Content Area */}
            <div className="relative z-20 my-auto max-w-3xl space-y-3.5">
              <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest leading-none">
                {article.sources && article.sources.length > 0
                  ? article.sources.map((s) => s.name).join(' · ')
                  : article.source}
              </span>
              <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tight">
                {getLocalizedText(article.title)}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-neutral-300 leading-relaxed font-normal">
                {getLocalizedText(article.excerpt)}
              </p>
            </div>

            {/* News Footer outbound link */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-t hero-news-footer-border pt-4 pb-2">
              <span className="hero-news-footer-label text-[10px] font-bold uppercase tracking-wider">
                {t.latestNewsTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {article.sources && article.sources.length > 0 ? (
                  article.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-news-link flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer"
                    >
                      {src.name} <ExternalLink size={10} />
                    </a>
                  ))
                ) : (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-news-link flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer"
                  >
                    {t.readMore} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </header>
  )
}
