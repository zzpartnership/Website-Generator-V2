// Internal links, assets and CSS urls must resolve inside dist/. --external also HEADs external URLs.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep, posix } from 'node:path';
import { distRoot } from './pages.mjs';

const dist = distRoot(process.argv[2]);
const external = process.argv.includes('--external');
if (!dist || !existsSync(dist)) { console.error('links: dist not found:', dist); process.exit(2); }

const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) { if (n !== '_worker.js') walk(p); continue; }
    if (/\.(html|css)$/.test(n)) files.push(p);
  }
})(dist);

const refs = [];
const attrRe = /\b(?:href|src|poster|data-src)\s*=\s*["']([^"']+)["']/gi;
const srcsetRe = /\bsrcset\s*=\s*["']([^"']+)["']/gi;
const cssUrlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const push = (u) => refs.push({ from: f, url: u.trim() });
  if (f.endsWith('.html')) {
    for (const m of text.matchAll(attrRe)) push(m[1]);
    for (const m of text.matchAll(srcsetRe)) for (const part of m[1].split(',')) push(part.trim().split(/\s+/)[0]);
  }
  for (const m of text.matchAll(cssUrlRe)) push(m[1]);
}

const safeDecode = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
// Fragments (also when percent-encoded inside a data: URI), non-http schemes, and empties are not files.
const skip = (u) => u === '' || /^(#|mailto:|tel:|sms:|javascript:|data:|blob:|about:)/i.test(u) || /^#/.test(safeDecode(u));
const isExternal = (u) => /^(https?:)?\/\//i.test(u);

function resolves(from, url) {
  const clean = url.split('#')[0].split('?')[0];
  if (clean === '') return true;
  let target;
  if (clean.startsWith('/')) target = join(dist, clean);
  else {
    const base = dirname(from);
    target = join(base, clean);
  }
  if (existsSync(target)) {
    if (statSync(target).isDirectory()) return existsSync(join(target, 'index.html'));
    return true;
  }
  return existsSync(target + '.html') || existsSync(target + '/index.html');
}

const broken = [];
const externals = new Set();
for (const r of refs) {
  if (skip(r.url)) continue;
  if (isExternal(r.url)) { externals.add(r.url.startsWith('//') ? 'https:' + r.url : r.url); continue; }
  if (!resolves(r.from, r.url)) broken.push(r);
}

if (external) {
  for (const u of externals) {
    try {
      const res = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
      if (res.status >= 400) broken.push({ from: '(external)', url: `${u} → ${res.status}` });
    } catch (e) {
      broken.push({ from: '(external)', url: `${u} → ${e.message}` });
    }
  }
}

const rel = (p) => relative(dist, p).split(sep).join(posix.sep);
if (broken.length) {
  console.error(`links: ${broken.length} broken reference(s)`);
  for (const b of broken) console.error(`  ${b.from === '(external)' ? b.from : rel(b.from)}  →  ${b.url}`);
  process.exit(1);
}
console.log(`links: ${refs.length} references checked across ${files.length} files${external ? `, ${externals.size} external` : ''}`);
