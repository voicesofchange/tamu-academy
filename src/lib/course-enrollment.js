import { base44 } from '@/api/base44Client';

/**
 * The enrollment function for every course a learner can start, keyed by
 * course slug. Shared by the course-page Start button and the module-page
 * start gate so both entry points enroll identically.
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
  const functionName = ENROLLMENT_FUNCTION_BY_SLUG[courseSlug];
  if (!functionName) throw new Error('Unknown course');
  return base44.functions.invoke(functionName, { courseSlug });
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