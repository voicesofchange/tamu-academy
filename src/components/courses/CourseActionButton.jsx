import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StartCourseButton from '@/components/courses/StartCourseButton';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { fetchCourseResume } from '@/lib/course-resume';

const primary = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#24150f', backgroundColor: '#e8b85b',
  fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none',
  borderRadius: '2px', padding: '0.7rem 1.5rem', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
};

/**
 * CourseActionButton — a course page's one primary action:
 *  - signed out, or signed in and not enrolled: Start Learning → (the free
 *    Module 1 preview when signed out; enrol and open Module 1 when signed in);
 *  - enrolled with modules left: Continue Learning → to the next module, with
 *    "Next: Module 3 · title" and the module count done;
 *  - enrolled and finished: Review Course → (the completion page, or Module 1
 *    for a course without one).
 */
export default function CourseActionButton({ courseSlug }) {
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!isAuthenticated || !user?.id) { setResume(null); return undefined; }
    fetchCourseResume(courseSlug, user.id).then((r) => { if (!cancelled) setResume(r); });
    return () => { cancelled = true; };
  }, [courseSlug, isAuthenticated, user?.id]);

  if (!resume || !resume.enrolled) return <StartCourseButton courseSlug={courseSlug} />;

  const coursePath = `/courses/${courseSlug}`;
  const progress = fillTemplate(t('course.progressCount'), { done: resume.completedCount, total: resume.totalModules });
  const note = { color: 'rgba(243,234,216,0.7)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.75rem 0 0' };

  if (resume.nextModule) {
    return (
      <div>
        <Link to={`${coursePath}/${resume.nextModule.route}`} className="font-body" style={primary}>
          {t('course.continueLearning')} &rarr;
        </Link>
        <p className="font-body" style={note}>
          {fillTemplate(t('course.nextModule'), { number: resume.nextModule.number, title: resume.nextModule.title })}
          <br />
          {progress}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link to={resume.completionPath || `${coursePath}/module-1`} className="font-body" style={primary}>
        {t('course.reviewCourse')} &rarr;
      </Link>
      <p className="font-body" style={note}>{progress}</p>
    </div>
  );
}
