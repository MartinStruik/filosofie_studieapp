# Foutenjager — Analyse en verbetervoorstel

Gebaseerd op: VFVO-notulen 2024+2025, Discussie VFVO 2024 (semi-woordelijk verslag), en de Analyse-examens-md. Brondetails per vraag staan in `src/data/foutenjacht-research.md`.

---

## 1. Kern van het probleem

De Foutenjager (`src/data/foutenjacht.js`, 11 items) heeft het juiste idee maar drie structurele problemen die verklaren waarom hij "niet lekker loopt" en "verwarring oproept over de stof":

### Probleem A — Bron-attributie klopt niet voor de helft van de items
Zes van de tien items (fj-07 t/m fj-12, fj-15) verwijzen naar TV2-vragen en citeren "het VFVO-forum". De drie geleverde notulen-bronnen behandelen echter **alleen TV1**. Of die forumcitaten echt op het forum staan is niet te verifiëren met de huidige bronnen. Voor leerlingen ontstaat er een vals autoriteitsgevoel.

### Probleem B — Twee feitelijke fouten in casus-koppeling
- **fj-06** is gelabeld "CE 2024 TV1 V14" — maar 2024 TV1 V14 gaat over **Adams en empirisme**, niet over Despret. Despret zit in **CE 2025 TV1 V18-V19**. Een leerling die het echte examen erbij pakt raakt in de war.
- **fj-04** beschrijft Jake als "een visueel beperkte persoon die prothese-technologie gebruikt". Jake is een **verlamde militair die een Na'vi-avatar bestuurt**. Inhoudelijk fout in de casus.

### Probleem C — De sterkst-onderbouwde TV1-valkuilen ontbreken juist
De notulen leveren glasheldere, met letterlijke citaten gedocumenteerde valkuilen waarvoor de Foutenjager juist bedoeld is. Die staan er nu niet in:

| Examen-vraag | Type valkuil | Status in app |
|--------------|--------------|---------------|
| 2024 TV1 V11 (Vroon&Draaisma — metaforen) | Klassieke vraag-CV-mismatch: vraag noemt 'contingent', CV eist 'metaforen' | **ontbreekt** |
| 2024 TV1 V16 (lichaamsschema) | Vraag noemt geen "bewuste reflectie", CV eist die wel | **ontbreekt** |
| 2024 TV1 V17 (Descartes-perspectief) | Syllabus-vs-boek: res cogitans = derde persoon (contra-intuïtief) | **ontbreekt** |
| 2024 TV1 V19 (extended vs embedded) | 4E-begrippen door elkaar | **ontbreekt** |
| 2025 TV1 V1 (functionalisme) | Minimumeisen input/output/representatie | **ontbreekt** |
| 2025 TV1 V11 (Plessner op Afrofuturisme) | Uitleg-zonder-toepassing = 0 punten | **ontbreekt** |
| 2025 TV1 V16 (Plessner-lachen) | "Bijna niemand goed", N-term-vraag | **ontbreekt** |

---

## 2. Per huidig item — kort oordeel

| ID | Bron | Klopt? | Kernkritiek | Actie |
|----|------|--------|-------------|-------|
| fj-02 | 2025 TV1 V2 (hubot drie functies) | ja, maar | Citaat "bijna alle kandidaten raken hopeloos de weg kwijt" staat zo niet in N2025 — daar staat "hier verliezen leerlingen veel punten". Mist de kernoorzaak: rijtje p.30 staat **niet in het lesboek** | Citaat corrigeren + syllabus/boek-spanning toevoegen |
| fj-04 | 2024 TV1 V6 (Morton/planten) | sterkste item, maar | Casusbeschrijving Jake feitelijk fout. CV vroeg eigenlijk om weerlegging tegenargumenten — item versimpelt | Casus corrigeren + nuance over CV-formulering |
| fj-05 | 2024 TV1 V12 (Verbeek) | half | Reduceert "oordeelsvermogen vs handelingsvermogen" tot "visie vs handelen" — leerlingen leren een onzuiver onderscheid | Terminologie aanscherpen |
| fj-06 | "2024 TV1 V14" (Despret) | **NEE** | Verkeerde vraagkoppeling. Despret hoort bij 2025 TV1 V18-V19 | Verplaatsen naar 2025 TV1 V18-V19 of labelen als "CE-stijl" |
| fj-07 | 2024 TV2 V1 (V&D) | niet aantoonbaar | Geen TV2-notulen. Item is didactisch nuttig maar "VFVO signaleert" overdreven | Vervangen door 2024 TV1 V11 (V&D) — daar zijn wel notulen |
| fj-08 | 2024 TV2 V5 (dataïsme) | niet aantoonbaar | Geen TV2-notulen | Behouden maar labelen als "didactisch" — niet als notulen-citatie |
| fj-10 | 2025 TV2 V7 (De Mul) | niet aantoonbaar | "Meest bediscussieerde vraag" niet te verifiëren | Vervangen of als "didactisch" labelen |
| fj-11 | 2025 TV2 V11 (techno-humanisme) | niet aantoonbaar | Geen TV2-notulen | Als "didactisch" labelen |
| fj-12 | 2024 TV2 V13 (connectionisme) | niet aantoonbaar | Inhoudelijk sterk, geen notulen-bron | Behouden, label als "didactisch" |
| fj-13 | Plessner CE-stijl | sterk | Past goed bij D2024 V13 + N2025 V11 | Verwijzing naar bronnen toevoegen |
| fj-14 | Fanon CE-stijl | sterk | Mist nuance "huidskleur als onveranderlijk" uit D2024 V4 | Nuance toevoegen |
| fj-15 | 2025 TV2 V16 (computermetafoor) | niet aantoonbaar | Foutcategorie "vraag_niet_gelezen" past niet — eerder "te_vaag/onvolledig" | Verplaatsen naar 2024 TV1 V18 (Swaab) of labelen |

---

## 3. Concreet verbeterplan

### Fase 1 — Fixes met grootste impact (hoog rendement, lage moeite)
1. **fj-06 corrigeren**: koppel aan 2025 TV1 V18 of V19 (Despret), niet 2024 TV1 V14.
2. **fj-04 casus repareren**: Jake is verlamde militair, geen "visueel beperkte persoon".
3. **fj-02 citaat repareren**: vervang door letterlijk N2025-citaat + voeg toe dat het rijtje syllabus p.30 niet in het lesboek staat (dat is de echte oorzaak voor het massale puntenverlies).
4. **fj-05 terminologie aanscherpen**: oordeelsvermogen / handelingsvermogen, niet "visie/handelen".

### Fase 2 — Bron-transparantie invoeren
Voeg een veld `bronType` toe per item: `"notulen"` | `"forum"` | `"didactisch"`. Items zonder notulen-grond worden duidelijk gelabeld; "VFVO-forum signaleert" verdwijnt waar dat niet aantoonbaar is. Dit lost de structurele zwakte op zonder items weg te gooien.

### Fase 3 — TV1-items toevoegen waar de notulen het sterkst zijn
Vier nieuwe items met directe notulen-grond, in volgorde van didactische waarde:

1. **2024 TV1 V11 — Vroon & Draaisma "historisch contingent" zonder "metaforen"**
   - Type: vraag_niet_gelezen / vraag-CV-mismatch
   - Citaat (D2024): *"De vraag vraagt niet expliciet naar metaforen, maar het CV wel. De Wit vindt dat het niet eerlijk is om van leerlingen te verwachten dat ze weten wat er niet expliciet gevraagd wordt."*
   - Didactische les: oefen niet alleen op de vraagtekst maar ook op het voorspellen van CV-elementen.

2. **2025 TV1 V11 — Plessner op Afrofuturisme: uitleg zonder toepassing**
   - Type: vraag_niet_gelezen
   - Citaat (N2025): *"Als leerlingen de principes goed uitleggen maar de toepassing missen, is de consensus dat er nul punten voor die toepassing wordt gegeven."*
   - Didactische les: in een T-vraag (toepassing) is uitleg-alleen waardeloos.

3. **2024 TV1 V19 — extended vs embedded cognition (VR-bril)**
   - Type: begripsverwarring (binnen 4E)
   - Citaat (D2024, Schleicher): *"Dit is eerder embedded cognition, tenzij het duidelijk wordt gemaakt dat de VR-bril een integraal onderdeel van het cognitieve proces is."*
   - Didactische les: 4E-begrippen liggen dicht bij elkaar; het criterium "integraal cognitief onderdeel" beslist.

4. **2024 TV1 V17 — Descartes derdepersoonsperspectief**
   - Type: syllabus-vs-boek-discrepantie
   - Didactische les: op het CE bepaalt de syllabus de juiste lezing, ook als die contra-intuïtief is.

### Fase 4 — Twee meta-items toevoegen
Geen specifieke vraag, maar terugkerende patronen die in de notulen prominent zijn:

5. **Meta-item "Syllabus-vs-boek"** — een spoof-antwoord dat het lesboek-rijtje gebruikt waar de syllabus een ander rijtje vereist. Klassiek voorbeeld: 2025 TV1 V2.

6. **Meta-item "Onmogelijke vraag — doorlopen"** — leerlingen leren dat sommige vragen objectief niet-haalbaar zijn (V2, V16, V20 in 2025) en dat de N-term dat opvangt. Strategische les: doorlopen ipv vastbijten.

---

## 4. Optionele scope-uitbreiding

Het huidige model van Foutenjager is sterk: één spoof-antwoord, vier opties, één correct. Twee uitbreidingen om te overwegen:

**Drilling per fouttype**: na 2-3 items van hetzelfde fouttype een mini-debrief ("je hebt nu 3× 'vraag_niet_gelezen' geoefend — let op dit signaal: de vraag bevat de woorden 'met' of 'gebruik daarbij'"). Dit benut de zes fouttypes meer dan de huidige los-staande items doen.

**Filter op kwestie/vraagtype**: leerlingen die specifiek met Kwestie 4 worstelen kunnen alleen daaraan oefenen. De data heeft deze metadata al; alleen de UI ontbreekt.

---

## 5. Beslispunten voor de gebruiker

Voordat ik aan implementatie begin, drie keuzes:

1. **Scope Fase 1 + Fase 3** uitvoeren (4 fixes + 4 nieuwe items + 2 meta-items = ±10 items toevoegen/wijzigen), of alleen Fase 1 (de 4 reparaties)?
2. **Bron-attributie veld** toevoegen aan alle items (Fase 2)? Vereist UI-aanpassing in `FoutenjachtView.jsx` om het label te tonen.
3. **TV2-items behouden of verwijderen?** Ze missen notulen-grond, maar zijn didactisch niet slecht. Houden + labelen als "didactisch" voelt het minst destructief.
