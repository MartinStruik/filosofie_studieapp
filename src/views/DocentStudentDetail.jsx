import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";
import { computeOverallProgress, computeKwestieProgress } from "../utils/progressUtils.js";
import { ALL_FOCUS_IDS } from "../data/config.js";
import { PRIMAIRE_TEKSTEN } from "../data/primaireTeksten.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";

function TekstAntwoordenSection({ antwoorden }) {
  const [expandedTekst, setExpandedTekst] = useState(null);
  if (!antwoorden || Object.keys(antwoorden).length === 0) return null;

  // Group answers by tekst id
  const grouped = {};
  for (const [key, val] of Object.entries(antwoorden)) {
    if (!val || val.trim() === "") continue;
    const [tekstId, qPart] = key.split("-q");
    const qIdx = parseInt(qPart);
    if (!grouped[tekstId]) grouped[tekstId] = [];
    grouped[tekstId].push({ qIdx, answer: val });
  }

  const tekstIds = Object.keys(grouped);
  if (tekstIds.length === 0) return null;

  return (
    <div style={{ background: "#f0f5ff", border: "1px solid #d0dfff", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>
        Geschreven antwoorden ({Object.values(antwoorden).filter(v => v && v.trim()).length})
      </div>
      {tekstIds.map(tekstId => {
        const pt = PRIMAIRE_TEKSTEN.find(t => String(t.id) === tekstId);
        if (!pt) return null;
        const isOpen = expandedTekst === tekstId;
        return (
          <div key={tekstId} style={{ marginBottom: "8px" }}>
            <button
              onClick={() => setExpandedTekst(isOpen ? null : tekstId)}
              style={{
                width: "100%", textAlign: "left", background: "#fff", border: "1px solid #e0e8f5",
                borderRadius: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <span>
                <strong>{pt.filosoof}</strong>
                <span style={{ color: "#666", marginLeft: "8px" }}>{pt.titel}</span>
              </span>
              <span style={{ color: "#999", fontSize: "12px" }}>
                {grouped[tekstId].length} antw. {isOpen ? "▲" : "▼"}
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "8px 0 0" }}>
                {grouped[tekstId].sort((a, b) => a.qIdx - b.qIdx).map(({ qIdx, answer }) => {
                  const vraag = pt.vragen?.[qIdx]?.vraag || `Vraag ${qIdx + 1}`;
                  return (
                    <div key={qIdx} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "8px", padding: "12px", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "6px", fontStyle: "italic" }}>
                        {vraag}
                      </div>
                      <div style={{ fontSize: "13px", color: "#1a1a2e", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                        {answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FilosofenSection({ tracker }) {
  if (!tracker || Object.keys(tracker).length === 0) return null;
  const begrepen = Object.entries(tracker).filter(([, v]) => v === "begrepen");
  const lastig = Object.entries(tracker).filter(([, v]) => v === "lastig");
  if (begrepen.length === 0 && lastig.length === 0) return null;

  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>
        Filosofen ({begrepen.length + lastig.length} beoordeeld)
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {begrepen.map(([name]) => (
          <span key={name} style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: "12px", padding: "4px 10px", borderRadius: "12px" }}>
            ✓ {name}
          </span>
        ))}
        {lastig.map(([name]) => (
          <span key={name} style={{ background: "#fff3e0", color: "#e65100", fontSize: "12px", padding: "4px 10px", borderRadius: "12px" }}>
            ⚠ {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DocentStudentDetail({ studentId }) {
  const [student, setStudent] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ data: profile }, { data: progress }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", studentId).single(),
        supabase.from("progress").select("data").eq("user_id", studentId).single(),
      ]);

      if (cancelled) return;
      setStudent(profile);
      setProgressData(progress?.data || {});
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [studentId]);

  if (loading) {
    return <div style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}>Laden...</div>;
  }

  if (!student) {
    return <div style={{ padding: "20px", color: "#c62828" }}>Leerling niet gevonden.</div>;
  }

  const overall = computeOverallProgress(progressData);
  const tijdLog = progressData.tijdLog || [];
  const totalMinutes = tijdLog.reduce((sum, e) => sum + (e.appMinutes || 0), 0);

  // Collect all "lastig" items
  const lastigItems = [];
  for (const [key, val] of Object.entries(progressData.examTracker || {})) {
    if (val === "lastig") lastigItems.push({ type: "Examenvraag", label: key });
  }
  for (const [key, val] of Object.entries(progressData.tekstTracker || {})) {
    if (val === "lastig") lastigItems.push({ type: "Tekst", label: key });
  }
  for (const [key, val] of Object.entries(progressData.begripsanalyseTracker || {})) {
    if (val === "lastig") lastigItems.push({ type: "Begrip", label: key });
  }
  for (const [key, val] of Object.entries(progressData.conflictTracker || {})) {
    if (val === "lastig") lastigItems.push({ type: "Conflict", label: key });
  }
  for (const [key, val] of Object.entries(progressData.rodeDraadTracker || {})) {
    if (val === "lastig") lastigItems.push({ type: "Rode draad", label: key });
  }

  // Study time per day (last 14 days for heatmap)
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const entry = tijdLog.find(e => e.date === dateStr);
    last14.push({ date: dateStr, minutes: entry?.appMinutes || 0, day: d.toLocaleDateString("nl-NL", { weekday: "short" }) });
  }

  const kwestieColors = { K1: "#4A90D9", K2: "#E87C3E", K3: "#7B61C4", K4: "#2E9E5A", B1: "#999", C1: "#999", D1: "#999", E1: "#999" };

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>
          {student.display_name}
        </h1>
        <p style={{ color: "#666", fontSize: "13px", margin: "4px 0 0" }}>
          Overall: {Math.round(overall.overall * 100)}% · Studietijd: {totalMinutes > 0 ? `${Math.round(totalMinutes / 60)}u ${totalMinutes % 60}m` : "geen"}
        </p>
      </div>

      {/* Overall progress bars */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>Voortgang per onderdeel</div>
        {[
          { label: "Flashcards", pct: overall.flash.pct, detail: `${overall.flash.done}/${overall.flash.total}` },
          { label: "Examenvragen", pct: overall.exam.pct, detail: `${overall.exam.done}/${overall.exam.total}` },
          { label: "Teksten", pct: overall.tekst.pct, detail: `${overall.tekst.done}/${overall.tekst.total}` },
          { label: "Begripsanalyse", pct: overall.begripsanalyse.pct, detail: `${overall.begripsanalyse.done}/${overall.begripsanalyse.total}` },
          { label: "Conflictkaarten", pct: overall.conflict.pct, detail: `${overall.conflict.done}/${overall.conflict.total}` },
          { label: "Rode draad", pct: overall.rodeDraad.pct, detail: `${overall.rodeDraad.done}/${overall.rodeDraad.total}` },
          { label: "Lia's verhaal", pct: overall.lia.pct, detail: `${overall.lia.done}/${overall.lia.total}` },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "3px" }}>
              <span style={{ color: "#444" }}>{item.label}</span>
              <span style={{ color: "#999" }}>{item.detail} · {Math.round(item.pct * 100)}%</span>
            </div>
            <div style={{ height: "6px", background: "#f0f0f5", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round(item.pct * 100)}%`, background: "#4A90D9", borderRadius: "3px", transition: "width 0.3s" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Voortgang per kwestie */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>Per kwestie / domein</div>
        {ALL_FOCUS_IDS.map(id => {
          const kp = computeKwestieProgress(progressData, id);
          return (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ background: kwestieColors[id] || "#999", color: "#fff", width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                {id}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ height: "6px", background: "#f0f0f5", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round(kp.pct * 100)}%`, background: kwestieColors[id] || "#999", borderRadius: "3px" }} />
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontWeight: 600, minWidth: "32px", textAlign: "right" }}>
                {Math.round(kp.pct * 100)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Studietijd heatmap */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>Studietijd (14 dagen)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: "4px" }}>
          {last14.map((d, i) => {
            const intensity = d.minutes === 0 ? 0 : Math.min(1, d.minutes / 60);
            const bg = d.minutes === 0 ? "#f0f0f5" : `rgba(74, 144, 217, ${0.2 + intensity * 0.8})`;
            return (
              <div key={i} title={`${d.date}: ${d.minutes} min`} style={{
                aspectRatio: "1", borderRadius: "4px", background: bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "9px", color: intensity > 0.5 ? "#fff" : "#999",
              }}>
                {d.day.charAt(0)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lastige items */}
      {lastigItems.length > 0 && (
        <div style={{ background: "#fff5f0", border: "1px solid #ffe0d0", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#c62828", marginBottom: "8px" }}>
            Lastige items ({lastigItems.length})
          </div>
          {lastigItems.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", padding: "6px 0", borderTop: i > 0 ? "1px solid #ffe0d0" : "none", fontSize: "13px" }}>
              <span style={{ color: "#999", fontSize: "11px", minWidth: "80px" }}>{item.type}</span>
              <span style={{ color: "#444" }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Geschreven antwoorden bij primaire teksten */}
      <TekstAntwoordenSection antwoorden={progressData.tekstAntwoorden} />

      {/* Filosofen tracker */}
      <FilosofenSection tracker={progressData.filosofenTracker} />
    </div>
  );
}
