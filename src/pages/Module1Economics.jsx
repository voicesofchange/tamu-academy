import React from 'react';
import ModuleRoutePage from '@/components/courses/ModuleRoutePage';

/**
 * Pilot module page — Module 1 of Understanding African Economies and the
 * Global System. The full in-development module content is no longer
 * bundled into the client JavaScript; ModuleRoutePage fetches it from the
 * role-gated `getModuleContent` backend function, which enforces the admin
 * role server-side. Public production visitors fall back to the approved
 * "Module in development" state.
 */
export default function Module1Economics() {
  return <ModuleRoutePage moduleRoute="module-1" />;
}