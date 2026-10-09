import React from 'react';
import { toParagraphs } from '@/lib/foundation-content';

/** The principle the platform's courses are built on. */
export default function FoundationCommitment({ content }) {
  return (
    <section aria-labelledby="foundation-commitment-heading" className="academy-commitment">
      <header className="academy-section-head">
        <h2 id="foundation-commitment-heading" className="academy-h2 font-heading">
          {content.commitment_heading}
        </h2>
      </header>
      <div className="academy-prose academy-prose-narrow font-body">
        {toParagraphs(content.commitment_paragraphs).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}