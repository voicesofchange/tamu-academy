import React from 'react';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import { DIASPORA_REMITTANCE_COURSE } from '@/lib/diaspora-remittance-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * DiasporaRemittanceEconomy — the public overview page for the first course
 * built with the course template.
 *
 * The page only describes the course. Its modules live at
 * /courses/diaspora-remittance-economy/module-N and are served by the one
 * template module page.
 *
 * Its own prose goes through the shared translation system like every other
 * page; the identifiers CoursePageTemplate relies on (the slug and each
 * module's route) are restored after translation so a link can never be
 * translated into a route that does not exist.
 */
const PAGE_CONTENT = {
  progressNote:
    'Your progress is saved module by module. Open Module 1 to begin, and return to any module you have already reached.',
};

export default function DiasporaRemittanceEconomy() {
  const { content } = useTranslatedContent('diaspora-remittance-course', DIASPORA_REMITTANCE_COURSE);
  const { content: p } = useTranslatedContent('diaspora-remittance-progress', PAGE_CONTENT);

  const course = {
    ...content,
    slug: DIASPORA_REMITTANCE_COURSE.slug,
    modules: (content.modules || []).map((module, index) => ({
      ...module,
      route: DIASPORA_REMITTANCE_COURSE.modules[index].route,
    })),
  };

  // The shared progress panel reads the economics course, so this course uses
  // its own short note instead of borrowing a panel for another course.
  const progressSlot = (
    <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '15px', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
      {p.progressNote}
    </p>
  );

  return <CoursePageTemplate course={course} progressSlot={progressSlot} />;
}