import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import type { Faqs, Translation } from '../i18n'

interface FaqProps {
  t: Translation
  faqs: Faqs
  openFaq: number | null
  onToggleFaq: (index: number | null) => void
}

export function FaqSection({ t, faqs, openFaq, onToggleFaq }: FaqProps) {
  return (
    <section id="faq" className="editorial-card p-6 md:p-8 space-y-6">
      <div className="border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">06 / FRAGEN & ANTWORTEN</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          <HelpCircle size={22} className="text-blue-600 dark:text-blue-400" /> {t.faqTitle || 'FAQ'}
        </h2>
        {t.faqSub && (
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {t.faqSub}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index
          return (
            <div key={index} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all">
              <button
                onClick={() => onToggleFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-hover)]"
                aria-expanded={isOpen}
                type="button"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown size={16} className="shrink-0 text-[var(--text-muted)]" />
                )}
              </button>
              {isOpen && (
                <div className="border-t border-[var(--border)] px-5 py-4 text-xs md:text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-card)]/60 animate-in">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
