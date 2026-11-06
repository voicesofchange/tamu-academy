/**
 * Course template — the course registry.
 *
 * HOW TO ADD A NEW COURSE WITH THE TEMPLATE (short version; the full guide is
 * in base44/shared/course-template-guide.md):
 *
 *   1. Write the course's module content in
 *      base44/shared/course-template-curriculum.js, keyed by the course slug
 *      and then by module route.
 *   2. Add one entry to TEMPLATE_COURSE_REGISTRY below: slug, title, pillar,
 *      track, completion statement, certificate rules, and the ordered module
 *      list with each module's route, number, title, published flag and
 *      prerequisite.
 *   3. Nothing else. The six generic backend functions
 *      (enrollTemplateCourse, getTemplateCourseModule,
 *      updateTemplateCourseProgress, checkTemplateCourseQuiz,
 *      completeTemplateCourseModule, issueTemplateCourseCertificate) and the
 *      single module page (src/pages/TemplateCourseModule.jsx, route
 *      /courses/:courseSlug/:moduleRoute) pick the course up from this entry.
 *
 * This file is server-side only. Never import it from src/.
 *
 * A course registered here is also added to the shared course registry
 * automatically (see TEMPLATE_COURSE_CONFIGS at the bottom), so course
 * progress, enrollment progress and certificate issuance work for it without
 * any further wiring.
 */

/**
 * The steps a module can require, and the ModuleProgress field each one
 * writes. `knowledge_check` is deliberately absent: quiz_passed is set only by
 * the server-side grader, never by a progress update.
 */
export const COMPLETION_STEP_FIELDS = {
  media: 'core_media_acknowledged_at',
  lesson: 'lesson_and_case_reviewed_at',
  activity: 'activity_acknowledged_at',
  scenario: 'interactive_scenario_completed_at',
  reflection: 'reflection_acknowledged_at',
};

export const COMPLETION_STEP_LABELS = {
  media: 'Watch or listen to the module\u2019s recorded material.',
  lesson: 'Read the lesson and follow the worked example.',
  activity: 'Complete the Try it activity.',
  scenario: 'Work through the scenario and write your position.',
  knowledge_check: 'Pass the knowledge check.',
  reflection: 'Write your reflection.',
};

export const KNOWLEDGE_CHECK_STEP = 'knowledge_check';

/** Every step a module may declare in its `requirements` list. */
export const KNOWN_COMPLETION_STEPS = [...Object.keys(COMPLETION_STEP_FIELDS), KNOWLEDGE_CHECK_STEP];

/**
 * The registry. Add one entry per course.
 *
 * Certificate rules use the same shape as the rest of the academy's courses,
 * so issueTemplateCourseCertificate reuses the shared issuance logic:
 *   includeEnrollmentId      store the enrollment id on the certificate
 *   verificationCode         generate a "TAMU-…" verification code
 *   requiresCompletedEnrollment  only issue once the enrollment is completed
 *   finalizesEnrollment      mark the enrollment completed as the certificate issues
 */
export const TEMPLATE_COURSE_REGISTRY = {
  // ── Example course ──────────────────────────────────────────────────────
  // A working demonstration of the template. Read it, then delete it when you
  // add your own course. Its second module is unpublished on purpose, so you
  // can see the publication gate and the prerequisite chain in action.
  'template-example': {
    slug: 'template-example',
    title: 'Template Example Course: Reading a Community Economy',
    pillar: 'Course Template',
    track: 'Template Course',
    completionStatement:
      'This certifies that the learner named below has completed every module of the Template Example Course, including the module lessons, activities, knowledge checks and reflections. This certificate confirms completion of an educational course. It does not constitute professional licensing, accreditation or authorisation to provide financial, legal or business advice.',
    enrollmentOpen: true,
    certificate: {
      includeEnrollmentId: true,
      verificationCode: true,
      requiresCompletedEnrollment: false,
      extraRequirements: 'none',
      finalizesEnrollment: true,
    },
    modules: [
      {
        route: 'module-1',
        number: 'Module 1',
        title: 'Reading a Local Economy',
        published: true,
        prerequisite: null,
      },
      {
        route: 'module-2',
        number: 'Module 2',
        title: 'Following the Money',
        published: false,
        prerequisite: 'module-1',
      },
    ],
  },

  // ── The Diaspora Remittance Economy ─────────────────────────────────────
  // The first real course built with the template. Its overview page is
  // src/pages/DiasporaRemittanceEconomy.jsx; its content is in
  // course-template-curriculum.js. Nothing else references the slug.
  'diaspora-remittance-economy': {
    slug: 'diaspora-remittance-economy',
    title: 'The Diaspora Remittance Economy',
    pillar: 'Economics and Development',
    track: 'African Economic Literacy and Systems Analysis',
    completionStatement:
      'This certifies that the learner named below has completed every module of The Diaspora Remittance Economy, including the module lessons, activities, knowledge checks and reflections. This certificate confirms completion of an educational course. It does not constitute financial, investment, legal or migration advice, and it does not authorise the holder to provide such advice.',
    enrollmentOpen: true,
    certificate: {
      includeEnrollmentId: true,
      verificationCode: true,
      requiresCompletedEnrollment: false,
      extraRequirements: 'none',
      finalizesEnrollment: true,
    },
    modules: [
      {
        route: 'module-1',
        number: 'Module 1',
        title: 'What a Remittance Really Is',
        published: true,
        prerequisite: null,
      },
      {
        route: 'module-2',
        number: 'Module 2',
        title: 'The Cost of Sending',
        published: true,
        prerequisite: 'module-1',
      },
      {
        route: 'module-3',
        number: 'Module 3',
        title: 'When the Money Lands',
        published: true,
        prerequisite: 'module-2',
      },
    ],
  },
};

export function templateCourseExists(courseSlug) {
  return Object.prototype.hasOwnProperty.call(TEMPLATE_COURSE_REGISTRY, courseSlug);
}

export function getTemplateCourse(courseSlug) {
  return TEMPLATE_COURSE_REGISTRY[courseSlug] || null;
}

export function getTemplateModuleRoutes(courseSlug) {
  const course = getTemplateCourse(courseSlug);
  return course ? course.modules.map((module) => module.route) : [];
}

export function getTemplateModuleMeta(courseSlug, moduleRoute) {
  const course = getTemplateCourse(courseSlug);
  if (!course) return null;
  return course.modules.find((module) => module.route === moduleRoute) || null;
}

export function isTemplateEnrollmentOpen(courseSlug) {
  const course = getTemplateCourse(courseSlug);
  if (!course) return false;
  return course.enrollmentOpen !== false;
}

export function isTemplateModulePublished(courseSlug, moduleRoute) {
  const moduleMeta = getTemplateModuleMeta(courseSlug, moduleRoute);
  return !!(moduleMeta && moduleMeta.published);
}

/** The module that must be completed first, or null for an opening module. */
export function getTemplateModulePrerequisite(courseSlug, moduleRoute) {
  const moduleMeta = getTemplateModuleMeta(courseSlug, moduleRoute);
  if (!moduleMeta) return null;
  if (moduleMeta.prerequisite === null) return null;
  if (typeof moduleMeta.prerequisite === 'string') return moduleMeta.prerequisite;
  // Default: the module before this one.
  const routes = getTemplateModuleRoutes(courseSlug);
  const index = routes.indexOf(moduleRoute);
  return index > 0 ? routes[index - 1] : null;
}

/** The steps a ModuleProgress row has satisfied, in the order the module lists them. */
export function deriveCompletedSteps(row, requirements) {
  if (!row) return [];
  return requirements.filter((step) => {
    if (step === KNOWLEDGE_CHECK_STEP) return row.quiz_passed === true;
    const field = COMPLETION_STEP_FIELDS[step];
    return !!(field && row[field]);
  });
}

/** The required steps still outstanding for a ModuleProgress row. */
export function missingRequirements(requirements, row) {
  const completed = new Set(deriveCompletedSteps(row, requirements));
  return requirements.filter((step) => !completed.has(step));
}

/**
 * The registry entry the shared course registry, enrollment-progress and
 * certificate issuance read. Built from the entry above so a course's rules
 * and its certificate wording stay in one place.
 */
export function toTemplateRegistryConfig(course) {
  return {
    slug: course.slug,
    title: course.title,
    completionStatement: course.completionStatement,
    requiredModuleRoutes: course.modules.map((module) => module.route),
    isPublished: () => course.modules.some((module) => module.published),
    certificate: { extraRequirements: 'none', ...course.certificate },
  };
}

/** Registry-shaped entries for every template course, keyed by slug. */
export const TEMPLATE_COURSE_CONFIGS = Object.fromEntries(
  Object.values(TEMPLATE_COURSE_REGISTRY).map((course) => [
    course.slug,
    toTemplateRegistryConfig(course),
  ]),
);