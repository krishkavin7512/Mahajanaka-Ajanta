/* =========================================================
   Mahājanaka — illustrated panels
   Original shadow-theatre style artwork for the episodes of the
   Jātaka that do not survive on the wall of Cave 1.
   Every scene is an SVG string, 1600 × 1000 unless noted.
   ========================================================= */
(function () {
  "use strict";
  const P = {
    ink: "#120c08", ink2: "#24180f", ochre: "#c9952f", ochre2: "#e7bd62", red: "#8f3b1f", red2: "#b5532c",
    lapis: "#2b4a80", lapis2: "#1a2f57", green: "#5f7f5a", lime: "#efe3c8", gold: "#e9c46a", sky: "#f2c879",
  };
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const f = (n) => Math.round(n * 10) / 10;

  /* ---------- shared defs per scene (ids are prefixed so scenes can share a page) ---------- */
  function defs(id, extra = "") {
    return `<defs>
      <filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <radialGradient id="${id}-vig" cx="50%" cy="50%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.55"/></radialGradient>
      ${extra}
    </defs>`;
  }
  const vignette = (id, w = 1600, h = 1000) => `<rect width="${w}" height="${h}" fill="url(#${id}-vig)"/>`;
  const sky = (id, stops, w = 1600, h = 1000) =>
    `<linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;

  /* ---------- figures (silhouettes, ~100 units tall, origin at feet centre) ---------- */
  function man(x, y, s, opt = {}) {
    const flip = opt.flip ? -1 : 1, c = opt.fill || P.ink;
    const stride = opt.walk ? 1 : 0;
    const legs = stride
      ? "M-6,-38 L-3,-38 L4,-20 L12,-1 L7,0 L-1,-18 L-4,-24 L-9,-10 L-15,-1 L-19,-2 L-12,-14 Z"
      : "M-7,-38 L7,-38 L6,-20 L7,0 L2,0 L0,-20 L-2,0 L-7,0 L-6,-20 Z";
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s * flip)},${f(s)})" fill="${c}">
      <circle cx="1" cy="-90" r="7.5"/><ellipse cx="-2" cy="-99" rx="4.5" ry="3.5"/>
      <path d="M-4,-83 L6,-83 L13,-78 L16,-58 L18,-44 L14,-43 L11,-56 L10,-62 L10,-44 L13,-36 L-12,-36 L-9,-44 L-9,-62 L-10,-56 L-13,-43 L-17,-44 L-15,-58 L-12,-78 Z"/>
      <path d="${legs}"/>
      ${opt.staff ? `<rect x="18" y="-104" width="2.6" height="104" rx="1.3"/>` : ""}
    </g>`;
  }
  function woman(x, y, s, opt = {}) {
    const flip = opt.flip ? -1 : 1, c = opt.fill || P.ink;
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s * flip)},${f(s)})" fill="${c}">
      <circle cx="0" cy="-88" r="7"/><ellipse cx="-6" cy="-88" rx="5" ry="6"/>
      <path d="M-5,-82 L5,-82 L11,-76 L13,-58 L16,-44 L12,-43 L9,-56 L8,-62 C10,-48 14,-26 17,0 L-15,0 C-12,-26 -9,-48 -8,-62 L-9,-56 L-12,-43 L-16,-44 L-13,-58 L-11,-76 Z"/>
      ${opt.veil ? `<path d="M-12,-92 C-2,-104 10,-98 13,-86 C18,-60 22,-30 24,-6 L19,-6 C14,-40 8,-70 -4,-84 Z" opacity="0.85"/>` : ""}
    </g>`;
  }
  function sleeper(x, y, s, c = P.ink) {
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})" fill="${c}">
      <circle cx="-48" cy="-10" r="7"/>
      <path d="M-40,-14 C-20,-20 10,-18 30,-12 L52,-8 L54,-2 L28,-3 C10,-1 -20,-1 -40,-3 Z"/>
      <path d="M-36,-15 C-30,-24 -20,-22 -14,-16 Z"/>
    </g>`;
  }
  function swimmer(x, y, s, c = P.ink) {
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})" fill="${c}">
      <ellipse cx="0" cy="0" rx="16" ry="4"/><circle cx="20" cy="-2" r="4.5"/>
      <path d="M12,-3 L30,-14 L32,-12 L16,0 Z"/><path d="M-14,0 L-30,6 L-30,3 Z"/>
    </g>`;
  }
  // the sea-goddess: floating, scarf streaming, halo behind
  function goddess(x, y, s, opt = {}) {
    const c = opt.fill || P.ink;
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})">
      <circle cx="0" cy="-92" r="24" fill="none" stroke="${P.gold}" stroke-width="2.2"/>
      <circle cx="0" cy="-92" r="30" fill="none" stroke="${P.gold}" stroke-width="0.8" stroke-dasharray="2 4"/>
      <g fill="${c}">
        <circle cx="0" cy="-92" r="8"/><path d="M-6,-104 L-2,-114 L0,-106 L2,-114 L6,-104 Z"/>
        <path d="M-6,-84 L6,-84 L12,-77 L15,-60 L26,-74 L30,-71 L18,-52 L12,-58 L10,-50 C14,-30 20,-14 34,6 C16,2 4,-4 -2,-10 C-10,-2 -24,8 -40,10 C-26,-6 -16,-26 -10,-50 L-12,-58 L-24,-64 L-22,-68 L-13,-64 L-12,-77 Z"/>
        <path d="M14,-76 C40,-90 70,-70 96,-84 C78,-62 46,-66 16,-64 Z" opacity="0.9"/>
        <path d="M-12,-70 C-40,-60 -62,-34 -92,-36 C-70,-50 -48,-70 -14,-80 Z" opacity="0.9"/>
      </g>
    </g>`;
  }
  /* ---------- props ---------- */
  function ship(x, y, s, opt = {}) {
    const c = opt.fill || P.ink, broken = opt.broken;
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)}) rotate(${opt.rot || 0})" fill="${c}">
      <path d="M-120,0 C-100,30 100,30 130,-6 L110,-8 C80,8 -80,10 -104,-6 Z"/>
      <path d="M-120,0 L-140,-24 L-126,-24 L-104,-6 Z"/><path d="M130,-6 L150,-34 L138,-34 L110,-8 Z"/>
      ${broken ? `<rect x="-6" y="-150" width="6" height="140" transform="rotate(28 -3 -10)"/>
        <path d="M-2,-140 C40,-120 60,-80 52,-40 L4,-50 Z" transform="rotate(28 -3 -10)" opacity="0.92"/>`
      : `<rect x="-4" y="-190" width="6" height="190"/>
        <path d="M4,-180 C70,-160 92,-90 80,-30 L4,-40 Z" fill="${opt.sail || c}"/>
        <path d="M-4,-170 C-50,-150 -66,-100 -60,-50 L-4,-56 Z" fill="${opt.sail || c}" opacity="0.92"/>
        <path d="M2,-190 L18,-196 L2,-202 Z"/>`}
    </g>`;
  }
  function wave(y, amp, len, w, c, seed, opt = {}) {
    const R = rng(seed);
    let d = `M0,${y}`;
    for (let x = 0; x <= w + len; x += len) {
      const a = amp * (0.7 + R() * 0.6);
      d += ` Q${f(x + len * 0.25)},${f(y - a)} ${f(x + len * 0.5)},${f(y - a * 0.2)} T${f(x + len)},${f(y)}`;
    }
    d += ` L${w + len},${opt.h || 1000} L0,${opt.h || 1000} Z`;
    return `<path d="${d}" fill="${c}"/>`;
  }
  // a Hokusai-like curling crest built from arcs
  function crest(x, y, s, c, foam) {
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})">
      <path d="M-200,120 C-150,40 -60,-60 40,-70 C110,-76 150,-30 130,10 C120,-20 80,-30 60,-10 C40,8 60,40 90,40 C40,60 -40,90 -60,160 Z" fill="${c}"/>
      <path d="M40,-70 C110,-76 150,-30 130,10 C120,-20 80,-30 60,-10" fill="none" stroke="${foam}" stroke-width="6" stroke-linecap="round"/>
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${70 + i * 14}" cy="${-62 + i * 10}" r="${5 - i * 0.6}" fill="${foam}"/>`).join("")}
    </g>`;
  }
  function mangoTree(x, y, s, opt = {}) {
    const R = rng(opt.seed || 7), c = opt.fill || P.ink;
    if (opt.stripped) {
      return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})" fill="${c}" stroke="${c}" stroke-linecap="round">
        <path d="M-14,0 C-10,-60 -18,-110 -6,-160 L8,-160 C14,-110 10,-60 16,0 Z" stroke="none"/>
        <path d="M-4,-150 L-70,-220 M-2,-130 L60,-200 M2,-170 L-20,-260 M4,-160 L50,-250 M-40,-185 L-90,-200 M40,-180 L70,-170 M58,-200 L90,-232" stroke-width="7" fill="none"/>
        <path d="M60,-200 L86,-186" stroke-width="5" fill="none"/>
        <path d="M-70,-220 L-80,-210 M-20,-260 L-30,-252" stroke-width="4" fill="none"/>
        ${[...Array(9)].map((_, i) => `<ellipse cx="${f(-120 + R() * 240)}" cy="${f(-4 - R() * 6)}" rx="9" ry="6" transform="rotate(${f(R() * 60)} ${f(-120 + R() * 240)} -6)" fill="${P.ochre}" stroke="none" opacity="0.9"/>`).join("")}
        ${[...Array(6)].map((_, i) => `<path d="M${f(-130 + R() * 260)},-2 l${f(10 + R() * 14)},${f(-4 - R() * 6)}" stroke-width="3" fill="none"/>`).join("")}
      </g>`;
    }
    const blobs = [...Array(22)].map(() => {
      const a = R() * Math.PI, r = 60 + R() * 70;
      return `<circle cx="${f(Math.cos(a) * r * 1.3)}" cy="${f(-190 - Math.sin(a) * r * 0.9)}" r="${f(38 + R() * 30)}"/>`;
    }).join("");
    const fruit = opt.fruit ? [...Array(16)].map(() => {
      const a = R() * Math.PI, r = 40 + R() * 90;
      return `<ellipse cx="${f(Math.cos(a) * r * 1.2)}" cy="${f(-150 - Math.sin(a) * r * 0.7)}" rx="8" ry="11" fill="${P.ochre2}"/>`;
    }).join("") : "";
    return `<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})">
      <g fill="${c}"><path d="M-16,0 C-12,-60 -20,-120 -8,-215 L10,-215 C16,-120 12,-60 18,0 Z"/>${blobs}</g>${fruit}
    </g>`;
  }
  function palaceSkyline(y, c, seed) {
    const R = rng(seed);
    let s = `<g fill="${c}">`;
    let x = -20;
    while (x < 1640) {
      const w = 60 + R() * 120, h = 80 + R() * 200, k = R();
      s += `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h + 400)}"/>`;
      if (k < 0.33) s += `<path d="M${f(x - 6)},${f(y - h)} Q${f(x + w / 2)},${f(y - h - w * 0.9)} ${f(x + w + 6)},${f(y - h)} Z"/><rect x="${f(x + w / 2 - 2)}" y="${f(y - h - w * 0.9 - 30)}" width="4" height="30"/>`;
      else if (k < 0.66) s += `<path d="M${f(x)},${f(y - h)} L${f(x + w / 2)},${f(y - h - w * 1.3)} L${f(x + w)},${f(y - h)} Z"/><circle cx="${f(x + w / 2)}" cy="${f(y - h - w * 1.3)}" r="6"/>`;
      else s += `<rect x="${f(x - 8)}" y="${f(y - h - 14)}" width="${f(w + 16)}" height="14"/>${[0.2, 0.5, 0.8].map((p) => `<rect x="${f(x + w * p - 5)}" y="${f(y - h + 20)}" width="10" height="26" fill="${P.ochre}" opacity="${R() < 0.5 ? 0.9 : 0}"/>`).join("")}`;
      x += w + 4 + R() * 30;
    }
    return s + "</g>";
  }
  function stars(n, seed, h = 600, w = 1600) {
    const R = rng(seed);
    return [...Array(n)].map(() => `<circle cx="${f(R() * w)}" cy="${f(R() * h)}" r="${f(0.6 + R() * 1.8)}" fill="${P.lime}" opacity="${f(0.3 + R() * 0.7)}"/>`).join("");
  }
  function rain(seed, c = P.lime) {
    const R = rng(seed);
    return `<g stroke="${c}" stroke-width="1.6" opacity="0.35">${[...Array(140)].map(() => { const x = R() * 1800 - 100, y = R() * 1000; return `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x - 40)}" y2="${f(y + 110)}"/>`; }).join("")}</g>`;
  }
  function mountains(y, c, seed, peak = 360) {
    const R = rng(seed);
    let d = `M-20,1000 L-20,${y}`;
    for (let x = -20; x <= 1640; x += 80 + R() * 120) d += ` L${f(x + 40)},${f(y - R() * peak)} L${f(x + 80 + R() * 60)},${f(y - R() * peak * 0.35)}`;
    return `<path d="${d} L1640,${y} L1640,1000 Z" fill="${c}"/>`;
  }
  function pines(y, c, seed, n = 26, h = 140) {
    const R = rng(seed);
    return `<g fill="${c}">${[...Array(n)].map(() => { const x = R() * 1640 - 20, hh = h * (0.6 + R() * 0.8); return `<path d="M${f(x)},${f(y - hh)} L${f(x + hh * 0.22)},${f(y)} L${f(x - hh * 0.22)},${f(y)} Z"/>`; }).join("")}</g>`;
  }

  /* ---------- scenes ---------- */
  const scenes = {
    // I.1 — Mithila: a king falls
    mithila(id) {
      const ex = sky(id, [[0, "#1a0b07"], [0.45, "#6e2414"], [0.75, "#c45a2a"], [1, "#e9a04a"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <circle cx="1180" cy="330" r="150" fill="#f3c26b" opacity="0.85"/>
        ${palaceSkyline(760, "#3a1a10", 11)}
        ${palaceSkyline(860, P.ink, 4)}
        <g fill="${P.ink}" transform="translate(0,0)">
          <path d="M520,860 L560,520 L568,520 L540,860 Z"/><path d="M566,522 L700,560 L566,600 Z"/>
          <path d="M1080,860 L1040,540 L1048,540 L1088,860 Z"/><path d="M1046,542 L910,580 L1046,616 Z"/>
        </g>
        <g transform="translate(800,700) rotate(-18) scale(2.1)">
          <path d="M-70,30 L-80,-30 L-45,0 L-22,-46 L0,-6 L22,-46 L45,0 L80,-30 L70,30 Z" fill="${P.gold}" stroke="${P.ink}" stroke-width="5"/>
          <circle cx="0" cy="-10" r="9" fill="${P.red}"/><rect x="-72" y="22" width="144" height="16" fill="${P.ochre}" stroke="${P.ink}" stroke-width="5"/>
        </g>
        <g stroke="${P.gold}" stroke-width="4" opacity="0.6" stroke-linecap="round"><line x1="800" y1="520" x2="788" y2="380"/><line x1="720" y1="540" x2="672" y2="430"/><line x1="880" y1="545" x2="930" y2="430"/></g>
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)" opacity="1"/>`;
    },
    // I.2 — the queen's flight to Champa
    flight(id) {
      const ex = sky(id, [[0, "#0d1730"], [0.6, P.lapis2], [1, "#3c4f7a"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>${stars(140, 5, 520)}
        <circle cx="980" cy="360" r="230" fill="${P.lime}" opacity="0.95"/><circle cx="980" cy="360" r="300" fill="${P.lime}" opacity="0.08"/>
        ${mountains(760, "#1b2440", 21, 140)}
        <path d="M0,820 C400,770 900,800 1600,760 L1600,1000 L0,1000 Z" fill="${P.ink2}"/>
        <path d="M200,1000 C520,900 760,840 1240,792" stroke="${P.ochre}" stroke-width="14" fill="none" opacity="0.5" stroke-linecap="round"/>
        ${palaceSkyline(800, "#141a30", 31).replace("<g ", '<g transform="translate(1160,548) scale(0.26,0.3)" ')}<g fill="${P.gold}" opacity="0.8">${[0,1,2,3,4,5].map((i) => `<circle cx="${1185 + i * 64}" cy="${790 - (i % 2) * 10}" r="3"/>`).join("")}</g>
        ${man(760, 870, 1.9, { walk: true, staff: true })}
        ${woman(640, 900, 2.0, { veil: true })}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // I.3 — the young prince at the harbour
    shore(id) {
      const ex = sky(id, [[0, "#f6d48a"], [0.55, "#e9a24e"], [1, "#a84a24"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <circle cx="1010" cy="560" r="170" fill="#fff0c4" opacity="0.9"/>
        ${wave(640, 10, 120, 1600, "#8a4a26", 3)}${wave(700, 12, 160, 1600, "#5c2c17", 4)}
        ${ship(1060, 640, 1.55, { sail: "#2a160c" })}
        <rect x="0" y="770" width="760" height="40" fill="${P.ink}"/>${[60, 220, 380, 540, 700].map((x) => `<rect x="${x}" y="800" width="18" height="220" fill="${P.ink}"/>`).join("")}
        ${man(430, 772, 2.6)}
        ${[0, 1, 2].map((i) => `<rect x="${250 + i * 60}" y="${730 - (i % 2) * 20}" width="52" height="${40 + (i % 2) * 20}" fill="${P.ink}"/>`).join("")}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // II.4 — the storm
    storm(id) {
      const ex = sky(id, [[0, "#0a0f17"], [0.6, "#1c2a3f"], [1, "#2b3e57"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <path d="M980,0 L930,180 L990,190 L900,420 L1010,240 L950,232 L1040,0 Z" fill="${P.lime}" opacity="0.9"/>
        ${rain(9)}
        ${wave(560, 70, 220, 1600, "#152238", 7)}
        ${ship(700, 560, 1.7, { broken: true, rot: -24 })}
        ${crest(1140, 520, 2.4, P.lapis, P.lime)}
        ${crest(250, 640, 1.8, "#1e3a66", P.lime)}
        ${wave(760, 60, 180, 1600, P.lapis2, 8)}${wave(870, 40, 140, 1600, P.ink, 12)}
        ${[[420, 700], [560, 760], [900, 720], [1040, 790]].map(([x, y], i) => swimmer(x, y, 1.4 + (i % 2) * 0.3, P.ink)).join("")}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // II.5 — seven days, seven nights
    swim(id) {
      const ex = sky(id, [[0, P.lapis2], [1, "#3d6b8c"]]);
      const arcs = [...Array(7)].map((_, i) => {
        const a = Math.PI * (0.12 + (i / 6) * 0.76), x = 800 - Math.cos(a) * 640, y = 520 - Math.sin(a) * 380;
        return `<circle cx="${f(x)}" cy="${f(y)}" r="38" fill="${i % 2 ? P.lime : P.gold}" opacity="${f(0.55 + i * 0.06)}"/><text x="${f(x)}" y="${f(y + 76)}" text-anchor="middle" font-family="Cormorant, Georgia, serif" font-size="30" fill="${P.lime}" opacity="0.85">${["I", "II", "III", "IV", "V", "VI", "VII"][i]}</text>`;
      }).join("");
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <path d="M160,520 A640,380 0 0 1 1440,520" fill="none" stroke="${P.lime}" stroke-width="2" stroke-dasharray="4 10" opacity="0.6"/>${arcs}
        ${wave(640, 16, 140, 1600, "#24456b", 2)}${wave(720, 14, 120, 1600, P.lapis, 3)}${wave(820, 12, 100, 1600, P.lapis2, 5)}
        <g stroke="${P.lime}" stroke-width="2" fill="none" opacity="0.5"><path d="M760,742 c20,-8 40,-8 60,0 M740,756 c30,-10 70,-10 100,0"/></g>
        ${swimmer(800, 736, 3.2, P.ink)}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // II.6 — Manimekhala appears
    goddess(id) {
      const ex = sky(id, [[0, "#0b1426"], [0.55, "#1f3866"], [1, "#2c5b7e"]]) +
        `<radialGradient id="${id}-glow" cx="50%" cy="38%" r="40%"><stop offset="0" stop-color="${P.gold}" stop-opacity="0.85"/><stop offset="0.5" stop-color="${P.gold}" stop-opacity="0.18"/><stop offset="1" stop-color="${P.gold}" stop-opacity="0"/></radialGradient>`;
      const rays = [...Array(24)].map((_, i) => { const a = (i / 24) * Math.PI * 2; return `<line x1="800" y1="380" x2="${f(800 + Math.cos(a) * 520)}" y2="${f(380 + Math.sin(a) * 520)}"/>`; }).join("");
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>${stars(90, 13, 400)}
        <rect width="1600" height="1000" fill="url(#${id}-glow)"/>
        <g stroke="${P.gold}" stroke-width="2" opacity="0.28">${rays}</g>
        ${goddess(800, 560, 3.2, { fill: "#0d1424" })}
        ${wave(760, 26, 160, 1600, "#1d3a62", 4)}${wave(840, 20, 130, 1600, P.lapis2, 6)}
        ${swimmer(820, 820, 2.4, P.ink)}
        <g fill="${P.gold}" opacity="0.8">${[...Array(16)].map((_, i) => `<circle cx="${f(700 + Math.sin(i * 1.7) * 160)}" cy="${f(560 + i * 14)}" r="${f(2 + (i % 3))}"/>`).join("")}</g>
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // II.7 — carried over the sea at dawn
    lift(id) {
      const ex = sky(id, [[0, "#3b2a4e"], [0.45, "#d9775a"], [0.75, "#f3c27b"], [1, "#f8e1a8"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <circle cx="300" cy="780" r="210" fill="#fff1c9" opacity="0.9"/>
        ${wave(780, 12, 160, 1600, "#c66b45", 2)}${wave(850, 10, 120, 1600, "#8b3e24", 3)}${wave(920, 8, 100, 1600, P.ink2, 4)}
        <g transform="translate(980,470) rotate(-10)">
          ${goddess(0, 0, 2.6, { fill: P.ink })}
          <g transform="translate(-6,-150) rotate(6)"><g stroke="${P.gold}" stroke-width="1.6">${sleeper(0, 0, 2.9, "#3a2414")}</g></g>
        </g>
        <g fill="none" stroke="${P.ink}" stroke-width="3" opacity="0.5" stroke-linecap="round"><path d="M640,560 C540,580 470,600 380,640"/><path d="M660,600 C580,630 520,660 460,700"/></g>
        ${palaceSkyline(980, P.ink, 7).replace("<g ", '<g transform="translate(1180,612) scale(0.28,0.32)" ')}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // III.8 — the riderless festive chariot stops at the sleeper
    chariot(id) {
      const ex = sky(id, [[0, "#f3d79a"], [1, "#d39a4f"]]);
      const R = rng(4);
      const spokes = [...Array(16)].map((_, i) => { const a = (i / 16) * Math.PI * 2; return `<line x1="0" y1="0" x2="${f(Math.cos(a) * 230)}" y2="${f(Math.sin(a) * 230)}"/>`; }).join("");
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        ${mangoTree(330, 760, 2.4, { seed: 2, fill: "#5b4423", fruit: true })}
        ${mangoTree(1450, 760, 2.0, { seed: 9, fill: "#5b4423", fruit: true })}
        <path d="M0,760 L1600,760 L1600,1000 L0,1000 Z" fill="#7a5426"/>
        <rect x="560" y="700" width="520" height="62" rx="8" fill="#a77b3f"/>
        ${sleeper(820, 700, 3.2, P.ink)}
        <g fill="none" stroke="${P.ink}" stroke-width="5" opacity="0.35">${[0, 1, 2].map((i) => `<path d="M${-40 + i * 10},${880 - i * 30} C300,${860 - i * 30} 700,${880 - i * 20} 1180,${860 - i * 10}"/>`).join("")}</g>
        <g transform="translate(1260,700)">
          <circle r="250" fill="none" stroke="${P.ink}" stroke-width="34"/>
          <g stroke="${P.ink}" stroke-width="14">${spokes}</g>
          <circle r="54" fill="${P.ink}"/><circle r="22" fill="${P.gold}"/>
          <circle r="250" fill="none" stroke="${P.gold}" stroke-width="4" stroke-dasharray="6 18"/>
        </g>
        <g fill="${P.ink}" opacity="0.25">${[...Array(30)].map(() => `<circle cx="${f(1000 + R() * 600)}" cy="${f(880 + R() * 90)}" r="${f(4 + R() * 16)}"/>`).join("")}</g>
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // IV.10 — the two mango trees
    mangoes(id) {
      const ex = sky(id, [[0, "#f6e2b0"], [1, "#e2b56a"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <circle cx="800" cy="300" r="140" fill="#fff4d6" opacity="0.8"/>
        <path d="M0,780 L1600,780 L1600,1000 L0,1000 Z" fill="#8a6230"/>
        ${mangoTree(470, 790, 2.6, { stripped: true, seed: 3 })}
        ${mangoTree(1150, 790, 2.05, { seed: 6, fill: "#2f4a2c" })}
        ${man(800, 900, 2.2, { flip: true })}
        <line x1="800" y1="140" x2="800" y2="960" stroke="${P.ink}" stroke-width="2" stroke-dasharray="3 12" opacity="0.35"/>
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // V.16 — the reed and its sheath (extreme close-up)
    reed(id) {
      const ex = sky(id, [[0, "#2a160c"], [1, "#120a06"]]) +
        `<linearGradient id="${id}-reed" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8b866"/><stop offset="0.5" stop-color="#f4dc95"/><stop offset="1" stop-color="#b89140"/></linearGradient>`;
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        <g transform="rotate(-24 800 500)">
          <path d="M120,470 L760,452 C800,452 820,470 820,500 C820,530 800,548 760,548 L120,530 Z" fill="#7a5a2a" stroke="${P.ink}" stroke-width="6"/>
          ${[0, 1, 2, 3].map((i) => `<path d="M${200 + i * 140},466 C${260 + i * 140},480 ${260 + i * 140},520 ${200 + i * 140},534" fill="none" stroke="${P.ink}" stroke-width="3" opacity="0.6"/>`).join("")}
          <rect x="900" y="478" width="640" height="44" rx="22" fill="url(#${id}-reed)" stroke="${P.ink}" stroke-width="5"/>
          ${[1040, 1220, 1400].map((x) => `<rect x="${x}" y="474" width="10" height="52" rx="4" fill="${P.ink}" opacity="0.7"/>`).join("")}
          <g stroke="${P.gold}" stroke-width="3" opacity="0.7" stroke-linecap="round">${[...Array(7)].map((_, i) => `<line x1="860" y1="${470 + i * 10}" x2="${860 - 30 - (i % 3) * 20}" y2="${460 + i * 14}"/>`).join("")}</g>
        </g>
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
    // V.17 — into the Himalaya
    forest(id) {
      const ex = sky(id, [[0, "#cfd6cf"], [0.5, "#9fb3a6"], [1, "#58705f"]]);
      return `${defs(id, ex)}<rect width="1600" height="1000" fill="url(#${id}-sky)"/>
        ${mountains(520, "#e9eee8", 3, 300)}${mountains(620, "#8aa293", 5, 240)}${mountains(720, "#5a7364", 8, 180)}
        ${pines(760, "#3c5444", 41, 30, 200)}${pines(860, "#24352a", 17, 22, 260)}
        <path d="M0,880 C400,860 1100,900 1600,870 L1600,1000 L0,1000 Z" fill="#1b2a20"/>
        <path d="M200,1000 C500,930 820,900 1060,860" stroke="#d9c9a0" stroke-width="10" fill="none" opacity="0.5" stroke-linecap="round"/>
        ${man(1040, 866, 1.15, { walk: true, staff: true, flip: true })}
        ${woman(330, 960, 1.6, { veil: true, flip: true })}
        ${vignette(id)}<rect width="1600" height="1000" filter="url(#${id}-grain)"/>`;
    },
  };

  let uid = 0;
  function render(name, align) {
    const id = `${name}-${++uid}`;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="${align || "xMidYMid"} slice" role="img" aria-hidden="true">${scenes[name](id)}</svg>`;
  }
  window.MahaArt = { render, scenes: Object.keys(scenes), P };
})();
