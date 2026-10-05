import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import PageNotFound from '@/lib/PageNotFound';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import SokoExpandedTemplate from '@/components/courses/soko/SokoExpandedTemplate';
import {
  SAUTI_ZA_SOKO_COURSE,
  SAUTI_ZA_SOKO_COURSE_SLUG,
  getSokoModulePreview,
} from '@/lib/sauti-za-soko-tracks';

/**
 * SokoModuleRoute — the core-course module page for one Sauti za Soko
 * module, resolved from the route parameter.
 *
 * Public preview metadata (number, title, description, status, estimated
 * time) is read from the browser bundle so the page renders immediately.
 * The full module content is fetched from the access-gated getSokoModule
 * backend function. A 403 means the viewer is not entitled to the module
 * yet, and the page renders the public "module in development" state.
 */
export default function SokoModuleRoute({ moduleRoute }) {
  const { language } = useTranslation();
  const { user } = useAuth();
  const preview = getSokoModulePreview(moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoModule', {
          courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
          moduleRoute,
          language,
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
    return () => { cancelled = true; };
  }, [moduleRoute, language]);

  if (!preview) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label="Loading module" />
      </div>
    );
  }

  if (status === 'denied') {
    return <ModuleDevelopmentState course={preview.course} module={preview.module} />;
  }

  const modules = SAUTI_ZA_SOKO_COURSE.modules;
  const index = modules.findIndex((m) => m.route === moduleRoute);
  const prevModule = index > 0 ? modules[index - 1] : null;
  const nextModule = index >= 0 && index < modules.length - 1 ? modules[index + 1] : null;
  // The Peer Facilitator track follows the core course rather than sitting
  // inside it, so the final core module points at the optional track page.
  const nextPath = nextModule
    ? `/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}/${nextModule.route}`
    : `/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}/completion`;
  const nextLabel = nextModule ? `Next: ${nextModule.number} — ${nextModule.title}` : 'Course completion';

  const isAdmin = user?.role === 'admin';
  const canSave = isAdmin || !!user;

  return (
    <SokoExpandedTemplate
      course={SAUTI_ZA_SOKO_COURSE}
      module={module}
      courseSlug={SAUTI_ZA_SOKO_COURSE_SLUG}
      moduleRoute={moduleRoute}
      moduleIndex={index}
      moduleCount={modules.length}
      prevModule={prevModule}
      prevPath={prevModule ? `/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}/${prevModule.route}` : null}
      nextModule={nextModule}
      nextPath={nextPath}
      nextLabel={nextLabel}
      canSave={canSave}
    />
  );
}