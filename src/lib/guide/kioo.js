import { base44 } from '@/api/base44Client';
import { KIOO_STATEMENTS } from './sections';

/**
 * Kioo reflections — the first attempt and every return, each kept with its
 * date. Attempts belong to the learner; nothing here is graded or shared.
 *
 * Each rating is stored in its own integer field (r1-r10), and read back into
 * a { s1: 4, ... } map so the components can stay readable.
 */

export { KIOO_STATEMENTS };

function fieldNameFor(statementId) {
  return `r${String(statementId).replace(/^s/, '')}`;
}

function toStoredFields(ratings) {
  const stored = {};
  KIOO_STATEMENTS.forEach((statement) => {
    const value = Number((ratings || {})[statement.id]);
    if (Number.isFinite(value) && value >= 1 && value <= 5) {
      stored[fieldNameFor(statement.id)] = value;
    }
  });
  return stored;
}

export function ratingsOf(attempt) {
  const ratings = {};
  KIOO_STATEMENTS.forEach((statement) => {
    const value = Number(attempt ? attempt[fieldNameFor(statement.id)] : NaN);
    if (Number.isFinite(value) && value > 0) ratings[statement.id] = value;
  });
  return ratings;
}

export async function loadKiooAttempts(learnerId) {
  if (!learnerId) return [];
  const attempts = await base44.entities.KiooAttempt.filter({ learner_id: learnerId }, '-attempt_date', 100);
  return attempts || [];
}

export function splitAttempts(attempts) {
  const first = (attempts || []).find((attempt) => attempt.attempt_type === 'first') || null;
  const returns = (attempts || [])
    .filter((attempt) => attempt.attempt_type === 'return')
    .sort((a, b) => String(b.attempt_date).localeCompare(String(a.attempt_date)));
  return { first, returns };
}

export async function saveKiooAttempt({ learnerId, attemptType, ratings, note }) {
  return base44.entities.KiooAttempt.create({
    learner_id: learnerId,
    attempt_type: attemptType,
    attempt_date: new Date().toISOString().slice(0, 10),
    ...toStoredFields(ratings),
    note: note || '',
  });
}

export function averageRating(ratings) {
  const values = KIOO_STATEMENTS.map((statement) => Number((ratings || {})[statement.id])).filter(
    (value) => Number.isFinite(value) && value > 0,
  );
  if (!values.length) return null;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

/**
 * Pairs the first attempt with the latest return so the two can be read side by
 * side. Statements the learner rated higher in the latest attempt are flagged.
 */
export function buildComparison(first, latest) {
  if (!first || !latest) return [];
  const before = ratingsOf(first);
  const after = ratingsOf(latest);
  return KIOO_STATEMENTS.map((statement) => {
    const earlier = before[statement.id] || null;
    const later = after[statement.id] || null;
    return {
      id: statement.id,
      text: statement.text,
      before: earlier,
      after: later,
      movedUp: earlier !== null && later !== null && later > earlier,
      movedDown: earlier !== null && later !== null && later < earlier,
    };
  });
}

export function formatAttemptDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}