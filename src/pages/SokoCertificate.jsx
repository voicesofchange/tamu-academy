import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MhCertificateDocument from '@/components/courses/MhCertificateDocument';
import { generateCertificatePDF } from '@/lib/generate-certificate-pdf';
import {
  SAUTI_ZA_SOKO_COURSE_SLUG,
  SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
} from '@/lib/sauti-za-soko-tracks';

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
 * SokoCertificate — certificate page for either Sauti za Soko course. The
 * core course and the Peer Facilitator track are certified separately, so
 * this page takes the course slug as a prop.
 */
export default function SokoCertificate({ courseSlug = SAUTI_ZA_SOKO_COURSE_SLUG }) {
  const isPeer = courseSlug === SAUTI_ZA_SOKO_PEER_COURSE_SLUG;
  const coursePath = '/courses/sauti-za-soko';
  const completionPath = isPeer
    ? `${coursePath}/peer-facilitator`
    : `${coursePath}/completion`;
  const certificatePath = isPeer
    ? `${coursePath}/peer-facilitator/certificate`
    : `${coursePath}/certificate`;

  const moduleWord = isPeer ? 'the required' : 'seven';
  const moduleCountLabel = isPeer ? 'One' : 'Seven';

  const [state, setState] = useState({
    status: 'loading',
    data: null,
    notEligible: false,
    needsProfile: false,
    outstanding: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('issueSokoCertificate', { courseSlug });
        if (cancelled) return;
        if (res && res.data && (res.data.preview || res.data.certificateId)) {
          setState({ status: 'ready', data: res.data, notEligible: false, needsProfile: false, outstanding: false });
        } else {
          setState({ status: 'error', data: null, notEligible: false, needsProfile: false, outstanding: false });
        }
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.status;
        const errData = err?.response?.data;
        if (status === 409 && errData?.error === 'Profile name required') {
          setState({ status: 'loading', data: null, notEligible: false, needsProfile: true, outstanding: false });
        } else if (status === 409) {
          setState({ status: 'loading', data: null, notEligible: false, needsProfile: false, outstanding: true });
        } else if (status === 403) {
          setState({ status: 'loading', data: null, notEligible: true, needsProfile: false, outstanding: false });
        } else {
          setState({ status: 'error', data: null, notEligible: false, needsProfile: false, outstanding: false });
        }
      }
    })();
    return () => { cancelled = true; };
  }, [courseSlug]);

  const handleDownloadPDF = async () => {
    if (!state.data) return;
    await generateCertificatePDF({
      data: state.data,
      isPreview: state.data.preview === true,
      moduleWord,
      moduleCountLabel: moduleCountLabel.toUpperCase(),
    });
  };

  if (state.notEligible || state.outstanding || state.needsProfile || state.status !== 'ready') {
    const isError = state.status === 'error';
    const heading = state.notEligible
      ? (isPeer ? 'Peer Facilitator Certificate Not Yet Available' : 'Certificate Not Yet Available')
      : state.outstanding
        ? 'Course Requirements Outstanding'
        : state.needsProfile
          ? 'Profile Name Required'
          : 'Certificate Unavailable';
    const body = state.notEligible
      ? (isPeer
        ? 'Your Peer Facilitator certificate becomes available once you have completed Module 8, submitted your vendor-circle record, and a reviewer has approved it.'
        : 'Your certificate becomes available once you have completed all seven modules and every course requirement, and enrollment is open.')
      : state.outstanding
        ? 'Finish your My Soko Action Plan sections, a peer discussion and the final reflection, then finalise your course.'
        : state.needsProfile
          ? 'Your certificate uses your verified profile name. Please update your profile with your full name before generating your certificate.'
          : 'We could not load your certificate at this time. Please try again later.';

    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={certificatePath} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          {state.status === 'loading' && (
            <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.25rem' }} />
          )}
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {heading}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '520px', margin: '0 auto 2rem' }}>
            {isError ? 'We could not load your certificate at this time. Please try again later.' : body}
          </p>
          <Link to={completionPath} className="font-body tamu-nav-link" style={actionButtonStyle}>
            &larr; Back to course progress
          </Link>
        </div>
      </PageLayout>
    );
  }

  const data = state.data;
  const isPreview = data.preview === true;

  return (
    <PageLayout>
      <PageMeta title="Certificate of Completion | Tamu Academy" path={certificatePath} noindex />

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link to={completionPath} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Back to course progress
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} style={actionButtonStyle}>Print Certificate</button>
          <button onClick={handleDownloadPDF} style={actionButtonStyle}>Download PDF</button>
        </div>
      </div>

      {isPreview && (
        <div className="no-print" style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.06)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Administrator Preview &mdash; No certificate record created
          </span>
        </div>
      )}

      <div>
        <MhCertificateDocument
          data={data}
          isPreview={isPreview}
          moduleWord={moduleWord}
          moduleCountLabel={moduleCountLabel}
        />
      </div>

      <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={coursePath} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Return to Course
        </Link>
      </div>
    </PageLayout>
  );
}