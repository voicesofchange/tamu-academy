import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import MhModuleShell from '@/components/courses/MhModuleShell';
import MhModuleLesson from '@/components/courses/MhModuleLesson';
import MhModule2Lesson from '@/components/courses/MhModule2Lesson';
import MhModule3Lesson from '@/components/courses/MhModule3Lesson';
import MhModule4Lesson from '@/components/courses/MhModule4Lesson';
import MhModule5Lesson from '@/components/courses/MhModule5Lesson';
import MhModule6Lesson from '@/components/courses/MhModule6Lesson';
import MhModule7Lesson from '@/components/courses/MhModule7Lesson';
import { getMentalHealthModule } from '@/lib/mental-health-tracks';
import PageNotFound from '@/lib/PageNotFound';

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
  const found = getMentalHealthModule(COURSE_SLUG, moduleRoute);
  const [state, setState] = useState({ status: 'loading', module: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthModule', {
          courseSlug: COURSE_SLUG,
          moduleRoute,
        });
        if (cancelled) return;
        const mod = res && res.data && res.data.module;
        if (mod && mod.contentAvailable && mod.lesson) {
          setState({ status: 'lesson', module: mod });
        } else if (mod) {
          setState({ status: 'shell', module: mod });
        } else {
          setState({ status: 'shell', module: null });
        }
      } catch (err) {
        if (cancelled) return;
        // 403 (non-admin during development) and any network error both
        // fall back to the public shell state — no protected content is
        // displayed to a viewer who is not authorized for this course.
        setState({ status: 'shell', module: null });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moduleRoute]);

  if (!found) return <PageNotFound />;

  if (state.status === 'lesson' && state.module && state.module.lesson) {
    // Select the per-module lesson renderer. Module 1 keeps its
    // existing MhModuleLesson path unchanged; Module 2 uses its own
    // Stage 1 renderer (MhModule2Lesson). Other modules remain on the
    // MhModuleShell fallback until their content stages land.
    if (moduleRoute === 'module-2') {
      return (
        <MhModule2Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    if (moduleRoute === 'module-3') {
      return (
        <MhModule3Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    if (moduleRoute === 'module-4') {
      return (
        <MhModule4Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    if (moduleRoute === 'module-5') {
      return (
        <MhModule5Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    if (moduleRoute === 'module-6') {
      return (
        <MhModule6Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    if (moduleRoute === 'module-7') {
      return (
        <MhModule7Lesson
          course={found.course}
          module={found.module}
          lesson={state.module.lesson}
        />
      );
    }
    return (
      <MhModuleLesson
        course={found.course}
        module={found.module}
        lesson={state.module.lesson}
      />
    );
  }

  return <MhModuleShell course={found.course} module={found.module} />;
}