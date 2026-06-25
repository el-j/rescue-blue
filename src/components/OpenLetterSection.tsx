import { MessageSquare, Users } from 'lucide-react'
import type { LetterTarget, Letters, Translation } from '../i18n'
import { DECISION_MAKERS } from './decisionMakers'

interface LetterProps {
  t: Translation
  letters: Letters
  activeLetterTarget: LetterTarget
  onChangeTarget: (target: LetterTarget) => void
}

export function OpenLetterSection({ t, letters, activeLetterTarget, onChangeTarget }: LetterProps) {
  const activeMakers = DECISION_MAKERS[activeLetterTarget] || []

  return (
    <section id="brief" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8 space-y-6">
      <div>
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
              className={`rounded-lg border px-2 py-3 text-center text-[10px] font-bold tracking-wider uppercase transition-all md:text-xs ${
                activeLetterTarget === key
                  ? 'border-blue-500/30 bg-blue-600/10 text-blue-400'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
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
      </div>

      {/* Decision Makers / Recipients Section */}
      <div className="border-t border-neutral-800 pt-6 space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-tight">
            <Users size={18} className="text-blue-400" />
            {t.recipientsHeader}
          </h4>
        </div>

        {/* Recipients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeMakers.map((maker, idx) => {
            const translatedRole =
              (t as Record<string, string>)[maker.roleKey] || maker.roleKey || ''

            const statusText =
              maker.status === 'supported'
                ? t.status_supported
                : maker.status === 'opposed'
                  ? t.status_opposed
                  : t.status_no_answer

            const badgeStyles =
              maker.status === 'supported'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : maker.status === 'opposed'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700/50'

            const dotStyles =
              maker.status === 'supported'
                ? 'bg-green-400'
                : maker.status === 'opposed'
                  ? 'bg-rose-400'
                  : 'bg-neutral-400'

            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/20 p-3.5 transition-all hover:border-neutral-700/60 hover:bg-neutral-900/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-1.5 mb-0.5">
                    <span className="font-bold text-sm text-neutral-200">{maker.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono truncate">{maker.email}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-tight">{translatedRole}</p>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${badgeStyles}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotStyles}`} />
                    {statusText}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

