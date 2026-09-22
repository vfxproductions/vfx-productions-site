/* Theme: follow the OS unless the visitor has picked one here.
   Loaded synchronously in <head> so data-theme is on <html> before first paint —
   deferring it gives you a black flash on the way into light mode. */
(function () {
  var KEY = 'vfx-theme';
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

  function saved() {
    try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null; }
    catch (e) { return null; }           /* private mode, blocked storage */
  }
  function os() { return mq && mq.matches ? 'light' : 'dark'; }
  function apply(theme) { root.setAttribute('data-theme', theme); }

  apply(saved() || os());

  /* Follow the OS live, but only while the visitor has not overridden it. */
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () { if (!saved()) apply(os()); });
  }

  function wire() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    function label() {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
      btn.setAttribute('title', 'Switch to ' + next + ' mode');
    }
    label();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
