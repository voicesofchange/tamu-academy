import React from 'react';

/**
 * Standard "About this source" attribution card for any outside video used
 * in a Tamu Academy lesson. Required items (per editorial standard):
 *   1. Video title (heading)
 *   2. Speaker or organization, when confirmed
 *   3. Original publisher
 *   4. Direct YouTube link
 *   5. Why this resource was selected
 *   6. The Tamu Academy disclaimer statement
 */
const DISCLAIMER =
  'This independently produced video is included as a learning resource. Its speaker, producer, and publisher are not Tamu Academy instructors, employees, or partners.';

export default function VideoSourceCard({ source, attributionLabel }) {
  if (!source) return null;
  const speaker = source.speakerOrOrganization || source.speaker;
  const publisher = source.publisher;
  const watchUrl = source.watchUrl;
  const why = source.whySelected;
  const disclaimer = source.disclaimer || DISCLAIMER;

  return (
    <div
      aria-label={attributionLabel ? `${attributionLabel} attribution card` : 'About this source attribution'}
      style={{
        marginTop: '1.25rem',
        padding: '1.25rem 1.4rem',
        border: '1px solid rgba(212,161,42,0.22)',
        borderRadius: '3px',
        background: 'rgba(245,239,224,0.02)',
      }}
    >
      {attributionLabel && (
        <span
          className="font-body"
          style={{
            display: 'block',
            marginBottom: '0.6rem',
            color: '#D4A12A',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          About this source · {attributionLabel}
        </span>
      )}
      <h3
        className="font-heading"
        style={{
          color: '#F5EFE0',
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          margin: '0 0 0.6rem',
        }}
      >
        {source.title}
      </h3>
      {speaker && (
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>Speaker or organization: </strong>
          {speaker}
        </p>
      )}
      {publisher && (
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>Original publisher: </strong>
          {publisher}
        </p>
      )}
      {watchUrl && (
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>Watch on YouTube: </strong>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' }}
          >
            {watchUrl}
          </a>
        </p>
      )}
      {why && (
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.85rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>Why this resource was selected: </strong>
          {why}
        </p>
      )}
      <p
        className="font-body"
        style={{
          color: 'rgba(245,239,224,0.62)',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          margin: '0.6rem 0 0',
        }}
      >
        {disclaimer}
      </p>
    </div>
  );
}