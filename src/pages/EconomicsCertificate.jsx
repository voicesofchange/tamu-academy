import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MhCertificateDocument from '@/components/courses/MhCertificateDocument';
import { generateCertificatePDF } from '@/lib/generate-certificate-pdf';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const actionButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#D4A12A',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  cursor: 'pointer',
  background: 'transparent',
  fontFamily: "'DM Sans', sans-serif",
  transition: 'color 0.25s ease, borderColor 0.25s ease',
};

/**
 * EconomicsCertificate — the certificate of completion page for the
 * Understanding African Economies and the Global System course.
 *
 * Calls `issueEconomicsCertificate` (idempotent) to retrieve or issue
 * the certificate. Displays the certificate with print and PDF download
 * options. Mirrors the Mental Health certificate page but uses the
 * six-module language and the Economics course slug.
 */
export default function EconomicsCertificate() {
  const course = ECONOMICS_COURSE;
  const [state, setState] = useState({ status: 'loading', data: null, error: null, notEligible: false, needsProfile: false });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('issueEconomicsCertificate', {
          courseSlug: COURSE_SLUG,
        });
        if (cancelled) return;
        if (res && res.data) {
          if (res.data.preview) {
            setState({ status: 'ready', data: res.data, error: null, notEligible: false, needsProfile: false });
          } else if (res.data.certificateId) {
            setState({ status: 'ready', data: res.data, error: null, notEligible: false, needsProfile: false });
          } else {
            setState({ status: 'error', data: null, error: 'Unexpected response', notEligible: false, needsProfile: false });
          }
        }
      } catch (err) {
        if (cancelled) return;
        const status = err && err.response && err.response.status;
        const errData = err && err.response && err.response.data;
        if (status === 403) {
          if (errData && errData.error === 'Profile name required') {
            setState({ status: 'loading', data: null, error: null, notEligible: false, needsProfile: true });
          } else {
            setState({ status: 'loading', data: null, error: null, notEligible: true, needsProfile: false });
          }
        } else {
          setState({ status: 'error', data: null, error: err && err.message ? err.message : 'Error loading certificate', notEligible: false, needsProfile: false });
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const coursePath = `/courses/${COURSE_SLUG}`;
  const completionPath = `${coursePath}/completion`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!state.data) return;
    await generateCertificatePDF({ data: state.data, isPreview: state.data.preview === true, moduleWord: 'six', moduleCountLabel: 'SIX' });
  };

  // --- Not eligible state ---
  if (state.notEligible) {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            Certificate Not Yet Available
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Your certificate of completion will be available once you have completed all six modules of the course and enrollment is open.
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            View Course Progress &rarr;
          </Link>
        </div>
      </PageLayout>
    );
  }

  // --- Needs profile name ---
  if (state.needsProfile) {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            Profile Name Required
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Your certificate uses your verified profile name. Please update your profile with your full name before generating your certificate.
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            &larr; Back to Course Progress
          </Link>
        </div>
      </PageLayout>
    );
  }

  // --- Loading ---
  if (state.status === 'loading') {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(212,161,42,0.2)', borderTopColor: '#D4A12A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>Loading your certificate...</p>
        </div>
      </PageLayout>
    );
  }

  // --- Error ---
  if (state.status === 'error') {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            Certificate Unavailable
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            We could not load your certificate at this time. Please try again later.
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            &larr; Back to Course Progress
          </Link>
        </div>
      </PageLayout>
    );
  }

  // --- Certificate ready ---
  const data = state.data;
  const isPreview = data.preview === true;

  return (
    <PageLayout>
      <PageMeta title="Certificate of Completion | Tamu Academy" path={`${coursePath}/certificate`} noindex />

      {/* Action bar (hidden in print) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
          &larr; Back to Course Progress
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} style={actionButtonStyle}>
            Print Certificate
          </button>
          <button onClick={handleDownloadPDF} style={actionButtonStyle}>
            Download PDF
          </button>
        </div>
      </div>

      {isPreview && (
        <div className="no-print" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.06)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Administrator Preview — No certificate record created
          </span>
        </div>
      )}

      {/* Certificate (print area) */}
      <div>
        <MhCertificateDocument data={data} isPreview={isPreview} moduleWord="six" moduleCountLabel="Six" />
      </div>

      {/* Return link (hidden in print) */}
      <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={coursePath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
          &larr; Return to Course
        </Link>
      </div>
    </PageLayout>
  );
}