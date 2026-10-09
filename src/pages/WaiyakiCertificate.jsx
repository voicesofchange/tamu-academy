import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import TamuCertificateDocument from '@/components/certificates/TamuCertificateDocument';
import { generateTamuCertificatePDF } from '@/lib/generate-tamu-certificate-pdf';
import { WAIYAKI_COURSE, WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

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

const COURSE_PATH = `/courses/${WAIYAKI_COURSE_SLUG}`;

/**
 * WaiyakiCertificate — the certificate page for the Waiyaki wa Hinga course.
 *
 * The server decides everything: whether the five modules, the assessment and
 * the project are all complete, and what name appears on the certificate. This
 * page only renders the answer, and asks the learner to set a profile name if
 * one is missing.
 */
export default function WaiyakiCertificate() {
  const [state, setState] = useState({
    status: 'loading',
    data: null,
    notEligible: false,
    needsProfile: false,
    outstanding: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('issueWaiyakiCertificate', {
          courseSlug: WAIYAKI_COURSE_SLUG,
        });
        if (cancelled) return;
        if (res && res.data && (res.data.preview || res.data.certificateId)) {
          setState({ status: 'ready', data: res.data, notEligible: false, needsProfile: false, outstanding: null });
        } else {
          setState({ status: 'error', data: null, notEligible: false, needsProfile: false, outstanding: null });
        }
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.status;
        const errData = err?.response?.data;
        if (status === 409) {
          setState({ status: 'loading', data: null, notEligible: false, needsProfile: true, outstanding: null });
        } else if (status === 403) {
          const missing = errData && Array.isArray(errData.missing) ? errData.missing : null;
          setState({ status: 'loading', data: null, notEligible: !missing, needsProfile: false, outstanding: missing });
        } else {
          setState({ status: 'error', data: null, notEligible: false, needsProfile: false, outstanding: null });
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleDownloadPDF = async () => {
    if (!state.data) return;
    await generateTamuCertificatePDF({
      learnerName: state.data.learnerName,
      courseTitle: state.data.courseTitle,
      completedAt: state.data.completedAt,
      certificateId: state.data.certificateId,
      isPreview: state.data.preview === true,
    });
  };

  if (state.needsProfile) {
    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            Profile Name Required
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '520px', margin: '0 auto 2rem' }}>
            Your certificate uses your verified profile name. Please set your full name in your profile
            before generating your certificate.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/profile" className="font-body" style={{ ...actionButtonStyle, color: '#24150f', backgroundColor: '#e8b85b', border: 'none', fontWeight: 600 }}>
              Go to my profile &rarr;
            </Link>
            <Link to={`${COURSE_PATH}/completion`} className="font-body tamu-nav-link" style={actionButtonStyle}>
              &larr; Back to course progress
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (state.outstanding || state.notEligible || state.status !== 'ready') {
    const isError = state.status === 'error';
    const heading = state.outstanding
      ? 'Two Steps Still Outstanding'
      : state.notEligible
        ? 'Certificate Not Yet Available'
        : isError
          ? 'Certificate Unavailable'
          : 'Certificate Not Yet Available';

    return (
      <PageLayout>
        <PageMeta title="Certificate | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          {state.status === 'loading' && (
            <div
              style={{
                display: 'inline-block',
                width: '2rem',
                height: '2rem',
                border: '2px solid rgba(232,184,91,0.2)',
                borderTopColor: '#e8b85b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1.25rem',
              }}
            />
          )}
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '1.5rem' }}>
            {heading}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '560px', margin: '0 auto 1.5rem' }}>
            {isError
              ? 'We could not load your certificate at this time. Please try again later.'
              : state.outstanding
                ? 'Your certificate becomes available once every module is complete, the final assessment is passed and your written project is submitted.'
                : 'Your certificate of completion will be available once you have completed all five modules, passed the final assessment and submitted your written project.'}
          </p>
          {state.outstanding && (
            <ul style={{ listStyle: 'none', padding: 0, maxWidth: '520px', margin: '0 auto 2rem', textAlign: 'left' }}>
              {state.outstanding.map((item) => (
                <li
                  key={item}
                  className="font-body"
                  style={{
                    ...bodyText,
                    fontSize: '0.92rem',
                    padding: '0.6rem 0',
                    borderTop: '1px solid rgba(232,184,91,0.16)',
                  }}
                >
                  <span aria-hidden="true" style={{ color: '#e8955c', marginRight: '0.5rem' }}>
                    &#9675;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <Link to={`${COURSE_PATH}/completion`} className="font-body tamu-nav-link" style={actionButtonStyle}>
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
      <PageMeta title="Certificate of Completion | Tamu Academy" path={`${COURSE_PATH}/certificate`} noindex />

      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        <Link to={`${COURSE_PATH}/completion`} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Back to course progress
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} style={actionButtonStyle}>
            Print Certificate
          </button>
          <button onClick={handleDownloadPDF} style={actionButtonStyle}>
            Download PDF
          </button>
        </div>
      </div>

      {isPreview && (
        <div
          className="no-print"
          style={{
            padding: '0.75rem 1.25rem',
            border: '1px solid rgba(232,184,91,0.3)',
            borderRadius: '4px',
            backgroundColor: 'rgba(232,184,91,0.06)',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          <span
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            Administrator Preview &mdash; no certificate record created
          </span>
        </div>
      )}

      <div>
        <TamuCertificateDocument
          learnerName={data.learnerName}
          courseTitle={data.courseTitle}
          completedAt={data.completedAt}
          certificateId={data.certificateId}
          isPreview={isPreview}
        />
      </div>

      <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={COURSE_PATH} className="font-body tamu-nav-link" style={actionButtonStyle}>
          &larr; Return to the course
        </Link>
      </div>
    </PageLayout>
  );
}