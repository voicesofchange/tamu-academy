import React, { useState } from 'react';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.4)',
  borderRadius: '2px',
  padding: '0.6rem 1.2rem',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};

/** Turn a YouTube watch/short link into an embeddable player URL, or null. */
function youTubeEmbedUrl(url) {
  if (typeof url !== 'string') return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/,
  );
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

/**
 * The Watch step of a Building Wealth Together module.
 *
 * The recorded material for this course is hosted by other organisations
 * (PBS, TED, Y Combinator, Google, the Nobel Prize, Films For Action, an open
 * university textbook). The learner always gets a direct link out to the
 * source. Where the source is a YouTube video, an in-page player is offered
 * as well — and it mounts only after the learner asks for it, so nothing
 * loads on a slow connection or in Data-Saver mode until it is wanted.
 */
export default function WealthWatchStep({ watch, eyebrow, heading }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const embedUrl = youTubeEmbedUrl(watch.url);

  return (
    <ModuleLessonSection eyebrow={eyebrow} heading={heading}>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, margin: '0 0 1rem' }}>
        {watch.title}
      </h3>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>{watch.beforeYouWatch}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '1.5rem' }}>
        <a href={watch.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          {watch.linkLabel} &#8599;
        </a>
        {watch.alternativeUrl && (
          <a href={watch.alternativeUrl} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, borderColor: 'rgba(232,184,91,0.22)', color: 'rgba(232,184,91,0.75)' }}>
            {watch.alternativeLabel || 'Alternate source'} &#8599;
          </a>
        )}
        {embedUrl && !playerOpen && (
          <button type="button" onClick={() => setPlayerOpen(true)} style={linkStyle}>
            Play it here
          </button>
        )}
      </div>

      {playerOpen && embedUrl && (
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, marginBottom: '1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', overflow: 'hidden' }}>
          <iframe
            src={embedUrl}
            title={watch.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      )}

      <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.85rem' }}>
        As you watch, notice
      </span>
      <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
        {watch.notice.map((item, i) => (
          <li key={i} style={{ marginBottom: '0.6rem' }}>{item}</li>
        ))}
      </ol>
    </ModuleLessonSection>
  );
}