import React from 'react';
import ModuleRoutePage from '@/components/courses/ModuleRoutePage';

/**
 * Module 4 — Trade, Debt and the Global Economy. The full in-development
 * module content is no longer bundled into the client JavaScript;
 * ModuleRoutePage fetches it from the role-gated `getModuleContent` backend
 * function, which enforces the admin role server-side. Public production
 * visitors fall back to the approved "Module in development" state.
 */
export default function Module4Economics() {
  return <ModuleRoutePage moduleRoute="module-4" />;
}