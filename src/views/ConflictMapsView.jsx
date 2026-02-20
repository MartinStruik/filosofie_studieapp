import { useState } from "react";
import { CONFLICT_MAPS } from "../data/conflictMaps.js";
import { KWESTIES } from "../data/kwesties.js";

const KWESTIE_FILTERS = [
  { id: 0, label: "Alle" },
  { id: 1, label: "K1" },
  { id: 2, label: "K2" },
  { id: 3, label: "K3" },
  { id: 4, label: "K4" },
];

function getKwestieColor(kwestie) {
  if (typeof kwestie === "string") {
    // e.g. "3+4" — use K3 color
    const first = parseInt(kwestie);
    const k = KWESTIES.find(k => k.id === first);
    return k?.color || "#666";
  }
  const k = KWESTIES.find(k => k.id === kwestie);
  return k?.color || "#666";
}

function getKwestieLabel(kwestie) {
  if (typeof kwestie === "string") return `K${kwestie}`;
  return `K${kwestie}`;
}

function matchesFilter(card, filterId) {
  if (filterId === 0) return true;
  if (typeof card.kwestie === "string") {
    return card.kwestie.split("+").map(Number).includes(filterId);
  }
  return card.kwestie === filterId;
}

export function ConflictMapsView({ progress, setProgress }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(0);

  const tracker = progress.conflictTracker || {};

  const setStatus = (id, status) => {
    const current = tracker[id];
    const newStatus = current === status ? null : status;
    setProgress(prev => ({
      ...prev,
      conflictTracker: { ...(prev.conflictTracker || {}), [id]: newStatus },
    }));
  };

  const list = CONFLICT_MAPS.filter(c => matchesFilter(c, filter));

  if (selected) {
    const card = selected;
    const color = getKwestieColor(card.kwestie);
    const leftNodes = card.nodes.filter(n => n.side === "left");
    const rightNodes = card.nodes.filter(n => n.side === "right");
    const centerNodes = card.nodes.filter(n => n.side === "center");

    return (
      <div style={{ padding: "0 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#666", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"←"} Terug</button>

        <div style={{ background: color, color: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>{getKwestieLabel(card.kwestie)}</span>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>{card.eindtermen}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", margin: 0, lineHeight: 1.3 }}>{card.titel}</h2>
        </div>

        {/* Conflict layout */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          {/* Left column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {leftNodes.map(n => (
              <div key={n.filosoof} style={{
                background: "#fff", border: "1px solid #e8e8f0", borderLeft: "4px solid #c0392b",
                borderRadius: "10px", padding: "12px",
              }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#c0392b", marginBottom: "4px", fontFamily: "'Source Sans 3', sans-serif" }}>{n.filosoof}</div>
                <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.5 }}>{n.stance}</div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {rightNodes.map(n => (
              <div key={n.filosoof} style={{
                background: "#fff", border: "1px solid #e8e8f0", borderLeft: "4px solid #27ae60",
                borderRadius: "10px", padding: "12px",
              }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#27ae60", marginBottom: "4px", fontFamily: "'Source Sans 3', sans-serif" }}>{n.filosoof}</div>
                <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.5 }}>{n.stance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center nodes */}
        {centerNodes.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
            {centerNodes.map(n => (
              <div key={n.filosoof} style={{
                background: "#fff", border: "1px solid #e8e8f0", borderLeft: "4px solid #f39c12",
                borderRadius: "10px", padding: "12px",
              }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#f39c12", marginBottom: "4px", fontFamily: "'Source Sans 3', sans-serif" }}>{n.filosoof}</div>
                <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.5 }}>{n.stance}</div>
              </div>
            ))}
          </div>
        )}

        {/* Crux */}
        <div style={{ background: "#f4f4f8", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" }}>Kernspanning</h3>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{card.crux}</p>
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
      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {KWESTIE_FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>

      {/* Card list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {list.map(card => {
          const color = getKwestieColor(card.kwestie);
          return (
            <button key={card.id} onClick={() => setSelected(card)} style={{
              display: "block", width: "100%", background: "#fff", border: "1px solid #e8e8f0",
              borderLeft: `4px solid ${color}`, borderRadius: "10px", padding: "16px",
              cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = ""}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", margin: 0, lineHeight: 1.3, fontFamily: "'Source Sans 3', sans-serif", flex: 1 }}>{card.titel}</h3>
                <span style={{ background: `${color}20`, color: color, padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, marginLeft: "8px", flexShrink: 0 }}>{getKwestieLabel(card.kwestie)}</span>
              </div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{card.eindtermen}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", color: "#555" }}>
                  {card.nodes.map(n => n.filosoof).join(" · ")}
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
