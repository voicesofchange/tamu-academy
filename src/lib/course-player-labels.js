/**
 * Learner-facing interface labels for the course player — the course outline
 * sidebar, the course progress bar and the "Mark Complete & Continue" footer
 * that frame a module in every course that uses the player (the template
 * courses and Sauti za Soko).
 *
 * The module's own content is translated server-side by each course's module
 * function; these are the words around it. They are passed to
 * useTranslatedContent by CoursePlayerLabelsProvider, so this object must stay
 * a stable module-level reference. Strings with values use {placeholders} and
 * are filled with fillTemplate after translation. Keep the set under the
 * translatePageContent cap of 100 keys.
 */
export const COURSE_PLAYER_LABELS = {
  // Sidebar
  outlineHeading: 'Course outline',
  showOutline: 'Show course outline',
  hideOutline: 'Hide course outline',
  closeOutline: 'Close course outline',
  outlineButton: 'Outline',
  thisModule: 'In this module',
  moduleStatusCompleted: 'Completed',
  moduleStatusInProgress: 'In progress',
  moduleStatusNotStarted: 'Not started',
  moduleStatusLocked: 'Locked',
  moduleStatusCurrent: 'Current module',
  lockedPrerequisite: 'Opens after {module}',
  lockedUnpublished: 'Coming soon',
  stepDone: 'Done',
  stepToDo: 'To do',
  // Lesson steps listed under the current module — template courses
  stepMedia: 'Recorded material',
  stepGoals: 'What you will learn',
  stepLesson: 'The lesson',
  stepActivity: 'Try it',
  stepKeyTerms: 'Key terms',
  stepKnowledgeCheck: 'Knowledge check',
  stepReflection: 'Reflection',
  stepRequirements: 'Completion requirements',
  // Lesson steps — Sauti za Soko
  stepObjectives: 'Learning objectives',
  stepIntroduction: 'Introduction',
  stepContext: 'Context notes',
  stepConcepts: 'Key concepts',
  stepCase: 'Kiambu market case',
  stepComparison: 'International comparison',
  stepActionPlan: 'My Soko Action Plan',
  stepDiscussion: 'Peer discussion',
  stepCoreReading: 'Key concepts, context notes and comparison',
  stepLessonAndCase: 'Lesson and market case',
  stepClosing: 'Closing',
  stepSources: 'Sources',
  // Progress bar
  courseProgress: 'Course progress',
  percentComplete: '{percent}% complete',
  modulesComplete: '{completed} of {total} modules complete',
  // Footer
  markCompleteContinue: 'Mark Complete & Continue',
  markComplete: 'Mark Complete',
  continueNext: 'Continue',
  checking: 'Checking…',
  moduleDone: 'Module complete',
  courseDone: 'All modules complete',
  stillNeeds: 'Still to do: {steps}',
  completeFailed: 'We could not complete the module just now. Please try again.',
  previewOnly: 'Preview: progress is not saved for this module.',
  nextUp: 'Next: {title}',
  courseCompletion: 'Course completion',
};
