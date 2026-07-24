import React from 'react';
import ModuleRoutePage from '@/components/courses/ModuleRoutePage';

/**
 * Module 6 — Africa's Economic Futures (final module). The full
 * in-development module content is no longer bundled into the client
 * JavaScript; ModuleRoutePage fetches it from the role-gated
 * `getModuleContent` backend function, which enforces the admin role
 * server-side. Public production visitors fall back to the approved
 * "Module in development" state. As the final module, its server-side
 * content carries courseClosingText and endOfCourse so the template
 * renders a Course Closing section and an end-of-course navigation state.
 */
export default function Module6Economics() {
  return <ModuleRoutePage moduleRoute="module-6" />;
}