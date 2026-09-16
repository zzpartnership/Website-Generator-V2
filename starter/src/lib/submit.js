/**
 * Post a form (or a plain object) to /api/submit as JSON.
 * Returns { ok, id } or throws with the server's message, so a failure is never silent.
 * @param {HTMLFormElement|Record<string, any>} source
 * @param {{ kind?: 'form'|'reaction' }} [opts]
 */
export async function submit(source, opts = {}) {
  const data = source instanceof HTMLFormElement ? Object.fromEntries(new FormData(source).entries()) : { ...source };
  if (opts.kind) data.kind = opts.kind;
  if (!data.kind) data.kind = 'form';
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.ok !== true) throw new Error(body.error || `Submit failed (${res.status})`);
  return body;
}
