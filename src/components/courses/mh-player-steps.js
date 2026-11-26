/**
 * The lesson steps of a Mental Health, Community and Culture module for the
 * course player's outline.
 *
 * The seven lessons are built differently, but they share section ids
 * (core-media, key-concepts, interactive-scenario, private-reflection, …).
 * The outline lists, in this order, every known section that the rendered
 * lesson actually contains, linking to the section's own id. A step is ticked
 * from the module's completion keys, which each module names a little
 * differently (Module 1 uses underscore keys from its requirement map).
 */

export const MH_SECTIONS = [
  { id: 'learning-objectives', labelKey: 'stepObjectives' },
  { id: 'core-media', labelKey: 'stepMedia' },
  { id: 'questions-to-consider', labelKey: 'stepQuestionsToConsider' },
  { id: 'tamu-introduction', labelKey: 'stepIntroduction' },
  { id: 'explanation', labelKey: 'stepExplanation' },
  { id: 'key-concepts', labelKey: 'stepConcepts' },
  { id: 'comparative-program-summaries', labelKey: 'stepProgrammeSummaries' },
  { id: 'case-study', labelKey: 'stepCaseStudyGeneral' },
  { id: 'interactive-scenario', labelKey: 'stepScenario' },
  { id: 'community-of-care-map', labelKey: 'stepCareMap' },
  { id: 'strength-without-silence-lab', labelKey: 'stepStrengthLab' },
  { id: 'bridge-conversation-lab', labelKey: 'stepBridgeLab' },
  { id: 'care-design-lab', labelKey: 'stepCareDesignLab' },
  { id: 'pathways-lab', labelKey: 'stepPathwaysLab' },
  { id: 'amplify-lab', labelKey: 'stepAmplifyLab' },
  { id: 'story-lab', labelKey: 'stepStoryLab' },
  { id: 'private-reflection', labelKey: 'stepReflection' },
  { id: 'knowledge-check', labelKey: 'stepKnowledgeCheck' },
  { id: 'completion-requirements', labelKey: 'stepRequirements' },
  { id: 'closing-section', labelKey: 'stepClosing' },
  { id: 'optional-extended-assignment', labelKey: 'stepOptionalAssignment' },
  { id: 'sources-further-learning', labelKey: 'stepSources' },
  { id: 'sources', labelKey: 'stepSources' },
];

/** The section each completion key ticks (one key may tick several). */
const KEY_SECTIONS = {
  'core-media': ['core-media'],
  'core-media-pair': ['core-media'],
  'core-media-reviewed': ['core-media'],
  core_media_acknowledged: ['core-media'],
  'lesson-and-case-study': ['tamu-introduction', 'key-concepts', 'case-study'],
  'lesson-and-cases': ['tamu-introduction', 'key-concepts', 'case-study'],
  lesson_and_case_reviewed: ['tamu-introduction', 'key-concepts', 'case-study'],
  'story-to-structure-reviewed': ['tamu-introduction', 'explanation'],
  'interactive-scenario': ['interactive-scenario'],
  'tumaini-scenario': ['interactive-scenario'],
  'mwangaza-scenario': ['interactive-scenario'],
  'kijani-scenario': ['interactive-scenario'],
  activity_acknowledged: ['community-of-care-map'],
  'strength-without-silence-lab': ['strength-without-silence-lab'],
  'bridge-conversation-lab': ['bridge-conversation-lab'],
  'care-design-lab': ['care-design-lab'],
  'pathways-lab': ['pathways-lab'],
  'amplify-lab': ['amplify-lab'],
  'story-lab': ['story-lab'],
  'knowledge-check-passed': ['knowledge-check'],
  knowledge_check_passed: ['knowledge-check'],
  'private-reflection': ['private-reflection'],
  reflection_acknowledged: ['private-reflection'],
  'course-closing-reviewed': ['closing-section'],
};

/** Readable label key (in COURSE_PLAYER_LABELS) for each completion key. */
export const MH_KEY_LABEL_KEYS = {
  'core-media': 'stepMedia',
  'core-media-pair': 'stepMedia',
  'core-media-reviewed': 'stepMedia',
  core_media_acknowledged: 'stepMedia',
  'lesson-and-case-study': 'stepLessonAndCaseStudyGeneral',
  'lesson-and-cases': 'stepLessonAndCaseStudyGeneral',
  lesson_and_case_reviewed: 'stepLessonAndCaseStudyGeneral',
  'story-to-structure-reviewed': 'stepExplanation',
  'interactive-scenario': 'stepScenario',
  'tumaini-scenario': 'stepScenario',
  'mwangaza-scenario': 'stepScenario',
  'kijani-scenario': 'stepScenario',
  activity_acknowledged: 'stepCareMap',
  'strength-without-silence-lab': 'stepStrengthLab',
  'bridge-conversation-lab': 'stepBridgeLab',
  'care-design-lab': 'stepCareDesignLab',
  'pathways-lab': 'stepPathwaysLab',
  'amplify-lab': 'stepAmplifyLab',
  'story-lab': 'stepStoryLab',
  'knowledge-check-completed': 'stepKnowledgeCheck',
  'knowledge-check-passed': 'stepKnowledgeCheck',
  knowledge_check_answered: 'stepKnowledgeCheck',
  knowledge_check_passed: 'stepKnowledgeCheck',
  'private-reflection': 'stepReflection',
  reflection_acknowledged: 'stepReflection',
  'course-closing-reviewed': 'stepClosing',
};

/**
 * The completion state the player knows for this module, normalised from
 * either shape the progress components report:
 *   Modules 2–7: { completionKeys, completedKeys, moduleCompleted }
 *   Module 1:    { requirements: { key: true|false }, moduleCompleted }
 */
function normalise(progress) {
  if (!progress) return { required: [], done: new Set(), moduleCompleted: false };
  if (progress.requirements && typeof progress.requirements === 'object') {
    const keys = Object.keys(progress.requirements);
    return {
      required: keys,
      done: new Set(keys.filter((k) => progress.requirements[k] === true)),
      moduleCompleted: !!progress.moduleCompleted,
    };
  }
  return {
    required: Array.isArray(progress.completionKeys) ? progress.completionKeys : [],
    done: new Set(Array.isArray(progress.completedKeys) ? progress.completedKeys : []),
    moduleCompleted: !!progress.moduleCompleted,
  };
}

/**
 * @param presentIds  ids of the sections the rendered lesson contains
 * @param progress    the module's progress as reported (may be null)
 * @param moduleCompleted  completion from the course outline (server)
 */
export function mhModuleSteps(presentIds, progress, moduleCompleted = false) {
  const present = new Set(presentIds);
  const { required, done, moduleCompleted: reported } = normalise(progress);
  const complete = moduleCompleted || reported;

  // Which sections each required key ticks, and whether every key for a
  // section is done.
  const sectionKeys = new Map();
  for (const key of required) {
    for (const id of KEY_SECTIONS[key] || []) {
      if (!sectionKeys.has(id)) sectionKeys.set(id, []);
      sectionKeys.get(id).push(key);
    }
  }

  const seen = new Set();
  const steps = [];
  for (const section of MH_SECTIONS) {
    if (!present.has(section.id) || seen.has(section.labelKey + section.id)) continue;
    // "sources" and "sources-further-learning" are the same step.
    if (section.labelKey === 'stepSources' && steps.some((s) => s.labelKey === 'stepSources')) continue;
    seen.add(section.labelKey + section.id);
    if (section.id === 'completion-requirements') {
      steps.push({ id: section.id, anchor: section.id, labelKey: section.labelKey, tracked: true, completed: complete });
      continue;
    }
    const keys = sectionKeys.get(section.id) || [];
    const tracked = keys.length > 0;
    steps.push({
      id: section.id,
      anchor: section.id,
      labelKey: section.labelKey,
      tracked,
      completed: tracked && (complete || keys.every((k) => done.has(k))),
    });
  }
  return steps;
}

/** The readable names of the keys that are still missing. */
export function mhMissingNames(keys, labels) {
  const names = [];
  for (const key of keys || []) {
    const name = labels[MH_KEY_LABEL_KEYS[key]] || String(key).replace(/[-_]/g, ' ');
    if (!names.includes(name)) names.push(name);
  }
  return names;
}
