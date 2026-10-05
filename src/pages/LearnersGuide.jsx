import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import GuideHomeHero from '@/components/guide/GuideHomeHero';
import GuidePhaseSection from '@/components/guide/GuidePhaseSection';
import GuideJourneyBand from '@/components/guide/GuideJourneyBand';
import GuideClosingSection from '@/components/guide/GuideClosingSection';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import { useAuth } from '@/lib/AuthContext';
import { GUIDE_PHASES, TOTAL_SECTIONS } from '@/lib/guide/sections';
import { countStarted, loadProgressMap } from '@/lib/guide/guideProgress';

/**
 * LearnersGuide — the guide home, laid out like the Courses page: a hero, the
 * pathway of sections grouped in phases, a band showing how far the learner
 * has walked, and a closing call to the courses. Private to the signed-in
 * learner.
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

  const started = countStarted(progressMap);
  const done = Object.values(progressMap).filter((status) => status === 'done').length;

  return (
    <PageLayout>
      <PageMeta
        title="Safari ya Utu — Learner's Guide | Tamu Academy"
        description="A private companion workbook for every Tamu Academy learner: ten sections of reflection, skills and returning to the mirror."
        path="/learners-guide"
        noindex
      />

      <GuideHomeHero started={started} total={TOTAL_SECTIONS} />

      {/* The pathway — the guide's sections, grouped in phases */}
      <section id="section-pathway" style={{ padding: '76px clamp(1.5rem,6vw,88px)', background: '#F1E7D3', color: '#33241A', scrollMarginTop: '90px' }}>
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)', maxWidth: '720px' }}>
          <span className="font-guide-body" style={{ color: '#8A650B', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            The sections
          </span>
          <h2 className="font-guide-heading" style={{ color: '#33241A', fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.1, fontWeight: 600, margin: '10px 0 0.8rem' }}>
            Ten sections, one journey
          </h2>
          <p className="font-guide-body" style={{ color: '#6b5744', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
            The guide runs in three phases. You can follow them in order, or step into whichever section meets you where you are.
          </p>
        </div>

        {GUIDE_PHASES.map((phase, index) => (
          <GuidePhaseSection key={phase.id} phase={phase} progressMap={progressMap} isFirst={index === 0} />
        ))}
      </section>

      <GuideJourneyBand started={started} done={done} total={TOTAL_SECTIONS} />
      <GuideClosingSection isAdmin={user?.role === 'admin'} />

      <TamuGuideWidget />
    </PageLayout>
  );
}