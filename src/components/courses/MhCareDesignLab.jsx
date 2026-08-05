import React, { useState } from 'react';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const subHeading = { color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '2.25rem 0 0.7rem' };
const partHeading = { color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', fontWeight: 400, lineHeight: 1.25, margin: '2.6rem 0 0.85rem' };
const promptStyle = { color: 'rgba(245,239,224,0.62)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '0.95rem', fontStyle: 'italic', fontWeight: 300 };
const labelStyle = { color: 'rgba(245,239,224,0.85)', fontSize: '0.8rem', letterSpacing: '0.03em', display: 'block', marginBottom: '0.4rem' };
const fieldStyle = {
  width: '100%', backgroundColor: 'rgba(245,239,224,0.03)', border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px', padding: '0.7rem 0.9rem', color: '#F5EFE0', fontSize: '0.92rem', lineHeight: 1.6,
  resize: 'vertical', fontFamily: 'inherit',
};
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };
const privacyBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' };
const clearBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
  color: 'rgba(212,161,42,0.9)', fontSize: '0.72rem', letterSpacing: '0.14em',
  textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px', padding: '0.6rem 1.1rem', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
};

function Field({ id, label, prompt, value, onChange, rows = 3 }) {
  return (
    <div>
      <label htmlFor={id} className="font-body" style={labelStyle}>{label}</label>
      {prompt && <p className="font-body" style={{ ...promptStyle, marginBottom: '0.4rem' }}>{prompt}</p>}
      <textarea
        id={id} name={id} className="font-body" rows={rows}
        value={value} onChange={(e) => onChange(e.target.value)}
        style={fieldStyle} spellCheck
      />
    </div>
  );
}

export default function MhCareDesignLab({ lab }) {
  const [fields, setFields] = useState({});
  const [checks, setChecks] = useState(
    Array.isArray(lab.completionCheck.items) ? new Array(lab.completionCheck.items.length).fill(false) : [],
  );

  const setField = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));

  const clearActivity = () => {
    setFields({});
    setChecks((prev) => prev.map(() => false));
  };

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

      <div style={{ ...privacyBoxStyle, marginTop: '1.75rem' }} role="note" aria-label={lab.privacy.heading}>
        <h3 className="font-heading" style={{ ...subHeading, margin: '0 0 0.6rem' }}>{lab.privacy.heading}</h3>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.privacy.notice}</p>
      </div>

      <h3 className="font-heading" style={subHeading}>How to Use This Lab</h3>
      <ol className="font-body" style={{ ...bodyText, margin: '0 0 1rem 1.4rem' }}>
        {lab.howToUse.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
      </ol>

      <h3 className="font-heading" style={subHeading}>{lab.careExplanation.heading}</h3>
      {lab.careExplanation.sections.map((sec) => (
        <div key={sec.letter} style={{ ...boxStyle, marginBottom: '1.1rem' }}>
          <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.08rem', fontWeight: 400, margin: '0 0 0.5rem' }}>
            {sec.letter} — {sec.name}
          </h4>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {sec.items.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>)}
          </ol>
        </div>
      ))}

      {/* Step 1: Select a Fictional Setting */}
      <h3 className="font-heading" style={partHeading}>{lab.step1Setting.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.step1Setting.fields.map((f) => (
          <Field key={f.id} id={`care-s1-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`s1_${f.id}`] || ''} onChange={(v) => setField(`s1_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Step 2: Learn Without Copying */}
      <h3 className="font-heading" style={partHeading}>{lab.step2Principles.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.5rem' }}>
        {lab.step2Principles.cards.map((card) => (
          <div key={card.name} style={boxStyle}>
            <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.05rem', fontWeight: 400, margin: '0 0 0.4rem' }}>{card.name}</h4>
            <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', color: 'rgba(245,239,224,0.6)', marginBottom: '0.7rem' }}>
              <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Evidence note:</strong> {card.evidenceNote}
            </p>
            <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.4rem' }}>{card.transferPrompt}</p>
            <Field id={`care-s2-${card.name.replace(/\s+/g, '-')}`} label="POSSIBLE TRANSFER"
              value={fields[`s2_${card.name}`] || ''} onChange={(v) => setField(`s2_${card.name}`, v)} rows={2} />
          </div>
        ))}
      </div>

      {/* Section C */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionC.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.sectionC.fields.map((f) => (
          <Field key={f.id} id={`care-c-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`c_${f.id}`] || ''} onChange={(v) => setField(`c_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Section A */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionA.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.sectionA.fields.map((f) => (
          <Field key={f.id} id={`care-a-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`a_${f.id}`] || ''} onChange={(v) => setField(`a_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Section R */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionR.heading}</h3>
      <Field id="care-r-roles" label={lab.sectionR.rolesLabel} prompt={lab.sectionR.rolesPrompt}
        value={fields.r_roles || ''} onChange={(v) => setField('r_roles', v)} rows={4} />

      <h4 className="font-heading" style={{ ...subHeading, marginTop: '1.75rem' }}>{lab.sectionR.pathwayHeading}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' }}>
        {lab.sectionR.pathwaySteps.map((step, i) => (
          <div key={i} style={boxStyle}>
            <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.4rem' }}>
              <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{step.label}:</strong> {step.prompt}
            </p>
            <Field id={`care-r-pathway-${i}`} label={lab.sectionR.localPathwayLabel}
              value={fields[`r_pathway_${i}`] || ''} onChange={(v) => setField(`r_pathway_${i}`, v)} rows={2} />
          </div>
        ))}
      </div>
      <Field id="care-r-privacy" label={lab.sectionR.privacyLabel} prompt={lab.sectionR.privacyPrompt}
        value={fields.r_privacy || ''} onChange={(v) => setField('r_privacy', v)} rows={3} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="care-r-workercare" label={lab.sectionR.workerCareLabel} prompt={lab.sectionR.workerCarePrompt}
          value={fields.r_workercare || ''} onChange={(v) => setField('r_workercare', v)} rows={3} />
      </div>

      {/* Section E */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionE.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.sectionE.fields.map((f) => (
          <Field key={f.id} id={`care-e-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`e_${f.id}`] || ''} onChange={(v) => setField(`e_${f.id}`, v)} rows={3} />
        ))}
      </div>
      <h4 className="font-heading" style={subHeading}>{lab.sectionE.pilotMeasuresHeading}</h4>
      <Field id="care-e-pilotmeasures" label={lab.sectionE.pilotMeasuresPrompt}
        value={fields.e_pilotmeasures || ''} onChange={(v) => setField('e_pilotmeasures', v)} rows={3} />

      {/* Red Team */}
      <h3 className="font-heading" style={partHeading}>{lab.redTeam.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.redTeam.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.redTeam.fields.map((f) => (
          <Field key={f.id} id={`care-rt-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`rt_${f.id}`] || ''} onChange={(v) => setField(`rt_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Ninety Day Plan */}
      <h3 className="font-heading" style={partHeading}>{lab.ninetyDayPlan.heading}</h3>
      <Field id="care-90day" label={lab.ninetyDayPlan.day90Label} prompt={lab.ninetyDayPlan.day90Prompt}
        value={fields.day90 || ''} onChange={(v) => setField('day90', v)} rows={4} />

      {/* Plain Language Summary */}
      <h3 className="font-heading" style={partHeading}>{lab.plainLanguageSummary.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.plainLanguageSummary.fields.map((f) => (
          <Field key={f.id} id={`care-pls-${f.id}`} label={f.label} prompt={f.prompt}
            value={fields[`pls_${f.id}`] || ''} onChange={(v) => setField(`pls_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Completion Checklist */}
      <h3 className="font-heading" style={subHeading}>{lab.completionCheck.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {lab.completionCheck.items.map((item, i) => (
          <label key={i} className="font-body" style={{ ...bodyText, display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={checks[i] || false}
              onChange={() => setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
              style={{ marginTop: '0.35rem', accentColor: '#D4A12A' }} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Final Reminder */}
      <div style={privacyBoxStyle} role="note" aria-label="Final reminder">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Final reminder</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lab.finalReminder}</p>
      </div>
    </div>
  );
}