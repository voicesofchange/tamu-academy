import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleCard from '@/components/courses/ModuleCard';
import { MENTAL_HEALTH_COURSE, MENTAL_HEALTH_LEARNING_AREA } from '@/lib/mental-health-tracks';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Course overview page for the Mental Health pillar course, "Mental Health, Community
 * and Culture." Reuses the
 * existing Tamu Academy design system (PageLayout, PageHero, PageSection,
 * StatusBadge, ModuleCard, fonts, colors). Separate from the economics
 * course overview (UnderstandingAfricanEconomies) — uses its own metadata
 * store, MessageBuilder shell, and progress placeholder; does not import
 * from or modify the existing economics templates.
 *
 * Phase 1: course shell only. No lesson content, no enrollment button, no
 * quiz, no applied activity forms. Module cards link to their module
 * routes, which currently show an "In Development" (Module 1) or "Coming
 * Soon" (Modules 2–7) shell state.
 */
export default function UbuntuMentalHealth() {
  const course = MENTAL_HEALTH_COURSE;
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthCourseCompletion', {
          courseSlug: course.slug,
        });
        if (cancelled) return;
        if (res && res.data) {
          setProgress(res.data);
        }
      } catch (err) {
        // Non-authenticated or error — progress simply stays null
      } finally {
        if (!cancelled) setProgressLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [course.slug]);

  const courseFacts = [
    ['Learning area', course.learningArea],
    ['Level', course.level],
    ['Format', course.format],
    ['Modules', String(course.modulesCount)],
    ['Estimated completion', course.estimatedCompletion],
    ['Certificate', course.certificate],
    ['Access', course.access],
    ['Status', course.status],
  ];

  return (
    <PageLayout>
      <PageMeta
        title={`${course.title} | Tamu Academy`}
        description={course.description}
        path={`/courses/${course.slug}`}
        noindex
      />

      <PageHero eyebrow="Course" heading={course.title} subheading={course.subtitle} />

      <PageSection eyebrow="Status" heading="Course Status">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <StatusBadge label={course.status} />
          <StatusBadge label={course.access} />
        </div>
        <p className="font-body" style={{ ...bodyText, margin: 0, maxWidth: '640px' }}>
          This course is currently in development. Learning materials are being written, recorded, and
          reviewed. Module pages, enrollment, progress tracking, knowledge checks, and certificates are
          not yet active. Once Module 1 is ready, it will be released in a controlled pilot.
        </p>
      </PageSection>

      <PageSection eyebrow="Overview" heading="Course Description">
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

      <PageSection eyebrow="Learning Outcomes" heading="Competencies You Will Develop">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
          {course.learningOutcomes.map((outcome, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{outcome}</li>
          ))}
        </ol>
      </PageSection>

      <PageSection eyebrow="Learning Path" heading="The Path Through This Course">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          The course follows a seven-module linear sequence, building from relational foundations through structural analysis, comparative approaches, program evaluation, and a final applied initiative.
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

      <PageSection eyebrow="Modules" heading="Course Modules">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          Seven connected modules build the framework. Module 1 is in development; Modules 2 through 7 will open in later phases once their learning materials are ready.
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

      <PageSection eyebrow="Applied Milestone" heading={course.milestone.title}>
        <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={course.milestone.status} />
          </div>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
            {course.milestone.description}
          </p>
        </div>
      </PageSection>

      {/* Learner progress — shows real data when available, placeholder otherwise */}
      <PageSection eyebrow="Your Progress" heading="Learner Progress">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to={`/courses/${course.slug}/insights`} className="font-body" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#D4A12A', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(212,161,42,0.35)',
            borderRadius: '2px', padding: '0.55rem 1.2rem',
          }}>
            View Detailed Insights &rarr;
          </Link>
        </div>
        {progressLoading ? (
          <div style={{ padding: '1.5rem 1.75rem', border: '1px dashed rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
            <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
              Loading your progress...
            </p>
          </div>
        ) : progress ? (() => {
          const completedCount = progress.completedCount || 0;
          const totalModules = progress.totalModules || 7;
          const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
          const firstIncomplete = progress.incompleteModules && progress.incompleteModules.length > 0
            ? progress.incompleteModules[0]
            : null;
          const resumeTarget = firstIncomplete
            ? `/courses/${course.slug}/${firstIncomplete.route}`
            : `/courses/${course.slug}/completion`;
          const resumeLabel = firstIncomplete
            ? `Resume at ${firstIncomplete.number}`
            : 'Review Course Completion';

          return (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                  <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
                    Overall progress
                  </span>
                  <span className="font-body" style={{ color: '#F5EFE0', fontSize: '1rem', fontWeight: 500 }}>
                    {completedCount} of {totalModules} modules
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={progressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Course completion progress"
                  style={{ width: '100%', height: '6px', backgroundColor: 'rgba(245,239,224,0.08)', borderRadius: '3px', overflow: 'hidden' }}
                >
                  <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#D4A12A', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <Link to={resumeTarget} className="font-body" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  color: '#1A130E', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                  fontWeight: 600, textDecoration: 'none', border: 'none', borderRadius: '2px',
                  padding: '0.65rem 1.3rem', backgroundColor: '#D4A12A',
                }}>
                  {resumeLabel} &rarr;
                </Link>
                {progress.certificateEligible && (
                  <Link to={`/courses/${course.slug}/certificate`} className="font-body" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    color: '#D4A12A', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                    fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(212,161,42,0.5)',
                    borderRadius: '2px', padding: '0.65rem 1.3rem',
                  }}>
                    View Certificate &rarr;
                  </Link>
                )}
              </div>

              {progress.certificateEligible ? (
                <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)' }}>
                  <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                    You have completed all seven modules. Your certificate of completion is available.
                  </p>
                </div>
              ) : progress.incompleteModules && progress.incompleteModules.length > 0 ? (
                <div style={{ padding: '1.25rem 1.5rem', border: '1px dashed rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
                  <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem', fontSize: '0.88rem' }}>
                    Complete all seven modules to earn your certificate of completion.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {progress.incompleteModules.map((m) => (
                      <Link key={m.route} to={`/courses/${course.slug}/${m.route}`} className="font-body" style={{
                        color: 'rgba(212,161,42,0.7)', fontSize: '0.72rem', letterSpacing: '0.04em',
                        textDecoration: 'none', border: '1px solid rgba(212,161,42,0.25)',
                        borderRadius: '2px', padding: '0.4rem 0.8rem',
                      }}>
                        {m.number} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1.25rem 1.5rem', border: '1px dashed rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
                  <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
                    Enrollment is not yet open. Once the course launches, your progress across modules will appear here.
                  </p>
                </div>
              )}
              <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', margin: '0.75rem 0 0' }}>
                No personal reflections, activity responses, or Care Map content are stored in the platform.
              </p>
            </div>
          );
        })() : (
          <div style={{ padding: '1.5rem 1.75rem', border: '1px dashed rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
            <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
              Enrollment is not yet open. Once the course launches, your position in the course, completed modules, and knowledge-check results will appear here. No personal reflections or Care Map responses are stored in the platform.
            </p>
          </div>
        )}
      </PageSection>

      {/* Concise educational disclaimer (per requirement #2) */}
      <PageSection eyebrow="Safety" heading="Educational Disclaimer">
        <div style={{ padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>
            This course is an educational resource, not clinical care, counseling, or a crisis intervention. It does not provide diagnosis or treatment. If you or someone you know is in distress, contact a qualified professional or emergency service in your country or institution. Personal reflections and the Community of Care Map remain private; learners may complete them privately, offline, or through the fictional alternative provided.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}