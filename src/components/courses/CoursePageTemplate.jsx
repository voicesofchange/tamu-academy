import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import EconomicsCourseProgress from '@/components/courses/EconomicsCourseProgress';
import StartCourseButton from '@/components/courses/StartCourseButton';
import { useAuth } from '@/lib/AuthContext';
import { canViewInDevelopment } from '@/lib/module-access';
import { useTranslation } from '@/lib/i18n';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Reusable, future-ready course landing template.
 * Receives a course data object (structured in src/lib/economics-tracks.js)
 * and renders it through the existing Tamu Academy layout system.
 */
export default function CoursePageTemplate({ course }) {
  const { t } = useTranslation();
  const metaDescription = course.description;
  const { isAuthenticated, user } = useAuth();
  const allowDevModules = canViewInDevelopment({ isAuthenticated, role: user?.role });

  const courseFacts = [
    [t('course.pillar'), course.pillar],
    [t('course.track'), course.track],
    [t('course.level'), course.level],
    [t('course.format'), course.format],
    [t('course.modulesCount'), String(course.modulesCount)],
    [t('course.estimatedCompletion'), course.estimatedCompletion],
    [t('course.certificate'), course.certificate],
    [t('course.access'), course.access],
  ];

  return (
    <PageLayout>
      <PageMeta title={`${course.title} | Tamu Academy`} description={metaDescription} path={`/courses/${course.slug}`} />

      <PageHero
        eyebrow="Course"
        heading={course.title}
        subheading={course.subtitle}
      />

      <PageSection eyebrow={t('course.status')} heading={t('common.courseStatus')}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <StatusBadge label={course.status} />
          <StatusBadge label={course.access} />
        </div>
        <p className="font-body" style={{ ...bodyText, margin: 0, maxWidth: '640px' }}>
          {t('common.enrollPrompt')}
        </p>
      </PageSection>

      <PageSection eyebrow={t('course.begin')} heading={t('common.startCourse')}>
        <StartCourseButton courseSlug={course.slug} />
      </PageSection>

      <PageSection eyebrow={t('course.overview')} heading={t('course.description')}>
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

      <PageSection eyebrow={t('course.audience')} heading={t('course.whoFor')}>
        {course.whoThisCourseIsFor.split('\n\n').map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, margin: i === 0 ? 0 : '1rem 0 0' }}>
            {para}
          </p>
        ))}
      </PageSection>

      <PageSection eyebrow={t('course.outcomes')} heading={t('course.competencies')}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem', counterReset: 'outcome' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>
              {outcome}
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection eyebrow={t('course.path')} heading={t('course.pathHeading')}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          {t('course.pathIntro')}
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

      <PageSection eyebrow={t('course.modules')} heading={t('course.modulesHeading')}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          {t('course.modulesIntro')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {course.modules.map((module) => (
            <ModuleCard
              key={module.number}
              module={module}
              to={module.route ? `/courses/${course.slug}/${module.route}` : null}
            />
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow={t('course.milestone')} heading={course.milestone.title}>
        <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} />
          </div>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            {course.milestone.description}
          </p>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.85rem' }}>
            {t('course.finalAnalysis')}
          </span>
          <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
            {course.milestone.analysisPoints.map((point) => (
              <li key={point} style={{ marginBottom: '0.5rem' }}>{point}</li>
            ))}
          </ul>
          <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', marginTop: '1.5rem', marginBottom: 0 }}>
            {t('course.milestoneNote')}
          </p>
        </div>
      </PageSection>

      <PageSection eyebrow={t('course.yourProgress')} heading={t('course.progress')}>
        <EconomicsCourseProgress courseSlug={course.slug} />
      </PageSection>

      <PageSection eyebrow={t('course.access')} heading={t('common.beginLearning')}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
          <Link
            to="/courses"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            {t('common.backToCourses')} &rarr;
          </Link>
        </div>
      </PageSection>
    </PageLayout>
  );
}