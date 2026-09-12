import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { formatDistanceToNow } from 'date-fns';
import { MailOpen, Mail, RefreshCw } from 'lucide-react';

const accent = '#e8b85b';
const cardStyle = {
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
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
  color: 'rgba(243,234,216,0.7)',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
};
const btnBase = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid rgba(232,184,91,0.3)',
  transition: 'all 0.25s ease',
  backgroundColor: 'transparent',
};

export default function VoicesOpenTracking() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const list = await base44.entities.EmailOpenEvent.list('-sent_at', 200);
      setEvents(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const opened = events.filter((e) => e.opened_at);
  const openRate = events.length > 0 ? Math.round((opened.length / events.length) * 100) : 0;

  const filtered = events.filter((e) => {
    if (filter === 'opened') return !!e.opened_at;
    if (filter === 'not_opened') return !e.opened_at;
    return true;
  });

  const stat = (value, label) => (
    <div>
      <div style={{ color: accent, fontSize: '2rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif", marginTop: '0.4rem' }}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span style={labelStyle}>Email engagement</span>
          <h3 style={{ color: '#f8f0df', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem', margin: 0 }}>
            Open tracking — Voices of Change outreach
          </h3>
        </div>
        <button
          style={{ ...btnBase, color: '#f8f0df', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          onClick={load}
          disabled={loading}
        >
          <RefreshCw size={13} style={{ animation: loading ? 'tamuPulse 1s infinite' : 'none' }} />
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <p style={{ ...bodyText, marginBottom: '1.25rem', marginTop: '0.75rem', maxWidth: '560px' }}>
        Each sent email includes a tracking pixel. Opens are logged here as recipients load the
        image — note that clients which block images will not register.
      </p>

      {error ? (
        <p style={{ ...bodyText, color: '#E8951C' }}>Could not load open data. Please refresh.</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {stat(events.length, 'Emails sent')}
            {stat(opened.length, 'Unique opens')}
            {stat(`${openRate}%`, 'Open rate')}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: `All (${events.length})` },
              { key: 'opened', label: `Opened (${opened.length})` },
              { key: 'not_opened', label: `Not opened (${events.length - opened.length})` },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  ...btnBase,
                  border: filter === f.key ? 'none' : '1px solid rgba(232,184,91,0.3)',
                  backgroundColor: filter === f.key ? accent : 'transparent',
                  color: filter === f.key ? '#24150f' : 'rgba(243,234,216,0.7)',
                  fontWeight: filter === f.key ? 500 : 300,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
              {events.length === 0
                ? 'No tracked sends yet. Sends from this panel will appear here.'
                : 'No recipients match this filter.'}
            </p>
          ) : (
            <div style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid rgba(232,184,91,0.15)', borderRadius: '4px' }}>
              {filtered.map((e) => {
                const isOpened = !!e.opened_at;
                return (
                  <div
                    key={e.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      padding: '0.6rem 0.9rem',
                      borderBottom: '1px solid rgba(232,184,91,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flex: 1 }}>
                      {isOpened ? (
                        <MailOpen size={15} style={{ color: accent, flexShrink: 0 }} />
                      ) : (
                        <Mail size={15} style={{ color: 'rgba(243,234,216,0.35)', flexShrink: 0 }} />
                      )}
                      <span style={{ color: '#f8f0df', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {e.recipient_email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                      {isOpened ? (
                        <>
                          {e.open_count > 1 && (
                            <span style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif" }}>
                              {e.open_count}×
                            </span>
                          )}
                          <span style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
                            {formatDistanceToNow(new Date(e.opened_at), { addSuffix: true })}
                          </span>
                        </>
                      ) : (
                        <span style={{ color: 'rgba(243,234,216,0.35)', fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif" }}>
                          Not opened
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}