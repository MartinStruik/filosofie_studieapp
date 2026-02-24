// Foutenjacht: herken typische CE-fouten in spoof-antwoorden op echte examenvragen.
//
// Gebaseerd op de landelijke examenbesprekingen filosofie VWO (Cito/SLO)
// en docentendiscussies op het VFVO-forum (2024–2025).
//
// Fouttypes — de zes meest voorkomende fouten bij CE filosofie:
//   "vraag_niet_gelezen"   — antwoord gaat langs de vraag heen / mist een expliciet gevraagd element
//   "tekstverwijzing_mist" — "met behulp van tekst X" genegeerd, geen concrete verwijzing
//   "voorbeeld_ipv_uitleg" — geeft een voorbeeld terwijl om een algemene uitleg wordt gevraagd
//   "onvolledig"           — mist scoringselementen, beantwoordt maar de helft van de vraag
//   "te_vaag"              — geen filosofische taal, common sense, circulair, oppervlakkig
//   "begripsverwarring"    — verwante begrippen of filosofen door elkaar

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
  // CE 2025 TV1 — Vraag 16: Plessner over lachen
  // Examenbespreking: "een van de wreedste examenvragen" — bijna geen
  // leerling beantwoordt dit correct. De meesten beschrijven lachen ALS
  // symbolische expressie ipv als het FALEN ervan.
  // ====================================================================
  {
    id: "fj-01",
    kwestie: 1,
    bron: "CE 2025 TV1, vraag 16",
    naam: "Sanne",
    punten: 3,
    vraag: "Plessner stelt dat lachen een 'grenservaring' is. Leg uit wat hij hiermee bedoelt. Gebruik in je antwoord het begrip 'symbolische expressie'. (3p)",
    antwoord: "Lachen is volgens Plessner een vorm van symbolische expressie. Het is een grenservaring omdat het laat zien dat de mens meer is dan alleen een lichaam. Als we lachen, drukken we iets uit wat niet in woorden te vangen is. Dit toont dat de mens excentrisch gepositioneerd is.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Lachen wordt beschreven als een vorm van symbolische expressie, terwijl het juist optreedt wanneer symbolische expressie faalt", correct: true },
      { label: "Het antwoord is te vaag en mist filosofische diepgang", correct: false },
      { label: "Het antwoord beantwoordt een andere vraag dan gesteld", correct: false },
      { label: "Het antwoord is onvolledig: er missen scoringselementen", correct: false },
    ],
    uitleg: "Dit is de meest gemaakte fout bij deze vraag (examenbespreking 2025: 'een van de wreedste examenvragen — bijna geen leerling beantwoordt dit correct'). Plessner stelt juist dat lachen optreedt wanneer symbolische expressie FAALT — het lichaam neemt het over als woorden en gebaren niet meer toereikend zijn. Lachen is dus niet een vórm van symbolische expressie, maar wat er gebeurt als symbolische expressie tekortschiet. Het is een grenservaring omdat de mens hier de grens ervaart van zijn vermogen om zichzelf uit te drukken.",
    correctiemodel: "Grenservaring: lachen treedt op wanneer symbolische expressie faalt (1p). Het lichaam neemt het over: je 'valt' terug op een lichamelijke reactie die je niet kunt sturen (1p). Dit toont de excentrische positie: de mens is een lichaam dat hij tegelijk 'heeft' en 'is' — bij lachen verliest hij de regie (1p).",
  },

  // ====================================================================
  // CE 2025 TV1 — Vraag 2: Hubot en visuele waarneming
  // Examenbespreking: "Bijna alle kandidaten raken hier hopeloos de weg
  // kwijt." Leerlingen focussen op het ontbreken van een menselijk lichaam
  // ipv op het ontbreken van herinneringen/ervaringen.
  // ====================================================================
  {
    id: "fj-02",
    kwestie: 2,
    bron: "CE 2025 TV1, vraag 2",
    naam: "Tim",
    punten: 3,
    vraag: "De hubot heeft een camera als oog. Leg uit waarom de hubot volgens de syllabus niet op dezelfde manier visueel kan waarnemen als een mens. Gebruik in je antwoord de drie functies van het lichaam bij waarneming. (3p)",
    antwoord: "De hubot kan niet echt waarnemen omdat hij geen menselijk lichaam heeft. Een camera registreert alleen beelden, maar begrijpt niet wat het ziet. Mensen gebruiken hun lichaam om de wereld te ervaren, een robot kan dat niet. Daarom is de waarneming van een hubot fundamenteel anders.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord verwijst niet naar de examentekst", correct: false },
      { label: "Het antwoord noemt geen van de drie functies van het lichaam bij waarneming, terwijl de vraag daar expliciet om vraagt", correct: true },
      { label: "Het antwoord bevat een begripsverwarring", correct: false },
      { label: "Het antwoord is feitelijk onjuist over hubots", correct: false },
    ],
    uitleg: "De examenbespreking 2025 noemt dit 'de vraag waar bijna alle kandidaten hopeloos de weg kwijt raken'. De vraag vraagt expliciet om de drie functies van het lichaam bij waarneming (uit de syllabus p.30). Tim geeft in plaats daarvan een vaag algemeen verhaal over robots en lichamen. Op het CE is dit fataal: als er staat 'gebruik de drie functies', dan moeten die drie functies er staan. Lees altijd woord voor woord wat de vraag precies vraagt.",
    correctiemodel: "Drie functies van het lichaam bij waarneming: (1) het lichaam als bron van behoeften en verwachtingen die de waarneming sturen (1p), (2) het lichaam als basis van aangeleerde vaardigheden die herkenning mogelijk maken (1p), (3) het lichaam als basis van een affectieve relatie met de omgeving (1p). De hubot mist deze drie functies omdat hij geen lichaamsgeschiedenis en ervaringen heeft.",
  },

  // ====================================================================
  // CE 2025 TV1 — Vraag 10: Contingentie en culturele invloeden
  // Examenbespreking: leerlingen focussen op "wetenschappelijke invloeden"
  // terwijl de vraag over "culturele invloeden" gaat.
  // ====================================================================
  {
    id: "fj-03",
    kwestie: 2,
    bron: "CE 2025 TV1, vraag 10",
    naam: "Lieke",
    punten: 2,
    vraag: "Leg uit wat bedoeld wordt met de stelling dat onze zelfkennis 'contingent' is. Geef een voorbeeld van hoe culturele invloeden ons zelfbeeld vormen. (2p)",
    antwoord: "Contingent betekent dat iets toevallig is. Onze zelfkennis is contingent omdat het toeval is hoe we over onszelf denken. Een voorbeeld is dat wetenschappelijk onderzoek naar het brein ons laat zien dat we gestuurd worden door neuronen, wat ons zelfbeeld verandert.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord verwart contingentie met toeval", correct: false },
      { label: "Het voorbeeld gaat over wetenschappelijke invloeden terwijl de vraag om culturele invloeden vraagt", correct: true },
      { label: "Het antwoord is te vaag", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
    ],
    uitleg: "De vraag vraagt specifiek om 'culturele invloeden', maar Lieke geeft een voorbeeld van een wetenschappelijke invloed (hersenonderzoek). Dit lijkt een klein verschil, maar op het CE kost het je het punt. Culturele invloeden gaan over hoe de tijd en maatschappij waarin je leeft je zelfbeeld vormen — bijvoorbeeld: in de 17e eeuw zag men de mens als een machine (machinemetafoor), in onze tijd als een computer (computermetafoor). Contingent betekent hier: bepaald door de historische periode, het had ook anders kunnen zijn.",
    correctiemodel: "Contingent: afhankelijk van historische/culturele context, niet noodzakelijk zo — het had ook anders kunnen zijn (1p). Voorbeeld van culturele invloed op zelfbeeld, bv. machinemetafoor in de 17e eeuw vs. computermetafoor nu (1p).",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 6: Morton over planten en agency
  // Examenbespreking: "Bijna ALLE leerlingen gebruiken plantenneurobiologie
  // als argument, terwijl de vraag om Mortons twee specifieke argumenten
  // vraagt." Gecorrigeerd via N-term.
  // ====================================================================
  {
    id: "fj-04",
    kwestie: 4,
    bron: "CE 2024 TV1, vraag 6",
    naam: "Jamal",
    punten: 3,
    vraag: "Morton stelt dat planten als actoren beschouwd moeten worden. Noem twee argumenten die Morton hiervoor geeft. (3p)",
    antwoord: "Morton vindt dat planten actoren zijn omdat uit de plantenneurobiologie blijkt dat planten kunnen communiceren via schimmeldraadnetwerken (mycelia). Ze sturen chemische signalen naar elkaar als er gevaar dreigt. Dit bewijst dat planten niet passief zijn maar actief handelen in hun omgeving.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord is te vaag en mist filosofische taal", correct: false },
      { label: "Het antwoord noemt plantenneurobiologie als argument, maar de vraag vraagt om Mortons eigen filosofische argumenten — niet om wetenschappelijk bewijs", correct: true },
      { label: "Het antwoord bevat een feitelijke fout over mycelia", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
    ],
    uitleg: "Dit was een van de meest problematische vragen van 2024 — bijna alle leerlingen maakten dezelfde fout (gecorrigeerd via N-term). De vraag vraagt om Mortons eigen filosofische argumenten, maar leerlingen grijpen naar het wetenschappelijke bewijs uit de plantenneurobiologie. Morton geeft twee andere argumenten: (1) het mesh-argument (alles is verbonden in een netwerk zonder hiërarchie, dus planten zijn gelijkwaardige knooppunten), en (2) het dark ecology-argument (we moeten onze antropocentrische blik loslaten). Het verschil tussen een wetenschappelijk en een filosofisch argument herkennen is cruciaal op het CE.",
    correctiemodel: "Argument 1: het mesh — in het ecologische netwerk zijn planten gelijkwaardige actoren, niet ondergeschikt aan mensen (1p). Argument 2: dark ecology — onze antropocentrische blik verhindert ons om planten als actoren te zien; we moeten die blik loslaten (1p). Uitleg van ten minste één argument (1p).",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 12: Verbeek — morele visie vs. handelen
  // Examenbespreking: leerlingen noemen alleen bemiddeling van waarneming,
  // niet van handelen.
  // ====================================================================
  {
    id: "fj-05",
    kwestie: 3,
    bron: "CE 2024 TV1, vraag 12",
    naam: "Noor",
    punten: 3,
    vraag: "Verbeek stelt dat technologie onze moraal bemiddelt. Leg uit hoe technologie zowel onze morele visie als ons morele handelen beïnvloedt. Geef bij elk een voorbeeld. (3p)",
    antwoord: "Technologie beïnvloedt onze morele visie doordat het bepaalt hoe wij de wereld zien. De echoscopie maakt de foetus zichtbaar als een patiënt, waardoor ouders het ongeboren kind anders gaan bekijken. Sociale media laten ons voortdurend beelden zien van leed in de wereld, waardoor we moreel geraakt worden door dingen die ver weg gebeuren.",
    foutType: "onvolledig",
    opties: [
      { label: "De voorbeelden zijn te vaag en niet filosofisch genoeg", correct: false },
      { label: "Het antwoord mist het tweede deel: bemiddeling van moreel handelen wordt niet uitgelegd, alleen morele visie", correct: true },
      { label: "Het antwoord verwart Verbeek met Latour", correct: false },
      { label: "Het antwoord verwijst niet naar de examentekst", correct: false },
    ],
    uitleg: "De examenbespreking 2024 signaleert dit als veelgemaakte fout: leerlingen focussen alleen op hoe technologie onze waarneming/visie verandert en vergeten het handelen. De vraag vraagt expliciet om 'zowel morele visie als moreel handelen'. Noor geeft twee voorbeelden van morele visie maar geen van moreel handelen. Bemiddeling van handelen: de echoscopie dwingt ouders in de rol van beslisser — ze moéten kiezen over de zwangerschap op basis van wat ze zien. Technologie opent of sluit handelingsmogelijkheden.",
    correctiemodel: "Morele visie: technologie bepaalt hoe de werkelijkheid aan ons verschijnt, bv. echoscopie maakt foetus zichtbaar als patiënt (1p). Moreel handelen: technologie beïnvloedt onze handelingsmogelijkheden, bv. echoscopie maakt ouders tot beslisser over leven (1p). Bij elk een voorbeeld (1p).",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 14: Despret over dieronderzoek
  // Examenbespreking: leerlingen snappen wel dát de relatie
  // onderzoeker-dier belangrijk is, maar leggen niet uit WAAROM
  // onzichtbaarheid tot verkeerde conclusies leidt.
  // ====================================================================
  {
    id: "fj-06",
    kwestie: 4,
    bron: "CE 2024 TV1, vraag 14",
    naam: "Emma",
    punten: 3,
    vraag: "Despret bekritiseert het traditionele dieronderzoek. Leg uit waarom het onzichtbaar maken van de onderzoeker volgens Despret leidt tot verkeerde conclusies over dieren. (3p)",
    antwoord: "Volgens Despret is het belangrijk dat onderzoekers een relatie opbouwen met de dieren die ze onderzoeken. Als de onderzoeker onzichtbaar is, mist hij de sociale kenmerken van het dier. Despret pleit daarom voor een betrokken manier van onderzoek doen.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord noemt de verkeerde filosoof", correct: false },
      { label: "Het antwoord beantwoordt de vraag niet: het legt niet uit WAAROM onzichtbaarheid tot verkeerde conclusies leidt, alleen DÁT het zo is", correct: true },
      { label: "Het antwoord bevat een begripsverwarring", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
    ],
    uitleg: "De examenbespreking 2024 noemt dit: 'leerlingen missen massaal het tweede punt — ze leggen niet uit waaróm onzichtbaarheid tot verkeerde conclusies leidt.' Het mechanisme is: als de onderzoeker zich onzichtbaar maakt, worden de sociale kenmerken van het dier ook onzichtbaar. Het dier reageert namelijk anders als er geen relatie is — het verbergt gedrag, is gestrest, of toont niet zijn normale sociale repertoire. Daardoor trekt de onderzoeker conclusies over een dier dat zich niet-natuurlijk gedraagt. Het woord 'waarom' in de vraag vereist dat je dit mechanisme uitlegt, niet alleen het feit benoemt.",
    correctiemodel: "Onzichtbaarheid onderzoeker: als de onderzoeker zich verbergt, reageert het dier anders (1p). Gevolg: de sociale kenmerken van het dier worden ook onzichtbaar — het toont niet zijn natuurlijke gedrag (1p). Verkeerde conclusies: de onderzoeker beschrijft een gestrest/onnatuurlijk dier alsof het natuurlijk gedrag is (1p).",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 1: Metaforen uit wetenschap/technologie
  // VFVO-forum: leerlingen geven vage antwoorden die de strekking raken
  // maar niet het specifieke element "waarvoor nog geen beschrijving bestaat"
  // ====================================================================
  {
    id: "fj-07",
    kwestie: 2,
    bron: "CE 2024 TV2, vraag 1",
    naam: "Mila",
    punten: 2,
    vraag: "Leg uit waarom we volgens Vroon & Draaisma metaforen uit wetenschap en technologie gebruiken om onszelf te begrijpen. (2p)",
    antwoord: "We gebruiken metaforen uit wetenschap en technologie omdat die ons helpen om onszelf beter te begrijpen. Het brein is ingewikkeld en door het te vergelijken met een computer wordt het makkelijker te begrijpen. Metaforen maken abstracte dingen concreet.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord is circulair: het herhaalt de vraag ('om onszelf te begrijpen') als antwoord", correct: true },
      { label: "Het antwoord verwart Vroon & Draaisma met Lakoff & Johnson", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
      { label: "Het antwoord is feitelijk onjuist", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert dat leerlingen bij deze vraag vaak 'de vraag herhalen als antwoord'. Mila schrijft dat metaforen helpen 'om onszelf te begrijpen' — maar dat stond al in de vraag. Het specifieke element dat het CV vereist is: we gebruiken metaforen uit wetenschap en technologie voor aspecten van onszelf waarvoor nog geen eigen beschrijving bestaat. De metafoor is niet zomaar een verduidelijking, maar een noodzakelijke omweg omdat we geen directe taal hebben voor hoe het brein werkt. Let op circulaire antwoorden: als je antwoord dezelfde woorden gebruikt als de vraag, voeg je waarschijnlijk niets toe.",
    correctiemodel: "We gebruiken metaforen uit wetenschap/technologie voor aspecten van onszelf waarvoor nog geen eigen beschrijving bestaat (1p). De beschikbare technologie bepaalt welke metaforen beschikbaar zijn: als de technologie anders was geweest, hadden we andere metaforen gehad (contingentie) (1p).",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 5: Dataïsme (essentie vs. bestaanservaring)
  // VFVO-forum: leerlingen worstelen met het onderscheid essentie/
  // bestaanservaring en beschrijven dataïsme ipv het argument ervoor.
  // ====================================================================
  {
    id: "fj-08",
    kwestie: 4,
    bron: "CE 2024 TV2, vraag 5",
    naam: "Bram",
    punten: 3,
    vraag: "Het dataïsme stelt dat algoritmes ons beter kennen dan wijzelf. Geef een argument voor deze stelling en leg uit waarom dit een bedreiging vormt voor het idee van een menselijke 'essentie'. (3p)",
    antwoord: "Dataïsme is het idee dat data de belangrijkste bron van waarde is. Google en Amazon weten door onze zoekgeschiedenis en koopgedrag meer over ons dan wij zelf. Dit is een bedreiging voor de menselijke essentie omdat het betekent dat we eigenlijk gewoon data zijn.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord verwart dataïsme met een andere stroming", correct: false },
      { label: "Het antwoord beschrijft wat dataïsme IS maar geeft niet het gevraagde argument, en de uitleg over 'essentie' is te oppervlakkig", correct: true },
      { label: "Het antwoord leest de vraag verkeerd", correct: false },
      { label: "Het antwoord bevat een feitelijke fout over algoritmes", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert twee problemen bij deze vraag. (1) Leerlingen beschrijven wat dataïsme IS in plaats van een argument te geven VOOR de stelling. Een argument zou zijn: mensen vertrouwen steeds minder op hun eigen beslissingsvermogen en laten keuzes over aan algoritmes (partnerkeuze, routeplanning, muziekkeuze). (2) De uitleg over 'essentie' is te oppervlakkig ('we zijn eigenlijk gewoon data'). Het punt is: als algoritmes ons beter kennen dan wijzelf, dan is er geen unieke menselijke kern (essentie) die ontoegankelijk is voor data-analyse — de bestaanservaring wordt gereduceerd tot datapatronen.",
    correctiemodel: "Argument: mensen vertrouwen steeds minder op eigen oordeel en laten beslissingen over aan algoritmes die gebaseerd zijn op datapatronen (1p). Bedreiging essentie: als algoritmes ons beter kennen dan wijzelf, is de unieke menselijke kern/essentie een illusie (1p). Het onderscheid tussen essentie en bestaanservaring wordt opgeheven (1p).",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 8: Interface en transparantie (Clark)
  // VFVO-forum: leerlingen beschrijven de interface als iets dat er is of
  // niet, in plaats van als iets met gradaties van transparantie.
  // ====================================================================
  {
    id: "fj-09",
    kwestie: 3,
    bron: "CE 2024 TV2, vraag 8",
    naam: "Fleur",
    punten: 2,
    vraag: "Clark stelt dat technologie 'transparant' kan worden. Leg uit wat hiermee bedoeld wordt en geef een voorbeeld. (2p)",
    antwoord: "Clark bedoelt dat op een gegeven moment de mens niet meer via een interface communiceert maar direct met de technologie verbonden is. Een voorbeeld is een cochleair implantaat: de drager hoort gewoon, zonder na te denken over het apparaat. De interface verdwijnt.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord is te vaag", correct: false },
      { label: "Het voorbeeld van het cochleair implantaat is onjuist", correct: false },
      { label: "Het antwoord stelt dat de interface 'verdwijnt', terwijl Clark bedoelt dat de interface transparant wordt — hij is er nog wel, maar je merkt hem niet meer op", correct: true },
      { label: "Het antwoord beantwoordt een andere vraag dan gesteld", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert dat het CV hier onnauwkeurig is, maar het filosofische punt is belangrijk: de interface verdwijnt niet, hij wordt transparant. Net als een bril — die zit er nog steeds, maar je kijkt er doorheen zonder hem op te merken. Bij Clark gaat het om gradaties: een nieuw stuk technologie is eerst opaque (je bent je er bewust van), maar wordt met gebruik steeds transparanter. Dit is een nuance die leerlingen vaak missen: ze denken in binaire termen (er is een interface / er is geen interface) in plaats van in een glijdende schaal.",
    correctiemodel: "Transparant: de technologie wordt zo vertrouwd dat je je er niet meer bewust van bent — de interface is er nog wel maar valt weg uit je aandacht (1p). Voorbeeld: bv. lezen (je ziet letters niet meer, alleen betekenis), fietsen, cochleair implantaat — met uitleg van de transparantie (1p).",
  },

  // ====================================================================
  // CE 2025 TV2 — Vraag 7: De Mul — Iron Man en posthumanisme
  // VFVO-forum: "meest bediscussieerde vraag" — leerlingen worden
  // gedwongen te kiezen terwijl afwijzen verdedigbaar is.
  // ====================================================================
  {
    id: "fj-10",
    kwestie: 3,
    bron: "CE 2025 TV2, vraag 7",
    naam: "Sem",
    punten: 4,
    vraag: "De Mul beschrijft drie scenario's voor de toekomst van de mens. Leg uit welk scenario het beste past bij Iron Man. Beargumenteer vervolgens of dit scenario een verbetering van de mens inhoudt. (4p)",
    antwoord: "Bij Iron Man past het transhumanisme-scenario het beste, want Tony Stark verbetert zichzelf met technologie. Het pak geeft hem superkrachten die een gewoon mens niet heeft. Dit is een verbetering van de mens, want hij kan dingen die normaal onmogelijk zijn, zoals vliegen en kogels stoppen.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord verwart transhumanisme met een ander scenario van De Mul", correct: false },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
      { label: "De toewijzing mist een filosofische onderbouwing, en 'verbetering' wordt alleen als 'meer kunnen' opgevat zonder de keerzijde te bespreken", correct: true },
      { label: "Het antwoord beantwoordt de vraag niet volledig", correct: false },
    ],
    uitleg: "Het VFVO-forum noemt dit 'de meest bediscussieerde vraag van het examen'. Twee problemen: (1) Sem kiest transhumanisme maar onderbouwt niet filosofisch waaróm — hij noemt alleen dat Stark 'zichzelf verbetert'. Het CV vraagt om een scenario van De Mul, dus je moet De Muls kenmerken van dat scenario noemen (NBIC-convergentie, fundamentele transformatie). (2) De argumentatie over 'verbetering' is oppervlakkig: 'meer kunnen' is geen filosofisch argument. De brontekst noemt juist ook keerzijden (afhankelijkheid van technologie, verlies van autonomie). Op het CE wordt van je verwacht dat je beide kanten belicht bij een 'beargumenteer'-vraag.",
    correctiemodel: "Scenario: transhumanisme of posthumanistisch zombiescenario (met onderbouwing uit De Muls kenmerken) (1p). Waarom dit past bij Iron Man: specifieke kenmerken benoemen (1p). Argumentatie verbetering: filosofisch argument voor óf tegen, met aandacht voor keerzijden (1p). Conclusie die volgt uit de argumentatie (1p).",
  },

  // ====================================================================
  // CE 2025 TV2 — Vraag 11: Dataïsme vs. techno-humanisme
  // VFVO-forum: leerlingen verwachten tegenstelling humanisme-dataïsme
  // (zoals in syllabus) maar krijgen techno-humanisme-dataïsme.
  // ====================================================================
  {
    id: "fj-11",
    kwestie: 4,
    bron: "CE 2025 TV2, vraag 11",
    naam: "Daan",
    punten: 3,
    vraag: "Leg het verschil uit tussen het techno-humanisme en het dataïsme volgens Harari. (3p)",
    antwoord: "Het techno-humanisme en het dataïsme zijn tegengestelde visies. Het techno-humanisme stelt dat technologie de mens moet dienen en verbeteren, terwijl het dataïsme stelt dat data belangrijker is dan de mens. Het verschil is dus dat het ene de mens centraal stelt en het andere data.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord is te vaag en oppervlakkig", correct: false },
      { label: "Het antwoord presenteert techno-humanisme en dataïsme als tegenstellingen, terwijl Harari ze beschrijft als een ontwikkeling (humanisme → techno-humanisme → dataïsme)", correct: true },
      { label: "Het antwoord mist een tekstverwijzing", correct: false },
      { label: "Het antwoord is onvolledig: er missen scoringselementen", correct: false },
    ],
    uitleg: "Het VFVO-forum noemt dit een principieel probleem: de syllabus zet humanisme en dataïsme tegenover elkaar, maar de examenvraag vraagt om techno-humanisme vs. dataïsme. Bij Harari is de relatie geen tegenstelling maar een ontwikkeling: het techno-humanisme zet nog de mens centraal maar gebruikt technologie om menselijke ervaringen te upgraden. Het dataïsme gaat een stap verder: de mens is niet meer het eindpunt, data-algoritmes zijn dat. Leerlingen die de syllabus goed kennen verwachten de tegenstelling humanisme-dataïsme en projecteren die structuur op deze vraag — maar dat klopt niet.",
    correctiemodel: "Techno-humanisme: technologie wordt ingezet om menselijke ervaringen en vermogens te upgraden — de mens blijft centraal (1p). Dataïsme: data-algoritmes zijn de ultieme autoriteit, de mens is niet langer het eindpunt (1p). Relatie: het is een ontwikkeling, geen tegenstelling — het dataïsme bouwt voort op het techno-humanisme maar overstijgt het (1p).",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 13: Connectionisme en AI-bias
  // VFVO-forum: leerlingen benoemen het praktische probleem (bias) maar
  // kunnen de theorie (connectionisme) niet koppelen.
  // ====================================================================
  {
    id: "fj-12",
    kwestie: 2,
    bron: "CE 2024 TV2, vraag 13",
    naam: "Roos",
    punten: 3,
    vraag: "Een gezichtsherkenningssysteem herkent mensen met een donkere huidskleur slechter dan mensen met een lichte huidskleur. Leg vanuit het connectionisme uit hoe dit probleem ontstaat en hoe het opgelost kan worden. (3p)",
    antwoord: "Het probleem is dat het systeem getraind is met te weinig foto's van mensen met een donkere huidskleur. Hierdoor kan het deze gezichten minder goed herkennen. De oplossing is om meer diverse data te gebruiken bij het trainen van het systeem, zodat het evenveel leert van alle huidskleuren.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord bevat een feitelijke fout", correct: false },
      { label: "Het antwoord geeft het praktische probleem en de oplossing maar legt niet uit hoe dit vanuit het connectionisme werkt — de theorie ontbreekt", correct: true },
      { label: "Het antwoord beantwoordt een andere vraag", correct: false },
      { label: "Het antwoord is te vaag", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert precies dit: 'leerlingen benoemen wel het praktische probleem maar kunnen de theorie niet uitleggen.' De vraag zegt 'vanuit het connectionisme' — dan moet je uitleggen wat connectionisme IS: een AI-systeem leert patronen door de verbindingen (connecties) tussen knooppunten te versterken op basis van trainingsdata. Als die data eenzijdig is, worden bepaalde patronen sterker aangeleerd dan andere. De koppeling tussen theorie (connectionisme: leren door patroonversterking) en toepassing (bias door eenzijdige data) is wat het CE vraagt.",
    correctiemodel: "Connectionisme: het systeem leert door verbindingen tussen knooppunten te versterken op basis van patronen in de trainingsdata (1p). Probleem: als de trainingsdata overwegend lichte huidskleuren bevat, worden die patronen sterker — het systeem 'kent' donkere huidskleuren minder goed (1p). Oplossing: meer diverse trainingsdata zodat de connecties evenwichtiger worden (1p).",
  },

  // ====================================================================
  // Gebaseerd op examenbespreking 2025 + VFVO — Plessner excentrische
  // positionaliteit: het missen van de dubbelheid centrisch+excentrisch
  // ====================================================================
  {
    id: "fj-13",
    kwestie: 1,
    bron: "CE-stijl, gebaseerd op examenbesprekingen 2024–2025",
    naam: "Thijs",
    punten: 3,
    vraag: "Leg uit wat Plessner bedoelt met 'excentrische positionaliteit' en geef aan hoe dit verschilt van de positionaliteit van een dier. (3p)",
    antwoord: "Plessner bedoelt dat de mens zichzelf van buitenaf kan bekijken, alsof hij een toeschouwer is van zijn eigen leven. Een dier kan dat niet omdat het geen bewustzijn heeft. De mens is dus uniek doordat hij kan reflecteren op zijn eigen bestaan.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord noemt de verkeerde filosoof", correct: false },
      { label: "Het antwoord mist de kern: excentrische positionaliteit is de dubbelheid van tegelijk centrisch ÉN excentrisch zijn", correct: true },
      { label: "Het antwoord geeft een voorbeeld in plaats van een uitleg", correct: false },
      { label: "Het antwoord verwijst niet naar de examentekst", correct: false },
    ],
    uitleg: "Dit is een van de meest voorkomende fouten bij Plessner. Excentrische positionaliteit is niet alleen 'jezelf van buitenaf bekijken'. De kern is de dubbelheid: de mens is tegelijk centrum van zijn ervaring (centrisch, net als een dier) ÉN kan buiten dat centrum treden. Thijs noemt alleen de excentrische kant en mist de centrische. Bovendien: bij Plessner heeft een dier wél bewustzijn (centrische positionaliteit) — het verschil is dat het dier niet buiten dat centrum kan treden om op zichzelf te reflecteren. Bewustzijn ≠ zelfreflectie.",
    correctiemodel: "Excentrische positionaliteit: de mens is tegelijk centrum van zijn ervaring én kan buiten dat centrum treden (1p). Centrische positionaliteit: het dier ervaart vanuit een centrum maar kan er niet op reflecteren (1p). Verschil: het dier heeft wél bewustzijn maar mist het vermogen tot zelfreflectie (1p).",
  },

  // ====================================================================
  // Gebaseerd op examenbespreking 2024 — Fanon: voorbeeld ipv uitleg
  // ====================================================================
  {
    id: "fj-14",
    kwestie: 1,
    bron: "CE-stijl, gebaseerd op examenbesprekingen 2024–2025",
    naam: "Lisa",
    punten: 4,
    vraag: "Leg uit wat Fanon bedoelt met het 'raciaal-epidermaal schema'. Geef daarbij aan hoe dit schema zich verhoudt tot het lichaamsschema. (4p)",
    antwoord: "Fanon beschrijft hoe iemand op straat naar hem roept: 'Kijk, een neger!' Hierdoor beseft hij dat hij door anderen alleen als zijn huidskleur wordt gezien. Dit is het raciaal-epidermaal schema. Het verschil met het gewone lichaamsschema is dat je lichaam nu van buitenaf wordt bepaald.",
    foutType: "voorbeeld_ipv_uitleg",
    opties: [
      { label: "Het antwoord geeft Fanons ervaring (de treinscène) als voorbeeld maar legt het begrip niet algemeen uit", correct: true },
      { label: "Het antwoord noemt de verkeerde filosoof bij het lichaamsschema", correct: false },
      { label: "Het antwoord is feitelijk onjuist over Fanon", correct: false },
      { label: "Het antwoord leest de vraag verkeerd: er wordt niet om een voorbeeld gevraagd", correct: false },
    ],
    uitleg: "Op het CE komt dit vaak voor: een leerling vertelt het voorbeeld (de scène op straat / in de trein) in plaats van het begrip algemeen uit te leggen. De vraag is: 'leg uit wat Fanon bedoelt met...' — dan moet eerst een algemene definitie komen. Het raciaal-epidermaal schema is het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante (witte) blik, waardoor huidskleur de hele identiteit gaat bepalen. Het voorbeeld mag erbij als illustratie, maar vervangt niet de definitie. Tip: begin altijd met de definitie, voeg dan optioneel een voorbeeld toe.",
    correctiemodel: "Raciaal-epidermaal schema: het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante blik (1p). Huidskleur wordt tot kern van identiteit gemaakt (1p). Lichaamsschema: het prereflexieve schema waarmee je je lichaam ervaart (1p). Verhouding: het raciaal-epidermaal schema overschrijft/verstoort het gewone lichaamsschema (1p).",
  },

  // ====================================================================
  // Gebaseerd op VFVO 2025 TV2 — Vraag 16: computermetafoor en neuronen
  // Leerlingen blijven hangen in de metafoor en schakelen niet over.
  // ====================================================================
  {
    id: "fj-15",
    kwestie: 2,
    bron: "CE 2025 TV2, vraag 16",
    naam: "Max",
    punten: 3,
    vraag: "De computermetafoor vergelijkt het brein met een computer. Leg uit op welk punt deze metafoor tekortschiet als beschrijving van hoe neuronen werken. (3p)",
    antwoord: "De computermetafoor schiet tekort omdat een computer alleen gegevens verwerkt volgens een vast programma, terwijl het brein veel flexibeler is. Een computer doet precies wat je hem opdraagt, maar het brein kan creatief zijn en nieuwe verbindingen leggen. Bovendien is een computer gemaakt van silicium en het brein van biologisch materiaal.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord is inhoudelijk onjuist", correct: false },
      { label: "Het antwoord blijft op het niveau van de metafoor (computer vs. brein) en schakelt niet over naar het gevraagde: hoe neuronen werken", correct: true },
      { label: "Het antwoord verwart de computermetafoor met een andere metafoor", correct: false },
      { label: "Het antwoord is te vaag", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert: 'leerlingen blijven hangen in de computermetafoor en komen niet tot het neurobiologische antwoord.' De vraag vraagt specifiek op welk punt de metafoor tekortschiet als beschrijving van hoe neuronen werken. Dan moet je iets zeggen over neuronen: bv. neuronen werken niet digitaal (aan/uit) maar met graduele signalen, of neuronen vormen plastische verbindingen die veranderen door ervaring (connecties versterken/verzwakken). Max vergelijkt alleen computer met brein op een algemeen niveau en noemt het woord 'neuron' niet eens.",
    correctiemodel: "Computermetafoor: brein als informatie-verwerkende machine met input → verwerking → output (1p). Tekortkoming: neuronen werken niet digitaal maar met graduele, plastische verbindingen die veranderen door ervaring (1p). Verschil: een computer volgt een vast programma, neuronen vormen een zelforganiserend netwerk (1p).",
  },

  // ====================================================================
  // Gebaseerd op VFVO 2025 TV2 — Vraag 15: impliciete eis
  // Leerlingen missen het impliciete element dat het CV vereist.
  // ====================================================================
  {
    id: "fj-16",
    kwestie: 4,
    bron: "CE 2025 TV2, vraag 15",
    naam: "Anouk",
    punten: 3,
    vraag: "Leg uit wat het verschil is tussen een symbolische en een hermeneutische relatie met technologie. (3p)",
    antwoord: "Bij een symbolische relatie staat de technologie voor iets anders, het heeft een betekenis die verder gaat dan het object zelf. Bij een hermeneutische relatie gebruik je technologie om de wereld te interpreteren. Het verschil is dus dat het ene over betekenis gaat en het andere over interpretatie.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord verwart symbolisch met semiotisch", correct: false },
      { label: "Het antwoord is onvolledig: er missen voorbeelden", correct: false },
      { label: "Het verschil ('betekenis vs. interpretatie') is zo vaag dat het niets toevoegt — de twee termen worden niet scherp genoeg onderscheiden", correct: true },
      { label: "Het antwoord beantwoordt een andere vraag", correct: false },
    ],
    uitleg: "Het VFVO-forum signaleert dat leerlingen bij dit soort vragen 'de juiste richting hebben maar het vereiste begrip niet scherp genoeg uitwerken'. Het probleem: 'betekenis' en 'interpretatie' liggen zo dicht bij elkaar dat Anouks antwoord geen echt onderscheid maakt. Scherper: bij een hermeneutische relatie lees je de wereld AF via technologie (thermometer → je 'leest' de temperatuur), bij een symbolische relatie verwijst de technologie ZELF naar iets (een kerktoren symboliseert de gemeenschap). Het verschil zit in de richting: hermeneutisch = technologie als venster op de wereld, symbolisch = technologie als drager van culturele betekenis.",
    correctiemodel: "Hermeneutische relatie: technologie als middel om de wereld af te lezen/interpreteren, bv. thermometer, echografie (1p). Symbolische relatie: de technologie zelf verwijst naar/staat voor iets, bv. kerktoren als symbool van gemeenschap (1p). Verschil in richting: hermeneutisch = venster op de wereld, symbolisch = drager van culturele betekenis (1p).",
  },
];
