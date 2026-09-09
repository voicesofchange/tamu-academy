import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const INQUIRY_TYPES = [
  'Prospective Learner or Programme Interest',
  'Educator or Facilitator',
  'University or Institutional Partnership',
  'Youth or Community Organization',
  'Funder or Supporter',
  'Media or Interview Inquiry',
  'General Inquiry',
];

const PROGRAMME_OPTIONS = [
  'Tamu Academy First Lessons',
  'Power, Policy and the Public Good (Pathway Under Development)',
  'Ubuntu and the Public Good (Proposed Pilot)',
  'Tamu Intercultural AI Leadership Lab (Proposed Initiative)',
  'Partnership Opportunities',
  'Learning Resources',
  'Not Sure Yet',
];

const REFERRAL_OPTIONS = [
  'Search engine',
  'Social media',
  'Friend or colleague',
  'School or university',
  'Youth or community organization',
  'Event or programme',
  'Other',
];

const TYPE_PARAM_MAP = {
  'programme-interest': 'Prospective Learner or Programme Interest',
  'facilitator': 'Educator or Facilitator',
  'partnership': 'University or Institutional Partnership',
  'community-organization': 'Youth or Community Organization',
  'media': 'Media or Interview Inquiry',
};

const PROGRAMME_PARAM_MAP = {
  'intercultural-ai-leadership-lab': 'Tamu Intercultural AI Leadership Lab (Proposed Initiative)',
  'ubuntu-and-the-public-good': 'Ubuntu and the Public Good (Proposed Pilot)',
  'power-policy-public-good': 'Power, Policy and the Public Good (Pathway Under Development)',
};

const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

const CONTENT = {
  fullName: 'Full Name',
  emailAddress: 'Email Address',
  country: 'Country',
  cityOrCommunity: 'City or Community',
  optional: '(optional)',
  organization: 'Organization or Institution',
  role: 'Role or Connection',
  inquiryType: 'Inquiry Type',
  programmeInterest: 'Programme of Interest',
  message: 'Message',
  messageHint: '50–2,000 characters',
  referralSource: 'How Did You Hear About Tamu Academy?',
  selectInquiryType: 'Select an inquiry type…',
  selectProgramme: 'Select a programme…',
  selectOption: 'Select an option…',
  inquiryTypes: [...INQUIRY_TYPES],
  programmeOptions: [...PROGRAMME_OPTIONS],
  referralOptions: [...REFERRAL_OPTIONS],
  updatesConsent: 'I would like to receive occasional updates about Tamu Academy programmes and resources.',
  privacyAck: 'I understand that the information I provide will be used to review and respond to my inquiry.',
  privacyNotice: 'Tamu Academy will use the information submitted through this form to understand and respond to your inquiry. Please do not include sensitive personal, financial, medical, immigration, or identification information.',
  submitting: 'Submitting…',
  submit: 'Submit Inquiry',
  errorBanner: 'We could not submit your inquiry. Please review the form and try again.',
  errFullName: 'Full name is required.',
  errFullNameLength: 'Name must be 120 characters or fewer.',
  errEmail: 'Email address is required.',
  errEmailInvalid: 'Please enter a valid email address.',
  errCountry: 'Country is required.',
  errCountryLength: 'Please enter a valid country name.',
  errInquiryType: 'Please select an inquiry type.',
  errMessage: 'A message is required.',
  errMessageLength: 'Message must be at least 50 characters. Currently {count}.',
  errMessageMaxLength: 'Message must not exceed 2,000 characters. Currently {count}.',
  errPrivacy: 'Please acknowledge the privacy statement to continue.',
  received: 'Received',
  successHeading: 'Thank You for Connecting With Tamu Academy.',
  successMessage: 'Your inquiry has been received. Tamu Academy will review the information you provided as capacity allows.',
  successHeadingPartnership: 'Thank you for reaching out.',
  successMessagePartnership: 'Your partnership inquiry has been received. The Tamu Academy team will review the information and follow up using the contact details you provided.',
  returnToAcademy: 'Return to the Academy',
  returnToHomepage: 'Return to the Homepage',
  exploreProgrammes: 'Explore Programmes',
};

const inputStyle = {
  width: '100%',
  backgroundColor: 'rgba(245,239,224,0.04)',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '3px',
  color: '#F5EFE0',
  fontSize: '0.93rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  padding: '0.7rem 0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const inputErrorStyle = {
  ...inputStyle,
  border: '1px solid rgba(220,80,60,0.6)',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(245,239,224,0.72)',
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  fontWeight: 500,
  marginBottom: '0.45rem',
  fontFamily: "'DM Sans', sans-serif",
};

const errorStyle = {
  color: 'rgba(220,120,100,0.95)',
  fontSize: '0.78rem',
  marginTop: '0.35rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 400,
};

const fieldWrap = { marginBottom: '1.4rem' };

function FieldError({ id, message }) {
  if (!message) return null;
  return <p id={id} role="alert" style={errorStyle}>{message}</p>;
}

export default function ContactInquiryForm({ presetType, presetProgramme, sourcePage, successVariant }) {
  const { content: c } = useTranslatedContent('contact-form', CONTENT);
  const urlParams = new URLSearchParams(window.location.search);
  const paramType = urlParams.get('type');
  const paramProgramme = urlParams.get('programme');

  const resolvedType = presetType || (paramType && TYPE_PARAM_MAP[paramType]) || '';
  const resolvedProgramme = presetProgramme || (paramProgramme && PROGRAMME_PARAM_MAP[paramProgramme]) || '';
  const resolvedSource = sourcePage || urlParams.get('source') || window.location.pathname;

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    country: '',
    city_or_community: '',
    organization: '',
    role: '',
    inquiry_type: resolvedType,
    programme_interest: resolvedProgramme,
    message: '',
    referral_source: '',
    updates_consent: false,
    privacy_acknowledgment: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const successRef = useRef(null);
  const lastSubmitTime = useRef(0);

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = c.errFullName;
    else if (form.full_name.trim().length > 120) e.full_name = c.errFullNameLength;

    if (!form.email.trim()) e.email = c.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = c.errEmailInvalid;

    if (!form.country.trim()) e.country = c.errCountry;
    else if (form.country.trim().length > 80) e.country = c.errCountryLength;

    if (!form.inquiry_type) e.inquiry_type = c.errInquiryType;

    if (!form.message.trim()) e.message = c.errMessage;
    else if (form.message.trim().length < 50) e.message = tpl(c.errMessageLength, { count: form.message.trim().length });
    else if (form.message.trim().length > 2000) e.message = tpl(c.errMessageMaxLength, { count: form.message.trim().length });

    if (!form.privacy_acknowledgment) e.privacy_acknowledgment = c.errPrivacy;

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setStatus('submitting');
    lastSubmitTime.current = now;

    try {
      const res = await base44.functions.invoke('submitContactInquiry', {
        full_name: form.full_name.trim().slice(0, 120),
        email: form.email.trim().toLowerCase().slice(0, 200),
        country: form.country.trim().slice(0, 80),
        city_or_community: form.city_or_community.trim().slice(0, 120) || undefined,
        organization: form.organization.trim().slice(0, 200) || undefined,
        role: form.role.trim().slice(0, 120) || undefined,
        inquiry_type: form.inquiry_type,
        programme_interest: form.programme_interest || undefined,
        message: form.message.trim().slice(0, 2000),
        referral_source: form.referral_source || undefined,
        updates_consent: form.updates_consent,
        privacy_acknowledgment: form.privacy_acknowledgment,
        source_page: resolvedSource,
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

  if (status === 'success') {
    const isPartnership = successVariant === 'partnership';
    const heading = isPartnership ? c.successHeadingPartnership : c.successHeading;
    const message = isPartnership ? c.successMessagePartnership : c.successMessage;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        style={{ padding: '2.5rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.03)', outline: 'none' }}
      >
        <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
          {c.received}
        </p>
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          {heading}
        </h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.75rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          {isPartnership ? (
            <>
              <Link
                to="/academy"
                style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
              >
                {c.returnToAcademy}
              </Link>
              <Link
                to="/"
                style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', backgroundColor: 'transparent', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
              >
                {c.returnToHomepage}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
              >
                {c.returnToHomepage}
              </Link>
              <Link
                to="/courses"
                style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', backgroundColor: 'transparent', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
              >
                {c.exploreProgrammes}
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact inquiry form">

      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="tamu-hp">Leave this field empty</label>
        <input id="tamu-hp" name="tamu-hp" type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set('honeypot')} />
      </div>

      {/* Global error banner */}
      {status === 'error' && (
        <div role="alert" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', border: '1px solid rgba(220,80,60,0.35)', borderRadius: '3px', backgroundColor: 'rgba(220,80,60,0.06)' }}>
          <p className="font-body" style={{ color: 'rgba(220,130,110,0.95)', fontSize: '0.88rem', margin: 0, fontWeight: 400 }}>
            {c.errorBanner}
          </p>
        </div>
      )}

      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.4rem' }} className="form-two-col">
        <div>
          <label htmlFor="field-full_name" style={labelStyle}>{c.fullName} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span></label>
          <input
            id="field-full_name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={form.full_name}
            onChange={set('full_name')}
            aria-required="true"
            aria-describedby={errors.full_name ? 'err-full_name' : undefined}
            aria-invalid={!!errors.full_name}
            style={errors.full_name ? inputErrorStyle : inputStyle}
          />
          <FieldError id="err-full_name" message={errors.full_name} />
        </div>
        <div>
          <label htmlFor="field-email" style={labelStyle}>{c.emailAddress} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span></label>
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            value={form.email}
            onChange={set('email')}
            aria-required="true"
            aria-describedby={errors.email ? 'err-email' : undefined}
            aria-invalid={!!errors.email}
            style={errors.email ? inputErrorStyle : inputStyle}
          />
          <FieldError id="err-email" message={errors.email} />
        </div>
      </div>

      {/* Country + City */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.4rem' }} className="form-two-col">
        <div>
          <label htmlFor="field-country" style={labelStyle}>{c.country} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span></label>
          <input
            id="field-country"
            type="text"
            autoComplete="country-name"
            maxLength={80}
            value={form.country}
            onChange={set('country')}
            aria-required="true"
            aria-describedby={errors.country ? 'err-country' : undefined}
            aria-invalid={!!errors.country}
            style={errors.country ? inputErrorStyle : inputStyle}
          />
          <FieldError id="err-country" message={errors.country} />
        </div>
        <div style={fieldWrap}>
          <label htmlFor="field-city" style={labelStyle}>{c.cityOrCommunity} <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300 }}>{c.optional}</span></label>
          <input
            id="field-city"
            type="text"
            maxLength={120}
            value={form.city_or_community}
            onChange={set('city_or_community')}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Org + Role */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.4rem' }} className="form-two-col">
        <div>
          <label htmlFor="field-org" style={labelStyle}>{c.organization} <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300 }}>{c.optional}</span></label>
          <input id="field-org" type="text" maxLength={200} value={form.organization} onChange={set('organization')} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="field-role" style={labelStyle}>{c.role} <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300 }}>{c.optional}</span></label>
          <input id="field-role" type="text" maxLength={120} value={form.role} onChange={set('role')} style={inputStyle} />
        </div>
      </div>

      {/* Inquiry type */}
      <div style={fieldWrap}>
        <label htmlFor="field-inquiry_type" style={labelStyle}>{c.inquiryType} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span></label>
        <select
          id="field-inquiry_type"
          value={form.inquiry_type}
          onChange={set('inquiry_type')}
          aria-required="true"
          aria-describedby={errors.inquiry_type ? 'err-inquiry_type' : undefined}
          aria-invalid={!!errors.inquiry_type}
          style={{ ...( errors.inquiry_type ? inputErrorStyle : inputStyle), cursor: 'pointer' }}
        >
          <option value="">{c.selectInquiryType}</option>
          {INQUIRY_TYPES.map((t, i) => <option key={t} value={t}>{c.inquiryTypes[i]}</option>)}
        </select>
        <FieldError id="err-inquiry_type" message={errors.inquiry_type} />
      </div>

      {/* Programme of interest */}
      <div style={fieldWrap}>
        <label htmlFor="field-programme" style={labelStyle}>{c.programmeInterest} <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300 }}>{c.optional}</span></label>
        <select
          id="field-programme"
          value={form.programme_interest}
          onChange={set('programme_interest')}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">{c.selectProgramme}</option>
          {PROGRAMME_OPTIONS.map((p, i) => <option key={p} value={p}>{c.programmeOptions[i]}</option>)}
        </select>
      </div>

      {/* Message */}
      <div style={fieldWrap}>
        <label htmlFor="field-message" style={labelStyle}>
          {c.message} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span>
          <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300, marginLeft: '0.5rem', fontSize: '0.72rem' }}>{c.messageHint}</span>
        </label>
        <textarea
          id="field-message"
          rows={6}
          maxLength={2000}
          value={form.message}
          onChange={set('message')}
          aria-required="true"
          aria-describedby={`msg-count${errors.message ? ' err-message' : ''}`}
          aria-invalid={!!errors.message}
          style={{ ...( errors.message ? inputErrorStyle : inputStyle ), resize: 'vertical', minHeight: '130px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <FieldError id="err-message" message={errors.message} />
          <span id="msg-count" aria-live="polite" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', marginTop: '0.35rem', marginLeft: 'auto', flexShrink: 0 }}>
            {form.message.length}/2000
          </span>
        </div>
      </div>

      {/* Referral source */}
      <div style={fieldWrap}>
        <label htmlFor="field-referral" style={labelStyle}>{c.referralSource} <span style={{ color: 'rgba(245,239,224,0.55)', fontWeight: 300 }}>{c.optional}</span></label>
        <select
          id="field-referral"
          value={form.referral_source}
          onChange={set('referral_source')}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">{c.selectOption}</option>
          {REFERRAL_OPTIONS.map((r, i) => <option key={r} value={r}>{c.referralOptions[i]}</option>)}
        </select>
      </div>

      {/* Checkboxes */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.updates_consent}
            onChange={set('updates_consent')}
            style={{ marginTop: '0.2rem', accentColor: '#D4A12A', width: '16px', height: '16px', flexShrink: 0 }}
          />
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>
            {c.updatesConsent}
          </span>
        </label>
      </div>

      <div style={{ marginBottom: '1.75rem' }}>
        <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input
            type="checkbox"
            id="field-privacy_acknowledgment"
            checked={form.privacy_acknowledgment}
            onChange={set('privacy_acknowledgment')}
            aria-required="true"
            aria-describedby={errors.privacy_acknowledgment ? 'err-privacy' : undefined}
            aria-invalid={!!errors.privacy_acknowledgment}
            style={{ marginTop: '0.2rem', accentColor: '#D4A12A', width: '16px', height: '16px', flexShrink: 0 }}
          />
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>
            {c.privacyAck} <span aria-hidden="true" style={{ color: '#D4A12A' }}>*</span><span className="sr-only"> (required)</span>
          </span>
        </label>
        <FieldError id="err-privacy" message={errors.privacy_acknowledgment} />
      </div>

      {/* Privacy notice */}
      <p className="font-body" style={{ color: 'rgba(245,239,224,0.58)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
        {c.privacyNotice}
      </p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: status === 'submitting' ? 'rgba(26,19,14,0.6)' : '#1A130E',
          backgroundColor: status === 'submitting' ? 'rgba(212,161,42,0.6)' : '#D4A12A',
          fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
          border: '1px solid transparent', borderRadius: '2px', padding: '0.75rem 1.6rem',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
        }}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? c.submitting : c.submit}
      </button>

      <style>{`
        @media (max-width: 560px) { .form-two-col { grid-template-columns: 1fr !important; } }
        select option { background-color: #2a1f17; color: #F5EFE0; }
        input:focus, select:focus, textarea:focus { outline: 2px solid rgba(212,161,42,0.55); outline-offset: 1px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>
    </form>
  );
}