import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';
import SkipLink from '@/components/a11y/SkipLink';
import StructuredData from '@/components/seo/StructuredData';

/**
 * SiteShell — the single shared page frame for every public and learning
 * surface: skip link, structured data, top navigation, a focusable `main`
 * landmark, and the site footer.
 *
 * The page-specific shells (PageLayout, CourseOverviewLayout,
 * ModuleLessonLayout) compose this frame instead of each repeating it, so the
 * background, landmarks and accessibility affordances stay identical across
 * the whole site. Callers vary only their own `main` box through `mainStyle`.
 */
export default function SiteShell({ children, mainStyle }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--tamu-espresso)',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: 'var(--font-body)',
      }}
    >
      <SkipLink />
      <StructuredData />
      <TopNav />
      <main
        id="tamu-main"
        tabIndex={-1}
        style={{ outline: 'none', ...mainStyle }}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}