import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import EconomicsLessonTemplate from '@/components/courses/module/EconomicsLessonTemplate';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import { getEconomicsModule } from '@/lib/economics-tracks';
import { useTranslation } from '@/lib/i18n';
import PageNotFound from '@/lib/PageNotFound';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import { CoursePlayerLabelsProvider, useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import CourseCompleteFooter from '@/components/courses/player/CourseCompleteFooter';
import { economicsModuleSteps, ECONOMICS_KEY_LABEL_KEYS } from '@/components/courses/module/economics-player-steps';
import { useModulePreview } from '@/components/courses/preview/ModulePreviewContext';

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
 *
 * The module opens in the shared course player: the outline and progress bar
 * come from getEconomicsCourseCompletion, the ticks and the footer's state
 * from getEconomicsProgress, and "Mark Complete & Continue" calls
 * completeEconomicsModule — so the course's rules are still decided on the
 * server. Both reports are fetched again whenever the learner saves a step.
 */
export default function ModuleRoutePage({ moduleRoute }) {
  return (
    <CoursePlayerLabelsProvider>
      <EconomicsModuleRoute moduleRoute={moduleRoute} />
    </CoursePlayerLabelsProvider>
  );
}

function EconomicsModuleRoute({ moduleRoute }) {
  // Signed-out visitors on Module 1 read the free preview (ModulePreviewGate).
  const { preview } = useModulePreview();
  const { language } = useTranslation();
  const found = getEconomicsModule(COURSE_SLUG, moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'denied'
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(COURSE_SLUG);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';
  const L = useCoursePlayerLabels();
  // Same page key as the course overview, so its translation is reused.
  const { content: translatedCourse } = useTranslatedContent('economics-course-overview', found && found.course);
  const [outline, setOutline] = useState(null);
  const [moduleProgress, setModuleProgress] = useState(null);
  const [progressToken, setProgressToken] = useState(0);
  const refreshProgress = useCallback(() => setProgressToken((token) => token + 1), []);

  // The player's server-side state: the course outline and this module's keys.
  useEffect(() => {
    if (status !== 'ready' || preview) return undefined;
    let cancelled = false;
    (async () => {
      const [course, progress] = await Promise.all([
        base44.functions.invoke('getEconomicsCourseCompletion', { courseSlug: COURSE_SLUG }).catch(() => null),
        base44.functions.invoke('getEconomicsProgress', { courseSlug: COURSE_SLUG, moduleRoute }).catch(() => null),
      ]);
      if (cancelled) return;
      setOutline(course && course.data ? course.data : null);
      setModuleProgress(progress && progress.data ? progress.data : null);
    })();
    return () => { cancelled = true; };
  }, [status, moduleRoute, progressToken, preview]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getModuleContent', {
          ...(preview ? { preview: true } : {}),
          courseSlug: COURSE_SLUG,
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
    return () => {
      cancelled = true;
    };
  }, [moduleRoute, language, reloadToken, preview]);

  if (!found) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#24150f',
        }}
      >
        <div
          className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin"
          aria-label="Loading module"
        />
      </div>
    );
  }

  if (status === 'denied') {
    // Signed in but not enrolled: start the course here and reload this module
    // in place. Unpublished modules and prerequisites keep their own state.
    if (isAuthenticated && enrollmentStatus === 'checking') {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
          <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label="Checking your enrollment" />
        </div>
      );
    }
    if (isAuthenticated && enrollmentStatus === 'not_enrolled') {
      return (
        <ModuleStartGate
          course={found.course}
          module={found.module}
          autoStart={autoStart}
          onStarted={() => setReloadToken((token) => token + 1)}
        />
      );
    }
    return <ModuleDevelopmentState course={found.course} module={found.module} />;
  }

  // The outline: the server's module states, with titles in the learner's
  // language from the translated course.
  const displayCourse = restoreCourse(translatedCourse || found.course, found.course);
  const shownByRoute = new Map(displayCourse.modules.map((m) => [m.route, m]));
  const serverModules = outline && Array.isArray(outline.modules) ? outline.modules : null;
  const playerModules = (serverModules || found.course.modules).map((m) => {
    const shown = shownByRoute.get(m.route) || m;
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
    slug: COURSE_SLUG,
    title: displayCourse.title,
    progressPercentage: outline && typeof outline.progressPercentage === 'number'
      ? outline.progressPercentage
      : Math.round((completedModules / Math.max(totalModules, 1)) * 100),
    completedModules,
    totalModules,
    modules: playerModules,
  };

  const index = found.course.modules.findIndex((m) => m.route === moduleRoute);
  const nextModule = index >= 0 && index < found.course.modules.length - 1 ? found.course.modules[index + 1] : null;
  const nextShown = nextModule ? shownByRoute.get(nextModule.route) || nextModule : null;
  const nextPath = nextModule
    ? `/courses/${COURSE_SLUG}/${nextModule.route}`
    : `/courses/${COURSE_SLUG}/completion`;

  const completeModule = async () => {
    const res = await base44.functions.invoke('completeEconomicsModule', { courseSlug: COURSE_SLUG, moduleRoute });
    const data = res && res.data ? res.data : {};
    if (data.completed) return { completed: true };
    if (Array.isArray(data.missing) && data.missing.length > 0) {
      return {
        completed: false,
        missing: data.missing.map((key) => L[ECONOMICS_KEY_LABEL_KEYS[key]] || String(key).replace(/_/g, ' ')),
      };
    }
    return { completed: false };
  };

  const player = {
    course: playerCourse,
    steps: economicsModuleSteps(module, moduleProgress),
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

  // Every module renders through one shared lesson structure, whatever shape
  // its recorded content takes, inside the course player.
  return (
    <EconomicsLessonTemplate
      course={found.course}
      module={module}
      player={player}
      onProgressChange={refreshProgress}
    />
  );
}