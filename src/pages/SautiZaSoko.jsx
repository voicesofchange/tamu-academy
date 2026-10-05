import React from 'react';
import { Link } from 'react-router-dom';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';
import StatusBadge from '@/components/page/StatusBadge';
import SokoCourseProgress from '@/components/courses/soko/SokoCourseProgress';
import {
  SAUTI_ZA_SOKO_COURSE,
  SAUTI_ZA_SOKO_COURSE_SLUG,
  SAUTI_ZA_SOKO_PEER_TRACK,
} from '@/lib/sauti-za-soko-tracks';

/**
 * Sauti za Soko — the course overview page. It reuses the shared course
 * overview layout and supplies its own progress component, plus a section
 * describing the optional Peer Facilitator track.
 */
export default function SautiZaSoko() {
  return (
    <CoursePageTemplate
      course={SAUTI_ZA_SOKO_COURSE}
      progressSlot={<SokoCourseProgress />}
    >
      <CourseOverviewSection
        surface="light"
        eyebrow="Optional Track"
        heading={SAUTI_ZA_SOKO_PEER_TRACK.title}
      >
        <div style={{ padding: '28px 32px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <StatusBadge label={SAUTI_ZA_SOKO_PEER_TRACK.certificate} tone="light" />
          </div>
          <p className="font-body" style={{ color: '#725a46', fontSize: '15px', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.25rem' }}>
            {SAUTI_ZA_SOKO_PEER_TRACK.summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '1.5rem' }}>
            <div style={{ padding: '16px 18px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffdf8' }}>
              <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                Entry requirement
              </span>
              <span className="font-body" style={{ color: '#725a46', fontSize: '13px', lineHeight: 1.6 }}>
                {SAUTI_ZA_SOKO_PEER_TRACK.entryRequirement}
              </span>
            </div>
            <div style={{ padding: '16px 18px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffdf8' }}>
              <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                Estimated time
              </span>
              <span className="font-body" style={{ color: '#725a46', fontSize: '13px', lineHeight: 1.6 }}>
                {SAUTI_ZA_SOKO_PEER_TRACK.estimatedTime}
              </span>
            </div>
          </div>
          <Link
            to={`/courses/${SAUTI_ZA_SOKO_COURSE_SLUG}/peer-facilitator`}
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#9b5d1d', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #c18a36', paddingBottom: '2px' }}
          >
            View the Peer Facilitator track &rarr;
          </Link>
        </div>
      </CourseOverviewSection>
    </CoursePageTemplate>
  );
}