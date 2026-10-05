import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import { GUIDE_PROVERB, GUIDE_SECTIONS } from '@/lib/guide/sections';
import { creamText, darkText } from '@/lib/guide/styles';

const SOURCE_PLACEHOLDERS = [
  'Ubuntu and well-being source material — full reference to be added.',
  'Economic and community sources used by Ujima — full reference to be added.',
  'Digital and AI sources used by Kidijitali — full reference to be added.',
];

/**
 * GuideCredits — where the guide's sources, translations and the claims that
 * still need verification are recorded.
 */
export default function GuideCredits() {
  const proverbs = GUIDE_SECTIONS.filter((section) => section.proverb);

  return (
    <PageLayout>
      <PageMeta
        title="Further reading and credits — Safari ya Utu | Tamu Academy"
        description="Sources, proverb translations and verification notes for the Safari ya Utu Learner's Guide."
        path="/learners-guide/credits"
      />
      <div style={{ padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)', maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.75rem' }}>
            Safari ya Utu
          </span>
          <h1 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.1, margin: '0 0 0.85rem' }}>
            Further reading and credits
          </h1>
          <p className="font-guide-body" style={{ ...darkText.body, maxWidth: '42rem', margin: 0 }}>
            This guide is a Tamu Academy resource. It draws on published work, and it names its sources so learners can read further and check for themselves.
          </p>
        </header>

        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
            Sources
          </span>
          <ul style={{ margin: 0, paddingLeft: '1.15rem' }}>
            {SOURCE_PLACEHOLDERS.map((entry) => (
              <li key={entry} className="font-guide-body" style={{ ...creamText.body, marginBottom: '0.6rem' }}>
                {entry}
              </li>
            ))}
          </ul>
        </section>

        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem', borderLeft: '4px solid #D9822B' }}>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
            Claims to verify
          </span>
          <p className="font-guide-body" style={{ ...creamText.body, margin: 0 }}>
            Where a section uses a figure, a projection, a neurobiological explanation or a cultural attribution that is not settled, it is marked beside the exercise rather than presented as established fact. Those items are collected here with the source they came from, so a reviewer can confirm, correct or remove them before the section is published to learners.
          </p>
        </section>

        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
            Proverbs and their translations
          </span>
          <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.85rem', color: '#6b5744', margin: '0 0 1.25rem' }}>
            {GUIDE_PROVERB.sw} — {GUIDE_PROVERB.en} ({GUIDE_PROVERB.language})
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {proverbs.map((section) => (
              <li key={section.id} style={{ marginBottom: '0.85rem' }}>
                <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block' }}>
                  {section.number ? `${section.number} · ` : ''}{section.swahili}
                </span>
                <span className="font-guide-heading" style={{ ...creamText.heading, fontStyle: 'italic', fontSize: '0.98rem', display: 'block' }}>
                  {section.proverb.sw}
                </span>
                <span className="font-guide-body" style={{ ...creamText.body, fontSize: '0.82rem', color: '#6b5744' }}>
                  {section.proverb.en}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/learners-guide" className="font-guide-body" style={{ ...darkText.eyebrow, textDecoration: 'none' }}>
            &larr; Back to the guide
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}