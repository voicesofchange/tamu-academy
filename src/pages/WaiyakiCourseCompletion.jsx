import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import WaiyakiAssessment from '@/components/courses/waiyaki/WaiyakiAssessment';
import WaiyakiProjectForm from '@/components/courses/waiyaki/WaiyakiProjectForm';
import { WAIYAKI_COURSE, WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const COURSE_PATH = `/courses/${WAIYAKI_COURSE_SLUG}`;

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };

const moduleLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.1rem',
};

const completionButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#24150f',
  fontSize: '0.82rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.85rem 1.75rem',
  backgroundColor: '#e8b85b',
};

/**
 * WaiyakiCourseCompletion — the course completion room, laid out in the same
 * section order as every other Tamu Academy course: overview, module status,
 * then the work that closes the course, the certificate privacy note, and the
 * certificate itself.
 *
 * Two pieces of work close this course where others close with one: the
 * five-question final assessment and the written final project. Both open once
 * the five modules are complete, and both are verified server-side before a
 * certificate can be issued.
 */
export default function WaiyakiCourseCompletion() {
  const [progress, setProgress] = useState(null);
  const [work, setWork] = useState(null);
  const [status, setStatus] = useState('loading');

  const fetchAll = useCallback(async () => {
    try {
      const [completionRes, assessmentRes] = await Promise.all([
        base44.functions.invoke('getWaiyakiCourseCompletion', { courseSlug: WAIYAKI_COURSE_SLUG }),
        base44.functions.invoke('getWaiyakiAssessment', { courseSlug: WAIYAKI_COURSE_SLUG }),
      ]);
      const completion = completionRes?.data || null;
      setProgress(completion);
      setWork(assessmentRes?.data || null);
      setStatus(completion ? 'ready' : 'error');
    } catch (err) {
      setProgress(null);
      setWork(null);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const canSave = !!progress?.hasEnrollment;
  const modulesComplete = !!progress?.modulesComplete;

  const completedCount = progress?.completedCount || 0;
  const totalModules = progress?.totalModules || WAIYAKI_COURSE.modulesCount;
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <PageLayout>
      <PageMeta
        title={`Course Completion | ${WAIYAKI_COURSE.title} | Tamu Academy`}
        description="Review your progress across all five modules, take the final assessment and submit your written project to earn your certificate of completion."
        path={`${COURSE_PATH}/completion`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={WAIYAKI_COURSE.pillar}
        track={WAIYAKI_COURSE.track}
        course={WAIYAKI_COURSE.title}
        coursePath={COURSE_PATH}
        moduleLabel="Completion"
      />

      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label="Course Completion" />
        </div>
        <h1
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          Your Progress Through the Course
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '640px', margin: 0 }}>
          This page reviews your progress across all five modules of {WAIYAKI_COURSE.title}. When the
          modules are complete, the final assessment and your written project open here, and your
          certificate of completion follows.
        </p>
      </header>

      {status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              width: '2rem',
              height: '2rem',
              border: '2px solid rgba(232,184,91,0.2)',
              borderTopColor: '#e8b85b',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your progress...</p>
        </div>
      )}

      {status === 'error' && (
        <PageSection eyebrow="Status" heading="Progress Unavailable">
          <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.6)' }}>
            We could not load your course progress at this time. Please try again later.
          </p>
          <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={{ ...moduleLinkStyle, marginTop: '1.5rem' }}>
            &larr; Return to Course
          </Link>
        </PageSection>
      )}

      {status === 'ready' && progress && (
        <>
          <PageSection eyebrow="Overview" heading="Course Progress Summary">
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                <span className="font-body" style={eyebrowStyle}>Modules completed</span>
                <span className="font-body" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 500 }}>
                  {completedCount} of {totalModules}
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
            <p className="font-body" style={{ ...bodyText, margin: '0 0 1.75rem' }}>
              {modulesComplete
                ? 'You have completed all five modules. The final assessment and your written project are open below.'
                : `You have completed ${completedCount} of ${totalModules} modules. Complete the remaining modules to open the final assessment and your written project.`}
            </p>

            <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>What completion requires</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {progress.requirements.map((r) => (
                <div
                  key={r.kind}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.8rem 1rem',
                    border: `1px solid ${r.met ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)'}`,
                    borderRadius: '4px',
                  }}
                >
                  <span aria-hidden="true" style={{ color: r.met ? '#e8b85b' : 'rgba(243,234,216,0.4)' }}>
                    {r.met ? '\u2713' : '\u25CB'}
                  </span>
                  <span className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection eyebrow="Modules" heading="Module Status">
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {progress.modules.map((m) => (
                <li
                  key={m.route}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    padding: '1rem 1.25rem',
                    border: `1px solid ${m.completed ? 'rgba(232,184,91,0.3)' : 'rgba(243,234,216,0.08)'}`,
                    borderRadius: '4px',
                    backgroundColor: m.completed ? 'rgba(232,184,91,0.04)' : 'rgba(243,234,216,0.015)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 auto', minWidth: '200px' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: m.completed ? '#24150f' : 'rgba(243,234,216,0.5)',
                        backgroundColor: m.completed ? '#e8b85b' : 'rgba(243,234,216,0.06)',
                        border: m.completed ? 'none' : '1px solid rgba(243,234,216,0.15)',
                        flexShrink: 0,
                      }}
                    >
                      {m.completed ? '\u2713' : ''}
                    </span>
                    <div>
                      <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500, margin: 0 }}>
                        {m.number}: {m.title}
                      </p>
                      <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', margin: '0.3rem 0 0' }}>
                        {m.completed ? 'Completed' : 'Not yet completed'}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`${COURSE_PATH}/${m.route}`}
                    className="font-body tamu-nav-link"
                    style={m.completed ? { ...moduleLinkStyle, borderColor: 'rgba(232,184,91,0.2)', color: 'rgba(232,184,91,0.6)' } : moduleLinkStyle}
                  >
                    {m.completed ? 'Review' : 'Continue'} &rarr;
                  </Link>
                </li>
              ))}
            </ol>
          </PageSection>

          {modulesComplete ? (
            <>
              <PageSection eyebrow="Assessment" heading="Final Assessment">
                <WaiyakiAssessment
                  assessment={work?.assessment}
                  attempt={work?.attempt}
                  passRequired={work?.passRequired}
                  canSave={canSave}
                  onGraded={fetchAll}
                />
              </PageSection>

              <PageSection eyebrow="Project" heading="Your Written Project">
                <WaiyakiProjectForm
                  options={work?.projectOptions}
                  project={work?.project}
                  canSave={canSave}
                  onSaved={fetchAll}
                />
              </PageSection>
            </>
          ) : (
            <PageSection eyebrow="Assessment and Project" heading="Finish the Modules First">
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
                The final assessment and the written project open once all five modules are complete.
                That order matters: the assessment covers the whole course, and the project asks you to
                use the evidence labels you have practised.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {(progress.incompleteModules || []).map((m) => (
                  <Link key={m.route} to={`${COURSE_PATH}/${m.route}`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                    {m.number} &rarr;
                  </Link>
                ))}
              </div>
            </PageSection>
          )}

          <PageSection eyebrow="Privacy" heading="About Your Certificate">
            <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
              <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>
                Your certificate of completion will display your verified profile name, the course
                title, and the completion date. It will include a unique certificate identifier.
              </p>
              <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' }}>
                Private reflections, source-analysis notes, assessment answers, and your written
                project are not included in the certificate. The certificate confirms course
                completion only.
              </p>
            </div>
          </PageSection>

          <PageSection eyebrow="Certificate" heading="Certificate of Completion">
            {progress.certificateEligible ? (
              <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)', textAlign: 'center' }}>
                <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                  You have completed all five modules, passed the final assessment and submitted your
                  written project. You are eligible to receive your certificate of completion for{' '}
                  {WAIYAKI_COURSE.title}.
                </p>
                <Link to={`${COURSE_PATH}/certificate`} style={completionButtonStyle}>
                  View Your Certificate &rarr;
                </Link>
              </div>
            ) : (
              <div style={{ padding: '2rem 2.25rem', border: '1px dashed rgba(232,184,91,0.2)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                  Your certificate will be available once you have completed all five modules, passed
                  the final assessment and submitted your written project.
                </p>
              </div>
            )}
          </PageSection>

          <nav aria-label="Course navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={`${COURSE_PATH}/module-5`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                &larr; Back to Module 5
              </Link>
              <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                &larr; Return to Course
              </Link>
            </div>
          </nav>
        </>
      )}
    </PageLayout>
  );
}