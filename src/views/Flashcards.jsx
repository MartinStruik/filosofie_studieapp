import { useState, useEffect, useCallback } from "react";
import { KWESTIES, DOMEINEN } from "../data/kwesties.js";
import { FLASHCARDS } from "../data/flashcards.js";
import { SESSION_SIZE } from "../data/config.js";
import { getLeitnerBox, getDueCards } from "../utils/leitnerUtils.js";
import { shuffleArray } from "../utils/arrayUtils.js";
import { LiaBadge } from "../components/LiaBadge.jsx";

export function Flashcards({ progress, setProgress }) {
  const [filter, setFilter] = useState(null);
  const [mode, setMode] = useState("alle"); // "alle", "mix", "herhalen"
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState(null);

  const baseCards = filter === null ? FLASHCARDS : FLASHCARDS.filter(c => c.kwestie === filter);

  const initSession = useCallback((cards, m) => {
    let pool;
    if (m === "mix") pool = shuffleArray(FLASHCARDS);
    else if (m === "herhalen") pool = getDueCards(progress, cards);
    else pool = cards;
    setSessionCards(pool.slice(0, SESSION_SIZE));
    setIdx(0);
    setFlipped(false);
  }, [progress]);

  useEffect(() => {
    initSession(baseCards, mode);
  }, [filter, mode]);

  const cards = sessionCards || baseCards.slice(0, SESSION_SIZE);
  const totalPool = mode === "mix" ? FLASHCARDS.length : mode === "herhalen" ? getDueCards(progress, baseCards).length : baseCards.length;

  const loadMore = () => {
    let pool;
    if (mode === "mix") pool = shuffleArray(FLASHCARDS);
    else if (mode === "herhalen") pool = getDueCards(progress, baseCards);
    else pool = baseCards;
    const offset = cards.length;
    const next = pool.slice(offset, offset + SESSION_SIZE);
    if (next.length > 0) {
      setSessionCards([...cards, ...next]);
    }
  };

  const markLeitner = useCallback((card, rating) => {
    if (!card) return;
    const term = card.term;
    const today = new Date().toISOString().split("T")[0];
    setProgress(prev => {
      const boxes = { ...(prev.leitnerBoxes || {}) };
      const current = boxes[term] || { box: 1, lastReviewed: null };
      if (rating === "goed") {
        boxes[term] = { box: Math.min(current.box + 1, 5), lastReviewed: today };
      } else {
        boxes[term] = { box: 1, lastReviewed: today };
      }
      const seen = prev.seenCards || [];
      const newSeen = seen.includes(term) ? seen : [...seen, term];
      return { ...prev, leitnerBoxes: boxes, seenCards: newSeen };
    });
  }, [setProgress]);

  const handleRating = (rating) => {
    markLeitner(cards[idx], rating);
    setFlipped(false);
    if (idx + 1 < cards.length) {
      setIdx(i => i + 1);
    }
  };

  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + cards.length) % cards.length); };

  if (cards.length === 0) return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <p style={{ color: "#666" }}>{mode === "herhalen" ? "Geen kaarten te herhalen! Alles is bijgewerkt." : "Geen kaarten voor deze selectie."}</p>
      {mode === "herhalen" && <button onClick={() => setMode("alle")} style={{ marginTop: "12px", padding: "10px 24px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Alle kaarten</button>}
    </div>
  );

  const card = cards[idx];
  const kwestieColor = card.kwestie === 0 ? "#666" : (KWESTIES.find(k => k.id === card.kwestie)?.color || DOMEINEN.find(d => d.id === card.kwestie)?.color || "#1a1a2e");
  const leitner = getLeitnerBox(progress, card.term);
  const boxColors = ["#ef5350", "#ff9800", "#ffc107", "#8bc34a", "#4caf50"];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      {/* Kwestie filters */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[
          { id: null, label: "Alle" },
          { id: 0, label: "Alg." },
          ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` })),
          ...DOMEINEN.map(d => ({ id: d.id, label: d.id })),
        ].map(f => {
          const activeColor = f.id === null ? "#1a1a2e" : f.id === 0 ? "#666" : KWESTIES.find(k => k.id === f.id)?.color || DOMEINEN.find(d => d.id === f.id)?.color || "#1a1a2e";
          return (
          <button key={String(f.id)} onClick={() => { setFilter(f.id); setMode("alle"); }} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id && mode === "alle" ? activeColor : "#f0f0f5",
            color: filter === f.id && mode === "alle" ? "#fff" : "#666",
          }}>{f.label}</button>
          );
        })}
      </div>

      {/* Mode buttons */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {[
          { m: "herhalen", label: "Herhalen", icon: "🔄", desc: "Alleen kaarten die je moet herhalen" },
          { m: "mix", label: "Mix", icon: "🔀", desc: "Alle kwesties door elkaar" },
        ].map(b => (
          <button key={b.m} onClick={() => setMode(mode === b.m ? "alle" : b.m)} style={{
            padding: "8px 14px", borderRadius: "8px", border: mode === b.m ? "2px solid #1a1a2e" : "1px solid #e0e0e8",
            background: mode === b.m ? "#1a1a2e" : "#fff", color: mode === b.m ? "#fff" : "#555",
            cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px",
          }}>{b.icon} {b.label}</button>
        ))}
      </div>

      {/* Progress + Leitner box */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {idx + 1} / {cards.length}{totalPool > cards.length ? ` (van ${totalPool})` : ""}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#666" }}>Box</span>
          {[1,2,3,4,5].map(b => (
            <div key={b} style={{
              width: "14px", height: "14px", borderRadius: "3px",
              background: b <= leitner.box ? boxColors[leitner.box - 1] : "#e8e8f0",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped(!flipped)}
        aria-label={flipped ? "Toon term" : "Toon definitie"}
        style={{
          background: flipped ? "#fff" : kwestieColor,
          color: flipped ? "#1a1a2e" : "#fff",
          borderRadius: "16px", padding: "32px 24px", minHeight: "200px",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          cursor: "pointer", transition: "all 0.3s ease",
          border: flipped ? `2px solid ${kwestieColor}` : "2px solid transparent",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center",
          width: "100%", fontFamily: "inherit",
        }}
      >
        {!flipped ? (
          <>
            <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>{card.term}</div>
            <div style={{ marginTop: "12px" }}><LiaBadge text={card.term} kwestie={card.kwestie} /></div>
            <div style={{ fontSize: "12px", marginTop: "8px", opacity: 0.7 }}>Tik om te draaien</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.5, marginBottom: "12px" }}>Definitie</div>
            <div style={{ fontSize: "15px", lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" }}>{card.def}</div>
            <div style={{ marginTop: "12px" }}><LiaBadge text={card.term} kwestie={card.kwestie} /></div>
          </>
        )}
      </button>

      {/* Rating buttons (shown when flipped) */}
      {flipped ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
          <button onClick={prev} aria-label="Vorige kaart" style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e0e0e8", background: "#fff", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"←"}</button>
          <button onClick={() => handleRating("lastig")} style={{
            flex: 1, maxWidth: "140px", padding: "12px 16px", borderRadius: "12px", border: "2px solid #ef5350",
            background: "#fce4ec", cursor: "pointer", fontSize: "14px", fontWeight: 700, color: "#c62828",
          }}>Lastig</button>
          <button onClick={() => handleRating("goed")} style={{
            flex: 1, maxWidth: "140px", padding: "12px 16px", borderRadius: "12px", border: "2px solid #4caf50",
            background: "#e8f5e9", cursor: "pointer", fontSize: "14px", fontWeight: 700, color: "#2e7d32",
          }}>Goed</button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
          <button onClick={prev} aria-label="Vorige kaart" style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e0e0e8", background: "#fff", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"←"}</button>
          <button onClick={() => { setFlipped(false); setIdx(i => (i + 1) % cards.length); }} aria-label="Volgende kaart" style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #e0e0e8", background: "#fff", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"→"}</button>
        </div>
      )}

      {/* Load more */}
      {idx + 1 >= cards.length && totalPool > cards.length && (
        <button onClick={loadMore} style={{
          display: "block", margin: "20px auto 0", padding: "12px 28px",
          background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "8px",
          cursor: "pointer", fontSize: "13px", fontWeight: 600,
        }}>Nog {Math.min(SESSION_SIZE, totalPool - cards.length)} kaarten laden</button>
      )}

      {/* Session complete */}
      {idx + 1 >= cards.length && totalPool <= cards.length && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "#666", marginTop: "16px" }}>
          {mode === "herhalen" ? "Alle herhalingskaarten gedaan!" : "Einde van de set."} Beoordeel met Goed/Lastig om spaced repetition te activeren.
        </p>
      )}
    </div>
  );
}
