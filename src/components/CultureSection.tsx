import { BookOpen } from 'lucide-react'
import type { ContentTab, Sayings, Translation } from '../i18n'

interface CultureProps {
  t: Translation
  sayings: Sayings
  activeTab: ContentTab
  onChangeTab: (tab: ContentTab) => void
}

export function CultureSection({ t, sayings, activeTab, onChangeTab }: CultureProps) {
  return (
    <section id="kultur" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-white uppercase md:text-xl">
            <BookOpen size={20} className="text-blue-500" /> {t.cultureH}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">{t.cultureSub}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onChangeTab('sprache')}
            className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'sprache' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >{t.tabLang}</button>
          <button
            onClick={() => onChangeTab('symbolik')}
            className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'symbolik' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >{t.tabSym}</button>
        </div>
      </div>
      <div className="space-y-4">
        {sayings[activeTab].map((item, index) => (
          <div key={index} className="rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 transition-all hover:border-blue-500/30">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
              <h4 className="text-base font-bold text-white md:text-lg">{item.phrase}</h4>
              <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] tracking-wider text-neutral-400 uppercase">{item.origin}</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
