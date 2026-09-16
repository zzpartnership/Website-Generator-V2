#!/usr/bin/env bash
# Create projects/<client>/ from the template and projects/<client>/site/ from the starter.
# Usage: scripts/new-project.sh <client-slug>
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLIENT="${1:-}"
if [ -z "$CLIENT" ] || ! [[ "$CLIENT" =~ ^[a-z0-9-]+$ ]]; then
  echo "usage: scripts/new-project.sh <client-slug>   (lowercase, digits, hyphens)" >&2
  exit 2
fi
DEST="$ROOT/projects/$CLIENT"
if [ -e "$DEST" ]; then
  echo "projects/$CLIENT already exists; leaving it alone"
  exit 0
fi
cp -R "$ROOT/projects/_template" "$DEST"
rm -rf "$DEST/site"
mkdir -p "$DEST/site"
(cd "$ROOT/starter" && tar --exclude=node_modules --exclude=dist --exclude=.astro --exclude=.wrangler --exclude=.dev.vars --exclude=package-lock.json -cf - .) | (cd "$DEST/site" && tar -xf -)
# @zz/motion resolves by path; the site is two levels deeper than the starter.
sed -i.bak 's#"file:../library/motion"#"file:../../../library/motion"#' "$DEST/site/package.json" && rm -f "$DEST/site/package.json.bak"
sed -i.bak "s#\"name\": \"zz-site\"#\"name\": \"$CLIENT\"#" "$DEST/site/wrangler.jsonc" && rm -f "$DEST/site/wrangler.jsonc.bak"
printf '{ "slug": "%s" }\n' "$CLIENT" > "$DEST/site/src/project.json"
sed -i.bak "s#<client>#$CLIENT#g" "$DEST"/*.md && rm -f "$DEST"/*.md.bak
echo "created projects/$CLIENT (site copied from starter/)"
