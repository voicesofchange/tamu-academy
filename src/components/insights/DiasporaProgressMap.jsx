import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, PolarAngleAxis } from 'recharts';

const panelStyle = {
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
};

const liveBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.25rem 0.7rem',
  border: '1px solid rgba(232,184,91,0.3)',
  borderRadius: '20px',
  fontSize: '0.62rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#e8b85b',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500,
};

const liveDotStyle = {
  display: 'inline-block',
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: '#e8b85b',
  animation: 'tamuPulse 2s ease-in-out infinite',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function moduleLabel(moduleSlug) {
  return moduleSlug.replace('module-', 'Module ');
}

/**
 * DiasporaProgressMap — real-time visualization of community course
 * progress and milestones across the diaspora. Combines:
 *   1. Course completion progress rings (RadialBarChart)
 *   2. Diaspora geographic reach bubbles (sized by learner count)
 *   3. A live milestone stream (recent module completions)
 *
 * Subscribes to CourseEnrollment and ModuleProgress entities for
 * real-time updates — new enrollments and module completions update
 * the counters and feed without a page refresh.
 */
export default function DiasporaProgressMap({ data, courseLabels, t }) {
  const [enrollmentCount, setEnrollmentCount] = useState(data.totals.enrollments);
  const [milestoneCount, setMilestoneCount] = useState(data.totals.completions);
  const [milestones, setMilestones] = useState(data.recentMilestones || []);
  const [liveFlash, setLiveFlash] = useState(null);
  const flashTimer = useRef(null);

  useEffect(() => {
    const unsubEnroll = base44.entities.CourseEnrollment.subscribe((event) => {
      if (event.type === 'create') {
        setEnrollmentCount(c => c + 1);
        setLiveFlash('enrollment');
        if (flashTimer.current) clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setLiveFlash(null), 3000);
      }
    });
    const unsubProgress = base44.entities.ModuleProgress.subscribe((event) => {
      if (event.type === 'update' && event.data && event.data.status === 'completed' && event.data.completed_at) {
        setMilestones(prev => [{
          course_slug: event.data.course_slug,
          module_slug: event.data.module_slug,
          completed_at: event.data.completed_at,
        }, ...prev].slice(0, 12));
        setMilestoneCount(c => c + 1);
        setLiveFlash('milestone');
        if (flashTimer.current) clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setLiveFlash(null), 3000);
      }
    });
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
      unsubEnroll();
      unsubProgress();
    };
  }, []);

  const progressData = data.courseBreakdown.map(c => ({
    name: courseLabels[c.slug] || c.slug,
    slug: c.slug,
    progress: c.enrollments > 0 ? Math.round((c.completions / c.enrollments) * 100) : 0,
    fill: c.slug.includes('economics') ? '#e8b85b' : '#E8951C',
  }));

  const maxCount = Math.max(...data.geographicReach.map(g => g.count), 1);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>
            {t('insights.diasporaEyebrow')}
          </span>
          <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
            {t('insights.diasporaHeading')}
          </h2>
        </div>
        <span style={liveBadgeStyle}>
          <span style={liveDotStyle} />
          {t('insights.liveLabel')}
        </span>
      </div>

      <p style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.92rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: '640px', marginBottom: '1.75rem' }}>
        {t('insights.diasporaIntro')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Course Progress Rings */}
        <div style={panelStyle}>
          <h3 style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 400, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem', margin: '0 0 1.25rem' }}>
            {t('insights.progressRingsHeading')}
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart innerRadius="35%" outerRadius="100%" data={progressData} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: 'rgba(243,234,216,0.05)' }} dataKey="progress" cornerRadius={6} />
              <Tooltip
                contentStyle={{ backgroundColor: '#24150f', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', color: '#f8f0df', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif" }}
                formatter={(value, name) => [`${value}%`, name]}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {progressData.map(p => (
              <div key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', backgroundColor: p.fill }} />
                <span style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                <span style={{ color: '#e8b85b', fontSize: '0.78rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{p.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diaspora Reach Bubbles */}
        <div style={panelStyle}>
          <h3 style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 400, fontFamily: "'DM Sans', sans-serif", margin: '0 0 1.25rem' }}>
            {t('insights.diasporaReachHeading')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            {data.geographicReach.map(g => {
              const ratio = g.count / maxCount;
              return (
                <span
                  key={g.country}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: `${0.3 + 0.15 * ratio}rem ${0.7 + 0.4 * ratio}rem`,
                    border: `1px solid rgba(232,184,91,${0.15 + 0.3 * ratio})`,
                    borderRadius: '20px',
                    backgroundColor: `rgba(232,184,91,${0.03 + 0.06 * ratio})`,
                    color: '#f8f0df',
                    fontSize: `${0.75 + 0.15 * ratio}rem`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {g.country}
                  <span style={{ marginLeft: '0.4rem', color: '#e8b85b', fontWeight: 500, fontSize: '0.85em' }}>{g.count}</span>
                </span>
              );
            })}
          </div>
          <p style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.8rem', fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif", marginTop: '1rem', marginBottom: 0 }}>
            {t('insights.diasporaReachNote')}
          </p>
        </div>
      </div>

      {/* Live Milestone Stream */}
      <div style={panelStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 400, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            {t('insights.milestoneStreamHeading')}
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: liveFlash === 'enrollment' ? '#e8b85b' : '#f8f0df', fontSize: '1.3rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1, transition: 'color 0.4s' }}>
                {enrollmentCount}
              </div>
              <div style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif", marginTop: '0.2rem' }}>
                {t('insights.statEnrollments')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: liveFlash === 'milestone' ? '#e8b85b' : '#f8f0df', fontSize: '1.3rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1, transition: 'color 0.4s' }}>
                {milestoneCount}
              </div>
              <div style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif", marginTop: '0.2rem' }}>
                {t('insights.statCompletions')}
              </div>
            </div>
          </div>
        </div>

        {milestones.length === 0 ? (
          <p style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.88rem', fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            {t('insights.milestonesEmpty')}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {milestones.map((m, i) => (
              <div
                key={`${m.course_slug}-${m.module_slug}-${m.completed_at}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.85rem',
                  border: '1px solid rgba(232,184,91,0.12)',
                  borderRadius: '3px',
                  backgroundColor: i === 0 && liveFlash === 'milestone' ? 'rgba(232,184,91,0.06)' : 'transparent',
                  transition: 'background-color 0.5s',
                }}
              >
                <span style={{ color: '#e8b85b', fontSize: '0.7rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, minWidth: '65px' }}>
                  {timeAgo(m.completed_at)}
                </span>
                <span style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                  {moduleLabel(m.module_slug)}
                </span>
                <span style={{ color: 'rgba(243,234,216,0.4)', fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}>
                  {courseLabels[m.course_slug] || m.course_slug}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}