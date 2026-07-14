import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageSection from '@/components/page/PageSection';
import { NEW_LESSONS } from '@/lib/lessons-data';

/**
 * NewLessonCards — Lessons 5, 6, and 7 shown on the Videos page in
 * numerical order after the existing First Lesson Collection. Each
 * card links to its dedicated video page (/videos/[slug]).
 */
export default function NewLessonCards() {
  return (
    <PageSection eyebrow="Continue the Series" heading="Lessons 5, 6, and 7">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {NEW_LESSONS.map((lesson, i) => (
          <motion.div
            key={lesson.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.06 }}
          >
            <Link
              to={`/videos/${lesson.slug}`}
              className="tamu-card"
              style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', border: '1px solid rgba(212,161,42,0.16)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(245,239,224,0.02)' }}
            >
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                <img src={lesson.thumbnail} alt="" aria-hidden="true" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '0.85rem 1rem' }}>
                <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                  {lesson.label} · {lesson.category}
                </span>
                <span className="font-heading" style={{ color: '#F5EFE0', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.3, display: 'block', marginBottom: '0.5rem' }}>
                  {lesson.title}
                </span>
                <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Watch Lesson →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}