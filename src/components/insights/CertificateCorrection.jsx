import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * CertificateCorrection — admin tool for correcting the name on an already
 * issued certificate and resending it to the learner's own account email.
 *
 * The resend always goes to the address on the learner's account, so a
 * certificate can never be mailed to an address an administrator types in.
 */

const bodyText = { color: 'rgba(243,234,216,0.7)', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, margin: 0 };
const cardStyle = { padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' };

const inputStyle = {
  width: '100%',
  backgroundColor: 'rgba(243,234,216,0.04)',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '3px',
  color: '#f8f0df',
  fontSize: '0.92rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  padding: '0.6rem 0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const smallButton = {
  display: 'inline-flex', alignItems: 'center',
  backgroundColor: '#e8b85b', color: '#24150f',
  fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase',
  fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
  border: '1px solid transparent', borderRadius: '2px', padding: '0.5rem 1rem',
  cursor: 'pointer',
};

const quietButton = {
  ...smallButton,
  backgroundColor: 'transparent',
  color: 'rgba(243,234,216,0.7)',
  border: '1px solid rgba(232,184,91,0.28)',
  fontWeight: 500,
};

export default function CertificateCorrection() {
  const [certificates, setCertificates] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [openId, setOpenId] = useState(null);
  const [newName, setNewName] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [loadError, setLoadError] = useState(false);

  const load = () => {
    Promise.all([
      base44.entities.CourseCertificate.list('-issued_at', 200),
      base44.entities.User.list('-created_date', 1000),
    ])
      .then(([certs, users]) => {
        setCertificates(certs || []);
        const map = {};
        (users || []).forEach((u) => { map[u.id] = u; });
        setUserMap(map);
      })
      .catch(() => setLoadError(true));
  };

  useEffect(() => { load(); }, []);

  const open = (cert) => {
    setOpenId(cert.id);
    setNewName((cert.learner_name || '').trim());
    setConfirmed(false);
    setNotice('');
  };

  const cancel = () => {
    setOpenId(null);
    setNewName('');
    setConfirmed(false);
  };

  const apply = async (cert) => {
    if (!confirmed) return;
    setBusy(true);
    setNotice('');
    try {
      const res = await base44.functions.invoke('adminCorrectCertificate', {
        learner_id: cert.learner_id,
        course_slug: cert.course_slug,
        learner_name: newName.trim(),
        confirm: true,
      });
      const data = res?.data || {};
      if (data.corrected) {
        setNotice(data.emailed_to
          ? `Corrected and resent to ${data.emailed_to}.`
          : 'Name corrected, but the email could not be sent. The certificate record has been updated.');
        setOpenId(null);
        setNewName('');
        setConfirmed(false);
        setCertificates(null);
        load();
      } else {
        setNotice('The correction was not applied. Please check the learner and course.');
      }
    } catch (_) {
      setNotice('The correction could not be applied. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (loadError) {
    return (
      <div style={cardStyle}>
        <p style={bodyText}>Certificates could not be loaded.</p>
      </div>
    );
  }

  if (!certificates) {
    return (
      <div style={cardStyle}>
        <p style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>Loading certificates…</p>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div style={cardStyle}>
        <p style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
          No certificates have been issued yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ ...bodyText, marginBottom: '1.5rem', maxWidth: '640px' }}>
        Correct the name on an issued certificate. The learner's account and the existing certificate are both
        verified first, the original name is kept on the record, and the corrected certificate is regenerated and
        emailed to the address on the learner's account.
      </p>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          style={{ marginBottom: '1.5rem', padding: '0.85rem 1.1rem', border: '1px solid rgba(232,184,91,0.4)', borderRadius: '3px', backgroundColor: 'rgba(232,184,91,0.06)' }}
        >
          <p style={{ ...bodyText, color: '#e8b85b' }}>{notice}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {certificates.map((cert) => {
          const learner = userMap[cert.learner_id] || {};
          const isOpen = openId === cert.id;
          const unchanged = newName.trim() === (cert.learner_name || '').trim();
          return (
            <div key={cert.id} style={cardStyle}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <p className="font-heading" style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 400, margin: '0 0 0.3rem' }}>
                    {(cert.learner_name || '').trim()}
                  </p>
                  <p style={{ ...bodyText, fontSize: '0.82rem', color: 'rgba(243,234,216,0.55)' }}>
                    {cert.course_title} · {learner.email || 'no account email'}
                  </p>
                  {cert.previous_learner_name && (
                    <p style={{ ...bodyText, fontSize: '0.78rem', color: 'rgba(232,184,91,0.75)', marginTop: '0.3rem' }}>
                      Previously issued as “{cert.previous_learner_name.trim()}”
                    </p>
                  )}
                </div>
                {!isOpen && (
                  <button type="button" style={quietButton} onClick={() => open(cert)}>
                    Correct name
                  </button>
                )}
              </div>

              {isOpen && (
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(232,184,91,0.14)', paddingTop: '1.25rem' }}>
                  <label htmlFor={`name-${cert.id}`} style={{ display: 'block', color: 'rgba(243,234,216,0.72)', fontSize: '0.78rem', letterSpacing: '0.08em', fontWeight: 500, marginBottom: '0.45rem' }}>
                    Name as it should appear on the certificate
                  </label>
                  <input
                    id={`name-${cert.id}`}
                    type="text"
                    maxLength={120}
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value); setNotice(''); }}
                    style={inputStyle}
                  />

                  <label style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginTop: '1rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      style={{ marginTop: '0.2rem', accentColor: '#e8b85b', width: '16px', height: '16px', flexShrink: 0 }}
                    />
                    <span style={{ ...bodyText, fontSize: '0.86rem', color: 'rgba(243,234,216,0.78)' }}>
                      I have verified this learner's account. Update the certificate and resend the corrected PDF to{' '}
                      <strong style={{ color: '#f8f0df', fontWeight: 500 }}>{learner.email || 'the account email'}</strong>.
                    </span>
                  </label>

                  <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      style={{ ...smallButton, opacity: (!confirmed || !newName.trim() || unchanged || busy) ? 0.5 : 1, cursor: (!confirmed || !newName.trim() || unchanged || busy) ? 'not-allowed' : 'pointer' }}
                      disabled={!confirmed || !newName.trim() || unchanged || busy}
                      onClick={() => apply(cert)}
                    >
                      {busy ? 'Sending…' : 'Update and resend'}
                    </button>
                    <button type="button" style={quietButton} onClick={cancel} disabled={busy}>
                      Cancel
                    </button>
                  </div>

                  {unchanged && newName.trim().length > 0 && (
                    <p style={{ ...bodyText, fontSize: '0.78rem', color: 'rgba(243,234,216,0.5)', marginTop: '0.8rem' }}>
                      Enter a different name to update the certificate.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}