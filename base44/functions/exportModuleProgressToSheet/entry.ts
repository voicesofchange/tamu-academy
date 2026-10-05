import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { COURSE_REGISTRY, getCourseConfig, getRequiredModuleRoutes } from '../../shared/course-registry.js';
import {
  ensureSpreadsheet,
  formatSheetDate,
  getSheetsAuthHeaders,
  loadSheetState,
  replaceSheetRows,
  saveSheetState,
} from '../../shared/sheets-export.js';

/**
 * exportModuleProgressToSheet — refreshes a Google Sheet with one row per
 * learner per module, so community engagement can be tracked outside the app.
 *
 * Admin-only, and callable with ?dry_run to preview without writing. Every
 * value is derived from server-side records; nothing is trusted from the
 * caller.
 *
 * The spreadsheet is created in the connected Google account on the first run;
 * its ID is remembered in SheetExportState so later runs reuse the same file.
 * Each run clears the data area and rewrites the full current picture, so the
 * sheet is always up to date rather than duplicated. The Sheets plumbing is
 * shared with exportCourseCompletionsToSheet.
 */
const STATE_KEY = 'module-progress';
const SPREADSHEET_TITLE = 'Tamu Academy — Learner Module Progress';
const SHEET_TAB = 'Module Progress';
const MAX_ROWS = 20000;
const UNKNOWN_MODULE_ORDER = 99;

const HEADER = [
  'Learner Name',
  'Learner Email',
  'Course',
  'Course Standing',
  'Progress %',
  'Modules Completed',
  'Total Modules',
  'Module',
  'Module Status',
  'Knowledge Check Passed',
  'Last Section',
  'Module Completed',
  'Last Updated',
];

function keyFor(learnerId, courseSlug) {
  return `${learnerId}|${courseSlug}`;
}

/** A stored module slug as a readable label: 'module-3' → 'Module 3'. */
function moduleLabel(slug) {
  if (!slug) return '';
  const numbered = /^module-(\d+)$/.exec(String(slug));
  if (numbered) return `Module ${numbered[1]}`;
  const words = String(slug).replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const requestedCourse = typeof body.course_slug === 'string' ? body.course_slug.trim() : '';

    // --- Authentication / Authorization ---
    // Admin-only. A direct call from a non-admin or anonymous caller is rejected.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // An optional course filter is honoured only for a course we actually run.
    if (requestedCourse && !getCourseConfig(requestedCourse)) {
      return Response.json({ error: 'Unknown course' }, { status: 400 });
    }

    // --- Gather data ---
    const [allProgress, enrollments, users] = await Promise.all([
      base44.asServiceRole.entities.ModuleProgress.list('-updated_date', 20000),
      base44.asServiceRole.entities.CourseEnrollment.list('-enrolled_at', 5000),
      base44.asServiceRole.entities.User.list('-created_date', 5000),
    ]);

    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    const enrollmentMap = {};
    for (const e of enrollments || []) enrollmentMap[keyFor(e.learner_id, e.course_slug)] = e;

    // How many modules each learner has finished in each course.
    const modulesCompleted = {};
    for (const p of allProgress || []) {
      if (p.status !== 'completed') continue;
      const k = keyFor(p.learner_id, p.course_slug);
      modulesCompleted[k] = (modulesCompleted[k] || 0) + 1;
    }

    const progressRows = (allProgress || []).filter((p) => !requestedCourse || p.course_slug === requestedCourse);

    // --- Build the sheet rows, one per learner per module ---
    const rows = progressRows.map((p) => {
      const k = keyFor(p.learner_id, p.course_slug);
      const learner = userMap[p.learner_id] || {};
      const config = getCourseConfig(p.course_slug);
      const enrollment = enrollmentMap[k];
      const routeIndex = getRequiredModuleRoutes(p.course_slug).indexOf(p.module_slug);
      return {
        order: routeIndex === -1 ? UNKNOWN_MODULE_ORDER : routeIndex,
        course: config ? config.title : p.course_slug,
        values: [
          learner.full_name || 'Unknown learner',
          learner.email || '',
          config ? config.title : p.course_slug,
          enrollment ? enrollment.status || '' : 'not enrolled',
          enrollment && typeof enrollment.progress_percentage === 'number' ? enrollment.progress_percentage : '',
          modulesCompleted[k] || 0,
          getRequiredModuleRoutes(p.course_slug).length || '',
          moduleLabel(p.module_slug),
          p.status || '',
          p.quiz_passed === true ? 'yes' : 'no',
          p.last_section_id || '',
          formatSheetDate(p.completed_at),
          formatSheetDate(p.updated_date),
        ],
      };
    });

    // Group the sheet by course, then learner, then module order, so a
    // learner's journey through one course reads top to bottom.
    rows.sort((a, b) => {
      const courseOrder = String(a.course).localeCompare(String(b.course));
      if (courseOrder !== 0) return courseOrder;
      const learnerOrder = String(a.values[0]).localeCompare(String(b.values[0]));
      if (learnerOrder !== 0) return learnerOrder;
      return a.order - b.order;
    });
    const sheetRows = rows.map((r) => r.values);

    // --- Existing spreadsheet (if any) ---
    const state = await loadSheetState(base44, STATE_KEY);
    let spreadsheetId = state?.spreadsheet_id || null;
    let spreadsheetUrl = state?.spreadsheet_url || null;

    if (dryRun) {
      return Response.json({
        dry_run: true,
        rows_ready: sheetRows.length,
        learners: new Set(progressRows.map((p) => p.learner_id)).size,
        spreadsheet_url: spreadsheetUrl,
        preview: [HEADER, ...sheetRows.slice(0, 5)],
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
        rows: sheetRows,
        maxRows: MAX_ROWS,
      });
    } catch (sheetError) {
      console.error('[exportModuleProgressToSheet] sheets:', sheetError && sheetError.message);
      return Response.json({ error: 'Could not update the spreadsheet' }, { status: 502 });
    }

    const lastExportedAt = await saveSheetState(base44, {
      stateKey: STATE_KEY,
      state,
      spreadsheetId,
      spreadsheetUrl,
      tab: SHEET_TAB,
      rowCount: sheetRows.length,
    });

    return Response.json({
      exported: sheetRows.length,
      learners: new Set(progressRows.map((p) => p.learner_id)).size,
      courses: Object.keys(COURSE_REGISTRY).length,
      spreadsheet_id: spreadsheetId,
      spreadsheet_url: spreadsheetUrl,
      last_exported_at: lastExportedAt,
    });
  } catch (error) {
    console.error('[exportModuleProgressToSheet] error:', error && error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}