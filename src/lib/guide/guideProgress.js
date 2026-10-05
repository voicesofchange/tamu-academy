import { base44 } from '@/api/base44Client';

/**
 * Section progress for the Learner's Guide — how far the learner has walked
 * through each of the ten sections. Every record belongs to the learner.
 */

const statusCache = {};

function cacheKey(learnerId, sectionId) {
  return `${learnerId}::${sectionId}`;
}

export async function loadProgressMap(learnerId) {
  if (!learnerId) return {};
  const records = await base44.entities.SectionProgress.filter({ learner_id: learnerId }, '-updated_date', 50);
  const map = {};
  (records || []).forEach((record) => {
    map[record.section_id] = record.status;
    statusCache[cacheKey(learnerId, record.section_id)] = record.status;
  });
  return map;
}

export function getCachedStatus(learnerId, sectionId) {
  return statusCache[cacheKey(learnerId, sectionId)] || 'not_started';
}

/**
 * Moves a section to in_progress or done. Deliberately quiet: it never pulls a
 * finished section back to in_progress, and it does nothing if the status is
 * already what we are asking for.
 */
export async function setSectionStatus(learnerId, sectionId, status) {
  if (!learnerId || !sectionId) return;
  const key = cacheKey(learnerId, sectionId);
  const current = statusCache[key];
  if (current === status) return;
  if (status === 'in_progress' && current === 'done') return;
  statusCache[key] = status;

  const now = new Date().toISOString();
  const payload = { learner_id: learnerId, section_id: sectionId, status, updated_at: now };
  if (status === 'done') payload.completed_at = now;

  try {
    const existing = await base44.entities.SectionProgress.filter(
      { learner_id: learnerId, section_id: sectionId },
      '-updated_date',
      1,
    );
    if (existing && existing[0]) {
      await base44.entities.SectionProgress.update(existing[0].id, payload);
    } else {
      await base44.entities.SectionProgress.create({ ...payload, started_at: now });
    }
  } catch (error) {
    delete statusCache[key];
  }
}

export function countStarted(progressMap) {
  return Object.values(progressMap || {}).filter((status) => status === 'in_progress' || status === 'done').length;
}