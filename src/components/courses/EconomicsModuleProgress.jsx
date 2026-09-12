import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.88rem',
  lineHeight: 1.7,
  fontWeight: 300,
};

const SELF_ATTESTED_KEYS = new Set([
  'core_media_reviewed',
  'lesson_reviewed',
  'reflection_acknowledged',
  'activity_acknowledged',
]);

const ACTION_BY_KEY = {
  core_media_reviewed: 'acknowledge_core_media',
  lesson_reviewed: 'acknowledge_lesson',
  reflection_acknowledged: 'acknowledge_reflection',
  activity_acknowledged: 'acknowledge_activity',
};

const MODE_OPTIONS_BY_KEY = {
  reflection_acknowledged: [
    { value: 'private' },
    { value: 'fictional' },
  ],
  activity_acknowledged: [
    { value: 'browser_private' },
    { value: 'offline' },
    { value: 'fictional' },
  ],
};

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

const modeSelectStyle = {
  padding: '0.35rem 0.6rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.85)',
  border: '1px solid rgba(232,184,91,0.25)',
  borderRadius: '2px',
  fontSize: '0.72rem',
  fontFamily: 'inherit',
};

const CONTENT = {
  privacyNote: 'No personal reflections or activity responses are stored in the platform. Mark each requirement complete as you finish it; the knowledge check is verified by the server.',
  loading: 'Loading...',
  saving: 'Saving…',
  markComplete: 'Mark complete',
  completed: 'Completed',
  verifiedByKnowledgeCheck: 'Verified by knowledge check',
  passed: 'Passed',
  completeModule: 'Complete module',
  moduleCompleteMsg: 'Module complete. Your progress has been saved.',
  errSave: 'We could not save your progress right now. Please try again.',
  errMissing: 'Some requirements are not yet complete.',
  errComplete: 'We could not complete this module right now. Please try again.',
  trackingUnavailable: 'Progress tracking is not yet available for this module. Once the module is published and you are enrolled, your completion status will appear here.',
  modeLabels: {
    private: 'Private',
    fictional: 'Fictional alternative',
    browser_private: 'In-browser (private)',
    offline: 'Offline',
  },
};

export default function EconomicsModuleProgress({
  courseSlug,
  moduleRoute,
  completionRequirements,
  refreshTrigger = 0,
}) {
  const { content: c } = useTranslatedContent('econ-module-progress', CONTENT);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [completionPending, setCompletionPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [modes, setModes] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getEconomicsProgress', {
          courseSlug,
          moduleRoute,
        });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data) setProgress(data);
      } catch (err) {
        // Progress fetch failed — UI stays in unavailable state
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseSlug, moduleRoute, refreshTrigger]);

  const allComplete =
    progress &&
    Array.isArray(progress.completionKeys) &&
    Array.isArray(progress.completedKeys) &&
    progress.completionKeys.every((k) => progress.completedKeys.includes(k));

  async function handleMarkComplete(key) {
    if (savingKey || !progress || !progress.eligibleToSave) return;
    setSavingKey(key);
    setStatusMessage(null);
    try {
      const payload = { courseSlug, moduleRoute, action: ACTION_BY_KEY[key] };
      if (MODE_OPTIONS_BY_KEY[key]) {
        payload.mode = modes[key] || MODE_OPTIONS_BY_KEY[key][0].value;
      }
      const res = await base44.functions.invoke('updateEconomicsProgress', payload);
      const data = res && res.data ? res.data : null;
      if (data && Array.isArray(data.completedKeys)) {
        setProgress((prev) =>
          prev ? { ...prev, completedKeys: data.completedKeys } : prev,
        );
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: c.errSave });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleCompleteModule() {
    if (completionPending || !progress || !progress.eligibleToSave) return;
    if (!allComplete || progress.moduleCompleted) return;
    setCompletionPending(true);
    setStatusMessage(null);
    try {
      const res = await base44.functions.invoke('completeEconomicsModule', {
        courseSlug,
        moduleRoute,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) {
        setProgress((prev) =>
          prev ? { ...prev, moduleCompleted: true, completedAt: data.completedAt } : prev,
        );
        setStatusMessage({ type: 'success', text: c.moduleCompleteMsg });
      } else if (data && data.missing) {
        setStatusMessage({ type: 'error', text: c.errMissing });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: c.errComplete });
    } finally {
      setCompletionPending(false);
    }
  }

  return (
    <div style={{ marginTop: '2rem' }} aria-live="polite" role="status">
      <p
        className="font-body"
        style={{
          ...bodyText,
          fontStyle: 'italic',
          color: 'rgba(243,234,216,0.6)',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
        }}
      >
        {c.privacyNote}
      </p>

      {loading ? (
        <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.5)' }}>
          {c.loading}
        </p>
      ) : progress && progress.eligibleToSave ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {completionRequirements.map((item, i) => {
              const key = progress.completionKeys[i];
              const isCompleted = progress.completedKeys.includes(key);
              const isSelfAttested = SELF_ATTESTED_KEYS.has(key);
              const isKnowledgeCheck = key === 'knowledge_check_passed';
              const modeOptions = MODE_OPTIONS_BY_KEY[key];
              return (
                <div
                  key={key}
                  style={{
                    ...requirementRowBase,
                    border: `1px solid ${
                      isCompleted ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)'
                    }`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        color: isCompleted ? '#e8b85b' : 'rgba(243,234,216,0.4)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                      aria-hidden="true"
                    >
                      {isCompleted ? '\u2713' : '\u25CB'}
                    </span>
                    <span className="font-body" style={{ ...bodyText, margin: 0 }}>
                      {item}
                    </span>
                  </div>
                  {isSelfAttested && !isCompleted && modeOptions && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <select
                        value={modes[key] || modeOptions[0].value}
                        onChange={(e) => setModes((prev) => ({ ...prev, [key]: e.target.value }))}
                        disabled={savingKey === key}
                        style={modeSelectStyle}
                        aria-label={`${c.markComplete}: ${item}`}
                      >
                        {modeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{c.modeLabels[opt.value] || opt.value}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={savingKey === key}
                        onClick={() => handleMarkComplete(key)}
                        className="font-body"
                        style={{
                          ...markButtonBase,
                          cursor: savingKey === key ? 'wait' : 'pointer',
                          opacity: savingKey === key ? 0.6 : 1,
                        }}
                      >
                        {savingKey === key ? c.saving : c.markComplete}
                      </button>
                    </div>
                  )}
                  {isSelfAttested && !isCompleted && !modeOptions && (
                    <button
                      type="button"
                      disabled={savingKey === key}
                      onClick={() => handleMarkComplete(key)}
                      className="font-body"
                      style={{
                        ...markButtonBase,
                        cursor: savingKey === key ? 'wait' : 'pointer',
                        opacity: savingKey === key ? 0.6 : 1,
                      }}
                    >
                      {savingKey === key ? c.saving : c.markComplete}
                    </button>
                  )}
                  {isSelfAttested && isCompleted && (
                    <span
                      className="font-body"
                      style={{
                        color: '#e8b85b',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.completed}
                    </span>
                  )}
                  {isKnowledgeCheck && !isCompleted && (
                    <span
                      className="font-body"
                      style={{
                        color: 'rgba(243,234,216,0.5)',
                        fontSize: '0.72rem',
                        fontStyle: 'italic',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.verifiedByKnowledgeCheck}
                    </span>
                  )}
                  {isKnowledgeCheck && isCompleted && (
                    <span
                      className="font-body"
                      style={{
                        color: '#e8b85b',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.passed}
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
                color:
                  allComplete && !completionPending && !progress.moduleCompleted
                    ? '#24150f'
                    : 'rgba(243,234,216,0.4)',
                backgroundColor:
                  allComplete && !completionPending && !progress.moduleCompleted
                    ? '#e8b85b'
                    : 'rgba(232,184,91,0.15)',
                cursor:
                  allComplete && !completionPending && !progress.moduleCompleted
                    ? 'pointer'
                    : 'not-allowed',
              }}
            >
              {completionPending ? c.saving : c.completeModule}
            </button>
          </div>

          {statusMessage && (
            <p
              className="font-body"
              role="alert"
              style={{
                color: statusMessage.type === 'success' ? '#e8b85b' : '#e8955c',
                marginTop: '1rem',
                marginBottom: 0,
                fontSize: '0.88rem',
              }}
            >
              {statusMessage.text}
            </p>
          )}

          {progress.moduleCompleted && !statusMessage && (
            <p
              className="font-body"
              style={{
                color: '#e8b85b',
                marginTop: '1rem',
                marginBottom: 0,
                fontSize: '0.9rem',
                fontStyle: 'italic',
              }}
            >
              {c.moduleCompleteMsg}
            </p>
          )}
        </>
      ) : (
        <div
          style={{
            padding: '1.1rem 1.35rem',
            border: '1px solid rgba(232,184,91,0.22)',
            borderRadius: '4px',
            backgroundColor: 'rgba(232,184,91,0.04)',
          }}
        >
          <p
            className="font-body"
            style={{
              ...bodyText,
              fontStyle: 'italic',
              margin: 0,
              color: 'rgba(243,234,216,0.6)',
              fontSize: '0.88rem',
            }}
          >
            {c.trackingUnavailable}
          </p>
        </div>
      )}
    </div>
  );
}