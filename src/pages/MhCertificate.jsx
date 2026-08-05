import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MhCertificateDocument from '@/components/courses/MhCertificateDocument';
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
    const cx = pageWidth / 2;
    const GOLD_C = [212, 161, 42];
    const ESP_C = [26, 19, 14];
    const MUTE_C = [120, 110, 95];

    // Background
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer border
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(1.5);
    doc.rect(15, 12, pageWidth - 30, pageHeight - 24);

    // Middle espresso border (faint — lightened color approximates 12% opacity on cream)
    doc.setDrawColor(200, 196, 188);
    doc.setLineWidth(0.3);
    doc.rect(18, 15, pageWidth - 36, pageHeight - 30);

    // Inner gold border
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.3);
    doc.rect(21, 18, pageWidth - 42, pageHeight - 36);

    // Corner ornaments (L-frames with concentric arcs + diamond)
    const drawCorner = (x, y, fx, fy) => {
      doc.setDrawColor(...GOLD_C);
      doc.setLineWidth(0.5);
      doc.line(x, y, x + 22 * fx, y);
      doc.line(x, y, x, y + 22 * fy);
      doc.line(x, y, x + 12 * fx, y + 12 * fy);
      // concentric arcs
      doc.setLineWidth(0.3);
      // diamond node
      doc.setFillColor(...GOLD_C);
      const dx = x + 3 * fx, dy = y + 3 * fy;
      // small diamond
      doc.lines([[[0, 3 * fy], [3 * fx, 0], [0, -3 * fy], [-3 * fx, 0]]], dx, dy, [1, 1], 'F', false);
      // tick marks
      doc.setLineWidth(0.25);
      doc.line(x + 16 * fx, y, x + 16 * fx, y + 4 * fy);
      doc.line(x, y + 16 * fy, x + 4 * fx, y + 16 * fy);
    };
    drawCorner(24, 21, 1, 1);                              // top-left
    drawCorner(pageWidth - 24, 21, -1, 1);                 // top-right
    drawCorner(pageWidth - 24, pageHeight - 21, -1, -1);   // bottom-right
    drawCorner(24, pageHeight - 21, 1, -1);                // bottom-left

    // Institution name
    doc.setFont('times', 'bold');
    doc.setTextColor(...ESP_C);
    doc.setFontSize(18);
    doc.text('TAMU ACADEMY', cx, 40, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...MUTE_C);
    doc.text('PEOPLE  &  PROSPERITY', cx, 46, { align: 'center' });

    // Gold divider with center diamond
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.5);
    doc.line(cx - 30, 52, cx - 4, 52);
    doc.line(cx + 4, 52, cx + 30, 52);
    // center diamond
    doc.setFillColor(...GOLD_C);
    doc.lines([[[0, 1.5], [1.5, 0], [0, -1.5], [-1.5, 0]]], cx, 52, [1, 1], 'F', false);

    // Central emblem (sunburst)
    const ex = cx, ey = 64;
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.4);
    doc.circle(ex, ey, 8, 'S');
    doc.setLineWidth(0.2);
    doc.circle(ex, ey, 5.5, 'S');
    doc.setFillColor(...GOLD_C);
    doc.circle(ex, ey, 2, 'F');
    doc.setLineWidth(0.5);
    for (let a = 0; a < 360; a += 45) {
      const rad = (a * Math.PI) / 180;
      const x1 = ex + Math.cos(rad) * 8.5;
      const y1 = ey + Math.sin(rad) * 8.5;
      const x2 = ex + Math.cos(rad) * 10.5;
      const y2 = ey + Math.sin(rad) * 10.5;
      doc.line(x1, y1, x2, y2);
    }

    // Certificate of Completion
    doc.setFont('times', 'italic');
    doc.setFontSize(30);
    doc.setTextColor(...ESP_C);
    doc.text('Certificate of Completion', cx, 86, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...GOLD_C);
    doc.text('AWARDED  WITH  DISTINCTION', cx, 92, { align: 'center' });

    // This certifies that
    doc.setFont('times', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(...MUTE_C);
    doc.text('This is to certify that', cx, 104, { align: 'center' });

    // Learner name
    doc.setFont('times', 'italic');
    doc.setFontSize(26);
    doc.setTextColor(...ESP_C);
    doc.text(state.data.learnerName || '', cx, 116, { align: 'center' });

    // Underline flourish
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.3);
    doc.line(cx - 40, 120, cx - 3, 120);
    doc.line(cx + 3, 120, cx + 40, 120);
    doc.setFillColor(...GOLD_C);
    doc.lines([[[0, 1], [1, 0], [0, -1], [-1, 0]]], cx, 120, [1, 1], 'F', false);

    // Has completed
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...MUTE_C);
    doc.text('has successfully completed all seven modules of', cx, 130, { align: 'center' });

    // Course title
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...ESP_C);
    const titleLines = doc.splitTextToSize(state.data.courseTitle || '', pageWidth - 100);
    doc.text(titleLines, cx, 140, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD_C);
    doc.text('A  SEVEN-MODULE  COURSE', cx, 148, { align: 'center' });

    // Completion date
    const completedDate = state.data.completedAt
      ? new Date(state.data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTE_C);
    doc.text(`Date of Completion  ·  ${completedDate}`, cx, 158, { align: 'center' });

    // Completion statement (wrapped)
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 90, 78);
    const statement = state.data.completionStatement || '';
    const splitStatement = doc.splitTextToSize(statement, pageWidth - 90);
    doc.text(splitStatement, cx, 168, { align: 'center' });

    // Bottom gold divider
    const dy = pageHeight - 38;
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.5);
    doc.line(cx - 35, dy, cx - 4, dy);
    doc.line(cx + 4, dy, cx + 35, dy);
    doc.setFillColor(...GOLD_C);
    doc.lines([[[0, 1.5], [1.5, 0], [0, -1.5], [-1.5, 0]]], cx, dy, [1, 1], 'F', false);

    // Footer: signature line (left), seal (center), cert ID (right)
    const footY = pageHeight - 26;
    // Left signature
    doc.setDrawColor(...ESP_C);
    doc.setLineWidth(0.2);
    doc.line(40, footY - 4, 95, footY - 4);
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...ESP_C);
    doc.text('Tamu Academy', 42, footY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...MUTE_C);
    doc.text('ISSUING  INSTITUTION', 42, footY + 4);

    // Center seal
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.4);
    doc.circle(cx, footY - 1, 6, 'S');
    doc.setLineWidth(0.2);
    doc.circle(cx, footY - 1, 4.5, 'S');
    doc.setFillColor(...GOLD_C);
    doc.circle(cx, footY - 1, 1.5, 'F');
    doc.setLineWidth(0.3);
    for (let a = 0; a < 360; a += 60) {
      const rad = (a * Math.PI) / 180;
      const x1 = cx + Math.cos(rad) * 6.2;
      const y1 = footY - 1 + Math.sin(rad) * 6.2;
      const x2 = cx + Math.cos(rad) * 7.2;
      const y2 = footY - 1 + Math.sin(rad) * 7.2;
      doc.line(x1, y1, x2, y2);
    }

    // Right certificate ID
    doc.setDrawColor(...ESP_C);
    doc.setLineWidth(0.2);
    doc.line(pageWidth - 95, footY - 4, pageWidth - 40, footY - 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...MUTE_C);
    doc.text('CERTIFICATE  ID', pageWidth - 42, footY, { align: 'right' });
    doc.setFont('courier', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...ESP_C);
    const certId = isPreview ? 'PREVIEW-NOT-A-REAL-ID' : (state.data.certificateId || '');
    doc.text(certId, pageWidth - 42, footY + 4, { align: 'right' });

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
      <div ref={certificateRef}>
        <MhCertificateDocument data={data} isPreview={isPreview} />
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