// The primary contact path works. Objective checks only.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { listPages, distRoot } from './pages.mjs';

const site = resolve(process.argv[2]);
const dist = distRoot(site);
const factsPath = join(site, '..', 'facts.md');

if (!existsSync(factsPath)) {
  console.log('conversion: no facts.md beside this site (bare starter). Nothing to verify.');
  process.exit(0);
}

// ## Contact block in facts.md: phone:, booking:, email:
const facts = readFileSync(factsPath, 'utf8');
const contact = {};
const block = facts.split(/^## Contact\s*$/m)[1]?.split(/^## /m)[0] ?? '';
for (const line of block.split('\n')) {
  const m = line.match(/^\s*(phone|booking|email)\s*:\s*(.+?)\s*$/i);
  if (m) contact[m[1].toLowerCase()] = m[2];
}
const digits = (s) => s.replace(/\D/g, '').replace(/^61/, '0');

const html = {};
for (const path of listPages(dist)) {
  const file = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path + '.html');
  html[path] = readFileSync(existsSync(file) ? file : join(dist, path, 'index.html'), 'utf8');
}

const problems = [];
for (const [path, text] of Object.entries(html)) {
  if (path === '/pack/') continue; // the review page, not a site page
  if (!/\bdata-cta\b/.test(text)) problems.push(`${path}: no element with data-cta`);
  for (const m of text.matchAll(/href=["']tel:([^"']+)["']/g)) {
    if (!contact.phone) { problems.push(`${path}: tel: link but facts.md has no phone`); break; }
    if (digits(m[1]) !== digits(contact.phone)) problems.push(`${path}: tel:${m[1]} does not match facts.md phone ${contact.phone}`);
  }
  if (contact.phone) {
    const shown = text.replace(/<[^>]+>/g, ' ');
    const want = digits(contact.phone);
    // A phone number is 8–11 digits separated by at most one space, dash, dot or bracket each. Never across a line break.
    const found = [...shown.matchAll(/\+?\d(?:[ .()-]?\d){7,10}/g)].map((x) => digits(x[0]));
    for (const f of found) if (f.length === 10 && f.startsWith('0') && f !== want) problems.push(`${path}: phone number shown as ${f} but facts.md says ${want}`);
  }
}

if (contact.booking) {
  const anyLink = Object.values(html).some((t) => t.includes(contact.booking));
  if (!anyLink) problems.push(`no page links to the booking URL in facts.md (${contact.booking})`);
  try {
    const res = await fetch(contact.booking, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    if (res.status >= 400) problems.push(`booking URL answers ${res.status}: ${contact.booking}`);
  } catch (e) {
    problems.push(`booking URL unreachable: ${contact.booking} (${e.message})`);
  }
}

// Round trip through the deployed submit route, when a deploy exists.
if (process.env.SITE_URL) {
  try {
    const res = await fetch(new URL('/api/submit', process.env.SITE_URL), {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind: 'test', name: 'conversion check', message: 'round trip', website: '' }),
      signal: AbortSignal.timeout(15000),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.ok !== true) problems.push(`submit route did not round-trip: ${res.status} ${JSON.stringify(body)}`);
  } catch (e) {
    problems.push(`submit route unreachable at ${process.env.SITE_URL}/api/submit (${e.message})`);
  }
} else {
  console.log('conversion: SITE_URL not set, form round-trip not exercised. Set SITE_URL to the deployed origin to include it.');
}

if (problems.length) {
  console.error('conversion: primary contact path broken');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`conversion: CTA on every page${contact.phone ? ', tel: matches facts.md' : ''}${contact.booking ? ', booking link answers' : ''}`);
