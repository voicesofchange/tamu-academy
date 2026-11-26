import React from 'react';
import { Link } from 'react-router-dom';
import MhCourseProgress from '@/components/courses/MhCourseProgress';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';

const darkBody = { color: '#d9cbb8', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };

/**
 * Mental Health, Community and Culture — the course overview page, on the
 * shared CoursePageTemplate. The course keeps its own path and modules
 * wording, the link to its insights page above the progress panel, and its
 * educational disclaimer as a full-width section.
 */
const CONTENT = {
  pathBody: 'The course follows a seven-module linear sequence, building from relational foundations through structural analysis, comparative approaches, program evaluation, and a final applied initiative.',
  modulesBody: 'Seven connected modules build the framework. Each module includes recorded lessons, written companions, reflection prompts, interactive scenarios, and knowledge checks.',
  viewInsights: 'View Detailed Insights',
  safetyEyebrow: 'Safety',
  safetyHeading: 'Educational Disclaimer',
  safetyBody: 'This course is an educational resource, not clinical care, counseling, or a crisis intervention. It does not provide diagnosis or treatment. If you or someone you know is in distress, contact a qualified professional or emergency service in your country or institution. Personal reflections and the Community of Care Map remain private; learners may complete them privately, offline, or through the fictional alternative provided.',
};

export default function UbuntuMentalHealth() {
  const { content: c } = useTranslatedContent('mh-course-overview', CONTENT);
  // The course's own text is translated too: its title, description, who it is
  // for, outcomes and each module's title and summary. Structural values (slug,
  // module routes and numbers) are restored afterwards.
  const { content: courseContent } = useTranslatedContent('mh-course-data', MENTAL_HEALTH_COURSE);
  const course = restoreCourse(courseContent, MENTAL_HEALTH_COURSE);

  return (
    <CoursePageTemplate
      course={course}
      pathIntro={c.pathBody}
      syllabusIntro={c.modulesBody}
      progressSlot={<MhCourseProgress courseSlug={course.slug} />}
      progressExtra={(
        <Link
          to={`/courses/${course.slug}/insights`}
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#e8b85b', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(232,184,91,0.35)',
            borderRadius: '2px', padding: '9px 20px',
          }}
        >
          {c.viewInsights} &rarr;
        </Link>
      )}
    >
      <CourseOverviewSection surface="dark" eyebrow={c.safetyEyebrow} heading={c.safetyHeading}>
        <div style={{ padding: '28px 32px', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
          <p className="font-body" style={{ ...darkBody, margin: 0, fontStyle: 'italic' }}>{c.safetyBody}</p>
        </div>
      </CourseOverviewSection>
    </CoursePageTemplate>
  );
}
