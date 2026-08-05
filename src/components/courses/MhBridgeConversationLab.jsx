import React, { useState } from 'react';

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

export default function MhBridgeConversationLab({ lab }) {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [fields, setFields] = useState({
    step1RepeatedMessage: '',
    step1ProtectedValue: '',
    step1PossibleCost: '',
    step1PowerDependency: '',
    step1FamilyWords: '',
    step1SupportOptions: '',
    step2B: '', step2R: '', step2I: '', step2D: '', step2G: '', step2E: '',
    step3Practice: '',
    step4Repair: '',
    step5NextStep: '',
    step5FollowUp: '',
    step6Original: '',
    step6Feedback: '',
    step6Revised: '',
    step6Why: '',
    reflectionSentence: '',
    reflectionValue: '',
    reflectionNeed: '',
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

      <div style={{ ...privacyBoxStyle, marginTop: '1.75rem' }} role="note" aria-label={lab.privacy.heading}>
        <h3 className="font-heading" style={{ ...subHeading, margin: '0 0 0.6rem' }}>{lab.privacy.heading}</h3>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.privacy.notice}</p>
      </div>

      <h3 className="font-heading" style={subHeading}>{lab.purpose.heading}</h3>
      <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.purpose.text}</p>

      {/* Step 1: Map the Family Script */}
      <h3 className="font-heading" style={partHeading}>{lab.step1MapScript.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.step1MapScript.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.step1MapScript.fields.map((f) => (
          <Field
            key={f.id}
            id={`lab-s1-${f.id}`}
            label={f.label}
            value={fields[`step1${f.id.charAt(0).toUpperCase()}${f.id.slice(1)}`] || ''}
            onChange={(v) => setField(`step1${f.id.charAt(0).toUpperCase()}${f.id.slice(1)}`, v)}
            rows={2}
          />
        ))}
      </div>

      {/* Choose scenario */}
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
                name="lab-scenario-m3"
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

      {/* Step 2: Draft the BRIDGE Opening */}
      <h3 className="font-heading" style={partHeading}>{lab.step2BridgeOpening.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {lab.step2BridgeOpening.steps.map((step) => (
          <div key={step.letter} style={boxStyle}>
            <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.08rem', fontWeight: 400, margin: '0 0 0.35rem' }}>
              {step.letter} — {step.name}
            </h4>
            <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.7rem', fontSize: '0.88rem', fontStyle: 'italic' }}>
              {step.prompt}
            </p>
            <Field
              id={`lab-s2-${step.letter}`}
              label={`${step.letter}: ${step.name}`}
              value={fields[`step2${step.letter}`] || ''}
              onChange={(v) => setField(`step2${step.letter}`, v)}
              rows={2}
            />
          </div>
        ))}
      </div>

      {/* Step 3: Practice the Conversation */}
      <h3 className="font-heading" style={partHeading}>{lab.step3Practice.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.step3Practice.instruction}</p>
      <ul className="font-body" style={{ ...bodyText, margin: '0 0 1rem 1.4rem', paddingLeft: 0, listStyle: 'disc' }}>
        {lab.step3Practice.guidelines.map((g, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{g}</li>
        ))}
      </ul>
      <Field
        id="lab-s3-practice"
        label={lab.step3Practice.practiceFieldLabel}
        value={fields.step3Practice}
        onChange={(v) => setField('step3Practice', v)}
        rows={4}
      />

      {/* Observer Checklist */}
      <h3 className="font-heading" style={subHeading}>{lab.observerChecklist.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {lab.observerChecklist.items.map((item, i) => (
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

      {/* Step 4: Repair a Difficult Response */}
      <h3 className="font-heading" style={partHeading}>{lab.step4Repair.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.step4Repair.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.25rem' }}>
        {lab.step4Repair.responses.map((r, i) => (
          <div key={i} style={boxStyle}>
            <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.5rem', fontStyle: 'italic' }}>
              {r.text}
            </p>
            <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.85rem', color: 'rgba(245,239,224,0.6)' }}>
              <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Possible value:</strong> {r.possibleValue}.{' '}
              <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Needed repair:</strong> {r.neededRepair}
            </p>
          </div>
        ))}
      </div>
      <Field
        id="lab-s4-repair"
        label={lab.step4Repair.repairFieldLabel}
        value={fields.step4Repair}
        onChange={(v) => setField('step4Repair', v)}
        rows={4}
      />

      {/* Step 5: Build the Support Pathway */}
      <h3 className="font-heading" style={partHeading}>{lab.step5SupportPathway.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Field
          id="lab-s5-next-step"
          label={lab.step5SupportPathway.nextStepLabel}
          value={fields.step5NextStep}
          onChange={(v) => setField('step5NextStep', v)}
          rows={3}
        />
        <Field
          id="lab-s5-follow-up"
          label={lab.step5SupportPathway.followUpLabel}
          value={fields.step5FollowUp}
          onChange={(v) => setField('step5FollowUp', v)}
          rows={3}
        />
      </div>

      {/* Step 6: Revise One Sentence */}
      <h3 className="font-heading" style={partHeading}>{lab.step6ReviseSentence.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Field id="lab-s6-original" label={lab.step6ReviseSentence.originalLabel} value={fields.step6Original} onChange={(v) => setField('step6Original', v)} rows={2} />
        <Field id="lab-s6-feedback" label={lab.step6ReviseSentence.feedbackLabel} value={fields.step6Feedback} onChange={(v) => setField('step6Feedback', v)} rows={2} />
        <Field id="lab-s6-revised" label={lab.step6ReviseSentence.revisedLabel} value={fields.step6Revised} onChange={(v) => setField('step6Revised', v)} rows={3} />
        <Field id="lab-s6-why" label={lab.step6ReviseSentence.whyLabel} value={fields.step6Why} onChange={(v) => setField('step6Why', v)} rows={3} />
      </div>

      {/* Private Reflection */}
      <h3 className="font-heading" style={subHeading}>{lab.privateReflection.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Field id="lab-refl-sentence" label={lab.privateReflection.sentenceLabel} value={fields.reflectionSentence} onChange={(v) => setField('reflectionSentence', v)} rows={3} />
        <Field id="lab-refl-value" label={lab.privateReflection.valueLabel} value={fields.reflectionValue} onChange={(v) => setField('reflectionValue', v)} rows={2} />
        <Field id="lab-refl-need" label={lab.privateReflection.needLabel} value={fields.reflectionNeed} onChange={(v) => setField('reflectionNeed', v)} rows={2} />
      </div>

      {/* Completion Check */}
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
    </div>
  );
}