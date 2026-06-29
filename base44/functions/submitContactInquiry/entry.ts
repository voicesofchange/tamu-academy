import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const INQUIRY_TYPES = [
  'Prospective Learner',
  'AI Leadership Lab Interest',
  'Educator or Facilitator',
  'School or University',
  'Youth or Community Organization',
  'Institutional Partnership',
  'Funder or Supporter',
  'Media or Interview Inquiry',
  'General Inquiry',
];

const PROGRAMME_OPTIONS = [
  'Tamu Intercultural AI Leadership Lab',
  'Future Tamu Academy Programmes',
  'Learning Resources',
  'Partnership Opportunities',
  'Not Sure Yet',
];

const REFERRAL_OPTIONS = [
  'Search engine',
  'Social media',
  'Friend or colleague',
  'School or university',
  'Youth or community organization',
  'Event or programme',
  'Other',
];

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

Deno.serve(async (req) => {
  try {
    // Request body size limit: reject payloads over 32 KB
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > 32768) {
      console.warn('[submitContactInquiry] Request body too large:', contentLength);
      return Response.json({ success: false, error: 'Request too large.' }, { status: 413 });
    }

    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // Honeypot — silently succeed without storing anything
    if (body.honeypot) {
      console.log('[submitContactInquiry] Honeypot triggered — discarding submission');
      return Response.json({ success: true });
    }

    // Normalise and extract only expected inputs
    const full_name = str(body.full_name, 120);
    const email = str(body.email, 200).toLowerCase();
    const country = str(body.country, 80);
    const inquiry_type = typeof body.inquiry_type === 'string' ? body.inquiry_type : '';
    const rawMessage = typeof body.message === 'string' ? body.message : '';

    // Server-side validation
    const errors = {};
    if (!full_name) errors.full_name = 'Full name is required.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email address is required.';
    if (!country) errors.country = 'Country is required.';
    if (!INQUIRY_TYPES.includes(inquiry_type)) errors.inquiry_type = 'A valid inquiry type is required.';
    if (rawMessage.length > 2000) errors.message = 'Message must not exceed 2,000 characters.';
    else if (rawMessage.trim().length < 50) errors.message = 'Message must be at least 50 characters.';
    if (body.privacy_acknowledgment !== true) errors.privacy_acknowledgment = 'Privacy acknowledgment is required.';

    if (Object.keys(errors).length > 0) {
      console.warn('[submitContactInquiry] Validation failed:', JSON.stringify(errors));
      return Response.json({ success: false, errors }, { status: 400 });
    }

    // Whitelist: only approved fields are ever persisted.
    // status is forced to 'new'; internal_notes is intentionally excluded.
    const programme_interest = PROGRAMME_OPTIONS.includes(body.programme_interest)
      ? body.programme_interest : undefined;
    const referral_source = REFERRAL_OPTIONS.includes(body.referral_source)
      ? body.referral_source : undefined;

    const record = {
      full_name,
      email,
      country,
      city_or_community: str(body.city_or_community, 120) || undefined,
      organization: str(body.organization, 200) || undefined,
      role: str(body.role, 120) || undefined,
      inquiry_type,
      programme_interest,
      message: rawMessage.trim(),
      referral_source,
      updates_consent: body.updates_consent === true,
      privacy_acknowledgment: true,
      source_page: str(body.source_page, 200) || undefined,
      status: 'new',
    };

    await base44.asServiceRole.entities.ContactInquiry.create(record);

    // Return only success — never the stored record or internal fields
    return Response.json({ success: true });

  } catch (error) {
    // Log internally; never expose error details to the caller
    console.error('[submitContactInquiry] Unexpected error:', error.message);
    return Response.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
});