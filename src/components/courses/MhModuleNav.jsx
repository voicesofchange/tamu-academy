import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

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
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  transition: 'color 0.25s ease, borderColor 0.25s ease',
};

const navDisabledStyle = {
  ...navLinkStyle,
  color: 'rgba(245,239,224,0.28)',
  cursor: 'not-allowed',
  borderColor: 'rgba(245,239,224,0.12)',
};

const CONTENT = {
  startOfCourse: 'Start of course',
  endOfCourse: 'End of course',
  firstModuleTitle: 'This is the first module',
  lastModuleTitle: 'This is the last module',
  continueToCompletion: 'Continue to Course Completion',
  returnToCourse: 'Return to Course',
};

export default function MhModuleNav({ course, module: mod, courseSlug }) {
  const { content: c } = useTranslatedContent('mh-module-nav', CONTENT);
  const coursePath = `/courses/${courseSlug}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;
  const isLastModule = moduleIndex === course.modules.length - 1;
  const completionPath = `${coursePath}/completion`;

  return (
    <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {prevModule ? (
          <Link to={`${coursePath}/${prevModule.route}`} className="font-body tamu-nav-link" style={navLinkStyle}>
            &larr; {prevModule.number}
          </Link>
        ) : (
          <span aria-disabled="true" title={c.firstModuleTitle} style={navDisabledStyle}>
            &larr; {c.startOfCourse}
          </span>
        )}
        {nextModule ? (
          <Link to={`${coursePath}/${nextModule.route}`} className="font-body tamu-nav-link" style={navLinkStyle}>
            {nextModule.number} &rarr;
          </Link>
        ) : (
          <span aria-disabled="true" title={c.lastModuleTitle} style={navDisabledStyle}>
            {c.endOfCourse} &rarr;
          </span>
        )}
      </div>
      {isLastModule && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...navLinkStyle, borderColor: 'rgba(212,161,42,0.5)', color: '#D4A12A' }}>
            {c.continueToCompletion} &rarr;
          </Link>
        </div>
      )}
      <Link to={coursePath} className="font-body tamu-nav-link" style={navLinkStyle}>
        &larr; {c.returnToCourse}
      </Link>
    </nav>
  );
}