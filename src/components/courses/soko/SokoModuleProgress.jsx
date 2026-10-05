import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 };

const requirementRowBase = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '0.7rem 1rem',
  borderRadius: '4px',
};

const markButtonBase = {
  color: '#e8b85b',
  backgroundColor: 'transparent',
  border: '1px solid rgba(232,184,91,0.4)',
  padding: '0.4rem 0.9rem',
  fontSize: '0.72rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const completeButtonBase = {
  border: 'none',
  padding: '0.7rem 1.7rem',
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  fontFamily: 'inherit',
};

const SELECT_STYLE = {
  padding: '0.35rem 0.6rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.85)',
  border: '1px solid rgba(232,184,91,0.25)',
  borderRadius: '2px',
  fontSize: '0.72rem',
  fontFamily: 'inherit',
};

// Keys the learner may mark complete themselves, and the server action
// each maps to. The activity requirement is deliberately absent: it is
// satisfied only by saving the My Soko Action Plan section (or, for
// Module 8, by submitting the vendor-circle record).
const ACTION_BY_KEY = {
  lesson_reviewed: 'acknowledge_lesson',
  core_reading_reviewed: 'acknowledge_core_reading',
  reflection_acknowledged: 'acknowledge_reflection',
};

const MODE_OPTIONS = ['private', 'fictional'];

/**
 * SokoModuleProgress — the completion requirements and completion control
 * for one Sauti za Soko module. The knowledge-check and activity
 * requirements are verified server-side and never self-attested here.
 */
export default function SokoModuleProgress({
  courseSlug,
  moduleRoute,
  completionRequirements,
  activityLabel,
  refreshTrigger = 0,
}) {
  const labels = useSokoLabels();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [completionPending, setCompletionPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [reflectionMode, setReflectionMode] = useState('private');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoProgress', { courseSlug, moduleRoute });
        if (!cancelled && res?.data) setProgress(res.data);
      } catch (_) {
        // Stays in the unavailable state.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [courseSlug, moduleRoute, refreshTrigger]);

  const requirements = Array.isArray(completionRequirements) ? completionRequirements : [];
  const completedKeys = progress?.completedKeys || [];
  const allComplete = requirements.length > 0 && requirements.every((_, i) => {
    const key = completionKeysFromProgress(progress, i);
    return key ? completedKeys.includes(key) : false;
  });

  async function handleMarkComplete(index) {
    const key = completionKeysFromProgress(progress, index);
    if (savingKey || !progress || !progress.eligibleToSave || !key) return;
    const action = ACTION_BY_KEY[key];
    if (!action) return;
    setSavingKey(key);
    setStatusMessage(null);
    try {
      const payload = { courseSlug, moduleRoute, action };
      if (key === 'reflection_acknowledged') payload.mode = reflectionMode;
      const res = await base44.functions.invoke('updateSokoProgress', payload);
      if (res?.data && Array.isArray(res.data.completedKeys)) {
        setProgress((prev) => (prev ? { ...prev, completedKeys: res.data.completedKeys } : prev));
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: labels.progressSaveError });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleCompleteModule() {
    if (completionPending || !progress || !progress.eligibleToSave) return;
    setCompletionPending(true);
    setStatusMessage(null);
    try {
      const res = await base44.functions.invoke('completeSokoModule', { courseSlug, moduleRoute });
      const data = res?.data || null;
      if (data && data.completed) {
        setProgress((prev) => (prev ? { ...prev, moduleCompleted: true, completedAt: data.completedAt } : prev));
        setStatusMessage({ type: 'success', text: labels.progressAllComplete });
      } else if (data && data.missingRequirement) {
        setStatusMessage({ type: 'error', text: data.missingRequirement });
      } else if (data && data.missing && data.missing.length > 0) {
        setStatusMessage({ type: 'error', text: labels.progressOutstanding });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: labels.progressCompleteError });
    } finally {
      setCompletionPending(false);
    }
  }

  if (loading) {
    return (
      <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.5)' }}>{labels.progressLoading}</p>
    );
  }

  if (!progress || !progress.eligibleToSave) {
    return (
      <div style={{ padding: '1.1rem 1.35rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(243,234,216,0.6)', fontSize: '0.88rem' }}>
          {labels.progressUnavailable}
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }} aria-live="polite" role="status">
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        {labels.progressPrivacyNote}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {requirements.map((item, i) => {
          const key = completionKeysFromProgress(progress, i);
          const isCompleted = key ? completedKeys.includes(key) : false;
          const isSelfAttested = key && !!ACTION_BY_KEY[key];
          const isKnowledgeCheck = key === 'knowledge_check_passed';
          const isActivity = key === 'activity_acknowledged';
          const label = isActivity && activityLabel ? activityLabel : item;
          return (
            <div
              key={`${key || i}`}
              style={{ ...requirementRowBase, border: `1px solid ${isCompleted ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
                <span aria-hidden="true" style={{ color: isCompleted ? '#e8b85b' : 'rgba(243,234,216,0.4)', fontSize: '0.9rem', fontWeight: 500 }}>
                  {isCompleted ? '\u2713' : '\u25CB'}
                </span>
                <span className="font-body" style={{ ...bodyText, margin: 0 }}>{label}</span>
              </div>

              {isSelfAttested && !isCompleted && key === 'reflection_acknowledged' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <select
                    value={reflectionMode}
                    onChange={(e) => setReflectionMode(e.target.value)}
                    disabled={savingKey === key}
                    style={SELECT_STYLE}
                    aria-label={`Response mode for: ${label}`}
                  >
                    {MODE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === 'private' ? labels.progressModePrivate : labels.progressModeFictional}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={savingKey === key}
                    onClick={() => handleMarkComplete(i)}
                    className="font-body"
                    style={{ ...markButtonBase, cursor: savingKey === key ? 'wait' : 'pointer', opacity: savingKey === key ? 0.6 : 1 }}
                  >
                    {savingKey === key ? labels.progressSaving : labels.progressMarkComplete}
                  </button>
                </div>
              )}

              {isSelfAttested && !isCompleted && key !== 'reflection_acknowledged' && (
                <button
                  type="button"
                  disabled={savingKey === key}
                  onClick={() => handleMarkComplete(i)}
                  className="font-body"
                  style={{ ...markButtonBase, cursor: savingKey === key ? 'wait' : 'pointer', opacity: savingKey === key ? 0.6 : 1 }}
                >
                  {savingKey === key ? labels.progressSaving : labels.progressMarkComplete}
                </button>
              )}

              {isSelfAttested && isCompleted && (
                <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {labels.progressCompleted}
                </span>
              )}

              {isKnowledgeCheck && (
                <span className="font-body" style={{ color: isCompleted ? '#e8b85b' : 'rgba(243,234,216,0.5)', fontSize: '0.72rem', letterSpacing: isCompleted ? '0.1em' : 0, textTransform: isCompleted ? 'uppercase' : 'none', fontStyle: isCompleted ? 'normal' : 'italic', fontWeight: isCompleted ? 500 : 300, whiteSpace: 'nowrap' }}>
                  {isCompleted ? labels.progressPassed : labels.progressVerifiedByCheck}
                </span>
              )}

              {isActivity && (
                <span className="font-body" style={{ color: isCompleted ? '#e8b85b' : 'rgba(243,234,216,0.5)', fontSize: '0.72rem', letterSpacing: isCompleted ? '0.1em' : 0, textTransform: isCompleted ? 'uppercase' : 'none', fontStyle: isCompleted ? 'normal' : 'italic', fontWeight: isCompleted ? 500 : 300, whiteSpace: 'nowrap' }}>
                  {isCompleted ? labels.progressSaved : labels.progressSaveSection}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button
          type="button"
          disabled={!allComplete || completionPending || progress.moduleCompleted}
          onClick={handleCompleteModule}
          className="font-body"
          style={{
            ...completeButtonBase,
            color: allComplete && !completionPending && !progress.moduleCompleted ? '#24150f' : 'rgba(243,234,216,0.4)',
            backgroundColor: allComplete && !completionPending && !progress.moduleCompleted ? '#e8b85b' : 'rgba(232,184,91,0.15)',
            cursor: allComplete && !completionPending && !progress.moduleCompleted ? 'pointer' : 'not-allowed',
          }}
        >
          {completionPending ? labels.progressSaving : labels.progressCompleteModule}
        </button>
      </div>

      {statusMessage && (
        <p
          className="font-body"
          role="alert"
          style={{ color: statusMessage.type === 'success' ? '#e8b85b' : '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}
        >
          {statusMessage.text}
        </p>
      )}

      {progress.moduleCompleted && !statusMessage && (
        <p className="font-body" style={{ color: '#e8b85b', marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem', fontStyle: 'italic' }}>
          {labels.progressAllComplete}
        </p>
      )}
    </div>
  );
}

/**
 * Pair a completion requirement (by position) with its server-side key.
 * The completion requirements array the server sends is generated in the
 * same order as the key list, so position is the mapping.
 */
function completionKeysFromProgress(progress, index) {
  const ORDER = [
    'lesson_reviewed',
    'core_reading_reviewed',
    'reflection_acknowledged',
    'knowledge_check_passed',
    'activity_acknowledged',
  ];
  if (!progress) return null;
  return ORDER[index] || null;
}