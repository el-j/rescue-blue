import { BookOpenText, CircleCheck, FileText } from 'lucide-react'
import type { Translation } from '../i18n'

interface EditorialPolicySectionProps {
  t: Translation
}

export function EditorialPolicySection({ t }: EditorialPolicySectionProps) {
  return (
    <section id="editorial-policy" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase">{t.editorialPolicyTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{t.editorialPolicyIntro}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-white uppercase">
            <BookOpenText size={16} className="text-blue-400" />
            {t.editorialPolicyRulesTitle}
          </h3>
          <ul className="space-y-2 text-xs leading-relaxed text-neutral-300">
            <li className="flex items-start gap-2">
              <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{t.editorialPolicyRule1}</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{t.editorialPolicyRule2}</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{t.editorialPolicyRule3}</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{t.editorialPolicyRule4}</span>
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black tracking-wide text-white uppercase">
            <FileText size={16} className="text-amber-400" />
            {t.editorialPolicyCorrectionsTitle}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-300">{t.editorialPolicyCorrectionsBody}</p>
        </article>
      </div>
    </section>
  )
}
