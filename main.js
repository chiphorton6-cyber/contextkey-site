// ContextKey site: tiny progressive-enhancement script. Site works without it.
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Hero demo: toggle cards, INJECT+ inserts selected context into the bubble
  var cards = document.querySelectorAll('.kb-cards .card');
  var injectBtn = document.getElementById('demo-btn');
  var out = document.getElementById('demo-inject');
  if (!cards.length || !injectBtn || !out) return;

  cards.forEach(function (c) {
    c.addEventListener('click', function () { c.classList.toggle('on'); });
  });

  function inject() {
    var parts = [];
    cards.forEach(function (c) { if (c.classList.contains('on')) parts.push(c.dataset.inject); });
    out.textContent = parts.join(' ');
  }
  injectBtn.addEventListener('click', inject);

  // Auto-play once so visitors see the effect (skipped for reduced motion)
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setTimeout(function () {
      injectBtn.style.transform = 'scale(.92)';
      setTimeout(function () { injectBtn.style.transform = ''; inject(); }, 160);
    }, 1400);
  } else {
    inject();
  }
})();
