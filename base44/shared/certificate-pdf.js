/**
 * Server-side certificate PDF generator for Tamu Academy.
 *
 * The official Certificate of Completion, as a landscape US Letter PDF
 * (11 x 8.5 in) drawn with vector shapes and real PDF text, returned as a
 * base64 string for email attachment.
 *
 * Used by issueCourseCertificate to attach the PDF directly to the learner
 * notification email, so learners don't need to log in to view their
 * certificate, and by adminCorrectCertificate when a corrected certificate is
 * re-sent. It mirrors the on-screen sheet (src/components/certificates/
 * TamuCertificateDocument.jsx) and the browser download
 * (src/lib/generate-tamu-certificate-pdf.js): same palette, same wording, same
 * centred layout that lets a long learner name or course title wrap and push
 * the blocks below it down without overlapping.
 *
 * The backend cannot import the client's design module, so the palette and
 * wording are mirrored here. Change them in both places together.
 *
 * Deliberately absent: no QR code is drawn, because certificate verification
 * does not exist yet, and no handwritten signature image is ever fabricated.
 *
 * Import jspdf dynamically so the module loads cleanly in the Deno
 * backend runtime.
 */
import { jsPDF } from 'npm:jspdf@4.2.1';

// ── Palette and wording (mirrors src/lib/certificate-design.js) ────────────
const IVORY = [250, 248, 242];
const NAVY = [36, 59, 83];
const GOLD = [182, 154, 92];
const SLATE = [88, 100, 117];

const LOGO_URL =
  'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c6e9f2fb7_logo.png';

const ACADEMY_NAME = 'TAMU ACADEMY';
const ACADEMY_ATTRIBUTION = 'An educational initiative of Waiyaki House';
const HEADING = 'CERTIFICATE OF COMPLETION';
const PRESENTED_TO = 'This certificate is presented to';
const COMPLETION_LEAD = 'For successfully completing the self-paced course';
const OFFERED_THROUGH =
  'Offered through Tamu Academy, an educational initiative of Waiyaki House.';
const AUTHORIZER_NAME = 'Tex Wambui, MPA';
const AUTHORIZER_ROLE = 'Founder and Course Developer, Tamu Academy';
const DATE_LABEL = 'Date of Completion';
const ID_LABEL = 'Certificate ID';
const PREVIEW_ID = 'PREVIEW-NOT-A-REAL-ID';

const NUMBER_WORDS = {
  1: ['one', 'ONE'],
  2: ['two', 'TWO'],
  3: ['three', 'THREE'],
  4: ['four', 'FOUR'],
  5: ['five', 'FIVE'],
  6: ['six', 'SIX'],
  7: ['seven', 'SEVEN'],
  8: ['eight', 'EIGHT'],
  9: ['nine', 'NINE'],
  10: ['ten', 'TEN'],
};

export function getModuleWord(count) {
  return NUMBER_WORDS[count]?.[0] || String(count);
}

export function getModuleCountLabel(count) {
  return NUMBER_WORDS[count]?.[1] || String(count).toUpperCase();
}

/** Reads the official logo bytes for embedding; null when it cannot be read. */
async function loadLogoBytes() {
  try {
    const res = await fetch(LOGO_URL);
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    return bytes.length ? bytes : null;
  } catch (_) {
    return null;
  }
}

/**
 * Generates the official certificate PDF and returns it as a base64 string.
 *
 * @param {object} data - { learnerName, courseTitle, completedAt, certificateId, preview }
 * @param {number} moduleCount - retained for the existing callers' signature.
 *   The approved certificate design names the course without a module-count
 *   line, so it no longer affects the sheet.
 * @returns {string} base64-encoded PDF data (without the data: URI prefix)
 */
export async function generateCertificatePdfBase64(data, moduleCount = 6) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const cx = pageWidth / 2;
  const rightEdge = pageWidth - 24;
  const leftEdge = 24;

  const completedDate = data.completedAt
    ? new Date(data.completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const certificateId = data.preview ? PREVIEW_ID : (data.certificateId || '');

  // ── Ground ──────────────────────────────────────────────────────────────
  doc.setFillColor(...IVORY);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Restrained double gold border.
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setLineWidth(0.25);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // ── Official logo ───────────────────────────────────────────────────────
  const logoBytes = await loadLogoBytes();
  let mastheadBaseline = 28;
  if (logoBytes) {
    try {
      const props = doc.getImageProperties(logoBytes);
      const ratio = props.width / props.height;
      let w = 30;
      let h = w / ratio;
      if (h > 16) {
        h = 16;
        w = h * ratio;
      }
      doc.addImage(logoBytes, props.fileType || 'PNG', cx - w / 2, 18, w, h);
      mastheadBaseline = 18 + h + 10;
    } catch (_) {
      mastheadBaseline = 28;
    }
  }

  // ── Academy lockup ──────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...NAVY);
  doc.text(ACADEMY_NAME, cx, mastheadBaseline, { align: 'center', charSpace: 1.6 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...SLATE);
  doc.text(ACADEMY_ATTRIBUTION, cx, mastheadBaseline + 6.5, { align: 'center' });

  // ── Main heading ────────────────────────────────────────────────────────
  const headingBaseline = mastheadBaseline + 24;
  doc.setFont('times', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(...NAVY);
  doc.text(HEADING, cx, headingBaseline, { align: 'center', charSpace: 1 });

  // Short gold accent line beneath the heading.
  const accentY = headingBaseline + 6;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(cx - 23, accentY, cx + 23, accentY);

  // ── Recipient and course block ──────────────────────────────────────────
  // Measured first, then centred in the band above the footer so the sheet
  // stays balanced for any name or title length.
  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  const nameLines = doc.splitTextToSize(String(data.learnerName || ''), 200);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize(String(data.courseTitle || ''), 200);

  const blockHeight =
    9 + nameLines.length * 9.5 + 7 + 7.5 + titleLines.length * 7 + 6;

  const bandBottom = pageHeight - 54;
  const bandTop = accentY + 12;
  let y = Math.max(bandTop, bandBottom - blockHeight);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...SLATE);
  doc.text(PRESENTED_TO, cx, y, { align: 'center' });
  y += 9;

  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(...NAVY);
  doc.text(nameLines, cx, y, { align: 'center', lineHeightFactor: 1.15 });
  y += nameLines.length * 9.5 + 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...SLATE);
  doc.text(COMPLETION_LEAD, cx, y, { align: 'center' });
  y += 7.5;

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...NAVY);
  doc.text(titleLines, cx, y, { align: 'center', lineHeightFactor: 1.2 });
  y += titleLines.length * 7 + 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...SLATE);
  doc.text(OFFERED_THROUGH, cx, y, { align: 'center' });

  // ── Footer ──────────────────────────────────────────────────────────────
  const dividerY = pageHeight - 50;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(cx - 30, dividerY, cx - 4, dividerY);
  doc.line(cx + 4, dividerY, cx + 30, dividerY);
  doc.setFillColor(...GOLD);
  doc.triangle(cx, dividerY - 1.4, cx + 1.4, dividerY, cx, dividerY + 1.4, 'F');
  doc.triangle(cx, dividerY + 1.4, cx - 1.4, dividerY, cx, dividerY - 1.4, 'F');

  const ruleY = pageHeight - 42;
  doc.setDrawColor(...SLATE);
  doc.setLineWidth(0.2);
  doc.line(leftEdge, ruleY, leftEdge + 62, ruleY);
  doc.line(rightEdge - 62, ruleY, rightEdge, ruleY);

  // Authorized by — left. No signature image is ever fabricated.
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  doc.text(AUTHORIZER_NAME, leftEdge, ruleY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...SLATE);
  doc.text(doc.splitTextToSize(AUTHORIZER_ROLE, 66), leftEdge, ruleY + 12.5);

  // Date and identifier — right.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.text(DATE_LABEL, rightEdge, ruleY + 2, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...NAVY);
  doc.text(completedDate, rightEdge, ruleY + 7, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.text(ID_LABEL, rightEdge, ruleY + 13, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...NAVY);
  doc.text(certificateId, rightEdge, ruleY + 17.5, { align: 'right' });

  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1];
}