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
    <section id="brief" className="">
      {/* Dossier Header */}
      <div className="border-b border-[var(--border)] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          <span>07 / BÜRGERBRIEF</span>
        </div>
        <h3 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          <MessageSquare size={22} className="text-blue-600 dark:text-blue-400" />
          {t.letterH}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-3xl">{t.letterSub}</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Target Category Tabs */}
        <div className="grid grid-cols-3 gap-1 border border-[var(--border)] bg-[var(--bg-secondary)] p-1 font-mono text-xs">
          {(['oeffentlich', 'privat', 'rundfunkrat'] as const).map((key) => (
            <button
              key={key}
              onClick={() => onChangeTarget(key)}
              className={`py-2 px-2 text-center font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeLetterTarget === key
                  ? 'bg-blue-600 text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              type="button"
            >
              {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
            </button>
          ))}
        </div>

        {/* Formal Civic Letterhead View */}
        <div className="max-h-80 space-y-4 overflow-y-auto border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-5 font-mono text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-xs text-[var(--text-muted)]">
            <span>OFFIZIELLES SCHREIBEN</span>
            <span>STATUS: EINGEREICHT</span>
          </div>
          <p className="font-bold text-[var(--text-primary)]">{letters[activeLetterTarget].to}</p>
          <p className="font-semibold text-blue-600 dark:text-blue-400 border-t border-[var(--border)] pt-3">
            {letters[activeLetterTarget].subject}
          </p>
          {letters[activeLetterTarget].body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Decision Makers / Recipients Section */}
        <div className="border-t border-[var(--border)] pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-base font-bold text-[var(--text-primary)] uppercase tracking-tight">
              <Users size={18} className="text-blue-600 dark:text-blue-400" />
              {t.recipientsHeader}
            </h4>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {activeMakers.length} Entscheidungsträger
            </span>
          </div>

          {/* Recipients Table Roster */}
          <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
            {activeMakers.map((maker, idx) => {
              const translatedRole =
                (t as Record<string, string>)[maker.roleKey] || maker.roleKey || ''

              const statusText =
                maker.status === 'supported'
                  ? t.status_supported
                  : maker.status === 'opposed'
                    ? t.status_opposed
                    : t.status_no_answer

              const statusColor =
                maker.status === 'supported'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : maker.status === 'opposed'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-[var(--text-muted)]'

              const dotColor =
                maker.status === 'supported'
                  ? 'bg-emerald-500'
                  : maker.status === 'opposed'
                    ? 'bg-rose-500'
                    : 'bg-[var(--text-muted)]'

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-[var(--bg-secondary)]/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{maker.name}</span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono truncate">{maker.email}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-tight">{translatedRole}</p>
                  </div>
                  <div className="shrink-0">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider ${statusColor}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                      {statusText}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
