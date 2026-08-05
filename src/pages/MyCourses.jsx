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

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const COURSE_META = {
  [MENTAL_HEALTH_COURSE.slug]: MENTAL_HEALTH_COURSE,
  [ECONOMICS_COURSE.slug]: ECONOMICS_COURSE,
};

const primaryButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#1A130E', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 600, textDecoration: 'none', border: 'none', borderRadius: '2px',
  padding: '0.65rem 1.3rem', backgroundColor: '#D4A12A',
};

const linkButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#D4A12A', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(212,161,42,0.5)',
  borderRadius: '2px', padding: '0.65rem 1.3rem',
};

/**
 * MyCourses — a learner dashboard showing enrolled courses, overall
 * progress, a "continue where you left off" entry point, and certificate
 * access. Reuses the course-completion endpoints (already server-verified)
 * and the publication-status endpoint for accurate badges.
 */
export default function MyCourses() {
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

  // "Continue where you left off" — the enrolled course with the most
  // progress that still has an incomplete module.
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
        eyebrow="My Courses"
        heading="Your Learning Journey"
        subheading="Continue where you left off, track your progress across courses, and access your certificates of completion."
      />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div style={{ width: '2rem', height: '2rem', border: '3px solid rgba(212,161,42,0.2)', borderTopColor: '#D4A12A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : courses.length === 0 ? (
        <PageSection eyebrow="Get Started" heading="You haven't enrolled in a course yet">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            Browse available courses and enroll to start tracking your progress here. Your enrolled courses, module progress, and certificates will all appear on this page.
          </p>
          <Link to="/courses" className="font-body" style={primaryButtonStyle}>
            Browse Courses &rarr;
          </Link>
        </PageSection>
      ) : (
        <>
          {resumeTarget && (
            <PageSection eyebrow="Continue Learning" heading="Pick up where you left off">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)' }}
              >
                <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.5rem' }}>
                  {resumeTarget.meta?.title}
                </p>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.5rem' }}>
                  {resumeTarget.firstIncomplete.number}: {resumeTarget.firstIncomplete.title}
                </h3>
                <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
                  You have completed {resumeTarget.completedCount} of {resumeTarget.completion?.totalModules} modules in this course.
                </p>
                <Link to={`/courses/${resumeTarget.slug}/${resumeTarget.firstIncomplete.route}`} className="font-body" style={primaryButtonStyle}>
                  Continue at {resumeTarget.firstIncomplete.number} &rarr;
                </Link>
              </motion.div>
            </PageSection>
          )}

          <PageSection eyebrow="Your Courses" heading="Enrolled Courses">
            {courses.map((c) => {
              const meta = COURSE_META[c.slug];
              const completedCount = c.completion?.completedCount || 0;
              const totalModules = c.completion?.totalModules || 0;
              const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
              const firstIncomplete = c.completion?.incompleteModules?.[0] || null;
              const resumePath = firstIncomplete
                ? `/courses/${c.slug}/${firstIncomplete.route}`
                : `/courses/${c.slug}/completion`;
              const resumeLabel = firstIncomplete ? `Resume at ${firstIncomplete.number}` : 'Review Course Completion';
              const statusLabel = pubStatus[c.slug]?.isLive ? 'Now Available' : 'In Development';
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginBottom: '1.25rem' }}
                >
                  <div style={{ marginBottom: '0.85rem' }}>
                    <StatusBadge label={statusLabel} />
                  </div>
                  <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 1rem' }}>
                    {meta?.title}
                  </h3>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                      <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
                        Progress
                      </span>
                      <span className="font-body" style={{ color: '#F5EFE0', fontSize: '0.95rem', fontWeight: 500 }}>
                        {completedCount} of {totalModules} modules
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${meta?.title} progress`}
                      style={{ width: '100%', height: '6px', backgroundColor: 'rgba(245,239,224,0.08)', borderRadius: '3px', overflow: 'hidden' }}
                    >
                      <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#D4A12A', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link to={resumePath} className="font-body" style={primaryButtonStyle}>
                      {resumeLabel} &rarr;
                    </Link>
                    <Link to={`/courses/${c.slug}`} className="font-body" style={linkButtonStyle}>
                      Course Overview &rarr;
                    </Link>
                    {c.completion?.certificateEligible && (
                      <Link to={`/courses/${c.slug}/certificate`} className="font-body" style={linkButtonStyle}>
                        View Certificate &rarr;
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </PageSection>
        </>
      )}
    </PageLayout>
  );
}