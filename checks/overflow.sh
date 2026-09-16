#!/usr/bin/env bash
# Hard stop: no horizontal overflow on any page at any width from 375 to 1920.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$1" && pwd)"
node "$HERE/lib/overflow.mjs" "$SITE/dist"
