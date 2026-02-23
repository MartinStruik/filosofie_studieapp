import { useState } from "react";
import { MINDMAPS } from "../data/mindmaps.js";
import { MindMapCard } from "../components/MindMapCard.jsx";
import { KWESTIES } from "../data/kwesties.js";

export function MindmapView() {
  const [filter, setFilter] = useState("alle");

  const kwestieMaps = MINDMAPS.filter(m => m.context.includes("kwestie"));
  const bonusMaps = MINDMAPS.filter(m => !m.context.includes("kwestie"));

  const filtered = filter === "alle"
    ? MINDMAPS
    : filter === "bonus"
      ? bonusMaps
      : MINDMAPS.filter(m => m.kwestie === parseInt(filter));

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ background: "#f8f8fc", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "14px 16px", margin: "16px 0" }}>
        <p style={{ fontSize: "13px", color: "#444", margin: 0, lineHeight: 1.6 }}>
          Denkschema's geven je een visueel overzicht van hoe filosofen, begrippen en kwesties samenhangen.
          Tik op een filosoof voor meer info. Je vindt deze schema's ook terug bij de kwesties, primaire teksten en rode draden.
        </p>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
        {[
          { id: "alle", label: "Alle", color: "#1a1a2e" },
          ...KWESTIES.map(k => ({ id: String(k.id), label: `K${k.id}`, color: k.color })),
          { id: "bonus", label: "Bonus", color: "#666" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: "6px 14px", borderRadius: "20px", cursor: "pointer",
              fontSize: "12px", fontWeight: 600,
              background: filter === f.id ? f.color : "#fff",
              color: filter === f.id ? "#fff" : f.color,
              border: `1.5px solid ${f.color}`,
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Mindmap cards */}
      {filtered.map(mm => (
        <MindMapCard key={mm.id} mindmap={mm} />
      ))}

      {filtered.length === 0 && (
        <p style={{ color: "#999", fontSize: "13px", textAlign: "center", padding: "40px 0" }}>
          Geen denkschema's voor dit filter.
        </p>
      )}
    </div>
  );
}
