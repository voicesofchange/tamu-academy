/**
 * The lesson steps of one template course module, in the order
 * TemplateCourseLesson renders them. Each step is a section of the page (its
 * anchor id) and, where it has one, the completion requirement that ticks it.
 * A step the module does not carry is left out, as the lesson leaves it out.
 */

export const STEP_ANCHOR_PREFIX = 'tpl-step-';

/** Label key (in TEMPLATE_PLAYER_LABELS) for each completion requirement. */
export const REQUIREMENT_LABEL_KEYS = {
  media: 'stepMedia',
  lesson: 'stepLesson',
  activity: 'stepActivity',
  scenario: 'stepRequirements',
  knowledge_check: 'stepKnowledgeCheck',
  reflection: 'stepReflection',
};

export function stepAnchorId(id) {
  return `${STEP_ANCHOR_PREFIX}${id}`;
}

export function moduleSteps(module) {
  if (!module) return [];
  const steps = [];
  if (module.video) steps.push({ id: 'media', labelKey: 'stepMedia', requirement: 'media' });
  if (Array.isArray(module.goals) && module.goals.length > 0) steps.push({ id: 'goals', labelKey: 'stepGoals' });
  steps.push({ id: 'lesson', labelKey: 'stepLesson', requirement: 'lesson' });
  if (module.activity) steps.push({ id: 'activity', labelKey: 'stepActivity', requirement: 'activity' });
  if (Array.isArray(module.keyTerms) && module.keyTerms.length > 0) steps.push({ id: 'key-terms', labelKey: 'stepKeyTerms' });
  if (module.quiz) steps.push({ id: 'knowledge-check', labelKey: 'stepKnowledgeCheck', requirement: 'knowledge_check' });
  if (module.reflection) steps.push({ id: 'reflection', labelKey: 'stepReflection', requirement: 'reflection' });
  steps.push({ id: 'requirements', labelKey: 'stepRequirements', requirement: '__module__' });

  const requirements = new Set(module.requirements || []);
  const done = new Set((module.progress && module.progress.completedSteps) || []);
  const moduleComplete = !!(module.progress && module.progress.completed);

  return steps.map((step) => {
    let tracked = false;
    let completed = false;
    if (step.requirement === '__module__') {
      tracked = true;
      completed = moduleComplete;
    } else if (step.requirement && requirements.has(step.requirement)) {
      tracked = true;
      completed = moduleComplete || done.has(step.requirement);
    }
    return { ...step, tracked, completed };
  });
}
