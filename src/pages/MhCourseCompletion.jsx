import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';

const COURSE_SLUG = 'mental-health-community-and-culture';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };

const moduleLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#D4A12A',
  fontSize: '0.78rem',
  letterSpacing: '0.04em',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.1rem',
  transition: 'color 0.25s ease, borderColor 0.25s ease',
};

const completionButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#1A130E',
  fontSize: '0.82rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.85rem 1.75rem',
  backgroundColor: '#D4A12A',
  cursor: 'pointer',
  transition: 'background-color 0.25s ease',
};

/**
 * MhCourseCompletion — the final course completion review page.
 * Shows all seven module statuses, overall progress, certificate
 * eligibility, and a link to generate the certificate when eligible.
 *
 * After Module 7, learners are directed here instead of immediately
 * generating a certificate. The page checks all seven modules,
 * links to any unfinished requirements, and provides a concise
 * learning recap.
 */
export default function MhCourseCompletion() {
  const course = MENTAL_HEALTH_COURSE;
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthCourseCompletion', {
          courseSlug: COURSE_SLUG,
        });
        if (cancelled) return;
        if (res && res.data) {
          setState({ status: 'ready', data: res.data, error: null });
        } else {
          setState({ status: 'error', data: null, error: 'No data returned' });
        }
      } catch (err) {
        if (cancelled) return;
        setState({ status: 'error', data: null, error: err && err.message ? err.message : 'Error loading progress' });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const coursePath = `/courses/${COURSE_SLUG}`;

  return (
    <PageLayout>
      <PageMeta
        title={`Course Completion | ${course.title} | Tamu Academy`}
        description="Review your progress across all seven modules and access your certificate of completion."
        path={`${coursePath}/completion`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.learningArea}
        track={course.title}
        course={course.title}
        coursePath={coursePath}
        moduleLabel="Completion"
      />

      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label="Course Completion" />
        </div>
        <h1
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          Your Progress Through the Course
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '640px', marginBottom: '1.5rem' }}>
          This page reviews your progress across all seven modules of {course.title}. When every module is complete, you will be able to generate your certificate of completion.
        </p>
      </header>

      {state.status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(212,161,42,0.2)', borderTopColor: '#D4A12A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your progress...</p>
        </div>
      )}

      {state.status === 'error' && (
        <PageSection eyebrow="Status" heading="Progress Unavailable">
          <p className="font-body" style={{ ...bodyText, color: 'rgba(245,239,224,0.6)' }}>
            We could not load your course progress at this time. Please try again later.
          </p>
          <Link to={coursePath} className="font-body" style={{ ...moduleLinkStyle, marginTop: '1.5rem', display: 'inline-flex' }}>
            &larr; Return to Course
          </Link>
        </PageSection>
      )}

      {state.status === 'ready' && state.data && (() => {
        const { modules, completedCount, totalModules, courseCompleted, incompleteModules, certificateEligible } = state.data;
        const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

        return (
          <>
            {/* Overall progress summary */}
            <PageSection eyebrow="Overview" heading="Course Progress Summary">
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                  <span className="font-body" style={{ ...eyebrowStyle }}>
                    Modules completed
                  </span>
                  <span className="font-body" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 500 }}>
                    {completedCount} of {totalModules}
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
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                {courseCompleted
                  ? 'You have completed all seven modules. You are eligible to receive your certificate of completion.'
                  : `You have completed ${completedCount} of ${totalModules} modules. Complete the remaining modules to earn your certificate.`}
              </p>
            </PageSection>

            {/* Per-module status list */}
            <PageSection eyebrow="Modules" heading="Module Status">
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                      border: `1px solid ${m.completed ? 'rgba(212,161,42,0.3)' : 'rgba(245,239,224,0.08)'}`,
                      borderRadius: '4px',
                      backgroundColor: m.completed ? 'rgba(212,161,42,0.04)' : 'rgba(245,239,224,0.015)',
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
                          color: m.completed ? '#1A130E' : 'rgba(245,239,224,0.5)',
                          backgroundColor: m.completed ? '#D4A12A' : 'rgba(245,239,224,0.06)',
                          border: m.completed ? 'none' : '1px solid rgba(245,239,224,0.15)',
                          flexShrink: 0,
                        }}
                      >
                        {m.completed ? '\u2713' : ''}
                      </span>
                      <div>
                        <p className="font-body" style={{ color: '#F5EFE0', fontSize: '0.92rem', fontWeight: 500, margin: 0 }}>
                          {m.number}: {m.title}
                        </p>
                        <p className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.78rem', margin: '0.3rem 0 0' }}>
                          {m.completed ? `Completed${m.completedAt ? ' ' + new Date(m.completedAt).toLocaleDateString() : ''}` : 'Not yet completed'}
                        </p>
                      </div>
                    </div>
                    {!m.completed && (
                      <Link to={`${coursePath}/${m.route}`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                        Continue &rarr;
                      </Link>
                    )}
                    {m.completed && (
                      <Link to={`${coursePath}/${m.route}`} className="font-body tamu-nav-link" style={{ ...moduleLinkStyle, borderColor: 'rgba(212,161,42,0.2)', color: 'rgba(212,161,42,0.6)' }}>
                        Review &rarr;
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </PageSection>

            {/* Learning recap */}
            <PageSection eyebrow="Recap" heading="What You Have Learned">
              <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
                Across seven modules, you explored relational philosophies of personhood, stress and stigma, family expectations, community healing programs, faith and clinical care, culturally affirming systems, and storytelling for collective healing.
              </p>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                This course provided general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. If you or someone you know is in distress, contact a qualified professional or emergency service in your country or institution.
              </p>
            </PageSection>

            {/* Privacy note about certificate */}
            <PageSection eyebrow="Privacy" heading="About Your Certificate">
              <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
                <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>
                  Your certificate of completion will display your verified profile name, the course title, and the completion date. It will include a unique certificate identifier.
                </p>
                <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.62)' }}>
                  Private reflections, personal stories, activity responses, knowledge check answers, and any other learner writing are not included in the certificate. The certificate confirms course completion only.
                </p>
              </div>
            </PageSection>

            {/* Certificate action */}
            <PageSection eyebrow="Certificate" heading="Certificate of Completion">
              {certificateEligible ? (
                <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)', textAlign: 'center' }}>
                  <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                    You have completed all seven modules. You are eligible to receive your certificate of completion for {course.title}.
                  </p>
                  <Link to={`${coursePath}/certificate`} style={{ ...completionButtonStyle, textDecoration: 'none' }}>
                    View Your Certificate &rarr;
                  </Link>
                </div>
              ) : (
                <div style={{ padding: '2rem 2.25rem', border: '1px dashed rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
                  <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
                    Your certificate will be available once you have completed all seven modules.
                  </p>
                  {incompleteModules && incompleteModules.length > 0 && (
                    <div>
                      <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>
                        Modules remaining
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {incompleteModules.map((m) => (
                          <Link key={m.route} to={`${coursePath}/${m.route}`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                            {m.number} &rarr;
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </PageSection>

            {/* Navigation */}
            <nav aria-label="Course navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`${coursePath}/module-7`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                  &larr; Back to Module 7
                </Link>
                <Link to={coursePath} className="font-body tamu-nav-link" style={moduleLinkStyle}>
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