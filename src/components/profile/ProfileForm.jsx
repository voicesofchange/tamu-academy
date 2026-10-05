import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import {
  AGE_RANGES,
  EDUCATION_LEVELS,
  LANGUAGE_OPTIONS,
  getProfile,
  getPreferredName,
} from '@/lib/learner-profile';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  nameLabel: 'Your full name, written the way you want it',
  nameHint: 'This is the name that will appear on your Tamu Academy certificates.',
  namePlaceholder: 'e.g. Caroline Tracy Wanjiki Kariuki',
  country: 'Country',
  cityOrCommunity: 'City or Community',
  ageRange: 'Age Range',
  preferredLanguage: 'Preferred Language',
  educationLevel: 'Education Level',
  identity: 'How you describe yourself',
  identityHint: 'Optional. Shared only with Tamu Academy administrators, never printed on certificates or shared publicly.',
  optional: '(optional)',
  selectOption: 'Select an option…',
  privacyNotice:
    'Tamu Academy uses these details to understand who our learning community is and to write your name correctly on certificates. You can update them at any time.',
  saving: 'Saving…',
  save: 'Save my details',
  saved: 'Your details are saved.',
  errorBanner: 'We could not save your details. Please review the form and try again.',
  errName: 'Please write the name you would like us to use.',
  errNameLength: 'Name must be 120 characters or fewer.',
};

const inputStyle = {
  width: '100%',
  backgroundColor: 'rgba(243,234,216,0.04)',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '3px',
  color: '#f8f0df',
  fontSize: '0.93rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  padding: '0.7rem 0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const inputErrorStyle = { ...inputStyle, border: '1px solid rgba(220,80,60,0.6)' };

const labelStyle = {
  display: 'block',
  color: 'rgba(243,234,216,0.72)',
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  fontWeight: 500,
  marginBottom: '0.45rem',
  fontFamily: "'DM Sans', sans-serif",
};

const optionalStyle = { color: 'rgba(243,234,216,0.5)', fontWeight: 300 };

const fieldWrap = { marginBottom: '1.4rem' };
const twoCol = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.4rem' };

export default function ProfileForm({ onSaved }) {
  const { user, checkUserAuth } = useAuth();
  const { content: c } = useTranslatedContent('profile-form', CONTENT);
  const existing = getProfile(user);

  const [form, setForm] = useState({
    preferred_full_name: existing.preferred_full_name || getPreferredName(user) || '',
    country: existing.country || '',
    city_or_community: existing.city_or_community || '',
    age_range: existing.age_range || '',
    preferred_language: existing.preferred_language || '',
    education_level: existing.education_level || '',
    self_described_identity: existing.self_described_identity || '',
  });
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const set = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.preferred_full_name.trim().replace(/\s+/g, ' ');
    if (!name) {
      setError(c.errName);
      return;
    }
    if (name.length > 120) {
      setError(c.errNameLength);
      return;
    }

    setStatus('saving');
    setError('');
    try {
      await base44.auth.updateMe({
        preferred_full_name: name,
        country: form.country.trim(),
        city_or_community: form.city_or_community.trim(),
        age_range: form.age_range,
        preferred_language: form.preferred_language,
        education_level: form.education_level,
        self_described_identity: form.self_described_identity.trim(),
        profile_completed_at: existing.profile_completed_at || new Date().toISOString(),
      });
      await checkUserAuth();
      setStatus('saved');
      if (onSaved) onSaved();
    } catch (_) {
      setStatus('idle');
      setError(c.errorBanner);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Learner profile form">
      {status === 'saved' && (
        <div
          role="status"
          aria-live="polite"
          style={{ marginBottom: '1.5rem', padding: '0.9rem 1.15rem', border: '1px solid rgba(232,184,91,0.4)', borderRadius: '3px', backgroundColor: 'rgba(232,184,91,0.06)' }}
        >
          <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.88rem', margin: 0 }}>
            {c.saved}
          </p>
        </div>
      )}

      {error && (
        <div role="alert" style={{ marginBottom: '1.5rem', padding: '0.9rem 1.15rem', border: '1px solid rgba(220,80,60,0.35)', borderRadius: '3px', backgroundColor: 'rgba(220,80,60,0.06)' }}>
          <p className="font-body" style={{ color: 'rgba(220,130,110,0.95)', fontSize: '0.88rem', margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      <div style={fieldWrap}>
        <label htmlFor="field-preferred_full_name" style={labelStyle}>
          {c.nameLabel} <span aria-hidden="true" style={{ color: '#e8b85b' }}>*</span>
          <span className="sr-only"> (required)</span>
        </label>
        <input
          id="field-preferred_full_name"
          type="text"
          autoComplete="name"
          maxLength={120}
          value={form.preferred_full_name}
          onChange={set('preferred_full_name')}
          aria-required="true"
          aria-invalid={Boolean(error)}
          style={error ? inputErrorStyle : inputStyle}
          placeholder={c.namePlaceholder}
        />
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.76rem', lineHeight: 1.6, margin: '0.4rem 0 0', fontWeight: 300 }}>
          {c.nameHint}
        </p>
      </div>

      <div style={twoCol} className="profile-two-col">
        <div>
          <label htmlFor="field-country" style={labelStyle}>
            {c.country} <span style={optionalStyle}>{c.optional}</span>
          </label>
          <input
            id="field-country"
            type="text"
            autoComplete="country-name"
            maxLength={80}
            value={form.country}
            onChange={set('country')}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="field-city" style={labelStyle}>
            {c.cityOrCommunity} <span style={optionalStyle}>{c.optional}</span>
          </label>
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

      <div style={twoCol} className="profile-two-col">
        <div>
          <label htmlFor="field-age_range" style={labelStyle}>
            {c.ageRange} <span style={optionalStyle}>{c.optional}</span>
          </label>
          <select id="field-age_range" value={form.age_range} onChange={set('age_range')} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">{c.selectOption}</option>
            {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="field-preferred_language" style={labelStyle}>
            {c.preferredLanguage} <span style={optionalStyle}>{c.optional}</span>
          </label>
          <select id="field-preferred_language" value={form.preferred_language} onChange={set('preferred_language')} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">{c.selectOption}</option>
            {LANGUAGE_OPTIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      </div>

      <div style={fieldWrap}>
        <label htmlFor="field-education_level" style={labelStyle}>
          {c.educationLevel} <span style={optionalStyle}>{c.optional}</span>
        </label>
        <select id="field-education_level" value={form.education_level} onChange={set('education_level')} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">{c.selectOption}</option>
          {EDUCATION_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div style={fieldWrap}>
        <label htmlFor="field-identity" style={labelStyle}>
          {c.identity} <span style={optionalStyle}>{c.optional}</span>
        </label>
        <input
          id="field-identity"
          type="text"
          maxLength={120}
          value={form.self_described_identity}
          onChange={set('self_described_identity')}
          style={inputStyle}
        />
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.76rem', lineHeight: 1.6, margin: '0.4rem 0 0', fontWeight: 300 }}>
          {c.identityHint}
        </p>
      </div>

      <p className="font-body" style={{ color: 'rgba(243,234,216,0.58)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
        {c.privacyNotice}
      </p>

      <button
        type="submit"
        disabled={status === 'saving'}
        aria-busy={status === 'saving'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: status === 'saving' ? 'rgba(26,19,14,0.6)' : '#24150f',
          backgroundColor: status === 'saving' ? 'rgba(232,184,91,0.6)' : '#e8b85b',
          fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
          border: '1px solid transparent', borderRadius: '2px', padding: '0.75rem 1.6rem',
          cursor: status === 'saving' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'saving' ? c.saving : c.save}
      </button>

      <style>{`
        @media (max-width: 560px) { .profile-two-col { grid-template-columns: 1fr !important; } }
        select option { background-color: #2a1f17; color: #f8f0df; }
        input:focus, select:focus { outline: 2px solid rgba(232,184,91,0.55); outline-offset: 1px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>
    </form>
  );
}