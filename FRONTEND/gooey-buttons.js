/* Gooey Pill Buttons + Particle Burst — auto-applies to all buttons across all pages */
(function () {
  'use strict';

  var COLORS = ['#fff','#22D3EE','#0891B2','#8b5cf6','#10b981','#f59e0b'];

  /* ─── PARTICLE BURST ─── */
  function burst(btn) {
    var rect = btn.getBoundingClientRect();
    var cx   = rect.width  / 2;
    var cy   = rect.height / 2;
    var count = 8;

    for (var i = 0; i < count; i++) {
      var angle  = (360 / count) * i;
      var rad    = angle * Math.PI / 180;
      var dist   = 28 + Math.random() * 18;
      var ex     = Math.cos(rad) * dist;
      var ey     = Math.sin(rad) * dist;
      var color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      var scale  = 0.4 + Math.random() * 0.6;

      var wrap = document.createElement('span');
      wrap.className = 'particle';
      wrap.style.cssText =
        '--start-x:0px;--start-y:0px;' +
        '--end-x:' + ex  + 'px;' +
        '--end-y:' + ey  + 'px;' +
        '--rotate:' + (angle * 1.5) + 'deg;' +
        '--color:' + color + ';' +
        '--scale:' + scale + ';' +
        'pointer-events:none;position:absolute;' +
        'top:calc(50% - 10px);left:calc(50% - 10px);z-index:50;';

      var dot = document.createElement('span');
      dot.className = 'point';
      dot.style.cssText = '--color:' + color + ';--scale:' + scale + ';';

      wrap.appendChild(dot);
      btn.appendChild(wrap);

      var t = parseFloat(getComputedStyle(wrap).getPropertyValue('--time')) * 1000 || 550;
      setTimeout(function (w) { if (w.parentNode) w.parentNode.removeChild(w); }, t + 100, wrap);
    }
  }

  /* ─── CLASSIFY BUTTON ─── */
  function classify(btn) { return 'ghost'; } // kept for compat, no longer used

  /* ─── APPLY GOOEY TO ONE BUTTON ─── */
  function applyBtn(btn) {
    if (btn._gooeyDone) return;
    btn._gooeyDone = true;

    /* Skip nav toggle (hamburger) */
    if (btn.classList.contains('nav-toggle') ||
        btn.classList.contains('nav-toggle-w')) return;

    btn.classList.add('gooey-btn');

    /* ── Click / tap: particle burst ── */
    btn.addEventListener('click', function () {
      burst(btn);
    });

    /* ── Mouse: spring bounce ── */
    btn.addEventListener('mousedown', function () {
      btn.style.transform = 'scale(.9)';
    });
    btn.addEventListener('mouseup', function () {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });

    /* ── Touch: glow + spring bounce + particle burst ── */
    btn.addEventListener('touchstart', function (e) {
      btn.classList.add('gooey-btn--touch');
      btn.style.transform = 'scale(.93)';
    }, { passive: true });

    btn.addEventListener('touchend', function (e) {
      btn.style.transform = '';
      burst(btn);
      /* Keep glow briefly then fade */
      setTimeout(function () {
        btn.classList.remove('gooey-btn--touch');
      }, 500);
    }, { passive: true });

    btn.addEventListener('touchcancel', function () {
      btn.style.transform = '';
      btn.classList.remove('gooey-btn--touch');
    }, { passive: true });
  }

  /* ─── SELECTORS ─── */
  var BTN_SEL = [
    'button',
    'input[type=button]',
    'input[type=submit]',
    '[class*=btn]',
    '[class*=loc-btn]',
    '[class*=tab-btn]',
    '[class*=submit-btn]',
    '[class*=toggle-btn]',
    '[class*=logout-btn]',
    '[class*=feat-btn]',
    '[class*=modal-btn]',
  ].join(',');

  function scan() {
    try {
      document.querySelectorAll(BTN_SEL).forEach(function (btn) {
        /* Skip hamburger spans & tiny utility things */
        if (btn.tagName === 'SPAN') return;
        applyBtn(btn);
      });
    } catch (e) {}
  }

  function init() {
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
