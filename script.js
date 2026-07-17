/* ============================================================
   Cassidy Harden ♡ — effects & easter eggs
   Lavender + matcha, flowers + dogs.
   Touch-first, fail-safe: the site reads fine if none of
   this ever runs.
   ============================================================ */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOGETHER = new Date(2022, 3, 14); // April 14, 2022
  const WEDDING = new Date(2025, 3, 5); // April 5, 2025

  /* ---------- Toast ---------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;
  const say = (msg, ms = 3200) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), ms);
  };

  /* ---------- Reveal on scroll (fail-safe) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
    setTimeout(() => reveals.forEach(el => el.classList.add('in')), 4000);
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- Sparkle bursts on tap ---------- */
  const fx = document.getElementById('fx');
  const fctx = fx.getContext('2d');
  let parts = [];
  const sizeFx = () => { fx.width = innerWidth * devicePixelRatio; fx.height = innerHeight * devicePixelRatio; fctx.scale(devicePixelRatio, devicePixelRatio); };
  sizeFx();
  addEventListener('resize', sizeFx);
  const GLYPHS = ['✨', '💜', '🌸', '🐾', '🍵', '🌷', '🌼'];
  let fxRunning = false;
  const burst = (x, y, n = 14) => {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 3.4 + 1.2;
      parts.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 2,
        g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        size: Math.random() * 12 + 10,
        life: 1,
        spin: (Math.random() - .5) * .2,
        rot: Math.random() * Math.PI
      });
    }
    if (!fxRunning) { fxRunning = true; requestAnimationFrame(tickFx); }
  };
  const tickFx = () => {
    fctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life > 0);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += .09;
      p.life -= .016; p.rot += p.spin;
      fctx.save();
      fctx.globalAlpha = Math.max(p.life, 0);
      fctx.translate(p.x, p.y);
      fctx.rotate(p.rot);
      fctx.font = p.size + 'px serif';
      fctx.textAlign = 'center';
      fctx.fillText(p.g, 0, 0);
      fctx.restore();
    });
    // Sleep the loop once the last sparkle dies — her battery is not a toy.
    if (parts.length) requestAnimationFrame(tickFx);
    else fxRunning = false;
  };
  addEventListener('pointerdown', e => burst(e.clientX, e.clientY), { passive: true });

  /* ---------- Falling petals in hero ---------- */
  const pc = document.getElementById('petals');
  if (pc && !reduced) {
    const pctx = pc.getContext('2d');
    const hero = pc.parentElement;
    const sizeP = () => { pc.width = hero.offsetWidth; pc.height = hero.offsetHeight; };
    sizeP();
    addEventListener('resize', sizeP);
    // Mostly soft lavender/matcha petals, with the occasional flower or
    // paw print drifting through. Flowers and dogs, as requested.
    const GLYPH_DROPS = ['🌸', '🌷', '🌼', '🐾', '💜', '🍃'];
    const petals = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * pc.width,
      y: Math.random() * pc.height,
      r: Math.random() * 7 + 4,
      sway: Math.random() * 1.4 + .4,
      fall: Math.random() * .5 + .3,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > .5 ? '155, 127, 199' : '140, 175, 111',
      // every third drop is a little flower or paw instead of a petal
      glyph: i % 3 === 0 ? GLYPH_DROPS[(Math.random() * GLYPH_DROPS.length) | 0] : null,
      size: Math.random() * 10 + 14
    }));
    // Only animate while the hero is actually on screen and the tab is visible.
    let petalsOn = false;
    const drawPetals = () => {
      if (!petalsOn) return;
      pctx.clearRect(0, 0, pc.width, pc.height);
      petals.forEach(p => {
        p.y += p.fall;
        p.phase += .012;
        const x = p.x + Math.sin(p.phase) * 28 * p.sway;
        if (p.y > pc.height + 24) { p.y = -24; p.x = Math.random() * pc.width; }
        if (p.glyph) {
          pctx.save();
          pctx.globalAlpha = .55;
          pctx.translate(x, p.y);
          pctx.rotate(Math.sin(p.phase) * .5);
          pctx.font = p.size + 'px serif';
          pctx.textAlign = 'center';
          pctx.fillText(p.glyph, 0, 0);
          pctx.restore();
        } else {
          pctx.beginPath();
          pctx.ellipse(x, p.y, p.r, p.r * .62, Math.sin(p.phase) * .9, 0, Math.PI * 2);
          pctx.fillStyle = `rgba(${p.hue}, .30)`;
          pctx.fill();
        }
      });
      requestAnimationFrame(drawPetals);
    };
    const setPetals = on => {
      if (on === petalsOn) return;
      petalsOn = on;
      if (on) requestAnimationFrame(drawPetals);
    };
    setPetals(true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        es => setPetals(es[0].isIntersecting && !document.hidden),
        { threshold: 0 }
      ).observe(hero);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) setPetals(false);
      else if (hero.getBoundingClientRect().bottom > 0) setPetals(true);
    });
  }

  /* ---------- Days-married counter (tap to change units) ---------- */
  const num = document.getElementById('counterNum');
  const label = document.getElementById('counterLabel');
  const card = document.getElementById('counterCard');
  if (num) {
    const UNITS = [
      { n: 'days of being ridiculously loved', f: ms => Math.floor(ms / 864e5) },
      { n: 'hours of putting up with him', f: ms => Math.floor(ms / 36e5) },
      { n: 'minutes of being the favorite', f: ms => Math.floor(ms / 6e4) },
      { n: 'seconds and he’d choose you in all of them', f: ms => Math.floor(ms / 1e3) }
    ];
    let u = 0;
    const draw = () => {
      const ms = Date.now() - WEDDING.getTime();
      num.textContent = UNITS[u].f(ms).toLocaleString('en-US');
      label.textContent = UNITS[u].n;
    };
    draw();
    setInterval(draw, 1000);
    card.addEventListener('click', () => {
      u = (u + 1) % UNITS.length;
      draw();
      if (u === 3) say('every single one of them 🤍');
    });
  }

  /* ---------- Together since April 14, 2022 ---------- */
  const tgNum = document.getElementById('togetherNum');
  const tgYrs = document.getElementById('togetherYrs');
  if (tgNum && tgYrs) {
    const draw = () => {
      const ms = Date.now() - TOGETHER.getTime();
      const days = Math.floor(ms / 864e5);
      const years = Math.floor(days / 365.25);
      tgNum.textContent = days.toLocaleString('en-US');
      tgYrs.textContent = years.toLocaleString('en-US');
    };
    draw();
    setInterval(draw, 1000);
  }

  /* ---------- Dr. Harden loading bar ---------- */
  const bar = document.getElementById('drBar');
  const pct = document.getElementById('drPct');
  if (bar) {
    // TWU OTD: June 2025 → May 2028
    const start = new Date(2025, 5, 13).getTime();
    const end = new Date(2028, 4, 15).getTime();
    const p = Math.min(Math.max((Date.now() - start) / (end - start), 0.02), 1);
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      bar.style.width = (p * 100).toFixed(1) + '%';
      let c = 0;
      const t = setInterval(() => {
        c += p * 100 / 40;
        if (c >= p * 100) { c = p * 100; clearInterval(t); }
        pct.textContent = c.toFixed(1) + '%';
      }, 40);
    };
    if ('IntersectionObserver' in window && !reduced) {
      const bio = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { show(); bio.disconnect(); }
      }), { threshold: .5 });
      bio.observe(bar.parentElement);
      // Safety valve: if the observer never fires, don't leave her staring
      // at "Dr. Harden: 0% complete" forever. That's the one number that must
      // never lie.
      setTimeout(show, 4000);
    } else show();
  }

  /* ---------- Scratch card ---------- */
  const pad = document.getElementById('scratchPad');
  if (pad) {
    const wrap = pad.parentElement;
    const sctx = pad.getContext('2d');
    let done = false;
    const paint = () => {
      pad.width = wrap.offsetWidth;
      pad.height = wrap.offsetHeight;
      const grad = sctx.createLinearGradient(0, 0, pad.width, pad.height);
      grad.addColorStop(0, '#9B7FC7');
      grad.addColorStop(.5, '#BDA5DE');
      grad.addColorStop(1, '#8CAF6F');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, pad.width, pad.height);
      sctx.fillStyle = 'rgba(255,255,255,.85)';
      sctx.font = '600 15px Inter, sans-serif';
      sctx.textAlign = 'center';
      sctx.fillText('scratch here ✨', pad.width / 2, pad.height / 2 + 5);
      sctx.globalCompositeOperation = 'destination-out';
    };
    paint();
    let scratching = false;
    let lastX = null, lastY = null;
    const scratch = e => {
      if (done) return;
      const r = pad.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      // interpolate from the last point so fast swipes leave a solid stroke
      if (lastX !== null) {
        const steps = Math.ceil(Math.hypot(x - lastX, y - lastY) / 10) || 1;
        for (let i = 1; i <= steps; i++) {
          sctx.beginPath();
          sctx.arc(lastX + (x - lastX) * i / steps, lastY + (y - lastY) * i / steps, 26, 0, Math.PI * 2);
          sctx.fill();
        }
      } else {
        sctx.beginPath();
        sctx.arc(x, y, 26, 0, Math.PI * 2);
        sctx.fill();
      }
      lastX = x; lastY = y;
    };
    const checkDone = () => {
      if (done) return;
      const d = sctx.getImageData(0, 0, pad.width, pad.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 4 * 24) if (d[i] === 0) clear++;
      if (clear / (d.length / (4 * 24)) > .5) {
        done = true;
        pad.style.transition = 'opacity .8s';
        pad.style.opacity = '0';
        setTimeout(() => pad.remove(), 900);
        burst(innerWidth / 2, innerHeight / 2, 26);
        say('he means it, by the way 🤍');
      }
    };
    pad.addEventListener('pointerdown', e => { scratching = true; lastX = lastY = null; scratch(e); });
    pad.addEventListener('pointermove', e => { if (scratching) scratch(e); });
    addEventListener('pointerup', () => { if (scratching) { scratching = false; lastX = lastY = null; checkDone(); } });
    pad.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  }

  /* ---------- Open-when envelopes ---------- */
  document.querySelectorAll('.env').forEach(env => {
    env.addEventListener('click', () => {
      env.classList.toggle('open');
      if (env.classList.contains('open')) {
        const r = env.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top, 10);
      }
    });
  });

  /* ---------- Easter egg: tap her name 5× ---------- */
  const heroName = document.getElementById('heroName');
  if (heroName) {
    let taps = 0, tapTimer = null;
    heroName.addEventListener('click', () => {
      taps++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => taps = 0, 1400);
      if (taps === 5) {
        taps = 0;
        for (let i = 0; i < 5; i++) {
          setTimeout(() => burst(Math.random() * innerWidth, Math.random() * innerHeight * .5, 16), i * 160);
        }
        say('secret found: Thomas loves you more. not up for debate. 💍');
      }
    });
  }

  /* ---------- Easter egg: the ☀️ chip ---------- */
  const sun = document.getElementById('sunChip');
  if (sun) {
    let sunTaps = 0;
    sun.addEventListener('click', e => {
      e.stopPropagation();
      sunTaps++;
      if (sunTaps === 3) {
        sunTaps = 0;
        document.body.style.transition = 'filter 1s';
        document.body.style.filter = 'saturate(1.35) brightness(1.05)';
        setTimeout(() => document.body.style.filter = '', 2600);
        say('☀️ you ARE the light. that’s the whole point.');
      }
    });
  }

  /* ---------- Easter egg: the 🍵 matcha chip ---------- */
  const matcha = document.getElementById('matchaChip');
  if (matcha) {
    let mTaps = 0;
    matcha.addEventListener('click', e => {
      e.stopPropagation();
      mTaps++;
      if (reduced) { say('🍵 iced. even in January. never coffee.'); return; }
      for (let i = 0; i < 18; i++) {
        const d = document.createElement('div');
        d.className = 'paw';
        d.textContent = '🍵';
        d.style.left = Math.random() * 92 + 'vw';
        d.style.top = Math.random() * 60 + 20 + 'vh';
        d.style.animationDelay = (Math.random() * .5) + 's';
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 2200);
      }
      say(mTaps >= 3 ? '🍵 ok that’s enough matcha. (never. — her)' : '🍵 iced. even in January. never coffee.');
    });
  }

  /* ---------- Athena: photo fallback + paw prints ---------- */
  const athImg = document.getElementById('athenaImg');
  const athFall = document.getElementById('athenaFallback');
  if (athImg && athFall) {
    const showFallback = () => { athImg.hidden = true; athFall.hidden = false; };
    athImg.addEventListener('error', showFallback);
    if (athImg.complete && athImg.naturalWidth === 0) showFallback();
  }
  const athCard = document.getElementById('athenaCard');
  if (athCard) {
    const BOOFS = [
      'AWOOO 🐺 (she has no idea what you said)',
      '🐾 Athena has been notified. She does not care.',
      'she heard the treat bag from three rooms away 🦴',
      'ranked #1 in this household. it isn’t close. 🐺',
      'she’s already on the couch. she was never off the couch.'
    ];
    let b = 0;
    athCard.addEventListener('click', e => {
      const r = athCard.getBoundingClientRect();
      if (!reduced) {
        for (let i = 0; i < 8; i++) {
          const p = document.createElement('div');
          p.className = 'paw';
          p.textContent = '🐾';
          p.style.left = (r.left + Math.random() * r.width) + 'px';
          p.style.top = (r.top + Math.random() * r.height) + 'px';
          p.style.animationDelay = (i * .07) + 's';
          document.body.appendChild(p);
          setTimeout(() => p.remove(), 1800);
        }
      }
      say(BOOFS[b++ % BOOFS.length]);
    });
  }

  /* ---------- Two-part joke card: tap for the punchline ---------- */
  const jokeFact = document.getElementById('jokeFact');
  const jokeText = document.getElementById('jokeText');
  if (jokeFact && jokeText) {
    let punched = false;
    jokeFact.addEventListener('click', () => {
      punched = !punched;
      if (punched) {
        jokeText.innerHTML = jokeText.dataset.punch;
        const r = jokeFact.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 12);
      } else {
        jokeText.innerHTML = jokeText.dataset.setup + ' <i>(tap)</i>';
      }
    });
  }

  /* ---------- Shows: poster fallback + tap for a line ---------- */
  document.querySelectorAll('.show-poster img').forEach(img => {
    const fallback = img.nextElementSibling;
    const showFallback = () => { img.hidden = true; fallback.hidden = false; };
    img.addEventListener('error', showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
  document.querySelectorAll('.show-card').forEach(s => {
    s.addEventListener('click', () => {
      say(s.dataset.say, 4200);
      const r = s.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 8);
    });
  });

  /* ---------- Easter egg: the hidden 🍍 (Psych rules) ---------- */
  const pine = document.getElementById('pineapple');
  if (pine) {
    pine.addEventListener('click', () => {
      pine.classList.add('found');
      for (let i = 0; i < 4; i++) {
        setTimeout(() => burst(Math.random() * innerWidth, innerHeight * (.4 + Math.random() * .5), 14), i * 180);
      }
      say('🍍 you found the pineapple. of course you did. — Shawn would be proud', 5200);
    });
  }

  /* ---------- Easter egg: scrolled to the very bottom ---------- */
  const secret = document.getElementById('footerSecret');
  if (secret) {
    addEventListener('scroll', () => {
      if (innerHeight + scrollY >= document.body.offsetHeight - 40) {
        secret.classList.add('show');
      }
    }, { passive: true });
  }

});
