import React from 'react';
import { Feather, Gauge } from 'lucide-react';
import { useDisplayMode } from '@/lib/display-mode';

/**
 * PathwayModeStatus — the Standard / Data-Saver switch in the place a Remote
 * Learner needs it: on the pathway itself, rather than only in the site
 * navigation. It reports the current mode and states plainly what the page
 * does either way, so nobody has to guess what is being downloaded.
 */
export default function PathwayModeStatus() {
  const { isDataSaver, setMode } = useDisplayMode();
  const Icon = isDataSaver ? Feather : Gauge;

  return (
    <section id="pathway-mode" style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '3.5rem', scrollMarginTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', padding: '1.6rem 1.9rem', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.045)' }}>
          <div style={{ flex: '1 1 20rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Icon size={14} color="var(--tamu-gold)" aria-hidden="true" />
              <span className="font-body" style={{ color: 'var(--tamu-gold)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                {isDataSaver ? 'Data-Saver is on' : 'Standard mode is on'}
              </span>
            </div>
            <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300, margin: 0, maxWidth: '42rem' }}>
              {isDataSaver
                ? 'Pages are running on system text with no decorative imagery, and no video or audio is downloaded unless you press play. This page and every lesson stay text-first.'
                : 'You are on the full experience, and lesson media still waits for your tap before it loads. Data-Saver removes decorative imagery altogether and keeps every page to system text.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isDataSaver}
            onClick={() => setMode(isDataSaver ? 'standard' : 'data_saver')}
            className="tamu-mode-toggle font-body"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', borderRadius: '2px', padding: '0.6rem 1.1rem', border: '1px solid var(--tamu-gold)', backgroundColor: 'var(--tamu-gold)', color: '#24150f' }}
          >
            <Icon size={13} strokeWidth={2} aria-hidden="true" />
            {isDataSaver ? 'Switch off Data-Saver' : 'Switch on Data-Saver'}
          </button>
        </div>

        <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, margin: '0.6rem 0 0' }}>
          The choice is kept on this device, so a phone can read in Data-Saver while a desktop stays on the full experience.
        </p>
      </div>
    </section>
  );
}