import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { canViewInDevelopment } from '@/lib/module-access';
import {
  LAUNCH_MODE,
  LAUNCH_PUBLIC_PATHS,
  LAUNCH_PUBLISHED_ARTICLE_SLUGS,
} from '@/lib/site-mode';

/**
 * SoftLaunchGate — central route guard for the soft-launch phase.
 *
 * When LAUNCH_MODE is true, only approved public routes are reachable by
 * ordinary public visitors; any other pathname redirects to "/". Authorized
 * administrators and the Base44 builder / preview environments bypass the
 * gate by reusing module-access.js's canViewInDevelopment, so internal
 * review and course / module testing are not interrupted and existing module
 * gating stays active.
 *
 * When LAUNCH_MODE is false, the gate passes through without restriction,
 * restoring the original full website without rebuilding the router.
 */
function isPathAllowed(pathname) {
  if (LAUNCH_PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith('/articles/')) {
    const slug = pathname.slice('/articles/'.length);
    return LAUNCH_PUBLISHED_ARTICLE_SLUGS.has(slug);
  }
  return false;
}

export default function SoftLaunchGate() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!LAUNCH_MODE) {
    return <Outlet />;
  }

  const bypass = canViewInDevelopment({
    isAuthenticated,
    role: user ? user.role : undefined,
  });

  if (bypass || isPathAllowed(location.pathname)) {
    return <Outlet />;
  }

  // Restricted during soft-launch — send public visitors to the homepage.
  return <Navigate to="/" replace />;
}