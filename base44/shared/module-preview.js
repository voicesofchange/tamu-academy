/**
 * The free Module 1 preview — the one rule every course's module function
 * applies to a visitor who is not signed in.
 *
 * A request with no signed-in user is served only when it asks for the
 * preview explicitly ({ preview: true }) and names the course's first
 * module, and the module function then also requires that module to be
 * published. Everything else still answers 401. The preview reads exactly
 * what a learner reads — answer keys are stripped as usual — and records
 * nothing: no enrollment, no progress, no module-open event.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 */
export const PREVIEW_MODULE_ROUTE = 'module-1';

/** True when a signed-out request is a valid preview request for this module. */
export function isModulePreviewRequest(user, body, moduleRoute) {
  return !user && !!body && body.preview === true && moduleRoute === PREVIEW_MODULE_ROUTE;
}
