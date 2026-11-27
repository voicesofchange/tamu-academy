import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import BuildingWealthLessonTemplate from '@/components/courses/wealth/BuildingWealthLessonTemplate';
import ModuleLockedState from '@/components/courses/wealth/ModuleLockedState';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import {
  BUILDING_WEALTH_TOGETHER_COURSE,
  getWealthModulePreview,
} from '@/lib/building-wealth-together-tracks';
import PageNotFound from '@/lib/PageNotFound';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import { CoursePlayerLabelsProvider, useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import CourseCompleteFooter from '@/components/courses/player/CourseCompleteFooter';
import { wealthModuleSteps, WEALTH_KEY_LABEL_KEYS } from '@/components/courses/wealth/wealth-player-steps';
import { useModulePreview } from '@/components/courses/preview/ModulePreviewContext';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  loadingModule: 'Loading module',
  checkingYourEnrollment: 'Checking your enrollment',
  signInToContinue: 'Sign in to continue',
};

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
 *
 * The module opens in the shared course player: the outline and progress bar
 * come from getWealthCourseCompletion, the ticks and the footer's state from
 * getWealthProgress, and "Mark Complete & Continue" calls
 * completeWealthModule — so the course's rules are still decided on the
 * server. After the last module the footer leads to the capstone project.
 */
export default function BuildingWealthModule() {
  return (
    <CoursePlayerLabelsProvider>
      <WealthModuleRoute />
    </CoursePlayerLabelsProvider>
  );
}

function WealthModuleRoute() {
  const { content: uiText } = useTranslatedContent('ui-pages-buildingwealthmodule', UI_TEXT);
  // Signed-out visitors on Module 1 read the free preview (ModulePreviewGate).
  const { preview } = useModulePreview();
  const { moduleRoute } = useParams();
  const { language } = useTranslation();
  const found = getWealthModulePreview(COURSE.slug, moduleRoute);
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(COURSE.slug);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';
  const L = useCoursePlayerLabels();
  // Same page key as the course overview, so its translation is reused.
  const { content: translatedCourse } = useTranslatedContent('wealth-course-overview', COURSE);
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
        base44.functions.invoke('getWealthCourseCompletion', { courseSlug: COURSE.slug }).catch(() => null),
        base44.functions.invoke('getWealthProgress', { courseSlug: COURSE.slug, moduleRoute }).catch(() => null),
      ]);
      if (cancelled) return;
      setOutline(course && course.data ? course.data : null);
      setModuleProgress(progress && progress.data ? progress.data : null);
    })();
    return () => { cancelled = true; };
  }, [status, moduleRoute, progressToken, preview]);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setModule(null);
    (async () => {
      try {
        const res = await base44.functions.invoke('getWealthModule', {
          ...(preview ? { preview: true } : {}),
          courseSlug: COURSE.slug,
          moduleRoute,
          language,
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
  }, [moduleRoute, language, reloadToken, preview]);

  if (!found) return <PageNotFound />;

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div
          className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin"
          aria-label={uiText.loadingModule}
        />
      </div>
    );
  }

  if (status === 'locked') {
    // A signed-in learner who has not enrolled yet starts the course here and
    // the module loads in place. Everything else keeps the existing state.
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
          course={COURSE}
          module={found.module}
          autoStart={autoStart}
          onStarted={() => setReloadToken((token) => token + 1)}
        />
      );
    }

    const index = COURSE.modules.findIndex((m) => m.route === moduleRoute);
    const previous = index > 0 ? COURSE.modules[index - 1] : null;
    return (
      <ModuleLockedState
        coursePath={`/courses/${COURSE.slug}`}
        module={found.module}
        previousModule={previous}
        signedOut={
          <Link to={`/login?returnTo=${encodeURIComponent(`/courses/${COURSE.slug}/${moduleRoute}`)}`} className="font-body tamu-nav-link" style={{ color: '#e8b85b' }}>
            {uiText.signInToContinue}
          </Link>
        }
      />
    );
  }

  // The outline: the server's module states, with titles in the learner's
  // language from the translated course.
  const displayCourse = restoreCourse(translatedCourse || COURSE, COURSE);
  const shownByRoute = new Map(displayCourse.modules.map((m) => [m.route, m]));
  const serverModules = outline && Array.isArray(outline.modules) ? outline.modules : null;
  const playerModules = (serverModules || COURSE.modules).map((m) => {
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
    slug: COURSE.slug,
    title: displayCourse.title,
    progressPercentage: outline && typeof outline.progressPercentage === 'number'
      ? outline.progressPercentage
      : Math.round((completedModules / Math.max(totalModules, 1)) * 100),
    completedModules,
    totalModules,
    modules: playerModules,
  };

  const index = COURSE.modules.findIndex((m) => m.route === moduleRoute);
  const nextModule = index >= 0 && index < COURSE.modules.length - 1 ? COURSE.modules[index + 1] : null;
  const nextShown = nextModule ? shownByRoute.get(nextModule.route) || nextModule : null;
  // After the last module the course continues with the capstone project.
  const nextPath = nextModule
    ? `/courses/${COURSE.slug}/${nextModule.route}`
    : `/courses/${COURSE.slug}/capstone`;

  const completeModule = async () => {
    const res = await base44.functions.invoke('completeWealthModule', { courseSlug: COURSE.slug, moduleRoute });
    const data = res && res.data ? res.data : {};
    if (data.completed) return { completed: true };
    if (Array.isArray(data.missing) && data.missing.length > 0) {
      return {
        completed: false,
        missing: data.missing.map((key) => L[WEALTH_KEY_LABEL_KEYS[key]] || String(key).replace(/_/g, ' ')),
      };
    }
    return { completed: false };
  };

  const player = {
    course: playerCourse,
    steps: wealthModuleSteps(module, moduleProgress),
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
          title: nextShown ? `${nextShown.number} — ${nextShown.title}` : L.capstoneProject,
        }}
      />
    ),
  };

  return (
    <BuildingWealthLessonTemplate
      course={COURSE}
      module={module}
      player={player}
      onProgressChange={refreshProgress}
    />
  );
}