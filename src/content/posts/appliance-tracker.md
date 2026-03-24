---
title: "Building an Appliance Tracker with SvelteKit, Pocket ID, and Supabase"
date: "2026-03-16"
tags: ["svelte", "sveltekit", "supabase", "oidc", "gcp", "github-actions", "self-hosted"]
description: "How a PoC for tracking home appliance lifespans grew into a fully authenticated, cloud-backed SPA deployed on GCS — and every interesting problem I hit along the way."
---

My furnace is 18 years old. I have no idea when the water heater was installed. The refrigerator makes a noise sometimes.

Most people don't think about their appliances until one fails, and then they're scrambling to replace it in a panic — usually at the worst possible time. I wanted a single view of every appliance in my home: when I bought it, when it's likely to die, and what I'd replace it with. A spreadsheet would work, but where's the fun in that?

What started as a quick SvelteKit PoC turned into a fully authenticated, cloud-backed app deployed at [appliances.bruner.family](https://appliances.bruner.family). This post covers how it's built and every interesting problem I hit along the way.

## What the App Does

### The Timeline

The centerpiece is a Chart.js horizontal floating-bar chart. Each appliance is rendered as a bar spanning from its purchase date to its projected end-of-life. A dashed "TODAY" line cuts across the chart so you can instantly see what's past due, what's coming up soon, and what still has years to go.

Color coding keeps the status at a glance:

- **Green** — Good (>3 years remaining)
- **Amber** — Due Soon (1–3 years remaining)
- **Orange** — Replace Soon (&lt;1 year remaining)
- **Red** — Overdue (past expected EOL)

### Stats & Cards

Above the timeline, a row of stat cards summarizes totals: appliances tracked, overdue count, replace-soon count, and total planned replacement cost across all appliances with a replacement plan on file.

Below the timeline, each appliance gets its own card with type, brand, model, purchase date, expected EOL, age, a lifespan progress bar, and any replacement plan (target brand/model, estimated cost, store link, notes). Cards are color-accented to match their timeline status.

### Adding Appliances

A modal form handles add and edit. It pre-fills the expected lifespan from a library of 14 appliance types using industry-average lifespans — refrigerators: 14 years, furnaces: 20 years, and so on. An optional "Replacement Plan" section inside the form lets you record what you'd buy, how much it costs, and where.

### Demo Mode

Unauthenticated visitors can click **"View Demo"** on the login screen — no account required. They get a pre-seeded set of 5 sample appliances with realistic data and replacement plans. Authenticated users start with an empty list and only see their own data.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit + Svelte 4, `adapter-static` |
| Charts | Chart.js 4 (horizontal floating-bar) |
| Auth | `oidc-client-ts` with PKCE flow |
| Identity Provider | **Pocket ID** (self-hosted OIDC) |
| Database | **Supabase** (Postgres + Row Level Security) |
| Hosting | Google Cloud Storage static website |
| CI/CD | GitHub Actions → GCS |

## Authentication: Pocket ID + PKCE

### What is Pocket ID?

[Pocket ID](https://github.com/stonith404/pocket-id) is a lightweight, self-hosted OIDC identity provider. Think of it as a personal Okta — it issues signed JWTs that other services can trust without touching any third-party auth provider. Mine runs on my own infrastructure at `auth.colinbruner.com`.

### The Login Flow

1. User visits the app — if not authenticated, a login card appears with a "Sign In" button (and the "View Demo" escape hatch)
2. Clicking "Sign In" triggers a PKCE authorization redirect to Pocket ID
3. User authenticates with Pocket ID
4. Pocket ID redirects back to `/callback?code=...&state=...&iss=...`
5. `oidc-client-ts` validates the state, exchanges the code, and retrieves the `id_token`
6. The user is dropped into the main app and their appliances load from Supabase

### Why PKCE?

The OIDC client is registered in Pocket ID as a **public client with PKCE** — no client secret. This is the correct pattern for browser-based SPAs. A secret baked into a static JS bundle isn't a secret; PKCE gives you code exchange security without one.

This took one configuration change in Pocket ID — enabling the "public client" flag — to fix an initial `Client id or secret not provided` error from the token endpoint.

### JWT Claims

Pocket ID issues JWTs signed with RS256, containing standard OIDC claims plus a custom `role: authenticated` claim added to the user group. That last one matters: Supabase uses it to determine the Postgres role. Without it, every request hits the `anon` role and gets blocked by RLS.

```json
{
  "sub": "f5de065f-e534-4011-9e60-ec9ab71b536e",
  "iss": "https://auth.colinbruner.com",
  "role": "authenticated",
  "name": "Colin Bruner",
  "email": "code@colinbruner.com",
  "preferred_username": "colin"
}
```

## Data Storage: Supabase + JWT Passthrough

### Why Supabase?

Early versions stored data in `localStorage` — fine for a PoC, but data was stuck in one browser on one device. The key reason I picked Supabase over the alternatives was its **third-party JWT passthrough auth**: you pass the Pocket ID `id_token` directly to Supabase as a bearer token. No second login. No Firebase-style token exchange. Supabase validates the JWT against Pocket ID's JWKS endpoint and trusts it directly.

### Configuring the Auth Bridge

There's no dashboard UI for custom OIDC providers in Supabase — you have to hit the Management API directly:

```bash
POST https://api.supabase.com/v1/projects/{ref}/config/auth/third-party-auth
{ "oidc_issuer_url": "https://auth.colinbruner.com" }
```

Supabase auto-discovers the JWKS endpoint from Pocket ID's OpenID configuration and validates every request's JWT signature against those public keys. No client secret, no service account — just cryptographic proof.

### Row Level Security

The `appliances` table enforces per-user isolation with a single RLS policy:

```sql
CREATE POLICY "users manage own appliances"
  ON appliances FOR ALL
  USING      ((auth.jwt() ->> 'sub') = user_id)
  WITH CHECK ((auth.jwt() ->> 'sub') = user_id);
```

The `sub` claim from the Pocket ID JWT maps directly to `user_id TEXT` in the table. A user cannot read or write another user's rows — enforced at the database, not just the application layer.

### Dual-mode Storage

The app detects at build time whether Supabase is configured via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. If not (local dev without env vars), it falls back to `localStorage`. If yes (production), it uses Supabase. The store interface is identical either way — the rest of the app doesn't know or care which backend is active.

```
Environment               Storage
──────────────────────────────────────────
npm run dev (no vars)     localStorage
npm run dev (vars set)    Supabase
GCS production            Supabase
Demo mode (no user)       localStorage (sample data)
```

## Deployment: Static SPA on GCS

It's a static SPA — no server needed. GCS static website hosting is cheap (essentially free at this traffic level) and fits naturally in a GCP-centric setup.

### The SPA Routing Problem

When a static bucket serves a SPA, all unrecognized paths must fall back to `index.html` for the client-side router to handle. By default, GCS returns raw XML "NoSuchKey" errors for missing paths — not `index.html`. This was the root cause of the OIDC callback failing on first deploy: the browser received `NoSuchKeyThe specified key does not exist.` instead of the app.

The fix:

```bash
gcloud storage buckets update gs://appliances.bruner.family \
  --web-main-page-suffix=index.html \
  --web-error-page=index.html
```

### CI/CD via GitHub Actions

Every push to `main` triggers a build-and-deploy pipeline:

1. `actions/setup-node@v4` with npm cache
2. `npm ci` → `npm run build` (Vite, with `VITE_*` secrets injected as env vars)
3. Authenticate to GCP via Workload Identity Federation — no long-lived service account keys
4. `gcloud storage rsync` build output to the bucket
5. Re-apply the bucket website config (idempotent)

### Version Endpoint

A `version.json` file is written to `static/` during the GHA build step, injecting the git SHA, branch, and build timestamp. After any deploy, you can verify exactly what's live:

```bash
curl https://appliances.bruner.family/version.json
# {"commit": "9b05c96...", "ref": "main", "built_at": "2026-03-16T..."}
```

## Interesting Problems Solved

A few of the more interesting things I hit:

**OIDC callback 404** — Root cause: the GCS bucket wasn't configured as a static website. `--web-error-page=index.html` fixed it. Every SPA deployed to GCS needs this.

**"Client id or secret not provided"** — Root cause: Pocket ID registered the app as a confidential client. SPAs use PKCE with no secret. One checkbox in Pocket ID fixed it.

**Supabase 401s everywhere** — Root cause: third-party auth wasn't configured. There's no dashboard UI for this — a direct Management API call with the Pocket ID issuer URL was required.

**`role: authenticated` missing** — Root cause: Supabase uses the `role` JWT claim to determine the Postgres role. Without it, all requests were treated as `anon` and blocked by RLS. Fixed by adding a custom claim to the Pocket ID user group.

**Sample appliances showing for real users** — Root cause: `load()` always returned `SAMPLE_APPLIANCES` as a fallback. Fixed by returning `[]` for authenticated users and only seeding samples when `userId === null` (demo mode).

**Chart.js blank on load** — Root cause: Svelte's reactive statement called `renderChart()` synchronously when appliance data arrived from Supabase, but the `<canvas>` element hadn't mounted yet (the `{#if}` branch had just switched). Fixed with `await tick()` in `renderChart()` to let Svelte flush DOM updates before Chart.js touches the canvas.

**Partial deploys / 404 on JS assets** — Root cause: `cancel-in-progress: true` in GHA concurrency settings could cancel a mid-flight `rsync`, leaving the bucket in a mixed state — new `index.html` referencing asset hashes that were never fully uploaded. Fixed by setting `cancel-in-progress: false`.

## What's Next

- **Email alerts** — proactive notifications when an appliance is entering the "replace soon" or "overdue" window, so you don't need to remember to check the dashboard
- **Maintenance logs** per appliance — service records, repair history
- **Expanding beyond appliances** — windows, roofing, HVAC systems, and other home components have the same lifecycle problem. The tracker could become a general-purpose home maintenance planner rather than just an appliance list
- Possibly **household sharing** — multiple users, shared item lists

The full source is on [GitHub](https://github.com/colinbruner/appliance-tracker) if you want to poke around. Demo is live at [appliances.bruner.family](https://appliances.bruner.family) if you want to see it without an account.
