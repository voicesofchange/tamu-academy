/**
 * Learner progress assembly for the My Progress dashboard.
 *
 * The four published courses already describe themselves in their public
 * track files (titles, modules, routes). Those files are the single source of
 * course structure, so this module only joins that structure to the learner's
 * own enrollment and module-progress records — it never restates a course.
 *
 * Everything here is derived from records the learner already owns; no
 * privileged data is read and no new access is granted.
 */
import { ECONOMICS_COURSE } from './economics-tracks';
import { MENTAL_HEALTH_COURSE } from './mental-health-tracks';
import { SAUTI_ZA_SOKO_COURSE } from './sauti-za-soko-tracks';
import { WAIYAKI_COURSE } from './waiyaki-tracks';
import { BUILDING_WEALTH_TOGETHER_COURSE } from './building-wealth-together-tracks';

/** Every course a learner can hold progress in. */
export const LEARNER_COURSES = [
  ECONOMICS_COURSE,
  MENTAL_HEALTH_COURSE,
  SAUTI_ZA_SOKO_COURSE,
  WAIYAKI_COURSE,
  BUILDING_WEALTH_TOGETHER_COURSE,
];

/** How a course reads to a learner who has not finished it yet. */
export const STANDING_LABELS = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
};

/** How a single module reads on the dashboard. */
export const MODULE_STATUS_LABELS = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
};

/** One-line explanation of a standing, used under the badge. */
export const STANDING_NOTES = {
  not_started: 'No progress recorded yet.',
  in_progress: 'You have started this course.',
  completed: 'Every module is complete.',
};

function nextModuleFor(modules) {
  return modules.find((module) => module.status !== 'completed') || null;
}

/**
 * Join one course to a learner's records for it.
 *
 * @param {object} course       public course metadata from the track files
 * @param {object|null} enrollment  the learner's CourseEnrollment for the course
 * @param {Array} moduleProgress    the learner's ModuleProgress records
 */
export function buildCourseProgress(course, enrollment, moduleProgress) {
  const byRoute = {};
  for (const row of moduleProgress) {
    if (row.course_slug === course.slug) byRoute[row.module_slug] = row;
  }

  const modules = (course.modules || []).map((module) => {
    const row = byRoute[module.route];
    return {
      route: module.route,
      number: module.number,
      title: module.title,
      description: module.description,
      status: row ? row.status : 'not_started',
      updatedAt: row?.updated_date || null,
    };
  });

  const completedCount = modules.filter((module) => module.status === 'completed').length;
  const totalModules = modules.length;
  const percent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const enrolled = Boolean(enrollment);

  let standing = 'not_started';
  if (modules.length > 0 && completedCount === totalModules) {
    standing = 'completed';
  } else if (enrollment?.status === 'completed') {
    standing = 'completed';
  } else if (enrolled || completedCount > 0) {
    standing = 'in_progress';
  }

  const lastTouched = modules.reduce((latest, module) => {
    if (!module.updatedAt) return latest;
    if (!latest || module.updatedAt > latest) return module.updatedAt;
    return latest;
  }, null);

  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    modules,
    completedCount,
    totalModules,
    percent,
    standing,
    enrolled,
    // The enrolled record's own figure wins where it exists, so the dashboard
    // and the course pages never disagree.
    progressPercentage:
      typeof enrollment?.progress_percentage === 'number' ? enrollment.progress_percentage : percent,
    certificateEligible: Boolean(enrollment?.certificate_eligible),
    nextModule: nextModuleFor(modules),
    lastTouched,
  };
}

/** Join every course to the learner's records, in published course order. */
export function buildLearnerProgress(courses, enrollments, moduleProgress) {
  const enrollmentBySlug = {};
  for (const enrollment of enrollments || []) {
    enrollmentBySlug[enrollment.course_slug] = enrollment;
  }
  return (courses || []).map((course) =>
    buildCourseProgress(course, enrollmentBySlug[course.slug], moduleProgress || [])
  );
}

/** The at-a-glance figures above the course cards. */
export function summariseProgress(courseProgressList) {
  return {
    enrolled: courseProgressList.filter((course) => course.enrolled).length,
    coursesCompleted: courseProgressList.filter((course) => course.standing === 'completed').length,
    coursesTotal: courseProgressList.length,
    modulesCompleted: courseProgressList.reduce((sum, course) => sum + course.completedCount, 0),
    modulesTotal: courseProgressList.reduce((sum, course) => sum + course.totalModules, 0),
  };
}

/** A readable date for a progress timestamp, or '' when there is none. */
export function progressDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}