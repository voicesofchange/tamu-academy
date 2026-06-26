import React from 'react';
import TopNav from '@/components/landing/TopNav';
import Hero from '@/components/landing/Hero';
import HomePurpose from '@/components/landing/HomePurpose';
import CourseTracks from '@/components/landing/CourseTracks';
import FeaturedProgramme from '@/components/landing/FeaturedProgramme';
import Approach from '@/components/landing/Approach';
import VideoSeries from '@/components/landing/VideoSeries';
import HomeFounder from '@/components/landing/HomeFounder';
import HomeCurrentStage from '@/components/landing/HomeCurrentStage';
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
      <TopNav />
      <main>
        {/* 1. Hero */}
        <Hero />
        {/* 2. Purpose + Why Interdisciplinary */}
        <HomePurpose />
        {/* 3. Learning Areas preview */}
        <CourseTracks />
        {/* 4. Featured Programme */}
        <FeaturedProgramme />
        {/* 5. Learning Model */}
        <Approach />
        {/* 6. Insights / Video series */}
        <VideoSeries />
        {/* 7. Founder */}
        <HomeFounder />
        {/* 8. Current Stage */}
        <HomeCurrentStage />
        {/* 9. Final CTA */}
        <HomeFinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}