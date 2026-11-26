/**
 * The lesson steps of one Sauti za Soko module for the course player's
 * outline, in the order SokoExpandedTemplate renders them. Each step is a
 * section of the page (its tpl-step-* anchor) and, where it has one, the
 * completion key from getSokoProgress that ticks it:
 *
 *   lesson_reviewed          — the introduction and the Kiambu market case
 *   core_reading_reviewed    — context notes, key concepts, comparison
 *   activity_acknowledged    — the My Soko Action Plan section (saved)
 *   knowledge_check_passed   — the knowledge check (graded server-side)
 *   reflection_acknowledged  — the reflection
 *
 * The peer discussion is a course-level requirement, not a module one, so it
 * is listed without a tick. A section the module does not carry is left out.
 */

/** Readable label key (in COURSE_PLAYER_LABELS) for each completion key. */
export const SOKO_KEY_LABEL_KEYS = {
  lesson_reviewed: 'stepLessonAndCase',
  core_reading_reviewed: 'stepCoreReading',
  activity_acknowledged: 'stepActionPlan',
  knowledge_check_passed: 'stepKnowledgeCheck',
  reflection_acknowledged: 'stepReflection',
};

const has = (value) => Array.isArray(value) ? value.length > 0 : !!value;

export function sokoModuleSteps(module, progress) {
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
  if (has(module.learningObjectives)) steps.push(step('objectives', 'stepObjectives'));
  if (has(module.overview)) steps.push(step('introduction', 'stepIntroduction', 'lesson_reviewed'));
  if (has(module.contextNotes)) steps.push(step('context', 'stepContext', 'core_reading_reviewed'));
  if (has(module.keyConcepts)) steps.push(step('concepts', 'stepConcepts', 'core_reading_reviewed'));
  if (module.localCase) steps.push(step('case', 'stepCase', 'lesson_reviewed'));
  if (module.internationalComparison) steps.push(step('comparison', 'stepComparison', 'core_reading_reviewed'));
  if (module.activity) steps.push(step('action-plan', 'stepActionPlan', 'activity_acknowledged'));
  if (module.kiswahiliPrompt) steps.push(step('discussion', 'stepDiscussion'));
  if (module.quiz) steps.push(step('knowledge-check', 'stepKnowledgeCheck', 'knowledge_check_passed'));
  if (has(module.reflectionQuestions)) steps.push(step('reflection', 'stepReflection', 'reflection_acknowledged'));
  if (has(module.completionRequirements)) {
    steps.push({ id: 'requirements', labelKey: 'stepRequirements', tracked: true, completed: moduleComplete });
  }
  if (has(module.closingText)) steps.push(step('closing', 'stepClosing'));
  if (has(module.sources)) steps.push(step('sources', 'stepSources'));
  return steps;
}
