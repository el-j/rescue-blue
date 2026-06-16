import { MessageSquare } from 'lucide-react'
import type { LetterTarget, Letters, Translation } from '../i18n'

interface LetterProps {
  t: Translation
  letters: Letters
  activeLetterTarget: LetterTarget
  onChangeTarget: (target: LetterTarget) => void
}

export function OpenLetterSection({ t, letters, activeLetterTarget, onChangeTarget }: LetterProps) {
  return (
    <section id="brief" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
          <MessageSquare size={22} className="text-blue-500" /> {t.letterH}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">{t.letterSub}</p>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-2">
        {(['oeffentlich', 'privat', 'rundfunkrat'] as const).map((key) => (
          <button
            key={key}
            onClick={() => onChangeTarget(key)}
            className={`rounded-lg border px-2 py-3 text-center text-[10px] font-bold tracking-wider uppercase transition-all md:text-xs ${activeLetterTarget === key ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
            type="button"
          >
            {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
          </button>
        ))}
      </div>
      <div className="max-h-72 space-y-4 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs leading-relaxed text-neutral-300 md:p-6 md:text-sm">
        <p className="font-bold text-neutral-400">{letters[activeLetterTarget].to}</p>
        <p className="border-t border-neutral-800 pt-3">{letters[activeLetterTarget].subject}</p>
        {letters[activeLetterTarget].body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
