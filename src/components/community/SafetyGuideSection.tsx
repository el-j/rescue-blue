import { ShieldCheck } from "lucide-react";
import type { Translation } from "../../i18n";

interface SafetyGuideSectionProps {
  t: Translation;
}

export function SafetyGuideSection({ t }: SafetyGuideSectionProps) {
  const rules = [
    {
      id: "buddy",
      title: t.safetyRule1Title,
      desc: t.safetyRule1Desc,
    },
    {
      id: "deescalation",
      title: t.safetyRule2Title,
      desc: t.safetyRule2Desc,
    },
    {
      id: "digital-privacy",
      title: t.safetyRule3Title,
      desc: t.safetyRule3Desc,
    },
    {
      id: "respect-property",
      title: t.safetyRule4Title,
      desc: t.safetyRule4Desc,
    },
    {
      id: "professional-support",
      title: t.safetyRule5Title,
      desc: t.safetyRule5Desc,
    },
  ];

  return (
    <div className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
          <ShieldCheck size={14} />
          {t.safetyTag}
        </span>
        <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
      </div>

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.safetyTitle}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {t.safetySubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="border border-[var(--border)] bg-[var(--bg-primary)] p-4 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
                {rule.title}
              </h4>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
