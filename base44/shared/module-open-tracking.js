/**
 * module-open-tracking — records the first time a learner opens a module.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * Opening is deliberately kept apart from completing: a ModuleOpen record is
 * written the first time a module's content is served to an enrolled learner,
 * and nothing about ModuleProgress, enrollment status, completion rules or
 * certificates reads from it. One record per learner, course and module, so the
 * stored value stays the first open rather than the latest one.
 */

/**
 * Record a learner's first open of one module.
 *
 * Never throws: a view is not worth failing the lesson request that triggered
 * it, so a failure is logged and reported instead.
 */
export async function recordModuleOpened(base44, { learnerId, courseSlug, moduleSlug }) {
  try {
    if (!learnerId || !courseSlug || !moduleSlug) return { recorded: false };

    const existing = await base44.asServiceRole.entities.ModuleOpen.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleSlug,
    });
    if (existing && existing.length > 0) return { recorded: false, alreadyRecorded: true };

    await base44.asServiceRole.entities.ModuleOpen.create({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleSlug,
      opened_at: new Date().toISOString(),
    });
    return { recorded: true };
  } catch (error) {
    console.error('[module-open-tracking] open not recorded:', error && error.message);
    return { recorded: false, error: error && error.message };
  }
}