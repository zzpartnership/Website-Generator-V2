#!/usr/bin/env bash
# Hard stop: no console errors, no uncaught exceptions, no failed requests on any page.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$1" && pwd)"
node "$HERE/lib/console.mjs" "$SITE/dist"
