import React from 'react';
import CoursePageTemplate from '@/components/courses/CoursePageTemplate';
import BuildingWealthCourseProgress from '@/components/courses/wealth/BuildingWealthCourseProgress';
import {
  BUILDING_WEALTH_TOGETHER_COURSE,
  WEALTH_TRACKS_WITH_MODULES,
  WEALTH_CAPSTONE_OPTIONS,
} from '@/lib/building-wealth-together-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { restoreCourse, restoreTracks } from '@/lib/i18n/restore-course';

const BASE_COURSE = BUILDING_WEALTH_TOGETHER_COURSE;

/**
 * Building Wealth Together — the course overview page, on the shared
 * CoursePageTemplate.
 *
 * The syllabus lists the modules in the course's three tracks (Track 1, the
 * shared core, then the two pathways) under one accordion; the module rhythm
 * follows the syllabus; and the capstone options sit under the practical
 * deliverable. The page reads only the public preview metadata in
 * src/lib/building-wealth-together-tracks.js; module content is fetched one
 * module at a time after the server-side access checks.
 */
const CONTENT = {
  structureBody: 'Everyone completes Track 1, the shared core. You can then take both pathways, or focus on the one that fits your goals before the capstone. Every module is open in this course: the pathway is a study focus, not a lock.',
  rhythmHeading: 'How Each Module Works',
  rhythmBody: 'Every module follows the same rhythm, so you always know where you are.',
  rhythmNote: 'Everything you need is in the lessons and free videos. No purchases are required.',
  capstoneOptions: 'Capstone options',
  capstoneNote: 'Finish all nine modules, then submit the capstone option that best fits your goals.',
  capstoneOptionText: WEALTH_CAPSTONE_OPTIONS.map(({ buildsOn, label }) => ({ buildsOn, label })),
};

export default function BuildingWealthTogether() {
  // The course's own text is translated — its title, description, who it is
  // for, outcomes, and each module's title and summary in its track. The slug
  // and module routes are restored afterwards so every link keeps its route.
  const { content } = useTranslatedContent('wealth-course-overview', BASE_COURSE);
  const course = restoreCourse(content, BASE_COURSE);
  const { content: trackContent } = useTranslatedContent('wealth-course-tracks', WEALTH_TRACKS_WITH_MODULES);
  const tracks = restoreTracks(trackContent, WEALTH_TRACKS_WITH_MODULES);
  const { content: c } = useTranslatedContent('wealth-course-page', CONTENT);

  const groups = tracks.map((track, i) => ({
    id: track.id,
    eyebrow: track.audience,
    label: track.label,
    summary: track.summary,
    routes: WEALTH_TRACKS_WITH_MODULES[i].modules.map((m) => m.route),
  }));

  const rhythm = (
    <div style={{ border: '1px solid #dcc8a8', borderRadius: '10px', background: '#fffaf1', padding: '1.4rem 1.5rem' }}>
      <h3 className="font-heading" style={{ color: '#39251b', fontSize: '1.25rem', fontWeight: 500, margin: '0 0 0.5rem' }}>{c.rhythmHeading}</h3>
      <p className="font-body" style={{ color: '#725a46', fontSize: '14.5px', lineHeight: 1.7, margin: '0 0 0.9rem' }}>{c.rhythmBody}</p>
      <ol className="font-body" style={{ color: '#5f4531', fontSize: '14px', lineHeight: 1.9, margin: 0, paddingLeft: '1.25rem' }}>
        {(course.moduleRhythm || []).map((step) => <li key={step}>{step}</li>)}
      </ol>
      <p className="font-body" style={{ color: '#725a46', fontSize: '13.5px', lineHeight: 1.7, margin: '0.9rem 0 0', fontStyle: 'italic' }}>{c.rhythmNote}</p>
    </div>
  );

  const capstone = (
    <div style={{ marginTop: '0.5rem' }}>
      <p className="font-body" style={{ color: '#b97827', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 0.6rem' }}>{c.capstoneOptions}</p>
      <div style={{ display: 'grid', gap: '0.6rem' }}>
        {WEALTH_CAPSTONE_OPTIONS.map((option, i) => {
          const text = (c.capstoneOptionText && c.capstoneOptionText[i]) || option;
          return (
            <div key={option.id} style={{ padding: '12px 14px', border: '1px solid #dcc8a8', borderRadius: '6px', background: '#fdf7ea' }}>
              <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>
                {text.buildsOn}
              </span>
              <span className="font-body" style={{ color: '#5f4531', fontSize: '14px', lineHeight: 1.55, fontWeight: 500 }}>{text.label}</span>
            </div>
          );
        })}
      </div>
      <p className="font-body" style={{ color: '#725a46', fontSize: '13.5px', lineHeight: 1.7, fontStyle: 'italic', margin: '0.9rem 0 0' }}>{c.capstoneNote}</p>
    </div>
  );

  // The course data lists the capstone options as the milestone's points; the
  // options are shown once, as cards, under the deliverable.
  const pageCourse = { ...course, milestone: { ...course.milestone, analysisPoints: [] } };

  return (
    <CoursePageTemplate
      course={pageCourse}
      syllabusIntro={c.structureBody}
      syllabusGroups={groups}
      syllabusExtra={rhythm}
      credentialExtra={capstone}
      progressSlot={<BuildingWealthCourseProgress />}
    />
  );
}
