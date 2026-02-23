import { useState } from "react";
import { VIDEOS } from "../data/videos.js";
import { KWESTIES } from "../data/kwesties.js";
import { KwestieTag } from "../components/KwestieTag.jsx";

export function VideoView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(0);

  const available = VIDEOS.filter(v => v.youtubeId);
  const list = filter === 0 ? VIDEOS : VIDEOS.filter(v => v.kwestie === filter);

  if (selected) {
    const v = selected;
    const k = KWESTIES.find(k => k.id === v.kwestie);
    return (
      <div style={{ padding: "0 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#666", padding: "16px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{"\u2190"} Terug naar overzicht</button>

        <div style={{ background: k?.color || "#1a1a2e", color: "#fff", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>{v.hoofdstuk}</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", margin: "0", lineHeight: 1.3 }}>{v.title}</h2>
        </div>

        {v.youtubeId ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        ) : (
          <div style={{ padding: "40px 20px", background: "#f8f8fc", borderRadius: "12px", textAlign: "center", color: "#999", fontSize: "14px", marginBottom: "16px" }}>
            Video wordt binnenkort toegevoegd
          </div>
        )}

        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          {v.kwestie > 0 && <KwestieTag kwestie={v.kwestie} small />}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ background: "#f5f0ff", border: "1px solid #e0d8f0", borderRadius: "12px", padding: "16px", margin: "16px 0" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>Uitlegvideo's</div>
        <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>
          Korte video's per hoofdstuk die de kernstof helder uitleggen. Ideaal als voorbereiding of herhaling.
        </p>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "0 0 16px" }}>
        {[{ id: 0, label: "Alle" }, ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` }))].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id ? "#1a1a2e" : "#f0f0f5",
            color: filter === f.id ? "#fff" : "#666",
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ fontSize: "12px", color: "#999", marginBottom: "12px" }}>
        {available.length} van {VIDEOS.length} video's beschikbaar
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map(v => {
          const k = KWESTIES.find(k => k.id === v.kwestie);
          const hasVideo = !!v.youtubeId;
          return (
            <button key={v.id} onClick={() => hasVideo ? setSelected(v) : null} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
              background: hasVideo ? "#fff" : "#fafafa", border: "1px solid #e8e8f0",
              borderLeft: `4px solid ${hasVideo ? (k?.color || "#1a1a2e") : "#ddd"}`,
              borderRadius: "8px", cursor: hasVideo ? "pointer" : "default",
              textAlign: "left", opacity: hasVideo ? 1 : 0.5,
              transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => hasVideo && (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)")}
            onMouseOut={e => e.currentTarget.style.boxShadow = ""}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px", flexShrink: 0,
                background: hasVideo ? (k?.color || "#1a1a2e") : "#ddd",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>
                {hasVideo ? "\u25B6" : "\u23F3"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "13px", color: hasVideo ? "#1a1a2e" : "#999" }}>{v.title}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "2px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <span>{v.hoofdstuk}</span>
                  {v.kwestie > 0 && <KwestieTag kwestie={v.kwestie} small />}
                  {!hasVideo && <span style={{ fontStyle: "italic" }}>binnenkort</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
