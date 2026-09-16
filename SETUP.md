# Setup

One-time steps to get from a fresh clone to a test website on a live URL. Do them in order. Each takes minutes. `scripts/doctor.sh` tells you which are done.

## 1. Machine

- **Node 22.12 or newer.** `node --version`. Install from nodejs.org or `brew install node@22`.
- **Chrome or Chromium** on the machine for the console and overflow checks and screenshots. Chrome is found automatically on macOS. Anywhere else, set `CHROME_PATH` to the binary. If you have neither, `cd checks && npx playwright install chromium` downloads one.
- **Claude Code** in VS Code, signed in.
- Clone this repo and open it in VS Code. The repo root is the workspace.

```
cd checks && npm install && cd ..
cd starter && npm install && cd ..
```

## 2. Cloudflare (hosting)

- A Cloudflare account with Workers enabled (the free tier is enough for a test site).
- `cd starter && npx wrangler login` once. It opens a browser and stores a token on the machine.
- Nothing else. Each project site deploys with `npm run deploy` from its `site/` folder and gets a `*.workers.dev` URL immediately. Custom domains are added in the Cloudflare dashboard under the Worker after launch.

## 3. Supabase (form and reaction log)

- Create one project at supabase.com. One project serves every site.
- Open the SQL editor and run `starter/supabase.sql`. That creates the single `submissions` table.
- From Project Settings → API copy the **project URL** and the **service_role key**. The service key stays on the Worker and in your shell; it never goes in a page.

## 4. Resend (email on every submission)

- Create an account at resend.com. Add and verify the sending domain (`zzpartnership.com.au` or whichever you send from). Until a domain is verified Resend only delivers to your own address, which is fine for the test.
- Create an API key.

## 5. Secrets

Per site, from its `site/` folder, after the first `npm run deploy`:

```
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_KEY
npx wrangler secret put NOTIFY_EMAIL
```

For local `npm run preview`, copy `.dev.vars.example` to `.dev.vars` in the site and fill it in. `.dev.vars` is git-ignored.

For `scripts/reactions-pull.mjs` and the conversion check's round trip, export in your shell (or a `.env` you source):

```
export SUPABASE_URL=...
export SUPABASE_SERVICE_KEY=...
export SITE_URL=https://<site>.<account>.workers.dev
```

## 6. Plugins

`.claude/settings.json` lists the plugins the agents call. Register their marketplaces once on this machine with `/plugin marketplace add <owner/repo>` using the same sources as your existing user-scoped installs (`~/.claude/settings.json` on your machine lists them). If a marketplace name in `.claude/settings.json` does not match yours, edit it to match. The agents work without the plugins; they just do less.

## 7. Verify

```
scripts/doctor.sh
checks/all.sh starter
```

Both green means the machine is ready.

## The test website, start to finish

1. Put whatever you have for the client in a folder anywhere on disk. A call transcript, an email, photos, their old site URL in a text file. Anything.
2. In Claude Code: `/start <client-slug> <path-to-that-folder>`.
3. `/pack <client-slug>`. Six variants build in parallel. Pick four when asked.
4. `cd projects/<client-slug>/site && npm run deploy`. Then set the four secrets above once.
5. Send the client `https://<site>.<account>.workers.dev/pack`. Open it on your own phone first.
6. Reactions arrive by email. `node scripts/reactions-pull.mjs <client-slug>` appends them to `reactions.md`.
7. `/build <client-slug> <variant>`, then `/review`, then `/triage`. Deploy again.
8. `SITE_URL=https://... checks/all.sh projects/<client-slug>/site` runs the full hard-stop set including the form round trip.
9. After launch, the Librarian checklist at the bottom of `library/INDEX.md`.

## What deploys to a custom domain

In the Cloudflare dashboard: Workers & Pages → the site's Worker → Settings → Domains & Routes → add the client's domain. DNS has to be on Cloudflare for that domain, which is the usual retainer arrangement.
