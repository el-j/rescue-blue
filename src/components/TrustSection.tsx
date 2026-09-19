import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react'
import type { Translation } from '../i18n'

interface TrustSectionProps {
  t: Translation
}

const IMPRINT_URL = `${import.meta.env.BASE_URL}imprint.html`
const SOURCE_POLICY_URL = `${import.meta.env.BASE_URL}#editorial-policy`

export function TrustSection({ t }: TrustSectionProps) {
  return (
    <section id="transparenz" className="border-t border-[var(--border)] px-4 py-12 md:px-6 bg-[var(--bg-secondary)]/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">STANDARDS & TRANSPARENZ</span>
          <span className="h-px w-16 bg-[var(--border)]" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.trustTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] max-w-2xl">
          {t.trustIntro}
        </p>
        <div className="border border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] grid grid-cols-1 md:grid-cols-3 bg-[var(--bg-primary)] mt-6">
          <article className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
                <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
                {t.trustWhoTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {t.trustWhoBody}
              </p>
            </div>
            <a
              href={IMPRINT_URL}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 transition-colors hover:underline font-mono uppercase tracking-wider"
            >
              <FileText size={13} /> {t.trustWhoLink}
            </a>
          </article>

          <article className="p-6 flex flex-col justify-between bg-[var(--bg-secondary)]/30">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                {t.trustDataTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {t.trustDataBody}
              </p>
            </div>
          </article>

          <article className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
                <FileText size={16} className="text-amber-600 dark:text-amber-400" />
                {t.trustSourceTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {t.trustSourceBody}
              </p>
            </div>
            <a
              href={SOURCE_POLICY_URL}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 transition-colors hover:underline font-mono uppercase tracking-wider"
            >
              <FileText size={13} /> {t.trustSourceLink}
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}