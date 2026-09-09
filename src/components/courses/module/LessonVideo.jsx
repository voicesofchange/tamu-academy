import React from 'react';
import VideoSourceCard from '@/components/courses/module/VideoSourceCard';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  comingSoon: 'Recorded lesson coming soon.',
  lessonVideo: 'Lesson video',
  directLink: 'Direct link',
  openOnYouTube: 'Open on YouTube',
};

export default function LessonVideo({ video, fallbackText }) {
  const { content: c } = useTranslatedContent('lesson-video', CONTENT);

  if (!video) {
    return (
      <div
        style={{
          padding: '2rem',
          border: '1px dashed rgba(212,161,42,0.25)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.6)', margin: 0 }}>
          {fallbackText || c.comingSoon}
        </p>
      </div>
    );
  }

  const title = (video.source && video.source.title) || c.lessonVideo;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(212,161,42,0.18)',
          backgroundColor: '#000000',
        }}
      >
        <iframe
          src={video.embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
      <p
        className="font-body"
        style={{
          color: 'rgba(245,239,224,0.55)',
          fontSize: '0.78rem',
          marginTop: '0.6rem',
          marginBottom: 0,
        }}
      >
        {c.directLink}:{' '}
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' }}
        >
          {c.openOnYouTube}
        </a>
      </p>
      <VideoSourceCard source={video.source} attributionLabel={video.attributionLabel} />
    </div>
  );
}