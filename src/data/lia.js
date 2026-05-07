// Lia's Transformatie — index per filosoof / kernbegrip met fijnmazige paginanummers.
//
// Lia's Transformatie is de examenbundel zoals behandeld in de les.
// De studieapp gebruikt deze tabel om bij examenvragen en foutenjager-items een
// directe les-referentie te tonen ("📖 Lia D1 H3, p.19–21").

export const LIA_HOOFDSTUKKEN = {
  // Deel 1
  1: { deel: 1, titel: "Descartes' dualisme en de essentie van de mens", pagina: 5 },
  2: { deel: 1, titel: "Wij zijn een denkend, bewegend lichaam", pagina: 11 },
  3: { deel: 1, titel: "De excentrische positionaliteit van de mens", pagina: 17 },
  4: { deel: 1, titel: "Wij staan in verhouding tot de ander", pagina: 24 },
  5: { deel: 1, titel: "Metaforen en ons mensbeeld", pagina: 30 },
  6: { deel: 1, titel: "Het brein als computer — functionalisme, AI en kritiek", pagina: 35 },
  7: { deel: 1, titel: "Denken voorbij de hersenen — het 4E-cognitiemodel", pagina: 41 },
  // Deel 2
  8:  { deel: 2, titel: "De natural-born cyborg", pagina: 1 },
  9:  { deel: 2, titel: "Kockelkoren over techniek en zintuiglijke transformatie", pagina: 8 },
  10: { deel: 2, titel: "Technologie als morele vormgever", pagina: 14 },
  11: { deel: 2, titel: "De toekomstige mens volgens Jos de Mul", pagina: 19 },
  12: { deel: 2, titel: "Mortons ecologische denken en de vervaging van grenzen", pagina: 25 },
  13: { deel: 2, titel: "Handelingsvermogen voorbij de mens — Latour en Hayles", pagina: 33 },
  14: { deel: 2, titel: "Van data tot 'else' — de vervaging van fysiek en niet-fysiek", pagina: 37 },
};

// Per filosoof of kernbegrip: array van { hoofdstuk, pagina } waar pagina ofwel een
// nummer (start van hoofdstuk) of een string-range (specifiek bereik) is.
// Page-ranges grotendeels overgenomen uit handmatig samengestelde liaPages.js.
export const LIA_FILOSOFEN = {
  // Deel 1
  "Descartes":         [{ hoofdstuk: 1, pagina: "5–9" }],
  "Hume":              [{ hoofdstuk: 4, pagina: "27" }],         // is/ought; ook empirisme p.8
  "Sheets-Johnstone":  [{ hoofdstuk: 2, pagina: "12–15" }],
  "Merleau-Ponty":     [{ hoofdstuk: 2, pagina: "12–15" }],
  "Plessner":          [{ hoofdstuk: 3, pagina: "19–21" }],
  "De Beauvoir":       [{ hoofdstuk: 4, pagina: "25–26" }],
  "Beauvoir":          [{ hoofdstuk: 4, pagina: "25–26" }],
  "Fanon":             [{ hoofdstuk: 4, pagina: "26–27" }],
  "Vroon":             [{ hoofdstuk: 5, pagina: "32–33" }],
  "Draaisma":          [{ hoofdstuk: 5, pagina: "32–33" }],
  "Lakoff":            [{ hoofdstuk: 5, pagina: "31–32" }],
  "Johnson":           [{ hoofdstuk: 5, pagina: "31–32" }],
  "functionalisme":    [{ hoofdstuk: 6, pagina: "37–38" }],
  "Functionalisme":    [{ hoofdstuk: 6, pagina: "37–38" }],
  "Dreyfus":           [{ hoofdstuk: 6, pagina: "38–39" }],
  "Swaab":             [{ hoofdstuk: 6, pagina: "36–37" }],
  "4E-cognitie":       [{ hoofdstuk: 7, pagina: "43–45" }],
  "embodied cognition":[{ hoofdstuk: 7, pagina: "43" }],
  "extended cognition":[{ hoofdstuk: 7, pagina: "43–44" }],
  "embedded cognition":[{ hoofdstuk: 7, pagina: "43" }],
  "enactive cognition":[{ hoofdstuk: 7, pagina: "44–45" }],
  // Deel 2
  "Clark":             [{ hoofdstuk: 8, pagina: "2–6" }],
  "Kockelkoren":       [{ hoofdstuk: 9, pagina: "7–12" }],
  "Verbeek":           [{ hoofdstuk: 10, pagina: "13–18" }],
  "De Mul":            [{ hoofdstuk: 11, pagina: "19–23" }],
  "Morton":            [{ hoofdstuk: 12, pagina: "24–27" }],
  "Despret":           [{ hoofdstuk: 12, pagina: "28–30" }],
  "wetenschapsfilosofie":[{ hoofdstuk: 12, pagina: "28–30" }],
  "hermeneutiek":      [{ hoofdstuk: 12, pagina: "28–29" }],
  "Latour":            [{ hoofdstuk: 13, pagina: "32–37" }],
  "Hayles":            [{ hoofdstuk: 13, pagina: "36–37" }],
  "Haraway":           [{ hoofdstuk: 12, pagina: "26" }, { hoofdstuk: 14, pagina: "46–47" }],
  "Barad":             [{ hoofdstuk: 14, pagina: "40–41" }],
  "Harari":            [{ hoofdstuk: 14, pagina: "41–42" }],
  "Rasch":             [{ hoofdstuk: 14, pagina: "42–43" }],
  "existentialisme":   [{ hoofdstuk: 4, pagina: "25–26" }, { hoofdstuk: 14, pagina: "42–43" }],
};

// Helper: gegeven een lijst filosofen, geef gededupliceerde lijst van { deel, hoofdstuk, pagina }.
export function liaRefsForPhilosophers(philosophers) {
  if (!philosophers || philosophers.length === 0) return [];
  const seen = new Set();
  const refs = [];
  for (const phil of philosophers) {
    const entries = LIA_FILOSOFEN[phil];
    if (!entries) continue;
    for (const e of entries) {
      const key = `${e.hoofdstuk}-${e.pagina}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const ch = LIA_HOOFDSTUKKEN[e.hoofdstuk];
      refs.push({ deel: ch.deel, hoofdstuk: e.hoofdstuk, pagina: e.pagina });
    }
  }
  refs.sort((a, b) => a.deel - b.deel || a.hoofdstuk - b.hoofdstuk);
  return refs;
}
