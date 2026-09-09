import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MhCertificateDocument from '@/components/courses/MhCertificateDocument';
import { generateCertificatePDF } from '@/lib/generate-certificate-pdf';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

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

const CONTENT = {
  notYetAvailable: 'Certificate Not Yet Available',
  notYetAvailableMsg: 'Your certificate of completion will be available once you have completed all six modules of the course and enrollment is open.',
  viewCourseProgress: 'View Course Progress',
  profileNameRequired: 'Profile Name Required',
  profileNameMsg: 'Your certificate uses your verified profile name. Please update your profile with your full name before generating your certificate.',
  backToProgress: 'Back to Course Progress',
  loading: 'Loading your certificate...',
  unavailable: 'Certificate Unavailable',
  unavailableMsg: 'We could not load your certificate at this time. Please try again later.',
  print: 'Print Certificate',
  downloadPdf: 'Download PDF',
  adminPreview: 'Administrator Preview — No certificate record created',
  returnToCourse: 'Return to Course',
};

export default function EconomicsCertificate() {
  const { content: c } = useTranslatedContent('econ-certificate', CONTENT);
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

  const handlePrint = () => { window.print(); };

  const handleDownloadPDF = async () => {
    if (!state.data) return;
    await generateCertificatePDF({ data: state.data, isPreview: state.data.preview === true, moduleWord: 'six', moduleCountLabel: 'SIX' });
  };

  if (state.notEligible) {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {c.notYetAvailable}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            {c.notYetAvailableMsg}
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            {c.viewCourseProgress} &rarr;
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (state.needsProfile) {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {c.profileNameRequired}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            {c.profileNameMsg}
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            &larr; {c.backToProgress}
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (state.status === 'loading') {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(212,161,42,0.2)', borderTopColor: '#D4A12A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>{c.loading}</p>
        </div>
      </PageLayout>
    );
  }

  if (state.status === 'error') {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${coursePath}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {c.unavailable}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '500px', margin: '0 auto 2rem' }}>
            {c.unavailableMsg}
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
            &larr; {c.backToProgress}
          </Link>
        </div>
      </PageLayout>
    );
  }

  const data = state.data;
  const isPreview = data.preview === true;

  return (
    <PageLayout>
      <PageMeta title="Certificate of Completion | Tamu Academy" path={`${coursePath}/certificate`} noindex />

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link to={completionPath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
          &larr; {c.backToProgress}
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} style={actionButtonStyle}>
            {c.print}
          </button>
          <button onClick={handleDownloadPDF} style={actionButtonStyle}>
            {c.downloadPdf}
          </button>
        </div>
      </div>

      {isPreview && (
        <div className="no-print" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.06)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            {c.adminPreview}
          </span>
        </div>
      )}

      <div>
        <MhCertificateDocument data={data} isPreview={isPreview} moduleWord="six" moduleCountLabel="Six" />
      </div>

      <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={coursePath} className="font-body tamu-nav-link" style={{ ...actionButtonStyle, textDecoration: 'none' }}>
          &larr; {c.returnToCourse}
        </Link>
      </div>
    </PageLayout>
  );
}