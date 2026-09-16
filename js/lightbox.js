/* Gallery lightbox for the case-study "Process" grids.

   Opens images and videos, steps through the gallery with arrows, keyboard or
   a swipe, and builds its own markup so pages only need this one script tag.
   Uses a native <dialog>, so Esc, focus trapping and the backdrop come free. */
(function () {
  var galleries = document.querySelectorAll('.cs-gallery');
  if (!galleries.length) return;

  var dlg = document.createElement('dialog');
  if (!dlg.showModal) return;              // no dialog support: tiles stay inline
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Gallery viewer');
  dlg.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lightbox-nav prev" aria-label="Previous">&#8249;</button>' +
    '<button type="button" class="lightbox-nav next" aria-label="Next">&#8250;</button>' +
    '<div class="lightbox-stage"></div>' +
    '<div class="lightbox-bar">' +
      '<p class="lightbox-cap"></p>' +
      '<p class="lightbox-count" aria-live="polite"></p>' +
    '</div>';
  document.body.appendChild(dlg);

  var stage  = dlg.querySelector('.lightbox-stage');
  var cap    = dlg.querySelector('.lightbox-cap');
  var count  = dlg.querySelector('.lightbox-count');
  var prevBt = dlg.querySelector('.prev');
  var nextBt = dlg.querySelector('.next');

  var items = [];      // [{type,src,poster,alt}]
  var index = 0;
  var opener = null;

  function readGallery(gal) {
    return Array.prototype.map.call(gal.querySelectorAll('.zoom'), function (btn) {
      var v = btn.querySelector('video');
      if (v) {
        var src = v.querySelector('source');
        return {
          type: 'video',
          src: src ? src.getAttribute('src') : '',
          mime: src ? src.getAttribute('type') : 'video/mp4',
          poster: v.getAttribute('poster') || '',
          alt: v.getAttribute('aria-label') || ''
        };
      }
      var img = btn.querySelector('img');
      return { type: 'image', src: img ? (img.currentSrc || img.src) : '', alt: img ? img.alt : '' };
    });
  }

  function render() {
    var it = items[index];
    stage.innerHTML = '';
    if (it.type === 'video') {
      var v = document.createElement('video');
      v.controls = true;
      v.autoplay = true;
      v.loop = true;
      v.muted = true;                       // required for autoplay
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      if (it.poster) v.poster = it.poster;
      if (it.alt) v.setAttribute('aria-label', it.alt);
      var s = document.createElement('source');
      s.src = it.src;
      s.type = it.mime || 'video/mp4';
      v.appendChild(s);
      stage.appendChild(v);
      var pr = v.play();
      if (pr) pr.catch(function () {});
    } else {
      var img = document.createElement('img');
      img.src = it.src;
      img.alt = it.alt || '';
      stage.appendChild(img);
    }
    cap.textContent = it.alt || '';
    count.textContent = items.length > 1 ? index + 1 + ' / ' + items.length : '';
    var many = items.length > 1;
    prevBt.hidden = !many;
    nextBt.hidden = !many;
    dlg.classList.toggle('is-single', !many);
  }

  function go(step) {
    if (items.length < 2) return;
    index = (index + step + items.length) % items.length;   // wraps both ways
    render();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.zoom');
    if (btn) {
      var gal = btn.closest('.cs-gallery');
      if (!gal) return;
      items = readGallery(gal);
      index = Array.prototype.indexOf.call(gal.querySelectorAll('.zoom'), btn);
      if (index < 0) index = 0;
      opener = btn;
      render();
      dlg.showModal();
      return;
    }
    if (!dlg.open) return;
    if (e.target === dlg || e.target === stage) dlg.close();   // click the backdrop
  });

  prevBt.addEventListener('click', function () { go(-1); });
  nextBt.addEventListener('click', function () { go(1); });
  dlg.querySelector('.lightbox-close').addEventListener('click', function () { dlg.close(); });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  /* Swipe. Horizontal only, so scrubbing a video or scrolling does not trigger it. */
  var x0 = null, y0 = null;
  dlg.addEventListener('touchstart', function (e) {
    x0 = e.changedTouches[0].clientX;
    y0 = e.changedTouches[0].clientY;
  }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;   // not a horizontal swipe
    go(dx < 0 ? 1 : -1);
  }, { passive: true });

  dlg.addEventListener('close', function () {
    stage.innerHTML = '';            // stops any playing video
    if (opener) { opener.focus(); opener = null; }
  });
})();
