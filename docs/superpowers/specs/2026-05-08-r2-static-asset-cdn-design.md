# Static Asset CDN — Cloudflare R2

**Date:** 2026-05-08
**Status:** Approved (pending user review of this written spec)
**Project:** brain-ring (Astro 4, `@astrojs/node`)

## Goals

1. **Performance / global CDN** — serve images and (future) video from Cloudflare's edge with HTTP/3, immutable caching, anycast.
2. **Cost / egress** — eliminate per-GB egress charges by hosting on Cloudflare R2 (free egress at any volume).

## Non-goals (deferred)

- On-the-fly image resize (Cloudflare Images — not needed; designer supplies exact dimensions).
- Adaptive streaming / HLS / DASH (Cloudflare Stream — not needed for landing-page hero loops).
- DRM, signed URLs, view analytics on video.
- User-uploaded media. This pipeline is for designer-supplied static assets only.
- Auto-upload on git push. Manual `npm run cdn:sync` until friction demands automation.

## Architecture

```
┌──────────────────────────┐                ┌─────────────────────┐
│  Astro app               │                │  Cloudflare R2      │
│  (dev: localhost)        │                │  bucket: bringo-cdn │
│                          │                │                     │
│  src/lib/cdn.ts          │                │  ├── images/        │
│    cdnAsset(name)        │                │  └── videos/        │
│         │                │                └──────────┬──────────┘
│         ▼                │                           │
│  PUBLIC_CDN_BASE unset?  │                           │
│    yes → /images/x.png   │   public via custom hostname
│    no  → ${BASE}/<hash>  │                           │
└──────────────────────────┘                           ▼
                                          https://cdn.bring-o.net/...
                                          (Cloudflare edge, HTTP/3,
                                           immutable cache, free egress)
```

Single bucket (`bringo-cdn`) with two prefixes (`images/`, `videos/`). One custom hostname (`cdn.bring-o.net`). One Astro helper (`cdnAsset`). One manifest file (`src/cdn-manifest.json`).

## Components

### 1. R2 bucket

- **Name:** `bringo-cdn`
- **Location hint:** EEUR (Europe — closest to current user base; Cloudflare still serves globally from edge cache).
- **Public access:** via custom domain only (no `r2.dev` URL exposed).
- **Custom domain:** `cdn.bring-o.net` — added through R2 dashboard "Custom Domains". Cloudflare auto-creates the CNAME and TLS cert in the `bring-o.net` zone (already on this account).
- **Default object metadata** for all uploads:
  - `Cache-Control: public, max-age=31536000, immutable`
  - `Content-Type` set per file extension at upload time

### 2. Upload script — `scripts/cdn-sync.ts`

Plain TypeScript run via `tsx` (already viable; no new bundler needed). One npm script: `npm run cdn:sync`.

**Algorithm:**
1. Walk `public/images/` and `public/videos/` (created when first video lands).
2. For each file matching the migration list (see Migration section), compute `sha256(contents)` and take the first 8 hex chars as the version stamp.
3. Build the R2 object key: `<prefix>/<basename>.<hash>.<ext>` — e.g. `images/hero-main.a1b2c3d4.png`.
4. If the object key does not already exist in the bucket, upload via `wrangler r2 object put bringo-cdn/<key> --file=<localpath> --content-type=<mime> --remote`. Wrangler reads `CLOUDFLARE_API_TOKEN` from env. (Bandwidth: only the first sync is heavy; future syncs upload only changed files.)
5. Write `src/cdn-manifest.json` mapping logical name → hashed key:
   ```json
   {
     "images/hero-main.png": "images/hero-main.a1b2c3d4.png",
     "videos/hero-loop.mp4": "videos/hero-loop.f4e5d6c7.mp4"
   }
   ```
6. For video files, run a precondition lint (see Encoding rules below). Fail loud if not satisfied.

**Idempotency:** rerunning with no asset changes produces no uploads and a byte-identical manifest. Safe to commit the manifest.

### 3. Astro helper — `src/lib/cdn.ts`

```ts
import manifest from "../cdn-manifest.json";

const BASE = import.meta.env.PUBLIC_CDN_BASE ?? "";

export function cdnAsset(logicalName: string): string {
  if (!BASE) return `/${logicalName}`;          // dev / fallback
  const hashed = (manifest as Record<string, string>)[logicalName] ?? logicalName;
  return `${BASE}/${hashed}`;
}
```

- **Convention:** `logicalName` always includes the prefix (`images/hero-main.png`, `videos/hero-loop.mp4`). Matches the file's location under `public/`.
- **Dev (BASE unset):** returns `/images/hero-main.png` → Astro serves from `public/`. Identical behavior to today.
- **Prod (`PUBLIC_CDN_BASE=https://cdn.bring-o.net`):** returns `https://cdn.bring-o.net/images/hero-main.a1b2c3d4.png`.

### 4. Environment configuration

- `.env.example` — documents `PUBLIC_CDN_BASE` and `CLOUDFLARE_API_TOKEN` (the latter only needed for `cdn:sync`, never read by the app).
- `.env.production` — sets `PUBLIC_CDN_BASE=https://cdn.bring-o.net`.
- Local dev — leaves `PUBLIC_CDN_BASE` unset.
- Azure deployment — set `PUBLIC_CDN_BASE` as an app setting.

### 5. Encoding rules for video

Enforced as preconditions in `cdn-sync.ts` for any `*.mp4`:

- Container: MP4
- Video codec: H.264 (profile baseline or main, `yuv420p`)
- Audio codec: AAC (or no audio for muted hero loops)
- `moov` atom at start (`-movflags +faststart`)
- Detection: run `ffprobe` (must be on PATH) and verify the above. If absent, the script prints the exact `ffmpeg` command that would re-encode the file correctly and aborts.

Suggested (not enforced) bitrate ceilings:
- 1080p hero loop: ≤ 2 Mbps
- 720p mobile variant: ≤ 800 kbps

WebM/VP9 companion is optional and goes through the same upload path with `.webm` extension.

## Data flow

1. **Author edits an asset** → drops file in `public/images/` or `public/videos/`.
2. **Author runs `npm run cdn:sync`** → upload happens, manifest updates.
3. **Author commits both the asset and the updated manifest.** (Asset stays in `public/` until Phase 3 of migration; afterwards only the manifest is committed and the source file lives only in the artwork folder / Figma.)
4. **`npm run build`** → Astro reads `cdn-manifest.json` at build time via the helper.
5. **Browser requests `<img src>`** → resolves to `cdn.bring-o.net` → Cloudflare edge cache → R2 origin on miss.

## Cache strategy

- Filenames are content-addressed (`name.<hash>.ext`). New content → new filename → new URL. No cache invalidation step ever.
- `Cache-Control: public, max-age=31536000, immutable` set as bucket-level default object metadata on upload. Browsers and the Cloudflare edge cache for 1 year.
- The Astro-generated HTML is short-lived (whatever the host's HTML cache policy is) — when the manifest changes, the new HTML references new URLs immediately.

## Migration

### What moves (Phase 2)

`public/images/` raster + branding SVG:
- `hero-main.png`, `hero-main.svg`
- `product-questions.png`, `product-buttons.png`
- `franchise-training.png`, `franchise-support.png`, `franchise-marketing.png`, `franchise-equipment.png`
- `about.png`
- `gallery-1.png` … `gallery-5.png`
- `avatar-1.png`, `avatar-2.png`, `avatar-3.png`
- `og-image.png`, `og-image.svg`

### What stays in repo

- `public/images/icon-*.svg` (~24 files, ~1–3KB each) — Astro inlines or fingerprints them. Cross-origin fetches per icon would be slower than serving from same origin.
- `public/favicon.svg` — must stay at site root for browser auto-discovery.

### Phases

| Phase | What happens | Site state |
|---|---|---|
| 1 | Add `cdn.ts`, manifest scaffold, refactor existing `<img src="/images/...">` references to `cdnAsset('images/...')`. `PUBLIC_CDN_BASE` unset. | Identical to today. Helper just rewrites paths through itself. |
| 2 | Run `cdn:sync`, populate manifest, set `PUBLIC_CDN_BASE` in prod env, deploy. | Prod serves from R2; dev still serves from local `public/`. |

Each phase is its own commit. Reversion is `git revert`.

**Files stay in `public/` permanently.** Local dev keeps working without internet, designers can swap a PNG and see it instantly via `npm run dev`, and the repo carries ~5–10 MB extra — a trivial cost for the DX win. The `cdn:sync` script treats `public/` as the source of truth and uploads from there.

## Error handling

| Failure | Effect | Recovery |
|---|---|---|
| `cdn:sync` invoked without `CLOUDFLARE_API_TOKEN` | Script aborts with explicit env-var error before any upload. | Set the token, re-run. |
| Network error mid-upload | Wrangler retries; on permanent failure script aborts non-zero. Manifest is only written after all uploads succeed. | Re-run `cdn:sync`; existing successful uploads short-circuit on the "object exists" check. |
| Asset listed in manifest but missing in bucket (drift) | At runtime, browser gets 404 from `cdn.bring-o.net`. | Detected by the smoke test (see Testing). Re-run `cdn:sync`. |
| `cdn-manifest.json` corrupt JSON | Build fails at import. | Reject the bad commit; re-run sync. |
| Video fails encoding precondition | `cdn:sync` aborts with the suggested `ffmpeg` command. | Re-encode locally, re-run. |
| Cloudflare R2 outage | Edge cache continues serving cached objects (immutable, 1y TTL). New unique URLs would 404 until R2 is back. | Wait it out; status visible at cloudflarestatus.com. |

## Testing

### Local

- **Helper unit test:** `cdnAsset('images/x.png')` returns `/images/x.png` when `PUBLIC_CDN_BASE` unset; returns `${BASE}/<hashed>` when set; falls back to `${BASE}/${logicalName}` when the manifest entry is missing.
- **Sync script unit test:** given a fixture directory and a stub of `wrangler`, verify hash computation is deterministic, manifest output is byte-identical on re-run, `wrangler r2 object put` is called once per file, `--content-type` is correct.

### Smoke (post-deploy)

- A `npm run cdn:smoke` script that walks the manifest and HEADs each URL; passes only if every entry returns 200 with `Cache-Control: public, max-age=31536000, immutable`. Run manually after each deploy that touched the manifest.

### Manual checklist

- DevTools Network panel: hero PNG comes from `cdn.bring-o.net` (prod) or `localhost` (dev).
- Response headers include `cache-control: ..., immutable` and `cf-cache-status: HIT` after warmup.
- Lighthouse: LCP doesn't regress.

## Cost (back-of-envelope)

- R2 storage: ~10–50 MB total → ~$0/month (10 GB free tier).
- R2 egress: free at any volume.
- R2 Class A ops (uploads): dozens/year → free tier.
- R2 Class B ops (reads): cached at edge after first hit → free tier.
- **Net: $0/month.** Stays $0 until storage exceeds 10 GB or write ops exceed 1 M/month.

## Open questions

None at this time. Domain confirmed (`bring-o.net` is the only zone on this Cloudflare account → CDN host is `cdn.bring-o.net`).
