import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import PageMeta from '@/components/seo/PageMeta';

// ── First Lesson Collection ────────────────────────────────────────────────────
// Videos presented in prescribed order. videoUrl uses YouTube Privacy-Enhanced Mode.

const LESSONS = [
  {
    id: 'welcome-to-tamu-academy',
    title: 'Welcome to Tamu Academy: Learning Across Cultures',
    description: 'An introduction to Tamu Academy — what we are, why we exist, and what sweet learning for a better world means in practice.',
    category: 'Welcome',
    label: 'Welcome',
    videoId: 'qqIDNwa-h0s',
    videoUrl: 'https://www.youtube.com/embed/qqIDNwa-h0s',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/84f592a69_Lesson5Thumbnail.png',
    discussionQuestions: [],
  },
  {
    id: 'real-cost-of-always-achieving',
    title: 'The Real Cost of Always Achieving',
    description: 'Achievement culture tells us to keep pushing — but at what price? This lesson examines the mental health toll of relentless performance expectations and what rest, boundaries, and wellbeing really look like.',
    category: 'Mental Health',
    label: 'Lesson 1',
    videoId: 'DM8-hCO78Os',
    videoUrl: 'https://www.youtube.com/embed/DM8-hCO78Os',
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
    label: 'Lesson 2',
    videoId: 'xLKNmgeX7m0',
    videoUrl: 'https://www.youtube.com/embed/xLKNmgeX7m0',
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
    label: 'Lesson 3',
    videoId: 'P9dXMOA9rO8',
    videoUrl: 'https://www.youtube.com/embed/P9dXMOA9rO8',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/946264a83_Lesson3Thumbnail.png',
    discussionQuestions: [
      "Should governments be responsible for citizens' happiness? Why or why not?",
      'What policies in your country seem designed around wellbeing — and do they work?',
      'Can happiness be measured? What gets left out when governments try?',
    ],
  },
  {
    id: 'who-controls-the-global-economy',
    title: 'Who Controls the Global Economy?',
    description: 'From the IMF to multinational corporations, power over the global economy is concentrated in ways most people never see. This lesson maps who makes the rules — and who those rules serve.',
    category: 'Global Affairs',
    label: 'Lesson 4',
    videoId: 'Io9mZLfZ6yw',
    videoUrl: 'https://www.youtube.com/embed/Io9mZLfZ6yw',
    thumbnail: 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/44354d01f_Lesson4Thumbnailpng.png',
    discussionQuestions: [
      'Who were the key decision-makers in the global economy before you were born — and are they still?',
      'How does economic power affect political power between nations?',
      'What would a more equitable global economic system look like, and who would need to give something up?',
    ],
  },
];

const CATEGORIES = ['All', 'Welcome', 'Mental Health', 'Policy', 'Global Affairs'];

// ── Inline Video Player ────────────────────────────────────────────────────────

function VideoPlayer({ lesson }) {
  return (
    <div style={{ width: '100%' }}>
      {/* 16:9 responsive iframe wrapper */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#12100C', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,161,42,0.18)' }}>
        <iframe
          key={lesson.videoId}
          src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0&playsinline=1&origin=https%3A%2F%2Ftamuacademy.org`}
          title={`Tamu Academy — ${lesson.title}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>

      {/* Active video info */}
      <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '999px', padding: '0.22rem 0.7rem' }}>
            {lesson.label}
          </span>
          <span className="font-body" style={{ color: 'rgba(212,161,42,0.65)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>
            {lesson.category}
          </span>
        </div>
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
          {lesson.title}
        </h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
          {lesson.description}
        </p>

        {lesson.discussionQuestions?.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.6rem' }}>
              Reflection Questions
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {lesson.discussionQuestions.map((q, i) => (
                <li key={i} className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.87rem', lineHeight: 1.65, fontWeight: 300 }}>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={`https://www.youtube.com/watch?v=${lesson.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body"
          style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(245,239,224,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '0.25rem', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.45)'}
        >
          <ExternalLink size={12} />
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}

// ── Lesson Selector Card ───────────────────────────────────────────────────────

function LessonCard({ lesson, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(lesson)}
      aria-pressed={isActive}
      className="font-body"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: `1px solid ${isActive ? 'rgba(212,161,42,0.55)' : 'rgba(212,161,42,0.14)'}`,
        borderRadius: '4px',
        padding: '0.75rem',
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(212,161,42,0.06)' : 'rgba(245,239,224,0.015)',
        transition: 'border-color 0.2s, background-color 0.2s',
        outline: 'none',
      }}
      onFocus={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(212,161,42,0.35)'; }}
      onBlur={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(212,161,42,0.14)'; }}
    >
      {/* Thumbnail */}
      <div style={{ flexShrink: 0, width: '72px', aspectRatio: '16/9', borderRadius: '3px', overflow: 'hidden', backgroundColor: '#12100C', position: 'relative' }}>
        {lesson.thumbnail && (
          <img src={lesson.thumbnail} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isActive ? 1 : 0.7 }} />
        )}
        {isActive && (
          <div style={{ position: 'absolute', inset: 0, border: '2px solid #D4A12A', borderRadius: '3px' }} />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ color: isActive ? '#D4A12A' : 'rgba(212,161,42,0.6)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.2rem' }}>
          {lesson.label}
        </span>
        <span className="font-heading" style={{ color: isActive ? '#F5EFE0' : 'rgba(245,239,224,0.75)', fontSize: '0.88rem', fontWeight: 400, lineHeight: 1.3, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {lesson.title}
        </span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div style={{ flexShrink: 0, width: '3px', height: '32px', backgroundColor: '#D4A12A', borderRadius: '2px' }} aria-hidden="true" />
      )}
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Videos() {
  const [activeLesson, setActiveLesson] = useState(LESSONS[0]);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLessons = activeCategory === 'All'
    ? LESSONS
    : LESSONS.filter((l) => l.category === activeCategory);

  return (
    <PageLayout>
      <PageMeta
        title="First Lessons — Tamu Academy"
        description="Watch the first available Tamu Academy lessons: introductory videos on the mind, policy, and global affairs designed to make important ideas accessible and connected to the world around us."
        path="/videos"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Tamu Academy First Lessons"
        heading="Learning Across Cultures"
        subheading="Sweet learning for a better world."
      />

      {/* Collection description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        className="font-body"
        style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '640px', marginBottom: '4rem' }}
      >
        This introductory collection welcomes learners to Tamu Academy and presents the first lessons currently available through the platform. These videos introduce the ideas, questions, and perspectives that will shape future Tamu Academy learning.
      </motion.p>

      {/* ── Primary Player + Lesson Selector ──────────────────────────────── */}
      <PageSection eyebrow="First Lesson Collection">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '2rem',
          }}
        >
          {/* Player */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <VideoPlayer lesson={activeLesson} />
          </motion.div>

          {/* Lesson selector */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
              All Videos
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }} role="list" aria-label="Lesson selector">
              {LESSONS.map((lesson) => (
                <div key={lesson.id} role="listitem">
                  <LessonCard
                    lesson={lesson}
                    isActive={activeLesson.id === lesson.id}
                    onSelect={setActiveLesson}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* ── Browse by Topic ───────────────────────────────────────────────── */}
      <PageSection id="topics" eyebrow="Browse by Topic" heading="Topics in This Collection">
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.75rem' }}>
          Future Tamu Academy collections may cover additional learning areas. These are the topics currently available.
        </p>

        {/* Category filter */}
        <div
          role="tablist"
          aria-label="Filter by topic"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="font-body"
              style={{
                background: activeCategory === cat ? 'rgba(212,161,42,0.06)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? 'rgba(212,161,42,0.6)' : 'rgba(212,161,42,0.18)'}`,
                borderRadius: '2px',
                color: activeCategory === cat ? '#D4A12A' : 'rgba(245,239,224,0.55)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? 500 : 400,
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {filteredLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => { setActiveLesson(lesson); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-pressed={activeLesson.id === lesson.id}
                className="tamu-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  background: 'none',
                  border: `1px solid ${activeLesson.id === lesson.id ? 'rgba(212,161,42,0.5)' : 'rgba(212,161,42,0.16)'}`,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  backgroundColor: activeLesson.id === lesson.id ? 'rgba(212,161,42,0.05)' : 'rgba(245,239,224,0.02)',
                }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                  {lesson.thumbnail && (
                    <img src={lesson.thumbnail} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  )}
                </div>
                <div style={{ padding: '0.85rem 1rem' }}>
                  <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                    {lesson.label} · {lesson.category}
                  </span>
                  <span className="font-heading" style={{ color: '#F5EFE0', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.3 }}>
                    {lesson.title}
                  </span>
                </div>
              </button>
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
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Explore Resources →
          </Link>
          <Link
            to="/programmes"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Explore Programmes →
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}