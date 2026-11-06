import React from 'react';
import { useGuideStrings } from '@/lib/guide/GuideStringsContext';
import { creamText } from '@/lib/guide/styles';

/** A 1-5 rating for each statement. */
export default function RatingField({ field, value, onChange }) {
  const current = value && typeof value === 'object' ? value : {};
  const { ratingScale, ui } = useGuideStrings();
  return (
    <div>
      <span className="font-guide-body" style={creamText.label}>
        {field.label}
      </span>
      <p className="font-guide-body" style={{ ...creamText.hint, marginBottom: '1rem' }}>
        {ui.rateHint}
      </p>
      <div role="radiogroup" aria-label={field.label}>
        {field.statements.map((statement, index) => (
          <div
            key={statement.id}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 0',
              borderBottom: index === field.statements.length - 1 ? 'none' : '1px solid #e7dbc4',
            }}
          >
            <span className="font-guide-body" style={{ ...creamText.body, flex: '1 1 240px', minWidth: '200px' }}>
              {statement.text}
            </span>
            <div role="presentation" style={{ display: 'flex', gap: '0.35rem' }}>
              {ratingScale.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={current[statement.id] === option.value}
                  aria-label={`${statement.text} — ${option.label}`}
                  className="guide-choice"
                  style={{ minWidth: '44px' }}
                  onClick={() => onChange({ ...current, [statement.id]: option.value })}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}