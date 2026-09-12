import React from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  aboutSource: 'About this source',
  speakerLabel: 'Speaker or organization',
  publisherLabel: 'Original publisher',
  watchLabel: 'Watch on YouTube',
  whySelectedLabel: 'Why this resource was selected',
  disclaimer: 'This independently produced video is included as a learning resource. Its speaker, producer, and publisher are not Tamu Academy instructors, employees, or partners.',
};

export default function VideoSourceCard({ source, attributionLabel }) {
  const { content: c } = useTranslatedContent('video-source-card', CONTENT);

  if (!source) return null;
  const speaker = source.speakerOrOrganization || source.speaker;
  const publisher = source.publisher;
  const watchUrl = source.watchUrl;
  const why = source.whySelected;
  const disclaimer = source.disclaimer || c.disclaimer;

  return (
    <div
      aria-label={attributionLabel ? `${c.aboutSource} · ${attributionLabel}` : c.aboutSource}
      style={{
        marginTop: '1.25rem',
        padding: '1.25rem 1.4rem',
        border: '1px solid rgba(232,184,91,0.22)',
        borderRadius: '3px',
        background: 'rgba(243,234,216,0.02)',
      }}
    >
      {attributionLabel && (
        <span
          className="font-body"
          style={{
            display: 'block',
            marginBottom: '0.6rem',
            color: '#e8b85b',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {c.aboutSource} · {attributionLabel}
        </span>
      )}
      <h3
        className="font-heading"
        style={{
          color: '#f8f0df',
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
          style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>{c.speakerLabel}: </strong>
          {speaker}
        </p>
      )}
      {publisher && (
        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>{c.publisherLabel}: </strong>
          {publisher}
        </p>
      )}
      {watchUrl && (
        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.5rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>{c.watchLabel}: </strong>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' }}
          >
            {watchUrl}
          </a>
        </p>
      )}
      {why && (
        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '0.85rem' }}
        >
          <strong style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>{c.whySelectedLabel}: </strong>
          {why}
        </p>
      )}
      <p
        className="font-body"
        style={{
          color: 'rgba(243,234,216,0.62)',
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