import React from 'react';
import SiteShell from '@/components/page/SiteShell';

/**
 * PageLayout — the standard reading page: a full-width main area whose
 * sections manage their own measure (see PageSection / PageHero).
 */
export default function PageLayout({ children }) {
  return <SiteShell>{children}</SiteShell>;
}