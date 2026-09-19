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
    <section id="faq" className="border border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] p-6 md:p-8 bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          <span>08 / FRAGEN & ANTWORTEN</span>
        </div>
        <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          <HelpCircle size={22} className="text-blue-600 dark:text-blue-400" /> {t.faqTitle || 'FAQ'}
        </h2>
        {t.faqSub && (
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)] max-w-3xl">
            {t.faqSub}
          </p>
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div key={index} className="bg-[var(--bg-primary)]">
                <button
                  onClick={() => onToggleFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] cursor-pointer"
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
                  <div className="border-t border-[var(--border)] px-5 py-4 text-xs md:text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-secondary)]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
