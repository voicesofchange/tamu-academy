import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  background: 'none',
  color: '#e8b85b',
  border: '1px solid rgba(232,184,91,0.4)',
  borderRadius: '2px',
  padding: '0.5rem 0.9rem',
  fontSize: '0.68rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
};

/**
 * TranslationCsvTools — send one language's translations out as a CSV for an
 * outside reviewer, and bring their corrected file back in.
 */
export default function TranslationCsvTools({ onExport, onImport, busy }) {
  const inputRef = useRef(null);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
      <button type="button" onClick={onExport} disabled={busy} className="font-body" style={buttonStyle}>
        <Download size={14} aria-hidden="true" />
        Export CSV
      </button>

      <button
        type="button"
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={busy}
        className="font-body"
        style={buttonStyle}
      >
        <Upload size={14} aria-hidden="true" />
        Import CSV
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        aria-label="Import a reviewed CSV"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          e.target.value = '';
          if (file) onImport(file);
        }}
      />
    </div>
  );
}