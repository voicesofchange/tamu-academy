import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#24150f',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  backgroundColor: '#e8b85b',
};

const linkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};

const dashedBox = {
  padding: '1.5rem 1.75rem',
  border: '1px dashed rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
};

/**
 * WaiyakiCourseProgress — the course-overview progress panel. It shows how far
 * the learner has come, where to resume, and their certificate link once the
 * five modules, the assessment and the written project are all done.
 */
export default function WaiyakiCourseProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getWaiyakiCourseCompletion', {
        courseSlug: WAIYAKI_COURSE_SLUG,
      });
      setProgress(res && res.data ? res.data : null);
    } catch (err) {
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  async function handleEnroll() {
    if (enrolling) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await base44.functions.invoke('enrollWaiyakiCourse', {
        courseSlug: WAIYAKI_COURSE_SLUG,
      });
      await fetchProgress();
    } catch (err) {
      setEnrollError('Enrollment is not open for this course right now.');
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
          Loading your progress...
        </p>
      </div>
    );
  }

  if (progress && !progress.hasEnrollment) {
    return (
      <div aria-live="polite" role="status">
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
            Enroll to begin the five modules, take the final assessment and submit your written project.
          </p>
          <button
            type="button"
            disabled={enrolling}
            onClick={handleEnroll}
            className="font-body"
            style={{ ...primaryButtonStyle, opacity: enrolling ? 0.6 : 1, cursor: enrolling ? 'wait' : 'pointer' }}
          >
            {enrolling ? 'Enrolling...' : 'Enroll in this course'}
          </button>
          {enrollError && (
            <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>
              {enrollError}
            </p>
          )}
          <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', margin: '1rem 0 0' }}>
            Your reflections stay private. No personal reflections or activity responses are stored on the platform.
          </p>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
          Sign in or create an account to track your progress through the five modules, the assessment and your written project.
        </p>
      </div>
    );
  }

  const completedCount = progress.completedCount || 0;
  const totalModules = progress.totalModules || 5;
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const firstIncomplete =
    progress.incompleteModules && progress.incompleteModules.length > 0
      ? progress.incompleteModules[0]
      : null;
  const resumeTarget = firstIncomplete
    ? `/courses/${WAIYAKI_COURSE_SLUG}/${firstIncomplete.route}`
    : `/courses/${WAIYAKI_COURSE_SLUG}/completion`;

  return (
    <div aria-live="polite" role="status">
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            Overall progress
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '1rem', fontWeight: 500 }}>
            {completedCount} of {totalModules} modules
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}
        >
          <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Link to={resumeTarget} className="font-body" style={primaryButtonStyle}>
          {firstIncomplete ? `Resume at ${firstIncomplete.number}` : 'Review course completion'} &rarr;
        </Link>
        {progress.certificateEligible && (
          <Link to={`/courses/${WAIYAKI_COURSE_SLUG}/certificate`} className="font-body" style={linkButtonStyle}>
            View Certificate &rarr;
          </Link>
        )}
      </div>

      {progress.certificateEligible ? (
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            You have completed all five modules, passed the final assessment and submitted your written project. Your certificate of completion is available.
          </p>
        </div>
      ) : progress.modulesComplete ? (
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 0.9rem', fontSize: '0.9rem' }}>
            All five modules are complete. Two steps remain in the completion room:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {progress.requirements.map((r) => (
              <li key={r.kind} className="font-body" style={{ ...bodyText, fontSize: '0.9rem', marginBottom: '0.4rem', color: r.met ? '#e8b85b' : 'rgba(243,234,216,0.78)' }}>
                {r.met ? '\u2713 ' : '\u25CB '}
                {r.label}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1.1rem' }}>
            <Link to={`/courses/${WAIYAKI_COURSE_SLUG}/completion`} className="font-body" style={linkButtonStyle}>
              Open the completion room &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem', fontSize: '0.88rem' }}>
            Complete all five modules to reach the final assessment and your written project.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {progress.incompleteModules.map((m) => (
              <Link
                key={m.route}
                to={`/courses/${WAIYAKI_COURSE_SLUG}/${m.route}`}
                className="font-body"
                style={{
                  color: 'rgba(232,184,91,0.75)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  border: '1px solid rgba(232,184,91,0.25)',
                  borderRadius: '2px',
                  padding: '0.4rem 0.8rem',
                }}
              >
                {m.number} &rarr;
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', margin: '0.75rem 0 0' }}>
        Your reflections stay private. No personal reflections or activity responses are stored on the platform.
      </p>
    </div>
  );
}