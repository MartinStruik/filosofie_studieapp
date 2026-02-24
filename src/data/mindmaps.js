// Mindmap data: interactieve denkschema's per kwestie en als bonus bij teksten/rode draad
// Geüpdatet met Gemini's didactische structuur: brugpijlen, categorieën, examinfo
// Edge styles: "normal" (standaard), "dashed" (verband), "bridge" (didactische brugpijl, dik)
// Node types: "central", "filosoof", "concept", "label", "kwestie", "category"

// === EXAMINFO PER FILOSOOF (bottom-sheet data) ===
export const FILOSOOF_EXAMINFO = {
  descartes: {
    naam: "René Descartes",
    stelling: "De mens bestaat uit twee gescheiden substanties: een denkend bewustzijn (res cogitans) en een mechanisch lichaam (res extensa).",
    kernbegrippen: ["Dualisme", "Res cogitans / res extensa", "Methodische twijfel", "Cogito ergo sum"],
    argumenten: [
      "Via methodische twijfel komt Descartes tot het cogito: het enige dat niet te betwijfelen is, is dat ik denk.",
      "Het lichaam is een machine die werkt volgens natuurwetten; de geest is immaterieel en vrij.",
      "Ethische implicatie: dieren hebben alleen res extensa (geen geest), en mogen daarom als machines worden behandeld."
    ],
    voorbeeld: "Een robot kan bewegen als een mens, maar mist bewustzijn — dat is het verschil tussen res extensa en res cogitans.",
    kritiek: "Hoe kunnen twee totaal verschillende substanties (geest en lichaam) op elkaar inwerken? Het interactieprobleem blijft onopgelost.",
    vergelijkMet: { id: "sheets", label: "Sheets-Johnstone", tekst: "Sheets-Johnstone keert Descartes om: het lichaam denkt niet ná de geest, maar de geest begint bij het lichaam (pre-reflectief bewustzijn)." },
  },
  sheets: {
    naam: "Maxine Sheets-Johnstone",
    stelling: "Bewustzijn begint niet bij het denken maar bij de pre-reflectieve lichamelijke gewaarwording.",
    kernbegrippen: ["Pre-reflectief bewustzijn", "Lichaamsschema", "Fenomenologie", "Dans"],
    argumenten: [
      "De danser beoordeelt haar bewegingen niet van buitenaf maar beleeft ze van binnenuit — vóór elke reflectie.",
      "Het lichaamsschema brengt alle houdingen samen tot een geheel van 'hier-zijn'."
    ],
    voorbeeld: "Een danser die een dans componeert: zij moet de vorm eerst beleven voordat ze erop kan reflecteren.",
    kritiek: "Is pre-reflectief bewustzijn empirisch meetbaar? Of blijft het een filosofische aanname?",
    vergelijkMet: { id: "fanon", label: "Fanon", tekst: "Fanon laat zien dat het lichaamsschema verstoord kan worden door racisme — het raciaal-epidermaal schema overschrijft de 'neutrale' lichamelijke ervaring." },
  },
  plessner: {
    naam: "Helmuth Plessner",
    stelling: "De mens is excentrisch gepositioneerd: hij heeft een lichaam én is een lichaam, en kan buiten zichzelf treden.",
    kernbegrippen: ["Excentrische positionaliteit", "Bemiddelde onmiddellijkheid", "Natuurlijke kunstmatigheid", "Utopische standplaats"],
    argumenten: [
      "Dieren zijn centrisch (opgaan in hun omgeving), de mens is excentrisch (kan afstand nemen van zichzelf).",
      "Lachen en wenen zijn grenservaringen waar het lichaam de regie overneemt van de geest."
    ],
    voorbeeld: "Je schaamt je (geest) en bloost (lichaam): je hebt je lichaam niet onder controle. Dat is excentrische positionaliteit in actie.",
    kritiek: "Is excentrische positionaliteit uniek menselijk? Sommige primaten lijken ook zelfreflectie te vertonen.",
    vergelijkMet: { id: "beauvoir", label: "De Beauvoir", tekst: "Plessners 'medewereld' (expressie naar anderen) opent de deur voor De Beauvoir: de ander bepaalt mede wie je bent." },
  },
  beauvoir: {
    naam: "Simone de Beauvoir",
    stelling: "'Men wordt niet als vrouw geboren, men wordt het.' Identiteit is geen biologisch lot maar een sociale constructie.",
    kernbegrippen: ["Situatie", "Geleefde ervaring", "De ander", "Vrouwwording"],
    argumenten: [
      "Het lichaam is een situatie, niet een lot: wat het 'betekent' vrouw te zijn wordt bepaald door taal, verwachtingen en machtsstructuren.",
      "Vrijheid is niet de afwezigheid van beperkingen, maar hoe je je verhoudt tot je situatie."
    ],
    voorbeeld: "Een meisje leert 'vrouwelijk' gedrag niet uit haar lichaam maar uit de verwachtingen van haar omgeving.",
    kritiek: "Als identiteit volledig sociaal geconstrueerd is, hoe verklaar je dan lichamelijke ervaringen die niet cultureel bepaald lijken?",
    vergelijkMet: { id: "haraway", label: "Haraway", tekst: "Haraway past hetzelfde constructivisme radicaler toe: niet alleen gender, maar ook de grens mens/dier/machine is een constructie." },
  },
  fanon: {
    naam: "Frantz Fanon",
    stelling: "De 'blik van de witte ander' objectiveert het zwarte lichaam en dwingt een raciaal schema op.",
    kernbegrippen: ["Historisch lichaamsschema", "Raciaal-epidermaal schema", "Objectivering", "Vervreemding"],
    argumenten: [
      "Het historisch lichaamsschema (hoe je je lichaam normaal ervaart) wordt verstoord door racisme.",
      "Het raciaal-epidermaal schema wordt van buitenaf opgelegd: je huid wordt je identiteit."
    ],
    voorbeeld: "'Kijk, een neger!' — één zin die Fanons hele lichamelijke zelfervaring verstoort en hem reduceert tot zijn huidskleur.",
    kritiek: "Fanon schrijft vanuit mannelijk perspectief; De Beauvoir vult aan met genderconstructie.",
    vergelijkMet: { id: "sheets", label: "Sheets-Johnstone", tekst: "Fanon verstoort precies het 'neutrale' lichaamsschema dat Sheets-Johnstone beschrijft — racisme overschrijft de pre-reflectieve ervaring." },
  },
  lakoff: {
    naam: "Lakoff & Johnson",
    stelling: "Ons denken wordt onbewust gestructureerd door metaforen die geworteld zijn in lichamelijke ervaring.",
    kernbegrippen: ["Oriënterende metafoor", "Ontologische metafoor", "Belichaamde cognitie", "Conceptuele metafoor"],
    argumenten: [
      "Oriënterende metaforen (boven=goed, onder=slecht) komen voort uit lichamelijke ervaring: rechtop staan = gezond.",
      "Ontologische metaforen behandelen abstracte dingen als concrete objecten ('tijd is geld')."
    ],
    voorbeeld: "'Ik voel me down' (onder=slecht) en 'dingen gaan bergopwaarts' (boven=goed) — lichamelijke metaforen sturen ons denken.",
    kritiek: "Als alle denken metaforisch is, is objectieve kennis dan onmogelijk?",
    vergelijkMet: { id: "vroon", label: "Vroon & Draaisma", tekst: "Lakoff toont dat metaforen ons denken structureren; Vroon & Draaisma laten zien dat de dominante metafoor verschuift met de techniek van de tijd." },
  },
  vroon: {
    naam: "Vroon & Draaisma",
    stelling: "Het mensbeeld verandert mee met de dominante techniek van de tijd — nu: de computermetafoor.",
    kernbegrippen: ["Historische contingentie", "Computermetafoor", "Theoriegeladenheid"],
    argumenten: [
      "Elke tijd heeft een eigen metafoor voor de geest: klok (17e eeuw), stoommachine (19e), computer (20e).",
      "De metafoor bepaalt niet alleen hoe we de mens beschrijven, maar ook wat we over onszelf kunnen denken."
    ],
    voorbeeld: "In de 17e eeuw was het lichaam een 'klokwerk'; nu zeggen we dat het brein 'informatie verwerkt'.",
    kritiek: "Als elke metafoor tijdgebonden is, is onze huidige computermetafoor dan ook maar tijdelijk?",
    vergelijkMet: { id: "swaab", label: "Swaab", tekst: "Swaab neemt de computermetafoor letterlijk ('wij zijn ons brein'); Vroon & Draaisma waarschuwen dat dit slechts de metafoor van onze tijd is." },
  },
  swaab: {
    naam: "Dick Swaab",
    stelling: "'Wij zijn ons brein' — de geest is volledig reduceerbaar tot hersenprocessen en informatieverwerking.",
    kernbegrippen: ["Computationalisme", "Functionalisme", "Brein-als-computer", "Neurowetenschappen"],
    argumenten: [
      "Alle bewuste ervaringen corresponderen met meetbare hersenactiviteit.",
      "De geest is wat het brein doet, zoals vertering is wat de maag doet (functionalisme)."
    ],
    voorbeeld: "Verliefheid is geen mysterie maar een cocktail van dopamine en oxytocine in specifieke hersengebieden.",
    kritiek: "Dreyfus: je kunt niet alles reduceren tot symboolmanipulatie. Het lichaam, de context en emoties zijn onmisbaar voor intelligent gedrag.",
    vergelijkMet: { id: "dreyfus", label: "Dreyfus", tekst: "Dreyfus' drie problemen (lichaam, context, emotie) ondermijnen Swaabs claim dat de geest 'berekening' is." },
  },
  dreyfus: {
    naam: "Hubert Dreyfus",
    stelling: "Menselijk denken is niet reduceerbaar tot symboolmanipulatie — het lichaam, de context en emoties zijn onmisbaar.",
    kernbegrippen: ["Kritiek op AI", "Belichaamd denken", "Drie problemen", "Weten-hoe vs. weten-dat"],
    argumenten: [
      "Het lichaamsprobleem: computers missen een lichaam en dus de basis voor begrip.",
      "Het contextprobleem: computers kunnen niet bepalen wat relevant is in een situatie.",
      "Het emotieprobleem: zonder emoties geen intelligente keuzes."
    ],
    voorbeeld: "Een schaakcomputer kan winnen maar 'begrijpt' niet wat schaken is — het mist de geleefde ervaring.",
    kritiek: "Connectionisme (zelflerende netwerken) lost deels het symboolprobleem op, maar de belichaming blijft een punt.",
    vergelijkMet: { id: "clark", label: "Clark", tekst: "Clark bouwt voort op Dreyfus: juist omdat de geest geen computer is, integreert het brein tools op een organische manier (extended mind)." },
  },
  clark: {
    naam: "Andy Clark",
    stelling: "De mens is een natural-born cyborg: het brein is ontworpen om technische hulpmiddelen naadloos te integreren.",
    kernbegrippen: ["Natural-born cyborg", "Cyborg-paradox", "Dynamische apparaten", "Extended mind"],
    argumenten: [
      "Otto's notitieboek functioneert als zijn geheugen, net zoals Inga's biologisch geheugen (Otto & Inga gedachte-experiment).",
      "De cyborg-paradox: hoe beter de techniek werkt, hoe meer ze verdwijnt uit ons bewustzijn."
    ],
    voorbeeld: "Je smartphone is een extensie van je geheugen — je 'weet' honderden telefoonnummers via je telefoon.",
    kritiek: "Als alles 'extended mind' is, waar stopt de geest dan? Het gevaar van een te brede definitie.",
    vergelijkMet: { id: "verbeek", label: "Verbeek", tekst: "Clark zegt: techniek breidt onze cognitie uit. Verbeek gaat verder: techniek bemiddelt ook onze moraal." },
  },
  kockelkoren: {
    naam: "Petran Kockelkoren",
    stelling: "Techniek verandert onze zintuiglijke ervaring via decentreren (verstoring) en recentreren (inlijving).",
    kernbegrippen: ["Decentreren", "Recentreren", "Inlijving", "Technische bemiddeling"],
    argumenten: [
      "Nieuwe techniek verstoort de vertrouwde waarneming (decentreren): de wereld ziet er anders uit.",
      "Na gewenning lijven de zintuigen de techniek in (recentreren): de bril wordt onzichtbaar."
    ],
    voorbeeld: "De eerste keer een VR-bril opzetten is desoriënterend (decentreren); na een uur vergeet je dat je hem draagt (recentreren).",
    kritiek: "Geldt dit voor alle techniek, of alleen voor 'transparante' techniek die het lichaam raakt?",
    vergelijkMet: { id: "clark", label: "Clark", tekst: "Clark focust op cognitieve uitbreiding, Kockelkoren op zintuiglijke transformatie — twee kanten van dezelfde medaille." },
  },
  verbeek: {
    naam: "Peter-Paul Verbeek",
    stelling: "Technologie is nooit moreel neutraal: het bemiddelt actief onze waarneming en ons handelen.",
    kernbegrippen: ["Technologische bemiddeling", "Ontwerpen van moraal", "Vrijheid als 'zich verhouden'"],
    argumenten: [
      "Bemiddeling van waarneming: technologie bepaalt hóe de werkelijkheid aan ons verschijnt.",
      "Bemiddeling van handelen: technologie dwingt gedrag af via 'scripts' (de drempel dwingt tot afremmen)."
    ],
    voorbeeld: "De prenatale echoscopie maakt de foetus zichtbaar als patiënt en dwingt ouders in de rol van beslisser over leven en dood.",
    kritiek: "Zijn we dan slaven van techniek (determinisme)? Nee: vrijheid is juist de plicht om je bewust te verhouden tot technologische bemiddeling.",
    vergelijkMet: { id: "latour", label: "Latour", tekst: "Beiden zien agency in niet-menselijke dingen. Maar Verbeek focust specifiek op de ethische gevolgen, Latour op de symmetrie tussen mens en ding." },
  },
  demul: {
    naam: "Jos de Mul",
    stelling: "NBIN-technologieën transformeren de menselijke identiteit in drie mogelijke scenario's.",
    kernbegrippen: ["NBIN", "Extrahumanisme", "Transhumanisme", "Posthumanisme", "Herwaardering van waarden"],
    argumenten: [
      "Extrahumanisme: de mens versmelt met netwerken (zwermgeest).",
      "Transhumanisme: de mens overstijgt zijn eigen natuur (alien).",
      "Posthumanisme: bewustzijn wordt overbodig (zombie)."
    ],
    voorbeeld: "Brain-computer interfaces (Neuralink) zijn NBIN in actie: nano + bio + info + cogno samengevoegd.",
    kritiek: "Nietzsche's herwaardering van waarden: als de mens verandert, moeten ook onze waarden meeveranderen — maar welke richting op?",
    vergelijkMet: { id: "clark", label: "Clark", tekst: "Clark zegt: we zijn altijd al cyborgs. De Mul gaat verder: NBIN kan ons wezen fundamenteel transformeren, niet alleen uitbreiden." },
  },
  morton: {
    naam: "Timothy Morton",
    stelling: "Alles is verbonden in 'the mesh' — de grens tussen mens en natuur is een illusie.",
    kernbegrippen: ["The mesh", "Hyperobject", "Ecologisch denken", "Handelingsvermogen planten/dieren"],
    argumenten: [
      "The mesh: alles (mensen, dieren, planten, dingen) is verweven in een oneindig netwerk van relaties.",
      "Hyperobjecten (klimaatverandering, plasticsoep) zijn zo groot dat ze ons denken overstijgen.",
      "Dieren en planten hebben handelingsvermogen: het onderscheid tussen 'intentioneel handelen' (mens) en blind 'gedrag' (dier) is kunstmatig. Wij overschatten onszelf — we overzien de gevolgen van onze acties zelden."
    ],
    voorbeeld: "Klimaatverandering is een hyperobject: je kunt het niet zien of vasthouden, maar het bepaalt alles.",
    kritiek: "Als alles verbonden is en er geen 'buiten' is, hoe neem je dan nog een ethisch standpunt in?",
    vergelijkMet: { id: "despret", label: "Despret", tekst: "Morton denkt grootschalig (the mesh), Despret juist kleinschalig: wat zegt dit specifieke dier ons als we goed luisteren?" },
  },
  despret: {
    naam: "Vinciane Despret",
    stelling: "Dieren hebben een eigen perspectief en agency — wetenschappers moeten leren goede vragen te stellen.",
    kernbegrippen: ["Dierlijke agency", "Goede vragen stellen", "Antropomorfisme"],
    argumenten: [
      "De spiegeltest meet niet of dieren zelfbewust zijn, maar of ze reageren zoals wij verwachten.",
      "Goede wetenschap stelt open vragen in plaats van te testen of dieren 'menselijk genoeg' zijn."
    ],
    voorbeeld: "Despret bekritiseert de spiegeltest: een gorilla die wegkijkt is niet 'dom', maar vermijdt oogcontact uit sociale beleefdheid.",
    kritiek: "Hoe voorkom je dat 'goede vragen stellen' leidt tot onkritisch antropomorfisme?",
    vergelijkMet: { id: "latour", label: "Latour", tekst: "Despret eist hermeneutiek (begrijpend luisteren) bij dieren; Latour verruimt dit naar alle niet-menselijke actanten." },
  },
  haraway: {
    naam: "Donna Haraway",
    stelling: "De cyborg doorbreekt drie dualismen (mens/dier, mens/machine, fysiek/niet-fysiek) én de hiërarchieën die eruit voortvloeien.",
    kernbegrippen: ["Cyborg", "Staying with the trouble", "Response-ability"],
    argumenten: [
      "De cyborg is geen science fiction maar onze huidige realiteit: we zijn altijd al verstrengeld met techniek en andere soorten. Het opheffen van grenzen moet uitsluiting en onderdrukking voorkomen.",
      "Staying with the trouble: neem verantwoordelijkheid voor de rommelige wereld in plaats van te vluchten in utopieën. Response-ability: de plicht om antwoord te blijven geven."
    ],
    voorbeeld: "Een pacemaker-drager is letterlijk een cyborg: de grens mens/machine is allang overschreden.",
    kritiek: "Als alle grenzen poreus zijn, hoe definieer je dan nog 'de mens'? Is dat juist Haraway's punt?",
    vergelijkMet: { id: "beauvoir", label: "De Beauvoir", tekst: "De Beauvoir toonde dat gender een constructie is; Haraway past dit toe op de grens mens/niet-mens zelf." },
  },
  latour: {
    naam: "Bruno Latour",
    stelling: "Niet alleen mensen maar ook dingen (actanten) handelen in netwerken — agency is verdeeld.",
    kernbegrippen: ["Actant", "Actor-Network Theory", "Berlijnse sleutel", "Symmetrie"],
    argumenten: [
      "De Berlijnse sleutel dwingt je de deur op slot te doen: het ding 'handelt' door je gedrag te sturen.",
      "Symmetrisch denken: beschrijf mensen en dingen met dezelfde termen (actanten in een netwerk)."
    ],
    voorbeeld: "Een verkeersdrempel 'besluit' dat je langzamer rijdt — dat is gedelegeerde moraal.",
    kritiek: "Als dingen handelen, wie is dan moreel verantwoordelijk? De ontwerper, de gebruiker, of het ding?",
    vergelijkMet: { id: "verbeek", label: "Verbeek", tekst: "Beiden zien agency in dingen. Verbeek focust op ethiek (bemiddeling van moraal), Latour op ontologie (dingen als actanten)." },
  },
  hayles: {
    naam: "N. Katherine Hayles",
    stelling: "Technische systemen 'denken' zonder bewustzijn — cognitie is niet exclusief menselijk.",
    kernbegrippen: ["Unthought", "Cognitieve non-mens", "Technische cognitie", "Cognitieve assemblage"],
    argumenten: [
      "Drones, algoritmes en sensoren verwerken informatie en nemen 'beslissingen' zonder bewustzijn.",
      "Cognitieve assemblages: mens + techniek vormen samen een denkend systeem."
    ],
    voorbeeld: "Een zelfsturende drone die obstakels ontwijkt 'denkt' in functionele zin, zonder dat er iemand achter zit.",
    kritiek: "Is informatieverwerking zonder bewustzijn wel 'cognitie'? Of rekken we het begrip te ver op?",
    vergelijkMet: { id: "swaab", label: "Swaab", tekst: "Swaab reduceert de geest tot informatieverwerking. Hayles trekt die lijn door: als cognitie = informatieverwerking, dan kan die ook buiten de mens bestaan." },
  },
  barad: {
    naam: "Karen Barad",
    stelling: "Dingen bestaan niet voorafgaand aan hun relaties — materie is actief via intra-actie.",
    kernbegrippen: ["Intra-actie", "Agentieel realisme", "Materie als actief"],
    argumenten: [
      "Inter-actie veronderstelt twee aparte dingen die elkaar ontmoeten. Intra-actie: de dingen worden pas wat ze zijn ín de relatie.",
      "Materie is niet passief maar actief: het doet iets in de wereld."
    ],
    voorbeeld: "Een elektron 'is' pas een deeltje of een golf afhankelijk van hoe je het meet — de meting creëert het object.",
    kritiek: "Als niets voorafgaat aan relaties, hoe begin je dan überhaupt met onderzoek?",
    vergelijkMet: { id: "latour", label: "Latour", tekst: "Latour ziet dingen als actanten in netwerken; Barad gaat verder: de dingen worden pas wat ze zijn ín de relatie (intra-actie)." },
  },
  harari: {
    naam: "Yuval Noah Harari",
    stelling: "Data is de nieuwe bron van waarde en autoriteit — algoritmes begrijpen ons beter dan wijzelf.",
    kernbegrippen: ["Dataïsme", "Homo Deus", "Algoritme", "Dataficatie"],
    argumenten: [
      "Dataïsme: alle waarde en autoriteit verschuift naar data en algoritmes.",
      "De mens wordt een dataverwerkend systeem — niet fundamenteel anders dan andere systemen."
    ],
    voorbeeld: "Spotify's algoritme 'weet' welke muziek je leuk vindt voordat je het zelf weet.",
    kritiek: "Rasch: data mist altijd iets — 'het else'. Niet alles is meetbaar of reduceerbaar tot informatie.",
    vergelijkMet: { id: "rasch", label: "Rasch", tekst: "Harari zegt: data vangt alles. Rasch zegt: er ontsnapt altijd iets — er is frictie tussen data en werkelijkheid." },
  },
  rasch: {
    naam: "Miriam Rasch",
    stelling: "Datareductie mist altijd iets: 'het else' — de kloof tussen data en werkelijkheid biedt ruimte voor vrijheid.",
    kernbegrippen: ["Het else", "Datareductie", "Kloof data-werkelijkheid", "Frictie"],
    argumenten: [
      "Elke vertaling naar data verliest iets: nuance, context, het onmeetbare.",
      "Juist in die kloof zit menselijke vrijheid: je bent niet volledig vangbaar in een profiel."
    ],
    voorbeeld: "Een CV vangt niet wie je bent. Een algoritme dat je profiel samenstelt evenmin — er is altijd een 'rest'.",
    kritiek: "Als data steeds beter wordt, krimpt 'het else' dan? Of is het principieel onreduceerbaar?",
    vergelijkMet: { id: "harari", label: "Harari", tekst: "Rasch biedt het tegenwicht voor Harari's dataïsme: niet alles is data, er gaat altijd iets verloren." },
  },
};

export const MINDMAPS = [
  // === KWESTIE 1: Wat is de mens? ===
  {
    id: "k1-lichaam",
    title: "Kwestie 1: Wat is de mens?",
    kwestie: 1,
    context: ["kwestie"],
    beschrijving: "Van dualisme naar geleefde ervaring: het lichaam, de ander en identiteit",
    nodes: [
      { id: "centrum", label: "Wat is de mens?", type: "central", x: 50, y: 5 },
      // Categorieën
      { id: "cat1", label: "Het Lichaam\n(1e persoon)", type: "category", x: 25, y: 22, color: "#2E9E5A" },
      { id: "cat2", label: "De Ander\n(2e persoon)", type: "category", x: 75, y: 22, color: "#E87C3E" },
      // Filosofen
      { id: "descartes", label: "Descartes", type: "filosoof", x: 8, y: 40, color: "#4A90D9", examInfoId: "descartes" },
      { id: "sheets", label: "Sheets-\nJohnstone", type: "filosoof", x: 28, y: 40, color: "#2E9E5A", examInfoId: "sheets" },
      { id: "plessner", label: "Plessner", type: "filosoof", x: 48, y: 40, color: "#2E9E5A", examInfoId: "plessner" },
      { id: "beauvoir", label: "De Beauvoir", type: "filosoof", x: 65, y: 52, color: "#E87C3E", examInfoId: "beauvoir" },
      { id: "fanon", label: "Fanon", type: "filosoof", x: 85, y: 52, color: "#E87C3E", examInfoId: "fanon" },
      // Begrippen
      { id: "db", label: "Res cogitans /\nRes extensa", type: "concept", x: 8, y: 58, color: "#4A90D9" },
      { id: "sjb", label: "Lichaams-\nschema", type: "concept", x: 28, y: 58, color: "#2E9E5A" },
      { id: "pb", label: "Excentrische positie\n3 Wetten", type: "concept", x: 48, y: 58, color: "#2E9E5A" },
      { id: "bb", label: "Tot vrouw\ngemaakt", type: "concept", x: 65, y: 70, color: "#E87C3E" },
      { id: "fb", label: "Epidermisch-\nraciaal schema", type: "concept", x: 85, y: 70, color: "#E87C3E" },
      // Bruggen
      { id: "medewereld", label: "Medewereld", type: "category", x: 55, y: 22, color: "#7B61C4" },
    ],
    edges: [
      { from: "centrum", to: "cat1", label: "Ervaart via" },
      { from: "centrum", to: "cat2", label: "Wordt gevormd door" },
      { from: "cat1", to: "descartes", label: "Scheidt geest\nen machine" },
      { from: "cat1", to: "sheets", label: "Pre-reflectief" },
      { from: "cat1", to: "plessner", label: "Heeft én\nis lichaam" },
      { from: "cat2", to: "beauvoir", label: "Socialiseert" },
      { from: "cat2", to: "fanon", label: "Objectiveert" },
      { from: "descartes", to: "db" },
      { from: "sheets", to: "sjb" },
      { from: "plessner", to: "pb" },
      { from: "beauvoir", to: "bb" },
      { from: "fanon", to: "fb" },
      // Didactische brugpijlen
      { from: "plessner", to: "medewereld", style: "bridge", label: "Expressie in" },
      { from: "medewereld", to: "cat2", style: "bridge", label: "Bepaalt zelfervaring" },
      { from: "fanon", to: "sjb", style: "bridge", label: "Verstoort &\noverschrijft" },
    ],
  },

  // === KWESTIE 2: Techniek & Mensbeeld ===
  {
    id: "k2-cognitie",
    title: "Kwestie 2: Techniek & Mensbeeld",
    kwestie: 2,
    context: ["kwestie"],
    beschrijving: "Van computermetafoor tot belichaamde cognitie: drie perspectieven op de geest",
    nodes: [
      { id: "centrum", label: "Techniek &\nMensbeeld", type: "central", x: 50, y: 5 },
      // Categorieën
      { id: "cat1", label: "Taal &\nMetaforen", type: "category", x: 15, y: 22, color: "#7B61C4" },
      { id: "cat2", label: "Brein & AI", type: "category", x: 50, y: 22, color: "#4A90D9" },
      { id: "cat3", label: "De 4E's", type: "category", x: 85, y: 22, color: "#2E9E5A" },
      // Filosofen
      { id: "lakoff", label: "Lakoff &\nJohnson", type: "filosoof", x: 8, y: 42, color: "#7B61C4", examInfoId: "lakoff" },
      { id: "vroon", label: "Vroon &\nDraaisma", type: "filosoof", x: 25, y: 42, color: "#7B61C4", examInfoId: "vroon" },
      { id: "swaab", label: "Swaab", type: "filosoof", x: 42, y: 42, color: "#4A90D9", examInfoId: "swaab" },
      { id: "dreyfus", label: "Dreyfus", type: "filosoof", x: 58, y: 42, color: "#c62828", examInfoId: "dreyfus" },
      { id: "clark", label: "Clark &\nChalmers", type: "filosoof", x: 78, y: 42, color: "#2E9E5A", examInfoId: "clark" },
      { id: "noe", label: "Noë", type: "filosoof", x: 95, y: 42, color: "#2E9E5A" },
      // Begrippen
      { id: "lb", label: "Oriënterende\nmetaforen", type: "concept", x: 8, y: 60, color: "#7B61C4" },
      { id: "vb", label: "Computer-\nmetafoor", type: "concept", x: 25, y: 60, color: "#7B61C4" },
      { id: "sb", label: "Mens =\nsymbool-\nmanipulatie", type: "concept", x: 42, y: 60, color: "#4A90D9" },
      { id: "cb", label: "Extended\nMind", type: "concept", x: 78, y: 60, color: "#2E9E5A" },
      { id: "nb", label: "Perceptie =\nvaardigheid", type: "concept", x: 95, y: 60, color: "#2E9E5A" },
      // Connectie
      { id: "conn", label: "Connectionisme", type: "concept", x: 50, y: 75, color: "#999" },
    ],
    edges: [
      { from: "centrum", to: "cat1", label: "Structureren" },
      { from: "centrum", to: "cat2", label: "Simuleren" },
      { from: "centrum", to: "cat3", label: "Situeren" },
      { from: "cat1", to: "lakoff" },
      { from: "cat1", to: "vroon" },
      { from: "cat2", to: "swaab" },
      { from: "cat3", to: "clark" },
      { from: "cat3", to: "noe" },
      { from: "lakoff", to: "lb" },
      { from: "vroon", to: "vb" },
      { from: "swaab", to: "sb" },
      { from: "clark", to: "cb" },
      { from: "noe", to: "nb" },
      // Brugpijlen
      { from: "swaab", to: "dreyfus", style: "bridge", label: "Kritiek: AI mist\nbelichaming" },
      { from: "dreyfus", to: "conn", style: "dashed", label: "Deels ondervangen" },
    ],
  },

  // === KWESTIE 3: Verandert techniek ons wezen? ===
  {
    id: "k3-techniek",
    title: "Kwestie 3: Verandert ons wezen?",
    kwestie: 3,
    context: ["kwestie"],
    beschrijving: "Ja/Nee-trechter: is de mens altijd al hybride, of vormt techniek ons actief?",
    nodes: [
      { id: "centrum", label: "Verandert techniek\nons wezen?", type: "central", x: 50, y: 5 },
      // Ja/Nee
      { id: "nee", label: "NEE\nWe zijn altijd\nal hybride", type: "category", x: 20, y: 25, color: "#4A90D9" },
      { id: "ja", label: "JA\nTechniek vormt\nons actief", type: "category", x: 75, y: 25, color: "#2E9E5A" },
      // Filosofen
      { id: "clark", label: "Clark", type: "filosoof", x: 20, y: 48, color: "#4A90D9", examInfoId: "clark" },
      { id: "kockelkoren", label: "Kockelkoren", type: "filosoof", x: 58, y: 48, color: "#2E9E5A", examInfoId: "kockelkoren" },
      { id: "verbeek", label: "Verbeek", type: "filosoof", x: 78, y: 48, color: "#E87C3E", examInfoId: "verbeek" },
      { id: "demul", label: "De Mul", type: "filosoof", x: 92, y: 48, color: "#7B61C4", examInfoId: "demul" },
      // Begrippen
      { id: "cb", label: "Natural-born cyborgs\nDynamische apparaten", type: "concept", x: 20, y: 68, color: "#4A90D9" },
      { id: "kb", label: "Decentreren /\nRecentreren", type: "concept", x: 58, y: 68, color: "#2E9E5A" },
      { id: "vb", label: "Bemiddelt moraal\nvia scripts", type: "concept", x: 78, y: 68, color: "#E87C3E" },
      { id: "mb", label: "Muteert identiteit\nvia NBIN", type: "concept", x: 92, y: 68, color: "#7B61C4" },
    ],
    edges: [
      { from: "centrum", to: "nee" },
      { from: "centrum", to: "ja" },
      { from: "nee", to: "clark", label: "Integreert\ninterfaces" },
      { from: "ja", to: "kockelkoren", label: "Decentreren" },
      { from: "ja", to: "verbeek", label: "Scripts" },
      { from: "ja", to: "demul", label: "Trans-/post-" },
      { from: "clark", to: "cb" },
      { from: "kockelkoren", to: "kb" },
      { from: "verbeek", to: "vb" },
      { from: "demul", to: "mb" },
    ],
  },

  // === KWESTIE 4: Grensvervagingen ===
  {
    id: "k4-grenzen",
    title: "Kwestie 4: Grensvervagingen",
    kwestie: 4,
    context: ["kwestie"],
    beschrijving: "Haraway als kapstok, drie grenzen, met kanttekeningen als filosofisch vangnet",
    nodes: [
      { id: "centrum", label: "Grensvervagingen", type: "central", x: 50, y: 3 },
      { id: "haraway", label: "Haraway", type: "filosoof", x: 50, y: 18, color: "#c62828", examInfoId: "haraway" },
      // Drie grenzen
      { id: "g1", label: "Mens ↔\nDier/Plant", type: "category", x: 15, y: 35, color: "#2E9E5A" },
      { id: "g2", label: "Levend ↔\nDing", type: "category", x: 50, y: 35, color: "#4A90D9" },
      { id: "g3", label: "Fysiek ↔\nData", type: "category", x: 85, y: 35, color: "#7B61C4" },
      // Filosofen
      { id: "morton", label: "Morton", type: "filosoof", x: 5, y: 52, color: "#2E9E5A", examInfoId: "morton" },
      { id: "despret", label: "Despret", type: "filosoof", x: 25, y: 52, color: "#2E9E5A", examInfoId: "despret" },
      { id: "latour", label: "Latour", type: "filosoof", x: 42, y: 52, color: "#4A90D9", examInfoId: "latour" },
      { id: "hayles", label: "Hayles", type: "filosoof", x: 58, y: 52, color: "#4A90D9", examInfoId: "hayles" },
      { id: "barad", label: "Barad", type: "filosoof", x: 75, y: 52, color: "#7B61C4", examInfoId: "barad" },
      { id: "harari", label: "Harari", type: "filosoof", x: 92, y: 52, color: "#7B61C4", examInfoId: "harari" },
      // Rasch als kritiek
      { id: "rasch", label: "Rasch", type: "filosoof", x: 92, y: 72, color: "#999", examInfoId: "rasch" },
      // Kanttekeningen
      { id: "kant", label: "KANTTEKENINGEN\n(Ethiek & Wetenschaps-\nfilosofie)", type: "concept", x: 30, y: 88, color: "#f0c040" },
    ],
    edges: [
      { from: "centrum", to: "haraway", label: "Cyborg doorbreekt\ndualismen" },
      { from: "haraway", to: "g1" },
      { from: "haraway", to: "g2" },
      { from: "haraway", to: "g3" },
      { from: "g1", to: "morton", label: "The Mesh" },
      { from: "g1", to: "despret", label: "Spiegeltest" },
      { from: "g2", to: "latour", label: "ANT" },
      { from: "g2", to: "hayles", label: "Drones" },
      { from: "g3", to: "barad", label: "Intra-actie" },
      { from: "g3", to: "harari", label: "Dataïsme" },
      // Brugpijl
      { from: "harari", to: "rasch", style: "bridge", label: "Kritiek: behoud\nhet onmeetbare" },
      // Kanttekeningen
      { from: "despret", to: "kant", style: "dashed", label: "Hermeneutiek" },
      { from: "latour", to: "kant", style: "dashed", label: "Parlement der Dingen" },
      { from: "hayles", to: "kant", style: "dashed", label: "Kwetsbaarheid" },
    ],
  },

  // === BONUS: Verbeek (bij primaire tekst) ===
  {
    id: "bonus-verbeek",
    title: "Verbeek: Technologische bemiddeling",
    kwestie: 3,
    context: ["tekst"],
    tekstId: 9,
    beschrijving: "Hoe techniek onze waarneming en ons handelen bemiddelt",
    nodes: [
      { id: "centrum", label: "Technologische\nbemiddeling", type: "central", x: 50, y: 5 },
      { id: "waarnemen", label: "Bemiddelt\nwaarneming", type: "category", x: 25, y: 25, color: "#4A90D9" },
      { id: "handelen", label: "Bemiddelt\nhandelen", type: "category", x: 75, y: 25, color: "#E87C3E" },
      { id: "echo", label: "Casus:\nechoscopie", type: "concept", x: 50, y: 45, color: "#7B61C4" },
      { id: "dilemma", label: "Moreel dilemma:\nwat je ziet, moet\nje beslissen", type: "concept", x: 50, y: 65, color: "#c62828" },
      { id: "deug", label: "Deugd-\nethiek", type: "concept", x: 20, y: 85, color: "#2E9E5A" },
      { id: "plicht", label: "Plicht-\nethiek", type: "concept", x: 50, y: 85, color: "#2E9E5A" },
      { id: "gevolg", label: "Gevolg-\nethiek", type: "concept", x: 80, y: 85, color: "#2E9E5A" },
    ],
    edges: [
      { from: "centrum", to: "waarnemen" },
      { from: "centrum", to: "handelen" },
      { from: "waarnemen", to: "echo", style: "bridge" },
      { from: "handelen", to: "echo", style: "bridge" },
      { from: "echo", to: "dilemma" },
      { from: "dilemma", to: "deug" },
      { from: "dilemma", to: "plicht" },
      { from: "dilemma", to: "gevolg" },
    ],
  },

  // === BONUS: De Mul (bij primaire tekst) ===
  {
    id: "bonus-demul",
    title: "De Mul: Drie scenario's",
    kwestie: 3,
    context: ["tekst"],
    tekstId: 10,
    beschrijving: "NBIN-technologieën en drie toekomstscenario's voor de mens",
    nodes: [
      { id: "humanisme", label: "Humanisme", type: "concept", x: 50, y: 5, color: "#4A90D9" },
      { id: "nbin", label: "NBIN-\ntechnologieën", type: "central", x: 50, y: 25 },
      { id: "extra", label: "Extra-\nhumanisme", type: "category", x: 15, y: 50, color: "#2E9E5A" },
      { id: "extraSub", label: "Zwermgeest:\nmens versmelt\nmet netwerk", type: "concept", x: 5, y: 72, color: "#2E9E5A" },
      { id: "trans", label: "Trans-\nhumanisme", type: "category", x: 50, y: 50, color: "#E87C3E" },
      { id: "transSub", label: "Alien: mens\noverstijgt eigen\nnatuur", type: "concept", x: 50, y: 72, color: "#E87C3E" },
      { id: "post", label: "Post-\nhumanisme", type: "category", x: 85, y: 50, color: "#7B61C4" },
      { id: "postSub", label: "Zombie: bewustzijn\nwordt overbodig", type: "concept", x: 90, y: 72, color: "#7B61C4" },
      { id: "nietzsche", label: "Nietzsche:\nherwaardering\nvan waarden", type: "concept", x: 50, y: 92, color: "#c62828" },
    ],
    edges: [
      { from: "humanisme", to: "nbin" },
      { from: "nbin", to: "extra" },
      { from: "nbin", to: "trans" },
      { from: "nbin", to: "post" },
      { from: "extra", to: "extraSub" },
      { from: "trans", to: "transSub" },
      { from: "post", to: "postSub" },
      { from: "extra", to: "nietzsche", style: "bridge" },
      { from: "trans", to: "nietzsche", style: "bridge" },
      { from: "post", to: "nietzsche", style: "bridge" },
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
      { id: "k1", label: "K1: Wat is\nde mens?", type: "kwestie", x: 15, y: 20, color: "#2D5A8E" },
      { id: "k1sub", label: "Zelfkennis,\nlichaam, identiteit", type: "concept", x: 5, y: 5, color: "#2D5A8E" },
      { id: "k2", label: "K2: Techniek &\nMensbeeld", type: "kwestie", x: 85, y: 20, color: "#8E4A2D" },
      { id: "k2sub", label: "Metaforen,\ncognitie, brein", type: "concept", x: 92, y: 5, color: "#8E4A2D" },
      { id: "k3", label: "K3: Verandert\ntechniek ons?", type: "kwestie", x: 15, y: 80, color: "#2D8E5A" },
      { id: "k3sub", label: "Cyborg, bemiddeling,\nidentiteit", type: "concept", x: 5, y: 95, color: "#2D8E5A" },
      { id: "k4", label: "K4: Grenzen\nvervagen", type: "kwestie", x: 85, y: 80, color: "#7A2D8E" },
      { id: "k4sub", label: "Mens/dier, levend/\nniet-levend, data", type: "concept", x: 92, y: 95, color: "#7A2D8E" },
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
      { from: "k1", to: "k2", style: "bridge", label: "modellen" },
      { from: "k2", to: "k3", style: "bridge", label: "techniek" },
      { from: "k3", to: "k4", style: "bridge", label: "grenzen" },
      { from: "k1", to: "k4", style: "dashed", label: "constructie" },
    ],
  },
];
