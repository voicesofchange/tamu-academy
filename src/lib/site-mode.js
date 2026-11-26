/**
 * Tamu Academy — Site Mode (single source of truth)
 *
 *   LAUNCH_MODE = true   public soft-launch. Only approved public routes are
 *                        reachable by ordinary public visitors; any other
 *                        original pathname redirects to "/". Authorized
 *                        administrators and the Base44 builder / preview
 *                        bypass the gate so internal review and course /
 *                        module testing are not interrupted.
 *   LAUNCH_MODE = false  full original website. Every existing route works
 *                        normally with no redirect — no rebuild required.
 *
 * Read by src/pages/Landing.jsx (homepage switch) and
 * src/components/SoftLaunchGate.jsx (route guard). Change in one place only.
 */
export const LAUNCH_MODE = false;

/**
 * Exact public paths allowed during soft-launch. Any pathname not in this
 * set redirects to "/" for
 * ordinary public visitors. Static assets and system files do not pass
 * through the React router and are unaffected.
 */
export const LAUNCH_PUBLIC_PATHS = new Set([
  '/',
  '/partnership-inquiry',
  '/privacy',
]);