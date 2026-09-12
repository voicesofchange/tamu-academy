import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  inDevelopment: 'Article in Development',
  comingSoon: 'Coming Soon',
  previewArticle: 'Preview Article',
  readArticle: 'Read Article',
  watchEpisode: 'Watch Episode',
};

export default function ArticleCard({ article }) {
  const { content: c } = useTranslatedContent('article-card', CONTENT);
  const isDev = article.status === 'in-development';

  return (
    <article
      style={{
        padding: '1.5rem 1.75rem',
        border: '1px solid rgba(232,184,91,0.16)',
        borderRadius: '4px',
        backgroundColor: 'rgba(243,234,216,0.018)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
        <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(232,184,91,0.28)', borderRadius: '999px', padding: '0.2rem 0.65rem' }}>
          {article.category}
        </span>
        {isDev && (
          <span className="font-body" style={{ color: 'rgba(243,234,216,0.38)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(243,234,216,0.12)', borderRadius: '999px', padding: '0.2rem 0.65rem' }}>
            {c.inDevelopment}
          </span>
        )}
      </div>

      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
        {article.title}
      </h3>

      <p className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
        {article.cardSummary || article.summary}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginTop: '0.25rem' }}>
        {isDev && article.sections?.length === 0 ? (
          <span
            className="font-body"
            aria-disabled="true"
            style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(243,234,216,0.25)', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(243,234,216,0.1)', borderRadius: '2px', padding: '0.5rem 1rem', cursor: 'default', userSelect: 'none' }}
          >
            {c.comingSoon}
          </span>
        ) : isDev ? (
          <Link
            to={`/articles/${article.slug}`}
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(243,234,216,0.6)', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(243,234,216,0.22)', borderRadius: '2px', padding: '0.5rem 1rem' }}
          >
            {c.previewArticle} →
          </Link>
        ) : (
          <Link
            to={`/articles/${article.slug}`}
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#24150f', backgroundColor: '#e8b85b', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #e8b85b', borderRadius: '2px', padding: '0.5rem 1rem' }}
          >
            {c.readArticle} →
          </Link>
        )}

        <a
          href={`https://www.youtube.com/watch?v=${article.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(232,184,91,0.7)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#e8b85b'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(232,184,91,0.7)'}
        >
          <ExternalLink size={11} aria-hidden="true" />
          {c.watchEpisode}
        </a>
      </div>
    </article>
  );
}