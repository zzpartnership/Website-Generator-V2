#!/usr/bin/env bash
# Preflight. Says what is ready and what is missing. Changes nothing.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ok()   { printf '  \033[32m✔\033[0m %s\n' "$1"; }
miss() { printf '  \033[31m✖\033[0m %s\n' "$1"; MISSING=1; }
note() { printf '  \033[33m•\033[0m %s\n' "$1"; }
MISSING=0

echo "Machine"
if command -v node >/dev/null 2>&1; then
  V="$(node --version | sed 's/^v//')"
  MAJ="${V%%.*}"; REST="${V#*.}"; MIN="${REST%%.*}"
  if [ "$MAJ" -gt 22 ] || { [ "$MAJ" -eq 22 ] && [ "$MIN" -ge 12 ]; }; then ok "node $V"; else miss "node $V (need 22.12 or newer)"; fi
else miss "node not found"; fi

CHROME=""
for c in "$CHROME_PATH" "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/Applications/Chromium.app/Contents/MacOS/Chromium" "$(command -v google-chrome 2>/dev/null)" "$(command -v chromium 2>/dev/null)" "$(command -v chromium-browser 2>/dev/null)" "/opt/pw-browsers/chromium"; do
  if [ -n "$c" ] && [ -x "$c" ]; then CHROME="$c"; break; fi
done
if [ -n "$CHROME" ]; then ok "browser: $CHROME"
elif ls "$ROOT/checks/node_modules/playwright" >/dev/null 2>&1 && ls "${PLAYWRIGHT_BROWSERS_PATH:-$HOME/.cache/ms-playwright}" 2>/dev/null | grep -q chromium; then ok "browser: playwright chromium"
else miss "no Chrome/Chromium found. Set CHROME_PATH, or: cd checks && npx playwright install chromium"; fi

[ -d "$ROOT/checks/node_modules" ] && ok "checks dependencies installed" || miss "checks dependencies: cd checks && npm install"
[ -d "$ROOT/starter/node_modules" ] && ok "starter dependencies installed" || miss "starter dependencies: cd starter && npm install"

echo "Cloudflare"
if [ -x "$ROOT/starter/node_modules/.bin/wrangler" ]; then
  if (cd "$ROOT/starter" && ./node_modules/.bin/wrangler whoami 2>/dev/null | grep -q 'You are logged in'); then ok "wrangler logged in"; else miss "wrangler not logged in: cd starter && npx wrangler login"; fi
else note "wrangler not installed yet (comes with starter dependencies)"; fi

echo "Secrets (shell environment, for scripts and the round-trip check)"
for v in SUPABASE_URL SUPABASE_SERVICE_KEY; do
  if [ -n "${!v:-}" ]; then ok "$v set"; else note "$v not set in this shell (needed for reactions-pull and the form round trip)"; fi
done
[ -n "${SITE_URL:-}" ] && ok "SITE_URL set" || note "SITE_URL not set (set to the deployed origin to include the form round trip in checks)"

echo "Plugins"
if [ -f "$HOME/.claude/settings.json" ] && grep -q '"enabledPlugins"' "$HOME/.claude/settings.json"; then ok "user-scoped plugins found in ~/.claude/settings.json; match marketplace names in .claude/settings.json"; else note "no user-scoped plugins found; see SETUP.md step 6"; fi

echo
if [ "$MISSING" = 0 ]; then echo "Ready. Next: checks/all.sh starter, then /start <client> <path>."; else echo "Fix the ✖ items above, then run this again."; exit 1; fi
