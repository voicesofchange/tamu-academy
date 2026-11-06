import { base44 } from '@/api/base44Client';

/**
 * The enrollment function for every course a learner can start, keyed by
 * course slug. Shared by the course-page Start button and the module-page
 * start gate so both entry points enroll identically.
 *
 * Courses built with the shared course template do not need an entry here:
 * they all enroll through `enrollTemplateCourse`, which reads the registry
 * (see the fallback in enrollInCourse).
 */
export const ENROLLMENT_FUNCTION_BY_SLUG = {
  'mental-health-community-and-culture': 'enrollMentalHealth',
  'understanding-african-economies-and-the-global-system': 'enrollEconomicsCourse',
  'building-wealth-together': 'enrollWealthCourse',
  'sauti-za-soko': 'enrollSokoCourse',
  'sauti-za-soko-peer-facilitator': 'enrollSokoCourse',
  'waiyaki-wa-hinga': 'enrollWaiyakiCourse',
};

/** Enrolls the signed-in learner. The server de-duplicates by course. */
export async function enrollInCourse(courseSlug) {
  // A slug with no explicit entry is a course built with the shared course
  // template. That one function serves every registry course, and answers 404
  // for a slug the registry does not hold, so nothing is enrolled by mistake.
  const functionName = ENROLLMENT_FUNCTION_BY_SLUG[courseSlug] || 'enrollTemplateCourse';
  const result = await base44.functions.invoke(functionName, { courseSlug });
  // Tells the short profile prompt that a course was just started. Nothing
  // waits on it, and no course access depends on it.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tamu:course-enrolled', { detail: { courseSlug } }));
  }
  return result;
}

/** Whether the signed-in learner already holds an enrollment for the course. */
export async function hasCourseEnrollment(courseSlug, learnerId) {
  if (!learnerId) return false;
  const rows = await base44.entities.CourseEnrollment.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
  });
  if (Array.isArray(rows)) return rows.length > 0;
  return Boolean(rows && rows.items && rows.items.length);
}