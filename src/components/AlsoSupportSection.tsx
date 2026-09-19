import { ArrowUpRight, HeartHandshake } from 'lucide-react'
import { RELATED_PETITIONS } from '../related-petitions'
import type { Locale, Translation } from '../i18n'

interface AlsoSupportProps {
  lang: Locale
  t: Translation
}

export function AlsoSupportSection({ lang, t }: AlsoSupportProps) {
  return (
    <section className="border-t border-[var(--border)] px-4 py-14 md:px-6 bg-[var(--bg-secondary)]/40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <HeartHandshake size={14} />
            SOLIDARISCHES NETZWERK
          </span>
          <span className="h-px w-16 bg-[var(--border)]" />
        </div>
        <h2 className="mb-2 text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.alsoSupportH}
        </h2>
        <p className="mb-8 text-sm text-[var(--text-secondary)] max-w-2xl">{t.alsoSupportSub}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_PETITIONS.map((petition) => (
            <a
              key={petition.url}
              href={petition.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group editorial-card p-5 flex flex-col justify-between transition-all hover:border-blue-500/50"
            >
              <div>
                <p className="mb-2 text-sm font-bold leading-snug text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {lang === 'de' ? petition.titleDe : petition.titleEn}
                </p>
                <p className="mb-4 text-xs leading-relaxed text-[var(--text-muted)]">
                  {lang === 'de' ? petition.descDe : petition.descEn}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                {t.alsoSupportBtn} <ArrowUpRight size={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
