# Brain Ring (Bringo Activities)

Landing page for Brain Ring intellectual quiz game company based in Bucharest, Romania.

**Live site:** https://www.bring-o.net

## Tech Stack

- **Framework:** [Astro](https://astro.build) v4 (static + hybrid mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v3
- **Backend:** Supabase (contact form)
- **Adapter:** @astrojs/node (standalone)
- **Languages:** English (default), Russian, Romanian

## Project Structure



```
Dashka/
├── src/
│   ├── components/        # 12 Astro components (all sections)
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Products.astro
│   │   ├── WhyChooseUs.astro
│   │   ├── Franchise.astro
│   │   ├── About.astro
│   │   ├── Gallery.astro
│   │   ├── Testimonials.astro
│   │   ├── ContactForm.astro
│   │   ├── FAQ.astro
│   │   └── Footer.astro
│   ├── i18n/
│   │   ├── ui.ts          # All translations (EN, RU, RO)
│   │   └── utils.ts       # Translation utilities
│   ├── layouts/
│   │   └── Layout.astro   # Base layout, SEO meta, schemas
│   ├── pages/
│   │   ├── index.astro    # English (default)
│   │   ├── ru/index.astro # Russian
│   │   ├── ro/index.astro # Romanian
│   │   ├── 404.astro      # Custom 404
│   │   └── api/
│   │       └── contact.ts # POST endpoint → Supabase
│   └── styles/
│       └── global.css     # Global styles, effects, button classes
├── public/
│   ├── images/            # All images (placeholders — replace with real photos)
│   ├── robots.txt         # Crawler rules + AI bots
│   ├── llms.txt           # AI search engine context
│   └── favicon.svg
├── docs/
│   └── DESIGN_GUIDE.md   # Design system documentation (see below)
├── astro.config.mjs
├── tailwind.config.mjs
├── .env.example           # Supabase credentials template
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev          # → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

Create a `contacts` table in Supabase with columns: `name` (text), `phone` (text), `message` (text), `created_at` (timestamptz).

## i18n (Internationalization)

All text content lives in `src/i18n/ui.ts`. Three languages are supported:

| Language | URL | Default |
|----------|-----|---------|
| English  | `/` | Yes     |
| Russian  | `/ru/` | No   |
| Romanian | `/ro/` | No   |

Auto-detection: on first visit to `/`, the browser language is checked and users are redirected to the matching version.

**To add/edit translations:** Edit `src/i18n/ui.ts` — each language has identical key structure.

**To add a new language:** Add a new entry in `ui.ts`, create `src/pages/{lang}/index.astro`, and update hreflang tags in `Layout.astro`.

## SEO

The site includes:
- XML sitemap with i18n hreflang links (`/sitemap-index.xml`)
- Canonical tags per page
- Open Graph + Twitter Card meta tags (per language)
- JSON-LD structured data: Organization, WebSite, LocalBusiness, 2x Product, FAQPage
- `robots.txt` allowing all crawlers including AI bots
- `llms.txt` for AI search engine discoverability
- Geo meta tags for Bucharest, Romania

## Design System

See **[docs/DESIGN_GUIDE.md](docs/DESIGN_GUIDE.md)** for the complete design system documentation. It covers:

- Color palette (hex values, Tailwind classes, usage)
- Typography (Roboto, weights, sizes, color hierarchy)
- Spacing and layout patterns
- Background effects (gradients, glass cards, blur)
- Component patterns (buttons, cards, forms, accordion)
- Responsive design rules
- i18n integration for new components
- Step-by-step checklist for adding new components
- Anti-patterns to avoid

**Any agent or developer adding new components should read this guide first** to ensure visual consistency.

## Images

All images in `public/images/` are SVG placeholders. Replace them with real photos:

| File | Purpose | Recommended Size |
|------|---------|-----------------|
| `hero-main.*` | Hero section main photo | 1026x695 |
| `product-questions.*` | Questions package | 614x650 |
| `product-buttons.*` | Button system | 614x650 |
| `franchise-training.*` | Franchise block 1 | 782x450 |
| `franchise-support.*` | Franchise block 2 | 776x450 |
| `franchise-marketing.*` | Franchise block 3 | 778x450 |
| `franchise-equipment.*` | Franchise block 4 | 783x447 |
| `about.*` | About section | 782x525 |
| `gallery-1.*` to `gallery-5.*` | Gallery carousel | Various |
| `avatar-1.*` to `avatar-3.*` | Testimonial avatars | 66x66 |
| `og-image.*` | Social sharing preview | 1200x630 |

Use JPG/WebP for photos. Update file extensions in components if changing from `.svg`.

## Deployment

The site is configured for Node.js standalone mode. To deploy:

**Vercel:**
```bash
npm run build
# Deploy the dist/ directory
```

**Any Node.js host:**
```bash
npm run build
node dist/server/entry.mjs
```

## Contact

- Email: info@bring-o.net
- Instagram: [@bringo_activities](https://www.instagram.com/bringo_activities)
- Telegram: [@bring_O](https://t.me/bring_O)
- Location: Bucharest, Romania
