import React from 'react';
import SiteShell from '@/components/page/SiteShell';

/**
 * ModuleLessonLayout — the learner-journey shell for module lesson and
 * progress pages: the shared site frame with a narrow, comfortable reading
 * measure.
 */
export default function ModuleLessonLayout({ children }) {
  return (
    <SiteShell
      mainStyle={{ maxWidth: '820px', margin: '0 auto', padding: '7rem clamp(1.5rem,6vw,3rem) 6rem' }}
    >
      {children}
    </SiteShell>
  );
}