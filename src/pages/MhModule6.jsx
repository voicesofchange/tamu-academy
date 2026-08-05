import MhModuleRoutePage from '@/components/courses/MhModuleRoutePage';

/**
 * Module 6 route for the Mental Health pillar course.
 * Renders the protected lesson for authorized administrators or
 * the public "Coming Soon" shell for everyone else.
 */
export default function MhModule6() {
  return <MhModuleRoutePage moduleRoute="module-6" />;
}