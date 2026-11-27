import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  myProgress: 'My Progress',
  seeEveryCourseAndModule: 'See every course and module at a glance',
  completedModulesCurrentStandingAnd: 'Completed modules, current standing and what comes next, for all of your courses in one view.',
  openMyProgress: 'Open my progress →',
  learnerHub: 'Learner Hub',
  objectivesHandbookAndSummaries: 'Objectives, handbook and summaries',
  whatEachCourseTeachesHow: 'What each course teaches, how to work through it, and summaries you can download for offline study.',
  openTheLearnerHub: 'Open the Learner Hub →',
};

const cardStyle = {
  display: 'block',
  padding: '1.9rem 2.15rem',
  border: '1px solid rgba(232,184,91,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(232,184,91,0.045)',
  textDecoration: 'none',
};

const eyebrowStyle = {
  color: '#e8b85b',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.5rem',
};

const headingStyle = {
  color: '#f8f0df',
  fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
  fontWeight: 400,
  lineHeight: 1.3,
  margin: '0 0 0.6rem',
};

const bodyStyle = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.9rem',
  lineHeight: 1.75,
  fontWeight: 300,
  margin: '0 0 0.6rem',
};

const ctaStyle = { color: '#e8b85b', fontSize: '0.8rem', letterSpacing: '0.04em', fontWeight: 500, margin: 0 };

/**
 * DashboardLearnerTools — the two learning-support destinations that sit
 * alongside the courses: the learner's own progress dashboard, and the
 * Learner Hub of objectives, handbook and downloadable summaries.
 */
export default function DashboardLearnerTools() {
  const { content: uiText } = useTranslatedContent('ui-components-dashboard-dashboardlearnertools', UI_TEXT);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
      <Link to="/my-progress" style={cardStyle}>
        <span className="font-body" style={eyebrowStyle}>{uiText.myProgress}</span>
        <h3 className="font-heading" style={headingStyle}>{uiText.seeEveryCourseAndModule}</h3>
        <p className="font-body" style={bodyStyle}>
          {uiText.completedModulesCurrentStandingAnd}
        </p>
        <p className="font-body" style={ctaStyle}>{uiText.openMyProgress}</p>
      </Link>

      <Link to="/learning-hub" style={cardStyle}>
        <span className="font-body" style={eyebrowStyle}>{uiText.learnerHub}</span>
        <h3 className="font-heading" style={headingStyle}>{uiText.objectivesHandbookAndSummaries}</h3>
        <p className="font-body" style={bodyStyle}>
          {uiText.whatEachCourseTeachesHow}
        </p>
        <p className="font-body" style={ctaStyle}>{uiText.openTheLearnerHub}</p>
      </Link>
    </div>
  );
}