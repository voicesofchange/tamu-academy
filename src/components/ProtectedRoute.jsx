import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import LearnerCategoryPrompt from '@/components/display/LearnerCategoryPrompt';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

/**
 * ProtectedRoute — gates learner-only routes. When unauthenticated,
 * redirects to /login with a returnTo query param preserving the
 * intended destination so the learner returns to it after sign-in.
 *
 * The `unauthenticatedElement` prop is retained for backwards
 * compatibility but should be omitted — the default behavior
 * (redirect to login with returnTo) is preferred.
 */
export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  // The page the visitor asked for, carried on the sign-in link so they land
  // back on it after logging in or registering. safeReturnTo() validates it on
  // the auth pages before using it.
  const returnTo = encodeURIComponent(location.pathname + location.search);
  const loginTarget = `/login?returnTo=${returnTo}`;

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement || <Navigate to={loginTarget} replace />;
  }

  if (!isAuthenticated) {
    // Always carry the destination. Letting `unauthenticatedElement` win here
    // would drop it, so the visitor would land on the homepage instead of the
    // page they opened.
    return <Navigate to={loginTarget} replace />;
  }

  // The learner-group prompt rides along with every signed-in route, so a
  // learner whose profile has no category yet is asked on their first visit
  // wherever they land. It renders nothing once the category is saved.
  return (
    <>
      <Outlet />
      <LearnerCategoryPrompt />
    </>
  );
}