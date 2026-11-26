/**
 * The lesson steps of one Building Wealth Together module for the course
 * player's outline, in the order BuildingWealthLessonTemplate renders them.
 * Each step is a section of the page (its tpl-step-* anchor) and, where it
 * has one, the completion key from getWealthProgress that ticks it:
 *
 *   core_media_reviewed     — Watch
 *   lesson_reviewed         — the lesson and the worked example
 *   activity_acknowledged   — Try it
 *   dilemma_acknowledged    — the dilemma
 *   knowledge_check_passed  — the concept check (graded server-side)
 *   reflection_acknowledged — the reflection
 *
 * A section the module does not carry is left out.
 */

/** Readable label key (in COURSE_PLAYER_LABELS) for each completion key. */
export const WEALTH_KEY_LABEL_KEYS = {
  core_media_reviewed: 'stepMedia',
  lesson_reviewed: 'stepLessonAndWorkedExample',
  activity_acknowledged: 'stepActivity',
  dilemma_acknowledged: 'stepDilemma',
  knowledge_check_passed: 'stepConceptCheck',
  reflection_acknowledged: 'stepReflection',
};

const has = (value) => (Array.isArray(value) ? value.length > 0 : !!value);

export function wealthModuleSteps(module, progress) {
  if (!module) return [];
  const done = new Set((progress && progress.completedKeys) || []);
  const moduleComplete = !!(progress && progress.moduleCompleted);
  const step = (id, labelKey, key) => ({
    id,
    labelKey,
    tracked: !!key,
    completed: !!key && (moduleComplete || done.has(key)),
  });

  const steps = [];
  if (module.welcomeFilm) steps.push(step('welcome', 'stepWelcome'));
  if (has(module.goals)) steps.push(step('goals', 'stepGoals'));
  if (module.watch) steps.push(step('watch', 'stepMedia', 'core_media_reviewed'));
  if (has(module.lessonSections)) steps.push(step('lesson', 'stepLesson', 'lesson_reviewed'));
  if (module.workedExample) steps.push(step('worked-example', 'stepWorkedExample', 'lesson_reviewed'));
  if (module.tryIt) steps.push(step('try-it', 'stepActivity', 'activity_acknowledged'));
  if (has(module.whereYouLive)) steps.push(step('where-you-live', 'stepWhereYouLive'));
  if (module.dilemma) steps.push(step('dilemma', 'stepDilemma', 'dilemma_acknowledged'));
  if (module.quiz) steps.push(step('concept-check', 'stepConceptCheck', 'knowledge_check_passed'));
  if (module.reflection) steps.push(step('reflection', 'stepReflection', 'reflection_acknowledged'));
  if (has(module.sources) || has(module.unsourced)) steps.push(step('sources', 'stepSources'));
  steps.push({ id: 'requirements', labelKey: 'stepRequirements', tracked: true, completed: moduleComplete });
  return steps;
}
