import { useState, useCallback } from "react";

/* ───── kleuren & labels ───── */

const E = {
  embodied: { color: "#C0392B", label: "Embodied", kern: "Sensomotorisch gevoel van 'zelf' dat aan de reflectie voorafgaat. De fysieke eigenschappen van het lichaam bepalen hoe we de omgeving ervaren." },
  embedded: { color: "#E67E22", label: "Embedded", kern: "De omgeving is enkel hulpmiddel. Het denken zelf gebeurt nog puur in het brein." },
  extended: { color: "#27AE60", label: "Extended", kern: "Hulpmiddelen zijn onderdeel van het cognitieve proces zelf — cognitieve extensies. Verwijder ze en de handelingsbekwaamheid zakt." },
  enactive: { color: "#2980B9", label: "Enactive", kern: "Doen komt vóór denken. Geen mentale representaties maar de wereld zelf. Het sensomotorische lichaam in dynamische wisselwerking met de omgeving." },
};

/* ═══════ RONDE 1: Syllabus-voorbeelden + onderscheidende casussen ═══════ */

const R1 = [
  // --- De 4 kernvoorbeelden uit de syllabus ---
  {
    q: "Een leerling maakt een som met potlood en papier. Dat is makkelijker dan uit je hoofd rekenen, maar het denkwerk doe je nog steeds in je hoofd.",
    answer: "embedded",
    explain: "Exact syllabus-voorbeeld (p.32). Potlood en papier ondersteunen het denken als hulpmiddel. Maar het denken zelf wordt bij embedded nog steeds opgevat als iets dat puur in het brein gebeurt. De omgeving is hulpmiddel, geen onderdeel van het cognitieve proces.",
    contrast: "Bij extended zou het hulpmiddel onderdeel zijn van het denken zelf — zoals bij het volgende Scrabble-voorbeeld."
  },
  {
    q: "Scrabble-spelers herschikken hun letterblokjes op het rekje om op nieuwe woorden te komen. Clark & Chalmers: 'Het schuiven is geen deel van het handelen; het vormt deel van het denken.'",
    answer: "extended",
    explain: "Exact voorbeeld uit The Extended Mind (1998, p.33). De blokjes zijn een cognitieve extensie: het cognitieve proces breidt zich uit buiten het hoofd. Verwijder de blokjes en de handelingsbekwaamheid zakt — net als wanneer je een deel van een brein zou verwijderen.",
    contrast: "Het verschil met embedded: daar is de omgeving hulpmiddel, hier IS de omgeving deel van het denken."
  },
  {
    q: "Je raast in een Porsche over de Autobahn. Even sluit je je ogen en haal je je handen van het stuur. Toch heb je nog steeds 'het Porscherijdengevoel'.",
    answer: "enactive",
    explain: "Exact voorbeeld van O'Regan, Myin & Noë (primaire tekst 6, p.36). Het Porscherijdengevoel is niet afkomstig van zintuiglijke prikkels, en ook niet van breinmechanismen. Het is geconstitueerd door je impliciete kennis van wat er zou gebeuren als je het gaspedaal indrukt of aan het stuur komt.",
    contrast: "Een cognitivist (Swaab) zou zeggen: het gevoel is hersenactiviteit. O'Regan, Myin & Noë: nee, neurale activiteit laat de verkennende activiteit toe waaruit ervaring bestaat — het genereert die ervaring niet."
  },
  {
    q: "Otto lijdt aan Alzheimer en schrijft alles in zijn notitieboekje. Het boekje speelt voor Otto dezelfde rol als Inga's biologisch geheugen. De informatie erin is een 'sluimerende overtuiging'.",
    answer: "extended",
    explain: "Gedachte-experiment van Clark & Chalmers (p.33-34). Het notitieboekje is een cognitieve extensie. 'Er is niets heilig aan huid en schedel.' De overtuiging zit niet in Otto's hoofd, maar functioneert precies als een gewone overtuiging.",
    contrast: "Otto gebruikt het boekje voortdurend met vanzelfsprekendheid — het is vervlochten met zijn handelingen. Dat maakt het extended. Zou hij het sporadisch raadplegen, dan neigt het meer naar embedded."
  },
  // --- Onderscheidende casussen ---
  {
    q: "Iemand in een rolstoel ervaart de wereld fundamenteel anders dan iemand die kan lopen. De fysieke eigenschappen van het lichaam bepalen de kwaliteit van zintuiglijke gewaarwordingen.",
    answer: "embodied",
    explain: "De fysieke eigenschappen van het lichaam bepalen onze bewegingsmogelijkheden en hoe we de omgeving ervaren. Bewustzijn en kennis hebben een lichamelijke basis — een sensomotorisch gevoel van 'zelf' dat aan de reflectie voorafgaat (p.31).",
    contrast: "Dit gaat niet over hulpmiddelen (embedded/extended) of over handelen (enactive), maar over het feit dat ons lichaam zelf de basis is van onze ervaring."
  },
  {
    q: "Een kind leert fietsen niet door een boek te lezen. Het leert door met zijn sensomotorische lichaam de omgeving af te tasten — zonder mentale representatie van 'evenwicht'.",
    answer: "enactive",
    explain: "Enactivisten stellen: we maken geen gebruik van mentale representaties van de wereld maar van de wereld zelf. Denken is geen symboolmanipulatie in de geest maar manipulatie van objecten in de wereld (p.32). Het bewustzijn krijgt vorm in de activiteiten van het organisme in zijn omgeving.",
    contrast: "Het verschil met embodied: daar gaat het om de lichamelijke basis van ervaring. Bij enactive gaat het om het actieve karakter — doen komt vóór denken."
  },
];

/* ═══════ RONDE 2: Contrasten & kritiek op cognitivisme ═══════ */

const R2 = [
  {
    q: "Swaab stelt: 'Wij zijn ons brein.' De interactie van zenuwcellen produceert onze geest. Hersenscans laten zien welke gebieden oplichten bij bepaalde ervaringen. Wat is de kern van de 4E-kritiek hierop?",
    options: [
      "De hersenscans zijn niet nauwkeurig genoeg",
      "Cognitie is niet te reduceren tot wat er in het brein gebeurt — lichaam en omgeving zijn onlosmakelijk deel van het denken",
      "Swaab negeert de rol van de ziel",
      "Hersenactiviteit bestaat niet"
    ],
    answer: 1,
    explain: "4E-cognitie bestrijdt de reductie van denken tot hersenprocessen. Het denken komt voort uit ons bewegende lichaam in interactie met de omgeving. Het connectionisme bootst hersenstructuren na, maar betrekt de rest van het lichaam niet (p.31). Daarmee levert het nog steeds een simulatie zonder nabootsing van de materiële verbondenheid met een lichaam."
  },
  {
    q: "Dreyfus stelt dat een computer drie functies van het lichaam bij waarneming niet kan nabootsen. Welke zijn dat?",
    options: [
      "Zien, horen en voelen",
      "Verwachtingen op basis van eerdere ervaringen, aandacht richten, en overdracht naar andere zintuigen",
      "Input verwerken, output genereren en geheugen opslaan",
      "Bewustzijn, emotie en creativiteit"
    ],
    answer: 1,
    explain: "Dreyfus' drie functies (p.30): (1) verwachtingen gebaseerd op eerdere ervaringen, (2) deze verwachtingen richten onze aandacht en geven betekenis aan details, (3) verwachtingen worden overgedragen op andere zintuigen. Een computer heeft geen ervaringen om verwachtingen op te baseren en kan niet schakelen tussen detail en geheel."
  },
  {
    q: "Wat is het cruciale verschil tussen embedded en extended cognition?",
    options: [
      "Embedded gaat over het lichaam, extended over de omgeving",
      "Bij embedded is de omgeving enkel hulpmiddel en denkt het brein zelf; bij extended IS de omgeving onderdeel van het cognitieve proces",
      "Extended is een radicaler standpunt dan embedded, maar ze zijn het eens over de rol van het brein",
      "Er is geen verschil — het zijn synoniemen"
    ],
    answer: 1,
    explain: "De syllabus maakt dit onderscheid expliciet (p.32): bij embedded is de omgeving een hulpmiddel voor het denkend organisme, en het denken zelf wordt opgevat als iets dat puur in het brein gebeurt. Bij extended zijn hulpmiddelen onderdeel van het cognitieve proces zelf — ons denkvermogen breidt zich uit buiten het individuele organisme."
  },
  {
    q: "Clark & Chalmers schrijven: 'In sommige gevallen heeft ingrijpen op iemands omgeving dezelfde morele betekenis als ingrijpen op de persoon.' Wat is de redenering?",
    options: [
      "De omgeving is eigendom van de persoon",
      "Als cognitieve extensies deel zijn van je denkvermogen, is ze verwijderen vergelijkbaar met het beschadigen van een deel van je brein",
      "Het is gewoon onbeleefd om andermans spullen aan te raken",
      "De omgeving bepaalt je identiteit volgens Plessner"
    ],
    answer: 1,
    explain: "Clark & Chalmers (p.33-35): als we de externe component verwijderen, zakt het niveau van handelingsbekwaamheid — net als wanneer we een deel van een brein zouden verwijderen. Extended cognition heeft dus morele gevolgen: iemands notitieboekje afpakken kan even ingrijpend zijn als het beschadigen van biologisch geheugen."
  },
  {
    q: "Het connectionisme (neurale netwerken) bootst de werking van het brein beter na dan traditionele AI. Waarom is het volgens de 4E-filosofen nog steeds onvoldoende?",
    options: [
      "Neurale netwerken zijn te traag",
      "Het connectionisme betrekt de rest van het lichaam niet — het levert een simulatie van hersenfunctionaliteit zonder materiële verbondenheid met een lichaam",
      "Neurale netwerken zijn niet wiskundig beschrijfbaar",
      "Het connectionisme negeert de rol van taal"
    ],
    answer: 1,
    explain: "Het connectionisme tracht de werking van de fysieke structuren van de hersenen na te bootsen, maar betrekt de rest van het lichaam niet (p.31). Daarmee levert het nog steeds een simulatie van de functionaliteit van de hersenen zonder nabootsing van de materiële verbondenheid met een lichaam. Het berust op de aanname dat denken te reduceren is tot wat in het brein gebeurt."
  },
  {
    q: "De enactivisten stellen dat Descartes' substantiedualisme een probleem veroorzaakt. Welk probleem?",
    options: [
      "Hoe kan een fysiek proces in de hersenen een niet-fysiek bewustzijn veroorzaken?",
      "Hoe kan de ziel het lichaam aansturen?",
      "Hoe kan de mens een dier zijn en tegelijk rationeel?",
      "Hoe kan de computermetafoor kloppen als het brein geen computer is?"
    ],
    answer: 0,
    explain: "Als je geest en lichaam strikt scheidt (res cogitans vs. res extensa), ontstaat het probleem: hoe kan een fysiek proces in de hersenen een niet-fysiek bewustzijn veroorzaken? (p.35) De enactivisten lossen dit op door ervaring niet als product van het brein te zien, maar als de verkennende activiteit van het sensomotorische lichaam in de omgeving."
  },
];

/* ───── shared styles ───── */

const headerFont = "'Playfair Display', Georgia, serif";
const PRIMARY = "#4A90D9";

const cardStyle = { background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "12px" };
const btnBase = { border: "none", borderRadius: "12px", padding: "14px 18px", fontSize: "15px", fontWeight: 600, cursor: "pointer", width: "100%", textAlign: "center" };
const primaryBtn = { ...btnBase, background: PRIMARY, color: "#fff" };

function ProgressBar({ current, total, label }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginBottom: "4px" }}>
        <span>{label}</span><span>{current}/{total}</span>
      </div>
      <div style={{ height: "6px", background: "#e8e8f0", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(current / total) * 100}%`, background: PRIMARY, borderRadius: "3px", transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

/* ═══════════════ MAIN ═══════════════ */

export function CognitieGameView({ progress, setProgress }) {
  const [phase, setPhase] = useState("start"); // start | r1intro | r1 | r2intro | r2 | end
  const [r1Idx, setR1Idx] = useState(0);
  const [r1Pick, setR1Pick] = useState(null);
  const [r1Score, setR1Score] = useState(0);
  const [r2Idx, setR2Idx] = useState(0);
  const [r2Pick, setR2Pick] = useState(null);
  const [r2Score, setR2Score] = useState(0);

  const maxTotal = R1.length + R2.length;
  const totalScore = r1Score + r2Score;
  const pct = Math.round((totalScore / maxTotal) * 100);

  const reset = useCallback(() => {
    setPhase("start");
    setR1Idx(0); setR1Pick(null); setR1Score(0);
    setR2Idx(0); setR2Pick(null); setR2Score(0);
  }, []);

  const wrap = (children) => <div style={{ padding: "16px" }}>{children}</div>;

  /* ── START ── */
  if (phase === "start") {
    const best = progress.cognitieGameBest;
    return wrap(
      <>
        <h2 style={{ fontFamily: headerFont, fontSize: "22px", color: "#1a1a2e", margin: "0 0 8px" }}>4E Cognitie Game</h2>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>
          Test of je de vier E's scherp kunt onderscheiden — van elkaar én van het cognitivisme.
        </p>

        {/* Kernbegrippen kaart */}
        <div style={{ ...cardStyle, background: "#f8f8fc", padding: "14px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>De vier E's — kern</div>
          {["embodied", "embedded", "extended", "enactive"].map(key => (
            <div key={key} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "12px", lineHeight: 1.5 }}>
              <span style={{ color: E[key].color, fontWeight: 700, minWidth: "70px" }}>{E[key].label}</span>
              <span style={{ color: "#555" }}>{E[key].kern}</span>
            </div>
          ))}
        </div>

        <div style={{ ...cardStyle, background: "#f8f8fc", padding: "14px" }}>
          <div style={{ fontSize: "13px", lineHeight: 1.7, color: "#555" }}>
            <strong>Ronde 1</strong> — Welke E? Syllabus-voorbeelden herkennen <span style={{ color: "#999" }}>({R1.length})</span><br />
            <strong>Ronde 2</strong> — Contrasten: 4E vs. cognitivisme, embedded vs. extended <span style={{ color: "#999" }}>({R2.length})</span>
          </div>
        </div>

        {best != null && (
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px", textAlign: "center" }}>
            Beste score: <strong style={{ color: PRIMARY }}>{best}%</strong>
          </div>
        )}
        <button style={primaryBtn} onClick={() => setPhase("r1intro")}>Start</button>
      </>
    );
  }

  /* ── RONDE 1 INTRO ── */
  if (phase === "r1intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", margin: "0 0 8px" }}>Ronde 1: Welke E?</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginBottom: "4px" }}>
          Herken de syllabus-voorbeelden. Let op het contrast tussen de E's.
        </p>
        <p style={{ color: "#888", fontSize: "12px", lineHeight: 1.5, marginBottom: "16px" }}>
          Na elk antwoord zie je ook waarom het níét een andere E is.
        </p>
        <button style={primaryBtn} onClick={() => setPhase("r1")}>Begin</button>
      </>
    );
  }

  /* ── RONDE 1 ── */
  if (phase === "r1") {
    const q = R1[r1Idx];
    const answered = r1Pick !== null;
    const correct = r1Pick === q.answer;
    const es = ["embodied", "embedded", "extended", "enactive"];

    return wrap(
      <>
        <ProgressBar current={r1Idx + 1} total={R1.length} label="Ronde 1 — Welke E?" />
        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <p style={{ fontSize: "15px", color: "#1a1a2e", lineHeight: 1.6, margin: 0 }}>{q.q}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {es.map(e => {
            const isCorrect = e === q.answer;
            const isPicked = e === r1Pick;
            let bg = "#fff", borderColor = "#e8e8f0", textColor = "#1a1a2e";
            if (answered) {
              if (isCorrect) { bg = "#eafaf0"; borderColor = "#27AE60"; textColor = "#27AE60"; }
              else if (isPicked) { bg = "#fdf0ef"; borderColor = "#C0392B"; textColor = "#C0392B"; }
              else { bg = "#f5f5f5"; textColor = "#aaa"; }
            }
            return (
              <button key={e} onClick={() => !answered && (() => { setR1Pick(e); if (e === q.answer) setR1Score(s => s + 1); })()}
                disabled={answered}
                style={{ ...btnBase, background: bg, color: textColor, border: `2px solid ${borderColor}`, borderLeft: `5px solid ${E[e].color}`,
                  textAlign: "left", opacity: answered && !isCorrect && !isPicked ? 0.5 : 1, cursor: answered ? "default" : "pointer" }}>
                {E[e].label}
              </button>
            );
          })}
        </div>

        {answered && (
          <>
            <div style={{ ...cardStyle, background: correct ? "#eafaf0" : "#fdf0ef", borderColor: correct ? "#27AE60" : "#C0392B" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: correct ? "#27AE60" : "#C0392B", marginBottom: "6px" }}>
                {correct ? "Goed!" : `Het juiste antwoord is ${E[q.answer].label}.`}
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{q.explain}</p>
            </div>
            {/* Contrast-toelichting */}
            <div style={{ ...cardStyle, background: "#fff8f0", borderColor: "#f0e0c8" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#b8860b", marginBottom: "4px" }}>Waarom niet een andere E?</div>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.6, margin: 0 }}>{q.contrast}</p>
            </div>
            <button style={primaryBtn} onClick={() => {
              if (r1Idx + 1 < R1.length) { setR1Idx(i => i + 1); setR1Pick(null); }
              else setPhase("r2intro");
            }}>
              {r1Idx + 1 < R1.length ? "Volgende" : "Naar ronde 2"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── RONDE 2 INTRO ── */
  if (phase === "r2intro") {
    return wrap(
      <>
        <h3 style={{ fontFamily: headerFont, color: "#1a1a2e", margin: "0 0 8px" }}>Ronde 2: Contrasten</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginBottom: "4px" }}>
          4E vs. cognitivisme. Embedded vs. extended. Dreyfus vs. AI. De scherpe onderscheidingen.
        </p>
        <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
          Score ronde 1: <strong>{r1Score}/{R1.length}</strong>
        </div>
        <button style={primaryBtn} onClick={() => setPhase("r2")}>Begin</button>
      </>
    );
  }

  /* ── RONDE 2 ── */
  if (phase === "r2") {
    const q = R2[r2Idx];
    const answered = r2Pick !== null;
    const correct = r2Pick === q.answer;

    return wrap(
      <>
        <ProgressBar current={r2Idx + 1} total={R2.length} label="Ronde 2 — Contrasten" />
        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          <p style={{ fontSize: "15px", color: "#1a1a2e", lineHeight: 1.6, margin: 0 }}>{q.q}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isPicked = i === r2Pick;
            let bg = "#fff", borderColor = "#e8e8f0", textColor = "#1a1a2e";
            if (answered) {
              if (isCorrect) { bg = "#eafaf0"; borderColor = "#27AE60"; textColor = "#1a1a2e"; }
              else if (isPicked) { bg = "#fdf0ef"; borderColor = "#C0392B"; textColor = "#C0392B"; }
              else { bg = "#f5f5f5"; textColor = "#aaa"; }
            }
            return (
              <button key={i} onClick={() => !answered && (() => { setR2Pick(i); if (i === q.answer) setR2Score(s => s + 1); })()}
                disabled={answered}
                style={{ ...btnBase, background: bg, color: textColor, border: `2px solid ${borderColor}`,
                  textAlign: "left", fontSize: "13px", lineHeight: 1.5, padding: "12px 14px",
                  opacity: answered && !isCorrect && !isPicked ? 0.5 : 1, cursor: answered ? "default" : "pointer" }}>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <>
            <div style={{ ...cardStyle, background: correct ? "#eafaf0" : "#fdf0ef", borderColor: correct ? "#27AE60" : "#C0392B" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: correct ? "#27AE60" : "#C0392B", marginBottom: "6px" }}>
                {correct ? "Goed!" : "Helaas."}
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{q.explain}</p>
            </div>
            <button style={primaryBtn} onClick={() => {
              if (r2Idx + 1 < R2.length) { setR2Idx(i => i + 1); setR2Pick(null); }
              else {
                const finalPct = Math.round(((r1Score + r2Score) / maxTotal) * 100);
                setProgress(prev => ({ ...prev, cognitieGameBest: Math.max(prev.cognitieGameBest || 0, finalPct) }));
                setPhase("end");
              }
            }}>
              {r2Idx + 1 < R2.length ? "Volgende" : "Bekijk resultaat"}
            </button>
          </>
        )}
      </>
    );
  }

  /* ── EINDE ── */
  if (phase === "end") {
    const pctColor = pct >= 70 ? "#27AE60" : pct >= 40 ? "#E67E22" : "#C0392B";
    const msg = pct >= 85 ? "Uitstekend! Je beheerst de 4E-distincties."
      : pct >= 65 ? "Goed! Je snapt de kern. Let op de details."
      : pct >= 45 ? "Redelijk. Herlees Kwestie 2 Standpunt 3."
      : "Nog even oefenen. Focus op de contrasten.";

    return wrap(
      <>
        <h2 style={{ fontFamily: headerFont, fontSize: "22px", color: "#1a1a2e", margin: "0 0 4px", textAlign: "center" }}>Resultaat</h2>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "48px", fontWeight: 800, color: pctColor }}>{pct}%</div>
          <div style={{ fontSize: "14px", color: "#888" }}>{totalScore} / {maxTotal}</div>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "8px" }}>{msg}</div>
        </div>

        <div style={{ ...cardStyle, background: "#f8f8fc" }}>
          {[
            { label: "Ronde 1 — Welke E?", s: r1Score, m: R1.length },
            { label: "Ronde 2 — Contrasten", s: r2Score, m: R2.length },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0",
              borderBottom: i === 0 ? "1px solid #e8e8f0" : "none" }}>
              <span style={{ fontSize: "13px", color: "#555" }}>{r.label}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: PRIMARY }}>{r.s}/{r.m}</span>
            </div>
          ))}
        </div>

        {/* Spiekbriefje: de kerndistincties */}
        <div style={{ ...cardStyle, background: "#f0f4ff", borderColor: "#d0d8f0" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>Onthoud: de scherpe grenzen</div>
          <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.7 }}>
            <strong>Embedded vs. Extended:</strong> Bij embedded is de omgeving hulpmiddel, het brein denkt zelf. Bij extended IS de omgeving deel van het denken.<br /><br />
            <strong>Embodied vs. Enactive:</strong> Embodied = het lichaam als basis van ervaring. Enactive = het actieve karakter: doen komt vóór denken.<br /><br />
            <strong>4E vs. Cognitivisme:</strong> Cognitivisten (Swaab) reduceren denken tot hersenprocessen. 4E: cognitie is verdeeld over brein, lichaam en omgeving.
          </div>
        </div>

        <button style={primaryBtn} onClick={reset}>Opnieuw spelen</button>
      </>
    );
  }

  return null;
}
