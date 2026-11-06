import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import TemplateCourseLesson from '@/components/courses/template/TemplateCourseLesson';
import TemplateCourseGate from '@/components/courses/template/TemplateCourseGate';
import PageNotFound from '@/lib/PageNotFound';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CENTERED = {
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#24150f',
};

const CONTENT = {
  loading: 'Loading module',
  lockedTitle: 'This module is not available yet',
  lockedPrerequisite: 'Finish the module that comes before this one to open it.',
  lockedUnpublished: 'This module has not been published yet. Please check back soon.',
  previousModule: 'Go to the previous module',
  errorText: 'We could not open this module just now.',
  tryAgain: 'Try again',
};

/**
 * TemplateCourseModule — the one module page for every course built with the
 * course template.
 *
 * Route: /courses/:courseSlug/:moduleRoute (registered once, in src/App.jsx).
 * The page carries no course-specific knowledge: the course registry entry and
 * curriculum find the course, and getTemplateCourseModule enforces
 * publication, enrollment and the prerequisite chain, returning the module,
 * the course outline and this learner's progress in one request.
 *
 * A 403 "Not enrolled" shows the start gate; a 403 "Prerequisite incomplete"
 * names the module to finish first; an unknown course or module is a 404.
 */
export default function TemplateCourseModule() {
  const { courseSlug, moduleRoute } = useParams();
  const { language } = useTranslation();
  const { content: c } = useTranslatedContent('template-course-module', CONTENT);
  const [state, setState] = useState({ status: 'loading' });
  const [reloadToken, setReloadToken] = useState(0);
  const refresh = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    (async () => {
      try {
        const res = await base44.functions.invoke('getTemplateCourseModule', {
          courseSlug,
          moduleRoute,
          language,
        });
        const data = res && res.data ? res.data : null;
        if (cancelled) return;
        if (data && data.module && data.course) setState({ status: 'ready', data });
        else setState({ status: 'notfound' });
      } catch (err) {
        if (cancelled) return;
        const status = err && err.response ? err.response.status : null;
        const payload = err && err.response ? err.response.data : null;
        const code = payload ? payload.error : null;

        if (status === 404) setState({ status: 'notfound' });
        else if (status === 403 && code === 'Not enrolled') setState({ status: 'enroll' });
        else if (status === 403) setState({ status: 'locked', prerequisite: payload ? payload.prerequisite : null });
        else setState({ status: 'error' });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseSlug, moduleRoute, language, reloadToken]);

  if (state.status === 'notfound') return <PageNotFound />;

  if (state.status === 'loading') {
    return (
      <div style={CENTERED}>
        <div
          className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin"
          aria-label={c.loading}
        />
      </div>
    );
  }

  if (state.status === 'enroll') {
    return (
      <TemplateCourseGate
        courseSlug={courseSlug}
        moduleRoute={moduleRoute}
        moduleLabel={moduleRoute}
        onStarted={refresh}
      />
    );
  }

  if (state.status === 'locked') {
    return (
      <div style={{ ...CENTERED, flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
        <p className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 400, margin: 0 }}>
          {c.lockedTitle}
        </p>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '34rem', margin: 0 }}>
          {state.prerequisite ? c.lockedPrerequisite : c.lockedUnpublished}
        </p>
        {state.prerequisite && (
          <Link
            to={`/courses/${courseSlug}/${state.prerequisite}`}
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            {c.previousModule} &rarr;
          </Link>
        )}
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div style={{ ...CENTERED, flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', margin: 0 }}>
          {c.errorText}
        </p>
        <button
          type="button"
          onClick={refresh}
          className="font-body"
          style={{
            color: '#24150f',
            backgroundColor: '#e8b85b',
            border: 'none',
            borderRadius: '2px',
            padding: '0.6rem 1.4rem',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {c.tryAgain}
        </button>
      </div>
    );
  }

  return <TemplateCourseLesson course={state.data.course} module={state.data.module} onRefresh={refresh} />;
}