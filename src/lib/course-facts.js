import { COURSE_DIRECTORY } from '@/lib/course-directory';

/**
 * course-facts — the one place the public site reads a live course's
 * headline facts from: its learning area, module count, study hours, level,
 * pace, languages, credential and practical deliverable.
 *
 * Titles, summaries, levels, module counts and deliverables are read from
 * each course's own data (src/lib/*-tracks.js), so the cards, the "At a
 * Glance" card and the overview pages cannot disagree. Only what that data
 * does not hold in a usable form is set here: the learning area, the card
 * icon and accent, and the study hours as numbers (the course data states
 * them as sentences in different shapes — "Approximately 4–6 hours",
 * "2–3 hours per module, plus the capstone").
 */

/** The five learning areas, in catalog order. */
export const LEARNING_AREAS = [
  { id: 'economics-and-development', label: 'Economics & Development' },
  { id: 'mind-and-wellbeing', label: 'Mind & Wellbeing' },
  { id: 'waiyaki-wa-hinga', label: 'Waiyaki wa Hinga Heritage & Leadership' },
  { id: 'ai-technology-and-digital-futures', label: 'AI, Technology & Digital Futures' },
  { id: 'public-policy-and-governance', label: 'Public Policy & Governance' },
];

/** The languages every page and lesson can be read in. */
export const COURSE_LANGUAGES = ['EN', 'SW', 'ES', 'FR'];

/**
 * Per course: area, icon (a lucide-react name), accent, and hours as
 * { min, max } with an optional note. The hours restate the course's own
 * estimate: Building Wealth Together's is "2–3 hours per module" across nine
 * modules, so 18–27 hours plus the capstone.
 */
const COURSE_PRESENTATION = {
  'mental-health-community-and-culture': {
    area: 'mind-and-wellbeing', icon: 'Heart', accent: 'rgba(197,90,56,0.55)', hours: { min: 10, max: 13 },
  },
  'understanding-african-economies-and-the-global-system': {
    area: 'economics-and-development', icon: 'TrendingUp', accent: 'rgba(217,155,55,0.5)', hours: { min: 4, max: 6 },
  },
  'building-wealth-together': {
    area: 'economics-and-development', icon: 'Users', accent: 'rgba(186,120,48,0.55)', hours: { min: 18, max: 27, note: 'plus the capstone' },
  },
  'sauti-za-soko': {
    area: 'economics-and-development', icon: 'Store', accent: 'rgba(152,120,52,0.55)', hours: { min: 6, max: 8 },
  },
  'diaspora-remittance-economy': {
    area: 'economics-and-development', icon: 'Banknote', accent: 'rgba(200,140,60,0.5)', hours: { min: 2, max: 2 },
  },
  'waiyaki-wa-hinga': {
    area: 'waiyaki-wa-hinga', icon: 'Scroll', accent: 'rgba(197,130,50,0.5)', hours: { min: 4, max: 5 },
  },
};

/** Live course slugs, in the order the homepage and catalog list them. */
export const LIVE_COURSE_SLUGS = [
  'mental-health-community-and-culture',
  'understanding-african-economies-and-the-global-system',
  'building-wealth-together',
  'sauti-za-soko',
  'diaspora-remittance-economy',
  'waiyaki-wa-hinga',
];

function buildFacts(slug) {
  const course = COURSE_DIRECTORY[slug];
  const look = COURSE_PRESENTATION[slug];
  if (!course || !look) return null;
  return {
    slug,
    title: course.title,
    summary: course.subtitle || course.description,
    areaId: look.area,
    icon: look.icon,
    accent: look.accent,
    moduleCount: Number(course.modulesCount) || (course.modules || []).length,
    hours: look.hours,
    level: course.level,
    pace: 'Self-paced',
    languages: COURSE_LANGUAGES,
    credential: 'Certificate of Completion',
    deliverable: (course.milestone && course.milestone.title) || null,
    coursePath: `/courses/${slug}`,
    previewPath: `/courses/${slug}/module-1`,
  };
}

export const COURSE_FACTS = Object.fromEntries(LIVE_COURSE_SLUGS.map((slug) => [slug, buildFacts(slug)]));

export function getCourseFacts(slug) {
  return COURSE_FACTS[slug] || null;
}

export function getLearningArea(id) {
  return LEARNING_AREAS.find((a) => a.id === id) || null;
}

/**
 * Every translatable fact as one stable object for useTranslatedContent:
 * area labels, each course's title, summary, level and deliverable, and the
 * hours notes. One object, one cache entry, shared by every component that
 * shows course facts.
 */
export const COURSE_FACT_TEXT = {
  areas: Object.fromEntries(LEARNING_AREAS.map((a) => [a.id, a.label])),
  courses: Object.fromEntries(LIVE_COURSE_SLUGS.map((slug) => {
    const f = COURSE_FACTS[slug];
    return [slug, {
      title: f.title,
      summary: f.summary,
      level: f.level || '',
      deliverable: f.deliverable || '',
      hoursNote: (f.hours && f.hours.note) || '',
    }];
  })),
};
