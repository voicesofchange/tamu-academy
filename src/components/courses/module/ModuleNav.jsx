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
 * In the pilot, Previous is disabled (this is the first module) and
 * Next (Module 2) is disabled until that module is built.
 */
export default function ModuleNav({ coursePath, nextLabel }) {
  return (
    <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <span aria-disabled="true" style={disabledStyle} title="This is the first module">
          <ChevronLeft size={14} aria-hidden="true" />
          Previous Module
        </span>
        <span aria-disabled="true" style={disabledStyle} title="Module 2 is not yet available">
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