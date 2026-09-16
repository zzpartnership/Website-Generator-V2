// Screenshots at 375 and 1440 for design review. Not a check; nothing fails.
// Usage: node scripts/screenshot.mjs <site-dir | url> <out-dir>
// Pack variant pages land in <out-dir>/<name>/<width>.png so they sit beside rationale.md.
import { mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { serve } from '../checks/lib/server.mjs';
import { listPages, distRoot } from '../checks/lib/pages.mjs';
import { launch } from '../checks/lib/browser.mjs';

const [, , target, outDir] = process.argv;
if (!target || !outDir) { console.error('usage: screenshot.mjs <site-dir|url> <out-dir>'); process.exit(2); }

let base, pages, close = async () => {};
if (/^https?:\/\//.test(target)) {
  base = target.replace(/\/$/, '');
  pages = ['/'];
} else {
  const dist = distRoot(resolve(target));
  if (!existsSync(join(dist, 'index.html')) && !existsSync(join(dist, 'pack', 'index.html'))) { console.error('no built output in', target, '— run npm run build first'); process.exit(2); }
  const srv = await serve(dist);
  base = srv.url; close = srv.close; pages = listPages(dist);
}

const browser = await launch();
try {
  for (const path of pages) {
    for (const width of [375, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : 900 }, deviceScaleFactor: 1 });
      await page.goto(base + path, { waitUntil: 'networkidle' });
      // Let scroll-driven work settle and reveal what it reveals.
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(400);
      const m = path.match(/^\/pack\/([^/]+)\/$/);
      const file = m ? join(outDir, m[1], `${width}.png`) : join(outDir, `${(path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '__'))}-${width}.png`);
      mkdirSync(join(file, '..'), { recursive: true });
      await page.screenshot({ path: file, fullPage: true });
      console.log(file);
      await page.close();
    }
  }
} finally {
  await browser.close();
  await close();
}
