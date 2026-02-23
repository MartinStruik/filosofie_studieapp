import { useState } from "react";
import { KWESTIES, DOMEINEN } from "../data/kwesties.js";
import { CONFLICT_MAPS } from "../data/conflictMaps.js";
import { RODE_DRAAD } from "../data/rodeDraad.js";
import { PRIMAIRE_TEKSTEN } from "../data/primaireTeksten.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { BEGRIPSANALYSE } from "../data/begripsanalyse.js";
import { EXAM_DATE, START_DATE } from "../data/config.js";
import { getExamCountdown, getDateRange } from "../utils/dateUtils.js";
import { computeOverallProgress, computeKwestieProgress, computeStreak } from "../utils/progressUtils.js";
import { useToast } from "../hooks/useToast.js";
import { Toast } from "../components/Toast.jsx";

export function VoortgangView({ progress, setProgress, setView }) {
  const [manualMinutes, setManualMinutes] = useState(15);
  const [manualLabel, setManualLabel] = useState("");
  const { toast, show: showToast } = useToast();

  const countdown = getExamCountdown();
  const overall = computeOverallProgress(progress);
  const streak = computeStreak(progress.tijdLog || []);
  const today = new Date().toISOString().split("T")[0];
  const tijdLog = progress.tijdLog || [];
  const todayEntry = tijdLog.find(e => e.date === today);
  const todayApp = todayEntry ? (todayEntry.appMinutes || 0) : 0;
  const todayManual = todayEntry ? (todayEntry.manualEntries || []).reduce((s, e) => s + e.minutes, 0) : 0;

  const dateRange = getDateRange(START_DATE, EXAM_DATE);
  const timeByDate = {};
  tijdLog.forEach(e => {
    const total = (e.appMinutes || 0) + (e.manualEntries || []).reduce((s, m) => s + m.minutes, 0);
    timeByDate[e.date] = total;
  });
  const maxTime = Math.max(1, ...Object.values(timeByDate));

  const addManualTime = () => {
    if (manualMinutes <= 0) return;
    setProgress(prev => {
      const log = [...(prev.tijdLog || [])];
      const idx = log.findIndex(e => e.date === today);
      if (idx >= 0) {
        log[idx] = {
          ...log[idx],
          manualEntries: [...(log[idx].manualEntries || []), { minutes: manualMinutes, label: manualLabel || "Studie" }],
        };
      } else {
        log.push({ date: today, appMinutes: 0, manualEntries: [{ minutes: manualMinutes, label: manualLabel || "Studie" }] });
      }
      return { ...prev, tijdLog: log, lastActiveDate: today };
    });
    setManualMinutes(15);
    setManualLabel("");
    showToast(`${manualMinutes} min toegevoegd`);
  };

  const ringSize = 140;
  const ringStroke = 10;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;

  const kwestieItems = [
    ...KWESTIES.map(k => ({ id: `K${k.id}`, label: `K${k.id}`, color: k.color })),
    ...DOMEINEN.map(d => ({ id: d.id, label: d.id, color: d.color })),
  ];

  // Collect begrepen/lastig items across all trackers
  const lastigItems = [];
  const begrepenCount = { total: 0 };
  const lastigCount = { total: 0 };

  const ct = progress.conflictTracker || {};
  const rt = progress.rodeDraadTracker || {};
  const tt = progress.tekstTracker || {};
  const et = progress.examTracker || {};
  const bt = progress.begripsanalyseTracker || {};

  Object.entries(ct).forEach(([id, status]) => {
    if (status === "begrepen") begrepenCount.total++;
    if (status === "lastig") {
      lastigCount.total++;
      const card = CONFLICT_MAPS.find(c => c.id === Number(id));
      if (card) lastigItems.push({ type: "Conflictkaart", label: card.titel, view: "conceptmaps" });
    }
  });
  Object.entries(rt).forEach(([id, status]) => {
    if (status === "begrepen") begrepenCount.total++;
    if (status === "lastig") {
      lastigCount.total++;
      const card = RODE_DRAAD.find(c => c.id === Number(id));
      if (card) lastigItems.push({ type: "Rode draad", label: card.titel, view: "rodedraad" });
    }
  });
  Object.entries(tt).forEach(([id, status]) => {
    if (status === "begrepen") begrepenCount.total++;
    if (status === "lastig") {
      lastigCount.total++;
      const pt = PRIMAIRE_TEKSTEN.find(t => t.id === id);
      if (pt) lastigItems.push({ type: "Tekst", label: `${pt.filosoof} — ${pt.titel}`, view: "teksten" });
    }
  });
  Object.entries(et).forEach(([id, status]) => {
    if (status === "goed") begrepenCount.total++;
    if (status === "lastig") {
      lastigCount.total++;
      const eq = EXAM_QUESTIONS.find(q => `${q.year}-${q.nr}` === id);
      if (eq) lastigItems.push({ type: "Examenvraag", label: `${eq.year} vraag ${eq.nr}`, view: "exam" });
    }
  });
  Object.entries(bt).forEach(([id, status]) => {
    if (status === "begrepen") begrepenCount.total++;
    if (status === "lastig") {
      lastigCount.total++;
      // id format: "Lichaam-Descartes"
      const parts = id.split("-");
      const filosoof = parts.pop();
      const begrip = parts.join("-");
      lastigItems.push({ type: "Begrip", label: `${begrip} (${filosoof})`, view: "begripsanalyse" });
    }
  });

  return (
    <div style={{ padding: "0 20px 40px" }}>
      {/* Examencountdown ring */}
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <svg width={ringSize} height={ringSize} style={{ transform: "rotate(-90deg)" }} role="img" aria-label={`${countdown.days} dagen tot examen`}>
          <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="#f0f0f5" strokeWidth={ringStroke} />
          <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="#4A90D9" strokeWidth={ringStroke}
            strokeDasharray={ringCircumference} strokeDashoffset={ringCircumference * (1 - countdown.fraction)} strokeLinecap="round" />
        </svg>
        <div style={{ marginTop: "-95px", marginBottom: "50px", fontFamily: "'Source Sans 3', sans-serif" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e" }}>{countdown.days}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>dagen tot examen</div>
          <div style={{ fontSize: "11px", color: "#666" }}>+ {countdown.hours} uur</div>
        </div>
      </div>

      {/* Totale voortgang */}
      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e" }}>Totale voortgang</span>
          <span style={{ fontWeight: 700, fontSize: "20px", color: "#4A90D9" }}>{Math.round(overall.overall * 100)}%</span>
        </div>
        {[
          { label: "Lia's verhaal", pct: overall.lia.pct, sub: `${overall.lia.done}/${overall.lia.total}`, color: "#9B59B6" },
          { label: "Flashcards", pct: overall.flash.pct, sub: `${overall.flash.done}/${overall.flash.total}`, color: "#4A90D9" },
          { label: "Begripsanalyse", pct: overall.begripsanalyse.pct, sub: `${overall.begripsanalyse.done}/${overall.begripsanalyse.total}`, color: "#E67E22" },
          { label: "Teksten", pct: overall.tekst.pct, sub: `${overall.tekst.done}/${overall.tekst.total}`, color: "#B04AD9" },
          { label: "Conflictkaarten", pct: overall.conflict.pct, sub: `${overall.conflict.done}/${overall.conflict.total}`, color: "#E74C3C" },
          { label: "Rode draad", pct: overall.rodeDraad.pct, sub: `${overall.rodeDraad.done}/${overall.rodeDraad.total}`, color: "#C0392B" },
          { label: "Examenvragen", pct: overall.exam.pct, sub: `${overall.exam.done}/${overall.exam.total}`, color: "#4AD97A" },
          { label: "Quiz", pct: overall.quiz.pct, sub: `${overall.quiz.done} gemaakt`, color: "#D97A4A" },
        ].map(cat => (
          <div key={cat.label} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#666", marginBottom: "3px" }}>
              <span>{cat.label}</span><span>{cat.sub}</span>
            </div>
            <div style={{ height: "6px", background: "#e8e8f0", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round(cat.pct * 100)}%`, background: cat.color, borderRadius: "3px", transition: "width 0.3s" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Begrepen vs lastig ratio */}
      {(begrepenCount.total + lastigCount.total > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ background: "#e8f5e9", borderRadius: "12px", padding: "14px", border: "1px solid #c8e6c9", textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#2e7d32" }}>{begrepenCount.total}</div>
            <div style={{ fontSize: "12px", color: "#4caf50", fontWeight: 600 }}>Begrepen</div>
          </div>
          <div style={{ background: "#fce4ec", borderRadius: "12px", padding: "14px", border: "1px solid #f0c0c0", textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#c62828" }}>{lastigCount.total}</div>
            <div style={{ fontSize: "12px", color: "#ef5350", fontWeight: 600 }}>Lastig</div>
          </div>
        </div>
      )}

      {/* Lastig gemarkeerd — clickable */}
      {lastigItems.length > 0 && (
        <div style={{ background: "#fce4ec", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #f0c0c0" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#c62828", marginBottom: "10px" }}>Lastig gemarkeerd ({lastigItems.length})</div>
          {lastigItems.map((item, i) => (
            <button key={i} onClick={() => setView(item.view)} style={{
              display: "flex", alignItems: "center", gap: "8px", width: "100%",
              background: "rgba(255,255,255,0.6)", border: "none", borderRadius: "8px",
              padding: "8px 10px", cursor: "pointer", textAlign: "left",
              marginBottom: i < lastigItems.length - 1 ? "6px" : 0,
              transition: "background 0.15s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.6)"}
            >
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#c62828", background: "#fff", padding: "2px 6px", borderRadius: "4px", flexShrink: 0 }}>{item.type}</span>
              <span style={{ fontSize: "12px", color: "#444", flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: "12px", color: "#999", flexShrink: 0 }}>{">"}</span>
            </button>
          ))}
        </div>
      )}

      {/* Per kwestie/domein */}
      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", marginBottom: "12px" }}>Per kwestie / domein</div>
        {kwestieItems.map(item => {
          const kp = computeKwestieProgress(progress, item.id);
          return (
            <div key={item.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#666", marginBottom: "3px" }}>
                <span style={{ fontWeight: 600, color: item.color }}>{item.label}</span>
                <span>{Math.round(kp.pct * 100)}%</span>
              </div>
              <div style={{ height: "6px", background: "#e8e8f0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round(kp.pct * 100)}%`, background: item.color, borderRadius: "3px", transition: "width 0.3s" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Studiestreak */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div style={{ background: "#fff5f0", borderRadius: "12px", padding: "16px", border: "1px solid #e8e8f0", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#D97A4A" }}>{streak.current}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>dagen streak</div>
        </div>
        <div style={{ background: "#f0f4ff", borderRadius: "12px", padding: "16px", border: "1px solid #e8e8f0", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#4A90D9" }}>{streak.longest}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>langste streak</div>
        </div>
      </div>

      {/* Vandaag */}
      <div style={{ background: "#f0fff5", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", marginBottom: "8px" }}>Vandaag</div>
        <div style={{ fontSize: "13px", color: "#666" }}>
          App-tijd: <strong>{todayApp} min</strong>
        </div>
        {todayEntry && (todayEntry.manualEntries || []).length > 0 && (
          <div style={{ marginTop: "6px" }}>
            {(todayEntry.manualEntries || []).map((e, i) => (
              <div key={i} style={{ fontSize: "12px", color: "#666" }}>{e.minutes} min — {e.label}</div>
            ))}
          </div>
        )}
        <div style={{ fontSize: "13px", color: "#4AD97A", fontWeight: 700, marginTop: "6px" }}>
          Totaal: {todayApp + todayManual} min
        </div>
      </div>

      {/* Kalender heatmap */}
      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "16px", marginBottom: "16px", border: "1px solid #e8e8f0" }}>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", marginBottom: "12px" }}>Studiekalender</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto repeat(7, 1fr)", gap: "3px", alignItems: "center" }}>
          {["", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map(d => (
            <div key={d} style={{ fontSize: "11px", color: "#666", fontWeight: 600, textAlign: "center", padding: "2px 0" }}>{d}</div>
          ))}
          {(() => {
            const firstDate = new Date(dateRange[0]);
            const dayOfWeek = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
            const paddedDates = [...Array(dayOfWeek).fill(null), ...dateRange];
            const cells = [];
            for (let i = 0; i < paddedDates.length; i++) {
              if (i % 7 === 0) {
                const weekDate = paddedDates[i] || paddedDates[i + 1];
                const label = weekDate ? `${new Date(weekDate).getDate()}/${new Date(weekDate).getMonth() + 1}` : "";
                cells.push(<div key={`wk-${i}`} style={{ fontSize: "9px", color: "#666", textAlign: "right", paddingRight: "4px" }}>{label}</div>);
              }
              const d = paddedDates[i];
              if (!d) {
                cells.push(<div key={`empty-${i}`} />);
              } else {
                const t = timeByDate[d] || 0;
                const opacity = t > 0 ? Math.max(0.25, Math.min(1, t / maxTime)) : 0;
                const isToday = d === today;
                cells.push(
                  <div key={d} title={`${d}: ${t} min`} style={{
                    aspectRatio: "1", borderRadius: "3px",
                    background: t > 0 ? `rgba(74, 144, 217, ${opacity})` : "#e8e8f0",
                    border: isToday ? "2px solid #1a1a2e" : "none",
                    minWidth: 0,
                  }} />
                );
              }
            }
            return cells;
          })()}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666", marginTop: "8px" }}>
          <span>2 mrt</span><span>13 mei</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", justifyContent: "flex-end" }}>
          <span style={{ fontSize: "11px", color: "#666" }}>Minder</span>
          {[0, 0.25, 0.5, 0.75, 1].map(o => (
            <div key={o} style={{ width: "12px", height: "12px", borderRadius: "2px", background: o === 0 ? "#e8e8f0" : `rgba(74, 144, 217, ${o})` }} />
          ))}
          <span style={{ fontSize: "11px", color: "#666" }}>Meer</span>
        </div>
      </div>

      {/* Studietijd toevoegen */}
      <div style={{ background: "#f8f8fc", borderRadius: "12px", padding: "16px", border: "1px solid #e8e8f0" }}>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", marginBottom: "12px" }}>Studietijd toevoegen</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <select value={manualMinutes} onChange={e => setManualMinutes(Number(e.target.value))}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", background: "#fff" }}>
            {[5, 10, 15, 20, 25, 30, 45, 60, 90, 120].map(m => (
              <option key={m} value={m}>{m} min</option>
            ))}
          </select>
          <input value={manualLabel} onChange={e => setManualLabel(e.target.value)}
            placeholder="Bijv. Samenvatting K1"
            style={{ flex: 1, minWidth: "120px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" }} />
          <button onClick={addManualTime}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#4A90D9", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
            +
          </button>
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}
