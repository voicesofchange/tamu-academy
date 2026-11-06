import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import WaiyakiCourseProgress from '@/components/courses/waiyaki/WaiyakiCourseProgress';
import WaiyakiSources from '@/components/courses/waiyaki/WaiyakiSources';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse } from '@/lib/i18n/restore-course';

const sourceLink = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'rgba(232,184,91,0.85)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.28)',
  borderRadius: '2px',
  padding: '0.45rem 0.85rem',
};

/**
 * Waiyaki wa Hinga — the course overview page. It reuses the shared course
 * overview layout and supplies its own progress component, which handles
 * enrollment, resume and the certificate link.
 *
 * The course's reading list is served by the public getWaiyakiSources function
 * (the bibliography is server-side only), and each module card carries a link
 * to that section, so the sources are reachable from the overview and from
 * every module entry.
 *
 * The course's own text — its title, description, who it is for, outcomes and
 * each module's title and summary — is translated through the shared system.
 * The protected name in the title (Waiyaki wa Hinga) is held verbatim by the
 * translation endpoint. The slug and module routes are restored afterwards.
 */
export default function WaiyakiWaHinga() {
  const { content } = useTranslatedContent('waiyaki-course-overview', WAIYAKI_COURSE);
  const course = restoreCourse(content, WAIYAKI_COURSE);

  // undefined = still loading, null = could not be loaded, object = ready.
  const [sources, setSources] = useState(undefined);

  useEffect(() => {
    let active = true;
    base44.functions
      .invoke('getWaiyakiSources', {})
      .then((response) => {
        if (active) setSources(response?.data?.sources ?? null);
      })
      .catch(() => {
        if (active) setSources(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="tamu-waiyaki-overview">
      <CoursePageTemplate
        course={course}
        progressSlot={<WaiyakiCourseProgress />}
        moduleFooter={
          <a href="#course-sources" className="font-body" style={sourceLink}>
            Sources &amp; further reading &rarr;
          </a>
        }
      >
        <WaiyakiSources sources={sources} />
      </CoursePageTemplate>
    </div>
  );
}