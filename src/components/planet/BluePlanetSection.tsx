import { Globe, Leaf, Scale, Sparkles } from "lucide-react";
import type { Translation } from "../../i18n";
import { PlanetaryBoundaries } from "./PlanetaryBoundaries";

interface BluePlanetSectionProps {
  t: Translation;
}

export function BluePlanetSection({ t }: BluePlanetSectionProps) {
  const pillars = [
    {
      id: "pale-blue-dot",
      icon: Globe,
      badge: "01 / PALE BLUE DOT",
      title: t.planetCard1Title,
      body: t.planetCard1Body,
    },
    {
      id: "social-ecology",
      icon: Scale,
      badge: "02 / FAIR & BEZAHLBAR",
      title: t.planetCard2Title,
      body: t.planetCard2Body,
    },
    {
      id: "love-for-nature",
      icon: Leaf,
      badge: "03 / NATUR & VIELFALT",
      title: t.planetCard3Title,
      body: t.planetCard3Body,
    },
  ];

  return (
    <section
      id="blauer-planet"
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/40 py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles size={14} />
            {t.planetTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        {/* Heading & Intro */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            {t.planetTitle}
          </h2>
          <p className="mt-2.5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.planetSubtitle}
          </p>
        </div>

        {/* Three Focus Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.id}
                className="border border-[var(--border)] bg-[var(--bg-primary)] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {pillar.badge}
                    </span>
                    <Icon
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {pillar.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Planetary & Community Infographic */}
        <PlanetaryBoundaries t={t} />
      </div>
    </section>
  );
}
