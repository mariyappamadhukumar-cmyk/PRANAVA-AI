/* =====================================================
   Shared MediCare Navbar — injected into every page
   Shows: Hamburger | Logo | Nav links | Username chip | Sign In / Logout btn
   ===================================================== */
(function(){
  'use strict';

  /* ── CSS ─────────────────────────────────────────── */
  var css = `
  .mc-nav{position:fixed;top:0;left:0;right:0;z-index:9999;height:64px;
    background:rgba(8,8,8,.85);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
    border-bottom:1px solid rgba(255,255,255,.08);
    display:flex;align-items:center;padding:0 22px;gap:14px;font-family:'Inter',-apple-system,sans-serif}
  .mc-toggle{width:34px;height:34px;border-radius:7px;background:transparent;
    border:1px solid rgba(255,255,255,.08);cursor:pointer;display:flex;flex-direction:column;
    justify-content:center;align-items:center;gap:4px;transition:background .15s;flex-shrink:0}
  .mc-toggle:hover{background:rgba(255,255,255,.06)}
  .mc-toggle span{width:15px;height:1.5px;background:#fff;border-radius:1px;transition:all .2s;display:block}
  .mc-toggle.open span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .mc-toggle.open span:nth-child(2){opacity:0}
  .mc-toggle.open span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
  .mc-logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-right:auto}
  .mc-mark{width:32px;height:32px;border-radius:7px;background:#0891B2;
    display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .mc-mark svg{width:16px;height:16px;color:#fff;display:block}
  .mc-brand{font-size:.9rem;font-weight:700;color:#fff;letter-spacing:-.01em}
  .mc-brand b{color:#22D3EE}
  .mc-links{display:flex;align-items:center;gap:2px}
  .mc-links a{color:rgba(255,255,255,.5);text-decoration:none;font-size:.8rem;font-weight:500;
    padding:6px 12px;border-radius:6px;transition:color .15s,background .15s;white-space:nowrap}
  .mc-links a:hover{color:#fff;background:rgba(255,255,255,.06)}
  .mc-links a.active{color:#22D3EE}
  @media(max-width:768px){.mc-links{display:none}}
  .mc-chip{display:none;align-items:center;gap:8px;padding:5px 11px;
    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:7px;
    font-size:.8rem;font-weight:600;color:#fff;flex-shrink:0}
  .mc-chip.show{display:flex}
  .mc-av{width:22px;height:22px;border-radius:50%;background:#0891B2;color:#fff;
    font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .mc-btn{padding:8px 20px;border-radius:7px;cursor:pointer;font-size:.8rem;font-weight:600;
    letter-spacing:.02em;transition:all .15s;border:none;font-family:'Inter',sans-serif;flex-shrink:0}
  .mc-btn.signin{background:#fff;color:#080808}
  .mc-btn.signin:hover{background:rgba(255,255,255,.88)}
  .mc-btn.logout{background:#0891B2;color:#fff;border:1px solid #0891B2}
  .mc-btn.logout:hover{background:#0e7490;border-color:#0e7490}

  /* ── SIDEBAR ──────────────────────────────────────── */
  .mc-sb-ov{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:10000;
    opacity:0;visibility:hidden;transition:all .22s}
  .mc-sb-ov.open{opacity:1;visibility:visible}
  .mc-sb{position:fixed;top:0;left:-280px;width:280px;height:100vh;
    background:#111;border-right:1px solid rgba(255,255,255,.08);z-index:10001;
    transition:left .22s ease;display:flex;flex-direction:column;
    font-family:'Inter',-apple-system,sans-serif}
  .mc-sb.open{left:0}
  .mc-sb-head{padding:20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:10px}
  .mc-sb-mark{width:32px;height:32px;border-radius:7px;background:#0891B2;
    display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .mc-sb-mark svg{width:16px;height:16px;color:#fff;display:block}
  .mc-sb-title{font-size:.88rem;font-weight:700;color:#fff}
  .mc-sb-sub{font-size:.7rem;color:rgba(255,255,255,.5);margin-top:1px}
  .mc-sb-label{padding:16px 20px 6px;font-size:.65rem;font-weight:700;
    letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.28)}
  .mc-sb-item{display:flex;align-items:center;gap:12px;padding:10px 20px;
    color:rgba(255,255,255,.5);text-decoration:none;border-left:2px solid transparent;
    transition:all .15s;font-size:.85rem;font-weight:500;cursor:pointer;background:none;border-top:none;border-right:none;border-bottom:none;width:100%;text-align:left}
  .mc-sb-item:hover{background:rgba(255,255,255,.04);color:#fff;border-left-color:#0891B2}
  .mc-sb-item.logout-item{color:rgba(34,211,238,.8)}
  .mc-sb-item.logout-item:hover{background:rgba(8,145,178,.06);border-left-color:#22D3EE;color:#22D3EE}
  .mc-sb-item svg{width:16px;height:16px;flex-shrink:0;display:block}
  .mc-sb-foot{margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding:8px 0}
  .mc-user-row{padding:10px 20px 6px;display:flex;align-items:center;gap:10px}
  .mc-user-av{width:32px;height:32px;border-radius:50%;background:#0891B2;color:#fff;
    font-size:.8rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .mc-user-name{font-size:.85rem;font-weight:600;color:#fff}

  /* ── CUSTOM CURSOR ──────────────────────────────── */
  @media(pointer:fine){
    *,*::before,*::after{cursor:none!important}
  }
  .target-cursor-wrapper{
    position:fixed;top:0;left:0;width:0;height:0;
    pointer-events:none;z-index:99999;
  }
  .target-cursor-dot{
    position:absolute;left:50%;top:50%;
    width:5px;height:5px;
    background:#22D3EE;border-radius:50%;
    transform:translate(-50%,-50%);
    box-shadow:0 0 6px #22D3EE,0 0 12px rgba(34,211,238,.5);
  }
  .target-cursor-corner{
    position:absolute;left:50%;top:50%;
    width:14px;height:14px;
    border:2px solid #22D3EE;
    transition:width .18s ease,height .18s ease,border-color .18s ease,opacity .2s;
    box-shadow:0 0 4px rgba(34,211,238,.4);
  }
  .corner-tl{transform:translate(-150%,-150%);border-right:none;border-bottom:none}
  .corner-tr{transform:translate(50%,-150%);border-left:none;border-bottom:none}
  .corner-br{transform:translate(50%,50%);border-left:none;border-top:none}
  .corner-bl{transform:translate(-150%,50%);border-right:none;border-top:none}
  .target-cursor-wrapper.hover .target-cursor-corner{
    width:24px;height:24px;
    border-color:#fff;
    box-shadow:0 0 6px rgba(255,255,255,.3)
  }
  .target-cursor-wrapper.hover .target-cursor-dot{
    background:#fff;
    box-shadow:0 0 6px #fff
  }
  .target-cursor-wrapper.click .target-cursor-corner{width:6px;height:6px}
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── NAV PAGES ───────────────────────────────────── */
  var pages = [
    {label:'AI Doctor',      href:'ai-doctor.html',          icon:'<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'},
    {label:'AI Chat',        href:'ai-chat.html',            icon:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'},
    {label:'Cough Analysis', href:'indexcough.html',         icon:'<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/>'},
    {label:'Book Doctor',    href:'online-consultation.html',icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'},
    {label:'Hospitals',      href:'hospital.html',           icon:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'},
    {label:'Dashboard',      href:'health-dashboard.html',   icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'},
    {label:'Vaccination',    href:'#',                       icon:'<path d="M23 6l-9.5 9.5-4-4L1 18M23 6v12h-12"/>', action:'openVaccination'},
  ];

  function svgIcon(paths){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+paths+'</svg>';
  }

  function currentPage(){
    return window.location.pathname.split('/').pop() || 'welcome.html';
  }

  /* ── BUILD NAV ──────────────────────────────────── */
  function buildNav(){
    var cur = currentPage();

    /* nav links */
    var linksHtml = pages.map(function(p){
      var active = cur === p.href ? ' active' : '';
      var onclick = p.action ? ' onclick="'+p.action+'(); return false;"' : '';
      return '<a href="'+p.href+'" class="'+active+'"'+onclick+'>'+p.label+'</a>';
    }).join('');

    /* sidebar items */
    var sbItems = pages.map(function(p){
      var onclick = p.action ? ' onclick="'+p.action+'(); return false;"' : '';
      return '<a href="'+p.href+'" class="mc-sb-item"'+onclick+'>'+svgIcon(p.icon)+p.label+'</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.className = 'mc-nav';
    nav.id = 'mcNav';
    nav.innerHTML =
      '<button class="mc-toggle" id="mcToggle" aria-label="Menu"><span></span><span></span><span></span></button>'+
      '<a href="welcome.html" class="mc-logo">'+
        '<div class="mc-mark">'+svgIcon('<path d="M12 4v16M4 12h16"/>')+'</div>'+
        '<span class="mc-brand">Medi<b>Care</b></span>'+
      '</a>'+
      '<div class="mc-links" id="mcLinks">'+linksHtml+'</div>'+
      '<div class="mc-chip" id="mcChip"><div class="mc-av" id="mcAv">U</div><span id="mcName">User</span></div>'+
      '<button class="mc-btn signin" id="mcAuthBtn" onclick="mcHandleAuth()">Sign In</button>';

    var overlay = document.createElement('div');
    overlay.className = 'mc-sb-ov';
    overlay.id = 'mcSbOv';
    overlay.onclick = mcToggle;

    var sb = document.createElement('aside');
    sb.className = 'mc-sb';
    sb.id = 'mcSb';
    sb.innerHTML =
      '<div class="mc-sb-head">'+
        '<div class="mc-sb-mark">'+svgIcon('<path d="M12 4v16M4 12h16"/>')+'</div>'+
        '<div><div class="mc-sb-title">MediCare</div><div class="mc-sb-sub">Health Platform</div></div>'+
      '</div>'+
      '<div class="mc-user-row" id="mcSbUserRow" style="display:none">'+
        '<div class="mc-user-av" id="mcSbAv">U</div>'+
        '<span class="mc-user-name" id="mcSbName">User</span>'+
      '</div>'+
      '<div class="mc-sb-label">Navigation</div>'+
      sbItems+
      '<div class="mc-sb-foot">'+
        '<button class="mc-sb-item logout-item" id="mcSbLogout" onclick="mcHandleAuth()" style="display:none">'+
          svgIcon('<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>') +
          'Sign Out'+
        '</button>'+
      '</div>';

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(sb, document.body.firstChild);
    document.body.insertBefore(nav, document.body.firstChild);

    /* Ensure page body has top padding */
    if(!document.body.style.paddingTop){
      document.body.style.paddingTop = '64px';
    }
  }

  /* ── SIDEBAR TOGGLE ─────────────────────────────── */
  function mcToggle(){
    document.getElementById('mcSb').classList.toggle('open');
    document.getElementById('mcSbOv').classList.toggle('open');
    document.getElementById('mcToggle').classList.toggle('open');
  }
  window.mcToggle = mcToggle;

  /* ── AUTH ───────────────────────────────────────── */
  function mcCheckAuth(){
    var t = localStorage.getItem('authToken');
    var info = {};
    try{ info = JSON.parse(localStorage.getItem('userInfo')||'{}'); }catch(e){}
    var name = info.name || localStorage.getItem('userName') || '';
    var btn = document.getElementById('mcAuthBtn');
    var chip = document.getElementById('mcChip');
    var av = document.getElementById('mcAv');
    var nm = document.getElementById('mcName');
    var sbUserRow = document.getElementById('mcSbUserRow');
    var sbAv = document.getElementById('mcSbAv');
    var sbName = document.getElementById('mcSbName');
    var sbLogout = document.getElementById('mcSbLogout');

    if(t && name){
      btn.textContent = 'Sign Out';
      btn.className = 'mc-btn logout';
      chip.classList.add('show');
      av.textContent = name.charAt(0).toUpperCase();
      nm.textContent = name;
      if(sbUserRow){ sbUserRow.style.display='flex'; }
      if(sbAv){ sbAv.textContent = name.charAt(0).toUpperCase(); }
      if(sbName){ sbName.textContent = name; }
      if(sbLogout){ sbLogout.style.display='flex'; }
    } else {
      btn.textContent = 'Sign In';
      btn.className = 'mc-btn signin';
      chip.classList.remove('show');
      if(sbUserRow){ sbUserRow.style.display='none'; }
      if(sbLogout){ sbLogout.style.display='none'; }
    }
  }
  window.mcCheckAuth = mcCheckAuth;

  function mcHandleAuth(){
    if(localStorage.getItem('authToken')){
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userName');
      mcCheckAuth();
      /* close sidebar if open */
      document.getElementById('mcSb').classList.remove('open');
      document.getElementById('mcSbOv').classList.remove('open');
      document.getElementById('mcToggle').classList.remove('open');
    } else {
      window.location.href = 'login.html';
    }
  }
  window.mcHandleAuth = mcHandleAuth;

  /* ── CUSTOM CURSOR ─────────────────────────────── */
  function buildCursor(){
    if(!window.matchMedia('(pointer:fine)').matches) return;

    var wrap = document.createElement('div');
    wrap.className = 'target-cursor-wrapper';
    wrap.innerHTML =
      '<div class="target-cursor-dot"></div>'+
      '<div class="target-cursor-corner corner-tl"></div>'+
      '<div class="target-cursor-corner corner-tr"></div>'+
      '<div class="target-cursor-corner corner-br"></div>'+
      '<div class="target-cursor-corner corner-bl"></div>';
    document.body.appendChild(wrap);

    var mx = window.innerWidth/2, my = window.innerHeight/2;
    var cx = mx, cy = my;
    var HOVER_SEL = 'a,button,[role="button"],input,textarea,select,label';

    document.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
    });

    document.addEventListener('mouseover', function(e){
      if(e.target && e.target.closest(HOVER_SEL)) wrap.classList.add('hover');
    });
    document.addEventListener('mouseout', function(e){
      if(e.target && e.target.closest(HOVER_SEL)) wrap.classList.remove('hover');
    });
    document.addEventListener('mousedown', function(){ wrap.classList.add('click'); });
    document.addEventListener('mouseup',   function(){ wrap.classList.remove('click'); });

    (function tick(){
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      wrap.style.transform = 'translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)';
      requestAnimationFrame(tick);
    })();
  }

  /* ── VACCINATION MODAL ──────────────────────────── */
  function openVaccination(){
    var panel = document.getElementById('vax-panel');
    if(panel) {
      panel.style.display = 'flex';
    } else {
      console.warn('Vaccination panel (vax-panel) not found');
    }
  }
  window.openVaccination = openVaccination;

  /* ── INIT ────────────────────────────────────────── */
  function init(){
    buildNav();
    /* Wire toggle button after DOM insert */
    document.getElementById('mcToggle').onclick = mcToggle;
    mcCheckAuth();
    buildCursor();
    /* Listen for storage changes (login from another tab) */
    window.addEventListener('storage', mcCheckAuth);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
