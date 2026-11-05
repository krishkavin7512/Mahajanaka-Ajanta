/* =========================================================
   Mahājanaka — page: lamp hero · the wall · comic reader ·
   director's cut · animatic · credits
   ========================================================= */
(function () {
  "use strict";
  const K = window.KALA, S = window.STORY, A = window.MahaArt;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hasGSAP = typeof window.gsap !== "undefined";
  const SHOT = document.documentElement.classList.contains("shot");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const img = (n) => `assets/img/m/${n}.jpg`;
  const imgSm = (n) => `assets/img/m/${n}-sm.jpg`;

  /* ---------- Hero: a lamp moving over the painted wall ---------- */
  function initHero() {
    const hero = $(".l-hero"), dark = $(".l-hero__dark"), flame = $(".l-hero__flame");
    if (!hero) return;
    const pos = { x: innerWidth * 0.5, y: innerHeight * 0.42 }, target = { ...pos };
    let manual = false, visible = true, t0 = performance.now();
    const place = () => {
      dark.style.setProperty("--lx", pos.x + "px");
      dark.style.setProperty("--ly", pos.y + "px");
      flame.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      target.x = e.clientX - r.left; target.y = e.clientY - r.top; manual = true;
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { manual = false; t0 = performance.now(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
    (function loop(now) {
      requestAnimationFrame(loop);
      if (!visible) return;
      if (!manual) {
        // with no pointer, the lamp drifts slowly across the wall on its own
        const t = (now - t0) / 1000;
        target.x = innerWidth * (0.5 + 0.3 * Math.sin(t * 0.23));
        target.y = hero.offsetHeight * (0.45 + 0.18 * Math.sin(t * 0.37 + 1.2));
      }
      pos.x += (target.x - pos.x) * 0.08; pos.y += (target.y - pos.y) * 0.08;
      place();
    })(performance.now());
    place();

    K.intro(() => {
      const tl = gsap.timeline();
      const split = window.SplitText ? new SplitText(".l-hero h1", { type: "chars" }) : null;
      tl.fromTo(".l-hero__veil", { opacity: 1 }, { opacity: 0, duration: 2.2, ease: "power2.inOut" }, 0)
        .fromTo(dark, { "--lr": 0.35 }, { "--lr": 1, duration: 2.6, ease: "power3.out" }, 0)
        .fromTo(".l-hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, ease: "kala" }, 0.6)
        .fromTo(split ? split.chars : ".l-hero h1", { yPercent: 70, opacity: 0, filter: "blur(10px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "kala", stagger: 0.045, clearProps: "filter" }, 0.7)
        .fromTo([".l-hero__native", ".l-hero__sub", ".l-hero__hint"], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, ease: "kala", stagger: 0.14 }, 1.3);
      return tl;
    });
  }

  /* ---------- The wall: continuous narration, panned by scroll ---------- */
  function initWall() {
    const wall = $(".wall"), track = $(".wall__track");
    if (!wall || !hasGSAP || SHOT || K.reduced || !window.ScrollTrigger) return;
    const W = () => wall.clientWidth, H = () => wall.clientHeight, Z = 2.3;
    // walk along the wall close up, left to right, then step back to see all of it
    const mm = gsap.matchMedia();
    mm.add({ big: "(min-width: 900px) and (min-height: 620px)", small: "(max-width: 899px), (max-height: 619px)" }, (ctx) => {
      const big = ctx.conditions.big;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: big
          ? { trigger: wall, start: "center center", end: "+=1700", pin: true, scrub: 0.7, invalidateOnRefresh: true }
          : { trigger: wall, start: "top 85%", end: "bottom 10%", scrub: 0.7, invalidateOnRefresh: true },
      });
      tl.fromTo(track, { scale: Z, x: 0, y: () => -H() * 0.45 }, { x: () => -W() * (Z - 1), y: () => -H() * 0.75, duration: 2 })
        .to(track, { scale: 1, x: 0, y: 0, duration: 1, ease: "power1.inOut" })
        .to({}, { duration: 0.25 });
      return () => gsap.set(track, { clearProps: "transform" });
    });
  }

  /* ---------- Cast ---------- */
  function renderCast() {
    const el = $(".cast");
    if (!el) return;
    el.innerHTML = S.cast.map((c) => `
      <article class="cast__card" data-initial="${esc(c.name[0])}" data-reveal>
        <small>${esc(c.tag)}</small><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p>
      </article>`).join("");
  }

  /* ---------- Comic pages ---------- */
  const shotLine = (p) => [...(p.captions || []).map((c) => c.text), ...(p.bubbles || []).map((b) => `${b.who}: “${b.text}”`)];
  function panelHTML(p, i) {
    const [c, r] = p.span;
    const tall = c * 1.0 < r * 0.9 ? " panel--tall" : "";
    const busy = (p.captions || []).length + (p.bubbles || []).length >= 3 ? " panel--busy" : "";
    const art = p.kind === "art"
      ? A.render(p.art, p.align)
      : `<img src="${imgSm(p.img)}" srcset="${imgSm(p.img)} 1200w, ${img(p.img)} 2600w" sizes="(max-width: 760px) 100vw, ${Math.round((c / 6) * 100)}vw" alt="${esc(p.label)}" loading="lazy" decoding="async" style="object-position:${p.fx ?? 50}% ${p.fy ?? 50}%">`;
    const caps = (p.captions || []).map((x) => `<div class="cap cap--${x.pos}">${esc(x.text)}</div>`).join("");
    const bubbles = (p.bubbles || []).map((b) => `<div class="bubble${b.think ? " bubble--think" : ""}" data-tail="${b.tail}" style="left:${b.x}%;top:${b.y}%${b.my != null ? `;--my:${b.my}%` : ""}"><b>${esc(b.who)}</b>${esc(b.text)}</div>`).join("");
    const sfx = (p.sfx || []).map((s) => `<div class="sfx" style="left:${s.x}%;top:${s.y}%;--rot:${s.rot}deg" aria-hidden="true">${esc(s.text)}</div>`).join("");
    const sh = p.shot, lines = shotLine(p);
    return `
      <figure class="panel panel--${p.kind}${tall}${busy}" style="grid-column:span ${c};grid-row:span ${r}" data-i="${i}" ${p.kind === "mural" ? 'tabindex="0" role="button" aria-label="Open the full mural detail: ' + esc(p.label) + '"' : ""}>
        <div class="panel__art">${art}</div>
        ${p.kind === "mural" ? `<figcaption class="panel__label">${esc(p.label)}</figcaption>` : ""}
        ${caps}${bubbles}${sfx}
        <div class="panel__shot">
          <div class="shot-top"><span class="shot-no">${String(sh.n).padStart(2, "0")}</span><span class="shot-dur">${esc(sh.dur)}</span></div>
          <dl>
            <dt>Shot</dt><dd>${esc(sh.size)}</dd>
            <dt>Camera</dt><dd>${esc(sh.cam)}</dd>
            <dt>Sound</dt><dd>${esc(sh.sound)}</dd>
            ${lines.length ? `<dt>Text</dt><dd class="shot-line">${lines.map(esc).join("<br>")}</dd>` : ""}
            <dt>Note</dt><dd>${esc(sh.note)}</dd>
            <dt>Source</dt><dd>${p.kind === "mural" ? esc(p.label) : "Reimagined from the Jātaka text"}</dd>
          </dl>
        </div>
      </figure>`;
  }
  function renderReader() {
    const el = $(".reader");
    if (!el) return;
    el.innerHTML = S.chapters.map((ch) => {
      const panels = S.panels.map((p, i) => [p, i]).filter(([p]) => p.ch === ch.id);
      return `
        <section class="chapter" id="ch-${ch.id}" aria-labelledby="ch-${ch.id}-t">
          <header class="chapter__head">
            <span class="chapter__num">${ch.num}</span>
            <h3 class="chapter__title" id="ch-${ch.id}-t">${esc(ch.title)}</h3>
            <span class="chapter__native">${ch.native}</span>
            <span class="chapter__place">${esc(ch.place)}</span>
          </header>
          <div class="pagewrap"><div class="page">${panels.map(([p, i]) => panelHTML(p, i)).join("")}</div></div>
        </section>`;
    }).join("");
    const total = S.panels.reduce((s, p) => s + parseFloat(p.shot.dur), 0);
    $$("[data-runtime]").forEach((n) => (n.textContent = `${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, "0")}`));
  }

  function animatePanels() {
    const panels = $$(".panel");
    if (!hasGSAP || SHOT || K.reduced) return;
    panels.forEach((p) => {
      gsap.set(p, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set($$(".cap, .bubble", p), { opacity: 0, scale: 0.85, y: 10 });
      gsap.set($$(".sfx", p), { opacity: 0, scale: 2.4, rotate: 0 });
    });
    // reveal panel by panel, in reading order, as each page comes into view
    K.onView($$(".page"), (page) => {
      if (document.body.classList.contains("mode-director")) { gsap.set($$(".panel", page), { clipPath: "none" }); return; }
      $$(".panel", page).forEach((p, k) => {
        const tl = gsap.timeline({ delay: k * 0.22 });
        tl.to(p, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "kalaIO", clearProps: "clipPath" })
          .fromTo($(".panel__art > *", p), { scale: 1.16 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
          .to($$(".cap", p), { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.35 }, 0.55)
          .to($$(".bubble", p), { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.45 }, 0.8)
          .to($$(".sfx", p), { opacity: 1, scale: 1, rotate: (i, t) => parseFloat(getComputedStyle(t).getPropertyValue("--rot")) || 0, duration: 0.45, ease: "back.out(3)" }, 0.35)
          .to($$(".sfx", p), { x: "random(-6,6)", y: "random(-4,4)", duration: 0.05, repeat: 7, yoyo: true, ease: "none" }, 0.8);
      });
    }, 0.12);
    $$(".sfx").forEach((s) => gsap.set(s, { rotate: parseFloat(s.style.getPropertyValue("--rot")) || 0 }));
    // gentle parallax inside each frame
    if (window.ScrollTrigger && K.finePointer) {
      panels.forEach((p) => {
        const art = $(".panel__art", p);
        gsap.fromTo(art, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
        art.style.inset = "-4% 0";
      });
    }
  }

  /* ---------- Keep every caption, bubble and sound effect inside its frame ----------
     Positions in story.js are percentages chosen for the desktop page. On narrow screens
     long lines wrap, so a box can spill out of its panel or land on another one. On phones
     a crowded panel grows taller until its text fits; at every width bubbles and sound
     effects are then nudged back inside the frame, and a panel that is still crowded gets
     slightly smaller lettering. Layout properties only (top, left, aspect-ratio), so the
     GSAP transforms used for the reveal animations are left alone. */
  const PHONE = window.matchMedia("(max-width: 760px)");
  const TALLER = [1, 0.8, 0.75, 2 / 3, 0.6, 0.5];
  const EDGE = 8;
  const boxOf = (n) => {
    const t = n.dataset.tail || "", tail = !n.classList.contains("bubble") ? 0 : n.classList.contains("bubble--think") ? 24 : 14;
    return { x: n.offsetLeft, y: n.offsetTop, w: n.offsetWidth, h: n.offsetHeight, up: t[0] === "t" ? tail : 0, down: t[0] === "b" ? tail : 0 };
  };
  const clash = (a, b) => a.x < b.x + b.w - 2 && b.x < a.x + a.w - 2 && a.y - a.up < b.y + b.h + b.down - 2 && b.y - b.up < a.y + a.h + a.down - 2;
  function crowded(p) {
    const W = p.clientWidth, H = p.clientHeight;
    const bs = $$(".cap, .bubble", p).filter((n) => n.offsetParent).map(boxOf);
    if (bs.some((b) => b.y - b.up < 0 || b.y + b.h + b.down > H || b.x < 0 || b.x + b.w > W)) return true;
    for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) if (clash(bs[i], bs[j])) return true;
    return false;
  }
  function restorePositions(p) {
    $$(".bubble, .sfx", p).forEach((n) => {
      const d = n.dataset;
      if (!("top0" in d)) { d.top0 = n.style.top; d.left0 = n.style.left; d.my0 = n.style.getPropertyValue("--my"); }
      n.style.top = d.top0;
      n.style.left = d.left0;
      if (d.my0) n.style.setProperty("--my", d.my0);
    });
  }
  function nudgeInside(p) {
    const W = p.clientWidth, H = p.clientHeight;
    $$(".bubble, .sfx", p).filter((n) => n.offsetParent).forEach((n) => {
      const b = boxOf(n), m = n.classList.contains("sfx") ? 4 : EDGE;
      const y = Math.max(m + b.up, Math.min(b.y, H - b.h - b.down - m));
      const x = Math.max(m, Math.min(b.x, W - b.w - m));
      if (Math.abs(y - b.y) > 0.5) {
        n.style.top = `${y}px`;
        if (n.dataset.my0) n.style.setProperty("--my", `${y}px`);
      }
      if (Math.abs(x - b.x) > 0.5) n.style.left = `${x}px`;
    });
  }
  function fitPanel(p) {
    p.style.aspectRatio = "";
    p.classList.remove("panel--tight");
    restorePositions(p);
    if (document.body.classList.contains("mode-director")) return;
    if (PHONE.matches && crowded(p)) {
      const now = p.clientWidth / p.clientHeight;
      for (const r of TALLER) {
        if (r >= now - 0.01) continue;
        p.style.aspectRatio = String(r);
        if (!crowded(p)) break;
      }
    }
    nudgeInside(p);
    if (crowded(p)) {
      p.classList.add("panel--tight");
      restorePositions(p);
      nudgeInside(p);
    }
  }
  let fitTimer = 0;
  function fitPanels() {
    $$(".panel").forEach(fitPanel);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  const fitSoon = () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitPanels, 150); };

  /* ---------- Reading / Director's cut switch ---------- */
  function initModes() {
    const btns = $$(".modes button[data-mode]");
    const set = (mode) => {
      const director = mode === "director";
      if (director === document.body.classList.contains("mode-director")) return;
      const panels = $$(".panel");
      const anchor = panels.find((p) => p.getBoundingClientRect().bottom > innerHeight * 0.3) || panels[0];
      const before = anchor.getBoundingClientRect().top;
      const state = hasGSAP && window.Flip && !K.reduced ? Flip.getState(panels.concat($$(".panel__art"))) : null;
      document.body.classList.toggle("mode-director", director);
      $$(".panel").forEach(fitPanel);
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
      panels.forEach((p) => { p.style.clipPath = ""; });
      $$(".cap, .bubble, .sfx").forEach((n) => { n.style.opacity = ""; });
      if (!director) gsap.set($$(".cap, .bubble"), { opacity: 1, scale: 1, y: 0 });
      // keep the panel you were reading in the same place on screen
      const delta = anchor.getBoundingClientRect().top - before;
      if (K.lenis) K.lenis.scrollTo(window.scrollY + delta, { immediate: true, force: true });
      else window.scrollTo(0, window.scrollY + delta);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
      if (state) Flip.from(state, { duration: 0.9, ease: "kalaIO", stagger: 0.012, nested: true, prune: true });
      if (director && hasGSAP) gsap.fromTo($$(".panel__shot"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, stagger: 0.02, ease: "kala" });
    };
    btns.forEach((b) => b.addEventListener("click", () => set(b.dataset.mode)));
    K.setMode = set;
    // the switch floats at the bottom of the screen only while the comic is on screen
    const bar = $(".modebar"), reader = $(".reader");
    if (bar && reader && "IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => bar.classList.toggle("is-on", en.isIntersecting), { rootMargin: "-30% 0px -30% 0px" }).observe(reader);
    }
  }

  /* ---------- Animatic: the storyboard played as a film ---------- */
  function initAnimatic() {
    const el = $(".anim");
    if (!el) return;
    const stage = $(".anim__stage", el), subs = $(".anim__subs", el), bar = $(".anim__bar i", el);
    const hudN = $(".anim__n", el), hudMeta = $(".anim__meta", el), hudCh = $(".anim__ch", el), playBtn = $("[data-a=play]", el);
    const shots = S.panels.map((p) => {
      const lines = [...(p.captions || []).map((c) => ({ t: c.text })), ...(p.bubbles || []).map((b) => ({ who: b.who, t: b.text }))];
      const words = lines.reduce((s, l) => s + l.t.split(/\s+/).length, 0);
      return { p, lines, dur: Math.max(parseFloat(p.shot.dur), words / 2.7 + 1.4) };
    });
    const total = shots.reduce((s, x) => s + x.dur, 0);
    const startAt = shots.map((_, i) => shots.slice(0, i).reduce((s, x) => s + x.dur, 0));
    let i = 0, tl = null, open = false, paused = false, soundWasOn = false, lastFocus = null;

    const camera = (cam) => {
      const c = cam.toLowerCase();
      if (c.includes("dutch")) return { from: { scale: 1.12, rotate: -5, x: "-2%" }, to: { scale: 1.18, rotate: -3, x: "2%" } };
      if (c.includes("push")) return { from: { scale: 1.02 }, to: { scale: 1.2 } };
      if (c.includes("crane up") || c.includes("crane")) return { from: { scale: 1.14, yPercent: 5 }, to: { scale: 1.1, yPercent: -5 } };
      if (c.includes("tilt")) return { from: { scale: 1.12, yPercent: -5 }, to: { scale: 1.12, yPercent: 5 } };
      if (c.includes("track") || c.includes("pan") || c.includes("drift")) return { from: { scale: 1.12, xPercent: -5 }, to: { scale: 1.12, xPercent: 5 } };
      if (c.includes("time-lapse")) return { from: { scale: 1.0 }, to: { scale: 1.08 } };
      return { from: { scale: 1.04 }, to: { scale: 1.08 } };
    };
    const frame = (p) => {
      const f = document.createElement("div");
      f.className = "anim__frame";
      f.innerHTML = `<div class="anim__cam">${p.kind === "art" ? A.render(p.art) : `<img src="${img(p.img)}" alt="${esc(p.label)}">`}</div>`;
      return f;
    };
    const progress = () => { if (tl) gsap.set(bar, { scaleX: (startAt[i] + tl.time()) / total }); };

    function show(n) {
      if (tl) tl.kill();
      i = Math.max(0, Math.min(shots.length - 1, n));
      const { p, lines, dur } = shots[i];
      const ch = S.chapters.find((c) => c.id === p.ch);
      hudN.textContent = `Shot ${String(i + 1).padStart(2, "0")} / ${shots.length}`;
      hudCh.textContent = `${ch.num} · ${ch.title}`;
      hudMeta.textContent = `${p.shot.size} · ${p.shot.cam}`;
      const old = $$(".anim__frame", stage), f = frame(p);
      stage.appendChild(f);
      const cam = $(".anim__cam", f), mv = camera(p.shot.cam);
      tl = gsap.timeline({ paused, onUpdate: progress, onComplete: () => (i < shots.length - 1 ? show(i + 1) : finish()) });
      tl.fromTo(f, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power1.inOut", onComplete: () => old.forEach((o) => o.remove()) }, 0)
        .fromTo(cam, mv.from, { ...mv.to, duration: dur, ease: "sine.inOut" }, 0);
      if (p.shot.cam.toLowerCase().includes("shake")) tl.to(cam, { x: "+=6", y: "-=4", duration: 0.06, repeat: Math.round(dur / 0.12), yoyo: true, ease: "none" }, 0.2);
      subs.innerHTML = "";
      const slot = (dur - 0.6) / Math.max(1, lines.length);
      lines.forEach((l, k) => {
        const d = document.createElement("p");
        d.className = l.who ? "is-speech" : "is-cap";
        d.innerHTML = l.who ? `<b>${esc(l.who)}</b>${esc(l.t)}` : esc(l.t);
        subs.appendChild(d);
        tl.fromTo(d, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "kala" }, 0.4 + k * slot);
        if (k < lines.length - 1) tl.to(d, { opacity: 0, y: -10, duration: 0.35 }, 0.4 + (k + 1) * slot - 0.3);
      });
      tl.to(subs.children, { opacity: 0, duration: 0.4 }, dur - 0.4);
      tl.duration(); // build
    }
    function finish() {
      subs.innerHTML = `<p class="is-cap fin-cap">इति — thus ends the Mahājanaka Jātaka.</p>`;
      gsap.fromTo(subs.firstChild, { opacity: 0 }, { opacity: 1, duration: 1 });
      paused = true; playBtn.setAttribute("aria-label", "Replay"); playBtn.dataset.state = "ended";
    }
    function openA(start = 0) {
      if (!hasGSAP) return;
      open = true; paused = false; lastFocus = document.activeElement;
      el.classList.add("is-open"); el.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("anim-open");
      if (K.lenis) K.lenis.stop();
      if (window.Tanpura) { soundWasOn = window.Tanpura.playing; if (!soundWasOn) window.Tanpura.start(); }
      playBtn.dataset.state = "playing"; playBtn.setAttribute("aria-label", "Pause");
      show(start);
      playBtn.focus({ preventScroll: true });
    }
    function closeA() {
      open = false; if (tl) tl.kill(); tl = null;
      el.classList.remove("is-open"); el.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("anim-open");
      if (K.lenis) K.lenis.start();
      if (window.Tanpura && !soundWasOn && window.Tanpura.playing) window.Tanpura.stop();
      setTimeout(() => { stage.innerHTML = ""; subs.innerHTML = ""; }, 500);
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    function toggle() {
      if (playBtn.dataset.state === "ended") { paused = false; playBtn.dataset.state = "playing"; show(0); return; }
      paused = !paused;
      if (tl) paused ? tl.pause() : tl.play();
      playBtn.dataset.state = paused ? "paused" : "playing";
      playBtn.setAttribute("aria-label", paused ? "Play" : "Pause");
    }
    $$("[data-animatic]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openA(+(b.dataset.animatic || 0)); }));
    el.addEventListener("click", (e) => {
      const a = e.target.closest("[data-a]");
      if (!a) return;
      ({ play: toggle, prev: () => show(i - 1), next: () => show(i + 1), close: closeA })[a.dataset.a]();
    });
    addEventListener("keydown", (e) => {
      if (!open) return;
      if (e.key === "Escape") closeA();
      else if (e.key === "ArrowRight") show(i + 1);
      else if (e.key === "ArrowLeft") show(i - 1);
      else if (e.key === " ") { e.preventDefault(); toggle(); }
    });
    $$("[data-runtime-anim]").forEach((n) => (n.textContent = `${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, "0")}`));
  }

  /* ---------- Lightbox for the real mural details ---------- */
  function initLightbox(murals) {
    const lb = $(".lightbox");
    if (!lb) return;
    const openLB = (p) => {
      const m = murals[p.img] || {};
      $("img", lb).src = img(p.img);
      $("img", lb).alt = p.label;
      $("p", lb).innerHTML = `${esc(p.label)} · <a href="${esc(m.page || "#")}" target="_blank" rel="noopener" style="border-bottom:1px solid var(--line-2)">Source photograph</a> (${esc(m.lic || "")})`;
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
      if (K.lenis) K.lenis.stop();
    };
    const close = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); if (K.lenis) K.lenis.start(); };
    $$(".panel--mural").forEach((el) => {
      const p = S.panels[+el.dataset.i];
      el.addEventListener("click", () => { if (!document.body.classList.contains("mode-director")) openLB(p); });
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(p); } });
    });
    lb.addEventListener("click", (e) => { if (!e.target.closest("a")) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.classList.contains("is-open")) close(); });
  }

  /* ---------- Credits ---------- */
  const strip = (h) => { const d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent.trim(); };
  function renderCredits(murals) {
    const el = $(".credits");
    if (!el) return;
    const used = new Map();
    S.panels.filter((p) => p.kind === "mural").forEach((p) => used.set(p.img, p.label));
    used.set("bath-wide", "Title page: the king's bath pavilion, Ajanta Cave 1");
    used.set("wall", "“A story told on a wall”: the Mahājanaka mural, Ajanta Cave 1");
    el.innerHTML = [...used].map(([k, label]) => {
      const m = murals[k];
      if (!m) return "";
      return `<li><b>${esc(label)}</b> — detail of “${esc(m.src.replace(/^File:/, "").replace(/\.\w+$/, ""))}” by ${esc(strip(m.artist))}, <a href="${esc(m.licurl)}" target="_blank" rel="noopener">${esc(m.lic)}</a>, via <a href="${esc(m.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>. Cropped ${m.crop[0]}×${m.crop[1]} px from the original.</li>`;
    }).join("") + `
      <li><b>Illustrated panels</b> (shots 1–8, 11, 17, 18) — original vector artwork drawn by the team in code (SVG) for episodes of the Jātaka that do not survive on the wall, in the Ajanta palette of lamp black, red and yellow ochre, lapis and malachite.</li>
      <li><b>Text</b> — retold from the Mahājanaka Jātaka (no. 539), after E. B. Cowell (ed.), <i>The Jātaka, or Stories of the Buddha's Former Births</i>, vol. VI (Cambridge, 1907); dialogue lightly adapted for speech bubbles.</li>
      <li><b>Type</b> — Cormorant Garamond, Manrope, Kalam and Noto Serif Devanagari (SIL Open Font Licence). <b>Motion</b> — GSAP and Lenis.</li>`;
  }

  /* ---------- Boot ---------- */
  renderCast();
  renderReader();
  fitPanels();
  if (document.fonts) document.fonts.ready.then(fitPanels);
  addEventListener("resize", fitSoon);
  initHero();
  initModes();
  initAnimatic();
  K.ready.then(() => {
    initWall();
    animatePanels();
    fetch("assets/data/murals.json").then((r) => r.json()).then((m) => { renderCredits(m); initLightbox(m); }).catch(() => {});
    if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 400);
  });
})();
