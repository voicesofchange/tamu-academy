import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageMeta from '@/components/seo/PageMeta';
import LazyYouTube from '@/components/videos/LazyYouTube';

const BASE_URL = 'https://tamuacademy.org';

function VideoStructuredData({ lesson }) {
  useEffect(() => {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: lesson.title,
      description: lesson.seoDescription,
      thumbnailUrl: lesson.thumbnail,
      uploadDate: lesson.publicationDateISO,
      contentUrl: `https://www.youtube.com/watch?v=${lesson.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${lesson.videoId}`,
      publisher: { '@type': 'Organization', name: 'Tamu Academy' },
    };
    const scriptId = `video-ld-${lesson.slug}`;
    if (!document.getElementById(scriptId)) {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      el.textContent = JSON.stringify(ld);
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [lesson]);
  return null;
}

export default function VideoLessonPageTemplate({ lesson }) {
  return (
    <PageLayout>
      <PageMeta
        title={lesson.seoTitle}
        description={lesson.seoDescription}
        path={`/videos/${lesson.slug}`}
        type="video"
        image={lesson.thumbnail}
      />
      <VideoStructuredData lesson={lesson} />

      <PageHero eyebrow={lesson.label} heading={lesson.title} />

      {/* ── Watch the video lesson ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        aria-label="Watch the video lesson"
        style={{ marginBottom: '2.5rem' }}
      >
        <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
          Watch the video lesson
        </p>
        <LazyYouTube videoId={lesson.videoId} title={`Tamu Academy — ${lesson.title}`} />
        <a
          href={`https://www.youtube.com/watch?v=${lesson.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(245,239,224,0.4)', fontSize: '0.72rem', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '0.6rem', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A12A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,224,0.4)')}
        >
          <ExternalLink size={12} aria-hidden="true" />
          Watch on YouTube
        </a>
      </motion.section>

      {/* ── Read the full article ──────────────────────────────────────── */}
      <div style={{ marginBottom: '3rem' }}>
        <Link
          to={`/articles/${lesson.articleSlug}`}
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          Read the Full Article →
        </Link>
      </div>

      {/* ── Description ────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-body"
        style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '2.5rem' }}
      >
        {lesson.description}
      </motion.p>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '999px', padding: '0.2rem 0.7rem' }}>
          {lesson.category}
        </span>
        {lesson.secondaryCategories?.map((c) => (
          <span key={c} className="font-body" style={{ color: 'rgba(212,161,42,0.6)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 400, border: '1px solid rgba(212,161,42,0.16)', borderRadius: '999px', padding: '0.2rem 0.7rem' }}>
            {c}
          </span>
        ))}
      </div>

      {/* ── Back links ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/videos" className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A12A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,224,0.5)')}>
          ← All Videos
        </Link>
        <Link to={`/articles/${lesson.articleSlug}`} className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A12A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,224,0.5)')}>
          Read Article →
        </Link>
        <Link to="/resources" className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A12A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,224,0.5)')}>
          Explore Resources →
        </Link>
      </div>
    </PageLayout>
  );
}