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
 * prevModule and nextModule come from the course module order; a module
 * without a route renders disabled. When prevModule is null (the first
 * module) Previous is disabled. Next is always disabled in the pilot since
 * upcoming modules are not yet available.
 */
export default function ModuleNav({ coursePath, courseSlug, prevModule, nextModule, nextLabel }) {
  const prevPath = prevModule && prevModule.route ? `/courses/${courseSlug}/${prevModule.route}` : null;
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
        <span aria-disabled="true" style={disabledStyle} title={nextTitle}>
          {nextLabel}
          <ChevronRight size={14} aria-hidden="true" />
        </span>
      </div>
      <Link to={coursePath} className="font-body" style={navLinkStyle}>
        <ChevronLeft size={14} aria-hidden="true" />
        Return to Course
      </Link>
    </nav>
  );
}