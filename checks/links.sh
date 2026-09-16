#!/usr/bin/env bash
# Hard stop: every internal href, src, srcset and CSS url() must resolve inside dist/.
# Pass --external to also HEAD every external link.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$1" && pwd)"; shift
node "$HERE/lib/links.mjs" "$SITE/dist" "$@"
