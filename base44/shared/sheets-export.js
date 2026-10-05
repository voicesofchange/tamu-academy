/**
 * sheets-export — the single home of the Google Sheets plumbing used by Tamu
 * Academy's administrative exports.
 *
 * Imported ONLY by Base44 backend functions, never by src/.
 *
 * Both exportCourseCompletionsToSheet and exportModuleProgressToSheet write
 * through these helpers, so authentication, spreadsheet creation, the
 * clear-and-rewrite cycle and the SheetExportState bookkeeping behave
 * identically for every export, and there is only one place to keep them
 * correct.
 *
 * Every helper takes the caller's service-role base44 client: the connected
 * Google account belongs to the app, and its access token never leaves the
 * server.
 */

/** Rows beyond this are not written; the sheet is a snapshot, not an archive. */
export const SHEETS_MAX_ROWS = 5000;

/** A stored timestamp as a plain ISO date, or '' when there is nothing to show. */
export function formatSheetDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

/** Spreadsheet column letter for a 1-based column count (1 → 'A', 27 → 'AA'). */
export function columnLetter(count) {
  let remaining = count;
  let letters = '';
  while (remaining > 0) {
    const offset = (remaining - 1) % 26;
    letters = String.fromCharCode(65 + offset) + letters;
    remaining = Math.floor((remaining - 1) / 26);
  }
  return letters;
}

/** Bearer headers for the connected Google Sheets account. */
export async function getSheetsAuthHeaders(base44) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlesheets');
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

/** The spreadsheet already remembered for this export, or null on the first run. */
export async function loadSheetState(base44, stateKey) {
  const rows = await base44.asServiceRole.entities.SheetExportState.filter({ state_key: stateKey });
  return rows && rows.length > 0 ? rows[0] : null;
}

/**
 * The export's spreadsheet: created in the connected Google account on the
 * first run, and reused on every run after that.
 */
export async function ensureSpreadsheet(base44, { title, tab, authHeaders, state }) {
  if (state && state.spreadsheet_id) {
    return { spreadsheetId: state.spreadsheet_id, spreadsheetUrl: state.spreadsheet_url || '' };
  }

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      properties: { title },
      sheets: [{ properties: { title: tab } }],
    }),
  });
  if (!response.ok) {
    throw new Error(`create failed: ${response.status} ${await response.text()}`);
  }
  const created = await response.json();
  return { spreadsheetId: created.spreadsheetId, spreadsheetUrl: created.spreadsheetUrl || '' };
}

/**
 * Replaces the sheet's contents with the header and the current rows. The data
 * area is cleared first, so the file stays a fresh picture of the app rather
 * than an ever-growing log.
 */
export async function replaceSheetRows(authHeaders, { spreadsheetId, tab, header, rows, maxRows = SHEETS_MAX_ROWS }) {
  const lastColumn = columnLetter(header.length);
  const range = `${tab}!A1:${lastColumn}${maxRows}`;

  const clearResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`,
    { method: 'POST', headers: authHeaders, body: '{}' }
  );
  if (!clearResponse.ok) {
    throw new Error(`clear failed: ${clearResponse.status} ${await clearResponse.text()}`);
  }

  const writeResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(`${tab}!A1`)}?valueInputOption=RAW`,
    { method: 'PUT', headers: authHeaders, body: JSON.stringify({ values: [header, ...rows] }) }
  );
  if (!writeResponse.ok) {
    throw new Error(`write failed: ${writeResponse.status} ${await writeResponse.text()}`);
  }
}

/** Remembers the spreadsheet and this run, so the next export reuses the file. */
export async function saveSheetState(base44, { stateKey, state, spreadsheetId, spreadsheetUrl, tab, rowCount }) {
  const lastExportedAt = new Date().toISOString();
  const data = {
    state_key: stateKey,
    spreadsheet_id: spreadsheetId,
    spreadsheet_url: spreadsheetUrl,
    sheet_name: tab,
    last_exported_at: lastExportedAt,
    last_row_count: rowCount,
  };
  if (state) {
    await base44.asServiceRole.entities.SheetExportState.update(state.id, data);
  } else {
    await base44.asServiceRole.entities.SheetExportState.create(data);
  }
  return lastExportedAt;
}