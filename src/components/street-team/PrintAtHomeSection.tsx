import { Download, FileText, HeartHandshake, Printer } from "lucide-react";
import type { Locale, Translation } from "../../i18n";
import { getDownloadTemplates } from "../../data/downloads";
import { trackConversionEvent } from "../../utils/analytics";

interface PrintAtHomeProps {
  lang: Locale;
  t: Translation;
}

export function PrintAtHomeSection({ lang, t }: PrintAtHomeProps) {
  const templates = getDownloadTemplates(lang);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
          <Printer size={14} />
          {t.printTag}
        </span>
        <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
      </div>

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
          {t.printTitle}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {t.printSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-primary)] p-5 transition-colors hover:border-blue-500/50"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {tpl.formatLabel}
                </span>
                <FileText size={15} className="text-[var(--text-muted)]" />
              </div>

              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2 leading-snug">
                {tpl.title}
              </h4>

              <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-5">
                {tpl.description}
              </p>
            </div>

            <a
              href={`${baseUrl}${tpl.fileUrl}`}
              download={tpl.fileName}
              onClick={() =>
                trackConversionEvent("cta_click", {
                  surface: `print_download_${tpl.id}`,
                  lang,
                })
              }
              className="inline-flex items-center justify-center gap-2 w-full px-3 py-2.5 border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-blue-600 hover:border-blue-600 hover:text-white text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Download size={14} />
              <span>{t.printDownloadBtn}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Respectful Public Space Callout */}
      <div className="mt-6 p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
        <HeartHandshake
          size={18}
          className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400"
        />
        <div className="space-y-1">
          <p className="font-mono text-xs font-bold uppercase text-[var(--text-primary)]">
            {t.printLegalTitle}
          </p>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
            {t.printLegalBody}
          </p>
        </div>
      </div>
    </div>
  );
}
