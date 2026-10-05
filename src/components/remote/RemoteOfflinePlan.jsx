import React from 'react';
import { Printer } from 'lucide-react';
import { OFFLINE_PLAN } from '@/lib/remote-pathway';

const boxStyle = {
  width: '11px',
  height: '11px',
  border: '1px solid #8a7355',
  borderRadius: '1px',
  flexShrink: 0,
  marginTop: '4px',
};

/**
 * RemoteOfflinePlan — the study plan a Remote Learner carries away from the
 * screen: the five stages as a short checklist, plus lines to fill in by hand.
 *
 * It is marked with .tamu-print-area, so printing shows this and nothing else.
 * The plan is static: it never reads or writes anything the learner has saved,
 * which is why printing it is always safe.
 */
export default function RemoteOfflinePlan({ onPrint }) {
  return (
    <section id="offline-plan" style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '5rem', scrollMarginTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span className="font-body" style={{ display: 'block', color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' }}>
          Offline
        </span>
        <h2 className="font-heading" style={{ color: 'var(--tamu-ink)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          Your printable study plan
        </h2>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.5rem', maxWidth: '46rem' }}>
          The five stages as a checklist, with room to note the module you are on. Print it, or save it as a PDF from the print dialog, and it works with no connection at all.
        </p>

        <button
          type="button"
          onClick={onPrint}
          className="no-print tamu-journey-primary font-body"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', borderRadius: '2px', padding: '0.7rem 1.3rem', marginBottom: '2rem' }}
        >
          <Printer size={14} strokeWidth={1.8} aria-hidden="true" />
          Print or save as PDF
        </button>

        <div
          className="tamu-print-area tamu-print-plan"
          style={{ backgroundColor: '#FBF5E8', border: '1px solid #e3d5ba', borderRadius: '3px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '820px' }}
        >
          <div className="font-heading" style={{ color: '#2A2119', fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '0.5rem' }}>
            {OFFLINE_PLAN.title}
          </div>
          <div className="font-body" style={{ color: '#5c4b39', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '40rem' }}>
            {OFFLINE_PLAN.intro}
          </div>

          {OFFLINE_PLAN.blocks.map((block) => (
            <div key={block.title} className="plan-block" style={{ marginBottom: '1.4rem' }}>
              <div className="font-heading" style={{ color: '#33241A', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.6rem' }}>
                {block.title}
              </div>
              {block.lines.map((line) => (
                <div key={line} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span aria-hidden="true" style={boxStyle} />
                  <span className="font-body" style={{ color: '#2A2119', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          ))}

          <div className="font-body plan-line" style={{ borderTop: '1px solid #d9c8a6', paddingTop: '0.85rem', color: '#7a6650', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            {OFFLINE_PLAN.footer}
          </div>
        </div>
      </div>
    </section>
  );
}