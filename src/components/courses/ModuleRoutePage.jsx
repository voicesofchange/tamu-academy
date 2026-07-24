import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ModulePageTemplate from '@/components/courses/ModulePageTemplate';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import { getEconomicsModule } from '@/lib/economics-tracks';
import PageNotFound from '@/lib/PageNotFound';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

/**
 * Resolved module route page.
 *
 * The route's public preview metadata (number, title, short description,
 * status, completion-time estimate) is read from the browser bundle so the
 * page renders immediately even on a slow network.
 *
 * The full, in-development module content — recorded lesson links, key
 * concepts, reflection questions, quiz questions and answer keys, applied
 * activities, completion requirements, closing text, and source references
 * — is fetched from the role-gated `getModuleContent` backend function
 * instead of from the client JavaScript bundle. The backend enforces the
 * role check on the server: it returns the protected curriculum only to an
 * authenticated Base44 admin and 403 to everyone else.
 *
 * If the server declines the request (the viewer is not an authenticated
 * admin), the page falls back to the public "Module in development" state
 * that the public preview metadata already supports. The client-side
 * `canViewInDevelopment` gate that previously implied protection has been
 * removed — there is no longer a trust path through the bundle that could
 * leak the unreleased quizzes, answers, or activities to a public visitor.
 */
export default function ModuleRoutePage({ moduleRoute }) {
  const found = getEconomicsModule(COURSE_SLUG, moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'denied'

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getModuleContent', {
          courseSlug: COURSE_SLUG,
          moduleRoute,
        });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data && data.module) {
          setModule(data.module);
          setStatus('ready');
        } else {
          setStatus('denied');
        }
      } catch (err) {
        if (!cancelled) setStatus('denied');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moduleRoute]);

  if (!found) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A130E',
        }}
      >
        <div
          className="w-8 h-8 border-4 border-[rgba(212,161,42,0.18)] border-t-[#D4A12A] rounded-full animate-spin"
          aria-label="Loading module"
        />
      </div>
    );
  }

  if (status === 'denied') {
    return <ModuleDevelopmentState course={found.course} module={found.module} />;
  }

  return <ModulePageTemplate course={found.course} module={module} />;
}