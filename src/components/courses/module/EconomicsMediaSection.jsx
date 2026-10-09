import React from 'react';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import LessonVideo from '@/components/courses/module/LessonVideo';
import TamuLessonVideo from '@/components/courses/module/TamuLessonVideo';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Read the recorded lessons a module carries, whichever shape it records them
 * in: a primary recording with supporting recordings, each with its source
 * attribution, or a single Tamu Academy lesson recording. Both become one
 * ordered list for the shared lesson structure, so every module presents its
 * media in the same place and the same order.
 */
export function normalizeLessonVideos(module) {
  const media = module.media || {};
  const entries = [];

  if (media.primary) entries.push({ kind: 'attributed', video: media.primary });
  if (Array.isArray(media.supporting)) {
    media.supporting.forEach((video) => entries.push({ kind: 'attributed', video }));
  }

  if (entries.length === 0 && module.video && module.video.embedUrl) {
    entries.push({ kind: 'tamu', video: module.video });
  }

  return entries;
}

/**
 * EconomicsMediaSection — the shared recorded-lessons block. Renders every
 * recording the module carries through the official YouTube player.
 *
 * A module that carries no recording renders nothing at all: the recorded
 * lessons heading, its introduction and the placeholder are omitted together
 * rather than announcing lessons that do not exist.
 */
export default function EconomicsMediaSection({ module, eyebrow, heading, intro }) {
  const entries = normalizeLessonVideos(module);
  if (entries.length === 0) return null;

  return (
    <ModuleLessonSection eyebrow={eyebrow} heading={heading}>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>{intro}</p>
      {entries.map((entry, i) =>
        entry.kind === 'attributed' ? (
          <LessonVideo key={entry.video.id || i} video={entry.video} />
        ) : (
          <TamuLessonVideo key={entry.video.embedUrl || i} video={entry.video} />
        ),
      )}
    </ModuleLessonSection>
  );
}