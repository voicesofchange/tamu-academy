import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';

const COURSE_SLUG = 'mental-health-community-and-culture';

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
 * MhCertificate — the certificate of completion page for the Mental
 * Health, Community and Culture course.
 *
 * Calls `issueMentalHealthCertificate` (idempotent) to retrieve or
 * issue the certificate. Displays the certificate with print and
 * PDF download options. No certificate_id is accepted from URL
 * parameters — only the current authenticated user's certificate
 * is displayed.
 *
 * If the learner is not eligible (course not completed, not enrolled,
 * or course unpublished), a message is shown with a link to the
 * completion page.
 */
export default function MhCertificate() {
  const course = MENTAL_HEALTH_COURSE;
  const [state, setState] = useState({ status: 'loading', data: null, error: null, notEligible: false, needsProfile: false });
  const certificateRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('issueMentalHealthCertificate', {
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
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageWidth = 297;
    const pageHeight = 210;

    // Background
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer border
    doc.setDrawColor(212, 161, 42);
    doc.setLineWidth(1.5);
    doc.rect(15, 12, pageWidth - 30, pageHeight - 24);

    // Inner border
    doc.setLineWidth(0.3);
    doc.rect(19, 16, pageWidth - 38, pageHeight - 32);

    // Tamu Academy name
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 19, 14);
    doc.setFontSize(20);
    doc.text('TAMU ACADEMY', pageWidth / 2, 38, { align: 'center' });

    // Gold divider
    doc.setDrawColor(212, 161, 42);
    doc.setLineWidth(0.8);
    doc.line(pageWidth / 2 - 25, 43, pageWidth / 2 + 25, 43);

    // Certificate of Completion
    doc.setFont('times', 'normal');
    doc.setFontSize(32);
    doc.text('Certificate of Completion', pageWidth / 2, 60, { align: 'center' });

    // This certifies that
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(120, 110, 95);
    doc.text('This certifies that', pageWidth / 2, 78, { align: 'center' });

    // Learner name
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.setTextColor(26, 19, 14);
    doc.text(state.data.learnerName || '', pageWidth / 2, 92, { align: 'center' });

    // Has completed
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(120, 110, 95);
    doc.text('has successfully completed all seven modules of', pageWidth / 2, 104, { align: 'center' });

    // Course title
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(26, 19, 14);
    doc.text(state.data.courseTitle || '', pageWidth / 2, 116, { align: 'center' });

    // Completion date
    const completedDate = state.data.completedAt
      ? new Date(state.data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(120, 110, 95);
    doc.text(`Date of Completion: ${completedDate}`, pageWidth / 2, 132, { align: 'center' });

    // Completion statement (wrapped)
    doc.setFontSize(8.5);
    doc.setTextColor(100, 90, 78);
    const statement = state.data.completionStatement || '';
    const splitStatement = doc.splitTextToSize(statement, pageWidth - 80);
    doc.text(splitStatement, pageWidth / 2, 146, { align: 'center' });

    // Certificate ID
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 150, 135);
    doc.text(`Certificate ID: ${state.data.certificateId || ''}`, pageWidth / 2, pageHeight - 22, { align: 'center' });

    // Tamu Academy footer
    doc.setFontSize(8);
    doc.text('Tamu Academy', pageWidth / 2, pageHeight - 17, { align: 'center' });

    doc.save(`tamu-academy-certificate.pdf`);
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
            Your certificate of completion will be available once you have completed all seven modules of the course and enrollment is open.
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

  // --- Loading / error ---
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
  const completedDate = data.completedAt
    ? new Date(data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

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
      <div
        ref={certificateRef}
        className="tamu-certificate-print"
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#FCFAF5',
          color: '#1A130E',
          padding: 'clamp(2rem, 5vw, 4rem)',
          border: '2px solid #D4A12A',
          borderRadius: '4px',
          fontFamily: "'DM Sans', sans-serif",
          position: 'relative',
        }}
      >
        {/* Inner border */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 'clamp(0.75rem, 1.5vw, 1.25rem)', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '2px', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', textAlign: 'center', padding: 'clamp(1rem, 3vw, 2rem) 0' }}>
          {/* Tamu Academy name */}
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A130E', margin: '0 0 0.5rem' }}>
            Tamu Academy
          </p>
          <div aria-hidden="true" style={{ width: '50px', height: '1px', background: '#D4A12A', margin: '0 auto 2rem' }} />

          {/* Certificate of Completion */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.75rem, 4vw, 2.8rem)', fontWeight: 400, color: '#1A130E', margin: '0 0 2rem', lineHeight: 1.2 }}>
            Certificate of Completion
          </h1>

          {/* This certifies that */}
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#786E5F', margin: '0 0 1rem' }}>
            This certifies that
          </p>

          {/* Learner name */}
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontStyle: 'italic', fontWeight: 400, color: '#1A130E', margin: '0 0 1.5rem', lineHeight: 1.3 }}>
            {data.learnerName}
          </p>

          {/* Has completed */}
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#786E5F', margin: '0 0 1rem' }}>
            has successfully completed all seven modules of
          </p>

          {/* Course title */}
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 500, color: '#1A130E', margin: '0 0 2rem', lineHeight: 1.3 }}>
            {data.courseTitle}
          </p>

          {/* Completion date */}
          <p style={{ fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)', color: '#786E5F', margin: '0 0 2rem' }}>
            Date of Completion: <span style={{ fontWeight: 500, color: '#1A130E' }}>{completedDate}</span>
          </p>

          {/* Completion statement */}
          <div style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <p style={{ fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)', lineHeight: 1.7, color: '#645A4E', fontStyle: 'italic', margin: 0 }}>
              {data.completionStatement}
            </p>
          </div>

          {/* Certificate ID */}
          <p style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', color: '#A09687', letterSpacing: '0.04em', margin: '0 0 0.5rem' }}>
            Certificate ID: {isPreview ? 'PREVIEW-NOT-A-REAL-ID' : data.certificateId}
          </p>

          {/* Tamu Academy footer */}
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A130E', margin: '1rem 0 0' }}>
            Tamu Academy
          </p>
        </div>
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