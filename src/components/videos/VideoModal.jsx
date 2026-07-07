import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoModal({ lesson, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(10,7,4,0.88)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 4vw, 2.5rem)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`Lesson: ${lesson.title}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '820px',
            backgroundColor: '#1E1410',
            border: '1px solid rgba(212,161,42,0.22)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(212,161,42,0.1)',
            }}
          >
            <div>
              <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>
                {lesson.category}
              </span>
              <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
                {lesson.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close video"
              style={{
                flexShrink: 0,
                background: 'none',
                border: '1px solid rgba(212,161,42,0.2)',
                borderRadius: '2px',
                color: 'rgba(245,239,224,0.55)',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Video / placeholder */}
          <div style={{ width: '100%', aspectRatio: '16 / 9', backgroundColor: '#12100C', position: 'relative' }}>
            {lesson.videoUrl ? (
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
              >
                <svg width="52" height="52" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="rgba(212,161,42,0.28)" strokeWidth="1" />
                  <circle cx="24" cy="24" r="14" stroke="rgba(212,161,42,0.16)" strokeWidth="1" />
                  <line x1="24" y1="2" x2="24" y2="46" stroke="rgba(212,161,42,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                  <line x1="2" y1="24" x2="46" y2="24" stroke="rgba(212,161,42,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                </svg>
                <span className="font-body" style={{ color: 'rgba(212,161,42,0.45)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Coming Soon
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.93rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
              {lesson.description}
            </p>

            {lesson.discussionQuestions?.length > 0 && (
              <div>
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

            {lesson.duration && (
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.78rem', fontWeight: 300, margin: 0 }}>
                Duration: {lesson.duration}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}