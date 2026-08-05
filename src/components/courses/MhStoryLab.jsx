import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.92rem', lineHeight: 1.75, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const sectionBoxStyle = { padding: '1.3rem 1.5rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', marginBottom: '1.5rem' };
const fieldLabelStyle = { color: '#D4A12A', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.35rem', display: 'block' };
const fieldPromptStyle = { color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', fontStyle: 'italic', marginBottom: '0.5rem' };
const textareaStyle = { width: '100%', minHeight: '70px', padding: '0.7rem 0.9rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '3px', backgroundColor: 'rgba(245,239,224,0.03)', color: '#F5EFE0', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' };
const clearButtonStyle = { color: '#e8955c', backgroundColor: 'transparent', border: '1px solid rgba(232,149,28,0.4)', padding: '0.5rem 1.2rem', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' };
const completeButtonStyle = { color: '#1A130E', backgroundColor: '#D4A12A', border: 'none', padding: '0.6rem 1.5rem', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' };
const checklistItemStyle = { display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.6rem', color: 'rgba(245,239,224,0.7)', fontSize: '0.88rem' };

function Field({ id, label, prompt, value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={`story-${id}`} style={fieldLabelStyle}>{label}</label>
      {prompt && <p className="font-body" style={{ ...fieldPromptStyle, margin: 0 }}>{prompt}</p>}
      <textarea id={`story-${id}`} value={value} onChange={(e) => onChange(id, e.target.value)} style={textareaStyle} className="font-body" />
    </div>
  );
}

function SectionBox({ heading, children }) {
  return (
    <div style={sectionBoxStyle}>
      <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 400, marginBottom: '1rem' }}>{heading}</h3>
      {children}
    </div>
  );
}

export default function MhStoryLab({ courseSlug, moduleRoute, lab, onCompleted }) {
  const [fields, setFields] = useState({});
  const [checklist, setChecklist] = useState({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [ackPending, setAckPending] = useState(false);
  const [ackError, setAckError] = useState(null);
  const [ackDone, setAckDone] = useState(false);

  function updateField(id, val) { setFields((prev) => ({ ...prev, [id]: val })); }
  function toggleChecklist(i) { setChecklist((prev) => ({ ...prev, [i]: !prev[i] })); }

  function handleClearAll() {
    setFields({});
    setChecklist({});
    setShowClearConfirm(false);
  }

  async function handleAcknowledge() {
    if (ackPending || ackDone) return;
    setAckPending(true); setAckError(null);
    try {
      const res = await base44.functions.invoke('updateMentalHealthProgress', {
        courseSlug, moduleRoute, action: 'acknowledge_module7_requirement', requirementKey: 'story-lab',
      });
      const data = res && res.data ? res.data : null;
      if (data && (data.progressSaved === false || Array.isArray(data.completedKeys))) {
        setAckDone(true);
        if (onCompleted) onCompleted();
      } else {
        setAckError('We could not save your progress. Please try again.');
      }
    } catch (err) {
      setAckError('We could not save your progress. Please try again.');
    } finally {
      setAckPending(false);
    }
  }

  const allSections = [
    lab.step1Route,
    lab.sectionS,
    lab.sectionT,
    lab.sectionO,
    lab.sectionR,
    lab.sectionY,
  ];

  return (
    <div className="tamu-print-area">
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '1.2rem', fontSize: '0.85rem' }}>{lab.safetyScope}</p>

      <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>How to use this lab</p>
      <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
        {lab.howToUse.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>)}
      </ol>

      <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.5rem' }}>Route options</p>
      <ul className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '1.5rem', listStyle: 'none' }}>
        {lab.routeOptions.map((r) => (
          <li key={r.key} style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'rgba(212,161,42,0.85)' }}>{r.label}:</strong> {r.purpose}</li>
        ))}
      </ul>

      <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.5rem' }}>{lab.frameworkLabel}</p>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{lab.frameworkSummary}</p>

      {allSections.map((section, sIdx) => (
        <SectionBox key={sIdx} heading={section.heading}>
          {section.fields.map((f) => (
            <Field key={f.id} id={f.id} label={f.label} prompt={f.prompt} value={fields[f.id] || ''} onChange={updateField} />
          ))}
        </SectionBox>
      ))}

      <SectionBox heading={lab.redTeamTests.heading}>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginBottom: '1rem', fontSize: '0.85rem' }}>{lab.redTeamTests.instruction}</p>
        <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '1rem' }}>
          {lab.redTeamTests.tests.map((test, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{test}</li>)}
        </ol>
        {lab.redTeamTests.summaryFields.map((f) => (
          <Field key={f.id} id={f.id} label={f.label} prompt={f.prompt} value={fields[f.id] || ''} onChange={updateField} />
        ))}
      </SectionBox>

      <SectionBox heading={lab.ninetyDayPlan.heading}>
        <Field id="day90Decision" label={lab.ninetyDayPlan.day90DecisionLabel} prompt={lab.ninetyDayPlan.prompt} value={fields.day90Decision || ''} onChange={updateField} />
      </SectionBox>

      <SectionBox heading={lab.proposalCard.heading}>
        {lab.proposalCard.fields.map((f) => (
          <Field key={f.id} id={f.id} label={f.label} prompt={f.prompt} value={fields[f.id] || ''} onChange={updateField} />
        ))}
      </SectionBox>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 400, marginBottom: '1rem' }}>{lab.completionChecklist.heading}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {lab.completionChecklist.items.map((item, i) => (
            <li key={i} style={checklistItemStyle}>
              <input type="checkbox" checked={!!checklist[i]} onChange={() => toggleChecklist(i)} id={`story-check-${i}`} style={{ marginTop: '0.15rem' }} />
              <label htmlFor={`story-check-${i}`} className="font-body" style={{ ...bodyText, margin: 0 }}>{item}</label>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>{lab.finalReminder}</p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {!showClearConfirm ? (
          <button type="button" onClick={() => setShowClearConfirm(true)} style={clearButtonStyle}>Clear all</button>
        ) : (
          <>
            <span className="font-body" style={{ ...bodyText, color: '#e8955c', fontSize: '0.85rem' }}>Clear all entries? This cannot be undone.</span>
            <button type="button" onClick={handleClearAll} style={clearButtonStyle}>Yes, clear</button>
            <button type="button" onClick={() => setShowClearConfirm(false)} style={{ ...clearButtonStyle, color: 'rgba(245,239,224,0.7)', borderColor: 'rgba(245,239,224,0.25)' }}>Cancel</button>
          </>
        )}
        {!ackDone && (
          <button type="button" disabled={ackPending} onClick={handleAcknowledge} style={{ ...completeButtonStyle, cursor: ackPending ? 'wait' : 'pointer', opacity: ackPending ? 0.7 : 1 }}>
            {ackPending ? 'Saving...' : 'Acknowledge completion'}
          </button>
        )}
        {ackDone && <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.82rem', fontStyle: 'italic' }}>Completion acknowledged.</span>}
        {ackError && <p className="font-body" role="alert" style={{ color: '#e8955c', fontSize: '0.85rem', margin: 0 }}>{ackError}</p>}
      </div>
    </div>
  );
}