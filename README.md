# Brain Ring (Bringo Activities)

Landing page for the Brain Ring intellectual quiz game company in Bucharest, Romania.

**Live:** https://www.bring-o.net (apex `bring-o.net` 307-redirects to `www`)
**Repo:** [bringoGame/BringO](https://github.com/bringoGame/BringO)

## Tech Stack

- **Framework:** [Astro](https://astro.build) v4 — `output: 'hybrid'`
- **Adapter:** [@astrojs/vercel](https://www.npmjs.com/package/@astrojs/vercel) v7 (serverless) — emits `nodejs20.x` Vercel Function for `/api/contact`
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v3
- **Database:** Supabase Postgres (transaction pooler) — used by the contact form only
- **Languages:** Russian (default at `/`), English (`/en/`), Romanian (`/ro/`)
- **Hosting:** Vercel (auto-deploy from `main` branch)
- **DNS / Mail:** Cloudflare (DNS-only, gray cloud) + privateemail.com (mail)

## Project Structure

```
Dashka/
├── src/
│   ├── components/        # 12 Astro components (sections of the page)
│   ├── i18n/              # ui.ts (translations) + utils.ts
│   ├── layouts/Layout.astro   # Base layout, SEO meta, JSON-LD
│   ├── pages/
│   │   ├── index.astro    # Russian (default at /)
│   │   ├── en/index.astro
│   │   ├── ro/index.astro
│   │   ├── 404.astro
│   │   └── api/contact.ts # POST → Postgres (server-rendered)
│   └── styles/global.css
├── public/
│   ├── images/            # All static images (served by Vercel edge)
│   ├── robots.txt
│   ├── llms.txt
│   └── favicon.svg
├── docs/
│   ├── DESIGN_GUIDE.md
│   └── superpowers/       # Historical specs/plans (R2 CDN — superseded)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json           # engines.node = 20.x (required, see Infra section)
```

## Local Development

```bash
npm install
npm run dev          # → http://localhost:4321
npm run build        # → .vercel/output/ (Vercel-format build artifact)
npm run preview      # serve the build locally
```

## Environment Variables

| Name | Required | Used by | Purpose |
|------|----------|---------|---------|
| `DATABASE_URL` | optional | `src/pages/api/contact.ts` | Postgres connection string for contact form. If unset, the form gracefully falls back to `console.log` and returns success — site still works. |

**Production value** lives in **Vercel project Settings → Environment Variables** (set in the Vercel dashboard, not committed). The connection string is a Supabase pooler URL on port 6543 (transaction mode — required for serverless).

**Schema** for the `contacts` table:

```sql
CREATE TABLE contacts (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## i18n

All copy lives in `src/i18n/ui.ts`. Three languages with shared key structure:

| Language | URL prefix | Default |
|----------|------------|---------|
| Russian  | `/`        | ✅ Yes |
| English  | `/en/`     | No |
| Romanian | `/ro/`     | No |

To edit translations: edit `src/i18n/ui.ts`.
To add a language: add an entry, create `src/pages/{lang}/index.astro`, update `hreflang` in `Layout.astro`.

## SEO

- XML sitemap with hreflang (`/sitemap-index.xml`)
- Canonical tags + Open Graph + Twitter Card meta per language
- JSON-LD: `Organization`, `WebSite`, `LocalBusiness`, `Product`, `FAQPage`
- `robots.txt` allows all crawlers including AI bots
- `llms.txt` for AI search engine discoverability
- Geo meta tags for Bucharest, Romania

## Design System

See **[docs/DESIGN_GUIDE.md](docs/DESIGN_GUIDE.md)** — color palette, typography, spacing, glass cards, button classes, anti-patterns.

Any agent or developer adding new components should read this first to keep the visual language consistent.

## Deployment

**Auto-deploy is on:** every push to `main` triggers Vercel to build and deploy production.

```bash
git push origin main   # Vercel rebuilds → www.bring-o.net updates in ~1 min
```

Manual deploy is not needed and not recommended (would skip GitHub→Vercel sync state).

To deploy a feature branch as a preview without touching prod, push the branch — Vercel auto-creates a `bring-o-git-<branch>-bringogames-projects.vercel.app` preview URL.

## Infrastructure & Accounts

> 🔑 **Master login: `Bringo2025game@gmail.com`** (Google account).
> All three platforms below authenticate via Google SSO using this account. There is no separate password to remember for any of them.

⚠️ **Security note:** because this Google account is a single point of failure for the whole stack (GitHub + Vercel + Cloudflare), it should have a strong unique password and 2FA enabled on the Google account itself.

### Cloudflare

- **Account:** `Bringo2025game@gmail.com's Account`
- **Account ID:** `7f72fb3c0e0c81bef11dbeed6d9d4293`
- **Zone:** `bring-o.net`
  - **Zone ID:** `1689c6321c2b42fa8cac1f61dd347023`
  - **Status:** active
  - **Nameservers:** `crystal.ns.cloudflare.com`, `jarred.ns.cloudflare.com`
- **DNS records (current state):**
  | Type | Name | Value | Proxy |
  |------|------|-------|-------|
  | A | `bring-o.net` | `76.76.21.21` (Vercel) | DNS-only |
  | CNAME | `www.bring-o.net` | `2f84120e03ab37c7.vercel-dns-017.com` (Vercel) | DNS-only |
  | MX | `bring-o.net` | `mx1.privateemail.com`, `mx2.privateemail.com` | — |
  | CNAME | `mail`, `autoconfig`, `autodiscover` | `privateemail.com` | proxied |
  | TXT | `bring-o.net` | `v=spf1 include:spf.privateemail.com ~all` | — |
  | SRV | `_autodiscover._tcp` | mail config | — |

  **Do not touch the mail records** (MX / SPF / autoconfig / autodiscover / mail.bring-o.net / SRV). Mail is handled by privateemail.com — outside this stack.

- **What lives in Cloudflare:** DNS only. No Workers, no R2, no Pages, no Cloudflare-managed TLS for `bring-o.net` (Vercel issues those certs since DNS is gray-cloud / unproxied).

### Vercel

- **Team:** `bringogames-projects`
  - **Team ID:** `team_V1guyFcwyFcQ2SAWmlVcsvtV`
- **Project:** `bring-o`
  - **Project ID:** `prj_mKpF4QU56xhLOGsFjnnoHQ82vbSv`
  - **URL:** https://vercel.com/bringogames-projects/bring-o
  - **Framework preset:** Astro (auto-detected)
  - **Production branch:** `main`
  - **Custom domains:**
    - `www.bring-o.net` → production
    - `bring-o.net` → 307 redirect to `www.bring-o.net`
  - **Auto-generated previews:** `bring-o.vercel.app`, `bring-o-git-<branch>-bringogames-projects.vercel.app`
- **Function runtime:** `nodejs20.x` (forced via `engines.node` in `package.json` — see "Why engines.node" below).
- **TLS:** Vercel auto-issues + renews Let's Encrypt certs.

### GitHub

- **Org:** `bringoGame`
- **Repo:** [bringoGame/BringO](https://github.com/bringoGame/BringO) (public)
- **Default branch:** `main`
- **Branches in flight:**
  - `main` — production. Auto-deploys to Vercel on push.
  - `feat/vercel-migration` — adapter swap commits, already merged into `main`. Safe to delete.
- **Vercel GitHub integration:** authorized via the Vercel GitHub App on this repo. Pushes trigger webhook → Vercel build.

### Database (Supabase)

- **Provider:** Supabase, region `aws-1-eu-west-1`
- **Auth:** separate from the Google SSO account — managed via the Supabase dashboard. Login via whatever the user set up there.
- **Connection:** pooler hostname on **port 6543** (transaction mode — required for Vercel Functions). Direct port 5432 will work locally but not from serverless.
- **Used by:** `src/pages/api/contact.ts` — INSERTs form submissions into the `contacts` table.

### Mail (privateemail.com / Namecheap)

- Managed outside this stack. MX/SPF/autoconfig records on Cloudflare point at privateemail.com.
- Don't touch. Treat as read-only infrastructure.

### Azure (decommissioned)

The site previously ran on Azure App Service `bringo-web` in resource group `bringo-rg`. The whole resource group was deleted as part of the Vercel migration (2026-05-09). No Azure resources remain in scope.

The Azure CLI on this machine is logged into a different account (`mihai.moglan@sengenergy.com`) — that's a separate context, not related to bringo.

## Why `engines.node = "20.x"`?

`@astrojs/vercel@7.x` writes the function runtime to the build output by introspecting the build-env Node version. Vercel's default Node version is `24.x`, which the v7 adapter doesn't recognize, so it falls back to `nodejs18.x` — which Vercel now rejects.

Pinning `engines.node` to `20.x` in `package.json` makes Vercel's build use Node 20, the adapter emits `nodejs20.x`, and the deploy passes.

When upgrading to Astro 5, also bump `@astrojs/vercel` to v8+ (which has correct Node 22/24 mappings) and the pin can be relaxed.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Vercel build fails with `Serverless Functions contain an invalid "runtime"` | `engines.node` removed or set wrong | Restore `"engines": { "node": "20.x" }` in `package.json` |
| Contact form returns 500 | `DATABASE_URL` set but DB unreachable / wrong connection string | Check Vercel env var; verify Supabase pooler is up |
| Contact form returns 200 but no row in DB | `DATABASE_URL` is unset (graceful fallback) | Set `DATABASE_URL` in Vercel project env |
| Site shows old content after a push | Vercel deploy still running OR browser/CF cache | Check https://vercel.com/bringogames-projects/bring-o/deployments; hard refresh |
| `bring-o.net` (apex) not redirecting | Domain config in Vercel got changed | Vercel project Settings → Domains → ensure `bring-o.net` redirects to `www.bring-o.net` (307) |

## For future Claude Code sessions

This project's infrastructure can be driven through MCPs already configured in Claude Code (user scope, OAuthed against `Bringo2025game@gmail.com`):

- **Cloudflare MCP** — `https://mcp.cloudflare.com/mcp`
  - Use `mcp__cloudflare__execute` with raw API calls for DNS edits.
  - Account auto-detected: `7f72fb3c0e0c81bef11dbeed6d9d4293`.
- **Vercel MCP** — `https://mcp.vercel.com`
  - Read-only for project state (`get_project`, `list_deployments`, `get_deployment_build_logs`).
  - Cannot add domains or set env vars — those need the Vercel dashboard.

**Useful starting points:**

- Local working directory: `C:/Users/crist/Desktop/Dashka` (Windows; in this user's setup).
- For DNS work: zone ID `1689c6321c2b42fa8cac1f61dd347023`, Cloudflare account ID `7f72fb3c0e0c81bef11dbeed6d9d4293`.
- For Vercel work: team ID `team_V1guyFcwyFcQ2SAWmlVcsvtV`, project ID `prj_mKpF4QU56xhLOGsFjnnoHQ82vbSv`.
- The Supabase `DATABASE_URL` is **not in this repo**. To retrieve it: it's stored in Vercel project env (after the migration was completed) — read it from there.

**Decisions on the record (documented but not auto-applied):**

- ❌ R2 CDN was explored but abandoned — see `docs/superpowers/specs/2026-05-08-r2-static-asset-cdn-design.md` (marked superseded). Vercel's edge serves `public/` adequately for this site's traffic.
- ✅ Vercel-native CDN was the chosen path: zero infra, $0/month.
- ✅ Astro adapter pinned to `@astrojs/vercel@7.x` because the project is on Astro 4 (v8+ requires Astro 5).

## Contact

- Email: info@bring-o.net
- Instagram: [@bringo_activities](https://www.instagram.com/bringo_activities)
- Telegram: [@bring_O](https://t.me/bring_O)
- Location: Bucharest, Romania
