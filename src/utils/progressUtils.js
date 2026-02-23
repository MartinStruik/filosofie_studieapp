import { FLASHCARDS } from "../data/flashcards.js";
import { QUIZ_QUESTIONS } from "../data/quizQuestions.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { PRIMAIRE_TEKSTEN } from "../data/primaireTeksten.js";
import { BEGRIPSANALYSE } from "../data/begripsanalyse.js";
import { CONFLICT_MAPS } from "../data/conflictMaps.js";
import { RODE_DRAAD } from "../data/rodeDraad.js";
import { LIA_CHAPTERS } from "../data/liaChapters.js";
import { STUDIEPAD_PRESETS, START_DATE } from "../data/config.js";
import { getCurrentWeek } from "./dateUtils.js";
import { getDueCards } from "./leitnerUtils.js";

export function focusToKwestieFilter(focusId) {
  if (focusId.startsWith("K")) return parseInt(focusId.replace("K", ""));
  return focusId;
}

export function computeOverallProgress(progress) {
  const totalFlash = FLASHCARDS.length;
  const seenFlash = (progress.seenCards || []).length;
  const totalQuiz = QUIZ_QUESTIONS.length;
  const quizDone = (progress.quizScores || []).length > 0 ? 1 : 0;
  const totalExam = EXAM_QUESTIONS.length;
  const examDone = Object.values(progress.examTracker || {}).filter(v => v === "goed" || v === "lastig").length;
  const totalTekst = PRIMAIRE_TEKSTEN.length;
  const tekstDone = Object.values(progress.tekstTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const flashPct = totalFlash > 0 ? seenFlash / totalFlash : 0;
  const quizPct = quizDone;
  const examPct = totalExam > 0 ? examDone / totalExam : 0;
  const tekstPct = totalTekst > 0 ? tekstDone / totalTekst : 0;
  const totalBegripsanalyse = BEGRIPSANALYSE.reduce((sum, b) => sum + b.definities.length, 0);
  const begripDone = Object.values(progress.begripsanalyseTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const begripPct = totalBegripsanalyse > 0 ? begripDone / totalBegripsanalyse : 0;
  const totalLia = LIA_CHAPTERS.length;
  const liaDone = (progress.liaPlayed || []).length;
  const liaPct = totalLia > 0 ? liaDone / totalLia : 0;
  const totalConflict = CONFLICT_MAPS.length;
  const conflictDone = Object.values(progress.conflictTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const conflictPct = totalConflict > 0 ? conflictDone / totalConflict : 0;
  const totalRodeDraad = RODE_DRAAD.length;
  const rodeDraadDone = Object.values(progress.rodeDraadTracker || {}).filter(v => v === "begrepen" || v === "lastig").length;
  const rodeDraadPct = totalRodeDraad > 0 ? rodeDraadDone / totalRodeDraad : 0;
  return {
    flash: { done: seenFlash, total: totalFlash, pct: flashPct },
    quiz: { done: (progress.quizScores || []).length, pct: quizPct },
    exam: { done: examDone, total: totalExam, pct: examPct },
    tekst: { done: tekstDone, total: totalTekst, pct: tekstPct },
    begripsanalyse: { done: begripDone, total: totalBegripsanalyse, pct: begripPct },
    conflict: { done: conflictDone, total: totalConflict, pct: conflictPct },
    rodeDraad: { done: rodeDraadDone, total: totalRodeDraad, pct: rodeDraadPct },
    lia: { done: liaDone, total: totalLia, pct: liaPct },
    overall: (flashPct + examPct + tekstPct + begripPct + conflictPct + rodeDraadPct + liaPct) / 7,
  };
}

export function computeKwestieProgress(progress, focusId) {
  const filter = focusToKwestieFilter(focusId);
  const flashForK = FLASHCARDS.filter(f => f.kwestie === filter);
  const seenCards = progress.seenCards || [];
  const flashSeen = flashForK.filter(f => seenCards.includes(f.term)).length;
  const quizForK = QUIZ_QUESTIONS.filter(q => q.kwestie === filter);
  const examForK = EXAM_QUESTIONS.filter(e => e.kwestie === filter);
  const examTracker = progress.examTracker || {};
  const examDone = examForK.filter(e => {
    const key = `${e.year}-${e.nr}`;
    return examTracker[key] === "goed" || examTracker[key] === "lastig";
  }).length;
  const tekstForK = PRIMAIRE_TEKSTEN.filter(t => t.kwestie === filter);
  const tekstTracker = progress.tekstTracker || {};
  const tekstDone = tekstForK.filter(t => tekstTracker[t.id] === "begrepen" || tekstTracker[t.id] === "lastig").length;
  const liaForK = LIA_CHAPTERS.filter(c => c.kwestie === filter);
  const liaPlayed = progress.liaPlayed || [];
  const liaDone = liaForK.filter(c => liaPlayed.includes(c.id)).length;
  const parts = [];
  if (flashForK.length > 0) parts.push(flashSeen / flashForK.length);
  if (examForK.length > 0) parts.push(examDone / examForK.length);
  if (tekstForK.length > 0) parts.push(tekstDone / tekstForK.length);
  if (liaForK.length > 0) parts.push(liaDone / liaForK.length);
  return {
    flash: { done: flashSeen, total: flashForK.length },
    quiz: { total: quizForK.length },
    exam: { done: examDone, total: examForK.length },
    tekst: { done: tekstDone, total: tekstForK.length },
    lia: { done: liaDone, total: liaForK.length },
    pct: parts.length > 0 ? parts.reduce((a, b) => a + b, 0) / parts.length : 0,
  };
}

export function computeStreak(tijdLog) {
  if (!tijdLog || tijdLog.length === 0) return { current: 0, longest: 0 };
  const dates = [...new Set(tijdLog.map(e => e.date))].sort().reverse();
  const today = new Date().toISOString().split("T")[0];
  let current = 0;
  let checkDate = today;
  for (const d of dates) {
    if (d === checkDate) {
      current++;
      const prev = new Date(checkDate);
      prev.setDate(prev.getDate() - 1);
      checkDate = prev.toISOString().split("T")[0];
    } else if (d < checkDate) {
      break;
    }
  }
  const allDates = [...new Set(tijdLog.map(e => e.date))].sort();
  let longest = 0;
  let streak = 0;
  let expected = null;
  for (const d of allDates) {
    if (expected === null || d === expected) {
      streak++;
    } else {
      streak = 1;
    }
    longest = Math.max(longest, streak);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    expected = next.toISOString().split("T")[0];
  }
  return { current, longest };
}

export function generateDagdoelen(progress) {
  const studiepad = progress.studiepad;
  if (!studiepad) return null;
  const currentWeek = getCurrentWeek(studiepad ? new Date(studiepad.startDate || START_DATE) : START_DATE);
  if (currentWeek <= 0) return null;

  let weken;
  if (studiepad.type === "preset") {
    const preset = STUDIEPAD_PRESETS.find(p => p.id === studiepad.presetId);
    weken = preset ? preset.weken : [];
  } else {
    weken = studiepad.customWeken || [];
  }
  const week = weken.find(w => w.week === currentWeek);
  if (!week) return null;

  const focus = week.focus || [];
  const focusFilter = (item) => {
    if (focus.length === 0) return true;
    return focus.some(f => {
      if (f.startsWith("K")) return item.kwestie === parseInt(f[1]);
      return item.kwestie === f;
    });
  };

  const relevantCards = FLASHCARDS.filter(focusFilter);
  const dueCards = getDueCards(progress, relevantCards);
  const relevantExam = EXAM_QUESTIONS.filter(focusFilter);
  const examTracker = progress.examTracker || {};
  const examUndone = relevantExam.filter(eq => !examTracker[`${eq.year}-${eq.nr}`]);

  const doelen = [];
  if (dueCards.length > 0) doelen.push({ icon: "\uD83D\uDD04", text: `${Math.min(15, dueCards.length)} flashcards herhalen`, detail: focus.join(", ") });
  else if (relevantCards.length > 0) doelen.push({ icon: "\uD83C\uDCCF", text: `${Math.min(15, relevantCards.length)} flashcards oefenen`, detail: focus.join(", ") });
  doelen.push({ icon: "\u2753", text: "1 quiz sessie (15 vragen)", detail: focus.join(", ") });
  if (examUndone.length > 0) doelen.push({ icon: "\uD83D\uDD0D", text: `${Math.min(2, examUndone.length)} examenvra${examUndone.length === 1 ? "ag" : "gen"} maken`, detail: focus.join(", ") });
  const liaPlayed = progress.liaPlayed || [];
  const liaUndone = LIA_CHAPTERS.filter(focusFilter).filter(c => !liaPlayed.includes(c.id));
  if (liaUndone.length > 0) doelen.push({ icon: "\uD83C\uDFAD", text: `Speel 1 Lia-hoofdstuk`, detail: liaUndone[0].title });
  return { doelen, weekLabel: week.label, focus };
}
