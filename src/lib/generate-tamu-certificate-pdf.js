import {
  CERT_IVORY_RGB,
  CERT_NAVY_RGB,
  CERT_GOLD_RGB,
  CERT_SLATE_RGB,
  CERT_LOGO_URL,
  CERT_ACADEMY_NAME,
  CERT_AUTHORIZER_NAME,
  formatCertificateDate,
  resolveCertificateId,
  certificateVerifyUrl,
} from '@/lib/certificate-design';
import { certificateLocale, loadCertificateCopy } from '@/lib/certificate-copy';

/**
 * generateTamuCertificatePDF — the official Tamu Academy Certificate of
 * Completion as a downloadable PDF.
 *
 * Landscape US Letter (11 × 8.5 in), drawn with vector shapes and real PDF
 * text, so the result is selectable text rather than an image of a page, and
 * it stays crisp at any print size. Fonts are PDF standard faces (Times,
 * Helvetica, Courier), which every reader and printer resolves.
 *
 * The layout is computed, not fixed: a long learner name or course title wraps
 * and pushes the blocks below it down inside a centred band, so nothing
 * overlaps the gold divider or the footer.
 *
 * A certificate that carries a verification code also gets a QR code, centred
 * in the footer, that opens its public page at tamuacademy.org/verify. It is
 * drawn as vector squares like the rest of the sheet, so it scans at any size.
 * Deliberately absent always: no handwritten signature image is fabricated.
 */

const PAGE_MARGIN = 10; // outer gold border inset (mm)

/**
 * Loads the official logo for embedding. Resolves to null when the image
 * cannot be read into the PDF (for example if the host does not allow the
 * cross-origin read). The certificate still renders correctly without it —
 * the academy lockup below simply carries the top of the sheet.
 */
function loadCertificateLogo() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof window.Image === 'undefined') {
      resolve(null);
      return;
    }
    const img = new window.Image();
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    img.crossOrigin = 'anonymous';
    img.onload = () => done(img);
    img.onerror = () => done(null);
    img.src = CERT_LOGO_URL;
    setTimeout(() => done(null), 4000);
  });
}

/**
 * Draw the verification QR code centred on `cx`, with its label and the
 * code itself underneath. The code is encoded with medium error correction
 * on a white quiet zone, and dark modules are merged into horizontal runs so
 * the PDF stays small.
 */
async function drawVerificationQr(doc, { url, code, label, cx, top }) {
  const mod = await import('qrcode');
  const QRCode = mod.default || mod;
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const count = qr.modules.size;
  const size = 17; // mm
  const quiet = 1.2; // mm of white around the symbol
  const cell = size / count;
  const left = cx - size / 2;

  doc.setFillColor(255, 255, 255);
  doc.rect(left - quiet, top - quiet, size + quiet * 2, size + quiet * 2, 'F');

  doc.setFillColor(...CERT_NAVY_RGB);
  for (let row = 0; row < count; row += 1) {
    let runStart = -1;
    for (let col = 0; col <= count; col += 1) {
      const dark = col < count && qr.modules.get(row, col);
      if (dark && runStart < 0) runStart = col;
      if (!dark && runStart >= 0) {
        // A hair of overlap closes the seams some viewers draw between cells.
        doc.rect(left + runStart * cell, top + row * cell, (col - runStart) * cell + 0.01, cell + 0.01, 'F');
        runStart = -1;
      }
    }
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(label, cx, top + size + quiet + 3.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(code, cx, top + size + quiet + 6.6, { align: 'center' });
}

export async function generateTamuCertificatePDF({
  learnerName,
  courseTitle,
  completedAt,
  certificateId,
  verificationCode = null,
  isPreview = false,
  fileName = 'tamu-academy-certificate.pdf',
}) {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const cx = pageWidth / 2;
  const rightEdge = pageWidth - 24;
  const leftEdge = 24;

  // The fixed wording is drawn in the learner's language; the learner's name
  // and the course title are drawn exactly as recorded.
  const { copy, language } = await loadCertificateCopy();
  const completedDate = formatCertificateDate(completedAt, certificateLocale(language));
  const displayId = resolveCertificateId(certificateId, isPreview);

  // ── Ground ──────────────────────────────────────────────────────────────
  doc.setFillColor(...CERT_IVORY_RGB);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Restrained double gold border.
  doc.setDrawColor(...CERT_GOLD_RGB);
  doc.setLineWidth(0.8);
  doc.rect(
    PAGE_MARGIN,
    PAGE_MARGIN,
    pageWidth - PAGE_MARGIN * 2,
    pageHeight - PAGE_MARGIN * 2,
  );
  doc.setLineWidth(0.25);
  doc.rect(
    PAGE_MARGIN + 3,
    PAGE_MARGIN + 3,
    pageWidth - (PAGE_MARGIN + 3) * 2,
    pageHeight - (PAGE_MARGIN + 3) * 2,
  );

  // ── Official logo ───────────────────────────────────────────────────────
  const logo = await loadCertificateLogo();
  let mastheadBaseline = 28;
  if (logo && logo.naturalWidth && logo.naturalHeight) {
    const maxWidth = 30;
    const maxHeight = 16;
    const ratio = logo.naturalWidth / logo.naturalHeight;
    let w = maxWidth;
    let h = w / ratio;
    if (h > maxHeight) {
      h = maxHeight;
      w = h * ratio;
    }
    const y = 18;
    try {
      doc.addImage(logo, 'PNG', cx - w / 2, y, w, h);
      mastheadBaseline = y + h + 10;
    } catch (_) {
      mastheadBaseline = 28;
    }
  }

  // ── Academy lockup ──────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(CERT_ACADEMY_NAME.toUpperCase(), cx, mastheadBaseline, {
    align: 'center',
    charSpace: 1.6,
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.academyAttribution, cx, mastheadBaseline + 6.5, { align: 'center' });

  // ── Main heading ────────────────────────────────────────────────────────
  const headingBaseline = mastheadBaseline + 24;
  doc.setFont('times', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(String(copy.heading).toUpperCase(), cx, headingBaseline, {
    align: 'center',
    charSpace: 1,
  });

  // Short gold accent line beneath the heading.
  const accentY = headingBaseline + 6;
  doc.setDrawColor(...CERT_GOLD_RGB);
  doc.setLineWidth(1);
  doc.line(cx - 23, accentY, cx + 23, accentY);

  // ── Recipient and course block ──────────────────────────────────────────
  // Measured first, then centred in the band between the heading and the
  // footer divider so the sheet stays balanced for any name or title length.
  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  const nameLines = doc.splitTextToSize(String(learnerName || ''), 200);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize(String(courseTitle || ''), 200);

  const blockHeight =
    9 + // presented-to line
    nameLines.length * 9.5 +
    7 +
    7.5 + // completion lead
    titleLines.length * 7 +
    6;

  const bandBottom = pageHeight - 54;
  const bandTop = accentY + 12;
  let y = Math.max(bandTop, bandBottom - blockHeight);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.presentedTo, cx, y, { align: 'center' });
  y += 9;

  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(nameLines, cx, y, { align: 'center', lineHeightFactor: 1.15 });
  y += nameLines.length * 9.5 + 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.completionLead, cx, y, { align: 'center' });
  y += 7.5;

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(titleLines, cx, y, { align: 'center', lineHeightFactor: 1.2 });
  y += titleLines.length * 7 + 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.offeredThrough, cx, y, { align: 'center' });

  // ── Footer ──────────────────────────────────────────────────────────────
  const dividerY = pageHeight - 50;
  doc.setDrawColor(...CERT_GOLD_RGB);
  doc.setLineWidth(0.6);
  doc.line(cx - 30, dividerY, cx - 4, dividerY);
  doc.line(cx + 4, dividerY, cx + 30, dividerY);
  // The gold diamond between the two rules, drawn as two triangles exactly as
  // base44/shared/certificate-pdf.js draws it. (The doc.lines() call this
  // replaces passed one extra level of nesting, which jsPDF 4 read as a curve
  // and rejected, so the download threw before saving.)
  doc.setFillColor(...CERT_GOLD_RGB);
  doc.triangle(cx, dividerY - 1.4, cx + 1.4, dividerY, cx, dividerY + 1.4, 'F');
  doc.triangle(cx, dividerY + 1.4, cx - 1.4, dividerY, cx, dividerY - 1.4, 'F');

  const ruleY = pageHeight - 42;
  doc.setDrawColor(...CERT_SLATE_RGB);
  doc.setLineWidth(0.2);
  doc.line(leftEdge, ruleY, leftEdge + 62, ruleY);
  doc.line(rightEdge - 62, ruleY, rightEdge, ruleY);

  // Authorized by — left. No signature image is ever fabricated.
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(CERT_AUTHORIZER_NAME, leftEdge, ruleY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(doc.splitTextToSize(copy.authorizerRole, 66), leftEdge, ruleY + 12.5);

  // Date and identifier — right.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.dateLabel, rightEdge, ruleY + 2, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(completedDate, rightEdge, ruleY + 7, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...CERT_SLATE_RGB);
  doc.text(copy.idLabel, rightEdge, ruleY + 13, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...CERT_NAVY_RGB);
  doc.text(displayId, rightEdge, ruleY + 17.5, { align: 'right' });

  // Verification QR code — centre, only for a real certificate with a code.
  if (verificationCode && !isPreview) {
    await drawVerificationQr(doc, {
      url: certificateVerifyUrl(verificationCode),
      code: verificationCode,
      label: copy.verifyLabel || 'Scan to verify',
      cx,
      top: ruleY - 4,
    });
  }

  doc.save(fileName);
}