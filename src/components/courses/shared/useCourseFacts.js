import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { COURSE_FACT_TEXT, getCourseFacts } from '@/lib/course-facts';

/** The labels every course-facts component uses, translated once. */
const FACT_LABELS = {
  modules: '{count} modules',
  module: '1 module',
  hoursRange: '{min}–{max} hours',
  hoursAbout: 'About {count} hours',
  certificateIncluded: 'Certificate included',
  selfPaced: 'Self-paced',
  credential: 'Certificate of Completion',
  qrVerified: 'QR-verified',
  comingSoon: 'Coming soon',
};

/**
 * useCourseFactText — the translated course facts and fact labels, from two
 * shared cache entries (course-facts, course-fact-labels), so a page with
 * several cards still translates each fact once.
 *
 * Returns { labels, area(id), course(slug), hours(slug) }:
 *   area(id)     → the translated learning-area label
 *   course(slug) → { ...facts, title, summary, level, deliverable } translated
 *   hours(slug)  → "4–6 hours" / "About 2 hours", plus the note if any
 */
export function useCourseFactText() {
  const { content: text } = useTranslatedContent('course-facts', COURSE_FACT_TEXT);
  const { content: labels } = useTranslatedContent('course-fact-labels', FACT_LABELS);

  const area = (id) => (text.areas && text.areas[id]) || COURSE_FACT_TEXT.areas[id] || '';

  const course = (slug) => {
    const facts = getCourseFacts(slug);
    if (!facts) return null;
    const t = (text.courses && text.courses[slug]) || COURSE_FACT_TEXT.courses[slug];
    return { ...facts, title: t.title, summary: t.summary, level: t.level, deliverable: t.deliverable || null, hoursNote: t.hoursNote };
  };

  const modules = (count) => (count === 1 ? labels.module : fillTemplate(labels.modules, { count }));

  const hours = (slug) => {
    const c = course(slug);
    if (!c || !c.hours) return '';
    const { min, max } = c.hours;
    const base = min === max
      ? fillTemplate(labels.hoursAbout, { count: min })
      : fillTemplate(labels.hoursRange, { min, max });
    return c.hoursNote ? `${base}, ${c.hoursNote}` : base;
  };

  return { labels, area, course, modules, hours };
}
