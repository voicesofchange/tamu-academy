import React from 'react';
import HubDownloadButton from '@/components/hub/HubDownloadButton';
import { HUB_HANDBOOK, downloadTextFile, handbookText } from '@/lib/learning-hub';

const itemStyle = { padding: '1.4rem 1.5rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' };

/**
 * HubHandbook — the practical side of the hub: how a module works, how
 * progress and certificates are handled, how to study on a slow connection,
 * and where to go when something is unclear.
 */
export default function HubHandbook() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <HubDownloadButton
          onClick={() => downloadTextFile('tamu-academy-learners-handbook.txt', handbookText())}
          label="Download handbook"
        />
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.78rem', fontWeight: 300, alignSelf: 'center' }}>
          Plain-text file, ready for offline study.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.15rem' }}>
        {HUB_HANDBOOK.map((item) => (
          <div key={item.title} style={itemStyle}>
            <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.35, margin: '0 0 0.6rem' }}>
              {item.title}
            </h3>
            <p className="font-body" style={{ color: 'rgba(243,234,216,0.76)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}