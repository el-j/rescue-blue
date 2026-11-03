import { useMemo, useState } from "react";
import { MessageSquareHeart, Search } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import {
  getFactCards,
  type FactCard,
  type FactCategory,
} from "../../data/factCards";
import { FactCardItem } from "./FactCardItem";
import { DeescalationGuide } from "./DeescalationGuide";
import { ShareCardModal } from "./ShareCardModal";

interface FactCardsSectionProps {
  lang: Locale;
  t: Translation;
}

export function FactCardsSection({ lang, t }: FactCardsSectionProps) {
  const allCards = useMemo(() => getFactCards(lang), [lang]);
  const [activeCategory, setActiveCategory] = useState<FactCategory | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [shareModalCard, setShareModalCard] = useState<FactCard | null>(null);

  const categoryLabels: Record<FactCategory | "all", string> = {
    all: t.toolkitFilterAll,
    social: t.toolkitFilterSocial,
    climate: t.toolkitFilterClimate,
    migration: t.toolkitFilterMigration,
    democracy: t.toolkitFilterDemocracy,
  };

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allCards.filter((card) => {
      if (activeCategory !== "all" && card.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        card.claim.toLowerCase().includes(q) ||
        card.reality.toLowerCase().includes(q) ||
        card.counterSnippet.toLowerCase().includes(q) ||
        card.source.title.toLowerCase().includes(q)
      );
    });
  }, [allCards, activeCategory, searchQuery]);

  const categories: Array<FactCategory | "all"> = [
    "all",
    "social",
    "climate",
    "migration",
    "democracy",
  ];

  return (
    <section
      id="toolkit"
      className="border-t border-[var(--border)] bg-[var(--bg-primary)] py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <MessageSquareHeart size={15} />
            {t.toolkitTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        {/* Title & Subtitle */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            {t.toolkitTitle}
          </h2>
          <p className="mt-2.5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.toolkitSubtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 border font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.toolkitSearchPlaceholder}
              aria-label={t.toolkitSearchPlaceholder}
              className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCards.map((card) => (
            <FactCardItem
              key={card.id}
              t={t}
              card={card}
              categoryLabel={categoryLabels[card.category]}
              onOpenShareModal={setShareModalCard}
            />
          ))}
        </div>

        {/* Constructive Dialogue Guide */}
        <DeescalationGuide lang={lang} t={t} />
      </div>

      {shareModalCard && (
        <ShareCardModal
          t={t}
          card={shareModalCard}
          onClose={() => setShareModalCard(null)}
        />
      )}
    </section>
  );
}
