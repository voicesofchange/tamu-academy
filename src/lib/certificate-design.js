/**
 * certificate-design.js — the single source of truth for the official Tamu
 * Academy Certificate of Completion.
 *
 * Both the on-screen certificate sheet (TamuCertificateDocument) and the
 * downloadable PDF (generateTamuCertificatePDF) read their palette, wording
 * and layout values from here, so the sample reviewed on screen and the PDF
 * it produces stay identical.
 *
 * The wording below is the approved certificate copy. Changing it here changes
 * it everywhere the shared design is used.
 */

// ── Palette ────────────────────────────────────────────────────────────────
export const CERT_IVORY = '#FAF8F2';
export const CERT_NAVY = '#243B53';
export const CERT_GOLD = '#B69A5C';
export const CERT_SLATE = '#586475';

// Same RGB triples for the PDF renderer, which takes colour channels.
export const CERT_IVORY_RGB = [250, 248, 242];
export const CERT_NAVY_RGB = [36, 59, 83];
export const CERT_GOLD_RGB = [182, 154, 92];
export const CERT_SLATE_RGB = [88, 100, 117];

// ── Official identity assets ───────────────────────────────────────────────
// The academy's existing official logo. Never replaced or redrawn.
export const CERT_LOGO_URL =
  'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c6e9f2fb7_logo.png';

export const CERT_ACADEMY_NAME = 'Tamu Academy';
export const CERT_ACADEMY_ATTRIBUTION = 'An educational initiative of Waiyaki House';

// ── Certificate copy ───────────────────────────────────────────────────────
export const CERT_HEADING = 'Certificate of Completion';
export const CERT_PRESENTED_TO = 'This certificate is presented to';
export const CERT_COMPLETION_LEAD = 'For successfully completing the self-paced course';
export const CERT_OFFERED_THROUGH =
  'Offered through Tamu Academy, an educational initiative of Waiyaki House.';

export const CERT_AUTHORIZER_NAME = 'Tex Wambui, MPA';
export const CERT_AUTHORIZER_ROLE = 'Founder and Course Developer, Tamu Academy';

export const CERT_DATE_LABEL = 'Date of Completion';
export const CERT_ID_LABEL = 'Certificate ID';

// ── Design-sample data ─────────────────────────────────────────────────────
// Demonstration values used only on the administrator design-sample page. The
// certificate ID is deliberately recognisable as not a real credential, and
// no certificate record is ever created from these.
export const CERT_SAMPLE_NOTICE =
  'Administrator design sample — demonstration data only. No certificate record is created, changed or replaced.';

export const CERTIFICATE_SAMPLES = [
  {
    key: 'standard',
    label: 'Standard',
    hint: 'Short name, short title',
    learnerName: 'Amani Njeri Wanjiku',
    courseTitle: 'Building Wealth Together',
    completedAt: '2026-09-18T00:00:00.000Z',
    certificateId: 'SAMPLE-NOT-A-VALID-CERTIFICATE-ID',
  },
  {
    key: 'long-name',
    label: 'Long name',
    hint: 'Four-part learner name',
    learnerName: 'Nkosinathi Oluwaseun Adebayo-Washington Mwangi',
    courseTitle: 'Building Wealth Together',
    completedAt: '2026-09-18T00:00:00.000Z',
    certificateId: 'SAMPLE-NOT-A-VALID-CERTIFICATE-ID',
  },
  {
    key: 'long-title',
    label: 'Long course title',
    hint: 'Two-line course title',
    learnerName: 'Amani Njeri',
    courseTitle:
      'Understanding African Economies and the Global System: Trade, Power and Development in the Twenty-First Century',
    completedAt: '2026-09-18T00:00:00.000Z',
    certificateId: 'SAMPLE-NOT-A-VALID-CERTIFICATE-ID',
  },
  {
    key: 'long-both',
    label: 'Longest combined',
    hint: 'Long name and long title together',
    learnerName: 'Nkosinathi Oluwaseun Adebayo-Washington Mwangi',
    courseTitle:
      'Understanding African Economies and the Global System: Trade, Power and Development in the Twenty-First Century',
    completedAt: '2026-09-18T00:00:00.000Z',
    certificateId: 'SAMPLE-NOT-A-VALID-CERTIFICATE-ID',
  },
];

/** Formats a completion timestamp the way the certificate presents it. */
export function formatCertificateDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}