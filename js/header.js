/* Fade a solid background in behind the header once the page scrolls, so the
   logo and menu stay readable over whatever is passing underneath. */
(function () {
  var header = document.querySelector('header');
  if (!header) return;

  var ticking = false;
  function update() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* The news generator's template drops the theme.js tag from <head> while
   keeping the toggle button, which leaves the button dead. Load it late here
   so bot-written pages still get a working switch. */
if (!document.querySelector('script[src="/js/theme.js"]')) {
  var themeScript = document.createElement('script');
  themeScript.src = '/js/theme.js';
  document.head.appendChild(themeScript);
}

/* A mailto link does nothing useful on a machine with no mail app set up (or
   opens a browser instead), so copy the address and show it as well. The copy
   has to finish before the mail app steals focus, or the browser refuses it. */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
  if (!a) return;
  e.preventDefault();
  var href = a.getAttribute('href');
  var addr = href.slice(7).split('?')[0];
  function done(copied) {
    var t = document.createElement('div');
    t.setAttribute('role', 'status');
    t.textContent = (copied ? 'Email address copied: ' : 'Email us at ') + addr;
    t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;' +
      'padding:12px 18px;border-radius:10px;font:500 .9rem/1.3 inherit;max-width:calc(100vw - 32px);' +
      'background:var(--fg,#fff);color:var(--bg,#000);box-shadow:0 8px 30px rgba(0,0,0,.35);';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4000);
    window.location.href = href;
  }
  if (navigator.clipboard) navigator.clipboard.writeText(addr).then(function () { done(true); }, function () { done(false); });
  else done(false);
});
