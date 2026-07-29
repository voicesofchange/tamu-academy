import React, { useState } from 'react';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  fontWeight: 300,
};

const eyebrowStyle = {
  color: '#D4A12A',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const privacyBoxStyle = {
  padding: '1.1rem 1.35rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
};

const textareaStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.55rem 0.7rem',
  border: '1px solid rgba(212,161,42,0.25)',
  borderRadius: '3px',
  background: 'rgba(245,239,224,0.025)',
  color: 'rgba(245,239,224,0.85)',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  fontFamily: 'inherit',
  minHeight: '2.75rem',
  resize: 'vertical',
  display: 'block',
};

const labelStyle = {
  color: 'rgba(212,161,42,0.82)',
  fontWeight: 500,
  fontSize: '0.78rem',
  letterSpacing: '0.03em',
  display: 'block',
  marginBottom: '0.35rem',
};

const actionButtonStyle = {
  color: '#D4A12A',
  backgroundColor: 'transparent',
  border: '1px solid rgba(212,161,42,0.4)',
  padding: '0.55rem 1.1rem',
  fontSize: '0.76rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  cursor: 'pointer',
};

function newEntry() {
  return {
    offers: '',
    cannotSafelyProvide: '',
    consentOrPrivacy: '',
    overConcentration: '',
    careGap: '',
    nextStep: '',
  };
}

function fieldIdToKey(id) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * MhCommunityCareMap — the Mental Health Module 1 applied activity.
 *
 * PRIVACY (mandatory — do not regress):
 *   - The worksheet lives ENTIRELY in React component state (in-memory).
 *   - No textarea value is ever sent to a backend function, saved to
 *     an entity, written to localStorage / sessionStorage / IndexedDB,
 *     stored in a cookie, serialized into a URL parameter, or piped to
 *     analytics. No autosave, no account sync.
 *   - Refreshing the page or unmounting the component simply drops
 *     the state — the content disappears.
 *   - The learner may print the worksheet as displayed, or print a
 *     blank template, using the browser's built-in print function. No
 *     server-side PDF generation; no file uploads. The print layout is
 *     handled by the existing `@media print` rules in `src/index.css`
 *     that scope to the `.tamu-print-area` class — controls inside
 *     the component are marked `print:hidden` so they stay on screen
 *     but disappear from the printout.
 *
 * The component renders four rings, each with zero or more "support"
 * entries. Each entry exposes six fields derived from the canonical
 * `entryFields` list supplied by the lesson content (the protected
 * curriculum is the sole source of instruction wording; this component
 * only handles layout and state).
 */
export default function MhCommunityCareMap({ config }) {
  function initialRings() {
    const init = {};
    config.ringDefinitions.forEach((r) => {
      init[r.id] = [newEntry()];
    });
    return init;
  }

  const [rowsByRing, setRowsByRing] = useState(initialRings);
  const [blankPrintActive, setBlankPrintActive] = useState(false);

  function addSupport(ringId) {
    setRowsByRing((prev) => ({
      ...prev,
      [ringId]: [...prev[ringId], newEntry()],
    }));
  }

  function removeSupport(ringId, idx) {
    setRowsByRing((prev) => {
      const list = prev[ringId];
      const next =
        list.length > 1 ? list.filter((_, i) => i !== idx) : [newEntry()];
      return { ...prev, [ringId]: next };
    });
  }

  function updateField(ringId, idx, key, value) {
    setRowsByRing((prev) => {
      const next = [...prev[ringId]];
      next[idx] = { ...next[idx], [key]: value };
      return { ...prev, [ringId]: next };
    });
  }

  function handleClearAll() {
    if (window.confirm(config.clearWorksheetConfirm)) {
      setRowsByRing(initialRings());
    }
  }

  function handlePrint() {
    window.print();
  }

  // Print blank worksheet WITHOUT mutating the active worksheet state.
  // The blank template (rendered alongside the worksheet as a sibling)
  // takes over the printable area while blankPrintActive is true; the
  // populated worksheet is marked print:hidden so it stays on screen
  // but disappears from the printout. After the print dialog closes
  // (via the afterprint event, with a setTimeout fallback) the state
  // is restored to its normal screen+print layout. The learner's
  // entries are never read, copied, cleared, or overwritten during
  // this action.
  function handlePrintBlank() {
    setBlankPrintActive(true);
    const cleanup = () => {
      setBlankPrintActive(false);
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          window.print();
        } catch (err) {
          // best-effort — fall through to the timeout cleanup
        } finally {
          // Fallback in case the afterprint event does not fire
          setTimeout(cleanup, 200);
        }
      });
    });
    // Safety net for the rare case both afterprint and the
    // post-print timeout fail to fire.
    setTimeout(cleanup, 6000);
  }

  return (
    <section aria-label="Community of Care Map worksheet">
      {/* Privacy notice + pre-activity reminder — visible on screen,
          hidden from the printout */}
      <div className="print:hidden" style={{ ...privacyBoxStyle, marginBottom: '1.25rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.55rem' }}>
          Privacy notice
        </span>
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.05rem' }}>
          {config.privacyNotice.map((line, i) => (
            <li key={i} style={{ marginBottom: '0.3rem' }}>{line}</li>
          ))}
        </ul>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem' }}>
          {config.preActivityReminder}
        </p>
      </div>

      {/* On-screen controls */}
      <div className="print:hidden" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button type="button" onClick={handleClearAll} style={actionButtonStyle}>
          {config.clearWorksheetLabel}
        </button>
        <button type="button" onClick={handlePrint} style={actionButtonStyle}>
          {config.printLabel}
        </button>
        <button type="button" onClick={handlePrintBlank} style={actionButtonStyle}>
          {config.printBlankLabel}
        </button>
      </div>

      {/* Printable area — the existing @media print rule in
          src/index.css hides everything except .tamu-print-area.
          When blankPrintActive is true, this div is marked
          print:hidden (hidden in print, visible on screen) and the
          separate blank template below takes over the printable
          area. The learner's active worksheet entries are never
          referenced, copied, or mutated during a blank print. */}
      <div className={blankPrintActive ? 'print:hidden' : 'tamu-print-area'}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{config.overview}</p>

        {config.ringDefinitions.map((ring) => (
          <section key={ring.id} style={{ marginBottom: '1.5rem' }} aria-label={ring.label}>
            <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, marginBottom: '0.6rem' }}>
              {ring.label}
            </h3>

            {rowsByRing[ring.id].map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid rgba(212,161,42,0.16)',
                  borderRadius: '4px',
                  marginBottom: '0.7rem',
                }}
              >
                {config.entryFields.map((field) => {
                  const key = fieldIdToKey(field.id);
                  return (
                    <div key={field.id} style={{ marginBottom: '0.7rem' }}>
                      <label
                        htmlFor={`cm-${ring.id}-${idx}-${field.id}`}
                        className="font-body"
                        style={labelStyle}
                      >
                        {field.label}
                      </label>
                      <textarea
                        id={`cm-${ring.id}-${idx}-${field.id}`}
                        value={row[key] || ''}
                        onChange={(e) => updateField(ring.id, idx, key, e.target.value)}
                        style={textareaStyle}
                        aria-label={field.label}
                      />
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="print:hidden"
                  onClick={() => removeSupport(ring.id, idx)}
                  style={actionButtonStyle}
                >
                  {config.removeSupportLabel}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="print:hidden"
              onClick={() => addSupport(ring.id)}
              style={actionButtonStyle}
            >
              {config.addSupportLabel}
            </button>
          </section>
        ))}

        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '1rem', fontSize: '0.85rem', marginBottom: 0 }}>
          {config.printReminder}
        </p>
      </div>

      {/* Separate blank template — print-only. The learner's active
          worksheet entries are never referenced or mutated. Rendered
          alongside the worksheet; on screen the Tailwind `hidden`
          class keeps it display:none. When blankPrintActive is true,
          the template also gets `tamu-print-area` plus `print:block`
          (the latter overrides `hidden` inside @media print), making
          it the only printable area on the page. */}
      <div
        className={blankPrintActive ? 'tamu-print-area hidden print:block' : 'hidden'}
        aria-hidden="true"
      >
        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.35rem', fontWeight: 400, marginBottom: '0.7rem' }}>
          {config.heading} — Blank Worksheet
        </h3>
        {config.ringDefinitions.map((ring) => (
          <section key={`blank-${ring.id}`} style={{ marginBottom: '1.4rem' }} aria-label={ring.label}>
            <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.55rem' }}>
              {ring.label}
            </h3>
            {config.entryFields.map((field) => (
              <div key={field.id} style={{ marginBottom: '0.65rem' }}>
                <label className="font-body" style={labelStyle}>
                  {field.label}
                </label>
                <textarea
                  value=""
                  readOnly
                  tabIndex={-1}
                  style={textareaStyle}
                  aria-label={`${field.label} (blank)`}
                />
              </div>
            ))}
          </section>
        ))}
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '1rem', fontSize: '0.85rem', marginBottom: 0 }}>
          {config.printReminder}
        </p>
      </div>
    </section>
  );
}