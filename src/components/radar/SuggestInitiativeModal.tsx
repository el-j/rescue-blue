import { useEffect, useState } from "react";
import { CheckCircle2, Mail, PlusCircle, X } from "lucide-react";
import type { Translation } from "../../i18n";

interface SuggestInitiativeModalProps {
  t: Translation;
  onClose: () => void;
}

export function SuggestInitiativeModal({
  t,
  onClose,
}: SuggestInitiativeModalProps) {
  const [name, setName] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !website.trim()) return;
    setIsSubmitted(true);
  };

  const mailtoUrl = `mailto:bluearc.in.sky@gmail.com?subject=${encodeURIComponent(
    `Rette Blau Radar-Vorschlag: ${name}`,
  )}&body=${encodeURIComponent(
    `Initiative: ${name}\nRegion/Bundesland: ${stateRegion}\nWebsite: ${website}\nBeschreibung:\n${desc}`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="suggest-initiative-title"
    >
      <div className="relative w-full max-w-lg border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.shareClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 size={26} />
            </div>
            <h3
              id="suggest-initiative-title"
              className="text-xl font-extrabold text-[var(--text-primary)]"
            >
              {t.suggestSuccessMsg}
            </h3>
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <Mail size={14} />
                <span>E-Mail senden</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-[var(--border)] font-mono text-xs font-bold uppercase text-[var(--text-primary)] cursor-pointer"
              >
                {t.shareClose}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <PlusCircle size={15} />
              <span>Radar-Verzeichnis</span>
            </div>

            <h3
              id="suggest-initiative-title"
              className="text-xl font-extrabold text-[var(--text-primary)]"
            >
              {t.suggestModalTitle}
            </h3>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {t.suggestModalSubtitle}
            </p>

            <div>
              <label
                htmlFor="suggest-name"
                className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
              >
                {t.suggestNameLabel} *
              </label>
              <input
                id="suggest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="suggest-state"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.suggestStateLabel}
                </label>
                <input
                  id="suggest-state"
                  type="text"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  placeholder="z. B. Sachsen / Leipzig"
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label
                  htmlFor="suggest-website"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.suggestWebsiteLabel} *
                </label>
                <input
                  id="suggest-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  required
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="suggest-desc"
                className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
              >
                {t.suggestDescLabel}
              </label>
              <textarea
                id="suggest-desc"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[var(--border)] font-mono text-xs font-bold uppercase text-[var(--text-secondary)] cursor-pointer"
              >
                {t.orderCancelBtn}
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {t.suggestSubmitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
