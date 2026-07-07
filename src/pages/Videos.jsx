import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import PageMeta from '@/components/seo/PageMeta';
import VideoCard from '@/components/videos/VideoCard';
import VideoModal from '@/components/videos/VideoModal';
import FeaturedLesson from '@/components/videos/FeaturedLesson';

// ── Lesson Library ────────────────────────────────────────────────────────────
// To add a real video, set comingSoon: false and provide a videoUrl
// (YouTube privacy-enhanced: https://www.youtube-nocookie.com/embed/VIDEO_ID)
// and optionally a thumbnail URL.

const LESSONS = [
  {
    id: 'what-is-public-policy',
    title: 'What is Public Policy — and Why Does It Affect You?',
    description: 'An introduction to how governments, institutions, and communities make decisions that shape daily life — from school meals to climate agreements.',
    category: 'Public Policy and Governance',
    duration: '14 min',
    featured: true,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'What is one policy that has directly affected your community? How was it made?',
      'Who should have a voice in public policy decisions, and why does representation matter?',
      'Can you think of a situation where a policy intended to help actually caused harm?',
    ],
  },
  {
    id: 'language-and-power',
    title: 'Language, Power, and Who Gets to Be Heard',
    description: 'Why does language shape power? This lesson explores how dominant languages, translation, and communication norms include or exclude people from civic life.',
    category: 'Writing, Storytelling, and Communication',
    duration: '11 min',
    featured: false,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'How does the language a meeting is held in affect who participates?',
      'Think of a time you felt unheard. Was language part of that experience?',
      'What would more inclusive communication look like in your school or community?',
    ],
  },
  {
    id: 'climate-justice',
    title: 'Climate Change and Climate Justice: What Is the Difference?',
    description: 'Climate change affects everyone, but not equally. This lesson examines why frontline communities bear disproportionate burdens — and what just solutions might look like.',
    category: 'Climate and Sustainability',
    duration: '16 min',
    featured: false,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'Which communities in your region are most exposed to climate impacts? What resources do they have?',
      'What does it mean for a climate solution to be "just"?',
    ],
  },
  {
    id: 'digital-identity',
    title: 'Who Are You Online? Identity, Data, and Digital Citizenship',
    description: 'From social media profiles to surveillance systems, this lesson unpacks how digital identity is constructed, collected, and used — and what agency you have over yours.',
    category: 'Technology and Digital Citizenship',
    duration: '13 min',
    featured: false,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'What does your digital footprint reveal about you that you may not have intended to share?',
      'Who benefits most from the personal data people generate online?',
    ],
  },
  {
    id: 'economics-of-inequality',
    title: 'Why Is Inequality Growing — and What Can Be Done?',
    description: 'A clear-eyed introduction to economic inequality: what drives it, how it is measured, and the range of policy responses communities and governments can consider.',
    category: 'Economics and Opportunity',
    duration: '15 min',
    featured: false,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'What is the difference between wealth inequality and income inequality?',
      'Does economic inequality affect your ability to participate in civic life? How?',
    ],
  },
  {
    id: 'intercultural-dialogue',
    title: 'The Art of Intercultural Dialogue',
    description: 'What makes genuine dialogue across cultural differences possible — and what gets in the way? This lesson explores listening, assumption, and the conditions for understanding.',
    category: 'Intercultural Leadership and Peacebuilding',
    duration: '12 min',
    featured: false,
    comingSoon: true,
    videoUrl: null,
    thumbnail: null,
    discussionQuestions: [
      'Recall a conversation across cultural or experiential difference. What made it go well or poorly?',
      'What assumptions do we carry into conversations without realising it?',
    ],
  },
];

const CATEGORIES = [
  'All',
  'Technology and Digital Citizenship',
  'Intercultural Leadership and Peacebuilding',
  'Public Policy and Governance',
  'Economics and Opportunity',
  'Climate and Sustainability',
  'Writing, Storytelling, and Communication',
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

export default function Videos() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = LESSONS.find((l) => l.featured);
  const filteredLessons = LESSONS.filter((l) => {
    if (l.featured) return false; // featured shown separately
    return activeCategory === 'All' || l.category === activeCategory;
  });

  return (
    <PageLayout>
      <PageMeta
        title="Tamu Academy Video Series | Ideas, Conversations and Learning"
        description="Explore the developing Tamu Academy Video Series — accessible lessons on public policy, culture, leadership, sustainability, technology, and communication."
        path="/videos"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Video Series"
        heading="Ideas worth understanding. Conversations worth continuing."
        subheading="Accessible lessons exploring public policy, culture, leadership, sustainability, technology, and the forces shaping communities around the world."
      />

      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '5rem' }}
      >
        <a
          href="#lessons"
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#1A130E', backgroundColor: '#D4A12A',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          Browse Lessons
        </a>
        <Link
          to="/resources"
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#D4A12A',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          Explore Learning Resources →
        </Link>
      </motion.div>

      {/* ── Development Notice ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '1rem 1.4rem',
          border: '1px solid rgba(212,161,42,0.15)',
          borderRadius: '4px',
          backgroundColor: 'rgba(245,239,224,0.015)',
          marginBottom: '3.5rem',
        }}
      >
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          The Tamu Academy Video Series is currently in development. The lessons below preview topics that will be covered. Videos will be added as they are produced.
        </p>
      </motion.div>

      {/* ── Featured Lesson ───────────────────────────────────────────────── */}
      {featured && (
        <PageSection eyebrow="Featured">
          <FeaturedLesson lesson={featured} onSelect={setSelectedLesson} />
        </PageSection>
      )}

      {/* ── Lesson Library ────────────────────────────────────────────────── */}
      <PageSection id="lessons" eyebrow="All Lessons" heading="Browse the series">

        {/* Category filter */}
        <div
          role="tablist"
          aria-label="Filter by topic"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="font-body"
              style={{
                background: 'none',
                border: `1px solid ${activeCategory === cat ? 'rgba(212,161,42,0.6)' : 'rgba(212,161,42,0.18)'}`,
                borderRadius: '2px',
                color: activeCategory === cat ? '#D4A12A' : 'rgba(245,239,224,0.55)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? 500 : 400,
                backgroundColor: activeCategory === cat ? 'rgba(212,161,42,0.06)' : 'transparent',
                transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredLessons.length === 0 ? (
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.4)', fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic' }}>
            No lessons in this topic yet. Check back as the series develops.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
            {filteredLessons.map((lesson, i) => (
              <VideoCard key={lesson.id} lesson={lesson} index={i} onSelect={setSelectedLesson} />
            ))}
          </div>
        )}
      </PageSection>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          marginBottom: '2rem',
          padding: '2.5rem',
          border: '1px solid rgba(212,161,42,0.22)',
          borderRadius: '4px',
          backgroundColor: 'rgba(212,161,42,0.025)',
          textAlign: 'center',
        }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          Keep learning beyond the video.
        </h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', margin: '0 auto 1.75rem' }}>
          Explore related resources, programmes, and learning areas across Tamu Academy.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link
            to="/resources"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#1A130E', backgroundColor: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem',
            }}
          >
            Explore Resources →
          </Link>
          <Link
            to="/programmes"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem',
            }}
          >
            Explore Programmes →
          </Link>
        </div>
      </motion.div>

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {selectedLesson && (
        <VideoModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
      )}
    </PageLayout>
  );
}