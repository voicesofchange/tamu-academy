import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import WealthCapstoneForm from '@/components/courses/wealth/WealthCapstoneForm';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  capstoneProjectYourPlanFor: 'Capstone Project: Your Plan for Building Wealth Together',
  theCapstoneBringsTheCourse: 'The capstone brings the course together in one practical document you can use in your own life. Choose the one option below that best fits your goals.',
  loadingYourCapstone: 'Loading your capstone…',
  status: 'Status',
  capstoneUnavailable: 'Capstone Unavailable',
  weCouldNotOpenYour: 'We could not open your capstone at this time. Please try again later.',
  returnToCourse: '← Return to the course',
  enrolment: 'Enrolment',
  startTheCourseFirst: 'Start the Course First',
  theCapstoneIsSavedAgainst: 'The capstone is saved against your enrollment. Start the course from the course page and it will be waiting for you here.',
  goToTheCoursePage: 'Go to the course page →',
  beforeTheCapstone: 'Before the capstone',
  finishTheNineModulesFirst: 'Finish the Nine Modules First',
  youHaveCompletedOfModules: 'You have completed {v0} of {v1} modules. The capstone opens once every module is done, so the plan you write can draw on the whole course.',
  capstone: 'Capstone',
  yourPlanForBuildingWealth: 'Your Plan for Building Wealth Together',
  courseProgress: 'Course progress →',
};

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
  const { content: uiText } = useTranslatedContent('ui-pages-wealthcapstone', UI_TEXT);
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
          {uiText.capstoneProjectYourPlanFor}
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '680px', margin: 0 }}>
          {uiText.theCapstoneBringsTheCourse}
        </p>
      </header>

      {state.status === 'loading' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>{uiText.loadingYourCapstone}</p>
        </div>
      )}

      {state.status === 'error' && (
        <PageSection eyebrow={uiText.status} heading={uiText.capstoneUnavailable}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            {uiText.weCouldNotOpenYour}
          </p>
          <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
            {uiText.returnToCourse}
          </Link>
        </PageSection>
      )}

      {state.status === 'ready' && state.data && (
        <>
          {!state.data.hasEnrollment && (
            <PageSection eyebrow={uiText.enrolment} heading={uiText.startTheCourseFirst}>
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
                {uiText.theCapstoneIsSavedAgainst}
              </p>
              <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
                {uiText.goToTheCoursePage}
              </Link>
            </PageSection>
          )}

          {state.data.hasEnrollment && !state.data.allModulesCompleted && (
            <PageSection eyebrow={uiText.beforeTheCapstone} heading={uiText.finishTheNineModulesFirst}>
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>{fillTemplate(uiText.youHaveCompletedOfModules, { v0: state.data.completedCount, v1: state.data.totalModules })}</p>
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
            <PageSection eyebrow={uiText.capstone} heading={uiText.yourPlanForBuildingWealth}>
              <WealthCapstoneForm courseSlug={COURSE.slug} canSave={state.data.hasEnrollment} />
              <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
                <Link to={`${COURSE_PATH}/completion`} className="font-body tamu-nav-link" style={{ ...linkStyle, marginRight: '0.75rem' }}>
                  {uiText.courseProgress}
                </Link>
                <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={linkStyle}>
                  {uiText.returnToCourse}
                </Link>
              </div>
            </PageSection>
          )}
        </>
      )}
    </PageLayout>
  );
}