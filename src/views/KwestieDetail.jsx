import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { FLASHCARDS } from "../data/flashcards.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { SPECIFIEKE_EINDTERMEN } from "../data/eindtermen.js";
import { KwestieTag } from "../components/KwestieTag.jsx";

export function KwestieDetail({ id, setView }) {
  const k = KWESTIES.find(k => k.id === id);
  const filosofen = FILOSOFEN.filter(f => f.kwestie === id);
  const begrippen = FLASHCARDS.filter(f => f.kwestie === id);
  const examQ = EXAM_QUESTIONS.filter(eq => eq.kwestie === id);
  const [openUitwerking, setOpenUitwerking] = useState({});
  const toggleUitwerking = (nr) => setOpenUitwerking(prev => ({ ...prev, [nr]: !prev[nr] }));

  const ets = SPECIFIEKE_EINDTERMEN[id] || [];

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
          <button onClick={() => toggleUitwerking(et.nr)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: k.color, padding: "6px 0 0", fontWeight: 600 }}>
            {openUitwerking[et.nr] ? "Verberg uitwerking \u25B2" : "Toon uitwerking \u25BC"}
          </button>
          {openUitwerking[et.nr] && (
            <div style={{ marginTop: "8px", padding: "10px 12px", background: `${k.color}08`, borderRadius: "6px", fontSize: "13px", color: "#333", lineHeight: 1.5 }}>
              {et.uitwerking}
            </div>
          )}
        </div>
      ))}

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"👤"} Filosofen ({filosofen.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {filosofen.map(f => (
          <button key={f.name} onClick={() => setView && setView("filosofen")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: "2px 0", textAlign: "left" }}>
            <span style={{ background: `${k.color}15`, color: k.color, padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600 }}>{f.name}</span>
            {f.lia && <span style={{ fontSize: "11px", color: "#666" }}>{f.lia}</span>}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🎴"} Begrippen ({begrippen.length})</h3>
      <button onClick={() => setView && setView("flashcards")} style={{ display: "flex", flexWrap: "wrap", gap: "4px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        {begrippen.map(b => (
          <span key={b.term} style={{ background: "#f0f0f5", color: "#666", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>{b.term}</span>
        ))}
      </button>

      {examQ.length > 0 && (
        <>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🔍"} Examenvragen ({examQ.length})</h3>
          {examQ.map((eq, i) => (
            <button key={i} onClick={() => setView && setView("exam")} style={{ display: "block", width: "100%", marginBottom: "6px", padding: "10px 12px", background: "#fff5f0", borderRadius: "8px", fontSize: "13px", color: "#333", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontWeight: 600 }}>{eq.year} vr.{eq.nr}</span> ({eq.points}p) — {eq.question.substring(0, 80)}...
            </button>
          ))}
        </>
      )}
    </div>
  );
}
