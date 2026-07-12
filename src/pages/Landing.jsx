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
        title="Tamu Academy | Learning Across Cultures. Leading Through Change."
        description="Tamu Academy is an African-rooted learning platform that helps young people understand themselves, power, and the world through accessible videos, practical learning experiences, and community-centered programmes."
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
        {/* 5. Learning Model */}
        <Approach />
        {/* 6. Video Series preview */}
        <HomeVideoPreview />
        {/* 7. Articles Preview */}
        <HomeArticlesPreview />
        {/* 8. Current Stage */}
        <HomeCurrentStage />
        {/* 9. Final CTA */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}