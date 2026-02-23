import { EXAM_DATE, START_DATE } from "../data/config.js";

export function getCurrentWeek(startDate) {
  const now = new Date();
  if (now < startDate) return 0;
  const diff = now - startDate;
  const week = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.min(week, 10);
}

export function getExamCountdown() {
  const now = new Date();
  const diff = EXAM_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, total: 0, fraction: 1 };
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const totalSpan = EXAM_DATE - START_DATE;
  const elapsed = now - START_DATE;
  const fraction = Math.max(0, Math.min(1, elapsed / totalSpan));
  return { days, hours, total: diff, fraction };
}

export function getDateRange(start, end) {
  const dates = [];
  const d = new Date(start);
  while (d <= end) {
    dates.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }
  return dates;
}
