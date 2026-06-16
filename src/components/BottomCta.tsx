import { ArrowUpRight } from 'lucide-react'
import { PETITION_URL } from '../petition'
import type { Translation } from '../i18n'

interface BottomCtaProps {
  t: Translation
  ctaBody: string
}

export function BottomCta({ t, ctaBody }: BottomCtaProps) {
  return (
    <div className="border-t border-neutral-800 bg-linear-to-r from-blue-950/40 via-neutral-950 to-blue-950/40 px-4 py-10 text-center md:px-6">
      <h2 className="mb-3 text-2xl font-black tracking-tight text-white uppercase md:text-4xl">{t.ctaBanner}</h2>
      <p className="mx-auto mb-6 max-w-xl text-base text-neutral-400">{ctaBody}</p>
      <a
        href={PETITION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 md:text-base"
      >
        {t.ctaBtn} <ArrowUpRight size={18} />
      </a>
    </div>
  )
}
