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
    <section id="faq" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-xl md:p-8">
      <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-[var(--text-primary)] uppercase md:text-2xl">
        <HelpCircle size={22} className="text-blue-500" /> {t.faqTitle || 'FAQ'}
      </h2>
      {t.faqSub && (
        <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
          {t.faqSub}
        </p>
      )}

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
                  <ChevronUp size={16} className="shrink-0 text-blue-500" />
                ) : (
                  <ChevronDown size={16} className="shrink-0 text-[var(--text-muted)]" />
                )}
              </button>
              {isOpen && (
                <div className="border-t border-[var(--border)] px-5 py-4 text-xs leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-card)]/50 animate-in">
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
