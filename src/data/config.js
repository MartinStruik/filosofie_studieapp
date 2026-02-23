export const EXAM_DATE = new Date("2026-05-13T09:00:00");
export const START_DATE = new Date("2026-03-02T00:00:00");

export const STUDIEPAD_PRESETS = [
  {
    id: "gespreid",
    naam: "10 weken gespreid",
    beschrijving: "Kwesties en domeinen gelijkmatig verdeeld, laatste 2 weken herhaling",
    icoon: "📅",
    weken: [
      { week: 1, label: "K1 deel 1", focus: ["K1"], beschrijving: "Descartes, Sheets-Johnstone" },
      { week: 2, label: "K1 deel 2 + B1", focus: ["K1", "B1"], beschrijving: "Plessner, De Beauvoir, Fanon + wijsgerige antropologie" },
      { week: 3, label: "K2 deel 1", focus: ["K2"], beschrijving: "Metaforen, Vroon & Draaisma, Swaab" },
      { week: 4, label: "K2 deel 2 + D1", focus: ["K2", "D1"], beschrijving: "Dreyfus, 4E-cognitie + kennisleer" },
      { week: 5, label: "K3 deel 1", focus: ["K3"], beschrijving: "Clark, Kockelkoren" },
      { week: 6, label: "K3 deel 2 + C1", focus: ["K3", "C1"], beschrijving: "Verbeek, De Mul + ethiek" },
      { week: 7, label: "K4 deel 1", focus: ["K4"], beschrijving: "Morton, Despret, Haraway" },
      { week: 8, label: "K4 deel 2 + E1", focus: ["K4", "E1"], beschrijving: "Latour, Hayles, Barad, Harari, Rasch + wetenschapsfilosofie" },
      { week: 9, label: "Herhaling", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Alle kwesties, moeilijke examenvragen opnieuw" },
      { week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Alles herhalen, zwakke punten" },
    ],
  },
  {
    id: "kwestie-voor-kwestie",
    naam: "Kwestie voor kwestie",
    beschrijving: "Elke kwestie 2 weken diep, dan domeinen, dan herhaling",
    icoon: "🎯",
    weken: [
      { week: 1, label: "K1 diep — deel 1", focus: ["K1"], beschrijving: "Descartes, Sheets-Johnstone, Plessner" },
      { week: 2, label: "K1 diep — deel 2", focus: ["K1", "B1"], beschrijving: "De Beauvoir, Fanon + wijsgerige antropologie" },
      { week: 3, label: "K2 diep — deel 1", focus: ["K2"], beschrijving: "Lakoff & Johnson, Vroon & Draaisma, Swaab, Dreyfus" },
      { week: 4, label: "K2 diep — deel 2", focus: ["K2", "D1"], beschrijving: "4E-cognitie, extended mind + kennisleer" },
      { week: 5, label: "K3 diep — deel 1", focus: ["K3"], beschrijving: "Clark, Kockelkoren, Verbeek" },
      { week: 6, label: "K3 diep — deel 2", focus: ["K3", "C1"], beschrijving: "De Mul + ethiek" },
      { week: 7, label: "K4 diep — deel 1", focus: ["K4"], beschrijving: "Morton, Despret, Haraway, Latour" },
      { week: 8, label: "K4 diep — deel 2", focus: ["K4", "E1"], beschrijving: "Hayles, Barad, Harari, Rasch + wetenschapsfilosofie" },
      { week: 9, label: "Herhaling", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Alle kwesties doorlopen, moeilijke onderdelen herhalen" },
      { week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Examenvragen oefenen, zwakke punten aanpakken" },
    ],
  },
];

export const ALL_FOCUS_IDS = ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"];

export const LEITNER_INTERVALS = [0, 1, 3, 7, 14]; // box 1-5

export const SESSION_SIZE = 15;
