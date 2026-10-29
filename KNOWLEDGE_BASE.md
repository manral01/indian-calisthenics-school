# Calisthenics Website — Knowledge Base

> **Maintenance rule:** Keep this file in sync with the codebase. If a feature is removed or a file is deleted, remove its entry here. If a new file is added, add a section here.

---

## 1. Project Overview

**Business:** Indian Calisthenics School  
**Location:** Madhapur, near Mindspace, Hyderabad, Telangana 500081  
**Website type:** Single-page marketing site with two sub-routes for training detail pages  
**Stack:** React 19 + TypeScript, Vite 8, styled-components 6, Framer Motion 13  
**Deploy target:** Vercel (`@vercel/analytics` integrated)

---

## 2. Tech Stack & Dependencies

### Runtime
| Package | Version | Purpose |
|---|---|---|
| `react` + `react-dom` | ^19.2.8 | UI framework |
| `framer-motion` | ^13.1.0 | All animations — scroll triggers, transitions, springs, drag |
| `styled-components` | ^6.5.2 | All styling — zero Tailwind, zero CSS modules |
| `lucide-react` | ^1.31.0 | Icon set used throughout |
| `@vercel/analytics` | ^2.0.1 | Analytics injected in `App.tsx` |

### Dev
Vite 8.2, TypeScript 6.0, ESLint 10, Prettier 3.9

### What is NOT installed
- No GSAP, no AOS, no react-spring, no Tailwind, no React Router, no Redux / Zustand

---

## 3. Repository Structure

```
calisthenics-website/
├── index.html                     # HTML template: fonts + <!--app-head--> / <!--app-html--> markers filled by prerender
├── vercel.json                    # cleanUrls, non-www → www 301, immutable cache for /assets
├── vite.config.ts                 # ssr.noExternal for styled-components / framer-motion / lucide-react
├── scripts/
│   ├── fetch-reviews.mjs          # Build step 1: real Google reviews → src/data/googleReviews.json (needs env vars)
│   ├── prerender.mjs              # Build step 3: static HTML per route, 404.html, sitemap.xml, SEO warnings
│   └── optimize-images.sh         # One-off: source JPEGs → WebP (800w + 1600w) + public/og-image.jpg
├── public/
│   ├── mainLogo.jpeg              # Favicon + schema logo
│   ├── og-image.jpg               # 1200x630 social share image
│   └── robots.txt                 # Allow all + www sitemap line
└── src/
    ├── main.tsx                   # hydrateRoot on prerendered pages, createRoot in dev
    ├── entry-server.tsx           # render(path) for prerender (styled-components ServerStyleSheet)
    ├── App.tsx                    # ThemeProvider + RouterProvider + Navbar/main/Footer + page switch
    ├── router.tsx                 # RouterProvider, useRouter, <Link> (real <a href>, History API)
    ├── seo/
    │   ├── routes.ts              # ★ Every URL: title, description, breadcrumbs, JSON-LD, lastmod
    │   ├── schema.ts              # SportsActivityLocation, BreadcrumbList, FAQPage, Article builders
    │   └── head.ts                # renderHead (build) / applyHead (client navigation)
    ├── styles/                    # theme.ts, GlobalStyles.ts
    ├── pages/                     # Home, AboutPage, ContactPage, BlogPage (+ BlogPostPage), NotFoundPage
    ├── components/                # Sections + ui.tsx primitives + TrainingPage (all /training/* pages)
    ├── data/
    │   ├── business.ts            # ★ NAP, hours, links, founder — single source for UI + schema
    │   ├── programPages.ts        # Content for the 4 /training/* pages (copy, FAQs, images)
    │   ├── blogPosts.ts           # 3 blog posts (blocks; [label](/path) links)
    │   ├── images.ts              # WebP manifest with width/height/alt
    │   ├── trainingData.ts        # Timings + pricing for calisthenics & kids booking blocks
    │   ├── faq.ts                 # Homepage FAQs (also emitted as FAQPage schema)
    │   └── googleReviews.json     # Generated; empty until Places env vars are set
    └── assets/img/                # Optimised WebP photos (generated)
```

---

## 4. Design System (`src/styles/theme.ts`)

Black theme with a restrained orange accent. Styling is styled-components only.

| Token | Value | Usage |
|---|---|---|
| `colors.background` | `#0A0A0A` | Page background |
| `colors.surface` / `elevated` | `#141414` | Cards |
| `colors.darkSoft` | `#0F0F0F` | Alternate section background |
| `colors.ink` / `white` | `#FFFFFF` | Primary text |
| `colors.muted` | `#A3A3A3` | Secondary text |
| `colors.accent` / `orange` | `#FF6A00` | Accent: CTAs, labels, highlighted heading words (legacy `pink`, `blue`, etc. alias it) |
| `colors.onAccent` | `#0A0A0A` | Text on orange fills (black, for contrast) |
| `gradients.fire` | `#FF7A1A → #FF5A00` | Orange buttons and badges |

Typography: **Inter** (body/UI) + **Inter Tight** (all `h1`/`h2`, bold); `<span>` inside a heading renders orange. Fonts load via `<link>` in `index.html`.
Radius: sm 8 / md 12 / lg 16 / pill. Breakpoints: sm 640, mobile 768, tablet 1024, desktop 1400.

---

## 5. Routing & SEO

Hand-rolled router (`src/router.tsx`), no React Router. All internal links use `<Link to>`, which renders a real `<a href>` (crawlable) and navigates via `pushState`. Hash targets (`/#faq`) scroll after render.

Routes are defined once in `src/seo/routes.ts`:

| Path | Page |
|---|---|
| `/` | Home |
| `/training/calisthenics`, `/training/kids`, `/training/personal-training`, `/training/freestyle-parkour` | `TrainingPage` (content from `programPages.ts`) |
| `/about`, `/contact`, `/blog` | About / Contact / Blog index |
| `/blog/<slug>` (3 posts) | `BlogPostPage` |
| anything else | `NotFoundPage` (noindex) |

**Build pipeline (`npm run build`):** fetch-reviews → `tsc -b` → `vite build` → `vite build --ssr src/entry-server.tsx` → `prerender.mjs`.
Prerender writes `dist/<path>.html` for each route (Vercel `cleanUrls` serves it without `.html`), `dist/404.html` (Vercel returns it with status 404 because there is no SPA rewrite), and `dist/sitemap.xml` from `routes[].lastmod`. It warns about titles > 60 chars, descriptions > 160, and missing business facts.

Adding a page: add content/data → add a `RouteMeta` in `routes.ts` → add a `case` in `App.tsx`'s page switch → bump `lastmod`.

---

## 6. Page Composition (`src/pages/Home.tsx`)

Navbar and Footer are rendered by `App.tsx` on every page. Home sections in order: `Hero` (`#home`, H1 + intro; video only ≥768px, WebP poster otherwise), `Skills` (`#skills`, links to the 4 program pages), `Gallery` (`#gallery`), `Testimonials` (`#testimonials`, real Google reviews only), `Coaching` (`#coaching`), `FAQ` (`#faq`), `Contact` (`#contact`), plus `FloatingCharacter` inside `CharacterProvider`.

The About section was removed from Home; the founder/story lives on `/about` (linked from the nav and footer).

Unused components (not rendered anywhere): `About`, `Programs`, `Journey`, `Videos`, `Blog`, `Collaborations`.

---

## 7. Component Reference

- **`ui.tsx`**: `Container`, `PageSection`, `Eyebrow`, `H2`, `Lead`, `Img` (srcset/width/height/lazy), `RichText`, `Breadcrumbs`, `PageHeader`, `ButtonLink`, `ContactActions` (WhatsApp/Call hidden until `business.phone` is set), `FaqList` (native `<details>`, so answers are in the HTML), `Bullets`.
- **`Navbar.tsx`**: exports `NAV_LINKS`; desktop pill nav ≥1100px, menu button + panel below.
- **`Footer.tsx`**: name, full address, phone (when set), email, hours, all page links, socials, on every page.
- **`TrainingPage.tsx`**: header, highlights, who-it's-for + photos, timings/fees (`Schedule` with `TimingSelector`/`PricingSelector`/`BookingModal` for calisthenics & kids; pricing note for PT/parkour), FAQs.
- **`BookingModal.tsx`**: validates the form, then opens WhatsApp to `business.phone`; falls back to a pre-filled email while no number is set.
- **`Testimonials.tsx`**: renders `googleReviews.json` (author, stars, text, "Google review"). With no reviews, shows a link to the Google listing. No review schema.

---

## 8. Interactive Calisthenics Character System

All files live in `src/components/character/`.

### Architecture

```
CharacterProvider (context)
    └── FloatingCharacter
            ├── useScrollSection()   → which section is visible
            ├── useCharacter()       → overridePose from context
            └── CalisthenicsCharacter (SVG)
                    └── POSES[activePose]  → per-part transforms

About / Skills / Coaching
    └── useCharacter()  → setHoverPose / triggerClickPose
```

### `poses.ts`
Defines `BodyPose` (transform strings for 11 body parts + bar visibility) and `POSES` map.

**All poses:**
| PoseName | Description |
|---|---|
| `standing` | Relaxed upright stance |
| `pushup` | Arms bent, body parallel to floor |
| `dip` | Arms pushing down at sides |
| `lsit` | Body upright, legs forward parallel |
| `planche` | Body horizontal, arms locked, legs straight back |
| `pullup` | Arms up gripping bar, body hanging |
| `muscleup` | Transition above the bar |
| `handstand` | Fully inverted, locked straight |
| `humanflag` | Body horizontal, pole grip |
| `prepare_push` | Pre-pushup lean |
| `prepare_pull` | Pre-pullup reach |
| `prepare_balance` | Pre-handstand balance lean |
| `prepare_skill` | Pre-L-sit prep |

**Section → pose map:**
| Section | Pose |
|---|---|
| `home` | `standing` |
| `about` | `pushup` |
| `skills` | `dip` |
| `programs` | `lsit` |
| `gallery` | `planche` |
| `testimonials` | `pullup` |
| `coaching` | `muscleup` |
| `faq` | `handstand` |
| `contact` | `humanflag` |

### `CalisthenicsCharacter.tsx`
Pure SVG, viewBox `0 0 120 240`. Each body part is a `motion.g` animated with `type: "spring", stiffness: 55, damping: 14, mass: 0.9`. Orange accent on the spine. Orange joint dots at shoulders, elbows, hips, knees. Thin bar element fades in/out for pull-up / muscle-up / human-flag. Drop-shadow filter for depth.

### `useScrollSection.ts`
`IntersectionObserver` with 11 thresholds (0 → 1.0) and `rootMargin: "-10% 0px -10% 0px"`. Tracks visibility ratio per section. Section with highest ratio wins; later sections break ties (smooth downward scroll feel). Returns one of the 9 `SectionId` values.

### `CharacterContext.tsx`
Priority system: **click > hover > scroll**.
- `setHoverPose(pose | null)` — set on pointer enter/leave
- `triggerClickPose(pose)` — fires pose for `2800ms` then auto-reverts (uses `setTimeout`, cancels previous timer on new click)
- `overridePose` — the resolved override (null when scroll-driven)

### `FloatingCharacter.tsx`
Fixed right panel. **Hidden below 1024px.** Layers (bottom → top):
1. Vertical track line (decorative)
2. Track dot — spring-animated to `12% + scrollProgress * 76%`
3. Radial glow div — intensifies on interaction override
4. Pulse ring — CSS `@keyframes` fires on every pose change (keyed by `pulseKey` counter)
5. `CalisthenicsCharacter` SVG — lifts 8px + stronger drop-shadow during override
6. Pose label — `AnimatePresence` fade per pose

---

## 9. Data Reference

- **`business.ts`**: `SITE_URL` (www), NAP fields, `geo`, `phone`, `hours[]` (schema + UI), `areaServed` (Madhapur / HITEC City / Mindspace / Hyderabad only; never Kondapur), `founder`. Helpers: `fullAddress`, `phoneDisplay`, `whatsappLink()`, `missingFacts()`. Empty values are skipped in UI/schema and reported at build. **Never use +91 88267 62234 (Calisthenics Lab India).**
- **`programPages.ts`**: per-program title/description/H1/intro/highlights/FAQs/gallery/related post.
- **`trainingData.ts`**: calisthenics weekday ₹7,777 / ₹22,222 / ₹44,444 / ₹77,777, weekend ₹4,444; kids weekday ₹5,555 / ₹15,151, weekend ₹3,333.
- **`programs.ts`, `schedule.ts`**: used only by the unused `Programs`/`Journey`/`Collaborations` components.

---

## 10. Reviews

`scripts/fetch-reviews.mjs` calls Places API (New) at build time with `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (server-side env vars, not `VITE_`), and writes up to 5 real reviews to `src/data/googleReviews.json`. If the vars are missing or the call fails, the existing JSON is kept and the build continues.

---

## 11. Animation Patterns

- Hero entrance is a **CSS** keyframe (`rise`), so the H1 is visible without waiting for JS (better LCP).
- Other sections use Framer Motion `whileInView` with `viewport: { once: true }`.
- Character spring: `stiffness: 55, damping: 14, mass: 0.9`.

---

## 12. Environment Variables

```bash
GOOGLE_PLACES_API_KEY=   # optional, build-time only, for real Google reviews
GOOGLE_PLACE_ID=         # optional, the ICS Google Business Profile place ID
```

---

## 13. Build & Dev Commands

```bash
npm run dev               # Vite dev server (client-rendered, no prerender)
npm run build             # reviews → typecheck → client + SSR build → prerender + sitemap
npm run preview           # Serves dist (note: Vite preview falls back to index for unknown URLs; Vercel returns 404)
npm run optimize-images   # Regenerate WebP + og-image from source photos (needs cwebp + sips)
npm run lint / prettier
```

---

## 14. Known Issues / Gotchas

1. **Go-live facts missing**: `streetAddress`, `geo`, `phone`, `googleBusinessProfile` in `business.ts` (build prints them).
2. **Homepage title is 72 chars**: the requested title is kept as specified; Google may truncate the brand.
3. **Photo branding**: several source photos show "CALI" branding (shirt/wall). The OG image uses an unbranded shot; review the rest.
4. **Hero video** (`vedio1.MP4`, about 3 MB) is not re-encoded; it loads only on desktop.
5. **`NavigationContext`** and **`App.css`** are orphaned legacy files.
6. **Character system is desktop-only** (hidden below 1024px).
7. Any `h1`/`h2` gets the Inter Tight display font via GlobalStyles; use `p`/`h3` for small labels.
