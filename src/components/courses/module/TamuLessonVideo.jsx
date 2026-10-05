import React from 'react';
import SaverMediaBlock from '@/components/display/SaverMediaBlock';
import { useDisplayMode } from '@/lib/display-mode';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const titleStyle = {
  color: 'rgba(243,234,216,0.62)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
  fontStyle: 'italic',
  marginTop: '1rem',
  marginBottom: 0,
};

const CONTENT = {
  loadRecording: 'Load recorded lesson',
  openOnYouTube: 'Open on YouTube',
  saverNote: 'Data-Saver mode keeps the player closed until you ask for it.',
};

/**
 * TamuLessonVideo — presents one Tamu Academy recorded lesson: the recording
 * played through the official YouTube player, with the lesson title beneath
 * it. Used for the course's own recorded lessons, which need no third-party
 * source attribution card.
 *
 * In Data-Saver mode the player is not mounted at all until the learner taps
 * through, so opening the lesson downloads no video.
 */
export default function TamuLessonVideo({ video }) {
  const { content: c } = useTranslatedContent('tamu-lesson-video', CONTENT);
  const { isDataSaver } = useDisplayMode();

  if (!video || !video.embedUrl) return null;

  const embed = (
    <>
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
    </>
  );

  return (
    <div style={{ marginBottom: '2rem' }}>
      {isDataSaver ? (
        <SaverMediaBlock
          title={video.title}
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
    </div>
  );
}