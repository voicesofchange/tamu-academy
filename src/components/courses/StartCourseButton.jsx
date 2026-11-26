import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { enrollInCourse } from '@/lib/course-enrollment';
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

/* Parchment-surface variants for cards on a light background. */
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
  startLearning: 'Start Learning',
  enrollError: 'Unable to start this course right now. Please try again.',
  infoText: 'Module 1 is free to read without an account. Create a free account to save your progress and earn the certificate.',
  haveAccount: 'Already have an account?',
  signIn: 'Sign in',
};

/**
 * StartCourseButton — the enrollment action for a course.
 *
 * `compact` drops the explanatory line and tightens the buttons, for use
 * inside cards; `showSignIn={false}` leaves out the "Already have an account?"
 * line where the header already offers sign-in. `surface="light"` switches the sign-in link and error text
 * to the espresso-on-parchment palette. Both default to the full-size
 * dark-surface treatment used in the course heroes.
 */
export default function StartCourseButton({
  courseSlug,
  firstModuleRoute = 'module-1',
  compact = false,
  surface = 'dark',
  showSignIn = true,
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

  const modulePath = `/courses/${courseSlug}/${firstModuleRoute}`;

  async function handleStart() {
    if (enrolling) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await enrollInCourse(courseSlug);
    } catch (err) {
      setEnrollError(c.enrollError);
      setEnrolling(false);
      return;
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
          {enrolling ? c.starting : `${c.startLearning} \u2192`}
        </button>
        {enrollError && <p className="font-body" role="alert" style={errorStyle}>{enrollError}</p>}
      </div>
    );
  }

  // Signed out, Start Learning opens Module 1 as a free preview. `enroll=1`
  // is the sign-in intent: the module page enrolls the learner automatically
  // once they are signed in.
  const encodedReturnTo = encodeURIComponent(`${modulePath}?enroll=1`);
  const smallLinkStyle = { color: onLight ? '#5f4531' : '#e8b85b', textDecoration: 'underline', textUnderlineOffset: '3px' };

  return (
    <div>
      {!compact && (
        <p className="font-body" style={infoStyle}>
          {c.infoText}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: compact ? '0.5rem 0.9rem' : '0.75rem 1.1rem' }}>
        <Link to={modulePath} className="font-body" style={primaryStyle}>
          {c.startLearning} &rarr;
        </Link>
        {showSignIn && (
          <span className="font-body" style={{ ...infoStyle, margin: 0, fontSize: '0.8rem' }}>
            {c.haveAccount}{' '}
            <Link to={`/login?returnTo=${encodedReturnTo}`} style={smallLinkStyle}>{c.signIn}</Link>
          </span>
        )}
      </div>
    </div>
  );
}
