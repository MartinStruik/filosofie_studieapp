import { useState, useEffect } from "react";
import { KWESTIES, DOMEINEN } from "../data/kwesties.js";
import { QUIZ_QUESTIONS } from "../data/quizQuestions.js";
import { SESSION_SIZE } from "../data/config.js";
import { shuffleArray } from "../utils/arrayUtils.js";
import { LiaBadge } from "../components/LiaBadge.jsx";
import { KwestieTag } from "../components/KwestieTag.jsx";

export function Quiz({ progress, setProgress, setView }) {
  const [filter, setFilter] = useState(0);
  const [mixMode, setMixMode] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState(null);

  const baseQuestions = filter === 0 ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.kwestie === filter);

  useEffect(() => {
    let pool = mixMode ? shuffleArray(QUIZ_QUESTIONS) : baseQuestions;
    setSessionQuestions(pool.slice(0, SESSION_SIZE));
    setCurrent(0); setAnswers([]); setFinished(false);
  }, [filter, mixMode]);

  const questions = sessionQuestions || baseQuestions.slice(0, SESSION_SIZE);
  const totalPool = mixMode ? QUIZ_QUESTIONS.length : baseQuestions.length;

  const selected = answers[current] ?? null;
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  const restart = () => {
    let pool = mixMode ? shuffleArray(QUIZ_QUESTIONS) : baseQuestions;
    setSessionQuestions(pool.slice(0, SESSION_SIZE));
    setCurrent(0); setAnswers([]); setFinished(false);
  };

  const handleAnswer = (optIdx) => {
    if (selected !== null) return;
    setAnswers(prev => { const next = [...prev]; next[current] = optIdx; return next; });
  };

  const prevQ = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const nextQ = () => {
    if (current + 1 >= questions.length) {
      const finalPct = Math.round(score / questions.length * 100);
      setProgress(prev => ({
        ...prev,
        quizScores: [...(prev.quizScores || []), { pct: finalPct, date: new Date().toISOString(), kwestie: filter }]
      }));
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  if (questions.length === 0) return <p style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}>Geen vragen voor deze selectie.</p>;

  if (finished) {
    const pct = Math.round(score / questions.length * 100);
    const wrongQuestions = questions.filter((q, i) => answers[i] !== q.correct);
    const prevScores = (progress.quizScores || []).filter(s => s.kwestie === filter).slice(-5);
    const prevBest = prevScores.length > 1 ? Math.max(...prevScores.slice(0, -1).map(s => s.pct)) : null;

    // Group wrong answers by kwestie
    const wrongByKwestie = {};
    wrongQuestions.forEach(q => {
      const k = typeof q.kwestie === "number" ? `K${q.kwestie}` : q.kwestie;
      if (!wrongByKwestie[k]) wrongByKwestie[k] = [];
      wrongByKwestie[k].push(q);
    });

    return (
      <div style={{ padding: "20px 20px 40px" }}>
        {/* Score header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div aria-hidden="true" style={{ fontSize: "48px", marginBottom: "12px" }}>{pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#1a1a2e", margin: "0 0 4px" }}>
            {score} / {questions.length} correct ({pct}%)
          </h2>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
            {pct >= 70 ? "Uitstekend! Je beheerst de stof goed." : pct >= 50 ? "Goed op weg! Bestudeer de begrippen die je miste." : "Blijf oefenen — herhaal de flashcards per kwestie."}
          </p>
          {prevBest !== null && (
            <p style={{ fontSize: "13px", color: pct > prevBest ? "#2e7d32" : "#666", marginTop: "8px", fontWeight: 600 }}>
              {pct > prevBest ? `▲ Verbetering! Vorige beste: ${prevBest}%` : pct === prevBest ? `Gelijk aan je beste: ${prevBest}%` : `Vorige beste: ${prevBest}%`}
            </p>
          )}
        </div>

        {/* Score history mini chart */}
        {prevScores.length > 1 && (
          <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>Laatste pogingen</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
              {prevScores.map((s, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: i === prevScores.length - 1 ? "#4A90D9" : "#666" }}>{s.pct}%</span>
                  <div style={{
                    width: "100%", borderRadius: "4px 4px 0 0",
                    height: `${Math.max(8, s.pct * 0.5)}px`,
                    background: i === prevScores.length - 1 ? "#4A90D9" : "#e0e0e8",
                    transition: "height 0.3s",
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wrong answers breakdown */}
        {wrongQuestions.length > 0 && (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>Fout beantwoord ({wrongQuestions.length})</div>
            {Object.entries(wrongByKwestie).map(([k, qs]) => (
              <div key={k} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <KwestieTag kwestie={k.startsWith("K") ? parseInt(k[1]) : k} small />
                  <span style={{ fontSize: "12px", color: "#666" }}>{qs.length} fout</span>
                </div>
                {qs.map((q, i) => (
                  <div key={i} style={{ fontSize: "13px", color: "#666", padding: "4px 0 4px 20px", borderLeft: "2px solid #ef535040", marginBottom: "4px", lineHeight: 1.4 }}>
                    {q.q.length > 80 ? q.q.substring(0, 80) + "..." : q.q}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <button onClick={restart} style={{ flex: 1, padding: "12px 16px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
            Opnieuw ({SESSION_SIZE} vragen)
          </button>
        </div>

        {/* Follow-up actions */}
        {wrongQuestions.length > 0 && setView && (
          <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "14px 16px", border: "1px solid #e8e8f0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>Vervolgstappen</div>
            {Object.keys(wrongByKwestie).map(k => (
              <button key={k} onClick={() => setView("flashcards")} style={{
                display: "block", width: "100%", padding: "10px 12px", marginBottom: "6px",
                background: "#fff", border: "1px solid #e8e8f0", borderRadius: "8px",
                cursor: "pointer", fontSize: "13px", color: "#1a1a2e", textAlign: "left",
              }}>
                <span aria-hidden="true">🎴</span> Flashcards herhalen voor <strong>{k}</strong> ({wrongByKwestie[k].length} fout)
              </button>
            ))}
            <button onClick={() => setView("exam")} style={{
              display: "block", width: "100%", padding: "10px 12px",
              background: "#fff", border: "1px solid #e8e8f0", borderRadius: "8px",
              cursor: "pointer", fontSize: "13px", color: "#1a1a2e", textAlign: "left",
            }}>
              <span aria-hidden="true">🔍</span> Oefen met examenvragen
            </button>
          </div>
        )}
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
        {[
          { id: 0, label: "Alle" },
          ...KWESTIES.map(k => ({ id: k.id, label: `K${k.id}` })),
          ...DOMEINEN.map(d => ({ id: d.id, label: d.id })),
        ].map(f => {
          const activeColor = f.id === 0 ? "#1a1a2e" : KWESTIES.find(k => k.id === f.id)?.color || DOMEINEN.find(d => d.id === f.id)?.color || "#1a1a2e";
          return (
          <button key={String(f.id)} onClick={() => { setFilter(f.id); setMixMode(false); }} style={{
            padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
            background: filter === f.id && !mixMode ? activeColor : "#f0f0f5",
            color: filter === f.id && !mixMode ? "#fff" : "#666",
          }}>{f.label}</button>
          );
        })}
      </div>

      {/* Mix mode */}
      <div style={{ marginBottom: "12px" }}>
        <button onClick={() => setMixMode(!mixMode)} style={{
          padding: "8px 14px", borderRadius: "8px", border: mixMode ? "2px solid #1a1a2e" : "1px solid #e0e0e8",
          background: mixMode ? "#1a1a2e" : "#fff", color: mixMode ? "#fff" : "#555",
          cursor: "pointer", fontSize: "12px", fontWeight: 600,
        }}>🔀 Mix (alle kwesties door elkaar)</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>Vraag {current + 1}/{questions.length}{totalPool > questions.length ? ` (van ${totalPool})` : ""}</span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <LiaBadge text={q.q} kwestie={q.kwestie} />
          <KwestieTag kwestie={q.kwestie} small />
        </div>
      </div>

      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
        <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a2e", margin: 0, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{q.q}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {q.options.map((opt, i) => {
          let bg = "#fff"; let border = "#e0e0e8"; let color = "#1a1a2e";
          if (selected !== null) {
            if (i === q.correct) { bg = "#e8f5e9"; border = "#4caf50"; color = "#2e7d32"; }
            else if (i === selected) { bg = "#fce4ec"; border = "#ef5350"; color = "#c62828"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} style={{
              padding: "14px 16px", background: bg, border: `2px solid ${border}`, borderRadius: "12px",
              cursor: selected !== null ? "default" : "pointer", textAlign: "left", fontSize: "14px", color,
              fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.2s",
              fontWeight: selected !== null && i === q.correct ? 600 : 400,
            }}>
              <span style={{ fontWeight: 700, marginRight: "8px", opacity: 0.5 }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ marginTop: "16px", borderRadius: "12px", overflow: "hidden", border: `1px solid ${selected === q.correct ? "#a5d6a7" : "#ffcc80"}` }}>
          <div style={{ padding: "12px 16px", background: selected === q.correct ? "#e8f5e9" : "#fce4ec" }}>
            <p style={{ fontSize: "14px", color: selected === q.correct ? "#2e7d32" : "#c62828", margin: 0, fontWeight: 700 }}>
              {selected === q.correct ? "✔ Correct!" : "✘ Helaas."}
            </p>
            {selected !== q.correct && (
              <p style={{ fontSize: "13px", color: "#666", margin: "6px 0 0", lineHeight: 1.5 }}>
                Het juiste antwoord is: <strong>{q.options[q.correct]}</strong>
              </p>
            )}
          </div>
          <div style={{ padding: "12px 16px", background: "#f8f8fc" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#6B5CFF", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Waarom?</div>
            <p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: 1.6 }}>{q.explanation}</p>
          </div>
          <div style={{ display: "flex", gap: "8px", padding: "12px 16px", background: "#fff" }}>
            {current > 0 && (
              <button onClick={prevQ} style={{ padding: "10px 24px", background: "#fff", color: "#1a1a2e", border: "2px solid #e0e0e8", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                ← Vorige
              </button>
            )}
            <button onClick={nextQ} style={{ padding: "10px 24px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              {current + 1 >= questions.length ? "Bekijk resultaat" : "Volgende vraag →"}
            </button>
          </div>
        </div>
      )}

      {selected === null && current > 0 && (
        <button onClick={prevQ} style={{ marginTop: "16px", padding: "10px 24px", background: "#fff", color: "#1a1a2e", border: "2px solid #e0e0e8", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
          ← Vorige
        </button>
      )}
    </div>
  );
}
