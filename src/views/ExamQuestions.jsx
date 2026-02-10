import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { useToast } from "../hooks/useToast.js";
import { Toast } from "../components/Toast.jsx";
import { LiaBadge } from "../components/LiaBadge.jsx";
import { KwestieTag } from "../components/KwestieTag.jsx";

export function ExamQuestions({ progress, setProgress }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [filter, setFilter] = useState(0);
  const [alleenLastig, setAlleenLastig] = useState(false);
  const [ownAnswers, setOwnAnswers] = useState({});
  const [showModel, setShowModel] = useState({});
  const { toast, show: showToast } = useToast();

  const examTracker = progress.examTracker || {};

  const getKey = (eq) => `${eq.year}-${eq.nr}`;

  const setStatus = (eq, status) => {
    const key = getKey(eq);
    const current = examTracker[key];
    const newStatus = current === status ? null : status;
    setProgress(prev => {
      const tracker = { ...(prev.examTracker || {}) };
      tracker[key] = newStatus;
      return { ...prev, examTracker: tracker };
    });
    if (newStatus) showToast(newStatus === "goed" ? "Gemarkeerd als goed" : "Gemarkeerd als lastig");
  };

  let questions = filter === 0 ? EXAM_QUESTIONS : EXAM_QUESTIONS.filter(q => q.kwestie === filter);
  if (alleenLastig) questions = questions.filter(q => examTracker[getKey(q)] === "lastig");

  const totalDone = Object.values(examTracker).filter(v => v === "goed" || v === "lastig").length;
  const totalGoed = Object.values(examTracker).filter(v => v === "goed").length;
  const totalLastig = Object.values(examTracker).filter(v => v === "lastig").length;

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <p style={{ fontSize: "13px", color: "#666", margin: "16px 0" }}>
        Echte examenvragen uit 2024 en 2025 met correctiemodel. Oefen met het formuleren van antwoorden!
      </p>

      {totalDone > 0 && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", padding: "12px 16px", background: "#f8f8fc", borderRadius: "12px", border: "1px solid #e8e8f0" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>
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

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
        {[{ id: 0, label: "Alle" }, ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` }))].map(f => (
          <button key={f.id} onClick={() => { setFilter(f.id); setOpenIdx(null); }} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>

      {totalLastig > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <button onClick={() => { setAlleenLastig(!alleenLastig); setOpenIdx(null); }} style={{
            padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
            border: alleenLastig ? "2px solid #ef5350" : "1px solid #e0e0e8",
            background: alleenLastig ? "#fce4ec" : "#fff",
            color: alleenLastig ? "#c62828" : "#555",
          }}>✗ Alleen lastige ({totalLastig})</button>
        </div>
      )}

      {alleenLastig && questions.length === 0 && (
        <p style={{ textAlign: "center", color: "#666", fontSize: "13px", padding: "20px 0" }}>Geen lastige vragen in deze selectie. Goed bezig!</p>
      )}

      {questions.map((eq, i) => {
        const key = getKey(eq);
        const status = examTracker[key];
        const borderLeft = status === "goed" ? "4px solid #4caf50" : status === "lastig" ? "4px solid #ef5350" : "4px solid transparent";

        return (
        <div key={i} style={{ marginBottom: "16px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", overflow: "hidden", borderLeft }}>
          {/* Casus context - always visible */}
          {eq.context && (
            <div style={{ padding: "12px 16px", background: "#f0f0ff", borderBottom: "1px solid #e0e0f0" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#6B5CFF", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Casus</div>
              <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{eq.context}</p>
            </div>
          )}

          {/* Question */}
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
            width: "100%", padding: "16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#666", background: "#f0f0f5", padding: "2px 8px", borderRadius: "4px" }}>{eq.year}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#1a1a2e" }}>Vr. {eq.nr}</span>
                <span style={{ fontSize: "11px", color: "#666" }}>{eq.points}p</span>
                <KwestieTag kwestie={eq.kwestie} small />
                <span style={{ fontSize: "11px", color: "#666" }}>{eq.et}</span>
                <LiaBadge text={eq.question} kwestie={eq.kwestie} />
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", margin: 0, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{eq.question}</p>
            </div>
            <span style={{ fontSize: "18px", color: "#999", flexShrink: 0, transform: openIdx === i ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>{"▾"}</span>
          </button>

          {/* Generatief oefenen + Model answer */}
          {openIdx === i && (
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f0f0f5" }}>
              {/* Schrijf je antwoord */}
              <div style={{ margin: "12px 0 8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#4A90D9", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Schrijf je antwoord ({eq.points}p)</div>
                <textarea
                  value={ownAnswers[key] || ""}
                  onChange={e => setOwnAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder="Formuleer hier je antwoord voordat je het modelantwoord bekijkt..."
                  style={{
                    width: "100%", minHeight: "100px", padding: "10px 12px", borderRadius: "8px",
                    border: "1px solid #ddd", fontSize: "13px", fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.5, resize: "vertical", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Toon modelantwoord button / model */}
              {!showModel[key] ? (
                <button onClick={() => setShowModel(prev => ({ ...prev, [key]: true }))} style={{
                  display: "block", width: "100%", padding: "10px", borderRadius: "8px", cursor: "pointer",
                  border: "1px solid #2D8E5A", background: "#e8f5e9", color: "#2e7d32",
                  fontSize: "13px", fontWeight: 600, marginTop: "4px",
                }}>Toon modelantwoord</button>
              ) : (
                <div style={{ marginTop: "8px", padding: "12px", background: "#f0faf0", borderRadius: "8px", border: "1px solid #c8e6c9" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#2D8E5A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Modelantwoord</div>
                  <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif", whiteSpace: "pre-wrap" }}>
                    {eq.model}
                  </div>
                  {(ownAnswers[key] || "").trim().length > 0 && (
                    <div style={{ marginTop: "10px", padding: "8px 10px", background: "#fff8e1", borderRadius: "6px", border: "1px solid #ffe082" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#f57f17", marginBottom: "4px" }}>Vergelijk</div>
                      <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: 1.5 }}>
                        Kijk of je dezelfde kernpunten hebt benoemd. Let op: elk punt uit het model = 1 scorepunt. Mis je een punt? Markeer de vraag als "lastig" en herhaal later.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tracker buttons */}
          <div style={{ display: "flex", gap: "8px", padding: "10px 16px", borderTop: "1px solid #f0f0f5", background: "#fafafe" }}>
            <button onClick={() => setStatus(eq, "goed")} style={{
              flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              border: status === "goed" ? "2px solid #4caf50" : "1px solid #e0e0e8",
              background: status === "goed" ? "#e8f5e9" : "#fff",
              color: status === "goed" ? "#2e7d32" : "#777",
            }}>✔ Goed</button>
            <button onClick={() => setStatus(eq, "lastig")} style={{
              flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              border: status === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
              background: status === "lastig" ? "#fce4ec" : "#fff",
              color: status === "lastig" ? "#c62828" : "#777",
            }}>✗ Lastig</button>
          </div>
        </div>
        );
      })}
      <Toast message={toast} />
    </div>
  );
}
