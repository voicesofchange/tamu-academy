import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: 'rgba(232,184,91,0.75)',
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
  color: 'rgba(243,234,216,0.3)',
  fontSize: '0.72rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'not-allowed',
};

const CONTENT = {
  previous: 'Previous',
  previousModule: 'Previous Module',
  firstModuleTitle: 'This is the first module',
  nextUnavailable: 'is not yet available',
  nextModuleUnavailable: 'Next module is not yet available',
  returnToCourse: 'Return to Course',
};

export default function ModuleNav({ coursePath, courseSlug, prevModule, nextModule, nextLabel, endOfCourse }) {
  const { content: c } = useTranslatedContent('module-nav', CONTENT);
  const prevPath = prevModule && prevModule.route ? `/courses/${courseSlug}/${prevModule.route}` : null;
  const nextPath = nextModule && nextModule.route ? `/courses/${courseSlug}/${nextModule.route}` : null;
  const nextTitle = nextModule ? `${nextModule.number} ${c.nextUnavailable}` : c.nextModuleUnavailable;

  return (
    <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.14)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {prevPath ? (
          <Link to={prevPath} className="font-body" style={navLinkStyle}>
            <ChevronLeft size={14} aria-hidden="true" />
            {c.previous}: {prevModule.number} — {prevModule.title}
          </Link>
        ) : (
          <span aria-disabled="true" style={disabledStyle} title={c.firstModuleTitle}>
            <ChevronLeft size={14} aria-hidden="true" />
            {c.previousModule}
          </span>
        )}
        {nextPath ? (
          <Link to={nextPath} className="font-body" style={navLinkStyle}>
            {nextLabel}
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        ) : endOfCourse ? (
          <div style={{ textAlign: 'right' }}>
            <span className="font-body" style={{ display: 'inline-block', color: 'rgba(232,184,91,0.85)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(232,184,91,0.3)', borderRadius: '2px', padding: '0.2rem 0.65rem' }}>
              {endOfCourse.label}
            </span>
            <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', fontStyle: 'italic', margin: '0.55rem 0 0 0' }}>
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
        {c.returnToCourse}
      </Link>
    </nav>
  );
}