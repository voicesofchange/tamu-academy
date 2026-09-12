import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import EconomicsCourseProgress from '@/components/courses/EconomicsCourseProgress';
import StartCourseButton from '@/components/courses/StartCourseButton';
import CourseOverviewLayout from '@/components/courses/CourseOverviewLayout';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';
import { useAuth } from '@/lib/AuthContext';
import { canViewInDevelopment } from '@/lib/module-access';
import { useTranslation } from '@/lib/i18n';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

const lightBody = { color: '#725a46', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };
const darkBody = { color: '#d9cbb8', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };

/**
 * Reusable course landing template. Receives a course data object
 * (structured in src/lib/economics-tracks.js) and renders it through
 * the warm parchment-and-gold course overview layout.
 */
export default function CoursePageTemplate({ course }) {
  const { t } = useTranslation();
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
    <CourseOverviewLayout
      heroEyebrow="Course"
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
      <PageMeta title={`${course.title} | Tamu Academy`} description={course.description} path={`/courses/${course.slug}`} />

      {/* Overview */}
      <CourseOverviewSection surface="light" eyebrow={t('course.overview')} heading={t('course.description')}>
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

      {/* Audience */}
      <CourseOverviewSection surface="light" eyebrow={t('course.audience')} heading={t('course.whoFor')}>
        {course.whoThisCourseIsFor.split('\n\n').map((para, i) => (
          <p key={i} className="font-body" style={{ ...lightBody, margin: i === 0 ? 0 : '1rem 0 0' }}>{para}</p>
        ))}
      </CourseOverviewSection>

      {/* Outcomes */}
      <CourseOverviewSection surface="light" eyebrow={t('course.outcomes')} heading={t('course.competencies')}>
        <ol className="font-body" style={{ ...lightBody, margin: 0, paddingLeft: '1.25rem' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{outcome}</li>
          ))}
        </ol>
      </CourseOverviewSection>

      {/* Path */}
      <CourseOverviewSection surface="darker" eyebrow={t('course.path')} heading={t('course.pathHeading')}>
        <p className="font-body" style={{ ...darkBody, marginBottom: '1.75rem' }}>{t('course.pathIntro')}</p>
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
      <CourseOverviewSection surface="darker" eyebrow={t('course.modules')} heading={t('course.modulesHeading')}>
        <p className="font-body" style={{ ...darkBody, marginBottom: '1.75rem' }}>{t('course.modulesIntro')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {course.modules.map((module) => (
            <ModuleCard
              key={module.number}
              module={module}
              to={module.route ? `/courses/${course.slug}/${module.route}` : null}
            />
          ))}
        </div>
      </CourseOverviewSection>

      {/* Milestone */}
      <CourseOverviewSection surface="light" eyebrow={t('course.milestone')} heading={course.milestone.title}>
        <div style={{ padding: '28px 32px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} tone="light" />
          </div>
          <p className="font-body" style={{ ...lightBody, marginBottom: '1.5rem' }}>{course.milestone.description}</p>
          <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.85rem' }}>{t('course.finalAnalysis')}</span>
          <ul className="font-body" style={{ ...lightBody, margin: 0, paddingLeft: '1.25rem' }}>
            {course.milestone.analysisPoints.map((point) => (
              <li key={point} style={{ marginBottom: '0.5rem' }}>{point}</li>
            ))}
          </ul>
          <p className="font-body" style={{ ...lightBody, fontSize: '14px', fontStyle: 'italic', marginTop: '1.5rem', marginBottom: 0 }}>{t('course.milestoneNote')}</p>
        </div>
      </CourseOverviewSection>

      {/* Progress */}
      <CourseOverviewSection surface="darker" eyebrow={t('course.yourProgress')} heading={t('course.progress')}>
        <EconomicsCourseProgress courseSlug={course.slug} />
      </CourseOverviewSection>

      {/* Access */}
      <CourseOverviewSection surface="dark" eyebrow={t('course.access')} heading={t('common.beginLearning')}>
        <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', color: '#e8b85b', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(232,184,91,0.4)', borderRadius: '2px', padding: '11px 22px' }}>
          {t('common.backToCourses')} &rarr;
        </Link>
      </CourseOverviewSection>

      <TamuGuideWidget />
    </CourseOverviewLayout>
  );
}