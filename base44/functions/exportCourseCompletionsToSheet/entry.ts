import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getCourseConfig, getRequiredModuleRoutes } from '../../shared/course-registry.js';
import {
  ensureSpreadsheet,
  formatSheetDate,
  getSheetsAuthHeaders,
  loadSheetState,
  replaceSheetRows,
  saveSheetState,
} from '../../shared/sheets-export.js';

/**
 * exportCourseCompletionsToSheet — refreshes a Google Sheet with every
 * learner's course enrollment, progress, and completion details.
 *
 * Triggered by the "Monthly Course Completion Export" workflow and
 * callable by an admin (supports ?dry_run to preview without writing).
 *
 * The spreadsheet is created in the connected Google account on the first
 * run; its ID is remembered in SheetExportState so later runs reuse the
 * same file. Each run clears the data area and rewrites the full current
 * picture — so the sheet is always an up-to-date record, never duplicated.
 *
 * All values are derived from server-side records; nothing is trusted
 * from the caller. The Sheets plumbing is shared with
 * exportModuleProgressToSheet through base44/shared/sheets-export.js.
 */
const STATE_KEY = 'course-completions';
const SPREADSHEET_TITLE = 'Tamu Academy — Course Completions';
const SHEET_TAB = 'Completions';

const HEADER = [
  'Learner Name',
  'Learner Email',
  'Course',
  'Status',
  'Progress %',
  'Modules Completed',
  'Total Modules',
  'Enrolled',
  'Completed',
  'Certificate ID',
  'Certificate Issued',
];

function keyFor(learnerId, courseSlug) {
  return `${learnerId}|${courseSlug}`;
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;

    // --- Authentication / Authorization ---
    // Admin-only. The scheduled workflow injects admin auth; a direct call
    // from a non-admin or anonymous caller is rejected.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Gather data ---
    const [enrollments, allProgress, certificates, users] = await Promise.all([
      base44.asServiceRole.entities.CourseEnrollment.list('-enrolled_at', 5000),
      base44.asServiceRole.entities.ModuleProgress.list('-updated_date', 5000),
      base44.asServiceRole.entities.CourseCertificate.list('-issued_at', 5000),
      base44.asServiceRole.entities.User.list('-created_date', 5000),
    ]);

    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    const modulesCompleted = {};
    for (const p of allProgress || []) {
      if (p.status !== 'completed') continue;
      const k = keyFor(p.learner_id, p.course_slug);
      modulesCompleted[k] = (modulesCompleted[k] || 0) + 1;
    }

    const certificateMap = {};
    for (const c of certificates || []) {
      certificateMap[keyFor(c.learner_id, c.course_slug)] = c;
    }

    // --- Build the sheet rows ---
    const rows = (enrollments || []).map((e) => {
      const k = keyFor(e.learner_id, e.course_slug);
      const learner = userMap[e.learner_id] || {};
      const config = getCourseConfig(e.course_slug);
      const certificate = certificateMap[k];
      const totalModules = getRequiredModuleRoutes(e.course_slug).length;
      return [
        learner.full_name || 'Unknown learner',
        learner.email || '',
        config ? config.title : e.course_slug,
        e.status || '',
        typeof e.progress_percentage === 'number' ? e.progress_percentage : '',
        modulesCompleted[k] || 0,
        totalModules || '',
        formatSheetDate(e.enrolled_at),
        formatSheetDate(e.completed_at),
        certificate ? certificate.certificate_id : '',
        certificate ? formatSheetDate(certificate.issued_at) : '',
      ];
    });

    // Completed learners first, then the most recently completed.
    rows.sort((a, b) => {
      const aDone = a[3] === 'completed' ? 0 : 1;
      const bDone = b[3] === 'completed' ? 0 : 1;
      if (aDone !== bDone) return aDone - bDone;
      return String(b[8]).localeCompare(String(a[8]));
    });

    // --- Existing spreadsheet (if any) ---
    const state = await loadSheetState(base44, STATE_KEY);
    let spreadsheetId = state?.spreadsheet_id || null;
    let spreadsheetUrl = state?.spreadsheet_url || null;

    if (dryRun) {
      return Response.json({
        dry_run: true,
        rows_ready: rows.length,
        completed: rows.filter((r) => r[3] === 'completed').length,
        spreadsheet_url: spreadsheetUrl,
        preview: [HEADER, ...rows.slice(0, 5)],
      });
    }

    // --- Google Sheets access ---
    try {
      const authHeaders = await getSheetsAuthHeaders(base44);
      const ensured = await ensureSpreadsheet(base44, {
        title: SPREADSHEET_TITLE,
        tab: SHEET_TAB,
        authHeaders,
        state,
      });
      spreadsheetId = ensured.spreadsheetId;
      spreadsheetUrl = ensured.spreadsheetUrl;

      await replaceSheetRows(authHeaders, {
        spreadsheetId,
        tab: SHEET_TAB,
        header: HEADER,
        rows,
      });
    } catch (sheetError) {
      console.error('[exportCourseCompletionsToSheet] sheets:', sheetError && sheetError.message);
      return Response.json({ error: 'Could not update the spreadsheet' }, { status: 502 });
    }

    const lastExportedAt = await saveSheetState(base44, {
      stateKey: STATE_KEY,
      state,
      spreadsheetId,
      spreadsheetUrl,
      tab: SHEET_TAB,
      rowCount: rows.length,
    });

    return Response.json({
      exported: rows.length,
      completed: rows.filter((r) => r[3] === 'completed').length,
      spreadsheet_id: spreadsheetId,
      spreadsheet_url: spreadsheetUrl,
      last_exported_at: lastExportedAt,
    });
  } catch (error) {
    console.error('[exportCourseCompletionsToSheet] error:', error && error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}