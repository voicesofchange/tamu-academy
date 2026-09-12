import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const COURSE_SLUG = 'mental-health-community-and-culture';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };

const moduleLinkStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#e8b85b', fontSize: '0.78rem', letterSpacing: '0.04em',
  textDecoration: 'none', fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)', borderRadius: '2px', padding: '0.55rem 1.1rem',
  transition: 'color 0.25s ease, borderColor 0.25s ease',
};

const completionButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  color: '#24150f', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 600, textDecoration: 'none', border: 'none', borderRadius: '2px',
  padding: '0.85rem 1.75rem', backgroundColor: '#e8b85b', cursor: 'pointer',
  transition: 'background-color 0.25s ease',
};

const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

const CONTENT = {
  courseCompletion: 'Course Completion',
  heading: 'Your Progress Through the Course',
  intro: 'This page reviews your progress across all seven modules of {courseTitle}. When every module is complete, you will be able to generate your certificate of completion.',
  loadingProgress: 'Loading your progress...',
  errorEyebrow: 'Status',
  errorHeading: 'Progress Unavailable',
  errorMsg: 'We could not load your course progress at this time. Please try again later.',
  returnToCourse: 'Return to Course',
  overviewEyebrow: 'Overview',
  overviewHeading: 'Course Progress Summary',
  modulesCompleted: 'Modules completed',
  ofTotal: '{count} of {total}',
  completedAll: 'You have completed all seven modules. You are eligible to receive your certificate of completion.',
  completedSome: 'You have completed {completed} of {total} modules. Complete the remaining modules to earn your certificate.',
  modulesEyebrow: 'Modules',
  modulesHeading: 'Module Status',
  completed: 'Completed',
  notYetCompleted: 'Not yet completed',
  continue: 'Continue',
  review: 'Review',
  recapEyebrow: 'Recap',
  recapHeading: 'What You Have Learned',
  recapBody: 'Across seven modules, you explored relational philosophies of personhood, stress and stigma, family expectations, community healing programs, faith and clinical care, culturally affirming systems, and storytelling for collective healing.',
  recapDisclaimer: 'This course provided general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. If you or someone you know is in distress, contact a qualified professional or emergency service in your country or institution.',
  privacyEyebrow: 'Privacy',
  privacyHeading: 'About Your Certificate',
  certInfo: 'Your certificate of completion will display your verified profile name, the course title, and the completion date. It will include a unique certificate identifier.',
  certPrivacy: 'Private reflections, personal stories, activity responses, knowledge check answers, and any other learner writing are not included in the certificate. The certificate confirms course completion only.',
  certEyebrow: 'Certificate',
  certHeading: 'Certificate of Completion',
  eligibleMsg: 'You have completed all seven modules. You are eligible to receive your certificate of completion for {courseTitle}.',
  viewCertificate: 'View Your Certificate',
  notEligibleMsg: 'Your certificate will be available once you have completed all seven modules.',
  modulesRemaining: 'Modules remaining',
  backToModule: 'Back to Module 7',
};

export default function MhCourseCompletion() {
  const { content: c } = useTranslatedContent('mh-completion', CONTENT);
  const course = MENTAL_HEALTH_COURSE;
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthCourseCompletion', { courseSlug: COURSE_SLUG });
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
          <StatusBadge label={c.courseCompletion} />
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          {c.heading}
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '640px', marginBottom: '1.5rem' }}>
          {tpl(c.intro, { courseTitle: course.title })}
        </p>
      </header>

      {state.status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>{c.loadingProgress}</p>
        </div>
      )}

      {state.status === 'error' && (
        <PageSection eyebrow={c.errorEyebrow} heading={c.errorHeading}>
          <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.6)' }}>
            {c.errorMsg}
          </p>
          <Link to={coursePath} className="font-body" style={{ ...moduleLinkStyle, marginTop: '1.5rem', display: 'inline-flex' }}>
            &larr; {c.returnToCourse}
          </Link>
        </PageSection>
      )}

      {state.status === 'ready' && state.data && (() => {
        const { modules, completedCount, totalModules, courseCompleted, incompleteModules, certificateEligible } = state.data;
        const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

        return (
          <>
            <PageSection eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                  <span className="font-body" style={{ ...eyebrowStyle }}>{c.modulesCompleted}</span>
                  <span className="font-body" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 500 }}>
                    {tpl(c.ofTotal, { count: completedCount, total: totalModules })}
                  </span>
                </div>
                <div role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Course completion progress"
                  style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                {courseCompleted ? c.completedAll : tpl(c.completedSome, { completed: completedCount, total: totalModules })}
              </p>
            </PageSection>

            <PageSection eyebrow={c.modulesEyebrow} heading={c.modulesHeading}>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {modules.map((m) => (
                  <li key={m.route} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
                    padding: '1rem 1.25rem',
                    border: `1px solid ${m.completed ? 'rgba(232,184,91,0.3)' : 'rgba(243,234,216,0.08)'}`,
                    borderRadius: '4px',
                    backgroundColor: m.completed ? 'rgba(232,184,91,0.04)' : 'rgba(243,234,216,0.015)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 auto', minWidth: '200px' }}>
                      <span aria-hidden="true" style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '1.5rem', height: '1.5rem', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 600,
                        color: m.completed ? '#24150f' : 'rgba(243,234,216,0.5)',
                        backgroundColor: m.completed ? '#e8b85b' : 'rgba(243,234,216,0.06)',
                        border: m.completed ? 'none' : '1px solid rgba(243,234,216,0.15)', flexShrink: 0,
                      }}>
                        {m.completed ? '\u2713' : ''}
                      </span>
                      <div>
                        <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500, margin: 0 }}>
                          {m.number}: {m.title}
                        </p>
                        <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', margin: '0.3rem 0 0' }}>
                          {m.completed ? `${c.completed}${m.completedAt ? ' ' + new Date(m.completedAt).toLocaleDateString() : ''}` : c.notYetCompleted}
                        </p>
                      </div>
                    </div>
                    {!m.completed && (
                      <Link to={`${coursePath}/${m.route}`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                        {c.continue} &rarr;
                      </Link>
                    )}
                    {m.completed && (
                      <Link to={`${coursePath}/${m.route}`} className="font-body tamu-nav-link" style={{ ...moduleLinkStyle, borderColor: 'rgba(232,184,91,0.2)', color: 'rgba(232,184,91,0.6)' }}>
                        {c.review} &rarr;
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </PageSection>

            <PageSection eyebrow={c.recapEyebrow} heading={c.recapHeading}>
              <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{c.recapBody}</p>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>{c.recapDisclaimer}</p>
            </PageSection>

            <PageSection eyebrow={c.privacyEyebrow} heading={c.privacyHeading}>
              <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>{c.certInfo}</p>
                <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' }}>{c.certPrivacy}</p>
              </div>
            </PageSection>

            <PageSection eyebrow={c.certEyebrow} heading={c.certHeading}>
              {certificateEligible ? (
                <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)', textAlign: 'center' }}>
                  <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                    {tpl(c.eligibleMsg, { courseTitle: course.title })}
                  </p>
                  <Link to={`${coursePath}/certificate`} style={{ ...completionButtonStyle, textDecoration: 'none' }}>
                    {c.viewCertificate} &rarr;
                  </Link>
                </div>
              ) : (
                <div style={{ padding: '2rem 2.25rem', border: '1px dashed rgba(232,184,91,0.2)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                  <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>{c.notEligibleMsg}</p>
                  {incompleteModules && incompleteModules.length > 0 && (
                    <div>
                      <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>{c.modulesRemaining}</p>
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

            <nav aria-label="Course navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`${coursePath}/module-7`} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                  &larr; {c.backToModule}
                </Link>
                <Link to={coursePath} className="font-body tamu-nav-link" style={moduleLinkStyle}>
                  &larr; {c.returnToCourse}
                </Link>
              </div>
            </nav>
          </>
        );
      })()}
    </PageLayout>
  );
}