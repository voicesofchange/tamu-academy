import React, { useState } from 'react';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const subHeading = { color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '2.25rem 0 0.7rem' };
const partHeading = { color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', fontWeight: 400, lineHeight: 1.25, margin: '2.6rem 0 0.85rem' };
const promptStyle = { color: 'rgba(245,239,224,0.62)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '0.95rem', fontStyle: 'italic', fontWeight: 300 };
const labelStyle = { color: 'rgba(245,239,224,0.85)', fontSize: '0.8rem', letterSpacing: '0.03em', display: 'block', marginBottom: '0.4rem' };
const fieldStyle = { width: '100%', backgroundColor: 'rgba(245,239,224,0.03)', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', padding: '0.7rem 0.9rem', color: '#F5EFE0', fontSize: '0.92rem', lineHeight: 1.6, resize: 'vertical', fontFamily: 'inherit' };
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };
const privacyBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' };
const clearBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'rgba(212,161,42,0.9)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.6rem 1.1rem', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' };

function Field({ id, label, prompt, value, onChange, rows = 3 }) {
  return (
    <div>
      <label htmlFor={id} className="font-body" style={labelStyle}>{label}</label>
      {prompt && <p className="font-body" style={{ ...promptStyle, marginBottom: '0.4rem' }}>{prompt}</p>}
      <textarea id={id} name={id} className="font-body" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} spellCheck />
    </div>
  );
}

export default function MhAmplifyLab({ lab }) {
  const [fields, setFields] = useState({});
  const [checks, setChecks] = useState(Array.isArray(lab.completionChecklist.items) ? new Array(lab.completionChecklist.items.length).fill(false) : []);
  const [confirmClear, setConfirmClear] = useState(false);

  const setField = (key, val) => { setFields((prev) => ({ ...prev, [key]: val })); setConfirmClear(false); };

  const hasWork = Object.keys(fields).length > 0 || checks.some((c) => c);

  const clearActivity = () => {
    if (hasWork && !confirmClear) { setConfirmClear(true); return; }
    setFields({}); setChecks((prev) => prev.map(() => false)); setConfirmClear(false);
  };

  const renderFields = (sectionFields, prefix) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {sectionFields.map((f) => (
        <Field key={f.id} id={`amplify-${prefix}-${f.id}`} label={f.label} prompt={f.prompt} value={fields[`${prefix}_${f.id}`] || ''} onChange={(v) => setField(`${prefix}_${f.id}`, v)} rows={3} />
      ))}
    </div>
  );

  return (
    <div className="tamu-print-area" style={{ marginTop: '0.5rem' }}>
      <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '1.04rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>{lab.subtitle}</p>

      <dl className="font-body" style={{ ...boxStyle, marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.9rem 1.5rem' }}>
        <div><dt style={eyebrowStyle}>Course</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.course}</dd></div>
        <div><dt style={eyebrowStyle}>Module</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.module}</dd></div>
        <div><dt style={eyebrowStyle}>Estimated time</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.estimatedTime}</dd></div>
        <div><dt style={eyebrowStyle}>Completion mode</dt><dd style={{ ...bodyText, margin: 0 }}>{lab.completionMode}</dd></div>
      </dl>

      <div style={{ ...privacyBoxStyle, marginBottom: '1.75rem' }} role="note" aria-label="Safety and scope">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Safety and scope</span>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.safetyScope}</p>
      </div>

      <button type="button" onClick={clearActivity} style={clearBtnStyle} aria-label="Clear all temporary responses">
        {confirmClear ? 'Confirm clear all' : 'Clear all temporary responses'}
      </button>

      <h3 className="font-heading" style={subHeading}>How to Use This Lab</h3>
      <ol className="font-body" style={{ ...bodyText, margin: '0 0 1rem 1.4rem' }}>
        {lab.howToUse.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
      </ol>

      <div style={{ ...boxStyle, marginBottom: '1.75rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>AMPLIFY Framework</span>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.frameworkSummary}</p>
      </div>

      {/* Step 1: Choose a Fictional or Public Issue */}
      <h3 className="font-heading" style={partHeading}>{lab.step1Issue.heading}</h3>
      {renderFields(lab.step1Issue.fields, 's1')}

      {/* Step 2: Choose an Output Route */}
      <h3 className="font-heading" style={partHeading}>{lab.step2Route.heading}</h3>
      {lab.step2Route.routeOptions && (
        <div style={{ ...boxStyle, marginBottom: '1.5rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Route options</span>
          <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {lab.step2Route.routeOptions.map((opt, i) => <li key={i} style={{ marginBottom: '0.4rem' }}><strong style={{ color: 'rgba(212,161,42,0.85)' }}>{opt.key === 'policy' ? 'A' : 'B'}.</strong> {opt.label}</li>)}
          </ul>
        </div>
      )}
      {renderFields(lab.step2Route.fields, 's2')}

      {/* A: Aim, Assets, and Audience */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionA.heading}</h3>
      {renderFields(lab.sectionA.fields, 'a')}

      {/* M: Map the System and Power */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionM.heading}</h3>
      {renderFields(lab.sectionM.fields, 'm')}

      {/* P: Policy, Prevention, and Professional Pathway */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionP.heading}</h3>
      {renderFields(lab.sectionP.fields, 'p')}

      {/* L: Language, Lived Experience, and Local Culture */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionL.heading}</h3>
      {renderFields(lab.sectionL.fields, 'l')}

      {/* I: Information, Media, and Digital Access */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionI.heading}</h3>
      {renderFields(lab.sectionI.fields, 'i')}

      {/* Media Route: 90 Second Script and Storyboard */}
      <h3 className="font-heading" style={partHeading}>{lab.mediaScriptStructure.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.mediaScriptStructure.instruction}</p>
      {renderFields(lab.mediaScriptStructure.fields, 'ms')}
      <h4 className="font-heading" style={{ ...subHeading, marginTop: '1.5rem' }}>{lab.mediaScriptStructure.storyboardHeading}</h4>
      {renderFields(lab.mediaScriptStructure.storyboardFields, 'sb')}

      {/* F: Financing, Workforce, and Feasibility */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionF.heading}</h3>
      {renderFields(lab.sectionF.fields, 'f')}

      {/* Y: Youth Authority, Safeguarding, and Evaluation */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionY.heading}</h3>
      {renderFields(lab.sectionY.fields, 'y')}

      {/* Evaluation Plan */}
      <h3 className="font-heading" style={partHeading}>{lab.evaluationPlan.heading}</h3>
      {renderFields(lab.evaluationPlan.fields, 'ev')}

      {/* Red Team Tests */}
      <h3 className="font-heading" style={partHeading}>{lab.redTeamTests.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.redTeamTests.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.redTeamTests.tests.map((test, i) => (
          <Field key={i} id={`amplify-rt-${i}`} label={`Red team test ${i + 1}`} prompt={test} value={fields[`rt_${i}`] || ''} onChange={(v) => setField(`rt_${i}`, v)} rows={2} />
        ))}
      </div>
      <h4 className="font-heading" style={{ ...subHeading, marginTop: '1.5rem' }}>{lab.redTeamTests.summaryHeading}</h4>
      {renderFields(lab.redTeamTests.summaryFields, 'rts')}

      {/* Ninety Day Preparation Plan */}
      <h3 className="font-heading" style={partHeading}>{lab.ninetyDayPlan.heading}</h3>
      <Field id="amplify-90day" label={lab.ninetyDayPlan.day90DecisionLabel} prompt={lab.ninetyDayPlan.prompt} value={fields.day90 || ''} onChange={(v) => setField('day90', v)} rows={4} />

      {/* One Page Proposal Card */}
      <h3 className="font-heading" style={partHeading}>{lab.proposalCard.heading}</h3>
      {renderFields(lab.proposalCard.fields, 'pc')}

      {/* Completion Checklist */}
      <h3 className="font-heading" style={subHeading}>{lab.completionChecklist.heading}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {lab.completionChecklist.items.map((item, i) => (
          <label key={i} className="font-body" style={{ ...bodyText, display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={checks[i] || false} onChange={() => { setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v))); setConfirmClear(false); }} style={{ marginTop: '0.35rem', accentColor: '#D4A12A' }} />
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