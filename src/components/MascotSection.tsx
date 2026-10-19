import { useState } from 'react'
import { Download, Sparkles, Layers, ShieldCheck, ArrowRight, Heart } from 'lucide-react'
import type { Locale, Translation } from '../i18n'

interface MascotSectionProps {
  lang: Locale
  t: Translation
}

export function MascotSection({ lang }: MascotSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<'stickers' | 'patches'>('stickers')

  const baseUrl = import.meta.env.BASE_URL

  const isDe = lang === 'de'

  return (
    <section id="maskottchen" className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header Tag */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles size={14} />
            {isDe ? 'STREET ACTION & SOLIDARITÄT' : 'STREET ACTION & SOLIDARITY'}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Real-world merchandise photography */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--bg-primary)] shadow-xl group">
              <img
                src={selectedPhoto === 'stickers' ? `${baseUrl}antifa-peng-stickers.jpg` : `${baseUrl}antifa-peng-patches.jpg`}
                alt={isDe ? 'Echte gestickte Antifa Peng Patches und Sticker' : 'Real Antifa Peng embroidered patches and stickers'}
                width={1080}
                height={952}
                className="w-full h-auto object-cover max-h-[460px] transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Photo Switcher Buttons */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--text-muted)] mr-1">Foto-Ansicht:</span>
              <button
                type="button"
                onClick={() => setSelectedPhoto('stickers')}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  selectedPhoto === 'stickers'
                    ? 'border-blue-600 bg-blue-600 text-white font-bold'
                    : 'border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sticker-Stapel & Patches
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhoto('patches')}
                className={`px-3 py-1 border transition-colors cursor-pointer ${
                  selectedPhoto === 'patches'
                    ? 'border-blue-600 bg-blue-600 text-white font-bold'
                    : 'border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Patches Detail
              </button>
            </div>
          </div>

          {/* Right: The Mascot Story & Free Downloads */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                <Heart size={12} className="fill-current" />
                <span>{isDe ? 'Kampagnen-Maskottchen: Antifa Peng' : 'Campaign Mascot: Antifa Peng'}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase leading-tight">
                {isDe
                  ? 'Echte Zivilgesellschaft. Echte Sticker. Echter Widerstand.'
                  : 'Real Civil Society. Real Stickers. Real Action.'}
              </h2>

              <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
                {isDe
                  ? 'Wir überlassen den Rechtsextremen weder das Blau noch den öffentlichen Raum. Antifa Peng bringt Farbe, Vielfalt und Zivilcourage auf Jacken, Rucksäcke und Laternenpfähle – auf Demos und im Alltag.'
                  : 'We will not surrender democratic blue or public space to right-wing extremists. Antifa Peng brings pride, color, and solidarity to jackets, backpacks, and street demonstrations.'}
              </p>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-[var(--border)] bg-[var(--bg-primary)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase">
                  <ShieldCheck size={14} />
                  <span>{isDe ? 'Gegen Verharmlosung' : 'No Normalization'}</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {isDe
                    ? 'Das bunte Antifa-Peng-Emblem erinnert daran: Blau steht für Vernunft und Freiheit, nicht für völkische Hetze.'
                    : 'The Antifa Peng emblem reminds everyone: blue stands for democracy, Europe, and human rights.'}
                </p>
              </div>

              <div className="p-4 border border-[var(--border)] bg-[var(--bg-primary)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase">
                  <Layers size={14} />
                  <span>{isDe ? 'Freie Druck-Vorlagen' : 'Free Print Assets'}</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {isDe
                    ? 'Kostenlose Druck- und Vektordateien für eigene Soli-Drucke, Demoplakate, Flyer und lokale Initiativen.'
                    : 'Free vector and print-ready assets for demo signs, stickers, and local activist groups.'}
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
                  <span>{isDe ? 'Print-Vektor herunterladen (PDF)' : 'Download Vector (PDF)'}</span>
                </a>
                <a
                  href={`${baseUrl}antifa-peng.png`}
                  download="antifa-peng-badge.png"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Download size={15} />
                  <span>{isDe ? 'Grafik herunterladen (PNG)' : 'Download Graphic (PNG)'}</span>
                </a>
              </div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                <ArrowRight size={12} />
                {isDe
                  ? 'Freie Nutzung für zivilgesellschaftliche, antifaschistische und gemeinnützige Zwecke.'
                  : 'Free for civil society, non-profit, and anti-racist activist use.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
