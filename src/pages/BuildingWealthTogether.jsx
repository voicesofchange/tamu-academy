import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import StartCourseButton from '@/components/courses/StartCourseButton';
import CourseOverviewLayout from '@/components/courses/CourseOverviewLayout';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import BuildingWealthCourseProgress from '@/components/courses/wealth/BuildingWealthCourseProgress';
import {
  BUILDING_WEALTH_TOGETHER_COURSE,
  WEALTH_TRACKS_WITH_MODULES,
  WEALTH_CAPSTONE_OPTIONS,
} from '@/lib/building-wealth-together-tracks';

const course = BUILDING_WEALTH_TOGETHER_COURSE;
const COURSE_PATH = `/courses/${course.slug}`;

const lightBody = { color: '#725a46', fontSize: '15px', lineHeight: 1.75, fontWeight: 300 };

const courseFacts = [
  ['Learning area', course.pillar],
  ['Level', course.level],
  ['Format', course.format],
  ['Modules', String(course.modulesCount)],
  ['Learning tracks', '3'],
  ['Estimated time', course.estimatedCompletion],
  ['Certificate', course.certificate],
  ['Access', course.access],
];

/**
 * Building Wealth Together — the public course page.
 *
 * Reads only the public preview metadata in
 * src/lib/building-wealth-together-tracks.js. The module content itself is
 * fetched one module at a time, after the server-side access checks, so
 * nothing protected is in the page a visitor receives.
 */
export default function BuildingWealthTogether() {
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
      <PageMeta title={`${course.title} | Tamu Academy`} description={course.description} path={COURSE_PATH} />

      <CourseOverviewSection surface="light" eyebrow="Overview" heading="About This Course">
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

      <CourseOverviewSection surface="light" eyebrow="Audience" heading="Who This Course Is For">
        {course.whoThisCourseIsFor.split('\n\n').map((para, i) => (
          <p key={i} className="font-body" style={{ ...lightBody, margin: i === 0 ? 0 : '1rem 0 0' }}>{para}</p>
        ))}
      </CourseOverviewSection>

      <CourseOverviewSection surface="light" eyebrow="Outcomes" heading="What You'll Be Able to Do by the End">
        <ol className="font-body" style={{ ...lightBody, margin: 0, paddingLeft: '1.25rem' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{outcome}</li>
          ))}
        </ol>
      </CourseOverviewSection>

      <CourseOverviewSection surface="darker" eyebrow="Course structure" heading="How the Course Is Organized">
        <p className="font-body" style={{ color: '#d9cbb8', fontSize: '15px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
          Everyone completes Track 1, the shared core. You can then take both pathways, or focus on
          the one that fits your goals before the capstone. Every module is open in this course: the
          pathway is a study focus, not a lock.
        </p>
        {WEALTH_TRACKS_WITH_MODULES.map((track, ti) => (
          <div key={track.id} style={{ marginBottom: ti < WEALTH_TRACKS_WITH_MODULES.length - 1 ? '2.75rem' : 0 }}>
            <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
              {track.audience}
            </span>
            <h3 className="font-heading" style={{ color: '#f3ead8', fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)', fontWeight: 400, margin: '0.5rem 0 0.6rem' }}>
              {track.label}
            </h3>
            <p className="font-body" style={{ color: '#d9cbb8', fontSize: '14px', lineHeight: 1.7, fontWeight: 300, margin: '0 0 1.25rem', maxWidth: '680px' }}>
              {track.summary}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {track.modules.map((module) => (
                <ModuleCard
                  key={module.route}
                  module={module}
                  to={`${COURSE_PATH}/${module.route}`}
                />
              ))}
            </div>
          </div>
        ))}
      </CourseOverviewSection>

      <CourseOverviewSection surface="darker" eyebrow="Module rhythm" heading="How Each Module Works">
        <p className="font-body" style={{ color: '#d9cbb8', fontSize: '15px', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem' }}>
          Every module follows the same rhythm, so you always know where you are.
        </p>
        <ol className="font-body" style={{ color: '#d9cbb8', fontSize: '14px', lineHeight: 1.9, fontWeight: 300, margin: 0, paddingLeft: '1.25rem' }}>
          {course.moduleRhythm.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="font-body" style={{ color: '#d9cbb8', fontSize: '14px', lineHeight: 1.8, fontWeight: 300, margin: '1.5rem 0 0' }}>
          Everything you need is in the lessons and free videos. No purchases are required.
        </p>
      </CourseOverviewSection>

      <CourseOverviewSection surface="light" eyebrow="Capstone" heading="Capstone Project">
        <div style={{ padding: '28px 32px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} tone="light" />
          </div>
          <p className="font-body" style={{ ...lightBody, marginBottom: '1.5rem' }}>{course.milestone.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {WEALTH_CAPSTONE_OPTIONS.map((option) => (
              <div key={option.id} style={{ padding: '16px 18px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fdf7ea' }}>
                <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                  {option.buildsOn}
                </span>
                <span className="font-body" style={{ color: '#5f4531', fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}>{option.label}</span>
              </div>
            ))}
          </div>
          <p className="font-body" style={{ ...lightBody, fontSize: '14px', fontStyle: 'italic', marginTop: '1.5rem', marginBottom: 0 }}>
            Finish all nine modules, then submit the capstone option that best fits your goals.
          </p>
        </div>
      </CourseOverviewSection>

      <CourseOverviewSection surface="darker" eyebrow="Your progress" heading="Your Progress in This Course">
        <BuildingWealthCourseProgress />
      </CourseOverviewSection>

      <CourseOverviewSection surface="dark" eyebrow="Access" heading="Begin Learning">
        <StartCourseButton courseSlug={course.slug} />
        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#e8b85b',
              fontSize: '12px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1px solid rgba(232,184,91,0.4)',
              borderRadius: '2px',
              padding: '11px 22px',
            }}
          >
            Back to Courses &rarr;
          </Link>
          <Link
            to="/my-courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#e8b85b',
              fontSize: '12px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1px solid rgba(232,184,91,0.4)',
              borderRadius: '2px',
              padding: '11px 22px',
            }}
          >
            My Courses &rarr;
          </Link>
        </div>
      </CourseOverviewSection>

      <TamuGuideWidget />
    </CourseOverviewLayout>
  );
}