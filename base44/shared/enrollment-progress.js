/**
 * enrollment-progress — keeps a learner's CourseEnrollment in step with the
 * module-level ModuleProgress records that actually drive their progress.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * Course progress is a question about modules, so it is derived from
 * ModuleProgress every time rather than incremented, which makes the result
 * correct after a re-run and safe to recalculate at any point. Only the
 * progress fields are written: enrollment status, completion timestamps and
 * certificate eligibility stay owned by the course completion functions.
 */
import { getRequiredModuleRoutes } from './course-registry.js';

/** The moment a ModuleProgress row was last touched. */
function touchedAt(row) {
  return row?.updated_at || row?.updated_date || row?.created_date || null;
}

/**
 * How one course reads for one learner, from their module records alone.
 *
 * Returns `progress_percentage: null` when the course is not in the registry,
 * so an unknown or retired slug never resets a learner's recorded progress.
 */
export function computeCourseProgress(courseSlug, moduleRows) {
  const required = getRequiredModuleRoutes(courseSlug);
  if (required.length === 0) {
    return { total_modules: 0, completed_modules: 0, progress_percentage: null, last_module_slug: null };
  }

  // Collapse repeated rows for the same module: a completed row wins, then
  // the most recently touched one.
  const byRoute = new Map();
  for (const row of moduleRows || []) {
    if (!row || !row.module_slug) continue;
    const current = byRoute.get(row.module_slug);
    if (!current) {
      byRoute.set(row.module_slug, row);
      continue;
    }
    if (row.status === 'completed' && current.status !== 'completed') {
      byRoute.set(row.module_slug, row);
      continue;
    }
    if (row.status === current.status && String(touchedAt(row)) > String(touchedAt(current))) {
      byRoute.set(row.module_slug, row);
    }
  }

  const completed = required.filter((route) => byRoute.get(route)?.status === 'completed');

  let latest = null;
  for (const row of byRoute.values()) {
    if (!touchedAt(row)) continue;
    if (!latest || String(touchedAt(row)) > String(touchedAt(latest))) latest = row;
  }

  return {
    total_modules: required.length,
    completed_modules: completed.length,
    progress_percentage: Math.max(0, Math.min(100, Math.round((completed.length / required.length) * 100))),
    last_module_slug: latest ? latest.module_slug : null,
  };
}

/**
 * Recalculate one learner's enrollment for one course.
 *
 * Never throws: a progress sync must not fail the module completion that
 * triggered it, so a failure is logged and reported instead.
 */
export async function syncCourseEnrollmentProgress(base44, { learnerId, courseSlug }) {
  try {
    if (!learnerId || !courseSlug) return { updated: 0 };

    const [moduleRows, enrollments] = await Promise.all([
      base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
      }),
      base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
      }),
    ]);

    const computed = computeCourseProgress(courseSlug, moduleRows);
    if (computed.progress_percentage === null) return { updated: 0, skipped: 'unknown_course' };

    let updated = 0;
    for (const enrollment of enrollments || []) {
      const isCompleted = enrollment.status === 'completed';
      const nextProgress = isCompleted ? 100 : computed.progress_percentage;
      const nextModule = computed.last_module_slug;

      const patch = {};
      if (enrollment.progress_percentage !== nextProgress) patch.progress_percentage = nextProgress;
      if (nextModule && enrollment.last_module_slug !== nextModule) patch.last_module_slug = nextModule;
      if (Object.keys(patch).length === 0) continue;

      patch.updated_at = new Date().toISOString();
      await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, patch);
      updated++;
    }

    return { updated, ...computed };
  } catch (error) {
    console.error('[enrollment-progress] sync failed:', error && error.message);
    return { updated: 0, error: error && error.message };
  }
}

/**
 * Recalculate every existing enrollment from its ModuleProgress records.
 *
 * Writes only records whose values actually change, so running it twice
 * leaves the second run with nothing to do.
 */
export async function backfillEnrollmentProgress(base44, { dryRun = false } = {}) {
  const [enrollments, progressRows] = await Promise.all([
    base44.asServiceRole.entities.CourseEnrollment.list('-created_date', 5000),
    base44.asServiceRole.entities.ModuleProgress.list('-updated_date', 20000),
  ]);

  const rowsByLearnerCourse = new Map();
  for (const row of progressRows || []) {
    const key = `${row.learner_id}|${row.course_slug}`;
    if (!rowsByLearnerCourse.has(key)) rowsByLearnerCourse.set(key, []);
    rowsByLearnerCourse.get(key).push(row);
  }

  const changes = [];
  let unchanged = 0;
  let unknownCourse = 0;

  for (const enrollment of enrollments || []) {
    const key = `${enrollment.learner_id}|${enrollment.course_slug}`;
    const computed = computeCourseProgress(
      enrollment.course_slug,
      rowsByLearnerCourse.get(key) || [],
    );

    if (computed.progress_percentage === null) {
      unknownCourse++;
      continue;
    }

    const isCompleted = enrollment.status === 'completed';
    const nextProgress = isCompleted ? 100 : computed.progress_percentage;
    const nextModule = computed.last_module_slug;

    const patch = {};
    if (enrollment.progress_percentage !== nextProgress) patch.progress_percentage = nextProgress;
    if (nextModule && enrollment.last_module_slug !== nextModule) patch.last_module_slug = nextModule;

    if (Object.keys(patch).length === 0) {
      unchanged++;
      continue;
    }

    if (dryRun) {
      changes.push({
        id: enrollment.id,
        course_slug: enrollment.course_slug,
        from: {
          progress_percentage: enrollment.progress_percentage ?? null,
          last_module_slug: enrollment.last_module_slug || null,
        },
        to: patch,
      });
      continue;
    }

    await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
      ...patch,
      updated_at: new Date().toISOString(),
    });
  }

  return {
    dry_run: dryRun,
    enrollments: (enrollments || []).length,
    updated: dryRun ? changes.length : (enrollments || []).length - unchanged - unknownCourse,
    unchanged,
    unknown_course: unknownCourse,
    changes: changes.slice(0, 50),
  };
}