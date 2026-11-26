import { base44 } from '@/api/base44Client';
import { buildCourseProgress } from '@/lib/learner-progress';
import { DIASPORA_REMITTANCE_COURSE } from '@/lib/diaspora-remittance-tracks';

/**
 * course-resume — where a signed-in learner stands in one course, for the
 * course page's primary action (Start Learning / Continue Learning / Review).
 *
 * It reads the same sources My Courses reads: each course's own completion
 * endpoint, and for the template-built Diaspora course the learner's own
 * enrollment and module progress records.
 *
 * Returns { enrolled, nextModule: { route, number, title } | null,
 *           completedCount, totalModules, completionPath | null }.
 * Any failure resolves to { enrolled: false }, so the page falls back to
 * Start Learning.
 */

const COMPLETION_FUNCTIONS = {
  'mental-health-community-and-culture': 'getMentalHealthCourseCompletion',
  'understanding-african-economies-and-the-global-system': 'getEconomicsCourseCompletion',
  'building-wealth-together': 'getWealthCourseCompletion',
  'sauti-za-soko': 'getSokoCourseCompletion',
  'waiyaki-wa-hinga': 'getWaiyakiCourseCompletion',
};

const NOT_ENROLLED = { enrolled: false, nextModule: null, completedCount: 0, totalModules: 0, completionPath: null };

export async function fetchCourseResume(courseSlug, userId) {
  if (!userId) return NOT_ENROLLED;
  try {
    const fn = COMPLETION_FUNCTIONS[courseSlug];
    if (fn) {
      const res = await base44.functions.invoke(fn, { courseSlug });
      const data = res && res.data;
      if (!data || !data.hasEnrollment) return NOT_ENROLLED;
      return {
        enrolled: true,
        nextModule: (data.incompleteModules && data.incompleteModules[0]) || null,
        completedCount: data.completedCount || 0,
        totalModules: data.totalModules || 0,
        completionPath: `/courses/${courseSlug}/completion`,
      };
    }
    if (courseSlug === DIASPORA_REMITTANCE_COURSE.slug) {
      const [enrollments, progress] = await Promise.all([
        base44.entities.CourseEnrollment.filter({ learner_id: userId, course_slug: courseSlug }),
        base44.entities.ModuleProgress.filter({ learner_id: userId, course_slug: courseSlug }),
      ]);
      const p = buildCourseProgress(DIASPORA_REMITTANCE_COURSE, (enrollments || [])[0] || null, progress || []);
      if (!p.enrolled) return NOT_ENROLLED;
      return {
        enrolled: true,
        nextModule: p.nextModule || null,
        completedCount: p.completedCount,
        totalModules: p.totalModules,
        completionPath: null,
      };
    }
    return NOT_ENROLLED;
  } catch (err) {
    return NOT_ENROLLED;
  }
}
