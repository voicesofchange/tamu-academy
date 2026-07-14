import React, { useState } from 'react';

/**
 * LazyYouTube — responsive 16:9 YouTube embed with a click-to-load
 * facade. Renders the video thumbnail until the user presses play,
 * then swaps in the iframe (with autoplay). No fixed iframe pixel
 * dimensions are used; the container stays responsive on mobile.
 * Fullscreen playback is enabled.
 */
export default function LazyYouTube({ videoId, title }) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        backgroundColor: '#12100C',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(212,161,42,0.18)',
      }}
    >
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <img src={thumb} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,19,14,0.35)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '999px', backgroundColor: 'rgba(212,161,42,0.9)' }}>
              <span style={{ width: 0, height: 0, borderLeft: '20px solid #1A130E', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: '4px' }} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}