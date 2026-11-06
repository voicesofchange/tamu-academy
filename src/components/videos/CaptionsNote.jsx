import React from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  note: 'Captions are on in your chosen language. You can change the caption language in the player settings.',
};

/**
 * CaptionsNote — the short line that sits under every video player, telling
 * the learner captions are already on and where to change them.
 */
export default function CaptionsNote({ style }) {
  const { content: c } = useTranslatedContent('video-captions-note', CONTENT);

  return (
    <p
      className="font-body"
      style={{
        color: 'rgba(243,234,216,0.5)',
        fontSize: '0.76rem',
        lineHeight: 1.6,
        fontWeight: 300,
        margin: '0.6rem 0 0',
        ...style,
      }}
    >
      {c.note}
    </p>
  );
}