import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const accent = '#D4A12A';
const cardStyle = {
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(212,161,42,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};
const labelStyle = {
  color: accent,
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.75rem',
  fontFamily: "'DM Sans', sans-serif",
};
const bodyText = {
  color: 'rgba(245,239,224,0.7)',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
};
const btnBase = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.78rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '0.7rem 1.4rem',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid rgba(212,161,42,0.4)',
  transition: 'all 0.25s ease',
};
const btnPrimary = { ...btnBase, backgroundColor: accent, color: '#1A130E', border: 'none', fontWeight: 500 };
const btnGhost = { ...btnBase, backgroundColor: 'transparent', color: '#F5EFE0' };

// Pre-filled with the Voices of Change engagement list (deduplicated).
const PREFILL_EMAILS = `kathurironnie@gmail.com
fraviannjoroge@gmail.com
wallacekish54@gmail.com
waiyaki.voicesofchange@gmail.com
salinenjango@gmail.com
wawerumariannah53@gmail.com
rehemafaith78@gmail.com
bmburu772@gmail.com
hezyarthur@gmail.com
kabakenneth82@gmail.com
nancywaithira420@gmail.com
nimrodaberi11@gmail.com
caltoneagugo@gmail.com
mureithimelvin02@gmail.com
ezekmunguti@gmail.com
kelvinwaciori@gmail.com
e267937@gmail.com
anyangolavender06@gmail.com
assumptawausi@gmail.com
marymueni980@gmail.com
munyakarosemary748@gmail.com
salinenjangoo@gmail.com
knganga357@gmail.com
kelvinmbugua596@gmail.com
makoric724@gmail.com
evanslomunyak04@gmail.com
rotichjustus2020@gmail.com
ntimamankobulu@gmail.com
rufinacarel@gmail.com
zafaranmudola754@gmail.com
thomassichimba69@gmail.com
aganilorraine8@gmail.com
mitchellwangui24@gmail.com
tamarakahuth@gmail.com
chepkoechmarsher2@gmail.com
kariukitrace149@gmail.com
ngwonoalice@gmail.com
grahab473@gmail.com
hermontroons@gmail.com
nyamburamichelle400@gmail.com
kamoroalex@gmail.com
kennedyhassan94@gmail.com
gracengangalcc@gmail.com
staceymelvineakinyi@gmail.com
zachmaishmaina31@gmail.com
kemumarisper96@gmail.com
omondialice02@gmail.com
kingwaiyaki1@gmail.com
hanningtago@gmail.com
chantalnaretu98@gmail.com
kemuntoruthie@gmail.com
emmanuelgifton17@gmail.com
juvinalis@students.uonbi.ac.ke
gladrosenicole@gmail.com
murithiblessy520@gmail.com
quinterawino99@gmail.com
m80592610@gmail.com
masikadavis3@gmail.com
teddyokoth2@gmail.com
halimashariff73@gmail.com
koinaerick200@gmail.com
eugenekoskei3@gmail.com
jaguarparlor@gmail.com
sammynjuguna6517@gmail.com
waiyakimungai1997@gmail.com
karaniwalter28@gmail.com
miriam.wambui027@gmail.com
hwaiyaki@icloud.com
brightfuturekenya659@gmail.com
muchaiannastaciah308@gmail.com
ericmutai52@gmail.com
obwangaemmanuelotieno@gmail.com
flexymwangie@gmail.com
brenda@sustainthevoices.org
aberironald@gmail.com`;

export default function VoicesOfChangeAnnouncement() {
  const [emailsText, setEmailsText] = useState(PREFILL_EMAILS);
  const [messageType, setMessageType] = useState('announcement');
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const runPreview = async () => {
    setBusy('preview');
    setError('');
    setResult(null);
    try {
      const res = await base44.functions.invoke('sendVoicesOfChangeAnnouncement', {
        dry_run: true,
        emails: emailsText,
        message_type: messageType,
      });
      setPreview(res && res.data ? res.data : null);
    } catch (e) {
      setError('Could not parse recipients. Please check the list and try again.');
    } finally {
      setBusy(null);
    }
  };

  const sendAnnouncement = async () => {
    if (!preview || preview.eligible_count === 0) return;
    const ok = window.confirm(
      `Send the ${messageType === 'follow_up' ? 'follow-up reminder' : 'announcement'} to ${preview.eligible_count} recipient${preview.eligible_count === 1 ? '' : 's'}?`
    );
    if (!ok) return;
    setBusy('send');
    setError('');
    try {
      const res = await base44.functions.invoke('sendVoicesOfChangeAnnouncement', {
        dry_run: false,
        emails: emailsText,
        message_type: messageType,
      });
      setResult(res && res.data ? res.data : null);
      setPreview(null);
    } catch (e) {
      setError('The send failed. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div style={cardStyle}>
      <span style={labelStyle}>Voices of Change outreach</span>
      <h3 style={{ color: '#F5EFE0', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem', margin: '0 0 0.75rem' }}>
        {messageType === 'announcement'
          ? 'Announce Tamu Academy to the Voices of Change community'
          : 'Follow up with the Voices of Change community'}
      </h3>
      <p style={{ ...bodyText, marginBottom: '1rem', maxWidth: '560px' }}>
        {messageType === 'announcement'
          ? 'Sends a tailored email introducing Tamu Academy as the educational arm of Voices of Change, with a link to the live courses. Paste the email list below (one per line, or comma-separated), preview, then send.'
          : 'Sends a follow-up reminder to everyone who received the first announcement, encouraging them to start a course. Uses the same recipient list — preview, then send.'}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['announcement', 'follow_up'].map((mt) => (
          <button
            key={mt}
            onClick={() => { setMessageType(mt); setPreview(null); setResult(null); }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              border: messageType === mt ? 'none' : '1px solid rgba(212,161,42,0.3)',
              backgroundColor: messageType === mt ? '#D4A12A' : 'transparent',
              color: messageType === mt ? '#1A130E' : 'rgba(245,239,224,0.7)',
              fontWeight: messageType === mt ? 500 : 300,
            }}
          >
            {mt === 'announcement' ? 'Announcement' : 'Follow-up'}
          </button>
        ))}
      </div>

      <textarea
        value={emailsText}
        onChange={(e) => { setEmailsText(e.target.value); setPreview(null); setResult(null); }}
        spellCheck={false}
        aria-label="Recipient email addresses"
        style={{
          width: '100%',
          minHeight: '160px',
          padding: '0.75rem',
          backgroundColor: 'rgba(26,19,14,0.6)',
          border: '1px solid rgba(212,161,42,0.25)',
          borderRadius: '4px',
          color: '#F5EFE0',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.8rem',
          lineHeight: 1.5,
          resize: 'vertical',
          outline: 'none',
        }}
      />

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button style={btnGhost} onClick={runPreview} disabled={!!busy}>
          {busy === 'preview' ? 'Checking…' : 'Preview recipients'}
        </button>
        <button
          style={preview && preview.eligible_count > 0 ? btnPrimary : { ...btnPrimary, opacity: 0.4, cursor: 'not-allowed' }}
          onClick={sendAnnouncement}
          disabled={!preview || preview.eligible_count === 0 || !!busy}
        >
          {busy === 'send' ? 'Sending…' : `Send to ${preview ? preview.eligible_count : 0}`}
        </button>
      </div>

      {error && <p style={{ ...bodyText, color: '#E8951C', marginTop: '1rem' }}>{error}</p>}

      {preview && (
        <div style={{ marginTop: '1.25rem' }}>
          <p style={{ ...bodyText, marginBottom: '0.5rem' }}>
            {preview.eligible_count} valid recipient{preview.eligible_count === 1 ? '' : 's'} (duplicates and invalid entries removed).
          </p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1.25rem', padding: '0.9rem 1rem', border: '1px solid rgba(212,161,42,0.25)', borderRadius: '4px' }}>
          <p style={{ ...bodyText, margin: 0 }}>
            <span style={{ color: accent, fontWeight: 500 }}>{result.sent}</span> sent
            {result.failed > 0 && (
              <>, <span style={{ color: '#E8951C', fontWeight: 500 }}>{result.failed}</span> failed</>
            )}
            .
          </p>
          {result.failed > 0 && result.errors && result.errors.length > 0 && (
            <p style={{ ...bodyText, fontSize: '0.78rem', marginTop: '0.5rem', color: 'rgba(245,239,224,0.5)' }}>
              {result.errors.slice(0, 8).map(e => e.email).join(', ')}{result.errors.length > 8 ? '…' : ''}
            </p>
          )}
        </div>
      )}
    </div>
  );
}