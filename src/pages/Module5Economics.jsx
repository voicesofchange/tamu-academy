import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import ModulePageTemplate from '@/components/courses/ModulePageTemplate';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import { getEconomicsModule } from '@/lib/economics-tracks';
import { canViewInDevelopment } from '@/lib/module-access';
import PageNotFound from '@/lib/PageNotFound';

/**
 * Module 5 — Inequality, Institutions and Development.
 * Mirrors Modules 1–4: full learning content in the builder/preview (or
 * for an authenticated admin in production); public production traffic sees
 * the approved "Module in development" state instead.
 */
export default function Module5Economics() {
  const { isAuthenticated, user } = useAuth();

  const found = getEconomicsModule(
    'understanding-african-economies-and-the-global-system',
    'module-5'
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