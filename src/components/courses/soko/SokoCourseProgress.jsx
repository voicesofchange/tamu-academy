import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { SAUTI_ZA_SOKO_COURSE_SLUG } from '@/lib/sauti-za-soko-tracks';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

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
  cursor: 'pointer',
  fontFamily: 'inherit',
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
  background: 'transparent',
};

const dashedBox = {
  padding: '1.5rem 1.75rem',
  border: '1px dashed rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
};

/**
 * SokoCourseProgress — the learner's position in the Sauti za Soko core
 * course, including the course-level requirements that sit outside module
 * completion. Used on the course overview page.
 */
export default function SokoCourseProgress({ courseSlug = SAUTI_ZA_SOKO_COURSE_SLUG }) {
  const labels = useSokoLabels();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getSokoCourseCompletion', { courseSlug });
      setProgress(res && res.data ? res.data : null);
    } catch (err) {
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, [courseSlug]);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  async function handleEnroll() {
    if (enrolling) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await base44.functions.invoke('enrollSokoCourse', { courseSlug });
      await fetchProgress();
    } catch (err) {
      setEnrollError(labels.courseEnrollError);
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
          {labels.courseProgressLoading}
        </p>
      </div>
    );
  }

  if (progress && !progress.hasEnrollment) {
    return (
      <div style={dashedBox} aria-live="polite">
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
          {labels.courseEnrollBody}
        </p>
        <button
          type="button"
          disabled={enrolling}
          onClick={handleEnroll}
          className="font-body"
          style={{ ...primaryButtonStyle, opacity: enrolling ? 0.6 : 1, cursor: enrolling ? 'wait' : 'pointer' }}
        >
          {enrolling ? labels.courseEnrolling : labels.courseEnroll}
        </button>
        {enrollError && (
          <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>
            {enrollError}
          </p>
        )}
      </div>
    );
  }

  if (!progress) {
    return (
      <div style={dashedBox}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
          {labels.courseSignIn}
        </p>
      </div>
    );
  }

  const completedCount = progress.completedCount || 0;
  const totalModules = progress.totalModules || 7;
  const pct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const firstIncomplete = progress.incompleteModules?.[0] || null;
  const resumeTarget = firstIncomplete
    ? `/courses/${courseSlug}/${firstIncomplete.route}`
    : `/courses/${courseSlug}/completion`;
  const resumeLabel = firstIncomplete
    ? `${labels.courseResumeAt} ${firstIncomplete.number}`
    : labels.courseReviewCompletion;
  const unmetRequirements = (progress.requirements || []).filter((r) => !r.met);

  return (
    <div aria-live="polite" role="status">
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {labels.courseOverallProgress}
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '1rem', fontWeight: 500 }}>
            {completedCount} {labels.ofWord} {totalModules} {labels.courseModulesWord}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}
        >
          <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Link to={resumeTarget} className="font-body" style={primaryButtonStyle}>
          {resumeLabel} &rarr;
        </Link>
        <Link to={`/courses/${courseSlug}/completion`} className="font-body" style={linkButtonStyle}>
          {labels.courseActionPlanLink} &rarr;
        </Link>
        {progress.certificateEligible && (
          <Link to={`/courses/${courseSlug}/certificate`} className="font-body" style={linkButtonStyle}>
            {labels.courseViewCertificate} &rarr;
          </Link>
        )}
      </div>

      {progress.courseCompleted ? (
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            {labels.courseCertificateReady}
          </p>
        </div>
      ) : (
        <div style={dashedBox}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem', fontSize: '0.9rem' }}>
            {labels.courseOutstandingIntro}
          </p>
          <ul className="font-body" style={{ ...bodyText, margin: '0 0 1rem', paddingLeft: '1.35rem', fontSize: '0.9rem' }}>
            {progress.incompleteModules.map((m) => (
              <li key={m.route} style={{ marginBottom: '0.35rem' }}>{m.number}: {m.title}</li>
            ))}
            {unmetRequirements.map((r, i) => (
              <li key={`${r.kind}-${r.route || i}`} style={{ marginBottom: '0.35rem' }}>{r.label}</li>
            ))}
          </ul>
          <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', margin: 0 }}>
            {labels.coursePeerNote}
          </p>
        </div>
      )}

      {progress.modulesComplete && (
        <div style={{ marginTop: '1.25rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
            {labels.courseOptionalNextStep}
          </span>
          <p className="font-body" style={{ ...bodyText, fontSize: '0.92rem', marginBottom: '0.85rem' }}>
            {labels.peerSummary}
          </p>
          <Link to={`/courses/${courseSlug}/peer-facilitator`} className="font-body" style={linkButtonStyle}>
            {labels.coursePeerTrackLink} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}