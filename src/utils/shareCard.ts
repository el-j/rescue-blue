import type { FactCard } from "../data/factCards";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxCharsPerLine) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines;
}

export function buildFactCardSvg(card: FactCard): string {
  const claimLines = wrapLines(card.claim, 48).slice(0, 3);
  const realityLines = wrapLines(card.reality, 54).slice(0, 5);
  const counterLines = wrapLines(card.counterSnippet, 54).slice(0, 4);

  const renderLines = (
    lines: string[],
    startY: number,
    lineHeight: number,
    fill: string,
    fontSize: number,
    fontWeight = 500,
  ) =>
    lines
      .map(
        (line, idx) =>
          `<text x="80" y="${startY + idx * lineHeight}" fill="${fill}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}">${escapeXml(line)}</text>`,
      )
      .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <rect width="1080" height="1080" fill="#0b1528" />
  <rect x="44" y="44" width="992" height="992" rx="24" fill="#0f1f3a" stroke="#2563eb" stroke-width="3" />
  <rect x="80" y="88" width="320" height="40" rx="8" fill="#1d4ed8" />
  <text x="240" y="115" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="700">RETTE-BLAU.DE · FAKTEN-CHECK</text>
  ${renderLines(claimLines, 195, 42, "#93c5fd", 30, 800)}
  <line x1="80" y1="330" x2="1000" y2="330" stroke="#1e3a8a" stroke-width="2" />
  <text x="80" y="375" fill="#60a5fa" font-family="monospace" font-size="18" font-weight="700">DIE FAKTENLAGE</text>
  ${renderLines(realityLines, 420, 38, "#f8fafc", 25, 500)}
  <rect x="80" y="640" width="920" height="240" rx="16" fill="#172b4d" stroke="#3b82f6" stroke-width="2" />
  <text x="112" y="685" fill="#34d399" font-family="monospace" font-size="18" font-weight="700">GESPRÄCHSIMPULS FÜR DAS MITEINANDER</text>
  ${linesWithOffset(counterLines, 112, 730, 36, "#e2e8f0", 23)}
  <text x="80" y="955" fill="#94a3b8" font-family="monospace" font-size="17">Quelle: ${escapeXml(card.source.title)}</text>
  <text x="1000" y="955" text-anchor="end" fill="#60a5fa" font-family="monospace" font-size="20" font-weight="700">rette-blau.de 💙</text>
</svg>`;
}

function linesWithOffset(
  lines: string[],
  x: number,
  startY: number,
  lineHeight: number,
  fill: string,
  fontSize: number,
): string {
  return lines
    .map(
      (line, idx) =>
        `<text x="${x}" y="${startY + idx * lineHeight}" fill="${fill}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`,
    )
    .join("\n  ");
}

export function getFactCardDataUrl(card: FactCard): string {
  const svg = buildFactCardSvg(card);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function shareOrDownloadFactCard(
  card: FactCard,
): Promise<"shared" | "downloaded"> {
  const shareText = `${card.claim}\n\n${card.reality}\n\n💬 ${card.counterSnippet}\n\nQuelle: ${card.source.title} (${card.source.url})\nhttps://rette-blau.de`;

  if (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function"
  ) {
    try {
      await navigator.share({
        title: `Rette Blau — ${card.claim}`,
        text: shareText,
        url: "https://rette-blau.de/#toolkit",
      });
      return "shared";
    } catch {
      // Fall back to download if user cancels or share fails
    }
  }

  downloadFactCardSvg(card);
  return "downloaded";
}

export function downloadFactCardSvg(card: FactCard): void {
  if (typeof document === "undefined") return;
  const dataUrl = getFactCardDataUrl(card);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `rette-blau-${card.id}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
