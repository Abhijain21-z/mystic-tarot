import type { ReadingCard } from "./interpret";

/**
 * Client-side "print to PDF" view of a finished reading.
 * Opens a styled print window; the visitor saves it as PDF (or prints it).
 * Used by the $1 PDF unlock on the result screen.
 */
export function openReadingPdf(cards: ReadingCard[], streamLabel: string, question: string): boolean {
  const w = window.open("", "_blank", "width=880,height=760");
  if (!w) return false;
  const origin = window.location.origin;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows = cards
    .map((c) => `<div class="card">
      <img src="${origin}${c.image}" alt="${esc(c.name)}" crossorigin="anonymous" />
      <div class="body">
        <h3><span class="pos">${esc(c.positionTitle)}</span>${c.name} · ${c.reversed ? "Reversed" : "Upright"}</h3>
        <p class="sum">${esc(c.summary)}</p>
        <p>${esc(c.detail)}</p>
        <p class="advice"><b>Advice:</b> ${esc(c.advice)}</p>
        <div class="lenses">
          <p><b>Love:</b> ${esc(c.love)}</p>
          <p><b>Career:</b> ${esc(c.career)}</p>
          <p><b>Money:</b> ${esc(c.money)}</p>
          <p><b>Spirit:</b> ${esc(c.spiritual)}</p>
        </div>
      </div>
    </div>`)
    .join("\n");

  w.document.write(`<!doctype html><html><head><meta charset="utf-8"/>
<title>MysticTarot Reading — ${esc(streamLabel)}</title>
<style>
  @page { margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #241a38; margin: 0; }
  header { background: linear-gradient(135deg, #1c0c3d, #3b1f78); color: #f5e3b0; padding: 26px 30px; }
  header h1 { margin: 0; font-size: 26px; letter-spacing: 0.5px; }
  header p { margin: 6px 0 0; color: #d8c99b; font-style: italic; font-size: 13px; }
  .q { margin: 14px 30px 0; padding: 12px 16px; border-left: 4px solid #b98a2e; background: #faf6ec; font-style: italic; }
  .card { display: flex; gap: 16px; padding: 16px 30px; border-bottom: 1px solid #e8dcc0; page-break-inside: avoid; }
  .card img { width: 92px; height: 150px; object-fit: cover; border-radius: 8px; border: 2px solid #b98a2e; flex-shrink: 0; }
  .card .body { font-size: 12.5px; line-height: 1.5; }
  .card h3 { margin: 0 0 4px; font-size: 15px; color: #3b1f78; }
  .pos { display: inline-block; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; background: #f3e8cf; color: #7a5a14; padding: 2px 8px; border-radius: 999px; margin-right: 8px; vertical-align: 2px; }
  .sum { font-style: italic; color: #6d5a33; margin: 2px 0 6px; }
  .advice { margin: 6px 0; }
  .lenses { margin: 4px 0 0; padding: 8px 10px; background: #faf6ec; border-radius: 8px; font-size: 11.5px; }
  .lenses p { margin: 2px 0; }
  footer { padding: 18px 30px 26px; text-align: center; font-size: 11px; color: #8b7b55; }
  footer a { color: #7a5a14; }
  @media print { header { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style></head><body>
<header><h1>✦ MysticTarot — Your ${esc(streamLabel)} Reading ✦</h1>
<p>${cards.length}-card spread · Rider–Waite deck · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p></header>
${question ? `<div class="q">&ldquo;${esc(question)}&rdquo;</div>` : ""}
${rows}
<footer>Reflection, not prophecy — questions for your own deliberation.<br/>
<a href="${origin}/">www.tarotwin.com</a> — free tarot readings, 78-card deck, every day.</footer>
</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
  return true;
}
