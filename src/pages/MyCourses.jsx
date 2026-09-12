import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const COURSE_META = {
  [MENTAL_HEALTH_COURSE.slug]: MENTAL_HEALTH_COURSE,
  [ECONOMICS_COURSE.slug]: ECONOMICS_COURSE,
};

const primaryButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#24150f', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 600, textDecoration: 'none', border: 'none', borderRadius: '2px',
  padding: '0.65rem 1.3rem', backgroundColor: '#e8b85b',
};

const linkButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#e8b85b', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(232,184,91,0.5)',
  borderRadius: '2px', padding: '0.65rem 1.3rem',
};

const CONTENT = {
  heroEyebrow: 'My Courses',
  heroHeading: 'Your Learning Journey',
  heroSubheading: 'Continue where you left off, track your progress across courses, and access your certificates of completion.',
  emptyEyebrow: 'Get Started',
  emptyHeading: "You haven't enrolled in a course yet",
  emptyBody: 'Browse available courses and enroll to start tracking your progress here. Your enrolled courses, module progress, and certificates will all appear on this page.',
  browseCourses: 'Browse Courses',
  resumeEyebrow: 'Continue Learning',
  resumeHeading: 'Pick up where you left off',
  progress: 'Progress',
  of: 'of',
  modules: 'modules',
  continueAt: 'Continue at',
  enrolledEyebrow: 'Your Courses',
  enrolledHeading: 'Enrolled Courses',
  resumeAt: 'Resume at',
  reviewCompletion: 'Review Course Completion',
  courseOverview: 'Course Overview',
  viewCertificate: 'View Certificate',
  nowAvailable: 'Now Available',
  inDevelopment: 'In Development',
};

export default function MyCourses() {
  const { content: c } = useTranslatedContent('my-courses', CONTENT);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [pubStatus, setPubStatus] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mhRes, econRes, pubRes] = await Promise.all([
          base44.functions.invoke('getMentalHealthCourseCompletion', { courseSlug: MENTAL_HEALTH_COURSE.slug }),
          base44.functions.invoke('getEconomicsCourseCompletion', { courseSlug: ECONOMICS_COURSE.slug }),
          base44.functions.invoke('getPublicationStatus', {}),
        ]);
        if (cancelled) return;
        setPubStatus(pubRes?.data?.courses || {});
        const enrolled = [];
        if (mhRes?.data?.hasEnrollment) enrolled.push({ slug: MENTAL_HEALTH_COURSE.slug, completion: mhRes.data });
        if (econRes?.data?.hasEnrollment) enrolled.push({ slug: ECONOMICS_COURSE.slug, completion: econRes.data });
        setCourses(enrolled);
      } catch (err) {
        // Not authenticated or error — empty state handles it.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const resumeTarget = courses
    .map((c) => ({
      ...c,
      meta: COURSE_META[c.slug],
      firstIncomplete: c.completion?.incompleteModules?.[0] || null,
      completedCount: c.completion?.completedCount || 0,
    }))
    .filter((c) => c.firstIncomplete)
    .sort((a, b) => b.completedCount - a.completedCount)[0];

  return (
    <PageLayout>
      <PageMeta
        title="My Courses | Tamu Academy"
        description="Track your enrolled courses, progress, and certificates at Tamu Academy."
        path="/my-courses"
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        heading={c.heroHeading}
        subheading={c.heroSubheading}
      />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div style={{ width: '2rem', height: '2rem', border: '3px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : courses.length === 0 ? (
        <PageSection eyebrow={c.emptyEyebrow} heading={c.emptyHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            {c.emptyBody}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {[MENTAL_HEALTH_COURSE, ECONOMICS_COURSE].map((course) => (
              <Link key={course.slug} to={`/courses/${course.slug}`} style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', textDecoration: 'none', display: 'block' }}>
                <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>{pubStatus[course.slug]?.isLive ? 'Available Now' : 'In Development'}</span>
                <span className="font-heading" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.3, display: 'block' }}>{course.title}</span>
              </Link>
            ))}
          </div>
          <Link to="/courses" className="font-body" style={primaryButtonStyle}>
            {c.browseCourses} &rarr;
          </Link>
        </PageSection>
      ) : (
        <>
          {resumeTarget && (
            <PageSection eyebrow={c.resumeEyebrow} heading={c.resumeHeading}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)' }}
              >
                <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.5rem' }}>
                  {resumeTarget.meta?.title}
                </p>
                <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.5rem' }}>
                  {resumeTarget.firstIncomplete.number}: {resumeTarget.firstIncomplete.title}
                </h3>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                    <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
                      {c.progress}
                    </span>
                    <span className="font-body" style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500 }}>
                      {resumeTarget.completedCount} {c.of} {resumeTarget.completion?.totalModules} {c.modules}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={Math.round((resumeTarget.completedCount / (resumeTarget.completion?.totalModules || 1)) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${resumeTarget.meta?.title} progress`}
                    style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}
                  >
                    <div style={{ width: `${Math.round((resumeTarget.completedCount / (resumeTarget.completion?.totalModules || 1)) * 100)}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
                <Link to={`/courses/${resumeTarget.slug}/${resumeTarget.firstIncomplete.route}`} className="font-body" style={primaryButtonStyle}>
                  {c.continueAt} {resumeTarget.firstIncomplete.number} &rarr;
                </Link>
              </motion.div>
            </PageSection>
          )}

          <PageSection eyebrow={c.enrolledEyebrow} heading={c.enrolledHeading}>
            {courses.map((enr) => {
              const meta = COURSE_META[enr.slug];
              const completedCount = enr.completion?.completedCount || 0;
              const totalModules = enr.completion?.totalModules || 0;
              const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
              const firstIncomplete = enr.completion?.incompleteModules?.[0] || null;
              const resumePath = firstIncomplete
                ? `/courses/${enr.slug}/${firstIncomplete.route}`
                : `/courses/${enr.slug}/completion`;
              const resumeLabel = firstIncomplete ? `${c.resumeAt} ${firstIncomplete.number}` : c.reviewCompletion;
              const statusLabel = pubStatus[enr.slug]?.isLive ? c.nowAvailable : c.inDevelopment;
              return (
                <motion.div
                  key={enr.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', marginBottom: '1.25rem' }}
                >
                  <div style={{ marginBottom: '0.85rem' }}>
                    <StatusBadge label={statusLabel} />
                  </div>
                  <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 1rem' }}>
                    {meta?.title}
                  </h3>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                      <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
                        {c.progress}
                      </span>
                      <span className="font-body" style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500 }}>
                        {completedCount} {c.of} {totalModules} {c.modules}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${meta?.title} progress`}
                      style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}
                    >
                      <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link to={resumePath} className="font-body" style={primaryButtonStyle}>
                      {resumeLabel} &rarr;
                    </Link>
                    <Link to={`/courses/${enr.slug}`} className="font-body" style={linkButtonStyle}>
                      {c.courseOverview} &rarr;
                    </Link>
                    {enr.completion?.certificateEligible && (
                      <Link to={`/courses/${enr.slug}/certificate`} className="font-body" style={linkButtonStyle}>
                        {c.viewCertificate} &rarr;
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </PageSection>
        </>
      )}
      <TamuGuideWidget />
    </PageLayout>
  );
}