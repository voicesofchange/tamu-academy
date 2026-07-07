import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedLesson({ lesson, onSelect }) {
  if (!lesson) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        padding: '2.5rem',
        border: '1px solid rgba(212,161,42,0.28)',
        borderRadius: '4px',
        backgroundColor: 'rgba(212,161,42,0.025)',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      {/* Thumbnail / player area */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Play featured lesson: ${lesson.title}`}
        onClick={() => onSelect(lesson)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(lesson)}
        style={{
          aspectRatio: '16 / 9',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1A130E 0%, #241B12 60%, #1A130E 100%)',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212,161,42,0.15)',
          outline: 'none',
        }}
      >
        {lesson.thumbnail ? (
          <img
            src={lesson.thumbnail}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.7 }}
          />
        ) : (
          <svg width="60" height="60" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ opacity: 0.25 }}>
            <circle cx="24" cy="24" r="22" stroke="#D4A12A" strokeWidth="1" />
            <circle cx="24" cy="24" r="14" stroke="#D4A12A" strokeWidth="1" />
            <line x1="24" y1="2" x2="24" y2="46" stroke="#D4A12A" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="2" y1="24" x2="46" y2="24" stroke="#D4A12A" strokeWidth="0.8" strokeDasharray="3 4" />
          </svg>
        )}

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,19,14,0.4)' }} />

        {/* Play button */}
        <div
          style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#D4A12A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 32px rgba(212,161,42,0.28)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <Play size={22} fill="#1A130E" color="#1A130E" style={{ marginLeft: '3px' }} />
        </div>

        {/* Duration */}
        {lesson.duration && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              bottom: '0.65rem',
              right: '0.65rem',
              backgroundColor: 'rgba(26,19,14,0.78)',
              color: 'rgba(245,239,224,0.85)',
              fontSize: '0.72rem',
              padding: '0.22rem 0.55rem',
              borderRadius: '2px',
              fontWeight: 400,
            }}
          >
            {lesson.duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span
            className="font-body"
            style={{
              color: 'rgba(212,161,42,0.85)',
              fontSize: '0.62rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.3)',
              borderRadius: '999px',
              padding: '0.25rem 0.75rem',
            }}
          >
            Featured Lesson
          </span>
          {lesson.comingSoon && (
            <span
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.45)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              Coming Soon
            </span>
          )}
        </div>

        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          {lesson.category}
        </span>

        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.8vw, 1.7rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
          {lesson.title}
        </h2>

        <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
          {lesson.description}
        </p>

        {lesson.discussionQuestions?.length > 0 && (
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.42)', fontSize: '0.82rem', fontWeight: 300, fontStyle: 'italic', margin: 0 }}>
            Includes {lesson.discussionQuestions.length} reflection question{lesson.discussionQuestions.length !== 1 ? 's' : ''}
          </p>
        )}

        <button
          onClick={() => onSelect(lesson)}
          className="font-body"
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1A130E',
            backgroundColor: '#D4A12A',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            border: '1px solid #D4A12A',
            borderRadius: '2px',
            padding: '0.6rem 1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          <Play size={13} fill="#1A130E" />
          {lesson.videoUrl ? 'Watch Now' : 'Preview'}
        </button>
      </div>
    </motion.div>
  );
}