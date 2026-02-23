import { useState, useEffect } from "react";
import { STUDIEPAD_PRESETS, ALL_FOCUS_IDS, START_DATE } from "../data/config.js";
import { getCurrentWeek } from "../utils/dateUtils.js";
import { computeKwestieProgress } from "../utils/progressUtils.js";
import { LIA_CHAPTERS } from "../data/liaChapters.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { BEGRIPSANALYSE } from "../data/begripsanalyse.js";
import { CONFLICT_MAPS } from "../data/conflictMaps.js";
import { RODE_DRAAD } from "../data/rodeDraad.js";

export function StudiepadView({ progress, setProgress, setView }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [customWeken, setCustomWeken] = useState(
    Array.from({ length: 10 }, (_, i) => ({ week: i + 1, label: `Week ${i + 1}`, focus: [] }))
  );
  const [showCustom, setShowCustom] = useState(false);

  const studiepad = progress.studiepad || null;
  const currentWeek = getCurrentWeek(studiepad ? new Date(studiepad.startDate || START_DATE) : START_DATE);
  const [expandedWeek, setExpandedWeek] = useState(null);

  useEffect(() => {
    if (currentWeek > 0 && expandedWeek === null) setExpandedWeek(currentWeek);
  }, [currentWeek, expandedWeek]);

  const activatePreset = (presetId) => {
    setProgress(prev => ({
      ...prev,
      studiepad: {
        type: "preset",
        presetId,
        startDate: START_DATE.toISOString().split("T")[0],
        customWeken: null,
      },
    }));
  };

  const activateCustom = () => {
    setProgress(prev => ({
      ...prev,
      studiepad: {
        type: "custom",
        presetId: null,
        startDate: START_DATE.toISOString().split("T")[0],
        customWeken,
      },
    }));
    setShowCustom(false);
  };

  const resetPad = () => {
    setProgress(prev => ({ ...prev, studiepad: null }));
    setShowConfirm(false);
    setExpandedWeek(null);
  };

  const toggleCustomFocus = (weekIdx, focusId) => {
    setCustomWeken(prev => {
      const copy = prev.map(w => ({ ...w, focus: [...w.focus] }));
      const f = copy[weekIdx].focus;
      if (f.includes(focusId)) {
        copy[weekIdx].focus = f.filter(x => x !== focusId);
      } else {
        copy[weekIdx].focus = [...f, focusId];
      }
      return copy;
    });
  };

  const getWeken = () => {
    if (!studiepad) return [];
    if (studiepad.type === "preset") {
      const preset = STUDIEPAD_PRESETS.find(p => p.id === studiepad.presetId);
      return preset ? preset.weken : [];
    }
    return studiepad.customWeken || [];
  };

  // --- Pad kiezer ---
  if (!studiepad) {
    if (showCustom) {
      return (
        <div style={{ padding: "0 20px 40px" }}>
          <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>Eigen pad samenstellen</h2>
            <p style={{ color: "#666", fontSize: "13px", margin: "8px 0 0" }}>Kies per week welke kwesties en domeinen je wilt behandelen</p>
          </div>
          {customWeken.map((w, wi) => (
            <div key={wi} style={{ background: "#f8f8fc", borderRadius: "12px", padding: "12px 16px", marginBottom: "8px", border: "1px solid #e8e8f0" }}>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e", marginBottom: "8px" }}>Week {w.week}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {ALL_FOCUS_IDS.map(fid => (
                  <button key={fid} onClick={() => toggleCustomFocus(wi, fid)}
                    style={{
                      padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                      border: w.focus.includes(fid) ? "2px solid #4A90D9" : "1px solid #ddd",
                      background: w.focus.includes(fid) ? "#4A90D930" : "#fff",
                      color: w.focus.includes(fid) ? "#4A90D9" : "#777",
                    }}>
                    {fid}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <button onClick={() => setShowCustom(false)}
              style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #ddd", background: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", color: "#666" }}>
              Terug
            </button>
            <button onClick={activateCustom}
              style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "#4A90D9", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Activeer pad
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "0 20px 40px" }}>
        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>Kies je studiepad</h2>
          <p style={{ color: "#666", fontSize: "13px", margin: "8px 0 0" }}>10 weken tot het examen — hoe wil je studeren?</p>
        </div>
        {STUDIEPAD_PRESETS.map((preset, i) => (
          <button key={preset.id} onClick={() => activatePreset(preset.id)}
            style={{
              display: "block", width: "100%", background: "#f8f8fc",
              border: i === 0 ? "2px solid #4A90D9" : "2px solid #e8e8f0",
              borderRadius: "12px", padding: "20px", marginBottom: "12px", cursor: "pointer", textAlign: "left",
              transition: "border-color 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = "#4A90D9"}
            onMouseOut={e => { e.currentTarget.style.borderColor = i === 0 ? "#4A90D9" : "#e8e8f0"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px" }}>{preset.icoon}</span>
              {i === 0 && <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A90D9", background: "#4A90D920", padding: "2px 8px", borderRadius: "4px" }}>Aanbevolen</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "#1a1a2e", marginBottom: "4px" }}>{preset.naam}</div>
            <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.4 }}>{preset.beschrijving}</div>
          </button>
        ))}
        <p style={{ fontSize: "12px", color: "#999", textAlign: "center", margin: "0 0 12px", lineHeight: 1.4 }}>
          Twijfel je? Kies "gespreid" — die werkt voor de meeste leerlingen.
        </p>
        <button onClick={() => setShowCustom(true)}
          style={{
            display: "block", width: "100%", background: "#fff", border: "2px dashed #ddd",
            borderRadius: "12px", padding: "20px", cursor: "pointer", textAlign: "center",
            transition: "border-color 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = "#4A90D9"}
          onMouseOut={e => e.currentTarget.style.borderColor = "#ddd"}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>{"✏️"}</div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: "#1a1a2e" }}>Eigen pad samenstellen</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Kies zelf per week wat je wilt behandelen</div>
        </button>
      </div>
    );
  }

  const dismissIntro = () => {
    setProgress(prev => ({ ...prev, studiepadIntroSeen: true }));
  };

  // --- Pad actief: weekoverzicht ---
  const weken = getWeken();

  return (
    <div style={{ padding: "0 20px 40px" }}>
      {/* Eenmalige intro */}
      {!progress.studiepadIntroSeen && (
        <div style={{ background: "#f0f4ff", border: "1px solid #d0d8f0", borderRadius: "12px", padding: "16px", margin: "16px 0 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "6px" }}>Zo werkt je studiepad</div>
            <button onClick={dismissIntro} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#999", padding: "0", lineHeight: 1 }}>{"×"}</button>
          </div>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: "0 0 6px" }}>
            Elke week zie je activiteiten in oplopende moeilijkheid. Werk van boven naar beneden: begin met kennismaken, eindig met examenvragen.
          </p>
          <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>
            Je hoeft niet alles in één keer te doen — de app onthoudt je voortgang. Het groene vinkje verschijnt als je een onderdeel hebt afgerond.
          </p>
        </div>
      )}

      {/* Tijdlijn */}
      <div style={{ padding: "20px 0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "8px" }}>
          {weken.map((w) => {
            const isCurrent = w.week === currentWeek;
            const isPast = w.week < currentWeek;
            return (
              <button key={w.week} onClick={() => setExpandedWeek(expandedWeek === w.week ? null : w.week)}
                style={{
                  flex: 1, height: "8px", borderRadius: "4px", border: "none", cursor: "pointer", padding: 0,
                  background: isCurrent ? "#4A90D9" : isPast ? "#4AD97A" : "#e8e8f0",
                  opacity: expandedWeek === w.week ? 1 : 0.6,
                  transition: "opacity 0.2s",
                }}
                title={`Week ${w.week}: ${w.label}`}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666" }}>
          <span>Week 1</span><span>Week 10</span>
        </div>
      </div>

      {/* Weekkaarten */}
      {weken.map((w) => {
        const isExpanded = expandedWeek === w.week;
        const isCurrent = w.week === currentWeek;
        const kp = w.focus.length > 0
          ? w.focus.reduce((acc, fid) => {
              const p = computeKwestieProgress(progress, fid);
              return {
                flash: { done: acc.flash.done + p.flash.done, total: acc.flash.total + p.flash.total },
                quiz: { total: acc.quiz.total + p.quiz.total },
                exam: { done: acc.exam.done + p.exam.done, total: acc.exam.total + p.exam.total },
                tekst: { done: acc.tekst.done + p.tekst.done, total: acc.tekst.total + p.tekst.total },
              };
            }, { flash: { done: 0, total: 0 }, quiz: { total: 0 }, exam: { done: 0, total: 0 }, tekst: { done: 0, total: 0 } })
          : { flash: { done: 0, total: 0 }, quiz: { total: 0 }, exam: { done: 0, total: 0 }, tekst: { done: 0, total: 0 } };

        const liaForWeek = w.focus.length > 0
          ? w.focus.reduce((acc, fid) => {
              const p = computeKwestieProgress(progress, fid);
              return { done: acc.done + (p.lia?.done || 0), total: acc.total + (p.lia?.total || 0) };
            }, { done: 0, total: 0 })
          : { done: 0, total: 0 };

        const weekTotal = kp.flash.total + kp.exam.total + kp.tekst.total + liaForWeek.total;
        const weekDone = kp.flash.done + kp.exam.done + kp.tekst.done + liaForWeek.done;
        const weekPct = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;

        return (
          <div key={w.week} style={{
            background: isCurrent ? "#f0f4ff" : "#f8f8fc",
            border: isCurrent ? "2px solid #4A90D9" : "1px solid #e8e8f0",
            borderRadius: "12px", marginBottom: "8px", overflow: "hidden",
          }}>
            <button onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left",
              }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    background: isCurrent ? "#4A90D9" : "#ddd", color: isCurrent ? "#fff" : "#777",
                    width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 700, fontSize: "12px", flexShrink: 0,
                  }}>{w.week}</span>
                  <span style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e" }}>{w.label}</span>
                  {isCurrent && <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A90D9", background: "#4A90D930", padding: "2px 6px", borderRadius: "4px" }}>NU</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: weekPct >= 100 ? "#4AD97A" : "#777" }}>{weekPct}%</span>
                <span style={{ fontSize: "14px", color: "#666", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{"▼"}</span>
              </div>
            </button>

            {isExpanded && (
              <div style={{ padding: "0 16px 16px", borderTop: "1px solid #e8e8f020" }}>
                <p style={{ fontSize: "13px", color: "#666", margin: "0 0 12px", lineHeight: 1.4 }}>{w.beschrijving}</p>

                {/* Week progress bar */}
                <div style={{ height: "6px", background: "#e8e8f0", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                  <div style={{ height: "100%", width: `${weekPct}%`, background: "#4A90D9", borderRadius: "3px", transition: "width 0.3s" }} />
                </div>

                {(() => {
                  const focusNums = w.focus.filter(f => f.startsWith("K")).map(f => parseInt(f[1]));

                  // Filosofen for this week's kwesties
                  const filosofenForWeek = FILOSOFEN.filter(f => focusNums.includes(f.kwestie));

                  // Begripsanalyse — cross-cutting, show overall
                  const begripTracker = progress.begripsanalyseTracker || {};
                  const totalBegrip = BEGRIPSANALYSE.reduce((sum, b) => sum + b.definities.length, 0);
                  const begripDone = Object.values(begripTracker).filter(v => v === "begrepen" || v === "lastig").length;

                  // Conflictkaarten for this week's kwesties
                  const conflictForWeek = CONFLICT_MAPS.filter(c => {
                    if (typeof c.kwestie === "string") return c.kwestie.split("+").map(Number).some(n => focusNums.includes(n));
                    return focusNums.includes(c.kwestie);
                  });
                  const conflictTracker = progress.conflictTracker || {};
                  const conflictDone = conflictForWeek.filter(c => conflictTracker[c.id] === "begrepen" || conflictTracker[c.id] === "lastig").length;

                  // Rode draad for this week's kwesties
                  const rodeDraadForWeek = RODE_DRAAD.filter(r => {
                    if (typeof r.van === "number") return focusNums.includes(r.van);
                    return focusNums.length >= 4;
                  });
                  const rdTracker = progress.rodeDraadTracker || {};
                  const rdDone = rodeDraadForWeek.filter(r => rdTracker[r.id] === "begrepen" || rdTracker[r.id] === "lastig").length;

                  // Track whether we've found the first incomplete item (for "Begin hier")
                  let firstIncompleteFound = false;

                  const badge = (done, total) => {
                    if (total === 0) return null;
                    const complete = done >= total;
                    return (
                      <span style={{
                        marginLeft: "auto", fontSize: complete ? "13px" : "12px", fontWeight: 700, flexShrink: 0,
                        color: complete ? "#2e7d32" : "#888",
                        background: complete ? "#e8f5e9" : "transparent",
                        padding: complete ? "2px 8px" : "0", borderRadius: "6px",
                      }}>{complete ? "✓" : `${done}/${total}`}</span>
                    );
                  };

                  const row = (icon, label, done, total, view) => {
                    if (total === 0) return null;
                    const complete = done >= total;
                    const isNext = !complete && !firstIncompleteFound;
                    if (isNext) firstIncompleteFound = true;
                    return (
                      <button key={label} onClick={() => setView(view)}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px", width: "100%",
                          background: complete ? "#f6fef6" : isNext ? "#f0f4ff" : "#fff",
                          border: complete ? "1px solid #c8e6c9" : isNext ? "2px solid #4A90D9" : "1px solid #e8e8f0",
                          borderRadius: "8px", padding: "10px 12px", marginBottom: "6px", cursor: "pointer", textAlign: "left",
                        }}>
                        <span style={{ fontSize: "14px", flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontSize: "13px", color: "#1a1a2e", fontWeight: isNext ? 700 : 400 }}>{label}</span>
                        {isNext && <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A90D9", flexShrink: 0 }}>Begin hier</span>}
                        {badge(done, total)}
                      </button>
                    );
                  };

                  const linkRow = (icon, label, detail, view) => {
                    // linkRows don't have done/total, treat as never "complete" for begin-hier logic
                    const isNext = !firstIncompleteFound;
                    if (isNext) firstIncompleteFound = true;
                    return (
                      <button key={label} onClick={() => setView(view)}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px", width: "100%",
                          background: isNext ? "#f0f4ff" : "#fff",
                          border: isNext ? "2px solid #4A90D9" : "1px solid #e8e8f0",
                          borderRadius: "8px", padding: "10px 12px", marginBottom: "6px", cursor: "pointer", textAlign: "left",
                        }}>
                        <span style={{ fontSize: "14px", flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontSize: "13px", color: "#1a1a2e", fontWeight: isNext ? 700 : 400 }}>{label}</span>
                        {isNext && <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A90D9", flexShrink: 0 }}>Begin hier</span>}
                        <span style={{ marginLeft: "auto", fontSize: "11px", color: "#999", flexShrink: 0 }}>{detail}</span>
                      </button>
                    );
                  };

                  const sectionLabel = (num, title, hint) => (
                    <div style={{ margin: "10px 0 4px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a2e" }}>
                        <span style={{ color: "#4A90D9", marginRight: "4px" }}>{num}.</span>{title}
                      </div>
                      <div style={{ fontSize: "11px", color: "#aaa", marginTop: "1px" }}>{hint}</div>
                    </div>
                  );

                  return (
                    <>
                      {(liaForWeek.total > 0 || filosofenForWeek.length > 0) &&
                        sectionLabel(1, "Kennismaken", "Lees het verhaal en bekijk de filosofen")}
                      {row("🎭", "Lia's verhaal", liaForWeek.done, liaForWeek.total, "lia")}
                      {filosofenForWeek.length > 0 && linkRow("👤", "Filosofen", `${filosofenForWeek.length} denkers`, "filosofen")}

                      {(kp.flash.total > 0 || totalBegrip > 0) &&
                        sectionLabel(2, "Begrippen leren", "Oefen met flashcards en begripsanalyse")}
                      {row("🎴", "Flashcards", kp.flash.done, kp.flash.total, "flashcards")}
                      {totalBegrip > 0 && row("🔬", "Begripsanalyse", begripDone, totalBegrip, "begripsanalyse")}

                      {(kp.tekst.total > 0 || conflictForWeek.length > 0) &&
                        sectionLabel(3, "Verdiepen", "Lees originele teksten en ontdek spanningen")}
                      {row("📖", "Primaire teksten", kp.tekst.done, kp.tekst.total, "teksten")}
                      {row("⚡", "Conflictkaarten", conflictDone, conflictForWeek.length, "conceptmaps")}

                      {rodeDraadForWeek.length > 0 &&
                        sectionLabel(4, "Verbanden zien", "Zie de rode draad tussen kwesties")}
                      {row("🧵", "Rode draad", rdDone, rodeDraadForWeek.length, "rodedraad")}

                      {(kp.quiz.total > 0 || kp.exam.total > 0) &&
                        sectionLabel(5, "Toetsen", "Test jezelf met quiz en examenvragen")}
                      {kp.quiz.total > 0 && linkRow("❓", "Quiz", "Doe een quiz", "quiz")}
                      {row("🔍", "Examenvragen", kp.exam.done, kp.exam.total, "exam")}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        );
      })}

      {/* Ander pad kiezen */}
      {showConfirm ? (
        <div style={{ background: "#fff5f0", borderRadius: "12px", padding: "16px", border: "1px solid #D97A4A40", marginTop: "16px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#1a1a2e", margin: "0 0 12px" }}>Weet je zeker dat je een ander pad wilt kiezen?</p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <button onClick={() => setShowConfirm(false)}
              style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff", fontSize: "13px", cursor: "pointer" }}>
              Annuleren
            </button>
            <button onClick={resetPad}
              style={{ padding: "8px 20px", borderRadius: "8px", border: "none", background: "#D97A4A", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Ander pad kiezen
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowConfirm(true)}
          style={{ display: "block", width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #ddd", background: "#fff", fontSize: "13px", color: "#666", cursor: "pointer", marginTop: "16px", textAlign: "center" }}>
          Ander pad kiezen
        </button>
      )}
    </div>
  );
}
