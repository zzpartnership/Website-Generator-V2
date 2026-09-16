#!/usr/bin/env bash
# Hard stop: the primary contact path works.
#   every tel: matches the phone in facts.md
#   every booking link matches facts.md and answers
#   every page has at least one [data-cta]
#   the submit route round-trips when SITE_URL is set
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$1" && pwd)"
node "$HERE/lib/conversion.mjs" "$SITE"
