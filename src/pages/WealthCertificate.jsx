import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MhCertificateDocument from '@/components/courses/MhCertificateDocument';
import { generateCertificatePDF } from '@/lib/generate-certificate-pdf';
import { BUILDING_WEALTH_TOGETHER_COURSE } from '@/lib/building-wealth-together-tracks';

const COURSE = BUILDING_WEALTH_TOGETHER_COURSE;
const COURSE_PATH = `/courses/${COURSE.slug}`;
const COMPLETION_PATH = `${COURSE_PATH}/completion`;

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const actionButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  cursor: 'pointer',
  background: 'transparent',
  fontFamily: "'DM Sans', sans-serif",
};

/**
 * The certificate of completion for Building Wealth Together. Issuing is
 * server-verified: the certificate is created only once all nine modules are
 * complete and the capstone is submitted, and it is idempotent thereafter.
 */
export default function WealthCertificate() {
  const [state, setState] = useState({ status: 'loading', data: null, notEligible: false, needsProfile: false });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('issueWealthCertificate', { courseSlug: COURSE.slug });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data && (data.preview || data.certificateId)) {
          setState({ status: 'ready', data, notEligible: false, needsProfile: false });
        }
      } catch (err) {
        if (cancelled) return;
        const status = err && err.response && err.response.status;
        const errData = err && err.response && err.response.data;
        if (status === 403) {
          if (errData && errData.error === 'Profile name required') {
            setState({ status: 'loading', data: null, notEligible: false, needsProfile: true });
          } else {
            setState({ status: 'loading', data: null, notEligible: true, needsProfile: false });
          }
        } else if (status === 409) {
          setState({ status: 'loading', data: null, notEligible: false, needsProfile: true });
        } else {
          setState({ status: 'error', data: null, notEligible: false, needsProfile: false });
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (state.notEligible || state.needsProfile || state.status === 'loading' || state.status === 'error') {
    const heading = state.notEligible
      ? 'Certificate Not Yet Available'
      : state.needsProfile
        ? 'Profile Name Required'
        : state.status === 'error'
          ? 'Certificate Unavailable'
          : null;

    if (!heading) {
      return (
        <PageLayout>
          <PageMeta title="Certificate | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />
          <div style={{ padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your certificate...</p>
          </div>
        </PageLayout>
      );
    }

    const message = state.notEligible
      ? 'Your certificate of completion will be available once you have completed all nine modules and submitted your capstone project.'
      : state.needsProfile
        ? 'Your certificate uses your verified profile name. Please update your profile with your full name before generating your certificate.'
        : 'We could not load your certificate at this time. Please try again later.';

    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {heading}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '520px', margin: '0 auto 2rem' }}>{message}</p>
          <Link to={COMPLETION_PATH} className="font-body tamu-nav-link" style={actionButtonStyle}>
            &larr; Back to Course Progress
          </Link>
        </div>
      </PageLayout>
    );
  }

  const data = state.data;
  const isPreview = data.preview === true;

  return (
    <PageLayout>
      <PageMeta title="Certificate of Completion | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link to={COMPLETION_PATH} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Back to Course Progress
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} style={actionButtonStyle}>Print Certificate</button>
          <button
            onClick={() => generateCertificatePDF({ data, isPreview, moduleWord: 'nine', moduleCountLabel: 'Nine' })}
            style={actionButtonStyle}
          >
            Download PDF
          </button>
        </div>
      </div>

      {isPreview && (
        <div className="no-print" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.06)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Administrator Preview — No certificate record created
          </span>
        </div>
      )}

      <MhCertificateDocument data={data} isPreview={isPreview} moduleWord="nine" moduleCountLabel="Nine" />

      <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Return to Course
        </Link>
      </div>
    </PageLayout>
  );
}