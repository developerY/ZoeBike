# AshBike Design Language & Replication Guide

A complete visual, typographic, color, layout, and component specification for replicating the **AshBike** web experience across **ZoeBike**.

---

## 1. Aesthetic Direction & Core Principles

AshBike's design language embodies **Sunlit Civic Mobility**: crisp daylight clarity, architectural restraint, and optimistic energy. It avoids dark-mode tech tropes in favor of an open, breathable, park-and-coast inspired visual system.

### Guiding Principles
1. **Daylight-First Light Mode**: Pure white (`#FFFFFF`) and cool slate (`#F8FAFC`) surfaces establish a clean editorial canvas (`color-scheme: light` enforced globally).
2. **Park-Healthy Emerald as Primary Anchor**: Vibrant Emerald Green (`#059669` / `#047857`) drives all primary calls to action, active navigation indicators, sliders, and primary kickers.
3. **Coastal & Mineral Accent Harmony**: Deep Ocean Blue (`#0B4F78`), Sea-Glass Green (`#1C6E63`), Mineral Grey (`#EEF2F4`), and warm Pearl (`#FAF9F6`) add visual richness and semantic differentiation across secondary cards, metrics, filters, and links—without competing with the Emerald primary actions.
4. **Border-Defined Flat Elevation**: Structural hierarchy comes from crisp `1px` hairline borders and surface contrast (`White` vs. `Slate 50` vs. `Pearl`), rather than heavy drop shadows.
5. **Zero-Pill Metadata Discipline**: Category labels, platforms, and dates are rendered as clean typographic text separated by middle dots (`·`)—never wrapped in decorative pill badges or pulsing status dots.
6. **Editorial Precision with Live Interactivity**: Every page pairs spacious editorial storytelling with hands-on light-mode interactive tools (simulators, calculators, segmented switchers, and clean validated forms).

---

## 2. Color System

### 2.1 Base Foundation (Tailwind v4 Defaults)

| Token / Class | Hex | Usage |
|---|---|---|
| `bg-white` | `#FFFFFF` | Primary page canvas, header, elevated cards, inputs |
| `bg-slate-50` | `#F8FAFC` | Alternating section backgrounds, footer, secondary buttons |
| `bg-slate-100` | `#F1F5F9` | Media/image frame loading backgrounds |
| `border-slate-200` | `#E2E8F0` | Primary section dividers, standard card borders, header/footer hairlines |
| `border-slate-300` | `#CBD5E1` | Form input borders, hover card borders, disabled primary buttons |
| `text-slate-400` | `#94A3B8` | Input placeholders, muted/available status labels |
| `text-slate-500` | `#64748B` | Captions, metadata lines, helper text, footer fine print |
| `text-slate-600` | `#475569` | Body paragraphs, inactive navigation links, secondary icons |
| `text-slate-700` | `#334155` | Form labels, list items, neutral button text |
| `text-slate-800` | `#1E293B` | Sub-labels, metric titles, secondary button labels |
| `text-slate-900` | `#0F172A` | Primary headings (`h1`–`h4`), wordmark, high-emphasis values, dark secondary CTA |

### 2.2 Primary Brand Color (Emerald Green — Park / Healthy)

| Token / Class | Hex | Usage |
|---|---|---|
| `emerald-600` | `#059669` | Primary CTA button fills, active nav underline, range slider `accent-emerald-600`, active card borders (`border-2`), primary icons, focus rings |
| `emerald-700` | `#047857` | Primary CTA hover fill, section kickers (`01. Core Architecture`), inline links, highlighted primary metrics |
| `emerald-800` | `#065F46` | Hover state for Emerald links, active mobile nav text, success banner headings |
| `emerald-50` | `#ECFDF5` | Active mobile nav item background, form success alert background (`bg-emerald-50/70`) |
| `emerald-100` | `#D1FAE5` | Text highlight selection background (`selection:bg-emerald-100`) |
| `emerald-200` | `#A7F3D0` | Form success alert border |
| `emerald-300` | `#6EE7B7` | Essay card hover border accent |
| `emerald-900` | `#064E3B` | Text highlight selection foreground (`selection:text-emerald-900`) |

### 2.3 Supporting Coastal & Mineral Accent Tokens (Custom `@theme`)

| CSS Variable | Tailwind Class Example | Hex | Usage |
|---|---|---|---|
| `--color-pearl` | `bg-pearl` | `#FAF9F6` | Warm off-white feature cards, Bento showcase cards, App directory cards, Essay cards, Waitlist callout, selected sensor cards |
| `--color-mineral` | `bg-mineral` | `#EEF2F4` | Segmented tab tracks, inactive filter chips, empty Bike Tower bays, secondary button hover state, neutral info tiles |
| `--color-mineral-line` | `border-mineral-line` | `#D4DEE4` | Subtle cool-stone borders paired with `bg-pearl` and `bg-mineral` surfaces |
| `--color-ocean` | `text-ocean` / `bg-ocean` | `#0B4F78` | Deep Ocean Blue: Navigation category filter, H₂ E-Bike kicker & link, footer link hover, Medium outbound links, regenerative/hardware numeric readouts |
| `--color-ocean-deep` | `hover:text-ocean-deep` | `#083A59` | Hover state for Deep Ocean Blue text links |
| `--color-ocean-mist` | `bg-ocean-mist` | `#EAF2F7` | Soft coastal blue tint for icon boxes (Sensor detail), Weatherproof & Slip-Risk stat cards, Wind & Lighting route card |
| `--color-ocean-line` | `border-ocean-line` | `#BFD6E4` | Hairline border paired with `bg-ocean-mist` |
| `--color-seaglass` | `text-seaglass` / `bg-seaglass` | `#1C6E63` | Sea-Glass Green: Tuning & Shifting filter, Ride Experience Mode buttons, Bike Tower kicker & link, Cycle Rickshaw kicker, active energy metrics, essay topic labels |
| `--color-seaglass-deep` | `hover:text-seaglass-deep` | `#15564D` | Hover state for Sea-Glass text links |
| `--color-seaglass-mist` | `bg-seaglass-mist` | `#E7F4F1` | Soft sea-glass tint for App Switcher icon box, occupied Bike Tower bays, Gamification/Perk route card |
| `--color-seaglass-line` | `border-seaglass-line` | `#B6DBD4` | Hairline border paired with `bg-seaglass-mist` |

### 2.4 Semantic Validation Color

| Token / Class | Hex | Usage |
|---|---|---|
| `text-rose-600` | `#E11D48` | Inline form validation error messages only |

### 2.5 Color Proportions & Rules
- **~65% Crisp Neutral Canvas**: `#FFFFFF` and `#F8FAFC` with `#0F172A` / `#475569` slate typography.
- **~15% Soft Secondary Surfaces**: `Pearl (#FAF9F6)` and `Mineral (#EEF2F4)` for featured cards, controls, and recessed panels.
- **~12% Emerald Primary**: All main CTAs (`Plan a Ride`, `Explore Smartphone Fusion`, `Park Bike in Tower`, `Request Updates`, `Send Message`), active nav underlines, primary kickers, and slider tracks.
- **~8% Coastal Accents (`Ocean` & `Sea-Glass`)**: Used intentionally to distinguish parallel pillars (e.g., *Emerald* = Brakes/Safety, *Sea-Glass* = Bike Tower/Tuning/Active Energy, *Deep Ocean* = H₂ Concept/Navigation/Weather/External Links). Never stack all three vivid accent fills side-by-side as competing buttons unless they represent distinct filter categories.

---

## 3. Typography

### 3.1 Font Families & Loading

AshBike uses a three-font Google Fonts pairing:
- **Display (`--font-display`)**: **Outfit** (weights `400, 500, 600, 700`) — geometric, friendly, architectural headlines and large stat figures.
- **Body (`--font-sans`)**: **Plus Jakarta Sans** (weights `400, 500, 600, 700`) — crisp, highly legible UI copy and prose.
- **Monospace (`--font-mono`)**: **JetBrains Mono** (weights `400, 500`) — sensor telemetry, elevation/distance readouts, wattage, bay counters, and slider bounds.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 3.2 Type Scale & Stylistic Rules

| Role | Font | Tailwind Classes | Notes |
|---|---|---|---|
| **Home Hero H1** | Outfit | `font-display font-bold text-slate-900 tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-[3.5rem]` | `text-wrap: balance` applied via base CSS |
| **Subpage Hero H1** | Outfit | `font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.08]` | Used on Tech, Hardware, Cities, Info |
| **Section H2** | Outfit | `font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight` | `text-wrap: balance` applied |
| **Feature Card H3** | Outfit | `font-display text-2xl font-bold text-slate-900 tracking-tight` | Bento pillars, spotlights, active detail panels |
| **Compact Card H3** | Outfit | `font-display text-lg font-semibold text-slate-900` | Grid cards (benefits, sensors, commerce, rickshaws) |
| **Section Kicker** | Plus Jakarta Sans | `text-sm font-medium text-emerald-700` (or `text-ocean` / `text-seaglass`) | Numbered editorial prefix: `01. Core Architecture` |
| **Card Kicker** | Plus Jakarta Sans | `text-xs font-medium text-slate-500` (or `text-emerald-700` / `text-seaglass` / `text-ocean`) | Plain text, middle-dot separated (`Urban Parking · Micro-Mobility`) |
| **Hero Lead Copy** | Plus Jakarta Sans | `text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl` | Generous line height |
| **Standard Body** | Plus Jakarta Sans | `text-sm text-slate-600 leading-relaxed` | Card descriptions & legal prose |
| **Metadata / Footnote** | Plus Jakarta Sans | `text-xs text-slate-500` | Platform lists, helper hints, timestamps |
| **Display KPI Figure** | Outfit | `font-display text-2xl sm:text-3xl font-bold tabular-nums` | Always pair with `.tabular-nums` (`font-variant-numeric: tabular-nums`) |
| **Mono Telemetry / Unit** | JetBrains Mono | `font-mono text-sm font-semibold tabular-nums` (or `text-xl` / `text-2xl` for live sliders) | Prevents layout jitter when slider values change |

---

## 4. Layout, Grid & Spacing Rhythm

### 4.1 Page Container
Every section, header, and footer aligns strictly to a centered `1280px` container:
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">...</div>
```

### 4.2 Alternating Section Cadence
Sections alternate between `bg-white` and `bg-slate-50` separated by `border-b border-slate-200` (the final section before the `bg-slate-50` footer may omit `border-b` if the footer supplies `border-t border-slate-200`).

| Section Type | Vertical Padding |
|---|---|
| Home Hero | `py-12 lg:py-20` |
| Subpage Hero | `py-14 lg:py-20` |
| Standard Content Band | `py-16 lg:py-20` |
| Major Interactive Showcase | `py-16 lg:py-24` |
| Footer | `py-14` |

### 4.3 Core Responsive Grid Patterns
- **Split Hero (12-col)**: `grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch` — left `lg:col-span-6` text column (`flex flex-col justify-between space-y-8`) matched in height with right `lg:col-span-6` photography container (`min-h-[300px] lg:min-h-[440px]`).
- **4-Column Impact Strip**: `mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8` anchored beneath the hero above the fold.
- **Asymmetric Bento Grid**: `grid grid-cols-1 lg:grid-cols-3 gap-6` combining two `lg:col-span-2` split image+copy cards (`bg-pearl`) with two `lg:col-span-1` editorial cards (`bg-white`).
- **Interactive Master-Detail / Calculator (5/7 split)**: `grid grid-cols-1 lg:grid-cols-12 gap-8` (or `gap-10`), pairing a `lg:col-span-5` control panel (or sticky detail inspector `sticky top-24`) with a `lg:col-span-7` result grid or readout card.
- **4-Column Editorial Cards**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` for uniform benefit grids.
- **3-Column Directory Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` for Apps and Essays.

---

## 5. Elevation, Borders & Corner Radii

AshBike deliberately avoids glowing drop shadows and glassmorphic clutter.

| Element | Border | Radius | Shadow |
|---|---|---|---|
| Sticky Navbar | `border-b border-slate-200` | none | none (`bg-white/95 backdrop-blur-md`) |
| Major Cards & Media Frames | `border border-slate-200` or `border-mineral-line` | `rounded-2xl` (`16px`) | none |
| Selected Interactive Card | `border-2 border-emerald-600` | `rounded-2xl` (`16px`) | none |
| Nested Stat / Info Callouts | `border-mineral-line` / `border-ocean-line` / `border-seaglass-line` | `rounded-xl` (`12px`) | none |
| Buttons, Inputs & Filter Chips | None (solid) or `border-slate-200` / `border-slate-300` | `rounded-xl` (`12px`) | none |
| Icon Containers (`44px`–`48px`) | `border-ocean-line` or `border-seaglass-line` | `rounded-xl` (`12px`) | none |
| Segmented Tab Track | `border border-mineral-line` or `border-slate-200` (`p-1.5` / `p-1`) | `rounded-xl` (`12px`) | none |
| Active Segmented Tab Button | none | `rounded-lg` (`8px`) | `shadow-sm` (only shadow in system) |

---

## 6. Component Blueprints

### 6.1 Three-Zone Sticky Navbar
- **Height**: `h-16` (`64px`), `sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200`.
- **Zone 1 (Left)**: Plain typographic wordmark (`font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0`, optionally paired with a `h-7 w-7 rounded-lg` logo mark on ZoeBike).
- **Zone 2 (Center)**: Concise single-line links (`gap-7 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0`). Active state uses an Emerald underline:
  `text-slate-900 underline decoration-emerald-600 decoration-2 underline-offset-8`.
- **Zone 3 (Right)**: Single primary Emerald button (`Plan a Ride`) on `sm+` screens, plus a `44×44px` (`w-11 h-11`) mobile menu button on `< md` viewports.
- **Mobile Drawer**: Full-width white dropdown (`border-t border-slate-200 bg-white px-4 py-4 space-y-2`) with active links highlighted in `bg-emerald-50 text-emerald-800 font-semibold`.

### 6.2 Buttons & Links

```html
<!-- Primary CTA (Emerald) -->
<button class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">explore</mat-icon>
  <span>Primary Action</span>
</button>

<!-- Secondary Neutral Button -->
<button class="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-mineral border border-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0">
  <span>Secondary Action</span>
  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">arrow_forward</mat-icon>
</button>

<!-- Dark Slate Emphasis Action (inside neutral cards) -->
<a class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0">
  <span>Open Architecture</span>
  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">arrow_forward</mat-icon>
</a>

<!-- Inline Editorial Directional Link (Emerald / Sea-Glass / Ocean) -->
<a class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
  <span>Inspect Sensor Suite</span>
  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">arrow_forward</mat-icon>
</a>
```

### 6.3 Cards & Tinted Callouts
- **Standard White Card**: `bg-white rounded-2xl border border-slate-200 p-6` (or `p-7 sm:p-8` for major blocks).
- **Pearl Editorial / Bento Card**: `bg-pearl rounded-2xl border border-mineral-line p-6` (hoverable essay cards add `hover:bg-white hover:border-emerald-300 transition-colors`).
- **Tinted Coastal Sub-Cards** (used inside simulators & configurators for 3-way semantic differentiation):
  - **Deep Ocean Mist**: `p-4 rounded-xl bg-ocean-mist border border-ocean-line` (text highlight: `text-ocean`).
  - **Mineral Neutral**: `p-4 rounded-xl bg-mineral border border-mineral-line` (text highlight: `text-slate-900`).
  - **Sea-Glass Mist**: `p-4 rounded-xl bg-seaglass-mist border border-seaglass-line` (text highlight: `text-seaglass`).

### 6.4 Segmented Tabs & Multi-Accent Filter Chips
- **Segmented Track**: `flex flex-wrap items-center gap-1.5 p-1.5 bg-mineral rounded-xl border border-mineral-line`.
  - Active Tab: `px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-white text-slate-900 shadow-sm whitespace-nowrap shrink-0`.
  - Inactive Tab: `px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0`.
- **White Track Variant** (when placed on `bg-slate-50`): Track is `bg-white rounded-xl border border-slate-200 p-1.5`, active tab is `bg-emerald-600 text-white rounded-lg`.
- **Category Filter Chips**: Inactive chips use `bg-mineral text-slate-700 hover:bg-slate-200 rounded-xl px-4 py-2 text-xs font-medium`. Active chips map semantically:
  - All / Surface: `bg-slate-900 text-white`
  - Safety / Terrain: `bg-emerald-600 text-white`
  - Tuning / Ride Mode: `bg-seaglass text-white`
  - Navigation: `bg-ocean text-white`

### 6.5 Sliders & Form Controls
- **Range Slider**: Native `<input type="range">` styled with `w-full accent-emerald-600 cursor-pointer`, paired with a top-right `font-mono text-xl sm:text-2xl font-bold text-emerald-700 tabular-nums` readout and a 3-point `font-mono text-xs text-slate-500` scale beneath.
- **Text / Email / Select / Textarea Inputs**:
  `w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600`
- **Validation Error**: `text-xs text-rose-600 mt-1`.
- **Success State**: `p-5 rounded-xl bg-emerald-50/70 border border-emerald-200` with `text-emerald-800` icon + title and underlined reset action.

### 6.6 Resilient Media & Video Containers
- **Photo Frame**: `rounded-2xl overflow-hidden border border-slate-200 bg-slate-100`.
- **Image Element**: `w-full h-full object-cover transition-transform duration-500 ease-out` with `referrerpolicy="no-referrer"`.
- **Fallback State**: Soft coastal gradient `bg-gradient-to-br from-pearl via-emerald-50/40 to-ocean-mist` with centered `text-emerald-600` `directions_bike` icon and caption.
- **Embedded Video Frame**: White outer card (`bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4`) with title + outbound YouTube link on top and `aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200` below.

### 6.7 Footer
- `border-t border-slate-200 bg-slate-50 text-slate-600`.
- 12-column grid (`md:col-span-4` brand summary, `md:col-span-2` Sustainability, `md:col-span-2` Tech & Store, `md:col-span-4` Salon Dispatch newsletter).
- All footer links transition to Deep Ocean Blue on hover (`hover:text-ocean transition-colors`).
- Bottom legal bar separated by `mt-10 pt-6 border-t border-slate-200` in `text-xs text-slate-500`.

---

## 7. Iconography, Photography & Brand Assets

### 7.1 Icons
- **Library**: Google Material Icons / Material Symbols Outlined (`@import url('https://fonts.googleapis.com/icon?family=Material+Icons');`).
- **Button Icons**: Always explicitly sized to `!text-[18px] !w-[18px] !h-[18px] leading-none` (or `19px` on hero CTA) so icons never misalign vertically with `14px` button text.
- **Inline Check / External Link Icons**: `!text-[15px]`–`!text-[16px]`.
- **Card Feature Icons**: Default `24px` (`mat-icon`), colored via `text-emerald-600`, `text-ocean`, `text-seaglass`, or `text-slate-700`.
- **Icon Containers** (featured panels): `w-11 h-11` or `w-12 h-12 rounded-xl` with matching mist background and line border (`bg-seaglass-mist border-seaglass-line text-seaglass` or `bg-ocean-mist border-ocean-line text-ocean`).

### 7.2 Photography Art Direction
To match the site's sunlit atmosphere, all photography should follow:
- **Lighting**: Bright, natural morning or midday sunlight with warm highlights and soft architectural shadows.
- **Palette**: Light stone plazas, lush park greens, brushed aluminum/matte charcoal bicycle frames, clear blue skies.
- **Composition**: Clean, uncluttered framing; `16:9` for hero banners, `4:3` for technology/hardware/city feature cards.
- **Avoid**: Night scenes, neon glow, moody dark studios, oversaturated HDR, or floating sci-fi holograms.

### 7.3 Brand Mark / Favicon
- ZoeBike Brand Emblem (`/assets/aistudio/image_94c7969d.png`), AI Mission Banner (`/assets/aistudio/image_8bdb0e83.png`), and Signature Cyclist Silhouette Footer Banner (`/assets/aistudio/image_b45294be.png`).

---

## 8. Motion & Accessibility Standards

- **Transitions**: Subtle `transition-colors` on buttons, cards, and links; `transition-transform duration-500 ease-out` on media images. No jarring bounce or parallax animations.
- **Reduced Motion**: Global `@media (prefers-reduced-motion: reduce)` rule collapses all animation/transition durations to `0.01ms` and disables smooth scrolling.
- **Focus Visibility**: All interactive anchors and buttons expose `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600` (with `focus-visible:ring-offset-2` on solid filled buttons).
- **Touch Targets**: Mobile controls maintain at least `44×44px` (`w-11 h-11`).
- **Semantics**: Native `<header>`, `<nav aria-label="...">`, `<main>`, `<footer>`, `role="tablist"`/`role="tab"`/`aria-selected`, and explicit `<label for="...">` bindings on every input and slider.

---

## 9. Anti-Patterns (Do Not Use)

To keep any replica faithful to AshBike:
- **No Dark Mode**: Never invert the page to dark slate/black canvases.
- **No Decorative Pills**: Do not wrap kickers, dates, platforms, or tags in `rounded-full` colored pill badges.
- **No Left-Border Accent Stripes**: Avoid `border-l-4 border-emerald-600` callout bars.
- **No Heavy Shadows**: Never apply `shadow-lg`, `shadow-xl`, or colored glow shadows to cards.
- **No Pulsing Status Dots**: Avoid `animate-pulse` / `animate-ping` live-indicator dots.
- **No `gray-*` Utilities**: Always use `slate-*` neutrals alongside the custom `pearl` and `mineral` tokens.

---

## 10. Copy-Paste Starter Setup (Tailwind CSS v4)

### `src/styles.css`
```css
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import "tailwindcss";

@theme {
  --font-display: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-pearl: #FAF9F6;
  --color-mineral: #EEF2F4;
  --color-mineral-line: #D4DEE4;

  --color-ocean: #0B4F78;
  --color-ocean-deep: #083A59;
  --color-ocean-mist: #EAF2F7;
  --color-ocean-line: #BFD6E4;

  --color-seaglass: #1C6E63;
  --color-seaglass-deep: #15564D;
  --color-seaglass-mist: #E7F4F1;
  --color-seaglass-line: #B6DBD4;
}

@layer base {
  html {
    font-family: var(--font-sans);
    scroll-behavior: smooth;
    color-scheme: light;
    background-color: #ffffff;
    color: #0f172a;
  }

  h1, h2, h3, h4, .font-display {
    font-family: var(--font-display);
  }

  h1, h2 {
    text-wrap: balance;
  }
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `<body>` Baseline Class
```html
<body class="bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
```
