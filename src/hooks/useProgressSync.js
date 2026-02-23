import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase.js";

const STORAGE_KEY = "filosofie-progress";
const DEBOUNCE_MS = 3000;
const DEFAULT_PROGRESS = { seenCards: [], quizScores: [] };

function loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveLocal(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

// Merge strategy: combine local + server progress, prefer richer data
function mergeProgress(local, server) {
  if (!server || Object.keys(server).length === 0) return local;
  if (!local || Object.keys(local).length === 0) return server;

  const merged = { ...server };

  // Arrays: union (seenCards, quizScores, liaPlayed, tijdLog)
  for (const key of ["seenCards", "liaPlayed"]) {
    const a = local[key] || [];
    const b = server[key] || [];
    merged[key] = [...new Set([...a, ...b])];
  }

  // quizScores: union by timestamp, deduplicate
  const localScores = local.quizScores || [];
  const serverScores = server.quizScores || [];
  const scoreMap = new Map();
  for (const s of [...serverScores, ...localScores]) {
    const key = s.date || JSON.stringify(s);
    if (!scoreMap.has(key)) scoreMap.set(key, s);
  }
  merged.quizScores = [...scoreMap.values()];

  // tijdLog: merge by date, sum minutes
  const localLog = local.tijdLog || [];
  const serverLog = server.tijdLog || [];
  const logMap = new Map();
  for (const e of [...serverLog, ...localLog]) {
    const existing = logMap.get(e.date);
    if (!existing) {
      logMap.set(e.date, { ...e });
    } else {
      logMap.set(e.date, {
        ...existing,
        appMinutes: Math.max(existing.appMinutes || 0, e.appMinutes || 0),
        manualEntries: [
          ...(existing.manualEntries || []),
          ...(e.manualEntries || []),
        ].filter((v, i, a) => a.findIndex(x => x.label === v.label && x.minutes === v.minutes) === i),
      });
    }
  }
  merged.tijdLog = [...logMap.values()].sort((a, b) => a.date.localeCompare(b.date));

  // Trackers (examTracker, tekstTracker, begripsanalyseTracker, conflictTracker, rodeDraadTracker):
  // merge keys, prefer non-null, prefer "goed"/"begrepen" over "lastig"
  for (const key of ["examTracker", "tekstTracker", "begripsanalyseTracker", "conflictTracker", "rodeDraadTracker"]) {
    const a = local[key] || {};
    const b = server[key] || {};
    const m = { ...b };
    for (const [k, v] of Object.entries(a)) {
      if (!m[k]) {
        m[k] = v;
      } else if (v === "goed" || v === "begrepen") {
        m[k] = v; // upgrade from "lastig" to "goed"/"begrepen"
      }
    }
    merged[key] = m;
  }

  // leitnerBoxes: prefer higher box number (more progress)
  const localBoxes = local.leitnerBoxes || {};
  const serverBoxes = server.leitnerBoxes || {};
  const mergedBoxes = { ...serverBoxes };
  for (const [term, val] of Object.entries(localBoxes)) {
    const existing = mergedBoxes[term];
    if (!existing || (val.box > existing.box)) {
      mergedBoxes[term] = val;
    }
  }
  merged.leitnerBoxes = mergedBoxes;

  // Studiepad: prefer whichever was set (local wins if both exist)
  if (local.studiepad && !server.studiepad) {
    merged.studiepad = local.studiepad;
  } else if (local.studiepad && server.studiepad) {
    merged.studiepad = local.studiepad; // local edits take precedence
  }

  // lastActiveDate: prefer more recent
  if (local.lastActiveDate && server.lastActiveDate) {
    merged.lastActiveDate = local.lastActiveDate > server.lastActiveDate
      ? local.lastActiveDate
      : server.lastActiveDate;
  } else {
    merged.lastActiveDate = local.lastActiveDate || server.lastActiveDate;
  }

  return merged;
}

export function useProgressSync(user) {
  const [progress, setProgress] = useState(() => {
    return loadLocal() || DEFAULT_PROGRESS;
  });
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef(null);
  const isSyncingRef = useRef(false);

  // On mount / user change: load from localStorage instantly, then fetch server data and merge
  useEffect(() => {
    const local = loadLocal();
    if (local) setProgress(local);

    if (!user) {
      setLoaded(true);
      return;
    }

    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from("progress")
        .select("data")
        .eq("user_id", user.id)
        .single();

      if (cancelled) return;

      const serverData = data?.data || {};
      const localData = loadLocal() || DEFAULT_PROGRESS;
      const merged = mergeProgress(localData, serverData);

      setProgress(merged);
      saveLocal(merged);
      setLoaded(true);
    })();

    return () => { cancelled = true; };
  }, [user]);

  // Save to localStorage on every progress change
  useEffect(() => {
    if (!loaded) return;
    saveLocal(progress);
  }, [progress, loaded]);

  // Debounced sync to Supabase
  useEffect(() => {
    if (!loaded || !user) return;
    if (isSyncingRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      isSyncingRef.current = true;
      try {
        await supabase.from("progress").upsert({
          user_id: user.id,
          data: progress,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Sync error:", e);
      }
      isSyncingRef.current = false;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [progress, loaded, user]);

  return { progress, setProgress, loaded };
}
