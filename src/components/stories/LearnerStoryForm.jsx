import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';

const inputStyle = {
  width: '100%',
  background: 'rgba(243,234,216,0.04)',
  border: '1px solid rgba(232,184,91,0.2)',
  borderRadius: '4px',
  padding: '0.75rem 1rem',
  color: '#f8f0df',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(243,234,216,0.7)',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '0.5rem',
  fontFamily: "'DM Sans', sans-serif",
};

const buttonStyle = {
  background: '#e8b85b',
  color: '#24150f',
  border: 'none',
  borderRadius: '4px',
  padding: '0.85rem 2rem',
  fontSize: '0.8rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  transition: 'opacity 0.2s ease',
};

export default function LearnerStoryForm() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    author_name: '',
    author_location: '',
    course_slug: '',
    story_type: 'story',
    title: '',
    content: '',
    rating: 0,
  });
  const [status, setStatus] = useState('idle');

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = {
        author_name: form.author_name,
        story_type: form.story_type,
        title: form.title,
        content: form.content,
        status: 'pending',
      };
      if (form.author_location) payload.author_location = form.author_location;
      if (form.course_slug) payload.course_slug = form.course_slug;
      if (form.story_type === 'review' && form.rating > 0) payload.rating = form.rating;
      await base44.entities.LearnerStory.create(payload);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setForm({
      author_name: '',
      author_location: '',
      course_slug: '',
      story_type: 'story',
      title: '',
      content: '',
      rating: 0,
    });
    setStatus('idle');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', border: '1px solid rgba(232,184,91,0.15)', borderRadius: '4px', background: 'rgba(243,234,216,0.03)' }}>
        <p style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.95rem', marginBottom: '1.25rem', fontFamily: "'DM Sans', sans-serif" }}>
          {t('stories.signInPrompt')}
        </p>
        <Link to="/login" style={{ ...buttonStyle, display: 'inline-block', textDecoration: 'none' }}>
          {t('nav.signIn')}
        </Link>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', background: 'rgba(232,184,91,0.06)' }}>
        <p style={{ color: '#e8b85b', fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
          {t('stories.form.success')}
        </p>
        <button onClick={resetForm} style={buttonStyle}>
          {t('stories.form.submitAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {status === 'error' && (
        <p style={{ color: '#e57373', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif" }}>
          {t('stories.form.error')}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={labelStyle} htmlFor="story-name">{t('stories.form.name')}</label>
          <input
            id="story-name"
            type="text"
            required
            value={form.author_name}
            onChange={(e) => update('author_name', e.target.value)}
            placeholder={t('stories.form.namePlaceholder')}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={labelStyle} htmlFor="story-location">{t('stories.form.location')}</label>
          <input
            id="story-location"
            type="text"
            value={form.author_location}
            onChange={(e) => update('author_location', e.target.value)}
            placeholder={t('stories.form.locationPlaceholder')}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={labelStyle} htmlFor="story-type">{t('stories.form.type')}</label>
          <select
            id="story-type"
            value={form.story_type}
            onChange={(e) => update('story_type', e.target.value)}
            style={inputStyle}
          >
            <option value="story" style={{ background: '#24150f' }}>{t('stories.form.typeStory')}</option>
            <option value="review" style={{ background: '#24150f' }}>{t('stories.form.typeReview')}</option>
          </select>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={labelStyle} htmlFor="story-course">{t('stories.form.course')}</label>
          <select
            id="story-course"
            value={form.course_slug}
            onChange={(e) => update('course_slug', e.target.value)}
            style={inputStyle}
          >
            <option value="" style={{ background: '#24150f' }}>{t('stories.form.selectCourse')}</option>
            <option value="understanding-african-economies-and-the-global-system" style={{ background: '#24150f' }}>
              {t('stories.courseEconomics')}
            </option>
            <option value="mental-health-community-and-culture" style={{ background: '#24150f' }}>
              {t('stories.courseMentalHealth')}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="story-title">{t('stories.form.title')}</label>
        <input
          id="story-title"
          type="text"
          required
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder={t('stories.form.titlePlaceholder')}
          style={inputStyle}
        />
      </div>

      {form.story_type === 'review' && (
        <div>
          <label style={labelStyle}>{t('stories.form.rating')}</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update('rating', n === form.rating ? 0 : n)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  color: n <= form.rating ? '#e8b85b' : 'rgba(243,234,216,0.25)',
                  padding: '0.25rem',
                  lineHeight: 1,
                }}
                aria-label={`${n} stars`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label style={labelStyle} htmlFor="story-content">{t('stories.form.content')}</label>
        <textarea
          id="story-content"
          required
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          placeholder={t('stories.form.contentPlaceholder')}
          rows={6}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            ...buttonStyle,
            opacity: status === 'submitting' ? 0.6 : 1,
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'submitting' ? t('stories.form.submitting') : t('stories.form.submit')}
        </button>
      </div>
    </form>
  );
}