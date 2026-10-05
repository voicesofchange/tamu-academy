import React from 'react';

/**
 * WaiyakiModuleProgress — the module's own progress panel.
 *
 * A module is complete when all three keys are satisfied on the learner's
 * progress row: the narrative read, the source analysis worked through, and
 * the reflection prompts answered. The final step becomes available only when
 * the server reports the three keys, so the button can never assert
 * completion on its own.
 */
const REQUIREMENTS = [
  { key: 'lesson_reviewed', label: 'Read the module narrative and key terms' },
  { key: 'source_analysis_acknowledged', label: 'Work through the source-analysis exercise' },
  { key: 'reflection_acknowledged', label: 'Respond to the reflection prompts' },
];

export default function WaiyakiModuleProgress({
  completedKeys,
  moduleCompleted,
  completedCount,
  totalModules,
  canSave,
  saving,
  onComplete,
  onAcknowledgeLesson,
  message,
}) {
  const keys = completedKeys || [];
  const allDone = REQUIREMENTS.every((item) => keys.includes(item.key));
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <section
      style={{
        padding: '1.75rem 2rem',
        border: '1px solid rgba(232,184,91,0.28)',
        borderRadius: '4px',
        backgroundColor: 'rgba(232,184,91,0.03)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '0.6rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Course progress
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500 }}>
            {completedCount} of {totalModules} modules complete
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(243,234,216,0.08)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPct}%`,
              height: '100%',
              backgroundColor: '#e8b85b',
              borderRadius: '3px',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>

      <h2
        className="font-heading"
        style={{ color: '#f8f0df', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 1rem' }}
      >
        This module is complete when
      </h2>
      <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0 }}>
        {REQUIREMENTS.map((item) => {
          const done = keys.includes(item.key);
          return (
            <li
              key={item.key}
              className="font-body"
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                padding: '0.6rem 0',
                borderTop: '1px solid rgba(232,184,91,0.14)',
                color: done ? '#e8b85b' : 'rgba(243,234,216,0.78)',
                fontSize: '0.94rem',
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              <span aria-hidden="true" style={{ minWidth: '1rem' }}>
                {done ? '\u2713' : '\u25CB'}
              </span>
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {!keys.includes('lesson_reviewed') && canSave && (
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={onAcknowledgeLesson}
            disabled={saving}
            className="font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#e8b85b',
              backgroundColor: 'transparent',
              border: '1px solid rgba(232,184,91,0.5)',
              borderRadius: '2px',
              padding: '0.6rem 1.2rem',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: saving ? 'wait' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            I have read this module
          </button>
        </div>
      )}

      {moduleCompleted ? (
        <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.92rem', margin: 0 }}>
          Module complete. Continue to the next module below.
        </p>
      ) : canSave ? (
        <button
          type="button"
          onClick={onComplete}
          disabled={saving || !allDone}
          className="font-body"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: allDone ? '#24150f' : 'rgba(243,234,216,0.45)',
            backgroundColor: allDone ? '#e8b85b' : 'rgba(243,234,216,0.06)',
            border: allDone ? 'none' : '1px solid rgba(243,234,216,0.15)',
            borderRadius: '2px',
            padding: '0.75rem 1.6rem',
            fontSize: '0.76rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: saving ? 'wait' : allDone ? 'pointer' : 'not-allowed',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving...' : 'Mark this module complete'}
        </button>
      ) : (
        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.88rem', margin: 0, fontStyle: 'italic' }}
        >
          Enroll in the course to save your progress and complete this module.
        </p>
      )}

      {message && (
        <p
          className="font-body"
          role="status"
          style={{
            margin: '1rem 0 0',
            fontSize: '0.88rem',
            color: message.type === 'error' ? '#e8955c' : '#e8b85b',
          }}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}