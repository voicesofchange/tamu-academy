import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * MhModuleCompletion — Module 1 closing section and completion requirements.
 *
 * CLOSING TEXT (verbatim from the Module 1 Base44 Content Pack):
 *   "Ubuntu changes the starting point of mental health education…"
 *
 * COMPLETION REQUIREMENTS (verbatim from the Module 1 Base44 Content Pack):
 *   1. Open or acknowledge the core media.
 *   2. Review the Tamu Academy explanation and case study.
 *   3. Complete the Community of Care Map or its offline version.
 *   4. Answer all five knowledge-check questions.
 *   5. Score at least 4 out of 5.
 *   6. Complete the private reflection or select the fictional alternative.
 *
 * PRIVACY:
 *   - No private content (worksheet entries, reflection text, scenario
 *     selections) is collected, transmitted, or displayed here.
 *   - This component shows only requirement status (met/unmet) derived
 *     from server-side records; it never infers completion from page-load,
 *     scrolling, or navigation.
 *   - No CourseEnrollment record is created or modified.
 *   - No course-level completion is written; Module 1 only.
 *   - No certificate or certificate eligibility is created.
 */

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const eyebrowStyle = {
  color: '#D4A12A',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const sectionHeadingStyle = {
  color: '#F5EFE0',
  fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
  fontWeight: 400,
  lineHeight: 1.3,
  margin: '0 0 1.25rem',
  fontFamily: "'Cormorant Garamond', Georgia, serif",
};

const dividerStyle = {
  width: '100%',
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(212,161,42,0.35) 30%, rgba(212,161,42,0.35) 70%, transparent)',
  margin: '3rem 0',
};

const requirementRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.85rem',
  padding: '0.85rem 0',
  borderBottom: '1px solid rgba(245,239,224,0.07)',
};

const checkIconStyle = (met) => ({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: met ? '2px solid rgba(95,172,115,0.7)' : '2px solid rgba(212,161,42,0.45)',
  background: met ? 'rgba(95,172,115,0.12)' : 'rgba(212,161,42,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2px',
});

const completeButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.85rem 2rem',
  background: 'rgba(212,161,42,0.12)',
  border: '1px solid rgba(212,161,42,0.5)',
  borderRadius: '2px',
  color: '#D4A12A',
  fontSize: '0.78rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};

const disabledButtonStyle = {
  ...completeButtonStyle,
  opacity: 0.35,
  cursor: 'not-allowed',
  background: 'rgba(245,239,224,0.04)',
  border: '1px solid rgba(245,239,224,0.2)',
  color: 'rgba(245,239,224,0.4)',
};

const completedBoxStyle = {
  padding: '1.75rem 2rem',
  border: '1px solid rgba(95,172,115,0.35)',
  borderRadius: '4px',
  backgroundColor: 'rgba(95,172,115,0.05)',
  marginTop: '1.5rem',
};

const errorBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(220,100,80,0.4)',
  borderRadius: '4px',
  backgroundColor: 'rgba(220,100,80,0.05)',
  marginTop: '1rem',
};

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
  marginTop: '1.5rem',
};

const upcomingBoxStyle = {
  padding: '1.75rem 2rem',
  border: '1px dashed rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
  marginTop: '2.5rem',
};

// Human-readable labels for each requirement, matching the content-pack wording.
const REQUIREMENT_LABELS = [
  {
    key: 'core_media_acknowledged',
    label: 'Open or acknowledge the core media.',
    note: 'Full-watch verification is not claimed; acknowledgment is recorded after a deliberate action.',
  },
  {
    key: 'lesson_and_case_reviewed',
    label: 'Review the Tamu Academy explanation and case study.',
  },
  {
    key: 'activity_acknowledged',
    label: 'Complete the Community of Care Map or its offline version.',
    note: 'Offline and browser-local completion are permitted. No worksheet content is stored.',
  },
  {
    key: 'knowledge_check_answered',
    label: 'Answer all five knowledge-check questions.',
  },
  {
    key: 'knowledge_check_passed',
    label: 'Score at least 4 out of 5 on the knowledge check.',
  },
  {
    key: 'reflection_acknowledged',
    label: 'Complete the private reflection or select the fictional alternative.',
    note: 'No reflection content is stored. Only the acknowledgment timestamp is recorded.',
  },
];

function CheckIcon({ met }) {
  return (
    <div style={checkIconStyle(met)} aria-hidden="true">
      {met && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path d="M1 4L3.5 6.5L9 1" stroke="rgba(95,172,115,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function RequirementRow({ reqKey, label, note, status }) {
  const met = status && status[reqKey] === true;
  return (
    <div style={requirementRowStyle}>
      <CheckIcon met={met} />
      <div>
        <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: note ? '0.3rem' : 0 }}>
          {label}
        </p>
        {note && (
          <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.84rem', color: 'rgba(245,239,224,0.48)', fontStyle: 'italic' }}>
            {note}
          </p>
        )}
      </div>
      <span
        className="font-body"
        style={{
          marginLeft: 'auto',
          flexShrink: 0,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 500,
          color: met ? 'rgba(95,172,115,0.75)' : 'rgba(245,239,224,0.35)',
          paddingTop: '2px',
        }}
        aria-label={met ? 'Complete' : 'Incomplete'}
      >
        {met ? 'Done' : 'Pending'}
      </span>
    </div>
  );
}

export default function MhModuleCompletion({ courseSlug, moduleRoute }) {
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [requirements, setRequirements] = useState(null);
  const [completedAt, setCompletedAt] = useState(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [error, setError] = useState(null);

  const allMet =
    requirements &&
    REQUIREMENT_LABELS.every((r) => requirements[r.key] === true);

  async function handleCheck() {
    if (loadingCheck || loadingComplete) return;
    setLoadingCheck(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('completeMentalHealthModule', {
        courseSlug,
        moduleRoute,
      });
      const data = res.data;
      if (data.completed) {
        setCompletedAt(data.completedAt);
        setAlreadyCompleted(!!data.alreadyCompleted);
        setRequirements(
          REQUIREMENT_LABELS.reduce((acc, r) => ({ ...acc, [r.key]: true }), {})
        );
      } else if (data.requirements) {
        setRequirements(data.requirements);
        setCompletedAt(null);
        setAlreadyCompleted(false);
      } else {
        setError('Unable to retrieve requirement status. Please try again.');
      }
    } catch (err) {
      setError('Could not check requirements. Please try again.');
    } finally {
      setLoadingCheck(false);
    }
  }

  async function handleComplete() {
    if (loadingCheck || loadingComplete || !allMet) return;
    setLoadingComplete(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('completeMentalHealthModule', {
        courseSlug,
        moduleRoute,
      });
      const data = res.data;
      if (data.completed) {
        setCompletedAt(data.completedAt);
        setAlreadyCompleted(!!data.alreadyCompleted);
        if (data.requirements) setRequirements(data.requirements);
      } else {
        // Requirements changed between check and submit — refresh status.
        if (data.requirements) setRequirements(data.requirements);
        setError('Not all requirements are satisfied. Please review and try again.');
      }
    } catch (err) {
      setError('Could not record completion. Please try again.');
    } finally {
      setLoadingComplete(false);
    }
  }

  return (
    <div>
      {/* ── Closing section ── */}
      <div id="closing-section" style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span className="font-body" style={eyebrowStyle}>Closing</span>
        </div>
        <h2 className="font-heading" style={sectionHeadingStyle}>
          Module 1 Closing
        </h2>

        {/* Closing text — verbatim from the Module 1 Base44 Content Pack */}
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
          Ubuntu changes the starting point of mental health education. Instead of asking only what is happening inside a person, it asks what is happening between people and around them.
        </p>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
          The strongest version of communal care does not demand silence or sacrifice without limits. It builds relationships in which people can be seen, supported, respected, and connected to appropriate help.
        </p>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
          In Module 2, learners examine stress, stigma, and strength narratives, including the ways expectations of toughness can protect identity while also making it harder to name pain or seek support.
        </p>

        {/* Final educational disclaimer — required at the end of the module */}
        <div style={disclaimerBoxStyle} aria-label="Educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Educational disclaimer
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.
          </p>
        </div>
      </div>

      <div style={dividerStyle} aria-hidden="true" />

      {/* ── Completion requirements ── */}
      <div id="completion-requirements">
        <div style={{ marginBottom: '0.5rem' }}>
          <span className="font-body" style={eyebrowStyle}>Complete</span>
        </div>
        <h2 className="font-heading" style={sectionHeadingStyle}>
          Module 1 Completion Requirements
        </h2>

        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Module 1 is complete when every requirement below is satisfied. Completion of Module 1 does not signify completion of the full course.
        </p>

        {/* Requirement list */}
        <div
          role="list"
          aria-label="Module 1 completion requirements"
          style={{ borderTop: '1px solid rgba(245,239,224,0.07)', marginBottom: '1.75rem' }}
        >
          {REQUIREMENT_LABELS.map((r) => (
            <RequirementRow
              key={r.key}
              reqKey={r.key}
              label={r.label}
              note={r.note}
              status={requirements}
            />
          ))}
        </div>

        {/* Completed state */}
        {completedAt && (
          <div style={completedBoxStyle} role="status" aria-live="polite">
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem', color: 'rgba(95,172,115,0.7)' }}>
              Module 1 complete
            </span>
            <p className="font-body" style={{ ...bodyText, margin: 0 }}>
              {alreadyCompleted
                ? 'Module 1 was already recorded as complete.'
                : 'Module 1 has been marked complete.'}{' '}
              This does not signify completion of the full course or eligibility for a certificate.
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={errorBoxStyle} role="alert" aria-live="assertive">
            <p className="font-body" style={{ ...bodyText, margin: 0, color: 'rgba(220,130,110,0.9)', fontSize: '0.9rem' }}>
              {error}
            </p>
          </div>
        )}

        {/* Controls */}
        {!completedAt && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
            {/* Check requirements */}
            <button
              type="button"
              onClick={handleCheck}
              disabled={loadingCheck || loadingComplete}
              aria-busy={loadingCheck}
              style={loadingCheck || loadingComplete ? disabledButtonStyle : completeButtonStyle}
            >
              {loadingCheck ? 'Checking…' : 'Check requirements'}
            </button>

            {/* Mark complete — only enabled when all requirements are met */}
            {requirements && (
              <button
                type="button"
                onClick={handleComplete}
                disabled={!allMet || loadingCheck || loadingComplete}
                aria-busy={loadingComplete}
                aria-disabled={!allMet}
                title={!allMet ? 'Complete all requirements before marking this module done' : undefined}
                style={!allMet || loadingCheck || loadingComplete ? disabledButtonStyle : completeButtonStyle}
              >
                {loadingComplete ? 'Recording…' : 'Mark Module 1 complete'}
              </button>
            )}
          </div>
        )}

        {/* Instruction for unmet requirements — shown only after a check */}
        {requirements && !allMet && !completedAt && (
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem', fontSize: '0.88rem', color: 'rgba(245,239,224,0.52)' }}>
            Complete all pending requirements above, then select "Check requirements" again before marking this module done.
          </p>
        )}

        {/* Upcoming notice — extended assignment, later modules, course completion, certificates */}
        <div style={upcomingBoxStyle} aria-label="Upcoming content">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
            Not yet available
          </span>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            The optional extended academic assignment, Modules 2 through 7, course completion, and certificates are not yet available.
          </p>
        </div>
      </div>
    </div>
  );
}