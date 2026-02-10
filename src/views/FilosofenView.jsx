import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { KwestieTag } from "../components/KwestieTag.jsx";

export function FilosofenView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(0);

  const list = filter === 0 ? FILOSOFEN : FILOSOFEN.filter(f => f.kwestie === filter);

  if (selected) {
    const f = selected;
    const k = KWESTIES.find(k => k.id === f.kwestie);
    return (
      <div style={{ padding: "0 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#666", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"←"} Terug</button>
        <div style={{ background: k?.color || "#1a1a2e", color: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          <KwestieTag kwestie={f.kwestie} small />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", margin: "12px 0 4px" }}>{f.name}</h2>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>{f.et}</div>
          {f.lia && <div style={{ fontSize: "11px", opacity: 0.9, marginTop: "4px", background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "2px 8px", borderRadius: "4px" }}>{f.lia}</div>}
        </div>
        {f.img && (
          <img src={f.img} alt={f.name}
            style={{ width: "100%", maxWidth: "280px", borderRadius: "12px",
                     margin: "16px auto", display: "block",
                     boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }} />
        )}
        <div style={{ padding: "16px", background: "#f8f8fc", borderRadius: "12px", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" }}>Kernpositie</h3>
          <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{f.kern}</p>
        </div>
        <div style={{ padding: "16px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 10px", color: "#1a1a2e" }}>Kernbegrippen</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {f.begrippen.map(b => (
              <span key={b} style={{ background: `${k?.color}15`, color: k?.color, border: `1px solid ${k?.color}30`, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[{ id: 0, label: "Alle" }, ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` }))].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map(f => {
          const k = KWESTIES.find(k => k.id === f.kwestie);
          return (
            <button key={f.name} onClick={() => setSelected(f)} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
              background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px",
              cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = ""}
            >
              {f.img ? (
                <img src={f.img} alt={f.name}
                  style={{ width: "44px", height: "44px", borderRadius: "50%",
                           objectFit: "cover", objectPosition: "center 20%",
                           border: `2px solid ${k?.color || "#ccc"}`, flexShrink: 0 }} />
              ) : (
                <div style={{ width: "44px", height: "44px", borderRadius: "50%",
                              background: k?.color || "#ccc", color: "#fff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontWeight: 700, fontSize: "16px", flexShrink: 0 }}>
                  {f.name[0]}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{f.name}</div>
                <div style={{ fontSize: "11px", color: "#666", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.et} · {f.begrippen.slice(0, 3).join(", ")}</div>
                {f.lia && <div style={{ fontSize: "11px", color: "#7A2D8E", marginTop: "2px" }}>{f.lia}</div>}
              </div>
              <KwestieTag kwestie={f.kwestie} small />
            </button>
          );
        })}
      </div>
    </div>
  );
}
