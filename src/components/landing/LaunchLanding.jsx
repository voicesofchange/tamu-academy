import React, { useState, useEffect, useRef } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';

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
        description="Tamu Academy is a learning venture of Waiyaki House LLC, developing practical, culturally grounded learning in economics, governance, public policy, global affairs, and social change. Join the early-access list for launch updates."
        path="/"
      />

      {/* Top brand area */}
      <header
        style={{
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem) 0',
          textAlign: 'center',
        }}
      >
        <p
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)',
            letterSpacing: '0.22em',
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
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 400,
            margin: '0.85rem 0 0',
          }}
        >
          A Waiyaki House LLC learning venture
        </p>
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
              margin: '0 0 1.75rem',
            }}
          >
            You are not here
            <br />
            just to learn.
            <br />
            You are here to <span style={{ color: '#D4A12A' }}>understand</span>.
          </h1>

          {/* Positioning statement */}
          <p
            className="font-body"
            style={{
              color: '#D4A12A',
              fontSize: 'clamp(0.62rem, 1.4vw, 0.74rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 500,
              margin: '0 0 1.5rem',
            }}
          >
            Not information. Understanding.
          </p>

          {/* Supporting copy */}
          <p
            className="font-body"
            style={{
              color: 'rgba(245,239,224,0.78)',
              fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
              lineHeight: 1.85,
              fontWeight: 300,
              margin: '0 auto 2.75rem',
              maxWidth: '520px',
            }}
          >
            The histories. The institutions. The economies. The systems of power.
            <br />
            <br />
            Everything you need to understand the forces shaping Africa—and build what comes next.
          </p>

          {/* Early Access form */}
          <section
            aria-labelledby="early-access-heading"
            style={{
              borderTop: '1px solid rgba(212,161,42,0.18)',
              paddingTop: '2.25rem',
            }}
          >
            <h2
              id="early-access-heading"
              className="font-body"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              Early Access signup
            </h2>

            <p
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.62)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                fontWeight: 300,
                margin: '0 0 1.5rem',
              }}
            >
              Be among the first to receive course-launch updates and access information.
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
                      I agree to receive Tamu Academy course launch updates and early-access information. I understand that I can unsubscribe from future communications.
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