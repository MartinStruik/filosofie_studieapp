import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./hooks/useAuth.js";
import { useProgressSync } from "./hooks/useProgressSync.js";

// Views
import { Home } from "./views/Home.jsx";
import { VoortgangView } from "./views/VoortgangView.jsx";
import { StudiepadView } from "./views/StudiepadView.jsx";
import { Flashcards } from "./views/Flashcards.jsx";
import { Quiz } from "./views/Quiz.jsx";
import { ExamQuestions } from "./views/ExamQuestions.jsx";
import { FilosofenView } from "./views/FilosofenView.jsx";
import { KwestieDetail } from "./views/KwestieDetail.jsx";
import { EindtermenView } from "./views/EindtermenView.jsx";
import { BegripsanalyseView } from "./views/BegripsanalyseView.jsx";
import { PrimaireTexten } from "./views/PrimaireTexten.jsx";
import { LiaSpelView } from "./views/LiaSpelView.jsx";
import { ConflictMapsView } from "./views/ConflictMapsView.jsx";
import { RodeDraadView } from "./views/RodeDraadView.jsx";
import { VideoView } from "./views/VideoView.jsx";
import { LoginView } from "./views/LoginView.jsx";
import { DocentView } from "./views/DocentView.jsx";
import { DocentStudentDetail } from "./views/DocentStudentDetail.jsx";
import { DocentAccountsView } from "./views/DocentAccountsView.jsx";
import { MindmapView } from "./views/MindmapView.jsx";

export default function App() {
  const { user, profile, loading: authLoading, login, logout, isDocent } = useAuth();
  const { progress, setProgress, loaded } = useProgressSync(user);

  const [view, setView] = useState("home");
  const [viewHistory, setViewHistory] = useState([]);

  const navigateTo = useCallback((newView) => {
    setViewHistory(prev => [...prev, view]);
    setView(newView);
  }, [view]);

  const goBack = useCallback(() => {
    setViewHistory(prev => {
      if (prev.length === 0) { setView("home"); return []; }
      const copy = [...prev];
      const last = copy.pop();
      setView(last);
      return copy;
    });
  }, []);

  // Automatic time tracking with Page Visibility API
  useEffect(() => {
    if (!loaded) return;
    let startTime = document.visibilityState === "visible" ? Date.now() : null;
    let accumulated = 0;

    const flush = () => {
      if (accumulated < 30) return; // minimum 30 seconds
      const minutes = Math.round(accumulated / 60);
      if (minutes <= 0) return;
      const today = new Date().toISOString().split("T")[0];
      setProgress(prev => {
        const log = [...(prev.tijdLog || [])];
        const idx = log.findIndex(e => e.date === today);
        if (idx >= 0) {
          log[idx] = { ...log[idx], appMinutes: (log[idx].appMinutes || 0) + minutes };
        } else {
          log.push({ date: today, appMinutes: minutes, manualEntries: [] });
        }
        return { ...prev, tijdLog: log, lastActiveDate: today };
      });
      accumulated = 0;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startTime = Date.now();
      } else if (startTime) {
        accumulated += (Date.now() - startTime) / 1000;
        startTime = null;
        flush();
      }
    };

    const interval = setInterval(() => {
      if (startTime) {
        accumulated += (Date.now() - startTime) / 1000;
        startTime = Date.now();
      }
      flush();
    }, 60000);

    const onBeforeUnload = () => {
      if (startTime) {
        accumulated += (Date.now() - startTime) / 1000;
        startTime = null;
      }
      flush();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", onBeforeUnload);
      clearInterval(interval);
      if (startTime) {
        accumulated += (Date.now() - startTime) / 1000;
      }
      flush();
    };
  }, [loaded, setProgress]);

  // Auth gate: show loading or login
  if (authLoading) {
    return (
      <div style={{ maxWidth: "520px", margin: "0 auto", minHeight: "100vh", background: "#fff", fontFamily: "'Source Sans 3', -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#999", fontSize: "14px" }}>Laden...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginView onLogin={login} />;
  }

  const viewTitles = {
    home: "Studieapp",
    lia: "Lia's verhaal",
    flashcards: "Flashcards",
    quiz: "Quiz",
    exam: "Examenvragen",
    teksten: "Primaire teksten",
    filosofen: "Filosofen",
    eindtermen: "Eindtermen",
    begripsanalyse: "Begripsanalyse",
    conceptmaps: "Conflictkaarten",
    rodedraad: "Rode draad",
    mindmaps: "Denkschema's",
    videos: "Uitlegvideo's",
    studiepad: "Studiepad",
    voortgang: "Voortgang",
    dashboard: "Dashboard",
    "docent-accounts": "Accounts",
  };

  const isKwestie = view.startsWith("kwestie-");
  const isStudentDetail = view.startsWith("docent-student-");
  const kwestieId = isKwestie ? parseInt(view.split("-")[1]) : null;
  const studentDetailId = isStudentDetail ? view.replace("docent-student-", "") : null;

  const title = isKwestie
    ? `Kwestie ${kwestieId}`
    : isStudentDetail
      ? "Leerling detail"
      : (viewTitles[view] || "Studieapp");

  const renderView = () => {
    if (isKwestie) return <KwestieDetail id={kwestieId} setView={navigateTo} />;
    if (isStudentDetail) return <DocentStudentDetail studentId={studentDetailId} />;
    switch (view) {
      case "lia": return <LiaSpelView progress={progress} setProgress={setProgress} />;
      case "flashcards": return <Flashcards progress={progress} setProgress={setProgress} />;
      case "quiz": return <Quiz progress={progress} setProgress={setProgress} setView={navigateTo} />;
      case "exam": return <ExamQuestions progress={progress} setProgress={setProgress} />;
      case "teksten": return <PrimaireTexten progress={progress} setProgress={setProgress} />;
      case "filosofen": return <FilosofenView progress={progress} setProgress={setProgress} />;
      case "eindtermen": return <EindtermenView />;
      case "begripsanalyse": return <BegripsanalyseView progress={progress} setProgress={setProgress} />;
      case "conceptmaps": return <ConflictMapsView progress={progress} setProgress={setProgress} />;
      case "rodedraad": return <RodeDraadView progress={progress} setProgress={setProgress} />;
      case "mindmaps": return <MindmapView />;
      case "videos": return <VideoView />;
      case "studiepad": return <StudiepadView progress={progress} setProgress={setProgress} setView={navigateTo} />;
      case "voortgang": return <VoortgangView progress={progress} setProgress={setProgress} setView={navigateTo} />;
      case "dashboard": return <DocentView setView={navigateTo} />;
      case "docent-accounts": return <DocentAccountsView />;
      default: return <Home setView={navigateTo} progress={progress} />;
    }
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", minHeight: "100vh", background: "#fff", fontFamily: "'Source Sans 3', -apple-system, sans-serif" }}>
      <style>{`
        *:focus-visible {
          outline: 2px solid #4A90D9;
          outline-offset: 2px;
        }
        button:focus:not(:focus-visible) {
          outline: none;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #f0f0f5", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        {view !== "home" && view !== "dashboard" && (
          <button onClick={goBack} aria-label="Terug" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#666", padding: "10px", margin: "-6px", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"←"}</button>
        )}
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a2e", fontFamily: "'Source Sans 3', sans-serif" }}>{title}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <a
            href="mailto:m.struik@asg.nl?subject=Feedback%20Filosofie%20Studieapp"
            aria-label="Feedback"
            style={{ background: "none", border: "none", fontSize: "12px", color: "#999", textDecoration: "none", padding: "6px", display: "flex", alignItems: "center" }}
          >
            Feedback
          </a>
          <button onClick={() => navigateTo("eindtermen")} aria-label="Eindtermen" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "#666", textDecoration: "underline", padding: "10px", margin: "-6px", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>ET</button>
          <button
            onClick={logout}
            aria-label="Uitloggen"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#999", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "36px", minHeight: "36px" }}
            title={`Uitloggen (${profile?.display_name || ""})`}
          >
            ⏻
          </button>
        </div>
      </header>

      {renderView()}

      <nav aria-label="Hoofdnavigatie" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)",
        borderTop: "1px solid #f0f0f5", display: "flex", justifyContent: "space-around",
        padding: "8px 0 12px", maxWidth: "520px", margin: "0 auto",
      }}>
        {[
          ...(isDocent
            ? [
                { icon: "📊", label: "Dashboard", v: "dashboard" },
                { icon: "👥", label: "Accounts", v: "docent-accounts" },
              ]
            : [
                { icon: "🏠", label: "Home", v: "home" },
                { icon: "📅", label: "Studiepad", v: "studiepad" },
                { icon: "🎴", label: "Oefenen", v: "flashcards" },
                { icon: "📊", label: "Voortgang", v: "voortgang" },
              ]
          ),
        ].map(nav => {
          const isActive = view === nav.v;
          return (
          <button key={nav.v} onClick={() => { setViewHistory([]); setView(nav.v); }} aria-current={isActive ? "page" : undefined} aria-label={nav.label} style={{
            background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "8px 12px",
            opacity: isActive ? 1 : 0.5, transition: "opacity 0.2s", position: "relative", minWidth: "48px", minHeight: "48px",
          }}>
            <span aria-hidden="true" style={{ fontSize: "20px" }}>{nav.icon}</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a2e" }}>{nav.label}</span>
            {isActive && <div style={{ position: "absolute", bottom: "-2px", width: "20px", height: "3px", borderRadius: "2px", background: "#4A90D9" }} />}
          </button>
          );
        })}
      </nav>

      <div style={{ height: "70px" }} />
    </div>
  );
}
