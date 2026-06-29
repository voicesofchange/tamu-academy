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
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // Honeypot — silently accept without storing
    if (body.honeypot) {
      return Response.json({ success: true });
    }

    // Server-side validation (mirrors the client)
    const full_name = str(body.full_name, 120);
    const email = str(body.email, 200).toLowerCase();
    const country = str(body.country, 80);
    const inquiry_type = typeof body.inquiry_type === 'string' ? body.inquiry_type : '';
    const message = str(body.message, 2000);

    const errors = {};
    if (!full_name) errors.full_name = 'Full name is required.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email is required.';
    if (!country) errors.country = 'Country is required.';
    if (!INQUIRY_TYPES.includes(inquiry_type)) errors.inquiry_type = 'A valid inquiry type is required.';
    if (message.trim().length < 50) errors.message = 'Message must be at least 50 characters.';
    if (body.privacy_acknowledgment !== true) errors.privacy_acknowledgment = 'Privacy acknowledgment is required.';

    if (Object.keys(errors).length > 0) {
      return Response.json({ success: false, errors }, { status: 400 });
    }

    // Whitelist: only these fields are ever persisted. status is forced to 'new';
    // internal_notes and any client-supplied status are intentionally ignored.
    const programme_interest = PROGRAMME_OPTIONS.includes(body.programme_interest) ? body.programme_interest : undefined;
    const referral_source = REFERRAL_OPTIONS.includes(body.referral_source) ? body.referral_source : undefined;

    const record = {
      full_name,
      email,
      country,
      city_or_community: str(body.city_or_community, 120) || undefined,
      organization: str(body.organization, 200) || undefined,
      role: str(body.role, 120) || undefined,
      inquiry_type,
      programme_interest,
      message,
      referral_source,
      updates_consent: body.updates_consent === true,
      privacy_acknowledgment: true,
      source_page: str(body.source_page, 200) || undefined,
      status: 'new',
    };

    await base44.asServiceRole.entities.ContactInquiry.create(record);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});