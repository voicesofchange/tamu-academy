import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import TopNav from '@/components/landing/TopNav';
import HomeDiscovery from '@/components/landing/HomeDiscovery';
import HomeRoleEntry from '@/components/landing/HomeRoleEntry';
import HomeProofStats from '@/components/landing/HomeProofStats';
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
        description="Tamu Academy is a global learning community offering expert-led courses in mental health, economics, artificial intelligence, public policy, culture, history, and global affairs."
        path="/"
      />
      <TopNav />
      <main id="tamu-main" tabIndex={-1} style={{ outline: 'none' }}>
        {/* 1. Course discovery first: short action hero, live search, topic
               pills and the course grid they filter */}
        <HomeDiscovery />
        {/* 2. Live figures and how learning works */}
        <HomeProofStats />
        {/* 3. Role-based entry — "Begin as a…" */}
        <HomeRoleEntry />
        {/* 4. Learner voices */}
        <HomeLearnerVoices />
        {/* 5. Mission, philosophy and cultural framing, near the end */}
        <HomePurpose />
        {/* 6. Open learning resources */}
        <HomeGoDeeper />
        {/* 7. Final call to action */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}