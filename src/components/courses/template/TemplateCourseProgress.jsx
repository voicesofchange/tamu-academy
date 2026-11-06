import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 };

const STEP_LABELS = {
  media: 'Watch or listen to the module\u2019s recorded material.',
  lesson: 'Read the lesson and follow the worked example.',
  activity: 'Complete the Try it activity.',
  scenario: 'Work through the scenario and write your position.',
  knowledge_check: 'Pass the knowledge check.',
  reflection: 'Write your reflection.',
};

const actionStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  color: '#e8b85b',
  fontSize: '0.68rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.4rem 0.85rem',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const completeStyle = {
  ...actionStyle,
  color: '#24150f',
  backgroundColor: '#e8b85b',
  border: '1px solid #e8b85b',
  fontWeight: 600,
  padding: '0.6rem 1.4rem',
};

/**
 * TemplateCourseProgress — the completion requirements of one template course
 * module and the button that marks it complete.
 *
 * A requirement is either self-attested (a "Mark done" call to
 * updateTemplateCourseProgress) or the knowledge check, which only the grader
 * can satisfy. "Mark this module complete" is decided server-side: an
 * outstanding step comes back in `missing` and the module is not completed.
 */
export default function TemplateCourseProgress({ courseSlug, moduleRoute, requirements, progress, onRefresh }) {
  const [busy, setBusy] = useState(null);
  const [note, setNote] = useState(null);
  const [missing, setMissing] = useState([]);

  const completed = new Set((progress && progress.completedSteps) || []);
  const canSave = !!(progress && progress.canRecordProgress);

  async function markStep(step) {
    setBusy(step);
    setNote(null);
    setMissing([]);
    try {
      const res = await base44.functions.invoke('updateTemplateCourseProgress', {
        courseSlug,
        moduleRoute,
        action: 'complete_step',
        step,
      });
      const data = res && res.data ? res.data : null;
      setNote(data && data.progressSaved === false ? 'This module is not open for saved progress yet.' : 'Step recorded.');
      if (onRefresh) await onRefresh();
    } catch (err) {
      setNote('We could not save that step just now. Please try again.');
    } finally {
      setBusy(null);
    }
  }

  async function markComplete() {
    setBusy('complete');
    setNote(null);
    setMissing([]);
    try {
      const res = await base44.functions.invoke('completeTemplateCourseModule', { courseSlug, moduleRoute });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) setNote('This module is complete.');
      else if (data && Array.isArray(data.missing)) setMissing(data.missing);
      else setNote('We could not complete the module just now. Please try again.');
      if (onRefresh) await onRefresh();
    } catch (err) {
      setNote('We could not complete the module just now. Please try again.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      {!canSave && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          This module is a preview, so your progress is not being saved.
        </p>
      )}

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {requirements.map((step) => {
          const done = completed.has(step);
          return (
            <li
              key={step}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                padding: '0.9rem 1.1rem',
                border: `1px solid ${done ? 'rgba(232,184,91,0.3)' : 'rgba(243,234,216,0.1)'}`,
                borderRadius: '4px',
                backgroundColor: done ? 'rgba(232,184,91,0.04)' : 'rgba(243,234,216,0.015)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', flex: '1 1 240px' }}>
                <span aria-hidden="true" style={{ color: done ? '#e8b85b' : 'rgba(243,234,216,0.4)', flexShrink: 0 }}>
                  {done ? '\u2713' : '\u25CB'}
                </span>
                <span className="font-body" style={{ ...bodyText, margin: 0 }}>
                  {STEP_LABELS[step] || step.replace(/_/g, ' ')}
                </span>
              </div>
              {!done && step !== 'knowledge_check' && canSave && (
                <button
                  type="button"
                  onClick={() => markStep(step)}
                  disabled={busy === step}
                  style={{ ...actionStyle, opacity: busy === step ? 0.6 : 1 }}
                >
                  {busy === step ? 'Saving...' : 'Mark done'}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {note && (
        <p className="font-body" style={{ ...bodyText, marginTop: '1rem', color: 'rgba(232,184,91,0.85)' }}>{note}</p>
      )}

      {missing.length > 0 && (
        <p className="font-body" role="alert" style={{ ...bodyText, marginTop: '1rem', color: '#e8955c' }}>
          This module still needs: {missing.join(', ').replace(/_/g, ' ')}.
        </p>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        {progress && progress.completed ? (
          <p className="font-body" style={{ ...bodyText, color: '#e8b85b', margin: 0 }}>
            This module is complete.
          </p>
        ) : (
          <button
            type="button"
            onClick={markComplete}
            disabled={busy === 'complete' || !canSave}
            style={{
              ...completeStyle,
              opacity: busy === 'complete' || !canSave ? 0.6 : 1,
              cursor: busy === 'complete' || !canSave ? 'not-allowed' : 'pointer',
            }}
          >
            {busy === 'complete' ? 'Checking...' : 'Mark this module complete'}
          </button>
        )}
      </div>
    </div>
  );
}