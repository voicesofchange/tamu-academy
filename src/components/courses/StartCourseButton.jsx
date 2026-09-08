import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

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

/**
 * StartCourseButton — renders the correct "Start Course" action based
 * on authentication state.
 *
 * - Authenticated learner: links directly to the first module route.
 *   The module page handles enrollment server-side.
 * - Logged-out visitor: shows a brief account explanation and links
 *   to /login and /register, both with returnTo set to the first
 *   module route so the learner returns to the course after auth.
 */
export default function StartCourseButton({ courseSlug, firstModuleRoute = 'module-1' }) {
  const { isAuthenticated } = useAuth();
  const modulePath = `/courses/${courseSlug}/${firstModuleRoute}`;

  if (isAuthenticated) {
    return (
      <Link to={modulePath} style={primaryButtonStyle}>
        Start Course &rarr;
      </Link>
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