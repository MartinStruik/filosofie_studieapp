import { useState } from "react";
import { LIA_CHAPTERS } from "../data/liaChapters.js";
import { VIDEOS } from "../data/videos.js";

const KWESTIE_GROUPS = [
  { kwestie: 1, label: "Kwestie 1 — Het lichaam", color: "#4a6fa5" },
  { kwestie: 2, label: "Kwestie 2 — De geest", color: "#d4a050" },
  { kwestie: 3, label: "Kwestie 3 — Techniek", color: "#c05050" },
  { kwestie: 4, label: "Kwestie 4 — Natuur & samenleving", color: "#408860" },
];

export function LiaSpelView({ progress, setProgress }) {
  const [activeChapter, setActiveChapter] = useState(null);
  const liaPlayed = progress.liaPlayed || [];

  const openChapter = (chapter) => {
    setActiveChapter(chapter);
    if (!liaPlayed.includes(chapter.id)) {
      setProgress(prev => ({
        ...prev,
        liaPlayed: [...(prev.liaPlayed || []), chapter.id],
      }));
    }
  };

  const closeChapter = () => {
    setActiveChapter(null);
  };

  // --- Speel-modus: iframe ---
  if (activeChapter) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{
          background: activeChapter.color, color: "#fff", padding: "12px 16px",
          display: "flex", alignItems: "center", gap: "12px", flexShrink: 0,
        }}>
          <button onClick={closeChapter} style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer",
            borderRadius: "8px", padding: "8px 14px", fontSize: "14px", fontWeight: 700,
            minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {"← Terug"}
          </button>
          <span style={{ fontWeight: 700, fontSize: "15px", flex: 1 }}>
            {activeChapter.label}: {activeChapter.title}
          </span>
          {(() => {
            const video = VIDEOS.find(v => v.id === activeChapter.id);
            return video?.youtubeId ? (
              <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer"
                style={{
                  background: "rgba(255,255,255,0.2)", color: "#fff",
                  borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 700,
                  textDecoration: "none", display: "flex", alignItems: "center", gap: "6px",
                  minWidth: "44px", minHeight: "44px", justifyContent: "center", flexShrink: 0,
                }}>
                {"▶ Video"}
              </a>
            ) : null;
          })()}
        </div>
        <iframe
          src={`/lia/${activeChapter.file}`}
          title={`Lia's Transformatie — ${activeChapter.label}`}
          style={{ flex: 1, border: "none", width: "100%" }}
        />
        <button onClick={closeChapter} style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 210,
          background: activeChapter.color, color: "#fff", border: "none",
          borderRadius: "50px", padding: "12px 20px", fontSize: "14px", fontWeight: 700,
          cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", gap: "6px",
          minWidth: "44px", minHeight: "44px",
        }}>
          {"← Terug"}
        </button>
      </div>
    );
  }

  // --- Overzicht-modus ---
  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>
          Lia's Transformatie
        </h2>
        <p style={{ color: "#666", fontSize: "13px", margin: "8px 0 0", lineHeight: 1.5 }}>
          Volg Lia's reis door de filosofie. Elk hoofdstuk is een interactief verhaal
          waarin je de stof op een speelse manier leert kennen.
        </p>
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#4A90D9", fontWeight: 600 }}>
          {liaPlayed.length}/15 gespeeld
        </div>
      </div>

      {/* Per kwestie een groep */}
      {KWESTIE_GROUPS.map(group => {
        const chapters = LIA_CHAPTERS.filter(c => c.kwestie === group.kwestie);
        const playedInGroup = chapters.filter(c => liaPlayed.includes(c.id)).length;
        return (
          <div key={group.kwestie} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{
                width: "6px", height: "24px", borderRadius: "3px", background: group.color,
              }} />
              <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>{group.label}</span>
              <span style={{ fontSize: "12px", color: "#888", marginLeft: "auto" }}>{playedInGroup}/{chapters.length}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {chapters.map(ch => {
                const played = liaPlayed.includes(ch.id);
                return (
                  <button key={ch.id} onClick={() => openChapter(ch)} style={{
                    background: "#fff", border: `2px solid ${played ? ch.color : "#e8e8f0"}`,
                    borderRadius: "12px", padding: "14px 12px", cursor: "pointer", textAlign: "left",
                    transition: "transform 0.15s, box-shadow 0.15s, border-color 0.2s",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                      background: ch.color, opacity: played ? 1 : 0.3,
                    }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{
                        background: played ? ch.color : "#e8e8f0",
                        color: played ? "#fff" : "#999",
                        width: "28px", height: "28px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "11px", flexShrink: 0,
                      }}>{played ? "✓" : ch.label}</span>
                      <span style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e" }}>{ch.label}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#555", lineHeight: 1.3 }}>{ch.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Epiloog */}
      {(() => {
        const epiloog = LIA_CHAPTERS.find(c => c.id === "epiloog");
        const played = liaPlayed.includes("epiloog");
        return (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: "6px", height: "24px", borderRadius: "3px", background: epiloog.color }} />
              <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>Epiloog</span>
            </div>
            <button onClick={() => openChapter(epiloog)} style={{
              display: "block", width: "100%", background: "#fff",
              border: `2px solid ${played ? epiloog.color : "#e8e8f0"}`,
              borderRadius: "12px", padding: "16px", cursor: "pointer", textAlign: "left",
              transition: "transform 0.15s, box-shadow 0.15s, border-color 0.2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: epiloog.color, opacity: played ? 1 : 0.3,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  background: played ? epiloog.color : "#e8e8f0",
                  color: played ? "#fff" : "#999",
                  width: "32px", height: "32px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "13px", flexShrink: 0,
                }}>{played ? "✓" : "★"}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>Epiloog</div>
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{epiloog.title}</div>
                </div>
              </div>
            </button>
          </div>
        );
      })()}
    </div>
  );
}
