import React from 'react';
import {
  CERT_IVORY,
  CERT_NAVY,
  CERT_GOLD,
  CERT_SLATE,
  CERT_LOGO_URL,
  CERT_ACADEMY_NAME,
  CERT_ACADEMY_ATTRIBUTION,
  CERT_HEADING,
  CERT_PRESENTED_TO,
  CERT_COMPLETION_LEAD,
  CERT_OFFERED_THROUGH,
  CERT_AUTHORIZER_NAME,
  CERT_AUTHORIZER_ROLE,
  CERT_DATE_LABEL,
  CERT_ID_LABEL,
  formatCertificateDate,
} from '@/lib/certificate-design';

const serif = "'Cormorant Garamond', Georgia, serif";

/**
 * TamuCertificateDocument — the official Tamu Academy Certificate of
 * Completion, as a landscape US Letter sheet (11 × 8.5).
 *
 * The sheet keeps that exact proportion so what the administrator reviews on
 * screen matches the downloadable PDF. Below 720px the fixed ratio is released
 * (see .tamu-cert-sheet in index.css) so the same content reflows rather than
 * overflowing on a phone.
 *
 * Long learner names and long course titles wrap inside the layout and push the
 * blocks below them down; nothing is truncated and nothing overlaps.
 *
 * No signature image is drawn: the authorizer is set as plain text with a
 * signature rule, and a handwritten signature is only ever added once an
 * approved image is explicitly uploaded.
 *
 * Props: { learnerName, courseTitle, completedAt, certificateId }
 */
export default function TamuCertificateDocument({
  learnerName,
  courseTitle,
  completedAt,
  certificateId,
}) {
  const completedDate = formatCertificateDate(completedAt);

  return (
    <div
      className="tamu-cert-sheet"
      style={{
        backgroundColor: CERT_IVORY,
        border: `1px solid ${CERT_GOLD}`,
        padding: 'clamp(0.9rem, 2.2vw, 1.8rem)',
      }}
    >
      {/* Inner hairline rule */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 'clamp(0.45rem, 1.1vw, 0.85rem)',
          border: `0.5px solid ${CERT_GOLD}`,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* ── Top: official logo lockup ───────────────────────────────────── */}
      <header style={{ position: 'relative' }}>
        <img
          src={CERT_LOGO_URL}
          alt="Tamu Academy"
          style={{
            display: 'block',
            margin: '0 auto',
            height: 'clamp(1.9rem, 4.6vw, 3.6rem)',
            width: 'auto',
          }}
        />
        <p
          className="tamu-cert-navy"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(0.92rem, 1.9vw, 1.45rem)',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: CERT_NAVY,
            margin: 'clamp(0.4rem, 1vw, 0.85rem) 0 0',
            paddingLeft: '0.3em',
          }}
        >
          {CERT_ACADEMY_NAME}
        </p>
        <p
          className="tamu-cert-slate"
          style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.76rem)',
            color: CERT_SLATE,
            margin: '0.3rem 0 0',
          }}
        >
          {CERT_ACADEMY_ATTRIBUTION}
        </p>
      </header>

      {/* ── Main heading with gold accent rule ──────────────────────────── */}
      <section style={{ position: 'relative' }}>
        <h1
          className="tamu-cert-navy"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.35rem, 3.2vw, 2.45rem)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: CERT_NAVY,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {CERT_HEADING}
        </h1>
        <div
          aria-hidden="true"
          style={{
            width: 'clamp(3rem, 8vw, 6.5rem)',
            height: '2px',
            background: CERT_GOLD,
            margin: 'clamp(0.4rem, 1vw, 0.8rem) auto 0',
          }}
        />
      </section>

      {/* ── Recipient and course ────────────────────────────────────────── */}
      <section style={{ position: 'relative' }}>
        <p
          className="tamu-cert-slate"
          style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.9rem)', color: CERT_SLATE, margin: 0 }}
        >
          {CERT_PRESENTED_TO}
        </p>
        <p
          className="tamu-cert-navy"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.25rem, 2.9vw, 2.2rem)',
            fontWeight: 500,
            color: CERT_NAVY,
            margin: 'clamp(0.3rem, 0.8vw, 0.6rem) 0 0',
            lineHeight: 1.22,
            overflowWrap: 'anywhere',
          }}
        >
          {learnerName}
        </p>

        <p
          className="tamu-cert-slate"
          style={{
            fontSize: 'clamp(0.68rem, 1.2vw, 0.9rem)',
            color: CERT_SLATE,
            margin: 'clamp(0.7rem, 1.8vw, 1.3rem) 0 0',
          }}
        >
          {CERT_COMPLETION_LEAD}
        </p>
        <p
          className="tamu-cert-navy"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(0.92rem, 1.9vw, 1.45rem)',
            fontWeight: 600,
            color: CERT_NAVY,
            margin: 'clamp(0.3rem, 0.8vw, 0.55rem) auto 0',
            lineHeight: 1.32,
            maxWidth: '44rem',
          }}
        >
          {courseTitle}
        </p>
        <p
          className="tamu-cert-slate"
          style={{
            fontSize: 'clamp(0.58rem, 1vw, 0.74rem)',
            color: CERT_SLATE,
            margin: 'clamp(0.35rem, 1vw, 0.7rem) 0 0',
          }}
        >
          {CERT_OFFERED_THROUGH}
        </p>
      </section>

      {/* ── Authorization and footer ────────────────────────────────────── */}
      <footer style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            height: '1px',
            background: CERT_GOLD,
            opacity: 0.5,
            margin: '0 0 clamp(0.6rem, 1.6vw, 1.2rem)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.25rem',
            textAlign: 'left',
          }}
        >
          {/* Authorized by */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <div
              aria-hidden="true"
              style={{
                width: 'clamp(6rem, 16vw, 11rem)',
                height: '1px',
                background: CERT_SLATE,
                opacity: 0.5,
                marginBottom: '0.4rem',
              }}
            />
            <p
              className="tamu-cert-navy"
              style={{
                fontFamily: serif,
                fontSize: 'clamp(0.78rem, 1.4vw, 1rem)',
                fontWeight: 600,
                color: CERT_NAVY,
                margin: 0,
              }}
            >
              {CERT_AUTHORIZER_NAME}
            </p>
            <p
              className="tamu-cert-slate"
              style={{
                fontSize: 'clamp(0.54rem, 0.9vw, 0.7rem)',
                color: CERT_SLATE,
                margin: '0.2rem 0 0',
              }}
            >
              {CERT_AUTHORIZER_ROLE}
            </p>
          </div>

          {/* Date and certificate identifier */}
          <div style={{ flex: '1 1 0', minWidth: 0, textAlign: 'right' }}>
            <p
              className="tamu-cert-slate"
              style={{ fontSize: 'clamp(0.54rem, 0.9vw, 0.7rem)', color: CERT_SLATE, margin: 0 }}
            >
              {CERT_DATE_LABEL}
            </p>
            <p
              className="tamu-cert-navy"
              style={{
                fontSize: 'clamp(0.62rem, 1.05vw, 0.8rem)',
                fontWeight: 500,
                color: CERT_NAVY,
                margin: '0.15rem 0 clamp(0.3rem, 0.8vw, 0.5rem)',
              }}
            >
              {completedDate}
            </p>
            <p
              className="tamu-cert-slate"
              style={{ fontSize: 'clamp(0.54rem, 0.9vw, 0.7rem)', color: CERT_SLATE, margin: 0 }}
            >
              {CERT_ID_LABEL}
            </p>
            <p
              className="tamu-cert-navy"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 'clamp(0.54rem, 0.95vw, 0.72rem)',
                color: CERT_NAVY,
                margin: '0.15rem 0 0',
                overflowWrap: 'anywhere',
              }}
            >
              {certificateId}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}