import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import { useAuth } from '@/lib/AuthContext';
import TamuCertificateDocument from '@/components/certificates/TamuCertificateDocument';
import { CERTIFICATE_SAMPLES, CERT_SAMPLE_NOTICE } from '@/lib/certificate-design';
import { generateTamuCertificatePDF } from '@/lib/generate-tamu-certificate-pdf';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

const actionStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#e8b85b',
  fontSize: '0.76rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.62rem 1.25rem',
  cursor: 'pointer',
  background: 'transparent',
  fontFamily: "'DM Sans', sans-serif",
};

const variantStyle = (active) => ({
  ...actionStyle,
  borderColor: active ? '#e8b85b' : 'rgba(232,184,91,0.22)',
  color: active ? '#24150f' : 'rgba(232,184,91,0.8)',
  background: active ? '#e8b85b' : 'transparent',
});

/**
 * CertificateDesignSample — administrator-only review sheet for the official
 * Certificate of Completion.
 *
 * This page is a design sample: it renders the shared certificate document with
 * demonstration values and never creates, changes or replaces a certificate
 * record. The live certificate pages are untouched until the design is approved.
 */
export default function CertificateDesignSample() {
  const { user, isLoadingAuth } = useAuth();
  const [sampleKey, setSampleKey] = useState(CERTIFICATE_SAMPLES[0].key);
  const sample =
    CERTIFICATE_SAMPLES.find((entry) => entry.key === sampleKey) || CERTIFICATE_SAMPLES[0];

  if (isLoadingAuth) {
    return (
      <PageLayout>
        <PageMeta title="Certificate Design Sample | Tamu Academy" path="/admin/certificate-design" noindex nofollow />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <p className="font-body" style={bodyText}>Loading the design sample...</p>
        </div>
      </PageLayout>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <PageLayout>
        <PageMeta title="Certificate Design Sample | Tamu Academy" path="/admin/certificate-design" noindex nofollow />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', fontWeight: 400, marginBottom: '1.25rem' }}>
            Administrators Only
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '520px', margin: '0 auto 2rem' }}>
            The certificate design sample is available to Tamu Academy administrators.
          </p>
          <Link to="/" className="font-body tamu-nav-link" style={actionStyle}>&larr; Back to Home</Link>
        </div>
      </PageLayout>
    );
  }

  const downloadSamplePdf = () =>
    generateTamuCertificatePDF({
      learnerName: sample.learnerName,
      courseTitle: sample.courseTitle,
      completedAt: sample.completedAt,
      certificateId: sample.certificateId,
      fileName: `tamu-academy-certificate-sample-${sample.key}.pdf`,
    });

  return (
    <PageLayout>
      <PageMeta
        title="Certificate Design Sample | Tamu Academy"
        path="/admin/certificate-design"
        noindex
        nofollow
      />

      {/* ── Review controls (never printed) ─────────────────────────────── */}
      <div className="no-print" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.75rem' }}>
          Administrator Review
        </p>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 400, margin: '0 0 0.9rem' }}>
          Certificate of Completion — Design Sample
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '760px', margin: '0 0 1.5rem' }}>
          {CERT_SAMPLE_NOTICE}
        </p>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {CERTIFICATE_SAMPLES.map((entry) => (
            <button
              key={entry.key}
              type="button"
              onClick={() => setSampleKey(entry.key)}
              style={variantStyle(entry.key === sample.key)}
              aria-pressed={entry.key === sample.key}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', margin: '0 0 1.25rem' }}>
          Showing: {sample.hint}
        </p>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button type="button" onClick={downloadSamplePdf} style={actionStyle}>
            Download Certificate PDF
          </button>
          <button type="button" onClick={() => window.print()} style={actionStyle}>
            Print
          </button>
        </div>
      </div>

      {/* ── The certificate itself ──────────────────────────────────────── */}
      <div className="tamu-print-area tamu-cert-print-area">
        <TamuCertificateDocument
          learnerName={sample.learnerName}
          courseTitle={sample.courseTitle}
          completedAt={sample.completedAt}
          certificateId={sample.certificateId}
        />
      </div>

      {/* ── Review notes (never printed) ────────────────────────────────── */}
      <div className="no-print" style={{ maxWidth: '1080px', margin: '2rem auto 0' }}>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.86rem', margin: '0 0 0.6rem' }}>
          Landscape US Letter (11 × 8.5 in). The PDF is generated with selectable text, one official
          logo lockup, and no QR code until certificate verification is built.
        </p>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.86rem', margin: 0 }}>
          The existing certificate pages, records and issued certificates are unchanged. Once this
          design is approved, it replaces the current visual template across every course.
        </p>
      </div>
    </PageLayout>
  );
}