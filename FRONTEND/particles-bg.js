/* ── Floating Particles Background ── */
(function(){
  var canvas = document.getElementById('particlesBg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, pts = [], mx = -9999, my = -9999;
  var COUNT = Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.35 + 160);

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkPt(){
    var teal = Math.random() > 0.52;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2 + 0.8,
      op: Math.random() * 0.42 + 0.08,
      r0: teal ? 8   : 255,
      g0: teal ? 145 : 255,
      b0: teal ? 178 : 255
    };
  }

  function init(){
    pts = [];
    for(var i = 0; i < COUNT; i++) pts.push(mkPt());
  }

  function frame(){
    ctx.clearRect(0, 0, W, H);

    /* connection lines */
    for(var i = 0; i < pts.length; i++){
      for(var j = i + 1; j < pts.length; j++){
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        var d  = Math.sqrt(dx*dx + dy*dy);
        if(d < 160){
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(8,145,178,' + (0.16 * (1 - d/160)) + ')';
          ctx.lineWidth = 0.7;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    /* dots */
    for(var i = 0; i < pts.length; i++){
      var p = pts[i];
      /* mouse repel */
      var dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx*dx + dy*dy);
      if(d < 110 && d > 0){
        var f = (110 - d) / 110 * 0.9;
        p.vx += dx/d * f;
        p.vy += dy/d * f;
      }
      p.vx *= 0.98; p.vy *= 0.98;
      var sp = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if(sp > 1.8){ p.vx = p.vx/sp*1.8; p.vy = p.vy/sp*1.8; }
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = W+10; if(p.x > W+10) p.x = -10;
      if(p.y < -10) p.y = H+10; if(p.y > H+10) p.y = -10;

      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      g.addColorStop(0, 'rgba('+p.r0+','+p.g0+','+p.b0+','+p.op+')');
      g.addColorStop(1, 'rgba('+p.r0+','+p.g0+','+p.b0+',0)');
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener('mousemove',  function(e){ mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', function(){  mx = -9999;    my = -9999; });
  document.addEventListener('touchmove',  function(e){ mx = e.touches[0].clientX; my = e.touches[0].clientY; }, {passive:true});
  document.addEventListener('touchend',   function(){  mx = -9999; my = -9999; }, {passive:true});

  window.addEventListener('resize', function(){ resize(); init(); });
  resize(); init(); frame();
})();
