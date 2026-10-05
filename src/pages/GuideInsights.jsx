import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import GuideInsightsPanel from '@/components/guide/GuideInsightsPanel';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { creamText, darkText } from '@/lib/guide/styles';

/**
 * GuideInsights — administrators only, and only ever anonymous aggregates of
 * the Kioo reflections. Individual answers stay with the learner.
 */
export default function GuideInsights() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    base44.functions
      .invoke('getGuideInsights', {})
      .then((response) => {
        if (!cancelled) setData(response?.data || null);
      })
      .catch(() => {
        if (!cancelled) setError('The aggregate results could not be loaded right now.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  return (
    <PageLayout>
      <PageMeta
        title="Guide insights | Tamu Academy"
        description="Anonymous, aggregated Kioo results for Tamu Academy administrators."
        path="/learners-guide/insights"
        noindex
      />
      <div style={{ padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)', maxWidth: '980px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.75rem' }}>
            Safari ya Utu · admin
          </span>
          <h1 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(2rem, 5vw, 2.8rem)', lineHeight: 1.1, margin: '0 0 0.75rem' }}>
            Guide insights
          </h1>
          <p className="font-guide-body" style={{ ...darkText.body, maxWidth: '42rem', margin: 0 }}>
            Anonymous averages from the Kioo reflections, comparing first-time reflections with returns. Learner answers are private, so nothing here identifies anyone.
          </p>
        </header>

        {!isAdmin ? (
          <section className="guide-card" style={{ padding: '1.75rem' }}>
            <p className="font-guide-body" style={{ ...creamText.body, margin: 0 }}>
              This page is for Tamu Academy administrators.
            </p>
          </section>
        ) : loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <div style={{ width: '1.75rem', height: '1.75rem', border: '3px solid rgba(201,150,26,0.25)', borderTopColor: '#C9961A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <section className="guide-card" style={{ padding: '1.75rem' }}>
            <p className="font-guide-body" style={{ ...creamText.body, margin: 0, color: '#a4342a' }}>{error}</p>
          </section>
        ) : data ? (
          <GuideInsightsPanel data={data} />
        ) : null}

        <div style={{ marginTop: '2rem' }}>
          <Link to="/learners-guide" className="font-guide-body" style={{ ...darkText.eyebrow, textDecoration: 'none' }}>
            &larr; Back to the guide
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}