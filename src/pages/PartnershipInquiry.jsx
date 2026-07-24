import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import ContactInquiryForm from '@/components/forms/ContactInquiryForm';

/**
 * PartnershipInquiry — dedicated, minimal public route for partnership
 * discussions. Reuses the existing ContactInquiryForm component (no
 * duplicate submission logic). The "Partnership Inquiry" context is
 * captured through source_page (the existing backend stores source_page
 * verbatim), without altering the ContactInquiry schema or asking the
 * submitter to add anything to their message body intentionally.
 *
 * The accepted backend inquiry_type enum does not include
 * "Partnership Inquiry", so visitors pick the closest accepted value from
 * the existing dropdown (e.g. University or Institutional Partnership,
 * Funder or Supporter, Youth or Community Organization). This preserves
 * existing Contact submissions and the backend allowlist.
 */
export default function PartnershipInquiry() {
  return (
    <div className="pi-root">
      <PageMeta
        title="Discuss a Partnership | Tamu Academy"
        description="Tell Tamu Academy about your organization, proposed collaboration, pilot opportunity, funding interest, or institutional partnership."
        path="/partnership-inquiry"
      />

      {/* Minimal header — wordmark + optional Back to Academy */}
      <header className="pi-topnav">
        <Link
          to="/"
          aria-label="Tamu Academy — home"
          className="pi-brand font-heading"
        >
          Tamu <span className="pi-accent">Academy</span>
          <span className="pi-topnav-attr font-body">
            A Waiyaki House learning venture
          </span>
        </Link>
        <Link to="/academy" className="pi-back font-body">
          ← Back to Academy
        </Link>
      </header>

      <main id="pi-main" tabIndex={-1} className="pi-main">
        <div className="pi-inner">
          <p className="pi-eyebrow font-body">Tamu Academy</p>
          <p className="pi-attribution font-body">A Waiyaki House learning venture</p>

          <h1 className="pi-h1 font-heading">Discuss a Partnership</h1>
          <p className="pi-support font-body">
            Tell us about your organization, proposed collaboration, pilot opportunity, funding interest, or institutional partnership.
          </p>

          <section
            className="pi-form-wrap"
            aria-label="Partnership inquiry form"
          >
            <ContactInquiryForm sourcePage="/partnership-inquiry" successVariant="partnership" />
          </section>
        </div>
      </main>

      {/* Minimal footer — only legal + privacy link */}
      <footer className="pi-footer">
        <p className="pi-footer-brand font-heading">
          Tamu <span className="pi-accent">Academy</span>
        </p>
        <p className="pi-footer-attr font-body">A Waiyaki House learning venture</p>
        <p className="pi-footer-copy font-body">© 2026 Waiyaki House LLC. All rights reserved.</p>
        <p className="pi-footer-links">
          <Link to="/privacy" className="font-body">Privacy Policy</Link>
        </p>
      </footer>

      <style>{`
.pi-root {
  background-color: #1A130E;
  color: #F5EFE0;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
}
/* ---------- Minimal header ---------- */
.pi-topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 5vw, 3rem);
  border-bottom: 1px solid rgba(212,161,42,0.12);
}
.pi-brand {
  color: #F5EFE0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}
.pi-accent { color: #D4A12A; }
.pi-topnav-attr {
  color: rgba(92,117,111,0.95);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 0.6rem;
}
.pi-back {
  color: rgba(245,239,224,0.85);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s ease;
  white-space: nowrap;
}
.pi-back:hover { color: #D4A12A; }
/* ---------- Main ---------- */
.pi-main {
  flex: 1 1 auto;
  outline: none;
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 3rem);
  display: flex;
  justify-content: center;
}
.pi-main:focus { outline: none; }
.pi-inner {
  width: 100%;
  max-width: 720px;
  text-align: left;
}
.pi-eyebrow {
  color: #D4A12A;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 0.5rem;
}
.pi-attribution {
  color: rgba(92,117,111,0.95);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0 0 2rem;
}
.pi-h1 {
  color: #F5EFE0;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.005em;
  margin: 0 0 1.25rem;
}
.pi-support {
  color: rgba(245,239,224,0.78);
  font-size: clamp(0.98rem, 2vw, 1.1rem);
  line-height: 1.7;
  font-weight: 300;
  margin: 0 0 2.5rem;
  max-width: 560px;
}
.pi-form-wrap {
  padding-top: 2rem;
  border-top: 1px solid rgba(212,161,42,0.18);
}
/* ---------- Footer ---------- */
.pi-footer {
  padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem);
  border-top: 1px solid rgba(212,161,42,0.12);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}
.pi-footer-brand {
  color: #F5EFE0;
  font-size: 0.92rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
}
.pi-footer-attr {
  color: rgba(92,117,111,0.95);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
}
.pi-footer-copy {
  color: rgba(245,239,224,0.42);
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0.85rem 0 0;
}
.pi-footer-links { margin: 0.85rem 0 0; }
.pi-footer-links a {
  color: rgba(212,161,42,0.85);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
}
/* ---------- Focus + responsive ---------- */
.pi-brand:focus-visible,
.pi-back:focus-visible,
.pi-footer-links a:focus-visible {
  outline: 2px solid rgba(212,161,42,0.7);
  outline-offset: 3px;
}
@media (max-width: 600px) {
  .pi-topnav-attr { display: none; }
  .pi-main { padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 1.75rem); }
  .pi-support { margin-bottom: 2rem; }
  .pi-topnav { justify-content: space-between; }
}
@media (prefers-reduced-motion: reduce) {
  .pi-back { transition: none !important; }
}
      `}</style>
    </div>
  );
}