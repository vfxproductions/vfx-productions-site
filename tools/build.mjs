#!/usr/bin/env node
/* =============================================================================
   Static page generator for /work, /work/<slug>, /services and /industries/<slug>.

   Run:  node tools/build.mjs

   Why this exists: the site has no build step and every page hand-copies the
   same header, drawer, footer and drawer script. Rather than hand-copy that
   chrome another 15 times, these pages render from data/site.mjs. Output is
   plain static HTML committed to the repo - GitHub Pages stays as dumb as it
   was. Existing hand-written pages are left alone.
   ============================================================================= */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { categories, services, projects, studio } from '../data/site.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://vfx.productions';

/* Cache-buster matching the ?v= convention the hand-written pages already use. */
const CSSV = createHash('sha1')
  .update(readFileSync(join(ROOT, 'css/site.css')))
  .digest('hex')
  .slice(0, 10);

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const byCat = (slug) => categories.find((c) => c.slug === slug);
const byService = (slug) => services.find((s) => s.slug === slug);
const published = projects.filter((p) => p.status === 'published');

function write(relPath, html) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html, 'utf8');
  console.log('  wrote', relPath);
}

/* ---------------------------------------------------------------------------
   SHARED CHROME - markup kept identical to the hand-written pages so the site
   reads as one build, not two.
   --------------------------------------------------------------------------- */

function head({ title, desc, path, ogImage = '/assets/about.jpg', accent }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="#000000" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${SITE}${path}" />
  <link rel="icon" href="/assets/logo.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Vision For Xperiences" />
  <meta property="og:url" content="${SITE}${path}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${SITE}${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${SITE}${ogImage}" />
  <link rel="alternate" type="application/rss+xml" title="Vision For Xperiences News" href="/news/feed.xml" />
  <script src="/js/theme.js"></script>
  <link rel="stylesheet" href="/css/site.css?v=${CSSV}" />
</head>

<body${accent ? ` style="--accent:${accent};"` : ''}>`;
}

/* Drawer + header. `current` highlights the active top-level item. */
function chrome(current = '') {
  const on = (k) => (k === current ? ' aria-current="page"' : '');
  /* About and Contact own children, so they read as current for those too. */
  const group = (keys) => (keys.includes(current) ? ' aria-current="page"' : '');
  return `
  <a class="skip-link" href="#main">Skip to content</a>

  <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>
  <aside class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer-top">
      <div class="drawer-title">Navigation</div>
      <button class="drawer-close" id="drawerClose" aria-label="Close menu">&times;</button>
    </div>
    <a href="/" data-nav>Home</a>
    <div class="drawer-section">Xperiences</div>
    <a href="/vfx" data-nav class="drawer-sub">VFX</a>
    <a href="/animation" data-nav class="drawer-sub">Animation</a>
    <a href="/visuals" data-nav class="drawer-sub">Visuals</a>
    <a href="/technology" data-nav class="drawer-sub">Technology</a>
    <a href="/droneoperator" data-nav class="drawer-sub">Drone Operator</a>
    <a href="/work" data-nav${on('work')}>Work</a>
    <div class="drawer-section">By industry</div>
${categories.map((c) => `    <a href="/industries/${c.slug}" data-nav class="drawer-sub">${esc(c.name)}</a>`).join('\n')}
    <div class="drawer-section">Studio</div>
    <a href="/about" data-nav class="drawer-sub"${on('about')}>About</a>
    <a href="/news" data-nav class="drawer-sub"${on('news')}>News</a>
    <a href="/shop" data-nav class="drawer-sub">Shop</a>
    <div class="drawer-section">Get in touch</div>
    <a href="/contact" data-nav class="drawer-sub"${on('contact')}>Contact</a>
    <a href="/jobs" data-nav class="drawer-sub">Jobs</a>
  </aside>

  <header>
    <nav class="nav" aria-label="Primary">
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-controls="drawer" aria-expanded="false"><span></span></button>
      <a class="brand" href="/" title="Home" aria-label="Vision For Xperiences — home">
        <img src="/assets/logo.png" alt="Vision For Xperiences logo" width="640" height="360" />
      </a>
      <div class="links" aria-label="Site links">
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true">Xperiences <span class="nav-caret">&#9662;</span></button>
          <div class="nav-dropdown-menu">
            <a href="/vfx">VFX</a>
            <a href="/animation">Animation</a>
            <a href="/visuals">Visuals</a>
            <a href="/technology">Technology</a>
            <a href="/droneoperator">Drone Operator</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle" href="/work"${on('work')}>Work <span class="nav-caret">&#9662;</span></a>
          <div class="nav-dropdown-menu">
            <a href="/work">All work</a>
${categories.map((c) => `            <a href="/industries/${c.slug}">${esc(c.name)}</a>`).join('\n')}
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle" href="/about"${group(['about', 'news'])}>About <span class="nav-caret">&#9662;</span></a>
          <div class="nav-dropdown-menu">
            <a href="/about"${on('about')}>About the studio</a>
            <a href="/news"${on('news')}>News</a>
            <a href="/shop">Shop</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle" href="/contact"${on('contact')}>Contact <span class="nav-caret">&#9662;</span></a>
          <div class="nav-dropdown-menu">
            <a href="/contact"${on('contact')}>Get in touch</a>
            <a href="/jobs">Jobs</a>
          </div>
        </div>
      </div>
      <div class="right">
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch theme">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>
        </button>
      </div>
    </nav>
  </header>
`;
}

function footerAndScripts() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="/assets/logo.png" alt="Vision For Xperiences" width="640" height="360" style="height:22px;width:auto;object-fit:contain;opacity:.7;" />
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/work">Work</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/news">News</a>
        <a href="/vfx">VFX</a>
        <a href="/animation">Animation</a>
        <a href="/visuals">Visuals</a>
        <a href="/technology">Technology</a>
        <a href="/droneoperator">Drone Operator</a>
        <a href="/shop">Shop</a>
        <a href="/jobs">Jobs</a>
        <a href="/contact">Contact</a>
      </nav>
      <p class="footer-copy">&copy; 2026 Vision For Xperiences &mdash; All rights reserved.</p>
    </div>
  </footer>

  <script>
  (function(){
    var drawer   = document.getElementById("drawer");
    var backdrop = document.getElementById("drawerBackdrop");
    var ham      = document.getElementById("hamburger");
    var closeBtn = document.getElementById("drawerClose");
    function open(){ drawer.classList.add("open"); backdrop.classList.add("open"); drawer.setAttribute("aria-hidden","false"); backdrop.setAttribute("aria-hidden","false"); ham.setAttribute("aria-expanded","true"); closeBtn.focus(); }
    function shut(){ drawer.classList.remove("open"); backdrop.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); backdrop.setAttribute("aria-hidden","true"); ham.setAttribute("aria-expanded","false"); }
    ham.addEventListener("click", open);
    closeBtn.addEventListener("click", shut);
    backdrop.addEventListener("click", shut);
    drawer.querySelectorAll("[data-nav]").forEach(function(a){ a.addEventListener("click", shut); });
    window.addEventListener("keydown", function(e){ if(e.key==="Escape") shut(); });

    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener("click", function(e){
        var href = a.getAttribute("href");
        if (!href || href==="#") return;
        var t = document.querySelector(href);
        if(t){ e.preventDefault(); history.pushState(null,"",href); t.scrollIntoView({behavior:"smooth",block:"start"}); }
      });
    });

    /* Dropdown: hover on pointer devices, click-to-open on touch. The toggle is
       a real link, so keyboard and no-JS users still reach the overview page. */
    document.querySelectorAll('.nav-dropdown').forEach(function(dd){
      var closeTimer=null;
      var btn=dd.querySelector('.nav-dropdown-toggle');
      var isHoverDevice=window.matchMedia('(hover:hover)').matches;
      function openDd(){ clearTimeout(closeTimer); document.querySelectorAll('.nav-dropdown.open').forEach(function(o){ if(o!==dd){ o.classList.remove('open'); var ot=o.querySelector('.nav-dropdown-toggle'); if(ot&&ot.tagName==='BUTTON') ot.setAttribute('aria-expanded','false'); } }); dd.classList.add('open'); }
      function closeDd(){ dd.classList.remove('open'); }
      if(isHoverDevice){
        dd.addEventListener('mouseenter', openDd);
        dd.addEventListener('mouseleave',function(){ closeTimer=setTimeout(closeDd,120); });
        dd.addEventListener('focusin', openDd);
        dd.addEventListener('focusout',function(){ closeTimer=setTimeout(closeDd,120); });
      } else {
        btn.addEventListener('click',function(e){
          if(dd.classList.contains('open')) return; /* second tap follows the link */
          e.preventDefault(); e.stopPropagation();
          document.querySelectorAll('.nav-dropdown.open').forEach(function(d){ d.classList.remove('open'); });
          openDd();
        });
      }
    });
    document.addEventListener('click',function(){ document.querySelectorAll('.nav-dropdown.open').forEach(function(d){ d.classList.remove('open'); }); });
  })();
  </script>
  <script defer src="/js/lazyvideo.js"></script>
  <script defer src="/js/header.js"></script>
  <script defer src="/js/lightbox.js"></script>
</body>
</html>
`;
}

/* Full-bleed media block used by every generated hero. */
function heroMedia(media) {
  if (!media) return '';
  if (media.type === 'video') {
    return `      <div class="media">
        <video muted loop playsinline preload="none" data-lazyvideo${media.poster ? ` poster="${media.poster}"` : ''}>
          <source src="${media.src}" type="video/mp4" />
        </video>
      </div>
      <div class="fade"></div>`;
  }
  return `      <div class="media">
        <img src="${media.src}" alt="" />
      </div>
      <div class="fade"></div>`;
}

function ctaBlock(kicker, headline, text, accent) {
  return `
    <section class="cta-band"${accent ? ` style="--accent:${accent};"` : ''}>
      <div class="page-wrap">
        <div class="kicker accent">${esc(kicker)}</div>
        <h2 class="band-title">${headline}</h2>
        <p class="sub">${esc(text)}</p>
        <div class="actions">
          <a class="btn btn-accent" href="/contact">Start a project</a>
          <a class="btn" href="mailto:${studio.email}">Email the studio</a>
        </div>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------------------
   CARDS
   --------------------------------------------------------------------------- */

function projectCard(p) {
  const cat = byCat(p.category);
  const accent = cat ? cat.accent : 'var(--fg)';

  if (p.status !== 'published') {
    /* No page is generated for drafts, so the card is not a link to nowhere.
       It states plainly that the case study is still being prepared. */
    const deep = p.deepLink
      ? `<a class="card-deep" href="${p.deepLink.href}">See ${esc(p.deepLink.label)} &rarr;</a>`
      : '';
    const tile = p.thumb
      ? `<div class="work-card-thumb"><img src="${p.thumb}" alt="" loading="lazy" /></div>`
      : `<div class="work-card-thumb draft-tile" aria-hidden="true"><span></span></div>`;
    return `<article class="work-card is-draft" data-cat="${p.category}" style="--accent:${accent};">
          ${tile}
          <div class="work-card-body">
            <div class="work-card-cat">${esc(cat ? cat.name : '')}</div>
            <h3 class="work-card-title">${esc(p.title)}</h3>
            <p class="work-card-sum"><span class="soon">Coming soon</span></p>
            ${deep}
          </div>
        </article>`;
  }

  return `<a class="work-card" href="/work/${p.slug}" data-cat="${p.category}" style="--accent:${accent};">
          <div class="work-card-thumb"><img src="${p.thumb}" alt="" loading="lazy" /></div>
          <div class="work-card-body">
            <div class="work-card-cat">${esc(cat ? cat.name : '')}</div>
            <h3 class="work-card-title">${esc(p.title)}</h3>
            <p class="work-card-sum">${esc(p.summary)}</p>
            <span class="card-deep">View case study &rarr;</span>
          </div>
        </a>`;
}

function serviceRail(slugs, accent) {
  const items = slugs.map(byService).filter(Boolean);
  if (!items.length) return '';
  return `
      <section class="page-wrap band">
        <div class="kicker accent">Services used</div>
        <div class="rail-grid">
${items
  .map(
    (s) => `          <a class="rail-card" href="/services#${s.slug}"${accent ? ` style="--accent:${accent};"` : ''}>
            <span class="rail-name">${esc(s.name)}</span>
            <span class="rail-desc">${esc(s.summary)}</span>
          </a>`
  )
  .join('\n')}
        </div>
      </section>`;
}

/* ---------------------------------------------------------------------------
   PAGE: /work
   --------------------------------------------------------------------------- */

function buildWork() {
  const title = 'Work — Vision For Xperiences';
  const desc =
    'Selected projects across product and technology, architecture and spaces, music and culture, fashion and luxury, and film and commercial work.';

  const filters = [
    `<button class="filter is-on" data-filter="all" aria-pressed="true">All</button>`,
    ...categories.map(
      (c) =>
        `<button class="filter" data-filter="${c.slug}" aria-pressed="false" style="--accent:${c.accent};">${esc(c.short)}</button>`
    )
  ].join('\n            ');

  const grouped = categories
    .map((c) => {
      const items = projects.filter((p) => p.category === c.slug);
      if (!items.length) return '';
      return `
      <section class="work-group" data-group="${c.slug}" style="--accent:${c.accent};">
        <div class="page-wrap">
          <div class="group-head">
            <div class="kicker accent">${esc(c.name)}</div>
            <p class="group-lead">${esc(c.message)}</p>
            <a class="card-deep" href="/industries/${c.slug}">${esc(c.name)} in detail &rarr;</a>
          </div>
          <div class="work-grid">
            ${items.map(projectCard).join('\n            ')}
          </div>
        </div>
      </section>`;
    })
    .join('\n');

  const html = `${head({ title, desc, path: '/work', ogImage: '/assets/cyberaware_console.jpg' })}
${chrome('work')}
  <main id="main">
    <section class="section page-hero">
${heroMedia({ type: 'video', src: '/assets/hero.mp4' })}
      <div class="content">
        <div class="copy">
          <div class="kicker">Work</div>
          <h1>SELECTED<br>WORK.</h1>
          <p class="sub">${esc(studio.positioning)}</p>
        </div>
      </div>
    </section>

    <div class="filter-bar" role="group" aria-label="Filter work by industry">
      <div class="page-wrap">
        <div class="filters">
            ${filters}
        </div>
      </div>
    </div>
${grouped}
${ctaBlock(
  'Start here',
  'Tell us what you are making.',
  'Send the brief, the deadline and whatever reference you have. We answer within 48 hours.'
)}
  </main>
  <script>
  (function(){
    var buttons = document.querySelectorAll('.filter');
    var groups  = document.querySelectorAll('.work-group');
    function apply(key){
      buttons.forEach(function(b){
        var on = b.dataset.filter === key;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      groups.forEach(function(g){ g.hidden = !(key === 'all' || g.dataset.group === key); });
      history.replaceState(null, '', key === 'all' ? location.pathname : '#' + key);
    }
    buttons.forEach(function(b){ b.addEventListener('click', function(){ apply(b.dataset.filter); }); });
    var start = location.hash.slice(1);
    if (start && document.querySelector('.work-group[data-group="' + start + '"]')) apply(start);
  })();
  </script>
${footerAndScripts()}`;

  write('work/index.html', html);
}

/* ---------------------------------------------------------------------------
   PAGE: /work/<slug>  (case study)
   --------------------------------------------------------------------------- */

function buildCaseStudy(p) {
  const cat = byCat(p.category);
  const accent = cat.accent;
  const title = `${p.title} — ${cat.name} — Vision For Xperiences`;
  const ogImage = p.thumb || '/assets/about.jpg';

  const meta = [
    ['Category', cat.name],
    p.year && ['Year', p.year],
    p.client && ['Client', p.client],
    p.role && p.roleShort && ['Role', p.roleShort]
  ].filter(Boolean);

  /* Only render a section when there is something to put in it. A project can
     publish with partial information rather than padding the gaps with filler. */
  const pair = (aTitle, aText, bTitle, bText, extra = '') => {
    const left = aText ? `        <div>
          <div class="kicker accent">${esc(aTitle)}</div>
          <p class="sub">${esc(aText)}</p>
        </div>` : '';
    const right = (bText || extra) ? `        <div>
          <div class="kicker accent">${esc(bTitle)}</div>
${bText ? `          <p class="sub">${esc(bText)}</p>` : ''}${extra}
        </div>` : '';
    if (!left && !right) return '';
    return `
      <section class="page-wrap band cs-split">
${[left, right].filter(Boolean).join(String.fromCharCode(10))}
      </section>`;
  };

  const intro = p.description
    ? `
      <section class="page-wrap band">
        <p class="cs-intro">${esc(p.description)}</p>
      </section>`
    : '';

  const challengeApproach = pair('The challenge', p.challenge, 'The approach', p.approach);

  const deepExtra = p.deepLink
    ? `
          <p class="sub"><a class="card-deep" href="${p.deepLink.href}">More on ${esc(p.deepLink.label)} &rarr;</a></p>`
    : '';
  const resultRole = pair('The result', p.result, 'Skills used', p.role, deepExtra);

  /* The hero only plays at the top of the page, so repeat it in the gallery -
     otherwise the best asset on a case study vanishes as soon as you scroll.
     Skipped when the same file is already listed below. */
  const heroInGallery =
    p.hero && !p.gallery.some((g) => g.src === p.hero.src)
      ? [
          p.hero.type === 'video'
            ? { type: 'video', src: p.hero.src, poster: p.hero.poster, alt: `${p.title} in motion`, fit: p.heroFit }
            : { src: p.hero.src, alt: p.title, fit: p.heroFit }
        ]
      : [];

  /* A video hero renders as its poster frame until it plays, so a gallery item
     that IS that poster would show the same picture twice. */
  const heroPoster = (heroInGallery[0] && heroInGallery[0].poster) || null;
  const galleryItems = [...heroInGallery, ...p.gallery.filter((g) => g.src !== heroPoster)];

  const galleryTile = (g) => {
    if (g.type === 'video') {
      /* muted background loop: preload="none" + js/lazyvideo.js means it only
         downloads once it scrolls into view */
      return `          <figure class="cs-shot is-video${g.fit ? ' ' + g.fit : ''}"><button type="button" class="zoom" aria-label="Enlarge video: ${esc(
        g.alt
      )}"><video muted loop playsinline preload="none" data-lazyvideo${
        g.poster ? ` poster="${g.poster}"` : ''
      } aria-label="${esc(g.alt)}"><source src="${g.src}" type="video/${
        g.src.endsWith('.webm') ? 'webm' : 'mp4'
      }" /></video></button></figure>`;
    }
    return `          <figure class="cs-shot${g.fit ? ' ' + g.fit : ''}"><button type="button" class="zoom" aria-label="Enlarge image: ${esc(
      g.alt
    )}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" /></button></figure>`;
  };

  const gallery = galleryItems.length
    ? `
      <section class="page-wrap band">
        <div class="kicker accent">Process</div>
        <div class="cs-gallery">
${galleryItems.map(galleryTile).join('\n')}
        </div>
      </section>`
    : '';

  const watch = p.watch
    ? `
      <section class="page-wrap band">
        <div class="kicker accent">${esc(p.watch.label)}</div>
        <div class="cs-watch">
          <video controls playsinline preload="metadata" poster="${p.watch.poster}">
            <source src="${p.watch.src}" type="video/${p.watch.src.endsWith('.webm') ? 'webm' : 'mp4'}" />
          </video>
        </div>
      </section>`
    : '';

  /* Unlicensed brand work carries a quiet non-affiliation line. Not the same as
     labelling a page "spec" in the body copy - buyers skim this, brand lawyers
     look for it. Set `notice: true` on the project. */
  const notice = p.notice
    ? `
      <section class="page-wrap">
        <p class="cs-notice">Concept work. Not commissioned by, affiliated with or endorsed by the brands shown. All trademarks, brand names and product designs are the property of their respective owners and are referenced here only to describe the work.</p>
      </section>`
    : '';

  /* Related = same category first, then anything else published. */
  const related = published
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => (a.category === p.category ? -1 : 0) - (b.category === p.category ? -1 : 0))
    .slice(0, 3);

  const relatedBlock = related.length
    ? `
      <section class="page-wrap band">
        <div class="kicker accent">Related work</div>
        <div class="work-grid">
          ${related.map(projectCard).join('\n          ')}
        </div>
      </section>`
    : `
      <section class="page-wrap band">
        <div class="kicker accent">More work</div>
        <div class="rail-grid">
${categories
  .map(
    (c) => `          <a class="rail-card" href="/industries/${c.slug}" style="--accent:${c.accent};">
            <span class="rail-name">${esc(c.name)}</span>
            <span class="rail-desc">${esc(c.short)} projects and approach</span>
          </a>`
  )
  .join('\n')}
        </div>
      </section>`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.summary,
    genre: cat.name,
    url: `${SITE}/work/${p.slug}`,
    image: `${SITE}${ogImage}`,
    creator: { '@type': 'Organization', name: studio.name, url: SITE }
  };

  const html = `${head({ title, desc: p.summary, path: `/work/${p.slug}`, ogImage, accent })}
${chrome('work')}
  <main id="main">
    <article class="case-study">
      <section class="section page-hero">
${heroMedia(p.hero)}
        <div class="content">
          <div class="copy">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="/work">Work</a> <span aria-hidden="true">/</span>
              <a href="/industries/${cat.slug}">${esc(cat.name)}</a>
            </nav>
            <h1>${esc(p.title)}</h1>
            <p class="sub lead">${esc(p.summary)}</p>
          </div>
        </div>
      </section>

      <div class="cs-meta">
        <div class="page-wrap">
          <dl>
${meta
  .map(([k, v]) => `            <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
  .join('\n')}
          </dl>
        </div>
      </div>

${intro}
${challengeApproach}
${gallery}
${watch}
${resultRole}
${notice}
${serviceRail(p.serviceSlugs, accent)}
${relatedBlock}
${ctaBlock(
  'Working on something like this',
  'Tell us what you are making.',
  'Send the brief, the deadline and whatever reference you have. We answer within 48 hours.',
  accent
)}
    </article>
  </main>
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
${footerAndScripts()}`;

  write(`work/${p.slug}/index.html`, html);
}

/* ---------------------------------------------------------------------------
   PAGE: /services
   --------------------------------------------------------------------------- */

function buildServices() {
  const title = 'Services — Vision For Xperiences';
  const desc =
    '3D animation and product films, technical visualisation, VFX and compositing, motion design, live visuals, interactive installations, design visualisation and aerial capture.';

  const blocks = services
    .map((s) => {
      const relatedProjects = projects.filter((p) => (p.serviceSlugs || []).includes(s.slug));
      const feature = relatedProjects.find((p) => p.status === 'published');
      const industryLinks = s.industries
        .map(byCat)
        .filter(Boolean)
        .map(
          (c) =>
            `<a class="pill pill-link" href="/industries/${c.slug}" style="--accent:${c.accent};">${esc(c.short)}</a>`
        )
        .join('\n              ');

      return `
      <section class="service" id="${s.slug}">
        <div class="page-wrap service-grid">
          <div class="service-main">
            <h2 class="service-title">${esc(s.name)}</h2>
            <p class="sub lead">${esc(s.summary)}</p>
            <p class="sub">${esc(s.body)}</p>
            <div class="service-tags">
              ${industryLinks}
            </div>
            <div class="actions">
              <a class="btn btn-accent" href="/contact?service=${s.slug}" aria-label="Discuss a ${esc(s.name.toLowerCase())} project">Discuss a project</a>
${s.deep ? `              <a class="btn btn-ghost" href="${s.deep}">See the work &rarr;</a>` : ''}
            </div>
          </div>
          <aside class="service-side">
            <div class="kicker">What you receive</div>
            <ul class="deliverables">
${s.deliverables.map((d) => `              <li>${esc(d)}</li>`).join('\n')}
            </ul>
${
  feature
    ? `            <div class="kicker" style="margin-top:28px;">Relevant project</div>
            <a class="side-project" href="/work/${feature.slug}" style="--accent:${byCat(feature.category).accent};">
              <img src="${feature.thumb}" alt="" loading="lazy" />
              <span>${esc(feature.title)}</span>
            </a>`
    : `            <div class="kicker" style="margin-top:28px;">Relevant projects</div>
            <p class="sub side-note">${esc(
              relatedProjects
                .slice(0, 3)
                .map((p) => p.title)
                .join(', ')
            )} &mdash; case studies in preparation.</p>`
}
          </aside>
        </div>
      </section>`;
    })
    .join('\n');

  const toc = services
    .map((s) => `          <a href="#${s.slug}">${esc(s.name)}</a>`)
    .join('\n');

  const html = `${head({ title, desc, path: '/services' })}
${chrome('services')}
  <main id="main">
    <section class="section page-hero">
${heroMedia({ type: 'video', src: '/assets/Viewport.mp4' })}
      <div class="content">
        <div class="copy">
          <div class="kicker">Services</div>
          <h1>WHAT WE<br>MAKE.</h1>
          <p class="sub">${esc(studio.positioning)}</p>
        </div>
      </div>
    </section>

    <nav class="service-toc" aria-label="Services">
      <div class="page-wrap">
${toc}
      </div>
    </nav>
${blocks}
${ctaBlock(
  'Not sure which one',
  'Describe the problem, not the service.',
  'If you know what needs to exist but not how it gets made, that is a normal brief. We will tell you which of the above it is.'
)}
  </main>
${footerAndScripts()}`;

  write('services/index.html', html);
}

/* ---------------------------------------------------------------------------
   PAGE: /industries/<slug>
   --------------------------------------------------------------------------- */

function buildIndustry(c) {
  const title = `${c.name} — Vision For Xperiences`;
  const items = projects.filter((p) => p.category === c.slug);
  const featured = items.find((p) => p.status === 'published');

  const focus = c.focus
    .map(
      ([k, v]) => `          <div class="focus-item">
            <h3>${esc(k)}</h3>
            <p class="sub">${esc(v)}</p>
          </div>`
    )
    .join('\n');

  const svc = c.services
    .map(byService)
    .filter(Boolean)
    .map(
      (s) => `          <a class="rail-card" href="/services#${s.slug}" style="--accent:${c.accent};">
            <span class="rail-name">${esc(s.name)}</span>
            <span class="rail-desc">${esc(s.summary)}</span>
          </a>`
    )
    .join('\n');

  const others = categories
    .filter((o) => o.slug !== c.slug)
    .map(
      (o) =>
        `          <a class="pill pill-link" href="/industries/${o.slug}" style="--accent:${o.accent};">${esc(o.short)}</a>`
    )
    .join('\n');

  const html = `${head({
    title,
    desc: c.message,
    path: `/industries/${c.slug}`,
    ogImage: featured ? featured.thumb : '/assets/about.jpg',
    accent: c.accent
  })}
${chrome('work')}
  <main id="main" class="tone-${c.tone}">
    <section class="section page-hero">
${heroMedia(c.hero)}
      <div class="content">
        <div class="copy">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/work">Work</a> <span aria-hidden="true">/</span> <span>${esc(c.name)}</span>
          </nav>
          <h1>${c.headline}</h1>
          <p class="sub lead">${esc(c.message)}</p>
          <div class="actions">
            <a class="btn btn-accent" href="/contact">Start a project</a>
            <a class="btn btn-ghost" href="#work">See the work</a>
          </div>
        </div>
      </div>
    </section>

    <section class="page-wrap band">
      <p class="cs-intro">${esc(c.intro)}</p>
    </section>

    <section class="page-wrap band">
      <div class="kicker accent">What matters here</div>
      <div class="focus-grid">
${focus}
      </div>
    </section>

    <section class="page-wrap band" id="work">
      <div class="kicker accent">${esc(c.name)} projects</div>
      <div class="work-grid">
          ${items.map(projectCard).join('\n          ')}
      </div>
    </section>

    <section class="page-wrap band">
      <div class="kicker accent">How we work on this</div>
      <div class="rail-grid">
${svc}
      </div>
    </section>

    <section class="page-wrap band">
      <div class="kicker">Other areas</div>
      <div class="service-tags">
${others}
      </div>
    </section>
${ctaBlock(
  'Start a conversation',
  'Tell us what you are making.',
  'Send the brief, the deadline and whatever reference you have. We answer within 48 hours.',
  c.accent
)}
  </main>
${footerAndScripts()}`;

  write(`industries/${c.slug}/index.html`, html);
}


/* ---------------------------------------------------------------------------
   The five hand-written discipline pages (/vfx, /animation, ...) each end with
   a strip of the projects that used that discipline. The markup is written
   between markers in those files so the pages stay hand-editable everywhere
   else, and this keeps the cards in sync with data/site.mjs.
   --------------------------------------------------------------------------- */

const DISCIPLINE_PAGES = {
  'vfx/index.html':           { key: 'vfx',        service: 'vfx-compositing',           label: 'VFX' },
  'animation/index.html':     { key: 'animation',  service: '3d-animation',              label: '3D animation' },
  'visuals/index.html':       { key: 'visuals',    service: 'live-visuals',              label: 'live visuals' },
  'technology/index.html':    { key: 'technology', service: 'interactive-installations', label: 'interactive work' },
  'droneoperator/index.html': { key: 'drone',      service: 'aerial-capture',            label: 'aerial capture' }
};

const MAX_DISCIPLINE_CARDS = 6;

function disciplineWorkBlock({ service, label }) {
  const items = published.filter((p) => (p.serviceSlugs || []).includes(service)).slice(0, MAX_DISCIPLINE_CARDS);

  /* Nothing tagged with this discipline yet: point at the work rather than
     showing an empty shelf. */
  if (!items.length) {
    return `
    <section class="page-wrap band work-strip">
      <div class="group-head">
        <div class="kicker">Selected work</div>
        <p class="group-lead">Projects across every area the studio works in.</p>
      </div>
      <div class="rail-grid">
${categories
  .map(
    (c) => `        <a class="rail-card" href="/industries/${c.slug}" style="--accent:${c.accent};">
          <span class="rail-name">${esc(c.name)}</span>
          <span class="rail-desc">${esc(c.short)} projects and approach</span>
        </a>`
  )
  .join('\n')}
      </div>
      <div class="actions"><a class="btn" href="/work">See all work</a></div>
    </section>`;
  }

  return `
    <section class="page-wrap band work-strip">
      <div class="group-head">
        <div class="kicker">Selected work</div>
        <p class="group-lead">Projects that used ${esc(label)}.</p>
      </div>
      <div class="work-grid">
          ${items.map(projectCard).join('\n          ')}
      </div>
      <div class="actions"><a class="btn" href="/work">See all work &rarr;</a></div>
    </section>`;
}

function injectDisciplineWork() {
  for (const [rel, cfg] of Object.entries(DISCIPLINE_PAGES)) {
    const full = join(ROOT, rel);
    let html;
    try {
      html = readFileSync(full, 'utf8');
    } catch {
      console.log('  skip (missing)', rel);
      continue;
    }
    const open = `<!-- WORK-CARDS:${cfg.key} -->`;
    const close = '<!-- /WORK-CARDS -->';
    const a = html.indexOf(open);
    const b = html.indexOf(close);
    if (a === -1 || b === -1) {
      console.log('  skip (no markers)', rel);
      continue;
    }
    const next = html.slice(0, a + open.length) + disciplineWorkBlock(cfg) + '\n    ' + html.slice(b);
    if (next !== html) {
      writeFileSync(full, next, 'utf8');
      console.log('  injected work cards ->', rel);
    }
  }
}

/* ---------------------------------------------------------------------------
   SITEMAP - regenerate the non-news half, keep whatever the news bot added.
   --------------------------------------------------------------------------- */

function buildSitemap() {
  const path = join(ROOT, 'sitemap.xml');
  const current = readFileSync(path, 'utf8');
  /* Keep the news POST urls the news bot maintains. The bare /news/ index is
     in `pages` below, so it must not also be preserved here or it duplicates
     on every rebuild - hence [^<]+ after the slash. */
  const newsUrls = current.match(/ {2}<url><loc>[^<]*\/news\/[^<]+<\/loc>.*?<\/url>/g) || [];

  const pages = [
    ['/', '1.0'],
    ['/work', '0.9'],
    ['/services', '0.9'],
    ...categories.map((c) => [`/industries/${c.slug}`, '0.8']),
    ...published.map((p) => [`/work/${p.slug}`, '0.8']),
    ['/about', '0.8'],
    ['/contact', '0.8'],
    ['/vfx', '0.7'],
    ['/animation', '0.7'],
    ['/visuals', '0.7'],
    ['/technology', '0.7'],
    ['/droneoperator', '0.7'],
    ['/shop', '0.6'],
    ['/jobs', '0.6'],
    ['/news/', '0.8']
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([loc, pri]) =>
      `  <url><loc>${SITE}${loc}</loc><changefreq>weekly</changefreq><priority>${pri}</priority></url>`
  )
  .join('\n')}
${newsUrls.join('\n')}
</urlset>
`;
  writeFileSync(path, xml, 'utf8');
  console.log('  wrote sitemap.xml');
}

/* llms.txt duplicated the case-study list by hand and drifted. Regenerate that
   one block from the data; the rest of the file stays hand-written. */
function buildLlms() {
  const path = join(ROOT, 'llms.txt');
  const current = readFileSync(path, 'utf8');
  const HEAD = '## Case studies';
  const start = current.indexOf(HEAD);
  const end = current.indexOf('## ', start + HEAD.length);
  if (start === -1 || end === -1) {
    console.log('  !! llms.txt: Case studies block not found, left alone');
    return;
  }
  const list = published.map((p) => `- [${p.title}](/work/${p.slug}): ${p.summary}`);
  const block = [HEAD, ...list, '', ''].join('\n');
  const next = current.slice(0, start) + block + current.slice(end);
  if (next !== current) writeFileSync(path, next, 'utf8');
  console.log(`  wrote llms.txt (${published.length} case studies)`);
}

/* --------------------------------------------------------------------------- */

console.log('Building generated pages (css v' + CSSV + ')...');
buildWork();
published.forEach(buildCaseStudy);
buildServices();
categories.forEach(buildIndustry);
injectDisciplineWork();
buildSitemap();
buildLlms();
console.log(
  `Done. ${published.length} case study page(s), ${projects.length - published.length} draft(s) listed without a page.`
);
