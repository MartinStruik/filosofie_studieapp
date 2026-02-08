import { useState, useEffect, useCallback } from "react";

// ============================================================
// FILOSOFIE STUDIEAPP — VWO 2026
// Examenvragen (v4.2) + Flashcards (v4.4) gecombineerd
// ============================================================

const KWESTIES = [
  { id: 1, title: "Wat is de mens?", subtitle: "Filosofische antwoorden op de vraag naar de mens", color: "#2D5A8E", accent: "#4A90D9", chapters: "H1–H4 (Lia 1)", eindtermen: "ET 5–9" },
  { id: 2, title: "Hoe veranderen techniek en wetenschap ons mensbeeld?", subtitle: "Metaforen, hersenwetenschappen en 4E-cognitie", color: "#8E4A2D", accent: "#D97A4A", chapters: "H5–H7 (Lia 1)", eindtermen: "ET 10–12" },
  { id: 3, title: "Verandert het wezen van de mens door techniek?", subtitle: "Natural-born cyborg, zintuigen, moraal en identiteit", color: "#2D8E5A", accent: "#4AD97A", chapters: "H8–H11 (Lia 2)", eindtermen: "ET 13–17" },
  { id: 4, title: "Grensvervagingen", subtitle: "Mens/dier, levend/niet-levend, fysiek/niet-fysiek", color: "#7A2D8E", accent: "#B04AD9", chapters: "H12–H14 (Lia 2)", eindtermen: "ET 18–23" },
];

const DOMEINEN = [
  { id: "B1", title: "Wijsgerige antropologie", color: "#5A7A2D" },
  { id: "C1", title: "Ethiek", color: "#2D6E8E" },
  { id: "D1", title: "Kennisleer", color: "#8E6B2D" },
  { id: "E1", title: "Wetenschapsfilosofie", color: "#6B2D6E" },
];

const FILOSOFEN = [
  { name: "Descartes", kwestie: 1, kern: "Dualisme: denkend bewustzijn (res cogitans) + mechanisch lichaam (res extensa). Methodische twijfel: ‘cogito ergo sum’. Het lichaam als machine.", begrippen: ["dualisme", "res cogitans", "res extensa", "methodische twijfel", "cogito"], et: "ET 5" },
  { name: "Sheets-Johnstone", kwestie: 1, kern: "Fenomenologie van dans: pre-reflectieve lichamelijke gewaarwording. We zijn een reflecterend, bewegend lichaam. Lichaamsschema gaat vooraf aan bewuste reflectie.", begrippen: ["pre-reflectief", "lichaamsschema", "fenomenologie", "dans"], et: "ET 6" },
  { name: "Plessner", kwestie: 1, kern: "Excentrische positionaliteit: de mens kan buiten zichzelf treden. Wetten: bemiddelde onmiddellijkheid, natuurlijke kunstmatigheid, utopische standplaats. Lachen en wenen als grenservaringen.", begrippen: ["excentrische positionaliteit", "bemiddelde onmiddellijkheid", "natuurlijke kunstmatigheid", "utopische standplaats"], et: "ET 7" },
  { name: "De Beauvoir", kwestie: 1, kern: "‘Men wordt niet als vrouw geboren, men wordt het.’ Geleefde ervaring en de blik van de ander. Lichaam als situatie, niet als lot.", begrippen: ["situatie", "geleefde ervaring", "de ander", "vrouwwording"], et: "ET 8" },
  { name: "Fanon", kwestie: 1, kern: "De ‘blik van de witte ander’ objectiveert. Ras als opgedrongen lichamelijke ervaring. Historisch lichaamsschema vs. raciaal-epidermaal schema.", begrippen: ["historisch lichaamsschema", "raciaal-epidermaal schema", "objectivering", "vervreemding"], et: "ET 9" },
  { name: "Lakoff & Johnson", kwestie: 2, kern: "Belichaamde metaforen structureren ons denken. Oriënterende metaforen (boven=goed, onder=slecht) zijn geworteld in lichamelijke ervaring. Ontologische metaforen behandelen abstracte dingen als concrete objecten.", begrippen: ["oriënterende metafoor", "ontologische metafoor", "belichaamde cognitie", "conceptuele metafoor"], et: "ET 10" },
  { name: "Vroon & Draaisma", kwestie: 2, kern: "Mensbeelden zijn historisch contingent: de dominante metafoor voor de geest verandert mee met de techniek van de tijd. Nu: de computermetafoor.", begrippen: ["historische contingentie", "computermetafoor", "theoriegeladenheid"], et: "ET 10" },
  { name: "Swaab / computationalisme", kwestie: 2, kern: "‘Wij zijn ons brein.’ Hersenen als informatieverwerkende machine. Functionalistisch mensbeeld. Brein-als-computer metafoor.", begrippen: ["computationalisme", "functionalisme", "brein-als-computer", "neurowetenschappen"], et: "ET 11" },
  { name: "Dreyfus", kwestie: 2, kern: "Kritiek op computationalisme: menselijk denken is niet reduceerbaar tot symboolmanipulatie. Het lichaam, de context en de emoties zijn onmisbaar voor intelligent gedrag.", begrippen: ["kritiek op AI", "belichaamd denken", "drie problemen", "symboolmanipulatie"], et: "ET 11" },
  { name: "4E-cognitie", kwestie: 2, kern: "Embodied, Embedded, Extended, Enactive. Cognitie is niet beperkt tot het brein maar verspreid over lichaam en omgeving. Clark & Chalmers: extended mind (Otto & Inga).", begrippen: ["embodied", "embedded", "extended", "enactive", "extended mind", "offloading"], et: "ET 12" },
  { name: "Clark", kwestie: 3, kern: "Natural-born cyborgs: mens is van nature technologisch. Brein gebruikt omgeving, technologie wordt transparant ingelijfd. Cyborg-paradox. Dynamische apparaten.", begrippen: ["natural-born cyborg", "cyborg-paradox", "dynamische apparaten", "cognitieve symbiose", "interface"], et: "ET 14" },
  { name: "Kockelkoren", kwestie: 3, kern: "Techniek verandert zintuiglijke ervaring. Decentreren: nieuwe techniek verstoort oude waarneming. Recentreren: zintuigen lijven techniek in.", begrippen: ["decentreren", "recentreren", "inlijving", "technische bemiddeling"], et: "ET 15" },
  { name: "Verbeek", kwestie: 3, kern: "Technologische bemiddeling: techniek is nooit moreel neutraal. Echoscopie verandert morele situatie. Ontwerpen is moraal ontwerpen. Vrijheid = je bewust verhouden tot technologische invloeden.", begrippen: ["technologische bemiddeling", "moreel handelingsvermogen", "ontwerpen van moraal", "vrijheid als je verhouden"], et: "ET 16" },
  { name: "De Mul", kwestie: 3, kern: "NBIN-technologieën transformeren menselijke identiteit. Drie scenario’s: extrahumanisme (zwermgeest), transhumanisme (alien), posthumanisme (zombie). Nietzsche: herwaardering van waarden.", begrippen: ["NBIN", "extrahumanisme", "transhumanisme", "posthumanisme", "humanisme", "herwaardering van waarden"], et: "ET 17" },
  { name: "Morton", kwestie: 4, kern: "Ecologisch denken: alles is verbonden in ‘the mesh’. Hyperobjecten. Mens/dier-grens vervaagt. Ecologische crisis dwingt tot herdenken.", begrippen: ["the mesh", "hyperobject", "ecologisch denken", "interconnectedness"], et: "ET 18–19" },
  { name: "Despret", kwestie: 4, kern: "Dieren hebben eigen perspectief en agency. ‘What would animals say?’ Wetenschappers moeten goede vragen stellen. Staying with the trouble (via Haraway).", begrippen: ["dierlijke agency", "goede vragen stellen", "antropomorfisme"], et: "ET 18–20" },
  { name: "Haraway", kwestie: 4, kern: "Cyborg Manifesto: grenzen mens/dier, mens/machine vervagen. Staying with the trouble: verantwoordelijkheid nemen. Symbiopoiesis. Response-ability.", begrippen: ["cyborg manifesto", "staying with the trouble", "symbiopoiesis", "response-ability", "companion species"], et: "ET 18" },
  { name: "Latour", kwestie: 4, kern: "Actor-Network Theory: niet alleen mensen maar ook dingen (actanten) handelen. Berlijnse sleutel als voorbeeld. Symmetrisch denken over mens en niet-mens.", begrippen: ["actant", "actor-network theory", "Berlijnse sleutel", "symmetrie", "non-human agency"], et: "ET 18, 21" },
  { name: "Hayles", kwestie: 4, kern: "Cognitieve non-mens: technische systemen ‘denken’ zonder bewustzijn. Unthought: cognitie voorbij het menselijke. Cognitieve assemblages.", begrippen: ["unthought", "cognitieve non-mens", "technische cognitie", "cognitieve assemblage"], et: "ET 18, 21" },
  { name: "Barad", kwestie: 4, kern: "Intra-actie: dingen bestaan niet voorafgaand aan hun relaties. Materie is actief. Agentieel realisme. Grens fysiek/niet-fysiek vervaagt.", begrippen: ["intra-actie", "agentieel realisme", "materie als actief"], et: "ET 18, 22" },
  { name: "Harari", kwestie: 4, kern: "Dataïsme: data als ultieme bron van waarde en autoriteit. Algoritmes begrijpen ons beter dan wijzelf. Homo Deus.", begrippen: ["dataïsme", "Homo Deus", "algoritme", "dataficatie"], et: "ET 18, 23" },
  { name: "Rasch", kwestie: 4, kern: "‘Het else’: datareducties missen altijd iets. Kloof tussen data en werkelijkheid. Ruimte voor interpretatie en vrijheid.", begrippen: ["het else", "datareductie", "kloof data-werkelijkheid"], et: "ET 18, 23" },
];

// ============================================================
// FLASHCARDS (v4.4) — 70 kaarten, alle eindtermen gedekt
// ============================================================

const FLASHCARDS = [
  // ========== ALGEMENE EINDTERMEN (ET 1–4) ==========
  { term: "Mensbeeld (3e persoon)", def: "Een abstracte, theoretische beschrijving van wat de mens is — van buitenaf, als object van studie. Bijvoorbeeld: ‘de mens is een rationeel wezen’ of ‘de mens is een machine’.", kwestie: 0 },
  { term: "Bestaanservaring (1e persoon)", def: "Hoe je de wereld concreet ervaart vanuit je eigen lichaam en situatie. Niet beschrijven wát de mens is, maar hoe het vóélt om mens te zijn.", kwestie: 0 },
  { term: "Fenomenologie", def: "Filosofische benadering die vertrekt vanuit de geleefde ervaring (1e persoon). Niet: wat zegt de wetenschap over de mens, maar: hoe ervaren we de wereld?", kwestie: 0 },
  { term: "Begripsanalyse", def: "Filosofische methode: neem een begrip (bv. ‘techniek’), definieer het, onderzoek de vooronderstellingen en trek de implicaties na. Centraal in ET 2.", kwestie: 0 },
  { term: "Wezen / essentie", def: "Wat maakt iets tot wat het is? De kern van de examenvraag: heeft de mens een vaststaand wezen, of verandert dat door techniek en wetenschap?", kwestie: 0 },

  // ========== KWESTIE 1: WAT IS DE MENS? (ET 5–9) ==========
  { term: "Dualisme (Descartes)", def: "De opvatting dat de mens bestaat uit twee gescheiden substanties: een denkend bewustzijn (res cogitans) en een uitgebreid/mechanisch lichaam (res extensa).", kwestie: 1 },
  { term: "Methodische twijfel", def: "Descartes’ methode om aan alles te twijfelen wat maar enigszins betwijfeld kan worden, om zo tot een onbetwijfelbaar fundament te komen: ‘cogito ergo sum’.", kwestie: 1 },
  { term: "Cogito ergo sum", def: "‘Ik denk, dus ik ben.’ Het onbetwijfelbare fundament van Descartes: ook als je aan alles twijfelt, kun je niet twijfelen dát je twijfelt (= denkt).", kwestie: 1 },
  { term: "Introspectie (Descartes)", def: "De methode om door naar binnen te keren de eigen geest te onderzoeken. Descartes vertrouwt hierop: het denken is transparant voor zichzelf.", kwestie: 1 },
  { term: "Interactieprobleem", def: "Het kernprobleem van Descartes’ dualisme: als geest en lichaam twee totaal verschillende substanties zijn, hoe kunnen ze dan op elkaar inwerken? (Pijnappelklier als ‘oplossing’.)", kwestie: 1 },
  { term: "Mechanistisch wereldbeeld", def: "Descartes’ opvatting dat het lichaam en de natuur werken als een machine — volgens mechanische wetmatigheden. Alleen de geest (res cogitans) valt hierbuiten.", kwestie: 1 },
  { term: "Pre-reflectief (Sheets-Johnstone)", def: "De lichamelijke gewaarwording die voorafgaat aan bewuste reflectie. Je voelt je lichaam bewegen in de ruimte vóórdat je erover nadenkt.", kwestie: 1 },
  { term: "Lichaamsschema", def: "Het onbewuste ‘kaart’ van je lichaam dat bepaalt hoe je beweegt en de ruimte ervaart. Flexibel en aanpasbaar (zie ook Clark: incorporatie van technologie).", kwestie: 1 },
  { term: "Intentionaliteit", def: "Bewustzijn is altijd bewustzijn ‘van’ iets — het is gericht op de wereld. Fenomenologisch kernbegrip (Husserl/Merleau-Ponty) dat Sheets-Johnstone toepast op het lichaam.", kwestie: 1 },
  { term: "Bewustzijns-lichaam (Sheets-Johnstone)", def: "Wij zijn geen geest ín een lichaam, maar een reflecterend, bewegend lichaam. Het bewustzijn is niet gescheiden van het lichaam maar is er altijd al mee verweven.", kwestie: 1 },
  { term: "Excentrische positionaliteit (Plessner)", def: "Het unieke menselijke vermogen om ‘buiten zichzelf’ te treden: je kunt jezelf waarnemen alsof je een ander bent, terwijl je tegelijk het centrum van je eigen ervaring blijft.", kwestie: 1 },
  { term: "Bemiddelde onmiddellijkheid (Plessner)", def: "Onze directe ervaringen zijn altijd al bemiddeld door ons vermogen tot reflectie. We kunnen niet ‘puur’ ervaren zonder er tegelijk afstand van te nemen.", kwestie: 1 },
  { term: "Natuurlijke kunstmatigheid (Plessner)", def: "Het is de natuur van de mens om ‘kunstmatig’ te zijn: we moeten onszelf en onze wereld vormgeven door cultuur, techniek en expressie.", kwestie: 1 },
  { term: "Utopische standplaats (Plessner)", def: "De mens ervaart een fundamentele ‘thuisloosheid’: we zoeken altijd naar een plek die we nooit volledig bereiken. We zijn nooit helemaal thuis in de wereld.", kwestie: 1 },
  { term: "Lachen en wenen (Plessner)", def: "Grenservaringen waarin de excentrische positionaliteit doorbreekt: het lichaam ‘neemt het over’ en de mens verliest tijdelijk de greep op zichzelf. Bewijs dat we geen pure geesten zijn.", kwestie: 1 },
  { term: "Situatie (De Beauvoir)", def: "De concrete omstandigheden (lichamelijk, sociaal, historisch) waarin een mens zich bevindt. ‘Men wordt niet als vrouw geboren, men wordt het’ — gender is een situatie, niet een lot.", kwestie: 1 },
  { term: "Geleefde ervaring (De Beauvoir)", def: "Het concrete, doorleefde lichaam in een specifieke situatie. Niet het abstracte ‘vrouw-zijn’ maar hoe het voelt om als vrouw bejegend te worden.", kwestie: 1 },
  { term: "Medewereld (Plessner)", def: "De mens bestaat altijd in relatie tot anderen: de ander is constitutief voor wie je bent. Vergelijk De Beauvoir (blik) en Fanon (objectiverende blik).", kwestie: 1 },
  { term: "Historisch lichaamsschema (Fanon)", def: "Het lichaamsschema dat niet alleen individueel is, maar gevormd door collectieve geschiedenis. Voor mensen van kleur: de raciale ervaring wordt in het lichaam gegrift.", kwestie: 1 },
  { term: "Raciaal-epidermaal schema (Fanon)", def: "Het schema dat door de blik van de witte ander op het zwarte lichaam wordt gelegd: huidskleur wordt een ‘label’ dat de bestaanservaring bepaalt en beperkt.", kwestie: 1 },
  { term: "Existentialisme", def: "Stroming die stelt dat existentie voorafgaat aan essentie: de mens hééft geen vaststaand wezen maar máákt zichzelf. Achtergrond van De Beauvoir en Fanon.", kwestie: 1 },

  // ========== KWESTIE 2: MENSBEELD EN TECHNIEK (ET 10–12) ==========
  { term: "Oriënterende metafoor (Lakoff & Johnson)", def: "Metaforen gebaseerd op ruimtelijke oriëntatie van het lichaam: BOVEN = goed/meer, ONDER = slecht/minder. Bv. ‘ik voel me down’ of ‘de koers stijgt’.", kwestie: 2 },
  { term: "Ontologische metafoor (Lakoff & Johnson)", def: "Metaforen die abstracte dingen behandelen alsof het concrete objecten of stoffen zijn. Bv. ‘inflatie vreet ons spaargeld op’ — inflatie wordt een levend wezen.", kwestie: 2 },
  { term: "Conceptuele metafoor", def: "Een onbewust denkpatroon waarbij we het ene concept begrijpen in termen van het andere. Bv. ‘het brein is een computer’ structureert hoe we over denken denken.", kwestie: 2 },
  { term: "Historische contingentie (Vroon & Draaisma)", def: "Mensbeelden zijn niet tijdloos maar historisch bepaald: ze veranderen mee met de dominante techniek van een tijdperk. Ze hadden ook anders kunnen zijn.", kwestie: 2 },
  { term: "Computermetafoor (Vroon & Draaisma)", def: "De huidige dominante metafoor voor de geest: het brein als informatieverwerkende computer. Eerder waren het klokwerk, telegraaf, stoommachine.", kwestie: 2 },
  { term: "Theoriegeladenheid", def: "Metaforen en theorieën bepalen mede wat we waarnemen. Als je het brein als computer ziet, zoek je naar ‘input’, ‘output’ en ‘verwerking’ — en mis je wat niet in dat kader past.", kwestie: 2 },
  { term: "Computationalisme / functionalisme", def: "De opvatting dat het brein werkt als een computer: mentale toestanden zijn functionele toestanden die in principe door machines gerepliceerd kunnen worden.", kwestie: 2 },
  { term: "Symboolmanipulatie", def: "Kern van het klassieke functionalisme: denken = symbolen verwerken volgens formele regels. Het brein is een symbolenprocessor, net als een computer.", kwestie: 2 },
  { term: "Dreyfus’ kritiek op AI", def: "Menselijk denken is niet reduceerbaar tot symboolmanipulatie. Drie problemen: (1) het contextprobleem, (2) het relevantieproblem, (3) het lichaamsprobleem. Belichaamd denken is niet simuleerbaar.", kwestie: 2 },
  { term: "Connectionisme / neurale netwerken", def: "Alternatief voor klassieke AI: leert patronen door verbindingen tussen knooppunten te versterken/verzwakken, niet via expliciete regels. Ligt dichter bij de werking van het brein.", kwestie: 2 },
  { term: "Productsimulatie vs. processimulatie", def: "Twee vormen van AI: productsimulatie bootst het eindresultaat na (bv. schaakcomputer), processimulatie bootst het menselijke leerproces na (bv. neuraal netwerk).", kwestie: 2 },
  { term: "Extended mind (Clark & Chalmers)", def: "De hypothese dat cognitie zich uitstrekt voorbij het brein, naar het lichaam en de omgeving. Otto’s notitieboekje functioneert als deel van zijn geheugen (vergelijk met Inga’s biologisch geheugen).", kwestie: 2 },
  { term: "4E-cognitie", def: "Cognitie is: Embodied (belichaamd), Embedded (ingebed in omgeving), Extended (uitgebreid naar buiten), Enactive (ontstaat door actieve interactie met de wereld).", kwestie: 2 },
  { term: "Enactieve cognitie (Noë)", def: "Waarneming is geen passief ontvangen maar een actieve vaardigheid. Zien = weten wat er verandert als je beweegt. Sensomotorische kennis is cruciaal.", kwestie: 2 },
  { term: "Sensomotorisch lichaam (Noë)", def: "Het waarnemende, bewegende lichaam als basis van cognitie. Waarneming is niet iets dat ‘in het hoofd’ gebeurt maar een activiteit van het hele lichaam in de wereld.", kwestie: 2 },
  { term: "Offloading", def: "Het ‘uitbesteden’ van cognitieve taken aan externe middelen: een boodschappenlijstje, een rekenmachine, GPS. Centraal concept bij extended cognition.", kwestie: 2 },

  // ========== KWESTIE 3: WEZEN EN TECHNIEK (ET 13–17) ==========
  { term: "Natural-born cyborg (Clark)", def: "De mens is van nature een hybride van biologie en technologie. We zijn altijd al cyborgs geweest — taal en gereedschap waren onze eerste cognitieve technologieën.", kwestie: 3 },
  { term: "Cyborg-paradox (Clark)", def: "De meest succesvolle technologieën worden ‘transparant’: we merken ze niet meer op. Je kijkt door je bril, niet naar je bril. Hoe beter de integratie, hoe onzichtbaarder.", kwestie: 3 },
  { term: "Interface vs. cyborg (Clark)", def: "Interface: techniek als extern hulpmiddel dat je bedient (afstandsbediening). Cyborg: techniek wordt deel van je lichaam en cognitie (ingelijfd, transparant).", kwestie: 3 },
  { term: "Dynamische apparaten (Clark)", def: "Technologieën die niet alleen door ons worden gebruikt, maar ook leren over ons en zich aanpassen. Bv. smartphones, adaptieve software. Leidt tot cognitieve symbiose.", kwestie: 3 },
  { term: "Incorporatie (Ramachandran)", def: "Het lichaam kan kunstmatige elementen ‘inlijven’: fantoomledematen, rubber hand illusie. Het lichaamsschema is flexibeler dan gedacht.", kwestie: 3 },
  { term: "Decentreren (Kockelkoren)", def: "Nieuwe techniek verstoort bestaande waarneming. De eerste treinreizigers werden misselijk — hun zintuigen konden de ervaring niet plaatsen.", kwestie: 3 },
  { term: "Recentreren (Kockelkoren)", def: "Na decentrering lijven de zintuigen de techniek in: treinreizen wordt normaal, het landschap ‘stroomt’ voorbij als een film. Nieuwe waarnemingsgewoonten ontstaan.", kwestie: 3 },
  { term: "Inlijving (Kockelkoren)", def: "Het proces waarbij techniek zo vertrouwd wordt dat het deel wordt van onze lichamelijke ervaring. De techniek ‘verdwijnt’ in het gebruik.", kwestie: 3 },
  { term: "Technologische bemiddeling (Verbeek)", def: "Technologie is nooit neutraal: ze bemiddelt actief tussen mens en wereld. Ze vormt onze waarneming én ons handelen. Bv. echoscopie maakt foetus tot medisch object.", kwestie: 3 },
  { term: "Ontwerpen van moraal (Verbeek)", def: "Omdat technologie moreel handelen bemiddelt, is ontwerpen ook moraal ontwerpen. Ontwerpers bouwen (bewust of onbewust) waarden in. Bv. verkeersdrempel = waarde veiligheid.", kwestie: 3 },
  { term: "Vrijheid als je verhouden (Verbeek)", def: "Vrijheid ≠ vrij van invloed. Vrijheid = je bewust verhouden tot technologische invloeden: ze herkennen, evalueren en er actief mee omgaan.", kwestie: 3 },
  { term: "NBIN-technologieën (De Mul)", def: "Nano-, Bio-, Info- en Neurotechnologie. Deze convergerende technologieën grijpen in op de biologische basis van de mens en transformeren onze identiteit.", kwestie: 3 },
  { term: "Humanisme (De Mul)", def: "Het traditionele kader: de mens als autonoom, rationeel wezen met een vaststaande essentie. Uitgangspunt waartegen De Mul zijn drie scenario’s afzet.", kwestie: 3 },
  { term: "Extrahumanisme (De Mul)", def: "Scenario ‘Zwermgeest’: neurotechnologie verbindt breinen tot een collectief bewustzijn. Het individu lost op in een groter geheel.", kwestie: 3 },
  { term: "Transhumanisme (De Mul)", def: "Scenario ‘Alien’: biotechnologie (CRISPR) creëert een nieuw soort mens. De mens evolueert tot iets fundamenteel anders, een ‘nieuwe biologische soort’.", kwestie: 3 },
  { term: "Posthumanisme (De Mul)", def: "Scenario ‘Zombie’: robotica/AI creëert kunstmatig leven zonder bewustzijn. De grens tussen leven en niet-leven vervaagt.", kwestie: 3 },
  { term: "Herwaardering van waarden (Nietzsche/De Mul)", def: "Bestaande waarden en normen moeten opnieuw onderzocht worden in het licht van technologische veranderingen. Niet vasthouden aan het oude, maar nieuwe waarden creëren.", kwestie: 3 },

  // ========== KWESTIE 4: GRENSVERVAGINGEN (ET 18–23) ==========
  { term: "The mesh (Morton)", def: "Het netwerk van alle levende en niet-levende wezens die fundamenteel met elkaar verbonden zijn. Er is geen ‘buiten’ de natuur — alles is verweven.", kwestie: 4 },
  { term: "Hyperobject (Morton)", def: "Objecten die zo enorm verspreid zijn in tijd en ruimte dat ze onze waarneming te boven gaan. Bv. klimaatverandering, radioactief afval, plasticsoep.", kwestie: 4 },
  { term: "Ecologisch denken (Morton)", def: "Twee aspecten: (1) alles is met alles verbonden (the mesh), en (2) elk wezen heeft een eigen perspectief. Dwingt tot herziening van de mens/dier-grens.", kwestie: 4 },
  { term: "Dierlijke agency (Despret)", def: "Dieren zijn niet louter objecten van onderzoek maar actieve subjecten met eigen perspectief en handelingsvermogen. Wetenschappers moeten ‘goede vragen’ stellen.", kwestie: 4 },
  { term: "Staying with the trouble (Haraway)", def: "Niet wegvluchten in utopie of dystopie, maar verantwoordelijkheid nemen in het rommelige heden. Symbiotisch samenleven met andere soorten.", kwestie: 4 },
  { term: "Symbiopoiesis (Haraway)", def: "Leven ontstaat niet uit zichzelf (auto-poiesis) maar altijd in samenwerking met andere soorten. ‘Making-with’: samen worden, samen leven.", kwestie: 4 },
  { term: "Response-ability (Haraway)", def: "Het vermogen én de plicht om te antwoorden op andere wezens. Niet ‘verantwoordelijkheid’ als abstract principe maar als concreet antwoord-geven.", kwestie: 4 },
  { term: "Companion species (Haraway)", def: "Soorten die samen evolueren en elkaars bestaan vormgeven. De mens is geen onafhankelijk wezen maar altijd al verweven met andere soorten.", kwestie: 4 },
  { term: "Cyborg Manifesto (Haraway)", def: "Grenzen tussen mens/dier, mens/machine en fysiek/niet-fysiek zijn doorbroken. De cyborg is een metafoor voor het overstijgen van dualismen.", kwestie: 4 },
  { term: "Actant (Latour)", def: "Alles (mens én niet-mens) dat handelt of een verschil maakt in een netwerk. Een drempel, een sleutel, een virus — allemaal actanten met ‘agency’.", kwestie: 4 },
  { term: "Actor-Network Theory (Latour)", def: "Sociale relaties bestaan uit netwerken van menselijke en niet-menselijke actoren. De Berlijnse sleutel dwingt je de deur te sluiten — het ‘handelt’.", kwestie: 4 },
  { term: "Parlement der Dingen (Latour)", def: "Politieke besluitvorming moet niet alleen mensen maar ook niet-menselijke actanten een ‘stem’ geven. Technologie en natuur als politieke medespelers.", kwestie: 4 },
  { term: "Unthought / cognitieve non-mens (Hayles)", def: "Technische systemen (algoritmen, sensoren) die ‘cognitieve taken’ uitvoeren zonder bewustzijn. Cognitie voorbij het menselijke.", kwestie: 4 },
  { term: "Cognitieve assemblage (Hayles)", def: "Complexe systemen waarin menselijke en niet-menselijke cognitie samenwerken. Bv. een piloot met autopilot: het denken is verdeeld over mens en machine.", kwestie: 4 },
  { term: "Intra-actie (Barad)", def: "Niet inter-actie (twee vooraf bestaande dingen) maar intra-actie: dingen ontstaan pas in hun onderlinge relatie. Materie is actief en producerend.", kwestie: 4 },
  { term: "Agentieel realisme (Barad)", def: "Werkelijkheid ontstaat door intra-acties: materie, betekenis en agency zijn niet vooraf gegeven maar worden samen geproduceerd in relaties.", kwestie: 4 },
  { term: "Despret – goede vragen stellen", def: "Onderzoekers moeten niet hun eigen kaders opleggen maar vragen stellen die dieren de ruimte geven om te ‘antwoorden’. Slechte vragen leiden tot slechte wetenschap.", kwestie: 4 },
  { term: "Dataïsme (Harari)", def: "De opvatting dat data de ultieme bron van waarde en autoriteit is. Algoritmes begrijpen ons beter dan wijzelf. ‘Homo Deus’ voorbij het humanisme.", kwestie: 4 },
  { term: "Het else (Rasch)", def: "Dat wat bij datareductie altijd verloren gaat. De kloof tussen data en werkelijkheid. In die ‘kier van licht’ doet zich iets als vrijheid voor.", kwestie: 4 },

  // ========== DOMEIN B1: WIJSGERIGE ANTROPOLOGIE ==========
  { term: "Subjectiviteit", def: "Het vermogen om de wereld vanuit een eigen, uniek perspectief te ervaren — het 'ik' dat ervaart. Centraal begrip in de wijsgerige antropologie.", kwestie: "B1" },
  { term: "Intersubjectiviteit", def: "Gedeelde betekenisgeving tussen subjecten. Kennis en ervaring ontstaan niet in isolatie maar in relatie tot anderen. Basis voor taal, cultuur en wetenschap.", kwestie: "B1" },
  { term: "Cultuur vs. natuur", def: "Is de mens primair een natuurwezen (bepaald door biologie) of een cultuurwezen (gevormd door opvoeding, taal, tradities)? Kernvraag van de wijsgerige antropologie.", kwestie: "B1" },
  { term: "Monisme vs. dualisme", def: "Monisme: geest en lichaam zijn één (of alleen materie bestaat). Dualisme: geest en lichaam zijn twee gescheiden substanties (Descartes). Pluralisme erkent meerdere werkelijkheidslagen.", kwestie: "B1" },
  { term: "Vrijheid vs. determinisme", def: "Is de mens vrij in haar keuzes, of wordt alles bepaald door oorzaken (genen, opvoeding, hersenen)? Centraal debat dat raakt aan verantwoordelijkheid en moraal.", kwestie: "B1" },
  { term: "Materialisme / philosophy of mind", def: "Het mens-zijn wordt in verband gebracht met lichamelijke processen, in het bijzonder hersenprocessen. Mentale toestanden zijn uiteindelijk fysieke toestanden.", kwestie: "B1" },
  { term: "Structuralisme (antropologie)", def: "De mens als functioneel onderdeel van een dominant systeem (taal, cultuur, economie). Niet het individu maar de structuur bepaalt het handelen.", kwestie: "B1" },
  { term: "Sociobiologie", def: "De mens als onderdeel van de evolutie en als biologisch-genetische eenheid. Menselijk gedrag (ook sociaal en moreel) wordt verklaard vanuit evolutionaire aanpassing.", kwestie: "B1" },

  // ========== DOMEIN C1: ETHIEK ==========
  { term: "Deugdethiek (Aristoteles)", def: "De mens als gemeenschapswezen neemt deugd als uitgangspunt. Het goede leven bereik je door deugden te ontwikkelen: moed, matigheid, rechtvaardigheid, praktische wijsheid.", kwestie: "C1" },
  { term: "Plicht-ethiek (Kant)", def: "Morele afweging gaat altijd uit van principes en plicht, ongeacht het resultaat. De categorische imperatief: handel alleen volgens regels die je als universele wet zou willen.", kwestie: "C1" },
  { term: "Utilisme (Mill)", def: "Het goede is datgene wat leidt tot de maximalisering van geluk voor het grootste aantal mensen. Consequenties bepalen of een handeling moreel goed is.", kwestie: "C1" },
  { term: "Waardencreatie (Nietzsche)", def: "Waarden worden niet ontdekt maar door de mens zelf gecreëerd. Bestaande moraal moet kritisch onderzocht en zo nodig verworpen worden (herwaardering van waarden).", kwestie: "C1" },
  { term: "Communicatief handelen (Habermas)", def: "Ethiek is gebaseerd op vrije, gelijkwaardige dialoog. Morele normen zijn geldig als alle betrokkenen er in een open gesprek mee zouden instemmen.", kwestie: "C1" },
  { term: "Waarden vs. normen", def: "Waarden zijn idealen die richting geven (vrijheid, rechtvaardigheid). Normen zijn concrete regels die uit waarden voortvloeien ('je mag niet stelen'). Ethiek onderzoekt beide.", kwestie: "C1" },
  { term: "Is-ought gap (Hume)", def: "Uit hoe iets 'is' (feit) volgt niet hoe het 'moet zijn' (norm). Relevant bij: mag alles wat technologisch kán? Feiten alleen bepalen geen moraal.", kwestie: "C1" },
  { term: "Intrinsiek vs. instrumenteel handelen", def: "Intrinsiek handelen: iets doen omdat het op zichzelf waardevol is. Instrumenteel handelen: iets doen als middel voor een ander doel. Ethische vraag: wanneer is iets doel, wanneer middel?", kwestie: "C1" },
  { term: "Rechten vs. plichten", def: "Rechten zijn aanspraken die je kunt maken (bijv. recht op vrijheid). Plichten zijn verplichtingen jegens anderen. In de ethiek: hoe verhouden deze zich tot elkaar?", kwestie: "C1" },

  // ========== DOMEIN D1: KENNISLEER ==========
  { term: "A priori vs. a posteriori", def: "A priori: kennis onafhankelijk van ervaring (bijv. wiskunde). A posteriori: kennis op basis van ervaring (bijv. 'water kookt bij 100°C'). Centraal onderscheid in de kennisleer.", kwestie: "D1" },
  { term: "Schijn vs. werkelijkheid", def: "Komt onze waarneming overeen met hoe de werkelijkheid echt is? Filosofisch kernprobleem sinds Plato's allegorie van de grot: wat we zien is misschien slechts een schaduw.", kwestie: "D1" },
  { term: "Rationalisme (Descartes)", def: "Kennis is primair een proces van rationeel denken. Door methodische twijfel en zuiver redeneren komen we tot zekere kennis. De rede is betrouwbaarder dan de zintuigen.", kwestie: "D1" },
  { term: "Empirisme (Locke, Hume)", def: "Kennis is gebaseerd op zintuiglijke ervaring. De geest is bij geboorte een 'onbeschreven blad' (tabula rasa). Alle kennis komt uiteindelijk voort uit waarneming.", kwestie: "D1" },
  { term: "Synthese ervaring en denken (Kant)", def: "Kennis komt voort uit een synthese: de zintuigen leveren ruwe ervaring, het verstand ordent die met aangeboren categorieën (ruimte, tijd, causaliteit). Zonder begrippen is ervaring blind, zonder ervaring zijn begrippen leeg.", kwestie: "D1" },
  { term: "Constructivisme (epistemologie)", def: "Kennis is niet een passieve afspiegeling van de werkelijkheid maar wordt actief geconstrueerd door de waarnemer. Verband met theoriegeladenheid en metaforen.", kwestie: "D1" },
  { term: "Kennis vs. geloof", def: "Kennis vereist rechtvaardiging en waarheid, geloof niet. Filosofische vraag: waar ligt de grens? Wanneer is overtuiging kennis en wanneer slechts mening of geloof?", kwestie: "D1" },
  { term: "Feit vs. fictie", def: "Feiten beschrijven wat het geval is, ficties zijn verzonnen. Maar: is het onderscheid scherp? Narrativisme stelt dat ook feitelijke kennis narratief gestructureerd is.", kwestie: "D1" },

  // ========== DOMEIN E1: WETENSCHAPSFILOSOFIE ==========
  { term: "Hypothese en empirische toetsing", def: "Een hypothese is een voorlopige veronderstelling die empirisch getoetst moet worden. De empirische cyclus: waarneming → hypothese → toetsing → conclusie.", kwestie: "E1" },
  { term: "Demarcatieprobleem", def: "Hoe onderscheid je wetenschap van niet-wetenschap (pseudowetenschap)? Kernvraag van de wetenschapsfilosofie. Popper: falsifieerbaarheid als criterium.", kwestie: "E1" },
  { term: "Positivisme (Comte)", def: "Wetenschap is gebaseerd op positieve (waarneembare) feiten. Alleen empirisch verifieerbare uitspraken zijn wetenschappelijk zinvol. De Wiener Kreis radicaliseerde dit idee.", kwestie: "E1" },
  { term: "Falsificationisme (Popper)", def: "Een theorie is wetenschappelijk als ze in principe weerlegbaar (falsifieerbaar) is. Wetenschap vordert niet door verificatie maar door pogingen theorieën te weerleggen.", kwestie: "E1" },
  { term: "Paradigma (Kuhn)", def: "Een paradigma is het gedeelde denkpatroon van een wetenschappelijke gemeenschap: theorieën, methoden, standaardvoorbeelden. Wetenschappelijke revoluties = paradigmawisselingen.", kwestie: "E1" },
  { term: "Methodologisch anarchisme (Feyerabend)", def: "'Anything goes': er is geen enkele methode die alle wetenschappelijke vooruitgang verklaart. Vele methoden van onderzoek kunnen wetenschappelijk zijn.", kwestie: "E1" },
  { term: "Verklaren vs. verstaan", def: "Verklaren: causale wetmatigheden zoeken (natuurwetenschappen). Verstaan: betekenis en intenties begrijpen (geesteswetenschappen/hermeneutiek). Twee verschillende benaderingen van kennis.", kwestie: "E1" },
  { term: "Inductie vs. deductie", def: "Inductie: van losse waarnemingen naar een algemene regel ('alle zwanen die ik zag zijn wit, dus alle zwanen zijn wit'). Deductie: van algemene regel naar specifieke conclusie. Inductieprobleem: inductie levert nooit absolute zekerheid.", kwestie: "E1" },
  { term: "Waardevrijheid vs. waardegebondenheid", def: "Is wetenschap objectief en waardevrij, of wordt ze altijd beïnvloed door de waarden en belangen van onderzoekers? Latour: wetenschap is een maatschappelijke praktijk, nooit volledig waardevrij.", kwestie: "E1" },
  { term: "Techniek vs. technologie", def: "Techniek: het praktische kunnen, het maken en gebruiken van middelen. Technologie: de systematische, wetenschappelijke studie van techniek. In de wetenschapsfilosofie: hoe verhouden wetenschap en techniek zich?", kwestie: "E1" },
];

// ============================================================
// QUIZ QUESTIONS
// ============================================================

const QUIZ_QUESTIONS = [
  // Kwestie 1
  { q: "Descartes stelt dat de mens bestaat uit twee substanties. Welke zijn dat?", options: ["Res cogitans (denken) en res extensa (uitgebreidheid)", "Bewustzijns-lichaam en lichaamsschema", "Excentrische en centrische positionaliteit", "Mensbeeld en bestaanservaring"], correct: 0, explanation: "Descartes’ dualisme onderscheidt res cogitans (denkend bewustzijn) en res extensa (uitgebreid/materieel lichaam). ‘Bewustzijns-lichaam’ is juist Sheets-Johnstones term die deze scheiding verwerpt.", kwestie: 1 },
  { q: "Wat bedoelt Sheets-Johnstone met ‘pre-reflectief’?", options: ["De bewuste reflectie die voorafgaat aan lichamelijke actie", "Lichamelijke gewaarwording die voorafgaat aan bewuste reflectie", "Het lichaamsschema dat ontstaat door nadenken over beweging", "De fenomenologische methode van bewuste zelfobservatie"], correct: 1, explanation: "Pre-reflectief = de directe lichamelijke ervaring die er al is vóór bewuste reflectie. Optie A draait de volgorde om (dát is juist de cartesiaanse positie).", kwestie: 1 },
  { q: "Plessners ‘excentrische positionaliteit’ houdt in dat de mens:", options: ["Altijd in het centrum van de wereld staat (centrische positie)", "Buiten zichzelf kan treden en zichzelf kan waarnemen", "Excentriek gedrag vertoont ten opzichte van dieren", "Via bemiddelde onmiddellijkheid zijn ervaring vormgeeft"], correct: 1, explanation: "De mens kan zichzelf van buitenaf beschouwen (excentrisch) terwijl hij tegelijk het centrum van zijn eigen ervaring blijft. Optie D noemt een wet van Plessner maar beschrijft niet de excentrische positionaliteit zelf.", kwestie: 1 },
  { q: "Wat bedoelt Fanon met het ‘raciaal-epidermaal schema’?", options: ["Een biologische classificatie van rassen door de wetenschap", "Het schema dat door de blik van de witte ander op het zwarte lichaam wordt gelegd", "Plessners lichaamsschema toegepast op raciale ervaring", "De Beauvoirs situatie-begrip vertaald naar ras"], correct: 1, explanation: "Het raciaal-epidermaal schema is het door de dominante (witte) blik opgelegde beeld dat de bestaanservaring van zwarte mensen bepaalt en beperkt. Optie C klinkt aannemelijk maar is Fanons eigen begrip, niet afgeleid van Plessner.", kwestie: 1 },
  { q: "De Beauvoir stelt: ‘Men wordt niet als vrouw geboren, men wordt het.’ Dit illustreert:", options: ["Dat vrouwelijkheid een biologisch gegeven is dat cultureel versterkt wordt", "Dat gender een sociale situatie is, niet een biologisch lot", "Plessners wet van natuurlijke kunstmatigheid toegepast op gender", "Dat het mensbeeld van vrouwen verschilt van dat van mannen"], correct: 1, explanation: "De Beauvoir benadrukt dat vrouwelijkheid niet biologisch bepaald is maar een situatie: een complex van sociale verwachtingen, blikken en rollen.", kwestie: 1 },

  // Kwestie 2
  { q: "Welke metafoor is een voorbeeld van een oriënterende metafoor (Lakoff & Johnson)?", options: ["‘De tijd is geld’ — tijd als verhandelbaar object", "‘Ik voel me down’ — negatief = onder, positief = boven", "‘Inflatie vreet ons spaargeld op’ — inflatie als levend wezen", "‘Kennis is macht’ — kennis als instrument"], correct: 1, explanation: "Oriënterende metaforen zijn gebaseerd op de ruimtelijke oriëntatie van het lichaam: BOVEN = goed/positief, ONDER = slecht/negatief. Optie C is een ontologische metafoor (inflatie als concreet wezen).", kwestie: 2 },
  { q: "Het gedachtenexperiment van Otto en Inga (Clark & Chalmers) illustreert:", options: ["Dat alleen biologische hersenen echt geheugen bevatten", "De extended mind-hypothese: Otto’s notitieboekje is deel van zijn geheugen", "Dreyfus’ argument dat computers niet kunnen denken", "Het verschil tussen productsimulatie en processimulatie"], correct: 1, explanation: "Otto (met Alzheimer) gebruikt een notitieboekje; Inga haar biologisch geheugen. Beide functioneren als geheugen — dus cognitie strekt zich uit voorbij het brein.", kwestie: 2 },
  { q: "Wat houdt ‘enactieve cognitie’ (Noë) in?", options: ["Cognitie wordt geactiveerd door neurale prikkels in het brein", "Waarneming is passief ontvangen van zintuiglijke informatie", "Waarneming is een actieve vaardigheid gebaseerd op sensomotorische kennis", "Enactief betekent dat cognitie alleen binnen het lichaam plaatsvindt"], correct: 2, explanation: "Volgens Noë is zien niet passief: het is weten wat er visueel verandert als je beweegt. Waarneming vereist actieve, lichamelijke interactie met de wereld.", kwestie: 2 },
  { q: "Het computationalisme stelt dat:", options: ["Computers bewustzijn hebben net als mensen", "Het brein werkt als een informatieverwerkende machine", "Alleen het lichaam denkt, niet het brein", "Denken onmogelijk nagebootst kan worden"], correct: 1, explanation: "Het computationalisme / functionalisme ziet het brein als een informatieverwerkende machine: mentale toestanden zijn functionele toestanden. Dit is precies wat Dreyfus bekritiseert.", kwestie: 2 },

  // Kwestie 3
  { q: "Clark noemt de mens een ‘natural-born cyborg’. Wat bedoelt hij daarmee?", options: ["Mensen worden steeds meer machine door implantaten", "De mens is van nature een hybride van biologie en technologie", "Alleen mensen met protheses of chips zijn cyborgs", "De mens zal in de toekomst een cyborg worden (transhumanisme)"], correct: 1, explanation: "Volgens Clark zijn we altijd al cyborgs geweest. Taal, gereedschap en schrift waren onze eerste cognitieve technologieën. Optie D is De Muls transhumanisme-scenario.", kwestie: 3 },
  { q: "Kockelkoren beschrijft hoe de eerste treinreizigers misselijk werden. Dit is een voorbeeld van:", options: ["Recentreren — de zintuigen passen zich aan", "Decentreren — nieuwe techniek verstoort bestaande waarneming", "Technologische bemiddeling volgens Verbeek", "De cyborg-paradox van Clark"], correct: 1, explanation: "Decentreren = nieuwe techniek verstoort bestaande waarneming. De zintuigen kunnen de nieuwe ervaring (snelheid van de trein) nog niet plaatsen.", kwestie: 3 },
  { q: "Verbeek stelt: ‘Ontwerpen is moraal ontwerpen.’ Wat bedoelt hij?", options: ["Ontwerpers moeten een ethiekcursus volgen", "Technologie bevat altijd ingebouwde waarden die moreel handelen beïnvloeden", "Moraal kan alleen door mensen worden bepaald, niet door techniek", "Kockelkoren: ontwerpen bepaalt zintuiglijke ervaring"], correct: 1, explanation: "Omdat technologie niet neutraal is maar ons handelen bemiddelt, bouwen ontwerpers (bewust of onbewust) morele waarden in hun producten in.", kwestie: 3 },
  { q: "De Muls scenario ‘transhumanisme’ beschrijft:", options: ["Verbinding van breinen tot een collectief bewustzijn (zwermgeest)", "Biotechnologische verandering naar een nieuwe soort mens (alien)", "Kunstmatig leven zonder bewustzijn (zombie)", "Terugkeer naar het klassieke humanisme"], correct: 1, explanation: "Transhumanisme = het ‘alien’-scenario: biotechnologie (zoals CRISPR) kan leiden tot een fundamenteel andere, nieuwe biologische soort mens. De zwermgeest is extrahumanisme, de zombie is posthumanisme.", kwestie: 3 },
  { q: "Wat bedoelt Verbeek met ‘vrijheid als je verhouden’?", options: ["Vrijheid betekent doen wat je wilt zonder technologische dwang", "Vrijheid = je bewust verhouden tot technologische invloeden", "Vrijheid is onmogelijk geworden door technologische bemiddeling", "Vrijheid = technologie weigeren en terugkeren naar de natuur"], correct: 1, explanation: "Vrijheid is niet ‘vrij van invloed’ maar: technologische invloeden herkennen, evalueren en er actief mee omgaan.", kwestie: 3 },

  // Kwestie 4
  { q: "Latours ‘Berlijnse sleutel’ illustreert:", options: ["Dat alleen mensen morele keuzes kunnen maken", "Dat ook niet-menselijke dingen (actanten) ‘agency’ hebben", "Dat techniek de menselijke ervaring decentreert", "Dat sleutels symbolen zijn van eigendom en macht"], correct: 1, explanation: "De Berlijnse sleutel dwingt je de deur achter je te sluiten. Het object ‘handelt’ — het is een actant met ingebouwde agency.", kwestie: 4 },
  { q: "Harari’s ‘dataïsme’ houdt in:", options: ["Dat data neutraal en objectief de werkelijkheid weerspiegelt", "Dat data de ultieme bron van waarde en autoriteit is", "Dat Rasch gelijk heeft over het else", "Dat datawetenschappers de nieuwe filosofen zijn"], correct: 1, explanation: "Dataïsme is de opvatting dat informatie/data de hoogste waarde heeft. Algoritmes zouden ons beter begrijpen dan wijzelf. Rasch (het else) bekritiseert juist deze reductie.", kwestie: 4 },
  { q: "Rasch spreekt over ‘het else’. Wat is dat?", options: ["Een programmeertaal voor data-analyse", "Dat wat bij datareductie altijd verloren gaat", "Harari’s term voor het posthumane tijdperk", "Barads alternatief voor intra-actie"], correct: 1, explanation: "‘Het else’ is dat wat bij elke datareductie ontsnapt. De kloof tussen data en werkelijkheid — daarin schuilt ruimte voor interpretatie en vrijheid.", kwestie: 4 },
  { q: "Barads begrip ‘intra-actie’ verschilt van ‘interactie’ omdat:", options: ["Het hetzelfde betekent maar korter is", "Dingen pas ontstaan ín hun onderlinge relatie, niet ervóór", "Het alleen betrekking heeft op materie, niet op mensen", "Het Latours actor-network theory vervangt"], correct: 1, explanation: "Bij inter-actie bestaan twee dingen al los van elkaar en ontmoeten ze elkaar. Bij intra-actie (Barad) ontstaan de dingen pas in en door hun relatie.", kwestie: 4 },
  { q: "Morton gebruikt het begrip ‘the mesh’ om uit te drukken dat:", options: ["De natuur een net is dat de mens gevangen houdt", "Alles (levend en niet-levend) fundamenteel met elkaar verbonden is", "Wifi-netwerken de natuur bedreigen (hyperobject)", "Mensen gevangen zitten in technologische systemen"], correct: 1, explanation: "The mesh = het netwerk van alle wezens en dingen die fundamenteel verweven zijn. Er is geen ‘buiten’ de natuur.", kwestie: 4 },
  { q: "Hayles' concept 'unthought' verwijst naar:", options: ["Onbewuste menselijke gedachten volgens Freud", "Cognitieve processen in technische systemen zonder bewustzijn", "Vergeten filosofische ideeën die herontdekt moeten worden", "Het onvermogen van AI om echt te denken"], correct: 1, explanation: "Unthought = cognitie voorbij het menselijke bewustzijn. Technische systemen (algoritmen, sensoren) voeren cognitieve taken uit zonder bewust te zijn. Dreyfus' kritiek gaat juist over iets anders: het onvermogen om belichaamd denken te simuleren.", kwestie: 4 },

  // Globale eindtermen B1/C1/D1/E1
  { q: "Het monisme stelt dat:", options: ["Geest en lichaam twee gescheiden substanties zijn", "Er uiteindelijk maar één soort werkelijkheid is (bijv. alleen materie)", "De mens zowel geest als lichaam is, maar die niet op elkaar inwerken", "Alleen de geest echt bestaat, het lichaam is een illusie"], correct: 1, explanation: "Monisme: er is uiteindelijk maar één soort werkelijkheid. Materialisme is een vorm: alles is materie. Optie A beschrijft het dualisme (Descartes).", kwestie: 0 },
  { q: "Wat stelt de deugdethiek van Aristoteles centraal?", options: ["Het maximaliseren van geluk voor zoveel mogelijk mensen", "Handelen vanuit plicht en universele principes", "Het ontwikkelen van een deugdzaam karakter gericht op het goede leven", "Het creëren van eigen waarden los van de traditie"], correct: 2, explanation: "De deugdethiek draait om karaktervorming: door deugden (moed, matigheid, wijsheid) te ontwikkelen bereik je het goede leven. Optie A is het utilisme, B is Kant, D is Nietzsche.", kwestie: 0 },
  { q: "Kants categorische imperatief houdt in:", options: ["Handel zo dat je het meeste geluk produceert", "Handel alleen volgens regels die je als universele wet zou willen", "Handel volgens je eigen waarden, ongeacht wat anderen vinden", "Handel volgens de deugden die de gemeenschap voorschrijft"], correct: 1, explanation: "Kant: een handeling is moreel goed als de regel erachter universaliseerbaar is — als iedereen het zou doen, zou het nog steeds kloppen. Niet de gevolgen tellen, maar het principe.", kwestie: 0 },
  { q: "Het utilisme van Mill beoordeelt een handeling op basis van:", options: ["Of de handeling vanuit plicht is verricht", "Of de handeling het totale geluk maximaliseert", "Of de handeling past bij iemands deugdzaam karakter", "Of de handeling in overeenstemming is met Gods wil"], correct: 1, explanation: "Het utilisme kijkt naar consequenties: de handeling die het meeste geluk oplevert voor het grootste aantal mensen is moreel juist.", kwestie: 0 },
  { q: "Humes 'is-ought gap' betekent:", options: ["Wat wetenschappelijk bewezen is, moet ook moreel worden nagestreefd", "Uit feiten (hoe iets is) kun je niet afleiden hoe het moet zijn", "De kloof tussen theorie en praktijk in de wetenschap", "Het verschil tussen empirisme en rationalisme"], correct: 1, explanation: "Hume stelt dat uit beschrijvende uitspraken ('is') geen normatieve uitspraken ('ought') logisch volgen. Dat iets technologisch kán, betekent niet dat het móet.", kwestie: 0 },
  { q: "Wat is het verschil tussen a priori en a posteriori kennis?", options: ["A priori is waar, a posteriori is onwaar", "A priori is onafhankelijk van ervaring, a posteriori is gebaseerd op ervaring", "A priori is objectief, a posteriori is subjectief", "A priori komt van Aristoteles, a posteriori van Plato"], correct: 1, explanation: "A priori kennis heb je onafhankelijk van ervaring (bijv. 2+2=4). A posteriori kennis komt uit ervaring (bijv. 'water kookt bij 100°C').", kwestie: 0 },
  { q: "Kants synthese van rationalisme en empirisme stelt dat:", options: ["Alleen de rede tot kennis leidt, de zintuigen bedriegen", "Alleen zintuiglijke ervaring levert betrouwbare kennis", "Kennis ontstaat doordat het verstand ruwe ervaring ordent met aangeboren categorieën", "Kennis is een sociale constructie zonder objectieve basis"], correct: 2, explanation: "Kant combineert: de zintuigen leveren de grondstof (ervaring), het verstand ordent die met categorieën (ruimte, tijd, causaliteit). 'Zonder begrippen is ervaring blind, zonder ervaring zijn begrippen leeg.'", kwestie: 0 },
  { q: "Popper stelt dat een theorie wetenschappelijk is als ze:", options: ["Empirisch geverifieerd kan worden", "In principe weerlegbaar (falsifieerbaar) is", "Door de wetenschappelijke gemeenschap wordt geaccepteerd", "Gebaseerd is op inductieve waarnemingen"], correct: 1, explanation: "Falsifieerbaarheid is Poppers demarcatiecriterium: een theorie is pas wetenschappelijk als je kunt aangeven welke waarneming haar zou weerleggen. Verificatie is nooit definitief.", kwestie: 0 },
  { q: "Een paradigmawisseling volgens Kuhn vindt plaats wanneer:", options: ["Een enkele wetenschapper een fout in de theorie ontdekt", "Het heersende denkpatroon van de wetenschappelijke gemeenschap wordt vervangen door een nieuw", "Alle wetenschappers het via democratische stemming eens worden", "Een theorie definitief wordt gefalsifieerd volgens Poppers methode"], correct: 1, explanation: "Kuhn: wetenschap werkt binnen paradigma's (gedeelde denkpatronen). Bij een revolutie wordt het hele paradigma — theorieën, methoden, standaarden — vervangen door een nieuw.", kwestie: 0 },
  { q: "Wat is het verschil tussen 'verklaren' en 'verstaan'?", options: ["Verklaren is wetenschappelijk, verstaan is onwetenschappelijk", "Verklaren zoekt causale wetmatigheden, verstaan probeert betekenis en intenties te begrijpen", "Verklaren is deductief, verstaan is inductief", "Er is geen verschil, het zijn synoniemen"], correct: 1, explanation: "Verklaren (Erklären) hoort bij de natuurwetenschappen: oorzaak-gevolgrelaties. Verstaan (Verstehen) hoort bij de geesteswetenschappen/hermeneutiek: begrijpen van menselijke betekenisgeving.", kwestie: 0 },
  { q: "Nietzsche pleit voor een 'herwaardering van waarden'. Dat betekent:", options: ["Terug naar de traditionele christelijke moraal", "Bestaande waarden kritisch onderzoeken en zo nodig nieuwe waarden creëren", "Alle waarden zijn gelijk en relatief", "Waarden worden bepaald door democratische consensus"], correct: 1, explanation: "Nietzsche stelt dat bestaande moraal (vooral de christelijke) onderzocht en eventueel verworpen moet worden. De mens moet zelf waarden scheppen, niet klakkeloos overnemen.", kwestie: 0 },
  { q: "Het inductieprobleem houdt in dat:", options: ["Deductie onbetrouwbaar is", "Van losse waarnemingen naar een algemene regel redeneren nooit absolute zekerheid oplevert", "Inductie alleen werkt in de natuurwetenschappen", "Alle wetenschappelijke kennis onbetrouwbaar is"], correct: 1, explanation: "Inductie gaat van het bijzondere naar het algemene ('alle zwanen die ik zag zijn wit, dus alle zwanen zijn wit'). Maar de volgende zwaan kan zwart zijn — inductie levert geen logische zekerheid.", kwestie: 0 },
];

// ============================================================
// EXAM QUESTIONS (v4.2) — 18 vragen met casuscontext
// ============================================================

const EXAM_QUESTIONS = [
  // EXAMEN 2025-T1 — Opgave 1: Real Humans
  { year: "2025-T1", nr: 1, points: 3, question: "Leg uit wat het mensbeeld van het functionalisme inhoudt. Gebruik daarbij de begrippen input/output en mentale representatie. Leg vervolgens uit dat Anita’s opvatting past bij het functionalisme.", context: "Casus ‘Real Humans’: Zweedse serie over ‘hubots’ — robots die bijna niet van mensen te onderscheiden zijn. Anita is een hubot die in een gezin woont en huishoudelijk werk doet. Ze lijkt emoties te hebben en bouwt een band op met het gezin.", model: "Functionalisme: mentale toestanden worden gedefinieerd door hun functionele rol — de relatie tussen input (prikkels), interne verwerking (mentale representaties) en output (gedrag). Het gaat niet om het materiaal (vlees of silicium) maar om de functie. (2p)\nAnita past hierbij: zij vertoont gedrag (output) dat past bij bepaalde prikkels (input), alsof zij mentale toestanden heeft. (1p)", kwestie: 2, et: "ET 11" },
  { year: "2025-T1", nr: 2, points: 3, question: "Noem drie functies die het lichaam volgens Dreyfus heeft voor intelligent gedrag. Leg bij elk uit waarom Anita (als hubot) hierin verschilt van een mens.", context: "Casus ‘Real Humans’: Anita is een hubot die menselijk gedrag vertoont maar een kunstmatig lichaam heeft.", model: "Drie functies van het lichaam (Dreyfus): (1) Het lichaam als bron van behoeften en motivatie — Anita heeft geen honger, angst of verlangen. (1p) (2) Het lichaam als basis van vaardigheden — Anita leert niet door te oefenen maar is geprogrammeerd. (1p) (3) Het lichaam als basis van sociale interactie — Anita’s lichaamstaal is gesimuleerd, niet gegroeid uit ervaring. (1p)", kwestie: 2, et: "ET 11, 12" },
  { year: "2025-T1", nr: 5, points: 1, question: "Leg met het begrip cognitieve assemblages (Hayles) uit hoe de relatie tussen opa en de huishoudster-hubot begrepen kan worden.", context: "Casus ‘Real Humans’: Een bejaarde man (opa) is gehecht aan zijn huishoudster-hubot en vertrouwt op haar voor dagelijkse taken en gezelschap.", model: "Cognitieve assemblage (Hayles): het samenwerkingsverband van menselijke en niet-menselijke cognitie. Opa en de hubot vormen samen een cognitief systeem: opa’s denken en handelen wordt aangevuld door de cognitieve capaciteiten van de hubot. (1p)", kwestie: 4, et: "ET 21" },
  { year: "2025-T1", nr: 6, points: 2, question: "Beargumenteer dat Hayles géén rechten zou toekennen aan hubots. Gebruik haar begrip ‘cognitieve non-mens’.", context: "Casus ‘Real Humans’: In de serie wordt gedebatteerd of hubots rechten zouden moeten krijgen.", model: "Hayles maakt onderscheid tussen menselijke cognitie (met bewustzijn) en technische cognitie (‘unthought’). Hubots zijn cognitieve non-mensen: ze voeren cognitieve taken uit maar zonder bewustzijn of subjectieve ervaring. (1p)\nOmdat rechten traditioneel gekoppeld zijn aan bewuste ervaring en subjectiviteit, zou Hayles hubots geen rechten toekennen — het zijn cognitieve systemen, geen bewuste wezens. (1p)", kwestie: 4, et: "ET 21" },

  // EXAMEN 2025-T1 — Opgave 2: Afrofuturisme
  { year: "2025-T1", nr: 7, points: 2, question: "Leg het mensbeeld van Clark uit als natural-born cyborg, met zijn opvatting dat het brein goed is in het gebruiken van de omgeving.", context: "Casus ‘Afrofuturisme’: Kunstenaar Rashaad Newsome maakt AI-kunst met ‘Being’ — een digitaal wezen dat leert van Black culture. Being danst, rapt en voert gesprekken.", model: "Clark stelt dat mensen tweeslachtige wezens zijn: deels vlees en bloed, deels technologisch. De mens is van nature een cyborg, een kunstmatig wezen. (1p)\nHet menselijk brein kan de omgeving gebruiken om het denkvermogen te ontlasten en uit te breiden — dingen en symbolen buiten het brein worden onderdeel van het denken. (1p)", kwestie: 3, et: "ET 14" },
  { year: "2025-T1", nr: 8, points: 1, question: "Leg met Clarks onderscheid tussen cyborg en interface uit of Being een cyborg of een interface is.", context: "Casus ‘Afrofuturisme’: Being is een AI-kunstwerk van Newsome dat fungeert als digitale danser en gesprekspartner.", model: "Being is een interface: het is een extern hulpmiddel dat Newsome bedient, niet iets dat ingelijfd is in zijn lichaam of cognitie. Een cyborg-relatie zou betekenen dat Being transparant deel wordt van Newsomes denken en handelen. (1p)", kwestie: 3, et: "ET 14" },
  { year: "2025-T1", nr: 9, points: 4, question: "Leg De Muls extrahumanistisch en posthumanistisch scenario uit. Schets bij elk scenario een ethische vraag.", context: "Casus ‘Afrofuturisme’: De kunstwerken roepen vragen op over de toekomst van de mens in relatie tot technologie.", model: "Extrahumanisme (‘zwermgeest’): neurotechnologie verbindt breinen tot een collectief bewustzijn. Het individu verdwijnt. (1p) Ethische vraag: is het verlies van individualiteit wenselijk? Wie beslist over de collectieve gedachten? (1p)\nPosthumanisme (‘zombie’): AI/robotica creëert kunstmatig leven zonder bewustzijn. (1p) Ethische vraag: als machines ‘leven’ zonder bewustzijn, hoe gaan we om met de status van biologisch leven? Heeft bewustzijn nog waarde? (1p)", kwestie: 3, et: "ET 17" },
  { year: "2025-T1", nr: 10, points: 1, question: "Leg uit dat afrofuturistische mensbeelden laten zien dat mensbeelden historisch contingent zijn.", context: "Casus ‘Afrofuturisme’: Afrofuturisme combineert Afrikaanse tradities met science fiction en technologie om alternatieve mensbeelden te scheppen.", model: "Afrofuturistische mensbeelden tonen dat het antwoord op ‘wat is de mens’ verandert door culturele invloeden die ook anders hadden kunnen zijn dan het westerse perspectief. Het raciale perspectief is niet noodzakelijk maar historisch gegroeid. (1p)", kwestie: 1, et: "ET 4" },
  { year: "2025-T1", nr: 11, points: 3, question: "Leg de afrofuturistische kritiek op de raciale blik uit met Fanons argument over bestaanservaring en Plessners begrippen excentrische positionaliteit en bemiddelde onmiddellijkheid.", context: "Casus ‘Afrofuturisme’: Afrofuturistische kunstenaars bekritiseren de westerse blik die mensen van kleur reduceert tot hun uiterlijk.", model: "Fanon: de bestaanservaring van mensen van kleur wordt gevormd/overstempt door de blik van witte anderen, die het zwarte lichaam objectiveren. (1p)\nPlessner: excentrische positionaliteit — de mens bestaat niet alleen als centrum van zijn handelen, maar kan dit ook van buiten beschouwen. (1p)\nPlessner: wet van bemiddelde onmiddellijkheid — directe ervaringen worden altijd tegelijk bemiddeld door reflectie en (bij Fanon) door de blik van de ander. (1p)", kwestie: 1, et: "ET 7, 9" },
  { year: "2025-T1", nr: 12, points: 2, question: "Leg uit hoe Sheets-Johnstone de bestaanservaring grondt in het bewegende lichaam. Pas dit toe op danseres Cherish Menzo.", context: "Casus ‘Afrofuturisme’: Danseres Cherish Menzo gebruikt dans om de ervaring van het zwarte lichaam te onderzoeken en te bevrijden van opgelegde beelden.", model: "Sheets-Johnstone: bestaanservaring is primair geworteld in het bewegende lichaam — pre-reflectieve, lichamelijke gewaarwording gaat vooraf aan bewuste reflectie. (1p)\nMenzo’s dans is hiervan een voorbeeld: door te bewegen onderzoekt zij haar bestaanservaring en bevrijdt zij zich van het door anderen opgelegde (raciaal-epidermale) schema. (1p)", kwestie: 1, et: "ET 6" },

  // EXAMEN 2024-T2 — Opgave: Leven als das
  { year: "2024-T2", nr: 20, points: 2, question: "Leg met een metafoor die past bij het lopen op handen en knieën uit wat een oriënterende metafoor is.", context: "Casus ‘Leven als das’: Charles Foster leefde wekenlang als das in een hol om de dierlijke ervaring te begrijpen. Hij kroop op handen en knieën en at wormen.", model: "Een oriënterende metafoor structureert denken via lichamelijke oriëntatie. Bv. bij lopen op handen en knieën: ‘vooruit = goed’ (in plaats van boven = goed). (1p)\nDe metafoor is geworteld in de lichamelijke ervaring: als je op handen en knieën loopt, verandert de oriëntatie en daarmee potentieel ook de metaforen. (1p)", kwestie: 2, et: "ET 10" },
  { year: "2024-T2", nr: 22, points: 3, question: "Leg met het begrip decentreren een overeenkomst tussen de treinervaringen van Foster en Kockelkoren uit. Leg vervolgens met het begrip recentreren een overeenkomst en een verschil uit.", context: "Casus ‘Leven als das’: Foster beschrijft hoe hij na weken als das leven de trein weer als overweldigend ervoer — vergelijkbaar met de eerste treinreizigers.", model: "Decentreren overeenkomst: zowel Foster als de eerste treinreizigers ervaren dat de trein hun waarneming verstoort — de zintuigen kunnen de ervaring niet plaatsen. (1p)\nRecentreren overeenkomst: in beide gevallen wennen de zintuigen aan de treinervaring — het landschap wordt ‘normaal’. (1p)\nRecentreren verschil: bij Kockelkoren is recentreren positief (nieuwe blik), bij Foster juist negatief — hij verliest de rijke zintuiglijke ervaring van het dassenleven. (1p)", kwestie: 3, et: "ET 15" },
  { year: "2024-T2", nr: 23, points: 1, question: "Beargumenteer of de les die Foster trekt uit zijn leven als das aansluit bij Haraways pleidooi voor ‘staying with the trouble’.", context: "Casus ‘Leven als das’: Foster concludeert dat het dassenleven hem bewuster maakte van de verwevenheid van mens en natuur.", model: "Ja: Foster neemt verantwoordelijkheid door zich te verbinden met het dassenleven en daaruit te leren voor zijn menselijk bestaan — dit past bij Haraways oproep om in het rommelige heden met andere soorten samen te leven. OF Nee: Foster trekt zich juist terug uit de ‘trouble’ door weer mens te worden. (1p)", kwestie: 4, et: "ET 18" },

  // EXAMEN 2024-T1 — Extra vragen
  { year: "2024-T1", nr: 15, points: 2, question: "Leg uit wat Harari bedoelt met dataïsme en waarom dit volgens Rasch problematisch is.", context: "Casus over kunstmatige intelligentie en de toekomst van data. In de tekst wordt beschreven hoe algoritmes steeds meer beslissingen nemen over ons leven.", model: "Harari: dataïsme is de opvatting dat data de ultieme bron van waarde en autoriteit is. Algoritmes zouden ons beter begrijpen dan wijzelf. (1p)\nRasch: problematisch omdat bij elke datareductie altijd iets verloren gaat (‘het else’). De kloof tussen data en werkelijkheid laat ruimte voor wat niet in data te vangen is. (1p)", kwestie: 4, et: "ET 23" },
  { year: "2024-T1", nr: 8, points: 2, question: "Leg uit hoe Verbeeks begrip technologische bemiddeling van toepassing is op de echoscopie. Gebruik de begrippen waarneming en handelen.", context: "Casus over medische technologie: de echoscopie maakt de ongeboren foetus zichtbaar en verandert daarmee de ervaring van zwangerschap.", model: "De echoscopie bemiddelt de waarneming: de foetus wordt zichtbaar als medisch object met meetbare eigenschappen (1p). Dit bemiddelt ook het handelen: ouders en artsen nemen beslissingen op basis van echo-beelden die zonder de technologie niet genomen zouden worden (1p).", kwestie: 3, et: "ET 16" },
  { year: "2025-T1", nr: 13, points: 2, question: "Leg uit hoe Haraways begrip ‘response-ability’ van toepassing is op Menzo’s danswerk.", context: "Casus ‘Afrofuturisme’: Danseres Menzo reageert met haar dans op de objectivering van het zwarte lichaam en zoekt nieuwe vormen van verbinding.", model: "Response-ability (Haraway): het vermogen én de plicht om te antwoorden op andere wezens. (1p)\nMenzo beantwoordt met haar dans de objectiverende blik: ze neemt verantwoordelijkheid door actief te reageren op de manier waarop het zwarte lichaam wordt bekeken en creëert daarmee nieuwe vormen van verbinding. (1p)", kwestie: 4, et: "ET 18" },
];

const ALGEMENE_EINDTERMEN = [
  { nr: 1, text: "De filosofische vraag naar de mens benaderen vanuit de rol van wetenschap en techniek." },
  { nr: 2, text: "Begripsanalyse maken van ‘het wezen van de mens’, ‘lichaam’ en ‘techniek’." },
  { nr: 3, text: "Verschillende manieren waarop wetenschap en techniek de vraag naar de mens beïnvloeden herkennen, uitleggen, vergelijken, toepassen en evalueren." },
  { nr: 4, text: "Uitleggen dat de vraag naar het wezen van de mens op twee manieren (mensbeeld of bestaanservaring) kan worden opgevat." },
];

// ============================================================
// COMPONENTS
// ============================================================

function KwestieTag({ kwestie, small }) {
  if (kwestie === 0) {
    return (
      <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: small ? "10px" : "11px", fontWeight: 700, background: "#90909020", color: "#666", letterSpacing: "0.5px" }}>ALG</span>
    );
  }
  const d = DOMEINEN.find(d => d.id === kwestie);
  if (d) {
    return (
      <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: small ? "10px" : "11px", fontWeight: 700, background: `${d.color}20`, color: d.color, letterSpacing: "0.5px" }}>{d.id}</span>
    );
  }
  const k = KWESTIES.find(k => k.id === kwestie);
  if (!k) return null;
  return (
    <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: small ? "10px" : "11px", fontWeight: 700, background: `${k.color}20`, color: k.color, letterSpacing: "0.5px" }}>K{k.id}</span>
  );
}

function Home({ setView, progress }) {
  const totalFlash = FLASHCARDS.length;
  const seenFlash = (progress.seenCards || []).length;
  const quizScores = progress.quizScores || [];
  const quizBest = quizScores.length > 0 ? Math.max(...quizScores.map(s => s.pct)) : 0;
  const examDone = Object.values(progress.examTracker || {}).filter(v => v === "goed" || v === "lastig").length;

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
          🏛️ Filosofie VWO 2026
        </h1>
        <p style={{ color: "#666", fontSize: "14px", margin: "8px 0 0", fontFamily: "'Source Sans 3', sans-serif" }}>
          De vraag naar de mens in relatie tot techniek en wetenschap
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {[
          { icon: "🎴", label: "Flashcards", sub: `${seenFlash}/${totalFlash} gezien`, view: "flashcards", bg: "#f0f4ff" },
          { icon: "❓", label: "Quiz", sub: quizBest > 0 ? `Beste: ${quizBest}%` : "Test je kennis", view: "quiz", bg: "#fff5f0" },
          { icon: "🔍", label: "Examenvragen", sub: examDone > 0 ? `${examDone}/${EXAM_QUESTIONS.length} gedaan` : `${EXAM_QUESTIONS.length} vragen`, view: "exam", bg: "#f0fff5" },
          { icon: "👤", label: "Filosofen", sub: `${FILOSOFEN.length} denkers`, view: "filosofen", bg: "#faf0ff" },
        ].map(item => (
          <button key={item.view} onClick={() => setView(item.view)} style={{
            background: item.bg, border: "1px solid #e8e8f0", borderRadius: "12px", padding: "20px 16px",
            cursor: "pointer", textAlign: "left", transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
          onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{item.sub}</div>
          </button>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#1a1a2e", margin: "28px 0 12px" }}>
        De vier kwesties
      </h2>
      {KWESTIES.map(k => (
        <button key={k.id} onClick={() => setView(`kwestie-${k.id}`)} style={{
          display: "block", width: "100%", background: "#fff", border: `2px solid ${k.color}22`,
          borderLeft: `4px solid ${k.color}`, borderRadius: "8px", padding: "14px 16px",
          marginBottom: "10px", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s",
        }}
        onMouseOver={e => e.currentTarget.style.borderColor = k.color}
        onMouseOut={e => { e.currentTarget.style.borderColor = `${k.color}22`; e.currentTarget.style.borderLeftColor = k.color; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ background: k.color, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>{k.id}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{k.title}</div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{k.chapters} · {k.eindtermen}</div>
            </div>
          </div>
        </button>
      ))}

      <div style={{ marginTop: "24px", padding: "16px", background: "#f8f8fc", borderRadius: "10px", border: "1px solid #e8e8f0" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px", fontFamily: "'Source Sans 3', sans-serif" }}>📊 Studietip</h3>
        <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: 1.5 }}>
          90% gaat over de syllabus, waarin de bijbehorende eindtermen centraal staan. Focus daar in eerste instantie op. 10% gaat over de globale eindtermen over antropologie, ethiek, kennistheorie en wetenschapsfilosofie.
        </p>
      </div>
    </div>
  );
}

// --- FLASHCARDS ---
function Flashcards({ progress, setProgress }) {
  const [filter, setFilter] = useState(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = filter === null ? FLASHCARDS : FLASHCARDS.filter(c => c.kwestie === filter);

  const markSeen = useCallback((i) => {
    const card = cards[i];
    if (!card) return;
    const key = card.term;
    setProgress(prev => {
      const seen = prev.seenCards || [];
      if (!seen.includes(key)) return { ...prev, seenCards: [...seen, key] };
      return prev;
    });
  }, [cards, setProgress]);

  const next = () => { setFlipped(false); markSeen(idx); setIdx(i => (i + 1) % cards.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + cards.length) % cards.length); };

  if (cards.length === 0) return <p style={{ padding: "40px 20px", textAlign: "center", color: "#888" }}>Geen kaarten voor deze selectie.</p>;

  const card = cards[idx];
  const kwestieColor = card.kwestie === 0 ? "#666" : (KWESTIES.find(k => k.id === card.kwestie)?.color || DOMEINEN.find(d => d.id === card.kwestie)?.color || "#1a1a2e");
  const isSeen = (progress.seenCards || []).includes(card.term);

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[
          { id: null, label: "Alle" },
          { id: 0, label: "Alg." },
          ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` })),
          ...DOMEINEN.map(d => ({ id: d.id, label: d.id })),
        ].map(f => {
          const activeColor = f.id === null ? "#1a1a2e" : f.id === 0 ? "#666" : KWESTIES.find(k => k.id === f.id)?.color || DOMEINEN.find(d => d.id === f.id)?.color || "#1a1a2e";
          return (
          <button key={String(f.id)} onClick={() => { setFilter(f.id); setIdx(0); setFlipped(false); }} style={{
            padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? activeColor : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
          );
        })}
      </div>

      <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "12px" }}>
        {idx + 1} / {cards.length} {isSeen && <span style={{ color: "#4AD97A" }}>{"✔"} gezien</span>}
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          background: flipped ? "#fff" : kwestieColor,
          color: flipped ? "#1a1a2e" : "#fff",
          borderRadius: "16px", padding: "32px 24px", minHeight: "200px",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          cursor: "pointer", transition: "all 0.3s ease",
          border: flipped ? `2px solid ${kwestieColor}` : "2px solid transparent",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center",
        }}
      >
        {!flipped ? (
          <>
            <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>{card.term}</div>
            <div style={{ fontSize: "11px", marginTop: "16px", opacity: 0.7 }}>Tik om te draaien</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.5, marginBottom: "12px" }}>Definitie</div>
            <div style={{ fontSize: "15px", lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" }}>{card.def}</div>
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        <button onClick={prev} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e0e0e8", background: "#fff", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"←"}</button>
        <button onClick={next} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e0e0e8", background: "#fff", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"→"}</button>
      </div>
    </div>
  );
}

// --- QUIZ ---
function Quiz({ progress, setProgress }) {
  const [filter, setFilter] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const questions = filter === 0 ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.kwestie === filter);

  const selected = answers[current] ?? null;
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  const restart = () => { setCurrent(0); setAnswers([]); setFinished(false); };

  const handleAnswer = (optIdx) => {
    if (selected !== null) return;
    setAnswers(prev => { const next = [...prev]; next[current] = optIdx; return next; });
  };

  const prevQ = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const nextQ = () => {
    if (current + 1 >= questions.length) {
      const finalScore = answers.filter((a, i) => a === questions[i]?.correct).length + (selected === questions[current].correct ? (answers[current] == null ? 1 : 0) : 0);
      const finalPct = Math.round(score / questions.length * 100);
      setProgress(prev => ({
        ...prev,
        quizScores: [...(prev.quizScores || []), { pct: finalPct, date: new Date().toISOString(), kwestie: filter }]
      }));
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  if (questions.length === 0) return <p style={{ padding: "40px 20px", textAlign: "center", color: "#888" }}>Geen vragen voor deze selectie.</p>;

  if (finished) {
    const pct = Math.round(score / questions.length * 100);
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>{pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#1a1a2e" }}>
          {score} / {questions.length} correct ({pct}%)
        </h2>
        <p style={{ color: "#888", fontSize: "14px", marginTop: "8px" }}>
          {pct >= 70 ? "Uitstekend! Je beheerst de stof goed." : pct >= 50 ? "Goed op weg! Bestudeer de begrippen die je miste." : "Blijf oefenen — herhaal de flashcards per kwestie."}
        </p>
        <button onClick={restart} style={{ marginTop: "24px", padding: "12px 32px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
          Opnieuw
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[
          { id: 0, label: "Alle" },
          ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` })),
          ...DOMEINEN.map(d => ({ id: d.id, label: d.id })),
        ].map(f => {
          const activeColor = f.id === 0 ? "#1a1a2e" : KWESTIES.find(k => k.id === f.id)?.color || DOMEINEN.find(d => d.id === f.id)?.color || "#1a1a2e";
          return (
          <button key={String(f.id)} onClick={() => { setFilter(f.id); restart(); }} style={{
            padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? activeColor : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12px", color: "#888" }}>Vraag {current + 1}/{questions.length}</span>
        <KwestieTag kwestie={q.kwestie} small />
      </div>

      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
        <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a2e", margin: 0, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{q.q}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {q.options.map((opt, i) => {
          let bg = "#fff"; let border = "#e0e0e8"; let color = "#1a1a2e";
          if (selected !== null) {
            if (i === q.correct) { bg = "#e8f5e9"; border = "#4caf50"; color = "#2e7d32"; }
            else if (i === selected) { bg = "#fce4ec"; border = "#ef5350"; color = "#c62828"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} style={{
              padding: "14px 16px", background: bg, border: `2px solid ${border}`, borderRadius: "10px",
              cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontSize: "14px", color,
              fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.2s",
              fontWeight: selected !== null && i === q.correct ? 600 : 400,
            }}>
              <span style={{ fontWeight: 700, marginRight: "8px", opacity: 0.5 }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ marginTop: "16px", padding: "16px", background: selected === q.correct ? "#e8f5e9" : "#fff3e0", borderRadius: "10px", border: `1px solid ${selected === q.correct ? "#a5d6a7" : "#ffcc80"}` }}>
          <p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: 1.5 }}>
            <strong>{selected === q.correct ? "✔ Correct!" : "✘ Helaas."}</strong> {q.explanation}
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            {current > 0 && (
              <button onClick={prevQ} style={{ padding: "10px 24px", background: "#fff", color: "#1a1a2e", border: "2px solid #e0e0e8", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                ← Vorige
              </button>
            )}
            <button onClick={nextQ} style={{ padding: "10px 24px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              {current + 1 >= questions.length ? "Bekijk resultaat" : "Volgende vraag →"}
            </button>
          </div>
        </div>
      )}

      {selected === null && current > 0 && (
        <button onClick={prevQ} style={{ marginTop: "16px", padding: "10px 24px", background: "#fff", color: "#1a1a2e", border: "2px solid #e0e0e8", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
          ← Vorige
        </button>
      )}
    </div>
  );
}

// --- EXAM QUESTIONS (v4.2: context boven de vraag, altijd zichtbaar) ---
function ExamQuestions({ progress, setProgress }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [filter, setFilter] = useState(0);

  const examTracker = progress.examTracker || {};

  const getKey = (eq) => `${eq.year}-${eq.nr}`;

  const setStatus = (eq, status) => {
    const key = getKey(eq);
    setProgress(prev => {
      const tracker = { ...(prev.examTracker || {}) };
      tracker[key] = tracker[key] === status ? null : status;
      return { ...prev, examTracker: tracker };
    });
  };

  const questions = filter === 0 ? EXAM_QUESTIONS : EXAM_QUESTIONS.filter(q => q.kwestie === filter);

  const totalDone = Object.values(examTracker).filter(v => v === "goed" || v === "lastig").length;
  const totalGoed = Object.values(examTracker).filter(v => v === "goed").length;
  const totalLastig = Object.values(examTracker).filter(v => v === "lastig").length;

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <p style={{ fontSize: "13px", color: "#888", margin: "16px 0" }}>
        Echte examenvragen uit 2024 en 2025 met correctiemodel. Oefen met het formuleren van antwoorden!
      </p>

      {totalDone > 0 && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", padding: "12px 16px", background: "#f8f8fc", borderRadius: "10px", border: "1px solid #e8e8f0" }}>
          <div style={{ fontSize: "12px", color: "#888" }}>
            <strong style={{ color: "#1a1a2e" }}>{totalDone}/{EXAM_QUESTIONS.length}</strong> gedaan
          </div>
          <div style={{ fontSize: "12px", color: "#4caf50" }}>
            ✔ {totalGoed} goed
          </div>
          <div style={{ fontSize: "12px", color: "#ef5350" }}>
            ✗ {totalLastig} lastig
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
        {[{ id: 0, label: "Alle" }, ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` }))].map(f => (
          <button key={f.id} onClick={() => { setFilter(f.id); setOpenIdx(null); }} style={{
            padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>

      {questions.map((eq, i) => {
        const key = getKey(eq);
        const status = examTracker[key];
        const borderLeft = status === "goed" ? "4px solid #4caf50" : status === "lastig" ? "4px solid #ef5350" : "4px solid transparent";

        return (
        <div key={i} style={{ marginBottom: "16px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "10px", overflow: "hidden", borderLeft }}>
          {/* Casus context - always visible */}
          {eq.context && (
            <div style={{ padding: "12px 16px", background: "#f0f0ff", borderBottom: "1px solid #e0e0f0" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#6B5CFF", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Casus</div>
              <p style={{ fontSize: "12px", color: "#555", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{eq.context}</p>
            </div>
          )}

          {/* Question */}
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
            width: "100%", padding: "16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#888", background: "#f0f0f5", padding: "2px 8px", borderRadius: "4px" }}>{eq.year}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#1a1a2e" }}>Vr. {eq.nr}</span>
                <span style={{ fontSize: "11px", color: "#888" }}>{eq.points}p</span>
                <KwestieTag kwestie={eq.kwestie} small />
                <span style={{ fontSize: "10px", color: "#aaa" }}>{eq.et}</span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", margin: 0, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{eq.question}</p>
            </div>
            <span style={{ fontSize: "18px", color: "#ccc", flexShrink: 0, transform: openIdx === i ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>{"▾"}</span>
          </button>

          {/* Model answer */}
          {openIdx === i && (
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f0f0f5" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#2D8E5A", textTransform: "uppercase", letterSpacing: "0.5px", margin: "12px 0 8px" }}>Modelantwoord</div>
              <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif", whiteSpace: "pre-wrap" }}>
                {eq.model}
              </div>
            </div>
          )}

          {/* Tracker buttons */}
          <div style={{ display: "flex", gap: "8px", padding: "10px 16px", borderTop: "1px solid #f0f0f5", background: "#fafafe" }}>
            <button onClick={() => setStatus(eq, "goed")} style={{
              flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              border: status === "goed" ? "2px solid #4caf50" : "1px solid #e0e0e8",
              background: status === "goed" ? "#e8f5e9" : "#fff",
              color: status === "goed" ? "#2e7d32" : "#888",
            }}>✔ Goed</button>
            <button onClick={() => setStatus(eq, "lastig")} style={{
              flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              border: status === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
              background: status === "lastig" ? "#fce4ec" : "#fff",
              color: status === "lastig" ? "#c62828" : "#888",
            }}>✗ Lastig</button>
          </div>
        </div>
        );
      })}
    </div>
  );
}

// --- FILOSOFEN ---
function FilosofenView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(0);

  const list = filter === 0 ? FILOSOFEN : FILOSOFEN.filter(f => f.kwestie === filter);

  if (selected) {
    const f = selected;
    const k = KWESTIES.find(k => k.id === f.kwestie);
    return (
      <div style={{ padding: "0 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#888", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"←"} Terug</button>
        <div style={{ background: k?.color || "#1a1a2e", color: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          <KwestieTag kwestie={f.kwestie} small />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", margin: "12px 0 4px" }}>{f.name}</h2>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>{f.et}</div>
        </div>
        <div style={{ padding: "16px", background: "#f8f8fc", borderRadius: "10px", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" }}>Kernpositie</h3>
          <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{f.kern}</p>
        </div>
        <div style={{ padding: "16px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "10px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 10px", color: "#1a1a2e" }}>Kernbegrippen</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {f.begrippen.map(b => (
              <span key={b} style={{ background: `${k?.color}15`, color: k?.color, border: `1px solid ${k?.color}30`, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[{ id: 0, label: "Alle" }, ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` }))].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map(f => {
          const k = KWESTIES.find(k => k.id === f.kwestie);
          return (
            <button key={f.name} onClick={() => setSelected(f)} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
              background: "#fff", border: "1px solid #e8e8f0", borderRadius: "10px",
              cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = ""}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: k?.color || "#ccc", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", flexShrink: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                {f.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{f.name}</div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.et} · {f.begrippen.slice(0, 3).join(", ")}</div>
              </div>
              <KwestieTag kwestie={f.kwestie} small />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- KWESTIE DETAIL ---
function KwestieDetail({ id }) {
  const k = KWESTIES.find(k => k.id === id);
  const filosofen = FILOSOFEN.filter(f => f.kwestie === id);
  const begrippen = FLASHCARDS.filter(f => f.kwestie === id);
  const examQ = EXAM_QUESTIONS.filter(eq => eq.kwestie === id);

  const eindtermenMap = {
    1: [
      { nr: 5, text: "Opvattingen van Descartes, Sheets-Johnstone, Plessner, De Beauvoir en Fanon over de vraag naar de mens uitleggen, vergelijken, toepassen en evalueren." },
      { nr: 6, text: "Uitleggen dat mensen volgens Sheets-Johnstone een reflecterend, bewegend lichaam zijn (pre-reflectief, lichaamsschema, tekstfragment 1)." },
      { nr: 7, text: "Uitleggen dat volgens Plessner mensen in een verhouding tot zichzelf staan (excentrische positionaliteit, drie wetten)." },
      { nr: 8, text: "Uitleggen dat volgens De Beauvoir mensen lichamelijk in verhouding tot anderen staan (situatie, geleefde ervaring)." },
      { nr: 9, text: "Uitleggen dat volgens Fanon de bestaanservaring van mensen van kleur wordt gevormd door de blik van de ander (raciaal-epidermaal schema)." },
    ],
    2: [
      { nr: 10, text: "Uitleggen dat volgens Lakoff & Johnson metaforen en ervaringen elkaar wederzijds beïnvloeden (oriënterende metafoor, ontologische metafoor)." },
      { nr: 11, text: "Uitleggen dat de ‘wij zijn ons brein’-these het brein als computer voorstelt (computationalisme, functionalisme, Dreyfus’ kritiek)." },
      { nr: 12, text: "Uitleggen dat 4E-cognitie stelt dat we niet alleen met ons brein denken maar ook met lichaam in omgeving (embodied, embedded, extended, enactive)." },
    ],
    3: [
      { nr: 13, text: "Opvattingen van Clark, Kockelkoren, Verbeek en De Mul over de vraag of het wezen van de mens verandert door techniek uitleggen, vergelijken, toepassen en evalueren." },
      { nr: 14, text: "Uitleggen dat volgens Clark mensen van nature technologische wezens zijn (natural-born cyborg, interface, dynamische apparaten)." },
      { nr: 15, text: "Uitleggen dat volgens Kockelkoren techniek de zintuiglijke ervaring verandert (decentreren, recentreren)." },
      { nr: 16, text: "Uitleggen dat volgens Verbeek techniek het moreel oordeelsvermogen verandert (technologische bemiddeling)." },
      { nr: 17, text: "Uitleggen dat volgens De Mul hedendaagse techniek de menselijke identiteit verandert (humanisme, NBIN, drie scenario’s)." },
    ],
    4: [
      { nr: 18, text: "Opvattingen van Haraway, Morton, Despret, Latour, Hayles, Barad, Harari en Rasch over grensvervagingen uitleggen, vergelijken, toepassen en evalueren." },
      { nr: 19, text: "Uitleggen dat volgens Morton/Despret de grens mens-dier vervaagt (the mesh, ecologisch denken, dierlijke agency)." },
      { nr: 20, text: "Uitleggen dat volgens Despret/Haraway we op een andere manier met dieren moeten omgaan." },
      { nr: 21, text: "Uitleggen dat volgens Latour/Hayles de grens levend/niet-levend vervaagt (actant, ANT, unthought, cognitieve assemblage)." },
      { nr: 22, text: "Uitleggen dat volgens Barad de grens fysiek/niet-fysiek vervaagt (intra-actie, agentieel realisme)." },
      { nr: 23, text: "Uitleggen en evalueren dat volgens Harari/Rasch data en mens vervlechten (dataïsme, het else)." },
    ],
  };

  const ets = eindtermenMap[id] || [];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ background: k.color, color: "#fff", borderRadius: "16px", padding: "24px", margin: "16px 0 20px" }}>
        <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "4px" }}>Kwestie {k.id}</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", margin: "0 0 8px", lineHeight: 1.2 }}>{k.title}</h2>
        <p style={{ fontSize: "13px", opacity: 0.8, margin: 0 }}>{k.chapters} · {k.eindtermen}</p>
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>{"📋"} Eindtermen (examenrelevant!)</h3>
      {ets.map(et => (
        <div key={et.nr} style={{ marginBottom: "6px", padding: "12px", background: "#f8f8fc", borderRadius: "8px", border: "1px solid #e8e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: k.color }}>ET {et.nr}</div>
          <p style={{ fontSize: "13px", color: "#333", margin: "4px 0 0", lineHeight: 1.4 }}>{et.text}</p>
        </div>
      ))}

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"👤"} Filosofen ({filosofen.length})</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {filosofen.map(f => (
          <span key={f.name} style={{ background: `${k.color}15`, color: k.color, padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600 }}>{f.name}</span>
        ))}
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🎴"} Begrippen ({begrippen.length})</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {begrippen.map(b => (
          <span key={b.term} style={{ background: "#f0f0f5", color: "#555", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>{b.term}</span>
        ))}
      </div>

      {examQ.length > 0 && (
        <>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🔍"} Examenvragen ({examQ.length})</h3>
          {examQ.map((eq, i) => (
            <div key={i} style={{ marginBottom: "6px", padding: "10px 12px", background: "#fff5f0", borderRadius: "8px", fontSize: "13px", color: "#333" }}>
              <span style={{ fontWeight: 600 }}>{eq.year} vr.{eq.nr}</span> ({eq.points}p) — {eq.question.substring(0, 80)}...
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// --- EINDTERMEN OVERVIEW ---
function EindtermenView() {
  return (
    <div style={{ padding: "0 20px 40px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#1a1a2e", margin: "20px 0 8px" }}>Algemene eindtermen (ET 1–4)</h2>
      {ALGEMENE_EINDTERMEN.map(et => (
        <div key={et.nr} style={{ padding: "12px", background: "#f8f8fc", borderRadius: "8px", border: "1px solid #e8e8f0", marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a2e" }}>ET {et.nr}</div>
          <p style={{ fontSize: "13px", color: "#333", margin: "4px 0 0", lineHeight: 1.4 }}>{et.text}</p>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#1a1a2e", margin: "28px 0 12px" }}>Specifieke eindtermen per kwestie</h2>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>90% van het examen. De syllabus met bijbehorende eindtermen.</p>
      {KWESTIES.map(k => (
        <div key={k.id} style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ background: k.color, color: "#fff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px" }}>{k.id}</span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>{k.title}</span>
          </div>
          <div style={{ fontSize: "12px", color: "#888", paddingLeft: "32px" }}>{k.eindtermen}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [view, setView] = useState("home");
  const [progress, setProgress] = useState({ seenCards: [], quizScores: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("filosofie-progress");
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("filosofie-progress", JSON.stringify(progress));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  }, [progress, loaded]);

  const viewTitles = {
    home: "Studieapp",
    flashcards: "Flashcards",
    quiz: "Quiz",
    exam: "Examenvragen",
    filosofen: "Filosofen",
    eindtermen: "Eindtermen",
  };

  const isKwestie = view.startsWith("kwestie-");
  const kwestieId = isKwestie ? parseInt(view.split("-")[1]) : null;
  const title = isKwestie ? `Kwestie ${kwestieId}` : (viewTitles[view] || "Studieapp");

  const renderView = () => {
    if (isKwestie) return <KwestieDetail id={kwestieId} />;
    switch (view) {
      case "flashcards": return <Flashcards progress={progress} setProgress={setProgress} />;
      case "quiz": return <Quiz progress={progress} setProgress={setProgress} />;
      case "exam": return <ExamQuestions progress={progress} setProgress={setProgress} />;
      case "filosofen": return <FilosofenView />;
      case "eindtermen": return <EindtermenView />;
      default: return <Home setView={setView} progress={progress} />;
    }
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", minHeight: "100vh", background: "#fff", fontFamily: "'Source Sans 3', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #f0f0f5", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        {view !== "home" && (
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#888", padding: "4px" }}>{"←"}</button>
        )}
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{title}</span>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setView("eindtermen")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#888", textDecoration: "underline" }}>ET</button>
        </div>
      </div>

      {renderView()}

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)",
        borderTop: "1px solid #f0f0f5", display: "flex", justifyContent: "space-around",
        padding: "8px 0 12px", maxWidth: "520px", margin: "0 auto",
      }}>
        {[
          { icon: "🏠", label: "Home", v: "home" },
          { icon: "🎴", label: "Cards", v: "flashcards" },
          { icon: "❓", label: "Quiz", v: "quiz" },
          { icon: "🔍", label: "Examen", v: "exam" },
          { icon: "👤", label: "Denkers", v: "filosofen" },
        ].map(nav => (
          <button key={nav.v} onClick={() => setView(nav.v)} style={{
            background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "4px 8px",
            opacity: view === nav.v ? 1 : 0.5, transition: "opacity 0.2s",
          }}>
            <span style={{ fontSize: "20px" }}>{nav.icon}</span>
            <span style={{ fontSize: "10px", fontWeight: 600, color: "#1a1a2e" }}>{nav.label}</span>
          </button>
        ))}
      </div>

      <div style={{ height: "70px" }} />
    </div>
  );
}
