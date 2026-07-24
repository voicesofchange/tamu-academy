import React from 'react';

/**
 * LearningAreas — public, editorial preview of the four connected Tamu
 * Academy learning areas. Used on the public Academy page only. Does NOT
 * link to gated course routes or expose module/lesson content.
 */
const LEARNING_AREAS = [
  {
    number: '01',
    area: 'Mind and Wellbeing',
    course: 'Mental Health, Community and Culture',
    description:
      'How wellbeing is shaped by stress, culture, relationships, community support, institutions, and access to care.',
  },
  {
    number: '02',
    area: 'Economics and Development',
    course: 'Understanding African Economies and the Global System',
    description:
      'How economic systems, inequality, trade, debt, institutions, and global relationships shape African development.',
  },
  {
    number: '03',
    area: 'AI, Technology and Digital Futures',
    course: 'AI Literacy for African and Diaspora Leaders',
    description:
      'A practical introduction to generative AI, responsible use, bias, work, governance, and technological change.',
  },
  {
    number: '04',
    area: 'Public Policy and Governance',
    course: 'Power, Policy and the Public Good',
    description:
      'How public decisions are developed, implemented, evaluated, and shaped by institutions and communities.',
  },
];

export default function LearningAreas() {
  return (
    <section
      aria-labelledby="learning-areas-heading"
      id="learning-areas"
      className="academy-learning-areas"
    >
      <header className="academy-section-head">
        <p className="academy-eyebrow">Learning Areas</p>
        <h2 id="learning-areas-heading" className="academy-h2 font-heading">
          Four connected areas of learning
        </h2>
        <p className="academy-section-support">
          Tamu Academy is developing its first course and program portfolio across four connected areas of learning.
        </p>
      </header>

      <ol className="academy-areas-list">
        {LEARNING_AREAS.map((item) => (
          <li key={item.number} className="academy-area-row">
            <div className="academy-area-index">
              <span className="academy-area-number font-heading" aria-hidden="true">
                {item.number}
              </span>
            </div>
            <div className="academy-area-text">
              <p className="academy-eyebrow academy-eyebrow-mute">{item.area}</p>
              <h3 className="academy-area-course font-heading">{item.course}</h3>
              <p className="academy-area-desc font-body">{item.description}</p>
              <p className="academy-status academy-status-line">
                <span className="academy-status-dot" aria-hidden="true" />
                In Development
              </p>
            </div>
          </li>
        ))}
      </ol>

      <style>{`
.academy-learning-areas {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 1080px;
  margin: 0 auto;
}
.academy-areas-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 768px) {
  .academy-areas-list {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 2.25rem;
  }
}
.academy-area-row {
  display: flex;
  gap: 1.25rem;
  padding: 1.6rem 1.35rem;
  background-color: rgba(245,239,224,0.02);
  border: 1px solid rgba(212,161,42,0.18);
  border-radius: 4px;
  align-items: flex-start;
  transition: border-color 0.25s ease, background-color 0.25s ease;
}
.academy-area-row:hover {
  border-color: rgba(212,161,42,0.4);
  background-color: rgba(245,239,224,0.04);
}
.academy-area-index {
  flex: 0 0 auto;
}
.academy-area-number {
  font-size: clamp(1.7rem, 3.4vw, 2.1rem);
  color: rgba(212,161,42,0.75);
  line-height: 1;
  letter-spacing: 0.02em;
  display: block;
}
.academy-area-text {
  flex: 1 1 auto;
  min-width: 0;
}
.academy-area-course {
  color: #F5EFE0;
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  font-weight: 400;
  line-height: 1.25;
  margin: 0.25rem 0 0.5rem;
}
.academy-area-desc {
  color: rgba(245,239,224,0.7);
  font-size: 0.92rem;
  line-height: 1.6;
  font-weight: 300;
  margin: 0 0 0.75rem;
}
@media (max-width: 767px) {
  .academy-area-row { flex-direction: row; }
}
@media (max-width: 360px) {
  .academy-area-row { flex-direction: column; gap: 0.5rem; }
}
`}</style>
    </section>
  );
}