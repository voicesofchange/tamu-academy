import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

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
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const secondaryButtonStyle = {
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
  padding: '0.65rem 1.4rem',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const infoTextStyle = {
  color: 'rgba(243,234,216,0.62)',
  fontSize: '0.85rem',
  lineHeight: 1.65,
  fontWeight: 300,
  margin: '0 0 1rem',
  maxWidth: '560px',
};

const errorTextStyle = {
  color: '#e8955c',
  fontSize: '0.85rem',
  margin: '0.75rem 0 0',
};

/* Parchment-surface variants. Cards sit on a light background, where the
   gold-on-cream outline of the dark treatment would read too faintly. */
const secondaryButtonStyleLight = {
  ...secondaryButtonStyle,
  color: '#5f4531',
  border: '1px solid rgba(95,69,49,0.45)',
};

const infoTextStyleLight = {
  ...infoTextStyle,
  color: '#806b58',
};

const errorTextStyleLight = {
  ...errorTextStyle,
  color: '#a8442a',
};

const CONTENT = {
  starting: 'Starting...',
  startCourse: 'Start Course',
  enrollError: 'Unable to start this course right now. Please try again.',
  infoText: 'Create an account or sign in to begin this course, save your progress, and return whenever you are ready.',
  signInToStart: 'Sign In to Start',
  createAccount: 'Create Account',
};

const ENROLLMENT_FUNCTION_BY_SLUG = {
  'mental-health-community-and-culture': 'enrollMentalHealth',
  'understanding-african-economies-and-the-global-system': 'enrollEconomicsCourse',
  'building-wealth-together': 'enrollWealthCourse',
  'sauti-za-soko': 'enrollSokoCourse',
  'sauti-za-soko-peer-facilitator': 'enrollSokoCourse',
  'waiyaki-wa-hinga': 'enrollWaiyakiCourse',
};

/**
 * StartCourseButton — the enrollment action for a course.
 *
 * `compact` drops the explanatory line and tightens the buttons, for use
 * inside cards. `surface="light"` switches the outline button and error text
 * to the espresso-on-parchment palette. Both default to the full-size
 * dark-surface treatment used in the course heroes.
 */
export default function StartCourseButton({
  courseSlug,
  firstModuleRoute = 'module-1',
  compact = false,
  surface = 'dark',
}) {
  const { content: c } = useTranslatedContent('start-course-btn', CONTENT);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  const onLight = surface === 'light';
  const infoStyle = onLight ? infoTextStyleLight : infoTextStyle;
  const errorStyle = onLight ? errorTextStyleLight : errorTextStyle;
  const primaryStyle = compact ? { ...primaryButtonStyle, padding: '0.62rem 1.15rem' } : primaryButtonStyle;
  const outlineBase = onLight ? secondaryButtonStyleLight : secondaryButtonStyle;
  const outlineStyle = compact ? { ...outlineBase, padding: '0.62rem 1.15rem' } : outlineBase;

  const modulePath = `/courses/${courseSlug}/${firstModuleRoute}`;

  async function handleStart() {
    if (enrolling) return;
    setEnrolling(true);
    setEnrollError(null);
    const functionName = ENROLLMENT_FUNCTION_BY_SLUG[courseSlug];
    if (functionName) {
      try {
        await base44.functions.invoke(functionName, { courseSlug });
      } catch (err) {
        setEnrollError(c.enrollError);
        setEnrolling(false);
        return;
      }
    }
    base44.analytics.track({ eventName: "course_started", properties: { course_slug: courseSlug } });
    navigate(modulePath);
  }

  if (isAuthenticated) {
    return (
      <div>
        <button
          type="button"
          onClick={handleStart}
          disabled={enrolling}
          className="font-body"
          style={{ ...primaryStyle, opacity: enrolling ? 0.7 : 1, cursor: enrolling ? 'wait' : 'pointer' }}
        >
          {enrolling ? c.starting : `${c.startCourse} \u2192`}
        </button>
        {enrollError && <p className="font-body" role="alert" style={errorStyle}>{enrollError}</p>}
      </div>
    );
  }

  const encodedReturnTo = encodeURIComponent(modulePath);

  return (
    <div>
      {!compact && (
        <p className="font-body" style={infoStyle}>
          {c.infoText}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '0.5rem' : '0.75rem' }}>
        <Link to={`/login?returnTo=${encodedReturnTo}`} style={primaryStyle}>
          {c.signInToStart} &rarr;
        </Link>
        <Link to={`/register?returnTo=${encodedReturnTo}`} style={outlineStyle}>
          {c.createAccount} &rarr;
        </Link>
      </div>
    </div>
  );
}