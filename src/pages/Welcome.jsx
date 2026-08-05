import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, LayoutDashboard, PlayCircle, Award } from 'lucide-react';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

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

const stepCardStyle = {
  padding: '1.75rem 1.75rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};

const iconWrapStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '2.75rem', height: '2.75rem', borderRadius: '50%',
  backgroundColor: 'rgba(212,161,42,0.1)', border: '1px solid rgba(212,161,42,0.3)',
  marginBottom: '1rem',
};

const steps = [
  {
    icon: LayoutDashboard,
    eyebrow: 'Step 1',
    title: 'Open My Courses',
    body: 'Your personal dashboard shows every course you are enrolled in, your progress through each module, and a quick way to pick up exactly where you left off.',
  },
  {
    icon: BookOpen,
    eyebrow: 'Step 2',
    title: 'Browse and enroll',
    body: 'Visit the Courses page to explore what is available. When you open a course, you will see its full module map and learning outcomes before you begin.',
  },
  {
    icon: PlayCircle,
    eyebrow: 'Step 3',
    title: 'Start your first lesson',
    body: 'Each module begins with a core video or reading, followed by a short lesson, an applied activity, a private reflection, and a knowledge check. Work through each section in order.',
  },
  {
    icon: Award,
    eyebrow: 'Step 4',
    title: 'Track progress and earn certificates',
    body: 'Your progress saves automatically as you complete each section. Finish every module in a course to become eligible for a certificate of completion.',
  },
];

export default function Welcome() {
  return (
    <PageLayout>
      <PageMeta
        title="Welcome to Tamu Academy"
        description="A quick guide to navigating your courses and starting your first lesson."
        path="/welcome"
      />
      <PageHero
        eyebrow="Welcome"
        heading="You're ready to begin"
        subheading="Here is a quick guide to finding your way around Tamu Academy and starting your first lesson."
      />

      <PageSection eyebrow="Getting Started" heading="How Tamu Academy works">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2rem' }}>
          Everything you need is built around four simple steps. Take a moment to read through them, then head to your dashboard to begin.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 }}
                style={stepCardStyle}
              >
                <div style={iconWrapStyle}>
                  <Icon size={20} color="#D4A12A" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                  {step.eyebrow}
                </span>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
                  {step.title}
                </h3>
                <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </PageSection>

      <PageSection eyebrow="Ready When You Are" heading="Start your learning journey">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          You can head straight to your dashboard to see your enrolled courses, or browse the full catalogue to find your first one.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/my-courses" className="font-body" style={primaryButtonStyle}>
            Go to My Courses &rarr;
          </Link>
          <Link to="/courses" className="font-body" style={linkButtonStyle}>
            Browse Courses &rarr;
          </Link>
        </div>
      </PageSection>
    </PageLayout>
  );
}