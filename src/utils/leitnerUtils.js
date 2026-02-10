import { LEITNER_INTERVALS } from "../data/config.js";

export function getLeitnerBox(progress, term) {
  return (progress.leitnerBoxes || {})[term] || { box: 1, lastReviewed: null };
}

export function isCardDue(progress, term) {
  const { box, lastReviewed } = getLeitnerBox(progress, term);
  if (!lastReviewed) return true;
  const interval = LEITNER_INTERVALS[box - 1] || 0;
  const due = new Date(lastReviewed);
  due.setDate(due.getDate() + interval);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return today >= due;
}

export function getDueCards(progress, cards) {
  return cards.filter(c => isCardDue(progress, c.term));
}
