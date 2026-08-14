/* 별마마파파 — 밤하늘 배경과 등장 효과 */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 올해 연도 ─────────────────────────────── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── 스크롤 등장 ───────────────────────────── */
  var targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── 별하늘 ────────────────────────────────── */
  var canvas = document.getElementById("sky");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var stars = [];
  var shooting = null;
  var nextShootAt = 0;
  var w = 0;
  var h = 0;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    // 화면이 넓을수록 별을 더. 모바일에서 과하지 않게 상한을 둔다.
    var count = Math.min(220, Math.round((w * h) / 7000));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.35,
        base: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.0016 + 0.0004,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.28
      });
    }
  }

  function drawStars(t) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var twinkle = reduceMotion ? s.base : s.base + Math.sin(t * s.speed + s.phase) * 0.28;
      var a = Math.max(0.05, Math.min(1, twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? "rgba(245, 197, 66, " + a + ")"
        : "rgba(255, 255, 255, " + a * 0.85 + ")";
      ctx.fill();
    }
  }

  function spawnShootingStar() {
    var fromLeft = Math.random() < 0.5;
    shooting = {
      x: fromLeft ? -60 : w + 60,
      y: Math.random() * h * 0.45,
      vx: (fromLeft ? 1 : -1) * (Math.random() * 3 + 5),
      vy: Math.random() * 1.6 + 1.4,
      life: 0,
      max: Math.random() * 40 + 70
    };
  }

  function drawShootingStar() {
    if (!shooting) return;
    var s = shooting;
    var fade = 1 - s.life / s.max;
    var tailX = s.x - s.vx * 9;
    var tailY = s.y - s.vy * 9;

    var grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
    grad.addColorStop(0, "rgba(255, 233, 168, " + 0.85 * fade + ")");
    grad.addColorStop(1, "rgba(255, 233, 168, 0)");

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.stroke();

    s.x += s.vx;
    s.y += s.vy;
    s.life += 1;
    if (s.life >= s.max) shooting = null;
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    drawStars(t);

    if (!reduceMotion) {
      if (!shooting && t > nextShootAt) {
        spawnShootingStar();
        nextShootAt = t + 4500 + Math.random() * 6000;
      }
      drawShootingStar();
    }

    requestAnimationFrame(frame);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 180);
  });

  resize();
  requestAnimationFrame(frame);
})();
