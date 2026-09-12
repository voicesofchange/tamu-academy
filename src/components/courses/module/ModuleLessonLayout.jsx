import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';
import SkipLink from '@/components/a11y/SkipLink';
import StructuredData from '@/components/seo/StructuredData';

/**
 * ModuleLessonLayout — deep-umber surface for module lesson and progress
 * pages. Scoped to the learner journey so the shared PageLayout (used by
 * non-learner pages) is untouched.
 */
export default function ModuleLessonLayout({ children }) {
  return (
    <div style={{ backgroundColor: '#24150f', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <SkipLink />
      <StructuredData />
      <TopNav />
      <main
        id="tamu-main"
        tabIndex={-1}
        style={{ maxWidth: '820px', margin: '0 auto', padding: '7rem clamp(1.5rem,6vw,3rem) 6rem', outline: 'none' }}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}