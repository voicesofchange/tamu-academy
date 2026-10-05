import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import WaiyakiCourseProgress from '@/components/courses/waiyaki/WaiyakiCourseProgress';
import WaiyakiSources from '@/components/courses/waiyaki/WaiyakiSources';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';

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
 */
export default function WaiyakiWaHinga() {
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
        course={WAIYAKI_COURSE}
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