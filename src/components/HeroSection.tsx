import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Shield, Users, ChevronLeft, ChevronRight, Newspaper, ExternalLink } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Locale, Translation } from '../i18n'

export interface NewsSource {
  name: string
  url: string
}

export interface NewsArticle {
  title: string
  source?: string
  url?: string
  date: string
  excerpt: string
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

const LOCALIZED_TEXTS = {
  de: {
    newsBadge: 'Pressebericht',
    readMore: 'Artikel lesen',
    latestNewsTitle: 'Aktuelle Extremismus-Berichte',
    campaignTab: 'Kampagne',
  },
  en: {
    newsBadge: 'Press Report',
    readMore: 'Read Article',
    latestNewsTitle: 'Recent Extremism Reports',
    campaignTab: 'Campaign',
  },
  fr: {
    newsBadge: 'Rapport de presse',
    readMore: "Lire l'article",
    latestNewsTitle: "Rapports récents sur l'extrémisme",
    campaignTab: 'Campagne',
  },
  es: {
    newsBadge: 'Informe de prensa',
    readMore: 'Leer artículo',
    latestNewsTitle: 'Informes recientes de extremismo',
    campaignTab: 'Campaña',
  },
  tr: {
    newsBadge: 'Basın Raporu',
    readMore: 'Makaleyi Oku',
    latestNewsTitle: 'Son Aşırılık Raporları',
    campaignTab: 'Kampanya',
  },
  uk: {
    newsBadge: 'Прес-звіт',
    readMore: 'Читати статтю',
    latestNewsTitle: 'Останні звіти про екстремізм',
    campaignTab: 'Кампанія',
  },
  pl: {
    newsBadge: 'Raport prasowy',
    readMore: 'Przeczytaj artykuł',
    latestNewsTitle: 'Najnowsze raporty o ekstremizmie',
    campaignTab: 'Kampania',
  },
  it: {
    newsBadge: 'Rapporto stampa',
    readMore: "Leggi l'article",
    latestNewsTitle: "Rapporti recenti sull'estremismo",
    campaignTab: 'Campagna',
  },
  ru: {
    newsBadge: 'Пресс-отчет',
    readMore: 'Читать статью',
    latestNewsTitle: 'Последние отчеты об экстремизме',
    campaignTab: 'Кампания',
  },
} as const

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

  const texts = LOCALIZED_TEXTS[lang] || LOCALIZED_TEXTS.de

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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  return (
    <header className="relative px-4 py-16 text-center md:px-6 md:py-28 min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Immersive ambient background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={heroImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.12] blur-3xl scale-110"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/40 to-[var(--bg-primary)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-center">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 uppercase">
          <Shield size={12} /> {t.badge}
        </span>
        <h1 className="mb-3 text-4xl leading-none font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
          {t.heroH1}
        </h1>
        <p className="mb-5 text-lg font-extrabold tracking-[0.18em] text-blue-500 uppercase sm:text-2xl lg:text-3xl">
          {t.heroSub}
        </p>
        <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-neutral-300 sm:text-lg md:mb-10 md:text-xl">
          {t.heroBody}
        </p>

        <div className="mb-8 flex justify-center px-2 md:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-semibold shadow-inner md:rounded-full md:px-5 md:text-sm">
            <Users size={18} className="text-blue-400 animate-pulse" />
            <span className="text-center text-neutral-300">
              {t.sigCount}{' '}
              <strong className="text-base font-black text-white md:text-lg">
                {isLoadingSignatures ? (
                  <span className="inline-block h-5 w-12 rounded bg-neutral-800 align-middle animate-pulse" />
                ) : (
                  formattedSignatureCount ?? '—'
                )}
              </strong>{' '}
              {t.sigSupport}
            </span>
            <span className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
              <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
              {isLive ? t.sigLive : t.sigFallback}
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative mx-auto mb-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-800/30 bg-neutral-950/15 backdrop-blur-xs aspect-11/10 md:aspect-video select-none group shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Permanent Soft Background Image */}
          <img
            src={heroImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-50 blur-xs pointer-events-none scale-102 z-10"
            aria-hidden="true"
          />
          {/* Navigation Chevrons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 rounded-full border border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-700/80 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 rounded-full border border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-700/80 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots Indicator Pagination */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? 'w-5 bg-blue-500' : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide 0: Campaign Graphic */}
          <div
            className={`absolute inset-0 z-20 flex flex-col justify-end transition-all duration-500 ${
              currentIndex === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-40">
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
            <img
              src={heroImageUrl}
              alt={
                lang === 'de'
                  ? 'Kampagnenmotiv der Aktion Rettet das Blau mit Herzsymbol und blauem Farbraum'
                  : 'Campaign visual for Rescue the Blue with a heart symbol and blue colour field'
              }
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="relative z-20 p-4 md:p-6 text-left">
              <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-800/80 bg-neutral-950/85 p-4 backdrop-blur-md md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-black tracking-wide text-white uppercase">{t.heroImgCaption}</p>
                  <p className="text-xs text-neutral-400">{t.heroImgSub}</p>
                </div>
                <a
                  href={PETITION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 cursor-pointer"
                >
                  {t.heroImgCta} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Slides 1..N: News Articles */}
          {latestNews.map((article, idx) => {
            const isSelected = currentIndex === idx + 1
            return (
              <div
                key={idx}
                className={`absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 text-left bg-neutral-950/40 backdrop-blur-xs transition-all duration-500 ${
                  isSelected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Background decorative soft glow */}
                <div className="absolute top-0 right-0 h-80 w-80 -translate-y-12 translate-x-12 rounded-full bg-rose-500/10 blur-[80px]" />
                <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-12 -translate-x-12 rounded-full bg-blue-500/10 blur-[80px]" />

                {/* News Slide Header */}
                <div className="relative z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                    <Newspaper size={12} /> {texts.newsBadge}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 font-mono">
                    {article.date}
                  </span>
                </div>

                {/* News Content Area */}
                <div className="relative z-20 my-auto max-w-2xl space-y-3.5">
                  <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest leading-none">
                    {article.sources && article.sources.length > 0
                      ? article.sources.map((s) => s.name).join(' · ')
                      : article.source}
                  </span>
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
                    {article.excerpt}
                  </p>
                </div>

                {/* News Footer outbound link */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800/60 pt-4 pb-4">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    {texts.latestNewsTitle}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.sources && article.sources.length > 0 ? (
                      article.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white px-3 py-1.5 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer border border-neutral-700/50"
                        >
                          {src.name} <ExternalLink size={10} />
                        </a>
                      ))
                    ) : (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer border border-neutral-700/50"
                      >
                        {texts.readMore} <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
