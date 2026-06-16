import { ArrowUpRight } from 'lucide-react'
import { RELATED_PETITIONS } from '../related-petitions'
import type { Locale, Translation } from '../i18n'

interface AlsoSupportProps {
  lang: Locale
  t: Translation
}

export function AlsoSupportSection({ lang, t }: AlsoSupportProps) {
  return (
    <section className="border-t border-neutral-800 px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-2xl font-black tracking-tight text-white uppercase md:text-3xl">
          {t.alsoSupportH}
        </h2>
        <p className="mb-8 text-sm text-neutral-400">{t.alsoSupportSub}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_PETITIONS.map((petition) => (
            <a
              key={petition.url}
              href={petition.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition-all hover:border-blue-500/40 hover:bg-neutral-900"
            >
              <p className="mb-2 text-sm font-black leading-snug text-white group-hover:text-blue-300">
                {lang === 'de' ? petition.titleDe : petition.titleEn}
              </p>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-neutral-500">
                {lang === 'de' ? petition.descDe : petition.descEn}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:text-blue-300">
                {t.alsoSupportBtn} <ArrowUpRight size={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
