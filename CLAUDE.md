# CLAUDE.md — Vision For Xperiences (vfx.productions)

Static site, no framework, no CI. Hosted on GitHub Pages via `CNAME`.
Repo: `github.com/vfxproductions/vfx-productions-site`

---

## Architecture

Two kinds of page live here. Know which one you are editing before you touch anything.

**1. Hand-written pages** — `index.html`, `about/`, `contact/`, `vfx/`, `animation/`,
`visuals/`, `technology/`, `droneoperator/`, `shop/`, `jobs/`, `business-card/`.
Each carries its own copy of the header, drawer, footer and drawer JS. Edit directly.

**2. Generated pages** — `/work`, `/work/<slug>`, `/services`, `/industries/<slug>`.
Do **not** hand-edit these; they are overwritten. They render from one data file:

```
data/site.mjs      <- projects, services, categories. The only file you edit.
tools/build.mjs    <- node tools/build.mjs   (regenerates pages + sitemap.xml)
```

Generated HTML is committed, so GitHub Pages needs no build step.

**3. Bot-owned** — `news/**` and the `/* ==== NEWS ... ==== */` block in `css/site.css`
are written by an external generator ("VFXBot", not in this repo). Its template still
emits the **old** nav, so a newly generated post will ship the wrong header until that
template is updated. Don't edit inside that CSS block.

---

## The routine workflow

```bash
# 1. edit data/site.mjs (or a hand-written page)
node tools/build.mjs

# 2. if css/site.css changed, re-stamp the cache-buster across every page
#    (all pages must share one ?v= hash — the validator checks this)

# 3. serve and check
python -m http.server 8080
```

The Claude-in-Chrome extension **cannot load localhost**. To look at pages, drive
headless Chrome instead:

```bash
chrome.exe --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=10000 --window-size=1440,3000 \
  --user-data-dir=<unique-temp-dir> --screenshot=<abs-win-path>.png <url>
```
Use a **unique** `--user-data-dir` per shot and absolute Windows paths, or it silently
writes nothing. For interaction tests (clicks, Esc, focus) use `--remote-debugging-port`
and drive CDP over the built-in `WebSocket` in Node — no dependencies needed.

**Never `taskkill` all of chrome.exe** — it kills the user's browser and drops the
Claude-in-Chrome extension. Kill by matching the debug port on the command line.

---

## Adding a project

Everything lives in one object in `data/site.mjs`:

- `status: 'published'` → generates `/work/<slug>/`
- `status: 'draft'` → shows on `/work` as a **COMING SOON** card, no page.
  A draft may carry a `thumb` and it will show the image instead of the striped tile.
- Empty `challenge` / `approach` / `result` / `role` render **nothing** — publish with
  partial info rather than inventing filler.
- `watch: {src, poster, label}` adds a controls video; its MIME type is derived from
  the file extension.
- `fit` on a gallery item becomes a CSS class on the tile, so new shapes need no code:
  `'contain'` stops cover-cropping anything with text in it (site models, film frames
  with burnt-in copy, annotated technical views); `'tall'` gives a 9:16 portrait tile
  for phone-shaped sources. `heroFit` on the project applies the same class to the
  auto-prepended hero tile.
- `notice: true` prints a non-affiliation line under the case study. Set it on any
  project that names a brand it was not commissioned by (Street Takeover, Loro Piana,
  C.P. Company, Cyberphone). It is deliberately footer-quiet — it is not the same as
  calling the work "spec" in the body copy, which the owner has ruled out.
- `client:` renders only when non-empty. A piece with no external client leaves it
  blank rather than announcing itself as spec on every page.
- Gallery items can be `type: 'video'` (`{type,src,poster,alt}`) as well as stills.
  Video tiles render as muted `data-lazyvideo` loops so they only load on scroll.
- The hero is **automatically repeated as the first gallery tile** (skipped if the same
  src is already listed). Do not add it to `gallery` by hand.
- Every tile, image or video, is a `<button class="zoom">`. `/js/lightbox.js` builds a
  native `<dialog>` gallery viewer on demand: arrows, wrap-around, `n / total` counter,
  caption, ArrowLeft/Right, Esc, backdrop click, and horizontal swipe on touch. Videos
  open with controls, autoplay muted and loop. Arrows hide for a single-item gallery.
  The markup is built in JS, so pages only need the one script tag.

---

## Media pipeline — non-negotiable

Source masters are **huge** (one was 1.58 GB of 4K). GitHub hard-rejects any file over
100 MB. Always compress into `assets/`, and park the master in `assets/_orig/`
(gitignored).

```bash
# silent background loop
-vf scale=1600:-2 -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -an

# film with sound (brand movies, walkthroughs) -> use as a `watch` video
-vf scale=1600:-2 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 128k

# already small / low-res: DO NOT re-encode, just strip audio losslessly
-c:v copy -an -movflags +faststart
```

ffmpeg: `D:/Software/ffmpeg-7.1.1/ffmpeg-2025-06-28-git-cfd1f81e7d-full_build/.../bin`

Results achieved: 1.58 GB → 19.9 MB · 141 MB → 2.1 MB · 68.6 MB → 5.2 MB ·
59.6 MB → 2.8 MB · 44 MB → 5.9 MB.

**Gotcha:** WebP and VP9 are *not* automatically smaller. Compare before adopting —
several attempts here came out larger than the JPEG/H.264 they replaced.

Also: strip spaces and personal names from filenames before they become URLs.

---

## Validation — run before declaring anything done

A sweep over every page catching: broken `href`/`src`, inline JS syntax errors,
invalid JSON-LD, unbalanced tags, missing `alt`, missing skip-link, `id="main"` count,
exactly one `<h1>`, leftover `%(...)s` format placeholders, relative asset paths, and
CSS `?v=` drift. Target is **zero** on all of them.

Two recurring self-inflicted bugs to watch for:
1. **Stray `});`** — regex-replacing a JS block with a non-greedy `.*?\});` stops at the
   *inner* close and leaves the outer one dangling. Broke 18 pages once and the
   homepage later. Always `node --check` every inline script afterwards.
2. **Literal `%(D)s`** in output — Python `%`-format strings written without applying
   `% {...}`. Grep for `%(` in the built HTML.

---

## Content rules the owner has set

- **The homepage stays as it is.** The original 8-section full-screen scroll-snap deck
  is deliberate. It was once replaced with a magazine-style homepage and he asked for
  the original back. Keep scroll-snap, the three.js mounts and the language switcher.
  Do not re-replace it.
- **About reads as a company, not a one-man show.** "We are a creative studio."
  Kees Moolenaar is credited as **CEO**, alongside "a trusted network of specialists
  and partner studios".
- **Never invent** clients, credits, awards or project details. Unknowns stay as
  `/* EDIT */` markers in `data/site.mjs`.
- Banned phrases: "you name it, we build it", "one-stop shop", "unleashing limitless
  creativity", "taking your vision to the next level", "passionate about pushing
  boundaries".
- Branding is **70% shared / 30% targeted**: one stylesheet, one type scale, one grid.
  Each industry varies only its `--accent` colour and pacing. No sub-brands.

---

## Where source media lives

| Folder | Holds |
|---|---|
| `D:/3D/Projects/Portfolio Website/Footage/` | Hooiberg, Container_Loop, Carbon_Neutral, Llokaal, VR commercial — plus much unused: Atollo Hotel, Skate Video, Onboard Skateboards, Skills Heroes, Het NPO Plan, ILIGHTU_NEO, Modern House |
| `D:/3D/Projects/PlanetX/Footage/` | RSS_Studio_Floorplan_* and `image1–36` (El Eternauta assets) |
| `D:/3D/Projects/LogisticCenters/Deliverables/` | Logwise film + site renders |
| `D:/3D/Projects/Cyberphone/Deliverables/` | Cyberphone |
| `D:/3D/Projects/FreightCalculatorShip/Deliverables/` | Freight Calculator ship renders. **The AI videos in here are off-limits** - only the 3D renders are used |
| `keesmoolenaar.com` | Source of truth for credits. Scrape it — it is Apache/Varnish, **not** a GitHub Pages repo. `/img/*.jpg` are reusable first-party stills. |

Instagram `@keesmoolenaarvfx` hard-stops at 12 posts logged out and strips alt text.
Don't try to scrape project media from it — the owner drops files into `assets/` instead.

---

## Current state

**20 published case studies, 1 coming soon** (offshore drilling platform), across five industries:

- **Product & Technology** (9) — CYBERAWARE - Giving an AI a Face - Cyberphone -
  Sea and Shore Services - Driving, Simulated - Clot Retrieval - Catamaran - Speedboat -
  Freight Calculator
- **Architecture & Spaces** (4) — Hooiberg - DHG/Logwise - Fountain Fuel -
  Off To A Better Future
- **Music & Culture** (3) — Broederliefde x AFAS Live - FLAIRE x Maassilo - Tessaract
- **Fashion & Luxury** (2) — Loro Piana Open Walk - C.P. Company Integrated Mask
- **Film & Commercial** (2) — Ready Set Studios - Street Takeover

46 pages. Nav is **[logo] Work - Services - News - About - Contact**, with About and
Contact as hover dropdowns (News/Shop, Jobs). The logo is the way home; there is no
HOME item. `llms.txt` case-study list and `sitemap.xml` are both generated — edit
the data, not those files.

### Things the owner has decided, so don't undo them

- **Llokaal Expeditie was removed** entirely; it did not fit the site.
- **Ready Set Studios sits in Film & Commercial**, not Architecture — films and
  commercials are shot on that stage.
- **Don't label work as spec.** These pages exist to show capability; repeating
  "spec commercial" across seven of them costs him work. The CLIENT row renders only
  when it is filled, which claims nothing in either direction.
- **Street Takeover: the truck is real.** Only the back of the trailer and the bottle
  are CG, plus a Houdini liquid sim. It is the reference example for the surreal
  commercial work the studio sells.
- **Freight Calculator uses only the 3D renders.** The AI videos in that folder (the
  ship lurching over huge waves) are explicitly not to be used.
- **News posts say the studio is interested in / looking into** a technique, never that
  it has shipped work with it.

### Outstanding — needs the owner

- **Years still missing:** Broederliefde, Loro Piana, Street Takeover
- **Names still missing:** the VR/AI startup behind "Giving an AI a Face" -
  Hooiberg's client or architect
- Empty `result:` on several projects (Logwise, Cyberphone, CP, Sea and Shore, RSS,
  El Eternauta, Catamaran); `challenge`/`approach`/`result` on Hooiberg, FLAIRE, Tessaract
- Two generic drafts remain: "Live visuals — other shows", "Animation and VFX work"
- `digitalitems.mp4` is the Shop hero but is actually the old Hooiberg animation
- `interactive_intro.mp4` (21.5 MB) and `technology.mp4` are tracked but unreferenced
  — ~23 MB recoverable
- **El Eternauta** shows Netflix production assets delivered via Planet X — worth
  checking the agreement before this goes public
- The news bot template drops the `/js/theme.js` tag and writes `<main>` without
  `id="main"`. `js/header.js` loads theme.js as a fallback so the toggle still works;
  the template itself needs the tag back. It also wiped the `## Case studies` header
  from `llms.txt` once, which stops build.mjs regenerating that list.
