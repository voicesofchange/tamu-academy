import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { hasCourseEnrollment } from '@/lib/course-enrollment';

/**
 * Whether the signed-in learner is enrolled in a course.
 *
 * status: 'checking' | 'enrolled' | 'not_enrolled' | 'unknown'
 * 'unknown' means the lookup itself failed, so callers keep their existing
 * state rather than guessing that the learner is not enrolled.
 */
export default function useCourseEnrollment(courseSlug) {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;

    if (isLoadingAuth) return undefined;
    if (!isAuthenticated || !user) {
      setStatus('not_enrolled');
      return undefined;
    }

    setStatus('checking');
    hasCourseEnrollment(courseSlug, user.id)
      .then((enrolled) => {
        if (!cancelled) setStatus(enrolled ? 'enrolled' : 'not_enrolled');
      })
      .catch(() => {
        if (!cancelled) setStatus('unknown');
      });

    return () => {
      cancelled = true;
    };
  }, [courseSlug, isAuthenticated, isLoadingAuth, user]);

  return { status, isAuthenticated };
}