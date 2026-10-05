import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import WaiyakiAssessment from '@/components/courses/waiyaki/WaiyakiAssessment';
import WaiyakiProjectForm from '@/components/courses/waiyaki/WaiyakiProjectForm';
import { useAuth } from '@/lib/AuthContext';
import { WAIYAKI_COURSE, WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#24150f',
  fontSize: '0.8rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.85rem 1.75rem',
  backgroundColor: '#e8b85b',
};

const moduleLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.76rem',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.5rem 1rem',
};

const COURSE_PATH = `/courses/${WAIYAKI_COURSE_SLUG}`;

/**
 * WaiyakiCourseCompletion — the course completion room.
 *
 * It reviews the five modules, then holds the two pieces of work the course
 * requires: the five-question final assessment and the written final project.
 * Both appear only once the modules are complete, and both are verified
 * server-side before a certificate can be issued.
 */
export default function WaiyakiCourseCompletion() {
  const [progress, setProgress] = useState(null);
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAll = useCallback(async () => {
    try {
      const [completionRes, assessmentRes] = await Promise.all([
        base44.functions.invoke('getWaiyakiCourseCompletion', {
          courseSlug: WAIYAKI_COURSE_SLUG,
        }),
        base44.functions.invoke('getWaiyakiAssessment', {
          courseSlug: WAIYAKI_COURSE_SLUG,
        }),
      ]);
      setProgress(completionRes?.data || null);
      setWork(assessmentRes?.data || null);
    } catch (err) {
      setProgress(null);
      setWork(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const isAdmin = user?.role === 'admin';
  const canSave = !isAdmin && !!progress?.hasEnrollment;
  const modulesComplete = !!progress?.modulesComplete;

  if (loading) {
    return (
      <PageLayout>
        <PageMeta title="Course Completion | Tamu Academy" path={`${COURSE_PATH}/completion`} noindex />
        <div style={{ padding: '5rem 0', textAlign: 'center' }}>
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
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>
            Loading your course progress...
          </p>
        </div>
      </PageLayout>
    );
  }

  const modules = progress?.modules || [];
  const requirements = progress?.requirements || [];

  return (
    <PageLayout>
      <PageMeta
        title={`Course Completion | ${WAIYAKI_COURSE.title} | Tamu Academy`}
        description="Review your five modules, take the final assessment and submit your written project to earn your certificate."
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
        <h1
          className="font-heading"
          style={{
            color: '#f8f0df',
            fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            margin: '0 0 1rem',
          }}
        >
          Completing the course
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '640px', margin: 0 }}>
          The course is complete when all five modules are finished, the final assessment is passed,
          and your written project is submitted. Each of the three is checked on the server.
        </p>
      </header>

      {!progress ? (
        <PageSection heading="Progress unavailable">
          <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.6)' }}>
            We could not load your course progress at this time. Please try again later.
          </p>
          <Link to={COURSE_PATH} className="font-body" style={{ ...moduleLinkStyle, marginTop: '1.5rem' }}>
            &larr; Return to the course
          </Link>
        </PageSection>
      ) : (
        <>
          <PageSection
            eyebrow="Overview"
            heading={
              progress.completedCount === progress.totalModules
                ? 'All five modules complete'
                : `${progress.completedCount} of ${progress.totalModules} modules complete`
            }
          >
            <ol style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0 }}>
              {modules.map((m) => (
                <li
                  key={m.route}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    padding: '1rem 1.25rem',
                    marginBottom: '0.75rem',
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
                    <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500, margin: 0 }}>
                      {m.number}: {m.title}
                    </p>
                  </div>
                  <Link to={`${COURSE_PATH}/${m.route}`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                    {m.completed ? 'Review' : 'Continue'} &rarr;
                  </Link>
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {requirements.map((r) => (
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

          {modulesComplete ? (
            <>
              <PageSection eyebrow="Assessment" heading="Check your understanding">
                <WaiyakiAssessment
                  assessment={work?.assessment}
                  attempt={work?.attempt}
                  canSave={canSave}
                  onGraded={fetchAll}
                />
              </PageSection>

              <PageSection eyebrow="Final project" heading="Your written project">
                <WaiyakiProjectForm
                  options={work?.projectOptions}
                  project={work?.project}
                  canSave={canSave}
                  onSaved={fetchAll}
                />
              </PageSection>

              <PageSection eyebrow="Certificate" heading="Certificate of Completion">
                {progress.certificateEligible ? (
                  <div
                    style={{
                      padding: '2rem 2.25rem',
                      border: '1px solid rgba(232,184,91,0.3)',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(232,184,91,0.04)',
                      textAlign: 'center',
                    }}
                  >
                    <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                      You have completed all five modules, passed the final assessment and submitted
                      your written project. Your certificate of completion is ready.
                    </p>
                    <Link to={`${COURSE_PATH}/certificate`} style={{ ...primaryButtonStyle, textDecoration: 'none' }}>
                      View your certificate &rarr;
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '2rem 2.25rem',
                      border: '1px dashed rgba(232,184,91,0.2)',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(243,234,216,0.015)',
                    }}
                  >
                    <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                      Your certificate becomes available once the final assessment is passed and your
                      written project is submitted.
                    </p>
                  </div>
                )}
              </PageSection>
            </>
          ) : (
            <PageSection eyebrow="What comes next" heading="Finish the modules first">
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

          <nav aria-label="Course navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={`${COURSE_PATH}/module-5`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                &larr; Module 5
              </Link>
              <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                &larr; Course overview
              </Link>
            </div>
          </nav>
        </>
      )}
    </PageLayout>
  );
}