import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import StatusBadge from '@/components/page/StatusBadge';
import PageMeta from '@/components/seo/PageMeta';
import { enrollInCourse } from '@/lib/course-enrollment';

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

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  color: '#e8b85b',
  fontSize: '0.72rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.4)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};

/**
 * ModuleStartGate — shown on a module page when the signed-in learner is not
 * enrolled in the course yet. One click enrolls them and the page fetches the
 * module again in place, so no second navigation is needed.
 *
 * `autoStart` runs that enrollment immediately: it is set when the learner
 * arrived here from a course page's Sign In to Start / Create Account links,
 * whose return path carries `?enroll=1`.
 *
 * This gate never decides who may see a module. It only appears after the
 * server has already refused the module for a learner who holds no
 * enrollment; unpublished modules and prerequisites stay the server's call.
 */
export default function ModuleStartGate({ course, module, autoStart = false, onStarted }) {
  const [state, setState] = useState('idle'); // idle | starting | error
  const autoStarted = useRef(false);

  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const starting = state === 'starting';

  async function start() {
    if (starting) return;
    setState('starting');
    try {
      await enrollInCourse(course.slug);
      // The sign-in intent has served its purpose; drop it so a refresh does
      // not try to enroll again.
      const url = new URL(window.location.href);
      if (url.searchParams.has('enroll')) {
        url.searchParams.delete('enroll');
        window.history.replaceState({}, '', url.pathname + url.search);
      }
      if (onStarted) onStarted();
    } catch (err) {
      setState('error');
    }
  }

  useEffect(() => {
    if (!autoStart || autoStarted.current) return;
    autoStarted.current = true;
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  return (
    <ModuleLessonLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={`${module.title} at Tamu Academy.`}
        path={modulePath}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.pillar}
        track={course.track}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={module.number}
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={module.number} />
          {module.status && <StatusBadge label={module.status} />}
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
          {module.title}
        </h1>
      </header>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)' }}>
        <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>
          Not enrolled yet
        </span>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1.5rem' }}>
          You are signed in. Start {course.title} to open this module, and every module that follows it.
          Your progress is saved as you learn, so you can return whenever you are ready.
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
        <Link to={coursePath} className="font-body" style={backLinkStyle}>
          &larr; Back to the course
        </Link>
      </div>
    </ModuleLessonLayout>
  );
}