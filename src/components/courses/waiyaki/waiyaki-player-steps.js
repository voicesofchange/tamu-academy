/**
 * The lesson steps of one Waiyaki wa Hinga module for the course player's
 * outline, in the order WaiyakiModuleTemplate renders them. Each step is a
 * section of the page (its tpl-step-* anchor) and, where it has one, the
 * completion key from getWaiyakiCourseCompletion that ticks it:
 *
 *   lesson_reviewed              — the module narrative and the key terms
 *   source_analysis_acknowledged — the source analysis
 *   reflection_acknowledged      — the reflection
 *
 * Every module requires all three keys. Where a module has no source-analysis
 * or reflection section of its own, the step is still listed and links to the
 * completion requirements, where the learner records it.
 */
import { stepAnchorId } from '@/components/courses/player/step-anchors';

/** Every module's completion keys, mirroring WAIYAKI_COMPLETION_KEYS. */
export const WAIYAKI_COMPLETION_KEYS = ['lesson_reviewed', 'source_analysis_acknowledged', 'reflection_acknowledged'];

/** Readable label key (in COURSE_PLAYER_LABELS) for each completion key. */
export const WAIYAKI_KEY_LABEL_KEYS = {
  lesson_reviewed: 'stepNarrativeAndTerms',
  source_analysis_acknowledged: 'stepSourceAnalysis',
  reflection_acknowledged: 'stepReflection',
};

const has = (value) => (Array.isArray(value) ? value.length > 0 : !!value);

export function waiyakiModuleSteps(module, completedKeys, moduleCompleted) {
  if (!module) return [];
  const done = new Set(completedKeys || []);
  const step = (id, labelKey, key) => ({
    id,
    labelKey,
    tracked: !!key,
    completed: !!key && (moduleCompleted || done.has(key)),
  });
  const steps = [];
  if (has(module.learningObjectives)) steps.push(step('objectives', 'stepObjectives'));
  if (module.lead) steps.push(step('introduction', 'stepIntroduction'));
  if (has(module.sections)) steps.push(step('lesson', 'stepLesson', 'lesson_reviewed'));
  if (has(module.keyTerms)) steps.push(step('key-terms', 'stepKeyTerms', 'lesson_reviewed'));
  const atRequirements = (s) => ({ ...s, anchor: stepAnchorId('requirements') });
  const sourceStep = step('source-analysis', 'stepSourceAnalysis', 'source_analysis_acknowledged');
  steps.push(module.sourceAnalysis ? sourceStep : atRequirements(sourceStep));
  const reflectionStep = step('reflection', 'stepReflection', 'reflection_acknowledged');
  steps.push(module.reflection && has(module.reflection.groups) ? reflectionStep : atRequirements(reflectionStep));
  steps.push({ id: 'requirements', labelKey: 'stepRequirements', tracked: true, completed: !!moduleCompleted });
  steps.push(step('closing', 'stepClosing'));
  return steps;
}
