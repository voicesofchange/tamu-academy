import React from 'react';
import { FREQUENCY_SCALE } from '@/lib/guide/sections';
import { creamText } from '@/lib/guide/styles';

/**
 * A five-point frequency scale (Always / Often / Sometimes / Rarely / Never)
 * for each statement. Used by the Kioo reflection.
 */
export default function FrequencyField({ field, value, onChange, disabled = false }) {
  const current = value && typeof value === 'object' ? value : {};
  return (
    <div>
      {field.label && (
        <span className="font-guide-body" style={creamText.label}>
          {field.label}
        </span>
      )}
      <div role="radiogroup" aria-label={field.label || 'Frequency ratings'}>
        {field.statements.map((statement, index) => (
          <div
            key={statement.id}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 0',
              borderBottom: index === field.statements.length - 1 ? 'none' : '1px solid #e7dbc4',
            }}
          >
            <span className="font-guide-body" style={{ ...creamText.body, flex: '1 1 260px', minWidth: '200px' }}>
              {statement.text}
            </span>
            <div role="presentation" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {FREQUENCY_SCALE.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={current[statement.id] === option.value}
                  aria-label={`${statement.text} — ${option.label}`}
                  className="guide-choice"
                  disabled={disabled}
                  onClick={() => !disabled && onChange({ ...current, [statement.id]: option.value })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}