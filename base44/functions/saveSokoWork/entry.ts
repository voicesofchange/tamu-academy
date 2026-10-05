import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  SOKO_COURSE_SLUG,
  sokoCourseExists,
  getSokoModuleConfig,
  getSokoModulePrerequisite,
  isSokoModulePublished,
  getSokoSensitiveModuleContent,
  deriveSokoCompletedKeys,
} from '../../shared/sauti-za-soko-config.js';

/**
 * saveSokoWork — authenticated endpoint that stores the learner's own
 * written work for the Sauti za Soko pathway:
 *
 *   save_action_plan      -> the module's My Soko Action Plan section.
 *                            Also satisfies that module's activity
 *                            requirement server-side.
 *   save_discussion       -> one response to a module's Kiswahili
 *                            discussion prompt.
 *   save_final_reflection -> the final course reflection.
 *
 * GUARANTEES:
 *   - learner_id is derived from the authenticated session only.
 *   - Action-plan field ids are validated against the module's own content;
 *     unknown ids are refused, so no arbitrary data can be stored.
 *   - Each response is length-bounded and stored as plain text. No file
 *     uploads, no personal reflections of other people.
 *   - activity_acknowledged_at is set only here (for action-plan modules)
 *     or by submitSokoFacilitatorWork (for Module 8). It can never be set
 *     from the browser.
 *   - Refuses any body containing learner_id, status, completed_at,
 *     quiz_passed, score or passed.
 *   - Sharing a discussion response with other learners happens only when
 *     shareConsent is explicitly true.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'status',
  'completed_at',
  'quiz_passed',
  'score',
  'passed',
  'activity_acknowledged_at',
  'filled_count',
]);

const MAX_FIELD_CHARS = 4000;
const MAX_TOTAL_CHARS = 20000;
const MAX_REFLECTION_CHARS = 6000;
const ALLOWED_LANGUAGES = new Set(['sw', 'en', 'mixed']);

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = user.role === 'admin';

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const action = typeof body.action === 'string' ? body.action : '';
    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute : '';

    if (!sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    const isPublished = moduleRoute ? isSokoModulePublished(courseSlug, moduleRoute) : false;

    // Admin preview of an unpublished pathway responds successfully
    // without persisting anything.
    if (isAdmin && !isPublished) {
      return Response.json({ saved: false, progressSaved: false, preview: true });
    }

    // Shared access chain for every write.
    if (!isAdmin) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: { $in: ['active', 'completed'] },
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    // -----------------------------------------------------------------
    // Final course reflection
    // -----------------------------------------------------------------
    if (action === 'save_final_reflection') {
      if (courseSlug !== SOKO_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const reflection = typeof body.reflection === 'string' ? body.reflection.trim() : '';
      if (!reflection || reflection.length > MAX_REFLECTION_CHARS) {
        return Response.json({ error: 'Invalid reflection' }, { status: 400 });
      }

      const existing = await base44.asServiceRole.entities.SokoReflection.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
      });
      if (existing && existing.length > 0) {
        await base44.asServiceRole.entities.SokoReflection.update(existing[0].id, {
          reflection,
          updated_at: now,
        });
      } else {
        await base44.asServiceRole.entities.SokoReflection.create({
          learner_id: learnerId,
          course_slug: courseSlug,
          reflection,
          submitted_at: now,
          updated_at: now,
        });
      }
      return Response.json({ saved: true, progressSaved: true });
    }

    // Every other action is scoped to one module.
    const moduleConfig = getSokoModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin && !isPublished) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (!isAdmin) {
      const prereqRoute = getSokoModulePrerequisite(courseSlug, moduleRoute);
      if (prereqRoute) {
        const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
          learner_id: learnerId,
          course_slug: courseSlug,
          module_slug: prereqRoute,
          status: 'completed',
        });
        if (!prereqRows || prereqRows.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
    }

    const moduleContent = getSokoSensitiveModuleContent(courseSlug, moduleRoute);
    if (!moduleContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // -----------------------------------------------------------------
    // My Soko Action Plan section
    // -----------------------------------------------------------------
    if (action === 'save_action_plan') {
      if (moduleRoute === 'module-8') {
        return Response.json({ error: 'Use the facilitator submission' }, { status: 400 });
      }
      const activity = moduleContent.activity;
      if (!activity || !Array.isArray(activity.fields)) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const allowedIds = new Set(activity.fields.map((f: Record<string, unknown>) => f.id));

      const raw = body.responses;
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return Response.json({ error: 'Invalid responses' }, { status: 400 });
      }

      const cleaned: Record<string, string> = {};
      let totalChars = 0;
      let filledCount = 0;
      for (const key of Object.keys(raw as Record<string, unknown>)) {
        if (!allowedIds.has(key)) {
          return Response.json({ error: 'Unknown section: ' + key }, { status: 400 });
        }
        const value = (raw as Record<string, unknown>)[key];
        if (typeof value !== 'string') {
          return Response.json({ error: 'Invalid value for ' + key }, { status: 400 });
        }
        const trimmed = value.trim();
        if (trimmed.length > MAX_FIELD_CHARS) {
          return Response.json({ error: 'Section too long: ' + key }, { status: 400 });
        }
        totalChars += trimmed.length;
        if (trimmed.length > 0) {
          filledCount += 1;
          cleaned[key] = trimmed;
        }
      }
      if (totalChars > MAX_TOTAL_CHARS) {
        return Response.json({ error: 'Submission too long' }, { status: 400 });
      }
      if (filledCount === 0) {
        return Response.json({ error: 'Nothing to save' }, { status: 400 });
      }

      const existingPlan = await base44.asServiceRole.entities.SokoActionPlan.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const content = JSON.stringify(cleaned);
      if (existingPlan && existingPlan.length > 0) {
        await base44.asServiceRole.entities.SokoActionPlan.update(existingPlan[0].id, {
          content,
          filled_count: filledCount,
          updated_at: now,
        });
      } else {
        await base44.asServiceRole.entities.SokoActionPlan.create({
          learner_id: learnerId,
          course_slug: courseSlug,
          module_slug: moduleRoute,
          content,
          filled_count: filledCount,
          saved_at: now,
          updated_at: now,
        });
      }

      // Saving the action plan satisfies this module's activity
      // requirement. The learner can still revise the section later
      // without changing that.
      const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const progressRow = progressRows && progressRows.length > 0 ? progressRows[0] : null;
      let completedKeys: string[] = [];
      if (!progressRow) {
        const created = await base44.asServiceRole.entities.ModuleProgress.create({
          learner_id: learnerId,
          course_slug: courseSlug,
          module_slug: moduleRoute,
          status: 'in_progress',
          activity_acknowledged_at: now,
          activity_completion_mode: 'browser_private',
          quiz_passed: false,
          updated_at: now,
        });
        completedKeys = deriveSokoCompletedKeys(created);
      } else {
        const updated = await base44.asServiceRole.entities.ModuleProgress.update(progressRow.id, {
          activity_acknowledged_at: progressRow.activity_acknowledged_at || now,
          activity_completion_mode: progressRow.activity_completion_mode || 'browser_private',
          updated_at: now,
        });
        completedKeys = deriveSokoCompletedKeys(updated);
      }

      return Response.json({ saved: true, filledCount, completedKeys, progressSaved: true });
    }

    // -----------------------------------------------------------------
    // Peer discussion response
    // -----------------------------------------------------------------
    if (action === 'save_discussion') {
      const prompt = moduleContent.kiswahiliPrompt;
      if (!prompt) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const response = typeof body.response === 'string' ? body.response.trim() : '';
      const language = typeof body.language === 'string' ? body.language : 'sw';
      const shareConsent = body.shareConsent === true;

      if (!response || response.length > MAX_FIELD_CHARS) {
        return Response.json({ error: 'Invalid response' }, { status: 400 });
      }
      if (!ALLOWED_LANGUAGES.has(language)) {
        return Response.json({ error: 'Invalid language' }, { status: 400 });
      }

      const existing = await base44.asServiceRole.entities.SokoDiscussion.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      if (existing && existing.length > 0) {
        await base44.asServiceRole.entities.SokoDiscussion.update(existing[0].id, {
          prompt_ref: moduleRoute,
          response,
          language,
          share_consent: shareConsent,
        });
      } else {
        await base44.asServiceRole.entities.SokoDiscussion.create({
          learner_id: learnerId,
          course_slug: courseSlug,
          module_slug: moduleRoute,
          prompt_ref: moduleRoute,
          response,
          language,
          share_consent: shareConsent,
          created_at: now,
        });
      }
      return Response.json({ saved: true, progressSaved: true });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[saveSokoWork] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}