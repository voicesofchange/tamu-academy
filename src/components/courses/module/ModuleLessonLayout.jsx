import React from 'react';
import SiteShell from '@/components/page/SiteShell';
import { useDisplayMode } from '@/lib/display-mode';

/**
 * ModuleLessonLayout — the learner-journey shell for module lesson and
 * progress pages: the shared site frame with a narrow, comfortable reading
 * measure.
 *
 * In Data-Saver mode the measure tightens and the decorative top and bottom
 * padding shrinks, so a lesson begins closer to the top of the screen and
 * reads as one continuous column of text.
 */
export default function ModuleLessonLayout({ children }) {
  const { isDataSaver } = useDisplayMode();

  return (
    <SiteShell
      mainStyle={
        isDataSaver
          ? { maxWidth: '700px', margin: '0 auto', padding: '5.5rem clamp(1.1rem,4vw,1.75rem) 4rem' }
          : { maxWidth: '820px', margin: '0 auto', padding: '7rem clamp(1.5rem,6vw,3rem) 6rem' }
      }
    >
      {children}
    </SiteShell>
  );
}