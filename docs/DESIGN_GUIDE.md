# Brain Ring Design System Guide

## Purpose

This guide documents every design decision, token, pattern, and convention used in the Brain Ring (Bringo Activities) landing page. It exists so that any developer or AI agent creating new components will produce output visually and structurally consistent with the existing site. When in doubt, follow the patterns described here rather than inventing new ones.

The project is built with **Astro**, styled with **Tailwind CSS** plus a small `global.css` file, and supports three languages (EN, RU, RO) via a custom i18n system.

---

## Color Palette

All brand colors are defined in `tailwind.config.mjs` under `theme.extend.colors.brand`. Additional colors come from Tailwind's built-in `white` and opacity utilities.

### Brand Colors

| Tailwind Class | Hex Value | Usage |
|---|---|---|
| `brand-dark` | `#1a0a2e` | Body gradient start/end, navbar background (`bg-brand-dark/80`), language dropdown bg (`bg-brand-dark/95`), gradient-border-inner bg |
| `brand-purple` | `#2d1052` | Body gradient mid-point, glass-card base (`rgba(45,16,82,0.6)`), image placeholder bg (`bg-brand-purple/50`, `/60`), content block bg (`bg-brand-purple/40`, `/30`) |
| `brand-violet` | `#3d1a6e` | Available for accents; not heavily used in current components |
| `brand-magenta` | `#e43ad7` | Primary CTA buttons (`.btn-primary`), outline button border, logo icon border, decorative glow, gradient-border edge, franchise number color (`text-brand-magenta/30`), Instagram icon/hover, social icon hover |
| `brand-cyan` | `#5ce1e6` | Highlighted keywords in headings (`text-brand-cyan`), icon color, glass-card border tint, stat numbers, active language indicator, link hover color, focus input border, logo text, hero badge icons |
| `brand-pink` | `#d63384` | Defined in config but not currently used in components; available for future use |

### White Opacity Variants

| Class | Usage |
|---|---|
| `text-white` | Primary body text, headings, nav links, button text |
| `text-white/90` | Desktop nav links default state |
| `text-white/80` | Hero badge text, testimonial body text, contact info links, WhyChooseUs badge labels |
| `text-white/70` | Subtitle/paragraph text across all sections, FAQ answer text, language switcher default text |
| `text-white/60` | Stat labels in About section, form labels in ContactForm |
| `text-white/50` | Contact section sub-headings (`text-white/50`), footer social icons default |
| `text-white/40` | Footer copyright text, inactive language links |
| `text-white/30` | Form input placeholders (`placeholder:text-white/30`) |
| `text-white/20` | Footer language separator pipe character |
| `border-white/5` | Navbar bottom border |
| `border-white/10` | Mobile menu border, language dropdown border, footer top border |
| `border-white/20` | Gallery and testimonial navigation buttons border |
| `border-white/30` | Form input bottom border |

### Gradient and Overlay Colors (from global.css)

```css
/* Body gradient */
background: linear-gradient(180deg, #1a0a2e 0%, #2d1052 30%, #1a0a2e 60%, #2d1052 100%);

/* Body ::before radial overlays */
radial-gradient(ellipse at 20% 50%, rgba(93, 24, 150, 0.3) 0%, transparent 50%)   /* purple glow left */
radial-gradient(ellipse at 80% 20%, rgba(228, 58, 215, 0.1) 0%, transparent 50%)  /* magenta glow top-right */
radial-gradient(ellipse at 50% 80%, rgba(92, 225, 230, 0.05) 0%, transparent 50%) /* cyan glow bottom-center */

/* Gradient border (FAQ, decorative) */
linear-gradient(135deg, rgba(228, 58, 215, 0.4), rgba(92, 225, 230, 0.4))  /* magenta-to-cyan */
```

---

## Typography

### Font Family

The sole font is **Roboto**, loaded from Google Fonts with weights 300-900:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
```

Configured in Tailwind:

```js
fontFamily: {
  'sans': ['Roboto', 'system-ui', 'sans-serif'],
}
```

And reinforced in `global.css`:

```css
body {
  font-family: 'Roboto', system-ui, sans-serif;
}
```

### Font Weights

| Weight | Tailwind Class | Usage |
|---|---|---|
| 400 (regular) | `font-normal` (default) | Body text, paragraphs |
| 600 (semibold) | `font-semibold` | Feature card titles, FAQ questions, nav links (CTA buttons via CSS), testimonial names, contact sub-headings |
| 700 (bold) | `font-bold` | H1, H2, H3 headings, logo text, franchise numbers, stat numbers |

### Text Sizes

| Tailwind Class | Where Used |
|---|---|
| `text-xs` | Hero badge text, WhyChooseUs badge labels, form labels, stat labels, footer copyright, footer language links, contact sub-headings |
| `text-sm` | Paragraph body text across most sections, nav link (via CSS `font-size: 16px`), form inputs, contact links, testimonial names |
| `text-base` | Desktop nav links, hero subtitle (mobile), FAQ question text (mobile), testimonial quote text |
| `text-lg` | Hero subtitle (desktop: `lg:text-lg`), mobile nav links, FAQ question text (desktop: `lg:text-lg`), feature card titles, contact info heading |
| `text-xl` | Section H2 headings (mobile), stat numbers, contact form H3 |
| `text-2xl` | Section H2 headings (desktop: `lg:text-2xl`), navbar logo, product block H2 (mobile), franchise item H3 |
| `text-3xl` | Hero H1 (mobile), product block H2 (desktop: `lg:text-3xl`) |
| `text-4xl` | Hero H1 (sm breakpoint: `sm:text-4xl`), feature card emoji icons |
| `text-[44px]` | Hero H1 (desktop: `lg:text-[44px]`) |
| `text-6xl` | Franchise step numbers (mobile) |
| `text-8xl` | Franchise step numbers (desktop: `lg:text-8xl`) |

### Line Heights and Tracking

| Class | Usage |
|---|---|
| `leading-tight` | H1 hero title, product block H2 headings |
| `leading-relaxed` | All paragraph/body text blocks (descriptions, FAQ answers, about text) |
| `tracking-wider` | Logo text in Navbar and Footer |
| `tracking-tight` | Desktop nav link text |

### Text Color Patterns

- **Headings**: `text-white` (default)
- **Highlighted keywords in headings**: `<span class="text-brand-cyan">keyword</span>`
- **Body/description text**: `text-white/70`
- **Badge/label text**: `text-white/80`
- **Stat labels, form labels**: `text-white/60`
- **Footer muted text**: `text-white/40`
- **Stat numbers**: `text-brand-cyan`
- **Franchise step numbers**: `text-brand-magenta/30` or `text-brand-cyan/30` (alternating)

---

## Spacing & Layout

### Max Width Container

Every section uses the same max-width wrapper:

```html
<div class="max-w-[1920px] mx-auto">
  <!-- section content -->
</div>
```

The FAQ section also uses an inner constraint: `max-w-[830px] mx-auto`.

### Section Padding

Standard vertical padding for sections:

```
py-16 lg:py-24
```

Some variations exist:
- Hero: `pt-[120px] pb-16 lg:pt-[140px] lg:pb-24` (accounts for fixed navbar height of 100px)
- WhyChooseUs: `py-16 lg:py-20`
- Footer: `py-10`

### Horizontal Padding (varies by section)

| Section | Padding |
|---|---|
| Navbar | `px-6 lg:px-[163px]` |
| Hero | `px-6 lg:px-[170px]` |
| Features | `px-6 lg:px-[253px]` |
| Products | `px-6 lg:px-[172px]` |
| WhyChooseUs | `px-6 lg:px-[405px]` |
| Franchise | `px-6 lg:px-[171px]` |
| About | `px-6 lg:px-[171px]` |
| Gallery | `px-6 lg:px-[163px]` |
| Testimonials | `px-6 lg:px-[166px]` |
| Contact | `px-6 lg:px-[170px]` |
| FAQ | `px-6 lg:px-[546px]` |
| Footer | `px-6 lg:px-[236px]` |

**Pattern**: Always `px-6` on mobile. Desktop padding varies per section to control content width, generally in the range `lg:px-[163px]` to `lg:px-[546px]`.

### Common Gap Patterns

| Gap | Usage |
|---|---|
| `gap-0` | Image+text blocks (Products, About, Franchise) -- no gap between the two halves |
| `gap-3` | FAQ items, hero badge wrap, gallery/testimonial nav buttons |
| `gap-4` | Hero CTA buttons, stat cards, WhyChooseUs badge wrap, footer items, mobile nav links |
| `gap-5` | Contact info items within a column |
| `gap-6` | Feature card grid, testimonial card grid, gallery track, product blocks vertical stack, form fields |
| `gap-8` | Desktop nav links, hero text column content, franchise items, about text blocks, contact info sections |
| `gap-10` | Hero columns (mobile), product blocks vertical, section heading to content |
| `gap-11` | Desktop nav links at lg: `lg:gap-11` |
| `gap-16` | Hero columns at lg: `lg:gap-16` |

### Section Heading Bottom Margin

```
mb-10   -- Gallery, Testimonials, FAQ, Contact
mb-12   -- Features (mobile), About, Franchise details heading
mb-16   -- Features (desktop: lg:mb-16)
mb-20   -- Franchise intro block (desktop: lg:mb-20)
```

### Responsive Breakpoints

| Breakpoint | Prefix | Usage |
|---|---|---|
| 640px | `sm:` | Hero badge widths, gallery image sizes, contact info grid, footer row layout |
| 768px | `md:` | Desktop nav visibility (`hidden md:flex`), mobile menu visibility, testimonial grid columns |
| 1024px | `lg:` | Primary layout breakpoint -- all two-column layouts switch from stacked to side-by-side, desktop padding, text size upgrades |

---

## Background & Effects

### Body Gradient

```css
body {
  background: linear-gradient(180deg, #1a0a2e 0%, #2d1052 30%, #1a0a2e 60%, #2d1052 100%);
}
```

Vertical gradient that oscillates between `brand-dark` and `brand-purple`, creating a rich dark-purple atmosphere.

### Body ::before Overlay

```css
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(93, 24, 150, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(228, 58, 215, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(92, 225, 230, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
```

Fixed overlay with three radial gradients creating ambient color bleed across the viewport. All sections must use `position: relative; z-index: 1;` to appear above this overlay.

### Backdrop Blur Patterns

| Element | Classes |
|---|---|
| Navbar | `bg-brand-dark/80 backdrop-blur-md` |
| Mobile menu | `bg-brand-dark/95 backdrop-blur-lg` |
| Language dropdown | `bg-brand-dark/95 backdrop-blur-lg` |
| Glass cards | `backdrop-filter: blur(10px)` (via `.glass-card` in CSS) |

### Glass Card Effect (`.glass-card`)

```css
.glass-card {
  background: rgba(45, 16, 82, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(92, 225, 230, 0.15);
  border-radius: 16px;
}
```

Used in: Hero badges, Feature cards, WhyChooseUs badges, About stat cards, Testimonial cards.

Hover state added via Tailwind on some cards: `hover:border-brand-cyan/30 transition-colors`

### Gradient Border Effect

```css
.gradient-border {
  background: linear-gradient(135deg, rgba(228, 58, 215, 0.4), rgba(92, 225, 230, 0.4));
  padding: 1px;
  border-radius: 12px;
}

.gradient-border-inner {
  background: rgba(26, 10, 46, 0.95);
  border-radius: 11px;
}
```

Creates a 1px gradient border by using the outer element as a gradient background with 1px padding, and the inner element fills the rest. Used in FAQ accordion items.

HTML pattern:

```html
<div class="gradient-border">
  <div class="gradient-border-inner">
    <!-- content here -->
  </div>
</div>
```

### Decorative Glow Elements

Hero section uses a large blurred ellipse for ambient glow:

```html
<div class="absolute -left-20 -top-20 w-[390px] h-[405px] bg-brand-magenta/20 rounded-full blur-[100px] pointer-events-none"></div>
```

Pattern: Absolutely positioned, `rounded-full`, brand color at low opacity, large `blur-[]`, and `pointer-events-none`.

---

## Component Patterns

### Buttons

#### `.btn-primary` (Magenta CTA)

```css
.btn-primary {
  background: #e43ad7;
  color: white;
  padding: 16px 25px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.btn-primary:hover {
  background: #c92abf;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(228, 58, 215, 0.4);
}
```

Usage examples:

```html
<a href="#contact" class="btn-primary">Get the system</a>
<button type="submit" class="btn-primary w-fit">Send message</button>
```

#### `.btn-outline` (Transparent with Border)

```css
.btn-outline {
  background: transparent;
  color: white;
  padding: 16px 25px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid rgba(228, 58, 215, 0.6);
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}

.btn-outline:hover {
  border-color: #e43ad7;
  background: rgba(228, 58, 215, 0.1);
  transform: translateY(-2px);
}
```

Usage: Secondary actions next to a primary CTA.

```html
<a href="#franchise" class="btn-outline">Explore franchise</a>
```

Both buttons share: `padding: 16px 25px`, `border-radius: 10px`, `font-weight: 600`, `font-size: 16px`, `transition: all 0.3s ease`, and a `-2px translateY` on hover.

### Cards

#### Glass Card Content Layout

Feature cards (centered content):

```html
<div class="glass-card p-8 flex flex-col items-center text-center gap-4 hover:border-brand-cyan/30 transition-colors">
  <span class="text-4xl">{icon emoji}</span>
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-sm text-white/70 leading-relaxed">{description}</p>
</div>
```

Badge cards (compact, centered):

```html
<div class="glass-card px-5 py-4 flex flex-col items-center gap-2 w-[150px] sm:w-[180px]">
  <svg class="w-8 h-8 text-brand-cyan" ...></svg>
  <span class="text-xs text-center text-white/80">{label}</span>
</div>
```

Testimonial cards (top-aligned text, bottom-aligned author):

```html
<div class="glass-card p-8 flex flex-col justify-between gap-8">
  <p class="text-base text-white/80 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
  <div class="flex items-center gap-4">
    <div class="w-[60px] h-[60px] rounded-full overflow-hidden bg-brand-purple/60 shrink-0">
      <img src={avatar} alt={name} class="w-full h-full object-cover" loading="lazy" />
    </div>
    <span class="font-semibold text-sm">{name}</span>
  </div>
</div>
```

Stat cards:

```html
<div class="glass-card px-6 py-5 text-center min-w-[180px]">
  <div class="text-xl font-bold text-brand-cyan">{number}</div>
  <div class="text-xs text-white/60 mt-1">{label}</div>
</div>
```

### Section Headings

Standard section heading pattern:

```html
<h2 class="text-xl lg:text-2xl font-bold text-center mb-10">
  {translated title text}
</h2>
```

With brand keyword highlight:

```html
<h2 class="text-xl lg:text-2xl font-bold text-center mb-12 lg:mb-16">
  What is <span class="text-brand-cyan">&laquo;Brain Ring&raquo;</span>?
</h2>
```

Product block headings (left-aligned, larger):

```html
<h2 class="text-2xl lg:text-3xl font-bold leading-tight">
  Question packages <span class="text-brand-cyan">&laquo;Brain Ring&raquo;</span>
</h2>
```

Hero H1:

```html
<h1 class="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight">
  Intellectual game
  <span class="text-brand-cyan">Brain Ring</span>
  for events, schools and business
</h1>
```

### Image + Text Blocks

Used in Products, About, and Franchise sections. Two-panel layout with no gap, rounded container.

Standard order (text left, image right):

```html
<div class="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden">
  <!-- Text panel -->
  <div class="lg:w-[55%] bg-brand-purple/40 p-8 lg:p-14 flex flex-col gap-6">
    <h2>...</h2>
    <p class="text-sm text-white/70 leading-relaxed">...</p>
    <a href="#contact" class="btn-primary">CTA</a>
  </div>
  <!-- Image panel -->
  <div class="lg:w-[45%] min-h-[300px] bg-brand-purple/60">
    <img src="..." alt="..." class="w-full h-full object-cover" loading="lazy" />
  </div>
</div>
```

Reversed order (image left, text right):

```html
<div class="flex flex-col lg:flex-row-reverse gap-0 rounded-2xl overflow-hidden">
  <!-- same structure, panels swap visual position -->
</div>
```

Width splits used:
- Products: `lg:w-[60%]` text / `lg:w-[40%]` image, with `lg:p-16` padding
- About & Franchise: `lg:w-[55%]` text / `lg:w-[45%]` image, with `lg:p-14` padding

Image panel always has: `min-h-[280px]` or `min-h-[300px]`, `bg-brand-purple/60` as fallback, `object-cover` on the `<img>`.

Container always has: `rounded-2xl overflow-hidden` and `gap-0`.

### Form Elements

#### Text Inputs (underline style)

```html
<label for="name" class="text-xs text-white/60 mb-1 block">Name</label>
<input
  type="text"
  id="name"
  name="name"
  required
  class="w-full bg-transparent border-b border-white/30 pb-2 text-white text-sm outline-none focus:border-brand-cyan transition-colors placeholder:text-white/30"
  placeholder="Your name"
/>
```

Key properties: transparent background, bottom-border only (`border-b`), `border-white/30` default, `focus:border-brand-cyan` on focus, white text, `placeholder:text-white/30`.

#### Textarea (boxed style)

```html
<textarea
  id="message"
  name="message"
  rows="4"
  class="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors resize-none placeholder:text-white/30"
  placeholder="Your message"
></textarea>
```

Key properties: subtle background (`bg-white/5`), full border (`border-white/10`), `rounded-lg`, padding, same focus and placeholder colors.

#### Form Layout

```html
<form class="flex flex-col gap-6">
  <!-- fields -->
  <button type="submit" class="btn-primary w-fit">Submit</button>
  <p id="form-status" class="text-sm hidden"></p>
</form>
```

Status messages use: `text-brand-cyan` for loading, `text-green-400` for success, `text-red-400` for error.

### Icons

#### SVG Inline Icons (Heroicons style)

All icons are inline SVGs using the Heroicons outline style:

```html
<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..." />
</svg>
```

Properties: `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.

#### Icon Sizes

| Size | Usage |
|---|---|
| `w-3 h-3` | Language switcher chevron |
| `w-4 h-5` | Contact phone icon (slightly non-square) |
| `w-5 h-5` | Most inline icons (nav, gallery arrows, FAQ chevron, contact info, footer social, testimonial arrows) |
| `w-8 h-8` | Hero badge icons |

#### Icon Colors

- **Functional icons (info, nav)**: `text-brand-cyan`
- **Social media (Instagram)**: `text-brand-magenta` (fill-based SVG with `fill="currentColor"`)
- **Social media (Telegram)**: `text-brand-cyan` (fill-based SVG with `fill="currentColor"`)
- **Nav/gallery arrows**: `text-white` (inherits from parent via `stroke="currentColor"`)
- **Footer social default**: `text-white/50`

#### Emoji Usage

Feature cards and WhyChooseUs badges use emoji as icons:

```html
<span class="text-4xl">{emoji}</span>   <!-- Feature cards -->
<span class="text-3xl">{emoji}</span>   <!-- WhyChooseUs badges -->
```

### FAQ Accordion

Complete pattern:

```html
<div class="gradient-border">
  <div class="gradient-border-inner">
    <button
      class="faq-toggle w-full flex items-center justify-between p-6 text-left"
      aria-expanded="false"
      data-index={i}
    >
      <span class="text-base lg:text-lg font-semibold pr-4">{question}</span>
      <svg class="w-5 h-5 shrink-0 transition-transform duration-300" ...>
        <!-- chevron down icon -->
      </svg>
    </button>
    <div class="faq-content overflow-hidden transition-all duration-300 max-h-0">
      <p class="px-6 pb-6 text-sm text-white/70 leading-relaxed">{answer}</p>
    </div>
  </div>
</div>
```

Toggle behavior (vanilla JS):
- Open: Add `max-h-[500px]`, remove `max-h-0`, add `rotate-180` to chevron SVG
- Close: Remove `max-h-[500px]`, add `max-h-0`, remove `rotate-180` from chevron SVG
- Uses `aria-expanded` attribute for accessibility

### Gallery Carousel

Horizontal scroll track with CSS transform:

```html
<div class="relative overflow-hidden">
  <div id="gallery-track" class="flex gap-6 transition-transform duration-500 ease-in-out">
    <!-- items with flex-none and fixed widths -->
    <div class="flex-none w-[280px] sm:w-[387px] h-[200px] sm:h-[222px] rounded-xl overflow-hidden bg-brand-purple/60">
      <img src="..." class="w-full h-full object-cover" loading="lazy" />
    </div>
    <!-- larger items -->
    <div class="flex-none w-[500px] sm:w-[782px] h-[300px] sm:h-[450px] rounded-xl overflow-hidden bg-brand-purple/60">
      ...
    </div>
  </div>
</div>
```

Navigation buttons pattern (shared with Testimonials):

```html
<div class="hidden sm:flex gap-3">
  <button class="w-[55px] h-[55px] rounded-full border border-white/20 flex items-center justify-center hover:border-brand-cyan/50 transition-colors" aria-label="Prev">
    <svg class="w-5 h-5"><!-- left chevron --></svg>
  </button>
  <button class="w-[55px] h-[55px] rounded-full border border-white/20 flex items-center justify-center hover:border-brand-cyan/50 transition-colors" aria-label="Next">
    <svg class="w-5 h-5"><!-- right chevron --></svg>
  </button>
</div>
```

### Navbar

Fixed at top, 100px height:

```html
<nav class="fixed top-0 left-0 right-0 z-50 h-[100px] flex items-center bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
```

Logo pattern (used in both Navbar and Footer):

```html
<a href="/" class="flex items-center gap-1 text-2xl font-bold tracking-wider shrink-0">
  <span class="text-brand-cyan">BRING</span>
  <span class="inline-flex items-center justify-center w-8 h-8 border-2 border-brand-magenta rounded-md">
    <span class="w-2.5 h-2.5 bg-brand-cyan rounded-sm"></span>
  </span>
</a>
```

Footer logo is identical but smaller: `text-xl`, `w-6 h-6` outer box, `w-2 h-2` inner dot.

Mobile menu toggle: Three `<span>` bars with hamburger-to-X animation using `rotate-45`, `translate-y-2`, `opacity-0`, `-rotate-45`, `-translate-y-2` transforms.

### Footer

```html
<footer class="py-10 px-6 lg:px-[236px] border-t border-white/10">
  <div class="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <!-- Logo -->
    <!-- Copyright: text-xs text-white/40 -->
    <!-- Language links: text-xs, active=text-brand-cyan, inactive=text-white/40 -->
    <!-- Social icons: text-white/50, hover:text-brand-magenta (IG) or hover:text-brand-cyan (TG) -->
  </div>
</footer>
```

---

## Responsive Design Rules

### Mobile-First Approach

All components are designed mobile-first. Base styles target mobile; `sm:`, `md:`, and `lg:` prefixes add desktop enhancements.

### Breakpoint Usage Patterns

| Breakpoint | Layout Changes |
|---|---|
| Base (< 640px) | Single column, stacked layouts, `px-6` padding, smaller text, smaller badge/image widths |
| `sm:` (>= 640px) | Badge widths increase (`w-[150px]` -> `sm:w-[180px]`), gallery images enlarge, contact grid becomes 2-col, footer becomes row |
| `md:` (>= 768px) | Desktop nav shows / mobile hamburger hides, testimonial grid becomes 3-col |
| `lg:` (>= 1024px) | Two-column layouts activate (flex-row), desktop padding applied, text sizes increase, larger internal padding (p-14, p-16) |

### Mobile Menu Behavior

- Hidden by default (`hidden md:hidden`)
- Toggle via JavaScript on hamburger click
- Slides below navbar at `top-[100px]`
- Full-width, `bg-brand-dark/95 backdrop-blur-lg`
- Links stack vertically with `gap-4`, `text-lg`, `py-2`
- Closes when any link is clicked

### Grid Column Changes

| Component | Mobile | sm | md | lg |
|---|---|---|---|---|
| Features | 1 col | 2 col | 2 col | 4 col |
| Testimonials | 1 col | 1 col | 3 col | 3 col |
| Contact info | 1 col | 2 col | 2 col | 2 col |

---

## i18n Integration

### File Structure

- `src/i18n/ui.ts` -- All translations as a nested object keyed by language (`en`, `ru`, `ro`)
- `src/i18n/utils.ts` -- Helper functions for accessing translations

### Type Definition

```typescript
export const defaultLang = 'en' as const;
export type Lang = 'en' | 'ru' | 'ro';
```

### Translation Functions

**`useTranslations(lang)`** -- Returns a function `t(key)` that resolves dot-notation keys:

```typescript
const t = useTranslations(lang);
t('hero.title1');  // returns translated string
```

Falls back to `defaultLang` (English) if key is missing in the requested language.

**`useTranslatedArray(lang)`** -- Returns a function `ta(key)` that resolves to an array:

```typescript
const ta = useTranslatedArray(lang);
const items = ta('features.items');  // returns array of objects
```

**`getLocalizedPath(path, lang)`** -- Generates localized URLs:

```typescript
getLocalizedPath('/', 'en')  // returns '/'
getLocalizedPath('/', 'ru')  // returns '/ru/'
```

**`getLangFromUrl(url)`** -- Extracts language from URL pathname.

### Component Import Pattern

Every component follows this exact pattern:

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
// Add useTranslatedArray if the component uses array data
import { useTranslations, useTranslatedArray } from '../i18n/utils';

interface Props { lang?: Lang; }
const { lang = 'en' } = Astro.props;
const t = useTranslations(lang);
const ta = useTranslatedArray(lang);  // only if needed
---
```

### Adding Translations for a New Component

1. Open `src/i18n/ui.ts`
2. Add keys under each language block (`en`, `ru`, `ro`):

```typescript
export const ui = {
  en: {
    // ... existing keys ...
    myComponent: {
      title: 'My Title',
      description: 'My description',
      items: [
        { label: 'Item 1', text: 'Description 1' },
        { label: 'Item 2', text: 'Description 2' },
      ],
    },
  },
  ru: {
    myComponent: {
      title: '...',
      // ...
    },
  },
  ro: {
    myComponent: {
      title: '...',
      // ...
    },
  },
};
```

3. Access in the component:

```astro
const t = useTranslations(lang);
const ta = useTranslatedArray(lang);
const title = t('myComponent.title');
const items = ta('myComponent.items');
```

---

## Adding a New Component Checklist

1. **Create the file**: `src/components/MyComponent.astro`

2. **Add the i18n boilerplate** at the top of the frontmatter:
   ```astro
   ---
   import type { Lang } from '../i18n/ui';
   import { useTranslations, useTranslatedArray } from '../i18n/utils';

   interface Props { lang?: Lang; }
   const { lang = 'en' } = Astro.props;
   const t = useTranslations(lang);
   ---
   ```

3. **Add translations** to `src/i18n/ui.ts` for all three languages (`en`, `ru`, `ro`). Always add English first, then Russian, then Romanian.

4. **Wrap in a `<section>` tag** with standard spacing:
   ```html
   <section id="my-section" class="py-16 lg:py-24 px-6 lg:px-[170px]">
     <div class="max-w-[1920px] mx-auto">
       <!-- content -->
     </div>
   </section>
   ```

5. **Use existing design tokens**:
   - Colors: Only `brand-dark`, `brand-purple`, `brand-violet`, `brand-magenta`, `brand-cyan`, and white opacity variants
   - Effects: `.glass-card`, `.gradient-border` + `.gradient-border-inner`, `.btn-primary`, `.btn-outline`
   - Text: Follow the established size/weight/color hierarchy

6. **Follow responsive patterns**:
   - Start with mobile layout (single column, `px-6`)
   - Add `sm:`, `md:`, `lg:` enhancements progressively
   - Use `flex flex-col lg:flex-row` for two-column layouts

7. **Add the component** to all page variants:
   - `src/pages/index.astro` (English)
   - `src/pages/ru/index.astro` (Russian)
   - `src/pages/ro/index.astro` (Romanian)

   Pass the `lang` prop:
   ```astro
   <MyComponent lang={lang} />
   ```

8. **Add section z-index**: The `global.css` rule `section { position: relative; z-index: 1; }` handles this automatically for `<section>` elements. If using a different tag, add these properties manually.

9. **Use semantic HTML**: Follow proper heading hierarchy (H2 for section titles, H3 for sub-sections). Use `aria-label` on interactive elements without visible text. Add `loading="lazy"` to images below the fold.

10. **Add `id` attribute** to the section if it should be linkable from the navbar or other anchor links (e.g., `id="my-section"`). Update `navLinks` in `Navbar.astro` if adding a new nav item.

---

## Anti-patterns (What NOT to Do)

### Colors
- Do NOT use colors outside the defined palette (no arbitrary hex values in Tailwind classes)
- Do NOT use opaque solid backgrounds on content areas (always use transparency: `bg-brand-purple/40`, not `bg-brand-purple`)
- Do NOT use Tailwind's default color palette (no `bg-blue-500`, `text-gray-300`, etc.) except for `text-green-400` and `text-red-400` in form status messages

### Typography
- Do NOT use fonts other than Roboto
- Do NOT use `font-black` (`900`) or `font-light` (`300`) -- only `400`, `600`, and `700` are used in components
- Do NOT use `text-white` for body/description text -- use `text-white/70` instead

### Content
- Do NOT hardcode user-visible text strings -- always use the i18n system (`t()` and `ta()`)
- Do NOT add translations for only one language -- always add all three (en, ru, ro)
- Do NOT use `&quot;` for quotation marks around brand names -- use `&laquo;` and `&raquo;` (guillemets) as established in Features and Products

### Layout
- Do NOT skip responsive breakpoints -- every component must work on mobile (`px-6`, single column) and desktop (`lg:` prefix)
- Do NOT use `max-w-7xl` or other Tailwind max-width defaults -- use `max-w-[1920px]`
- Do NOT add gap between image and text panels in split layouts -- always `gap-0` with `rounded-2xl overflow-hidden` on the container
- Do NOT forget `position: relative; z-index: 1` for content above the body overlay (automatic for `<section>` tags)

### Effects
- Do NOT use opaque solid backgrounds for cards -- use `.glass-card` or semi-transparent `bg-brand-purple/XX`
- Do NOT use `box-shadow` for card outlines -- use `border` with low-opacity brand colors
- Do NOT break the dark theme -- everything must work against the dark purple gradient background
- Do NOT add light/white backgrounds anywhere

### Images
- Do NOT forget `loading="lazy"` on images below the fold (only the hero image uses `loading="eager"`)
- Do NOT forget `width` and `height` attributes on `<img>` tags for layout stability
- Do NOT forget `alt` text (use translated alt text via `t()`)
- Do NOT use `rounded` classes on images directly when the parent has `overflow-hidden` -- the parent handles clipping

### JavaScript
- Do NOT use frameworks for simple interactivity -- use vanilla JS in `<script>` tags (Astro pattern)
- Do NOT forget to clean up event listeners or use optional chaining (`?.`) when querying DOM elements
- Do NOT use `console.log` in production code
