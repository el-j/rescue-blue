import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react'
import type { Translation } from '../i18n'

interface TrustSectionProps {
  t: Translation
}

const IMPRINT_URL = `${import.meta.env.BASE_URL}imprint.html`
const SOURCE_POLICY_URL = `${import.meta.env.BASE_URL}#editorial-policy`

export function TrustSection({ t }: TrustSectionProps) {

  return (
    <section className="border-t border-neutral-800 px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase">
          {t.trustTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {t.trustIntro}
        </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-6">
        <article className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black tracking-wide text-white uppercase">
            <ShieldCheck size={16} className="text-blue-400" />
            {t.trustWhoTitle}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-400">
            {t.trustWhoBody}
          </p>
          <a
            href={IMPRINT_URL}
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            <FileText size={14} /> {t.trustWhoLink}
          </a>
        </article>

        <article className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black tracking-wide text-white uppercase">
            <CheckCircle2 size={16} className="text-emerald-400" />
            {t.trustDataTitle}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-400">
            {t.trustDataBody}
          </p>
        </article>

        <article className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black tracking-wide text-white uppercase">
            <FileText size={16} className="text-amber-400" />
            {t.trustSourceTitle}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-400">
            {t.trustSourceBody}
          </p>
          <a
            href={SOURCE_POLICY_URL}
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            <FileText size={14} /> {t.trustSourceLink}
          </a>
        </article>
      </div>
      </div>
    </section>
  )
}