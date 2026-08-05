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
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', fontSize: '0.88rem' };
const thStyle = { border: '1px solid rgba(212,161,42,0.22)', padding: '0.6rem 0.7rem', textAlign: 'left', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 };
const tdStyle = { border: '1px solid rgba(212,161,42,0.18)', padding: '0.6rem 0.7rem', color: 'rgba(245,239,224,0.78)', verticalAlign: 'top' };
const tdInputStyle = { width: '100%', backgroundColor: 'rgba(245,239,224,0.03)', border: 'none', color: '#F5EFE0', fontSize: '0.88rem', lineHeight: 1.5, fontFamily: 'inherit', outline: 'none' };

function Field({ id, label, prompt, value, onChange, rows = 3 }) {
  return (
    <div>
      <label htmlFor={id} className="font-body" style={labelStyle}>{label}</label>
      {prompt && <p className="font-body" style={{ ...promptStyle, marginBottom: '0.4rem' }}>{prompt}</p>}
      <textarea id={id} name={id} className="font-body" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} spellCheck />
    </div>
  );
}

export default function MhPathwaysLab({ lab }) {
  const [fields, setFields] = useState({});
  const [checks, setChecks] = useState(Array.isArray(lab.completionChecklist.items) ? new Array(lab.completionChecklist.items.length).fill(false) : []);
  const [confirmClear, setConfirmClear] = useState(false);

  const setField = (key, val) => { setFields((prev) => ({ ...prev, [key]: val })); setConfirmClear(false); };

  const hasWork = Object.keys(fields).length > 0 || checks.some((c) => c);

  const clearActivity = () => {
    if (hasWork && !confirmClear) { setConfirmClear(true); return; }
    setFields({}); setChecks((prev) => prev.map(() => false)); setConfirmClear(false);
  };

  const renderTable = (tableConfig, fieldPrefix) => {
    if (!tableConfig || !tableConfig.rows) return null;
    const isTopicQuestion = tableConfig.rows.length > 0 && typeof tableConfig.rows[0] === 'object' && tableConfig.rows[0].topic;
    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>{tableConfig.columns.map((col, i) => <th key={i} scope="col" style={thStyle}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {tableConfig.rows.map((row, ri) => {
              const rowLabel = isTopicQuestion ? row.topic : row;
              const questionText = isTopicQuestion ? row.question : null;
              return (
                <tr key={ri}>
                  <td style={tdStyle}>{rowLabel}</td>
                  {tableConfig.columns.slice(1).map((_, ci) => (
                    <td key={ci} style={tdStyle}>
                      {isTopicQuestion && ci === 0 ? (
                        <span style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem' }}>{questionText}</span>
                      ) : (
                        <input type="text" aria-label={`${rowLabel} ${tableConfig.columns[ci + 1] || ''}`} className="font-body"
                          value={fields[`${fieldPrefix}_${ri}_${ci}`] || ''} onChange={(e) => setField(`${fieldPrefix}_${ri}_${ci}`, e.target.value)} style={tdInputStyle} />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

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
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>PATHWAYS Framework</span>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{lab.frameworkSummary}</p>
      </div>

      {/* Step 1: Select a Fictional Setting */}
      <h3 className="font-heading" style={partHeading}>{lab.step1Setting.heading}</h3>
      {lab.step1Setting.examples && (
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>Example setting</th><th style={thStyle}>Possible coordination problem</th></tr></thead>
            <tbody>
              {lab.step1Setting.examples.map((ex, i) => (
                <tr key={i}><td style={tdStyle}>{ex.setting}</td><td style={tdStyle}>{ex.problem}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.step1Setting.fields.map((f) => (
          <Field key={f.id} id={`pw-s1-${f.id}`} label={f.label} prompt={f.prompt} value={fields[`s1_${f.id}`] || ''} onChange={(v) => setField(`s1_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* Step 2: Map the Existing Support Ecosystem */}
      <h3 className="font-heading" style={partHeading}>{lab.step2Ecosystem.heading}</h3>
      {renderTable({ columns: lab.step2Ecosystem.columns, rows: lab.step2Ecosystem.rows }, 'eco')}
      <Field id="pw-eco-pathway" label={lab.step2Ecosystem.pathwayPatternLabel} prompt={lab.step2Ecosystem.pathwayPatternPrompt} value={fields.eco_pathway || ''} onChange={(v) => setField('eco_pathway', v)} rows={2} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-eco-trust" label={lab.step2Ecosystem.trustPowerLabel} prompt={lab.step2Ecosystem.trustPowerPrompt} value={fields.eco_trust || ''} onChange={(v) => setField('eco_trust', v)} rows={2} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-eco-barriers" label={lab.step2Ecosystem.materialBarriersLabel} prompt={lab.step2Ecosystem.materialBarriersPrompt} value={fields.eco_barriers || ''} onChange={(v) => setField('eco_barriers', v)} rows={2} />
      </div>

      {/* P: Person, Preference, and Purpose */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionP.heading}</h3>
      <div style={{ ...privacyBoxStyle, marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Start with the person</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lab.sectionP.startWithPerson}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.sectionP.fields.map((f) => (
          <Field key={f.id} id={`pw-p-${f.id}`} label={f.label} prompt={f.prompt} value={fields[`p_${f.id}`] || ''} onChange={(v) => setField(`p_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* A: Authority, Access, and Accountability */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionA.heading}</h3>
      {renderTable({ columns: lab.sectionA.columns, rows: lab.sectionA.rows }, 'auth')}
      <Field id="pw-auth-access" label={lab.sectionA.accessCommitmentsLabel} prompt={lab.sectionA.accessCommitmentsPrompt} value={fields.auth_access || ''} onChange={(v) => setField('auth_access', v)} rows={3} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-auth-review" label={lab.sectionA.independentReviewLabel} prompt={lab.sectionA.independentReviewPrompt} value={fields.auth_review || ''} onChange={(v) => setField('auth_review', v)} rows={3} />
      </div>

      {/* T: Tasks, Training, and Boundaries */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionT.heading}</h3>
      {renderTable({ columns: lab.sectionT.columns, rows: lab.sectionT.rows }, 'tasks')}
      <Field id="pw-tasks-switching" label={lab.sectionT.roleSwitchingLabel} prompt={lab.sectionT.roleSwitchingPrompt} value={fields.tasks_switching || ''} onChange={(v) => setField('tasks_switching', v)} rows={2} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-tasks-exchange" label={lab.sectionT.trainingExchangeLabel} prompt={lab.sectionT.trainingExchangePrompt} value={fields.tasks_exchange || ''} onChange={(v) => setField('tasks_exchange', v)} rows={2} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-tasks-competency" label={lab.sectionT.competencySupportLabel} prompt={lab.sectionT.competencySupportPrompt} value={fields.tasks_competency || ''} onChange={(v) => setField('tasks_competency', v)} rows={2} />
      </div>

      {/* H: Human Rights and Harm Prevention */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionH.heading}</h3>
      {renderTable({ columns: lab.sectionH.columns, rows: lab.sectionH.rows }, 'rights')}
      <Field id="pw-rights-prohibited" label={lab.sectionH.prohibitedPracticesLabel} prompt={lab.sectionH.prohibitedPracticesPrompt} value={fields.rights_prohibited || ''} onChange={(v) => setField('rights_prohibited', v)} rows={3} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-rights-stop" label={lab.sectionH.stopRuleLabel} prompt={lab.sectionH.stopRulePrompt} value={fields.rights_stop || ''} onChange={(v) => setField('rights_stop', v)} rows={2} />
      </div>

      {/* W: Warm Referral and Follow Up */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionW.heading}</h3>
      <div style={{ ...privacyBoxStyle, marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Warm referral</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lab.sectionW.warmReferralNote}</p>
      </div>
      {renderTable({ columns: lab.sectionW.columns, rows: lab.sectionW.rows }, 'referral')}
      <Field id="pw-referral-followup" label={lab.sectionW.followUpLabel} prompt={lab.sectionW.followUpPrompt} value={fields.referral_followup || ''} onChange={(v) => setField('referral_followup', v)} rows={2} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-referral-failure" label={lab.sectionW.referralFailureLabel} prompt={lab.sectionW.referralFailurePrompt} value={fields.referral_failure || ''} onChange={(v) => setField('referral_failure', v)} rows={2} />
      </div>

      {/* Warm Referral Practice */}
      <h3 className="font-heading" style={partHeading}>{lab.warmReferralPractice.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.warmReferralPractice.instruction}</p>
      <div style={{ ...privacyBoxStyle, marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Fictional situation</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lab.warmReferralPractice.fictionalSituation}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.warmReferralPractice.fields.map((f) => (
          <Field key={f.id} id={`pw-wrp-${f.id}`} label={f.label} prompt={f.prompt} value={fields[`wrp_${f.id}`] || ''} onChange={(v) => setField(`wrp_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* A: Awareness, Exchange, and Cultural Humility */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionA2.heading}</h3>
      {renderTable({ columns: lab.sectionA2.columns, rows: lab.sectionA2.rows }, 'awareness')}
      <Field id="pw-awareness-plan" label={lab.sectionA2.mutualLearningPlanLabel} prompt={lab.sectionA2.mutualLearningPlanPrompt} value={fields.awareness_plan || ''} onChange={(v) => setField('awareness_plan', v)} rows={3} />

      {/* Y: Youth and Lived Experience Voice */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionY.heading}</h3>
      <div style={{ ...privacyBoxStyle, marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Participation with authority</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lab.sectionY.participationWithAuthority}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.sectionY.fields.map((f) => (
          <Field key={f.id} id={`pw-y-${f.id}`} label={f.label} prompt={f.prompt} value={fields[`y_${f.id}`] || ''} onChange={(v) => setField(`y_${f.id}`, v)} rows={3} />
        ))}
      </div>

      {/* S: Safety, Sustainability, and Study */}
      <h3 className="font-heading" style={partHeading}>{lab.sectionS.heading}</h3>
      {renderTable({ columns: lab.sectionS.columns, rows: lab.sectionS.rows }, 'safety')}
      <Field id="pw-safety-financing" label={lab.sectionS.financingLabel} prompt={lab.sectionS.financingPrompt} value={fields.safety_financing || ''} onChange={(v) => setField('safety_financing', v)} rows={3} />
      <div style={{ marginTop: '1rem' }}>
        <Field id="pw-safety-evidence" label={lab.sectionS.evidenceStatementLabel} prompt={lab.sectionS.evidenceStatementPrompt} value={fields.safety_evidence || ''} onChange={(v) => setField('safety_evidence', v)} rows={3} />
      </div>
      {lab.sectionS.sustainabilityDecisionLabel && (
        <div style={{ marginTop: '1rem' }}>
          <Field id="pw-sustainability" label={lab.sectionS.sustainabilityDecisionLabel} prompt={lab.sectionS.sustainabilityDecisionPrompt} value={fields.sustainability || ''} onChange={(v) => setField('sustainability', v)} rows={3} />
        </div>
      )}

      {/* Red Team Tests */}
      <h3 className="font-heading" style={partHeading}>{lab.redTeamTests.heading}</h3>
      <p className="font-body" style={promptStyle}>{lab.redTeamTests.instruction}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {lab.redTeamTests.tests.map((test, i) => (
          <Field key={i} id={`pw-rt-${i}`} label={`Red team test ${i + 1}`} prompt={test} value={fields[`rt_${i}`] || ''} onChange={(v) => setField(`rt_${i}`, v)} rows={2} />
        ))}
      </div>

      {/* Red Team Summary Fields */}
      {lab.redTeamTests.summaryFields && lab.redTeamTests.summaryFields.length > 0 && (
        <>
          <h3 className="font-heading" style={partHeading}>{lab.redTeamTests.summaryHeading}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {lab.redTeamTests.summaryFields.map((f) => (
              <Field key={f.id} id={`pw-${f.id}`} label={f.label} prompt={f.prompt} value={fields[f.id] || ''} onChange={(v) => setField(f.id, v)} rows={3} />
            ))}
          </div>
        </>
      )}

      {/* Ninety Day Preparation Plan */}
      <h3 className="font-heading" style={partHeading}>{lab.ninetyDayPlan.heading}</h3>
      <Field id="pw-90day" label={lab.ninetyDayPlan.day90DecisionLabel || 'Ninety day preparation plan'} prompt={lab.ninetyDayPlan.prompt} value={fields.day90 || ''} onChange={(v) => setField('day90', v)} rows={4} />

      {/* One Page Partnership Charter */}
      <h3 className="font-heading" style={partHeading}>{lab.partnershipCharter.heading}</h3>
      {lab.partnershipCharter.fields && lab.partnershipCharter.fields.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {lab.partnershipCharter.fields.map((f) => (
            <Field key={f.id} id={`pw-${f.id}`} label={f.label} prompt={f.prompt} value={fields[f.id] || ''} onChange={(v) => setField(f.id, v)} rows={3} />
          ))}
        </div>
      ) : (
        <Field id="pw-charter" label="One page partnership charter" prompt={lab.partnershipCharter.prompt} value={fields.charter || ''} onChange={(v) => setField('charter', v)} rows={5} />
      )}

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