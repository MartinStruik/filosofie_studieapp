import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase.js";
import { computeOverallProgress } from "../utils/progressUtils.js";

export function DocentView({ setView }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Fetch all student profiles + their progress
      const { data: profiles, error: profErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("display_name");

      if (profErr) { setError(profErr.message); setLoading(false); return; }
      if (cancelled) return;

      const { data: progressRows, error: progErr } = await supabase
        .from("progress")
        .select("*");

      if (progErr) { setError(progErr.message); setLoading(false); return; }
      if (cancelled) return;

      const progressMap = new Map();
      for (const row of (progressRows || [])) {
        progressMap.set(row.user_id, row);
      }

      const combined = (profiles || []).map(p => ({
        ...p,
        progressData: progressMap.get(p.id)?.data || {},
        updatedAt: progressMap.get(p.id)?.updated_at || null,
      }));

      setStudents(combined);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, []);

  const stats = useMemo(() => {
    if (students.length === 0) return null;
    const progresses = students.map(s => computeOverallProgress(s.progressData));
    const overalls = progresses.map(p => p.overall);
    const avg = overalls.reduce((a, b) => a + b, 0) / overalls.length;

    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const active = students.filter(s => s.updatedAt && new Date(s.updatedAt).getTime() > weekAgo).length;
    const attention = overalls.filter(v => v < 0.2).length;

    return { avg, active, attention, total: students.length };
  }, [students]);

  const getStudentSummary = (s) => {
    const p = computeOverallProgress(s.progressData);
    const tijdLog = s.progressData.tijdLog || [];
    const totalMinutes = tijdLog.reduce((sum, e) => sum + (e.appMinutes || 0), 0);

    const lastigCount = [
      ...Object.values(s.progressData.examTracker || {}).filter(v => v === "lastig"),
      ...Object.values(s.progressData.tekstTracker || {}).filter(v => v === "lastig"),
      ...Object.values(s.progressData.begripsanalyseTracker || {}).filter(v => v === "lastig"),
      ...Object.values(s.progressData.conflictTracker || {}).filter(v => v === "lastig"),
      ...Object.values(s.progressData.rodeDraadTracker || {}).filter(v => v === "lastig"),
    ].length;

    return { overallPct: p.overall, flashDone: p.flash.done, flashTotal: p.flash.total, quizCount: p.quiz.done, totalMinutes, lastigCount, updatedAt: s.updatedAt };
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}>
        Laden...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ background: "#fff0f0", border: "1px solid #ffcdd2", borderRadius: "8px", padding: "12px 16px", color: "#c62828", fontSize: "13px" }}>
          Fout bij laden: {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>
          Klasoverzicht
        </h1>
        <p style={{ color: "#666", fontSize: "13px", margin: "4px 0 0" }}>
          {students.length} leerlingen
        </p>
      </div>

      {/* Samenvattingskaarten */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#2D5A8E" }}>{Math.round(stats.avg * 100)}%</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>Gemiddeld</div>
          </div>
          <div style={{ background: "#f0fff0", borderRadius: "10px", padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#2e7d32" }}>{stats.active}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>Actief (7d)</div>
          </div>
          <div style={{ background: stats.attention > 0 ? "#fff5f0" : "#f0fff0", borderRadius: "10px", padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: stats.attention > 0 ? "#c62828" : "#2e7d32" }}>{stats.attention}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>Aandacht</div>
          </div>
        </div>
      )}

      {/* Leerlingentabel */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 50px 50px 50px", padding: "10px 14px", fontSize: "11px", fontWeight: 700, color: "#999", borderBottom: "1px solid #f0f0f5", gap: "4px" }}>
          <div>Naam</div>
          <div style={{ textAlign: "center" }}>%</div>
          <div style={{ textAlign: "center" }}>Cards</div>
          <div style={{ textAlign: "center" }}>Tijd</div>
          <div style={{ textAlign: "center" }}>Lastig</div>
        </div>

        {students.map(s => {
          const sum = getStudentSummary(s);
          const pctColor = sum.overallPct >= 0.6 ? "#2e7d32" : sum.overallPct >= 0.3 ? "#f57c00" : "#c62828";
          const lastActive = sum.updatedAt
            ? formatRelativeDate(sum.updatedAt)
            : "nooit";

          return (
            <button
              key={s.id}
              onClick={() => setView(`docent-student-${s.id}`)}
              style={{
                display: "grid", gridTemplateColumns: "1fr 50px 50px 50px 50px",
                width: "100%", padding: "12px 14px", background: "none",
                border: "none", borderTop: "1px solid #f0f0f5", cursor: "pointer",
                textAlign: "left", gap: "4px", alignItems: "center",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#f8f8fc"}
              onMouseOut={e => e.currentTarget.style.background = "none"}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>{s.display_name}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "1px" }}>{lastActive}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: pctColor }}>{Math.round(sum.overallPct * 100)}</span>
              </div>
              <div style={{ textAlign: "center", fontSize: "13px", color: "#444" }}>
                {sum.flashDone}/{sum.flashTotal}
              </div>
              <div style={{ textAlign: "center", fontSize: "13px", color: "#444" }}>
                {sum.totalMinutes > 0 ? `${Math.round(sum.totalMinutes / 60)}u` : "—"}
              </div>
              <div style={{ textAlign: "center" }}>
                {sum.lastigCount > 0 && (
                  <span style={{ background: "#fff0f0", color: "#c62828", fontSize: "12px", fontWeight: 600, padding: "2px 6px", borderRadius: "8px" }}>
                    {sum.lastigCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {students.length === 0 && (
          <div style={{ padding: "24px", textAlign: "center", color: "#999", fontSize: "13px" }}>
            Nog geen leerlingen gevonden.
          </div>
        )}
      </div>
    </div>
  );
}

function formatRelativeDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 5) return "zojuist";
  if (diffMin < 60) return `${diffMin} min geleden`;
  if (diffHr < 24) return `${diffHr}u geleden`;
  if (diffDay === 1) return "gisteren";
  if (diffDay < 7) return `${diffDay} dagen geleden`;
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}
