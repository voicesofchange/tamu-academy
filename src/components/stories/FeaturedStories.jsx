import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';

const cardStyle = {
  background: 'rgba(245,239,224,0.03)',
  border: '1px solid rgba(212,161,42,0.15)',
  borderRadius: '4px',
  padding: '1.75rem',
  marginBottom: '1.5rem',
};

const badgeStyle = {
  display: 'inline-block',
  color: 'rgba(212,161,42,0.85)',
  fontSize: '0.6rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontWeight: 500,
  border: '1px solid rgba(212,161,42,0.25)',
  borderRadius: '2px',
  padding: '0.2rem 0.6rem',
  marginRight: '0.5rem',
  fontFamily: "'DM Sans', sans-serif",
};

export default function FeaturedStories() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.LearnerStory.list('-created_date', 20)
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          if (a.status === 'featured' && b.status !== 'featured') return -1;
          if (b.status === 'featured' && a.status !== 'featured') return 1;
          return new Date(b.created_date) - new Date(a.created_date);
        });
        setStories(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p style={{ color: 'rgba(245,239,224,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem' }}>
        {t('common.loading')}
      </p>
    );
  }

  if (stories.length === 0) {
    return (
      <p style={{ color: 'rgba(245,239,224,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontStyle: 'italic' }}>
        {t('stories.featuredEmpty')}
      </p>
    );
  }

  const courseLabel = (slug) => {
    if (slug === 'understanding-african-economies-and-the-global-system') return t('stories.courseEconomics');
    if (slug === 'mental-health-community-and-culture') return t('stories.courseMentalHealth');
    return null;
  };

  return (
    <div>
      {stories.map((story) => (
        <div key={story.id} style={cardStyle}>
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={badgeStyle}>{story.story_type === 'review' ? t('stories.form.typeReview') : t('stories.form.typeStory')}</span>
            {story.course_slug && <span style={badgeStyle}>{courseLabel(story.course_slug)}</span>}
          </div>
          <h3 style={{ color: '#F5EFE0', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, margin: '0 0 0.75rem', lineHeight: 1.3 }}>
            {story.title}
          </h3>
          {story.rating > 0 && (
            <div style={{ color: '#D4A12A', fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
              {'★'.repeat(story.rating)}{'☆'.repeat(5 - story.rating)}
            </div>
          )}
          <p style={{ color: 'rgba(245,239,224,0.8)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: '0 0 1.25rem' }}>
            {story.content}
          </p>
          <p style={{ color: 'rgba(245,239,224,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem' }}>
            — {story.author_name}{story.author_location ? `, ${story.author_location}` : ''}
          </p>
        </div>
      ))}
    </div>
  );
}