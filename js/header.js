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
