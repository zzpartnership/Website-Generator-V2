// Pull pack reactions from Supabase into projects/<client>/reactions.md.
// Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/reactions-pull.mjs <client>
// Appends only rows not already present (tracked by an HTML comment with the row id).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const client = process.argv[2];
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
if (!client) { console.error('usage: reactions-pull.mjs <client>'); process.exit(2); }
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) { console.error('set SUPABASE_URL and SUPABASE_SERVICE_KEY'); process.exit(2); }

const file = join('projects', client, 'reactions.md');
if (!existsSync(file)) { console.error('no', file); process.exit(2); }
let md = readFileSync(file, 'utf8');

const url = `${SUPABASE_URL}/rest/v1/submissions?kind=eq.reaction&project=eq.${encodeURIComponent(client)}&order=created_at.asc&select=id,created_at,payload`;
const res = await fetch(url, { headers: { apikey: SUPABASE_SERVICE_KEY, authorization: `Bearer ${SUPABASE_SERVICE_KEY}` } });
if (!res.ok) { console.error('supabase', res.status, await res.text()); process.exit(1); }
const rows = await res.json();

let added = 0;
for (const row of rows) {
  const marker = `<!-- reaction:${row.id} -->`;
  if (md.includes(marker)) continue;
  const p = row.payload ?? {};
  md += `\n${marker}\nProject: ${client}\nVariant: ${p.variant ?? '?'}\nWhen: ${row.created_at}\nClient liked:    ${p.liked ?? ''}\nClient disliked: ${p.disliked ?? ''}\nLevi's note:     \nChosen:          \n`;
  added++;
}
writeFileSync(file, md);
console.log(`${added} new reaction(s) appended to ${file} (${rows.length} total in Supabase)`);
