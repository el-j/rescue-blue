import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  HeartHandshake,
  Megaphone,
  Users,
  FileText,
} from "lucide-react";
import { RELATED_PETITIONS, type RelatedPetition } from "../related-petitions";
import type { Locale, Translation } from "../i18n";

interface AlsoSupportProps {
  lang: Locale;
  t: Translation;
}

type FilterType = "all" | "demo" | "alliance" | "petition";

export function AlsoSupportSection({ lang, t }: AlsoSupportProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredPetitions = useMemo(() => {
    if (activeFilter === "all") return RELATED_PETITIONS;
    if (activeFilter === "alliance") {
      return RELATED_PETITIONS.filter(
        (p) => p.type === "alliance" || p.type === "youth",
      );
    }
    return RELATED_PETITIONS.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    return {
      all: RELATED_PETITIONS.length,
      demo: RELATED_PETITIONS.filter((p) => p.type === "demo").length,
      alliance: RELATED_PETITIONS.filter(
        (p) => p.type === "alliance" || p.type === "youth",
      ).length,
      petition: RELATED_PETITIONS.filter((p) => p.type === "petition").length,
    };
  }, []);

  const getBadgeStyle = (type?: RelatedPetition["type"]) => {
    switch (type) {
      case "demo":
        return "text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10";
      case "alliance":
      case "youth":
        return "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10";
      case "petition":
        return "text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10";
      default:
        return "text-[var(--text-muted)] border-[var(--border)] bg-[var(--bg-secondary)]";
    }
  };

  const getActionLabel = (type?: RelatedPetition["type"]) => {
    if (type === "demo") return t.alsoSupportActionDemo;
    if (type === "alliance" || type === "youth")
      return t.alsoSupportActionAlliance;
    return t.alsoSupportBtn || "Unterzeichnen";
  };

  return (
    <section className="border-t border-[var(--border)] px-4 py-16 md:px-6 bg-[var(--bg-secondary)]/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <HeartHandshake size={15} />
            {t.alsoSupportTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              {t.alsoSupportH}
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {t.alsoSupportSub}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 border transition-all cursor-pointer font-bold ${
                activeFilter === "all"
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t.alsoSupportFilterAll} ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("demo")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer font-bold ${
                activeFilter === "demo"
                  ? "border-rose-600 bg-rose-600 text-white shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Megaphone size={12} />
              {t.alsoSupportFilterDemo} ({counts.demo})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("alliance")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer font-bold ${
                activeFilter === "alliance"
                  ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Users size={12} />
              {t.alsoSupportFilterAlliance} ({counts.alliance})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("petition")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer font-bold ${
                activeFilter === "petition"
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <FileText size={12} />
              {t.alsoSupportFilterPetition} ({counts.petition})
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {filteredPetitions.map((petition) => {
            const title = lang === "de" ? petition.titleDe : petition.titleEn;
            const desc = lang === "de" ? petition.descDe : petition.descEn;
            const category =
              lang === "de"
                ? (petition.categoryDe ?? "Initiative")
                : (petition.categoryEn ?? "Initiative");

            return (
              <a
                key={petition.url}
                href={petition.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--bg-primary)] p-5 md:p-6 flex flex-col justify-between transition-colors hover:bg-[var(--bg-secondary)]/70 relative"
              >
                <div>
                  {/* Category Pill */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${getBadgeStyle(
                        petition.type,
                      )}`}
                    >
                      {category}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--text-muted)] group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-bold leading-snug text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {desc}
                  </p>
                </div>

                {/* Footer Action Link */}
                <div className="pt-3 border-t border-[var(--border)]/60 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide group-hover:underline">
                    {getActionLabel(petition.type)}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[120px]">
                    {new URL(petition.url).hostname.replace(/^www\./, "")}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
