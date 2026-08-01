import { Shield, Users } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Translation } from '../i18n'

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
  t: Translation
  /** Base path (no extension) - responsive variants are named `${base}-${width}.${ext}` */
  heroImageBase: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  isLive: boolean
}

const HERO_IMAGE_WIDTHS = [640, 1024, 1536, 1920, 2560]

function buildSrcSet(base: string, ext: string) {
  return HERO_IMAGE_WIDTHS.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
}

export function HeroSection({
  t,
  heroImageBase,
  formattedSignatureCount,
  isLoadingSignatures,
  isLive,
}: HeroProps) {
  return (
    <header className="hero-fullscreen relative w-full min-h-screen overflow-hidden">
      <picture>
        <source type="image/avif" srcSet={buildSrcSet(heroImageBase, 'avif')} sizes="100vw" />
        <source type="image/webp" srcSet={buildSrcSet(heroImageBase, 'webp')} sizes="100vw" />
        <img
          src={`${heroImageBase}-1920.jpg`}
          srcSet={buildSrcSet(heroImageBase, 'jpg')}
          sizes="100vw"
          alt={t.heroImageAlt}
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      <div className="hero-gradient-overlay absolute inset-0 z-[1]" />

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-30">
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

      <div className="hero-slide-campaign absolute inset-0 z-20 flex flex-col items-center justify-between px-4 pt-28 pb-8 text-center sm:pt-32 md:px-8 md:pt-36">
        <div className="flex flex-col items-center">
          <span className="hero-badge mb-4 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-lg">
            <Shield size={12} /> {t.badge}
          </span>
          <h1 className="mb-3 text-4xl leading-none font-black tracking-tight text-white uppercase drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.heroH1}
          </h1>
          <p className="hero-subheadline inline-block rounded-lg bg-black/45 px-3 py-1.5 text-base font-black tracking-[0.18em] text-blue-300 uppercase backdrop-blur-sm sm:text-xl lg:text-2xl">
            {t.heroSub}
          </p>
        </div>

        <div className="flex-1" />

        <div className="flex w-full max-w-4xl flex-col items-center gap-3">
          <p className="hero-text-description mx-auto max-w-3xl rounded-2xl px-4 py-2.5 text-xs leading-relaxed text-white/90 sm:text-sm md:text-base">
            {t.heroBody}
          </p>

          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-white/15 bg-black/35 px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md md:rounded-full md:px-5 md:text-sm">
              <Users size={16} className="animate-pulse text-blue-400" />
              <span className="text-center text-white/80">
                {t.sigCount}{' '}
                <strong className="text-base font-black text-white md:text-lg">
                  {isLoadingSignatures ? (
                    <span className="inline-block h-5 w-12 animate-pulse rounded bg-white/20 align-middle" />
                  ) : (
                    formattedSignatureCount ?? '-'
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

          <div className="mb-4 flex w-full max-w-[92%] flex-col items-center gap-0.5 sm:max-w-[75%] md:max-w-[55%] lg:max-w-[45%]">
            <div className="w-full select-none bg-[#3c2415]/90 px-4 py-2 text-center text-[10px] font-extrabold tracking-wider text-white uppercase shadow-lg backdrop-blur-sm xs:text-xs sm:text-sm md:text-base">
              {t.heroImgText1}
            </div>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto block w-full bg-[#1a4b7c]/90 px-4 py-2 text-center text-[10px] font-extrabold tracking-wider text-white uppercase shadow-lg transition-all duration-200 backdrop-blur-sm hover:bg-[#2263a5] active:scale-[0.99] xs:text-xs sm:text-sm md:text-base"
            >
              {t.heroImgText2}
            </a>
            <p className="mt-1 text-[10px] text-white/70 md:text-xs">{t.ctaExternalHint}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
