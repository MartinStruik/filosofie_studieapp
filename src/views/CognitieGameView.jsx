import { useState, useCallback } from "react";

/* ───── data ───── */

const E_COLORS = {
  embodied: "#C0392B",
  embedded: "#E67E22",
  extended: "#27AE60",
  enactive: "#2980B9",
};

const E_LABELS = {
  embodied: "Embodied",
  embedded: "Embedded",
  extended: "Extended",
  enactive: "Enactive",
};

const ROUND1_QS = [
  { q: "Je voelt intuïtief aan dat de melk zuur is door eraan te ruiken, nog vóórdat je erover nadenkt.", answer: "embodied", explain: "Je lichaam (neus, zintuigen) levert kennis op die niet eerst door bewust nadenken gaat. Je hebt een sensomotorisch gevoel dat aan de reflectie voorafgaat — dat is embodied cognition: bewustzijn en kennis hebben een lichamelijke basis." },
  { q: "Een piloot leert vliegen in een simulator. Na weken training voelt het vliegtuig aan als een verlengstuk van zijn lichaam. Hij hoeft niet meer na te denken over zijn handelingen.", answer: "enactive", explain: "De piloot leert door te doen — doen komt vóór denken, denken komt voort uit doen. Zijn kennis van het vliegen ontstaat in de dynamische wisselwerking tussen zijn sensomotorische lichaam en de omgeving. Hij maakt geen gebruik van mentale representaties, maar van de wereld zelf." },
  { q: "Je gebruikt Google Maps om de weg te vinden. Zonder je telefoon zou je verdwaald zijn.", answer: "extended", explain: "Google Maps functioneert als een uitbreiding van je geheugen en navigatievermogen. Net als het notitieboekje van Otto: de informatie zit buiten je hoofd maar is deel van je cognitieve systeem — een cognitieve extensie." },
  { q: "Een leerling maakt een som met potlood en papier. Dat is makkelijker dan uit je hoofd rekenen, maar het denkwerk zelf doe je nog steeds in je hoofd.", answer: "embedded", explain: "De syllabus noemt dit exacte voorbeeld: potlood en papier als hulpmiddel ondersteunen het denken. Maar het denken zelf wordt bij embedded nog steeds opgevat als iets dat puur in het brein gebeurt. De omgeving is een hulpmiddel, geen onderdeel van het cognitieve proces (dat zou extended zijn)." },
  { q: "Iemand die in een rolstoel zit, ervaart de wereld fundamenteel anders dan iemand die kan lopen. De fysieke eigenschappen van het lichaam bepalen hoe je de omgeving waarneemt.", answer: "embodied", explain: "De fysieke eigenschappen van het lichaam bepalen onze bewegingsmogelijkheden en de kwaliteit van onze zintuiglijke gewaarwordingen. Ons bewustzijn en onze kennis hebben een lichamelijke basis — een sensomotorisch gevoel van 'zelf' dat aan de reflectie voorafgaat." },
  { q: "Scrabble-spelers herschikken hun letterblokjes op het rekje om op nieuwe woorden te komen. Het schuiven IS het denken.", answer: "extended", explain: "Clark & Chalmers gebruiken dit exacte voorbeeld in hun tekst The Extended Mind: 'het herschikken van de letters op het rekje is geen deel van het handelen; het vormt deel van het denken.' De blokjes zijn een cognitieve extensie — het cognitieve proces breidt zich uit buiten het hoofd." },
  { q: "Een kind leert fietsen. Het maakt geen gebruik van een mentale representatie van 'evenwicht' — het leert het door met zijn sensomotorische lichaam de omgeving af te tasten.", answer: "enactive", explain: "Enactivisten stellen: we maken geen gebruik van mentale representaties van de wereld maar van de wereld zelf. Denken is geen symboolmanipulatie in de geest maar manipulatie van objecten in de wereld. Het bewustzijn krijgt vorm in de activiteiten van het organisme in zijn omgeving." },
  { q: "Studenten in een bibliotheek denken beter na dan in een lawaaierig café. De stille omgeving ondersteunt hun concentratie, maar het denkwerk vindt nog steeds plaats in hun hoofd.", answer: "embedded", explain: "Een levend wezen kan sommige denkprocessen niet of moeilijker uitvoeren als het zich niet in een bepaalde omgeving bevindt. De omgeving is hier een hulpmiddel voor het denken — niet een onderdeel ervan. Let op het verschil met extended: bij embedded denkt het brein nog zelf, bij extended IS de omgeving deel van het cognitieve proces." },
  { q: "Je raast in een Porsche over de Autobahn. Even sluit je je ogen en haal je je handen van het stuur. Toch heb je nog steeds 'het Porscherijdengevoel'.", answer: "enactive", explain: "Het exacte voorbeeld van O'Regan, Myin & Noë uit primaire tekst 6: het Porscherijdengevoel is niet afkomstig van zintuiglijke prikkels, en ook niet van breinmechanismen. Het is geconstitueerd door het feit dat je je beroept op je impliciete kennis van wat er zou gebeuren als je het gaspedaal indrukt of aan het stuur komt." },
  { q: "Otto lijdt aan Alzheimer en schrijft alles op in zijn notitieboekje. Het boekje speelt voor Otto dezelfde rol als het biologisch geheugen voor Inga.", answer: "extended", explain: "Het gedachte-experiment van Clark & Chalmers uit The Extended Mind (1998): het notitieboekje is een cognitieve extensie — het functioneert als Otto's geheugen. De informatie erin is een 'sluimerende overtuiging', net als bij Inga's biologisch geheugen. 'Er is niets heilig aan huid en schedel.'" },
];

const ROUND2_PHILS = [
  {
    name: "Clark & Chalmers",
    aliases: ["clark", "chalmers", "clark en chalmers", "clark & chalmers", "andy clark", "david chalmers"],
    clues: [
      "Wij schreven een beroemd artikel in 1998.",
      "Wij stelden de vraag: 'Waar eindigt de geest en begint de rest van de wereld?'",
      "Wij bedachten het verhaal van Otto en zijn notitieboekje.",
      "Wij pleiten voor 'actief externalisme': de omgeving stuurt cognitieve processen.",
      "Ons kernidee: 'Er is niets heilig aan huid en schedel.'",
    ],
    reveal: "Andy Clark (1957) & David Chalmers (1966) — auteurs van The Extended Mind. Het notitieboekje van Otto functioneert als zijn geheugen. 'Er is niets heilig aan huid en schedel.'",
  },
  {
    name: "Hubert Dreyfus",
    aliases: ["dreyfus", "hubert dreyfus"],
    clues: [
      "Ik schreef al in 1972 een boek over de grenzen van kunstmatige intelligentie.",
      "Ik ben sceptisch over met name sterke AI: het volledig nabootsen van menselijk denken.",
      "Het lichaam heeft drie functies bij waarneming die een computer niet kan nabootsen: verwachtingen, aandachtsrichten en zintuiglijke overdracht.",
      "Ik gebruik het voorbeeld van paardenrennen: een computer kan niet inschatten welke informatie relevant is.",
      "Mijn kernargument: de functies van ons belichaamde denken kunnen niet worden uitgevoerd op de hardware van een computer.",
    ],
    reveal: "Hubert Dreyfus — bekritiseerde het idee dat AI menselijk denken kan repliceren. Het lichaam is een mogelijkheidsvoorwaarde voor ervaring. Alledaagse kennis (achtergrondpraktijken) is niet in logische regels te vatten.",
  },
  {
    name: "O'Regan, Myin & Noë",
    aliases: ["noë", "noe", "alva noë", "alva noe", "o'regan", "oregan", "myin", "o'regan myin noë", "o'regan myin noe"],
    clues: [
      "Wij schreven primaire tekst 6 in de syllabus, uit 2005.",
      "Onze tekst heet: 'Zintuiglijk bewustzijn (beter) verklaard door lijfelijkheid en waarschuwingsvermogen'.",
      "Wij gebruiken het voorbeeld van rijden in een Porsche versus een tractor.",
      "Volgens ons brengt neurale activiteit niet direct fenomenale ervaring voort.",
      "Ervaring is geconstitueerd door impliciete kennis van hoe prikkels zullen wijzigen wanneer je handelt.",
    ],
    reveal: "J. Kevin O'Regan, Erik Myin & Alva Noë (2005) — enactivisten. Neurale activiteit maakt de verkennende activiteit mogelijk waaruit ervaring bestaat.",
  },
  {
    name: "Dick Swaab",
    aliases: ["swaab", "dick swaab"],
    clues: [
      "Ik ben een Nederlandse arts en neurobioloog, geboren in 1944.",
      "Ik schreef het boek 'Wij zijn ons brein: van baarmoeder tot Alzheimer'.",
      "Volgens mij beantwoordt hersenonderzoek de vraag waarom we zijn zoals we zijn.",
      "De interactie van zenuwcellen produceert onze 'geest' — bewustzijn, emoties, moraliteit, vrije wil.",
      "Ik vind de computermetafoor goed gevonden: hersenen zijn biologische machines die informatie verwerken.",
    ],
    reveal: "Dick Swaab (1944) — arts en neurobioloog. 'Wij zijn ons brein.' De 4E-filosofen bekritiseren zijn reductie van de mens tot breinfuncties.",
  },
  {
    name: "René Descartes",
    aliases: ["descartes", "rené descartes", "rene descartes"],
    clues: [
      "Ik leefde van 1596-1650 en wordt gezien als de vader van de moderne filosofie.",
      "De mens is res cogitans (denkend ding), het dier slechts res extensa (lichaam).",
      "Mijn substantiedualisme levert een probleem op: hoe veroorzaakt een fysiek proces een niet-fysiek bewustzijn?",
      "De enactivisten zeggen: dit probleem ontstaat doordat ik geest en lichaam zo strikt scheidde.",
      "'Cogito ergo sum' — Ik denk, dus ik ben.",
    ],
    reveal: "René Descartes (1596-1650) — substantiedualisme scheidt geest en lichaam. De 4E-cognitie bekritiseert dit.",
  },
];

const ROUND3_SCENARIOS = [
  {
    scenario: "Maya is chirurg. Tijdens een operatie voelt ze het weefsel via haar instrumenten alsof haar vingers het aanraken. Ze hoeft niet na te denken over haar handbewegingen. Ze gebruikt een scherm met realtime beelden en haar assistent fluistert meetwaarden.",
    correctEs: ["embodied", "embedded", "extended", "enactive"],
    analysis: "Alle 4 E's! EMBODIED: sensomotorisch gevoel dat aan reflectie voorafgaat. EMBEDDED: belichting en meetwaarden zijn hulpmiddelen. EXTENDED: het scherm is een cognitieve extensie. ENACTIVE: doen komt vóór denken.",
  },
  {
    scenario: "Yusuf speelt in een band. Zijn vingers bewegen sneller dan hij kan denken. Hij heeft een setlist op een standaard en een effectenpedaal. Na het optreden zegt hij: 'Ik dacht niet na — de muziek speelde zichzelf.'",
    correctEs: ["embodied", "embedded", "extended", "enactive"],
    analysis: "EMBODIED: sensomotorisch gevoel dat aan reflectie voorafgaat. EMBEDDED: bandleden en akoestiek ondersteunen denken. EXTENDED: setlist = extern geheugen (net als Otto's boekje). ENACTIVE: 'de muziek speelde zichzelf' — geen mentale representaties maar de wereld zelf.",
  },
  {
    scenario: "Lisa zit in het examen filosofie. Ze maakt aantekeningen in de kantlijn en tekent pijltjes tussen begrippen. 'Als ik niet mag schrijven, kan ik niet denken,' zegt ze. Na het examen bespreekt ze antwoorden met een vriendin en komt op een beter argument.",
    correctEs: ["embodied", "embedded", "extended", "enactive"],
    analysis: "EMBEDDED: pen en papier als hulpmiddel (syllabus-voorbeeld). Als aantekeningen deel van het cognitieve proces zijn = EXTENDED (Scrabble-voorbeeld). EMBODIED: fysiek schrijven activeert sensomotorisch denkproces. ENACTIVE: gesprek toont dat denken ontstaat in interactie.",
  },
  {
    scenario: "Jaro draagt een smartwatch die zijn hartslag en stressniveau meet. 'Mijn horloge zegt dat ik gestrest ben,' zegt hij, terwijl hij zich prima voelt. Later krijgt hij toch hoofdpijn.",
    correctEs: ["embodied", "extended"],
    analysis: "EXTENDED: smartwatch als cognitieve extensie voor zelfkennis. EMBODIED: de eerste-persoonservaring ('ik voel me prima') is ook kennis — sensomotorisch gevoel dat de data tegenspreekt. Spanning: functionalisten (Swaab) vertrouwen de data; 4E-filosofen nemen belichaamde ervaring serieuzer.",
  },
];

const ROUND4_STMTS = [
  { stmt: "Volgens 4E-cognitie denken we ALLEEN met ons brein.", answer: "onwaar", explain: "Onwaar — dat bestrijdt 4E juist. We denken met brein + lichaam + omgeving." },
  { stmt: "Het notitieboekje van Otto is volgens Clark & Chalmers letterlijk onderdeel van Otto's geheugen.", answer: "waar", explain: "Waar — het vervult dezelfde functionele rol als biologisch geheugen." },
  { stmt: "Embodied cognition zegt dat denken een hersenproces is dat het lichaam aanstuurt.", answer: "onwaar", explain: "Onwaar — embodied cognition stelt het tegenovergestelde: bewustzijn heeft een lichamelijke basis in een sensomotorisch gevoel." },
  { stmt: "Het verschil tussen embedded en extended cognition is glashelder.", answer: "onwaar", explain: "Onwaar — bij embedded is de omgeving hulpmiddel en denkt het brein nog zelf. Bij extended zijn hulpmiddelen onderdeel van het cognitieve proces." },
  { stmt: "Het Porsche-voorbeeld van O'Regan, Myin & Noë laat zien dat ervaring voortkomt uit hersenactiviteit.", answer: "onwaar", explain: "Onwaar — het laat juist het tegenovergestelde zien." },
  { stmt: "Dreyfus was een fan van kunstmatige intelligentie.", answer: "onwaar", explain: "Onwaar — Dreyfus was sceptisch over sterke AI." },
  { stmt: "Enactivisme stelt: doen komt vóór denken, en denken komt voort uit doen.", answer: "waar", explain: "Waar — bewustzijn ontstaat in belichaamde interactie." },
  { stmt: "Een rekenmachine is altijd een voorbeeld van extended cognition.", answer: "nuance", explain: "Nuance! Hangt ervan af hoe je hem gebruikt." },
  { stmt: "Swaab en de 4E-filosofen zijn het eigenlijk met elkaar eens.", answer: "onwaar", explain: "Onwaar — Swaab reduceert tot hersenprocessen, 4E bestrijdt dat." },
  { stmt: "Ingrijpen op iemands omgeving kan even erg zijn als ingrijpen op de persoon zelf.", answer: "waar", explain: "Waar — Clark & Chalmers schrijven dit letterlijk." },
  { stmt: "Connectionisme lost alle bezwaren van Dreyfus op.", answer: "onwaar", explain: "Onwaar — connectionisme betrekt lichaam niet." },
  { stmt: "4E-cognitie is een kritiek op zowel Descartes' dualisme als op het cognitivisme.", answer: "waar", explain: "Waar — 4E bekritiseert beide." },
];

/* ───── shared styles ───── */

const headerFont = "'Playfair Display', Georgia, serif";
const PRIMARY = "#4A90D9";

const cardStyle = {
  background: "#fff",
  border: "1px solid #e8e8f0",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "12px",
};

const btnBase = {
  border: "none",
  borderRadius: "12px",
  padding: "14px 18px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

const primaryBtn = {
  ...btnBase,
  background: PRIMARY,
  color: "#fff",
};

const outlineBtn = {
  ...btnBase,
  background: "#fff",
  color: PRIMARY,
  border: `1.5px solid ${PRIMARY}`,
};

/* ───── helpers ───── */

function ProgressBar({ current, total, label }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginBottom: "4px" }}>
        <span>{label}</span>
        <span>{current}/{total}</span>
      </div>
      <div style={{ height: "6px", background: "#e8e8f0", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: PRIMARY, borderRadius: "3px", transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

export function CognitieGameView({ progress, setProgress }) {
  // phase: "start" | "r1intro" | "r1" | "r2intro" | "r2" | "r3intro" | "r3" | "r4intro" | "r4" | "end"
  const [phase, setPhase] = useState("start");

  // Round 1 state
  const [r1Idx, setR1Idx] = useState(0);
  const [r1Answered, setR1Answered] = useState(false);
  const [r1Pick, setR1Pick] = useState(null);
  const [r1Score, setR1Score] = useState(0);

  // Round 2 state
  const [r2Idx, setR2Idx] = useState(0);
  const [r2ClueCount, setR2ClueCount] = useState(1);
  const [r2Guess, setR2Guess] = useState("");
  const [r2Solved, setR2Solved] = useState(false);
  const [r2Score, setR2Score] = useState(0);
  const [r2Failed, setR2Failed] = useState(false);

  // Round 3 state
  const [r3Idx, setR3Idx] = useState(0);
  const [r3Checked, setR3Checked] = useState({ embodied: false, embedded: false, extended: false, enactive: false });
  const [r3Submitted, setR3Submitted] = useState(false);
  const [r3Score, setR3Score] = useState(0);

  // Round 4 state
  const [r4Idx, setR4Idx] = useState(0);
  const [r4Answered, setR4Answered] = useState(false);
  const [r4Pick, setR4Pick] = useState(null);
  const [r4Score, setR4Score] = useState(0);

  /* ── Round 1 handlers ── */
  const r1Answer = useCallback((e) => {
    const correct = e === ROUND1_QS[r1Idx].answer;
    setR1Pick(e);
    setR1Answered(true);
    if (correct) setR1Score(s => s + 1);
  }, [r1Idx]);

  const r1Next = useCallback(() => {
    if (r1Idx + 1 < ROUND1_QS.length) {
      setR1Idx(i => i + 1);
      setR1Answered(false);
      setR1Pick(null);
    } else {
      setPhase("r2intro");
    }
  }, [r1Idx]);

  /* ── Round 2 handlers ── */
  const r2Phil = ROUND2_PHILS[r2Idx];

  const r2CheckGuess = useCallback(() => {
    if (!r2Guess.trim()) return;
    const g = r2Guess.trim().toLowerCase();
    const match = r2Phil.aliases.some(a => g.includes(a) || a.includes(g));
    if (match) {
      const pts = Math.max(1, 6 - r2ClueCount);
      setR2Score(s => s + pts);
      setR2Solved(true);
    } else {
      // wrong guess — no penalty, just shake or ignore
      setR2Guess("");
    }
  }, [r2Guess, r2Phil, r2ClueCount]);

  const r2NextHint = useCallback(() => {
    if (r2ClueCount < r2Phil.clues.length) {
      setR2ClueCount(c => c + 1);
    } else {
      // all hints used, reveal
      setR2Failed(true);
      setR2Solved(true);
    }
  }, [r2ClueCount, r2Phil]);

  const r2Next = useCallback(() => {
    if (r2Idx + 1 < ROUND2_PHILS.length) {
      setR2Idx(i => i + 1);
      setR2ClueCount(1);
      setR2Guess("");
      setR2Solved(false);
      setR2Failed(false);
    } else {
      setPhase("r3intro");
    }
  }, [r2Idx]);

  /* ── Round 3 handlers ── */
  const r3Toggle = useCallback((e) => {
    setR3Checked(prev => ({ ...prev, [e]: !prev[e] }));
  }, []);

  const r3Submit = useCallback(() => {
    const sc = ROUND3_SCENARIOS[r3Idx];
    let pts = 0;
    ["embodied", "embedded", "extended", "enactive"].forEach(e => {
      const shouldBeChecked = sc.correctEs.includes(e);
      const isChecked = r3Checked[e];
      if (shouldBeChecked && isChecked) pts += 1;
      if (!shouldBeChecked && isChecked) pts -= 1;
    });
    setR3Score(s => s + Math.max(0, pts));
    setR3Submitted(true);
  }, [r3Idx, r3Checked]);

  const r3Next = useCallback(() => {
    if (r3Idx + 1 < ROUND3_SCENARIOS.length) {
      setR3Idx(i => i + 1);
      setR3Checked({ embodied: false, embedded: false, extended: false, enactive: false });
      setR3Submitted(false);
    } else {
      setPhase("r4intro");
    }
  }, [r3Idx]);

  /* ── Round 4 handlers ── */
  const r4Answer = useCallback((pick) => {
    setR4Pick(pick);
    setR4Answered(true);
    if (pick === ROUND4_STMTS[r4Idx].answer) setR4Score(s => s + 1);
  }, [r4Idx]);

  const r4Next = useCallback(() => {
    if (r4Idx + 1 < ROUND4_STMTS.length) {
      setR4Idx(i => i + 1);
      setR4Answered(false);
      setR4Pick(null);
    } else {
      setPhase("end");
    }
  }, [r4Idx]);

  /* ── Scoring ── */
  const maxR1 = ROUND1_QS.length; // 10
  const maxR2 = ROUND2_PHILS.length * 5; // 25
  const maxR3Total = ROUND3_SCENARIOS.reduce((s, sc) => s + sc.correctEs.length, 0); // 14
  const maxR4 = ROUND4_STMTS.length; // 12
  const maxTotal = maxR1 + maxR2 + maxR3Total + maxR4; // 61
  const totalScore = r1Score + r2Score + r3Score + r4Score;
  const pct = Math.round((totalScore / maxTotal) * 100);

  /* ── Save best on end ── */
  const saveScore = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      cognitieGameBest: Math.max(prev.cognitieGameBest || 0, pct),
    }));
  }, [pct, setProgress]);

  const resetGame = useCallback(() => {
    setPhase("start");
    setR1Idx(0); setR1Answered(false); setR1Pick(null); setR1Score(0);
    setR2Idx(0); setR2ClueCount(1); setR2Guess(""); setR2Solved(false); setR2Score(0); setR2Failed(false);
    setR3Idx(0); setR3Checked({ embodied: false, embedded: false, extended: false, enactive: false }); setR3Submitted(false); setR3Score(0);
    setR4Idx(0); setR4Answered(false); setR4Pick(null); setR4Score(0);
  }, []);

  /* ═══════════════ RENDER ═══════════════ */

  const wrap = (children) => (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "16px" }}>
      {children}
    </div>
  );

  /* ── START SCREEN ── */
  if (phase === "start") {
    const best = progress.cognitieGameBest;
    return wrap(
      <>
        <h2 style={{ fontFamily: headerFont, fontSize: "22px", color: "#1a1a2e", marginBottom: "8px", marginTop: 0 }}>
          4E Cognitie Game
        </h2>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
          Test je kennis van de vier E's: <strong style={{ color: E_COLORS.embodied }}>embodied</strong>,{" "}
          <strong style={{ color: E_COLORS.embedded }}>embedded</strong>,{" "}
          <strong style={{ color: E_COLORS.extended }}>extended</strong> en{" "}
          <strong style={{ color: E_COLORS.enactive }}>enactive</strong> cognitie.
          Vier rondes, gebaseerd op de examenstof.
        </p>

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>
            <strong>Ronde 1</strong> — Welke E? (10 vragen)<br />
            <strong>Ronde 2</strong> — Wie ben ik? (5 filosofen)<br />
            <strong>Ronde 3</strong> — Scenario-analyse (4 scenario's)<br />
            <strong>Ronde 4</strong> — Waar / Onwaar / Nuance (12 stellingen)
          </div>
        </div>

        {best != null && (
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px", textAlign: "center" }}>
            Beste score: <strong style={{ color: PRIMARY }}>{best}%</strong>
          </div>
        )}

        <button style={primaryBtn} onClick={() => setPhase("r1intro")}>
          Start de game
        </button>
      </>
    );
  }

  /* ── ROUND INTRO SCREENS ── */
  if (phase === "r1intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", marginTop: 0 }}>Ronde 1: Welke E?</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
          Je krijgt een situatie te zien. Kies welke E er bij past: embodied, embedded, extended of enactive.
        </p>
        <button style={primaryBtn} onClick={() => setPhase("r1")}>Begin ronde 1</button>
      </>
    );
  }

  if (phase === "r2intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", marginTop: 0 }}>Ronde 2: Wie ben ik?</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
          Per filosoof verschijnen aanwijzingen een voor een. Hoe eerder je raadt, hoe meer punten!
        </p>
        <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
          Score ronde 1: <strong>{r1Score}/{maxR1}</strong>
        </div>
        <button style={primaryBtn} onClick={() => setPhase("r2")}>Begin ronde 2</button>
      </>
    );
  }

  if (phase === "r3intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", marginTop: 0 }}>Ronde 3: Scenario-analyse</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
          Lees het scenario en vink aan welke E's er van toepassing zijn. Meerdere antwoorden kunnen juist zijn.
        </p>
        <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
          Score ronde 2: <strong>{r2Score}/{maxR2}</strong>
        </div>
        <button style={primaryBtn} onClick={() => setPhase("r3")}>Begin ronde 3</button>
      </>
    );
  }

  if (phase === "r4intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", marginTop: 0 }}>Ronde 4: Waar / Onwaar / Nuance</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
          Beoordeel elke stelling: is het waar, onwaar of genuanceerd?
        </p>
        <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
          Score ronde 3: <strong>{r3Score}/{maxR3Total}</strong>
        </div>
        <button style={primaryBtn} onClick={() => setPhase("r4")}>Begin ronde 4</button>
      </>
    );
  }

  /* ── ROUND 1 ── */
  if (phase === "r1") {
    const q = ROUND1_QS[r1Idx];
    const es = ["embodied", "embedded", "extended", "enactive"];
    return wrap(
      <>
        <ProgressBar current={r1Idx + 1} total={ROUND1_QS.length} label="Ronde 1 — Welke E?" />
        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <p style={{ fontSize: "15px", color: "#1a1a2e", lineHeight: 1.6, margin: 0 }}>{q.q}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {es.map(e => {
            const isCorrect = e === q.answer;
            const isPicked = e === r1Pick;
            let bg = "#fff";
            let borderColor = "#e8e8f0";
            let textColor = "#1a1a2e";
            if (r1Answered) {
              if (isCorrect) { bg = "#eafaf0"; borderColor = "#27AE60"; textColor = "#27AE60"; }
              else if (isPicked && !isCorrect) { bg = "#fdf0ef"; borderColor = "#C0392B"; textColor = "#C0392B"; }
              else { bg = "#f5f5f5"; textColor = "#aaa"; borderColor = "#e8e8f0"; }
            }
            return (
              <button
                key={e}
                onClick={() => !r1Answered && r1Answer(e)}
                disabled={r1Answered}
                style={{
                  ...btnBase,
                  background: bg,
                  color: textColor,
                  border: `2px solid ${borderColor}`,
                  borderLeft: `5px solid ${E_COLORS[e]}`,
                  textAlign: "left",
                  opacity: r1Answered && !isCorrect && !isPicked ? 0.6 : 1,
                  cursor: r1Answered ? "default" : "pointer",
                }}
              >
                {E_LABELS[e]}
              </button>
            );
          })}
        </div>
        {r1Answered && (
          <>
            <div style={{ ...cardStyle, background: r1Pick === q.answer ? "#eafaf0" : "#fdf0ef", borderColor: r1Pick === q.answer ? "#27AE60" : "#C0392B" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: r1Pick === q.answer ? "#27AE60" : "#C0392B" }}>
                {r1Pick === q.answer ? "Goed!" : `Helaas — het juiste antwoord is ${E_LABELS[q.answer]}.`}
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{q.explain}</p>
            </div>
            <button style={primaryBtn} onClick={r1Next}>
              {r1Idx + 1 < ROUND1_QS.length ? "Volgende" : "Naar ronde 2"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── ROUND 2 ── */
  if (phase === "r2") {
    const phil = ROUND2_PHILS[r2Idx];
    const visibleClues = phil.clues.slice(0, r2ClueCount);
    const possiblePts = Math.max(1, 6 - r2ClueCount);

    return wrap(
      <>
        <ProgressBar current={r2Idx + 1} total={ROUND2_PHILS.length} label="Ronde 2 — Wie ben ik?" />

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          {visibleClues.map((c, i) => (
            <div key={i} style={{
              fontSize: "14px", color: "#1a1a2e", lineHeight: 1.6,
              padding: "6px 0",
              borderBottom: i < visibleClues.length - 1 ? "1px solid #e8e8f0" : "none",
            }}>
              <span style={{ color: PRIMARY, fontWeight: 700, marginRight: "8px" }}>{i + 1}.</span>
              {c}
            </div>
          ))}
        </div>

        {!r2Solved && (
          <>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
              Punten bij goed antwoord nu: <strong style={{ color: PRIMARY }}>{possiblePts}</strong>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="text"
                value={r2Guess}
                onChange={e => setR2Guess(e.target.value)}
                onKeyDown={e => e.key === "Enter" && r2CheckGuess()}
                placeholder="Typ je antwoord..."
                style={{
                  flex: 1,
                  border: "1.5px solid #e8e8f0",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
              <button style={{ ...primaryBtn, width: "auto", padding: "12px 20px" }} onClick={r2CheckGuess}>
                Raad
              </button>
            </div>
            {r2ClueCount < phil.clues.length && (
              <button style={outlineBtn} onClick={r2NextHint}>
                Volgende hint ({r2ClueCount}/{phil.clues.length})
              </button>
            )}
            {r2ClueCount >= phil.clues.length && (
              <button style={{ ...outlineBtn, color: "#C0392B", borderColor: "#C0392B" }} onClick={() => { setR2Failed(true); setR2Solved(true); }}>
                Ik weet het niet — laat zien
              </button>
            )}
          </>
        )}

        {r2Solved && (
          <>
            <div style={{
              ...cardStyle,
              background: r2Failed ? "#fdf0ef" : "#eafaf0",
              borderColor: r2Failed ? "#C0392B" : "#27AE60",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: r2Failed ? "#C0392B" : "#27AE60", marginBottom: "6px" }}>
                {r2Failed ? `Het was: ${phil.name}` : `Goed! +${Math.max(1, 6 - r2ClueCount)} punten`}
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{phil.reveal}</p>
            </div>
            <button style={primaryBtn} onClick={r2Next}>
              {r2Idx + 1 < ROUND2_PHILS.length ? "Volgende filosoof" : "Naar ronde 3"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── ROUND 3 ── */
  if (phase === "r3") {
    const sc = ROUND3_SCENARIOS[r3Idx];
    const es = ["embodied", "embedded", "extended", "enactive"];
    return wrap(
      <>
        <ProgressBar current={r3Idx + 1} total={ROUND3_SCENARIOS.length} label="Ronde 3 — Scenario-analyse" />

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: 1.7, margin: 0 }}>{sc.scenario}</p>
        </div>

        <div style={{ fontSize: "13px", color: "#555", marginBottom: "8px", fontWeight: 600 }}>
          Welke E's zijn van toepassing?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {es.map(e => {
            const isCorrect = sc.correctEs.includes(e);
            const isChecked = r3Checked[e];
            let bg = "#fff";
            let borderColor = "#e8e8f0";
            if (r3Submitted) {
              if (isCorrect && isChecked) { bg = "#eafaf0"; borderColor = "#27AE60"; }
              else if (isCorrect && !isChecked) { bg = "#fff8e6"; borderColor = "#E67E22"; }
              else if (!isCorrect && isChecked) { bg = "#fdf0ef"; borderColor = "#C0392B"; }
            }
            return (
              <label
                key={e}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: bg, border: `2px solid ${borderColor}`,
                  borderLeft: `5px solid ${E_COLORS[e]}`,
                  borderRadius: "12px", padding: "12px 14px",
                  cursor: r3Submitted ? "default" : "pointer",
                  opacity: r3Submitted && !isCorrect && !isChecked ? 0.5 : 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => !r3Submitted && r3Toggle(e)}
                  disabled={r3Submitted}
                  style={{ width: "18px", height: "18px", accentColor: E_COLORS[e] }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>{E_LABELS[e]}</span>
                {r3Submitted && isCorrect && !isChecked && (
                  <span style={{ fontSize: "11px", color: "#E67E22", marginLeft: "auto" }}>gemist</span>
                )}
                {r3Submitted && !isCorrect && isChecked && (
                  <span style={{ fontSize: "11px", color: "#C0392B", marginLeft: "auto" }}>onjuist</span>
                )}
              </label>
            );
          })}
        </div>

        {!r3Submitted && (
          <button style={primaryBtn} onClick={r3Submit}>Controleer</button>
        )}

        {r3Submitted && (
          <>
            <div style={{ ...cardStyle, background: "#f8f8fc" }}>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{sc.analysis}</p>
            </div>
            <button style={primaryBtn} onClick={r3Next}>
              {r3Idx + 1 < ROUND3_SCENARIOS.length ? "Volgend scenario" : "Naar ronde 4"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── ROUND 4 ── */
  if (phase === "r4") {
    const st = ROUND4_STMTS[r4Idx];
    const opts = ["waar", "onwaar", "nuance"];
    const optLabels = { waar: "Waar", onwaar: "Onwaar", nuance: "Nuance" };
    const optColors = { waar: "#27AE60", onwaar: "#C0392B", nuance: "#E67E22" };

    return wrap(
      <>
        <ProgressBar current={r4Idx + 1} total={ROUND4_STMTS.length} label="Ronde 4 — Waar / Onwaar / Nuance" />

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <p style={{ fontSize: "15px", color: "#1a1a2e", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            "{st.stmt}"
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {opts.map(o => {
            const isCorrect = o === st.answer;
            const isPicked = o === r4Pick;
            let bg = "#fff";
            let border = `2px solid ${optColors[o]}40`;
            let color = optColors[o];
            if (r4Answered) {
              if (isCorrect) { bg = optColors[o] + "18"; border = `2px solid ${optColors[o]}`; }
              else if (isPicked && !isCorrect) { bg = "#fdf0ef"; border = "2px solid #C0392B"; color = "#C0392B"; }
              else { bg = "#f5f5f5"; color = "#aaa"; border = "2px solid #e8e8f0"; }
            }
            return (
              <button
                key={o}
                onClick={() => !r4Answered && r4Answer(o)}
                disabled={r4Answered}
                style={{
                  ...btnBase,
                  flex: 1,
                  background: bg,
                  color: color,
                  border: border,
                  fontWeight: 700,
                  cursor: r4Answered ? "default" : "pointer",
                }}
              >
                {optLabels[o]}
              </button>
            );
          })}
        </div>

        {r4Answered && (
          <>
            <div style={{
              ...cardStyle,
              background: r4Pick === st.answer ? "#eafaf0" : "#fdf0ef",
              borderColor: r4Pick === st.answer ? "#27AE60" : "#C0392B",
            }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: r4Pick === st.answer ? "#27AE60" : "#C0392B", marginBottom: "4px" }}>
                {r4Pick === st.answer ? "Goed!" : "Helaas!"}
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{st.explain}</p>
            </div>
            <button style={primaryBtn} onClick={r4Next}>
              {r4Idx + 1 < ROUND4_STMTS.length ? "Volgende" : "Bekijk resultaat"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── END SCREEN ── */
  if (phase === "end") {
    // save once
    if (progress.cognitieGameBest == null || pct > (progress.cognitieGameBest || 0)) {
      // Use a ref-like approach: only save if not already saved this render
      // We call saveScore in an effect-like way
      setTimeout(() => saveScore(), 0);
    }

    const pctColor = pct >= 70 ? "#27AE60" : pct >= 40 ? "#E67E22" : "#C0392B";
    const rows = [
      { label: "Ronde 1 — Welke E?", score: r1Score, max: maxR1 },
      { label: "Ronde 2 — Wie ben ik?", score: r2Score, max: maxR2 },
      { label: "Ronde 3 — Scenario-analyse", score: r3Score, max: maxR3Total },
      { label: "Ronde 4 — Waar/Onwaar/Nuance", score: r4Score, max: maxR4 },
    ];

    return wrap(
      <>
        <h2 style={{ fontFamily: headerFont, fontSize: "22px", color: "#1a1a2e", marginTop: 0, marginBottom: "4px", textAlign: "center" }}>
          Resultaat
        </h2>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "48px", fontWeight: 800, color: pctColor }}>{pct}%</div>
          <div style={{ fontSize: "14px", color: "#888" }}>{totalScore} / {maxTotal} punten</div>
        </div>

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0",
              borderBottom: i < rows.length - 1 ? "1px solid #e8e8f0" : "none",
            }}>
              <span style={{ fontSize: "13px", color: "#555" }}>{r.label}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: PRIMARY }}>{r.score}/{r.max}</span>
            </div>
          ))}
        </div>

        {progress.cognitieGameBest != null && (
          <div style={{ fontSize: "13px", color: "#888", textAlign: "center", marginBottom: "16px" }}>
            Beste score ooit: <strong style={{ color: PRIMARY }}>{Math.max(progress.cognitieGameBest || 0, pct)}%</strong>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button style={primaryBtn} onClick={resetGame}>Opnieuw spelen</button>
        </div>
      </>
    );
  }

  return null;
}
