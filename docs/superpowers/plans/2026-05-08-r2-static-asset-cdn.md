# R2 Static-Asset CDN Implementation Plan

> **STATUS: SUPERSEDED (2026-05-09).** Tasks 1–4 implemented on branch
> `feat/r2-static-asset-cdn`; Tasks 5–8 abandoned. Decision: site deploys to
> Vercel, whose built-in edge CDN already serves `public/` globally — R2 added
> complexity without enough win at this site's scale. The implementation work
> on the feature branch is preserved for reference. Spec:
> [`../specs/2026-05-08-r2-static-asset-cdn-design.md`](../specs/2026-05-08-r2-static-asset-cdn-design.md).

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve raster images and (future) video for the brain-ring landing page from a Cloudflare R2 bucket at `cdn.bring-o.net`, with content-hashed filenames, immutable caching, and a manual `npm run cdn:sync` upload pipeline. Local dev keeps reading from `public/`.

**Architecture:** Single R2 bucket `bringo-cdn` with `images/` and `videos/` prefixes, fronted by `cdn.bring-o.net`. A small Astro helper `cdnAsset(name)` switches URL based on `PUBLIC_CDN_BASE`. Hash-based filenames + 1-year immutable cache headers. Upload script reads `public/images/` and `public/videos/`, hashes each file, uploads via Wrangler, writes a manifest committed to git.

**Tech Stack:** Astro 4 (existing), Wrangler v3, Vitest 1.x, tsx, mime-types. No new runtime deps for the site itself — only build/scripts deps.

**Spec:** [`docs/superpowers/specs/2026-05-08-r2-static-asset-cdn-design.md`](../specs/2026-05-08-r2-static-asset-cdn-design.md)

---

## Task 1: Install dev tooling (vitest, tsx, wrangler, mime-types)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Add dev dependencies**

Run:
```bash
cd /c/Users/crist/Desktop/Dashka
npm install --save-dev vitest@^1.6.0 tsx@^4.19.0 wrangler@^3.78.0 mime-types@^2.1.35 @types/node@^20.14.0 @types/mime-types@^2.1.4
```

Expected: `package.json` gains a `devDependencies` block with these five packages.

- [ ] **Step 2: Add npm scripts**

Edit `package.json` — replace the entire `"scripts"` object with:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "test": "vitest",
  "test:run": "vitest run",
  "cdn:sync": "tsx scripts/cdn-sync.ts",
  "cdn:smoke": "tsx scripts/cdn-smoke.ts"
}
```

- [ ] **Step 3: Create minimal vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
```

- [ ] **Step 4: Verify vitest can run (no tests yet — should report 0 tests)**

Run:
```bash
npm run test:run
```

Expected: vitest starts, reports `No test files found` or similar, exits with code 0 or with a recognizable "no tests" message. (Vitest 1.x may exit non-zero with `--passWithNoTests=false` default — if so, append `-- --passWithNoTests` to the command and proceed.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest, tsx, wrangler, mime-types for CDN pipeline"
```

---

## Task 2: Astro helper `cdnAsset()` (TDD)

**Files:**
- Create: `src/lib/cdn.ts`
- Create: `src/cdn-manifest.json`
- Create: `tests/lib/cdn.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/cdn.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("cdnAsset", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns local /<name> when PUBLIC_CDN_BASE is unset", async () => {
    vi.stubEnv("PUBLIC_CDN_BASE", "");
    vi.doMock("../../src/cdn-manifest.json", () => ({ default: {} }));
    const { cdnAsset } = await import("../../src/lib/cdn");
    expect(cdnAsset("images/hero-main.png")).toBe("/images/hero-main.png");
  });

  it("returns hashed CDN URL when manifest has the entry", async () => {
    vi.stubEnv("PUBLIC_CDN_BASE", "https://cdn.bring-o.net");
    vi.doMock("../../src/cdn-manifest.json", () => ({
      default: { "images/hero-main.png": "images/hero-main.a1b2c3d4.png" },
    }));
    const { cdnAsset } = await import("../../src/lib/cdn");
    expect(cdnAsset("images/hero-main.png")).toBe(
      "https://cdn.bring-o.net/images/hero-main.a1b2c3d4.png",
    );
  });

  it("falls back to logical name on CDN when manifest entry is missing", async () => {
    vi.stubEnv("PUBLIC_CDN_BASE", "https://cdn.bring-o.net");
    vi.doMock("../../src/cdn-manifest.json", () => ({ default: {} }));
    const { cdnAsset } = await import("../../src/lib/cdn");
    expect(cdnAsset("images/missing.png")).toBe(
      "https://cdn.bring-o.net/images/missing.png",
    );
  });

  it("strips trailing slash from PUBLIC_CDN_BASE", async () => {
    vi.stubEnv("PUBLIC_CDN_BASE", "https://cdn.bring-o.net/");
    vi.doMock("../../src/cdn-manifest.json", () => ({ default: {} }));
    const { cdnAsset } = await import("../../src/lib/cdn");
    expect(cdnAsset("images/x.png")).toBe("https://cdn.bring-o.net/images/x.png");
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:
```bash
npm run test:run
```

Expected: 4 failures, all because `src/lib/cdn` and `src/cdn-manifest.json` do not exist yet.

- [ ] **Step 3: Create empty manifest scaffold**

Create `src/cdn-manifest.json`:

```json
{}
```

- [ ] **Step 4: Implement the helper**

Create `src/lib/cdn.ts`:

```ts
import manifest from "../cdn-manifest.json";

const RAW_BASE = (import.meta.env.PUBLIC_CDN_BASE ?? "") as string;
const BASE = RAW_BASE.replace(/\/+$/, "");

type Manifest = Record<string, string>;
const M = manifest as Manifest;

export function cdnAsset(logicalName: string): string {
  if (!BASE) return `/${logicalName}`;
  const hashed = M[logicalName] ?? logicalName;
  return `${BASE}/${hashed}`;
}
```

- [ ] **Step 5: Run tests — they should pass**

Run:
```bash
npm run test:run
```

Expected: 4 passes.

- [ ] **Step 6: Commit**

```bash
git add src/lib/cdn.ts src/cdn-manifest.json tests/lib/cdn.test.ts
git commit -m "feat(cdn): add cdnAsset helper with manifest-driven URL switching"
```

---

## Task 3: Upload script `scripts/cdn-sync.ts` (TDD)

**Files:**
- Create: `scripts/cdn-sync.ts`
- Create: `scripts/cdn-config.ts`
- Create: `tests/scripts/cdn-sync.test.ts`

`cdn-config.ts` holds the migration list and other constants — this keeps the test fixture small and the script readable.

- [ ] **Step 1: Write the config module**

Create `scripts/cdn-config.ts`:

```ts
export const BUCKET_NAME = "bringo-cdn";

export const IMAGE_PREFIX = "images";
export const VIDEO_PREFIX = "videos";

export const IMAGE_FILES = [
  "hero-main.png",
  "hero-main.svg",
  "product-questions.png",
  "product-buttons.png",
  "franchise-training.png",
  "franchise-support.png",
  "franchise-marketing.png",
  "franchise-equipment.png",
  "about.png",
  "gallery-1.png",
  "gallery-2.png",
  "gallery-3.png",
  "gallery-4.png",
  "gallery-5.png",
  "avatar-1.png",
  "avatar-2.png",
  "avatar-3.png",
  "og-image.png",
  "og-image.svg",
  "bg-pattern-seamless.jpg",
  "bg-pattern-flipped.jpg",
];

export const VIDEO_FILES: string[] = [];

export const CACHE_CONTROL = "public, max-age=31536000, immutable";

export const VIDEO_LINT = {
  containerExt: [".mp4", ".webm"],
  requiredVideoCodecs: ["h264", "vp9", "av1"],
  requiredAudioCodecs: ["aac", "opus", "none"],
  requireFaststart: true,
  maxBitrateBps: 2_500_000,
};
```

- [ ] **Step 2: Write the failing tests**

Create `tests/scripts/cdn-sync.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

describe("cdn-sync", () => {
  let tmpRoot: string;

  beforeEach(async () => {
    tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "cdn-sync-"));
    await fs.mkdir(path.join(tmpRoot, "public", "images"), { recursive: true });
    await fs.mkdir(path.join(tmpRoot, "public", "videos"), { recursive: true });
    await fs.mkdir(path.join(tmpRoot, "src"), { recursive: true });
  });

  it("hashes file contents deterministically (sha256, 8 hex chars)", async () => {
    const { hashFile } = await import("../../scripts/cdn-sync");
    const f = path.join(tmpRoot, "a.txt");
    await fs.writeFile(f, "hello");
    const a = await hashFile(f);
    const b = await hashFile(f);
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{8}$/);
  });

  it("builds object key as <prefix>/<base>.<hash>.<ext>", async () => {
    const { buildKey } = await import("../../scripts/cdn-sync");
    expect(buildKey("images", "hero-main.png", "a1b2c3d4")).toBe(
      "images/hero-main.a1b2c3d4.png",
    );
    expect(buildKey("videos", "hero.mp4", "f4e5d6c7")).toBe(
      "videos/hero.f4e5d6c7.mp4",
    );
  });

  it("writes manifest mapping logical name -> hashed key", async () => {
    const { writeManifest } = await import("../../scripts/cdn-sync");
    const dest = path.join(tmpRoot, "src", "cdn-manifest.json");
    await writeManifest(dest, {
      "images/hero-main.png": "images/hero-main.a1b2c3d4.png",
    });
    const round = JSON.parse(await fs.readFile(dest, "utf8"));
    expect(round).toEqual({
      "images/hero-main.png": "images/hero-main.a1b2c3d4.png",
    });
  });

  it("writes manifest with sorted keys for byte-stable output", async () => {
    const { writeManifest } = await import("../../scripts/cdn-sync");
    const dest = path.join(tmpRoot, "src", "cdn-manifest.json");
    await writeManifest(dest, {
      "images/z.png": "images/z.11111111.png",
      "images/a.png": "images/a.22222222.png",
    });
    const raw = await fs.readFile(dest, "utf8");
    const idxA = raw.indexOf('"images/a.png"');
    const idxZ = raw.indexOf('"images/z.png"');
    expect(idxA).toBeGreaterThan(-1);
    expect(idxZ).toBeGreaterThan(idxA);
  });

  it("aborts when CLOUDFLARE_API_TOKEN is unset and uploads are needed", async () => {
    const { runSync } = await import("../../scripts/cdn-sync");
    delete process.env.CLOUDFLARE_API_TOKEN;
    const f = path.join(tmpRoot, "public", "images", "hero-main.png");
    await fs.writeFile(f, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    await expect(
      runSync({
        projectRoot: tmpRoot,
        imageFiles: ["hero-main.png"],
        videoFiles: [],
        upload: async () => {
          throw new Error("upload should not be called");
        },
      }),
    ).rejects.toThrow(/CLOUDFLARE_API_TOKEN/);
  });

  it("does not call upload when object key already exists", async () => {
    const { runSync } = await import("../../scripts/cdn-sync");
    process.env.CLOUDFLARE_API_TOKEN = "test-token";
    const f = path.join(tmpRoot, "public", "images", "hero-main.png");
    await fs.writeFile(f, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    const calls: string[] = [];
    await runSync({
      projectRoot: tmpRoot,
      imageFiles: ["hero-main.png"],
      videoFiles: [],
      objectExists: async () => true,
      upload: async (key) => {
        calls.push(key);
      },
    });
    expect(calls).toEqual([]);
  });

  it("calls upload exactly once per missing object with correct content-type", async () => {
    const { runSync } = await import("../../scripts/cdn-sync");
    process.env.CLOUDFLARE_API_TOKEN = "test-token";
    const f = path.join(tmpRoot, "public", "images", "hero-main.png");
    await fs.writeFile(f, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    const calls: Array<{ key: string; contentType: string }> = [];
    await runSync({
      projectRoot: tmpRoot,
      imageFiles: ["hero-main.png"],
      videoFiles: [],
      objectExists: async () => false,
      upload: async (key, _path, contentType) => {
        calls.push({ key, contentType });
      },
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].key).toMatch(/^images\/hero-main\.[0-9a-f]{8}\.png$/);
    expect(calls[0].contentType).toBe("image/png");
  });
});
```

- [ ] **Step 3: Run tests and verify they fail**

Run:
```bash
npm run test:run
```

Expected: 7 failures (script does not exist).

- [ ] **Step 4: Implement the upload script**

Create `scripts/cdn-sync.ts`:

```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import mime from "mime-types";

import {
  BUCKET_NAME,
  IMAGE_PREFIX,
  VIDEO_PREFIX,
  IMAGE_FILES,
  VIDEO_FILES,
  CACHE_CONTROL,
  VIDEO_LINT,
} from "./cdn-config";

export async function hashFile(filePath: string): Promise<string> {
  const buf = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 8);
}

export function buildKey(prefix: string, basename: string, hash: string): string {
  const ext = path.extname(basename);
  const stem = basename.slice(0, basename.length - ext.length);
  return `${prefix}/${stem}.${hash}${ext}`;
}

export async function writeManifest(
  destPath: string,
  entries: Record<string, string>,
): Promise<void> {
  const sorted = Object.keys(entries)
    .sort()
    .reduce<Record<string, string>>((acc, k) => {
      acc[k] = entries[k];
      return acc;
    }, {});
  await fs.writeFile(destPath, JSON.stringify(sorted, null, 2) + "\n", "utf8");
}

function contentTypeFor(filename: string): string {
  return mime.lookup(filename) || "application/octet-stream";
}

export interface RunSyncOptions {
  projectRoot: string;
  imageFiles?: string[];
  videoFiles?: string[];
  objectExists?: (key: string) => Promise<boolean>;
  upload?: (key: string, filePath: string, contentType: string) => Promise<void>;
  lintVideo?: (filePath: string) => Promise<void>;
}

async function defaultObjectExists(key: string): Promise<boolean> {
  const result = spawnSync(
    "npx",
    ["wrangler", "r2", "object", "get", `${BUCKET_NAME}/${key}`, "--remote", "--pipe"],
    { encoding: "utf8" },
  );
  return result.status === 0;
}

async function defaultUpload(
  key: string,
  filePath: string,
  contentType: string,
): Promise<void> {
  const result = spawnSync(
    "npx",
    [
      "wrangler",
      "r2",
      "object",
      "put",
      `${BUCKET_NAME}/${key}`,
      `--file=${filePath}`,
      `--content-type=${contentType}`,
      `--cache-control=${CACHE_CONTROL}`,
      "--remote",
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`wrangler upload failed for ${key} (exit ${result.status})`);
  }
}

async function defaultLintVideo(filePath: string): Promise<void> {
  const probe = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "stream=codec_type,codec_name:format=format_name,bit_rate",
      "-of",
      "json",
      filePath,
    ],
    { encoding: "utf8" },
  );
  if (probe.status !== 0) {
    throw new Error(
      `ffprobe failed for ${filePath} (is ffprobe on PATH?). Install ffmpeg or skip the video.`,
    );
  }
  const info = JSON.parse(probe.stdout);
  const streams = info.streams ?? [];
  const video = streams.find((s: any) => s.codec_type === "video");
  const audio = streams.find((s: any) => s.codec_type === "audio");
  if (!video || !VIDEO_LINT.requiredVideoCodecs.includes(video.codec_name)) {
    throw new Error(
      `${filePath}: video codec must be one of ${VIDEO_LINT.requiredVideoCodecs.join(",")}; got ${video?.codec_name}`,
    );
  }
  if (audio && !VIDEO_LINT.requiredAudioCodecs.includes(audio.codec_name)) {
    throw new Error(
      `${filePath}: audio codec must be one of ${VIDEO_LINT.requiredAudioCodecs.join(",")}; got ${audio.codec_name}`,
    );
  }
  const probeFaststart = spawnSync(
    "ffprobe",
    ["-v", "trace", "-i", filePath],
    { encoding: "utf8" },
  );
  const trace = (probeFaststart.stderr ?? "") + (probeFaststart.stdout ?? "");
  if (VIDEO_LINT.requireFaststart && !/type:'moov'.*before.*type:'mdat'|moov\s+box\s+offset/.test(trace)) {
    if (/type:'mdat'.*type:'moov'/s.test(trace)) {
      throw new Error(
        `${filePath}: moov atom is after mdat. Re-encode with: ffmpeg -i ${filePath} -movflags +faststart -c copy out.mp4`,
      );
    }
  }
}

export async function runSync(opts: RunSyncOptions): Promise<Record<string, string>> {
  const imageFiles = opts.imageFiles ?? IMAGE_FILES;
  const videoFiles = opts.videoFiles ?? VIDEO_FILES;
  const objectExists = opts.objectExists ?? defaultObjectExists;
  const upload = opts.upload ?? defaultUpload;
  const lintVideo = opts.lintVideo ?? defaultLintVideo;

  const root = opts.projectRoot;
  const manifest: Record<string, string> = {};
  const uploadsNeeded: Array<{ key: string; filePath: string; contentType: string }> =
    [];

  async function processGroup(prefix: string, files: string[], doLint: boolean) {
    for (const name of files) {
      const filePath = path.join(root, "public", prefix, name);
      try {
        await fs.access(filePath);
      } catch {
        console.warn(`[cdn-sync] skip missing file: ${filePath}`);
        continue;
      }
      if (doLint) {
        await lintVideo(filePath);
      }
      const hash = await hashFile(filePath);
      const key = buildKey(prefix, name, hash);
      manifest[`${prefix}/${name}`] = key;
      const exists = await objectExists(key);
      if (!exists) {
        uploadsNeeded.push({ key, filePath, contentType: contentTypeFor(name) });
      }
    }
  }

  await processGroup(IMAGE_PREFIX, imageFiles, false);
  await processGroup(VIDEO_PREFIX, videoFiles, true);

  if (uploadsNeeded.length > 0 && !process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error(
      "CLOUDFLARE_API_TOKEN is not set. Create a token with R2 Edit permission, then `export CLOUDFLARE_API_TOKEN=<token>` (or set in .env) and re-run.",
    );
  }

  for (const u of uploadsNeeded) {
    console.log(`[cdn-sync] upload ${u.key}`);
    await upload(u.key, u.filePath, u.contentType);
  }

  await writeManifest(path.join(root, "src", "cdn-manifest.json"), manifest);
  return manifest;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSync({ projectRoot: process.cwd() }).then(
    (m) => {
      console.log(`[cdn-sync] done. ${Object.keys(m).length} entries in manifest.`);
    },
    (err) => {
      console.error(`[cdn-sync] FAILED: ${err.message}`);
      process.exit(1);
    },
  );
}
```

- [ ] **Step 5: Run tests — they should pass**

Run:
```bash
npm run test:run
```

Expected: all 11 tests pass (4 from Task 2 + 7 from Task 3).

- [ ] **Step 6: Commit**

```bash
git add scripts/cdn-sync.ts scripts/cdn-config.ts tests/scripts/cdn-sync.test.ts
git commit -m "feat(cdn): add cdn-sync upload script with content-hashed manifest"
```

---

## Task 4: Smoke-test script `scripts/cdn-smoke.ts`

**Files:**
- Create: `scripts/cdn-smoke.ts`

- [ ] **Step 1: Implement the smoke script**

Create `scripts/cdn-smoke.ts`:

```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";

const MANIFEST_PATH = path.join(process.cwd(), "src", "cdn-manifest.json");
const BASE = process.env.PUBLIC_CDN_BASE?.replace(/\/+$/, "");

async function main() {
  if (!BASE) {
    console.error("PUBLIC_CDN_BASE is not set. Export it (e.g. https://cdn.bring-o.net) and re-run.");
    process.exit(2);
  }
  const raw = await fs.readFile(MANIFEST_PATH, "utf8");
  const manifest = JSON.parse(raw) as Record<string, string>;
  const entries = Object.entries(manifest);
  if (entries.length === 0) {
    console.error("Manifest is empty. Run `npm run cdn:sync` first.");
    process.exit(2);
  }
  const failures: string[] = [];
  for (const [logical, hashed] of entries) {
    const url = `${BASE}/${hashed}`;
    const res = await fetch(url, { method: "HEAD" });
    const cc = res.headers.get("cache-control") ?? "";
    const ok =
      res.status === 200 &&
      cc.includes("max-age=31536000") &&
      cc.includes("immutable");
    const cf = res.headers.get("cf-cache-status") ?? "-";
    console.log(`${ok ? "OK " : "BAD"} ${res.status} cf=${cf} ${logical} -> ${url}`);
    if (!ok) failures.push(`${logical}: ${res.status} cc="${cc}"`);
  }
  if (failures.length > 0) {
    console.error(`\n${failures.length} failures:`);
    failures.forEach((f) => console.error("  - " + f));
    process.exit(1);
  }
  console.log(`\nAll ${entries.length} URLs OK.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Verify it parses (no real call yet — manifest is empty until Task 7)**

Run:
```bash
PUBLIC_CDN_BASE=https://example.invalid npx tsx scripts/cdn-smoke.ts
```

Expected: exits with code 2 and message `Manifest is empty. Run `npm run cdn:sync` first.`

- [ ] **Step 3: Commit**

```bash
git add scripts/cdn-smoke.ts
git commit -m "feat(cdn): add cdn-smoke post-deploy verification script"
```

---

## Task 5: Provision R2 bucket and `cdn.bring-o.net` custom domain

This is environment setup, not code — do exactly one of A or B. Both produce the same end state.

**Pre-requirement:** A Cloudflare API token with permissions:
- Account → Workers R2 Storage → Edit
- Zone → DNS → Edit (only on `bring-o.net`)
- Account → Account Settings → Read

Create at https://dash.cloudflare.com/profile/api-tokens. Save it as `CLOUDFLARE_API_TOKEN` in your shell env (and later in CI/host env if needed).

### Path A — Cloudflare dashboard (recommended for first-time setup)

- [ ] **Step 1: Create the bucket**

1. Open https://dash.cloudflare.com → R2.
2. Click **Create bucket**.
3. Name: `bringo-cdn`. Location hint: **EEUR** (Eastern Europe).
4. Default storage class: Standard. Click **Create bucket**.

- [ ] **Step 2: Add custom domain**

1. Open the `bringo-cdn` bucket → **Settings** tab.
2. Under **Public access**, click **Connect Domain**.
3. Enter `cdn.bring-o.net`. Submit.
4. Confirm in the modal. Cloudflare auto-creates the CNAME in the `bring-o.net` zone and provisions a TLS cert. Wait for status to show **Active** (typically 30–60 seconds).

- [ ] **Step 3: Verify**

Run:
```bash
curl -sI https://cdn.bring-o.net/ | head -10
```

Expected: HTTP response (likely a 404 — bucket is empty — but the response should come from Cloudflare with `server: cloudflare` and a valid TLS handshake). If you see DNS resolution failure, wait another minute for propagation.

### Path B — Wrangler CLI (for engineers who prefer terminal)

- [ ] **Step 1: Authenticate Wrangler**

```bash
export CLOUDFLARE_API_TOKEN=<your-token>
npx wrangler whoami
```

Expected: prints your account email and account ID.

- [ ] **Step 2: Create the bucket**

```bash
npx wrangler r2 bucket create bringo-cdn --location eeur
```

Expected: `Created bucket bringo-cdn ...`

- [ ] **Step 3: Add custom domain**

```bash
npx wrangler r2 bucket domain add bringo-cdn --domain cdn.bring-o.net --zone-id <bring-o.net zone id>
```

To get the zone id:
```bash
npx wrangler zones list 2>&1 | grep bring-o
```

(If the `domain add` subcommand syntax differs in your Wrangler version, fall back to Path A — the dashboard always works.)

- [ ] **Step 4: Verify (same as Path A Step 3)**

```bash
curl -sI https://cdn.bring-o.net/ | head -10
```

### After either path

- [ ] **Step 5: No commit**

Provisioning leaves no repo changes. Skip to Task 6.

---

## Task 6: Refactor `.astro` components to use `cdnAsset()`

**Files (modify only):**
- `src/components/Hero.astro`
- `src/components/About.astro`
- `src/components/Products.astro`
- `src/components/Franchise.astro`
- `src/components/Gallery.astro`
- `src/components/Testimonials.astro`
- `src/layouts/Layout.astro`
- `src/styles/global.css`

The refactor pattern:
- `<img src="/images/<file>">` → `<img src={cdnAsset("images/<file>")}>` plus an `import { cdnAsset } from "../lib/cdn";` in the component's frontmatter.
- Path arrays (e.g. `['/images/gallery-1.png', ...]`) → `[cdnAsset('images/gallery-1.png'), ...]`.
- **Do NOT touch icon SVGs** (`icon-*.svg`, `social-*.svg`, `logo.svg`, `favicon.svg`). They stay as raw `/images/<name>.svg` references — see spec for rationale.

For each file below, the listed changes are exhaustive — do not modify anything else.

- [ ] **Step 1: `src/components/Hero.astro`**

In the frontmatter (between the `---` fences at top), add:
```ts
import { cdnAsset } from "../lib/cdn";
```

Lines 50 and 56 (`src="/images/hero-main.png"`) → `src={cdnAsset("images/hero-main.png")}`.

Leave all `icon-*.svg`, `social-*.svg` unchanged.

- [ ] **Step 2: `src/components/About.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Line 39 (`src="/images/about.png"`) → `src={cdnAsset("images/about.png")}`.

- [ ] **Step 3: `src/components/Products.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Line 25 → `src={cdnAsset("images/product-questions.png")}`.
Line 48 → `src={cdnAsset("images/product-buttons.png")}`.

- [ ] **Step 4: `src/components/Franchise.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Replace lines 14–17 (the array of `{ src: '/images/franchise-...png', ... }`) so each `src` becomes `cdnAsset("images/franchise-<x>.png")`. Other fields unchanged.

- [ ] **Step 5: `src/components/Gallery.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Replace the array of paths: each `'/images/gallery-N.png'` becomes `cdnAsset('images/gallery-N.png')`. The array should reference `gallery-1.png` through `gallery-5.png`. If the current file only references gallery-1 through gallery-3, leave the array length as-is — only swap the existing entries.

- [ ] **Step 6: `src/components/Testimonials.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Line 11: replace
```ts
const avatars = ['/images/avatar-1.png', '/images/avatar-2.png', '/images/avatar-3.png'];
```
with
```ts
const avatars = [cdnAsset('images/avatar-1.png'), cdnAsset('images/avatar-2.png'), cdnAsset('images/avatar-3.png')];
```

- [ ] **Step 7: `src/layouts/Layout.astro`**

Add to frontmatter:
```ts
import { cdnAsset } from "../lib/cdn";
```

Lines 102 and 111: replace `new URL('/images/og-image.svg', Astro.site).href` with `new URL(cdnAsset('images/og-image.svg'), Astro.site).href`.

> Note: when `PUBLIC_CDN_BASE` is set, `cdnAsset()` returns an absolute URL. `new URL(<absolute>, <base>)` returns the absolute URL unchanged, so social previews still work. When unset, dev keeps using `Astro.site + /images/og-image.svg`.

- [ ] **Step 8: `src/styles/global.css` and `src/layouts/Layout.astro`**

CSS can't call TypeScript helpers, so the URL is injected as a CSS custom property via Astro's `define:vars` directive.

In `src/layouts/Layout.astro` frontmatter (the existing `import { cdnAsset }` line from Step 7 is already present), add:

```ts
const bgPatternUrl = cdnAsset("images/bg-pattern-seamless.jpg");
```

In the `<head>` of `Layout.astro`, before the closing `</head>` tag, add:

```astro
<style define:vars={{ bgPattern: `url("${bgPatternUrl}")` }} is:global>
  :root { --bg-pattern: var(--bgPattern); }
</style>
```

> Astro's `define:vars` injects each JS key as a CSS custom property of the same name (`--bgPattern`). The `:root { --bg-pattern: var(--bgPattern); }` line aliases it to a kebab-cased name so existing CSS conventions hold.

In `src/styles/global.css` line 24, replace:

```css
background-image: url('/images/bg-pattern-seamless.png');
```

with:

```css
background-image: var(--bg-pattern);
```

> Note: the existing CSS references `bg-pattern-seamless.png` but the actual file in `public/images/` is `bg-pattern-seamless.jpg`. The new code references the `.jpg`, silently fixing that current bug.

- [ ] **Step 9: Verify dev still works**

Run:
```bash
npm run dev
```

Open http://localhost:4321 (or whichever port Astro picks). Spot-check: hero image, gallery, avatars, franchise images, og-image meta tag in page source, background pattern. All should look identical to before. `PUBLIC_CDN_BASE` is unset → all assets served from `/images/...` as before.

Stop the dev server (`Ctrl+C`).

- [ ] **Step 10: Run unit tests once more**

```bash
npm run test:run
```

Expected: 11 passes.

- [ ] **Step 11: Commit**

```bash
git add src/components/*.astro src/layouts/Layout.astro src/styles/global.css
git commit -m "refactor(cdn): route raster + branding-SVG references through cdnAsset"
```

---

## Task 7: Run sync, configure prod env, deploy, smoke

- [ ] **Step 1: Verify the API token works locally**

```bash
export CLOUDFLARE_API_TOKEN=<your-token>
npx wrangler whoami
```

Expected: prints your account.

- [ ] **Step 2: Run the sync**

```bash
npm run cdn:sync
```

Expected output (abbreviated):
```
[cdn-sync] upload images/hero-main.<hash>.png
[cdn-sync] upload images/about.<hash>.png
... (one line per file)
[cdn-sync] done. 21 entries in manifest.
```

After this completes, `src/cdn-manifest.json` is populated.

- [ ] **Step 3: Spot-check one URL**

Take any entry from the manifest, build the URL, fetch it:
```bash
curl -sI "https://cdn.bring-o.net/$(jq -r '."images/hero-main.png"' src/cdn-manifest.json)" | head -10
```

Expected: `HTTP/2 200`, `cache-control: public, max-age=31536000, immutable`, `content-type: image/png`, `cf-cache-status: MISS` on first hit (or `HIT` after warm-up).

- [ ] **Step 4: Commit the populated manifest**

```bash
git add src/cdn-manifest.json
git commit -m "feat(cdn): populate manifest with initial 21 R2 object hashes"
```

- [ ] **Step 5: Set production env var**

In Azure App Service for this site (or whichever host serves prod):
- App Service → Configuration → Application settings → New application setting:
  - Name: `PUBLIC_CDN_BASE`
  - Value: `https://cdn.bring-o.net`
- Save and restart the app.

(For other hosts: set `PUBLIC_CDN_BASE=https://cdn.bring-o.net` in whatever env mechanism the host uses.)

- [ ] **Step 6: Deploy**

Trigger your normal deploy. (For this project: push to main, or run the existing Azure deploy script. The repo's `startup.sh` / `.azure/` setup should already handle it.)

- [ ] **Step 7: Run smoke test against prod**

```bash
export PUBLIC_CDN_BASE=https://cdn.bring-o.net
npm run cdn:smoke
```

Expected: `All 21 URLs OK.`

- [ ] **Step 8: Visual check on the live site**

Open the live site in a browser. DevTools → Network. Filter to images. Verify:
- Hero PNG, gallery PNGs, avatars, franchise PNGs, og-image (in HTML source) all served from `cdn.bring-o.net`.
- Icon SVGs still served from your domain origin.
- Response headers on a CDN asset show `cache-control: ..., immutable` and `cf-cache-status: HIT` after a refresh.

If anything is wrong, revert the prod env var (set `PUBLIC_CDN_BASE=""`) — the helper falls back to local `/images/...` and the site keeps working from origin while you debug.

- [ ] **Step 9: No commit needed**

This task is config + deployment, not code.

---

## Task 8: Document and close out

**Files:**
- Create: `.env.example`
- Modify: `README.md` (append a CDN section)

- [ ] **Step 1: Create `.env.example`**

Create `.env.example`:

```
# Public — exposed to the client. Set in production only.
# Leave unset locally so dev serves images from /public/images/.
PUBLIC_CDN_BASE=https://cdn.bring-o.net

# Used by scripts/cdn-sync.ts only. Never read by the runtime app.
# Token must have R2 Edit permission. Create at:
# https://dash.cloudflare.com/profile/api-tokens
CLOUDFLARE_API_TOKEN=
```

- [ ] **Step 2: Append CDN section to README.md**

Append to `README.md`:

```markdown
## Static-asset CDN (Cloudflare R2)

Raster images and (future) videos are served from `cdn.bring-o.net` (R2 bucket `bringo-cdn`). Local dev still reads from `public/images/`.

### When you add or change an asset

1. Drop the file in `public/images/` (or `public/videos/`).
2. Add it to `IMAGE_FILES` (or `VIDEO_FILES`) in `scripts/cdn-config.ts` if it's not already listed.
3. Reference it in code via `cdnAsset("images/your-file.png")` from `src/lib/cdn`.
4. `export CLOUDFLARE_API_TOKEN=<token>` (with R2 Edit permission).
5. Run `npm run cdn:sync` — uploads new/changed files, updates `src/cdn-manifest.json`.
6. Commit both the file in `public/` and the updated `src/cdn-manifest.json`.
7. Deploy. Run `npm run cdn:smoke` (with `PUBLIC_CDN_BASE` set) to verify.

### Design / spec

See `docs/superpowers/specs/2026-05-08-r2-static-asset-cdn-design.md`.
```

- [ ] **Step 3: Commit**

```bash
git add .env.example README.md
git commit -m "docs(cdn): document CDN workflow in README and .env.example"
```

- [ ] **Step 4: Final verification**

```bash
npm run test:run
npm run build
```

Expected: tests pass, build succeeds. `dist/` should now contain HTML where image references point at `cdn.bring-o.net` (you can grep `dist/client/index.html` for `cdn.bring-o.net` to confirm).

---

## Spec coverage check

- ✅ R2 bucket `bringo-cdn`, EEUR location → Task 5
- ✅ Custom domain `cdn.bring-o.net` with TLS → Task 5
- ✅ Single bucket, two prefixes (`images/`, `videos/`) → Task 3 (`cdn-config.ts`)
- ✅ Default `Cache-Control` immutable header → Task 3 (`defaultUpload` passes `--cache-control`)
- ✅ Content-hashed filenames → Task 3 (`buildKey`)
- ✅ Astro helper `cdnAsset()` with env-based switch → Task 2
- ✅ Manifest committed to git, byte-stable → Task 3 (sorted keys)
- ✅ Upload script uses Wrangler, idempotent, fails loud on missing token → Task 3
- ✅ Local dev unchanged → Task 6 Step 9 verification
- ✅ Migration list moves raster + branding SVG, keeps icons → Tasks 3 + 6
- ✅ Smoke test for headers + status → Task 4 + Task 7 Step 7
- ✅ Video encoding lint preconditions (H.264/VP9, AAC/Opus, faststart) → Task 3 (`defaultLintVideo`)
- ✅ Error handling matrix from spec covered by Task 3 implementation
- ✅ `.env.example` documents required vars → Task 8

No spec gaps detected.
