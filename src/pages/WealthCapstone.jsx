import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import WealthCapstoneForm from '@/components/courses/wealth/WealthCapstoneForm';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';

const COURSE = BUILDING_WEALTH_TOGETHER_COURSE;
const COURSE_PATH = `/courses/${COURSE.slug}`;

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

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

/**
 * The capstone project page. It opens once all nine modules are complete —
 * the same order the course material sets out — and links back to whatever
 * module is still outstanding when it is not.
 */
export default function WealthCapstone() {
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
        title={`Capstone Project | ${COURSE.title} | Tamu Academy`}
        description="Choose one of the three capstone options and submit the plan that closes the course."
        path={`${COURSE_PATH}/capstone`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={COURSE.pillar}
        track={COURSE.track}
        course={COURSE.title}
        coursePath={COURSE_PATH}
        moduleLabel="Capstone"
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          Capstone Project: Your Plan for Building Wealth Together
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '680px', margin: 0 }}>
          The capstone brings the course together in one practical document you can use in your own
          life. Choose the one option below that best fits your goals.
        </p>
      </header>

      {state.status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your capstone...</p>
        </div>
      )}

      {state.status === 'error' && (
        <PageSection eyebrow="Status" heading="Capstone Unavailable">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            We could not open your capstone at this time. Please try again later.
          </p>
          <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
            &larr; Return to Course
          </Link>
        </PageSection>
      )}

      {state.status === 'ready' && state.data && (
        <>
          {!state.data.hasEnrollment && (
            <PageSection eyebrow="Enrolment" heading="Start the Course First">
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                The capstone is saved against your enrollment. Start the course from the course page
                and it will be waiting for you here.
              </p>
              <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
                Go to the course page &rarr;
              </Link>
            </PageSection>
          )}

          {state.data.hasEnrollment && !state.data.allModulesCompleted && (
            <PageSection eyebrow="Before the capstone" heading="Finish the Nine Modules First">
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
                You have completed {state.data.completedCount} of {state.data.totalModules} modules.
                The capstone opens once every module is done, so the plan you write can draw on the
                whole course.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {(state.data.incompleteModules || []).map((m) => (
                  <Link key={m.route} to={`${COURSE_PATH}/${m.route}`} className="font-body tamu-nav-link" style={linkStyle}>
                    {m.number} &rarr;
                  </Link>
                ))}
              </div>
            </PageSection>
          )}

          {state.data.hasEnrollment && state.data.allModulesCompleted && (
            <PageSection eyebrow="Capstone" heading="Your Plan for Building Wealth Together">
              <WealthCapstoneForm courseSlug={COURSE.slug} canSave={state.data.hasEnrollment} />
              <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
                <Link to={`${COURSE_PATH}/completion`} className="font-body tamu-nav-link" style={{ ...linkStyle, marginRight: '0.75rem' }}>
                  Course progress &rarr;
                </Link>
                <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
                  &larr; Return to Course
                </Link>
              </div>
            </PageSection>
          )}
        </>
      )}
    </PageLayout>
  );
}