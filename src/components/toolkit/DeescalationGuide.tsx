import { HeartHandshake, MessageCircleHeart } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import { getDialoguePrinciples } from "../../data/factCards";

interface DeescalationGuideProps {
  lang: Locale;
  t: Translation;
}

export function DeescalationGuide({ lang, t }: DeescalationGuideProps) {
  const principles = getDialoguePrinciples(lang);

  return (
    <div className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
          <HeartHandshake size={14} />
          {t.dialogueGuideTag}
        </span>
        <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
      </div>

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.dialogueGuideTitle}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {t.dialogueGuideSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {principles.map((item) => (
          <div
            key={item.id}
            className="border border-[var(--border)] bg-[var(--bg-primary)] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-extrabold text-blue-600 dark:text-blue-400">
                  {item.step}
                </span>
                <MessageCircleHeart
                  size={15}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>

              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                {item.title}
              </h4>

              <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-4">
                {item.description}
              </p>
            </div>

            <div className="p-3 border-l-2 border-emerald-500 bg-[var(--bg-secondary)]/70 text-xs italic text-[var(--text-primary)]">
              {item.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
