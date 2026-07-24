import React, { useState, useEffect, useRef } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

/**
 * LaunchLanding — temporary public front door for Tamu Academy.
 *
 * While the academy and its first learning pathway remain in development,
 * this focused, editorial, coming-soon surface serves only:
 *   - wordmark + Waiyaki House LLC attribution
 *   - mission-first headline
 *   - positioning statement
 *   - supporting copy
 *   - Early Access email signup (reuses submitContactInquiry backend)
 *   - minimal footer
 *
 * It does NOT render the full TopNav, course cards, lesson videos, articles,
 * or any unfinished module content. The full homepage lives on in
 * src/pages/Landing.jsx behind a LAUNCH_MODE flag and can be restored by
 * flipping that flag to false. Existing routes, gating, and components
 * are untouched.
 */
export default function LaunchLanding() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  // idle | submitting | success | error
  const [status, setStatus] = useState('idle');
  const successRef = useRef(null);
  const lastSubmit = useRef(0);

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = 'Please enter a valid email address.';
    if (!consent) e.consent = 'Please accept the consent statement to join early access.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Honeypot — silently ignore bots
    if (honeypot) return;

    // Reasonable duplicate-submit protection (8s cooldown)
    const now = Date.now();
    if (now - lastSubmit.current < 8000) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const el = errs.email
        ? document.getElementById('launch-email')
        : document.getElementById('launch-consent');
      if (el) el.focus();
      return;
    }

    setStatus('submitting');
    lastSubmit.current = now;

    try {
      const res = await base44.functions.invoke('submitContactInquiry', {
        // Internal placeholders — never shown to the visitor. The existing
        // backend requires a name, country, and a 50+ character message;
        // since the launch form collects only email + consent, we pass
        // safe internal values for the required-but-uncollected fields.
        full_name: 'Early Access Subscriber',
        email: email.trim().toLowerCase().slice(0, 200),
        country: 'Not provided',
        inquiry_type: 'Early Access Signup',
        message:
          'Tamu Academy Early Access Signup. Subscriber requested course launch updates and early-access information via the homepage launch form.',
        updates_consent: true,
        privacy_acknowledgment: true,
        source_page: '/',
        honeypot,
      });

      if (res.data?.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const resetForRetry = () => {
    setStatus('idle');
    // Preserve the entered email so visitors do not retype it after an error.
  };

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
        title="Tamu Academy — Learn the Systems Shaping Africa"
        description="Tamu Academy is a learning venture of Waiyaki House, developing practical, culturally grounded learning in economics, governance, public policy, global affairs, and social change. Join the early-access list for launch updates."
        path="/"
      />

      {/* Minimal top navigation */}
      <header
        style={{
          padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 5vw, 3rem)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderBottom: '1px solid rgba(212,161,42,0.12)',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          aria-label="Tamu Academy — home"
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '0.4rem',
          }}
        >
          Tamu <span style={{ color: '#D4A12A' }}>Academy</span>
          <span
            className="font-body launch-topnav-attr"
            style={{
              color: 'rgba(92,117,111,0.95)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            A Waiyaki House learning venture
          </span>
        </Link>
        <nav
          aria-label="Primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/academy"
            className="font-body launch-nav-link"
            style={{
              color: 'rgba(245,239,224,0.85)',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Explore the Academy
          </Link>
          <a
            href="#early-access"
            className="font-body launch-nav-join"
            style={{
              color: '#1A130E',
              backgroundColor: '#D4A12A',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              border: '1px solid transparent',
              borderRadius: '3px',
              padding: '0.6rem 1.1rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Join Early Access
          </a>
        </nav>
      </header>

      {/* Main */}
      <main
        id="tamu-main"
        tabIndex={-1}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 4rem)',
          outline: 'none',
        }}
      >
        <div
          className="launch-inner"
          style={{
            maxWidth: '680px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Primary headline — single semantic h1 */}
          <h1
            className="font-heading"
            style={{
              color: '#F5EFE0',
              fontSize: 'clamp(2rem, 6vw, 3.6rem)',
              fontWeight: 400,
              lineHeight: 1.18,
              letterSpacing: '0.005em',
              margin: '0 0 1.5rem',
            }}
          >
            Learn the systems shaping Africa.
            <br />
            Build what comes next.
          </h1>

          {/* Supporting copy */}
          <p
            className="font-body"
            style={{
              color: 'rgba(245,239,224,0.78)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              margin: '0 auto 2.25rem',
              maxWidth: '560px',
            }}
          >
            Culturally grounded learning in economics, governance, technology, wellbeing, history, and global affairs.
          </p>

          {/* Primary actions */}
          <div
            className="launch-actions"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
              margin: '0 auto 2.75rem',
            }}
          >
            <a
              href="#early-access"
              className="font-body launch-cta-primary"
              style={{
                display: 'inline-block',
                color: '#1A130E',
                backgroundColor: '#D4A12A',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                border: '1px solid transparent',
                borderRadius: '3px',
                padding: '0.85rem 1.6rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.25s ease',
              }}
            >
              Join Early Access
            </a>
            <Link
              to="/academy"
              className="font-body launch-cta-secondary"
              style={{
                display: 'inline-block',
                color: '#F5EFE0',
                backgroundColor: 'transparent',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                border: '1px solid rgba(212,161,42,0.5)',
                borderRadius: '3px',
                padding: '0.8rem 1.55rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
            >
              Explore the Academy
            </Link>
          </div>

          {/* Early Access form */}
          <section
            id="early-access"
            aria-labelledby="early-access-heading"
            style={{
              borderTop: '1px solid rgba(212,161,42,0.18)',
              paddingTop: '2.25rem',
              scrollMarginTop: '90px',
            }}
          >
            <h2
              id="early-access-heading"
              className="font-heading"
              style={{
                color: '#F5EFE0',
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                margin: '0 0 0.6rem',
                textAlign: 'left',
              }}
            >
              Join Early Access
            </h2>

            <p
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.62)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                fontWeight: 300,
                margin: '0 0 1.5rem',
                textAlign: 'left',
              }}
            >
              Receive course-launch updates and early-access information.
            </p>

            {/* Notice at Collection — visible before submission */}
            <p
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.6)',
                fontSize: '0.78rem',
                lineHeight: 1.65,
                fontWeight: 300,
                margin: '0 0 1.5rem',
                textAlign: 'left',
              }}
            >
              <span style={{ color: 'rgba(245,239,224,0.78)', fontWeight: 500 }}>Notice at Collection:</span>{' '}
              We collect your email and consent to send requested Tamu Academy updates. We do not sell or share your
              information for behavioral advertising. We retain it while you remain subscribed and as needed to honor
              your preferences. Read our{' '}
              <Link to="/privacy" className="font-body" style={{ color: '#D4A12A', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
              .
            </p>

            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                style={{
                  padding: '1.5rem 1.25rem',
                  border: '1px solid rgba(212,161,42,0.28)',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(212,161,42,0.03)',
                  outline: 'none',
                  textAlign: 'left',
                }}
              >
                <p
                  className="font-body"
                  style={{
                    color: 'rgba(245,239,224,0.85)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  Thank you for joining the Tamu Academy early-access list. We&rsquo;ll share launch updates as the academy becomes available.
                </p>

                {/* Voluntary Substack invitation — shown only on confirmed success */}
                <div
                  role="group"
                  aria-labelledby="launch-success-substack-heading"
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(212,161,42,0.18)',
                  }}
                >
                  <p
                    id="launch-success-substack-heading"
                    className="font-body"
                    style={{
                      color: 'rgba(245,239,224,0.78)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      fontWeight: 300,
                      margin: '0 0 1rem',
                    }}
                  >
                    In the meantime, you can also follow Tamu Academy on Substack for educational insights, academy updates, and developing ideas.
                  </p>

                  <a
                    href="https://substack.com/@tamuacademy?r=3jsnyk&utm_campaign=profile&utm_medium=profile-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Tamu Academy on Substack (opens in a new tab — external service)"
                    className="font-body launch-success-substack"
                    style={{
                      display: 'inline-block',
                      color: '#1A130E',
                      backgroundColor: '#D4A12A',
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      fontFamily: "'DM Sans', sans-serif",
                      border: '1px solid transparent',
                      borderRadius: '3px',
                      padding: '0.85rem 1.6rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Follow Tamu Academy on Substack
                  </a>

                  <p
                    className="font-body"
                    style={{
                      color: 'rgba(245,239,224,0.55)',
                      fontSize: '0.74rem',
                      lineHeight: 1.55,
                      fontWeight: 300,
                      margin: '0.85rem 0 0',
                    }}
                  >
                    Following Tamu Academy on Substack is optional and requires a separate action through Substack. Joining the Early Access list does not automatically subscribe you to Substack.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Early access signup form"
                style={{ textAlign: 'left' }}
              >
                {/* Honeypot — hidden from real users */}
                <div
                  style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}
                  aria-hidden="true"
                >
                  <label htmlFor="launch-hp">Leave this field empty</label>
                  <input
                    id="launch-hp"
                    name="launch-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Global error banner */}
                {status === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                      marginBottom: '1.25rem',
                      padding: '0.85rem 1rem',
                      border: '1px solid rgba(220,80,60,0.35)',
                      borderRadius: '3px',
                      backgroundColor: 'rgba(220,80,60,0.06)',
                    }}
                  >
                    <p
                      className="font-body"
                      style={{ color: 'rgba(220,130,110,0.95)', fontSize: '0.85rem', margin: 0, fontWeight: 400 }}
                    >
                      We could not complete your signup. Please check your email address and try again.
                    </p>
                  </div>
                )}

                {/* Email field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="launch-email"
                    className="font-body launch-label"
                    style={{
                      display: 'block',
                      color: 'rgba(245,239,224,0.72)',
                      fontSize: '0.76rem',
                      letterSpacing: '0.1em',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Email Address <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span>
                    <span className="launch-sr-only"> (required)</span>
                  </label>
                  <div className="launch-email-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input
                      id="launch-email"
                      type="email"
                      autoComplete="email"
                      maxLength={200}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                      }}
                      aria-required="true"
                      aria-describedby={errors.email ? 'launch-err-email' : undefined}
                      aria-invalid={!!errors.email}
                      placeholder="you@example.com"
                      className="launch-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(245,239,224,0.04)',
                        border: errors.email
                          ? '1px solid rgba(220,80,60,0.6)'
                          : '1px solid rgba(212,161,42,0.24)',
                        borderRadius: '3px',
                        color: '#F5EFE0',
                        fontSize: '0.95rem',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        padding: '0.85rem 1rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.25s ease',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      aria-busy={status === 'submitting'}
                      className="launch-submit"
                      style={{
                        color: status === 'submitting' ? 'rgba(26,19,14,0.6)' : '#1A130E',
                        backgroundColor: status === 'submitting' ? 'rgba(212,161,42,0.6)' : '#D4A12A',
                        fontSize: '0.72rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        fontFamily: "'DM Sans', sans-serif",
                        border: '1px solid transparent',
                        borderRadius: '3px',
                        padding: '0.85rem 1.6rem',
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.25s ease, color 0.25s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {status === 'submitting' ? 'Submitting…' : 'Join Early Access'}
                    </button>
                  </div>
                  {errors.email && (
                    <p
                      id="launch-err-email"
                      role="alert"
                      className="font-body"
                      style={{
                        color: 'rgba(220,120,100,0.95)',
                        fontSize: '0.78rem',
                        marginTop: '0.4rem',
                        fontWeight: 400,
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Consent checkbox — required */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="launch-consent"
                    className="font-body"
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      id="launch-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors((p) => ({ ...p, consent: '' }));
                      }}
                      aria-required="true"
                      aria-describedby={errors.consent ? 'launch-err-consent' : undefined}
                      aria-invalid={!!errors.consent}
                      className="launch-checkbox"
                      style={{
                        marginTop: '0.25rem',
                        accentColor: '#D4A12A',
                        width: '16px',
                        height: '16px',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-body"
                      style={{
                        color: 'rgba(245,239,224,0.78)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        fontWeight: 300,
                      }}
                    >
                      I agree to receive Tamu Academy updates and understand that I can unsubscribe at any time.
                      <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span>
                      <span className="launch-sr-only"> (required)</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p
                      id="launch-err-consent"
                      role="alert"
                      className="font-body"
                      style={{
                        color: 'rgba(220,120,100,0.95)',
                        fontSize: '0.78rem',
                        marginTop: '0.4rem',
                        marginLeft: '0',
                        fontWeight: 400,
                      }}
                    >
                      {errors.consent}
                    </p>
                  )}
                  <p style={{ margin: '0.7rem 0 0', textAlign: 'left' }}>
                    <Link
                      to="/privacy"
                      className="font-body"
                      style={{
                        color: 'rgba(212,161,42,0.95)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 500,
                        borderBottom: '1px solid rgba(212,161,42,0.35)',
                        paddingBottom: '0.15rem',
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                {status === 'error' && (
                  <button
                    type="button"
                    onClick={resetForRetry}
                    className="font-body"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(212,161,42,0.85)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '0.5rem',
                    }}
                  >
                    Try again
                  </button>
                )}
              </form>
            )}
          </section>
        </div>
      </main>

      {/* Minimal footer */}
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
          A Waiyaki House learning venture
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
          Tamu Academy is a learning venture of Waiyaki House.
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
          <Link
            to="/privacy"
            className="font-body"
            style={{
              color: 'rgba(212,161,42,0.85)',
              fontSize: '0.64rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Privacy Policy
          </Link>
        </p>
      </footer>

      <style>{`
        .launch-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        .launch-input:focus {
          outline: 2px solid rgba(212,161,42,0.55);
          outline-offset: 1px;
          border-color: rgba(212,161,42,0.5);
        }
        .launch-submit:focus-visible {
          outline: 2px solid rgba(212,161,42,0.7);
          outline-offset: 3px;
        }
        .launch-checkbox:focus-visible {
          outline: 2px solid rgba(212,161,42,0.7);
          outline-offset: 3px;
        }
        .launch-success-substack:focus-visible {
          outline: 2px solid rgba(212,161,42,0.7);
          outline-offset: 3px;
        }
        .launch-cta-primary:focus-visible,
        .launch-cta-secondary:focus-visible,
        .launch-nav-link:focus-visible,
        .launch-nav-join:focus-visible {
          outline: 2px solid rgba(212,161,42,0.7);
          outline-offset: 3px;
        }
        .launch-cta-primary:hover { background-color: rgba(212,161,42,0.85); }
        .launch-cta-secondary:hover { border-color: rgba(212,161,42,0.85); color: #D4A12A; }
        .launch-nav-join:hover { background-color: rgba(212,161,42,0.85); }
        .launch-nav-link:hover { color: #D4A12A; }
        @media (max-width: 600px) {
          .launch-topnav-attr { display: none; }
        }
        @media (max-width: 420px) {
          .launch-actions { flex-direction: column; align-items: stretch; }
          .launch-actions > a { text-align: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .launch-cta-primary,
          .launch-cta-secondary { transition: none !important; }
        }
        .launch-label:focus-within {
          outline: none;
        }
        @media (min-width: 560px) {
          .launch-email-row {
            flex-direction: row !important;
            align-items: stretch;
          }
          .launch-input { flex: 1; }
          .launch-submit { flex: 0 0 auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .launch-input, .launch-submit {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}