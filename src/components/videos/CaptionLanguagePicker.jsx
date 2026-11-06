import React from 'react';
import { LANGUAGES } from '@/lib/i18n/LanguageContext';
import { captionLanguage } from '@/lib/youtube-captions';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  label: 'Caption language',
};

/**
 * CaptionLanguagePicker — lets a viewer choose the language of the player's
 * captions from every language Tamu Academy serves, independently of the
 * interface language. Changing it reloads the player with that caption track.
 */
export default function CaptionLanguagePicker({ value, onChange, style }) {
  const { content: c } = useTranslatedContent('video-caption-language', CONTENT);

  return (
    <label
      className="font-body"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'rgba(243,234,216,0.55)',
        fontSize: '0.74rem',
        lineHeight: 1.4,
        ...style,
      }}
    >
      <span>{c.label}</span>
      <select
        value={captionLanguage(value)}
        onChange={(e) => onChange(e.target.value)}
        aria-label={c.label}
        style={{
          background: '#2a1f17',
          color: '#f8f0df',
          border: '1px solid rgba(232,184,91,0.28)',
          borderRadius: '2px',
          padding: '0.3rem 0.45rem',
          fontSize: '0.74rem',
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}