import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { LEARNER_CATEGORIES, needsLearnerCategory } from '@/lib/learner-profile';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  eyebrow: 'One Last Step',
  heading: 'How do you learn with Tamu Academy?',
  body: 'Choose the learner group that describes you. It helps us shape the dashboard you see, and you can change it any time in your profile.',
  label: 'I am a',
  selectOption: 'Select your learner group…',
  save: 'Save and continue',
  saving: 'Saving…',
  error: 'We could not save your answer. Please try again.',
  missing: 'Please choose the learner group that describes you.',
  footNote: 'Your answer is stored on your own profile. Nothing is shared publicly.',
};

/**
 * LearnerCategoryPrompt — the required first-login step for a learner whose
 * profile does not yet record a learner group.
 *
 * It appears over the learner's section of the site until a category is
 * chosen; the category is profile metadata only and never changes a learner's
 * permissions. Administrators are never prompted (see needsLearnerCategory),
 * and the profile page is skipped because the field is already there.
 */
export default function LearnerCategoryPrompt() {
  const { user, checkUserAuth } = useAuth();
  const { content: c } = useTranslatedContent('learner-category-prompt', CONTENT);
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  // The profile page already carries the field, so it is never covered.
  if (location.pathname.startsWith('/profile')) return null;
  if (!needsLearnerCategory(user)) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!category) {
      setError(c.missing);
      return;
    }
    setError('');
    setStatus('saving');
    try {
      await base44.auth.updateMe({ learner_category: category });
      await checkUserAuth();
      setStatus('idle');
    } catch {
      setStatus('idle');
      setError(c.error);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(12,8,5,0.82)',
        overflowY: 'auto',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="learner-category-heading"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#24150f',
          border: '1px solid rgba(232,184,91,0.4)',
          borderRadius: '4px',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
        }}
      >
        <span
          className="font-body"
          style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}
        >
          {c.eyebrow}
        </span>
        <h2
          id="learner-category-heading"
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 0.85rem' }}
        >
          {c.heading}
        </h2>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.5rem' }}>
          {c.body}
        </p>

        {error && (
          <div role="alert" style={{ marginBottom: '1.1rem', padding: '0.75rem 1rem', border: '1px solid rgba(220,80,60,0.4)', borderRadius: '3px', backgroundColor: 'rgba(220,80,60,0.08)' }}>
            <p className="font-body" style={{ color: 'rgba(230,140,120,0.95)', fontSize: '0.86rem', margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="learner-category-select"
            className="font-body"
            style={{ display: 'block', color: 'rgba(243,234,216,0.72)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.5rem' }}
          >
            {c.label}
          </label>
          <select
            id="learner-category-select"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              if (error) setError('');
            }}
            required
            aria-required="true"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: 'rgba(243,234,216,0.04)',
              border: '1px solid rgba(232,184,91,0.28)',
              borderRadius: '3px',
              color: '#f8f0df',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 300,
              padding: '0.75rem 0.9rem',
              cursor: 'pointer',
            }}
          >
            <option value="">{c.selectOption}</option>
            {LEARNER_CATEGORIES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={status === 'saving'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: '1.25rem',
              backgroundColor: status === 'saving' ? 'rgba(232,184,91,0.6)' : '#e8b85b',
              color: '#24150f',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              border: 'none',
              borderRadius: '2px',
              padding: '0.85rem 1.4rem',
              cursor: status === 'saving' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'saving' ? c.saving : c.save}
          </button>
        </form>

        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, margin: '1rem 0 0' }}>
          {c.footNote}
        </p>

        <style>{`select option { background-color: #2a1f17; color: #f8f0df; }`}</style>
      </div>
    </div>
  );
}