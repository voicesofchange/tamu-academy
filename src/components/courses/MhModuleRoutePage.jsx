import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import MhModuleShell from '@/components/courses/MhModuleShell';
import MhModuleLesson from '@/components/courses/MhModuleLesson';
import MhModule2Lesson from '@/components/courses/MhModule2Lesson';
import MhModule3Lesson from '@/components/courses/MhModule3Lesson';
import MhModule4Lesson from '@/components/courses/MhModule4Lesson';
import MhModule5Lesson from '@/components/courses/MhModule5Lesson';
import MhModule6Lesson from '@/components/courses/MhModule6Lesson';
import MhModule7Lesson from '@/components/courses/MhModule7Lesson';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import { getMentalHealthModule, MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import CoursePlayer from '@/components/courses/player/CoursePlayer';
import CourseCompleteFooter from '@/components/courses/player/CourseCompleteFooter';
import { CoursePlayerLabelsProvider, useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import { ModuleFrameContext } from '@/components/courses/player/ModuleFrameContext';
import { MH_SECTIONS, mhModuleSteps, mhMissingNames } from '@/components/courses/mh-player-steps';
import { useTranslation } from '@/lib/i18n';
import PageNotFound from '@/lib/PageNotFound';
import { useModulePreview } from '@/components/courses/preview/ModulePreviewContext';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  checkingYourEnrollment: 'Checking your enrollment',
};

const COURSE_SLUG = 'mental-health-community-and-culture';

/**
 * Reusable module route page for the Mental Health pillar course.
 * Separate from the Economics and Development curriculum route wrapper
 * (ModuleRoutePage), so this course has its own metadata lookup, message
 * set, and future content-gating path that does not touch the existing
 * economics structure.
 *
 * BEHAVIOR (Phase 1 content stage for Module 1):
 *   - Resolves the module's PUBLIC preview metadata (title, status,
 *     estimated time, short description, prerequisite route) from
 *     mental-health-tracks.js. This data is safe to bundle publicly.
 *   - Fetches the protected module content (for Module 1, the staged
 *     lesson object) from the role-gated `getMentalHealthModule` backend
 *     function. The function returns 403 to non-admin viewers during
 *     development (and will add enrollment + publication + prerequisite
 *     checks on top of that gate after launch). On 200 with a `lesson`
 *     object, this wrapper renders `MhModuleLesson` to display the
 *     educational material. On 403 / 404 / no-lesson, it falls back to
 *     the existing `MhModuleShell` (showing the public metadata and an
 *     unavailable message).
 *
 * SAFETY NOTES:
 *   - No `updateMentalHealthProgress` call is triggered by simply opening
 *     the module. Progress acknowledgments are not written during this
 *     content stage, regardless of viewer. (The backend function
 *     remains available for future stages and is still restricted by the
 *     per-module section allow-list and the protected-field guard.)
 *   - The base44.functions.invoke response is the Axios response object;
 *     the function's JSON return lives at `res.data`.
 *   - The wrapper never directly imports the protected
 *     `mental-health-curriculum.js` server-side module. Frontend code
 *     reads lesson content only through the backend function response.
 */
export default function MhModuleRoutePage({ moduleRoute }) {
  return (
    <CoursePlayerLabelsProvider>
      <MhModuleRoute moduleRoute={moduleRoute} />
    </CoursePlayerLabelsProvider>
  );
}

function MhModuleRoute({ moduleRoute }) {
  const { content: uiText } = useTranslatedContent('ui-components-courses-mhmoduleroutepage', UI_TEXT);
  // Signed-out visitors on Module 1 read the free preview (ModulePreviewGate).
  const { preview } = useModulePreview();
  const { language } = useTranslation();
  const found = getMentalHealthModule(COURSE_SLUG, moduleRoute);
  const [state, setState] = useState({ status: 'loading', module: null });
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(COURSE_SLUG);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthModule', {
          ...(preview ? { preview: true } : {}),
          courseSlug: COURSE_SLUG,
          moduleRoute,
          language,
        });
        if (cancelled) return;
        const mod = res && res.data && res.data.module;
        if (mod && mod.contentAvailable && mod.lesson) {
          setState({ status: 'lesson', module: mod });
        } else if (mod) {
          setState({ status: 'shell', module: mod });
        } else {
          setState({ status: 'shell', module: null, denied: true });
        }
      } catch (err) {
        if (cancelled) return;
        // 403 (not enrolled, or not authorized) and network errors both fall
        // back to the shell — no protected content is displayed. `denied`
        // marks that the server refused rather than the content being absent.
        setState({ status: 'shell', module: null, denied: true });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moduleRoute, language, reloadToken, preview]);

  if (!found) return <PageNotFound />;

  if (state.status === 'lesson' && state.module && state.module.lesson) {
    return (
      <MhPlayerFrame
        moduleRoute={moduleRoute}
        found={found}
        lesson={state.module.lesson}
      />
    );
  }

  // Signed in but not enrolled: start the course here and load the module in
  // place. An enrolled learner whose content is not available keeps the shell.
  if (state.denied) {
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
          course={found.course}
          module={found.module}
          autoStart={autoStart}
          onStarted={() => setReloadToken((token) => token + 1)}
        />
      );
    }
  }

  return <MhModuleShell course={found.course} module={found.module} />;
}

/**
 * The per-module lesson renderer. Module 1 keeps its MhModuleLesson path;
 * Modules 2–7 each have their own lesson component.
 */
const LESSONS = {
  'module-2': MhModule2Lesson,
  'module-3': MhModule3Lesson,
  'module-4': MhModule4Lesson,
  'module-5': MhModule5Lesson,
  'module-6': MhModule6Lesson,
  'module-7': MhModule7Lesson,
};

function MhLesson({ moduleRoute, found, lesson }) {
  const Lesson = LESSONS[moduleRoute] || MhModuleLesson;
  return <Lesson course={found.course} module={found.module} lesson={lesson} />;
}

/** Same JSON shape twice in a row is the same report. */
function sameReport(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (_) {
    return false;
  }
}

/**
 * The lesson inside the shared course player.
 *
 * The lesson keeps its own layout component; ModuleFrameContext hands that
 * layout the player instead of the single reading column, hides each
 * module's own "complete module" button, and collects the progress the
 * module's progress component reports. The outline and progress bar come
 * from getMentalHealthCourseCompletion, and "Mark Complete & Continue" calls
 * completeMentalHealthModule, so every module's rules stay on the server.
 */
function MhPlayerFrame({ moduleRoute, found, lesson }) {
  const L = useCoursePlayerLabels();
  const { preview } = useModulePreview();
  // Same page key as the course overview, so its translation is reused.
  const { content: translatedCourse } = useTranslatedContent('mh-course-data', MENTAL_HEALTH_COURSE);
  const [outline, setOutline] = useState(null);
  const [moduleProgress, setModuleProgress] = useState(null);
  const [presentIds, setPresentIds] = useState([]);
  const [outlineToken, setOutlineToken] = useState(0);
  const refreshOutline = useCallback(() => setOutlineToken((token) => token + 1), []);

  useEffect(() => { setModuleProgress(null); }, [moduleRoute]);

  useEffect(() => {
    if (preview) return undefined;
    let cancelled = false;
    (async () => {
      const res = await base44.functions
        .invoke('getMentalHealthCourseCompletion', { courseSlug: COURSE_SLUG })
        .catch(() => null);
      if (!cancelled) setOutline(res && res.data ? res.data : null);
    })();
    return () => { cancelled = true; };
  }, [moduleRoute, outlineToken, preview]);

  // The outline lists the sections this lesson actually rendered.
  useEffect(() => {
    let frameId = null;
    const scan = () => setPresentIds(MH_SECTIONS.map((s) => s.id).filter((id) => document.getElementById(id)));
    frameId = window.requestAnimationFrame(() => { frameId = window.requestAnimationFrame(scan); });
    return () => window.cancelAnimationFrame(frameId);
  }, [moduleRoute, lesson]);

  // Reports identical to the last one are ignored, so a component that
  // reports on every render can never cause a render loop.
  const onProgressLoaded = useCallback((report) => {
    setModuleProgress((prev) => (sameReport(prev, report) ? prev : report));
  }, []);

  // A module that has just been completed updates the outline too.
  const reportedComplete = !!(moduleProgress && moduleProgress.moduleCompleted);
  useEffect(() => {
    if (reportedComplete) refreshOutline();
  }, [reportedComplete, refreshOutline]);

  const displayCourse = restoreCourse(translatedCourse || MENTAL_HEALTH_COURSE, MENTAL_HEALTH_COURSE);
  const shownByRoute = new Map(displayCourse.modules.map((m) => [m.route, m]));
  const serverModules = outline && Array.isArray(outline.modules) ? outline.modules : null;
  const playerModules = (serverModules || MENTAL_HEALTH_COURSE.modules).map((m) => {
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

  const outlineModule = playerModules.find((m) => m.route === moduleRoute);
  const completed = !!((outlineModule && outlineModule.completed) || (moduleProgress && moduleProgress.moduleCompleted));
  const canSave = moduleProgress && typeof moduleProgress.eligibleToSave === 'boolean'
    ? moduleProgress.eligibleToSave
    : !!(outline && outline.eligibleToSave);

  const routes = MENTAL_HEALTH_COURSE.modules.map((m) => m.route);
  const index = routes.indexOf(moduleRoute);
  const nextRoute = index >= 0 && index < routes.length - 1 ? routes[index + 1] : null;
  const nextShown = nextRoute ? shownByRoute.get(nextRoute) : null;
  const nextPath = nextRoute ? `/courses/${COURSE_SLUG}/${nextRoute}` : `/courses/${COURSE_SLUG}/completion`;

  const completeModule = async () => {
    const res = await base44.functions.invoke('completeMentalHealthModule', { courseSlug: COURSE_SLUG, moduleRoute });
    const data = res && res.data ? res.data : {};
    if (data.completed) {
      refreshOutline();
      return { completed: true };
    }
    // Modules 2–7 name the missing keys; Module 1 returns its requirement map.
    const missingKeys = Array.isArray(data.missing)
      ? data.missing
      : data.requirements && typeof data.requirements === 'object'
        ? Object.keys(data.requirements).filter((k) => data.requirements[k] !== true)
        : [];
    if (data.requirements) onProgressLoaded({ requirements: data.requirements, moduleCompleted: false });
    if (missingKeys.length > 0) return { completed: false, missing: mhMissingNames(missingKeys, L) };
    return { completed: false };
  };

  const steps = mhModuleSteps(presentIds, moduleProgress, outlineModule ? outlineModule.completed : false);
  const footer = (
    <CourseCompleteFooter
      moduleKey={moduleRoute}
      number={(shownByRoute.get(moduleRoute) || found.module).number}
      title={(shownByRoute.get(moduleRoute) || found.module).title}
      completed={completed}
      canSave={canSave}
      onComplete={completeModule}
      onCompleted={refreshOutline}
      requirementsAnchor="completion-requirements"
      next={{
        path: nextPath,
        title: nextShown ? `${nextShown.number} — ${nextShown.title}` : L.courseCompletion,
      }}
    />
  );

  const frame = {
    inPlayer: true,
    onProgressLoaded,
    renderFrame: (children) => (
      <CoursePlayer course={playerCourse} currentRoute={moduleRoute} steps={steps} footer={footer}>
        {children}
      </CoursePlayer>
    ),
  };

  return (
    <ModuleFrameContext.Provider value={frame}>
      <MhLesson moduleRoute={moduleRoute} found={found} lesson={lesson} />
    </ModuleFrameContext.Provider>
  );
}
