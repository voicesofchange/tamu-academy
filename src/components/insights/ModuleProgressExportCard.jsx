import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

const bodyText = {
  color: 'rgba(243,234,216,0.72)',
  fontSize: '0.92rem',
  lineHeight: 1.8,
  fontWeight: 300,
  margin: '0 0 1.25rem',
  maxWidth: '640px',
};

const panelStyle = {
  marginTop: '1.5rem',
  padding: '1.25rem 1.4rem',
  border: '1px solid rgba(232,184,91,0.2)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
};

const cellStyle = {
  padding: '0.45rem 0.6rem',
  borderBottom: '1px solid rgba(232,184,91,0.12)',
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.75rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
};

/**
 * ModuleProgressExportCard — the administrator's control for the learner
 * module-progress Google Sheet.
 *
 * It calls the admin-only exportModuleProgressToSheet function; the function
 * itself enforces the admin role server-side and holds the Google credentials,
 * so nothing privileged reaches the browser. A preview runs the same gathering
 * and sorting without writing, which is useful before a large first export.
 */
export default function ModuleProgressExportCard() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const run = async (payload) => {
    setBusy(true);
    setError('');
    try {
      const response = await base44.functions.invoke('exportModuleProgressToSheet', payload);
      const data = response?.data || {};
      if (data.error) {
        setError(data.error === 'Forbidden' ? 'This export is available to administrators only.' : 'The export could not be completed. Please try again.');
      } else if (data.dry_run) {
        setPreview(data);
      } else {
        setResult(data);
      }
    } catch {
      setError('The export could not be completed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
        Module progress export
      </span>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.75rem' }}>
        Learner module progress in a Google Sheet
      </h3>
      <p className="font-body" style={bodyText}>
        Writes one row per learner per module — their course, standing, module status, knowledge check and last activity — to a Google Sheet in the connected account. Each run replaces the sheet with the current picture, so the file stays up to date rather than growing. Administrators only.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button onClick={() => run({})} disabled={busy}>
          {busy ? 'Working…' : 'Export to Google Sheet'}
        </Button>
        <Button variant="outline" onClick={() => run({ dry_run: true })} disabled={busy}>
          Preview without writing
        </Button>
        {result?.spreadsheet_url && (
          <Button variant="outline" asChild>
            <a href={result.spreadsheet_url} target="_blank" rel="noopener noreferrer">Open the sheet</a>
          </Button>
        )}
      </div>

      {error && (
        <div style={panelStyle}>
          <p className="font-body" style={{ ...bodyText, color: '#e8a99a', margin: 0 }}>{error}</p>
        </div>
      )}

      {result && (
        <div style={panelStyle}>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            {result.exported} {result.exported === 1 ? 'row' : 'rows'} across {result.learners} {result.learners === 1 ? 'learner' : 'learners'} written
            {result.last_exported_at ? ` on ${new Date(result.last_exported_at).toLocaleString()}` : ''}.
          </p>
        </div>
      )}

      {preview && (
        <div style={panelStyle}>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
            Preview only — nothing was written. {preview.rows_ready} {preview.rows_ready === 1 ? 'row' : 'rows'} across {preview.learners} {preview.learners === 1 ? 'learner' : 'learners'} would be written.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {(preview.preview || []).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ ...cellStyle, fontWeight: rowIndex === 0 ? 600 : 300, color: rowIndex === 0 ? '#e8b85b' : 'rgba(243,234,216,0.78)' }}>
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}