import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#1A130E',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.7rem 1.5rem',
  backgroundColor: '#D4A12A',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const secondaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#D4A12A',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(212,161,42,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.4rem',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const infoTextStyle = {
  color: 'rgba(245,239,224,0.62)',
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

// Maps each course slug to its enrollment backend function name. The
// backend de-duplicates by (learner_id, course_slug), so calling this on
// every "Start Course" click is safe — an existing enrollment is reused
// and no duplicate row is created.
const ENROLLMENT_FUNCTION_BY_SLUG = {
  'mental-health-community-and-culture': 'enrollMentalHealth',
  'understanding-african-economies-and-the-global-system': 'enrollEconomicsCourse',
};

/**
 * StartCourseButton — renders the correct "Start Course" action based
 * on authentication state.
 *
 * - Authenticated learner: calls the server-side enrollment function
 *   (which de-duplicates and reuses an existing enrollment), then
 *   navigates to the first module route. This guarantees the backend
 *   content gate (which requires an active enrollment) will pass.
 * - Logged-out visitor: shows a brief account explanation and links
 *   to /login and /register, both with returnTo set to the first
 *   module route so the learner returns to the course after auth.
 */
export default function StartCourseButton({ courseSlug, firstModuleRoute = 'module-1' }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

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
        setEnrollError('Unable to start this course right now. Please try again.');
        setEnrolling(false);
        return;
      }
    }
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
          style={{ ...primaryButtonStyle, opacity: enrolling ? 0.7 : 1, cursor: enrolling ? 'wait' : 'pointer' }}
        >
          {enrolling ? 'Starting...' : 'Start Course \u2192'}
        </button>
        {enrollError && <p className="font-body" role="alert" style={errorTextStyle}>{enrollError}</p>}
      </div>
    );
  }

  const encodedReturnTo = encodeURIComponent(modulePath);

  return (
    <div>
      <p className="font-body" style={infoTextStyle}>
        Create an account or sign in to begin this course, save your progress, and return whenever you are ready.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Link to={`/login?returnTo=${encodedReturnTo}`} style={primaryButtonStyle}>
          Sign In to Start &rarr;
        </Link>
        <Link to={`/register?returnTo=${encodedReturnTo}`} style={secondaryButtonStyle}>
          Create Account &rarr;
        </Link>
      </div>
    </div>
  );
}