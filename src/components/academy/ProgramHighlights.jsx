import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ProgramHighlights — combines the Proposed Pilot Programme and the Heritage
 * and Leadership Collection sections of the public Academy page. Both are
 * editorial/preview content; neither link to gated module routes or imply
 * open enrollment.
 */
const PILOT = {
  program: 'Ubuntu and the Public Good',
  description:
    'A four-week applied learning experience examining how values, institutions, economics, and community knowledge shape public decisions.',
  details: [
    { label: 'Audience', value: 'Young adults ages 18–30' },
    { label: 'Format', value: 'Four weekly facilitated sessions' },
    { label: 'Delivery', value: 'Online or partner-hosted' },
    { label: 'Final learner product', value: 'One-page community-centered policy memo' },
  ],
  status: 'Under development — available for partnership discussion',
  actionLabel: 'Discuss a Pilot Partnership',
};

const HERITAGE = {
  title: 'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory',
  description:
    'A research- and memory-based learning collection exploring leadership, resistance, land, governance, oral history, and contemporary significance.',
  status: 'In Development',
};

export default function ProgramHighlights() {
  return (
    <>
      <section
        aria-labelledby="pilot-heading"
        className="academy-program academy-pilot"
      >
        <header className="academy-section-head">
          <p className="academy-eyebrow">Proposed Pilot Programme</p>
          <h2 id="pilot-heading" className="academy-h2 font-heading">
            {PILOT.program}
          </h2>
          <p className="academy-section-support">{PILOT.description}</p>
        </header>

        <dl className="academy-program-details">
          {PILOT.details.map((d) => (
            <div className="academy-program-detail" key={d.label}>
              <dt className="academy-detail-label font-body">{d.label}</dt>
              <dd className="academy-detail-value font-body">{d.value}</dd>
            </div>
          ))}
        </dl>

        <p className="academy-status academy-status-line academy-status-center">
          <span className="academy-status-dot" aria-hidden="true" />
          {PILOT.status}
        </p>

        <div className="academy-cta-row">
          <Link to="/contact" className="academy-cta-secondary font-body">
            {PILOT.actionLabel}
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="heritage-heading"
        className="academy-program academy-heritage"
      >
        <header className="academy-section-head">
          <p className="academy-eyebrow">Heritage and Leadership Collection</p>
          <h2 id="heritage-heading" className="academy-h2 font-heading">
            {HERITAGE.title}
          </h2>
          <p className="academy-section-support">{HERITAGE.description}</p>
          <p className="academy-status academy-status-line academy-status-center">
            <span className="academy-status-dot" aria-hidden="true" />
            {HERITAGE.status}
          </p>
        </header>
      </section>

      <style>{`
.academy-program {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 880px;
  margin: 0 auto;
  border-top: 1px solid rgba(212,161,42,0.12);
}
.academy-program-details {
  margin: 1.75rem 0 0;
  display: grid;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .academy-program-details {
    grid-template-columns: 1fr 1fr;
  }
}
.academy-program-detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.95rem 1.05rem;
  border: 1px solid rgba(212,161,42,0.18);
  border-radius: 3px;
  background-color: rgba(245,239,224,0.02);
}
.academy-detail-label {
  color: #D4A12A;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
}
.academy-detail-value {
  color: rgba(245,239,224,0.85);
  font-size: 0.94rem;
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
}
.academy-status-center {
  justify-content: center;
  margin-top: 1.5rem;
}
`}</style>
    </>
  );
}