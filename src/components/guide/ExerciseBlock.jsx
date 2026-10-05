import React from 'react';
import LongTextField from './fields/LongTextField';
import FillTableField from './fields/FillTableField';
import RatingField from './fields/RatingField';
import FrequencyField from './fields/FrequencyField';
import { creamText } from '@/lib/guide/styles';

function FieldRenderer({ field, inputId, value, onChange }) {
  if (field.type === 'table') return <FillTableField field={field} inputId={inputId} value={value} onChange={onChange} />;
  if (field.type === 'rating') return <RatingField field={field} value={value} onChange={onChange} />;
  if (field.type === 'frequency') return <FrequencyField field={field} value={value} onChange={onChange} />;
  return <LongTextField field={field} inputId={inputId} value={value} onChange={onChange} />;
}

/** One numbered exercise of a section, with its instructions and inputs. */
export default function ExerciseBlock({ exercise, getValue, setValue }) {
  return (
    <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.25rem' }}>
      <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.4rem' }}>
        {exercise.number}
      </span>
      <h3 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)', lineHeight: 1.3, margin: '0 0 0.6rem' }}>
        {exercise.title}
      </h3>
      {exercise.instructions && (
        <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.5rem' }}>
          {exercise.instructions}
        </p>
      )}
      <div style={{ display: 'grid', gap: '1.75rem' }}>
        {exercise.fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            inputId={`${exercise.id}-${field.id}`}
            value={getValue(exercise.id, field.id, field.type === 'text' ? '' : {})}
            onChange={(next) => setValue(exercise.id, field.id, next)}
          />
        ))}
      </div>
    </section>
  );
}