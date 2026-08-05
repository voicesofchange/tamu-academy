import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#1A130E',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  backgroundColor: '#D4A12A',
};

const linkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#D4A12A',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(212,161,42,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};

const dashedBox = {
  padding: '1.5rem 1.75rem',
  border: '1px dashed rgba(212,161,42,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};

/**
 * EconomicsCourseProgress — learner progress + enrollment section for
 * the Understanding African Economies and the Global System course
 * overview. Mirrors the Mental Health overview's progress section.
 *
 * - Fetches getEconomicsCourseCompletion on mount.
 * - When the learner is not enrolled (hasEnrollment false), shows an
 *   enroll button that calls enrollEconomicsCourse, then refreshes.
 * - When enrolled, shows the overall progress bar, a resume link to the
 *   first incomplete module (or the completion page), a certificate
 *   link when eligible, and the list of incomplete modules.
 * - No personal reflections or activity responses are stored in the
 *   platform; the privacy note is shown to make that clear.
 */
export default function EconomicsCourseProgress({ courseSlug }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getEconomicsCourseCompletion', { courseSlug });
      if (res && res.data) setProgress(res.data);
      else setProgress(null);
    } catch (err) {
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, [courseSlug]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  async function handleEnroll() {
    if (enrolling) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await base44.functions.invoke('enrollEconomicsCourse', { courseSlug });
      await fetchProgress();
    } catch (err) {
      setEnrollError('Enrollment is not yet open for this course.');
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
          Loading your progress...
        </p>
      </div>
    );
  }

  // Not enrolled — show the enroll prompt.
  if (progress && !progress.hasEnrollment) {
    return (
      <div aria-live="polite" role="status">
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
            Enroll to begin tracking your progress across the six modules.
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
          <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', margin: '1rem 0 0' }}>
            No personal reflections or activity responses are stored in the platform.
          </p>
        </div>
      </div>
    );
  }

  // No progress data (not authenticated or error).
  if (!progress) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
          Enrollment is not yet open. Once the course launches, your position in the course, completed modules, and knowledge-check results will appear here. No personal reflections or activity responses are stored in the platform.
        </p>
      </div>
    );
  }

  // Enrolled — show progress.
  const completedCount = progress.completedCount || 0;
  const totalModules = progress.totalModules || 6;
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const firstIncomplete =
    progress.incompleteModules && progress.incompleteModules.length > 0
      ? progress.incompleteModules[0]
      : null;
  const resumeTarget = firstIncomplete
    ? `/courses/${courseSlug}/${firstIncomplete.route}`
    : `/courses/${courseSlug}/completion`;
  const resumeLabel = firstIncomplete ? `Resume at ${firstIncomplete.number}` : 'Review Course Completion';

  return (
    <div aria-live="polite" role="status">
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            Overall progress
          </span>
          <span className="font-body" style={{ color: '#F5EFE0', fontSize: '1rem', fontWeight: 500 }}>
            {completedCount} of {totalModules} modules
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          style={{ width: '100%', height: '6px', backgroundColor: 'rgba(245,239,224,0.08)', borderRadius: '3px', overflow: 'hidden' }}
        >
          <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#D4A12A', borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Link to={resumeTarget} className="font-body" style={primaryButtonStyle}>
          {resumeLabel} &rarr;
        </Link>
        {progress.certificateEligible && (
          <Link to={`/courses/${courseSlug}/certificate`} className="font-body" style={linkButtonStyle}>
            View Certificate &rarr;
          </Link>
        )}
      </div>

      {progress.certificateEligible ? (
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            You have completed all six modules. Your certificate of completion is available.
          </p>
        </div>
      ) : progress.incompleteModules && progress.incompleteModules.length > 0 ? (
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem', fontSize: '0.88rem' }}>
            Complete all six modules to earn your certificate of completion.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {progress.incompleteModules.map((m) => (
              <Link
                key={m.route}
                to={`/courses/${courseSlug}/${m.route}`}
                className="font-body"
                style={{
                  color: 'rgba(212,161,42,0.7)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  border: '1px solid rgba(212,161,42,0.25)',
                  borderRadius: '2px',
                  padding: '0.4rem 0.8rem',
                }}
              >
                {m.number} &rarr;
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
            Enrollment is not yet open. Once the course launches, your progress across modules will appear here.
          </p>
        </div>
      )}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', margin: '0.75rem 0 0' }}>
        No personal reflections or activity responses are stored in the platform.
      </p>
    </div>
  );
}