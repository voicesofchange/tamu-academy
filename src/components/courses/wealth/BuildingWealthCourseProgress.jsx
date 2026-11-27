import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import StartCourseButton from '@/components/courses/StartCourseButton';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  loadingYourProgress: 'Loading your progress…',
  startTheCourseToTrack: 'Start the course to track your progress here.',
  nineModulesThreeTracksAnd: 'Nine modules, three tracks and one capstone. Begin with the shared core, then take the pathway that fits your goals — or both.',
  modulesCompleted: 'Modules completed',
  of: '{v0} of {v1}',
  courseCompletionProgress: 'Course completion progress',
  allNineModulesAreComplete: 'All nine modules are complete and your capstone is submitted.',
  continue: 'Continue →',
  reviewYourCapstone: 'Review your capstone',
  yourCapstone: 'Your capstone',
  courseProgress: 'Course progress →',
  yourPathwayFocus: 'Your pathway focus',
  chooseThePathwayYouAre: 'Choose the pathway you are focusing on, or take both. This frames your study order and never locks a module away.',
  yourCapstoneProjectIsNext: 'Your capstone project is next.',
  yourNextModuleIs: 'Your next module is {v0}: {v1}.',
};

const COURSE_SLUG = BUILDING_WEALTH_TOGETHER_COURSE.slug;

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 };

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.1rem',
};

const focusButtonStyle = (active) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: active ? '#24150f' : '#e8b85b',
  backgroundColor: active ? '#e8b85b' : 'transparent',
  border: '1px solid #e8b85b',
  borderRadius: '2px',
  padding: '0.5rem 1rem',
  fontSize: '0.7rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
});

const FOCUS_OPTIONS = [
  { id: 'entrepreneur', label: 'Entrepreneur pathway' },
  { id: 'leader', label: 'Leader pathway' },
  { id: 'both', label: 'Both pathways' },
];

/**
 * The learner's standing in Building Wealth Together on the course page: how
 * far they have come, where to resume, and which pathway they are focusing
 * on. The pathway is a study focus — it orders the pathway modules and frames
 * their guidance, and never locks a module away. All nine modules, and the
 * capstone, are what complete the course.
 */
// Pathway labels, by id, in the reader's language; the saved ids stay as they are.
const FOCUS_TEXT = Object.fromEntries(FOCUS_OPTIONS.map(({ id, label }) => [id, label]));

export default function BuildingWealthCourseProgress() {
  const { content: uiText } = useTranslatedContent('ui-components-courses-wealth-buildingwealthcourseprogress', UI_TEXT);
  const { content: focusText } = useTranslatedContent('wealth-focus-options', FOCUS_TEXT);
  const [state, setState] = useState({ status: 'loading', data: null });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    // Completion status belongs to a signed-in learner: never ask for it as a guest.
    if (!(await base44.auth.isAuthenticated())) {
      setState({ status: 'error', data: null });
      return;
    }
    try {
      const res = await base44.functions.invoke('getWealthCourseCompletion', { courseSlug: COURSE_SLUG });
      const data = res && res.data ? res.data : null;
      setState({ status: data ? 'ready' : 'error', data });
    } catch (err) {
      setState({ status: 'error', data: null });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function setFocus(pathway) {
    setSaving(true);
    try {
      await base44.functions.invoke('enrollWealthCourse', { courseSlug: COURSE_SLUG, pathway });
      await load();
    } catch (err) {
      // Leave the existing focus in place; the learner can try again.
    } finally {
      setSaving(false);
    }
  }

  if (state.status === 'loading') {
    return (
      <div style={{ padding: '1.5rem 0' }}>
        <div style={{ width: '1.5rem', height: '1.5rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p className="font-body" style={{ ...bodyText, marginTop: '0.85rem' }}>{uiText.loadingYourProgress}</p>
      </div>
    );
  }

  if (state.status === 'error' || !state.data) {
    return (
      <p className="font-body" style={{ ...bodyText }}>
        {uiText.startTheCourseToTrack}
      </p>
    );
  }

  const data = state.data;

  if (!data.hasEnrollment) {
    return (
      <div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          {uiText.nineModulesThreeTracksAnd}
        </p>
        <StartCourseButton courseSlug={COURSE_SLUG} />
      </div>
    );
  }

  const percent = data.totalModules > 0 ? Math.round((data.completedCount / data.totalModules) * 100) : 0;
  const nextModule = data.incompleteModules && data.incompleteModules.length > 0 ? data.incompleteModules[0] : null;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {uiText.modulesCompleted}
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '1.05rem', fontWeight: 500 }}>{fillTemplate(uiText.of, { v0: data.completedCount, v1: data.totalModules })}</span>
        </div>
        <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={uiText.courseCompletionProgress} style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
        {data.courseCompleted
          ? uiText.allNineModulesAreComplete
          : nextModule
            ? fillTemplate(uiText.yourNextModuleIs, { v0: nextModule.number, v1: nextModule.title })
            : uiText.yourCapstoneProjectIsNext}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
        {nextModule && (
          <Link to={`/courses/${COURSE_SLUG}/${nextModule.route}`} style={linkStyle}>
            {uiText.continue}
          </Link>
        )}
        <Link to={`/courses/${COURSE_SLUG}/capstone`} style={linkStyle}>
          {data.capstone && data.capstone.submitted ? uiText.reviewYourCapstone : uiText.yourCapstone} &rarr;
        </Link>
        <Link to={`/courses/${COURSE_SLUG}/completion`} style={linkStyle}>
          {uiText.courseProgress}
        </Link>
      </div>

      <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.6rem' }}>
        {uiText.yourPathwayFocus}
      </span>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
        {uiText.chooseThePathwayYouAre}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {FOCUS_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFocus(option.id)}
            disabled={saving}
            aria-pressed={data.pathway === option.id}
            style={{ ...focusButtonStyle(data.pathway === option.id), opacity: saving ? 0.6 : 1 }}
          >
            {focusText[option.id] || option.label}
          </button>
        ))}
      </div>
    </div>
  );
}