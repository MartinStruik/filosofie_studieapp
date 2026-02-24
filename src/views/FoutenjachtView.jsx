import { useState, useMemo } from "react";
import { FOUTENJACHT_ITEMS, FOUT_TYPES } from "../data/foutenjacht.js";

/**
 * Foutenjacht v2: herken typische CE-fouten in spoof-antwoorden.
 *
 * Flow:
 *  1. Overzicht: kies een item
 *  2. Lees examvraag + leerlingantwoord
 *  3. Beantwoord MC-vraag: "Wat gaat er mis?"
 *  4. Krijg uitleg + correctiemodel
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
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "16px", lineHeight: 1.5 }}>
        Lees het antwoord van een "medeleerling" op een examenvraag. Wat gaat er mis? Herken typische CE-fouten.
      </div>
      {items.map((item) => {
        const result = progress[item.id];
        const kColor = KWESTIE_COLORS[item.kwestie] || "#666";
        const ft = FOUT_TYPES[item.foutType];
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", background: result ? (result.correct ? "#f0faf0" : "#fff5f0") : "#fff",
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
                {result && (
                  <span style={{
                    marginLeft: "6px",
                    color: ft?.color || "#888",
                    fontWeight: 600,
                  }}>
                    {ft?.icon} {ft?.label}
                  </span>
                )}
              </div>
            </div>
            {result ? (
              <span style={{
                fontSize: "13px",
                color: result.correct ? "#2E9E5A" : "#D97A4A",
                fontWeight: 600,
              }}>
                {result.correct ? "✓" : "✗"}
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showCorrectiemodel, setShowCorrectiemodel] = useState(false);

  const correctIdx = useMemo(
    () => item.opties.findIndex(o => o.correct),
    [item]
  );

  const handleCheck = () => {
    if (selectedOption === null) return;
    setChecked(true);
    const isCorrect = selectedOption === correctIdx;
    onDone({ correct: isCorrect });
  };

  const ft = FOUT_TYPES[item.foutType];

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
        marginBottom: "12px", border: "1px solid #e8e8f0",
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
          Examvraag
        </div>
        <div style={{ fontSize: "12px", color: "#1a1a2e", lineHeight: 1.6 }}>
          {item.vraag}
        </div>
      </div>

      {/* Leerlingantwoord */}
      <div style={{
        background: "#fff", borderRadius: "10px", padding: "12px 14px",
        border: "1px solid #e8e8f0", marginBottom: "16px",
      }}>
        <div style={{
          fontSize: "10px", fontWeight: 700, color: "#888", marginBottom: "8px",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <span style={{
            width: "20px", height: "20px", borderRadius: "50%",
            background: "#e8e8f0", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "10px",
          }}>
            {item.naam[0]}
          </span>
          Antwoord van {item.naam}:
        </div>
        <div style={{
          fontSize: "12px", color: "#333", lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          "{item.antwoord}"
        </div>
      </div>

      {/* MC vraag */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{
          fontSize: "12px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px",
        }}>
          Wat gaat er mis in dit antwoord?
        </div>
        {item.opties.map((optie, i) => {
          const isSelected = selectedOption === i;
          const isCorrectOption = i === correctIdx;

          let bg = "#fff";
          let border = "1px solid #e8e8f0";
          let textColor = "#333";

          if (!checked && isSelected) {
            bg = "#f0f4ff";
            border = "2px solid #4A90D9";
          }
          if (checked) {
            if (isCorrectOption) {
              bg = "#e8f5e9";
              border = "2px solid #4caf50";
              textColor = "#1b5e20";
            } else if (isSelected && !isCorrectOption) {
              bg = "#ffebee";
              border = "2px solid #ef5350";
              textColor = "#b71c1c";
            }
          }

          return (
            <button
              key={i}
              onClick={() => !checked && setSelectedOption(i)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                width: "100%", background: bg, border, borderRadius: "10px",
                padding: "10px 14px", marginBottom: "8px",
                cursor: checked ? "default" : "pointer", textAlign: "left",
                transition: "all 0.12s",
              }}
            >
              <span style={{
                width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                border: isSelected || (checked && isCorrectOption)
                  ? "none"
                  : "2px solid #ccc",
                background: checked
                  ? (isCorrectOption ? "#4caf50" : (isSelected ? "#ef5350" : "transparent"))
                  : (isSelected ? "#4A90D9" : "transparent"),
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "12px", fontWeight: 700,
                marginTop: "1px",
              }}>
                {checked && isCorrectOption && "✓"}
                {checked && isSelected && !isCorrectOption && "✗"}
                {!checked && isSelected && "●"}
              </span>
              <span style={{
                fontSize: "12px", color: textColor, lineHeight: 1.5,
                fontWeight: (checked && isCorrectOption) ? 600 : 400,
              }}>
                {optie.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Check button of feedback */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selectedOption === null}
          style={{
            width: "100%", padding: "12px",
            background: selectedOption !== null ? "#1a1a2e" : "#ddd",
            color: selectedOption !== null ? "#fff" : "#999",
            border: "none", borderRadius: "10px",
            fontSize: "13px", fontWeight: 700,
            cursor: selectedOption !== null ? "pointer" : "default",
            transition: "all 0.15s",
          }}
        >
          Controleer
        </button>
      ) : (
        <div>
          {/* Resultaat */}
          <div style={{
            background: selectedOption === correctIdx ? "#e8f5e9" : "#fff3e0",
            borderRadius: "10px", padding: "12px 14px",
            marginBottom: "12px", textAlign: "center",
          }}>
            <div style={{
              fontSize: "16px", fontWeight: 700,
              color: selectedOption === correctIdx ? "#2E7D32" : "#E65100",
              marginBottom: "4px",
            }}>
              {selectedOption === correctIdx ? "Goed gezien!" : "Niet helemaal..."}
            </div>
            {ft && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: ft.color + "15", color: ft.color,
                borderRadius: "6px", padding: "4px 10px",
                fontSize: "11px", fontWeight: 600,
              }}>
                {ft.icon} {ft.label}
              </div>
            )}
          </div>

          {/* Uitleg */}
          <div style={{
            background: "#f8f8fc", borderRadius: "10px", padding: "12px 14px",
            marginBottom: "10px", border: "1px solid #e8e8f0",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              Uitleg
            </div>
            <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.7 }}>
              {item.uitleg}
            </div>
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
            <span style={{ flex: 1 }}>Hoe had het wél gemoeten?</span>
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

  const doneCount = Object.keys(progress).length;
  const correctCount = Object.values(progress).filter(p => p.correct).length;

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
      {doneCount > 0 && (
        <div style={{
          background: "#f0faf0", borderRadius: "8px", padding: "8px 14px",
          marginBottom: "14px", fontSize: "11px", color: "#2E9E5A", fontWeight: 600,
          display: "flex", justifyContent: "space-between",
        }}>
          <span>{doneCount}/{FOUTENJACHT_ITEMS.length} gedaan</span>
          <span>{correctCount}/{doneCount} goed</span>
        </div>
      )}

      <ItemList
        items={filtered}
        onSelect={setActiveItem}
        progress={progress}
      />

      {/* Fouttypes legenda */}
      <details style={{
        marginTop: "16px", background: "#f8f8fc", borderRadius: "10px",
        border: "1px solid #e8e8f0", overflow: "hidden",
      }}>
        <summary style={{
          padding: "10px 14px", fontSize: "11px", fontWeight: 600,
          color: "#888", cursor: "pointer", listStyle: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>Welke fouttypes zijn er?</span>
          <span style={{ fontSize: "10px" }}>▼</span>
        </summary>
        <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {Object.entries(FOUT_TYPES).map(([key, ft]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                background: ft.color + "15", color: ft.color,
                borderRadius: "4px", padding: "2px 8px",
                fontSize: "10px", fontWeight: 600, flexShrink: 0,
              }}>
                {ft.icon} {ft.label}
              </span>
              <span style={{ fontSize: "10px", color: "#666" }}>
                {key === "vraag_niet_gelezen" && "Het antwoord gaat langs de vraag heen"}
                {key === "tekstverwijzing_mist" && "De gevraagde tekstverwijzing ontbreekt"}
                {key === "voorbeeld_ipv_uitleg" && "Er wordt een voorbeeld gegeven ipv een algemene uitleg"}
                {key === "onvolledig" && "Er missen scoringselementen of onderdelen"}
                {key === "te_vaag" && "Geen filosofische taal, te oppervlakkig of circulair"}
                {key === "begripsverwarring" && "Verwante begrippen worden door elkaar gehaald"}
              </span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
