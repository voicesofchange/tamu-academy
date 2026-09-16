import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function HomeLearnerVoices() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await base44.entities.LearnerStory.filter({
          status: { $in: ['approved', 'featured'] },
        }, '-created_date', 3);
        if (!cancelled) setStories(result);
      } catch {
        // Silent fail — section just renders empty state
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="voices"
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
        scrollMarginTop: '90px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ marginBottom: '2.75rem' }}
      >
        <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
          Learner Voices
        </p>
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: 0, maxWidth: '640px' }}>
          Learning that stays with you.
        </h2>
      </motion.div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                padding: '1.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(232,184,91,0.1)',
                backgroundColor: 'rgba(243,234,216,0.015)',
                minHeight: '180px',
              }}
            />
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '4px',
            border: '1px solid rgba(232,184,91,0.16)',
            backgroundColor: 'rgba(243,234,216,0.02)',
            textAlign: 'center',
          }}
        >
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.62)', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.25rem' }}>
            Learner stories will appear here as our community grows. Be among the first to share your experience.
          </p>
          <Link
            to="/stories"
            className="font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#e8b85b',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1px solid rgba(232,184,91,0.4)',
              borderRadius: '2px',
              padding: '0.65rem 1.3rem',
            }}
          >
            Share Your Story →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {stories.map((story, i) => (
            <motion.blockquote
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
              className="tamu-card"
              style={{
                padding: '1.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(232,184,91,0.16)',
                backgroundColor: 'rgba(243,234,216,0.02)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {story.rating && (
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.85rem' }} aria-label={`${story.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} style={{ color: idx < story.rating ? '#e8b85b' : 'rgba(232,184,91,0.2)', fontSize: '0.85rem' }}>★</span>
                  ))}
                </div>
              )}
              <p className="font-heading" style={{ color: 'rgba(243,234,216,0.85)', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 400, fontStyle: 'italic', margin: '0 0 1.25rem', flexGrow: 1 }}>
                "{story.content && story.content.length > 180 ? story.content.slice(0, 180) + '…' : story.content}"
              </p>
              <footer>
                <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.82rem', fontWeight: 500, margin: 0 }}>
                  {story.author_name}
                </p>
                {story.author_location && (
                  <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', fontWeight: 300, margin: '0.2rem 0 0' }}>
                    {story.author_location}
                  </p>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      )}

      {stories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '2rem' }}
        >
          <Link
            to="/stories"
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Read More Stories →
          </Link>
        </motion.div>
      )}
    </section>
  );
}