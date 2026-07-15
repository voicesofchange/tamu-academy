import { appParams } from '@/lib/app-params';

/**
 * Detect the Base44 builder / preview environment.
 *
 * The builder preview runs the Vite dev server, so import.meta.env.DEV is true
 * there and Base44 injects VITE_BASE44_APP_BASE_URL pointing at localhost. We
 * also fall back to the runtime hostname. This is deliberately permissive:
 * anything that is not clearly a local preview is treated as production.
 */
function isPreviewEnvironment() {
  try {
    if (import.meta.env && import.meta.env.DEV) return true;
  } catch (err) {
    /* import.meta.env always available in Vite; ignore */
  }
  const baseUrl = appParams.appBaseUrl;
  if (typeof baseUrl === 'string' && (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1'))) {
    return true;
  }
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname || '';
    if (host.includes('localhost') || host.includes('127.0.0.1')) return true;
  }
  return false;
}

/**
 * Whether the viewer may see in-development module content.
 * True in the builder/preview, or for an authenticated admin reviewing a
 * production deployment. False for the public production deployment, where
 * in-development modules must be gated behind a "Module in development" state.
 *
 * @param {{ isAuthenticated?: boolean, role?: string }=} authOverride
 */
export function canViewInDevelopment(authOverride = {}) {
  if (isPreviewEnvironment()) return true;
  if (authOverride.isAuthenticated && authOverride.role === 'admin') return true;
  return false;
}