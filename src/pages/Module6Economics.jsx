import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import ModulePageTemplate from '@/components/courses/ModulePageTemplate';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import { getEconomicsModule } from '@/lib/economics-tracks';
import { canViewInDevelopment } from '@/lib/module-access';
import PageNotFound from '@/lib/PageNotFound';

/**
 * Module 6 — Africa's Economic Futures (final module).
 * Mirrors Modules 1–5: full learning content in the builder/preview (or
 * for an authenticated admin in production); public production traffic sees
 * the approved "Module in development" state instead. As the final module,
 * its data carries courseClosingText and endOfCourse so the template renders
 * a Course Closing section and an end-of-course navigation state (no Module 7).
 */
export default function Module6Economics() {
  const { isAuthenticated, user } = useAuth();

  const found = getEconomicsModule(
    'understanding-african-economies-and-the-global-system',
    'module-6'
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