import { normalizeLessonVideos } from '@/components/courses/module/EconomicsMediaSection';

/**
 * The lesson steps of one Understanding African Economies module for the
 * course player's outline, in the order EconomicsLessonTemplate renders them.
 * Each step is a section of the page (its tpl-step-* anchor) and, where it
 * has one, the completion key from getEconomicsProgress that ticks it:
 *
 *   core_media_reviewed     — the recorded lessons and "while you watch"
 *   lesson_reviewed         — introduction, explanation, concepts, case study
 *   activity_acknowledged   — the applied activity
 *   knowledge_check_passed  — the knowledge check (graded server-side)
 *   reflection_acknowledged — the reflection questions
 *
 * A key the module does not require (progress.completionKeys) is shown
 * without a tick, and a section the module does not carry is left out.
 */

/** Readable label key (in COURSE_PLAYER_LABELS) for each completion key. */
export const ECONOMICS_KEY_LABEL_KEYS = {
  core_media_reviewed: 'stepRecordedLessons',
  lesson_reviewed: 'stepLessonAndCaseStudy',
  activity_acknowledged: 'stepAppliedActivity',
  knowledge_check_passed: 'stepKnowledgeCheck',
  reflection_acknowledged: 'stepReflection',
};

const has = (value) => (Array.isArray(value) ? value.length > 0 : !!value);

export function economicsModuleSteps(module, progress) {
  if (!module) return [];
  const required = progress && Array.isArray(progress.completionKeys) ? new Set(progress.completionKeys) : null;
  const done = new Set((progress && progress.completedKeys) || []);
  const moduleComplete = !!(progress && progress.moduleCompleted);
  const step = (id, labelKey, key) => {
    const tracked = !!key && (!required || required.has(key));
    return { id, labelKey, tracked, completed: tracked && (moduleComplete || done.has(key)) };
  };
  const hasMedia = normalizeLessonVideos(module).length > 0;

  const steps = [];
  if (has(module.learningObjectives)) steps.push(step('objectives', 'stepObjectives'));
  if (has(module.overview)) steps.push(step('introduction', 'stepIntroduction', 'lesson_reviewed'));
  if (hasMedia) steps.push(step('media', 'stepRecordedLessons', 'core_media_reviewed'));
  if (hasMedia && has(module.watchingQuestions)) steps.push(step('while-watching', 'stepWhileWatching', 'core_media_reviewed'));
  if (has(module.explanation)) steps.push(step('explanation', 'stepExplanation', 'lesson_reviewed'));
  if (has(module.keyConcepts)) steps.push(step('concepts', 'stepConcepts', 'lesson_reviewed'));
  if (module.caseStudy) steps.push(step('case-study', 'stepCaseStudy', 'lesson_reviewed'));
  if (module.policyActivity || module.activity) steps.push(step('activity', 'stepAppliedActivity', 'activity_acknowledged'));
  if (module.quiz) steps.push(step('knowledge-check', 'stepKnowledgeCheck', 'knowledge_check_passed'));
  if (has(module.reflectionQuestions)) steps.push(step('reflection', 'stepReflection', 'reflection_acknowledged'));
  if (has(module.completionRequirements)) {
    steps.push({ id: 'requirements', labelKey: 'stepRequirements', tracked: true, completed: moduleComplete });
  }
  if (has(module.closingText)) steps.push(step('closing', 'stepClosing'));
  if (has(module.sources)) steps.push(step('sources', 'stepSources'));
  return steps;
}
