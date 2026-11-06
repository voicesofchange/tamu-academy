import React from 'react';
import { Link } from 'react-router-dom';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#24150f',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  border: 'none',
  borderRadius: '2px',
  padding: '0.7rem 1.5rem',
  backgroundColor: '#e8b85b',
  fontFamily: "'DM Sans', sans-serif",
  cursor: 'pointer',
};

/**
 * TemplateCourseGate — shown on a template course module page when the
 * server has refused the module for a signed-in learner who holds no
 * enrollment. One click enrolls through enrollTemplateCourse and the page
 * loads the module in place.
 */
export default function TemplateCourseGate({ courseSlug, moduleRoute, moduleLabel, onStarted }) {
  const [state, setState] = React.useState('idle');

  async function start() {
    if (state === 'starting') return;
    setState('starting');
    try {
      await base44.functions.invoke('enrollTemplateCourse', { courseSlug });
      if (onStarted) onStarted();
    } catch (err) {
      setState('error');
    }
  }

  const starting = state === 'starting';
  const modulePath = `/courses/${courseSlug}/${moduleRoute}`;

  return (
    <ModuleLessonLayout>
      <PageMeta title="Start this course | Tamu Academy" description="Start this course to open its modules." path={modulePath} noindex />
      <ModuleBreadcrumbs pillar="Course Template" track="Template Course" course={courseSlug} coursePath="/courses" moduleLabel={moduleLabel || 'Module'} />

      <header style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
          Start this course
        </h1>
      </header>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)' }}>
        <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>
          Not enrolled yet
        </span>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1.5rem' }}>
          You are signed in. Start the course to open this module and every module that follows it. Your
          progress is saved as you learn, so you can return whenever you are ready.
        </p>
        <button
          type="button"
          onClick={start}
          disabled={starting}
          className="font-body"
          style={{ ...buttonStyle, opacity: starting ? 0.7 : 1, cursor: starting ? 'wait' : 'pointer' }}
        >
          {starting ? 'Starting your course…' : 'Start This Course \u2192'}
        </button>
        {state === 'error' && (
          <p className="font-body" role="alert" style={{ color: '#e8955c', fontSize: '0.85rem', margin: '0.9rem 0 0' }}>
            We could not start this course right now. Please try again.
          </p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/courses" className="font-body" style={{ color: '#e8b85b', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
          &larr; Back to courses
        </Link>
      </div>
    </ModuleLessonLayout>
  );
}