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
