import React from 'react';
import ModulePageTemplate from '@/components/courses/ModulePageTemplate';
import { getEconomicsModule } from '@/lib/economics-tracks';
import PageNotFound from '@/lib/PageNotFound';

/**
 * Pilot module page — Module 1 of Understanding African Economies and the
 * Global System. Thin wrapper that resolves module data by route key and
 * renders it through the shared ModulePageTemplate.
 */
export default function Module1Economics() {
  const found = getEconomicsModule(
    'understanding-african-economies-and-the-global-system',
    'module-1'
  );

  if (!found) {
    return <PageNotFound />;
  }

  return <ModulePageTemplate course={found.course} module={found.module} />;
}