import React from 'react';
import MhModuleShell from '@/components/courses/MhModuleShell';
import { getMentalHealthModule } from '@/lib/mental-health-tracks';
import PageNotFound from '@/lib/PageNotFound';

const COURSE_SLUG = 'mental-health-community-and-culture';

/**
 * Reusable module route page for the Mental Health pillar course.
 * Separate from the Economics and Development curriculum route wrapper
 * (ModuleRoutePage), so this course has its own metadata lookup, message
 * set, and future content-gating path that does not touch the existing
 * economics structure.
 *
 * Phase 1 behavior:
 *   - Resolves the module's PUBLIC preview metadata (title, status,
 *     estimated time, short description, prerequisite route) from
 *     mental-health-tracks.js. This data is safe to bundle publicly.
 *   - Renders ONLY that shell metadata, the navigation position, and an
 *     appropriate unavailable message ("In Development" or "Coming
 *     Soon"). No lesson content, knowledge check, applied activity, or
 *     reflection prompt is rendered in Phase 1.
 *
 * Future phases will fetch protected module content from the role-gated
 * `getMentalHealthModule` backend function after authentication,
 * enrollment, publication status, and prerequisite checks. Until then
 * the BLOCKED-by-default behavior of the backend function (admin-only)
 * mirrors the economics provider, and the missing-progress state is
 * only evidence the learner has not started — it is never the basis for
 * leaking unpublished content.
 */
export default function MhModuleRoutePage({ moduleRoute }) {
  const found = getMentalHealthModule(COURSE_SLUG, moduleRoute);
  if (!found) return <PageNotFound />;
  return <MhModuleShell course={found.course} module={found.module} />;
}