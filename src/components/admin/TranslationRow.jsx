import React, { useEffect, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { fieldLabel } from '@/lib/translation-review';

const STATUS_STYLE = {
  reviewed: { label: 'Reviewed', color: '#7bc47f', border: 'rgba(123,196,127,0.45)' },
  unreviewed: { label: 'Unreviewed', color: '#e8b85b', border: 'rgba(232,184,91,0.45)' },
  outdated: { label: 'Outdated', color: '#e08a6a', border: 'rgba(224,138,106,0.45)' },
};

const labelStyle = {
  color: 'rgba(232,184,91,0.7)',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.35rem',
};

/**
 * TranslationRow — one cached translation, its English beside it, and the
 * administrator's controls: correct the text, save it as reviewed, or reopen it.
 */
export default function TranslationRow({ row, saving, onSave }) {
  const [value, setValue] = useState(row.translated_text);

  useEffect(() => {
    setValue(row.translated_text);
  }, [row.id, row.translated_text]);

  const meta = STATUS_STYLE[row.status] || STATUS_STYLE.unreviewed;
  const dirty = value !== row.translated_text;
  const empty = value.trim().length === 0;

  return (
    <div
      style={{
        border: '1px solid rgba(232,184,91,0.14)',
        borderRadius: '4px',
        padding: '0.9rem 1rem',
        backgroundColor: 'rgba(243,234,216,0.015)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          marginBottom: '0.7rem',
        }}
      >
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.62)', fontSize: '0.76rem' }}>
          {fieldLabel(row.field_path)}
        </span>
        <span
          className="font-body"
          style={{
            color: meta.color,
            border: `1px solid ${meta.border}`,
            borderRadius: '999px',
            padding: '0.12rem 0.6rem',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {meta.label}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.85rem',
        }}
      >
        <div>
          <span className="font-body" style={labelStyle}>English</span>
          <p
            className="font-body"
            style={{
              margin: 0,
              color: 'rgba(243,234,216,0.55)',
              fontSize: '0.86rem',
              lineHeight: 1.7,
              fontWeight: 300,
              whiteSpace: 'pre-wrap',
            }}
          >
            {row.source_text || '—'}
          </p>
        </div>

        <div>
          <span className="font-body" style={labelStyle}>Translation</span>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label={`${row.language} translation of ${fieldLabel(row.field_path)}`}
            rows={3}
            className="font-body"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#2a1f17',
              border: '1px solid rgba(232,184,91,0.28)',
              borderRadius: '3px',
              color: '#f8f0df',
              fontSize: '0.86rem',
              lineHeight: 1.7,
              fontWeight: 300,
              padding: '0.6rem 0.7rem',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginTop: '0.7rem' }}>
        <button
          type="button"
          disabled={saving || empty}
          onClick={() => onSave(row, value, 'reviewed')}
          className="font-body"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: saving || empty ? 'rgba(232,184,91,0.3)' : '#e8b85b',
            color: '#24150f',
            border: '1px solid #e8b85b',
            borderRadius: '2px',
            padding: '0.42rem 0.85rem',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: saving || empty ? 'default' : 'pointer',
          }}
        >
          <Check size={13} aria-hidden="true" />
          {saving ? 'Saving…' : row.status === 'reviewed' ? 'Save changes' : 'Save & mark reviewed'}
        </button>

        {row.status === 'reviewed' && (
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave(row, value, 'unreviewed')}
            className="font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              color: 'rgba(232,184,91,0.85)',
              border: '1px solid rgba(232,184,91,0.35)',
              borderRadius: '2px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 400,
              cursor: saving ? 'default' : 'pointer',
            }}
          >
            <RotateCcw size={13} aria-hidden="true" />
            Reopen
          </button>
        )}

        {dirty && !saving && (
          <span className="font-body" style={{ color: 'rgba(243,234,216,0.4)', fontSize: '0.72rem' }}>
            Unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}