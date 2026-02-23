import { useState, useMemo } from "react";
import { FOUTENJACHT_ITEMS, FOUT_TYPES } from "../data/foutenjacht.js";

/**
 * Foutenjacht: leerlingen beoordelen spoof-antwoorden op examenvragen.
 * Tik op een zin die je fout vindt → kies het fouttype → krijg feedback.
 *
 * Flow:
 *  1. Overzicht: kies een item (of "volgende")
 *  2. Lees vraag + "leerling-antwoord"
 *  3. Tik op zinnen die je fout vindt
 *  4. Check: toon welke fouten er waren + uitleg
 */

const KWESTIE_LABELS = { 1: "K1", 2: "K2", 3: "K3", 4: "K4" };
const KWESTIE_COLORS = { 1: "#2D5A8E", 2: "#8E4A2D", 3: "#2D8E5A", 4: "#7A2D8E" };

/* ===== Overzicht screen ===== */
function ItemList({ items, onSelect, progress }) {
  return (
    <div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>
        Foutenjacht
      </div>
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "16px" }}>
        Beoordeel antwoorden van "medeleerlingen". Tik op de zinnen die fouten bevatten.
      </div>
      {items.map((item) => {
        const done = progress[item.id];
        const kColor = KWESTIE_COLORS[item.kwestie] || "#666";
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", background: done ? "#f0faf0" : "#fff",
              border: "1px solid #e8e8f0", borderRadius: "10px",
              padding: "12px 14px", marginBottom: "8px",
              cursor: "pointer", textAlign: "left",
              transition: "background 0.12s",
            }}
          >
            <span style={{
              background: kColor + "18", color: kColor,
              borderRadius: "6px", padding: "2px 8px",
              fontSize: "10px", fontWeight: 700, flexShrink: 0,
            }}>
              {KWESTIE_LABELS[item.kwestie]}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: "12px", fontWeight: 600, color: "#1a1a2e",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {item.vraag.split("(")[0].trim()}
              </div>
              <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>
                Antwoord van {item.naam} · {item.punten}p
              </div>
            </div>
            {done ? (
              <span style={{ fontSize: "10px", color: "#2E9E5A", fontWeight: 600 }}>
                {done.score}/{done.total}
              </span>
            ) : (
              <span style={{ fontSize: "14px", color: "#ccc" }}>›</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ===== Speel screen ===== */
function PlayScreen({ item, onDone, onBack }) {
  const [selected, setSelected] = useState(new Set());       // indices of segments tapped as "fout"
  const [checked, setChecked] = useState(false);
  const [showCorrectiemodel, setShowCorrectiemodel] = useState(false);

  const fouten = useMemo(() =>
    item.segmenten.map((s, i) => ({ ...s, idx: i })).filter(s => !s.correct),
    [item]
  );
  const totalFouten = fouten.length;

  const toggleSegment = (idx) => {
    if (checked) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const handleCheck = () => {
    setChecked(true);
    // Calculate score
    let correctFound = 0;
    let falsePositives = 0;
    selected.forEach(idx => {
      const seg = item.segmenten[idx];
      if (!seg.correct) correctFound++;
      else falsePositives++;
    });
    onDone({ score: Math.max(0, correctFound - falsePositives), total: totalFouten });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontSize: "16px",
          cursor: "pointer", color: "#888", padding: "4px",
        }}>←</button>
        <span style={{
          background: KWESTIE_COLORS[item.kwestie] + "18",
          color: KWESTIE_COLORS[item.kwestie],
          borderRadius: "6px", padding: "2px 8px",
          fontSize: "10px", fontWeight: 700,
        }}>
          {KWESTIE_LABELS[item.kwestie]}
        </span>
        <span style={{ fontSize: "11px", color: "#888" }}>{item.punten} punten</span>
      </div>

      {/* Examvraag */}
      <div style={{
        background: "#f8f8fc", borderRadius: "10px", padding: "12px 14px",
        marginBottom: "14px", border: "1px solid #e8e8f0",
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
          Examvraag
        </div>
        <div style={{ fontSize: "12px", color: "#1a1a2e", lineHeight: 1.6 }}>
          {item.vraag}
        </div>
      </div>

      {/* Instructie */}
      {!checked && (
        <div style={{
          fontSize: "11px", color: "#4A90D9", fontWeight: 600,
          marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px",
        }}>
          <span style={{ fontSize: "14px" }}>👆</span>
          Tik op de zinnen die je fout vindt
        </div>
      )}

      {/* Antwoord van "leerling" */}
      <div style={{
        background: "#fff", borderRadius: "10px", padding: "12px 14px",
        border: "1px solid #e8e8f0", marginBottom: "14px",
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#888", marginBottom: "8px" }}>
          Antwoord van {item.naam}:
        </div>
        {item.segmenten.map((seg, i) => {
          const isSelected = selected.has(i);
          const isFout = !seg.correct;

          // After check: green for correct segments, red for found errors, yellow for missed errors
          let bg = "transparent";
          let borderColor = "transparent";
          if (!checked && isSelected) {
            bg = "#fff0f0";
            borderColor = "#e88";
          }
          if (checked) {
            if (isFout && isSelected) { bg = "#e8f5e9"; borderColor = "#4caf50"; }     // correct catch
            else if (isFout && !isSelected) { bg = "#fff3e0"; borderColor = "#ff9800"; } // missed
            else if (!isFout && isSelected) { bg = "#ffebee"; borderColor = "#ef5350"; } // false positive
            else { bg = "transparent"; borderColor = "transparent"; }
          }

          return (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div
                onClick={() => toggleSegment(i)}
                style={{
                  fontSize: "12px", color: "#333", lineHeight: 1.6,
                  padding: "6px 10px", borderRadius: "8px",
                  background: bg,
                  border: `1.5px solid ${borderColor}`,
                  cursor: checked ? "default" : "pointer",
                  transition: "all 0.12s",
                  position: "relative",
                }}
              >
                {seg.text}
                {/* Fout type badge after check */}
                {checked && isFout && (
                  <span style={{
                    display: "inline-block", marginLeft: "6px",
                    fontSize: "9px", fontWeight: 600,
                    color: FOUT_TYPES[seg.foutType]?.color || "#c62828",
                    background: (FOUT_TYPES[seg.foutType]?.color || "#c62828") + "15",
                    borderRadius: "4px", padding: "1px 6px",
                  }}>
                    {FOUT_TYPES[seg.foutType]?.icon} {FOUT_TYPES[seg.foutType]?.label}
                  </span>
                )}
                {checked && !isFout && isSelected && (
                  <span style={{
                    display: "inline-block", marginLeft: "6px",
                    fontSize: "9px", fontWeight: 600, color: "#ef5350",
                  }}>
                    ✗ Deze zin was correct
                  </span>
                )}
              </div>
              {/* Uitleg after check */}
              {checked && isFout && seg.uitleg && (
                <div style={{
                  marginTop: "4px", marginLeft: "10px",
                  fontSize: "11px", color: "#555", lineHeight: 1.5,
                  borderLeft: `2px solid ${FOUT_TYPES[seg.foutType]?.color || "#c62828"}40`,
                  paddingLeft: "10px",
                  animation: "fadeIn 0.15s ease",
                }}>
                  {seg.uitleg}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Check button or score */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selected.size === 0}
          style={{
            width: "100%", padding: "12px",
            background: selected.size > 0 ? "#1a1a2e" : "#ddd",
            color: selected.size > 0 ? "#fff" : "#999",
            border: "none", borderRadius: "10px",
            fontSize: "13px", fontWeight: 700,
            cursor: selected.size > 0 ? "pointer" : "default",
            transition: "all 0.15s",
          }}
        >
          Controleer ({selected.size} {selected.size === 1 ? "zin" : "zinnen"} geselecteerd)
        </button>
      ) : (
        <div>
          {/* Score summary */}
          <div style={{
            background: "#f8f8fc", borderRadius: "10px", padding: "12px 14px",
            marginBottom: "10px", textAlign: "center",
          }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>Je vond</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
              {[...selected].filter(i => !item.segmenten[i].correct).length} / {totalFouten}
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#888" }}> fouten</span>
            </div>
            {[...selected].filter(i => item.segmenten[i].correct).length > 0 && (
              <div style={{ fontSize: "11px", color: "#ef5350", marginTop: "4px" }}>
                {[...selected].filter(i => item.segmenten[i].correct).length} correcte {[...selected].filter(i => item.segmenten[i].correct).length === 1 ? "zin" : "zinnen"} onterecht als fout aangemerkt
              </div>
            )}
          </div>

          {/* Correctiemodel toggle */}
          <button
            onClick={() => setShowCorrectiemodel(!showCorrectiemodel)}
            style={{
              width: "100%", background: showCorrectiemodel ? "#f0f4ff" : "#fff",
              border: "1px solid #e0e8f5", borderRadius: "8px",
              padding: "10px 14px", cursor: "pointer", textAlign: "left",
              fontSize: "11px", fontWeight: 600, color: "#4A90D9",
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "10px",
            }}
          >
            <span>📋</span>
            <span style={{ flex: 1 }}>Bekijk correctiemodel</span>
            <span style={{ fontSize: "11px", color: "#999" }}>{showCorrectiemodel ? "▲" : "▼"}</span>
          </button>
          {showCorrectiemodel && (
            <div style={{
              fontSize: "11px", color: "#444", lineHeight: 1.6,
              background: "#f8f4e8", borderRadius: "8px", padding: "10px 14px",
              marginBottom: "10px",
            }}>
              {item.correctiemodel}
            </div>
          )}

          {/* Volgende */}
          <button
            onClick={onBack}
            style={{
              width: "100%", padding: "12px",
              background: "#1a1a2e", color: "#fff",
              border: "none", borderRadius: "10px",
              fontSize: "13px", fontWeight: 700, cursor: "pointer",
            }}
          >
            Terug naar overzicht
          </button>
        </div>
      )}
    </div>
  );
}

/* ===== Main view ===== */
export default function FoutenjachtView() {
  const [activeItem, setActiveItem] = useState(null);
  const [progress, setProgress] = useState({});
  const [filter, setFilter] = useState("alle");

  const filters = ["alle", "K1", "K2", "K3", "K4"];
  const filtered = filter === "alle"
    ? FOUTENJACHT_ITEMS
    : FOUTENJACHT_ITEMS.filter(i => KWESTIE_LABELS[i.kwestie] === filter);

  const handleDone = (result) => {
    if (activeItem) {
      setProgress(p => ({ ...p, [activeItem.id]: result }));
    }
  };

  if (activeItem) {
    return (
      <PlayScreen
        item={activeItem}
        onDone={handleDone}
        onBack={() => setActiveItem(null)}
      />
    );
  }

  return (
    <div>
      {/* Filter chips */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 12px", borderRadius: "16px",
              fontSize: "11px", fontWeight: 600,
              background: filter === f ? "#1a1a2e" : "#f4f4f8",
              color: filter === f ? "#fff" : "#666",
              border: "none", cursor: "pointer",
              transition: "all 0.12s",
            }}
          >
            {f === "alle" ? `Alle (${FOUTENJACHT_ITEMS.length})` : f}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      {Object.keys(progress).length > 0 && (
        <div style={{
          background: "#f0faf0", borderRadius: "8px", padding: "8px 14px",
          marginBottom: "14px", fontSize: "11px", color: "#2E9E5A", fontWeight: 600,
          display: "flex", justifyContent: "space-between",
        }}>
          <span>{Object.keys(progress).length}/{FOUTENJACHT_ITEMS.length} gedaan</span>
          <span>
            {Object.values(progress).reduce((s, p) => s + p.score, 0)}/
            {Object.values(progress).reduce((s, p) => s + p.total, 0)} fouten gevonden
          </span>
        </div>
      )}

      <ItemList
        items={filtered}
        onSelect={setActiveItem}
        progress={progress}
      />
    </div>
  );
}
