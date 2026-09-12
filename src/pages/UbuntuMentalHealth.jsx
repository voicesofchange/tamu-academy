import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import MhCourseProgress from '@/components/courses/MhCourseProgress';
import StartCourseButton from '@/components/courses/StartCourseButton';
import CourseOverviewLayout from '@/components/courses/CourseOverviewLayout';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

const lightBody = { color: '#725a46', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };
const darkBody = { color: '#d9cbb8', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };

const CONTENT = {
  courseEyebrow: 'Course',
  overviewEyebrow: 'Overview',
  overviewHeading: 'Course Description',
  outcomesEyebrow: 'Learning Outcomes',
  outcomesHeading: 'Competencies You Will Develop',
  pathEyebrow: 'Learning Path',
  pathHeading: 'The Path Through This Course',
  pathBody: 'The course follows a seven-module linear sequence, building from relational foundations through structural analysis, comparative approaches, program evaluation, and a final applied initiative.',
  modulesEyebrow: 'Modules',
  modulesHeading: 'Course Modules',
  modulesBody: 'Seven connected modules build the framework. Each module includes recorded lessons, written companions, reflection prompts, interactive scenarios, and knowledge checks.',
  milestoneEyebrow: 'Applied Milestone',
  progressEyebrow: 'Your Progress',
  progressHeading: 'Learner Progress',
  viewInsights: 'View Detailed Insights',
  safetyEyebrow: 'Safety',
  safetyHeading: 'Educational Disclaimer',
  safetyBody: 'This course is an educational resource, not clinical care, counseling, or a crisis intervention. It does not provide diagnosis or treatment. If you or someone you know is in distress, contact a qualified professional or emergency service in your country or institution. Personal reflections and the Community of Care Map remain private; learners may complete them privately, offline, or through the fictional alternative provided.',
  factLabels: {
    learningArea: 'Learning area',
    level: 'Level',
    format: 'Format',
    modules: 'Modules',
    estimatedCompletion: 'Estimated completion',
    certificate: 'Certificate',
    access: 'Access',
    status: 'Status',
  },
};

export default function UbuntuMentalHealth() {
  const { content: c } = useTranslatedContent('mh-course-overview', CONTENT);
  const course = MENTAL_HEALTH_COURSE;

  const courseFacts = [
    [c.factLabels.learningArea, course.learningArea],
    [c.factLabels.level, course.level],
    [c.factLabels.format, course.format],
    [c.factLabels.modules, String(course.modulesCount)],
    [c.factLabels.estimatedCompletion, course.estimatedCompletion],
    [c.factLabels.certificate, course.certificate],
    [c.factLabels.access, course.access],
    [c.factLabels.status, course.status],
  ];

  return (
    <CourseOverviewLayout
      heroEyebrow={c.courseEyebrow}
      heroTitle={course.title}
      heroSubtitle={course.subtitle}
      heroBadges={
        <>
          <StatusBadge label={course.status} />
          <StatusBadge label={course.access} />
        </>
      }
      heroCta={<StartCourseButton courseSlug={course.slug} />}
    >
      <PageMeta title={`${course.title} | Tamu Academy`} description={course.description} path={`/courses/${course.slug}`} noindex />

      {/* Overview */}
      <CourseOverviewSection surface="light" eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
        {course.descriptionLong.map((para, i) => (
          <p key={i} className="font-body" style={{ ...lightBody, marginBottom: '1.15rem' }}>{para}</p>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '1.5rem' }}>
          {courseFacts.map(([label, value]) => (
            <div key={label} style={{ padding: '16px 18px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
              <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{label}</span>
              <span className="font-body" style={{ color: '#725a46', fontSize: '13px', lineHeight: 1.6 }}>{value}</span>
            </div>
          ))}
        </div>
      </CourseOverviewSection>

      {/* Outcomes */}
      <CourseOverviewSection surface="light" eyebrow={c.outcomesEyebrow} heading={c.outcomesHeading}>
        <ol className="font-body" style={{ ...lightBody, margin: 0, paddingLeft: '1.25rem' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{outcome}</li>
          ))}
        </ol>
      </CourseOverviewSection>

      {/* Path */}
      <CourseOverviewSection surface="darker" eyebrow={c.pathEyebrow} heading={c.pathHeading}>
        <p className="font-body" style={{ ...darkBody, marginBottom: '1.75rem' }}>{c.pathBody}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem 0.5rem' }}>
          {course.learningPath.map((stage, i) => (
            <React.Fragment key={stage}>
              <span className="font-body" style={{
                color: i === course.learningPath.length - 1 ? '#e8b85b' : '#f3ead8',
                fontSize: '13px',
                letterSpacing: '0.04em',
                fontWeight: 400,
                border: `1px solid ${i === course.learningPath.length - 1 ? 'rgba(232,184,91,0.5)' : 'rgba(232,184,91,0.22)'}`,
                borderRadius: '2px',
                padding: '8px 14px',
                backgroundColor: i === course.learningPath.length - 1 ? 'rgba(232,184,91,0.06)' : 'rgba(243,234,216,0.015)',
              }}>{stage}</span>
              {i < course.learningPath.length - 1 && <span aria-hidden style={{ color: 'rgba(232,184,91,0.6)', fontSize: '14px' }}>&rarr;</span>}
            </React.Fragment>
          ))}
        </div>
      </CourseOverviewSection>

      {/* Modules */}
      <CourseOverviewSection surface="darker" eyebrow={c.modulesEyebrow} heading={c.modulesHeading}>
        <p className="font-body" style={{ ...darkBody, marginBottom: '1.75rem' }}>{c.modulesBody}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {course.modules.map((mod) => (
            <ModuleCard key={mod.number} module={mod} to={`/courses/${course.slug}/${mod.route}`} />
          ))}
        </div>
      </CourseOverviewSection>

      {/* Milestone */}
      <CourseOverviewSection surface="light" eyebrow={c.milestoneEyebrow} heading={course.milestone.title}>
        <div style={{ padding: '28px 32px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} tone="light" />
          </div>
          <p className="font-body" style={{ ...lightBody, marginBottom: 0 }}>{course.milestone.description}</p>
        </div>
      </CourseOverviewSection>

      {/* Progress */}
      <CourseOverviewSection surface="darker" eyebrow={c.progressEyebrow} heading={c.progressHeading}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to={`/courses/${course.slug}/insights`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#e8b85b', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(232,184,91,0.35)',
            borderRadius: '2px', padding: '9px 20px',
          }}>
            {c.viewInsights} &rarr;
          </Link>
        </div>
        <MhCourseProgress courseSlug={course.slug} />
      </CourseOverviewSection>

      {/* Safety */}
      <CourseOverviewSection surface="dark" eyebrow={c.safetyEyebrow} heading={c.safetyHeading}>
        <div style={{ padding: '28px 32px', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}>
          <p className="font-body" style={{ ...darkBody, margin: 0, fontStyle: 'italic' }}>{c.safetyBody}</p>
        </div>
      </CourseOverviewSection>

      <TamuGuideWidget />
    </CourseOverviewLayout>
  );
}