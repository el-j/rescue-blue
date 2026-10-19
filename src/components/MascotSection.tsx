import { useState } from "react";
import {
  Download,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
  Heart,
  Mail,
} from "lucide-react";
import type { Locale, Translation } from "../i18n";

interface MascotSectionProps {
  lang?: Locale;
  t: Translation;
}

export function MascotSection({ t }: MascotSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<"stickers" | "patches">(
    "stickers",
  );

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section
      id="maskottchen"
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles size={14} />
            {t.mascotTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Real-world merchandise photography */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--bg-primary)] shadow-xl group">
              <img
                src={
                  selectedPhoto === "stickers"
                    ? `${baseUrl}antifa-peng-stickers.jpg`
                    : `${baseUrl}antifa-peng-patches.jpg`
                }
                alt={t.mascotAlt}
                width={1080}
                height={952}
                className="w-full h-auto object-cover max-h-[460px] transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Photo Switcher Buttons */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--text-muted)] mr-1">
                {t.mascotViewLabel}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhoto("stickers")}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  selectedPhoto === "stickers"
                    ? "border-blue-600 bg-blue-600 text-white font-bold"
                    : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.mascotTabStickers}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhoto("patches")}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  selectedPhoto === "patches"
                    ? "border-blue-600 bg-blue-600 text-white font-bold"
                    : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.mascotTabPatches}
              </button>
            </div>
          </div>

          {/* Right: The Mascot Story & Free Downloads */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <Heart size={12} className="fill-current" />
                <span>{t.mascotBadgePill}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase leading-tight">
                {t.mascotHeading}
              </h2>

              <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
                {t.mascotDescription}
              </p>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-[var(--border)] bg-[var(--bg-primary)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                  <ShieldCheck size={14} />
                  <span>{t.mascotFeature1Title}</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.mascotFeature1Desc}
                </p>
              </div>

              <div className="p-4 border border-[var(--border)] bg-[var(--bg-primary)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase">
                  <Layers size={14} />
                  <span>{t.mascotFeature2Title}</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.mascotFeature2Desc}
                </p>
              </div>
            </div>

            {/* Download Buttons Bar */}
            <div className="pt-2 space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`${baseUrl}antifa-peng.pdf`}
                  download="antifa-peng-vektor-vorlage.pdf"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Download size={15} />
                  <span>{t.mascotDownloadPdf}</span>
                </a>
                <a
                  href={`${baseUrl}antifa-peng.png`}
                  download="antifa-peng-badge.png"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Download size={15} />
                  <span>{t.mascotDownloadPng}</span>
                </a>
              </div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                <ArrowRight size={12} />
                {t.mascotUsageHint}
              </p>
            </div>

            {/* Patch Email Contact Callout */}
            <div className="p-3.5 border border-dashed border-[var(--border)] bg-[var(--bg-primary)] flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Mail size={15} />
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                <span>{t.mascotPatchEmailHint} </span>
                <a
                  href="mailto:bluearc.in.sky@gmail.com?subject=Antifa%20Peng%20Patch"
                  className="font-mono font-bold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 hover:text-blue-500 transition-colors"
                >
                  bluearc.in.sky@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
