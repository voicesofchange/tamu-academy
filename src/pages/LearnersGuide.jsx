import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import GuideHomeHero from '@/components/guide/GuideHomeHero';
import GuideHowToUse from '@/components/guide/GuideHowToUse';
import GuideSectionCard from '@/components/guide/GuideSectionCard';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import { useAuth } from '@/lib/AuthContext';
import { GUIDE_SECTIONS } from '@/lib/guide/sections';
import { loadProgressMap } from '@/lib/guide/guideProgress';
import { darkText } from '@/lib/guide/styles';

/**
 * LearnersGuide — the guide home: hero, how to use it, and the ten section
 * cards with the learner's own progress. Private to the signed-in learner.
 */
export default function LearnersGuide() {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    loadProgressMap(user.id)
      .then((map) => {
        if (!cancelled) setProgressMap(map);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <PageLayout>
      <PageMeta
        title="Safari ya Utu — Learner's Guide | Tamu Academy"
        description="A private companion workbook for every Tamu Academy learner: ten sections of reflection, skills and returning to the mirror."
        path="/learners-guide"
        noindex
      />
      <div style={{ padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)', maxWidth: '1100px', margin: '0 auto' }}>
        <GuideHomeHero />
        <GuideHowToUse />

        <section style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
            The sections
          </span>
          <h2 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.25, margin: '0 0 1.25rem' }}>
            Ten sections, one journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))', gap: '1rem' }}>
            {GUIDE_SECTIONS.map((section) => (
              <GuideSectionCard key={section.id} section={section} status={progressMap[section.id] || 'not_started'} />
            ))}
          </div>
        </section>

        <div style={{ borderTop: darkText.rule, paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
          <Link to="/learners-guide/credits" className="font-guide-body" style={{ ...darkText.eyebrow, textDecoration: 'none' }}>
            Further reading and credits
          </Link>
          {user?.role === 'admin' && (
            <Link to="/learners-guide/insights" className="font-guide-body" style={{ ...darkText.eyebrow, textDecoration: 'none' }}>
              Guide insights (admin)
            </Link>
          )}
        </div>
      </div>
      <TamuGuideWidget />
    </PageLayout>
  );
}