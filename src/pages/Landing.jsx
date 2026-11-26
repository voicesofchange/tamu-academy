import React, { useState } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import TopNav from '@/components/landing/TopNav';
import HomeDiscovery from '@/components/landing/HomeDiscovery';
import HomeProofStats from '@/components/landing/HomeProofStats';
import HomeHowItWorks from '@/components/landing/HomeHowItWorks';
import HomeLearningAreas from '@/components/landing/HomeLearningAreas';
import HomeLearnerVoices from '@/components/landing/HomeLearnerVoices';
import HomePurpose from '@/components/landing/HomePurpose';
import HomeFinalCTA from '@/components/landing/HomeFinalCTA';
import SiteFooter from '@/components/landing/SiteFooter';

// Temporary public front door. While the academy and its first learning
// pathway remain in development, the root homepage renders a focused,
// editorial coming-soon surface (LaunchLanding). The original full homepage
// is preserved below and is restored by setting LAUNCH_MODE to false.
import LaunchLanding from '@/components/landing/LaunchLanding';
import { LAUNCH_MODE } from '@/lib/site-mode';

export default function Landing() {
  // The learning-area filter is shared by the course grid and the learning
  // areas section, which sets it and scrolls back to the grid.
  const [area, setArea] = useState('all');
  const showArea = (id) => {
    setArea(id);
    const grid = document.getElementById('home-courses');
    if (grid) {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      grid.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

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
        {/* 1. Short action hero with search, then the featured course grid
               with its learning-area filter, on parchment */}
        <HomeDiscovery area={area} onAreaChange={setArea} />
        {/* 2. Live figures */}
        <HomeProofStats />
        {/* 3. The four learner steps */}
        <HomeHowItWorks />
        {/* 4. The five learning areas; each filters the grid above */}
        <HomeLearningAreas onSelect={showArea} />
        {/* 5. Learner voices */}
        <HomeLearnerVoices />
        {/* 6. Mission, philosophy and cultural framing, near the end */}
        <HomePurpose />
        {/* 7. Final call to action */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}