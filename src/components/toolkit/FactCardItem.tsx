import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  MessageSquareQuote,
  Share2,
} from "lucide-react";
import type { Translation } from "../../i18n";
import type { FactCard } from "../../data/factCards";
import { useClipboard } from "../../hooks/useClipboard";

interface FactCardItemProps {
  t: Translation;
  card: FactCard;
  categoryLabel: string;
  onOpenShareModal: (card: FactCard) => void;
}

export function FactCardItem({
  t,
  card,
  categoryLabel,
  onOpenShareModal,
}: FactCardItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isCopied, copy } = useClipboard();

  const handleCopy = () => {
    const text = `${card.claim}\n\n✓ ${card.reality}\n\n💬 ${card.counterSnippet}\n(${card.source.title}: ${card.source.url})`;
    copy(text);
  };

  return (
    <article className="border border-[var(--border)] bg-[var(--bg-primary)] p-5 md:p-6 flex flex-col justify-between transition-colors hover:border-blue-500/40">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {categoryLabel}
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <span>
              {isExpanded ? t.toolkitCollapseBtn : t.toolkitExpandBtn}
            </span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Claim / Concern */}
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
          {t.toolkitClaimLabel}
        </p>
        <h3 className="text-base md:text-lg font-extrabold text-[var(--text-primary)] leading-snug mb-4">
          {card.claim}
        </h3>

        {isExpanded && (
          <div className="space-y-4">
            {/* Verified Reality */}
            <div className="border-t border-[var(--border)] pt-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                {t.toolkitRealityLabel}
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
                {card.reality}
              </p>
            </div>

            {/* 10-Second Bridge-Building Impulse */}
            <div className="p-3.5 border border-emerald-500/30 bg-emerald-500/5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                <MessageSquareQuote size={13} />
                <span>{t.toolkitCounterLabel}</span>
              </p>
              <p className="text-xs md:text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                {card.counterSnippet}
              </p>
            </div>

            {/* Source */}
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              <span>{t.toolkitSourceLabel}:</span>
              <a
                href={card.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[260px]"
              >
                <span className="truncate">{card.source.title}</span>
                <ExternalLink size={12} className="shrink-0" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-blue-500 font-mono text-xs font-bold text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check size={13} className="text-emerald-500" />
              <span>{t.toolkitCopiedBtn}</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>{t.toolkitCopyBtn}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onOpenShareModal(card)}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Share2 size={13} />
          <span>{t.toolkitShareCardBtn}</span>
        </button>
      </div>
    </article>
  );
}
