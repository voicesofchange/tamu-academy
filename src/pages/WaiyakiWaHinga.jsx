import React from 'react';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import WaiyakiCourseProgress from '@/components/courses/waiyaki/WaiyakiCourseProgress';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';

/**
 * Waiyaki wa Hinga — the course overview page. It reuses the shared course
 * overview layout and supplies its own progress component, which handles
 * enrollment, resume and the certificate link.
 */
export default function WaiyakiWaHinga() {
  return (
    <CoursePageTemplate
      course={WAIYAKI_COURSE}
      progressSlot={<WaiyakiCourseProgress />}
    />
  );
}