import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import TopNav from '@/components/landing/TopNav';
import Hero from '@/components/landing/Hero';
import HomeRoleEntry from '@/components/landing/HomeRoleEntry';
import HowTamuWorks from '@/components/landing/HowTamuWorks';
import HomeProofStats from '@/components/landing/HomeProofStats';
import CourseTracks from '@/components/landing/CourseTracks';
import LivingKnowledgeMap from '@/components/landing/LivingKnowledgeMap';
import HomeLearnerVoices from '@/components/landing/HomeLearnerVoices';
import HomePurpose from '@/components/landing/HomePurpose';
import HomeGoDeeper from '@/components/landing/HomeGoDeeper';
import HomeFinalCTA from '@/components/landing/HomeFinalCTA';
import SiteFooter from '@/components/landing/SiteFooter';

// Temporary public front door. While the academy and its first learning
// pathway remain in development, the root homepage renders a focused,
// editorial coming-soon surface (LaunchLanding). The original full homepage
// is preserved below and is restored by setting LAUNCH_MODE to false.
import LaunchLanding from '@/components/landing/LaunchLanding';
import { LAUNCH_MODE } from '@/lib/site-mode';

export default function Landing() {
  if (LAUNCH_MODE) {
    return <LaunchLanding />;
  }

  return (
    <div
      style={{
        backgroundColor: '#24150f',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <PageMeta
        title="Tamu Academy | Tamu 'Sweet' learning for a connected world"
        description="Tamu Academy is a diaspora-rooted online learning platform that develops expert-led courses in mental health, economics, AI, public policy, and the Waiyaki wa Hinga Heritage and Leadership Collection."
        path="/"
      />
      <TopNav />
      <main id="tamu-main" tabIndex={-1} style={{ outline: 'none' }}>
        {/* 1. Hero — mission-first promise */}
        <Hero />
        {/* 2. Role-based entry — "Begin as a…" */}
        <HomeRoleEntry />
        {/* 3. How it works — 4 numbered steps */}
        <HowTamuWorks />
        {/* 4. Proof stats — clean stat row */}
        <HomeProofStats />
        {/* 5. Learning areas */}
        <CourseTracks />
        {/* 6. Knowledge connections */}
        <LivingKnowledgeMap />
        {/* 7. Learner voices */}
        <HomeLearnerVoices />
        {/* 8. Values — mission & interdisciplinary purpose */}
        <HomePurpose />
        {/* 9. Go deeper — articles, videos, resources */}
        <HomeGoDeeper />
        {/* 10. Final CTA */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}