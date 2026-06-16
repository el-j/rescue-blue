import { ArrowUpRight, Shield, Users } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Locale, Translation } from '../i18n'

interface HeroProps {
  lang: Locale
  t: Translation
  heroImageUrl: string
  formattedSignatureCount: string | undefined
  isLoadingSignatures: boolean
  isLive: boolean
}

export function HeroSection({ lang, t, heroImageUrl, formattedSignatureCount, isLoadingSignatures, isLive }: HeroProps) {
  return (
    <header className="relative px-4 pt-12 pb-10 text-center md:px-6 md:pt-16 md:pb-12">
      <div className="mx-auto max-w-5xl">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 uppercase">
          <Shield size={12} /> {t.badge}
        </span>
        <h1 className="mb-3 text-4xl leading-none font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
          {t.heroH1}
        </h1>
        <p className="mb-5 text-lg font-extrabold tracking-[0.18em] text-blue-500 uppercase sm:text-2xl lg:text-3xl">{t.heroSub}</p>
        <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-neutral-300 sm:text-lg md:mb-10 md:text-xl">{t.heroBody}</p>

        <div className="mb-8 flex justify-center px-2 md:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-semibold shadow-inner md:rounded-full md:px-5 md:text-sm">
            <Users size={18} className="text-blue-400 animate-pulse" />
            <span className="text-center text-neutral-300">
              {t.sigCount}{' '}
              <strong className="text-base font-black text-white md:text-lg">
                {isLoadingSignatures
                  ? <span className="inline-block h-5 w-12 rounded bg-neutral-800 align-middle animate-pulse" />
                  : (formattedSignatureCount ?? '—')}
              </strong>{' '}
              {t.sigSupport}
            </span>
            <span className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
              <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
              {isLive ? t.sigLive : t.sigFallback}
            </span>
          </div>
        </div>

        <div className="relative mx-auto mb-4 max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl animate-float">
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
              <div key={index} className="rain-drop" style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.dur }} />
            ))}
          </div>
          <img
            src={heroImageUrl}
            alt={lang === 'de'
              ? 'Kampagnenmotiv der Aktion Rettet das Blau mit Herzsymbol und blauem Farbraum'
              : 'Campaign visual for Rescue the Blue with a heart symbol and blue colour field'}
            className="block w-full select-none object-cover object-center aspect-11/10 md:aspect-video"
          />
          <div className="relative z-20 p-4 md:p-0">
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-800/80 bg-neutral-950/85 p-4 backdrop-blur-md md:absolute md:bottom-6 md:right-6 md:left-6 md:flex-row md:items-center">
              <div className="text-left">
                <p className="text-sm font-black tracking-wide text-white uppercase">{t.heroImgCaption}</p>
                <p className="text-xs text-neutral-400">{t.heroImgSub}</p>
              </div>
              <a
                href={PETITION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
              >
                {t.heroImgCta} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
