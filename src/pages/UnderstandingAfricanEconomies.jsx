import React from 'react';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';
import PageNotFound from '@/lib/PageNotFound';

/**
 * Pilot course page: Understanding African Economies and the Global System.
 * Thin wrapper that resolves course data by slug from the Economics and
 * Development tracks data, then renders via the shared CoursePageTemplate.
 */
export default function UnderstandingAfricanEconomies() {
  const found = getEconomicsCourseBySlug('understanding-african-economies-and-the-global-system');

  if (!found || !found.course) {
    return <PageNotFound />;
  }

  return <CoursePageTemplate course={found.course} />;
}