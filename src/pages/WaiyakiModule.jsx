import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageNotFound from '@/lib/PageNotFound';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import WaiyakiModuleTemplate from '@/components/courses/waiyaki/WaiyakiModuleTemplate';
import {
  WAIYAKI_COURSE,
  WAIYAKI_COURSE_SLUG,
  getWaiyakiModulePreview,
} from '@/lib/waiyaki-tracks';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import CoursePlayer from '@/components/courses/player/CoursePlayer';
import CourseCompleteFooter from '@/components/courses/player/CourseCompleteFooter';
import { CoursePlayerLabelsProvider, useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import { ModuleFrameContext } from '@/components/courses/player/ModuleFrameContext';
import { waiyakiModuleSteps, WAIYAKI_COMPLETION_KEYS, WAIYAKI_KEY_LABEL_KEYS } from '@/components/courses/waiyaki/waiyaki-player-steps';

/**
 * WaiyakiModule — the lesson page for one module of the course, resolved from
 * the route parameter.
 *
 * Public preview metadata is read from the browser bundle so the page renders
 * immediately. The full module content is fetched from the access-gated
 * getWaiyakiModule backend function, and the learner's completion keys come
 * from getWaiyakiCourseCompletion, so the requirements always reflect server
 * state. A 403 means the viewer is not entitled to the module yet, and the
 * page renders the public "module in development" state.
 *
 * The module opens in the shared course player through ModuleFrameContext:
 * the outline and progress bar come from the same getWaiyakiCourseCompletion
 * report, and "Mark Complete & Continue" calls completeWaiyakiModule, so the
 * course's rules stay on the server. After the last module the footer leads
 * to the completion room (final assessment and written project).
 */
export default function WaiyakiModule() {
  return (
    <CoursePlayerLabelsProvider>
      <WaiyakiModuleRoute />
    </CoursePlayerLabelsProvider>
  );
}

function WaiyakiModuleRoute() {
  const { moduleRoute } = useParams();
  const { language } = useTranslation();
  const preview = getWaiyakiModulePreview(moduleRoute);

  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(WAIYAKI_COURSE_SLUG);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';
  const [progress, setProgress] = useState(null);
  const [savingKey, setSavingKey] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [message, setMessage] = useState(null);
  const L = useCoursePlayerLabels();
  // Same page key as the course overview, so its translation is reused.
  const { content: translatedCourse } = useTranslatedContent('waiyaki-course-overview', WAIYAKI_COURSE);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getWaiyakiCourseCompletion', {
        courseSlug: WAIYAKI_COURSE_SLUG,
      });
      setProgress(res && res.data ? res.data : null);
    } catch (err) {
      setProgress(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getWaiyakiModule', {
          courseSlug: WAIYAKI_COURSE_SLUG,
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
  }, [moduleRoute, language, reloadToken]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress, reloadToken]);

  const currentModuleProgress = (progress?.modules || []).find(
    (m) => m.route === moduleRoute,
  );
  const completedKeys = currentModuleProgress?.completedKeys || [];
  const moduleCompleted = !!currentModuleProgress?.completed;
  const canSave = !!progress?.hasEnrollment;

  async function handleAcknowledge(key, action) {
    if (savingKey || !canSave) return;
    setSavingKey(key);
    setMessage(null);
    try {
      await base44.functions.invoke('updateWaiyakiProgress', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        moduleRoute,
        action,
        ...(action === 'acknowledge_reflection' ? { mode: 'private' } : {}),
      });
      await fetchProgress();
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not save your progress right now. Please try again.' });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleComplete() {
    if (completing || !canSave) return;
    setCompleting(true);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('completeWaiyakiModule', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        moduleRoute,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) {
        setMessage({ type: 'success', text: 'Module complete. Your progress has been saved.' });
      } else {
        setMessage({ type: 'error', text: 'Some requirements are not yet complete.' });
      }
      await fetchProgress();
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not complete this module right now. Please try again.' });
    } finally {
      setCompleting(false);
    }
  }

  if (!preview) return <PageNotFound />;

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
    // Signed in but not enrolled: start the course here and load the module in
    // place. Unpublished modules and prerequisites keep their own state.
    if (isAuthenticated && enrollmentStatus === 'checking') {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
          <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label="Checking your enrollment" />
        </div>
      );
    }
    if (isAuthenticated && enrollmentStatus === 'not_enrolled') {
      return (
        <div className="tamu-waiyaki-centered">
          <ModuleStartGate
            course={preview.course}
            module={preview.module}
            autoStart={autoStart}
            onStarted={() => setReloadToken((token) => token + 1)}
          />
        </div>
      );
    }
    return (
      <div className="tamu-waiyaki-centered">
        <ModuleDevelopmentState course={preview.course} module={preview.module} />
      </div>
    );
  }

  const modules = WAIYAKI_COURSE.modules;
  const moduleIndex = modules.findIndex((m) => m.route === moduleRoute);
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number} \u2014 ${nextModule.title}`
    : 'Course complete';

  // The course player around the lesson: the server's module states, with
  // titles in the learner's language from the translated course.
  const displayCourse = restoreCourse(translatedCourse || WAIYAKI_COURSE, WAIYAKI_COURSE);
  const shownByRoute = new Map(displayCourse.modules.map((m) => [m.route, m]));
  const serverModules = progress && Array.isArray(progress.modules) ? progress.modules : null;
  const playerModules = (serverModules || modules).map((m) => {
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
  const totalModules = (progress && progress.totalModules) || playerModules.length;
  const completedModules = progress ? progress.completedCount || 0 : 0;
  const playerCourse = {
    slug: WAIYAKI_COURSE_SLUG,
    title: displayCourse.title,
    progressPercentage: progress && typeof progress.progressPercentage === 'number'
      ? progress.progressPercentage
      : Math.round((completedModules / Math.max(totalModules, 1)) * 100),
    completedModules,
    totalModules,
    modules: playerModules,
  };
  const nextShown = nextModule ? shownByRoute.get(nextModule.route) || nextModule : null;
  const nextPath = nextModule
    ? `/courses/${WAIYAKI_COURSE_SLUG}/${nextModule.route}`
    : `/courses/${WAIYAKI_COURSE_SLUG}/completion`;

  const completeFromFooter = async () => {
    const res = await base44.functions.invoke('completeWaiyakiModule', { courseSlug: WAIYAKI_COURSE_SLUG, moduleRoute });
    const data = res && res.data ? res.data : {};
    await fetchProgress();
    if (data.completed) return { completed: true };
    const done = new Set(Array.isArray(data.completedKeys) ? data.completedKeys : []);
    const missing = WAIYAKI_COMPLETION_KEYS.filter((key) => !done.has(key));
    if (missing.length > 0) {
      return { completed: false, missing: missing.map((key) => L[WAIYAKI_KEY_LABEL_KEYS[key]] || key.replace(/_/g, ' ')) };
    }
    return { completed: false };
  };

  const steps = waiyakiModuleSteps(module, completedKeys, moduleCompleted);
  const footer = (
    <CourseCompleteFooter
      moduleKey={moduleRoute}
      number={module.number}
      title={module.title}
      completed={moduleCompleted}
      canSave={canSave}
      onComplete={completeFromFooter}
      onCompleted={fetchProgress}
      next={{
        path: nextPath,
        title: nextShown ? `${nextShown.number} — ${nextShown.title}` : L.assessmentAndProject,
      }}
    />
  );
  const frame = {
    inPlayer: true,
    renderFrame: (children) => (
      <CoursePlayer course={playerCourse} currentRoute={moduleRoute} steps={steps} footer={footer}>
        {children}
      </CoursePlayer>
    ),
  };

  return (
    <ModuleFrameContext.Provider value={frame}>
    <WaiyakiModuleTemplate
      module={module}
      moduleRoute={moduleRoute}
      moduleIndex={moduleIndex}
      moduleCount={modules.length}
      prevModule={prevModule}
      nextModule={nextModule}
      nextLabel={nextLabel}
      endOfCourse={
        nextModule
          ? null
          : {
              label: 'Course complete',
              milestone:
                'The final assessment and your written project are open in the course completion room.',
            }
      }
      completedKeys={completedKeys}
      moduleCompleted={moduleCompleted}
      completedCount={progress?.completedCount || 0}
      canSave={canSave}
      savingKey={savingKey}
      completing={completing}
      onAcknowledge={handleAcknowledge}
      onComplete={handleComplete}
      message={message}
    />
    </ModuleFrameContext.Provider>
  );
}