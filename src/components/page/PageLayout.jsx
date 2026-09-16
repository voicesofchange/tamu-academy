import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';
import SkipLink from '@/components/a11y/SkipLink';
import StructuredData from '@/components/seo/StructuredData';

export default function PageLayout({ children }) {
  return (
    <div style={{ backgroundColor: '#24150f', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <SkipLink />
      <StructuredData />
      <TopNav />
      <main
        id="tamu-main"
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}