# Overdracht aan Claude - examenweek Filosofie VWO 2026

Context: de app ondersteunt leerlingen in de laatste week voor het centraal examen Filosofie VWO op woensdag 13 mei 2026. De syllabus is de officiele bron van waarheid. Lia's transformatie is het lesboek/lesanker: nuttig om stof terug te vinden, maar ondergeschikt aan de syllabus.

## Hoogste prioriteit

1. Corrigeer de K4-eindtermen naar de officiele syllabus:
   - ET 18: overzicht Haraway, Morton, Despret, Latour, Hayles, Barad, Harari, Rasch.
   - ET 19: Morton + Despret, grens mens/dier.
   - ET 20: Latour + Hayles, grens levend/niet-levend.
   - ET 21: Barad + Harari + Rasch, grens fysiek/niet-fysiek.
   - ET 22: afsluiting, blijvende belang van de filosofische vraag naar de mens.
   - Verwijder ET 23 als specifieke syllabus-eindterm.

2. Voeg ET-koppelingen toe aan examenvragen.
   - `ExamQuestions.jsx` toont nu `eq.et`, maar `src/data/examQuestions.js` bevat geen `et`-veld.
   - Ideale chip: `ET 19` naast de Lia-chip, zodat leerlingen vraag -> syllabus -> Lia zien.

3. Deploy de actuele lokale versie naar Netlify.
   - De publieke versie lijkt achter te lopen op lokale verbeteringen in Foutenjacht.

## Examenanalyse vertalen naar appgedrag

De analyse van 2023-2025 zegt: toepassing en reproductie+toepassing domineren; perspectiefdiscipline en CV-matching zijn doorslaggevend. Maak dat zichtbaar:

- Bij examenvragen: toon vraagtype (`T`, `R+T`, `Arg`, `V`) met korte leerlingtaal.
- Bij modelantwoord: help leerlingen score-elementen tellen. Een punt = een afzonderlijk antwoordelement.
- Bij Foutenjacht: label bronstatus transparant (`notulen`, `forum`, `didactisch`) als dat nog niet volledig is.
- Laatste week: geen brede nieuwe leerpaden meer centraal zetten; stuur op retrieval, examenvragen, fouttypes en rode draad.

## Startscherm

Codex heeft alvast een kleine Home-aanpassing gemaakt:

- Laatste-weekblok verschijnt als `countdown.days <= 7`.
- Toon: "Rustig scherp worden".
- Pedagogische boodschap: niet alles opnieuw leren; nu vooral ophalen: kernbegrip, casus, scorepunt.
- Acties: flashcards, examenvragen, Foutenjacht.

Ontwerpintentie: psychologisch kalm, niet paniekerig. De leerling moet voelen: ik kan vandaag een kleine, juiste stap zetten.

## Niet vergeten

- De docentdashboardtijd telt nu alleen `appMinutes`; handmatige studietijd wordt niet meegenomen in docentoverzicht.
- Lokale progress staat onder een algemene localStorage-key (`filosofie-progress`), niet per user. Op gedeelde apparaten kan voortgang mengen.
- Quiz is inhoudelijk nuttig, maar dekt sommige hoog-risico laatste-weekbegrippen nog niet als actieve quizvraag: response-ability, staying with the trouble, plantenneurobiologie, techno-humanisme, dynamische apparaten, Descartes over dieren, Dreyfus' drie functies.
