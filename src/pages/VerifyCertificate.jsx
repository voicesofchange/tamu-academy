import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import CertificateVerification, { normalizeVerificationCode } from '@/components/certificates/CertificateVerification';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * VerifyCertificate — public page at /verify. Anyone can enter a
 * certificate's TAMU- code, or arrive with it already filled in from the QR
 * code on the certificate (/verify?code=TAMU-…). Submitting writes the code
 * into the address, so a checked result can be shared as a link.
 *
 * Other public entry points (/soko-certificate?id=…) render this page with
 * their own `code`; a new code entered there opens /verify.
 */

const CONTENT = {
  heroEyebrow: 'Certificate Verification',
  heroHeading: 'Verify a Tamu Academy Certificate',
  heroSubheading:
    'Check that a Tamu Academy certificate is genuine. Enter its verification code, or scan the QR code printed on the certificate.',
  privacyNote:
    'Only the name, course, dates and status recorded on the certificate are shown. No other information about the learner is shared.',
};

export default function VerifyCertificate({ code: codeFromEntryPoint }) {
  const { content: c } = useTranslatedContent('verify-certificate', CONTENT);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const onVerifyPage = codeFromEntryPoint === undefined;
  const code = normalizeVerificationCode(onVerifyPage ? searchParams.get('code') : codeFromEntryPoint);

  const handleSubmitCode = (next) => {
    if (onVerifyPage) {
      setSearchParams(next ? { code: next } : {});
    } else {
      navigate(next ? `/verify?code=${encodeURIComponent(next)}` : '/verify');
    }
  };

  return (
    <PageLayout>
      <PageMeta
        title="Verify a Certificate | Tamu Academy"
        description="Check that a Tamu Academy certificate of completion is genuine using its verification code."
        path="/verify"
      />
      <PageHero eyebrow={c.heroEyebrow} heading={c.heroHeading} subheading={c.heroSubheading} />
      <PageSection>
        <CertificateVerification code={code} onSubmitCode={handleSubmitCode} />
        <p
          className="font-body"
          style={{ maxWidth: '640px', margin: '2rem auto 0', color: 'rgba(243,234,216,0.5)', fontSize: '0.82rem', lineHeight: 1.7, fontWeight: 300 }}
        >
          {c.privacyNote}
        </p>
      </PageSection>
    </PageLayout>
  );
}
