import React from 'react';
import SectionBanner from './SectionBanner';
import SectionFooterNav from './SectionFooterNav';
import CareNote from './CareNote';
import { creamText } from '@/lib/guide/styles';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  contentInPreparation: 'Content in preparation',
  thisSectionIsBeingPrepared: 'This section is being prepared',
  theFrameworkExercisesTakeawaysAnd: 'The framework, exercises, takeaways and closing reflection for {v0} ({v1}) will appear here once the section content is added.',
};

/**
 * GuideSectionShell — what a section shows before its content arrives: the
 * banner, its proverb, and an honest note that the exercises are on the way.
 * The Utu shell also carries the care note and support-services placeholder.
 */
export default function GuideSectionShell({ section }) {
  const { content: uiText } = useTranslatedContent('ui-components-guide-guidesectionshell', UI_TEXT);
  return (
    <div>
      <SectionBanner section={section} />
      {section.careNote && <CareNote />}
      <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
        <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
          {uiText.contentInPreparation}
        </span>
        <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)', lineHeight: 1.3, margin: '0 0 0.7rem' }}>
          {uiText.thisSectionIsBeingPrepared}
        </h2>
        <p className="font-guide-body" style={{ ...creamText.body, margin: 0 }}>
          {section.preparedNote ||
            fillTemplate(uiText.theFrameworkExercisesTakeawaysAnd, { v0: section.english, v1: section.swahili })}
        </p>
      </section>
      <SectionFooterNav section={section} status="not_started" hideMarkDone />
    </div>
  );
}