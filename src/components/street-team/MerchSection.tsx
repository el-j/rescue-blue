import { useState } from "react";
import { Check, Heart, Package, Sparkles } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import { getMerchPackages, type MerchPackageId } from "../../data/merchandise";
import { OrderModal } from "./OrderModal";
import { PrintAtHomeSection } from "./PrintAtHomeSection";
import { StreetPhotoGallery } from "./StreetPhotoGallery";

interface MerchSectionProps {
  lang: Locale;
  t: Translation;
}

export function MerchSection({ lang, t }: MerchSectionProps) {
  const packages = getMerchPackages(lang);
  const [selectedPkgId, setSelectedPkgId] = useState<MerchPackageId>("starter");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const activePackage =
    packages.find((p) => p.id === selectedPkgId) ?? packages[0];

  return (
    <section
      id="street-team"
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/40 py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles size={14} />
            {t.streetTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        {/* Heading & Intro */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            {t.streetTitle}
          </h2>
          <p className="mt-2.5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.streetSubtitle}
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const isSelected = pkg.id === selectedPkgId;
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between border p-6 transition-all ${
                  isSelected
                    ? "border-blue-600 bg-[var(--bg-primary)] shadow-lg"
                    : "border-[var(--border)] bg-[var(--bg-primary)]/80 hover:border-blue-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <Package size={14} />
                      {pkg.name}
                    </span>
                    {pkg.badge && (
                      <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold uppercase">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-muted)] mb-4">
                    {pkg.subtitle}
                  </p>

                  <div className="mb-5 flex items-baseline gap-2 border-y border-[var(--border)] py-3">
                    <span className="text-3xl font-extrabold text-[var(--text-primary)]">
                      {pkg.suggestedSoliEur} €
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      Soli-Empfehlung (Selbstkosten: {pkg.baseCostEur} €)
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]"
                      >
                        <Check
                          size={14}
                          className="shrink-0 mt-0.5 text-emerald-500"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPkgId(pkg.id);
                    setIsOrderModalOpen(true);
                  }}
                  className={`w-full py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-blue-600 text-[var(--text-primary)]"
                  }`}
                >
                  {t.streetOrderBtn}: {pkg.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Solidarity Model Banner */}
        <div className="mt-6 p-5 border border-blue-500/30 bg-blue-500/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Heart
              size={20}
              className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-400"
            />
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                {t.streetSoliTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)] max-w-3xl">
                {t.streetSoliDesc}
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
            ✓ {t.streetFreeOptionHint}
          </span>
        </div>

        {/* Print-at-Home Sub-Module (Story 2.2) */}
        <PrintAtHomeSection lang={lang} t={t} />

        {/* Street Photo Gallery Sub-Module */}
        <StreetPhotoGallery lang={lang} t={t} />
      </div>

      {isOrderModalOpen && (
        <OrderModal
          t={t}
          packages={packages}
          initialPackageId={activePackage.id}
          initialSoliEur={activePackage.suggestedSoliEur}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </section>
  );
}
