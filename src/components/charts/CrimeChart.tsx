import type { Locale, PolicyDangersUI } from "../../i18n";

interface CrimeChartProps {
  ui: PolicyDangersUI;
  lang: Locale;
  crimeToggle: "all" | "violent" | "hate";
  setCrimeToggle: (val: "all" | "violent" | "hate") => void;
}

export function CrimeChart({
  ui,
  crimeToggle,
  setCrimeToggle,
}: CrimeChartProps) {
  let valRight = 42544;
  let valLeft = 13490;
  let maxScale = 45000;
  let formattedRight = "42.544";
  let formattedLeft = "13.490";
  let labelSuffix = ui.crimeSuffixTotal;

  if (crimeToggle === "violent") {
    valRight = 1598;
    valLeft = 1087;
    maxScale = 2000;
    formattedRight = "1.598";
    formattedLeft = "1.087";
    labelSuffix = ui.crimeSuffixViolent;
  } else if (crimeToggle === "hate") {
    valRight = 4870;
    valLeft = 1460;
    maxScale = 5000;
    formattedRight = "4.870";
    formattedLeft = "1.460";
    labelSuffix = ui.crimeSuffixHate;
  }

  const rightHeight = (valRight / maxScale) * 140;
  const leftHeight = (valLeft / maxScale) * 140;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
          {ui.pmkChartTitle}
        </h4>
        {/* Crime 3-state toggle controls */}
        <div className="inline-flex border border-[var(--border)] bg-[var(--bg-secondary)] p-0.5 shrink-0 font-mono text-xs">
          <button
            onClick={() => setCrimeToggle("all")}
            className={`px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === "all"
                ? "bg-[var(--bg-primary)] text-rose-600 dark:text-rose-400 border border-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent"
            }`}
          >
            {ui.pmkCrimes}
          </button>
          <button
            onClick={() => setCrimeToggle("violent")}
            className={`px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === "violent"
                ? "bg-[var(--bg-primary)] text-rose-600 dark:text-rose-400 border border-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent"
            }`}
          >
            {ui.pmkViolent}
          </button>
          <button
            onClick={() => setCrimeToggle("hate")}
            className={`px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer ${
              crimeToggle === "hate"
                ? "bg-[var(--bg-primary)] text-rose-600 dark:text-rose-400 border border-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent"
            }`}
          >
            {ui.pmkHate}
          </button>
        </div>
      </div>

      <div className="relative w-full h-[220px] border border-[var(--border)] bg-[var(--bg-secondary)] p-4 flex flex-col justify-between">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Horizontal Grid lines */}
          <line
            x1="50"
            y1="20"
            x2="350"
            y2="20"
            stroke="#cbd5e1"
            strokeDasharray="3 3"
          />
          <line
            x1="50"
            y1="90"
            x2="350"
            y2="90"
            stroke="#cbd5e1"
            strokeDasharray="3 3"
          />
          <line x1="50" y1="160" x2="350" y2="160" stroke="#94a3b8" />

          {/* Y Axis scale indicators */}
          <text
            x="10"
            y="24"
            className="text-[9px] svg-text-muted font-semibold"
          >
            {crimeToggle === "all"
              ? "45.000"
              : crimeToggle === "violent"
                ? "2.000"
                : "5.000"}
          </text>
          <text
            x="10"
            y="94"
            className="text-[9px] svg-text-muted font-semibold"
          >
            {crimeToggle === "all"
              ? "22.500"
              : crimeToggle === "violent"
                ? "1.000"
                : "2.500"}
          </text>
          <text
            x="10"
            y="164"
            className="text-[9px] svg-text-muted font-semibold"
          >
            0
          </text>

          {/* Bar 1: Right-wing PMK */}
          <rect
            x="90"
            y={160 - rightHeight}
            width="70"
            height={rightHeight}
            className="fill-red-600"
          />
          <text
            x="125"
            y={150 - rightHeight}
            textAnchor="middle"
            className="text-[11px] svg-text-red font-black"
          >
            {formattedRight}
          </text>
          <text
            x="125"
            y="174"
            textAnchor="middle"
            className="text-[9px] svg-text-secondary font-bold uppercase"
          >
            {ui.crimeRight} ({labelSuffix})
          </text>

          {/* Bar 2: Left-wing PMK */}
          <rect
            x="240"
            y={160 - leftHeight}
            width="70"
            height={leftHeight}
            className="fill-slate-500 dark:fill-neutral-600"
          />
          <text
            x="275"
            y={150 - leftHeight}
            textAnchor="middle"
            className="text-[11px] svg-text-primary font-black"
          >
            {formattedLeft}
          </text>
          <text
            x="275"
            y="174"
            textAnchor="middle"
            className="text-[9px] svg-text-secondary font-bold uppercase"
          >
            {ui.crimeLeft} ({labelSuffix})
          </text>
        </svg>
      </div>

      <p className="text-[10px] text-[var(--text-muted)] leading-relaxed text-center">
        {crimeToggle === "violent"
          ? ui.crimeViolentNote
          : crimeToggle === "hate"
            ? ui.crimeHateNote
            : ui.crimeTotalNote}
      </p>
    </div>
  );
}
