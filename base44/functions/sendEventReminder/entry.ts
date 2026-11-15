/**
 * sendEventReminder — sends the "see you this Saturday" reminder for
 * "Learning Without Barriers: Voices of Change and Tamu Academy" to everyone
 * who signed up through the event registration form.
 *
 * The guest list is read from the Google Form itself (Google Forms connector),
 * so the reminder always reaches the people who actually registered, with no
 * copy of the list kept in the app. Each response's email and name are
 * validated and deduplicated before anything is sent.
 *
 * Delivery goes through the app's connected Gmail account, sending as
 * tex@sustainthevoices.org, exactly as the invitation does.
 *
 * The message itself comes entirely from
 * base44/shared/event-reminder-email.js, so the wording and links cannot be
 * rewritten by a request.
 *
 * A dry run reports exactly who would receive the reminder while sending
 * nothing, and `test_to` sends a single preview copy to one address.
 *
 * Admin-only.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getGmailSender, sendTrackedEmail } from '../../shared/course-outreach.js';
import { emailCopyCache, learnerLanguage } from '../../shared/email-localization.js';
import {
  EVENT_REMINDER_COPY,
  buildEventReminderHtml,
  buildEventReminderText,
} from '../../shared/event-reminder-email.js';

/** The event registration form, from the shape's responder link. */
const REGISTER_FORM_ID = '1FAIpQLScdc28L-GxhlwBYT_bnUbT0401rFs6kquR9E6_EgspFxIfLHA';
const FROM_ADDRESS = 'tex@sustainthevoices.org';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PER_RUN = 150;
const SEND_BATCH = 6;
const MESSAGE_TYPE = 'announcement';
const API = 'https://forms.googleapis.com/v1';

/** The given name to greet with, or a warm fallback when none is on file. */
function firstNameOf(name: string): string {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  return trimmed ? trimmed.split(/\s+/)[0] : '';
}

/** All responses of the form, paged. */
async function listResponses(accessToken: string, formId: string) {
  const responses: any[] = [];
  let pageToken: string | undefined;
  do {
    const url = new URL(`${API}/forms/${formId}/responses`);
    url.searchParams.set('pageSize', '200');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error?.message || `Form responses unavailable (${res.status})`);
    }
    const page = await res.json();
    for (const response of page.responses || []) responses.push(response);
    pageToken = page.nextPageToken;
  } while (pageToken);
  return responses;
}

/** Question id to title, so answers are read by meaning and never by position. */
async function questionTitles(accessToken: string, formId: string) {
  const res = await fetch(`${API}/forms/${formId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Form unavailable (${res.status})`);
  }
  const form = await res.json();
  const titles: Record<string, string> = {};
  for (const item of form.items || []) {
    const id = item?.questionItem?.question?.questionId;
    if (id) titles[id] = item.title || '';
  }
  return { titles, formTitle: form?.info?.title || '' };
}

/** The answer text for the question whose title matches, or ''. */
function answerByTitle(response: any, titles: Record<string, string>, matcher: RegExp) {
  for (const answer of Object.values(response.answers || {})) {
    const anyAnswer: any = answer;
    const title = titles[anyAnswer.questionId] || anyAnswer.title || '';
    if (!matcher.test(title)) continue;
    const text = anyAnswer.textAnswers?.answers?.map((a: any) => a.value).filter(Boolean).join(' ') || '';
    if (text) return text;
  }
  return '';
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // --- Authentication / Authorization ---
    const user = await base44.auth.me().catch((e: any) => (e?.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    // --- The guest list, read from the registration form ---
    let accessToken: string;
    try {
      const connection = await base44.asServiceRole.connectors.getConnection('googleforms');
      accessToken = connection.accessToken;
    } catch (error: any) {
      console.error('[sendEventReminder] forms connection error:', error && error.message);
      return Response.json(
        { error: 'The Google Forms account could not be reached. Reconnect Google Forms and try again.' },
        { status: 502 }
      );
    }

    let targets: { email: string; firstName: string }[] = [];
    let formTitle = '';
    try {
      const { titles, formTitle: title } = await questionTitles(accessToken, REGISTER_FORM_ID);
      formTitle = title;
      const responses = await listResponses(accessToken, REGISTER_FORM_ID);

      const seen = new Set<string>();
      for (const response of responses) {
        const email = String(
          response.respondentEmail || answerByTitle(response, titles, /e-?mail/i) || ''
        )
          .trim()
          .toLowerCase();
        if (!EMAIL_RE.test(email) || seen.has(email)) continue;
        seen.add(email);
        targets.push({
          email,
          firstName: firstNameOf(answerByTitle(response, titles, /name/i)),
        });
      }
    } catch (error: any) {
      console.error('[sendEventReminder] form read error:', error && error.message);
      return Response.json(
        {
          error:
            'The event registration form could not be read. The connected Google account needs access to the form that owns these signups.',
          details: error && error.message,
        },
        { status: 502 }
      );
    }

    if (targets.length === 0) {
      return Response.json({ error: 'No signups with an email address were found on the form.' }, { status: 400 });
    }

    const batch = targets.slice(0, MAX_PER_RUN);

    // --- The sending account ---
    let sender: { accessToken: string; fromEmail: string };
    try {
      sender = await getGmailSender(base44);
    } catch (error: any) {
      console.error('[sendEventReminder] gmail connection error:', error && error.message);
      return Response.json(
        { error: 'The connected Gmail account could not be reached. Reconnect Gmail and try again.' },
        { status: 502 }
      );
    }

    // --- Which language each recipient reads (registered learners only) ---
    const languageByEmail: Record<string, string> = {};
    try {
      const users = await base44.asServiceRole.entities.User.list();
      for (const u of users || []) {
        if (u && u.email) languageByEmail[String(u.email).toLowerCase()] = learnerLanguage(u);
      }
    } catch (error: any) {
      console.warn('[sendEventReminder] learner language lookup failed:', error && error.message);
    }

    const copyFor = emailCopyCache(base44);

    // --- A single preview copy to one address ---
    const testTo = String(body.test_to || '').trim().toLowerCase();
    if (testTo) {
      if (!EMAIL_RE.test(testTo)) {
        return Response.json({ error: 'test_to must be a valid email address.' }, { status: 400 });
      }
      const copy = await copyFor(languageByEmail[testTo] || 'en', EVENT_REMINDER_COPY);
      await sendTrackedEmail(base44, {
        accessToken: sender.accessToken,
        fromEmail: FROM_ADDRESS,
        to: testTo,
        subject: `[Preview] ${copy.subject}`,
        text: buildEventReminderText({ firstName: 'friend', copy }),
        html: buildEventReminderHtml({ firstName: 'friend', copy }),
        messageType: MESSAGE_TYPE,
      });
      return Response.json({ preview_sent: testTo, sender: FROM_ADDRESS, guest_count: targets.length });
    }

    // --- Admin review before sending ---
    if (body.dry_run === true) {
      return Response.json({
        dry_run: true,
        form: formTitle,
        sender: FROM_ADDRESS,
        mailbox: sender.fromEmail,
        eligible: batch.length,
        remaining_after: Math.max(0, targets.length - batch.length),
        recipients: batch.map((t) => ({
          email: t.email,
          first_name: t.firstName,
          language: languageByEmail[t.email] || 'en',
        })),
      });
    }

    // --- Send, in small batches to keep delivery healthy ---
    let sent = 0;
    let failed = 0;
    const errors: { email: string; error: string }[] = [];

    for (let i = 0; i < batch.length; i += SEND_BATCH) {
      const slice = batch.slice(i, i + SEND_BATCH);
      const results = await Promise.allSettled(
        slice.map(async (recipient) => {
          const copy = await copyFor(languageByEmail[recipient.email] || 'en', EVENT_REMINDER_COPY);
          return sendTrackedEmail(base44, {
            accessToken: sender.accessToken,
            fromEmail: FROM_ADDRESS,
            to: recipient.email,
            subject: copy.subject,
            text: buildEventReminderText({ firstName: recipient.firstName, copy }),
            html: buildEventReminderHtml({ firstName: recipient.firstName, copy }),
            messageType: MESSAGE_TYPE,
          });
        })
      );

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          sent++;
        } else {
          failed++;
          errors.push({
            email: slice[index].email,
            error: result.reason && result.reason.message ? result.reason.message : 'Send failed',
          });
        }
      });
    }

    return Response.json({
      sent,
      failed,
      sender: FROM_ADDRESS,
      mailbox: sender.fromEmail,
      eligible: batch.length,
      remaining_after: Math.max(0, targets.length - batch.length),
      errors,
    });
  } catch (error: any) {
    console.error('[sendEventReminder] error:', error && error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}