import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import { useAuth } from '@/lib/AuthContext';
import SokoFinalReflection from '@/components/courses/soko/SokoFinalReflection';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';
import { SAUTI_ZA_SOKO_COURSE_SLUG, SAUTI_ZA_SOKO_COURSE } from '@/lib/sauti-za-soko-tracks';

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
  padding: '0.7rem 1.5rem',
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
};

const rowBase = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  padding: '0.7rem 1rem',
  borderRadius: '4px',
};

const COURSE_PATH = `/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}`;

/**
 * SokoCourseCompletion — the core-course completion page. It shows every
 * module and every course-level requirement, holds the final reflection,
 * and finalises the course once the server confirms everything is done.
 */
export default function SokoCourseCompletion() {
  const labels = useSokoLabels();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalizing, setFinalizing] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getSokoCourseCompletion', {
        courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
      });
      setProgress(res && res.data ? res.data : null);
    } catch (err) {
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  async function handleFinalize() {
    if (finalizing) return;
    setFinalizing(true);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('finalizeSokoCourse', {
        courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
      });
      const data = res?.data || null;
      if (data && data.completed) {
        setMessage({ type: 'success', text: labels.completionFinaliseSuccess });
        await fetchProgress();
      } else if (data) {
        const missing = [
          ...(data.missingModules || []),
          ...(data.missingRequirements || []),
        ];
        setMessage({ type: 'error', text: `${labels.completionOutstanding}: ${missing.join(', ')}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: labels.completionFinaliseError });
    } finally {
      setFinalizing(false);
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <PageMeta title="Course Completion | Tamu Academy" path={`${COURSE_PATH}/completion`} noindex />
        <div style={{ padding: '5rem 0', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>{labels.completionLoading}</p>
        </div>
      </PageLayout>
    );
  }

  const modules = progress?.modules || [];
  const requirements = progress?.requirements || [];
  const canSave = !isAdmin && !!progress?.hasEnrollment;

  return (
    <PageLayout>
      <PageMeta
        title="Course Completion | Tamu Academy"
        description="Complete your Sauti za Soko requirements and claim your certificate."
        path={`${COURSE_PATH}/completion`}
        noindex
      />
      <PageHero
        eyebrow={labels.completionEyebrow}
        heading={SAUTI_ZA_SOKO_COURSE.title}
        subheading={labels.completionSubheading}
      />

      <PageSection heading={labels.completionProgressHeading}>
        {!progress ? (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
            {labels.completionSignIn}
          </p>
        ) : (
          <>
            <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
              {progress.completedCount} {labels.ofWord} {progress.totalModules} {labels.completionModulesComplete}.
              {progress.hasEnrollment
                ? ` ${labels.completionEnrollmentActive}`
                : ` ${labels.completionNotEnrolled}`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {modules.map((m) => {
                const row = (
                  <>
                    <span aria-hidden="true" style={{ color: m.completed ? '#e8b85b' : 'rgba(243,234,216,0.4)', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.15rem' }}>
                      {m.completed ? '\u2713' : '\u25CB'}
                    </span>
                    <span className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>
                      {m.number}: {m.title}
                    </span>
                  </>
                );
                return m.completed ? (
                  <div key={m.route} style={{ ...rowBase, border: '1px solid rgba(232,184,91,0.4)' }}>{row}</div>
                ) : (
                  <Link key={m.route} to={`${COURSE_PATH}/${m.route}`} style={{ ...rowBase, border: '1px solid rgba(243,234,216,0.12)', textDecoration: 'none' }}>
                    {row}
                  </Link>
                );
              })}
            </div>

            <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.4rem', fontWeight: 400, margin: '0 0 1rem' }}>
              {labels.completionBeyondHeading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {requirements.map((r, i) => (
                <div key={`${r.kind}-${r.route || i}`} style={{ ...rowBase, border: `1px solid ${r.met ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)'}` }}>
                  <span aria-hidden="true" style={{ color: r.met ? '#e8b85b' : 'rgba(243,234,216,0.4)', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.15rem' }}>
                    {r.met ? '\u2713' : '\u25CB'}
                  </span>
                  <span className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>
                    {r.label}
                    {!r.met && r.kind === 'action_plan' && r.route && (
                      <>
                        {' '}
                        <Link to={`${COURSE_PATH}/${r.route}`} className="tamu-nav-link" style={{ color: '#e8b85b', textDecoration: 'none' }}>
                          {labels.completionOpenModule} &rarr;
                        </Link>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </PageSection>

      {progress?.hasEnrollment && (
        <PageSection heading={labels.completionReflectionHeading}>
          <SokoFinalReflection
            prompt={labels.completionReflectionPrompt}
            canSave={canSave}
            onSaved={fetchProgress}
          />
        </PageSection>
      )}

      {progress?.hasEnrollment && (
        <PageSection heading={labels.completionFinaliseHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            {labels.completionFinaliseBody}
          </p>
          {progress.courseCompleted ? (
            <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
              <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
                Your course is complete. You can view or download your certificate.
              </p>
              <Link to={`${COURSE_PATH}/certificate`} className="font-body" style={primaryButtonStyle}>
                {labels.completionViewCertificate} &rarr;
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleFinalize}
              disabled={finalizing}
              className="font-body"
              style={{ ...primaryButtonStyle, opacity: finalizing ? 0.6 : 1, cursor: finalizing ? 'wait' : 'pointer' }}
            >
              {finalizing ? labels.completionFinalising : labels.completionFinalise}
            </button>
          )}
          {message && (
            <p
              className="font-body"
              role="alert"
              style={{ ...bodyText, marginTop: '1.25rem', marginBottom: 0, color: message.type === 'success' ? '#e8b85b' : '#e8955c', fontSize: '0.92rem' }}
            >
              {message.text}
            </p>
          )}
          {progress.modulesComplete && !progress.courseCompleted && (
            <div style={{ marginTop: '1.5rem' }}>
              <Link to={`/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}/peer-facilitator`} className="font-body" style={linkButtonStyle}>
                {labels.completionPeerLink} &rarr;
              </Link>
            </div>
          )}
        </PageSection>
      )}
    </PageLayout>
  );
}