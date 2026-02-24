import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { VIDEOS } from "../data/videos.js";
import { KwestieTag } from "../components/KwestieTag.jsx";

const FILOSOOF_VIDEO = {
  "Descartes": ["h1"],
  "Sheets-Johnstone": ["h2"],
  "Plessner": ["h3", "extra1"],
  "De Beauvoir": ["h4"],
  "Fanon": ["h4"],
  "Lakoff & Johnson": ["h5"],
  "Vroon & Draaisma": ["h5"],
  "Swaab / computationalisme": ["h6"],
  "Dreyfus": ["h6"],
  "4E-cognitie": ["h7"],
  "Clark": ["h8"],
  "Kockelkoren": ["h9"],
  "Verbeek": ["h10"],
  "De Mul": ["h11"],
  "Morton": ["h12"],
  "Despret": ["h12"],
  "Haraway": ["h12"],
  "Latour": ["h13"],
  "Hayles": ["h13"],
  "Barad": ["h14"],
  "Harari": ["h14"],
  "Rasch": ["h14"],
};

export function FilosofenView({ progress, setProgress }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(0);

  const tracker = progress?.filosofenTracker || {};

  const setStatus = (name, status) => {
    const current = tracker[name];
    const newStatus = current === status ? null : status;
    setProgress(prev => ({
      ...prev,
      filosofenTracker: { ...(prev.filosofenTracker || {}), [name]: newStatus },
    }));
  };

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
        {/* Begrepen / Lastig */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <button onClick={() => setStatus(f.name, "begrepen")} style={{
            flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            border: tracker[f.name] === "begrepen" ? "2px solid #4caf50" : "1px solid #e0e0e8",
            background: tracker[f.name] === "begrepen" ? "#e8f5e9" : "#fff",
            color: tracker[f.name] === "begrepen" ? "#2e7d32" : "#777",
          }}>Begrepen</button>
          <button onClick={() => setStatus(f.name, "lastig")} style={{
            flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            border: tracker[f.name] === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
            background: tracker[f.name] === "lastig" ? "#fce4ec" : "#fff",
            color: tracker[f.name] === "lastig" ? "#c62828" : "#777",
          }}>Lastig</button>
        </div>

        {(() => {
          const videoIds = FILOSOOF_VIDEO[f.name];
          if (!videoIds) return null;
          const vids = videoIds.map(id => VIDEOS.find(v => v.id === id)).filter(v => v?.youtubeId);
          if (vids.length === 0) return null;
          // Collect all filosofiebroers videos from matching entries
          const fbVids = videoIds
            .map(id => VIDEOS.find(v => v.id === id))
            .filter(v => v?.filosofiebroers?.length > 0)
            .flatMap(v => v.filosofiebroers);
          return (
            <div style={{ marginTop: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 10px", color: "#1a1a2e" }}>Uitlegvideo's — NotebookLM</h3>
              {vids.map(v => (
                <a key={v.id} href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px",
                    background: "#f0f5ff", border: "1px solid #d0dff0", borderRadius: "12px",
                    textDecoration: "none", marginBottom: "8px",
                  }}>
                  <span style={{ fontSize: "24px", color: "#4A90D9", flexShrink: 0 }}>{"▶"}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e" }}>{v.title}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>{v.hoofdstuk}</div>
                  </div>
                </a>
              ))}
              {fbVids.length > 0 && (
                <>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "12px 0 10px", color: "#1a1a2e" }}>Uitlegvideo's — Ben & Rob</h3>
                  {fbVids.map(fb => (
                    <a key={fb.youtubeId} href={`https://www.youtube.com/watch?v=${fb.youtubeId}`} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px",
                        background: "#f5f0ff", border: "1px solid #e0d8f0", borderRadius: "12px",
                        textDecoration: "none", marginBottom: "8px",
                      }}>
                      <span style={{ fontSize: "24px", color: "#5b3e9e", flexShrink: 0 }}>{"▶"}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e" }}>{fb.title}</div>
                        <div style={{ fontSize: "11px", color: "#5b3e9e" }}>Filosofiebroers</div>
                      </div>
                    </a>
                  ))}
                </>
              )}
            </div>
          );
        })()}
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
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                {tracker[f.name] && <span style={{ fontSize: "11px", fontWeight: 600, color: tracker[f.name] === "begrepen" ? "#4caf50" : "#ef5350" }}>{tracker[f.name] === "begrepen" ? "✔" : "✗"}</span>}
                <KwestieTag kwestie={f.kwestie} small />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
