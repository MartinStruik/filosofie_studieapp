// Mindmap data: interactieve denkschema's per kwestie en als bonus bij teksten/rode draad
// Elke mindmap heeft nodes (met posities) en edges (verbindingen)
// Node types: "central" (hoofdvraag), "filosoof", "concept", "label", "kwestie"
// Links verwijzen naar app-views zodat je kunt doorklikken

export const MINDMAPS = [
  // === KWESTIE 1: Wat is de mens? ===
  {
    id: "k1-lichaam",
    title: "Kwestie 1: Wat is de mens?",
    kwestie: 1,
    context: ["kwestie"],
    beschrijving: "Het lichaam als startpunt: van dualisme naar geleefde ervaring en identiteit",
    nodes: [
      { id: "centrum", label: "Wat is de mens?", type: "central", x: 50, y: 50 },
      // Dualisme-tak
      { id: "descartes", label: "Descartes", type: "filosoof", x: 15, y: 20, color: "#4A90D9", sub: "Dualisme: res cogitans + res extensa" },
      { id: "dualisme", label: "Lichaam als machine", type: "concept", x: 15, y: 5, color: "#4A90D9" },
      // Fenomenologie-tak
      { id: "sheets", label: "Sheets-Johnstone", type: "filosoof", x: 80, y: 15, color: "#2E9E5A", sub: "Pre-reflectief lichaamsschema" },
      { id: "plessner", label: "Plessner", type: "filosoof", x: 85, y: 35, color: "#2E9E5A", sub: "Excentrische positionaliteit" },
      { id: "fenomeno", label: "Fenomenologie", type: "label", x: 85, y: 5, color: "#2E9E5A" },
      { id: "kunstmatig", label: "Natuurlijke\nkunstmatigheid", type: "concept", x: 70, y: 45, color: "#2E9E5A" },
      // Identiteit-tak
      { id: "beauvoir", label: "De Beauvoir", type: "filosoof", x: 20, y: 75, color: "#E87C3E", sub: "'Men wordt niet als vrouw geboren'" },
      { id: "fanon", label: "Fanon", type: "filosoof", x: 20, y: 92, color: "#E87C3E", sub: "Raciaal-epidermaal schema" },
      { id: "identiteit", label: "Identiteit als\nconstructie", type: "label", x: 5, y: 83, color: "#E87C3E" },
      // Spanning
      { id: "spanning1", label: "Spanning: is het lichaam\nobject of subject?", type: "concept", x: 50, y: 28, color: "#c62828" },
    ],
    edges: [
      { from: "centrum", to: "descartes", label: "" },
      { from: "centrum", to: "sheets" },
      { from: "centrum", to: "plessner" },
      { from: "centrum", to: "beauvoir" },
      { from: "centrum", to: "fanon" },
      { from: "descartes", to: "dualisme" },
      { from: "sheets", to: "fenomeno" },
      { from: "plessner", to: "kunstmatig" },
      { from: "beauvoir", to: "identiteit" },
      { from: "fanon", to: "identiteit" },
      { from: "descartes", to: "spanning1", style: "dashed" },
      { from: "sheets", to: "spanning1", style: "dashed" },
    ],
  },

  // === KWESTIE 2: Cognitie ===
  {
    id: "k2-cognitie",
    title: "Kwestie 2: Hoe kennen we onszelf?",
    kwestie: 2,
    context: ["kwestie"],
    beschrijving: "Van computermetafoor tot belichaamde cognitie: twee kampen over de geest",
    nodes: [
      { id: "centrum", label: "Hoe kennen\nwe onszelf?", type: "central", x: 50, y: 50 },
      // Computationalisme-tak
      { id: "comp", label: "Computationalisme", type: "label", x: 15, y: 15, color: "#4A90D9" },
      { id: "swaab", label: "Swaab", type: "filosoof", x: 10, y: 33, color: "#4A90D9", sub: "'Wij zijn ons brein'" },
      { id: "vroon", label: "Vroon & Draaisma", type: "filosoof", x: 30, y: 20, color: "#4A90D9", sub: "Metaforen voor de geest" },
      { id: "breincomp", label: "Brein = computer", type: "concept", x: 10, y: 5, color: "#4A90D9" },
      // Kritiek
      { id: "dreyfus", label: "Dreyfus", type: "filosoof", x: 50, y: 20, color: "#c62828", sub: "Kritiek: geest ≠ software" },
      // 4E-tak
      { id: "4e", label: "4E-Cognitie", type: "label", x: 85, y: 15, color: "#2E9E5A" },
      { id: "embodied", label: "Embodied", type: "concept", x: 72, y: 5, color: "#2E9E5A" },
      { id: "embedded", label: "Embedded", type: "concept", x: 92, y: 5, color: "#2E9E5A" },
      { id: "extended", label: "Extended", type: "concept", x: 72, y: 28, color: "#2E9E5A" },
      { id: "enactive", label: "Enactive", type: "concept", x: 92, y: 28, color: "#2E9E5A" },
      // Metaforen
      { id: "lakoff", label: "Lakoff & Johnson", type: "filosoof", x: 25, y: 75, color: "#7B61C4", sub: "Belichaamde metaforen" },
      { id: "metafoor", label: "Metaforen sturen\nons denken", type: "concept", x: 10, y: 85, color: "#7B61C4" },
      // Clark
      { id: "clark", label: "Clark", type: "filosoof", x: 75, y: 75, color: "#2E9E5A", sub: "Extended mind (Otto & Inga)" },
      // Spanning
      { id: "spanning", label: "Kernvraag: zit de\ngeest in het brein?", type: "concept", x: 50, y: 90, color: "#c62828" },
    ],
    edges: [
      { from: "centrum", to: "comp" },
      { from: "centrum", to: "4e" },
      { from: "centrum", to: "lakoff" },
      { from: "comp", to: "swaab" },
      { from: "comp", to: "vroon" },
      { from: "comp", to: "breincomp" },
      { from: "4e", to: "embodied" },
      { from: "4e", to: "embedded" },
      { from: "4e", to: "extended" },
      { from: "4e", to: "enactive" },
      { from: "extended", to: "clark" },
      { from: "dreyfus", to: "comp", style: "dashed", label: "kritiek" },
      { from: "dreyfus", to: "4e", label: "opent deur" },
      { from: "lakoff", to: "metafoor" },
      { from: "swaab", to: "spanning", style: "dashed" },
      { from: "clark", to: "spanning", style: "dashed" },
    ],
  },

  // === KWESTIE 3: Techniek en de mens ===
  {
    id: "k3-techniek",
    title: "Kwestie 3: Verandert techniek ons wezen?",
    kwestie: 3,
    context: ["kwestie"],
    beschrijving: "Van cyborg tot morele bemiddeling: hoe techniek ons verandert",
    nodes: [
      { id: "centrum", label: "Verandert techniek\nons wezen?", type: "central", x: 50, y: 45 },
      // Clark
      { id: "clark", label: "Clark", type: "filosoof", x: 15, y: 15, color: "#4A90D9", sub: "Natural-born cyborg" },
      { id: "cyborg", label: "Mens = altijd\nal cyborg", type: "concept", x: 5, y: 3, color: "#4A90D9" },
      // Kockelkoren
      { id: "kockelkoren", label: "Kockelkoren", type: "filosoof", x: 82, y: 15, color: "#2E9E5A", sub: "Decentreren & recentreren" },
      { id: "zintuig", label: "Techniek verandert\nwaarneming", type: "concept", x: 90, y: 3, color: "#2E9E5A" },
      // Verbeek
      { id: "verbeek", label: "Verbeek", type: "filosoof", x: 15, y: 75, color: "#E87C3E", sub: "Technologische bemiddeling" },
      { id: "moraal", label: "Techniek stuurt\nmorele keuzes", type: "concept", x: 5, y: 90, color: "#E87C3E" },
      { id: "echo", label: "Echoscopie-\ncasus", type: "concept", x: 30, y: 88, color: "#E87C3E" },
      // De Mul
      { id: "demul", label: "De Mul", type: "filosoof", x: 82, y: 75, color: "#7B61C4", sub: "NBIN → drie scenario's" },
      { id: "extra", label: "Extra-\nhumanisme", type: "concept", x: 70, y: 92, color: "#7B61C4" },
      { id: "trans", label: "Trans-\nhumanisme", type: "concept", x: 82, y: 92, color: "#7B61C4" },
      { id: "posthu", label: "Post-\nhumanisme", type: "concept", x: 94, y: 92, color: "#7B61C4" },
      // Kern
      { id: "kern", label: "Techniek is niet\nneutraal", type: "concept", x: 50, y: 70, color: "#c62828" },
    ],
    edges: [
      { from: "centrum", to: "clark" },
      { from: "centrum", to: "kockelkoren" },
      { from: "centrum", to: "verbeek" },
      { from: "centrum", to: "demul" },
      { from: "clark", to: "cyborg" },
      { from: "kockelkoren", to: "zintuig" },
      { from: "verbeek", to: "moraal" },
      { from: "verbeek", to: "echo" },
      { from: "demul", to: "extra" },
      { from: "demul", to: "trans" },
      { from: "demul", to: "posthu" },
      { from: "verbeek", to: "kern", style: "dashed" },
      { from: "clark", to: "kern", style: "dashed" },
      { from: "kockelkoren", to: "kern", style: "dashed" },
    ],
  },

  // === KWESTIE 4: Grensvervagingen ===
  {
    id: "k4-grenzen",
    title: "Kwestie 4: Grensvervagingen",
    kwestie: 4,
    context: ["kwestie"],
    beschrijving: "Drie grenzen die vervagen: mens↔dier, levend↔niet-levend, fysiek↔niet-fysiek",
    nodes: [
      { id: "centrum", label: "Grensvervagingen\nrond 'mens'", type: "central", x: 50, y: 45 },
      // Grens 1: mens-dier
      { id: "g1", label: "Mens ↔ Dier", type: "label", x: 12, y: 10, color: "#2E9E5A" },
      { id: "morton", label: "Morton", type: "filosoof", x: 5, y: 25, color: "#2E9E5A", sub: "The mesh: alles is verbonden" },
      { id: "despret", label: "Despret", type: "filosoof", x: 25, y: 25, color: "#2E9E5A", sub: "Dierlijke agency" },
      // Grens 2: levend-niet-levend
      { id: "g2", label: "Levend ↔\nNiet-levend", type: "label", x: 85, y: 10, color: "#4A90D9" },
      { id: "latour", label: "Latour", type: "filosoof", x: 78, y: 25, color: "#4A90D9", sub: "Actanten: dingen handelen" },
      { id: "hayles", label: "Hayles", type: "filosoof", x: 95, y: 25, color: "#4A90D9", sub: "Cognitieve non-mens" },
      // Grens 3: fysiek-niet-fysiek
      { id: "g3", label: "Fysiek ↔\nNiet-fysiek", type: "label", x: 50, y: 85, color: "#7B61C4" },
      { id: "barad", label: "Barad", type: "filosoof", x: 35, y: 92, color: "#7B61C4", sub: "Intra-actie: materie is actief" },
      { id: "harari", label: "Harari", type: "filosoof", x: 55, y: 92, color: "#7B61C4", sub: "Dataïsme" },
      { id: "rasch", label: "Rasch", type: "filosoof", x: 75, y: 92, color: "#7B61C4", sub: "Het 'else': data mist altijd iets" },
      // Haraway centraal
      { id: "haraway", label: "Haraway", type: "filosoof", x: 50, y: 18, color: "#c62828", sub: "Cyborg: alle grenzen poreus" },
      // Kanttekening
      { id: "kant", label: "Rasch: er gaat\naltijd iets verloren", type: "concept", x: 85, y: 80, color: "#999" },
    ],
    edges: [
      { from: "centrum", to: "g1" },
      { from: "centrum", to: "g2" },
      { from: "centrum", to: "g3" },
      { from: "g1", to: "morton" },
      { from: "g1", to: "despret" },
      { from: "g2", to: "latour" },
      { from: "g2", to: "hayles" },
      { from: "g3", to: "barad" },
      { from: "g3", to: "harari" },
      { from: "g3", to: "rasch" },
      { from: "haraway", to: "g1", style: "dashed" },
      { from: "haraway", to: "g2", style: "dashed" },
      { from: "haraway", to: "g3", style: "dashed" },
      { from: "rasch", to: "kant" },
    ],
  },

  // === BONUS: Verbeek - Technologische bemiddeling (bij primaire tekst) ===
  {
    id: "bonus-verbeek",
    title: "Verbeek: Technologische bemiddeling",
    kwestie: 3,
    context: ["tekst"],
    tekstId: 9,
    beschrijving: "Hoe techniek onze waarneming en ons handelen bemiddelt",
    nodes: [
      { id: "centrum", label: "Technologische\nbemiddeling", type: "central", x: 50, y: 10 },
      { id: "waarnemen", label: "Bemiddelt\nwaarneming", type: "concept", x: 25, y: 30, color: "#4A90D9" },
      { id: "handelen", label: "Bemiddelt\nhandelen", type: "concept", x: 75, y: 30, color: "#E87C3E" },
      { id: "echo", label: "Casus:\nechoscopie", type: "concept", x: 50, y: 50, color: "#7B61C4" },
      { id: "dilemma", label: "Moreel dilemma:\nwat je ziet, moet\nje beslissen", type: "concept", x: 50, y: 70, color: "#c62828" },
      { id: "deug", label: "Deugd-\nethiek", type: "concept", x: 20, y: 90, color: "#2E9E5A" },
      { id: "plicht", label: "Plicht-\nethiek", type: "concept", x: 50, y: 90, color: "#2E9E5A" },
      { id: "gevolg", label: "Gevolg-\nethiek", type: "concept", x: 80, y: 90, color: "#2E9E5A" },
    ],
    edges: [
      { from: "centrum", to: "waarnemen" },
      { from: "centrum", to: "handelen" },
      { from: "waarnemen", to: "echo" },
      { from: "handelen", to: "echo" },
      { from: "echo", to: "dilemma" },
      { from: "dilemma", to: "deug" },
      { from: "dilemma", to: "plicht" },
      { from: "dilemma", to: "gevolg" },
    ],
  },

  // === BONUS: De Mul - Van humanisme naar posthumanisme (bij primaire tekst) ===
  {
    id: "bonus-demul",
    title: "De Mul: Drie scenario's",
    kwestie: 3,
    context: ["tekst"],
    tekstId: 10,
    beschrijving: "NBIN-technologieën en drie toekomstscenario's voor de mens",
    nodes: [
      { id: "humanisme", label: "Humanisme", type: "concept", x: 50, y: 5, color: "#4A90D9" },
      { id: "nbin", label: "NBIN-\ntechnologieën", type: "central", x: 50, y: 30 },
      { id: "extra", label: "Extra-\nhumanisme", type: "concept", x: 15, y: 60, color: "#2E9E5A" },
      { id: "extraSub", label: "Zwermgeest:\nmens versmelt\nmet netwerk", type: "concept", x: 5, y: 80, color: "#2E9E5A" },
      { id: "trans", label: "Trans-\nhumanisme", type: "concept", x: 50, y: 60, color: "#E87C3E" },
      { id: "transSub", label: "Alien: mens\noverstijgt eigen\nnatuur", type: "concept", x: 50, y: 80, color: "#E87C3E" },
      { id: "post", label: "Post-\nhumanisme", type: "concept", x: 85, y: 60, color: "#7B61C4" },
      { id: "postSub", label: "Zombie: bewustzijn\nwordt overbodig", type: "concept", x: 90, y: 80, color: "#7B61C4" },
      { id: "nietzsche", label: "Nietzsche:\nherwaardering\nvan waarden", type: "concept", x: 50, y: 95, color: "#c62828" },
    ],
    edges: [
      { from: "humanisme", to: "nbin" },
      { from: "nbin", to: "extra" },
      { from: "nbin", to: "trans" },
      { from: "nbin", to: "post" },
      { from: "extra", to: "extraSub" },
      { from: "trans", to: "transSub" },
      { from: "post", to: "postSub" },
      { from: "extra", to: "nietzsche", style: "dashed" },
      { from: "trans", to: "nietzsche", style: "dashed" },
      { from: "post", to: "nietzsche", style: "dashed" },
    ],
  },

  // === BONUS: De grote boog K1→K4 (bij rode draad #7) ===
  {
    id: "bonus-groteboog",
    title: "De grote boog: K1 → K4",
    kwestie: null,
    context: ["rodedraad"],
    rodeDraadId: 7,
    beschrijving: "Het verhaal van de hele syllabus in één overzicht",
    nodes: [
      { id: "k1", label: "K1: Wat is\nde mens?", type: "kwestie", x: 15, y: 20, color: "#4A90D9" },
      { id: "k1sub", label: "Zelfkennis,\nlichaam, identiteit", type: "concept", x: 5, y: 5, color: "#4A90D9" },
      { id: "k2", label: "K2: Hoe kennen\nwe onszelf?", type: "kwestie", x: 85, y: 20, color: "#E87C3E" },
      { id: "k2sub", label: "Metaforen,\ncognitie, brein", type: "concept", x: 92, y: 5, color: "#E87C3E" },
      { id: "k3", label: "K3: Verandert\ntechniek ons?", type: "kwestie", x: 15, y: 80, color: "#2E9E5A" },
      { id: "k3sub", label: "Cyborg, bemiddeling,\nidentiteit", type: "concept", x: 5, y: 95, color: "#2E9E5A" },
      { id: "k4", label: "K4: Grenzen\nvervagen", type: "kwestie", x: 85, y: 80, color: "#7B61C4" },
      { id: "k4sub", label: "Mens/dier, levend/\nniet-levend, data", type: "concept", x: 92, y: 95, color: "#7B61C4" },
      { id: "centrum", label: "De vraag naar\nde mens", type: "central", x: 50, y: 50 },
    ],
    edges: [
      { from: "centrum", to: "k1" },
      { from: "centrum", to: "k2" },
      { from: "centrum", to: "k3" },
      { from: "centrum", to: "k4" },
      { from: "k1", to: "k1sub" },
      { from: "k2", to: "k2sub" },
      { from: "k3", to: "k3sub" },
      { from: "k4", to: "k4sub" },
      { from: "k1", to: "k2", label: "modellen" },
      { from: "k2", to: "k3", label: "techniek" },
      { from: "k3", to: "k4", label: "grenzen" },
      { from: "k1", to: "k4", style: "dashed", label: "constructie" },
    ],
  },
];
