# CLAUDE.md — Darshan Jhawar Portfolio

Photography/drone portfolio for Darshan Jhawar (Bengaluru). React (CRA) +
React Router v6 + framer-motion, deployed on Vercel from GitHub repo
`Dash1357/Darshan-portfolio`. This file is the project's memory — read it
before doing anything.

## Current state (v2 rebuild — complete, not yet pushed)

A ground-up v2 replaced the original site. Already done — do not redo:

- All media optimized: 1,009 MB → 54 MB (photos ≤2200px WebP q80, videos
  1080p H.264 CRF 27). Hero cut from 4K source → `public/assets/home/hero.mp4`
  (22 s, 3.1 MB) + `hero-poster.jpg`.
- Manifest architecture: `src/content/manifest.json` (generated) replaces the
  old HEAD-request probing. `src/content/site.js` holds ALL text/config.
- One data-driven `Gallery.js` page serves all four categories (old
  copy-pasted pages deleted, along with react-slick and phantom Tailwind).
- Cinematic "title sequence" hero on Home: letterbox bars part on load,
  "Darshan" solid + "Jhawar" outlined italic at poster scale, slow Ken Burns
  zoom, vignette, blinking ● REC + running 24fps timecode HUD, coords
  top-right. Plays once per session (`sessionStorage: dj-intro`); fully
  skipped under `prefers-reduced-motion`.
- Category tiles: static image only, no hover video (removed 2026-07-24 —
  Darshan didn't want hover clips on any page reached from the hero grid).
- SEO done: meta/OG tags + generated `og.jpg`, per-page titles, robots.txt,
  sitemap.xml, filled webmanifest, 404 page, fixed ScrollToTop.
- `CI=true npm run build` compiles clean (~96 kB JS gzipped).

**First step in any session:** verify this folder is v2 — check that
`src/content/site.js` exists. If it's still the old site, stop and ask
Darshan for the `darshan-portfolio-v2-complete.zip` contents first.

## File map

```
src/content/site.js         ← ALL copy, contacts, categories, colors, HOME config
src/content/manifest.json   ← generated media index (never hand-edit)
src/pages/Home.js|css       ← title-sequence hero + living tiles + CTA
src/pages/Gallery.js|css    ← every category page
src/components/             ← Nav, Footer, MasonryGrid, MediaFigure, Lightbox, Reveal
scripts/generate-manifest.js  (npm run manifest)
optimize_media.py           ← media pipeline (python3 optimize_media.py <in> <out>)
```

## Content workflow (never deviate)

1. New media MUST go through `optimize_media.py` before entering
   `public/assets/`. Never commit a photo over ~1 MB or video over ~8 MB.
2. Drop optimized files in `public/assets/<category>/<series>/` (any names).
3. `npm run manifest`
4. Add/edit the series entry in `src/content/site.js`.

## Design system (do not drift)

- Canvas `#0A0A0B`, text `#EDEDEA`/`#9A9A96`, hairlines `rgba(237,237,234,.1)`.
  Fonts: Familjen Grotesk (display, weight 400 — no 300 weight exists for
  this font) + Inter (UI). Switched from Fraunces on 2026-07-24, Darshan's
  pick after a live A/B compare. Never add a third font.
- Brand red `#C01818` (from the logo). Category accents: Sports `#C01818`,
  Wildlife `#2E7D4F`, Travel `#2E6BB5`, Drone `#79828C` (each with a `-hi`
  bright sibling for small text — see site.js).
- Color discipline: accents only at hairline scale (numbers, 2px rules,
  underlines) — never fills, buttons, or backgrounds. One category color per
  view. Categories appear in exactly ONE place per screen (home: tile grid;
  inner pages: top nav).
- No rounded corners beyond 2px, no box shadows, no preloaders, no
  scroll-jacking. Photos keep native aspect ratios — never force-crop.
- All motion respects `prefers-reduced-motion`. Keep the bundle lean; ask
  before adding any dependency.

## How Darshan works (important)

- He judges by LOOKING, not by reading code. Keep `npm start` running and
  tell him to check localhost:3000 after each change. Small change → "refresh
  and look" → feedback → iterate.
- His feedback is directional ("more cinematic", "not happy", "keep it in one
  place"). Translate it into 2–3 concrete options, recommend one, implement
  on his pick. Don't interrogate him with questions.
- Be honest when a request would hurt the design; propose the disciplined
  version of his idea rather than just complying or refusing.
- To re-watch the hero intro: clear sessionStorage or use a private window.

## Deploy protocol (strict)

- Iterate locally until Darshan explicitly says he's happy. ONE push at the
  end — never commit/push without his explicit go-ahead.
- Before any push: `CI=true npm run build` must pass.
- Offered (optional, ask first — rewrites history to drop the old 1 GB):
  `git checkout --orphan v2 && git add -A && git commit -m "v2" &&
  git branch -D main && git branch -m main && git push -f origin main`
- Vercel auto-deploys from the pushed branch. After a custom domain exists,
  update URLs in `public/index.html` (og:url/og:image), `robots.txt`,
  `sitemap.xml`.

## Open tasks / backlog

1. DONE: hero letter-by-letter title reveal shipped (Darshan's pick after
   comparing letter-reveal / letterbox-retraction / film-grain options).
2. DONE: manifesto line finalized — "Some frames are shot at two hundred
   kilometres an hour. Some wait for a leopard to blink. I make room for
   both." (`site.js` HOME.manifesto).
3. DONE: display font switched Fraunces → Familjen Grotesk (see Design
   system above).
4. DONE: content batch added — new Sports series (AbbVie Corporate Cricket
   Tournament, Sila Tournament, BTM Football Club, Racquetly), new Drone
   series (Rush Arena), new Pixel Stretch category (stylized/composite
   work), plus additions to Aviation/Astrophotography/Birds and new Travel
   (Automotive, Bengaluru Skies, Forest Light) / Wildlife (Backyard) series.
5. Awaiting from Darshan: proof lines for any *remaining* series, portrait +
   short bio (→ About section), 20–30 s showreel, wildlife hover clip,
   contact email confirmation (`heman.jhawar@gmail.com` — one place:
   site.js), custom domain purchase.
6. After his sign-off: the single push → GitHub → Vercel.

## Known environment gotchas (this machine)

- Node, Python 3.12 (+ Pillow, rawpy, imageio), and ffmpeg were NOT
  preinstalled and had to be added via winget — see memory for exact paths.
  None of them are on PATH in fresh shell sessions; prepend the bin dir or
  use full paths when invoking `optimize_media.py` or
  `scripts/generate-manifest.js` (both shell out to `ffmpeg`/`ffprobe`).
- framer-motion `AnimatePresence` exit animations get stuck (never actually
  unmount) in this dev setup — confirmed via isolated testing, not just a
  hunch. Don't use it for anything where "stuck open" would be a real
  problem (modals, page transitions). Plain conditional rendering +
  entrance-only `initial`/`animate` is the reliable pattern used instead.
- Darshan's raw content handoffs are often loosely organized — a folder
  named after one event/subject can contain stray photos from a different
  shoot entirely. Always spot-check several images per folder before
  writing series copy or trusting the folder name.
- `Lightbox.js` renders via `createPortal(..., document.body)` — do NOT
  remove this. `PageTransition`'s framer-motion wrapper leaves a `transform`
  on an ancestor div even at rest, which creates a CSS containing block and
  breaks `position: fixed` for any non-portaled descendant (the lightbox
  would stretch to the full page height and center itself deep down the
  document instead of the viewport — only visible as a bug once you scroll
  before opening it, easy to miss testing at scrollY 0).
- Nav auto-scrolls the active category link into view on mobile (the nav
  strip scrolls horizontally there — 5 categories incl. "Pixel Stretch"
  don't fit). The effect re-runs on `document.fonts.ready` — needed because
  the initial run can fire before Familjen Grotesk finishes loading/
  reflowing, undershooting the scroll target.
