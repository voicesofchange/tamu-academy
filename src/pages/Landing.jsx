import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import TopNav from '@/components/landing/TopNav';
import Hero from '@/components/landing/Hero';
import HomePurpose from '@/components/landing/HomePurpose';
import LivingKnowledgeMap from '@/components/landing/LivingKnowledgeMap';
import CourseTracks from '@/components/landing/CourseTracks';
import Approach from '@/components/landing/Approach';
import HomeVideoPreview from '@/components/landing/HomeVideoPreview';
import HomeCurrentStage from '@/components/landing/HomeCurrentStage';
import HomeArticlesPreview from '@/components/landing/HomeArticlesPreview';
import HomeFinalCTA from '@/components/landing/HomeFinalCTA';
import HowTamuWorks from '@/components/landing/HowTamuWorks';
import HomeInstitutionalLearning from '@/components/landing/HomeInstitutionalLearning';
import SiteFooter from '@/components/landing/SiteFooter';

export default function Landing() {
  return (
    <div
      style={{
        backgroundColor: '#1A130E',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <PageMeta
        title="Tamu Academy | African-Rooted Expert-Led Online Courses"
        description="Tamu Academy is an African-rooted online learning platform that develops expert-led courses in mental health, economics, AI, public policy, and the Waiyaki wa Hinga Heritage and Leadership Collection."
        path="/"
      />
      <TopNav />
      <main id="tamu-main" tabIndex={-1} style={{ outline: 'none' }}>
        {/* 1. Hero */}
        <Hero />
        {/* 2. Purpose + Why Interdisciplinary */}
        <HomePurpose />
        {/* 3. Living Knowledge Map */}
        <LivingKnowledgeMap />
        {/* 4. Learning Areas preview */}
        <CourseTracks />
        {/* 5. How Tamu Academy Works */}
        <HowTamuWorks />
        {/* 6. Learning Model */}
        <Approach />
        {/* 7. Video Series preview */}
        <HomeVideoPreview />
        {/* 8. Articles Preview */}
        <HomeArticlesPreview />
        {/* 9. Institutional Learning */}
        <HomeInstitutionalLearning />
        {/* 10. Current Stage */}
        <HomeCurrentStage />
        {/* 11. Final CTA */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}