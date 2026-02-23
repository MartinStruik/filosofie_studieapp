import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { PRIMAIRE_TEKSTEN } from "../data/primaireTeksten.js";
import { getLiaRef } from "../utils/liaRef.js";
import { useToast } from "../hooks/useToast.js";
import { Toast } from "../components/Toast.jsx";
import { LiaBadge } from "../components/LiaBadge.jsx";
import { KwestieTag } from "../components/KwestieTag.jsx";
import { MINDMAPS } from "../data/mindmaps.js";
import { CollapsibleMindMap } from "../components/MindMapCard.jsx";

export function PrimaireTexten({ progress, setProgress }) {
  const [selectedTekst, setSelectedTekst] = useState(null);
  const [openFragments, setOpenFragments] = useState({});
  const [openToelichtingen, setOpenToelichtingen] = useState({});
  const [openVragen, setOpenVragen] = useState({});
  const { toast, show: showToast } = useToast();

  const tekstTracker = progress.tekstTracker || {};

  const setTekstStatus = (id, status) => {
    const current = tekstTracker[id];
    const newStatus = current === status ? null : status;
    setProgress(prev => {
      const tracker = { ...(prev.tekstTracker || {}) };
      tracker[id] = newStatus;
      return { ...prev, tekstTracker: tracker };
    });
    if (newStatus) showToast(newStatus === "begrepen" ? "Gemarkeerd als begrepen" : "Gemarkeerd als lastig");
  };

  const toggleFragment = (idx) => {
    setOpenFragments(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleToelichting = (idx) => {
    setOpenToelichtingen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleVraag = (idx) => {
    setOpenVragen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalDone = Object.values(tekstTracker).filter(v => v === "begrepen" || v === "lastig").length;
  const totalBegrepen = Object.values(tekstTracker).filter(v => v === "begrepen").length;
  const totalLastig = Object.values(tekstTracker).filter(v => v === "lastig").length;

  if (selectedTekst === null) {
    return (
      <div style={{ padding: "0 20px 40px" }}>
        <div style={{ background: "#f5f0ff", border: "1px solid #e0d8f0", borderRadius: "12px", padding: "16px", margin: "16px 0" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "6px" }}>Hoe gebruik je deze teksten?</div>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: "0 0 8px" }}>
            Bij het examen krijg je originele tekstfragmenten van filosofen voorgelegd. Je moet de kerngedachte herkennen, de argumentatie analyseren en het verband leggen met de kwestie.
          </p>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: "0 0 8px" }}>
            <strong>Oefen zo:</strong> lees het fragment aandachtig, beantwoord de oefenvraag in je eigen woorden, en vergelijk pas daarna met het modelantwoord. Markeer teksten als "begrepen" of "lastig" om je voortgang bij te houden.
          </p>
        </div>

        {totalDone > 0 && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", padding: "12px 16px", background: "#f8f8fc", borderRadius: "12px", border: "1px solid #e8e8f0" }}>
            <div style={{ fontSize: "12px", color: "#666" }}>
              <strong style={{ color: "#1a1a2e" }}>{totalDone}/{PRIMAIRE_TEKSTEN.length}</strong> beoordeeld
            </div>
            <div style={{ fontSize: "12px", color: "#4caf50" }}>
              ✔ {totalBegrepen} begrepen
            </div>
            <div style={{ fontSize: "12px", color: "#ef5350" }}>
              ✗ {totalLastig} lastig
            </div>
          </div>
        )}

        {PRIMAIRE_TEKSTEN.map(pt => {
          const k = KWESTIES.find(k => k.id === pt.kwestie);
          const status = tekstTracker[pt.id];
          const borderColor = status === "begrepen" ? "#4caf50" : status === "lastig" ? "#ef5350" : (k?.color || "#1a1a2e");
          return (
            <div key={pt.id} style={{ marginBottom: "10px", background: "#fff", border: "1px solid #e8e8f0", borderLeft: `4px solid ${borderColor}`, borderRadius: "8px", overflow: "hidden" }}>
              <button onClick={() => { setSelectedTekst(pt.id); setOpenFragments({ 0: true }); setOpenVragen({}); }} style={{
                display: "block", width: "100%", background: "transparent", border: "none", padding: "16px",
                cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"}
              onMouseOut={e => e.currentTarget.style.boxShadow = ""}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <KwestieTag kwestie={pt.kwestie} small />
                  <span style={{ fontSize: "11px", color: "#666" }}>{pt.et}</span>
                  <LiaBadge text={pt.filosoof} kwestie={pt.kwestie} />
                  {status && <span style={{ fontSize: "11px", fontWeight: 600, color: status === "begrepen" ? "#4caf50" : "#ef5350" }}>{status === "begrepen" ? "✔ begrepen" : "✗ lastig"}</span>}
                </div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", fontFamily: "'Playfair Display', Georgia, serif" }}>{pt.filosoof}</div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{pt.titel}</div>
                <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>{pt.fragmenten.length} fragmenten · {pt.vragen.length} vragen</div>
              </button>
              <div style={{ display: "flex", gap: "8px", padding: "10px 16px", borderTop: "1px solid #f0f0f5", background: "#fafafe" }}>
                <button onClick={() => setTekstStatus(pt.id, "begrepen")} style={{
                  flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
                  border: status === "begrepen" ? "2px solid #4caf50" : "1px solid #e0e0e8",
                  background: status === "begrepen" ? "#e8f5e9" : "#fff",
                  color: status === "begrepen" ? "#2e7d32" : "#777",
                }}>✔ Begrepen</button>
                <button onClick={() => setTekstStatus(pt.id, "lastig")} style={{
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

  const pt = PRIMAIRE_TEKSTEN.find(t => t.id === selectedTekst);
  if (!pt) return null;
  const k = KWESTIES.find(k => k.id === pt.kwestie);
  const detailStatus = tekstTracker[pt.id];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <button onClick={() => setSelectedTekst(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#666", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"←"} Terug naar overzicht</button>

      <div style={{ background: k?.color || "#1a1a2e", color: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
        <KwestieTag kwestie={pt.kwestie} small />
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", margin: "12px 0 4px", lineHeight: 1.2 }}>{pt.filosoof}</h2>
        <div style={{ fontSize: "13px", opacity: 0.8 }}>{pt.titel}</div>
        <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "4px" }}>{pt.et}</div>
        <div style={{ fontSize: "11px", opacity: 0.9, marginTop: "4px", background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "2px 8px", borderRadius: "4px" }}>{getLiaRef(pt.filosoof, pt.kwestie)}</div>
      </div>

      <div style={{ padding: "14px 16px", background: "#f8f8fc", borderRadius: "12px", border: "1px solid #e8e8f0", marginBottom: "20px" }}>
        <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" }}>{pt.inleiding}</p>
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 12px" }}>Tekstfragmenten</h3>
      {pt.fragmenten.map((frag, i) => (
        <div key={i} style={{ marginBottom: "10px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <button onClick={() => toggleFragment(i)} style={{
            width: "100%", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer",
            textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>
              {i + 1}. {frag.label}
            </span>
            <span style={{ fontSize: "16px", color: "#999", transform: openFragments[i] ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>{"▾"}</span>
          </button>
          {openFragments[i] && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ fontSize: "14px", color: "#333", lineHeight: 1.8, fontFamily: "'Source Sans 3', sans-serif", fontStyle: "italic", whiteSpace: "pre-wrap", borderLeft: `3px solid ${k?.color || "#1a1a2e"}30`, paddingLeft: "16px" }}>
                {frag.tekst}
              </div>
              {frag.toelichting && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => toggleToelichting(i)} style={{
                    width: "100%", padding: "8px 0", background: "transparent", border: "none", cursor: "pointer",
                    textAlign: "left", fontSize: "13px", fontWeight: 600, color: openToelichtingen[i] ? "#2D5A8E" : "#777",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}>
                    {openToelichtingen[i] ? "▾ Verberg toelichting" : "▸ Toelichting — wat staat hier?"}
                  </button>
                  {openToelichtingen[i] && (
                    <div style={{ padding: "12px 14px", background: "#fef9e7", borderRadius: "8px", border: "1px solid #f0e6b8" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#856404", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Toelichting</div>
                      <div style={{ fontSize: "13px", color: "#444", lineHeight: 1.7, fontFamily: "'Source Sans 3', sans-serif" }}>
                        {frag.toelichting}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "24px 0 12px" }}>Oefenvragen</h3>
      {pt.vragen.map((v, i) => {
        const answerKey = `${pt.id}-q${i}`;
        const savedAnswer = (progress.tekstAntwoorden || {})[answerKey] || "";
        return (
          <div key={i} style={{ marginBottom: "12px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "16px", background: "#f0f4ff" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#6B5CFF", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Vraag {i + 1}</div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", margin: 0, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{v.vraag}</p>
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid #e8e8f0" }}>
              {/* Schrijfruimte */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Jouw antwoord</div>
                <textarea
                  value={savedAnswer}
                  onChange={(e) => {
                    const val = e.target.value;
                    setProgress(prev => ({
                      ...prev,
                      tekstAntwoorden: { ...(prev.tekstAntwoorden || {}), [answerKey]: val },
                    }));
                  }}
                  placeholder="Schrijf hier je antwoord voordat je het modelantwoord bekijkt..."
                  rows={4}
                  style={{
                    width: "100%", padding: "10px 12px", fontSize: "13px", lineHeight: 1.6,
                    border: "1px solid #ddd", borderRadius: "8px", resize: "vertical",
                    fontFamily: "'Source Sans 3', sans-serif", boxSizing: "border-box",
                    background: savedAnswer ? "#fafffe" : "#fff",
                  }}
                />
              </div>
              <button onClick={() => toggleVraag(i)} style={{
                width: "100%", padding: "10px 0", background: "transparent", border: "none", cursor: "pointer",
                textAlign: "left", fontSize: "13px", fontWeight: 600, color: openVragen[i] ? "#2D8E5A" : "#777",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>
                {openVragen[i] ? "▾ Verberg antwoordmodel" : "▸ Toon antwoordmodel"}
              </button>
              {openVragen[i] && (
                <div style={{ marginTop: "8px", padding: "16px", background: "#f0fff5", borderRadius: "8px", border: "1px solid #c8e6c9" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#2D8E5A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Modelantwoord</div>
                  <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.7, fontFamily: "'Source Sans 3', sans-serif", whiteSpace: "pre-wrap" }}>
                    {v.antwoord}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Bonus: denkschema als die bestaat voor deze tekst */}
      {(() => {
        const mm = MINDMAPS.find(m => m.context.includes("tekst") && m.tekstId === pt.id);
        return mm ? <CollapsibleMindMap mindmap={mm} label={`Denkschema: ${mm.title}`} /> : null;
      })()}

      {/* Tracker buttons on detail page */}
      <div style={{ display: "flex", gap: "8px", padding: "16px 0", marginTop: "8px", borderTop: "1px solid #e8e8f0" }}>
        <button onClick={() => setTekstStatus(pt.id, "begrepen")} style={{
          flex: 1, padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
          border: detailStatus === "begrepen" ? "2px solid #4caf50" : "1px solid #e0e0e8",
          background: detailStatus === "begrepen" ? "#e8f5e9" : "#fff",
          color: detailStatus === "begrepen" ? "#2e7d32" : "#777",
        }}>✔ Begrepen</button>
        <button onClick={() => setTekstStatus(pt.id, "lastig")} style={{
          flex: 1, padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
          border: detailStatus === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
          background: detailStatus === "lastig" ? "#fce4ec" : "#fff",
          color: detailStatus === "lastig" ? "#c62828" : "#777",
        }}>✗ Lastig</button>
      </div>
      <Toast message={toast} />
    </div>
  );
}
