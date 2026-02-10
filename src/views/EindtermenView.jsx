import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { ALGEMENE_EINDTERMEN, SPECIFIEKE_EINDTERMEN } from "../data/eindtermen.js";

export function EindtermenView() {
  const [openUitwerking, setOpenUitwerking] = useState({});
  const toggleUitwerking = (key) => setOpenUitwerking(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#1a1a2e", margin: "20px 0 8px" }}>Algemene eindtermen (ET 1–4)</h2>
      {ALGEMENE_EINDTERMEN.map(et => (
        <div key={et.nr} style={{ padding: "12px", background: "#f8f8fc", borderRadius: "8px", border: "1px solid #e8e8f0", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#666" }}>ET {et.nr}</div>
          <p style={{ fontSize: "13px", color: "#333", margin: "4px 0 0", lineHeight: 1.4 }}>{et.text}</p>
          <button onClick={() => toggleUitwerking(`alg-${et.nr}`)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "#4A90D9", padding: "6px 0 0", fontWeight: 600 }}>
            {openUitwerking[`alg-${et.nr}`] ? "Verberg uitwerking \u25B2" : "Toon uitwerking \u25BC"}
          </button>
          {openUitwerking[`alg-${et.nr}`] && (
            <div style={{ marginTop: "8px", padding: "10px 12px", background: "#eef4ff", borderRadius: "6px", fontSize: "13px", color: "#333", lineHeight: 1.5 }}>
              {et.uitwerking}
            </div>
          )}
        </div>
      ))}

      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#1a1a2e", margin: "28px 0 12px" }}>Specifieke eindtermen per kwestie</h2>
      <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>90% van het examen. De syllabus met bijbehorende eindtermen.</p>
      {KWESTIES.map(k => (
        <div key={k.id} style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span style={{ background: k.color, color: "#fff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px" }}>{k.id}</span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>{k.title}</span>
          </div>
          {(SPECIFIEKE_EINDTERMEN[k.id] || []).map(et => {
            const etLiaMap = { 5: "Lia 1, H1 (p. 5–9)", 6: "Lia 1, H2 (p. 12–15)", 7: "Lia 1, H3 (p. 19–21)", 8: "Lia 1, H4 (p. 25–26)", 9: "Lia 1, H4 (p. 26–27)", 10: "Lia 1, H5 (p. 31–33)", 11: "Lia 1, H6 (p. 36–39)", 12: "Lia 1, H7 (p. 43–45)", 13: "Lia 2, H8–H11", 14: "Lia 2, H8 (p. 2–6)", 15: "Lia 2, H9 (p. 7–12)", 16: "Lia 2, H10 (p. 13–18)", 17: "Lia 2, H11 (p. 19–23)", 18: "Lia 2, H12–H14", 19: "Lia 2, H12 (p. 24–30)", 20: "Lia 2, H12 (p. 28–30)", 21: "Lia 2, H13 (p. 32–37)", 22: "Lia 2, H14 (p. 40–41)", 23: "Lia 2, H14 (p. 41–43)" };
            const etLia = etLiaMap[et.nr];
            return (
            <div key={et.nr} style={{ marginBottom: "6px", padding: "12px", background: "#f8f8fc", borderRadius: "8px", border: `1px solid ${k.color}22`, borderLeft: `3px solid ${k.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: k.color }}>ET {et.nr}</span>
                {etLia && <span style={{ fontSize: "11px", fontWeight: 600, color: k.id <= 2 ? "#2D5A8E" : "#7A2D8E", background: k.id <= 2 ? "#2D5A8E30" : "#7A2D8E30", padding: "2px 6px", borderRadius: "4px" }}>{etLia}</span>}
              </div>
              <p style={{ fontSize: "13px", color: "#333", margin: "4px 0 0", lineHeight: 1.4 }}>{et.text}</p>
              <button onClick={() => toggleUitwerking(`k${k.id}-${et.nr}`)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: k.color, padding: "6px 0 0", fontWeight: 600 }}>
                {openUitwerking[`k${k.id}-${et.nr}`] ? "Verberg uitwerking \u25B2" : "Toon uitwerking \u25BC"}
              </button>
              {openUitwerking[`k${k.id}-${et.nr}`] && (
                <div style={{ marginTop: "8px", padding: "10px 12px", background: `${k.color}08`, borderRadius: "6px", fontSize: "13px", color: "#333", lineHeight: 1.5 }}>
                  {et.uitwerking}
                </div>
              )}
            </div>
          ); })}
        </div>
      ))}
    </div>
  );
}
