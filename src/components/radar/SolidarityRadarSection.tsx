import { useMemo, useState } from "react";
import { HeartHandshake, PlusCircle, Search, ShieldCheck } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import {
  FEDERAL_STATES,
  getInitiatives,
  type FederalStateCode,
  type InitiativeCategory,
} from "../../data/initiativesDirectory";
import { InitiativeCard } from "./InitiativeCard";
import { SuggestInitiativeModal } from "./SuggestInitiativeModal";

interface SolidarityRadarSectionProps {
  lang: Locale;
  t: Translation;
}

export function SolidarityRadarSection({
  lang,
  t,
}: SolidarityRadarSectionProps) {
  const allInitiatives = useMemo(() => getInitiatives(lang), [lang]);
  const [selectedState, setSelectedState] = useState<FederalStateCode | "all">(
    "all",
  );
  const [selectedCategory, setSelectedCategory] = useState<
    InitiativeCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const categoryLabels: Record<InitiativeCategory | "all", string> = {
    all: t.radarCatAll,
    counseling: t.radarCatCounseling,
    alliance: t.radarCatAlliance,
    climate: t.radarCatClimate,
    youth: t.radarCatYouth,
  };

  const filteredInitiatives = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allInitiatives.filter((item) => {
      if (
        selectedState !== "all" &&
        item.state !== selectedState &&
        item.state !== "federal"
      ) {
        return false;
      }
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const stateInfo = FEDERAL_STATES.find((s) => s.code === item.state);
      const stateText =
        `${stateInfo?.nameDe ?? ""} ${stateInfo?.nameEn ?? ""} ${item.state}`.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        stateText.includes(q)
      );
    });
  }, [allInitiatives, selectedState, selectedCategory, searchQuery]);

  const categories: Array<InitiativeCategory | "all"> = [
    "all",
    "counseling",
    "alliance",
    "climate",
    "youth",
  ];

  return (
    <section
      id="radar"
      className="border-t border-[var(--border)] bg-[var(--bg-primary)] py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Tag */}
        <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
              <HeartHandshake size={15} />
              {t.radarTag}
            </span>
            <span className="h-px w-16 bg-[var(--border)] hidden sm:inline-block" />
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1">
            <ShieldCheck size={13} />
            <span>{t.radarPrivacyBadge}</span>
          </span>
        </div>

        {/* Title & Suggest CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              {t.radarTitle}
            </h2>
            <p className="mt-2.5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              {t.radarSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSuggestOpen(true)}
            className="inline-flex items-center gap-2 border border-blue-500/40 bg-blue-500/10 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle size={14} />
            <span>{t.radarSuggestBtn}</span>
          </button>
        </div>

        {/* Category Filter & Search Input */}
        <div className="mb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
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
              placeholder={t.radarSearchPlaceholder}
              aria-label={t.radarSearchPlaceholder}
              className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        {/* Federal States Filter Pill Bar (Accessible buttons, avoids extra combobox role) */}
        <div
          className="mb-8 flex flex-wrap items-center gap-1.5 border-y border-[var(--border)] py-3 font-mono text-[11px]"
          role="group"
          aria-label="Bundesland Filter"
        >
          <button
            type="button"
            onClick={() => setSelectedState("all")}
            aria-pressed={selectedState === "all"}
            className={`px-2.5 py-1 border font-bold transition-colors cursor-pointer ${
              selectedState === "all"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t.radarStateAll}
          </button>
          {FEDERAL_STATES.map((st) => {
            const label = lang === "de" ? st.nameDe : st.nameEn;
            const isSelected = selectedState === st.code;
            return (
              <button
                key={st.code}
                type="button"
                onClick={() => setSelectedState(st.code)}
                aria-pressed={isSelected}
                className={`px-2.5 py-1 border font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-[var(--border)] bg-[var(--bg-secondary)]/60 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {st.code === "federal"
                  ? `🇩🇪 ${label}`
                  : `${st.code} · ${label}`}
              </button>
            );
          })}
        </div>

        {/* Results Grid */}
        {filteredInitiatives.length === 0 ? (
          <div className="p-8 border border-[var(--border)] bg-[var(--bg-secondary)]/40 text-center space-y-3">
            <p className="text-sm text-[var(--text-secondary)]">
              {t.radarNoResults}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedState("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-blue-600 text-white font-mono text-xs font-bold uppercase cursor-pointer"
            >
              {t.radarStateAll}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInitiatives.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                lang={lang}
                t={t}
                initiative={initiative}
                categoryLabel={categoryLabels[initiative.category]}
              />
            ))}
          </div>
        )}
      </div>

      {isSuggestOpen && (
        <SuggestInitiativeModal t={t} onClose={() => setIsSuggestOpen(false)} />
      )}
    </section>
  );
}
