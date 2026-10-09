import React from 'react';
import { toParagraphs } from '@/lib/foundation-content';

/** How the community initiative, the company and the academy relate. */
export default function FoundationRelationship({ content }) {
  return (
    <section aria-labelledby="foundation-relationship-heading" className="academy-relationship">
      <header className="academy-section-head">
        <h2 id="foundation-relationship-heading" className="academy-h2 font-heading">
          {content.relationship_heading}
        </h2>
      </header>
      <ol className="academy-steps">
        {toParagraphs(content.relationship_paragraphs).map((step, index) => (
          <li key={index} className="academy-step font-body">
            {step}
          </li>
        ))}
      </ol>
      <p className="academy-relationship-note font-body">{content.relationship_note}</p>
    </section>
  );
}