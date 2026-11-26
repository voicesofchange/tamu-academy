/**
 * Course syllabus — the public outline of each module's lesson: its section
 * headings, for the expandable syllabus on the Courses page and each course
 * overview.
 *
 * Only headings leave the server: lesson-section titles, case-study and
 * activity titles, and the names of the standard steps (key concepts,
 * knowledge check, reflection). No lesson text, no questions, no answers.
 * Labels are English; the page translates them for display.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 */
import { MENTAL_HEALTH_COURSE_SLUG, getMentalHealthModuleContent, isModulePublished as isMhPublished } from './mental-health-curriculum.js';
import { MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES } from './mental-health-certificate.js';
import { ECONOMICS_COURSE_SLUG, ECONOMICS_MODULE_ROUTES, isEconomicsModulePublished } from './economics-course-config.js';
import { getSensitiveModuleContent as getEconomicsContent } from './economics-curriculum.js';
import { SOKO_COURSE_SLUG, SOKO_CORE_MODULE_ROUTES, isSokoModulePublished, getSokoSensitiveModuleContent } from './sauti-za-soko-config.js';
import { WEALTH_COURSE_SLUG, WEALTH_MODULE_ROUTES, isWealthModulePublished } from './building-wealth-together-config.js';
import { getWealthModuleContent } from './building-wealth-together-curriculum.js';
import { WAIYAKI_COURSE_SLUG, WAIYAKI_MODULE_ROUTES, isWaiyakiModulePublished, getWaiyakiSensitiveModuleContent } from './waiyaki-config.js';
import { TEMPLATE_COURSE_REGISTRY, getTemplateModuleRoutes, isTemplateModulePublished } from './course-template-config.js';
import { getTemplateModuleContent } from './course-template-curriculum.js';

const has = (value) => (Array.isArray(value) ? value.length > 0 : !!value);
const titleOf = (value) => (value && typeof value === 'object' ? value.title || value.heading || null : null);
const headings = (list) => (Array.isArray(list) ? list.map((s) => s && (s.heading || s.title)).filter(Boolean) : []);

/**
 * The section headings of one module, in reading order, from whichever
 * shape that course's curriculum uses. Duplicates are dropped.
 */
export function moduleSectionHeadings(content) {
  if (!content) return [];
  const m = content.lesson && typeof content.lesson === 'object' ? content.lesson : content;
  const out = [];
  const add = (label) => { if (label && !out.includes(label)) out.push(label); };

  if (has(m.video) || has(m.watch) || has(m.coreMedia) || has(m.companionVideo)) add('Recorded lesson');
  if (has(m.overview) || has(m.tamuIntroduction) || has(m.lead)) add('Introduction');
  for (const h of headings(m.lessonSections)) add(h);
  for (const h of headings(m.sections)) add(h);
  if (has(m.explanation)) add('The lesson');
  if (has(m.keyConcepts) || has(m.keyTerms)) add('Key concepts');
  if (m.localCase) add(titleOf(m.localCase) || 'Case study');
  if (m.caseStudy) add(titleOf(m.caseStudy) || 'Case study');
  if (m.workedExample) add(titleOf(m.workedExample) || 'Worked example');
  if (m.internationalComparison) add('International comparison');
  if (m.sourceAnalysis) add(titleOf(m.sourceAnalysis) || 'Source analysis');
  if (m.interactiveScenario || m.dilemma) add(titleOf(m.dilemma) || 'Interactive scenario');
  for (const key of ['communityOfCareMap', 'bridgeConversationLab', 'careDesignLab', 'pathwaysLab', 'amplifyLab', 'storyLab', 'strengthWithoutSilenceLab']) {
    if (m[key]) add(titleOf(m[key]) || 'Practice lab');
  }
  if (m.activity || m.policyActivity || m.tryIt) add(titleOf(m.policyActivity) || titleOf(m.activity) || 'Try it');
  if (has(m.quiz) || has(m.knowledgeCheck)) add('Knowledge check');
  if (has(m.reflection) || has(m.reflectionQuestions) || has(m.privateReflection)) add('Reflection');
  return out;
}

function courseSources() {
  const sources = {
    [MENTAL_HEALTH_COURSE_SLUG]: {
      routes: MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
      content: (route) => getMentalHealthModuleContent(MENTAL_HEALTH_COURSE_SLUG, route),
      published: (route) => isMhPublished(MENTAL_HEALTH_COURSE_SLUG, route),
    },
    [ECONOMICS_COURSE_SLUG]: {
      routes: ECONOMICS_MODULE_ROUTES,
      content: (route) => getEconomicsContent(ECONOMICS_COURSE_SLUG, route),
      published: (route) => isEconomicsModulePublished(ECONOMICS_COURSE_SLUG, route),
    },
    [SOKO_COURSE_SLUG]: {
      routes: SOKO_CORE_MODULE_ROUTES,
      content: (route) => getSokoSensitiveModuleContent(SOKO_COURSE_SLUG, route),
      published: (route) => isSokoModulePublished(SOKO_COURSE_SLUG, route),
    },
    [WEALTH_COURSE_SLUG]: {
      routes: WEALTH_MODULE_ROUTES,
      content: (route) => getWealthModuleContent(WEALTH_COURSE_SLUG, route),
      published: (route) => isWealthModulePublished(WEALTH_COURSE_SLUG, route),
    },
    [WAIYAKI_COURSE_SLUG]: {
      routes: WAIYAKI_MODULE_ROUTES,
      content: (route) => getWaiyakiSensitiveModuleContent(route),
      published: (route) => isWaiyakiModulePublished(WAIYAKI_COURSE_SLUG, route),
    },
  };
  for (const [slug, course] of Object.entries(TEMPLATE_COURSE_REGISTRY)) {
    // The template demo is internal (it is also flagged `internal`).
    if (!course || course.internal || slug === 'template-example') continue;
    sources[slug] = {
      routes: getTemplateModuleRoutes(slug),
      content: (route) => getTemplateModuleContent(slug, route),
      published: (route) => isTemplateModulePublished(slug, route),
    };
  }
  return sources;
}

/** { modules: [{ route, published, sections: [heading] }] } for one course, or null. */
export function courseSyllabus(courseSlug) {
  const source = courseSources()[courseSlug];
  if (!source) return null;
  return {
    modules: source.routes.map((route) => {
      let content = null;
      try { content = source.content(route); } catch (_) { content = null; }
      return { route, published: !!source.published(route), sections: moduleSectionHeadings(content) };
    }),
  };
}
