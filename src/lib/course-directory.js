import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';
import { SAUTI_ZA_SOKO_COURSE } from '@/lib/sauti-za-soko-tracks';
import { DIASPORA_REMITTANCE_COURSE } from '@/lib/diaspora-remittance-tracks';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';

/**
 * Every live course's own public data (src/lib/*-tracks.js), by slug — the
 * objects its overview page renders. The syllabus accordion and the course
 * metrics read module lists and counts from here, so the Courses page and
 * each overview show the same numbers as the course itself.
 */
export const COURSE_DIRECTORY = Object.fromEntries(
  [MENTAL_HEALTH_COURSE, ECONOMICS_COURSE, BUILDING_WEALTH_TOGETHER_COURSE, SAUTI_ZA_SOKO_COURSE, DIASPORA_REMITTANCE_COURSE, WAIYAKI_COURSE]
    .map((course) => [course.slug, course]),
);

export function getCourseData(slug) {
  return COURSE_DIRECTORY[slug] || null;
}

export function courseModuleCount(slug) {
  const course = getCourseData(slug);
  if (!course) return null;
  return Number(course.modulesCount) || (course.modules || []).length;
}
