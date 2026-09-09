import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  brandAttr: 'A Waiyaki House LLC learning venture',
  h1: 'Privacy Policy',
  effectiveDate: 'Effective date: July 23, 2026',
  lastUpdated: 'Last updated: July 23, 2026',
  s1Heading: '1. About Tamu Academy',
  s1Body: 'Tamu Academy is a learning venture of Waiyaki House LLC. We develop practical, culturally grounded learning in economics, governance, public policy, global affairs, and social change. This Privacy Policy explains what information we collect through our website, how we use it, and the choices you have. It applies to visitors to tamuacademy.org, including those who join our Early Access list.',
  s2Heading: '2. Information We Collect',
  s2Intro: 'We collect the following categories of information:',
  s2Email: 'Email address',
  s2EmailDesc: '— when you join the Early Access list or submit a contact inquiry.',
  s2Consent: 'Consent records',
  s2ConsentDesc: '— your acknowledgment that you agree to receive early-access updates.',
  s2Inquiry: 'Inquiry details',
  s2InquiryDesc: '— when you complete our contact form (name, email, country, organization, role, message, and any optional fields you provide).',
  s2Technical: 'Technical information',
  s2TechnicalDesc: '— standard server logs and browser information such as IP address, browser type, referring page, and timestamps, collected automatically when you visit our site.',
  s2Local: 'Local storage',
  s2LocalDesc: '— optional saved activity responses in your own browser, such as notes from module activities, when you choose to use those features.',
  s2Outro: 'You may decline to provide information at any time, though doing so may limit your ability to receive certain updates or use certain features.',
  s3Heading: '3. How We Use Information',
  s3Intro: 'We use the information we collect to:',
  s3Items: [
    'Send the course-launch updates and early-access information you requested.',
    'Respond to contact inquiries and partnership requests.',
    'Operate, maintain, and improve our website, courses, and learning materials.',
    'Review basic technical and security information to operate, protect, troubleshoot, and improve the website.',
    'Meet our legal, security, and operational obligations.',
  ],
  s3Outro: 'We do not use your information to make automated decisions that produce significant legal or similarly significant effects about you.',
  s4Heading: '4. How We Share Information',
  s4Intro: 'We may share your information:',
  s4Items: [
    'With service providers who help us operate our website, hosting, email delivery, and data storage, under appropriate contractual protections and only as needed to perform those services.',
    'When required by law, regulation, legal process, or government request, or to protect the rights, property, safety, or security of Tamu Academy, Waiyaki House LLC, our learners, or others.',
    'In connection with a sale, merger, or transfer of all or part of our business, with appropriate notice where practicable.',
  ],
  s4Outro: 'We do not sell your information. We do not share your information for cross-context behavioral advertising.',
  s5Heading: '5. Cookies, Local Storage, and Tracking',
  s5P1: 'Tamu Academy does not currently use advertising cookies, analytics pixels, or third-party tracking pixels.',
  s5P2: 'Some course activities use local storage to save optional activity responses in your browser. This information remains on your device unless you choose to clear it or share it separately.',
  s5P3: 'Our pages may include embedded YouTube videos. When you load or interact with an embedded video, Google or YouTube may collect technical and usage information and may use cookies or similar technologies under their own privacy practices.',
  s5P4: 'Some browsers send "Do Not Track" signals. Tamu Academy does not currently respond differently to these signals because we do not use personal information for cross-site behavioral advertising.',
  s5P5: 'Third-party services, including YouTube, may collect information about your activity over time and across different websites according to their own privacy policies.',
  s5P6: 'You can clear cookies and local storage through your browser settings. Doing so may remove saved activity responses or preferences.',
  s6Heading: '6. Data Retention and Your Choices',
  s6Body: 'We retain your email address and consent while you remain subscribed to early-access updates, and as reasonably necessary to honor our communication and legal obligations. You may unsubscribe from future updates at any time by using the unsubscribe mechanism in any email we send or by contacting us at info@sustainthevoices.org. You may also request access to, correction of, or deletion of your personal information by emailing us. We will respond within a reasonable time and as required by applicable law.',
  s7Heading: "7. Children's Privacy",
  s7Body: 'Tamu Academy is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will take steps to delete that information.',
  s8Heading: '8. Security',
  s8Body: 'We use reasonable administrative, technical, and physical safeguards to protect your information, including limiting access to authorized personnel and using secure transmission where appropriate. No method of transmission or electronic storage is completely secure, so we cannot guarantee absolute security, but we work to protect your information using safeguards appropriate to its sensitivity.',
  s9Heading: '9. Changes to This Policy',
  s9Body: 'We may update this Privacy Policy from time to time. We will revise the "Last updated" date at the top of this page when we do. If we make material changes, we will provide a notice on this page or through other reasonable communication. Changes will take effect when the updated policy is posted unless another effective date is stated. When required, we will provide additional notice before materially different practices take effect.',
  s10Heading: '10. Contact Us',
  s10Intro: 'If you have questions about this Privacy Policy or your personal information, contact us at:',
  s10Org: 'Waiyaki House LLC — Tamu Academy',
  s10EmailLabel: 'Email:',
  s10InboxNote: 'The info@sustainthevoices.org inbox is designated to receive communications on behalf of Tamu Academy. Tamu Academy remains operated by Waiyaki House LLC.',
  s10Outro: 'You may also use this address to unsubscribe, request access to or deletion of your information, or withdraw consent.',
  returnHome: 'Return to the homepage',
  footerAttr: 'A Waiyaki House LLC learning venture',
  footerTagline: 'Learning across cultures. Leading through change.',
  footerLegal: 'Tamu Academy is a learning venture of Waiyaki House LLC.',
  footerCopy: '© 2026 Waiyaki House LLC. All rights reserved.',
  privacyPolicy: 'Privacy Policy',
};

const h1Style = {
  color: '#F5EFE0',
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 400,
  lineHeight: 1.2,
  margin: '0 0 1.25rem',
  fontFamily: "'Cormorant Garamond', Georgia, serif",
};

const h2Style = {
  color: '#F5EFE0',
  fontSize: 'clamp(1.18rem, 3vw, 1.5rem)',
  fontWeight: 400,
  lineHeight: 1.3,
  margin: '0 0 0.85rem',
  fontFamily: "'Cormorant Garamond', Georgia, serif",
};

const bodyText = {
  color: 'rgba(245,239,224,0.8)',
  fontSize: 'clamp(0.92rem, 2vw, 1rem)',
  lineHeight: 1.85,
  fontWeight: 300,
  margin: '0 0 1.1rem',
  fontFamily: "'DM Sans', sans-serif",
};

const listText = {
  color: 'rgba(245,239,224,0.8)',
  fontSize: 'clamp(0.92rem, 2vw, 1rem)',
  lineHeight: 1.8,
  fontWeight: 300,
  fontFamily: "'DM Sans', sans-serif",
};

const metaText = {
  color: 'rgba(245,239,224,0.6)',
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  fontWeight: 400,
  fontFamily: "'DM Sans', sans-serif",
};

const brandWordmark = {
  color: '#F5EFE0',
  fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  margin: 0,
};

const brandAttribution = {
  color: 'rgba(92,117,111,0.95)',
  fontSize: '0.68rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 400,
  fontFamily: "'DM Sans', sans-serif",
  margin: '0.85rem 0 0',
};

const linkStyle = {
  color: '#D4A12A',
  textDecoration: 'underline',
  fontFamily: "'DM Sans', sans-serif",
};

const footerLinkStyle = {
  color: 'rgba(212,161,42,0.85)',
  fontSize: '0.64rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
};

export default function Privacy() {
  const { content: c } = useTranslatedContent('privacy', CONTENT);

  return (
    <div
      style={{
        backgroundColor: '#1A130E',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
        color: '#F5EFE0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageMeta
        title="Privacy Policy | Tamu Academy"
        description="Tamu Academy's short Privacy Policy explains what information we collect, how we use it, how we share it, and the choices you have. Tamu Academy is a learning venture of Waiyaki House LLC."
        path="/privacy"
      />

      {/* Top brand area — consistent with launch-mode homepage */}
      <header
        style={{
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem) 0',
          textAlign: 'center',
        }}
      >
        <Link to="/" aria-label="Tamu Academy — return to homepage" style={{ textDecoration: 'none' }}>
          <p className="font-heading" style={brandWordmark}>
            Tamu <span style={{ color: '#D4A12A' }}>Academy</span>
          </p>
        </Link>
        <p className="font-body" style={brandAttribution}>
          {c.brandAttr}
        </p>
      </header>

      {/* Main policy content */}
      <main
        id="tamu-main"
        tabIndex={-1}
        style={{
          flex: 1,
          padding: 'clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 7vw, 4.5rem)',
          outline: 'none',
        }}
      >
        <article
          style={{
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {/* One semantic h1 */}
          <h1 className="font-heading" style={h1Style}>
            {c.h1}
          </h1>

          {/* Dates */}
          <p className="font-body" style={{ ...metaText, margin: '0 0 2.25rem' }}>
            {c.effectiveDate}
            <br />
            {c.lastUpdated}
          </p>

          {/* 1. About Tamu Academy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s1Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s1Body}</p>
          </section>

          {/* 2. Information We Collect */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s2Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s2Intro}</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>{c.s2Email}</strong> {c.s2EmailDesc}
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>{c.s2Consent}</strong> {c.s2ConsentDesc}
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>{c.s2Inquiry}</strong> {c.s2InquiryDesc}
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>{c.s2Technical}</strong> {c.s2TechnicalDesc}
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>{c.s2Local}</strong> {c.s2LocalDesc}
              </li>
            </ul>
            <p className="font-body" style={bodyText}>{c.s2Outro}</p>
          </section>

          {/* 3. How We Use Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s3Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s3Intro}</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              {c.s3Items.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.55rem' }}>{item}</li>
              ))}
            </ul>
            <p className="font-body" style={bodyText}>{c.s3Outro}</p>
          </section>

          {/* 4. How We Share Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s4Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s4Intro}</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              {c.s4Items.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.55rem' }}>{item}</li>
              ))}
            </ul>
            <p className="font-body" style={bodyText}>{c.s4Outro}</p>
          </section>

          {/* 5. Cookies, Local Storage, and Tracking */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s5Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s5P1}</p>
            <p className="font-body" style={bodyText}>{c.s5P2}</p>
            <p className="font-body" style={bodyText}>{c.s5P3}</p>
            <p className="font-body" style={bodyText}>{c.s5P4}</p>
            <p className="font-body" style={bodyText}>{c.s5P5}</p>
            <p className="font-body" style={bodyText}>{c.s5P6}</p>
          </section>

          {/* 6. Data Retention and Your Choices */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s6Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s6Body}</p>
          </section>

          {/* 7. Children's Privacy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s7Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s7Body}</p>
          </section>

          {/* 8. Security */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s8Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s8Body}</p>
          </section>

          {/* 9. Changes to This Policy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s9Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s9Body}</p>
          </section>

          {/* 10. Contact Us */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="font-heading" style={h2Style}>{c.s10Heading}</h2>
            <p className="font-body" style={bodyText}>{c.s10Intro}</p>
            <p className="font-body" style={{ ...bodyText, margin: '0 0 0.4rem' }}>
              {c.s10Org}
              <br />
              {c.s10EmailLabel}{' '}
              <a
                href="mailto:info@sustainthevoices.org?subject=Tamu%20Academy%20Privacy%20Request"
                style={linkStyle}
              >
                info@sustainthevoices.org
              </a>
            </p>
            <p className="font-body" style={bodyText}>{c.s10InboxNote}</p>
            <p className="font-body" style={bodyText}>{c.s10Outro}</p>
          </section>

          {/* Return link */}
          <p className="font-body" style={{ ...bodyText, textAlign: 'center' }}>
            <Link
              to="/"
              className="font-body"
              style={{
                color: '#D4A12A',
                fontSize: '0.74rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid rgba(212,161,42,0.4)',
                paddingBottom: '0.25rem',
              }}
            >
              {c.returnHome}
            </Link>
          </p>
        </article>
      </main>

      {/* Minimal footer — consistent with launch-mode homepage */}
      <footer
        style={{
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)',
          borderTop: '1px solid rgba(212,161,42,0.12)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: '0.92rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            margin: 0,
          }}
        >
          Tamu <span style={{ color: '#D4A12A' }}>Academy</span>
        </p>
        <p
          className="font-body"
          style={{
            color: 'rgba(92,117,111,0.95)',
            fontSize: '0.64rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {c.footerAttr}
        </p>
        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.55)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 400,
            margin: '0.85rem 0 0',
          }}
        >
          {c.footerTagline}
        </p>
        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.42)',
            fontSize: '0.72rem',
            lineHeight: 1.7,
            fontWeight: 300,
            margin: '0.75rem 0 0',
            maxWidth: '460px',
          }}
        >
          {c.footerLegal}
        </p>
        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.4)',
            fontSize: '0.7rem',
            fontWeight: 300,
            margin: '0.3rem 0 0',
          }}
        >
          {c.footerCopy}
        </p>
        <p style={{ margin: '0.85rem 0 0' }}>
          <Link to="/privacy" className="font-body tamu-nav-link" style={footerLinkStyle}>
            {c.privacyPolicy}
          </Link>
        </p>
      </footer>

      <style>{`
        a:focus-visible {
          outline: 2px solid rgba(212,161,42,0.7);
          outline-offset: 3px;
          border-radius: 1px;
        }
      `}</style>
    </div>
  );
}