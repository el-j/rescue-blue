import { Camera, Mail, ShieldCheck } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import { getStreetPhotos } from "../../data/merchandise";

interface StreetPhotoGalleryProps {
  lang: Locale;
  t: Translation;
}

export function StreetPhotoGallery({ lang, t }: StreetPhotoGalleryProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const photos = getStreetPhotos(lang, baseUrl);

  return (
    <div className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
          <Camera size={14} />
          {t.galleryTag}
        </span>
        <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            {t.galleryTitle}
          </h3>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        <a
          href="mailto:bluearc.in.sky@gmail.com?subject=Rette%20Blau%20Foto-Einsendung%20(Blaues%20Band)"
          className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-primary)] hover:border-blue-500 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors shrink-0"
        >
          <Mail size={14} className="text-blue-600 dark:text-blue-400" />
          <span>{t.gallerySendPhotoCta}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <figure
            key={photo.id}
            className="border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative overflow-hidden bg-[var(--bg-secondary)] aspect-[4/3]">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 bg-black/75 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                {photo.locationTag}
              </span>
            </div>
            <figcaption className="p-3.5 text-xs leading-relaxed text-[var(--text-secondary)]">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
        <span>{t.galleryExifNote}</span>
      </div>
    </div>
  );
}
