import React from 'react';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';
import PageNotFound from '@/lib/PageNotFound';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

/**
 * Pilot course page: Understanding African Economies and the Global System.
 * Thin wrapper that resolves course data by slug from the Economics and
 * Development tracks data, then renders via the shared CoursePageTemplate.
 *
 * The course's own text — its title, description, who it is for, outcomes and
 * each module's title and summary — goes through the shared translation
 * system. The slug and module routes are restored after translation so a card
 * can never link to a route that does not exist.
 */
export default function UnderstandingAfricanEconomies() {
  const found = getEconomicsCourseBySlug(COURSE_SLUG);
  const { content } = useTranslatedContent('economics-course-overview', found && found.course);

  if (!found || !found.course) {
    return <PageNotFound />;
  }

  return <CoursePageTemplate course={restoreCourse(content, found.course)} />;
}