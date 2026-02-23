// Foutenjacht: leerlingen beoordelen spoof-antwoorden op examenvragen
// Elke item bevat een CE-stijl vraag en een "leerling-antwoord" in segmenten.
// Segmenten zijn correct (true) of bevatten een fout met type + uitleg.
//
// foutType opties:
//   "verkeerde_filosoof"  — schrijft idee toe aan verkeerde denker
//   "begripsverwarring"   — verwisselt twee verwante begrippen
//   "te_vaag"             — antwoord is te vaag / mist specificiteit
//   "cirkelredenering"    — herhaalt de vraag zonder uitleg
//   "mist_kern"           — mist de kern van wat gevraagd wordt
//   "feitelijk_onjuist"   — feitelijke fout

export const FOUT_TYPES = {
  verkeerde_filosoof: { label: "Verkeerde filosoof", color: "#c62828", icon: "🔀" },
  begripsverwarring:  { label: "Begripsverwarring", color: "#e65100", icon: "🔄" },
  te_vaag:            { label: "Te vaag", color: "#7b1fa2", icon: "🌫️" },
  cirkelredenering:   { label: "Cirkelredenering", color: "#00695c", icon: "🔁" },
  mist_kern:          { label: "Mist de kern", color: "#1565c0", icon: "🎯" },
  feitelijk_onjuist:  { label: "Feitelijk onjuist", color: "#d84315", icon: "❌" },
};

export const FOUTENJACHT_ITEMS = [
  // === 1. Plessner — excentrische positionaliteit (K1) ===
  {
    id: "fj-1",
    kwestie: 1,
    naam: "Sanne",
    punten: 3,
    vraag: "Leg uit wat Plessner bedoelt met 'excentrische positionaliteit' en geef aan hoe dit verschilt van de positionaliteit van een dier. (3p)",
    segmenten: [
      { text: "Volgens Plessner is de mens excentrisch gepositioneerd.", correct: true },
      { text: "Dit betekent dat de mens zichzelf van buitenaf kan bekijken, alsof hij een toeschouwer is van zijn eigen leven.",
        correct: false, foutType: "mist_kern",
        uitleg: "Deze omschrijving mist de kern van de dubbelheid: excentrische positionaliteit betekent dat je tegelijk centrum van je ervaring bent (centrisch, net als een dier) én buiten dat centrum kunt treden. Alleen het 'van buitenaf bekijken' noemen is onvolledig." },
      { text: "Een dier kan dit niet omdat het geen bewustzijn heeft.",
        correct: false, foutType: "feitelijk_onjuist",
        uitleg: "Bij Plessner heeft een dier wél bewustzijn — het ervaart vanuit een centrum (centrische positionaliteit). Het verschil is dat het dier niet buiten dat centrum kan treden om op zichzelf te reflecteren. Bewustzijn ≠ zelfreflectie." },
      { text: "Plessner noemt dit ook wel het cogito.",
        correct: false, foutType: "verkeerde_filosoof",
        uitleg: "Het cogito ('ik denk, dus ik ben') is van Descartes, niet van Plessner. Plessner verwerpt juist Descartes' scheiding van denken en lichaam." },
    ],
    correctiemodel: "Excentrische positionaliteit (1p): de mens is tegelijk centrum van zijn ervaring én kan buiten dat centrum treden (1p). Verschil met dier: het dier is centrisch — het ervaart vanuit een centrum maar kan er niet op reflecteren (1p).",
  },

  // === 2. Fanon — raciaal-epidermaal schema (K1) ===
  {
    id: "fj-2",
    kwestie: 1,
    naam: "Tim",
    punten: 4,
    vraag: "Leg uit wat Fanon bedoelt met het 'historisch lichaamsschema' en het 'raciaal-epidermaal schema'. Gebruik een voorbeeld. (4p)",
    segmenten: [
      { text: "Het historisch lichaamsschema is hoe je je lichaam ervaart op basis van je persoonlijke geschiedenis.",
        correct: false, foutType: "te_vaag",
        uitleg: "Te vaag: het historisch lichaamsschema gaat niet over persoonlijke geschiedenis maar over collectieve, raciale geschiedenis. Het schema is 'historisch' omdat het gevormd is door eeuwen van racisme en kolonialisme die in het lichaam zijn gegrift." },
      { text: "Het raciaal-epidermaal schema is het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de blik van de ander.", correct: true },
      { text: "Een voorbeeld is dat iemand op straat roept 'Kijk, een neger!' waardoor Fanon beseft dat zijn huidskleur zijn identiteit bepaalt.", correct: true },
      { text: "Dit concept komt oorspronkelijk van Plessner, die het lichaamsschema al eerder beschreef.",
        correct: false, foutType: "verkeerde_filosoof",
        uitleg: "Het fenomenologische lichaamsschema komt van Merleau-Ponty (en wordt ook door Sheets-Johnstone gebruikt), niet van Plessner. Bovendien: het raciaal-epidermaal schema is Fanons eigen begrip — het gaat om de specifieke verstoring van het lichaamsschema door racisme." },
    ],
    correctiemodel: "Historisch lichaamsschema: het lichaamsschema gevormd door collectieve raciale geschiedenis (1p). Raciaal-epidermaal schema: het door de dominante blik opgelegde schema dat huidskleur tot identiteit maakt (1p). Voorbeeld met uitleg (1p). Verband tussen beide: het raciaal-epidermaal schema overschrijft het historisch lichaamsschema (1p).",
  },

  // === 3. Dreyfus — kritiek op AI (K2) ===
  {
    id: "fj-3",
    kwestie: 2,
    naam: "Lieke",
    punten: 3,
    vraag: "Noem twee van de drie problemen die Dreyfus ziet bij kunstmatige intelligentie en leg uit waarom het lichaam hierbij volgens hem essentieel is. (3p)",
    segmenten: [
      { text: "Dreyfus noemt het contextprobleem: computers kunnen niet bepalen welke informatie relevant is in een situatie.", correct: true },
      { text: "Daarnaast noemt hij het symboolprobleem: computers kunnen alleen symbolen verwerken en missen daardoor echte intelligentie.",
        correct: false, foutType: "begripsverwarring",
        uitleg: "Symboolmanipulatie is juist het uitgangspunt van klassieke AI (computationalisme), niet een 'probleem' dat Dreyfus noemt. Dreyfus' drie problemen zijn: het contextprobleem, het relevantieprobleem en het lichaamsprobleem. 'Het symboolprobleem' bestaat niet als begrip bij Dreyfus." },
      { text: "Het lichaam is essentieel omdat Clark aantoont dat cognitie zich uitstrekt voorbij het brein.",
        correct: false, foutType: "verkeerde_filosoof",
        uitleg: "Dit is Clarks extended mind-hypothese, niet Dreyfus' argument. Dreyfus benadrukt dat het lichaam essentieel is omdat het drie functies vervult: (1) bron van behoeften en motivatie, (2) basis van aangeleerde vaardigheden, (3) basis van sociale interactie via lichaamstaal." },
    ],
    correctiemodel: "Twee problemen uit: contextprobleem, relevantieprobleem, lichaamsprobleem (2×1p). Lichaam essentieel omdat het de basis is van behoeften, vaardigheden en/of sociale interactie (1p).",
  },

  // === 4. Lakoff & Johnson — metaforen (K2) ===
  {
    id: "fj-4",
    kwestie: 2,
    naam: "Jamal",
    punten: 2,
    vraag: "Leg met een voorbeeld uit wat Lakoff & Johnson bedoelen met een 'oriënterende metafoor'. (2p)",
    segmenten: [
      { text: "Een oriënterende metafoor is een metafoor die een abstract begrip behandelt alsof het een concreet object is.",
        correct: false, foutType: "begripsverwarring",
        uitleg: "Dit beschrijft een ontologische metafoor, niet een oriënterende metafoor. Een oriënterende metafoor is gebaseerd op de ruimtelijke oriëntatie van het lichaam: boven/onder, voor/achter. Bv. 'ik voel me down' (onder = slecht)." },
      { text: "Een voorbeeld is: 'de tijd is geld' — hier wordt tijd behandeld als iets dat je kunt uitgeven en besparen.",
        correct: false, foutType: "begripsverwarring",
        uitleg: "'De tijd is geld' is ook een ontologische metafoor (tijd als concrete stof die je kunt 'besteden'). Een goed voorbeeld van een oriënterende metafoor zou zijn: 'ik voel me down' of 'de koers stijgt' — gebaseerd op de lichamelijke ervaring dat boven = goed/meer en onder = slecht/minder." },
      { text: "Dit laat zien dat ons denken altijd al gestructureerd wordt door metaforen die we niet bewust kiezen.", correct: true },
    ],
    correctiemodel: "Oriënterende metafoor: metafoor gebaseerd op ruimtelijke oriëntatie van het lichaam (boven/onder etc.) (1p). Juist voorbeeld met uitleg, bv. 'ik voel me down' = onder is slecht (1p).",
  },

  // === 5. Verbeek — technologische bemiddeling (K3) ===
  {
    id: "fj-5",
    kwestie: 3,
    naam: "Emma",
    punten: 3,
    vraag: "Verbeek stelt dat technologie 'niet neutraal' is. Leg uit wat hij bedoelt met technologische bemiddeling en geef een voorbeeld. (3p)",
    segmenten: [
      { text: "Verbeek bedoelt dat technologie niet neutraal is omdat technologie invloed heeft op ons leven.",
        correct: false, foutType: "cirkelredenering",
        uitleg: "Dit is een cirkelredenering: de vraag was waaróm technologie niet neutraal is, en het antwoord herhaalt alleen dat technologie 'invloed heeft'. Je moet uitleggen wat bemiddeling inhoudt: technologie vormt actief hoe de werkelijkheid aan ons verschijnt (waarneming) en hoe wij handelen." },
      { text: "Technologie bemiddelt onze waarneming en ons handelen.", correct: true },
      { text: "Een voorbeeld is dat sociale media ons afhankelijk maken van likes.",
        correct: false, foutType: "te_vaag",
        uitleg: "Dit voorbeeld is te vaag en illustreert niet specifiek Verbeeks begrip 'bemiddeling'. Een sterk voorbeeld bij Verbeek is de echoscopie: die maakt de foetus zichtbaar als patiënt (bemiddeling van waarneming) en dwingt ouders in de rol van beslisser over leven en dood (bemiddeling van handelen). Het voorbeeld moet laten zien hoe technologie concreet waarneming óf handelen vormt." },
    ],
    correctiemodel: "Technologische bemiddeling: technologie vormt actief onze waarneming en/of ons handelen (1p). Uitleg van wat bemiddeling inhoudt (niet alleen 'invloed') (1p). Specifiek voorbeeld dat waarneming of handelen illustreert (1p).",
  },

  // === 6. Clark — natural-born cyborg (K3) ===
  {
    id: "fj-6",
    kwestie: 3,
    naam: "Daan",
    punten: 3,
    vraag: "Clark noemt de mens een 'natural-born cyborg'. Leg uit wat hij hiermee bedoelt en waarom hij vindt dat dit niet iets nieuws is. (3p)",
    segmenten: [
      { text: "Clark bedoelt dat de mens steeds meer versmelt met technologie en in de toekomst een cyborg zal worden.",
        correct: false, foutType: "mist_kern",
        uitleg: "Dit mist de kern: Clark zegt juist dat we altijd al cyborgs zijn geweest, niet dat we het in de toekomst zullen worden. Het punt is dat hybriditeit met techniek geen breuk is maar de natuurlijke staat van de mens." },
      { text: "Taal en gereedschap waren al onze eerste cognitieve technologieën.", correct: true },
      { text: "De Mul noemt dit het transhumanisme-scenario: de mens evolueert naar een nieuwe soort.",
        correct: false, foutType: "verkeerde_filosoof",
        uitleg: "Transhumanisme is inderdaad een scenario van De Mul, maar Clark is géén transhumanist. Clarks punt is het omgekeerde: er is geen radicale transformatie nodig, want de mens was altijd al een hybride van biologie en technologie. Bij De Mul gaat het om toekomstige NBIN-technologieën die ons wezen fundamenteel veranderen." },
    ],
    correctiemodel: "Natural-born cyborg: de mens is van nature een hybride van biologie en technologie (1p). Niet nieuw: taal en gereedschap waren al eerste cognitieve technologieën (1p). Kernpunt: dit is de natuurlijke staat, geen toekomstscenario (1p).",
  },

  // === 7. Latour — delegatie (K4) ===
  {
    id: "fj-7",
    kwestie: 4,
    naam: "Noor",
    punten: 3,
    vraag: "Leg uit wat Latour bedoelt met 'delegatie' en geef een voorbeeld van een niet-menselijke actant. (3p)",
    segmenten: [
      { text: "Latour bedoelt met delegatie dat mensen taken uitbesteden aan machines, zoals een fabriek robots inzet.",
        correct: false, foutType: "begripsverwarring",
        uitleg: "Delegatie bij Latour is niet gewoon 'taken uitbesteden'. Het gaat specifiek om het overdragen van een moreel programma aan een niet-menselijk object. De verkeersdrempel 'draagt' het morele gebod 'rij langzaam' — het is gedelegeerde moraal, niet efficiëntie." },
      { text: "Een voorbeeld van een actant is een verkeersdrempel: die dwingt automobilisten langzamer te rijden.", correct: true },
      { text: "De verkeersdrempel 'handelt' in de zin dat hij het morele gebod 'rij langzaam' fysiek afdwingt.", correct: true },
    ],
    correctiemodel: "Delegatie: het overdragen van een moreel programma aan een niet-menselijk object (1p). Voorbeeld van een niet-menselijke actant (1p). Uitleg hoe het object 'handelt' of 'agency' heeft (1p).",
  },

  // === 8. Harari vs. Rasch — data (K4) ===
  {
    id: "fj-8",
    kwestie: 4,
    naam: "Mila",
    punten: 3,
    vraag: "Vergelijk de positie van Harari over data met de kritiek van Rasch. Wat is het kernverschil? (3p)",
    segmenten: [
      { text: "Harari stelt dat data de ultieme bron van waarde is en dat algoritmes ons beter kennen dan wijzelf.", correct: true },
      { text: "Rasch is het hier niet mee eens.",
        correct: false, foutType: "te_vaag",
        uitleg: "Dit zegt alleen dát Rasch het oneens is, maar niet waaróm. Op het CE moet je altijd het argument noemen: Rasch stelt dat bij elke datareductie iets verloren gaat — 'het else'. De kloof tussen data en werkelijkheid is principieel en onoverbrugbaar." },
      { text: "Volgens Rasch gaat er bij datareductie altijd iets verloren, maar uiteindelijk zal technologie dit probleem oplossen.",
        correct: false, foutType: "mist_kern",
        uitleg: "Het eerste deel klopt (er gaat iets verloren), maar 'technologie zal het oplossen' mist de kern van Raschs argument volledig. 'Het else' is bij Rasch juist principieel onreduceerbaar — het is geen technisch probleem dat met betere algoritmes opgelost kan worden. In die onherleidbare kloof schuilt juist de menselijke vrijheid." },
    ],
    correctiemodel: "Harari: data is de ultieme bron van waarde, algoritmes kennen ons beter dan wijzelf (dataïsme) (1p). Rasch: bij datareductie gaat altijd iets verloren ('het else') (1p). Kernverschil: Rasch stelt dat die kloof principieel is, niet te overbruggen door betere technologie (1p).",
  },
];
