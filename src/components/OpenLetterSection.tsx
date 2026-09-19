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
    <section id="brief" className="editorial-card p-6 md:p-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">05 / BÜRGERBRIEF</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="mb-6">
          <h3 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            <MessageSquare size={22} className="text-blue-600 dark:text-blue-400" />
            {t.letterH}
          </h3>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{t.letterSub}</p>
        </div>

        {/* Target Category Buttons */}
        <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-1">
          {(['oeffentlich', 'privat', 'rundfunkrat'] as const).map((key) => (
            <button
              key={key}
              onClick={() => onChangeTarget(key)}
              className={`rounded-lg py-2.5 px-2 text-center text-xs font-bold tracking-wider uppercase transition-all ${
                activeLetterTarget === key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              type="button"
            >
              {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
            </button>
          ))}
        </div>

        {/* Formal Civic Letterhead View */}
        <div className="max-h-80 space-y-4 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 font-mono text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-xs text-[var(--text-muted)] font-mono">
            <span>OFFIZIELLES SCHREIBEN</span>
            <span>STATUS: EINGEREICHT</span>
          </div>
          <p className="font-bold text-[var(--text-primary)]">{letters[activeLetterTarget].to}</p>
          <p className="font-semibold text-blue-600 dark:text-blue-400 border-t border-[var(--border-subtle)] pt-3">
            {letters[activeLetterTarget].subject}
          </p>
          {letters[activeLetterTarget].body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
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
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : maker.status === 'opposed'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border)]'

            const dotStyles =
              maker.status === 'supported'
                ? 'bg-emerald-500'
                : maker.status === 'opposed'
                  ? 'bg-rose-500'
                  : 'bg-[var(--text-muted)]'

            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-all hover:border-blue-500/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="font-bold text-sm text-[var(--text-primary)]">{maker.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono truncate">{maker.email}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-tight">{translatedRole}</p>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badgeStyles}`}>
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
