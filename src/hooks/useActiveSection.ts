import { useEffect, useState } from "react";

export const DEFAULT_SECTION_IDS = [
  "street-team",
  "toolkit",
  "blauer-planet",
  "radar",
  "werte",
  "warum",
  "risiken",
  "hintergrund",
  "brief",
  "kultur",
] as const;

export function useActiveSection(
  sectionIds: readonly string[] = DEFAULT_SECTION_IDS,
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0.1,
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
