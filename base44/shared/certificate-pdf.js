/**
 * Server-side certificate PDF generator for Tamu Academy.
 *
 * Produces a landscape A4 PDF matching the on-screen certificate design,
 * and returns it as a base64 string for email attachment.
 *
 * Used by issueCourseCertificate to attach the PDF directly to the
 * learner notification email — so learners don't need to log in to
 * view their certificate.
 *
 * Import jspdf dynamically so the module loads cleanly in the Deno
 * backend runtime.
 */
import { jsPDF } from 'npm:jspdf@4.2.1';

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

/**
 * Generates a certificate PDF and returns it as a base64 string.
 *
 * @param {object} data - { learnerName, courseTitle, completedAt, completionStatement, certificateId }
 * @param {number} moduleCount - number of required modules in the course
 * @returns {string} base64-encoded PDF data (without the data: URI prefix)
 */
export async function generateCertificatePdfBase64(data, moduleCount = 6) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = 297;
  const pageHeight = 210;
  const cx = pageWidth / 2;
  const GOLD_C = [212, 161, 42];
  const ESP_C = [26, 19, 14];
  const MUTE_C = [120, 110, 95];

  const drawDiamond = (x, y, size) => {
    doc.setFillColor(...GOLD_C);
    doc.triangle(x, y - size, x + size, y, x, y + size, 'F');
    doc.triangle(x, y + size, x - size, y, x, y - size, 'F');
  };

  // Background
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  // Borders
  doc.setDrawColor(...GOLD_C);
  doc.setLineWidth(1.5);
  doc.rect(15, 12, pageWidth - 30, pageHeight - 24);
  doc.setDrawColor(200, 196, 188);
  doc.setLineWidth(0.3);
  doc.rect(18, 15, pageWidth - 36, pageHeight - 30);
  doc.setDrawColor(...GOLD_C);
  doc.setLineWidth(0.3);
  doc.rect(21, 18, pageWidth - 42, pageHeight - 36);

  // Corner ornaments
  const drawCorner = (x, y, fx, fy) => {
    doc.setDrawColor(...GOLD_C);
    doc.setLineWidth(0.5);
    doc.line(x, y, x + 22 * fx, y);
    doc.line(x, y, x, y + 22 * fy);
    doc.line(x, y, x + 12 * fx, y + 12 * fy);
    doc.setLineWidth(0.25);
    doc.line(x + 16 * fx, y, x + 16 * fx, y + 4 * fy);
    doc.line(x, y + 16 * fy, x + 4 * fx, y + 16 * fy);
    doc.setFillColor(...GOLD_C);
    doc.circle(x + 3 * fx, y + 3 * fy, 1.2, 'F');
  };
  drawCorner(24, 21, 1, 1);
  drawCorner(pageWidth - 24, 21, -1, 1);
  drawCorner(pageWidth - 24, pageHeight - 21, -1, -1);
  drawCorner(24, pageHeight - 21, 1, -1);

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
  drawDiamond(cx, 52, 1.5);

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
    doc.line(
      ex + Math.cos(rad) * 8.5,
      ey + Math.sin(rad) * 8.5,
      ex + Math.cos(rad) * 10.5,
      ey + Math.sin(rad) * 10.5
    );
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

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...MUTE_C);
  doc.text('This is to certify that', cx, 104, { align: 'center' });

  // Learner name
  doc.setFont('times', 'italic');
  doc.setFontSize(26);
  doc.setTextColor(...ESP_C);
  doc.text(data.learnerName || '', cx, 116, { align: 'center' });

  // Underline flourish
  doc.setDrawColor(...GOLD_C);
  doc.setLineWidth(0.3);
  doc.line(cx - 40, 120, cx - 3, 120);
  doc.line(cx + 3, 120, cx + 40, 120);
  drawDiamond(cx, 120, 1);

  const moduleWord = getModuleWord(moduleCount);
  const moduleCountLabel = getModuleCountLabel(moduleCount);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTE_C);
  doc.text(`has successfully completed all ${moduleWord} modules of`, cx, 130, { align: 'center' });

  // Course title
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...ESP_C);
  const titleLines = doc.splitTextToSize(data.courseTitle || '', pageWidth - 100);
  doc.text(titleLines, cx, 140, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...GOLD_C);
  doc.text(`A  ${moduleCountLabel}-MODULE  COURSE`, cx, 148, { align: 'center' });

  // Completion date
  const completedDate = data.completedAt
    ? new Date(data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTE_C);
  doc.text(`Date of Completion  \u00b7  ${completedDate}`, cx, 158, { align: 'center' });

  // Completion statement
  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 90, 78);
  const statement = data.completionStatement || '';
  const splitStatement = doc.splitTextToSize(statement, pageWidth - 90);
  doc.text(splitStatement, cx, 168, { align: 'center' });

  // Bottom gold divider
  const dy = pageHeight - 38;
  doc.setDrawColor(...GOLD_C);
  doc.setLineWidth(0.5);
  doc.line(cx - 35, dy, cx - 4, dy);
  doc.line(cx + 4, dy, cx + 35, dy);
  drawDiamond(cx, dy, 1.5);

  // Footer
  const footY = pageHeight - 26;
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
    doc.line(
      cx + Math.cos(rad) * 6.2,
      footY - 1 + Math.sin(rad) * 6.2,
      cx + Math.cos(rad) * 7.2,
      footY - 1 + Math.sin(rad) * 7.2
    );
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
  doc.text(data.certificateId || '', pageWidth - 42, footY + 4, { align: 'right' });

  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1];
}