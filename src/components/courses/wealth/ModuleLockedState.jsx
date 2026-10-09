import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.6rem 1.25rem',
};

/**
 * Shown when the server will not release a module's content: the learner has
 * not enrolled yet, or the module before it is not complete. It names the
 * module to finish rather than showing a bare error.
 */
export default function ModuleLockedState({ coursePath, module, previousModule, signedOut }) {
  return (
    <PageLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={module.description}
        path={`${coursePath}/${module.route}`}
        noindex
      />
      <div style={{ maxWidth: '640px' }}>
        <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' }}>
          {module.trackLabel}
        </span>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.25rem' }}>
          {module.number}: {module.title}
        </h1>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>{module.description}</p>

        <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.25)', borderRadius: '4px', background: 'rgba(243,234,216,0.02)', marginBottom: '2rem' }}>
          <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>
            This module opens next
          </span>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            {previousModule
              ? `Finish ${previousModule.number}: ${previousModule.title} to open this module. If you are not enrolled yet, start the course from the course page.`
              : 'Start the course from the course page to open this module. If you are already enrolled, the module may not be released yet.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          {previousModule && (
            <Link to={`${coursePath}/${previousModule.route}`} style={linkStyle}>
              &larr; {previousModule.number}
            </Link>
          )}
          <Link to={coursePath} style={linkStyle}>
            &larr; {BUILDING_WEALTH_TOGETHER_COURSE.title.split(':')[0]}
          </Link>
          {signedOut}
        </div>
      </div>
    </PageLayout>
  );
}