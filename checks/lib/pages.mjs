// List every HTML page in a dist/ as a URL path.
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export function listPages(dist, { includePackIndex = true } = {}) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) { if (name !== '_worker.js') walk(p); continue; }
      if (!name.endsWith('.html')) continue;
      let rel = '/' + relative(dist, p).split(sep).join('/');
      rel = rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      if (rel === '/404') continue;
      if (!includePackIndex && rel === '/pack/') continue;
      out.push(rel);
    }
  };
  walk(dist);
  return out.sort();
}

/** The static output root. Astro + Cloudflare writes dist/client and dist/server; plain builds write dist/. */
export function distRoot(distOrSite) {
  const candidates = [join(distOrSite, 'dist', 'client'), join(distOrSite, 'client'), join(distOrSite, 'dist'), distOrSite];
  return candidates.find((c) => existsSync(join(c, 'index.html')) || existsSync(join(c, 'pack', 'index.html'))) ?? distOrSite;
}
