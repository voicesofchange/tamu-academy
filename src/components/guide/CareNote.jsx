import React from 'react';
import { CARE_NOTE, CARE_SUPPORT_PLACEHOLDER } from '@/lib/guide/sections';
import { creamText } from '@/lib/guide/styles';

/**
 * CareNote — the highlighted support box for the Utu section. The list of
 * services by country is a placeholder the owner fills in.
 */
export default function CareNote() {
  return (
    <section
      className="guide-card"
      style={{ padding: 'clamp(1.25rem, 3vw, 1.85rem)', borderLeft: '4px solid #D9822B', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
    >
      <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
        Care note · Utu
      </span>
      <p className="font-guide-body" style={{ ...creamText.body, fontWeight: 400, margin: '0 0 1.25rem' }}>
        {CARE_NOTE}
      </p>
      <h3 className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1rem', margin: '0 0 0.75rem' }}>
        Support services
      </h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {CARE_SUPPORT_PLACEHOLDER.map((entry) => (
          <li key={entry.country} style={{ marginBottom: '0.75rem' }}>
            <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500, display: 'block' }}>
              {entry.country}
            </span>
            <span className="font-guide-body" style={{ ...creamText.body, fontSize: '0.82rem', color: '#6b5744' }}>
              {entry.services}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}