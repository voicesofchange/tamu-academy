import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import BuildingWealthLessonTemplate from '@/components/courses/wealth/BuildingWealthLessonTemplate';
import ModuleLockedState from '@/components/courses/wealth/ModuleLockedState';
import {
  BUILDING_WEALTH_TOGETHER_COURSE,
  getWealthModulePreview,
} from '@/lib/building-wealth-together-tracks';
import PageNotFound from '@/lib/PageNotFound';

const COURSE = BUILDING_WEALTH_TOGETHER_COURSE;

/**
 * Resolved module route for Building Wealth Together.
 *
 * The route's public preview metadata (number, title, description, track,
 * status, time estimate) is read from the browser bundle so the page header
 * renders immediately. The module's own content is fetched from the
 * access-checked `getWealthModule` backend function, which enforces
 * enrollment, publication and the prerequisite chain on the server.
 *
 * When the server declines, the page shows a locked state that links back to
 * the module the learner still needs, rather than an error.
 */
export default function BuildingWealthModule() {
  const { moduleRoute } = useParams();
  const found = getWealthModulePreview(COURSE.slug, moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setModule(null);
    (async () => {
      try {
        const res = await base44.functions.invoke('getWealthModule', {
          courseSlug: COURSE.slug,
          moduleRoute,
        });
        const data = res && res.data ? res.data : null;
        if (cancelled) return;
        if (data && data.module) {
          setModule(data.module);
          setStatus('ready');
        } else {
          setStatus('locked');
        }
      } catch (err) {
        if (!cancelled) setStatus('locked');
      }
    })();
    return () => { cancelled = true; };
  }, [moduleRoute]);

  if (!found) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div
          className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin"
          aria-label="Loading module"
        />
      </div>
    );
  }

  if (status === 'locked') {
    const index = COURSE.modules.findIndex((m) => m.route === moduleRoute);
    const previous = index > 0 ? COURSE.modules[index - 1] : null;
    return (
      <ModuleLockedState
        coursePath={`/courses/${COURSE.slug}`}
        module={found.module}
        previousModule={previous}
        signedOut={
          <Link to={`/login?returnTo=${encodeURIComponent(`/courses/${COURSE.slug}/${moduleRoute}`)}`} className="font-body tamu-nav-link" style={{ color: '#e8b85b' }}>
            Sign in to continue
          </Link>
        }
      />
    );
  }

  return <BuildingWealthLessonTemplate course={COURSE} module={module} />;
}