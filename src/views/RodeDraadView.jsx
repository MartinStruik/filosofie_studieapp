import { useState } from "react";
import { RODE_DRAAD } from "../data/rodeDraad.js";
import { KWESTIES } from "../data/kwesties.js";

function getKwestieColor(id) {
  const k = KWESTIES.find(k => k.id === id);
  return k?.color || "#666";
}

export function RodeDraadView({ progress, setProgress }) {
  const [selected, setSelected] = useState(null);

  const tracker = progress.rodeDraadTracker || {};

  const setStatus = (id, status) => {
    const current = tracker[id];
    const newStatus = current === status ? null : status;
    setProgress(prev => ({
      ...prev,
      rodeDraadTracker: { ...(prev.rodeDraadTracker || {}), [id]: newStatus },
    }));
  };

  if (selected) {
    const card = selected;
    const isGrote = card.naar === null;

    return (
      <div style={{ padding: "0 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#666", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"←"} Terug</button>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)", color: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          {!isGrote && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ background: getKwestieColor(card.van), padding: "3px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{card.van}</span>
              <span style={{ fontSize: "14px", opacity: 0.6 }}>→</span>
              <span style={{ background: getKwestieColor(card.naar), padding: "3px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{card.naar}</span>
            </div>
          )}
          {isGrote && (
            <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
              {KWESTIES.map(k => (
                <span key={k.id} style={{ background: k.color, padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{k.id}</span>
              ))}
            </div>
          )}
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", margin: 0, lineHeight: 1.3 }}>{card.titel}</h2>
        </div>

        {/* Stappen — vertical flow */}
        <div style={{ position: "relative", paddingLeft: "20px", marginBottom: "16px" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "9px", top: "12px", bottom: "12px", width: "2px", background: "linear-gradient(to bottom, #4A90D9, #B04AD9)" }} />

          {card.stappen.map((s, i) => {
            const color = getKwestieColor(s.kwestie);
            return (
              <div key={i} style={{ position: "relative", marginBottom: i < card.stappen.length - 1 ? "12px" : 0 }}>
                {/* Dot on the line */}
                <div style={{ position: "absolute", left: "-16px", top: "14px", width: "12px", height: "12px", borderRadius: "50%", background: color, border: "2px solid #fff", boxShadow: "0 0 0 1px #e8e8f0" }} />
                <div style={{
                  background: "#fff", border: "1px solid #e8e8f0", borderLeft: `4px solid ${color}`,
                  borderRadius: "10px", padding: "12px 14px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{s.filosoof}</span>
                    <span style={{ background: `${color}20`, color: color, padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>K{s.kwestie}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.5 }}>{s.positie}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rode draad */}
        <div style={{ background: "#fdf2f2", border: "1px solid #f0d0d0", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px", color: "#a03030" }}>Rode draad</h3>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{card.rodeDraad}</p>
        </div>

        {/* Examentip */}
        <div style={{ background: "#fef9e7", border: "1px solid #f0e6b8", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px", color: "#856404" }}>Examentip</h3>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, margin: 0 }}>{card.examentip}</p>
        </div>

        {/* Begrepen / Lastig */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setStatus(card.id, "begrepen")} style={{
            flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            border: tracker[card.id] === "begrepen" ? "2px solid #4caf50" : "1px solid #e0e0e8",
            background: tracker[card.id] === "begrepen" ? "#e8f5e9" : "#fff",
            color: tracker[card.id] === "begrepen" ? "#2e7d32" : "#777",
          }}>Begrepen</button>
          <button onClick={() => setStatus(card.id, "lastig")} style={{
            flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            border: tracker[card.id] === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
            background: tracker[card.id] === "lastig" ? "#fce4ec" : "#fff",
            color: tracker[card.id] === "lastig" ? "#c62828" : "#777",
          }}>Lastig</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5, margin: "16px 0" }}>
        Hoe lopen de verbindingen tussen de vier kwesties? Deze kaarten tonen de rode draad — het hogere abstractieniveau dat het verschil maakt op het examen.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {RODE_DRAAD.map(card => {
          const isGrote = card.naar === null;
          return (
            <button key={card.id} onClick={() => setSelected(card)} style={{
              display: "block", width: "100%", background: isGrote ? "#1a1a2e" : "#fff",
              border: isGrote ? "none" : "1px solid #e8e8f0",
              borderRadius: "10px", padding: "16px", cursor: "pointer", textAlign: "left",
              transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = ""}
            >
              {!isGrote && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <span style={{ background: `${getKwestieColor(card.van)}20`, color: getKwestieColor(card.van), padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{card.van}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>→</span>
                  <span style={{ background: `${getKwestieColor(card.naar)}20`, color: getKwestieColor(card.naar), padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{card.naar}</span>
                </div>
              )}
              {isGrote && (
                <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
                  {KWESTIES.map((k, i) => (
                    <span key={k.id} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ background: k.color, color: "#fff", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>K{k.id}</span>
                      {i < KWESTIES.length - 1 && <span style={{ fontSize: "12px", color: "#666" }}>→</span>}
                    </span>
                  ))}
                </div>
              )}
              <h3 style={{ fontWeight: 700, fontSize: "15px", color: isGrote ? "#fff" : "#1a1a2e", margin: 0, lineHeight: 1.3, fontFamily: "'Source Sans 3', sans-serif" }}>{card.titel}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                <span style={{ fontSize: "12px", color: isGrote ? "rgba(255,255,255,0.7)" : "#555" }}>
                  {card.stappen.map(s => s.filosoof).join(" → ")}
                </span>
                {tracker[card.id] && <span style={{ fontSize: "11px", fontWeight: 600, color: tracker[card.id] === "begrepen" ? "#4caf50" : "#ef5350", marginLeft: "auto", flexShrink: 0 }}>{tracker[card.id] === "begrepen" ? "✔" : "✗"}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
