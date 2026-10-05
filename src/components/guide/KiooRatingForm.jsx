import React, { useState } from 'react';
import FrequencyField from './fields/FrequencyField';
import { KIOO_STATEMENTS } from '@/lib/guide/sections';
import { creamText } from '@/lib/guide/styles';

/**
 * KiooRatingForm — the ten statements at the five-point frequency scale,
 * with the learner's own note. Used for the first reflection and for every
 * return, so the same words are answered each time.
 */
export default function KiooRatingForm({
  title,
  instructions,
  notePrompt,
  submitLabel,
  onSubmit,
  submitting,
  defaultRatings,
  defaultNote,
}) {
  const [ratings, setRatings] = useState(defaultRatings || {});
  const [note, setNote] = useState(defaultNote || '');
  const [error, setError] = useState('');

  const answered = KIOO_STATEMENTS.every((statement) => Number(ratings[statement.id]) > 0);

  const handleSubmit = () => {
    if (!answered) {
      setError('Please answer all ten statements before saving.');
      return;
    }
    setError('');
    onSubmit(ratings, note);
  };

  return (
    <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem', borderLeft: '4px solid #C9961A' }}>
      <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
        Kioo
      </span>
      <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.3, margin: '0 0 0.6rem' }}>
        {title}
      </h2>
      {instructions && (
        <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.5rem' }}>
          {instructions}
        </p>
      )}

      <FrequencyField field={{ id: 'kioo', label: '', statements: KIOO_STATEMENTS }} value={ratings} onChange={setRatings} />

      <div style={{ marginTop: '1.75rem' }}>
        <label htmlFor="kioo-note" className="font-guide-body" style={creamText.label}>
          {notePrompt || 'Your note with this reflection'}
        </label>
        <textarea
          id="kioo-note"
          className="guide-input"
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      {error && (
        <p className="font-guide-body" role="alert" style={{ color: '#a4342a', fontSize: '0.82rem', margin: '1rem 0 0' }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="font-guide-body"
        style={{
          marginTop: '1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          background: '#C9961A',
          color: '#24150f',
          border: 'none',
          borderRadius: '3px',
          padding: '0.85rem 1.5rem',
          fontSize: '0.74rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          cursor: submitting ? 'wait' : 'pointer',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </section>
  );
}