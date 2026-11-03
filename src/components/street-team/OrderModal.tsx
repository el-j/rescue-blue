import { useEffect, useState } from "react";
import { CheckCircle2, Heart, Lock, Mail, Package, X } from "lucide-react";
import type { Translation } from "../../i18n";
import type { MerchPackage, MerchPackageId } from "../../data/merchandise";

interface OrderModalProps {
  t: Translation;
  packages: MerchPackage[];
  initialPackageId: MerchPackageId;
  initialSoliEur: number;
  onClose: () => void;
}

export function OrderModal({
  t,
  packages,
  initialPackageId,
  initialSoliEur,
  onClose,
}: OrderModalProps) {
  const [selectedPkgId, setSelectedPkgId] =
    useState<MerchPackageId>(initialPackageId);
  const [soliAmount, setSoliAmount] = useState<number>(initialSoliEur);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [cityStreet, setCityStreet] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPkg =
    packages.find((p) => p.id === selectedPkgId) ?? packages[0];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !zip.trim() || !cityStreet.trim()) {
      setError(t.orderErrorRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.orderErrorEmail);
      return;
    }

    if (!/^\d{4,5}$/.test(zip.trim())) {
      setError(t.orderErrorZip);
      return;
    }

    setIsSubmitted(true);
  };

  const mailtoHref = `mailto:bluearc.in.sky@gmail.com?subject=${encodeURIComponent(
    `Rette Blau Street-Team: ${selectedPkg.name}`,
  )}&body=${encodeURIComponent(
    `Hallo Rette-Blau-Team,\n\nich möchte gerne folgendes Paket bestellen:\n- Paket: ${selectedPkg.name} (${selectedPkg.stickerCount} Sticker, ${selectedPkg.patchCount} Patches)\n- Soli-Beitrag: ${soliAmount} EUR\n\nVersandadresse:\n${name}\n${cityStreet}\n${zip}\nE-Mail: ${email}\n\nNachricht:\n${message || "—"}`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div className="relative w-full max-w-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.shareClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="space-y-5 py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 size={30} />
            </div>
            <h3
              id="order-modal-title"
              className="text-2xl font-extrabold text-[var(--text-primary)]"
            >
              {t.orderSuccessTitle}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.orderSuccessBody}
            </p>
            <div className="p-4 border border-[var(--border)] bg-[var(--bg-secondary)] text-left font-mono text-xs space-y-1">
              <p className="font-bold text-[var(--text-primary)]">
                {selectedPkg.name} · {soliAmount} €
              </p>
              <p className="text-[var(--text-secondary)]">
                {name} · {zip} {cityStreet}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Mail size={14} />
                <span>E-Mail direkt öffnen</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-[var(--border)] bg-[var(--bg-secondary)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] cursor-pointer"
              >
                {t.shareClose}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Package size={15} />
              <span>Street-Team Soli-Versand</span>
            </div>

            <h3
              id="order-modal-title"
              className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)]"
            >
              {t.orderModalTitle}
            </h3>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {t.orderModalSubtitle}
            </p>

            {error && (
              <div
                role="alert"
                className="p-3 border border-rose-500/40 bg-rose-500/10 text-xs font-bold text-rose-600 dark:text-rose-400"
              >
                {error}
              </div>
            )}

            {/* Package Picker Buttons */}
            <div>
              <span className="block font-mono text-xs font-bold uppercase text-[var(--text-primary)] mb-2">
                {t.orderPackageLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setSelectedPkgId(pkg.id);
                      setSoliAmount(pkg.suggestedSoliEur);
                    }}
                    className={`p-2.5 border text-left transition-colors cursor-pointer ${
                      selectedPkgId === pkg.id
                        ? "border-blue-600 bg-blue-600/10 text-[var(--text-primary)]"
                        : "border-[var(--border)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)]"
                    }`}
                  >
                    <p className="font-mono text-xs font-bold">{pkg.name}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {pkg.stickerCount} Sticker · {pkg.patchCount} Patch
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Soli Contribution Selector */}
            <div>
              <span className="block font-mono text-xs font-bold uppercase text-[var(--text-primary)] mb-1.5">
                {t.orderSoliAmountLabel}:{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  {soliAmount} €
                </strong>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  0,
                  selectedPkg.baseCostEur,
                  selectedPkg.suggestedSoliEur,
                  20,
                ].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSoliAmount(amt)}
                    className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                      soliAmount === amt
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {amt === 0 ? "0 € (Soli-Topf)" : `${amt} €`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="order-name"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.orderNameLabel} *
                </label>
                <input
                  id="order-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="order-email"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.orderEmailLabel} *
                </label>
                <input
                  id="order-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="order-zip"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.orderZipLabel} *
                </label>
                <input
                  id="order-zip"
                  type="text"
                  inputMode="numeric"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="10115"
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="order-address"
                  className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
                >
                  {t.orderCityStreetLabel} *
                </label>
                <input
                  id="order-address"
                  type="text"
                  value={cityStreet}
                  onChange={(e) => setCityStreet(e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="order-message"
                className="block font-mono text-xs font-bold text-[var(--text-primary)] mb-1"
              >
                {t.orderMessageLabel}
              </label>
              <textarea
                id="order-message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[var(--text-muted)] bg-[var(--bg-secondary)]/60 p-3 border border-[var(--border)]">
              <Lock size={14} className="shrink-0 mt-0.5 text-emerald-500" />
              <span>{t.orderPrivacyNote}</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-[var(--border)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                {t.orderCancelBtn}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Heart size={14} />
                <span>{t.orderSubmitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
