import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import PageNotFound from '@/lib/PageNotFound';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import WaiyakiModuleTemplate from '@/components/courses/waiyaki/WaiyakiModuleTemplate';
import {
  WAIYAKI_COURSE,
  WAIYAKI_COURSE_SLUG,
  getWaiyakiModulePreview,
} from '@/lib/waiyaki-tracks';

/**
 * WaiyakiModule — the module page for one module of the course, resolved from
 * the route parameter.
 *
 * Public preview metadata is read from the browser bundle so the page renders
 * immediately. The full module content is fetched from the access-gated
 * getWaiyakiModule backend function, and the learner's three completion keys
 * come from getWaiyakiCourseCompletion, so the checklist always reflects
 * server state. A 403 means the viewer is not entitled to the module yet, and
 * the page renders the public "module in development" state.
 */
export default function WaiyakiModule() {
  const { moduleRoute } = useParams();
  const { user } = useAuth();
  const preview = getWaiyakiModulePreview(moduleRoute);

  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(null);
  const [saving, setSaving] = useState(false);
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

  async function acknowledge(action, mode) {
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke('updateWaiyakiProgress', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        moduleRoute,
        action,
        ...(mode ? { mode } : {}),
      });
      await fetchProgress();
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not save that just now. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleComplete() {
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('completeWaiyakiModule', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        moduleRoute,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) {
        setMessage({ type: 'success', text: 'Module complete. Continue to the next module below.' });
      } else {
        setMessage({ type: 'error', text: 'This module is not quite finished yet.' });
      }
      await fetchProgress();
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not save that just now. Please try again.' });
    } finally {
      setSaving(false);
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
  const index = modules.findIndex((m) => m.route === moduleRoute);
  const prevModule = index > 0 ? modules[index - 1] : null;
  const nextModule = index >= 0 && index < modules.length - 1 ? modules[index + 1] : null;
  const nextPath = nextModule
    ? `/courses/${WAIYAKI_COURSE_SLUG}/${nextModule.route}`
    : `/courses/${WAIYAKI_COURSE_SLUG}/completion`;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number}`
    : 'Final assessment and project';

  return (
    <WaiyakiModuleTemplate
      module={module}
      moduleRoute={moduleRoute}
      moduleIndex={index}
      moduleCount={modules.length}
      prevPath={prevModule ? `/courses/${WAIYAKI_COURSE_SLUG}/${prevModule.route}` : null}
      nextPath={nextPath}
      nextLabel={nextLabel}
      completedKeys={completedKeys}
      moduleCompleted={moduleCompleted}
      completedCount={progress?.completedCount || 0}
      canSave={canSave}
      saving={saving}
      onAcknowledgeLesson={() => acknowledge('acknowledge_lesson')}
      onAcknowledgeSource={() => acknowledge('acknowledge_source_analysis')}
      onAcknowledgeReflection={() => acknowledge('acknowledge_reflection', 'private')}
      onComplete={handleComplete}
      message={message}
    />
  );
}