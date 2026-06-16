import { useEffect } from 'react'
import { Check, Copy, Download, X } from 'lucide-react'
import { useClipboard } from '../hooks/useClipboard'
import type { Translation } from '../i18n'

const QR_CODE_URL = `${import.meta.env.BASE_URL}petition-qrcode.png`
const SHARE_LINK = 'https://change.org/rette-blau'

interface ShareModalProps {
  t: Translation
  onClose: () => void
}

export function ShareModal({ t, onClose }: ShareModalProps) {
  const { isCopied, copy } = useClipboard()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          aria-label={t.shareClose}
          type="button"
        >
          <X size={18} />
        </button>

        <h2 className="mb-1 text-center text-lg font-bold text-white">{t.shareTitle}</h2>
        <p className="mb-4 text-center text-xs text-neutral-400">{t.shareSubtitle}</p>

        <img
          src={QR_CODE_URL}
          alt="QR-Code zur Petition"
          className="mx-auto w-56 rounded-xl border border-neutral-700"
        />

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2">
          <span className="flex-1 truncate text-sm text-blue-400">{SHARE_LINK}</span>
          <button
            onClick={() => copy(SHARE_LINK)}
            className="shrink-0 rounded p-1 text-neutral-400 transition-colors hover:text-white"
            aria-label={t.shareCopyLink}
            type="button"
          >
            {isCopied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
          </button>
        </div>

        <a
          href={QR_CODE_URL}
          download="petition-qrcode.png"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
        >
          <Download size={15} />
          {t.shareDownloadQr}
        </a>
      </div>
    </div>
  )
}
