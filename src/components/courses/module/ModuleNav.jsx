import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: 'rgba(212,161,42,0.7)',
  fontSize: '0.72rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
};

const disabledStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: 'rgba(245,239,224,0.28)',
  fontSize: '0.72rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'not-allowed',
};

/**
 * Previous / Next / Return-to-course navigation.
 * prevModule and nextModule come from the course module order. A control is
 * enabled only when that adjacent module has been built (has a route); modules
 * without a route render disabled. This component only renders inside the
 * preview/allowed module page, so in public production (where the "Module in
 * development" state is shown) no module-to-module links appear at all.
 */
export default function ModuleNav({ coursePath, courseSlug, prevModule, nextModule, nextLabel, endOfCourse }) {
  const prevPath = prevModule && prevModule.route ? `/courses/${courseSlug}/${prevModule.route}` : null;
  const nextPath = nextModule && nextModule.route ? `/courses/${courseSlug}/${nextModule.route}` : null;
  const nextTitle = nextModule ? `${nextModule.number} is not yet available` : 'Next module is not yet available';

  return (
    <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {prevPath ? (
          <Link to={prevPath} className="font-body" style={navLinkStyle}>
            <ChevronLeft size={14} aria-hidden="true" />
            Previous: {prevModule.number} — {prevModule.title}
          </Link>
        ) : (
          <span aria-disabled="true" style={disabledStyle} title="This is the first module">
            <ChevronLeft size={14} aria-hidden="true" />
            Previous Module
          </span>
        )}
        {nextPath ? (
          <Link to={nextPath} className="font-body" style={navLinkStyle}>
            {nextLabel}
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        ) : endOfCourse ? (
          <div style={{ textAlign: 'right' }}>
            <span className="font-body" style={{ display: 'inline-block', color: 'rgba(212,161,42,0.85)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '2px', padding: '0.2rem 0.65rem' }}>
              {endOfCourse.label}
            </span>
            <p className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', fontStyle: 'italic', margin: '0.55rem 0 0 0' }}>
              {endOfCourse.milestone}
            </p>
          </div>
        ) : (
          <span aria-disabled="true" style={disabledStyle} title={nextTitle}>
            {nextLabel}
            <ChevronRight size={14} aria-hidden="true" />
          </span>
        )}
      </div>
      <Link to={coursePath} className="font-body" style={navLinkStyle}>
        <ChevronLeft size={14} aria-hidden="true" />
        Return to Course
      </Link>
    </nav>
  );
}