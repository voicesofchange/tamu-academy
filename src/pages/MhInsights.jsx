import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const cardStyle = { padding: '1.5rem 1.75rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' };
const moduleLinkStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.55rem 1.2rem' };

const CONTENT = {
  heroEyebrow: 'Insights',
  heroHeading: 'Your Learning Progress',
  heroSubheading: 'A clear view of where you are in the course and exactly what remains to finish in each module.',
  loadingEyebrow: 'Loading',
  loadingHeading: 'Loading your progress',
  loadingBody: 'Gathering your module progress...',
  errorEyebrow: 'Status',
  errorHeading: 'Progress Unavailable',
  errorBody: 'Your progress could not be loaded right now. Once the course launches, your position across all seven modules will appear here.',
  returnToCourse: 'Return to Course',
  overallEyebrow: 'Overall',
  overallHeading: 'Course Completion',
  overallProgressLabel: 'Overall progress',
  ofModules: '{count} of {total} modules',
  certReady: 'You have completed all seven modules. Your certificate of completion is available.',
  viewCertificate: 'View Certificate',
  certNotReady: 'Complete all seven modules to earn your certificate of completion.',
  modulesEyebrow: 'Modules',
  modulesHeading: 'Module-by-Module Progress',
  privacyNote: 'No personal reflections, activity responses, or Care Map content are stored in the platform.',
  statusCompleted: 'Completed',
  statusInProgress: 'In Progress',
  statusNotStarted: 'Not Started',
  review: 'Review',
  resume: 'Resume',
  begin: 'Begin',
  sectionProgress: 'Section progress',
  ofSections: '{done} of {total} sections',
  allSectionsComplete: 'All sections complete.',
  whatRemains: 'What you have left to finish',
  trackingOpensLater: '{number} progress tracking opens when the module launches.',
};

const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

function humanizeKey(key) {
  return key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ProgressBar({ value, label }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      style={{ width: '100%', height: '8px', backgroundColor: 'rgba(245,239,224,0.08)', borderRadius: '4px', overflow: 'hidden' }}
    >
      <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#D4A12A', borderRadius: '4px', transition: 'width 0.6s ease' }} />
    </div>
  );
}

function ModuleProgressCard({ mod, moduleStatus, sectionDetail, courseSlug, c }) {
  const modulePath = `/courses/${courseSlug}/${mod.route}`;
  const completed = !!(moduleStatus && moduleStatus.completed);

  const hasSections = !!(sectionDetail && Array.isArray(sectionDetail.completionKeys) && sectionDetail.completionKeys.length > 0);
  const totalSections = hasSections ? sectionDetail.completionKeys.length : 1;
  const doneSections = hasSections
    ? (Array.isArray(sectionDetail.completedKeys) ? sectionDetail.completedKeys.length : 0)
    : (completed ? 1 : 0);
  const remainingKeys = hasSections
    ? sectionDetail.completionKeys.filter((k) => !(Array.isArray(sectionDetail.completedKeys) && sectionDetail.completedKeys.includes(k)))
    : [];
  const sectionPct = totalSections > 0 ? (doneSections / totalSections) * 100 : 0;

  const statusLabel = completed
    ? c.statusCompleted
    : hasSections && doneSections > 0
      ? c.statusInProgress
      : c.statusNotStarted;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <StatusBadge label={mod.number} />
            <StatusBadge label={statusLabel} />
          </div>
          <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
            {mod.title}
          </h3>
        </div>
        <Link to={modulePath} className="font-body" style={moduleLinkStyle}>
          {completed ? c.review : doneSections > 0 ? c.resume : c.begin} &rarr;
        </Link>
      </div>

      <div style={{ marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
          <span className="font-body" style={eyebrowStyle}>{c.sectionProgress}</span>
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.82rem', fontWeight: 400 }}>
            {tpl(c.ofSections, { done: doneSections, total: totalSections })}
          </span>
        </div>
        <ProgressBar value={sectionPct} label={`${mod.number} section completion`} />
      </div>

      {completed ? (
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(212,161,42,0.7)', fontSize: '0.85rem' }}>
          {c.allSectionsComplete}
        </p>
      ) : remainingKeys.length > 0 ? (
        <div style={{ marginTop: '0.85rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.whatRemains}</span>
          <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
            {remainingKeys.map((k) => (
              <li key={k} style={{ marginBottom: '0.35rem' }}>{humanizeKey(k)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', fontSize: '0.85rem' }}>
          {tpl(c.trackingOpensLater, { number: mod.number })}
        </p>
      )}
    </div>
  );
}

export default function MhInsights() {
  const { content: c } = useTranslatedContent('mh-insights', CONTENT);
  const course = MENTAL_HEALTH_COURSE;
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(null);
  const [sectionMap, setSectionMap] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const completionRes = await base44.functions.invoke('getMentalHealthCourseCompletion', { courseSlug: course.slug });
        if (cancelled) return;
        const completionData = completionRes && completionRes.data ? completionRes.data : null;
        setCompletion(completionData);

        const sectionEntries = await Promise.all(
          course.modules
            .filter((m) => m.route !== 'module-1')
            .map(async (m) => {
              try {
                const res = await base44.functions.invoke('getMentalHealthProgress', { courseSlug: course.slug, moduleRoute: m.route });
                return [m.route, res && res.data ? res.data : null];
              } catch (_) {
                return [m.route, null];
              }
            })
        );
        if (cancelled) return;
        const map = {};
        for (const [route, data] of sectionEntries) {
          if (data) map[route] = data;
        }
        setSectionMap(map);
      } catch (err) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [course.slug]);

  const moduleStatusMap = {};
  if (completion && Array.isArray(completion.modules)) {
    for (const m of completion.modules) moduleStatusMap[m.route] = m;
  }
  const completedCount = completion ? completion.completedCount || 0 : 0;
  const totalModules = completion ? completion.totalModules || course.modules.length : course.modules.length;
  const overallPct = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <PageLayout>
      <PageMeta
        title={`Insights | ${course.title} | Tamu Academy`}
        description="Track your progress across all seven modules of the Mental Health, Community and Culture course."
        path={`/courses/${course.slug}/insights`}
        noindex
      />

      <PageHero eyebrow={c.heroEyebrow} heading={c.heroHeading} subheading={c.heroSubheading} />

      {loading ? (
        <PageSection eyebrow={c.loadingEyebrow} heading={c.loadingHeading}>
          <div style={cardStyle}>
            <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
              {c.loadingBody}
            </p>
          </div>
        </PageSection>
      ) : error ? (
        <PageSection eyebrow={c.errorEyebrow} heading={c.errorHeading}>
          <div style={cardStyle}>
            <p className="font-body" style={{ ...bodyText, margin: 0 }}>
              {c.errorBody}
            </p>
            <Link to={`/courses/${course.slug}`} className="font-body" style={{ ...moduleLinkStyle, marginTop: '1rem' }}>
              &larr; {c.returnToCourse}
            </Link>
          </div>
        </PageSection>
      ) : (
        <>
          <PageSection eyebrow={c.overallEyebrow} heading={c.overallHeading}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                <span className="font-body" style={eyebrowStyle}>{c.overallProgressLabel}</span>
                <span className="font-body" style={{ color: '#F5EFE0', fontSize: '1rem', fontWeight: 500 }}>
                  {tpl(c.ofModules, { count: completedCount, total: totalModules })}
                </span>
              </div>
              <ProgressBar value={overallPct} label={c.overallHeading} />
            </div>
            {completion && completion.certificateEligible ? (
              <div style={{ ...cardStyle, borderColor: 'rgba(212,161,42,0.3)', backgroundColor: 'rgba(212,161,42,0.04)' }}>
                <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>
                  {c.certReady}
                </p>
                <Link to={`/courses/${course.slug}/certificate`} className="font-body" style={moduleLinkStyle}>
                  {c.viewCertificate} &rarr;
                </Link>
              </div>
            ) : (
              <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)', margin: 0 }}>
                {c.certNotReady}
              </p>
            )}
          </PageSection>

          <PageSection eyebrow={c.modulesEyebrow} heading={c.modulesHeading}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
              {course.modules.map((mod) => (
                <ModuleProgressCard
                  key={mod.route}
                  mod={mod}
                  moduleStatus={moduleStatusMap[mod.route]}
                  sectionDetail={sectionMap[mod.route]}
                  courseSlug={course.slug}
                  c={c}
                />
              ))}
            </div>
            <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', margin: '1.25rem 0 0' }}>
              {c.privacyNote}
            </p>
          </PageSection>
        </>
      )}
    </PageLayout>
  );
}