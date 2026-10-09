import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';

const COURSE = BUILDING_WEALTH_TOGETHER_COURSE;
const COURSE_PATH = `/courses/${COURSE.slug}`;

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.1rem',
};

const completionButtonStyle = {
  ...linkStyle,
  color: '#24150f',
  backgroundColor: '#e8b85b',
  border: '1px solid #e8b85b',
  fontWeight: 600,
  padding: '0.8rem 1.7rem',
};

/**
 * The course completion room: progress across the nine modules, the capstone
 * that closes the course, the certificate privacy note, and the certificate
 * when it is available.
 */
export default function WealthCourseCompletion() {
  const [state, setState] = useState({ status: 'loading', data: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getWealthCourseCompletion', { courseSlug: COURSE.slug });
        const data = res && res.data ? res.data : null;
        if (!cancelled) setState({ status: data ? 'ready' : 'error', data });
      } catch (err) {
        if (!cancelled) setState({ status: 'error', data: null });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <PageLayout>
      <PageMeta
        title={`Course Completion | ${COURSE.title} | Tamu Academy`}
        description="Review your progress across all nine modules and your capstone, and access your certificate of completion."
        path={`${COURSE_PATH}/completion`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={COURSE.pillar}
        track={COURSE.track}
        course={COURSE.title}
        coursePath={COURSE_PATH}
        moduleLabel="Completion"
      />

      <header style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <StatusBadge label="Course Completion" />
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          Your Progress Through the Course
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '660px', margin: 0 }}>
          This page reviews your progress across all nine modules of {COURSE.title}. When every
          module is complete and your capstone is submitted, your certificate of completion follows.
        </p>
      </header>

      {state.status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your progress...</p>
        </div>
      )}

      {state.status === 'error' && (
        <PageSection eyebrow="Status" heading="Progress Unavailable">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            We could not load your course progress at this time. Please try again later.
          </p>
          <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
            &larr; Return to Course
          </Link>
        </PageSection>
      )}

      {state.status === 'ready' && state.data && (() => {
        const data = state.data;
        const percent = data.totalModules > 0 ? Math.round((data.completedCount / data.totalModules) * 100) : 0;

        const requirements = [
          { kind: 'modules', label: 'Complete all nine modules.', met: data.allModulesCompleted },
          { kind: 'capstone', label: 'Submit the capstone project.', met: data.capstone.submitted },
        ];

        return (
          <>
            <PageSection eyebrow="Overview" heading="Course Progress Summary">
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                  <span className="font-body" style={eyebrowStyle}>Modules completed</span>
                  <span className="font-body" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 500 }}>
                    {data.completedCount} of {data.totalModules}
                  </span>
                </div>
                <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course completion progress" style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${percent}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
              <p className="font-body" style={{ ...bodyText, margin: '0 0 1.75rem' }}>
                {data.courseCompleted
                  ? 'You have completed all nine modules and submitted your capstone. You are eligible to receive your certificate of completion.'
                  : `You have completed ${data.completedCount} of ${data.totalModules} modules. Finish the remaining steps to earn your certificate.`}
              </p>

              <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>What completion requires</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {requirements.map((r) => (
                  <div key={r.kind} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.8rem 1rem', border: `1px solid ${r.met ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)'}`, borderRadius: '4px' }}>
                    <span aria-hidden="true" style={{ color: r.met ? '#e8b85b' : 'rgba(243,234,216,0.4)' }}>{r.met ? '\u2713' : '\u25CB'}</span>
                    <span className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>{r.label}</span>
                  </div>
                ))}
              </div>
            </PageSection>

            <PageSection eyebrow="Modules" heading="Module Status">
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {data.modules.map((m) => (
                  <li key={m.route} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', padding: '1rem 1.25rem', border: `1px solid ${m.completed ? 'rgba(232,184,91,0.3)' : 'rgba(243,234,216,0.08)'}`, borderRadius: '4px', backgroundColor: m.completed ? 'rgba(232,184,91,0.04)' : 'rgba(243,234,216,0.015)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 auto', minWidth: '200px' }}>
                      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '1.5rem', height: '1.5rem', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 600, color: m.completed ? '#24150f' : 'rgba(243,234,216,0.5)', backgroundColor: m.completed ? '#e8b85b' : 'rgba(243,234,216,0.06)', border: m.completed ? 'none' : '1px solid rgba(243,234,216,0.15)', flexShrink: 0 }}>
                        {m.completed ? '\u2713' : ''}
                      </span>
                      <div>
                        <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500, margin: 0 }}>
                          {m.number}: {m.title}
                        </p>
                        <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', margin: '0.3rem 0 0' }}>
                          {m.trackLabel} — {m.completed ? 'Completed' : 'Not yet completed'}
                        </p>
                      </div>
                    </div>
                    <Link to={`${COURSE_PATH}/${m.route}`} className="font-body tamu-nav-link" style={m.completed ? { ...linkStyle, borderColor: 'rgba(232,184,91,0.2)', color: 'rgba(232,184,91,0.6)' } : linkStyle}>
                      {m.completed ? 'Review' : 'Continue'} &rarr;
                    </Link>
                  </li>
                ))}
              </ol>
            </PageSection>

            <PageSection eyebrow="Capstone" heading="Your Capstone Project">
              <div style={{ padding: '1.5rem 1.75rem', border: `1px solid ${data.capstone.submitted ? 'rgba(232,184,91,0.3)' : 'rgba(243,234,216,0.12)'}`, borderRadius: '4px', background: data.capstone.submitted ? 'rgba(232,184,91,0.04)' : 'rgba(243,234,216,0.015)' }}>
                <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
                  {data.capstone.submitted
                    ? `Submitted${data.capstone.submittedAt ? ` on ${new Date(data.capstone.submittedAt).toLocaleDateString()}` : ''}. You can still open it and revise your answers.`
                    : data.allModulesCompleted
                      ? 'The capstone is open. Choose one option and submit your plan to complete the course.'
                      : 'The capstone opens once all nine modules are complete.'}
                </p>
                <Link to={`${COURSE_PATH}/capstone`} className="font-body tamu-nav-link" style={linkStyle}>
                  {data.capstone.submitted ? 'Review your capstone' : 'Open the capstone'} &rarr;
                </Link>
              </div>
            </PageSection>

            <PageSection eyebrow="Privacy" heading="About Your Certificate">
              <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>
                  Your certificate of completion will display your verified profile name, the course
                  title, and the completion date. It will include a unique certificate identifier.
                </p>
                <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' }}>
                  Private reflections, activity responses, concept-check answers, and your capstone plan
                  are not included in the certificate. The certificate confirms course completion only.
                </p>
              </div>
            </PageSection>

            <PageSection eyebrow="Certificate" heading="Certificate of Completion">
              {data.certificateEligible ? (
                <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)', textAlign: 'center' }}>
                  <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                    You have completed all nine modules and submitted your capstone. You are eligible to
                    receive your certificate of completion for {COURSE.title}.
                  </p>
                  <Link to={`${COURSE_PATH}/certificate`} style={completionButtonStyle}>
                    View Your Certificate &rarr;
                  </Link>
                </div>
              ) : (
                <div style={{ padding: '2rem 2.25rem', border: '1px dashed rgba(232,184,91,0.2)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                  <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                    Your certificate will be available once you have completed all nine modules and
                    submitted your capstone project.
                  </p>
                </div>
              )}
            </PageSection>

            <nav aria-label="Course navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`${COURSE_PATH}/module-9`} className="font-body tamu-nav-link" style={linkStyle}>
                  &larr; Back to Module 9
                </Link>
                <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
                  &larr; Return to Course
                </Link>
              </div>
            </nav>
          </>
        );
      })()}
    </PageLayout>
  );
}