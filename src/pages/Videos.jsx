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

const LESSONS = [
  {
    id: 'welcome-to-tamu-academy',
    title: 'Welcome to Tamu Academy',
    description: 'An introduction to Tamu Academy — what we are, why we exist, and what sweet learning for a better world means in practice.',
    category: 'Welcome',
    episode: null,
    featured: true,
    comingSoon: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/qqIDNwa-h0s',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/84f592a69_Lesson5Thumbnail.png',
    discussionQuestions: [],
  },
  {
    id: 'real-cost-of-always-achieving',
    title: 'The Real Cost of Always Achieving',
    description: 'Achievement culture tells us to keep pushing — but at what price? This lesson examines the mental health toll of relentless performance expectations and what rest, boundaries, and wellbeing really look like.',
    category: 'Mental Health',
    episode: 1,
    featured: false,
    comingSoon: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/DM8-hCO78Os',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/32b0fb286_Lesson1Thumbnail.png',
    discussionQuestions: [
      'When does ambition become harmful? Where is the line between drive and burnout?',
      'Who benefits from a culture that prizes constant achievement — and who pays the cost?',
      'What would it look like to measure success differently in your community or school?',
    ],
  },
  {
    id: 'why-therapy-isnt-enough',
    title: "Why Therapy Isn't Enough",
    description: 'Therapy is valuable — but it cannot fix structural problems alone. This lesson explores the limits of individual mental health solutions and the systemic changes needed to support wellbeing at a community level.',
    category: 'Mental Health',
    episode: 2,
    featured: false,
    comingSoon: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/xLKNmgeX7m0',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/646dd6535_Lesson2Thumbnail.png',
    discussionQuestions: [
      'What barriers prevent people in your community from accessing mental health support?',
      'What would a community-level approach to mental health look like?',
      'How do race, class, and culture shape who benefits from existing mental health systems?',
    ],
  },
  {
    id: 'can-policy-make-us-happier',
    title: 'Can Policy Make Us Happier?',
    description: 'Some governments now measure national wellbeing alongside GDP. This lesson asks whether policy can be designed to improve quality of life — and what trade-offs that involves.',
    category: 'Policy',
    episode: 3,
    featured: false,
    comingSoon: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/P9dXMOA9rO8',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/946264a83_Lesson3Thumbnail.png',
    discussionQuestions: [
      'Should governments be responsible for citizens\' happiness? Why or why not?',
      'What policies in your country seem designed around wellbeing — and do they work?',
      'Can happiness be measured? What gets left out when governments try?',
    ],
  },
  {
    id: 'who-controls-the-global-economy',
    title: 'Who Controls the Global Economy?',
    description: 'From the IMF to multinational corporations, power over the global economy is concentrated in ways most people never see. This lesson maps who makes the rules — and who those rules serve.',
    category: 'Global Affairs',
    episode: 4,
    featured: false,
    comingSoon: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/Io9mZLfZ6yw',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/44354d01f_Lesson4Thumbnailpng.png',
    discussionQuestions: [
      'Who were the key decision-makers in the global economy before you were born — and are they still?',
      'How does economic power affect political power between nations?',
      'What would a more equitable global economic system look like, and who would need to give something up?',
    ],
  },
];

const CATEGORIES = [
  'All',
  'Welcome',
  'Mental Health',
  'Policy',
  'Global Affairs',
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
        eyebrow="Video Series · Season One"
        heading="Welcome to Tamu Academy: Learning Across Cultures"
        subheading="AfroCentric lessons on the mind, power, and the world — sweet learning for a better world."
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



      {/* ── Featured Lesson ───────────────────────────────────────────────── */}
      {featured && (
        <PageSection eyebrow="Featured">
          <FeaturedLesson lesson={featured} onSelect={setSelectedLesson} />
        </PageSection>
      )}

      {/* ── Lesson Library ────────────────────────────────────────────────── */}
      <PageSection id="lessons" eyebrow="Season One" heading="All Episodes">

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