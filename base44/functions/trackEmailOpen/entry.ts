import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// 1x1 transparent GIF — returned so the email client renders nothing visible.
const GIF_B64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const pixelBytes = () => Uint8Array.from(atob(GIF_B64), (c) => c.charCodeAt(0));

const pixelResponse = () =>
  new Response(pixelBytes(), {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const token = url.searchParams.get('t');

    if (token) {
      const events = await base44.asServiceRole.entities.EmailOpenEvent.filter({
        tracking_token: token,
      });
      if (events.length > 0) {
        const ev = events[0];
        const now = new Date().toISOString();
        const ua = (req.headers.get('user-agent') || '').slice(0, 300);
        if (ev.opened_at) {
          await base44.asServiceRole.entities.EmailOpenEvent.update(ev.id, {
            open_count: (ev.open_count || 1) + 1,
          });
        } else {
          await base44.asServiceRole.entities.EmailOpenEvent.update(ev.id, {
            opened_at: now,
            open_count: 1,
            user_agent: ua,
          });
        }
      }
    }
    return pixelResponse();
  } catch (error) {
    // Always return the pixel — a broken image would betray the tracking pixel.
    return pixelResponse();
  }
}