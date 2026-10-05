import React from 'react';
import { Link } from 'react-router-dom';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.88rem',
  lineHeight: 1.7,
  fontWeight: 300,
};

const REQUIREMENTS = [
  { key: 'lesson_reviewed', label: 'Read the module narrative and key terms', action: 'acknowledge_lesson' },
  {
    key: 'source_analysis_acknowledged',
    label: 'Work through the source-analysis exercise',
    action: 'acknowledge_source_analysis',
  },
  {
    key: 'reflection_acknowledged',
    label: 'Respond to the reflection prompts',
    action: 'acknowledge_reflection',
  },
];

const requirementRowBase = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '0.7rem 1rem',
  borderRadius: '4px',
  flexWrap: 'wrap',
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

const statusLabelStyle = {
  color: '#e8b85b',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

/**
 * WaiyakiModuleProgress — the module's completion requirements, presented in
 * the same row-and-mark-complete form as every other Tamu Academy course.
 *
 * A module is complete when all three requirements are satisfied on the
 * learner's progress row. The final button becomes available only when the
 * server reports all three, so it can never assert completion on its own.
 */
export default function WaiyakiModuleProgress({
  completedKeys,
  moduleCompleted,
  canSave,
  savingKey,
  completing,
  onAcknowledge,
  onComplete,
  completionPath,
  message,
}) {
  const keys = completedKeys || [];
  const allDone = REQUIREMENTS.every((item) => keys.includes(item.key));

  return (
    <div aria-live="polite" role="status">
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
        Mark each requirement complete as you finish it. No personal reflections or written answers
        are stored on the platform; only your progress is saved.
      </p>

      {canSave ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {REQUIREMENTS.map((item) => {
              const isCompleted = keys.includes(item.key);
              const isSaving = savingKey === item.key;
              return (
                <div
                  key={item.key}
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
                      {item.label}
                    </span>
                  </div>
                  {isCompleted ? (
                    <span className="font-body" style={statusLabelStyle}>
                      Completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isSaving || !!savingKey}
                      onClick={() => onAcknowledge(item.key, item.action)}
                      className="font-body"
                      style={{
                        ...markButtonBase,
                        cursor: isSaving ? 'wait' : 'pointer',
                        opacity: isSaving || savingKey ? 0.6 : 1,
                      }}
                    >
                      {isSaving ? 'Saving...' : 'Mark complete'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            {moduleCompleted ? (
              <>
                <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                  Module complete. Your progress has been saved.
                </p>
                {completionPath && (
                  <p style={{ margin: '1rem 0 0' }}>
                    <Link
                      to={completionPath}
                      className="font-body"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#24150f',
                        backgroundColor: '#e8b85b',
                        fontSize: '0.82rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderRadius: '2px',
                        padding: '0.85rem 1.75rem',
                      }}
                    >
                      Final assessment and your written project &rarr;
                    </Link>
                  </p>
                )}
              </>
            ) : (
              <button
                type="button"
                disabled={!allDone || completing}
                onClick={onComplete}
                className="font-body"
                style={{
                  border: 'none',
                  padding: '0.7rem 1.7rem',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  fontFamily: 'inherit',
                  color: allDone && !completing ? '#24150f' : 'rgba(243,234,216,0.4)',
                  backgroundColor: allDone && !completing ? '#e8b85b' : 'rgba(232,184,91,0.15)',
                  cursor: allDone && !completing ? 'pointer' : 'not-allowed',
                }}
              >
                {completing ? 'Saving...' : 'Complete module'}
              </button>
            )}
          </div>
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
            style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(243,234,216,0.6)' }}
          >
            Your progress for this module will appear here once you are enrolled in the course and
            signed in.
          </p>
        </div>
      )}

      {message && (
        <p
          className="font-body"
          role="alert"
          style={{
            margin: '1rem 0 0',
            fontSize: '0.88rem',
            color: message.type === 'error' ? '#e8955c' : '#e8b85b',
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}