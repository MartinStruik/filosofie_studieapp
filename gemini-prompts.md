# Gemini-prompts voor feedback op de filosofie-studieapp

Plak deze prompts één voor één in Gemini. Ronde 1 kan met de URL; voor ronde 2 en 3 staat de data hieronder.

---

## RONDE 1: UX/Ontwerp review

```
Ik heb een studieapp gebouwd voor VWO-leerlingen die zich voorbereiden op het Centraal Examen Filosofie 2026 (thema: de vraag naar de mens in relatie tot techniek en wetenschap). De app is een mobiel-first webapp met: flashcards (Leitner-systeem), examenvragen met modelantwoorden, primaire teksten, conflictkaarten, begripsanalyse, een doorlopend verhaal ("Lia's transformatie"), rode-draad-verbindingen, quiz, uitlegvideo's, en een studiepad met weekplanning.

Bekijk de app op: https://vwo-filosofie.netlify.app
(Inloggen met: testleerling@filosofie.app / test1234)

Geef feedback vanuit het perspectief van een 17-jarige VWO-leerling:
1. Eerste indruk: is het meteen duidelijk wat je moet doen?
2. Navigatie: is de structuur logisch? Kun je makkelijk terug, heen en weer?
3. Visueel ontwerp: is het rustig en uitnodigend, of overweldigend?
4. Studiepad: snap je na het kiezen van een pad wat er van je verwacht wordt per week?
5. Mobiele ervaring: hoe voelt het op een telefoonscherm?
6. Wat zijn de drie grootste verbeterpunten voor de gebruikservaring?
```

---

## RONDE 2: Vakinhoudelijke check

```
Ik ben filosofiedocent VWO en heb een studieapp gebouwd voor het CE Filosofie 2026 (thema: de vraag naar de mens in relatie tot techniek en wetenschap). Hieronder staan de flashcards en examenvragen. Controleer ze op vakinhoudelijke correctheid.

Let specifiek op:
1. Kloppen de definities/uitleg bij de flashcards? Zijn er fouten of onnauwkeurigheden?
2. Zijn de examenvragen en modelantwoorden realistisch qua CE-niveau en puntenverdeling?
3. Worden filosofen correct weergegeven? Klopt de toewijzing aan kwesties?
4. Mis ik belangrijke begrippen of filosofen voor dit examenprogramma?
5. Zijn er formuleringen die voor VWO-leerlingen onnodig verwarrend zijn?

FLASHCARDS:
- Mensbeeld (3e persoon): abstracte beschrijving van wat de mens is, van buitenaf
- Bestaanservaring (1e persoon): hoe je de wereld ervaart vanuit je eigen lichaam/situatie
- Fenomenologie: vertrekt vanuit geleefde ervaring, niet vanuit wetenschap
- Begripsanalyse: definieer een begrip, onderzoek vooronderstellingen, trek implicaties na
- Wezen/essentie: wat maakt iets tot wat het is?

KWESTIE 1 (Wie ben ik?):
- Dualisme (Descartes): twee gescheiden substanties, res cogitans en res extensa
- Methodische twijfel: aan alles twijfelen om tot onbetwijfelbaar fundament te komen
- Cogito ergo sum: "ik denk, dus ik ben"
- Pre-reflectief (Sheets-Johnstone): lichamelijke gewaarwording vóór bewuste reflectie
- Excentrische positionaliteit (Plessner): buiten jezelf treden, jezelf waarnemen
- Bemiddelde onmiddellijkheid (Plessner): directe ervaringen zijn altijd al bemiddeld door reflectie
- Natuurlijke kunstmatigheid (Plessner): het is de natuur van de mens om kunstmatig te zijn
- Situatie (De Beauvoir): concrete omstandigheden waarin een mens zich bevindt
- Raciaal-epidermaal schema (Fanon): schema dat door de witte blik op het zwarte lichaam wordt gelegd
- Historisch lichaamsschema (Fanon): lichaamsschema gevormd door collectieve geschiedenis

KWESTIE 2 (Hoe denk ik?):
- Oriënterende metafoor (Lakoff & Johnson): gebaseerd op ruimtelijke oriëntatie (boven=goed)
- Conceptuele metafoor: onbewust denkpatroon, het ene concept in termen van het andere
- Historische contingentie (Vroon & Draaisma): mensbeelden veranderen met de dominante techniek
- Computermetafoor: brein als informatieverwerkende computer
- Dreyfus' kritiek op AI: menselijk denken niet reduceerbaar tot symboolmanipulatie
- Extended mind (Clark & Chalmers): cognitie strekt zich uit voorbij het brein
- 4E-cognitie: Embodied, Embedded, Extended, Enactive

KWESTIE 3 (Wat doet techniek?):
- Natural-born cyborg (Clark): mens is van nature een kunstmatig wezen
- Decentreren/recentreren (Kockelkoren): techniek verstoort en herschikt de waarneming
- Technologische bemiddeling (Verbeek): techniek bemiddelt waarneming én handelen
- Extra/posthumanisme (De Mul): zwermgeest (collectief bewustzijn) vs. zombie (kunstmatig leven zonder bewustzijn)

KWESTIE 4 (Hoe leef ik samen?):
- Hyperobjecten (Morton): objecten zo groot dat ze niet direct waarneembaar zijn (klimaat)
- Response-ability (Haraway): vermogen én plicht om te antwoorden op andere wezens
- Staying with the trouble (Haraway): in het rommelige heden samen leven
- Cognitieve assemblage (Hayles): samenwerkingsverband van menselijke en niet-menselijke cognitie
- Dataïsme (Harari): data als ultieme bron van waarde en autoriteit
- Het else (Rasch): bij datareductie gaat altijd iets verloren

EXAMENVRAGEN (enkele voorbeelden):
- 2025-T1 nr 1 (3pt): Leg functionalisme uit + pas toe op hubot Anita
- 2025-T1 nr 2 (3pt): Drie functies lichaam (Dreyfus) + verschil hubot
- 2025-T1 nr 9 (4pt): Extra/posthumanisme (De Mul) + ethische vragen
- 2025-T1 nr 11 (3pt): Fanon + Plessner over de raciale blik
- 2024-T2 nr 22 (3pt): Decentreren/recentreren bij Foster en Kockelkoren
```

---

## RONDE 3: Leerpsychologie, didactiek & pedagogiek van de studiepaden

```
Ik ben filosofiedocent VWO en heb een studieapp gebouwd voor het CE Filosofie 2026. De app bevat een studiepad-systeem: leerlingen kiezen een 10-weken-schema dat hen door de stof leidt. Ik wil feedback vanuit leerpsychologie, didactiek en pedagogiek.

CONTEXT: Het examen is op 13 mei 2026. De app start op 2 maart 2026 (10 weken).

STUDIEPADEN (twee presets + optie eigen pad):

PAD 1 — "10 weken gespreid" (aanbevolen):
Week 1: K1 deel 1 — Descartes, Sheets-Johnstone
Week 2: K1 deel 2 + Antropologie — Plessner, De Beauvoir, Fanon
Week 3: K2 deel 1 — Metaforen, Vroon & Draaisma, Swaab
Week 4: K2 deel 2 + Kennistheorie — Dreyfus, 4E-cognitie
Week 5: K3 deel 1 — Clark, Kockelkoren
Week 6: K3 deel 2 + Ethiek — Verbeek, De Mul
Week 7: K4 deel 1 — Morton, Despret, Haraway
Week 8: K4 deel 2 + Wetenschapsfilosofie — Latour, Hayles, Barad, Harari, Rasch
Week 9: Herhaling — alle kwesties, moeilijke examenvragen opnieuw
Week 10: Examentraining — alles herhalen, zwakke punten

PAD 2 — "Kwestie voor kwestie":
Zelfde verdeling maar dan elke kwestie 2 weken diep, domeinen gekoppeld.

PAD 3 — Eigen pad samenstellen:
Leerling kiest per week welke kwesties/domeinen.

LEERBOUWSTENEN per week (in oplopende moeilijkheid):
1. Lia's verhaal (narratief doorlopend verhaal)
2. Filosofen (portretten)
3. Flashcards (Leitner-herhaalsysteem)
4. Begripsanalyse (definities ontleden)
5. Primaire teksten (originele fragmenten + richtvragen)
6. Conflictkaarten (tegengestelde standpunten)
7. Rode draad (verbanden tussen kwesties)
8. Quiz (multiple choice)
9. Examenvragen (met modelantwoorden)

VRAGEN:
1. Spaced repetition: het Leitner-systeem herhaalt flashcards op dag 0, 1, 3, 7, 14. Is dit schema effectief voor deze doelgroep (17-18 jaar, 10 weken)?
2. Cognitieve belasting: is de hoeveelheid stof per week realistisch? Week 8 heeft veel filosofen (Latour, Hayles, Barad, Harari, Rasch + wetenschapsfilosofie).
3. Interleaving vs. blocking: Pad 1 (gespreid) doet meer aan interleaving, Pad 2 (kwestie-voor-kwestie) aan blocking. Welke aanpak past beter bij filosofie-examenvoorbereiding?
4. Zelfregulatie: het "eigen pad" geeft autonomie maar riskeert uitstelgedrag. Hoe kan de app dit ondervangen?
5. Narratief leren: "Lia's verhaal" als rode draad — is een doorlopend verhaal effectief als kapstok voor abstracte filosofische stof?
6. Oplopende moeilijkheid: de volgorde gaat van kennismaken → begrippen → verdiepen → toetsen. Is dit didactisch verantwoord, of mis ik stappen?
7. Motivatie: wat zijn de grootste risico's voor motivatieverlies in week 5-8, en hoe kan de app dat opvangen?
8. Inclusiviteit: werkt dit pad voor zowel sterke als zwakkere VWO-leerlingen?
```
