import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';
import { SAUTI_ZA_SOKO_COURSE } from '@/lib/sauti-za-soko-tracks';
import { DIASPORA_REMITTANCE_COURSE } from '@/lib/diaspora-remittance-tracks';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';
import { LEARNING_AREAS, getCourseFacts } from '@/lib/course-facts';

/**
 * The homepage's course discovery data: the five learning areas, every live
 * course and the courses in development.
 *
 * A live course's title, summary and module count are read from its own
 * course data (src/lib/*-tracks.js) — the same objects its overview page
 * renders — so the homepage cards and the stats strip cannot disagree with
 * the course pages. Area, icon and accent come from src/lib/course-facts.js.
 * The two courses in development have no course data yet, so their wording
 * matches the Courses page.
 */

export const HOME_LEARNING_AREAS = LEARNING_AREAS;

// Area, icon and accent come from course-facts, shared with the catalog and
// the course pages.
const live = (course) => {
  const facts = getCourseFacts(course.slug);
  return {
    slug: course.slug,
    title: course.title,
    description: course.subtitle || course.description,
    moduleCount: facts.moduleCount,
    area: facts.areaId,
    icon: facts.icon,
    accent: facts.accent,
    live: true,
  };
};

export const HOME_COURSES = [
  live(MENTAL_HEALTH_COURSE),
  live(ECONOMICS_COURSE),
  live(BUILDING_WEALTH_TOGETHER_COURSE),
  live(SAUTI_ZA_SOKO_COURSE),
  live(DIASPORA_REMITTANCE_COURSE),
  live(WAIYAKI_COURSE),
  {
    slug: 'ai-literacy-for-african-and-diaspora-leaders',
    title: 'AI Literacy for African and Diaspora Leaders',
    description:
      'A practical and critical introduction to generative AI, responsible use, bias, digital citizenship, work, governance, and technological change.',
    moduleCount: null,
    area: 'ai-technology-and-digital-futures',
    icon: 'Cpu',
    accent: 'rgba(86,128,138,0.5)',
    live: false,
  },
  {
    slug: 'power-policy-and-the-public-good',
    title: 'Power, Policy and the Public Good',
    description:
      'A course exploring public policy, institutions, implementation, accountability, community participation, policy analysis, and writing for public decision-making.',
    moduleCount: null,
    area: 'public-policy-and-governance',
    icon: 'Landmark',
    accent: 'rgba(122,90,56,0.55)',
    live: false,
  },
];

/** The figures on the homepage stats strip, derived from the list above. */
export const HOME_STATS = {
  liveCourses: HOME_COURSES.filter((c) => c.live).length,
  learningAreas: HOME_LEARNING_AREAS.length,
  certificateModules: HOME_COURSES.filter((c) => c.live).reduce((sum, c) => sum + (c.moduleCount || 0), 0),
};

/**
 * The course titles and summaries as one stable object for
 * useTranslatedContent (course and place names are protected by the
 * translation layer and come back as written).
 */
export const HOME_COURSE_TEXT = Object.fromEntries(
  HOME_COURSES.map((c) => [c.slug, { title: c.title, description: c.description }]),
);

export const HOME_AREA_TEXT = Object.fromEntries(HOME_LEARNING_AREAS.map((a) => [a.id, a.label]));
