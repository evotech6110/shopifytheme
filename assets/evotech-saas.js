/* EvoTech SaaS Ecosystem — Theme JS
   Progressive enhancements: AOS init, FAQ accessibility, mega-menu keyboard handling.
   Loaded as a module; safe if any elements are missing. */

(function () {
  'use strict';

  // ---- AOS scroll animations (link tag is loaded in theme.liquid <head>)
  function loadAOS() {
    if (window.AOS) { window.AOS.init({ duration: 600, once: true, offset: 40 }); return; }
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/aos@next/dist/aos.js';
    s.async = true;
    s.onload = function () { if (window.AOS) window.AOS.init({ duration: 600, once: true, offset: 40 }); };
    document.head.appendChild(s);
  }

  // ---- FAQ: accessible <details>/<summary> already, but keep one open at a time (optional)
  function wireFAQ() {
    var items = document.querySelectorAll('.evo-faq__item');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (o) { if (o !== d && o.open) o.open = false; });
      });
    });
  }

  // ---- Mega menu: keyboard open/close
  function wireMenu() {
    var menus = document.querySelectorAll('[data-evo-menu]');
    menus.forEach(function (m) {
      var trigger = m.querySelector('.evo-menu__trigger');
      if (!trigger) return;
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var open = m.getAttribute('aria-expanded') === 'true';
        m.setAttribute('aria-expanded', open ? 'false' : 'true');
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      document.addEventListener('click', function (e) {
        if (!m.contains(e.target)) { m.setAttribute('aria-expanded', 'false'); trigger.setAttribute('aria-expanded', 'false'); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { m.setAttribute('aria-expanded', 'false'); trigger.setAttribute('aria-expanded', 'false'); }
      });
    });
  }

  // ---- Sticky header shrink on scroll (non-destructive)
  function wireSticky() {
    var h = document.querySelector('[data-evo-sticky]');
    if (!h) return;
    var onScroll = function () {
      if (window.scrollY > 16) h.classList.add('is-scrolled');
      else h.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { loadAOS(); wireFAQ(); wireMenu(); wireSticky(); });
  } else { loadAOS(); wireFAQ(); wireMenu(); wireSticky(); }
})();

/* -------------------------------------------------------------------------
   Full-screen hero: typewriter, particle canvas, count-up stats, mobile drawer
   ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Typewriter ---
  function initTypewriter() {
    var el = document.querySelector('[data-evo-typewriter]');
    if (!el) return;
    var words = (el.getAttribute('data-words') || '').split('|').filter(Boolean);
    if (!words.length) return;
    if (reduced) { el.textContent = words[0]; return; }

    var wi = 0, ci = 0, deleting = false;
    function tick() {
      var word = words[wi];
      el.textContent = word.slice(0, ci);
      var delay = deleting ? 42 : 80;
      if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
      else if (deleting && ci === 0)        { delay = 240;  deleting = false; wi = (wi + 1) % words.length; }
      else                                   { ci += deleting ? -1 : 1; }
      setTimeout(tick, delay);
    }
    tick();
  }

  // --- Particle canvas ---
  function initParticles() {
    var canvas = document.querySelector('[data-evo-particles]');
    if (!canvas || reduced) return;
    var ctx = canvas.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, particles = [];

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    }
    function seed() {
      var count = Math.max(28, Math.min(72, Math.round(w * h / 24000)));
      particles = new Array(count).fill(0).map(function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 0.8 + Math.random() * 1.6
        };
      });
    }
    function step() {
      ctx.clearRect(0, 0, w, h);
      // Draw connecting lines
      for (var i = 0; i < particles.length; i++) {
        var a = particles[i];
        for (var j = i + 1; j < particles.length; j++) {
          var b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            var alpha = 1 - d2 / 14000;
            ctx.strokeStyle = 'rgba(14, 34, 64,' + (alpha * 0.12) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // Draw dots
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = 'rgba(14, 34, 64, 0.28)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(step);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(step);
  }

  // --- Count-up stats ---
  function initCountUp() {
    var stats = document.querySelectorAll('[data-evo-count]');
    if (!stats.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-evo-count')) || 0;
        var suffix = el.getAttribute('data-evo-suffix') || '';
        if (reduced) { el.textContent = target + suffix; return; }
        var start = null, duration = 1400;
        var isFloat = target % 1 !== 0;
        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
        function frame(ts) {
          if (!start) start = ts;
          var t = Math.min(1, (ts - start) / duration);
          var v = target * easeOut(t);
          el.textContent = (isFloat ? v.toFixed(2) : Math.round(v)) + suffix;
          if (t < 1) requestAnimationFrame(frame);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { io.observe(s); });
  }

  // --- Mobile drawer ---
  function initDrawer() {
    var toggle = document.querySelector('[data-evo-drawer-toggle]');
    var drawer = document.querySelector('[data-evo-drawer]');
    if (!toggle || !drawer) return;
    toggle.addEventListener('click', function () {
      var open = drawer.getAttribute('aria-hidden') === 'false';
      drawer.setAttribute('aria-hidden', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      document.body.style.overflow = open ? '' : 'hidden';
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
        drawer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  function boot() { initTypewriter(); initParticles(); initCountUp(); initDrawer(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
