import { KWESTIES } from "../data/kwesties.js";
import { FLASHCARDS } from "../data/flashcards.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { PRIMAIRE_TEKSTEN } from "../data/primaireTeksten.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { BEGRIPSANALYSE } from "../data/begripsanalyse.js";
import { STUDIEPAD_PRESETS, START_DATE } from "../data/config.js";
import { getCurrentWeek, getExamCountdown } from "../utils/dateUtils.js";
import { computeOverallProgress, generateDagdoelen } from "../utils/progressUtils.js";
import { LIA_CHAPTERS } from "../data/liaChapters.js";

export function Home({ setView, progress }) {
  const totalFlash = FLASHCARDS.length;
  const seenFlash = (progress.seenCards || []).length;
  const quizScores = progress.quizScores || [];
  const quizBest = quizScores.length > 0 ? Math.max(...quizScores.map(s => s.pct)) : 0;
  const examDone = Object.values(progress.examTracker || {}).filter(v => v === "goed" || v === "lastig").length;
  const tekstDone = Object.values(progress.tekstTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const totalBegripsanalyse = BEGRIPSANALYSE.reduce((sum, b) => sum + b.definities.length, 0);
  const begripDone = Object.values(progress.begripsanalyseTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const liaPlayed = (progress.liaPlayed || []).length;

  const studiepad = progress.studiepad || null;
  const currentWeek = getCurrentWeek(studiepad ? new Date(studiepad.startDate || START_DATE) : START_DATE);
  const countdown = getExamCountdown();
  const overallProg = computeOverallProgress(progress);
  const dagdoelen = generateDagdoelen(progress);

  const getWeekLabel = () => {
    if (!studiepad) return null;
    let weken;
    if (studiepad.type === "preset") {
      const preset = STUDIEPAD_PRESETS.find(p => p.id === studiepad.presetId);
      weken = preset ? preset.weken : [];
    } else {
      weken = studiepad.customWeken || [];
    }
    const w = weken.find(w => w.week === currentWeek);
    return w ? w.label : null;
  };

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
          Filosofie VWO 2026
        </h1>
        <p style={{ color: "#666", fontSize: "14px", margin: "8px 0 0", fontFamily: "'Source Sans 3', sans-serif" }}>
          De vraag naar de mens in relatie tot techniek en wetenschap
        </p>
      </div>

      {/* Introductie voor nieuwe gebruikers */}
      {!(progress.seenCards?.length > 0 || (progress.quizScores || []).length > 0) && (
        <div style={{ background: "#f0f4ff", border: "1px solid #d0d8f0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e", marginBottom: "6px" }}>Welkom!</div>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: "0 0 8px" }}>
            Dit is jouw persoonlijke studietool voor het filosofie-examen. De app helpt je stap voor stap de stof te beheersen: van begrippen en filosofen tot examenvragen en primaire teksten.
          </p>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>
            Begin met het instellen van je studiepad hieronder, of duik direct in de flashcards. Elke minuut telt — je kunt dit!
          </p>
        </div>
      )}

      {/* Deze week banner */}
      <button onClick={() => setView(studiepad ? "studiepad" : "studiepad")}
        style={{
          display: "block", width: "100%", background: "linear-gradient(135deg, #4A90D9 0%, #2D5A8E 100%)",
          border: "none", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", cursor: "pointer",
          textAlign: "left", color: "#fff",
        }}>
        {studiepad ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", opacity: 0.8, marginBottom: "4px" }}>Week {currentWeek} van 10</div>
                <div style={{ fontSize: "16px", fontWeight: 700 }}>{getWeekLabel() || "Studiepad"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "22px", fontWeight: 700 }}>{countdown.days}d</div>
                <div style={{ fontSize: "11px", opacity: 0.8 }}>tot examen</div>
              </div>
            </div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.3)", borderRadius: "2px", marginTop: "10px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round(overallProg.overall * 100)}%`, background: "#fff", borderRadius: "2px" }} />
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700 }}>Stel je studiepad in</div>
              <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>{countdown.days} dagen tot het examen</div>
            </div>
            <span style={{ fontSize: "20px" }}>{"→"}</span>
          </div>
        )}
      </button>

      {/* Dagdoelen */}
      {dagdoelen && (
        <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>Dagdoel — {dagdoelen.weekLabel}</div>
          {dagdoelen.doelen.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: i < dagdoelen.doelen.length - 1 ? "6px" : 0 }}>
              <span style={{ fontSize: "14px" }}>{d.icon}</span>
              <span style={{ fontSize: "13px", color: "#333" }}>{d.text}</span>
              <span style={{ fontSize: "11px", color: "#666", marginLeft: "auto" }}>{d.detail}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {[
          { icon: "🎭", label: "Lia's verhaal", sub: `${liaPlayed}/${LIA_CHAPTERS.length} gespeeld`, view: "lia", bg: "#f5f0ff" },
          { icon: "🎴", label: "Flashcards", sub: `${seenFlash}/${totalFlash} gezien`, view: "flashcards", bg: "#f0f4ff" },
          { icon: "❓", label: "Quiz", sub: quizBest > 0 ? `Beste: ${quizBest}%` : "Test je kennis", view: "quiz", bg: "#fff5f0" },
          { icon: "🔍", label: "Examenvragen", sub: examDone > 0 ? `${examDone}/${EXAM_QUESTIONS.length} gedaan` : `${EXAM_QUESTIONS.length} vragen`, view: "exam", bg: "#f0fff5" },
          { icon: "📖", label: "Primaire teksten", sub: tekstDone > 0 ? `${tekstDone}/${PRIMAIRE_TEKSTEN.length} beoordeeld` : `${PRIMAIRE_TEKSTEN.length} teksten`, view: "teksten", bg: "#f5f0ff" },
          { icon: "👤", label: "Filosofen", sub: `${FILOSOFEN.length} denkers`, view: "filosofen", bg: "#faf0ff" },
          { icon: "🔬", label: "Begripsanalyse", sub: begripDone > 0 ? `${begripDone}/${totalBegripsanalyse} beoordeeld` : "ET 2 — oefenen", view: "begripsanalyse", bg: "#fff0f5" },
          { icon: "📊", label: "Voortgang", sub: `${Math.round(overallProg.overall * 100)}% totaal`, view: "voortgang", bg: "#f0fff0" },
        ].map(item => (
          <button key={item.view} onClick={() => setView(item.view)} style={{
            background: item.bg, border: "1px solid #e8e8f0", borderRadius: "12px", padding: "20px 16px",
            cursor: "pointer", textAlign: "left", transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
          onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <div aria-hidden="true" style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{item.sub}</div>
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
              <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{k.chapters} · {k.eindtermen}</div>
            </div>
          </div>
        </button>
      ))}

      <div style={{ marginTop: "24px", padding: "16px", background: "#f8f8fc", borderRadius: "12px", border: "1px solid #e8e8f0" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px", fontFamily: "'Source Sans 3', sans-serif" }}>📊 Studietip</h3>
        <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: 1.5 }}>
          90% gaat over de syllabus, waarin de bijbehorende eindtermen centraal staan. Focus daar in eerste instantie op. 10% gaat over de globale eindtermen over antropologie, ethiek, kennistheorie en wetenschapsfilosofie.
        </p>
      </div>
    </div>
  );
}
