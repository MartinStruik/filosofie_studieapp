// Foutenjacht: herken typische CE-fouten in spoof-antwoorden op echte examenvragen.
//
// Items zijn gebaseerd op de centraal schriftelijke examens VWO Filosofie 2024 en 2025
// (tijdvak 1 en 2). Per item: een echte CE-vraag (of een vraag in CE-stijl), een spoof-
// antwoord met een typische valkuil, en de juiste herkenning van die valkuil.
//
// Fouttypes — de zeven meest voorkomende fouten bij CE filosofie:
//   "vraag_niet_gelezen"   — antwoord gaat langs de vraag heen / mist een expliciet gevraagd element
//   "tekstverwijzing_mist" — "met behulp van tekst X" genegeerd, geen concrete verwijzing
//   "voorbeeld_ipv_uitleg" — geeft een voorbeeld terwijl om een algemene uitleg wordt gevraagd
//   "onvolledig"           — mist scoringselementen, beantwoordt maar de helft van de vraag
//   "te_vaag"              — geen filosofische taal, common sense, circulair, oppervlakkig
//   "begripsverwarring"    — verwante begrippen of filosofen door elkaar
//   "strategie"            — tijd verspild aan een vraag die je toch niet haalt; doorgaan was beter

export const FOUT_TYPES = {
  vraag_niet_gelezen:   { label: "Vraag niet goed gelezen",   color: "#c62828", icon: "👁️" },
  tekstverwijzing_mist: { label: "Tekstverwijzing ontbreekt", color: "#ad1457", icon: "📄" },
  voorbeeld_ipv_uitleg: { label: "Voorbeeld ipv uitleg",      color: "#6a1b9a", icon: "💡" },
  onvolledig:           { label: "Onvolledig antwoord",       color: "#e65100", icon: "✂️" },
  te_vaag:              { label: "Te vaag / niet filosofisch",color: "#00695c", icon: "🌫️" },
  begripsverwarring:    { label: "Begripsverwarring",         color: "#1565c0", icon: "🔄" },
  strategie:            { label: "Strategiefout",             color: "#5e35b1", icon: "⏱️" },
};

export const FOUTENJACHT_ITEMS = [

  // ====================================================================
  // CE 2025 TV1 — Vraag 2: Hubot en visuele waarneming
  // Klassieker: leerlingen focussen op "geen menselijk lichaam" terwijl
  // het plaatje toont dat de hubot wél een lichaam heeft. Plus: het rijtje
  // van drie functies staat alleen op syllabus p.30, niet in het lesboek.
  // ====================================================================
  {
    id: "fj-02",
    lia: [{ deel: 1, hoofdstuk: 6, pagina: "37–38" }, { deel: 1, hoofdstuk: 6, pagina: "38–39" }],
    kwestie: 2,
    bron: "CE 2025 TV1, vraag 2",
    casus: "In de serie Real Humans is hubot Anita net 'gereset': ze heeft geen herinneringen aan de tijd voor zij Anita werd. Soms komen beelden boven die zij niet herkent. Volgens Dreyfus bepaalt het menselijk lichaam hoe we onszelf ervaren. Hij noemt drie functies van het lichaam bij waarneming. Belangrijk: dat rijtje van drie staat op pagina 30 van de syllabus, en níet in het lesboek.",
    naam: "Tim",
    punten: 3,
    vraag: "Geef de andere twee functies van het menselijk lichaam volgens Dreyfus weer (één is al gegeven: verwachtingen overdragen tussen zintuigen). Leg vervolgens met een van deze twee functies en tekst 2 uit dat Anita verschilt van een mens. (3p)",
    antwoord: "Anita kan niet echt waarnemen omdat ze geen menselijk lichaam heeft. Een camera registreert alleen beelden, terwijl mensen hun lichaam gebruiken om de wereld te ervaren. Ze mist daardoor de menselijke ervaring; haar waarneming is fundamenteel anders dan die van een mens.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord blijft op het niveau van 'mensen ervaren met hun lichaam' zonder Dreyfus' specifieke begrippen of de gevraagde functies te benoemen", correct: false },
      { label: "Het antwoord noemt geen van de twee gevraagde functies van het lichaam, en herhaalt 'geen menselijk lichaam' — terwijl het plaatje juist een hubot-lichaam toont", correct: true },
      { label: "Het antwoord verwart Dreyfus' kritiek op functionalisme met Plessners excentrische positionaliteit, die over zelfreflectie en niet over waarneming gaat", correct: false },
      { label: "Het antwoord behandelt camera-zicht alsof Dreyfus' kritiek over input gaat, terwijl Dreyfus juist over verwachtingen en lichaamsgeschiedenis spreekt", correct: false },
    ],
    uitleg: "De vraag eist twee specifieke functies van het lichaam bij waarneming. Tim herhaalt 'geen menselijk lichaam' — maar het plaatje van de hubot toont juist wél een lichaam. Het echte probleem is dat de hubot een lichaam heeft zonder de drie functies die ervaring eraan koppelen. De drie functies die de syllabus (p.30) vereist zijn: (1) verwachtingen op basis van eerdere ervaringen, (2) verwachtingen die betekenis geven aan details in waarneming, (3) verwachtingen overdragen tussen zintuigen. Belangrijk om te weten: dit rijtje staat alléén in de syllabus, niet in het lesboek. Wie alleen het boek leert, mist deze vraag. Lees voor het CE altijd de syllabus erbij — dat document bepaalt het correctievoorschrift.",
    correctiemodel: "(1p) eerste functie: we hebben verwachtingen over onze waarneming, gebaseerd op eerdere ervaringen. (1p) tweede functie: verwachtingen geven betekenis aan details in de waarneming. (1p) uitleg met een van deze functies en tekst 2: Anita heeft geen lichamelijke ervaringen, dus geen verwachtingen op basis van eerdere ervaringen / geeft geen betekenis aan wat zij waarneemt.",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 6: Morton, mycelium en handelingsvermogen
  // Massa-fout: leerlingen halen plantenneurobiologie erbij, terwijl de
  // vraag om Mortons filosofische argumenten vraagt. Wetenschappelijk
  // bewijs is geen filosofisch argument.
  // ====================================================================
  {
    id: "fj-04",
    lia: [{ deel: 2, hoofdstuk: 12, pagina: "24–27" }],
    kwestie: 4,
    bron: "CE 2024 TV1, vraag 6",
    casus: "In het examen 2024 TV1 staat Jake Sully (de verlamde militair die in de film Avatar via een Na'vi-avatar de wereld van Pandora verkent) centraal. Bij deze vraag gaat het over het mycelium-netwerk dat wortels van planten verbindt: oudere bomen kunnen via dat netwerk meer water doorgeven aan eigen nakomelingen. Volgens Tim Morton hebben bomen daarmee, net als mensen, handelingsvermogen.",
    naam: "Jamal",
    punten: 2,
    vraag: "Leg met het voorbeeld van het mycelium een van de redenen van Morton uit dat bomen handelingsvermogen hebben, net als mensen. Geef vervolgens met het begrippenpaar 'vrijheid en determinisme' een argument dat bomen, in tegenstelling tot mensen, geen handelingsvermogen hebben. (2p)",
    antwoord: "Morton vindt dat planten actoren zijn omdat uit de plantenneurobiologie blijkt dat planten kunnen communiceren via schimmeldraadnetwerken. Ze sturen chemische signalen naar elkaar als er gevaar dreigt. Dit bewijst wetenschappelijk dat planten niet passief zijn maar actief reageren in hun omgeving.",
    foutType: "voorbeeld_ipv_uitleg",
    opties: [
      { label: "Het antwoord blijft hangen bij 'planten zijn niet passief' zonder Mortons begrippen mesh of dark ecology te gebruiken — te common-sense voor een filosofische uitleg", correct: false },
      { label: "Het antwoord vervangt Mortons filosofische argument door een wetenschappelijk-biologisch argument (plantenneurobiologie); zulk experimenteel bewijs is geen filosofisch argument", correct: true },
      { label: "Het antwoord verwart Morton met Latour: bij Latour zijn niet-mensen actoren in een netwerk, terwijl Mortons argument juist over ecologisch denken zelf gaat", correct: false },
      { label: "Het antwoord noemt het mycelium-voorbeeld correct, maar mist een verwijzing naar de specifieke passage in de examentekst over de bomen", correct: false },
    ],
    uitleg: "Een veelvoorkomende fout: leerlingen geven een wetenschappelijk argument (plantenneurobiologie, chemische signalen) terwijl Morton filosofische argumenten geeft. Mortons argumenten zijn (1) het mesh-argument: alles is verbonden in een netwerk zonder hiërarchie, dus planten zijn gelijkwaardige knooppunten met agency, en (2) ecologisch denken / dark ecology: we moeten onze antropocentrische blik loslaten. Het verschil tussen wetenschappelijk bewijs en filosofische argumentatie is op het CE cruciaal — een filosoof bouwt een redenering, geen experimenteel bewijs. Tweede deel van de vraag (vrijheid/determinisme) is in dit antwoord helemaal vergeten.",
    correctiemodel: "(1p) uitleg met mycelium dat bomen volgens Morton handelingsvermogen hebben: de grens tussen bewust en onbewust handelen is niet goed te trekken / het vermogen van mensen om vooruit te denken wordt overschat. (1p) argument met 'vrijheid en determinisme' dat bomen geen handelingsvermogen hebben: gedrag van bomen is niet vrij maar gedetermineerd.",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 12: Verbeek, moreel handelingsvermogen
  // Veelvoorkomende fout: leerlingen blijven hangen bij "nieuwe morele
  // dilemma's" en missen dat techniek het moreel handelingsvermogen zelf
  // verandert (nieuwe rollen, gedwongen keuzes). Onderscheid handelings-
  // vermogen vs oordeelsvermogen wordt vaak verward.
  // ====================================================================
  {
    id: "fj-05",
    lia: [{ deel: 2, hoofdstuk: 10, pagina: "13–18" }],
    kwestie: 3,
    bron: "CE 2024 TV1, vraag 12",
    casus: "Volgens Jacobs hebben we 'artonauten' nodig die met kunst en techniek nieuwe relaties tot de wereld onderzoeken. Thomas Thwaites probeerde in een speciaal pak met prothesen tussen de geiten te leven om in het bewustzijn van een geit te kruipen. Volgens Verbeek transformeert techniek het moreel handelingsvermogen van de mens.",
    naam: "Noor",
    punten: 2,
    vraag: "Leg deze opvatting van Verbeek uit. Beargumenteer vervolgens met Verbeeks opvatting of de techniek die Thwaites gebruikt volgens jou de morele blik op dieren zal veranderen. (2p)",
    antwoord: "Volgens Verbeek geeft techniek ons nieuwe morele dilemma's. Door echoscopie en ander medisch onderzoek zien we dingen die we vroeger niet zagen, en daardoor moeten we morele keuzes maken die er eerst niet waren. Dat is wat Verbeek bedoelt met morele bemiddeling.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord noemt 'echoscopie' en 'sociale media' terwijl de vraag om het voorbeeld van Thwaites' geit-experiment vraagt — verkeerde casus", correct: false },
      { label: "Het antwoord verwart 'nieuwe morele dilemma's' met 'verandering van het moreel handelingsvermogen' — Verbeek bedoelt dat techniek nieuwe rollen schept, niet alleen nieuwe vragen", correct: true },
      { label: "Het antwoord verwart Verbeek met Latour: techniek-bemiddeling is wel Verbeeks idee, maar 'morele bemiddeling' specifiek komt van Latour", correct: false },
      { label: "Het antwoord behandelt alleen het zien-aspect van technologie (zichtbaarheid van de foetus) en mist het derde scoreelement over inlijven", correct: false },
    ],
    uitleg: "Verbeeks kern: techniek verandert niet alleen welke morele kwesties we tegenkomen, maar ook ons vermogen om met die kwesties om te gaan. Nieuwe technologie schept nieuwe rollen (echoscopie maakt ouders tot beslisser), nieuwe handelingsmogelijkheden, gedwongen keuzes. 'Nieuwe morele dilemma's' is alleen de oppervlakte; het diepere punt is dat het moreel handelingsvermogen zelf transformeert. Verwar dit ook niet met 'moreel oordeelsvermogen' (waarneming/visie van morele situaties) — dat is een ander aspect. Bovendien: Noor laat het tweede deel van de vraag (argumenteren met Thwaites) volledig liggen.",
    correctiemodel: "(1p) uitleg Verbeek: nieuwe technologie levert niet alleen nieuwe morele dilemma's op, maar verandert ook ons vermogen om met die dilemma's om te gaan. (1p) argumentatie met Verbeeks opvatting of de techniek van Thwaites de morele blik op dieren zal veranderen.",
  },

  // ====================================================================
  // CE 2025 TV1 — Vraag 19: Despret, onzichtbaarheid van onderzoeker
  // Veelvoorkomende fout: leerlingen springen direct naar eigen mening
  // zonder Desprets kritiek samen te vatten. Het CV vereist dat de
  // kritiek correct wordt weergegeven vóór de argumentatie.
  // ====================================================================
  {
    id: "fj-06",
    lia: [{ deel: 2, hoofdstuk: 12, pagina: "28–30" }],
    kwestie: 1,
    bron: "CE 2025 TV1, vraag 19",
    casus: "Vinciane Despret merkt op dat katten niet meewerken zodra ze doorhebben dat hun vrijheid wordt beperkt; ze werken alleen mee bij een goede band met onderzoekers. Hun opstandigheid wordt vaak voor domheid aangezien. Despret bekritiseert het traditionele uitgangspunt van experimenteel dieronderzoek dat de onderzoeker onzichtbaar moet zijn.",
    naam: "Emma",
    punten: 1,
    vraag: "Beargumenteer met het voorbeeld van de katten of jij het eens bent met Desprets kritiek op uitgangspunt 2 (onzichtbaarheid van de onderzoeker). (1p)",
    antwoord: "Ik vind dat Despret gelijk heeft. Het is belangrijk dat onderzoekers een relatie opbouwen met de dieren die ze onderzoeken, anders krijg je geen goed beeld van het dier. Bij katten zie je dat ze pas meewerken als ze de onderzoeker vertrouwen.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord noemt Despret niet expliciet bij naam, maar gebruikt haar idee impliciet — formeel een fout, maar inhoudelijk veelal goedgekeurd", correct: false },
      { label: "Het antwoord beargumenteert wel, maar legt niet uit waarom onzichtbaarheid volgens Despret tot verkeerde conclusies leidt — alleen dát een relatie nuttig is", correct: true },
      { label: "Het antwoord verwart Desprets kritiek op uitgangspunt 2 (onzichtbaarheid) met haar kritiek op uitgangspunt 1 (derdepersoonsperspectief van het dier)", correct: false },
      { label: "Het antwoord noemt het katten-voorbeeld maar past het niet toe op het experimentele dieronderzoek dat Despret bekritiseert", correct: false },
    ],
    uitleg: "Bij een 'beargumenteer'-vraag verwacht het CV dat je Desprets kritiek correct samenvat én er een argument bij geeft. Emma slaat de kritiek-weergave over: zij zegt dat een relatie 'goed' is, maar legt niet uit dat onzichtbaarheid volgens Despret leidt tot een vooringenomen beeld. Het mechanisme is: als de onderzoeker zich verbergt, reageert het dier anders — het verbergt gedrag, is gestrest, toont niet zijn natuurlijke sociale repertoire. De onderzoeker beschrijft dan een gestrest dier alsof het natuurlijk gedrag is. Tip: in een argumentatievraag bouw je je standpunt altijd op een correcte weergave van de positie waar je op reageert.",
    correctiemodel: "(1p) argument voor of tegen Desprets kritiek op uitgangspunt 2: er ontstaat volgens Despret een vooringenomen beeld van dieren wanneer de relatie tussen dier en onderzoeker geen rol mag spelen, zoals bij katten waarvoor de band met de onderzoeker van belang is.",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 11: Vroon & Draaisma, historische contingentie
  // Klassieke vraag-CV-mismatch: vraag noemt 'historisch contingent',
  // CV eist het woord 'metaforen'. Wie alleen op vraagtekst leest mist
  // het scoreelement.
  // ====================================================================
  {
    id: "fj-16",
    lia: [{ deel: 1, hoofdstuk: 5, pagina: "32–33" }],
    kwestie: 3,
    bron: "CE 2024 TV1, vraag 11",
    casus: "De helikopterblik in tekst 1 (Ruben Jacobs) toont hoe nieuwe technieken nieuwe perspectieven op de werkelijkheid leveren. Vroon & Draaisma gaan een stap verder: zij stellen dat mensbeelden historisch contingent zijn omdat metaforen uit wetenschap en techniek mede bepalen hoe we onszelf begrijpen.",
    naam: "Charlotte",
    punten: 1,
    vraag: "Leg de opvatting van Vroon & Draaisma uit dat mensbeelden historisch contingent zijn. (1p)",
    antwoord: "Mensbeelden zijn historisch contingent omdat ze afhangen van de tijd waarin ze ontstaan. In de oudheid had men een ander beeld van de mens dan tegenwoordig. Wat als waarheid wordt gezien is afhankelijk van de cultuur en periode — daarom kan dit beeld in elke tijd anders zijn.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord is te vaag en herhaalt 'historisch' zonder iets toe te voegen aan wat 'contingent' filosofisch betekent", correct: false },
      { label: "Het antwoord legt 'historisch contingent' correct uit, maar noemt niet de kern bij Vroon & Draaisma: dat het over metaforen uit wetenschap en techniek gaat", correct: true },
      { label: "Het antwoord verwart contingentie met noodzakelijkheid — een mensbeeld dat van tijd afhangt is juist niet noodzakelijk", correct: false },
      { label: "Het antwoord verwijst niet naar tekst 1 over de helikopterblik, en mist daardoor de concrete koppeling tussen techniek en mensbeeld", correct: false },
    ],
    uitleg: "Klassieke valkuil. De vraag noemt 'historisch contingent', maar het CV eist expliciet het woord 'metafoor' (uit wetenschap en techniek). Charlotte legt contingentie correct uit, maar mist het Vroon & Draaisma-specifieke element. Dit is een voorbeeld van een vraag waar de vraagtekst en het correctievoorschrift niet helemaal op elkaar zijn afgestemd. Les: bouw bij een filosoof-specifieke vraag altijd hun kerntermen in. Als de vraag 'volgens X' of 'opvatting van X' bevat, controleer of je hun signature-begrippen hebt genoemd — niet alleen de algemene strekking.",
    correctiemodel: "(1p) uitleg dat mensbeelden historisch contingent zijn: veranderingen in de culturele context / in wetenschap en techniek beïnvloeden de metaforen die we gebruiken om te beschrijven wat er in onze geest omgaat.",
  },

  // ====================================================================
  // CE 2025 TV1 — Vraag 11: Plessner toepassen op Afrofuturisme
  // Veelvoorkomende fout: leerlingen leggen de drie begrippen correct
  // uit maar passen ze niet toe op de Afrofuturistische kritiek. In
  // een toepassingsvraag scoort uitleg-zonder-toepassing 0 punten.
  // ====================================================================
  {
    id: "fj-17",
    lia: [{ deel: 1, hoofdstuk: 3, pagina: "19–21" }, { deel: 1, hoofdstuk: 4, pagina: "26–27" }],
    kwestie: 4,
    bron: "CE 2025 TV1, vraag 11",
    casus: "Tekst 4 stelt dat afrofuturistische kunstwerken beginnen met het besef dat 'ras' een sociaal geconstrueerde fictie is; biologisch is er alleen verschil in huidskleur. Zwarte kunstenaars uit de Afrikaanse diaspora verbeelden hun eigen toekomstvisie als alternatief voor de raciale blik van het kolonialisme. Plessner spreekt van excentrische positionaliteit en de wet van bemiddelde onmiddellijkheid; Fanon stelt dat de bestaanservaring van mensen van kleur is gevormd door de blik van anderen.",
    naam: "Sarah",
    punten: 3,
    vraag: "Leg de afrofuturistische kritiek op de raciale blik van het kolonialisme in tekst 4 uit met: Fanons argument dat de bestaanservaring van mensen van kleur is gevormd door de blik van anderen, Plessners begrip excentrische positionaliteit, en Plessners wet van bemiddelde onmiddellijkheid. (3p)",
    antwoord: "Excentrische positionaliteit betekent dat de mens zichzelf van buitenaf kan beschouwen — dat is volgens Plessner typisch menselijk. De wet van bemiddelde onmiddellijkheid houdt in dat we onze ervaringen altijd bemiddelen via reflectie en taal. Volgens Fanon wordt de bestaanservaring van mensen van kleur gevormd door de blik van anderen: zij worden niet als zichzelf gezien, maar als hun huidskleur.",
    foutType: "vraag_niet_gelezen",
    opties: [
      { label: "Het antwoord verwart de inhoud van Plessners en Fanons begrippen met die van De Beauvoir — al die filosofen behandelen wel verwante thema's over de blik", correct: false },
      { label: "Het antwoord legt de drie begrippen correct uit, maar past ze niet toe op de afrofuturistische kritiek uit tekst 4 — terwijl de vraag om toepassing vraagt", correct: true },
      { label: "Het antwoord is feitelijk onjuist over excentrische positionaliteit: dat begrip gaat niet over zelfreflectie maar over biologische verschillen tussen soorten", correct: false },
      { label: "Het antwoord verwijst niet naar het kunstwerk in tekst 4 — zonder die specifieke koppeling blijft de uitleg los van de casus", correct: false },
    ],
    uitleg: "Belangrijke les: een vraag die zegt 'leg uit met begrip X' of 'leg uit met opvatting van Y' is een toepassingsvraag, geen uitlegvraag. Sarah geeft drie nette uitleggen, maar koppelt ze niet aan de afrofuturistische kritiek. Bij een toepassingsvraag scoort uitleg-zonder-toepassing nul punten — alle punten zitten in de koppeling. Toepassing zou hier zijn: (1) Fanon: de witte koloniale blik objectiveert het zwarte lichaam (concrete koppeling); (2) excentrische positionaliteit: afrofuturistische kunstenaars treden buiten het opgelegde beeld om er kritisch op te reflecteren; (3) bemiddelde onmiddellijkheid: hun directe ervaring is altijd bemiddeld door de raciale blik van anderen. Tip: per begrip moet één concrete brug naar de casus zichtbaar zijn — een eigennaam, een citaat, een specifieke situatie.",
    correctiemodel: "(1p) Fanon: uitspraken/blikken van witte mensen objectiveren/vertroebelen/overstemmen de bestaanservaring van zwarte mensen. (1p) excentrische positionaliteit: de mens bestaat niet alleen als centrum van zijn handelen/ervaren maar kan dit ook van buiten beschouwen. (1p) wet van bemiddelde onmiddellijkheid: we hebben als mens directe ervaringen en bemiddelen tegelijk tussen onszelf en de omgeving.",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 19: Extended vs Embedded cognition (VR-bril)
  // Vaak verwarring: leerlingen labelen iets als extended cognition
  // zonder uit te leggen dat de techniek een integraal onderdeel is van
  // het cognitieve proces — anders is het embedded.
  // ====================================================================
  {
    id: "fj-18",
    lia: [{ deel: 1, hoofdstuk: 7, pagina: "43–44" }, { deel: 1, hoofdstuk: 7, pagina: "43" }],
    kwestie: 3,
    bron: "CE 2024 TV1, vraag 19",
    casus: "Tekst 4 (Catlender) beschrijft een VR-bril waarmee chronische pijnpatiënten 'in hun eigen zenuwstelsel duiken': ze beginnen op de plek waar ze pijn voelen (bv. de onderrug) en beschieten de pijnpunten — kleine rode bolletjes — als in een schietspel. Het VR-spel kan begrepen worden vanuit 4E-cognitie. Twee 4E-begrippen: 'extended' (denken uitgebreid tot voorbij het lichaam) en 'enactive' (denken als lichamelijke activiteit in een omgeving).",
    naam: "Floris",
    punten: 2,
    vraag: "Leg met tekst 4 de 4E-begrippen 'extended' en 'enactive' uit. (2p)",
    antwoord: "Het VR-spel is een voorbeeld van extended cognition omdat de speler een hulpmiddel gebruikt dat buiten zijn lichaam ligt — de VR-bril breidt het denken uit. Enactive cognition zie je doordat de speler actief beweegt en handelt in de spelwereld, wat ook bij 4E hoort. Beide begrippen draaien om het idee dat denken niet alleen in het hoofd zit.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord verwart 'extended' met 'embedded' — een hulpmiddel dat alleen ondersteunt is embedded; voor extended moet de techniek integraal cognitief onderdeel zijn", correct: true },
      { label: "Het antwoord noemt het verkeerde voorbeeld: het VR-spel is geen geval van 4E-cognitie maar een gewoon hulpmiddel uit eerdere mens-techniek-relaties", correct: false },
      { label: "Het antwoord verwart 'enactive' met 'embodied' — beide zijn onderdelen van 4E maar 'enactive' benadrukt actie in een omgeving", correct: false },
      { label: "Het antwoord verwijst niet naar tekst 4 over de pijnpunten als rode bolletjes, waardoor de toepassing van de begrippen zwak onderbouwd blijft", correct: false },
    ],
    uitleg: "De 4E-begrippen liggen dicht bij elkaar en worden vaak door elkaar gehaald. Het verschil tussen extended en embedded: bij embedded gebruikt het brein de omgeving als ondersteuning (een notitieblok als geheugensteun), bij extended is het hulpmiddel een echt onderdeel geworden van het cognitieve proces (zonder de bril zou het denken stuk zijn). Floris stelt 'de bril breidt het denken uit', maar legt niet uit dat de bril integraal onderdeel is van denken — dan is het strikt gezien embedded. Voor extended moet je het criterium 'integraal cognitief onderdeel' expliciet aantonen. Het CV-antwoord voor extended in tekst 4: 'de VR-omgeving is onderdeel van het denkvermogen/bewustzijn'. Voor enactive moet je expliciet maken dat denken een lichamelijke activiteit IS in de omgeving (niet alleen 'er is beweging').",
    correctiemodel: "(1p) uitleg 'extended' met tekst 4: het denken is uitgebreid tot buiten het lichaam — de VR-omgeving is onderdeel van het denkvermogen/bewustzijn. (1p) uitleg 'enactive' met tekst 4: denken is een lichamelijke activiteit in en met een omgeving — de spelers hebben bewustzijn van hun pijn in de activiteit van hun lichaam in de VR-omgeving.",
  },

  // ====================================================================
  // CE 2024 TV1 — Vraag 17: Descartes en eerste-/derdepersoonsperspectief
  // Tegen-intuïtieve syllabus-positie: res cogitans wordt gekoppeld aan
  // het derdepersoonsperspectief (objectiverend), niet aan het eerste.
  // Dit staat in de syllabus en bepaalt het CV.
  // ====================================================================
  {
    id: "fj-19",
    lia: [{ deel: 1, hoofdstuk: 1, pagina: "5–9" }],
    kwestie: 2,
    bron: "CE 2024 TV1, vraag 17",
    casus: "Fenomenologen reageren op het dualisme van Descartes. Descartes onderscheidt res cogitans (denkend ding) en res extensa (uitgebreid lichaam) en beantwoordt de vraag naar de mens vanuit zowel het eerstepersoonsperspectief (kwalitatieve, innerlijke ervaring) als het derdepersoonsperspectief (objectiverende beschrijving van eigenschappen).",
    naam: "Lucas",
    punten: 2,
    vraag: "Leg uit dat Descartes de vraag naar de mens beantwoordt vanuit beide perspectieven. (2p)",
    antwoord: "Descartes hanteert het eerstepersoonsperspectief in zijn cogito ('ik denk, dus ik ben'): hij twijfelt aan alles, maar de innerlijke ervaring van het denken kan niet weggetwijfeld worden — dat is res cogitans. Vanuit het derdepersoonsperspectief beschrijft hij res extensa: het lichaam als uitgebreid materieel ding dat van buitenaf observeerbaar is.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord verwart res cogitans met res extensa — die laatste hoort juist bij het derdepersoonsperspectief volgens een academische lezing", correct: false },
      { label: "Het antwoord koppelt res cogitans aan eerstepersoonsperspectief — maar volgens de syllabus hoort res cogitans bij derdepersoonsperspectief (objectieve essentie)", correct: true },
      { label: "Het antwoord noemt Descartes als auteur van het cogito, terwijl het eerstepersoonsperspectief in deze syllabus juist aan de fenomenologen wordt toegeschreven", correct: false },
      { label: "Het antwoord blijft te abstract bij 'innerlijke ervaring' zonder concrete voorbeelden van wat Descartes onder kwalitatieve ervaring verstaat", correct: false },
    ],
    uitleg: "Dit is een tegen-intuïtief punt. Lucas' redenering ('het cogito is innerlijke ervaring, dus res cogitans = eerste persoon') klinkt logisch en is academisch verdedigbaar — maar de syllabus, die het correctievoorschrift bepaalt, koppelt res cogitans aan het derdepersoonsperspectief: het is een objectiverende beschrijving van wat de mens essentieel ís (een denkend ding). Het eerstepersoonsperspectief zit bij Descartes in de innerlijke kwalitatieve ervaring die voorafgaat aan het uittypen van res cogitans als essentie. Belangrijke les: het CE wordt gecorrigeerd op basis van de syllabus, niet op basis van wat in academische handboeken staat. Bij contra-intuïtieve onderdelen: lees de syllabus letterlijk.",
    correctiemodel: "(1p) uitleg eerstepersoonsperspectief: kwalitatieve, innerlijke ervaring. (1p) uitleg derdepersoonsperspectief: een beschrijving van de essentiële eigenschap van de mens als res cogitans.",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 1: Vroon & Draaisma — circulair antwoord
  // ====================================================================
  {
    id: "fj-07",
    lia: [{ deel: 1, hoofdstuk: 5, pagina: "32–33" }],
    kwestie: 3,
    bron: "CE 2024 TV2, vraag 1",
    casus: "Het examen 2024 TV2 opent met de vraag hoe filosofen de werkelijkheid ordenen. Vroon & Draaisma stellen dat metaforen uit wetenschap en technologie meebepalen hoe de mens zichzelf begrijpt — bijvoorbeeld de mens als 'machine' in de tijd van Descartes, als 'computer' in onze tijd.",
    naam: "Mila",
    punten: 1,
    vraag: "Leg de opvatting van Vroon & Draaisma uit dat metaforen uit wetenschap en technologie beïnvloeden hoe we onszelf als mens begrijpen. (1p)",
    antwoord: "We gebruiken metaforen uit wetenschap en technologie omdat die ons helpen om onszelf beter te begrijpen. Het brein is ingewikkeld en door het te vergelijken met een computer wordt het makkelijker te begrijpen. Metaforen maken abstracte dingen concreet.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord is circulair: 'om onszelf te begrijpen' herhaalt de vraag als antwoord — het kernpunt (geen letterlijke beschrijving beschikbaar) blijft liggen", correct: true },
      { label: "Het antwoord verwart Vroon & Draaisma met Lakoff & Johnson — die laatsten gaan over oriënterende metaforen, niet over historische contingentie van mensbeelden", correct: false },
      { label: "Het antwoord behandelt de computer-metafoor als voorbeeld zonder de algemene definitie van wat een metafoor doet eerst te geven", correct: false },
      { label: "Het antwoord noemt geen voorbeelden uit de examentekst en blijft daardoor abstract over wat 'aspecten van onszelf' zou moeten betekenen", correct: false },
    ],
    uitleg: "Mila schrijft dat metaforen helpen 'om onszelf te begrijpen' — maar dat stond al in de vraag. Het kernpunt bij Vroon & Draaisma: we gebruiken metaforen uit wetenschap en technologie voor aspecten van onszelf waarvoor we geen letterlijke beschrijving hebben. De metafoor is niet zomaar een verduidelijking, maar een noodzakelijke omweg omdat directe taal ontbreekt. Let op circulaire antwoorden: als je antwoord dezelfde woorden gebruikt als de vraag, voeg je waarschijnlijk niets toe.",
    correctiemodel: "(1p) uitleg Vroon & Draaisma: om aspecten van onszelf zonder letterlijke beschrijving te begrijpen, gebruiken we metaforen uit wetenschap/technologie / metaforen leiden tot nieuwe onderzoeksvragen.",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 5: Dataïsme — beschrijven ipv argumenteren
  // ====================================================================
  {
    id: "fj-08",
    lia: [{ deel: 2, hoofdstuk: 14, pagina: "41–42" }],
    kwestie: 4,
    bron: "CE 2024 TV2, vraag 5",
    casus: "Tekst 1 (Harari) beschrijft dataïsme: data en algoritmes zouden ons beter kennen dan wijzelf. Bedrijven als Google en Amazon herkennen patronen in ons gedrag. De vraag betrekt dit op het onderscheid essentie / bestaanservaring.",
    naam: "Bram",
    punten: 4,
    vraag: "Beargumenteer of het volgens jou een gevaar is als de mens zichzelf begrijpt als data. Ga daarbij in op: tekst 1, Harari's argument dat de mens data wordt, het begrip 'essentie', en het begrip 'bestaanservaring'. (4p)",
    antwoord: "Dataïsme is het idee dat data de belangrijkste bron van waarde is. Google en Amazon weten door onze zoekgeschiedenis en koopgedrag meer over ons dan wij zelf. Dit is een bedreiging voor de menselijke essentie omdat het betekent dat we eigenlijk gewoon data zijn.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord verwart dataïsme met techno-humanisme — bij Harari zijn dat verschillende fasen, niet hetzelfde idee", correct: false },
      { label: "Het antwoord beschrijft wat dataïsme IS in plaats van een argument vóór het gevaar te geven; bovendien blijft het begrip 'bestaanservaring' helemaal liggen", correct: true },
      { label: "Het antwoord leest de vraag als een uitleg-vraag in plaats van een argumenteer-vraag, en mist daardoor het scoringselement standpunt", correct: false },
      { label: "Het antwoord noemt Google en Amazon zonder die voorbeelden expliciet aan tekst 1 te koppelen — de tekstverwijzing ontbreekt", correct: false },
    ],
    uitleg: "Twee problemen. (1) Bram beschrijft wat dataïsme IS in plaats van een argument te geven VOOR of TEGEN het gevaar. Een argument zou zijn: mensen vertrouwen steeds minder op hun eigen oordeel en laten beslissingen over aan algoritmes (partnerkeuze, routeplanning) — dat ondermijnt menselijke autonomie. (2) De vraag eist vier elementen (tekst 1, Harari's argument, essentie, bestaanservaring) en hij raakt er twee oppervlakkig. Bij een 4p-vraag met expliciete bullets is elke bullet een scoreelement. Mis je er één, mis je een punt — geen herstel mogelijk in andere bullets.",
    correctiemodel: "(1p) tekst 1. (1p) Harari's argument: alles, inclusief de mens, is uit te drukken in data / te begrijpen als algoritme. (1p) essentie als set essentiële eigenschappen. (1p) bestaanservaring als de manier waarop mensen hun bestaan ervaren.",
  },

  // ====================================================================
  // CE 2025 TV2 — Vraag 7: De Mul, Iron Man / Morbius scenario's
  // ====================================================================
  {
    id: "fj-10",
    lia: [{ deel: 2, hoofdstuk: 11, pagina: "19–23" }],
    kwestie: 4,
    bron: "CE 2025 TV2, vraag 7",
    casus: "De Marvel-figuren Iron Man (Tony Stark, met neurotechnologie via Jarvis) en Morbius (biochemicus die zichzelf via DNA-aanpassing geneest en vampier-eigenschappen krijgt) zijn op te vatten als voorbeelden van toekomstscenario's voor de mens. Jos de Mul beschrijft drie scenario's.",
    naam: "Sem",
    punten: 3,
    vraag: "Leg uit van welk scenario van De Mul superheld Morbius een voorbeeld is. Leg vervolgens uit van welk scenario van De Mul superheld Iron Man een voorbeeld is. Beargumenteer tot slot welk van beide scenario's jij een verbetering van de mens vindt. (3p)",
    antwoord: "Bij Iron Man past het scenario waarin technologie de mens verbetert, want Tony Stark gebruikt zijn pak om superkrachten te krijgen. Bij Morbius gaat het over een mens die anders wordt door wetenschap. Ik vind Iron Man een verbetering, want hij kan dingen die normaal onmogelijk zijn, zoals vliegen en kogels stoppen.",
    foutType: "te_vaag",
    opties: [
      { label: "Het antwoord verwart het transhumanisme-scenario van De Mul met het posthumanistische zombiescenario — beide gaan over technologische verandering, maar van verschillende aard", correct: false },
      { label: "Het antwoord noemt geen specifieke namen voor De Muls scenario's (alienscenario, zwermgeestscenario), en 'verbetering' wordt opgevat als 'meer kunnen' zonder filosofische afweging", correct: true },
      { label: "Het antwoord verwijst niet naar tekst 1 over Iron Man en Morbius — de specifieke kenmerken van die superhelden blijven daardoor abstract", correct: false },
      { label: "Het antwoord behandelt alleen Iron Man en mist Morbius — bij een vraag met twee voorbeelden tellen beide als afzonderlijke scoreelementen", correct: false },
    ],
    uitleg: "Twee tekortkomingen. (1) De Mul heeft specifieke namen voor zijn scenario's: Morbius past bij het alienscenario / transhumanisme (biochemische transformatie van de menselijke levensvorm), Iron Man bij het zwermgeestscenario / extrahumanisme (neurotechnologische verbetering van cognitie). Sem omschrijft ze vaag zonder de filosofische termen — dat scoort niet. (2) Bij een 'beargumenteer'-vraag verwacht het CV een filosofische afweging. 'Vliegen en kogels stoppen' is een common-sense argument, geen filosofisch argument. Een filosofische afweging zou keerzijden meenemen: afhankelijkheid van technologie, verlies van autonomie, ethische vragen rond identiteit.",
    correctiemodel: "(1p) uitleg Morbius als alienscenario / transhumanisme: biochemische transformatie van de menselijke levensvorm. (1p) uitleg Iron Man als zwermgeestscenario / extrahumanisme: neurotechnologische verbetering van de menselijke cognitie. (1p) argumentatie welk scenario een verbetering is, met afweging van beide scenario's met bijbehorende superhelden.",
  },

  // ====================================================================
  // CE 2025 TV2 — Vraag 11: Techno-humanisme vs dataïsme (ontwikkeling)
  // ====================================================================
  {
    id: "fj-11",
    lia: [{ deel: 2, hoofdstuk: 14, pagina: "41–42" }],
    kwestie: 4,
    bron: "CE 2025 TV2, vraag 11",
    casus: "Yuval Noah Harari beschrijft in zijn werk een ontwikkeling: van humanisme via techno-humanisme naar dataïsme. In het techno-humanisme staan de verlangens van de mens nog centraal en wordt techniek ingezet om die te dienen; in het dataïsme zijn data-algoritmes de ultieme autoriteit.",
    naam: "Daan",
    punten: 1,
    vraag: "Leg de ontwikkeling van techno-humanisme naar dataïsme uit. (1p)",
    antwoord: "Het techno-humanisme en het dataïsme zijn tegengestelde visies. Het techno-humanisme stelt dat technologie de mens moet dienen en verbeteren, terwijl het dataïsme stelt dat data belangrijker is dan de mens. Het verschil is dus dat het ene de mens centraal stelt en het andere data.",
    foutType: "begripsverwarring",
    opties: [
      { label: "Het antwoord blijft te oppervlakkig: 'mens centraal vs data centraal' raakt de strekking maar mist Harari's specifieke begrippen over upgrade en algoritmes", correct: false },
      { label: "Het antwoord presenteert techno-humanisme en dataïsme als tegenstellingen, terwijl Harari ze beschrijft als een ontwikkeling — dataïsme bouwt voort op techno-humanisme", correct: true },
      { label: "Het antwoord verwijst niet naar de toekomstvisie van Stern in tekst 1 — die context is nodig om de ontwikkeling concreet te maken", correct: false },
      { label: "Het antwoord is onvolledig: een derde scoringselement over de overgang humanisme→techno-humanisme blijft onbesproken", correct: false },
    ],
    uitleg: "Bij Harari is de relatie geen tegenstelling maar een ontwikkeling. Het techno-humanisme zet nog de mens centraal maar gebruikt technologie om menselijke ervaringen te upgraden. Het dataïsme gaat een stap verder: de mens is niet meer het eindpunt, data-algoritmes zijn dat. Leerlingen die elders de tegenstelling humanisme-dataïsme hebben geleerd projecteren die structuur soms op deze vraag — maar de vraag eist juist dat je het continuüm beschrijft. Tip: bij een 'ontwikkeling van X naar Y'-vraag is je antwoord altijd: hoe Y voortkomt uit X, niet alleen hoe ze verschillen.",
    correctiemodel: "(1p) uitleg ontwikkeling: het techno-humanisme stelt de verlangens van de mens centraal, terwijl in het dataïsme alleen data nog waarde hebben.",
  },

  // ====================================================================
  // CE 2024 TV2 — Vraag 13: Connectionisme en discriminerende AI
  // ====================================================================
  {
    id: "fj-12",
    lia: [{ deel: 1, hoofdstuk: 6, pagina: "37–38" }],
    kwestie: 2,
    bron: "CE 2024 TV2, vraag 13",
    casus: "Sommige neurale netwerken voor gezichtsherkenning bleken discriminerend: vooral vrouwen van kleur werden vaak verkeerd herkend, omdat de trainingsdata voor 80% witte mensen en 75% mannen bevatte. Connectionisten stellen dat KI menselijk denkvermogen kan simuleren via zelflerende neurale netwerken.",
    naam: "Roos",
    punten: 2,
    vraag: "Leg de connectionistische opvatting uit. Leg vervolgens uit dat het probleem van discriminerende gezichtsherkenning vanuit het connectionisme opgelost kan worden. (2p)",
    antwoord: "Het probleem is dat het systeem getraind is met te weinig foto's van vrouwen van kleur. Hierdoor kan het deze gezichten minder goed herkennen. De oplossing is om meer diverse data te gebruiken bij het trainen van het systeem, zodat het evenveel leert van alle gezichten.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord bevat een feitelijke fout over neurale netwerken: trainingsdata zijn juist wel divers in moderne systemen, dus het probleem zou niet bestaan", correct: false },
      { label: "Het antwoord geeft het praktische probleem en de oplossing maar legt niet uit wat connectionisme als theorie inhoudt — die uitleg is het eerste scoreelement", correct: true },
      { label: "Het antwoord beantwoordt eigenlijk een vraag over Verbeeks moreel handelingsvermogen in plaats van over connectionisme als denkmodel", correct: false },
      { label: "Het antwoord blijft te common-sense ('meer foto's gebruiken') zonder de filosofische taal van zelflerend vermogen of patroonherkenning te gebruiken", correct: false },
    ],
    uitleg: "Roos benoemt het praktische probleem en de oplossing, maar slaat de eerste helft van de vraag over: 'leg de connectionistische opvatting uit'. Dat is een eigen scoreelement (1p). Connectionisme als theorie: neurale netwerken hebben net als mensen zelflerend vermogen — ze leren patronen door verbindingen tussen knooppunten te versterken op basis van trainingsdata. Pas met die theorie als basis kun je het bias-probleem 'vanuit het connectionisme' oplossen: door gevarieerde input een beter prototype laten ontstaan. Tip: bij meerstapsvragen check je elke stap apart op aanwezigheid in je antwoord.",
    correctiemodel: "(1p) uitleg connectionisme: neurale netwerken hebben net als mensen zelflerend vermogen. (1p) uitleg oplossing: door gevarieerde input kan het neurale netwerk zelf een beter prototype samenstellen.",
  },

  // ====================================================================
  // CE-stijl — Plessner excentrische positionaliteit
  // De dubbelheid centrisch + excentrisch wordt vaak vergeten.
  // ====================================================================
  {
    id: "fj-13",
    lia: [{ deel: 1, hoofdstuk: 3, pagina: "19–21" }],
    kwestie: 1,
    bron: "CE-stijl, gebaseerd op CE 2024 TV1 vraag 13",
    casus: "Plessner komt in meerdere CE-examens terug. De excentrische positionaliteit is een kernbegrip uit Kwestie 1 dat leerlingen vaak te eenzijdig uitleggen — ze vergeten de centrische kant.",
    naam: "Thijs",
    punten: 3,
    vraag: "Leg uit wat Plessner bedoelt met 'excentrische positionaliteit' en geef aan hoe dit verschilt van de positionaliteit van een dier. (3p)",
    antwoord: "Plessner bedoelt dat de mens zichzelf van buitenaf kan bekijken, alsof hij een toeschouwer is van zijn eigen leven. Een dier kan dat niet omdat het geen bewustzijn heeft. De mens is dus uniek doordat hij kan reflecteren op zijn eigen bestaan.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord noemt de verkeerde filosoof: zelfreflectie is wel onderdeel van Plessners filosofische antropologie, maar het kernbegrip is van Heidegger", correct: false },
      { label: "Het antwoord mist de dubbelheid: excentrische positionaliteit betekent tegelijk centrisch ÉN excentrisch zijn — niet alleen 'van buitenaf bekijken'", correct: true },
      { label: "Het antwoord geeft een algemeen voorbeeld van zelfreflectie in plaats van het excentriciteits-begrip filosofisch te definiëren", correct: false },
      { label: "Het antwoord verwijst niet naar de relevante examentekst over Plessners biologische benadering, waardoor de toepassing zwak blijft", correct: false },
    ],
    uitleg: "Veelvoorkomende fout bij Plessner. Excentrische positionaliteit is niet alleen 'jezelf van buitenaf bekijken'. De kern is de dubbelheid: de mens is tegelijk centrum van zijn ervaring (centrisch, net als een dier) ÉN kan buiten dat centrum treden. Thijs noemt alleen de excentrische kant. Bovendien: bij Plessner heeft een dier wél bewustzijn (centrische positionaliteit) — het verschil is dat het dier niet buiten dat centrum kan treden om op zichzelf te reflecteren. Bewustzijn ≠ zelfreflectie.",
    correctiemodel: "(1p) excentrische positionaliteit: de mens is tegelijk centrum van zijn ervaring én kan buiten dat centrum treden. (1p) centrische positionaliteit: het dier ervaart vanuit een centrum maar kan er niet op reflecteren. (1p) verschil: het dier heeft wél bewustzijn maar mist het vermogen tot zelfreflectie.",
  },

  // ====================================================================
  // CE-stijl — Fanon raciaal-epidermaal schema (voorbeeld ipv uitleg)
  // ====================================================================
  {
    id: "fj-14",
    lia: [{ deel: 1, hoofdstuk: 4, pagina: "26–27" }],
    kwestie: 1,
    bron: "CE-stijl, gebaseerd op CE 2024 TV1 vraag 4",
    casus: "Fanon beschrijft de ervaring van een zwarte man die op straat wordt aangesproken ('Kijk, een neger!'). Deze scène illustreert hoe het raciaal-epidermaal schema het gewone lichaamsschema overschrijft. In het CE 2024 TV1 wordt dit ook gekoppeld aan Jake (Avatar): bij Fanon gaat het om iets onveranderlijks (huidskleur), bij Jake om veranderlijke daden.",
    naam: "Lisa",
    punten: 4,
    vraag: "Leg uit wat Fanon bedoelt met het 'raciaal-epidermaal schema'. Geef daarbij aan hoe dit schema zich verhoudt tot het lichaamsschema. (4p)",
    antwoord: "Fanon beschrijft hoe iemand op straat naar hem roept: 'Kijk, een neger!' Hierdoor beseft hij dat hij door anderen alleen als zijn huidskleur wordt gezien. Dit is het raciaal-epidermaal schema. Het verschil met het gewone lichaamsschema is dat je lichaam nu van buitenaf wordt bepaald.",
    foutType: "voorbeeld_ipv_uitleg",
    opties: [
      { label: "Het antwoord geeft Fanons ervaring (de scène op straat) als voorbeeld maar legt het begrip niet algemeen uit — een definitie ontbreekt", correct: true },
      { label: "Het antwoord verwart het lichaamsschema (Sheets-Johnstone, Merleau-Ponty) met Plessners excentrische positionaliteit", correct: false },
      { label: "Het antwoord is feitelijk onjuist over Fanon: niet huidskleur maar uitspraak van de ander vormt zijn punt", correct: false },
      { label: "Het antwoord leest de vraag verkeerd: er wordt om de verhouding gevraagd, maar het antwoord behandelt alleen het raciaal-epidermale schema zelf", correct: false },
    ],
    uitleg: "Vaak voorkomend op het CE: een leerling vertelt het voorbeeld (de scène op straat) in plaats van het begrip algemeen uit te leggen. De vraag is: 'leg uit wat Fanon bedoelt met...' — dan moet eerst een algemene definitie komen. Het raciaal-epidermaal schema is het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante (witte) blik, waardoor huidskleur de hele identiteit gaat bepalen. Belangrijke nuance die in dit antwoord ontbreekt: bij Fanon gaat het om iets onveranderlijks (huidskleur als biologisch gegeven dat een sociale lading krijgt) — anders dan bij Jake (Avatar), die op zijn veranderlijke daden wordt beoordeeld. Dat verschil is filosofisch belangrijk: Fanon raakt iets dieper omdat de objectivering niet wegtrekt door je gedrag te veranderen. Tip: begin altijd met de definitie, voeg dan optioneel een voorbeeld toe.",
    correctiemodel: "(1p) raciaal-epidermaal schema: het schema dat van buitenaf op het zwarte lichaam wordt gelegd door de dominante blik. (1p) huidskleur (iets onveranderlijks) wordt tot kern van identiteit gemaakt. (1p) lichaamsschema: het prereflexieve schema waarmee je je lichaam ervaart. (1p) verhouding: het raciaal-epidermaal schema overschrijft/verstoort het gewone lichaamsschema.",
  },

  // ====================================================================
  // CE 2025 TV2 — Vraag 16: Computermetafoor en neuronen
  // Leerlingen blijven hangen op metafoor-niveau (computer vs brein)
  // en schakelen niet over naar het gevraagde niveau (neurale netwerken).
  // ====================================================================
  {
    id: "fj-15",
    lia: [{ deel: 1, hoofdstuk: 5, pagina: "32–33" }, { deel: 1, hoofdstuk: 6, pagina: "37–38" }],
    kwestie: 2,
    bron: "CE 2025 TV2, vraag 16",
    casus: "Toekomstvisies over computerchips in het brein versterken de computermetafoor voor de mens. De computermetafoor was oorspronkelijk gebaseerd op traditionele computers met symboolmanipulatie; later kwamen neurale netwerken die zelflerend zijn. Volgens Vroon en Draaisma zijn machinemetaforen historisch contingent.",
    naam: "Max",
    punten: 3,
    vraag: "Leg de computermetafoor uit met het begrip symboolmanipulatie. Beargumenteer vervolgens of de computermetafoor volgens jou helpt om de mens te begrijpen. Ga daarbij in op: neurale netwerken, en Vroon & Draaisma's stelling dat machinemetaforen historisch contingent zijn. (3p)",
    antwoord: "De computermetafoor schiet tekort omdat een computer alleen gegevens verwerkt volgens een vast programma, terwijl het brein veel flexibeler is. Een computer doet precies wat je hem opdraagt, maar het brein kan creatief zijn en nieuwe verbindingen leggen. Bovendien is een computer gemaakt van silicium en het brein van biologisch materiaal.",
    foutType: "onvolledig",
    opties: [
      { label: "Het antwoord is inhoudelijk onjuist: een computer kan wel zelflerend zijn, dus de vergelijking met het brein is niet zo verschillend als geschetst", correct: false },
      { label: "Het antwoord blijft op het niveau van de metafoor (computer vs. brein) en raakt de twee verplichte bullets — neurale netwerken én Vroon & Draaisma — niet", correct: true },
      { label: "Het antwoord verwart de computermetafoor met de cognitieve assemblage van Hayles — beide hebben met informatie te maken maar zijn verschillende concepten", correct: false },
      { label: "Het antwoord blijft te abstract over het verschil silicium-biologisch zonder de filosofische lading van metaforen volgens Vroon & Draaisma uit te werken", correct: false },
    ],
    uitleg: "Bij 'beargumenteer ... ga daarbij in op X en Y' zijn X en Y twee aparte scoreelementen, geen optionele richtingen. Max behandelt geen van beide. (1) Neurale netwerken: in de moderne computermetafoor zijn computers ook zelflerend en patroon-herkennend, dus de metafoor is rijker dan 'symboolmanipulatie'. (2) Vroon & Draaisma's contingentie: de metafoor verandert door de tijd onder invloed van cultuur en techniek — zonder dat element mis je het tweede punt. Bovendien legt Max symboolmanipulatie niet uit als concept (omzetting van input via een reeks instructies in output). Tip: onderstreep tijdens je examen elke 'ga in op'-bullet en vink ze af in je antwoord.",
    correctiemodel: "(1p) uitleg computermetafoor met symboolmanipulatie: het menselijk brein werkt net als een computer door middel van de omzetting van input (prikkels) in output (gedrag), via een reeks instructies. (1p) argumentatie waarbij wordt ingegaan op neurale netwerken die net als de mens zelflerend zijn / patronen kunnen herkennen. (1p) argumentatie waarbij wordt ingegaan op Vroon & Draaisma's stelling dat machinemetaforen onder invloed van cultuur door de tijd heen veranderen.",
  },

  // ====================================================================
  // CE 2025 TV1 — Vraag 20 (bullet 2): Hermeneutiek (Dilthey)
  // Meta-item: deze vraag is voor vrijwel niemand haalbaar. Strategische
  // les: schrijf kort op wat je weet en ga door — verspil geen tijd.
  // ====================================================================
  {
    id: "fj-20",
    lia: [{ deel: 2, hoofdstuk: 12, pagina: "28–29" }],
    kwestie: 1,
    bron: "CE 2025 TV1, vraag 20",
    casus: "Bij vragen over technologie voor het meten van psychisch welbevinden van dieren komt de hermeneutiek als wetenschappelijke methode in beeld: een benadering die interpretatie en betekenis centraal stelt, anders dan de natuurwetenschappelijke methode van verklaren via causale wetten. De hermeneutiek (Dilthey) komt zelden in lesboeken expliciet voor.",
    naam: "Eva",
    punten: 1,
    vraag: "Geef met interpretatie als methode binnen de wetenschap een argument tegen de opvatting van het dataïsme dat psychisch welbevinden van dieren via technologie kan worden vastgesteld. (1p)",
    antwoord: "Ik heb hier eerlijk gezegd geen idee van. Misschien dat dataïsme niet werkt omdat het te kil is. Of dat dieren niet zomaar in cijfers zijn te vatten omdat ze emoties hebben die niet meetbaar zijn. Eigenlijk weet ik dit niet, maar ik heb hier 8 minuten over nagedacht en dit is wat ik kan opschrijven. Ik denk dat alles in cijfers vatten verkeerd is.",
    foutType: "strategie",
    opties: [
      { label: "Het antwoord is te vaag — er ontbreekt filosofische taal en de specifieke termen verstaan/verklaren komen niet voor", correct: false },
      { label: "Het antwoord verspilt 8 minuten op een 1p-vraag waarvan vrijwel niemand het juiste antwoord weet — de juiste strategie is kort opschrijven en doorlopen", correct: true },
      { label: "Het antwoord verwart hermeneutiek met fenomenologie — beide kennistheoretische tradities, maar fenomenologie gaat over directe ervaring, niet interpretatie", correct: false },
      { label: "Het antwoord noemt geen voorbeeld uit de tekst over psychisch welbevinden van dieren, en blijft daardoor te algemeen", correct: false },
    ],
    uitleg: "Een belangrijke les over examenstrategie. Sommige CE-vragen zijn objectief moeilijk: heel specifieke kennis (hier: hermeneutiek/Dilthey), contra-intuïtief, en niet of nauwelijks in het lesboek behandeld. Voor zulke vragen geldt: als jij het niet weet, weten de meeste anderen het ook niet. De N-term (de normalisatieterm) corrigeert dit massale puntenverlies bij de eindscore. Strategie tijdens het examen: (1) herken de onmogelijke vraag aan signalen — heel specifieke term, geen herkenning bij jou, lage puntenwaarde; (2) schrijf kort op wat je vermoedt of weet (1-2 zinnen, hooguit 1 minuut); (3) ga door. Eva sloopt 8 minuten op 1p — die tijd had ze ergens anders met meer rendement kunnen besteden. Het juiste antwoord hier: interpretatie als methode is gericht op het begrijpen van betekenis (verstaan), niet op het causaal verklaren — en betekenis valt buiten wat data kunnen vangen.",
    correctiemodel: "(1p) argument tegen, met interpretatie als methode binnen de wetenschap die is gericht op het begrijpen van betekenis.",
  },

];
