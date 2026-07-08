import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

/**
 * ArticleCard — displayed on the /articles landing page.
 * When status is 'in-development', the article link is disabled and
 * a "Coming Soon" label is shown instead. The episode video link remains active.
 */
export default function ArticleCard({ article }) {
  const isDev = article.status === 'in-development';

  return (
    <article
      style={{
        padding: '1.5rem 1.75rem',
        border: '1px solid rgba(212,161,42,0.16)',
        borderRadius: '4px',
        backgroundColor: 'rgba(245,239,224,0.018)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
      }}
    >
      {/* Category + status row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.28)', borderRadius: '999px', padding: '0.2rem 0.65rem' }}>
          {article.category}
        </span>
        {isDev && (
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.38)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(245,239,224,0.12)', borderRadius: '999px', padding: '0.2rem 0.65rem' }}>
            Article in Development
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
        {article.title}
      </h3>

      {/* Summary */}
      <p className="font-body" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
        {article.summary}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginTop: '0.25rem' }}>
        {/* Article link — disabled when in development */}
        {isDev ? (
          <span
            className="font-body"
            aria-disabled="true"
            style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(245,239,224,0.25)', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(245,239,224,0.1)', borderRadius: '2px', padding: '0.5rem 1rem', cursor: 'default', userSelect: 'none' }}
          >
            Coming Soon
          </span>
        ) : (
          <Link
            to={`/articles/${article.slug}`}
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.5rem 1rem' }}
          >
            Read Article →
          </Link>
        )}

        {/* Watch episode — always active */}
        <a
          href={`https://www.youtube.com/watch?v=${article.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(212,161,42,0.7)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(212,161,42,0.7)'}
        >
          <ExternalLink size={11} aria-hidden="true" />
          Watch Episode
        </a>
      </div>
    </article>
  );
}