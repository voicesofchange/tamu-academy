/**
 * Course template — shared server logic.
 *
 * Everything the six generic course functions have in common lives here, so
 * each function is a thin endpoint and no rule is copied between them:
 *
 *   - the access check (publication, enrollment, prerequisite chain);
 *   - the answer-key strip that keeps quiz keys off the wire;
 *   - reading and writing one learner's ModuleProgress row;
 *   - deriving which completion steps are done and which are outstanding.
 *
 * Server-side only. Never import this file from src/.
 */
import {
  COMPLETION_STEP_FIELDS,
  KNOWLEDGE_CHECK_STEP,
  deriveCompletedSteps,
  getTemplateCourse,
  getTemplateModuleMeta,
  getTemplateModulePrerequisite,
  isTemplateModulePublished,
  missingRequirements,
} from './course-template-config.js';
import {
  getTemplateModuleContent,
  getTemplateModuleRequirements,
} from './course-template-curriculum.js';

/**
 * Learner-facing module sections the shared translation layer may translate.
 * Identifiers, routes, answer keys, scores and URLs are left alone by that
 * layer; the answer key is stripped before this list is used.
 */
export const TEMPLATE_TRANSLATED_SECTIONS = [
  'title',
  'estimatedTime',
  'video',
  'goals',
  'lessonSections',
  'activity',
  'keyTerms',
  'quiz',
  'reflection',
];

/** One module's curriculum content, or null. */
export function templateModuleContent(courseSlug, moduleRoute) {
  return getTemplateModuleContent(courseSlug, moduleRoute);
}

/** A module's required completion steps. */
export function templateModuleRequirements(courseSlug, moduleRoute) {
  return getTemplateModuleRequirements(courseSlug, moduleRoute);
}

/** The module content with every quiz answer key removed. */
export function withoutAnswerKey(content) {
  if (!content || !content.quiz) return content;
  const questions = Array.isArray(content.quiz.questions) ? content.quiz.questions : [];
  return {
    ...content,
    quiz: {
      ...content.quiz,
      questions: questions.map((question) => {
        const { correctIndex, ...rest } = question;
        return rest;
      }),
    },
  };
}

/**
 * The access check every module endpoint runs.
 *
 * Non-admin learners need a published module, an enrollment for the course and
 * a completed prerequisite. Administrators may read any module for review
 * (`adminPreview`), and may save progress once the module is published and
 * they hold an enrollment.
 *
 * @returns {{ status: number, body: object } |
 *           { ok: true, course: object, moduleMeta: object, canRecordProgress: boolean }}
 */
export async function checkTemplateModuleAccess(
  base44,
  user,
  { courseSlug, moduleRoute, adminPreview = false },
) {
  const course = getTemplateCourse(courseSlug);
  if (!course) return { status: 404, body: { error: 'Not found' } };

  const moduleMeta = getTemplateModuleMeta(courseSlug, moduleRoute);
  if (!moduleMeta) return { status: 404, body: { error: 'Not found' } };

  const isAdmin = user.role === 'admin';
  const published = isTemplateModulePublished(courseSlug, moduleRoute);

  const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
    learner_id: user.id,
    course_slug: courseSlug,
    status: { $in: ['active', 'completed'] },
  });
  const hasEnrollment = Array.isArray(enrollmentRows) && enrollmentRows.length > 0;

  if (isAdmin) {
    if (!adminPreview && !published) return { ok: true, course, moduleMeta, canRecordProgress: false };
    return { ok: true, course, moduleMeta, canRecordProgress: published && hasEnrollment };
  }

  if (!published) return { status: 403, body: { error: 'Forbidden' } };
  if (!hasEnrollment) return { status: 403, body: { error: 'Not enrolled' } };

  const prerequisite = getTemplateModulePrerequisite(courseSlug, moduleRoute);
  if (prerequisite) {
    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: prerequisite,
      status: 'completed',
    });
    if (!Array.isArray(rows) || rows.length === 0) {
      return { status: 403, body: { error: 'Prerequisite incomplete', prerequisite } };
    }
  }

  return { ok: true, course, moduleMeta, canRecordProgress: true };
}

/** This learner's ModuleProgress row for one module, or null. */
export async function findProgressRow(base44, learnerId, courseSlug, moduleRoute) {
  const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
    module_slug: moduleRoute,
  });
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

/** Which required steps a progress row has satisfied. */
export function completedSteps(row, requirements) {
  return deriveCompletedSteps(row, requirements);
}

/** Which required steps a progress row still needs. */
export function outstandingSteps(row, requirements) {
  return missingRequirements(requirements, row);
}

/**
 * Record one self-attested completion step on the learner's progress row.
 *
 * Only a step the module actually requires may be recorded, and the knowledge
 * check is refused here because only the grader sets quiz_passed.
 */
export async function recordCompletionStep(
  base44,
  { learnerId, courseSlug, moduleRoute, requirements, step },
) {
  if (step === KNOWLEDGE_CHECK_STEP) return { ok: false, reason: 'not_self_attested' };
  if (!COMPLETION_STEP_FIELDS[step]) return { ok: false, reason: 'unknown_step' };
  if (!requirements.includes(step)) return { ok: false, reason: 'not_required' };

  const now = new Date().toISOString();
  const field = COMPLETION_STEP_FIELDS[step];
  const row = await findProgressRow(base44, learnerId, courseSlug, moduleRoute);

  if (!row) {
    await base44.asServiceRole.entities.ModuleProgress.create({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleRoute,
      status: 'in_progress',
      [field]: now,
      updated_at: now,
    });
  } else if (!row[field]) {
    await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
      [field]: now,
      updated_at: now,
    });
  }

  return { ok: true };
}

/** Remember which section of the module the learner last reached. */
export async function recordLastSection(
  base44,
  { learnerId, courseSlug, moduleRoute, sectionId },
) {
  const now = new Date().toISOString();
  const row = await findProgressRow(base44, learnerId, courseSlug, moduleRoute);
  if (!row) {
    await base44.asServiceRole.entities.ModuleProgress.create({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleRoute,
      status: 'in_progress',
      last_section_id: sectionId,
      updated_at: now,
    });
    return;
  }
  await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
    last_section_id: sectionId,
    updated_at: now,
  });
}

/** The course outline and each module's state for one learner. */
export async function courseOutlineFor(base44, learnerId, courseSlug) {
  const course = getTemplateCourse(courseSlug);
  if (!course) return null;

  const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
  });
  const byRoute = new Map();
  for (const row of Array.isArray(rows) ? rows : []) {
    if (row && row.module_slug) byRoute.set(row.module_slug, row);
  }

  return {
    slug: course.slug,
    title: course.title,
    pillar: course.pillar,
    track: course.track,
    modules: course.modules.map((module) => {
      const row = byRoute.get(module.route) || null;
      return {
        route: module.route,
        number: module.number,
        title: module.title,
        published: !!module.published,
        status: row ? row.status : 'not_started',
        completed: !!(row && row.status === 'completed' && row.completed_at),
      };
    }),
  };
}