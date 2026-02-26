export const EXAM_DATE = new Date("2026-05-13T09:00:00");
export const START_DATE = new Date("2026-03-02T00:00:00");

// Studiepaden gebaseerd op leerpsychologie:
// - Spaced practice (d=0.54 effectgrootte) → herhaling van eerdere kwesties in latere weken
// - Retrieval practice → flashcards + quiz + foutenjacht als primaire leervorm
// - Interleaving → vanaf week 3 mix van nieuw + oud materiaal
// - Tijdsbudget: 1 uur zelfstudie + 30 min les (15 min lesuur + 15 min blokuur) per week
export const STUDIEPAD_PRESETS = [
  {
    id: "spiraal",
    naam: "Spiraal — nieuwe stof + herhaling",
    beschrijving: "Elke week nieuwe stof afgewisseld met herhaling van eerdere kwesties (spaced practice). Werkt het best voor de meeste leerlingen. Per week: 1 uur zelfstudie + 15 min lesuur + 15 min blokuur.",
    icoon: "🌀",
    weken: [
      {
        week: 1, label: "K1 — Wie ben ik?", focus: ["K1"],
        beschrijving: "Descartes, Sheets-Johnstone, Plessner — eerste kennismaking met kwestie 1.",
        zelfstudie: "Denkschema K1 bekijken, Lia's verhaal H1–H4 lezen, filosofenportretten Descartes/Sheets-Johnstone/Plessner doorlezen, eerste ronde flashcards K1.",
        lesuur: "Denkschema K1 klassikaal bespreken: excentrische positionaliteit, pre-reflectief, dualisme. Vragen stellen over de begrippen.",
        blokuur: "Quiz K1 maken en fout beantwoorde vragen bespreken. Eventueel: conflictkaart Descartes vs. Sheets-Johnstone bekijken.",
      },
      {
        week: 2, label: "K1 + B1", focus: ["K1", "B1"],
        beschrijving: "De Beauvoir, Fanon + wijsgerige antropologie — verdieping en toetsing K1.",
        zelfstudie: "Filosofenportretten De Beauvoir/Fanon, Lia's verhaal H5, flashcards K1 herhalen + B1 starten, begripsanalyse 'Lichaam' en 'Bestaanservaring', primaire tekst Fanon lezen.",
        lesuur: "Primaire tekst Fanon klassikaal bespreken: lichaamsschema vs. raciaal-epidermaal schema. Link naar De Beauvoir ('situatie').",
        blokuur: "Foutenjacht K1 + rode draad K1-verbanden. Begin met conflictkaarten De Beauvoir vs. Plessner.",
      },
      {
        week: 3, label: "K2 + herhaling K1", focus: ["K2", "K1"],
        beschrijving: "Metaforen, Vroon & Draaisma, Swaab — nieuwe stof K2, herhaling K1.",
        zelfstudie: "Denkschema K2 bekijken, Lia's verhaal H6–H7, filosofenportretten Lakoff & Johnson / Vroon & Draaisma / Swaab, flashcards K2 + herhaling K1 (Leitner-box).",
        lesuur: "Oriënterende en ontologische metaforen oefenen met eigen voorbeelden. Historische contingentie: welke metaforen gebruiken wij nu?",
        blokuur: "Quiz K2 (deel 1) + K1 flashcards herhalen in mix-modus. Conflictkaart Swaab vs. Dreyfus voorbereiden.",
      },
      {
        week: 4, label: "K2 + D1", focus: ["K2", "D1", "K1"],
        beschrijving: "Dreyfus, 4E-cognitie + kennisleer — K2 afronden, K1 examenvragen oefenen.",
        zelfstudie: "Filosofenportretten Dreyfus / 4E-cognitie / Clark & Chalmers / Noë, Lia's verhaal H8, flashcards K2 + D1, primaire tekst Noë (Porsche-voorbeeld), begripsanalyse 'Cognitie'.",
        lesuur: "Embedded vs. extended mind uitleggen met concrete voorbeelden (Otto's notitieboekje). Dreyfus' drie argumenten tegen AI bespreken.",
        blokuur: "K1 examenvragen oefenen + nabespreken. Foutenjacht K2. Quiz K2 (deel 2).",
      },
      {
        week: 5, label: "K3 + herhaling K1–K2", focus: ["K3", "K1", "K2"],
        beschrijving: "Clark, Kockelkoren — nieuwe stof K3, spiraal-herhaling K1–K2.",
        zelfstudie: "Denkschema K3, Lia's verhaal H9–H10, filosofenportretten Clark / Kockelkoren, flashcards K3 + herhaling K1–K2, begripsanalyse 'Techniek'.",
        lesuur: "Natural-born cyborg en decentreren/recentreren bespreken. Eigen voorbeelden: welke techniek heb jij ingelijfd?",
        blokuur: "Conflictkaarten K3 (Clark vs. Kockelkoren), quiz K3 (deel 1), K1–K2 flashcards mix.",
      },
      {
        week: 6, label: "K3 + C1", focus: ["K3", "C1", "K2"],
        beschrijving: "Verbeek, De Mul + ethiek — K3 afronden, K2 examenvragen oefenen.",
        zelfstudie: "Filosofenportretten Verbeek / De Mul, Lia's verhaal H11, flashcards K3 + C1, primaire tekst Verbeek (echoscopie), begripsanalyse 'Moraal'. De Mul's drie scenario's bestuderen.",
        lesuur: "Verbeeks technologische bemiddeling: echoscopie als casus. Discriminerende AI als actueel voorbeeld. Ethische dimensie: is/ought gap.",
        blokuur: "K2 examenvragen oefenen + nabespreken. Foutenjacht K3. Quiz K3 (deel 2). Rode draad K2→K3.",
      },
      {
        week: 7, label: "K4 + herhaling K1–K3", focus: ["K4", "K1", "K2", "K3"],
        beschrijving: "Morton, Despret, Haraway — nieuwe stof K4, spiraal-herhaling alles tot nu toe.",
        zelfstudie: "Denkschema K4, Lia's verhaal H12–H13, filosofenportretten Morton / Despret / Haraway, flashcards K4 + herhaling K1–K3, begripsanalyse 'Grens'.",
        lesuur: "The mesh en ecologisch denken: Morton's plantenargument. Desprets kritiek op de spiegeltest. Haraway's cyborg als grensverlegger.",
        blokuur: "Conflictkaarten K4 (Morton vs. traditioneel, Haraway vs. humanisme). K3 examenvragen oefenen. Quiz K4 (deel 1).",
      },
      {
        week: 8, label: "K4 + E1", focus: ["K4", "E1", "K3"],
        beschrijving: "Latour, Hayles, Barad, Harari, Rasch + wetenschapsfilosofie — K4 afronden.",
        zelfstudie: "Filosofenportretten Latour / Hayles / Barad / Harari / Rasch, Lia's verhaal H14 + coda, flashcards K4 + E1, primaire tekst Latour (Berlijnse sleutel), begripsanalyse 'Data' en 'Assemblage'.",
        lesuur: "ANT en cognitieve assemblages: Berlijnse sleutel, drones. Dataïsme vs. het else. Intra-actie als lastig concept uitleggen.",
        blokuur: "K3 examenvragen nabespreken. Foutenjacht K4. Quiz K4 (deel 2). Rode draad K3→K4 en K1→K4.",
      },
      {
        week: 9, label: "Herhaling alles", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"],
        beschrijving: "Alle kwesties en domeinen — gericht herhalen op basis van zwakke punten.",
        zelfstudie: "Alle flashcards in herhaal-modus (Leitner), moeilijke begripsanalyses herhalen, rode draad doorlopen, alle conflictkaarten opnieuw. Examenvragen K4 oefenen.",
        lesuur: "Zwakke punten klassikaal bespreken: welke begrippen/argumenten vinden leerlingen het lastigst? Oefenen met vergelijkingsvragen.",
        blokuur: "Examensimulatie: combineer vragen uit alle kwesties onder tijdsdruk. Nabespreken.",
      },
      {
        week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"],
        beschrijving: "Laatste week — examensimulatie en gerichte reparatie.",
        zelfstudie: "Volledige examensimulatie maken (examenvragen alle kwesties). Flashcards alleen nog de kaarten in box 1–2. Laatste ronde foutenjacht.",
        lesuur: "Examensimulatie nabespreken: veel voorkomende fouten, formuleringstips, tijdmanagement.",
        blokuur: "Individuele zwakke punten aanpakken. Laatste vragen stellen. Eventueel: quiz in mix-modus als opwarmer.",
      },
    ],
  },
  {
    id: "blokken",
    naam: "Blokken — diep per kwestie",
    beschrijving: "Elke kwestie twee weken intensief uitwerken, dan herhaling. Voor leerlingen die liever één ding tegelijk grondig doen. Per week: 1 uur zelfstudie + 15 min lesuur + 15 min blokuur.",
    icoon: "🎯",
    weken: [
      {
        week: 1, label: "K1 diep — deel 1", focus: ["K1"],
        beschrijving: "Descartes, Sheets-Johnstone, Plessner — grondig kennismaken.",
        zelfstudie: "Denkschema K1 bestuderen, Lia's verhaal H1–H4, alle filosofenportretten K1 lezen, flashcards K1 eerste ronde, begripsanalyse 'Bestaanservaring' en 'Lichaam'.",
        lesuur: "Denkschema K1 klassikaal doorlopen. Dualisme vs. fenomenologie als twee antwoorden op 'wat is de mens?'.",
        blokuur: "Quiz K1, primaire tekst Sheets-Johnstone (danser-voorbeeld). Excentrische positionaliteit en drie wetten van Plessner oefenen.",
      },
      {
        week: 2, label: "K1 diep — deel 2 + B1", focus: ["K1", "B1"],
        beschrijving: "De Beauvoir, Fanon + wijsgerige antropologie — alles K1 afronden en toetsen.",
        zelfstudie: "Filosofenportretten De Beauvoir/Fanon, Lia's verhaal H5, flashcards K1+B1, primaire tekst Fanon, conflictkaarten K1 (Descartes vs. Plessner, De Beauvoir vs. Plessner), rode draad K1.",
        lesuur: "Fanon's tekst bespreken: lichaamsschema, blik van de ander. Link naar De Beauvoir. Domein B1: wat is wijsgerige antropologie?",
        blokuur: "Foutenjacht K1 + K1 examenvragen oefenen en nabespreken. Alle K1 flashcards in herhaal-modus.",
      },
      {
        week: 3, label: "K2 diep — deel 1", focus: ["K2"],
        beschrijving: "Lakoff & Johnson, Vroon & Draaisma, Swaab, Dreyfus — grondig kennismaken.",
        zelfstudie: "Denkschema K2 bestuderen, Lia's verhaal H6–H7, filosofenportretten K2 lezen (Lakoff & Johnson, Vroon & Draaisma, Swaab, Dreyfus), flashcards K2, begripsanalyse 'Cognitie'.",
        lesuur: "Metaforen-oefening: eigen oriënterende en ontologische metaforen bedenken. Swaab: 'wij zijn ons brein' — klopt dat?",
        blokuur: "Quiz K2 (deel 1). Dreyfus' drie argumenten bespreken. Conflictkaart Swaab vs. Dreyfus.",
      },
      {
        week: 4, label: "K2 diep — deel 2 + D1", focus: ["K2", "D1"],
        beschrijving: "4E-cognitie, extended mind + kennisleer — alles K2 afronden en toetsen.",
        zelfstudie: "Filosofenportretten 4E-cognitie / Clark & Chalmers / Noë, Lia's verhaal H8, flashcards K2+D1, primaire tekst Noë (Porsche-voorbeeld), conflictkaarten K2, rode draad K1→K2.",
        lesuur: "Embedded vs. extended mind met concrete voorbeelden. Enactivisme: het Porsche-experiment. Domein D1: constructivisme en theoriegeladenheid.",
        blokuur: "Foutenjacht K2 + K2 examenvragen oefenen en nabespreken. K1 flashcards kort herhalen (spaced practice).",
      },
      {
        week: 5, label: "K3 diep — deel 1", focus: ["K3"],
        beschrijving: "Clark, Kockelkoren, Verbeek — grondig kennismaken.",
        zelfstudie: "Denkschema K3, Lia's verhaal H9–H10, filosofenportretten Clark / Kockelkoren / Verbeek, flashcards K3, begripsanalyse 'Techniek', primaire tekst Verbeek (echoscopie).",
        lesuur: "Natural-born cyborg: wat maakt techniek tot 'cyborg' vs. 'interface'? Decentreren/recentreren met eigen voorbeelden (VR-bril, smartphone).",
        blokuur: "Quiz K3 (deel 1). Verbeeks echoscopie-casus bespreken. Conflictkaart Clark vs. Kockelkoren.",
      },
      {
        week: 6, label: "K3 diep — deel 2 + C1", focus: ["K3", "C1"],
        beschrijving: "De Mul + ethiek — K3 afronden en toetsen.",
        zelfstudie: "Filosofenportret De Mul, Lia's verhaal H11, flashcards K3+C1, De Mul's drie scenario's bestuderen, conflictkaarten K3, rode draad K2→K3.",
        lesuur: "De Mul's scenario's: extrahumanisme, transhumanisme, posthumanisme — welk vind je het meest realistisch? Domein C1: is/ought gap, deugdethiek vs. plichtethiek.",
        blokuur: "Foutenjacht K3 + K3 examenvragen oefenen. K1–K2 flashcards kort herhalen (spaced practice).",
      },
      {
        week: 7, label: "K4 diep — deel 1", focus: ["K4"],
        beschrijving: "Morton, Despret, Haraway, Latour — grondig kennismaken.",
        zelfstudie: "Denkschema K4, Lia's verhaal H12–H13, filosofenportretten Morton / Despret / Haraway / Latour, flashcards K4, begripsanalyse 'Grens', primaire tekst Latour (Berlijnse sleutel).",
        lesuur: "Morton: the mesh en plantenagency. Despret vs. traditioneel dieronderzoek. Haraway's cyborg als grensverlegger. Latour: Berlijnse sleutel als 'actor'.",
        blokuur: "Quiz K4 (deel 1). Conflictkaarten K4 (Morton vs. humanisme, Haraway vs. Descartes). ANT oefenen met eigen voorbeelden.",
      },
      {
        week: 8, label: "K4 diep — deel 2 + E1", focus: ["K4", "E1"],
        beschrijving: "Hayles, Barad, Harari, Rasch + wetenschapsfilosofie — K4 afronden en toetsen.",
        zelfstudie: "Filosofenportretten Hayles / Barad / Harari / Rasch, Lia's verhaal H14 + coda, flashcards K4+E1, conflictkaarten K4 (Harari vs. Rasch), rode draad K3→K4 en K1→K4.",
        lesuur: "Cognitieve assemblages en verantwoordelijkheid. Intra-actie uitleggen. Dataïsme vs. het else. Domein E1: waardevrijheid, paradigma's.",
        blokuur: "Foutenjacht K4 + K4 examenvragen oefenen. K1–K3 flashcards kort herhalen.",
      },
      {
        week: 9, label: "Herhaling alles", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"],
        beschrijving: "Alle kwesties en domeinen — gericht herhalen op basis van zwakke punten.",
        zelfstudie: "Alle flashcards in herhaal-modus (Leitner), moeilijke begripsanalyses herhalen, rode draad doorlopen, alle conflictkaarten opnieuw. Examenvragen van alle kwesties oefenen.",
        lesuur: "Zwakste punten klassikaal bespreken. Vergelijkingsvragen oefenen (bijv. vergelijk Plessner en Haraway, of Clark en Kockelkoren).",
        blokuur: "Examensimulatie onder tijdsdruk: vragen uit alle kwesties door elkaar. Nabespreken.",
      },
      {
        week: 10, label: "Examentraining", focus: ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"],
        beschrijving: "Laatste week — examensimulatie en gerichte reparatie.",
        zelfstudie: "Volledige examensimulatie maken. Flashcards alleen box 1–2. Laatste ronde foutenjacht. Rode draad als totaaloverzicht doorlezen.",
        lesuur: "Examensimulatie nabespreken: formuleringstips, tijdmanagement, veel voorkomende fouten.",
        blokuur: "Individuele zwakke punten aanpakken. Laatste vragen stellen. Quiz in mix-modus als opwarmer.",
      },
    ],
  },
];

export const ALL_FOCUS_IDS = ["K1", "K2", "K3", "K4", "B1", "C1", "D1", "E1"];

export const LEITNER_INTERVALS = [0, 1, 3, 7, 14]; // box 1-5

export const SESSION_SIZE = 999;
