import React from 'react';
import { Link } from 'react-router-dom';
import { darkText } from '@/lib/guide/styles';

/**
 * SectionBanner — the gold-to-amber block that opens every section, with the
 * large section number, the Swahili name with its English alongside, the
 * section proverb, and the short introduction.
 */
export default function SectionBanner({ section }) {
  return (
    <header style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      <Link
        to="/learners-guide"
        className="font-guide-body"
        style={{ ...darkText.eyebrow, textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}
      >
        &larr; Safari ya Utu
      </Link>

      <div
        style={{
          background: 'linear-gradient(120deg, #C9961A 0%, #D9822B 100%)',
          borderRadius: '4px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#2A2119',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0 }}>
            <span className="font-guide-body" style={{ fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(36,21,15,0.72)' }}>
              {section.number ? `Section ${section.number}` : "Learner's Guide"}
            </span>
            <h1 className="font-guide-heading" style={{ fontSize: 'clamp(1.9rem, 5vw, 2.9rem)', fontWeight: 600, lineHeight: 1.05, margin: '0.45rem 0 0.35rem', color: '#24150f' }}>
              {section.english}
            </h1>
            <p className="font-guide-body" style={{ fontSize: '0.95rem', fontWeight: 400, margin: 0, color: 'rgba(36,21,15,0.82)' }}>
              {section.swahili} · Kiswahili
            </p>
          </div>
          {section.number && (
            <span
              aria-hidden
              className="font-guide-heading"
              style={{ fontSize: 'clamp(3.25rem, 9vw, 5.5rem)', lineHeight: 0.8, fontWeight: 600, color: 'rgba(51,36,26,0.2)' }}
            >
              {section.number}
            </span>
          )}
        </div>

        {section.proverb && (
          <blockquote style={{ margin: '1.5rem 0 0', paddingLeft: '1rem', borderLeft: '3px solid rgba(51,36,26,0.32)' }}>
            <p className="font-guide-heading" style={{ fontStyle: 'italic', fontSize: '1.05rem', margin: 0, color: '#24150f' }}>
              &ldquo;{section.proverb.sw}&rdquo;
            </p>
            <p className="font-guide-body" style={{ fontSize: '0.82rem', margin: '0.3rem 0 0', color: 'rgba(36,21,15,0.78)' }}>
              {section.proverb.en}
              {section.proverb.language ? ` · ${section.proverb.language}` : ''}
            </p>
          </blockquote>
        )}

        {section.intro && section.intro.length > 0 && (
          <div style={{ marginTop: '1.5rem', maxWidth: '46rem' }}>
            {section.intro.map((paragraph, index) => (
              <p
                key={index}
                className="font-guide-body"
                style={{ fontSize: '0.94rem', lineHeight: 1.8, fontWeight: 300, margin: index === 0 ? 0 : '0.85rem 0 0', color: '#33241A' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}