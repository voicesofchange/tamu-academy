import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import PageBreadcrumbs from '@/components/page/PageBreadcrumbs';
import PageMeta from '@/components/seo/PageMeta';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

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
  {
    id: 'is-the-icc-biased-against-africa',
    title: 'Is the ICC Biased Against Africa?',
    description: "The ICC's Africa-heavy record is real, but the deeper bias may lie in the court's jurisdiction, membership rules, and Security Council veto.",
    category: 'Global Affairs',
    label: 'Lesson 5',
    videoId: 'S4C8P-8QJKs',
    videoUrl: 'https://www.youtube.com/embed/S4C8P-8QJKs',
    thumbnail: 'https://i.ytimg.com/vi/S4C8P-8QJKs/hqdefault.jpg',
    discussionQuestions: [],
  },
  {
    id: 'after-the-guns-go-silent',
    title: 'After the Guns Go Silent',
    description: 'Peace does not begin and end with disarmament. Durable peace requires reintegration, community ownership, truth, and repaired relationships.',
    category: 'Global Affairs',
    label: 'Lesson 6',
    videoId: 'GosyUDP_4hE',
    videoUrl: 'https://www.youtube.com/embed/GosyUDP_4hE',
    thumbnail: 'https://i.ytimg.com/vi/GosyUDP_4hE/hqdefault.jpg',
    discussionQuestions: [],
  },
  {
    id: 'climate-is-a-mental-health-crisis',
    title: 'Climate Is a Mental Health Crisis',
    description: 'Climate change is not only an environmental crisis. It is also a crisis of grief, identity, community, belonging, and mental health.',
    category: 'Mental Health',
    label: 'Lesson 7',
    videoId: 'zScIxcNwgFo',
    videoUrl: 'https://www.youtube.com/embed/zScIxcNwgFo',
    thumbnail: 'https://i.ytimg.com/vi/zScIxcNwgFo/hqdefault.jpg',
    discussionQuestions: [],
  },
];

const CATEGORIES = ['All', 'Welcome', 'Mental Health', 'Policy', 'Global Affairs'];

// ── Translatable text content ─────────────────────────────────────────────────

const CONTENT = {
  heroEyebrow: 'Tamu Academy First Lessons',
  heroHeading: 'Learning Across Cultures',
  heroSubheading: 'Sweet learning for a better world.',
  introP1: 'This introductory collection welcomes learners to Tamu Academy and presents the first lessons currently available through the platform. These videos introduce the ideas, questions, and perspectives that will shape future Tamu Academy learning.',
  introP2: "Tamu Academy's First Lessons introduce questions about wellbeing, institutions, policy, economics, and global systems. Future learning pathways will connect these videos with guided discussions, practical activities, and community-centered projects.",
  collectionEyebrow: 'First Lesson Collection',
  allVideosLabel: 'All Videos',
  topicsEyebrow: 'Browse by Topic',
  topicsHeading: 'Topics in This Collection',
  topicsIntro: 'Future Tamu Academy collections may cover additional learning areas. These are the topics currently available.',
  noLessonsText: 'No lessons in this topic yet. Check back as the series develops.',
  ctaHeading: 'Keep learning beyond the video.',
  ctaBody: 'Explore related resources, programmes, and learning areas across Tamu Academy.',
  ctaResources: 'Explore Resources →',
  ctaCourses: 'Explore Courses →',
  reflectionQuestions: 'Reflection Questions',
  watchOnYouTube: 'Watch on YouTube',
  lessons: LESSONS.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    category: l.category,
    label: l.label,
    discussionQuestions: l.discussionQuestions,
  })),
  categories: CATEGORIES,
};

// ── Inline Video Player ────────────────────────────────────────────────────────

function VideoPlayer({ lesson, c }) {
  return (
    <div style={{ width: '100%' }}>
      {/* 16:9 responsive iframe wrapper */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#12100C', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(232,184,91,0.18)' }}>
        <iframe
          key={lesson.videoId}
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          title={`Tamu Academy — ${lesson.title}`}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>

      {/* Active video info */}
      <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(232,184,91,0.3)', borderRadius: '999px', padding: '0.22rem 0.7rem' }}>
            {lesson.label}
          </span>
          <span className="font-body" style={{ color: 'rgba(232,184,91,0.65)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>
            {lesson.category}
          </span>
        </div>
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
          {lesson.title}
        </h2>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
          {lesson.description}
        </p>

        {lesson.discussionQuestions?.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.6rem' }}>
              {c.reflectionQuestions}
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {lesson.discussionQuestions.map((q, i) => (
                <li key={i} className="font-body" style={{ color: 'rgba(243,234,216,0.65)', fontSize: '0.87rem', lineHeight: 1.65, fontWeight: 300 }}>
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
          style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(243,234,216,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '0.25rem', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#e8b85b'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(243,234,216,0.45)'}
        >
          <ExternalLink size={12} />
          {c.watchOnYouTube}
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
        border: `1px solid ${isActive ? 'rgba(232,184,91,0.55)' : 'rgba(232,184,91,0.14)'}`,
        borderRadius: '4px',
        padding: '0.75rem',
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(232,184,91,0.06)' : 'rgba(243,234,216,0.015)',
        transition: 'border-color 0.2s, background-color 0.2s',
        outline: 'none',
      }}
      onFocus={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(232,184,91,0.35)'; }}
      onBlur={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(232,184,91,0.14)'; }}
    >
      {/* Thumbnail */}
      <div style={{ flexShrink: 0, width: '72px', aspectRatio: '16/9', borderRadius: '3px', overflow: 'hidden', backgroundColor: '#12100C', position: 'relative' }}>
        {lesson.thumbnail && (
          <img src={lesson.thumbnail} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isActive ? 1 : 0.7 }} />
        )}
        {isActive && (
          <div style={{ position: 'absolute', inset: 0, border: '2px solid #e8b85b', borderRadius: '3px' }} />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ color: isActive ? '#e8b85b' : 'rgba(232,184,91,0.6)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.2rem' }}>
          {lesson.label}
        </span>
        <span className="font-heading" style={{ color: isActive ? '#f8f0df' : 'rgba(243,234,216,0.75)', fontSize: '0.88rem', fontWeight: 400, lineHeight: 1.3, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {lesson.title}
        </span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div style={{ flexShrink: 0, width: '3px', height: '32px', backgroundColor: '#e8b85b', borderRadius: '2px' }} aria-hidden="true" />
      )}
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Videos() {
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const { content: c } = useTranslatedContent('videos', CONTENT);

  // Merge translated text back with non-translatable video data
  const translatedLessons = LESSONS.map((lesson, i) => ({
    ...lesson,
    ...(c.lessons?.[i] || {}),
  }));

  const activeLesson = translatedLessons[activeLessonIdx];
  const categories = c.categories || CATEGORIES;

  const filteredLessons = activeCategory === 'All'
    ? translatedLessons
    : translatedLessons.filter((l) => l.category === activeCategory);

  return (
    <PageLayout>
      <PageMeta
        title="First Lessons | Tamu Academy"
        description="Watch Tamu Academy's first publicly available learning collection — free introductory videos exploring wellbeing, institutions, public policy, economics, culture, and global systems."
        path="/videos"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageBreadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'First Lessons' }]} />

      <PageHero
        eyebrow={c.heroEyebrow}
        heading={c.heroHeading}
        subheading={c.heroSubheading}
      />

      {/* Collection description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        className="font-body"
        style={{ color: 'rgba(243,234,216,0.65)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '640px', marginBottom: '1.25rem' }}
      >
        {c.introP1}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
        className="font-body"
        style={{ color: 'rgba(243,234,216,0.52)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '640px', marginBottom: '4rem', fontStyle: 'italic' }}
      >
        {c.introP2}
      </motion.p>

      {/* ── Primary Player + Lesson Selector ──────────────────────────────── */}
      <PageSection eyebrow={c.collectionEyebrow}>
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
            <VideoPlayer lesson={activeLesson} c={c} />
          </motion.div>

          {/* Lesson selector */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
              {c.allVideosLabel}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }} role="list" aria-label="Lesson selector">
              {translatedLessons.map((lesson, i) => (
                <div key={lesson.id} role="listitem">
                  <LessonCard
                    lesson={lesson}
                    isActive={i === activeLessonIdx}
                    onSelect={() => setActiveLessonIdx(i)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* ── Browse by Topic ───────────────────────────────────────────────── */}
      <PageSection id="topics" eyebrow={c.topicsEyebrow} heading={c.topicsHeading}>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.75rem' }}>
          {c.topicsIntro}
        </p>

        {/* Category filter */}
        <div
          role="tablist"
          aria-label="Filter by topic"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="font-body"
              style={{
                background: activeCategory === cat ? 'rgba(232,184,91,0.06)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? 'rgba(232,184,91,0.6)' : 'rgba(232,184,91,0.18)'}`,
                borderRadius: '2px',
                color: activeCategory === cat ? '#e8b85b' : 'rgba(243,234,216,0.55)',
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
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.4)', fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic' }}>
            {c.noLessonsText}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {filteredLessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => { setActiveLessonIdx(translatedLessons.findIndex(l => l.id === lesson.id)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-pressed={activeLesson.id === lesson.id}
                className="tamu-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  background: 'none',
                  border: `1px solid ${activeLesson.id === lesson.id ? 'rgba(232,184,91,0.5)' : 'rgba(232,184,91,0.16)'}`,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  backgroundColor: activeLesson.id === lesson.id ? 'rgba(232,184,91,0.05)' : 'rgba(243,234,216,0.02)',
                }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                  {lesson.thumbnail && (
                    <img src={lesson.thumbnail} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  )}
                </div>
                <div style={{ padding: '0.85rem 1rem' }}>
                  <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                    {lesson.label} · {lesson.category}
                  </span>
                  <span className="font-heading" style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.3 }}>
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
          border: '1px solid rgba(232,184,91,0.22)',
          borderRadius: '4px',
          backgroundColor: 'rgba(232,184,91,0.025)',
          textAlign: 'center',
        }}
      >
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          {c.ctaHeading}
        </h2>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', margin: '0 auto 1.75rem' }}>
          {c.ctaBody}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link
            to="/resources"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#24150f', backgroundColor: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #e8b85b', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            {c.ctaResources}
          </Link>
          <Link
            to="/courses"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(232,184,91,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            {c.ctaCourses}
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}