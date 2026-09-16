// Headless Chromium via the Playwright library (not the MCP).
// CHROME_PATH overrides. Falls back to a pre-installed Playwright browser, then to the bundled one.
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

export async function launch() {
  const candidates = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium'].filter(Boolean);
  const executablePath = candidates.find((p) => existsSync(p));
  return chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
}
