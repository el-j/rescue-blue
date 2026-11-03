import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Globe,
  HeartHandshake,
  Menu,
  MessageSquareHeart,
  Moon,
  Share2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useScrollVisibility } from "../hooks/useScrollVisibility";
import { useActiveSection } from "../hooks/useActiveSection";
import { PETITION_URL } from "../petition";
import {
  LOCALE_INFO,
  type Locale,
  type Theme,
  type Translation,
} from "../i18n";
import { ShareModal } from "./ShareModal";

interface HeaderProps {
  lang: Locale;
  t: Translation;
  ctaLabel: string;
  theme: Theme;
  onChangeLanguage: (locale: Locale) => void;
  onToggleTheme: () => void;
  onSignCtaClick: () => void;
}

export function SiteHeader({
  lang,
  t,
  ctaLabel,
  theme,
  onChangeLanguage,
  onToggleTheme,
  onSignCtaClick,
}: HeaderProps) {
  const isVisible = useScrollVisibility();
  const activeSection = useActiveSection();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language popover on outside click
  useEffect(() => {
    if (!isLangOpen) return;
    function handleClick(e: MouseEvent | TouchEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [isLangOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isLangOpen && !isMobileMenuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsLangOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLangOpen, isMobileMenuOpen]);

  const moduleLinks = [
    {
      id: "street-team",
      href: "#street-team",
      label: t.navStreetTeam,
      icon: Sparkles,
    },
    {
      id: "toolkit",
      href: "#toolkit",
      label: t.navToolkit,
      icon: MessageSquareHeart,
    },
    {
      id: "blauer-planet",
      href: "#blauer-planet",
      label: t.navBluePlanet,
      icon: Globe,
    },
    {
      id: "radar",
      href: "#radar",
      label: t.navRadar,
      icon: HeartHandshake,
    },
    {
      id: "werte",
      href: "#werte",
      label: t.navValues,
      icon: Compass,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg-nav)] backdrop-blur-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 md:px-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase shrink-0 min-w-0">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <a
              href="https://change.org/rette-blau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.navCampaign}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="sm:hidden text-xs font-black tracking-wider text-[var(--text-primary)] uppercase">
                {t.footerBrand}
              </span>
              <span className="hidden sm:inline text-xs md:text-sm font-black tracking-wider text-[var(--text-primary)] uppercase">
                {t.navCampaign}
              </span>
            </a>
          </div>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-3 font-mono text-xs shrink-0 flex-nowrap">
            <a
              href="#warum"
              className={`hidden transition-colors hover:text-[var(--text-primary)] lg:block uppercase tracking-wider ${
                activeSection === "warum"
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.navWhy}
            </a>
            <a
              href="#risiken"
              className={`hidden transition-colors hover:text-[var(--text-primary)] lg:block uppercase tracking-wider ${
                activeSection === "risiken"
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.navRisks}
            </a>
            <a
              href="#hintergrund"
              className={`hidden transition-colors hover:text-[var(--text-primary)] lg:block uppercase tracking-wider ${
                activeSection === "hintergrund"
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.navScience}
            </a>
            <a
              href="#brief"
              className={`hidden transition-colors hover:text-[var(--text-primary)] lg:block uppercase tracking-wider ${
                activeSection === "brief"
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.navLetter}
            </a>
            <a
              href="#kultur"
              className={`hidden transition-colors hover:text-[var(--text-primary)] lg:block uppercase tracking-wider ${
                activeSection === "kultur"
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.navCulture}
            </a>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] p-1.5 sm:p-2 text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
              aria-label={theme === "dark" ? t.themeLight : t.themeDark}
              type="button"
              id="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun size={15} className="text-amber-400" />
              ) : (
                <Moon size={15} className="text-blue-500" />
              )}
            </button>

            {/* Language picker */}
            <div className="relative shrink-0" ref={langRef}>
              <button
                onClick={() => setIsLangOpen((c) => !c)}
                className="flex items-center gap-1 border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-1.5 font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label={t.langLabel}
                aria-expanded={isLangOpen}
                type="button"
                id="language-picker-button"
              >
                <Globe size={14} />
                <span>{lang}</span>
              </button>

              {isLangOpen && (
                <div
                  className="absolute top-full right-0 z-50 mt-1 w-48 border border-[var(--border)] bg-[var(--bg-primary)] p-1 shadow-2xl"
                  id="language-picker-popover"
                >
                  <div className="divide-y divide-[var(--border)]">
                    {LOCALE_INFO.map((locale) => (
                      <button
                        key={locale.code}
                        type="button"
                        onClick={() => {
                          onChangeLanguage(locale.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                          lang === locale.code
                            ? "bg-blue-600 text-white"
                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase opacity-75 w-6">
                          {locale.code}
                        </span>
                        <span>{locale.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 border border-[var(--border)] bg-[var(--bg-primary)] p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
              aria-label={t.navShare}
              type="button"
            >
              <Share2 size={14} />
            </button>

            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSignCtaClick}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 px-2.5 py-1.5 sm:px-3.5 text-xs font-bold text-white uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.navSign || ctaLabel}</span>
              <span className="sm:hidden">✍️</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </a>

            {/* Mobile drawer button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={
                isMobileMenuOpen ? t.navMobileMenuClose : t.navMobileMenuOpen
              }
              aria-expanded={isMobileMenuOpen}
              className="flex md:hidden items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Desktop Movement Hub Quick-Jump Sub-Bar */}
        <div className="hidden md:block border-t border-[var(--border)]/70 bg-[var(--bg-secondary)]/60 px-4 py-1.5 md:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-4 overflow-x-auto">
              {moduleLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 py-0.5 uppercase tracking-wider transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-extrabold"
                        : "text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
                    }`}
                  >
                    <Icon size={12} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
            <span className="hidden lg:inline text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              {t.heroMovementTag}
            </span>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 shadow-xl"
            id="mobile-navigation-drawer"
          >
            <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
              {moduleLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 border transition-colors uppercase tracking-wider ${
                      isActive
                        ? "border-blue-600 bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {isShareOpen && (
        <ShareModal t={t} onClose={() => setIsShareOpen(false)} />
      )}
    </>
  );
}
