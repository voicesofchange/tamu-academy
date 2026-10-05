import { useCallback, useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { setSectionStatus } from './guideProgress';

/**
 * useGuideSection — loads a learner's saved answers for one section and
 * autosaves each answer as they type, debounced so a sentence is one write.
 *
 * Answers live in GuideResponse, one record per (section, exercise, field).
 * Written answers are stored as text; tables, ratings and frequency responses
 * are stored as JSON in the same field.
 */

const SAVE_DELAY = 700;

export function fieldKey(exerciseId, fieldId) {
  return `${exerciseId}::${fieldId}`;
}

function serialize(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

export function deserialize(raw) {
  if (raw === null || raw === undefined) return '';
  if (typeof raw !== 'string') return raw;
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

export function useGuideSection(sectionId) {
  const { user } = useAuth();
  const learnerId = user?.id || null;
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState('idle');

  const recordIds = useRef({});
  const timers = useRef({});
  const pending = useRef({});
  const savedTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    recordIds.current = {};
    setValues({});
    if (!learnerId || !sectionId) {
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    (async () => {
      try {
        const records = await base44.entities.GuideResponse.filter(
          { learner_id: learnerId, section_id: sectionId },
          '-updated_date',
          300,
        );
        if (cancelled) return;
        const next = {};
        const ids = {};
        (records || []).forEach((record) => {
          const key = fieldKey(record.exercise_id, record.field_id);
          next[key] = deserialize(record.value);
          ids[key] = record.id;
        });
        recordIds.current = ids;
        setValues(next);
      } catch (error) {
        // A failed load leaves the section empty; the learner can still type.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [learnerId, sectionId]);

  const persist = useCallback(
    async (key, value) => {
      const [exerciseId, fieldId] = key.split('::');
      setSaveState('saving');
      try {
        const payload = {
          learner_id: learnerId,
          section_id: sectionId,
          exercise_id: exerciseId,
          field_id: fieldId,
          value: serialize(value),
          updated_date: new Date().toISOString(),
        };
        const existingId = recordIds.current[key];
        if (existingId) {
          await base44.entities.GuideResponse.update(existingId, payload);
        } else {
          const created = await base44.entities.GuideResponse.create(payload);
          recordIds.current[key] = created?.id;
        }
        setSaveState('saved');
        clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSaveState('idle'), 2200);
      } catch (error) {
        setSaveState('error');
      }
    },
    [learnerId, sectionId],
  );

  // Flush anything still waiting when the learner leaves the section.
  useEffect(
    () => () => {
      clearTimeout(savedTimer.current);
      Object.entries(timers.current).forEach(([key, timer]) => {
        clearTimeout(timer);
        if (pending.current[key] !== undefined) {
          const value = pending.current[key];
          delete pending.current[key];
          persist(key, value);
        }
      });
    },
    [persist],
  );

  const setValue = useCallback(
    (exerciseId, fieldId, value) => {
      if (!learnerId) return;
      const key = fieldKey(exerciseId, fieldId);
      setValues((prev) => ({ ...prev, [key]: value }));
      pending.current[key] = value;
      clearTimeout(timers.current[key]);
      timers.current[key] = setTimeout(() => {
        const latest = pending.current[key];
        delete pending.current[key];
        persist(key, latest);
      }, SAVE_DELAY);
      setSectionStatus(learnerId, sectionId, 'in_progress');
    },
    [learnerId, sectionId, persist],
  );

  const getValue = useCallback(
    (exerciseId, fieldId, fallback = '') => {
      const key = fieldKey(exerciseId, fieldId);
      return values[key] === undefined ? fallback : values[key];
    },
    [values],
  );

  return { values, getValue, setValue, loading, saveState, learnerId };
}