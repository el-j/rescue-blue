import { AlertTriangle, CheckCircle } from 'lucide-react'
import type { Translation } from '../i18n'

export function WhySection({ t }: { t: Translation }) {
  return (
    <section id="warum" className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight text-white uppercase">{t.whyH2}</h2>
      <p className="text-base leading-relaxed text-neutral-400">{t.whyIntro}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-red-500/30">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard1H}</h3>
          <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard1}</p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-blue-500/30">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <CheckCircle size={20} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard2H}</h3>
          <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard2}</p>
        </div>
      </div>
    </section>
  )
}
