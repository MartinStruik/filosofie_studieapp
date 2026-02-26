# Audit-rapport: Filosofie-examen studie-app vs. syllabus-inventarisatie

**Datum:** 24 februari 2026
**Methode:** Systematische vergelijking van de inventarisatie (argumenten, begrippen, examvereisten) met alle databestanden in de app.

---

## 1. ONTBREKENDE INHOUD

### 1.1 filosofen.js — Ontbrekende argumenten en begrippen

| Filosoof | Wat ontbreekt | Prioriteit |
|----------|---------------|------------|
| **Descartes** | Ethische implicatie van het dualisme: dieren hebben alleen res extensa (geen geest), wat legitimeert dat ze als machines/dingen worden behandeld. Dit is examenstof (ET 5) en relevant voor K4 (grensvervaging mens-dier). | HOOG |
| **Plessner** | `begrippen`-array mist **"medewereld"** en **"lachen en wenen"**. Beiden staan wél in flashcards.js, maar ontbreken in het filosofen-overzicht zelf. | MIDDEL |
| **Plessner** | `kern` noemt niet expliciet dat de mens **"van nature onbepaald"** is — dit is een kernformulering in de syllabus. | MIDDEL |
| **De Beauvoir** | `begrippen`-array mist **"medewereld"** (Plessners begrip dat De Beauvoir's analyse vooronderstelt — ET 8 noemt het expliciet). | MIDDEL |
| **Swaab** | De drie sub-argumenten uit de inventarisatie (1: geest = hersenactiviteit, 2: brein verwerkt informatie als computer, 3: AI kan denken simuleren via product-/processimulatie) staan niet afzonderlijk in `kern`. Nu is het één samenvatting. | LAAG |
| **Clark (K3)** | `begrippen`-array mist **"interface"** als apart begrip (het onderscheid interface vs. cyborg is examenstof ET 14). Het staat wél in flashcards.js. | LAAG |

### 1.2 flashcards.js — Ontbrekende begrippen

| Begrip | Kwestie | Toelichting |
|--------|---------|-------------|
| **Plantenneurobiologie** | K4 | Wordt in ET 19 expliciet genoemd. Ontbreekt als flashcard. Definitie: "De discipline die cognitie bij planten onderzoekt; planten bezitten zintuigen en communiceren via chemische en elektrische signalen." |
| **Homo absconditus** (Plessner) | K1 | Komt voor in conflictMaps.js (conflict 5) maar ontbreekt als flashcard. Betekenis: "De verborgen mens — door rollen en maskers blijft wie de mens 'echt' is altijd verhuld." |
| **Speculatieve antropologie** (De Mul) | K3 | Staat wél in flashcards (regel 83) — geverifieerd ✓ |
| **Niet-bewuste cognitie vs. onbewuste** (Hayles) | K4 | Staat wél als quiz-vraag, maar er is geen aparte flashcard die het onderscheid expliciet maakt. De flashcard "Unthought" raakt het wel. | LAAG |
| **Essentie vs. existentie** | ET 4 | De inventarisatie noemt dit als apart kernbegrip ("existentie gaat vooraf aan essentie"). Er is wél een flashcard over existentialisme, maar niet specifiek over het essentie-existentie onderscheid als zodanig. | MIDDEL |

### 1.3 quizQuestions.js — Ontbrekende onderwerpen

De quiz heeft 86 vragen en dekt de stof breed. Maar de volgende onderwerpen worden niet getoetst:

| Ontbrekend onderwerp | Kwestie | Suggestie |
|---------------------|---------|-----------|
| **Descartes' visie op dieren** (als machines) | K1/K4 | Vraag: "Waarom zouden dieren volgens Descartes geen morele status hebben?" |
| **Plantenneurobiologie / Morton's argument over planten** | K4 | Vraag naar het verschil tussen wetenschappelijk en filosofisch argument (cf. CE 2024 TV1 vraag 6 — de beruchte plantenvraag) |
| **Haraway's "response-ability"** als apart concept | K4 | Vraag over het verschil tussen verantwoordelijkheid en response-ability |
| **Plessner's positionaliteit-trits** (plant-dier-mens) als vergelijking | K1 | Er IS een vraag over centrisch/excentrisch, maar niet specifiek over de plant als "open" positionaliteit |
| **Noë's enactivisme** als aparte vraag | K2 | Er IS een goede vraag (regel 13), maar slechts één over dit onderwerp |

### 1.4 begripsanalyse.js — Ontbrekende perspectieven

Het begrip **"Lichaam"** mist het perspectief van **De Beauvoir**: het lichaam als *situatie* (niet als lot). De inventarisatie benadrukt dit als essentieel. De Beauvoir staat wél bij "Het wezen van de mens" maar niet bij "Lichaam".

### 1.5 Afsluiting (ET 22 van de inventarisatie)

De inventarisatie noemt als afsluitende examenstof: **Haraway — "Staying with the trouble"** met nadruk op:
- **Response-ability**: de plicht om antwoord te geven op andere wezens
- **Verbinding met Plessners utopische standplaats**: de vraag naar de mens blijft fundamenteel onbepaald

Dit staat wél in flashcards.js en filosofen.js, maar er is geen aparte **rode-draad-verbinding** tussen Haraway's "staying with the trouble" en Plessners "utopische standplaats". Dit zou een krachtige examenstrategie zijn.

---

## 2. ONJUISTHEDEN / ONNAUWKEURIGHEDEN

### 2.1 Feitelijke onjuistheden

**Geen ernstige feitelijke fouten gevonden.** De inhoud van de app is overwegend correct en consistent met de syllabus.

### 2.2 Onnauwkeurigheden / verbeterpunten

| Bestand | Locatie | Probleem | Suggestie |
|---------|---------|----------|-----------|
| **filosofen.js** | Dreyfus, `begrippen` | Begrip "drie problemen" is vaag. De syllabus noemt specifiek: contextprobleem, relevantieprobleem, lichaamsprobleem. | Vervang door `["contextprobleem", "relevantieprobleem", "lichaamsprobleem", "weten-hoe vs. weten-dat"]` |
| **filosofen.js** | Fanon, `et` | `"ET 9"` — correct, maar de inventarisatie koppelt Fanon aan ET 8 samen met De Beauvoir. De app scheidt ze correct (ET 8 voor De Beauvoir, ET 9 voor Fanon) conform de syllabus. | Geen actie nodig — app is correct |
| **flashcards.js** | "Drieledige functie van het lichaam (Dreyfus)" | De drie functies worden iets anders omschreven dan in de inventarisatie. App: (1) behoeften/motivatie, (2) vaardigheden, (3) sociale interactie. Inventarisatie: (1) verwachtingspatroon, (2) aandacht richten figuur/achtergrond, (3) ervaringskennis niet in if/then regels. | Beide framingen zijn verdedigbaar. De app volgt de gebruikelijke driedeling uit het lesboek. Eventueel toevoegen in flashcard-definitie: "ook beschreven als: (1) verwachtingen, (2) relevantie-selectie, (3) belichaamde know-how." |
| **FILOSOOF_EXAMINFO** | Dreyfus | `argumenten[2]` zegt "Het emotioneprobleem" — typfout, moet zijn "Het emotieprobleem". | Fix typfout |
| **FILOSOOF_EXAMINFO** | Verbeek | `kernbegrippen` noemt "Morele scripts" — dit is een Latour-term (pre-inscriptie). Verbeeks eigen term is "technologische bemiddeling" + "ontwerpen van moraal" + "vrijheid als je verhouden". | Vervang "Morele scripts" door "Ontwerpen van moraal" |

---

## 3. STERKE PUNTEN VAN DE APP

De audit toont dat de app inhoudelijk zeer sterk is:

- **flashcards.js** bevat 158 begrippen en dekt alle kwesties + domeinen B1, C1, D1, E1 grondig
- **quizQuestions.js** heeft 86 vragen met uitgebreide `explanation`-velden inclusief instinker-analyse
- **begripsanalyse.js** behandelt de drie kernbegrippen uit ET 2 (Lichaam, Techniek, Het wezen van de mens) met elk 5-6 filosofische perspectieven
- **conflictMaps.js** bevat 8 debatten die de examenstof uitstekend structureren
- **rodeDraad.js** verbindt alle kwesties in 7 rode draden + de "grote boog" K1→K4
- **foutenjacht.js** is gebaseerd op echte CE-examenbesprekingen en traint de zes meest voorkomende fouttypes
- **FILOSOOF_EXAMINFO** in mindmaps.js bevat voor alle 17+ filosofen een examgericht profiel met argumenten, voorbeelden en vergelijkingen

---

## 4. AANBEVOLEN ACTIES (prioriteit)

### HOOG
1. **Descartes' dieren-argument** toevoegen aan filosofen.js `kern` en als quiz-vraag
2. **Plantenneurobiologie** toevoegen als flashcard
3. **Typfout** "emotioneprobleem" → "emotieprobleem" fixen in FILOSOOF_EXAMINFO
4. **Verbeek's "Morele scripts"** → "Ontwerpen van moraal" in FILOSOOF_EXAMINFO

### MIDDEL
5. **Medewereld** toevoegen aan Plessner's `begrippen`-array in filosofen.js
6. **Lachen en wenen** toevoegen aan Plessner's `begrippen`-array
7. **Homo absconditus** toevoegen als flashcard
8. **Essentie vs. existentie** toevoegen als flashcard (ET 4)
9. **De Beauvoir** toevoegen aan begripsanalyse "Lichaam" (lichaam als situatie)
10. **Rode draad** toevoegen: Plessner (utopische standplaats) → Haraway (staying with the trouble)

### LAAG
11. Dreyfus' `begrippen` in filosofen.js verfijnen
12. Extra quiz-vragen over plantenneurobiologie en Haraway's response-ability
13. Swaab's drie sub-argumenten explicieter maken

---

## 5. SAMENVATTING

De app bevat **geen ernstige feitelijke fouten**. De inhoud is overwegend correct en goed gestructureerd. De belangrijkste lacunes zijn:

- Descartes' visie op dieren (ethische implicatie van het dualisme) ontbreekt
- Een paar begrippen (plantenneurobiologie, homo absconditus, essentie vs. existentie) missen als flashcard
- Enkele kleine onnauwkeurigheden in FILOSOOF_EXAMINFO (typfout, verkeerde term bij Verbeek)
- De begripsanalyse "Lichaam" mist De Beauvoir
- Een rode draad Plessner→Haraway (onbepaaldheid→staying with the trouble) zou de app verrijken

Totaal: **~13 aanpassingen** waarvan 4 hoge prioriteit, 6 middel, 3 laag.
