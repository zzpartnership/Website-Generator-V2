// No console errors, uncaught exceptions or failed requests on any page.
import { serve } from './server.mjs';
import { listPages, distRoot } from './pages.mjs';
import { launch } from './browser.mjs';

const dist = distRoot(process.argv[2]);
const srv = await serve(dist);
const browser = await launch();
const problems = [];
try {
  for (const path of listPages(dist)) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = [];
    const isAutoFavicon = (url) => /\/favicon\.ico$/.test(url ?? '');
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      const url = m.location()?.url ?? '';
      if (isAutoFavicon(url)) return; // the browser asks for this on its own; a favicon is an advisory item
      errs.push(`console.error: ${m.text()}${url ? `  (${url})` : ''}`);
    });
    page.on('pageerror', (e) => errs.push(`uncaught: ${e.message}`));
    page.on('requestfailed', (r) => errs.push(`request failed: ${r.url()} (${r.failure()?.errorText})`));
    page.on('response', (r) => { if (r.status() >= 400 && r.request().resourceType() !== 'fetch' && !isAutoFavicon(r.url())) errs.push(`${r.status()}: ${r.url()}`); });
    await page.goto(srv.url + path, { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(600);
    await page.close();
    if (errs.length) problems.push({ path, errs });
  }
} finally {
  await browser.close();
  await srv.close();
}
if (problems.length) {
  console.error('console: errors found');
  for (const p of problems) { console.error(`  ${p.path}`); for (const e of p.errs) console.error(`     ${e}`); }
  process.exit(1);
}
console.log('console: clean on every page');
