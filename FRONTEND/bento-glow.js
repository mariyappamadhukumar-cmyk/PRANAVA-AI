/* Magic Bento Glow — auto-applies purple border-glow to every card/box */
(function () {
  'use strict';

  /* All "box" selectors across every page */
  var SEL = [
    /* ai-doctor */
    '.tc','.med-card','.vax-card','.tc-sec','.topbar','.chat-wrap',
    /* ai-chat */
    '.chip-card','.derma-symptoms-panel','.upload-section','.vax-section',
    /* health-dashboard */
    '.stat-card','.chart-card',
    /* hospital / generic */
    '.card',
    /* online-consultation */
    '.spec-card','.step',
    /* doctor-options */
    '.opt-card',
    /* doctor-register */
    '.form-card','.dash-card',
    /* indexcough */
    '.result-row',
    /* welcome */
    '.feat-row','.stat','.modal-box',
    /* login / register right panels */
    '.right','.auth-box',
  ].join(',');

  function attach(el) {
    if (el._glowReady) return;
    el._glowReady = true;
    el.classList.add('glow-box');

    /* ── Mouse tracking ── */
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', ((e.clientX - r.left) / r.width  * 100) + '%');
      el.style.setProperty('--glow-y', ((e.clientY - r.top)  / r.height * 100) + '%');
      el.style.setProperty('--glow-intensity', '1');
    });

    el.addEventListener('mouseleave', function () {
      el.style.setProperty('--glow-intensity', '0');
    });

    /* ── Touch tracking (mobile) ── */
    el.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      var r = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', ((t.clientX - r.left) / r.width  * 100) + '%');
      el.style.setProperty('--glow-y', ((t.clientY - r.top)  / r.height * 100) + '%');
      el.style.setProperty('--glow-intensity', '1');
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      var r = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', ((t.clientX - r.left) / r.width  * 100) + '%');
      el.style.setProperty('--glow-y', ((t.clientY - r.top)  / r.height * 100) + '%');
    }, { passive: true });

    el.addEventListener('touchend', function () {
      setTimeout(function () {
        el.style.setProperty('--glow-intensity', '0');
      }, 600);
    }, { passive: true });
  }

  function scan() {
    try { document.querySelectorAll(SEL).forEach(attach); } catch (e) {}
  }

  function init() {
    /* Page-wide spotlight orb */
    var spot = document.createElement('div');
    spot.className = 'bento-spotlight';
    document.body.appendChild(spot);

    function moveSpot(x, y) {
      spot.style.left    = x + 'px';
      spot.style.top     = y + 'px';
      spot.style.opacity = '1';
    }

    document.addEventListener('mousemove', function (e) {
      moveSpot(e.clientX, e.clientY);
    });
    document.addEventListener('mouseleave', function () {
      spot.style.opacity = '0';
    });

    /* Touch: spotlight follows finger */
    document.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      moveSpot(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      moveSpot(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', function () {
      setTimeout(function () { spot.style.opacity = '0'; }, 800);
    }, { passive: true });

    scan();

    /* Watch for dynamically injected cards (treatment cards, doctor results…) */
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
