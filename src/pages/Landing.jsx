import React from 'react';
import TopNav from '@/components/landing/TopNav';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import CourseTracks from '@/components/landing/CourseTracks';
import Approach from '@/components/landing/Approach';
import VideoSeries from '@/components/landing/VideoSeries';
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
        <Hero />
        <About />
        <CourseTracks />
        <Approach />
        <VideoSeries />
      </main>
      <SiteFooter />
    </div>
  );
}