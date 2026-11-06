import React from 'react';
import { Link } from 'react-router-dom';
import { Languages } from 'lucide-react';

/**
 * TranslationReviewCard — the administrator's way into the Translation Review
 * page, where cached course translations are checked against their English.
 */
export default function TranslationReviewCard() {
  return (
    <div
      style={{
        padding: '1.5rem 1.75rem',
        border: '1px solid rgba(232,184,91,0.18)',
        borderRadius: '4px',
        backgroundColor: 'rgba(243,234,216,0.015)',
      }}
    >
      <span
        className="font-body"
        style={{
          color: '#e8b85b',
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.6rem',
        }}
      >
        <Languages size={13} aria-hidden="true" />
        Translation review
      </span>

      <h2
        className="font-heading"
        style={{ color: '#f8f0df', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.6rem' }}
      >
        Check translations against their English
      </h2>

      <p className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1rem' }}>
        Review the cached course translations beside the English they were made from, correct
        them and mark them reviewed. Reviewed translations are never overwritten automatically.
        Export a CSV to send a language to an outside reviewer, then import their file back.
      </p>

      <Link
        to="/admin/translation-review"
        className="font-body"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#24150f',
          backgroundColor: '#e8b85b',
          border: '1px solid #e8b85b',
          borderRadius: '2px',
          padding: '0.55rem 1rem',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        Open Translation Review
      </Link>
    </div>
  );
}