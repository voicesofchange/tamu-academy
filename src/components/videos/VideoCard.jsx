import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideoCard({ lesson, index, onSelect }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
      onClick={() => onSelect(lesson)}
      role="button"
      tabIndex={0}
      aria-label={`Play lesson: ${lesson.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(lesson)}
      style={{
        border: '1px solid rgba(212,161,42,0.16)',
        borderRadius: '4px',
        backgroundColor: 'rgba(245,239,224,0.02)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease',
        outline: 'none',
      }}
      className="tamu-card"
    >
      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: '16 / 9',
          backgroundColor: 'rgba(26,19,14,0.9)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, #1A130E 0%, #241B12 60%, #1A130E 100%)`,
        }}
      >
        {lesson.thumbnail ? (
          <img
            src={lesson.thumbnail}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
        ) : (
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ opacity: 0.3 }}>
            <circle cx="24" cy="24" r="22" stroke="#D4A12A" strokeWidth="1" />
            <circle cx="24" cy="24" r="14" stroke="#D4A12A" strokeWidth="1" />
            <line x1="24" y1="2" x2="24" y2="46" stroke="#D4A12A" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="2" y1="24" x2="46" y2="24" stroke="#D4A12A" strokeWidth="0.8" strokeDasharray="3 4" />
          </svg>
        )}
        {/* Play overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(26,19,14,0.45)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
          className="video-card-play-overlay"
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#D4A12A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={18} fill="#1A130E" color="#1A130E" style={{ marginLeft: '2px' }} />
          </div>
        </div>
        {/* Duration badge */}
        {lesson.duration && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              backgroundColor: 'rgba(26,19,14,0.82)',
              color: 'rgba(245,239,224,0.85)',
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
              fontWeight: 400,
            }}
          >
            {lesson.duration}
          </span>
        )}
        {/* Coming soon badge */}
        {lesson.comingSoon && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
              backgroundColor: 'rgba(212,161,42,0.12)',
              color: '#D4A12A',
              border: '1px solid rgba(212,161,42,0.35)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontWeight: 500,
            }}
          >
            Coming Soon
          </span>
        )}
      </div>

      <div style={{ padding: '1.1rem 1.3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {lesson.episode && (
            <span className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>
              Ep {lesson.episode}
            </span>
          )}
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
            {lesson.category}
          </span>
        </div>
        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
          {lesson.title}
        </h3>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem', lineHeight: 1.65, fontWeight: 300, margin: 0, flexGrow: 1 }}>
          {lesson.description}
        </p>
      </div>
    </motion.article>
  );
}