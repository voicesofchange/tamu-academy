import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import TrackCard from '@/components/courses/TrackCard';
import { ECONOMICS_DEVELOPMENT_TRACKS } from '@/lib/economics-tracks';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const COURSE_AREAS = [
  {
    id: 'mind-and-wellbeing',
    number: '01',
    area: 'Mind and Wellbeing',
    courses: [
      {
        title: 'Mental Health, Community and Culture',
        status: 'In Development',
        description:
          'A course examining mental health, stress, culture, family expectations, community support, structural conditions, and pathways to professional care.',
      },
    ],
    extra: null,
  },
  {
    id: 'economics-and-development',
    number: '02',
    area: 'Economics and Development',
    courses: [
      {
        title: 'Understanding African Economies and the Global System',
        status: 'In Development',
        description:
          'A course introducing economic systems, development, inequality, trade, debt, institutions, and Africa\'s position within the global economy.',
      },
    ],
    extra: null,
  },
  {
    id: 'ai-technology-and-digital-futures',
    number: '03',
    area: 'AI, Technology and Digital Futures',
    courses: [
      {
        title: 'AI Literacy for African and Diaspora Leaders',
        status: 'In Development',
        description:
          'A practical and critical introduction to generative AI, responsible use, bias, digital citizenship, work, governance, and technological change.',
      },
    ],
    extra: null,
  },
  {
    id: 'public-policy-and-governance',
    number: '04',
    area: 'Public Policy and Governance',
    courses: [
      {
        title: 'Power, Policy and the Public Good',
        status: 'In Development',
        description:
          'A course exploring public policy, institutions, implementation, accountability, community participation, policy analysis, and writing for public decision-making.',
      },
    ],
    extra: {
      eyebrow: 'Proposed First Pilot',
      title: 'Ubuntu and the Public Good',
      badge: 'Proposed Pilot Programme',
      content:
        'A four-week applied learning experience examining how values, institutions, economics, and community knowledge shape public decisions. Participants develop a one-page community-centered policy memo as their final project.',
      details: [
        ['Intended audience', 'Young adults ages 18–30'],
        ['Proposed format', 'Four weekly facilitated sessions'],
        ['Proposed delivery', 'Online or partner-hosted'],
        ['Final learner product', 'One-page policy memo'],
        ['Current status', 'Under development — available for partnership discussion'],
      ],
      ctaLabel: 'Discuss a Pilot Partnership →',
      ctaTo: '/contact?type=partnership&programme=ubuntu-and-the-public-good',
    },
  },
  {
    id: 'waiyaki-wa-hinga',
    number: '05',
    area: 'Waiyaki wa Hinga Heritage and Leadership Collection',
    heritage: true,
    courses: [
      {
        title: 'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory',
        status: 'In Development',
        description:
          'A research- and memory-based course exploring Waiyaki wa Hinga, colonial history, leadership, resistance, land, governance, oral history, and contemporary significance.',
      },
    ],
    extra: null,
  },
];

const COURSE_COMPONENTS = [
  'Recorded expert-led lessons',
  'Written lesson companions',
  'Transcripts and captions',
  'Reflection questions',
  'Knowledge checks',
  'Downloadable activities',
  'Course workbooks',
  'Practical assignments',
  'Facilitator materials for institutions',
];

export default function Courses() {
  return (
    <PageLayout>
      <PageMeta
        title="Courses | Tamu Academy"
        description="Explore Tamu Academy's developing courses in mental health, economics, artificial intelligence, public policy, and the Waiyaki wa Hinga Heritage and Leadership Collection."
        path="/courses"
      />
      <div id="learning-areas" style={{ scrollMarginTop: '90px' }} aria-hidden="true" />
      <PageHero
        eyebrow="Courses"
        heading="Courses Designed for Learning, Reflection and Application"
        subheading="Tamu Academy is developing expert-led online courses with subject-matter experts, educators, researchers, and knowledge holders. Each course is designed to combine recorded lessons, written learning companions, reflection, practical activities, and resources for continued learning."
      />

      {/* Course Areas */}
      {COURSE_AREAS.map((area, ai) => (
        <PageSection
          key={area.id}
          id={area.id}
          eyebrow={area.heritage ? 'Heritage and Leadership Collection' : `Learning Area ${area.number}`}
          heading={area.area}
        >
          {area.heritage && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'rgba(212,161,42,0.8)' }}>
              A distinctive Tamu Academy collection bringing together research, oral history, and African-centered interpretation.
            </p>
          )}

          {area.courses.map((course) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginBottom: '1.25rem' }}
            >
              <div style={{ marginBottom: '0.85rem' }}>
                <StatusBadge label={course.status} />
              </div>
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' }}>
                {course.title}
              </h3>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                {course.description}
              </p>
            </motion.div>
          ))}

          {area.id === 'economics-and-development' && (
            <>
              <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginTop: '1.75rem', marginBottom: '1rem' }}>
                Competency-Based Learning Tracks
              </span>
              {ECONOMICS_DEVELOPMENT_TRACKS.map((track) => (
                <div key={track.slug} style={{ marginBottom: '1.25rem' }}>
                  <TrackCard track={track} />
                </div>
              ))}
            </>
          )}

          {area.extra && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.01)', marginTop: '1rem' }}
            >
              <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
                {area.extra.eyebrow}
              </span>
              <div style={{ marginBottom: '0.85rem' }}>
                <StatusBadge label={area.extra.badge} />
              </div>
              <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' }}>
                {area.extra.title}
              </h4>
              <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
                {area.extra.content}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {area.extra.details.map(([label, value]) => (
                  <div key={label} style={{ padding: '0.9rem 1.1rem', border: '1px solid rgba(212,161,42,0.12)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
                    <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{label}</span>
                    <span className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>{value}</span>
                  </div>
                ))}
              </div>
              <Link
                to={area.extra.ctaTo}
                style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.55rem 1.1rem' }}
              >
                {area.extra.ctaLabel}
              </Link>
            </motion.div>
          )}
        </PageSection>
      ))}

      {/* Course Product Model */}
      <PageSection eyebrow="Course Design" heading="What a Complete Tamu Academy Course May Include">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Complete Tamu Academy courses are still under development. Final course packages may include:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {COURSE_COMPONENTS.map((c) => (
            <span key={c} className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.83rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '2px', padding: '0.35rem 0.85rem', fontWeight: 400 }}>{c}</span>
          ))}
        </div>
      </PageSection>

      {/* Open Learning */}
      <PageSection eyebrow="Open Learning" heading="Begin with Free Open Learning">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          Begin with freely available Tamu Academy videos and articles exploring wellbeing, public policy, economics, institutions, culture, and global systems.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            to="/videos"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Watch Videos →
          </Link>
          <Link
            to="/articles"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Read Articles →
          </Link>
        </div>
      </PageSection>

      {/* Institutional */}
      <PageSection eyebrow="Institutions" heading="Learning for Institutions">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          Tamu Academy is developing course packages for universities, youth organizations, nonprofits, public institutions, and community programmes.
        </p>
        <Link
          to="/contact?inquiry=university-or-institutional-partnership"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          Discuss a Partnership →
        </Link>
      </PageSection>
    </PageLayout>
  );
}