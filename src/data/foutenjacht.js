// Foutenjacht: leerlingen herkennen typische CE-fouten in spoof-antwoorden.
// Format: examvraag + leerlingantwoord + MC "wat gaat er mis?" + uitleg.
//
// Fouttypes gebaseerd op landelijke examenbesprekingen 2019–2025:
//   "vraag_niet_gelezen"   — antwoord gaat langs de vraag heen
//   "tekstverwijzing_mist" — "met behulp van tekst" genegeerd
//   "voorbeeld_ipv_uitleg" — geeft een voorbeeld terwijl om uitleg wordt gevraagd
//   "onvolledig"           — mist scoringselementen / beantwoordt maar de helft
//   "te_vaag"              — geen filosofische taal, common sense, circulair
//   "begripsverwarring"    — verwante begrippen door elkaar

export const FOUT_TYPES = {
  vraag_niet_gelezen:   { label: "Vraag niet goed gelezen",   color: "#c62828", icon: "👁️" },
  tekstverwijzing_mist: { label: "Tekstverwijzing ontbreekt", color: "#ad1457", icon: "📄" },
  voorbeeld_ipv_uitleg: { label: "Voorbeeld ipv uitleg",      color: "#6a1b9a", icon: "💡" },
  onvolledig:           { label: "Onvolledig antwoord",        color: "#e65100", icon: "✂️" },
  te_vaag:              { label: "Te vaag / niet filosofisch", color: "#00695c", icon: "🌫️" },
  begripsverwarring:    { label: "Begripsverwarring",          color: "#1565c0", icon: "🔄" },
};

export const FOUTENJACHT_ITEMS = [

  // ====================================================================
  // K1 — Wie ben ik?
  // ====================================================================

  {
    id: "fj-1",
    kwestie: 1,
    naam: "Sanne",
    punten: 3,
    vraag: "Leg uit wat Plessner bedoelt met 'excentrische positionaliteit' en geef aan hoe dit verschilt van de positionaliteit van een dier. (3p)",
    antwoord: "Plessner bedoelt dat de mens zichzelf van buitenaf kan bekijken, alsof hij een toeschouwer is van zijn eigen leven. Een dier kan dat niet omdat het geen bewustzijn heeft. De mens is dus uniek doordat hij kan reflecteren op zijn eigen bestaan.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord noemt de verkeerde filosoof", correct: false },
      { label: "Het antwoord mist de kern van excentrische positionaliteit: de dubbelheid van centrisch ÉN excentrisch", correct: true },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Het antwoord verwijst niet naar de examentekst", correct: false },
    ],
    uitleg: "Excentrische positionaliteit is niet alleen 'jezelf van buitenaf bekijken'. De kern is de dubbelheid: de mens is tegelijk centrum van zijn ervaring (centrisch, net als een dier) ÉN kan buiten dat centrum treden. Sanne noemt alleen de excentrische kant en mist de centrische. Bovendien: bij Plessner heeft een dier wél bewustzijn (centrische positionaliteit) — het verschil is dat het dier niet buiten dat centrum kan treden.",
    correctiemodel: "Excentrische positionaliteit: de mens is tegelijk centrum van zijn ervaring én kan buiten dat centrum treden (1p). Centrische positionaliteit: het dier ervaart vanuit een centrum maar kan er niet op reflecteren (1p). Verschil: het dier heeft wél bewustzijn maar kan niet reflecteren (1p).",
  },

  {
    id: "fj-2",
    kwestie: 1,
    naam: "Tim",
    punten: 3,
    vraag: "Plessner stelt dat lachen een 'grenservaring' is. Leg uit wat hij hiermee bedoelt. Gebruik in je antwoord het begrip 'symbolische expressie'. (3p)",
    antwoord: "Lachen is volgens Plessner een vorm van symbolische expressie. Het is een grenservaring omdat het laat zien dat de mens meer is dan alleen een lichaam. Als we lachen, drukken we iets uit wat niet in woorden te vangen is. Dit toont dat de mens excentrisch gepositioneerd is.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord beschrijft lachen als een vorm van symbolische expressie, terwijl het juist het falen ervan is", correct: true },
      { label: "Het antwoord is te vaag en gebruikt geen filosofische taal", correct: false },
      { label: "Het antwoord beantwoordt een andere vraag dan gesteld", correct: false },
      { label: "Het antwoord is onvolledig: er missen scoringselementen", correct: false },
    ],
    uitleg: "Dit is een veelgemaakte fout op het CE (examenbespreking 2025: 'een van de wreedste examenvragen'). Plessner stelt juist dat lachen optreedt wanneer symbolische expressie FAALT — het lichaam neemt het over als woorden en gebaren niet meer toereikend zijn. Lachen is dus niet een vórm van symbolische expressie, maar wat er gebeurt als symbolische expressie tekortschiet. Bijna geen leerling beantwoordt dit correct.",
    correctiemodel: "Grenservaring: lachen treedt op wanneer symbolische expressie faalt (1p). Het lichaam neemt het over: je 'valt' terug op lichamelijke reactie (1p). Dit toont de excentrische positie: de mens is een lichaam dat hij tegelijk 'heeft' en 'is' (1p).",
  },

  {
    id: "fj-3",
    kwestie: 1,
    naam: "Lieke",
    punten: 4,
    vraag: "Leg uit wat Fanon bedoelt met het 'raciaal-epidermaal schema'. Geef daarbij aan hoe dit schema zich verhoudt tot het lichaamsschema. (4p)",
    antwoord: "Fanon beschrijft hoe iemand op straat naar hem roept: 'Kijk, een neger!' Hierdoor beseft hij dat hij door anderen alleen als zijn huidskleur wordt gezien. Dit is het raciaal-epidermaal schema. Het verschil met het gewone lichaamsschema is dat je lichaam nu van buitenaf wordt bepaald.",
    foutType: "voorbeeld_ipv_uitleg",
    opties: [
      { label: "Het antwoord geeft een voorbeeld (de treinscène) maar legt het begrip niet algemeen uit", correct: true },
      { label: "Het antwoord noemt de verkeerde filosoof bij het lichaamsschema", correct: false },
      { label: "Het antwoord is feitelijk onjuist over Fanon", correct: false },
      { label: "Het antwoord leest de vraag verkeerd: er wordt niet om een voorbeeld gevraagd", correct: false },
    ],
    uitleg: "Op het CE zie je dit vaak: een leerling geeft een voorbeeld (het treinscène) in plaats van een algemene uitleg van het begrip. Het raciaal-epidermaal schema moet als begrip uitgelegd worden: het is het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante (witte) blik, waardoor huidskleur de hele identiteit gaat bepalen. Het voorbeeld mag erbij, maar de vraag is: 'leg uit wat Fanon bedoelt met...' — dan moet eerst de algemene uitleg komen.",
    correctiemodel: "Raciaal-epidermaal schema: het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante blik (1p). Huidskleur wordt tot kern van identiteit gemaakt (1p). Lichaamsschema: het prereflexieve schema waarmee je je lichaam ervaart (1p). Verhouding: het raciaal-epidermaal schema overschrijft/verstoort het gewone lichaamsschema (1p).",
  },

  // ====================================================================
  // K2 — Hoe denk ik?
  // ====================================================================

  {
    id: "fj-4",
    kwestie: 2,
    naam: "Jamal",
    punten: 3,
    vraag: "In tekst 2 beschrijft Swaab de relatie tussen het brein en bewustzijn. Leg met behulp van tekst 2 uit waarom Swaab een neuroreductionist genoemd kan worden. (3p)",
    antwoord: "Swaab is een neuroreductionist omdat hij vindt dat alles wat we denken en voelen uiteindelijk door het brein wordt bepaald. Het bewustzijn is gewoon hersenactiviteit. Dit past bij het idee dat 'wij ons brein zijn'.",
    foutType: "tekstverwijzing_mist",
    opties: [
      { label: "Het antwoord verwijst niet naar tekst 2, terwijl de vraag dat expliciet vraagt", correct: true },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Het antwoord bevat een begripsverwarring over neuroreductionisme", correct: false },
      { label: "Het antwoord is te vaag en oppervlakkig", correct: false },
    ],
    uitleg: "Het antwoord is inhoudelijk niet verkeerd, maar mist een essentieel onderdeel: de vraag zegt 'met behulp van tekst 2'. Op het CE moet je dan concreet verwijzen naar wat er in de tekst staat — een specifieke passage, formulering of voorbeeld uit de tekst gebruiken om je punt te onderbouwen. Zonder tekstverwijzing verlies je minstens 1 punt, ook als je uitleg inhoudelijk klopt. Dit is een van de meest voorkomende fouten op het CE.",
    correctiemodel: "Neuroreductionisme: bewustzijn wordt volledig herleid tot hersenprocessen (1p). Verwijzing naar tekst 2: [specifieke passage citeren/parafraseren] (1p). Conclusie: Swaab is neuroreductionist omdat hij geen ruimte laat voor bewustzijn los van het brein (1p).",
  },

  {
    id: "fj-5",
    kwestie: 2,
    naam: "Emma",
    punten: 3,
    vraag: "Dreyfus bekritiseert de klassieke benadering van kunstmatige intelligentie. Noem twee van zijn drie problemen en leg uit waarom het lichaam hierbij volgens Dreyfus essentieel is. (3p)",
    antwoord: "Dreyfus vindt dat computers nooit echt intelligent kunnen worden. Ze missen het lichaam en kunnen daarom niet echt begrijpen wat ze doen. Zo kan ChatGPT wel tekst genereren maar begrijpt het niet wat het zegt. Het lichaam is dus nodig voor echte intelligentie.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord is inhoudelijk onjuist over Dreyfus", correct: false },
      { label: "Het antwoord noemt geen van de drie problemen bij naam, terwijl de vraag daar expliciet om vraagt", correct: true },
      { label: "Het antwoord bevat een begripsverwarring tussen Dreyfus en Clark", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
    ],
    uitleg: "De vraag is heel specifiek: 'noem twee van zijn drie problemen'. Dan moet je het contextprobleem, relevantieprobleem en/of lichaamsprobleem bij naam noemen en elk kort uitleggen. Emma geeft in plaats daarvan een vaag algemeen verhaal over AI en het lichaam. Op het CE is dit fataal: de vraag vraagt om concrete begrippen en die staan er niet. Lees de vraag altijd woord voor woord en check: heb ik elk onderdeel beantwoord?",
    correctiemodel: "Twee problemen uit: contextprobleem (computers kunnen niet bepalen welke context relevant is), relevantieprobleem (computers kunnen niet filteren wat belangrijk is), lichaamsprobleem (computers missen lichamelijke ervaring) (2×1p). Lichaam essentieel: basis van behoeften, vaardigheden en/of sociale interactie (1p).",
  },

  {
    id: "fj-6",
    kwestie: 2,
    naam: "Daan",
    punten: 2,
    vraag: "Leg uit wat Lakoff & Johnson bedoelen met een 'oriënterende metafoor' en geef een voorbeeld. (2p)",
    antwoord: "Een oriënterende metafoor is een metafoor die een abstract begrip koppelt aan iets concreets. Een voorbeeld is 'de tijd is geld': tijd wordt behandeld als iets dat je kunt uitgeven en besparen. Zo structureren metaforen ons denken.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord is te vaag", correct: false },
      { label: "Het voorbeeld klopt niet bij de uitleg", correct: false },
      { label: "Zowel de uitleg als het voorbeeld beschrijven een ontologische metafoor, niet een oriënterende", correct: true },
      { label: "Het antwoord beantwoordt de vraag niet volledig", correct: false },
    ],
    uitleg: "Daan beschrijft een ontologische metafoor (abstract → concreet ding) en geeft daar ook een voorbeeld van ('tijd is geld'). Een oriënterende metafoor is gebaseerd op de ruimtelijke oriëntatie van het lichaam: boven/onder, voor/achter. Voorbeelden: 'ik voel me down' (onder = slecht), 'de koers stijgt' (boven = meer). Het onderscheid tussen de drie soorten metaforen is een klassiek CE-onderwerp waar veel leerlingen punten verliezen.",
    correctiemodel: "Oriënterende metafoor: metafoor gebaseerd op ruimtelijke oriëntatie van het lichaam (boven/onder, voor/achter) (1p). Juist voorbeeld met uitleg, bv. 'ik voel me down' = onder is slecht/negatief (1p).",
  },

  // ====================================================================
  // K3 — Wat doet techniek?
  // ====================================================================

  {
    id: "fj-7",
    kwestie: 3,
    naam: "Noor",
    punten: 3,
    vraag: "Verbeek stelt dat technologie 'niet neutraal' is. Leg uit wat hij bedoelt met technologische bemiddeling. Maak in je antwoord onderscheid tussen bemiddeling van waarneming en bemiddeling van handelen. (3p)",
    antwoord: "Verbeek bedoelt dat technologie niet neutraal is omdat het invloed heeft op hoe we de wereld zien. Een goed voorbeeld is de echoscopie: die maakt het mogelijk om een ongeboren kind te zien, waardoor ouders een band opbouwen met het kind nog voor de geboorte. Technologie verandert dus onze blik op de werkelijkheid.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord bevat een feitelijke fout over Verbeek", correct: false },
      { label: "Het antwoord legt alleen bemiddeling van waarneming uit en mist bemiddeling van handelen, terwijl de vraag om beide vraagt", correct: true },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Het antwoord leest de vraag verkeerd", correct: false },
    ],
    uitleg: "De vraag vraagt expliciet om onderscheid tussen bemiddeling van waarneming EN van handelen. Noor legt alleen de waarnemingskant uit (de echoscopie maakt de foetus zichtbaar). Maar bij Verbeek is de handeling net zo belangrijk: de echoscopie dwingt ouders in de rol van beslisser — ze moeten keuzes maken over de zwangerschap op basis van wat ze zien. Op het CE verlies je hier punten als je maar één kant noemt. Lees altijd: staat er 'en'? Dan moet je beide noemen.",
    correctiemodel: "Technologische bemiddeling: technologie vormt actief onze relatie met de wereld (1p). Bemiddeling van waarneming: technologie bepaalt hoe de werkelijkheid aan ons verschijnt, bv. echoscopie maakt foetus zichtbaar als patiënt (1p). Bemiddeling van handelen: technologie beïnvloedt onze handelingsmogelijkheden, bv. echoscopie maakt ouders tot beslisser over leven (1p).",
  },

  {
    id: "fj-8",
    kwestie: 3,
    naam: "Mila",
    punten: 3,
    vraag: "Clark noemt de mens een 'natural-born cyborg'. Leg uit wat hij hiermee bedoelt en geef aan waarom dit volgens hem geen recente ontwikkeling is. (3p)",
    antwoord: "Clark bedoelt dat de mens steeds meer technologie gebruikt en daardoor langzaam een cyborg wordt. Denk aan smartphones, smartwatches en AI-assistenten. We zijn steeds afhankelijker van technologie en dat maakt ons tot cyborgs. Vroeger was dat minder.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord verwijst niet naar de examentekst", correct: false },
      { label: "Het antwoord is te vaag en oppervlakkig", correct: false },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Het antwoord draait Clarks argument om: hij zegt juist dat we altijd al cyborgs waren, niet dat we het langzaam worden", correct: true },
    ],
    uitleg: "Mila leest de vraag niet goed. De vraag zegt: 'waarom dit volgens hem geen recente ontwikkeling is' — het antwoord moet dus uitleggen dat Clark vindt dat we ALTIJD AL cyborgs waren. Mila beschrijft het omgekeerde: we worden steeds meer cyborg. Dat is precies niet wat Clark bedoelt. Clark stelt dat taal en gereedschap al onze eerste cognitieve technologieën waren — de mens is van nature een hybride. Dit is geen toekomstscenario maar onze natuurlijke staat.",
    correctiemodel: "Natural-born cyborg: de mens is van nature een hybride van biologie en technologie (1p). Geen recente ontwikkeling: taal en gereedschap waren al de eerste cognitieve technologieën (1p). Kernpunt: hybriditeit is de natuurlijke staat van de mens, geen breuk of toekomstscenario (1p).",
  },

  // ====================================================================
  // K4 — Hoe leef ik samen?
  // ====================================================================

  {
    id: "fj-9",
    kwestie: 4,
    naam: "Sem",
    punten: 4,
    vraag: "In tekst 4 beschrijft Morton het begrip 'mesh'. Leg met behulp van tekst 4 uit wat Morton hiermee bedoelt. Geef vervolgens aan waarom dit begrip volgens Morton leidt tot 'ontregeling' van de mens. (4p)",
    antwoord: "Morton bedoelt met mesh dat alles in de natuur met elkaar verbonden is. Dit is een ecologisch begrip dat laat zien dat we onderdeel zijn van een groter geheel. Dit leidt tot ontregeling omdat mensen zich realiseren dat ze de natuur aan het vernietigen zijn en dat dit ook henzelf raakt.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord beantwoordt een andere vraag dan gesteld", correct: false },
      { label: "Het antwoord mist de tekstverwijzing naar tekst 4", correct: false },
      { label: "Het antwoord is te vaag ('alles is verbonden') en mist de filosofische kern: dat het mesh betekent dat er geen vaste hiërarchie of centrum is", correct: true },
      { label: "Het antwoord verwart Morton met Latour", correct: false },
    ],
    uitleg: "Op het CE is 'alles is verbonden' een typisch te vaag antwoord. Morton bedoelt met mesh niet simpelweg verbondenheid, maar een netwerk zonder centrum of hiërarchie — de mens is niet het middelpunt maar één knooppunt in een vlak netwerk. De ontregeling komt niet doordat we 'de natuur vernietigen' (dat is een milieuargument, geen filosofisch argument), maar doordat het mesh ons vaste referentiepunt wegneemt: als de mens niet het centrum is, wie zijn we dan? Dit verlies van houvast is de ontregeling.",
    correctiemodel: "Mesh: netwerk van verbindingen zonder centrum of hiërarchie (1p). Verwijzing naar tekst 4: [specifiek element uit de tekst] (1p). Ontregeling: het mesh ondermijnt het idee dat de mens het middelpunt of de maat van alles is (1p). De mens verliest zijn vaste referentiepunt/houvast (1p).",
  },

  {
    id: "fj-10",
    kwestie: 4,
    naam: "Roos",
    punten: 3,
    vraag: "Vergelijk de positie van Harari over data met de kritiek van Rasch. Wat is het kernverschil? (3p)",
    antwoord: "Harari stelt dat data de ultieme bron van waarde is en dat algoritmes ons beter kennen dan wijzelf. Dit noemt hij dataïsme. Rasch is het hier niet mee eens en vindt dat data niet alles kan vastleggen.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord verwart Harari met een andere filosoof", correct: false },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Harari's positie is goed uitgelegd, maar Raschs kritiek is te vaag: 'niet mee eens' en 'niet alles vastleggen' is geen filosofisch argument", correct: true },
      { label: "Het antwoord beantwoordt de vraag niet: het kernverschil ontbreekt", correct: false },
    ],
    uitleg: "Dit is een klassieke CE-fout: je legt filosoof A goed uit, maar bij filosoof B schrijf je alleen dát hij het oneens is, niet waaróm. Rasch stelt dat bij elke datareductie iets principieel verloren gaat — 'het else'. Dat is geen technisch probleem (betere algoritmes lossen het niet op), maar een fundamenteel filosofisch punt: de kloof tussen data en werkelijkheid is onoverbrugbaar. In die kloof schuilt juist de menselijke vrijheid. 'Niet mee eens' levert op het CE 0 punten op.",
    correctiemodel: "Harari: dataïsme — data als ultieme bron van waarde, algoritmes kennen ons beter dan wijzelf (1p). Rasch: bij datareductie gaat altijd iets verloren: 'het else' (1p). Kernverschil: Rasch stelt dat die kloof principieel is en niet door technologie overbrugd kan worden — daarin schuilt menselijke vrijheid (1p).",
  },

  {
    id: "fj-11",
    kwestie: 4,
    naam: "Bram",
    punten: 3,
    vraag: "Leg uit wat Latour bedoelt met een 'niet-menselijke actant'. Gebruik het begrip 'delegatie' in je antwoord. (3p)",
    antwoord: "Latour bedoelt dat ook niet-menselijke dingen een rol spelen in het sociale leven. Een voorbeeld is een verkeersdrempel die automobilisten dwingt langzamer te rijden. De verkeersdrempel is een actant omdat hij invloed heeft op het gedrag van mensen.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord is inhoudelijk onjuist", correct: false },
      { label: "Het antwoord gebruikt het begrip 'delegatie' niet, terwijl de vraag dat expliciet vraagt", correct: true },
      { label: "Het voorbeeld van de verkeersdrempel is verkeerd gekozen", correct: false },
      { label: "Het antwoord verwart actant met actor", correct: false },
    ],
    uitleg: "Het antwoord is inhoudelijk niet slecht — het voorbeeld van de verkeersdrempel is zelfs goed gekozen. Maar de vraag zegt: 'gebruik het begrip delegatie in je antwoord.' Dat begrip staat er niet in. Op het CE kost dit je een scoringspunt. Delegatie bij Latour: het overdragen van een moreel programma aan een niet-menselijk object. De verkeersdrempel 'draagt' het morele gebod 'rij langzaam'. Lees de vraag altijd opnieuw als je klaar bent met schrijven: heb ik alle gevraagde begrippen gebruikt?",
    correctiemodel: "Niet-menselijke actant: een niet-menselijk ding dat 'handelt' / agency heeft in een netwerk (1p). Delegatie: het overdragen van een moreel programma aan een niet-menselijk object (1p). Voorbeeld met uitleg, bv. verkeersdrempel draagt het gebod 'rij langzaam' (1p).",
  },

  {
    id: "fj-12",
    kwestie: 3,
    naam: "Fleur",
    punten: 3,
    vraag: "In tekst 3 beschrijft De Mul drie scenario's voor de toekomst van de mens. Leg met behulp van tekst 3 uit wat De Mul bedoelt met het transhumanisme-scenario. (3p)",
    antwoord: "Het transhumanisme-scenario houdt in dat de mens door middel van technologie steeds beter wordt. Door technologieën als nano, bio, info en cogno (NBIC) kan de mens zichzelf verbeteren en uiteindelijk evolueren naar een nieuwe, betere soort mens. Dit is een optimistisch scenario.",
    foutType: "tekstverwijzing_mist",
    opties: [
      { label: "Het antwoord is inhoudelijk onjuist over transhumanisme", correct: false },
      { label: "Het antwoord is te vaag en mist filosofische diepgang", correct: false },
      { label: "De vraag zegt 'met behulp van tekst 3' maar het antwoord verwijst nergens concreet naar de tekst", correct: true },
      { label: "Het antwoord verwart transhumanisme met een ander scenario van De Mul", correct: false },
    ],
    uitleg: "Het antwoord is inhoudelijk redelijk, maar mist de tekstverwijzing. De vraag zegt expliciet 'met behulp van tekst 3' — dan moet je concreet verwijzen naar wat er in de tekst staat. Citeer of parafraseer een specifieke passage. Zonder tekstverwijzing verlies je op het CE minstens 1 punt, ook als je uitleg verder klopt. Tip: onderstreep in de tekst wat je gebruikt en verwijs er expliciet naar in je antwoord.",
    correctiemodel: "Transhumanisme: de mens evolueert door NBIC-technologieën naar een nieuwe, verbeterde soort (1p). Verwijzing naar tekst 3: [specifieke passage over enhancement/convergentie] (1p). Optimistisch scenario: technologie als middel tot menselijke perfectie (1p).",
  },
];
