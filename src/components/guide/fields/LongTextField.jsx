import React from 'react';
import { creamText } from '@/lib/guide/styles';

/** A long-answer box. Full width on every screen size. */
export default function LongTextField({ field, inputId, value, onChange }) {
  return (
    <div>
      <label htmlFor={inputId} className="font-guide-body" style={creamText.label}>
        {field.label}
      </label>
      {field.hint && (
        <p className="font-guide-body" style={creamText.hint}>
          {field.hint}
        </p>
      )}
      <textarea
        id={inputId}
        className="guide-input"
        rows={field.rows || 4}
        placeholder={field.placeholder || ''}
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}