import React, { useState } from 'react';

/**
 * MhStrengthWithoutSilenceLab — the browser local worksheet renderer
 * for the Module 2 applied activity.
 *
 * All text and structure arrive via the `lab` prop, which is selected
 * from the authenticated `getMentalHealthModule` response (admin-gated
 * during Stage 5). No protected wording is hard-coded here.
 *
 * STATE / PRIVACY CONTRACT (Stage 5):
 *   Every selection, response, and checkbox lives in temporary React
 *   component state on the open page only. On unmount, route change,
 *   refresh, or "Clear activity", all of it is discarded. There is:
 *     - no localStorage / sessionStorage / IndexedDB / cookies / URL
 *       params / draft recovery / autosave
 *     - no backend function call and no entity write
 *     - no submit / complete / save / send / share / request-review
 *       control (the only control is "Clear activity", which resets
 *       local state and calls nothing)
 *     - no analytics event carrying selections or responses
 *     - no completion signal — these checks never mark the module
 *       complete, update ModuleProgress, create a QuizAttempt, or
 *       update CourseEnrollment
 *
 * PRINTING:
 *   The root carries `tamu-print-area`, so normal browser printing
 *   renders the worksheet (the rest of the page is hidden by the
 *   global print stylesheet). Printing never creates a record or
 *   transmits responses.
 */
const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const subHeading = { color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '2.25rem 0 0.7rem' };
const partHeading = { color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', fontWeight: 400, lineHeight: 1.25, margin: '2.6rem 0 0.85rem' };
const promptStyle = { color: 'rgba(245,239,224,0.62)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '0.95rem', fontStyle: 'italic', fontWeight: 300 };
const labelStyle = { color: 'rgba(245,239,224,0.85)', fontSize: '0.8rem', letterSpacing: '0.03em', display: 'block', marginBottom: '0.4rem' };
const fieldStyle = {
  width: '100%',
  backgroundColor: 'rgba(245,239,224,0.03)',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  padding: '0.7rem 0.9rem',
  color: '#F5EFE0',
  fontSize: '0.92rem',
  lineHeight: 1.6,
  resize: 'vertical',
  fontFamily: 'inherit',
};
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };
const privacyBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' };
const clearBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  color: 'rgba(212,161,42,0.9)',
  fontSize: '0.72rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.6rem 1.1rem',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function Field({ id, label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label htmlFor={id} className="font-body" style={labelStyle}>{label}</label>
      <textarea
        id={id}
        name={id}
        className="font-body"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={fieldStyle}
        spellCheck
      />
    </div>
  );
}

export default function MhStrengthWithoutSilenceLab({ lab }) {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [fields, setFields] = useState({
    bPressure: '',
    cStrengthMessage: '',
    dProtect: '',
    eRelease: '',
    fOriginal: '',
    fReframed: '',
    gLayer0: '', gLayer1: '', gLayer2: '', gLayer3: '', gLayer4: '',
    gFullPathway: '',
    hBoundary: '',
    hAction: '',
    revisionNotes: '',
  });
  const [checks, setChecks] = useState(
    Array.isArray(lab.completionCheck.items) ? new Array(lab.completionCheck.items.length).fill(false) : [],
  );

  const setField = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));

  const clearActivity = () => {
    setSelectedScenario('');
    const cleared = {};
    Object.keys(fields).forEach((k) => { cleared[k] = ''; });
    setFields(cleared);
    setChecks((prev) => prev.map(() => false));
  };

  const radioOptions = [
    ...lab.selectScenario.scenarios.map((s) => s.title),
    lab.selectScenario.compositeOption,
  ];

  return (
    <div className="tamu-print-area" style={{ marginTop: '0.5rem' }}>
      <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '1.04rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        {lab.subtitle}
      </p>

      <dl className="font-body" style={{ ...boxStyle, marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.9rem 1.5rem' }}>
        <div><dt style={eyebrowStyle}>Course</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.course}</dd></div>
        <div><dt style={eyebrowStyle}>Module</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.module}</dd></div>
        <div><dt style={eyebrowStyle}>Suggested time</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.suggestedTime}</dd></div>
        <div><dt style={eyebrowStyle}>Submission</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.submission}</dd></div>
      </dl>

      <button type="button" onClick={clearActivity} style={clearBtnStyle} aria-label="Clear activity (resets all temporary responses and checkboxes)">
        Clear activity
      </button>

      {/* Privacy + purpose — before every scenario, prompt, and response control */}
      <div style={{ ...privacyBoxStyle, marginTop: '1.75rem' }} role="note" aria-label={lab.privacy.heading}>
        <h3 className="font-heading" style={{ ...subHeading, margin: '0 0 0.6rem' }}>{lab.privacy.heading}</h3>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.privacy.notice}</p>
      </div>

      <h3 className="font-heading" style={subHeading}>{lab.purpose.heading}</h3>
      <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.purpose.text}</p>

      <h3 className="font-heading" style={subHeading}>{lab.fivePartLens.heading}</h3>
      <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
        {lab.fivePartLens.items.map((it, i) => (
          <li key={i} style={{ marginBottom: '0.55rem' }}>{it}</li>
        ))}
      </ol>

      {/* Part A */}
      <h3 className="font-heading" style={partHeading}>{lab.selectScenario.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.selectScenario.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.5rem' }}>
        {lab.selectScenario.scenarios.map((s) => (
          <div key={s.title} style={boxStyle}>
            <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.05rem', fontWeight: 400, margin: '0 0 0.4rem' }}>{s.title}</h4>
            <p className="font-body" style={{ ...bodyText, margin: 0 }}>{s.description}</p>
          </div>
        ))}
      </div>
      <fieldset style={{ border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <legend className="font-body" style={{ ...labelStyle, marginBottom: 0, padding: '0 0.5rem', fontWeight: 500, color: '#D4A12A' }}>
          {lab.selectScenario.selectionLabel}
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.8rem' }}>
          {radioOptions.map((opt) => (
            <label key={opt} className="font-body" style={{ ...bodyText, display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="radio"
                name="lab-scenario"
                value={opt}
                checked={selectedScenario === opt}
                onChange={() => setSelectedScenario(opt)}
                style={{ marginTop: '0.35rem', accentColor: '#D4A12A' }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Part B */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.namePressure.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.namePressure.prompt}</p>
      <Field id="lab-b-pressure" label={lab.parts.namePressure.heading} value={fields.bPressure} onChange={(v) => setField('bPressure', v)} rows={4} />

      {/* Part C */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.nameStrengthMessage.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.nameStrengthMessage.prompt}</p>
      <Field id="lab-c-strength" label={lab.parts.nameStrengthMessage.heading} value={fields.cStrengthMessage} onChange={(v) => setField('cStrengthMessage', v)} rows={3} />

      {/* Part D */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.protectWhatHelps.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.protectWhatHelps.prompt}</p>
      <Field id="lab-d-protect" label={lab.parts.protectWhatHelps.heading} value={fields.dProtect} onChange={(v) => setField('dProtect', v)} rows={4} />

      {/* Part E */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.releaseWhatHarms.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.releaseWhatHarms.prompt}</p>
      <Field id="lab-e-release" label={lab.parts.releaseWhatHarms.heading} value={fields.eRelease} onChange={(v) => setField('eRelease', v)} rows={4} />

      {/* Part F */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.reframeMessage.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.reframeMessage.prompt}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Field id="lab-f-original" label={lab.parts.reframeMessage.originalLabel} value={fields.fOriginal} onChange={(v) => setField('fOriginal', v)} rows={2} />
        <Field id="lab-f-reframed" label={lab.parts.reframeMessage.reframedLabel} value={fields.fReframed} onChange={(v) => setField('fReframed', v)} rows={3} />
      </div>

      {/* Part G */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.widenSupportPathway.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.widenSupportPathway.prompt}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        {lab.parts.widenSupportPathway.layers.map((layer, i) => (
          <div key={layer.name} style={{ ...boxStyle, padding: '1rem 1.25rem' }}>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="font-body" style={{ ...eyebrowStyle }}>{`Layer ${i + 1}`}</span>
            </div>
            <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.02rem', fontWeight: 400, margin: '0 0 0.35rem' }}>{layer.name}</h4>
            <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.85rem', fontStyle: 'italic' }}>
              Possible role: {layer.possibleRole}
            </p>
            <div style={{ marginTop: '0.7rem' }}>
              <Field
                id={`lab-g-layer-${i}`}
                label={`Proposed action for ${layer.name.toLowerCase()}`}
                value={fields[`gLayer${i}`]}
                onChange={(v) => setField(`gLayer${i}`, v)}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
      <Field id="lab-g-pathway" label={lab.parts.widenSupportPathway.fullPathwayLabel} value={fields.gFullPathway} onChange={(v) => setField('gFullPathway', v)} rows={3} />

      {/* Part H */}
      <h3 className="font-heading" style={partHeading}>{lab.parts.consentAndBoundaries.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.parts.consentAndBoundaries.prompt}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Field id="lab-h-boundary" label={lab.parts.consentAndBoundaries.boundaryLabel} value={fields.hBoundary} onChange={(v) => setField('hBoundary', v)} rows={3} />
        <Field id="lab-h-action" label={lab.parts.consentAndBoundaries.actionLabel} value={fields.hAction} onChange={(v) => setField('hAction', v)} rows={3} />
      </div>

      {/* Worked example */}
      <h3 className="font-heading" style={subHeading}>{lab.workedExample.heading}</h3>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>{lab.workedExample.introduction}</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="font-body" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <caption className="font-body" style={{ ...eyebrowStyle, textAlign: 'left', captionSide: 'top', marginBottom: '0.6rem' }}>
            Worked example table
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: 'left', padding: '0.6rem 0.8rem', borderBottom: '1px solid rgba(212,161,42,0.3)', color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Lab field
              </th>
              <th scope="col" style={{ textAlign: 'left', padding: '0.6rem 0.8rem', borderBottom: '1px solid rgba(212,161,42,0.3)', color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Worked response
              </th>
            </tr>
          </thead>
          <tbody>
            {lab.workedExample.rows.map((row) => (
              <tr key={row.field}>
                <th scope="row" style={{ textAlign: 'left', padding: '0.65rem 0.8rem', borderBottom: '1px solid rgba(212,161,42,0.14)', color: 'rgba(245,239,224,0.85)', fontWeight: 400, whiteSpace: 'nowrap', width: '32%' }}>
                  {row.field}
                </th>
                <td style={{ padding: '0.65rem 0.8rem', borderBottom: '1px solid rgba(212,161,42,0.14)', color: 'rgba(245,239,224,0.78)', fontWeight: 300, lineHeight: 1.6 }}>
                  {row.response}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional dialogue extension */}
      <h3 className="font-heading" style={subHeading}>{lab.optionalDialogueExtension.heading}</h3>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{lab.optionalDialogueExtension.introduction}</p>
      <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
        {lab.optionalDialogueExtension.prompts.map((q, i) => (
          <li key={i} style={{ marginBottom: '0.65rem' }}>{q}</li>
        ))}
      </ol>

      {/* Completion check — private self review only, never submits */}
      <h3 className="font-heading" style={subHeading}>{lab.completionCheck.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {lab.completionCheck.items.map((item, i) => (
          <label key={i} className="font-body" style={{ ...bodyText, display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={checks[i] || false}
              onChange={() => setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
              style={{ marginTop: '0.35rem', accentColor: '#D4A12A' }}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Revision notes */}
      <h3 className="font-heading" style={subHeading}>{lab.revisionNotes.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.revisionNotes.prompt}</p>
      <Field
        id="lab-revision-notes"
        label={lab.revisionNotes.heading}
        value={fields.revisionNotes}
        onChange={(v) => setField('revisionNotes', v)}
        rows={4}
      />
    </div>
  );
}