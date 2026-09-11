import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import InsightStatCard from '@/components/insights/InsightStatCard';
import EnrollmentTrendChart from '@/components/insights/EnrollmentTrendChart';
import CourseBreakdownChart from '@/components/insights/CourseBreakdownChart';
import ModuleMilestonesChart from '@/components/insights/ModuleMilestonesChart';
import DiasporaProgressMap from '@/components/insights/DiasporaProgressMap';
import FollowUpInquiries from '@/components/insights/FollowUpInquiries';
import VoicesOfChangeAnnouncement from '@/components/insights/VoicesOfChangeAnnouncement';
import { useTranslation } from '@/lib/i18n';

const bodyText = { color: 'rgba(245,239,224,0.7)', fontSize: '0.92rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: '640px' };
const cardStyle = { padding: '1.5rem 1.75rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' };

export default function CommunityInsights() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    base44.functions.invoke('getCommunityInsights', {})
      .then(res => {
        if (cancelled) return;
        setData(res && res.data ? res.data : null);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const courseLabels = {
    'understanding-african-economies-and-the-global-system': t('insights.courseEconomics'),
    'mental-health-community-and-culture': t('insights.courseMentalHealth'),
  };
  const chartLabels = {
    enrollments: t('insights.enrollments'),
    completions: t('insights.completions'),
    certificates: t('insights.certificates'),
    courses: courseLabels,
  };

  return (
    <PageLayout>
      <PageMeta
        title={`${t('insights.pageTitle')} — Tamu Academy`}
        description={t('insights.pageDescription')}
        path="/insights"
      />
      <PageHero
        eyebrow={t('insights.eyebrow')}
        heading={t('insights.heading')}
        subheading={t('insights.intro')}
      />

      <PageSection>
        <FollowUpInquiries />
      </PageSection>

      <PageSection>
        <VoicesOfChangeAnnouncement />
      </PageSection>

      {loading ? (
        <PageSection heading={t('insights.loadingMessage')}>
          <div style={cardStyle}>
            <p style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.5)' }}>
              {t('insights.loadingMessage')}
            </p>
          </div>
        </PageSection>
      ) : error ? (
        <PageSection heading={t('insights.pageTitle')}>
          <div style={cardStyle}>
            <p style={{ ...bodyText, margin: 0 }}>
              {t('insights.errorMessage')}
            </p>
          </div>
        </PageSection>
      ) : data && data.totals.enrollments === 0 ? (
        <PageSection>
          <div style={cardStyle}>
            <p style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>
              {t('insights.emptyMessage')}
            </p>
          </div>
        </PageSection>
      ) : data ? (
        <>
          <PageSection heading={t('insights.totalsHeading')}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <InsightStatCard value={data.totals.enrollments} label={t('insights.statEnrollments')} />
              <InsightStatCard value={data.totals.completions} label={t('insights.statCompletions')} />
              <InsightStatCard value={data.totals.certificates} label={t('insights.statCertificates')} />
              <InsightStatCard value={data.totals.activeLearners} label={t('insights.statActiveLearners')} />
              <InsightStatCard value={`${data.totals.avgProgress}%`} label={t('insights.statAvgProgress')} />
              <InsightStatCard value={data.totals.stories} label={t('insights.statStories')} />
            </div>
          </PageSection>

          <DiasporaProgressMap data={data} courseLabels={courseLabels} t={t} />

          {data.enrollmentTrend.length > 0 && (
            <PageSection heading={t('insights.trendHeading')}>
              <p style={{ ...bodyText, marginBottom: '1.5rem' }}>{t('insights.trendIntro')}</p>
              <EnrollmentTrendChart data={data.enrollmentTrend} labels={chartLabels} />
            </PageSection>
          )}

          <PageSection heading={t('insights.courseHeading')}>
            <p style={{ ...bodyText, marginBottom: '1.5rem' }}>{t('insights.courseIntro')}</p>
            <CourseBreakdownChart data={data.courseBreakdown} labels={chartLabels} />
          </PageSection>

          {data.moduleMilestones.length > 0 && (
            <PageSection heading={t('insights.moduleHeading')}>
              <p style={{ ...bodyText, marginBottom: '1.5rem' }}>{t('insights.moduleIntro')}</p>
              <ModuleMilestonesChart data={data.moduleMilestones} labels={chartLabels} />
            </PageSection>
          )}

          {data.geographicReach.length > 0 && (
            <PageSection heading={t('insights.geoHeading')}>
              <p style={{ ...bodyText, marginBottom: '1.5rem' }}>{t('insights.geoIntro')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {data.geographicReach.map(g => (
                  <div key={g.country} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1rem', border: '1px solid rgba(212,161,42,0.18)',
                    borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)',
                  }}>
                    <span style={{ color: '#F5EFE0', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif" }}>{g.country}</span>
                    <span style={{ color: '#D4A12A', fontSize: '0.85rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{g.count}</span>
                  </div>
                ))}
              </div>
            </PageSection>
          )}

          {data.storyStats.total > 0 && (
            <PageSection heading={t('insights.storyHeading')}>
              <p style={{ ...bodyText, marginBottom: '1.5rem' }}>{t('insights.storyIntro')}</p>
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: '#D4A12A', fontSize: '2.2rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1 }}>
                    {data.storyStats.total}
                  </div>
                  <div style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif", marginTop: '0.4rem' }}>
                    {t('insights.statStories')}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#D4A12A', fontSize: '2.2rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1 }}>
                    {data.storyStats.avgRating > 0 ? `${data.storyStats.avgRating} \u2605` : '—'}
                  </div>
                  <div style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif", marginTop: '0.4rem' }}>
                    {t('insights.avgRating')}
                  </div>
                </div>
              </div>
            </PageSection>
          )}
        </>
      ) : null}
    </PageLayout>
  );
}