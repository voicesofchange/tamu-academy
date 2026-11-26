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
 *
 * `overflowX` defaults to 'hidden'. A page with sticky parts (the template
 * course player) passes 'clip', which also stops sideways scrolling but,
 * unlike 'hidden', does not turn the frame into a scroll container — so
 * position: sticky keeps working inside it.
 */
export default function SiteShell({ children, mainStyle, overflowX = 'hidden' }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--tamu-espresso)',
        minHeight: '100vh',
        width: '100%',
        overflowX,
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