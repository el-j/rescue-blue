import { BookOpenText, CircleCheck, FileText } from 'lucide-react'
import type { Translation } from '../i18n'

interface EditorialPolicySectionProps {
  t: Translation
}

export function EditorialPolicySection({ t }: EditorialPolicySectionProps) {
  return (
    <section id="editorial-policy" className="border-t border-[var(--border)] px-4 py-12 md:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">METHODIK & KORREKTUREN</span>
          <span className="h-px w-16 bg-[var(--border)]" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">{t.editorialPolicyTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] max-w-2xl">{t.editorialPolicyIntro}</p>

        <div className="border border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] grid grid-cols-1 md:grid-cols-2 bg-[var(--bg-primary)] mt-6">
          <article className="p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
              <BookOpenText size={16} className="text-blue-600 dark:text-blue-400" />
              {t.editorialPolicyRulesTitle}
            </h3>
            <ul className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
              <li className="flex items-start gap-2.5">
                <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{t.editorialPolicyRule1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{t.editorialPolicyRule2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{t.editorialPolicyRule3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{t.editorialPolicyRule4}</span>
              </li>
            </ul>
          </article>

          <article className="p-6 bg-[var(--bg-secondary)]/30">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
              <FileText size={16} className="text-amber-600 dark:text-amber-400" />
              {t.editorialPolicyCorrectionsTitle}
            </h3>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{t.editorialPolicyCorrectionsBody}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
