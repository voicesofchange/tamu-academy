import React from 'react';
import ModuleRoutePage from '@/components/courses/ModuleRoutePage';

/**
 * Module 3 — Inflation, Employment and the Cost of Living. The full
 * in-development module content is no longer bundled into the client
 * JavaScript; ModuleRoutePage fetches it from the role-gated
 * `getModuleContent` backend function, which enforces the admin role
 * server-side. Public production visitors fall back to the approved
 * "Module in development" state.
 */
export default function Module3Economics() {
  return <ModuleRoutePage moduleRoute="module-3" />;
}