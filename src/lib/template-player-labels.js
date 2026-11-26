/**
 * Learner-facing interface labels for the template course player — the
 * course outline sidebar, the course progress bar and the "Mark Complete &
 * Continue" footer that frame every template course module.
 *
 * The module's own content is translated server-side in
 * getTemplateCourseModule; these are the words around it. They are passed to
 * useTranslatedContent by TemplatePlayerLabelsProvider, so this object must
 * stay a stable module-level reference. Strings with values use {placeholders}
 * and are filled with fillTemplate after translation.
 */
export const TEMPLATE_PLAYER_LABELS = {
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
  // Lesson steps listed under the current module
  stepMedia: 'Recorded material',
  stepGoals: 'What you will learn',
  stepLesson: 'The lesson',
  stepActivity: 'Try it',
  stepKeyTerms: 'Key terms',
  stepKnowledgeCheck: 'Knowledge check',
  stepReflection: 'Reflection',
  stepRequirements: 'Completion requirements',
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
};
