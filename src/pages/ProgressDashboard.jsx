import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import ProgressSummaryStrip from '@/components/progress/ProgressSummaryStrip';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import ProgressCourseCard from '@/components/progress/ProgressCourseCard';
import { useAuth } from '@/lib/AuthContext';
import { LEARNER_COURSES, buildLearnerProgress, summariseProgress } from '@/lib/learner-progress';

const linkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};

/**
 * ProgressDashboard — the learner's own progress across every course.
 *
 * It reads only the records the learner already owns (their enrollments and
 * their own module progress), joins them to the published course structure,
 * and shows completed modules and current standing for all courses at once.
 * Opening a course reveals its module-by-module detail, and courses with no
 * progress appear too, so the picture is always complete.
 */
export default function ProgressDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const [enrollments, moduleProgress] = await Promise.all([
          base44.entities.CourseEnrollment.filter({ learner_id: user.id }, '-enrolled_at', 200),
          base44.entities.ModuleProgress.filter({ learner_id: user.id }, '-updated_date', 500),
        ]);
        if (cancelled) return;
        setProgress(buildLearnerProgress(LEARNER_COURSES, enrollments, moduleProgress));
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const summary = progress.length > 0 ? summariseProgress(progress) : null;
  const hasAnyProgress = progress.some((course) => course.enrolled || course.completedCount > 0);

  return (
    <PageLayout>
      <PageMeta
        title="My Progress | Tamu Academy"
        description="Every course, the modules you have completed, and your current standing at Tamu Academy."
        path="/my-progress"
        noindex
      />
      <PageHero
        eyebrow="My Progress"
        heading="Where you stand across every course"
        subheading="All of your courses in one view: what you have completed, where you stopped, and what comes next."
      />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div style={{ width: '2rem', height: '2rem', border: '3px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : failed ? (
        <PageSection heading="Your progress could not be loaded">
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            Something went wrong while reading your progress. Please reload the page to try again.
          </p>
        </PageSection>
      ) : (
        <>
          {summary && (
            <PageSection eyebrow="At a glance" heading="Your progress at a glance">
              <ProgressSummaryStrip summary={summary} />
              {!hasAnyProgress && (
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: '1.75rem 0 0' }}>
                  You have not started a course yet. Every course below is open, so pick the one whose opening question you would most like answered and your progress will appear here.
                </p>
              )}
            </PageSection>
          )}

          <PageSection eyebrow="All courses" heading="Every course and module">
            {progress.map((course) => (
              <ProgressCourseCard key={course.slug} course={course} />
            ))}
          </PageSection>
        </>
      )}

      <PageSection eyebrow="Studying offline" heading="Take the summary with you">
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.5rem' }}>
          The Learner Hub gathers each course&rsquo;s objectives, module summaries and a practical handbook into files you can save and read away from a connection.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/learning-hub" className="font-body" style={linkButtonStyle}>
            Open the Learner Hub &rarr;
          </Link>
          <Link to="/my-courses" className="font-body" style={linkButtonStyle}>
            Back to my courses &rarr;
          </Link>
        </div>
      </PageSection>

      <TamuGuideWidget />
    </PageLayout>
  );
}