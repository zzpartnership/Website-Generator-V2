#!/usr/bin/env bash
# Hard stop: the site must install cleanly and build.
# npm ci fails on lockfile drift and peer conflicts, which covers "dependency or version conflict".
set -eu
SITE="$(cd "$1" && pwd)"
cd "$SITE"
if [ -f package-lock.json ]; then
  npm ci --no-audit --no-fund
else
  npm install --no-audit --no-fund
fi
npm run build
test -d dist || { echo "no dist/ after build" >&2; exit 1; }
