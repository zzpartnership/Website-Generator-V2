export const prerender = false;

import type { APIRoute } from 'astro';
import { RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY, NOTIFY_EMAIL, FROM_EMAIL } from 'astro:env/server';
import project from '../../project.json';

// One route for site forms, pack reactions and the conversion check's round trip.
// A failure returns a non-2xx with a message. Silent loss is not possible from this route.

type Kind = 'form' | 'reaction' | 'test';

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

async function readBody(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) return (await request.json()) as Record<string, string>;
  const fd = await request.formData();
  return Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
}

async function logRow(kind: Kind, payload: Record<string, string>): Promise<string> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) throw new Error('Supabase is not configured');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'content-type': 'application/json',
      prefer: 'return=representation',
    },
    body: JSON.stringify({ project: project.slug, kind, payload }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const [row] = (await res.json()) as { id: string }[];
  return row.id;
}

async function email(kind: Kind, payload: Record<string, string>, id: string): Promise<void> {
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) throw new Error('Resend is not configured');
  const lines = Object.entries(payload)
    .filter(([k]) => k !== 'website')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const subject =
    kind === 'reaction'
      ? `[${project.slug}] pack reaction: ${payload.variant ?? '?'}`
      : `[${project.slug}] enquiry from ${payload.name ?? payload.email ?? 'site'}`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      reply_to: payload.email || undefined,
      subject,
      text: `${lines}\n\nsupabase id: ${id}`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await readBody(request);
  } catch {
    return json(400, { ok: false, error: 'Could not read the submission' });
  }

  // Honeypot: bots fill "website". Say ok, do nothing.
  if (body.website) return json(200, { ok: true, id: null });

  const kind = (['form', 'reaction', 'test'] as Kind[]).includes(body.kind as Kind) ? (body.kind as Kind) : 'form';
  const { kind: _k, ...payload } = body;

  try {
    const id = await logRow(kind, payload);
    if (kind !== 'test') await email(kind, payload, id);
    return json(200, { ok: true, id });
  } catch (err) {
    console.error('submit failed', err);
    return json(500, { ok: false, error: (err as Error).message });
  }
};

export const GET: APIRoute = async () => json(405, { ok: false, error: 'POST only' });
