import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageNotFound from '@/lib/PageNotFound';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import WaiyakiModuleTemplate from '@/components/courses/waiyaki/WaiyakiModuleTemplate';
import {
  WAIYAKI_COURSE,
  WAIYAKI_COURSE_SLUG,
  getWaiyakiModulePreview,
} from '@/lib/waiyaki-tracks';

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
 */
export default function WaiyakiModule() {
  const { moduleRoute } = useParams();
  const preview = getWaiyakiModulePreview(moduleRoute);

  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(null);
  const [savingKey, setSavingKey] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [message, setMessage] = useState(null);

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
  }, [moduleRoute]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

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
    return <ModuleDevelopmentState course={preview.course} module={preview.module} />;
  }

  const modules = WAIYAKI_COURSE.modules;
  const moduleIndex = modules.findIndex((m) => m.route === moduleRoute);
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number} \u2014 ${nextModule.title}`
    : 'Course complete';

  return (
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
  );
}