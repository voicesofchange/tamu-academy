/**
 * MENTAL HEALTH COURSE CERTIFICATE — server-side-only configuration.
 * ============================================================================
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * Defines the approved certificate content for the Mental Health,
 * Community and Culture course completion certificate.
 */

export const MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE = 'Mental Health, Community and Culture';

export const MENTAL_HEALTH_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed all seven modules of the course Mental Health, Community and Culture, including the required media, activities, interactive scenarios, and knowledge checks. This certificate confirms completion of an educational course. It does not constitute professional licensing, clinical certification, accreditation, or authorization to provide mental health services.';

export const MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG = 'mental-health-community-and-culture';

/**
 * The seven module routes in order. Course completion requires every
 * module to have a ModuleProgress row with status 'completed'.
 */
export const MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
];