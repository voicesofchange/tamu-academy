import React, { useEffect, useState } from 'react';
import SectionBanner from './SectionBanner';
import FrameworkCards from './FrameworkCards';
import ExerciseBlock from './ExerciseBlock';
import SectionFooterNav from './SectionFooterNav';
import SavedIndicator from './SavedIndicator';
import { useGuideSection } from '@/lib/guide/useGuideSection';
import { getCachedStatus, loadProgressMap, setSectionStatus } from '@/lib/guide/guideProgress';
import { creamText, darkText } from '@/lib/guide/styles';

/**
 * GuideSectionView — the shared template every authored section uses:
 * banner, framework tiles, exercises, key takeaways, closing reflection,
 * then mark-as-done and the previous/next links. Answers autosave.
 */
export default function GuideSectionView({ section }) {
  const { getValue, setValue, saveState, learnerId } = useGuideSection(section.id);
  const [status, setStatus] = useState(() => getCachedStatus(learnerId, section.id));
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (!learnerId) return undefined;
    let cancelled = false;
    loadProgressMap(learnerId)
      .then((map) => {
        if (!cancelled) setStatus(map[section.id] || 'not_started');
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [learnerId, section.id]);

  const markDone = async () => {
    setMarking(true);
    try {
      await setSectionStatus(learnerId, section.id, 'done');
      setStatus('done');
    } finally {
      setMarking(false);
    }
  };

  return (
    <div>
      <SectionBanner section={section} />
      <FrameworkCards framework={section.framework} />

      <section style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.4rem' }}>
              Exercises
            </span>
            <h2 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.25, margin: 0 }}>
              Write your answers
            </h2>
          </div>
          <SavedIndicator state={saveState} tone="dark" />
        </div>

        {section.exercises.map((exercise) => (
          <ExerciseBlock key={exercise.id} exercise={exercise} getValue={getValue} setValue={setValue} />
        ))}
      </section>

      <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.25rem' }}>
        <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
          Key takeaways
        </span>
        <ul style={{ margin: 0, paddingLeft: '1.15rem' }}>
          {section.takeaways.map((takeaway) => (
            <li key={takeaway} className="font-guide-body" style={{ ...creamText.body, marginBottom: '0.6rem' }}>
              {takeaway}
            </li>
          ))}
        </ul>
      </section>

      {section.closingReflection && (
        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)', borderLeft: '4px solid #C9961A' }}>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
            Closing reflection
          </span>
          <label htmlFor={`${section.id}-closing`} className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.1rem', display: 'block', lineHeight: 1.45, marginBottom: '0.9rem' }}>
            {section.closingReflection.prompt}
          </label>
          <textarea
            id={`${section.id}-closing`}
            className="guide-input"
            rows={5}
            value={getValue('closing', 'reflection', '')}
            onChange={(event) => setValue('closing', 'reflection', event.target.value)}
          />
        </section>
      )}

      <SectionFooterNav section={section} status={status} onMarkDone={markDone} busy={marking} />
    </div>
  );
}