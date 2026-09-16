#!/usr/bin/env bash
# Every hard stop, in order. Stops on the first failure.
# Usage: checks/all.sh <site-dir>
# These are the only things in the workspace that block. Everything else is advisory.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="${1:-}"
if [ -z "$SITE" ] || [ ! -f "$SITE/package.json" ]; then
  echo "usage: checks/all.sh <site-dir>   (a directory containing an Astro package.json)" >&2
  exit 2
fi
SITE="$(cd "$SITE" && pwd)"

if [ ! -d "$HERE/node_modules" ]; then
  echo "── installing check dependencies"
  (cd "$HERE" && npm ci --no-audit --no-fund --silent 2>/dev/null || npm install --no-audit --no-fund --silent)
fi

run() {
  local name="$1"; shift
  echo
  echo "━━ $name"
  if "$@"; then
    echo "   ok"
  else
    echo
    echo "✖ HARD STOP: $name failed. Fix it before anything else." >&2
    exit 1
  fi
}

run "build"      "$HERE/build.sh"      "$SITE"
run "links"      "$HERE/links.sh"      "$SITE"
run "console"    "$HERE/console.sh"    "$SITE"
run "overflow"   "$HERE/overflow.sh"   "$SITE"
run "conversion" "$HERE/conversion.sh" "$SITE"

echo
echo "✔ all hard stops passed for $SITE"
