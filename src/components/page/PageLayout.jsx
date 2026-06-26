import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';

export default function PageLayout({ children }) {
  return (
    <div style={{ backgroundColor: '#1A130E', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <TopNav />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '8rem clamp(1.5rem, 6vw, 4rem) 6rem' }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}