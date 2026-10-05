import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import HubObjectives from '@/components/hub/HubObjectives';
import HubHandbook from '@/components/hub/HubHandbook';
import HubSummaries from '@/components/hub/HubSummaries';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import { LEARNER_COURSES } from '@/lib/learner-progress';

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

const COURSE_SLUGS = LEARNER_COURSES.map((course) => course.slug);

/**
 * LearningHub — the central learner's guide: what every course sets out to
 * teach, how to work through it, and a summary of each course and module that
 * can be downloaded and studied offline.
 *
 * Each of the three sections offers its own download, built from the same
 * content the page renders, so nothing here needs a separate copy to maintain.
 */
export default function LearningHub() {
  return (
    <PageLayout>
      <PageMeta
        title="Learner Hub | Tamu Academy"
        description="Course objectives, a learner's handbook, and downloadable course and module summaries for every Tamu Academy pathway."
        path="/learning-hub"
        noindex
      />

      <PageHero
        eyebrow="Learner Hub"
        heading="Everything you need, in one place"
        subheading="What each course sets out to teach, how to work through it, and a summary of every module you can save and read offline."
      />

      <PageSection eyebrow="Course objectives" heading="What each course sets out to teach">
        <HubObjectives courseSlugs={COURSE_SLUGS} />
      </PageSection>

      <PageSection eyebrow="Learner's handbook" heading="How to work through your courses" tone="tinted">
        <HubHandbook />
      </PageSection>

      <PageSection eyebrow="Course and module summaries" heading="Every course, module by module">
        <HubSummaries />
      </PageSection>

      <PageSection eyebrow="Your own progress" heading="See where you stand">
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.5rem' }}>
          My Progress shows every module you have completed and your current standing in each course, drawn from your own saved progress.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/my-progress" className="font-body" style={linkButtonStyle}>
            Open my progress &rarr;
          </Link>
          <Link to="/learners-guide" className="font-body" style={linkButtonStyle}>
            Safari ya Utu companion guide &rarr;
          </Link>
        </div>
      </PageSection>

      <TamuGuideWidget />
    </PageLayout>
  );
}