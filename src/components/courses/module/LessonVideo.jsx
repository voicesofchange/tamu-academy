import React from 'react';
import VideoSourceCard from '@/components/courses/module/VideoSourceCard';
import SaverMediaBlock from '@/components/display/SaverMediaBlock';
import { useDisplayMode } from '@/lib/display-mode';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  comingSoon: 'Recorded lesson coming soon.',
  lessonVideo: 'Lesson video',
  directLink: 'Direct link',
  openOnYouTube: 'Open on YouTube',
  loadRecording: 'Load recorded lesson',
  publisherLabel: 'Original publisher',
  saverNote: 'Data-Saver mode keeps the player closed until you ask for it, so this lesson opens without the video loading.',
};

export default function LessonVideo({ video, fallbackText }) {
  const { content: c } = useTranslatedContent('lesson-video', CONTENT);
  const { isDataSaver } = useDisplayMode();

  if (!video) {
    return (
      <div
        style={{
          padding: '2rem',
          border: '1px dashed rgba(232,184,91,0.25)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.6)', margin: 0 }}>
          {fallbackText || c.comingSoon}
        </p>
      </div>
    );
  }

  const title = (video.source && video.source.title) || c.lessonVideo;
  const publisher = video.source && video.source.publisher;

  const embed = (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(232,184,91,0.18)',
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
          color: 'rgba(243,234,216,0.55)',
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
          style={{ color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' }}
        >
          {c.openOnYouTube}
        </a>
      </p>
    </>
  );

  return (
    <div style={{ marginBottom: '2rem' }}>
      {isDataSaver ? (
        <SaverMediaBlock
          title={title}
          meta={publisher ? `${c.publisherLabel}: ${publisher}` : null}
          note={c.saverNote}
          loadLabel={c.loadRecording}
          alternativeHref={video.watchUrl}
          alternativeLabel={c.openOnYouTube}
        >
          {embed}
        </SaverMediaBlock>
      ) : (
        embed
      )}
      <VideoSourceCard source={video.source} attributionLabel={video.attributionLabel} />
    </div>
  );
}