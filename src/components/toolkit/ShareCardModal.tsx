import { useEffect } from "react";
import { Download, Share2, X } from "lucide-react";
import type { Translation } from "../../i18n";
import type { FactCard } from "../../data/factCards";
import {
  downloadFactCardSvg,
  getFactCardDataUrl,
  shareOrDownloadFactCard,
} from "../../utils/shareCard";

interface ShareCardModalProps {
  t: Translation;
  card: FactCard;
  onClose: () => void;
}

export function ShareCardModal({ t, card, onClose }: ShareCardModalProps) {
  const previewUrl = getFactCardDataUrl(card);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-card-modal-title"
    >
      <div className="relative w-full max-w-lg border border-[var(--border)] bg-[var(--bg-primary)] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.shareClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <X size={18} />
        </button>

        <h3
          id="share-card-modal-title"
          className="text-xl font-extrabold text-[var(--text-primary)]"
        >
          {t.shareCardModalTitle}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          {t.shareCardModalDesc}
        </p>

        <div className="my-5 overflow-hidden border border-[var(--border)] bg-[#0b1528]">
          <img
            src={previewUrl}
            alt={card.claim}
            className="w-full h-auto block"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => downloadFactCardSvg(card)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-blue-500 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] cursor-pointer"
          >
            <Download size={14} />
            <span>{t.shareCardDownloadSvg}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              void shareOrDownloadFactCard(card);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Share2 size={14} />
            <span>{t.shareCardNativeShare}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
