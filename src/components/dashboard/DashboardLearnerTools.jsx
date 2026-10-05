import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
      <Link to="/my-progress" style={cardStyle}>
        <span className="font-body" style={eyebrowStyle}>My Progress</span>
        <h3 className="font-heading" style={headingStyle}>See every course and module at a glance</h3>
        <p className="font-body" style={bodyStyle}>
          Completed modules, current standing and what comes next, for all of your courses in one view.
        </p>
        <p className="font-body" style={ctaStyle}>Open my progress &rarr;</p>
      </Link>

      <Link to="/learning-hub" style={cardStyle}>
        <span className="font-body" style={eyebrowStyle}>Learner Hub</span>
        <h3 className="font-heading" style={headingStyle}>Objectives, handbook and summaries</h3>
        <p className="font-body" style={bodyStyle}>
          What each course teaches, how to work through it, and summaries you can download for offline study.
        </p>
        <p className="font-body" style={ctaStyle}>Open the Learner Hub &rarr;</p>
      </Link>
    </div>
  );
}