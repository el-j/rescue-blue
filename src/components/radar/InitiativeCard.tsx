import { ArrowUpRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import {
  getStateLabel,
  type Initiative,
} from "../../data/initiativesDirectory";

interface InitiativeCardProps {
  lang: Locale;
  t: Translation;
  initiative: Initiative;
  categoryLabel: string;
}

export function InitiativeCard({
  lang,
  t,
  initiative,
  categoryLabel,
}: InitiativeCardProps) {
  const stateLabel = getStateLabel(initiative.state, lang);

  return (
    <article className="border border-[var(--border)] bg-[var(--bg-primary)] p-5 md:p-6 flex flex-col justify-between transition-colors hover:border-blue-500/50">
      <div>
        {/* Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MapPin size={11} />
              <span>{stateLabel}</span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              {categoryLabel}
            </span>
          </div>

          {initiative.isVerified && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={12} />
              <span>{t.radarVerifiedBadge}</span>
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-2 leading-snug">
          {initiative.name}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-4">
          {initiative.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-[var(--border)]">
        {initiative.emergencyContact && (
          <div className="flex items-center justify-between gap-2 p-2.5 border border-amber-500/30 bg-amber-500/5 font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300">
              <Phone size={13} />
              <span>{t.radarEmergencyLabel}:</span>
            </span>
            <a
              href={`tel:${initiative.emergencyContact.replace(/\s+/g, "")}`}
              className="font-extrabold text-[var(--text-primary)] hover:underline"
            >
              {initiative.emergencyContact}
            </a>
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-xs">
          <a
            href={initiative.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider"
          >
            <span>{t.radarVisitWebsite}</span>
            <ArrowUpRight size={13} />
          </a>
          <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[160px]">
            {initiative.website.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
        </div>
      </div>
    </article>
  );
}
