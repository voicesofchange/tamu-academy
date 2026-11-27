import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import PageNotFound from '@/lib/PageNotFound';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import SokoExpandedTemplate from '@/components/courses/soko/SokoExpandedTemplate';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';
import { CoursePlayerLabelsProvider, useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import CourseCompleteFooter from '@/components/courses/player/CourseCompleteFooter';
import { sokoModuleSteps, SOKO_KEY_LABEL_KEYS } from '@/components/courses/soko/soko-player-steps';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import {
  SAUTI_ZA_SOKO_COURSE,
  SAUTI_ZA_SOKO_COURSE_SLUG,
  getSokoModulePreview,
} from '@/lib/sauti-za-soko-tracks';
import { useModulePreview } from '@/components/courses/preview/ModulePreviewContext';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  loadingModule: 'Loading module',
  checkingYourEnrollment: 'Checking your enrollment',
};

/**
 * SokoModuleRoute — the core-course module page for one Sauti za Soko
 * module, resolved from the route parameter.
 *
 * Public preview metadata (number, title, description, status, estimated
 * time) is read from the browser bundle so the page renders immediately.
 * The full module content is fetched from the access-gated getSokoModule
 * backend function. A 403 means the viewer is not entitled to the module
 * yet, and the page renders the public "module in development" state.
 *
 * The module opens in the shared course player: the outline and progress bar
 * come from getSokoCourseCompletion, the ticks and the footer's state from
 * getSokoProgress, and "Mark Complete & Continue" calls completeSokoModule —
 * so every Sauti za Soko rule (the action plan, the four-of-five knowledge
 * check, the prerequisite chain) is still decided on the server. Both reports
 * are fetched again whenever the learner saves a step.
 */
export default function SokoModuleRoute({ moduleRoute }) {
  return (
    <CoursePlayerLabelsProvider>
      <SokoModuleRouteInner moduleRoute={moduleRoute} />
    </CoursePlayerLabelsProvider>
  );
}

function SokoModuleRouteInner({ moduleRoute }) {
  const { content: uiText } = useTranslatedContent('ui-components-courses-soko-sokomoduleroute', UI_TEXT);
  // Signed-out visitors on Module 1 read the free preview (ModulePreviewGate).
  const { preview: isPreview } = useModulePreview();
  const { language } = useTranslation();
  const labels = useSokoLabels();
  const { user } = useAuth();
  const preview = getSokoModulePreview(moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(SAUTI_ZA_SOKO_COURSE_SLUG);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';
  const L = useCoursePlayerLabels();
  // Same page key as the course overview, so its translation is reused.
  const { content: translatedCourse } = useTranslatedContent('soko-course-overview', SAUTI_ZA_SOKO_COURSE);
  const [outline, setOutline] = useState(null);
  const [moduleProgress, setModuleProgress] = useState(null);
  const [progressToken, setProgressToken] = useState(0);
  const refreshProgress = useCallback(() => setProgressToken((token) => token + 1), []);

  // The player's server-side state: the course outline and this module's keys.
  useEffect(() => {
    if (status !== 'ready' || isPreview) return undefined;
    let cancelled = false;
    (async () => {
      const [course, progress] = await Promise.all([
        base44.functions.invoke('getSokoCourseCompletion', { courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG }).catch(() => null),
        base44.functions.invoke('getSokoProgress', { courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG, moduleRoute }).catch(() => null),
      ]);
      if (cancelled) return;
      setOutline(course && course.data ? course.data : null);
      setModuleProgress(progress && progress.data ? progress.data : null);
    })();
    return () => { cancelled = true; };
  }, [status, moduleRoute, progressToken, isPreview]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // A translated module is deterministic for a given language, and the
      // server translates it on first request. Caching it for the session
      // keeps revisits and later modules instant on slow connections.
      const cacheKey = `tamu_soko_module_${moduleRoute}_${language}`;
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setModule(JSON.parse(cached));
          setStatus('ready');
          return;
        }
      } catch (_) {
        // sessionStorage may be unavailable — fall through to the fetch.
      }

      try {
        const res = await base44.functions.invoke('getSokoModule', {
          ...(isPreview ? { preview: true } : {}),
          courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
          moduleRoute,
          language,
        });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data && data.module) {
          setModule(data.module);
          setStatus('ready');
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(data.module));
          } catch (_) {
            // Ignore storage errors — the module is already rendered.
          }
        } else {
          setStatus('denied');
        }
      } catch (err) {
        if (!cancelled) setStatus('denied');
      }
    })();
    return () => { cancelled = true; };
  }, [moduleRoute, language, reloadToken, isPreview]);

  if (!preview) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label={uiText.loadingModule} />
      </div>
    );
  }

  if (status === 'denied') {
    // Signed in but not enrolled: start the course here and reload this module
    // in place. Unpublished modules and prerequisites keep their own state.
    if (isAuthenticated && enrollmentStatus === 'checking') {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
          <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label={uiText.checkingYourEnrollment} />
        </div>
      );
    }
    if (isAuthenticated && enrollmentStatus === 'not_enrolled') {
      return (
        <ModuleStartGate
          course={preview.course}
          module={preview.module}
          autoStart={autoStart}
          onStarted={() => setReloadToken((token) => token + 1)}
        />
      );
    }
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
  const nextLabel = nextModule
    ? `${labels.navNextPrefix} ${nextModule.number} — ${nextModule.title}`
    : labels.navCourseCompletion;

  const isAdmin = user?.role === 'admin';
  const canSave = isAdmin || !!user;

  // The outline: the server's module states, with titles in the learner's
  // language from the translated course.
  const displayCourse = restoreCourse(translatedCourse, SAUTI_ZA_SOKO_COURSE);
  const titleByRoute = new Map(displayCourse.modules.map((m) => [m.route, m]));
  const serverModules = outline && Array.isArray(outline.modules) ? outline.modules : null;
  const playerModules = (serverModules || modules).map((m) => {
    const shown = titleByRoute.get(m.route) || m;
    return {
      route: m.route,
      number: shown.number || m.number,
      title: shown.title || m.title,
      completed: !!m.completed,
      status: m.status || 'not_started',
      published: m.published !== false,
      prerequisite: m.prerequisite || null,
      locked: !!m.locked,
    };
  });
  const totalModules = (outline && outline.totalModules) || playerModules.length;
  const completedModules = outline ? outline.completedCount || 0 : 0;
  const playerCourse = {
    slug: SAUTI_ZA_SOKO_COURSE_SLUG,
    title: displayCourse.title,
    progressPercentage: outline && typeof outline.progressPercentage === 'number'
      ? outline.progressPercentage
      : Math.round((completedModules / Math.max(totalModules, 1)) * 100),
    completedModules,
    totalModules,
    modules: playerModules,
  };

  const completeModule = async () => {
    const res = await base44.functions.invoke('completeSokoModule', {
      courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
      moduleRoute,
    });
    const data = res && res.data ? res.data : {};
    if (data.completed) return { completed: true };
    if (data.missingRequirement) return { completed: false, message: data.missingRequirement };
    if (Array.isArray(data.missing) && data.missing.length > 0) {
      return {
        completed: false,
        missing: data.missing.map((key) => L[SOKO_KEY_LABEL_KEYS[key]] || String(key).replace(/_/g, ' ')),
      };
    }
    return { completed: false };
  };

  const nextShown = nextModule ? titleByRoute.get(nextModule.route) || nextModule : null;
  const player = {
    course: playerCourse,
    steps: sokoModuleSteps(module, moduleProgress),
    footer: (
      <CourseCompleteFooter
        moduleKey={moduleRoute}
        number={module.number}
        title={module.title}
        completed={!!(moduleProgress && moduleProgress.moduleCompleted)}
        canSave={!!(moduleProgress && moduleProgress.eligibleToSave)}
        onComplete={completeModule}
        onCompleted={refreshProgress}
        next={{
          path: nextPath,
          title: nextShown ? `${nextShown.number} — ${nextShown.title}` : L.courseCompletion,
        }}
      />
    ),
  };

  return (
    <SokoExpandedTemplate
      player={player}
      onProgressChange={refreshProgress}
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