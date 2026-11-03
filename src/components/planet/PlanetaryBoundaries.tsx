import { Droplets, HeartHandshake, Sun, Users } from "lucide-react";
import type { Translation } from "../../i18n";

interface PlanetaryBoundariesProps {
  t: Translation;
}

export function PlanetaryBoundaries({ t }: PlanetaryBoundariesProps) {
  const items = [
    {
      id: "clean-energy",
      icon: Sun,
      title: t.planetBoundary1Title,
      desc: t.planetBoundary1Desc,
      action: t.planetBoundary1Action,
      accent: "text-amber-500 border-amber-500/30 bg-amber-500/5",
    },
    {
      id: "living-nature",
      icon: Droplets,
      title: t.planetBoundary2Title,
      desc: t.planetBoundary2Desc,
      action: t.planetBoundary2Action,
      accent: "text-blue-500 border-blue-500/30 bg-blue-500/5",
    },
    {
      id: "social-fairness",
      icon: HeartHandshake,
      title: t.planetBoundary3Title,
      desc: t.planetBoundary3Desc,
      action: t.planetBoundary3Action,
      accent: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
    },
    {
      id: "peaceful-towns",
      icon: Users,
      title: t.planetBoundary4Title,
      desc: t.planetBoundary4Desc,
      action: t.planetBoundary4Action,
      accent: "text-indigo-500 border-indigo-500/30 bg-indigo-500/5",
    },
  ];

  return (
    <div className="mt-10 border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-[var(--text-primary)]">
          {t.planetBoundariesTitle}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-[var(--text-secondary)]">
          {t.planetBoundariesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="border border-[var(--border)] bg-[var(--bg-secondary)]/50 p-4 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center border mb-3 ${item.accent}`}
                >
                  <Icon size={18} />
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                ✓ {item.action}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
