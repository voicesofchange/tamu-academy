import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 };

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
 * The completion requirements for one Building Wealth Together module.
 *
 * Each requirement is a self-attested step, except the concept check, which
 * is satisfied only by the server-side grader. "Mark this module complete" is
 * decided server-side: if a step is missing, the server returns the list of
 * outstanding steps and the module is not marked complete.
 */
const STEPS = [
  {
    key: 'core_media_reviewed',
    action: 'acknowledge_core_media',
    label: 'Watch the module\u2019s recorded material (or open the source and read the setup).',
  },
  {
    key: 'lesson_reviewed',
    action: 'acknowledge_lesson',
    label: 'Read the lesson and follow the worked example.',
  },
  {
    key: 'activity_acknowledged',
    action: 'acknowledge_activity',
    mode: 'browser_private',
    label: 'Complete the Try it activity.',
  },
  {
    key: 'dilemma_acknowledged',
    action: 'acknowledge_dilemma',
    label: 'Take a position on the dilemma and write your post.',
  },
  {
    key: 'knowledge_check_passed',
    action: null,
    label: 'Pass the three-question concept check.',
  },
  {
    key: 'reflection_acknowledged',
    action: 'acknowledge_reflection',
    mode: 'private',
    label: 'Write your reflection.',
  },
];

export default function WealthModuleProgress({ courseSlug, moduleRoute, refreshTrigger }) {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [busyKey, setBusyKey] = useState(null);
  const [missing, setMissing] = useState([]);
  const [note, setNote] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getWealthProgress', { courseSlug, moduleRoute });
      const data = res && res.data ? res.data : null;
      setState({ status: data ? 'ready' : 'error', data });
    } catch (err) {
      setState({ status: 'error', data: null });
    }
  }, [courseSlug, moduleRoute]);

  useEffect(() => { load(); }, [load, refreshTrigger]);

  const data = state.data;
  const completed = new Set((data && data.completedKeys) || []);
  const canSave = !!(data && data.eligibleToSave);

  async function acknowledge(step) {
    setBusyKey(step.key);
    setNote(null);
    setMissing([]);
    try {
      const payload = { courseSlug, moduleRoute, action: step.action };
      if (step.mode) payload.mode = step.mode;
      const res = await base44.functions.invoke('updateWealthProgress', payload);
      const result = res && res.data ? res.data : null;
      setNote(result && result.progressSaved === false
        ? 'This module is not open for saved progress yet.'
        : 'Step recorded.');
      await load();
    } catch (err) {
      setNote('We could not save that step just now. Please try again.');
    } finally {
      setBusyKey(null);
    }
  }

  async function markComplete() {
    setBusyKey('complete');
    setNote(null);
    setMissing([]);
    try {
      const res = await base44.functions.invoke('completeWealthModule', { courseSlug, moduleRoute });
      const result = res && res.data ? res.data : null;
      if (result && result.completed) {
        setNote('This module is complete.');
      } else if (result && Array.isArray(result.missing)) {
        setMissing(result.missing);
      } else {
        setNote('We could not complete the module just now. Please try again.');
      }
      await load();
    } catch (err) {
      setNote('We could not complete the module just now. Please try again.');
    } finally {
      setBusyKey(null);
    }
  }

  if (state.status === 'loading') {
    return (
      <div style={{ padding: '1.5rem 0' }}>
        <div style={{ width: '1.5rem', height: '1.5rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p className="font-body" style={{ ...bodyText, marginTop: '0.85rem' }}>Loading your module progress...</p>
      </div>
    );
  }

  if (state.status === 'error' || !data) {
    return (
      <p className="font-body" style={{ ...bodyText }}>
        We could not load your progress for this module. Reload the page to try again.
      </p>
    );
  }

  return (
    <div>
      {!data.enrolled && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Start the course to save your progress through this module.{' '}
          <Link to={`/courses/${courseSlug}`} className="tamu-nav-link" style={{ color: '#e8b85b' }}>
            Return to the course page
          </Link>{' '}
          to begin.
        </p>
      )}

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {STEPS.map((step) => {
          const done = completed.has(step.key);
          return (
            <li
              key={step.key}
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
                <span className="font-body" style={{ ...bodyText, margin: 0 }}>{step.label}</span>
              </div>
              {!done && step.action && canSave && (
                <button
                  type="button"
                  onClick={() => acknowledge(step)}
                  disabled={busyKey === step.key}
                  style={{ ...actionStyle, opacity: busyKey === step.key ? 0.6 : 1 }}
                >
                  {busyKey === step.key ? 'Saving...' : 'Mark done'}
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
        {data.moduleCompleted ? (
          <p className="font-body" style={{ ...bodyText, color: '#e8b85b', margin: 0 }}>
            This module is complete.
          </p>
        ) : (
          <button
            type="button"
            onClick={markComplete}
            disabled={busyKey === 'complete' || !canSave}
            style={{ ...completeStyle, opacity: busyKey === 'complete' || !canSave ? 0.6 : 1, cursor: busyKey === 'complete' || !canSave ? 'not-allowed' : 'pointer' }}
          >
            {busyKey === 'complete' ? 'Checking...' : 'Mark this module complete'}
          </button>
        )}
      </div>
    </div>
  );
}