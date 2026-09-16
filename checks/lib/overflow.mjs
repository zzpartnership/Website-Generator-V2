// No horizontal overflow on any page at any width between 375 and 1920.
import { serve } from './server.mjs';
import { listPages, distRoot } from './pages.mjs';
import { launch } from './browser.mjs';

const WIDTHS = [375, 390, 414, 768, 1024, 1280, 1440, 1920];
const dist = distRoot(process.argv[2]);
const srv = await serve(dist);
const browser = await launch();
const problems = [];
try {
  const page = await browser.newPage();
  for (const path of listPages(dist)) {
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(srv.url + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(150);
      const over = await page.evaluate(() => {
        const d = document.documentElement;
        const by = d.scrollWidth - d.clientWidth;
        if (by <= 1) return null;
        // Name the widest offender so the fix is quick.
        let worst = null;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          // Either the box itself pokes past the viewport, or something inside it (a pseudo-element, a transform) widens its scroll area.
          const right = Math.max(r.right, el.scrollWidth > el.clientWidth + 1 ? r.left + el.scrollWidth : 0);
          if (right > d.clientWidth + 1 && (!worst || right > worst.right)) worst = { right, tag: el.tagName.toLowerCase(), cls: el.className?.toString().slice(0, 60) };
        }
        return { by, worst };
      });
      if (over) problems.push({ path, w, ...over });
    }
  }
} finally {
  await browser.close();
  await srv.close();
}
if (problems.length) {
  console.error('overflow: horizontal overflow found');
  for (const p of problems) console.error(`  ${p.path} @ ${p.w}px  by ${p.by}px  ${p.worst ? `<${p.worst.tag} class="${p.worst.cls}">` : ''}`);
  process.exit(1);
}
console.log(`overflow: none at ${WIDTHS.join('/')}`);
