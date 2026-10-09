import React from 'react';
import { toParagraphs } from '@/lib/foundation-content';

/** The page's opening: who Tamu Academy is and how it came to be. */
export default function FoundationIntro({ content }) {
  return (
    <section aria-labelledby="foundation-heading" className="academy-hero">
      <p className="academy-eyebrow academy-eyebrow-large">{content.hero_eyebrow}</p>
      <h1 id="foundation-heading" className="academy-hero-h1 font-heading">
        {content.hero_heading}
      </h1>
      <div className="academy-prose font-body">
        {toParagraphs(content.intro_paragraphs).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}