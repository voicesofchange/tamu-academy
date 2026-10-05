import React from 'react';

const titleStyle = {
  color: 'rgba(243,234,216,0.62)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
  fontStyle: 'italic',
  marginTop: '1rem',
  marginBottom: 0,
};

/**
 * TamuLessonVideo — presents one Tamu Academy recorded lesson: the recording
 * played through the official YouTube player, with the lesson title beneath
 * it. Used for the course's own recorded lessons, which need no third-party
 * source attribution card.
 */
export default function TamuLessonVideo({ video }) {
  if (!video || !video.embedUrl) return null;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(232,184,91,0.18)', backgroundColor: '#000000' }}>
        <iframe
          src={video.embedUrl}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
      <p className="font-body" style={titleStyle}>{video.title}</p>
    </div>
  );
}