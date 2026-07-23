import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';

/**
 * Privacy — public, ungated short Privacy Policy for Tamu Academy.
 *
 * Drafted for review. Body text under each section is a concise draft based on
 * the Notice at Collection statement and the platform's actual data practices
 * (early-access email signup via submitContactInquiry, no advertising pixels,
 * no third-party mailing list). Edit freely before publishing.
 *
 * Design system: espresso background, cream body text, gold accents,
 * Cormorant Garamond for headings, DM Sans for body. One h1, logical h2
 * ordering, focus-visible links, mobile-readable typography, no horizontal
 * overflow.
 */

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
          A Waiyaki House LLC learning venture
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
            Privacy Policy
          </h1>

          {/* Dates */}
          <p className="font-body" style={{ ...metaText, margin: '0 0 2.25rem' }}>
            Effective date: July 23, 2026
            <br />
            Last updated: July 23, 2026
          </p>

          {/* 1. About Tamu Academy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>1. About Tamu Academy</h2>
            <p className="font-body" style={bodyText}>
              Tamu Academy is a learning venture of Waiyaki House LLC. We develop practical, culturally grounded
              learning in economics, governance, public policy, global affairs, and social change. This Privacy
              Policy explains what information we collect through our website, how we use it, and the choices you
              have. It applies to visitors to tamuacademy.org, including those who join our Early Access list.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>2. Information We Collect</h2>
            <p className="font-body" style={bodyText}>We collect the following categories of information:</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>Email address</strong> — when
                you join the Early Access list or submit a contact inquiry.
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>Consent records</strong> — your
                acknowledgment that you agree to receive early-access updates.
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>Inquiry details</strong> —
                when you complete our contact form (name, email, country, organization, role, message, and any
                optional fields you provide).
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>Technical information</strong> —
                standard server logs and browser information such as IP address, browser type, referring page, and
                timestamps, collected automatically when you visit our site.
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                <strong style={{ color: 'rgba(245,239,224,0.92)', fontWeight: 500 }}>Local storage</strong> —
                optional saved activity responses in your own browser, such as notes from module activities, when you
                choose to use those features.
              </li>
            </ul>
            <p className="font-body" style={bodyText}>
              You may decline to provide information at any time, though doing so may limit your ability to receive
              certain updates or use certain features.
            </p>
          </section>

          {/* 3. How We Use Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>3. How We Use Information</h2>
            <p className="font-body" style={bodyText}>We use the information we collect to:</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              <li style={{ marginBottom: '0.55rem' }}>Send the course-launch updates and early-access information you requested.</li>
              <li style={{ marginBottom: '0.55rem' }}>Respond to contact inquiries and partnership requests.</li>
              <li style={{ marginBottom: '0.55rem' }}>Operate, maintain, and improve our website, courses, and learning materials.</li>
              <li style={{ marginBottom: '0.55rem' }}>Understand, in aggregate, how visitors reach and use Tamu Academy.</li>
              <li style={{ marginBottom: '0.55rem' }}>Meet our legal, security, and operational obligations.</li>
            </ul>
            <p className="font-body" style={bodyText}>
              We do not use your information to make automated decisions that produce significant legal or similarly
              significant effects about you.
            </p>
          </section>

          {/* 4. How We Share Information */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>4. How We Share Information</h2>
            <p className="font-body" style={bodyText}>We may share your information:</p>
            <ul style={{ ...listText, margin: '0 0 1.1rem', paddingLeft: '1.4rem' }}>
              <li style={{ marginBottom: '0.55rem' }}>
                With service providers who help us operate our website, hosting, email delivery, and data storage,
                under appropriate contractual protections and only as needed to perform those services.
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                When required by law, regulation, legal process, or government request, or to protect the rights,
                property, safety, or security of Tamu Academy, Waiyaki House LLC, our learners, or others.
              </li>
              <li style={{ marginBottom: '0.55rem' }}>
                In connection with a sale, merger, or transfer of all or part of our business, with appropriate notice
                where practicable.
              </li>
            </ul>
            <p className="font-body" style={bodyText}>
              We do not sell your information. We do not share your information for cross-context behavioral advertising.
            </p>
          </section>

          {/* 5. Cookies, Local Storage, and Tracking */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>5. Cookies, Local Storage, and Tracking</h2>
            <p className="font-body" style={bodyText}>
              We use minimal cookies and browser storage to operate the site and remember your preferences, such as
              saved activity responses in courses. We do not use advertising cookies or third-party tracking pixels.
              We do not engage in cross-context behavioral advertising. You can clear cookies and local storage
              through your browser settings at any time, though doing so may remove saved activity responses and
              preferences.
            </p>
          </section>

          {/* 6. Data Retention and Your Choices */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>6. Data Retention and Your Choices</h2>
            <p className="font-body" style={bodyText}>
              We retain your email address and consent while you remain subscribed to early-access updates, and as
              reasonably necessary to honor our communication and legal obligations. You may unsubscribe from future
              updates at any time by using the unsubscribe mechanism in any email we send or by contacting us at{' '}
              <a
                href="mailto:info@sustainthevoices.org?subject=Tamu%20Academy%20Privacy%20Request"
                style={linkStyle}
              >
                info@sustainthevoices.org
              </a>
              . You may also request access to, correction of, or deletion of your personal information by emailing
              us. We will respond within a reasonable time and as required by applicable law.
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>7. Children&rsquo;s Privacy</h2>
            <p className="font-body" style={bodyText}>
              Tamu Academy is not directed at children under 13, and we do not knowingly collect personal information
              from children under 13. If you believe a child has provided us with personal information, please
              contact us and we will take steps to delete that information.
            </p>
          </section>

          {/* 8. Security */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>8. Security</h2>
            <p className="font-body" style={bodyText}>
              We use reasonable administrative, technical, and physical safeguards to protect your information,
              including limiting access to authorized personnel and using secure transmission where appropriate. No
              method of transmission or electronic storage is completely secure, so we cannot guarantee absolute
              security, but we work to protect your information using safeguards appropriate to its sensitivity.
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 className="font-heading" style={h2Style}>9. Changes to This Policy</h2>
            <p className="font-body" style={bodyText}>
              We may update this Privacy Policy from time to time. We will revise the &ldquo;Last updated&rdquo; date
              at the top of this page when we do. If we make material changes, we will provide a notice on this page
              or through other reasonable communication. Continued use of our site after changes take effect
              indicates your acceptance of the updated practices.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="font-heading" style={h2Style}>10. Contact Us</h2>
            <p className="font-body" style={bodyText}>
              If you have questions about this Privacy Policy or your personal information, contact us at:
            </p>
            <p className="font-body" style={{ ...bodyText, margin: '0 0 0.4rem' }}>
              Waiyaki House LLC &mdash; Tamu Academy
              <br />
              Email:{' '}
              <a
                href="mailto:info@sustainthevoices.org?subject=Tamu%20Academy%20Privacy%20Request"
                style={linkStyle}
              >
                info@sustainthevoices.org
              </a>
            </p>
            <p className="font-body" style={bodyText}>
              You may also use this address to unsubscribe, request access to or deletion of your information, or
              withdraw consent.
            </p>
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
              Return to the homepage
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
          A Waiyaki House LLC learning venture
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
          Learning across cultures. Leading through change.
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
          Tamu Academy is a learning venture of Waiyaki House LLC.
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
          &copy; 2026 Waiyaki House LLC. All rights reserved.
        </p>
        <p style={{ margin: '0.85rem 0 0' }}>
          <Link to="/privacy" className="font-body tamu-nav-link" style={footerLinkStyle}>
            Privacy Policy
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