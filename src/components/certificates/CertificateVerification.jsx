import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslation } from '@/lib/i18n';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { certificateLocale } from '@/lib/certificate-copy';
import { formatCertificateDate } from '@/lib/certificate-design';

/**
 * CertificateVerification — the public check behind /verify?code=… and
 * /soko-certificate?id=…, and the page a certificate's QR code opens.
 *
 * It asks verifyCertificate about one TAMU- code and shows only what that
 * function returns: the learner's name, the course, the dates and whether the
 * certificate is valid or revoked. The learner's name and the course title are
 * shown exactly as recorded; every other word goes through the translation
 * system.
 */

const CONTENT = {
  formLabel: 'Verification code',
  formHint: 'Enter the code printed under the QR code on the certificate, for example TAMU-1A2B3C4D.',
  formPlaceholder: 'TAMU-XXXXXXXX',
  formSubmit: 'Verify certificate',
  checking: 'Checking the certificate…',
  validBadge: 'Valid certificate',
  validBody: 'This certificate was issued by Tamu Academy and is valid.',
  revokedBadge: 'Certificate revoked',
  revokedBody: 'This certificate was issued by Tamu Academy but has since been revoked. It is no longer valid.',
  learnerLabel: 'Awarded to',
  courseLabel: 'Course',
  completedLabel: 'Date of completion',
  issuedLabel: 'Date issued',
  codeLabel: 'Verification code',
  notFoundHeading: 'No certificate found',
  notFoundBody: 'No Tamu Academy certificate carries the code {code}. Check the code and try again.',
  invalidBody: 'A verification code starts with TAMU- and is followed by eight letters and numbers.',
  rateLimitedBody: 'Too many checks from this connection. Please wait a few minutes and try again.',
  errorBody: 'The certificate could not be checked just now. Please try again shortly.',
};

const CODE_PATTERN = /^TAMU-[0-9A-F]{8}$/;

export function normalizeVerificationCode(value) {
  return String(value || '').trim().toUpperCase();
}

const labelStyle = {
  display: 'block',
  color: '#e8b85b',
  fontSize: '0.68rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '0.35rem',
};
const valueStyle = { color: '#f8f0df', fontSize: '1rem', lineHeight: 1.5, margin: 0, overflowWrap: 'anywhere' };
const bodyStyle = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: 0 };

export default function CertificateVerification({ code = '', showForm = true, onSubmitCode }) {
  const { content: c } = useTranslatedContent('certificate-verification', CONTENT);
  const { language } = useTranslation();
  const normalized = normalizeVerificationCode(code);
  const [input, setInput] = useState(normalized);
  const [result, setResult] = useState({ status: normalized ? 'loading' : 'idle' });

  useEffect(() => {
    setInput(normalized);
    if (!normalized) {
      setResult({ status: 'idle' });
      return undefined;
    }
    if (!CODE_PATTERN.test(normalized)) {
      setResult({ status: 'invalid' });
      return undefined;
    }
    let cancelled = false;
    setResult({ status: 'loading' });
    (async () => {
      try {
        const res = await base44.functions.invoke('verifyCertificate', { code: normalized });
        if (cancelled) return;
        if (res && res.data && res.data.found && res.data.certificate) {
          setResult({ status: 'found', certificate: res.data.certificate });
        } else {
          setResult({ status: 'notFound' });
        }
      } catch (err) {
        if (cancelled) return;
        const httpStatus = err?.response?.status;
        if (httpStatus === 404) setResult({ status: 'notFound' });
        else if (httpStatus === 400) setResult({ status: 'invalid' });
        else if (httpStatus === 429) setResult({ status: 'rateLimited' });
        else setResult({ status: 'error' });
      }
    })();
    return () => { cancelled = true; };
  }, [normalized]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = normalizeVerificationCode(input);
    if (onSubmitCode) onSubmitCode(next);
  };

  const locale = certificateLocale(language);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }} noValidate>
          <label htmlFor="verification-code" className="font-body" style={labelStyle}>{c.formLabel}</label>
          <p id="verification-code-hint" className="font-body" style={{ ...bodyStyle, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {c.formHint}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <input
              id="verification-code"
              name="code"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-describedby="verification-code-hint"
              placeholder={c.formPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-body"
              style={{
                flex: '1 1 220px',
                minWidth: 0,
                padding: '0.7rem 0.9rem',
                fontSize: '1rem',
                fontFamily: "'Courier New', monospace",
                letterSpacing: '0.06em',
                color: '#f8f0df',
                backgroundColor: 'rgba(243,234,216,0.04)',
                border: '1px solid rgba(232,184,91,0.35)',
                borderRadius: '2px',
              }}
            />
            <button
              type="submit"
              className="font-body"
              style={{
                padding: '0.7rem 1.3rem',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: '#24150f',
                backgroundColor: '#e8b85b',
                border: '1px solid #e8b85b',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {c.formSubmit}
            </button>
          </div>
        </form>
      )}

      <div aria-live="polite">
        {result.status === 'loading' && (
          <p className="font-body" style={bodyStyle}>{c.checking}</p>
        )}

        {result.status === 'found' && (
          <VerifiedCertificate certificate={result.certificate} c={c} locale={locale} />
        )}

        {result.status === 'notFound' && (
          <Notice heading={c.notFoundHeading} body={fillTemplate(c.notFoundBody, { code: normalized })} />
        )}
        {result.status === 'invalid' && <Notice body={c.invalidBody} />}
        {result.status === 'rateLimited' && <Notice body={c.rateLimitedBody} />}
        {result.status === 'error' && <Notice body={c.errorBody} />}
      </div>
    </div>
  );
}

function VerifiedCertificate({ certificate, c, locale }) {
  const revoked = certificate.status === 'revoked';
  const accent = revoked ? '#e08a7a' : '#8fc9a3';
  const rows = [
    [c.learnerLabel, certificate.learner_name],
    [c.courseLabel, certificate.course_title],
    [c.completedLabel, formatCertificateDate(certificate.completed_at, locale)],
    [c.issuedLabel, formatCertificateDate(certificate.issued_at, locale)],
    [c.codeLabel, certificate.verification_code],
  ].filter(([, value]) => value);

  return (
    <section
      aria-label={revoked ? c.revokedBadge : c.validBadge}
      style={{
        border: `1px solid ${revoked ? 'rgba(224,138,122,0.45)' : 'rgba(143,201,163,0.45)'}`,
        borderRadius: '4px',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
        backgroundColor: 'rgba(243,234,216,0.02)',
      }}
    >
      <p className="font-body" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.75rem', color: accent, fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
        <span aria-hidden="true">{revoked ? '✕' : '✓'}</span>
        {revoked ? c.revokedBadge : c.validBadge}
      </p>
      <p className="font-body" style={{ ...bodyStyle, marginBottom: '1.5rem' }}>{revoked ? c.revokedBody : c.validBody}</p>
      <dl style={{ display: 'grid', gap: '1.1rem', margin: 0 }}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="font-body" style={labelStyle}>{label}</dt>
            <dd className={label === c.codeLabel ? '' : 'font-heading'} style={{ ...valueStyle, marginLeft: 0, fontFamily: label === c.codeLabel ? "'Courier New', monospace" : undefined }}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Notice({ heading, body }) {
  return (
    <div style={{ padding: '1.25rem 1.5rem', borderLeft: '2px solid rgba(232,184,91,0.45)', backgroundColor: 'rgba(232,184,91,0.03)' }}>
      {heading && (
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.5rem' }}>{heading}</h2>
      )}
      <p className="font-body" style={bodyStyle}>{body}</p>
    </div>
  );
}
