/**
 * translation-prewarm — translates the course material ahead of time.
 *
 * The learner-facing module endpoints translate lazily: the first learner to
 * open a module in a language waits for the model. This module walks the same
 * course content, with the same preparation and the same section lists those
 * endpoints use, so the cache is already warm before anyone arrives.
 *
 * Nothing here writes English content. It reads the protected curriculum and
 * passes it through the shared translation layer (course-translation.js and
 * translate-content.js), which:
 *   - caches every string in TranslationCache,
 *   - serves anything already cached without reaching the model,
 *   - flags a stored translation outdated when its English changed,
 *   - and never replaces a translation marked reviewed.
 *
 * Quizzes travel with their module, so knowledge checks are prepared in the
 * same pass. Answer keys are stripped first and are never sent for translation.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 */

import { getRequiredModuleRoutes } from './course-registry.js';
import { ECONOMICS_CERTIFICATE_COURSE_SLUG } from './economics-course-config.js';
import { getSensitiveModuleContent } from './economics-curriculum.js';
import {
  MENTAL_HEALTH_COURSE_SLUG,
  getMentalHealthModuleContent,
} from './mental-health-curriculum.js';
import { WEALTH_COURSE_SLUG } from './building-wealth-together-config.js';
import { getWealthModuleContent } from './building-wealth-together-curriculum.js';
import {
  WAIYAKI_COURSE_SLUG,
  getWaiyakiSensitiveModuleContent,
  getWaiyakiCompletionRequirements,
} from './waiyaki-config.js';
import { WAIYAKI_COURSE_TITLE } from './waiyaki-curriculum.js';
import {
  SOKO_COURSE_SLUG,
  SOKO_PEER_COURSE_SLUG,
  getSokoSensitiveModuleContent,
  getSokoCompletionRequirements,
} from './sauti-za-soko-config.js';
import {
  translateCourseSections,
  collectTranslatableStrings,
} from './course-translation.js';
import { translateTextBatch } from './translate-content.js';
import { localizeEmailCopy } from './email-localization.js';
import { localizeCertificateLabels } from './certificate-copy.js';
import {
  WELCOME_COPY,
  PROGRESS_COPY,
  CHECK_IN_COPY,
  CELEBRATION_COPY,
  CERTIFICATE_EMAIL_COPY,
} from './learner-emails.js';

/** The three languages every learner-facing surface is prepared in. */
export const PREWARM_LANGUAGES = ['sw', 'es', 'fr'];

/**
 * Section lists, kept identical to the lists each module endpoint translates,
 * so a prepared translation is found under the same field path later.
 */
const ECONOMICS_SECTIONS = [
  'title',
  'description',
  'competency',
  'overview',
  'learningObjectives',
  'keyConcepts',
  'video',
  'media',
  'explanation',
  'watchingQuestions',
  'caseStudy',
  'activity',
  'policyActivity',
  'reflectionQuestions',
  'quiz',
  'closingText',
  'courseClosingText',
  'completionRequirements',
  'endOfCourse',
  'estimatedTime',
];

const MENTAL_HEALTH_SECTIONS = ['title', 'lesson'];

const WEALTH_SECTIONS = [
  'title',
  'welcomeFilm',
  'goals',
  'watch',
  'lessonSections',
  'workedExample',
  'tryIt',
  'whereYouLive',
  'dilemma',
  'quiz',
  'reflection',
  'estimatedTime',
];

const WAIYAKI_SECTIONS = [
  'title',
  'subtitle',
  'lead',
  'learningObjectives',
  'companionVideo',
  'keyTerms',
  'sections',
  'sourceAnalysis',
  'reflection',
  'completionRequirements',
  'estimatedTime',
];

/** Sauti za Soko translates in two passes, as its endpoint does. */
const SOKO_READING_SECTIONS = [
  'title',
  'description',
  'competency',
  'learningObjectives',
  'overview',
  'contextNotes',
  'keyConcepts',
  'localCase',
  'closingText',
];

const SOKO_PRACTICE_SECTIONS = [
  'internationalComparison',
  'activity',
  'kiswahiliPrompt',
  'reflectionQuestions',
  'quiz',
  'completionRequirements',
  'courseClosingText',
];

/** The fixed wording of every automated email and of the certificate sheet. */
const EMAIL_COPIES = [WELCOME_COPY, PROGRESS_COPY, CHECK_IN_COPY, CELEBRATION_COPY, CERTIFICATE_EMAIL_COPY];

/** Remove the quiz answer key before any content is prepared. */
function stripAnswerKeys(content) {
  if (!content || !content.quiz || !Array.isArray(content.quiz.questions)) return content;
  return {
    ...content,
    quiz: {
      ...content.quiz,
      questions: content.quiz.questions.map((question) => {
        const { correctIndex, correctAnswerIndex, ...rest } = question || {};
        return rest;
      }),
    },
  };
}

/**
 * One job per module: it rebuilds the module exactly as its endpoint does and
 * runs it through the shared translation layer. Cached strings cost nothing,
 * so the same job can run again and again.
 */
function moduleJobs() {
  const jobs = [];

  const add = (course, module, run) => jobs.push({ course, module, run });

  for (const route of getRequiredModuleRoutes(ECONOMICS_CERTIFICATE_COURSE_SLUG)) {
    add(ECONOMICS_CERTIFICATE_COURSE_SLUG, route, async (base44, language) => {
      const raw = getSensitiveModuleContent(ECONOMICS_CERTIFICATE_COURSE_SLUG, route);
      if (!raw) return false;
      await translateCourseSections(base44, stripAnswerKeys(raw), language, ECONOMICS_SECTIONS, {
        courseSlug: ECONOMICS_CERTIFICATE_COURSE_SLUG,
        moduleSlug: route,
        moduleTitle: raw.title,
      });
      return true;
    });
  }

  for (const route of getRequiredModuleRoutes(MENTAL_HEALTH_COURSE_SLUG)) {
    add(MENTAL_HEALTH_COURSE_SLUG, route, async (base44, language) => {
      const content = getMentalHealthModuleContent(MENTAL_HEALTH_COURSE_SLUG, route);
      if (!content) return false;
      await translateCourseSections(base44, content, language, MENTAL_HEALTH_SECTIONS, {
        courseSlug: MENTAL_HEALTH_COURSE_SLUG,
        moduleSlug: route,
        moduleTitle: content.title,
      });
      return true;
    });
  }

  for (const route of getRequiredModuleRoutes(WEALTH_COURSE_SLUG)) {
    add(WEALTH_COURSE_SLUG, route, async (base44, language) => {
      const raw = getWealthModuleContent(WEALTH_COURSE_SLUG, route);
      if (!raw) return false;
      await translateCourseSections(base44, stripAnswerKeys(raw), language, WEALTH_SECTIONS, {
        courseSlug: WEALTH_COURSE_SLUG,
        moduleSlug: route,
        moduleTitle: raw.title,
      });
      return true;
    });
  }

  for (const route of getRequiredModuleRoutes(WAIYAKI_COURSE_SLUG)) {
    add(WAIYAKI_COURSE_SLUG, route, async (base44, language) => {
      const raw = getWaiyakiSensitiveModuleContent(route);
      if (!raw) return false;
      const content = {
        ...raw,
        courseTitle: WAIYAKI_COURSE_TITLE,
        completionRequirements: getWaiyakiCompletionRequirements(),
      };
      await translateCourseSections(base44, content, language, WAIYAKI_SECTIONS, {
        courseSlug: WAIYAKI_COURSE_SLUG,
        moduleSlug: route,
        moduleTitle: raw.title,
      });
      return true;
    });
  }

  for (const course of [SOKO_COURSE_SLUG, SOKO_PEER_COURSE_SLUG]) {
    for (const route of getRequiredModuleRoutes(course)) {
      add(course, route, async (base44, language) => {
        const raw = getSokoSensitiveModuleContent(course, route);
        if (!raw) return false;
        const content = {
          ...stripAnswerKeys(raw),
          completionRequirements: getSokoCompletionRequirements(course),
        };

        const reading = collectTranslatableStrings(content, SOKO_READING_SECTIONS);
        const practice = collectTranslatableStrings(content, SOKO_PRACTICE_SECTIONS);
        // The Kiswahili prompt itself is shown as written and its time estimate
        // is metadata, so neither is sent — matching the module endpoint.
        delete practice['kiswahiliPrompt.prompt'];
        delete practice.estimatedTime;

        await Promise.all([
          translateTextBatch(base44, reading, language),
          translateTextBatch(base44, practice, language),
        ]);
        return true;
      });
    }
  }

  return jobs;
}

/** Prepare the fixed email and certificate wording for one language. */
async function prepareFixedCopy(base44, language) {
  for (const copy of EMAIL_COPIES) {
    try {
      await localizeEmailCopy(base44, language, copy);
    } catch (error) {
      console.warn('[translation-prewarm] email copy failed:', error && error.message);
    }
  }
  try {
    await localizeCertificateLabels(base44, language);
  } catch (error) {
    console.warn('[translation-prewarm] certificate labels failed:', error && error.message);
  }
}

/**
 * Prepare as much of the course material as fits in the time budget.
 *
 * One language is finished before the next begins, so a learner using that
 * language never waits once its pass is complete. Everything already cached is
 * served without reaching the model, so running again simply carries on where
 * the last run stopped and picks up any English that has changed.
 *
 * @param {Object} base44 - Base44 client (the shared layer uses asServiceRole).
 * @param {{languages?: string[], timeBudgetMs?: number}} [options]
 * @returns {Promise<Object>} What was prepared and what remains.
 */
export async function runTranslationPrewarm(base44, options = {}) {
  const requested = Array.isArray(options.languages) && options.languages.length > 0
    ? options.languages
    : PREWARM_LANGUAGES;
  const languages = requested.filter((code) => PREWARM_LANGUAGES.includes(code));
  const timeBudgetMs = Number.isFinite(options.timeBudgetMs) ? options.timeBudgetMs : 40000;
  const startedAt = Date.now();

  if (languages.length === 0) {
    return { languages: [], modulesPrepared: 0, modulesTotal: 0, remaining: 0, complete: true };
  }

  const jobs = moduleJobs();
  const total = jobs.length * languages.length;
  let prepared = 0;
  let stopped = false;

  for (const language of languages) {
    if (stopped) break;

    await prepareFixedCopy(base44, language);

    for (const job of jobs) {
      if (Date.now() - startedAt > timeBudgetMs) {
        stopped = true;
        break;
      }
      try {
        const done = await job.run(base44, language);
        if (done) prepared += 1;
      } catch (error) {
        console.warn(
          '[translation-prewarm] module failed:',
          job.course,
          job.module,
          language,
          error && error.message,
        );
      }
    }
  }

  return {
    languages,
    modulesPrepared: prepared,
    modulesTotal: total,
    remaining: Math.max(total - prepared, 0),
    complete: prepared >= total,
  };
}