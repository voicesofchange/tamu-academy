import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import MhCourseProgress from '@/components/courses/MhCourseProgress';
import StartCourseButton from '@/components/courses/StartCourseButton';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const CONTENT = {
  courseEyebrow: 'Course',
  statusEyebrow: 'Status',
  statusHeading: 'Course Status',
  statusBody: 'This course is available. Create an account or sign in to begin learning, save your progress, and earn a certificate upon completion.',
  beginEyebrow: 'Begin',
  beginHeading: 'Start This Course',
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
    <PageLayout>
      <PageMeta
        title={`${course.title} | Tamu Academy`}
        description={course.description}
        path={`/courses/${course.slug}`}
        noindex
      />

      <PageHero eyebrow={c.courseEyebrow} heading={course.title} subheading={course.subtitle} />

      <PageSection eyebrow={c.statusEyebrow} heading={c.statusHeading}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <StatusBadge label={course.status} />
          <StatusBadge label={course.access} />
        </div>
        <p className="font-body" style={{ ...bodyText, margin: 0, maxWidth: '640px' }}>
          {c.statusBody}
        </p>
      </PageSection>

      <PageSection eyebrow={c.beginEyebrow} heading={c.beginHeading}>
        <StartCourseButton courseSlug={course.slug} />
      </PageSection>

      <PageSection eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
        {course.descriptionLong.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
            {para}
          </p>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginTop: '1.5rem' }}>
          {courseFacts.map(([label, value]) => (
            <div key={label} style={{ padding: '0.9rem 1.1rem', border: '1px solid rgba(212,161,42,0.12)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
              <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{label}</span>
              <span className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>{value}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow={c.outcomesEyebrow} heading={c.outcomesHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{outcome}</li>
          ))}
        </ol>
      </PageSection>

      <PageSection eyebrow={c.pathEyebrow} heading={c.pathHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          {c.pathBody}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem 0.5rem' }}>
          {course.learningPath.map((stage, i) => (
            <React.Fragment key={stage}>
              <span
                className="font-body"
                style={{
                  color: i === course.learningPath.length - 1 ? '#D4A12A' : 'rgba(245,239,224,0.85)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  border: `1px solid ${i === course.learningPath.length - 1 ? 'rgba(212,161,42,0.5)' : 'rgba(212,161,42,0.22)'}`,
                  borderRadius: '2px',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: i === course.learningPath.length - 1 ? 'rgba(212,161,42,0.06)' : 'rgba(245,239,224,0.015)',
                }}
              >
                {stage}
              </span>
              {i < course.learningPath.length - 1 && (
                <span aria-hidden="true" style={{ color: 'rgba(212,161,42,0.6)', fontSize: '0.85rem' }}>&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow={c.modulesEyebrow} heading={c.modulesHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          {c.modulesBody}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {course.modules.map((mod) => (
            <ModuleCard
              key={mod.number}
              module={mod}
              to={`/courses/${course.slug}/${mod.route}`}
            />
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow={c.milestoneEyebrow} heading={course.milestone.title}>
        <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} />
          </div>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
            {course.milestone.description}
          </p>
        </div>
      </PageSection>

      <PageSection eyebrow={c.progressEyebrow} heading={c.progressHeading}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to={`/courses/${course.slug}/insights`} className="font-body" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#D4A12A', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(212,161,42,0.35)',
            borderRadius: '2px', padding: '0.55rem 1.2rem',
          }}>
            {c.viewInsights} &rarr;
          </Link>
        </div>
        <MhCourseProgress courseSlug={course.slug} />
      </PageSection>

      <PageSection eyebrow={c.safetyEyebrow} heading={c.safetyHeading}>
        <div style={{ padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>
            {c.safetyBody}
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}