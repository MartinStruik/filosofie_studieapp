export const EXAM_DATE = new Date("2026-05-13T09:00:00");
export const START_DATE = new Date("2026-03-02T00:00:00");

// Studiepaden gebaseerd op leerpsychologie:
// - Spaced practice (d=0.54 effectgrootte) → herhaling van eerdere kwesties in latere weken
// - Retrieval practice → flashcards + quiz + foutenjacht als primaire leervorm
// - Interleaving → vanaf week 3 mix van nieuw + oud materiaal
// - 15 min/dag is optimaal voor examenleerlingen met meerdere vakken
export const STUDIEPAD_PRESETS = [
  {
    id: "spiraal",
    naam: "Spiraal — dagelijks 15 min",
    beschrijving: "Elke dag ~15 minuten. Nieuwe stof afgewisseld met herhaling van eerdere kwesties (spaced practice). Werkt het best voor de meeste leerlingen.",
    icoon: "🌀",
    weken: [
      { week: 1, label: "K1 — Wie ben ik?", focus: ["K1"], beschrijving: "Descartes, Sheets-Johnstone, Plessner — denkschema bekijken, Lia's verhaal lezen, eerste flashcards" },
      { week: 2, label: "K1 + B1", focus: ["K1", "B1"], beschrijving: "De Beauvoir, Fanon + wijsgerige antropologie — verdieping K1, quiz en foutenjacht" },
      { week: 3, label: "K2 + herhaling K1", focus: ["K2", "K1"], beschrijving: "Metaforen, Vroon & Draaisma, Swaab — nieuwe stof K2 + K1 flashcards herhalen" },
      { week: 4, label: "K2 + D1", focus: ["K2", "D1", "K1"], beschrijving: "Dreyfus, 4E-cognitie + kennisleer — K1 examenvragen oefenen" },
      { week: 5, label: "K3 + herhaling K1–K2", focus: ["K3", "K1", "K2"], beschrijving: "Clark, Kockelkoren — nieuwe stof K3 + eerdere kwesties ophalen" },
      { week: 6, label: "K3 + C1", focus: ["K3", "C1", "K2"], beschrijving: "Verbeek, De Mul + ethiek — K2 examenvragen oefenen" },
      { week: 7, label: "K4 + herhaling K1–K3", focus: ["K4", "K1", "K2", "K3"], beschrijving: "Morton, Despret, Haraway — nieuwe stof K4 + spiraal-herhaling" },
      { week: 8, label: "K4 + E1", focus: ["K4", "E1", "K3"], beschrijving: "Latour, Hayles, Barad, Harari, Rasch + wetenschapsfilosofie" },
      { week: 9, label: "Herhaling alles", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Alle kwesties door, moeilijke flashcards + foutenjacht + examenvragen" },
      { week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Examensimulatie, zwakke punten, laatste herhaling" },
    ],
  },
  {
    id: "blokken",
    naam: "Blokken — intensief per kwestie",
    beschrijving: "Elke kwestie twee weken diep uitwerken, dan herhaling. Voor leerlingen die liever één ding tegelijk doen.",
    icoon: "🎯",
    weken: [
      { week: 1, label: "K1 diep — deel 1", focus: ["K1"], beschrijving: "Descartes, Sheets-Johnstone, Plessner — denkschema, verhaal, filosofen" },
      { week: 2, label: "K1 diep — deel 2 + B1", focus: ["K1", "B1"], beschrijving: "De Beauvoir, Fanon + wijsgerige antropologie — alles K1 afronden" },
      { week: 3, label: "K2 diep — deel 1", focus: ["K2"], beschrijving: "Lakoff & Johnson, Vroon & Draaisma, Swaab, Dreyfus" },
      { week: 4, label: "K2 diep — deel 2 + D1", focus: ["K2", "D1"], beschrijving: "4E-cognitie, extended mind + kennisleer — alles K2 afronden" },
      { week: 5, label: "K3 diep — deel 1", focus: ["K3"], beschrijving: "Clark, Kockelkoren, Verbeek" },
      { week: 6, label: "K3 diep — deel 2 + C1", focus: ["K3", "C1"], beschrijving: "De Mul + ethiek — alles K3 afronden" },
      { week: 7, label: "K4 diep — deel 1", focus: ["K4"], beschrijving: "Morton, Despret, Haraway, Latour" },
      { week: 8, label: "K4 diep — deel 2 + E1", focus: ["K4", "E1"], beschrijving: "Hayles, Barad, Harari, Rasch + wetenschapsfilosofie" },
      { week: 9, label: "Herhaling alles", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Alle kwesties doorlopen, moeilijke onderdelen herhalen" },
      { week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"], beschrijving: "Examenvragen oefenen, zwakke punten aanpakken" },
    ],
  },
];

export const ALL_FOCUS_IDS = ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"];

export const LEITNER_INTERVALS = [0, 1, 3, 7, 14]; // box 1-5

export const SESSION_SIZE = 999;
