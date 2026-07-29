import MhModuleRoutePage from '@/components/courses/MhModuleRoutePage';

/**
 * Module 1 route for the Mental Health pillar course
 * "Ubuntu and Mental Health: Community, Culture, and Collective Healing."
 *
 * Phase 1: renders only the public shell metadata (title, "In Development"
 * status, estimated time, short description) plus navigation position
 * and an appropriate unavailable message — no lesson content yet. Phase 2
 * will fetch protected module content from the role-gated
 * `getMentalHealthModule` backend function after auth + publication +
 * prerequisite checks. The shared wrapper is already prepared to plug
 * that flow in without modifying this file.
 */
export default function MhModule1() {
  return <MhModuleRoutePage moduleRoute="module-1" />;
}