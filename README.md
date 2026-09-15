# Vision For Xperiences

**Cinematic 3D, animation, and interactive visuals** for products, spaces, performances, and ideas that are difficult to show.

🌐 [vfx.productions](https://vfx.productions)

---

## What we do

| Service | Description |
|---|---|
| **3D animation & product films** | Cinematic films that show a product, process or idea in motion |
| **Technical & product visualisation** | Cutaways, exploded views, assembly and simulation sequences |
| **VFX & compositing** | Set extensions, tracking, cleanup, simulations, stylised looks |
| **Motion design** | Titles, infographics, UI animation, brand motion systems |
| **Live visuals & music content** | Show packages, festival screens, artist visuals, audio-reactive scenes |
| **Interactive installations** | Physical installations that respond to the people in front of them |
| **Design visualisation** | Buildings, interiors and public spaces shown before they are built |
| **Aerial capture** | Licensed drone and FPV for locations, events and commercials |

---

## Tech

Static HTML/CSS/JS site, hosted on GitHub Pages with a custom domain.
3D demos built with [Three.js](https://threejs.org/) via CDN.

Most pages are hand-written. `/work`, `/work/<slug>`, `/services` and
`/industries/<slug>` are **generated** from a single data file so the project
list lives in one place instead of fifteen HTML files:

```
data/site.mjs      <- edit projects, services and categories here
tools/build.mjs    <- node tools/build.mjs   (regenerates the pages + sitemap)
```

The generated HTML is committed, so GitHub Pages needs no CI step. After
editing `data/site.mjs`, run the build and commit the result.

A project with `status: 'draft'` is listed on `/work` as a clearly marked
placeholder and gets **no** page of its own. Fill in its fields and flip it to
`status: 'published'` to generate the case study.

---

## License & Usage

**All rights reserved. © 2026 Vision For Xperiences.**

The source code, design, assets, and content in this repository are proprietary.
You are welcome to view and draw inspiration, but **direct copying or reuse of the design, layout, or code is not permitted** without written permission.

See [LICENSE](./LICENSE) for full terms.
Contact: github@vfx.productions

---

*Built by Vision For Xperiences.*
