import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import ModulePageTemplate from '@/components/courses/ModulePageTemplate';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import { getEconomicsModule } from '@/lib/economics-tracks';
import { canViewInDevelopment } from '@/lib/module-access';
import PageNotFound from '@/lib/PageNotFound';

/**
 * Pilot module page — Module 1 of Understanding African Economies and the
 * Global System. Shows the full learning content only in the builder/preview
 * (or to an authenticated admin in production). Public production traffic sees
 * a "Module in development" state instead of the learning content.
 */
export default function Module1Economics() {
  const { isAuthenticated, user } = useAuth();

  const found = getEconomicsModule(
    'understanding-african-economies-and-the-global-system',
    'module-1'
  );

  if (!found) {
    return <PageNotFound />;
  }

  const allowed = canViewInDevelopment({ isAuthenticated, role: user?.role });

  return allowed ? (
    <ModulePageTemplate course={found.course} module={found.module} />
  ) : (
    <ModuleDevelopmentState course={found.course} module={found.module} />
  );
}