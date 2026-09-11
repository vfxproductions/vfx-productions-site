/* Background loops: only fetch + play while on screen.
   Pages mark them with data-lazyvideo (no autoplay attribute, preload="none"). */
(function () {
  var vids = document.querySelectorAll('video[data-lazyvideo]');
  if (!vids.length) return;

  function start(v) { v.preload = 'auto'; var p = v.play(); if (p) p.catch(function () {}); }

  if (!('IntersectionObserver' in window)) {
    // ponytail: no polyfill — old browsers just load everything, as before
    Array.prototype.forEach.call(vids, start);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) start(e.target);
      else e.target.pause();
    });
  }, { rootMargin: '300px 0px' });

  Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
})();
