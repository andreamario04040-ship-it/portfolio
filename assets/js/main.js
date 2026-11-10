/* =========================================================
   ANDREA MARIOTTI — logica del sito
   (non serve modificare questo file: i contenuti stanno in data.js)
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ---------- ICONE ---------- */
  const ICON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    tiktok:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3v13a2.5 2.5 0 1 1-2.5-2.5c.2 0 .4 0 .6.07V9.5A5.5 5.5 0 1 0 16.5 15V8.4a7 7 0 0 0 4 1.26V6.6a4.1 4.1 0 0 1-4-4.6Z"/></svg>',
    youtube:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg>',
    linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C20.4 8.75 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z"/></svg>',
    play:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
    eye:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    heart:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/></svg>',
    arrow:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>'
  };

  const PLATFORM_LABEL = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", linkedin: "LinkedIn" };
  const BLOB_CLASSES = ["blob--cyan", "blob--green", "blob--blue", "blob--teal"];

  /* ---------- immagini con fallback elegante ---------- */
  function imgWithFallback(src, alt, fallbackHTML) {
    const wrap = document.createElement("div");
    wrap.innerHTML = fallbackHTML;
    if (!src) return wrap.innerHTML;
    return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-fallback>` + fallbackHTML;
  }
  function wireFallbacks(root) {
    $$("img[data-fallback]", root).forEach(img => {
      img.addEventListener("error", () => { img.remove(); }, { once: true });
      img.addEventListener("load", () => {
        const fb = img.parentElement && img.parentElement.querySelector(".reel__fb,.work__fb");
        if (fb) fb.remove();
      }, { once: true });
    });
  }

  /* ---------- 1. CONTENUTI SOCIAL ---------- */
  function renderContenuti() {
    const grid = $("#reelsGrid");
    if (!grid || typeof CONTENUTI === "undefined") return;

    grid.innerHTML = CONTENUTI.map((c, i) => {
      const plat = (c.piattaforma || "instagram").toLowerCase();
      const blob = BLOB_CLASSES[i % BLOB_CLASSES.length];
      const fb = `<div class="reel__fb"><div class="blob blob--soft ${blob}" style="width:78%;aspect-ratio:1;position:absolute;inset:0;margin:auto"></div><span>${esc(c.categoria || "reel")}</span></div>`;
      const stats = [
        c.views ? `<span>${ICON.eye}${esc(c.views)}</span>` : "",
        c.likes ? `<span>${ICON.heart}${esc(c.likes)}</span>` : ""
      ].join("");

      /* i post sono 4:5: stanno dentro la card senza essere tagliati,
         con la stessa immagine sfocata a riempire lo sfondo */
      const isPost = (c.formato || c.categoria) === "post";
      const bg = isPost && c.img
        ? `<i class="reel__bg" style="background-image:url('${esc(c.img)}')"></i>` : "";

      return `
      <a class="reel reveal${isPost ? " reel--post" : ""}" data-d="${i % 4}" data-cat="${esc(c.categoria || "reel")}"
         href="${esc(c.link || "#")}" ${c.link && c.link !== "#" ? 'target="_blank" rel="noopener"' : ""}
         aria-label="${esc(c.titolo)}">
        <div class="reel__media">${bg}${imgWithFallback(c.img, c.titolo, fb)}</div>
        <div class="reel__top">
          <span class="chip">${ICON[plat] || ICON.instagram}${esc(PLATFORM_LABEL[plat] || plat)}</span>
        </div>
        <span class="reel__play" aria-hidden="true">${ICON.play}</span>
        <div class="reel__info">
          <p class="reel__title">${esc(c.titolo)}</p>
          ${stats ? `<div class="reel__stats">${stats}</div>` : ""}
        </div>
      </a>`;
    }).join("");

    wireFallbacks(grid);
    initFilters(grid);
  }

  function initFilters(grid) {
    const bar = $("#reelFilters");
    if (!bar) return;
    const cats = [...new Set(CONTENUTI.map(c => (c.categoria || "reel").toLowerCase()))];
    const label = { reel: "Reel", post: "Post" };

    bar.innerHTML = [`<button class="filter is-active" data-f="all">Tutti</button>`]
      .concat(cats.map(c => `<button class="filter" data-f="${esc(c)}">${esc(label[c] || c)}</button>`))
      .join("");

    bar.addEventListener("click", e => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", bar).forEach(b => b.classList.toggle("is-active", b === btn));
      const f = btn.dataset.f;
      $$(".reel", grid).forEach(card => {
        const show = f === "all" || card.dataset.cat.toLowerCase() === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---------- 2. SITI WEB ---------- */
  function renderSiti() {
    const grid = $("#worksGrid");
    if (!grid || typeof SITI === "undefined") return;

    grid.innerHTML = SITI.map((s, i) => {
      const blob = BLOB_CLASSES[i % BLOB_CLASSES.length];
      const fb = `<div class="work__fb"><div class="blob blob--soft ${blob}" style="width:60%;aspect-ratio:1;position:absolute;inset:0;margin:auto"></div><span>${esc(s.titolo)}</span></div>`;
      const live = s.link && s.link !== "#";
      return `
      <article class="work reveal ${s.wide ? "work--wide" : ""}" data-d="${i % 4}">
        <div class="work__shot">
          <div class="browser"><i></i><i></i><i></i><u>${esc(s.url || "")}</u></div>
          <div class="work__img">${imgWithFallback(s.img, "Anteprima del sito " + s.titolo, fb)}</div>
        </div>
        ${s.stato ? `<span class="work__status">${s.stato.toLowerCase() === "online" ? '<i class="dot" style="width:6px;height:6px"></i>' : ""}${esc(s.stato)}</span>` : ""}
        <div class="work__body">
          <div class="work__row">
            <h3 class="work__title">${esc(s.titolo)}</h3>
            <span class="work__year">${esc(s.anno || "")}</span>
          </div>
          <p class="work__desc">${esc(s.descrizione)}</p>
          <div class="work__tags">${(s.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <a class="work__link" href="${esc(s.link || "#")}" ${live ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>
            ${live ? "Visita il sito" : "Presto online"} ${ICON.arrow}
          </a>
        </div>
      </article>`;
    }).join("");

    wireFallbacks(grid);
  }

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CAN_HOVER = window.matchMedia("(hover:hover)").matches;

  /* ---------- 2b. NOME IN HERO: una lettera alla volta ---------- */
  function initHeroName() {
    const h1 = $("#heroName");
    if (!h1) return;
    if (REDUCED) { h1.classList.add("is-ready"); return; }

    let i = 0;
    $$(".hero__line", h1).forEach(line => {
      const text = line.textContent.trim();
      line.textContent = "";
      [...text].forEach(ch => {
        const outer = document.createElement("span");
        if (ch === " ") {
          outer.className = "char char--space";
          outer.innerHTML = "&nbsp;";
        } else {
          outer.className = "char";
          const inner = document.createElement("span");
          inner.className = "char__in";
          inner.textContent = ch;
          outer.appendChild(inner);
        }
        outer.style.setProperty("--i", i++);
        line.appendChild(outer);
      });
    });
    requestAnimationFrame(() => h1.classList.add("is-ready"));
  }

  /* ---------- 2c. HERO: sequenza 3D a scorrimento ---------- */
  /* Il nome resta fermo al centro mentre palline, preview dei contenuti e
     parole chiave salgono verso l'alto a profondita' diverse.            */

  const HERO_WORDS = ["Web Design", "Reel", "Social Media", "UI / UX", "Content Creation", "Branding"];
  const WORD_STYLE = ["fill", "out", "grad", "out", "fill", "out"];
  const WORD_SIZE  = [54, 76, 46, 66, 42, 60];

  /* x = % della larghezza · z = profondita' · st = quando entra (progresso 0-1)
     m = 1 → presente anche su schermi piccoli                                  */
  const HERO_LAYOUT = [
    { k: "ball", c: "teal",   s: 190, x: -34, z: -520, zt: 300, st: -0.28, m: 1 },
    { k: "card", i: 0,                x:  30, z: -300, zt: 240, st: -0.22, m: 1 },
    { k: "word", w: 0,                x: -19, z: -180, zt: 200, st: -0.16, m: 0 },
    { k: "ball", c: "blue",   s: 150, x:  38, z: -400, zt: 260, st: -0.12, m: 1 },
    { k: "ball", c: "amber",  s:  44, x: -44, z:  130, zt: 180, st: -0.06, m: 1, g: 1 },
    { k: "ball", c: "lime",   s:  52, x:  44, z:   70, zt: 160, st: -0.04, m: 1, g: 1 },
    { k: "card", i: 1,                x: -31, z: -360, zt: 240, st: -0.02, m: 1 },
    { k: "ball", c: "cyan",   s: 220, x: -10, z: -620, zt: 320, st:  0.04, m: 1 },
    { k: "word", w: 1,                x:  33, z:   90, zt: 150, st:  0.08, m: 1 },
    { k: "ball", c: "lime",   s:  74, x:  20, z: -250, zt: 220, st:  0.12, m: 0 },
    { k: "card", i: 2,                x:  33, z: -210, zt: 220, st:  0.16, m: 1 },
    { k: "word", w: 2,                x: -30, z: -430, zt: 260, st:  0.20, m: 1 },
    { k: "ball", c: "green",  s: 130, x:  29, z: -470, zt: 280, st:  0.24, m: 0 },
    { k: "ball", c: "amber",  s: 112, x: -39, z: -360, zt: 250, st:  0.26, m: 1 },
    { k: "card", i: 3,                x: -27, z: -430, zt: 250, st:  0.28, m: 1 },
    { k: "ball", c: "orange", s:  58, x: -24, z: -200, zt: 190, st:  0.32, m: 1, g: 1 },
    { k: "word", w: 3,                x:  21, z: -140, zt: 170, st:  0.36, m: 0 },
    { k: "ball", c: "cyan",   s:  38, x:  43, z:  150, zt: 170, st:  0.40, m: 1, g: 1 },
    { k: "card", i: 4,                x:  28, z: -330, zt: 240, st:  0.43, m: 0 },
    { k: "ball", c: "teal",   s: 200, x:   8, z: -580, zt: 300, st:  0.46, m: 1 },
    { k: "word", w: 4,                x: -18, z: -540, zt: 280, st:  0.49, m: 1 },
    { k: "card", i: 5,                x: -33, z: -240, zt: 220, st:  0.52, m: 1 },
    { k: "ball", c: "blue",   s:  96, x:  22, z: -330, zt: 230, st:  0.55, m: 0 },
    { k: "ball", c: "orange", s: 164, x: -29, z: -500, zt: 290, st:  0.50, m: 1 },
    { k: "word", w: 5,                x:  28, z: -120, zt: 160, st:  0.58, m: 1 }
  ];

  /* Le preview arrivano dai contenuti veri: appena metti un'immagine in
     data.js compare qui dentro, altrimenti resta un segnaposto sfumato. */
  function heroCards() {
    const out = [];
    if (typeof CONTENUTI !== "undefined") {
      /* prima i contenuti che hanno davvero una copertina */
      const conImg = CONTENUTI.filter(c => c.img);
      const reel = conImg.filter(c => (c.formato || c.categoria) !== "post");
      const post = conImg.filter(c => (c.formato || c.categoria) === "post");
      /* alterna reel e post cosi' la hero mostra un po' di tutto */
      [reel[0], post[0], reel[1], reel[2], post[1], reel[3]].forEach(c => {
        if (c) out.push({
          type: (c.formato || c.categoria) === "post" ? "post" : "reel",
          img: c.img, tag: c.categoria || "reel", label: c.titolo
        });
      });
    }
    if (typeof SITI !== "undefined") {
      SITI.filter(s2 => s2.img).slice(0, 2).forEach(s2 => out.push({
        type: "web", img: s2.img, tag: "sito", label: s2.titolo
      }));
    }
    return out;
  }

  function buildField(field, small) {
    const cards = heroCards();
    const scale = small ? 0.88 : 1;
    const items = [];

    HERO_LAYOUT.forEach((d, n) => {
      if (small && !d.m) return;

      const item = document.createElement("div");
      item.className = "hero-item";
      const inner = document.createElement("div");
      inner.className = "hero-item__in";
      inner.style.setProperty("--rz", ((n % 5) - 2) * 1.8 + "deg");
      inner.style.setProperty("--ry", ((n % 3) - 1) * 7 + "deg");
      inner.style.setProperty("--wob", (13 + (n % 6) * 1.7).toFixed(1) + "s");
      inner.style.setProperty("--wd", (-(n % 8) * 1.4).toFixed(1) + "s");

      if (d.k === "ball") {
        const ball = document.createElement("div");
        ball.className = "fx-ball blob--" + d.c + (d.g ? " is-glow" : "");
        ball.style.setProperty("--s", Math.round(d.s * scale) + "px");
        if (d.g) ball.style.color = "var(--" + d.c + ")";
        inner.appendChild(ball);

      } else if (d.k === "word") {
        const word = document.createElement("div");
        word.className = "fx-word fx-word--" + WORD_STYLE[d.w];
        word.style.setProperty("--fs", Math.round(WORD_SIZE[d.w] * scale) + "px");
        word.textContent = HERO_WORDS[d.w];
        inner.appendChild(word);

      } else {
        const c = cards[d.i % (cards.length || 1)];
        if (!c) return;
        const card = document.createElement("div");
        card.className = "fx-card fx-card--" + c.type;
        const base = c.type === "web" ? 288 : (c.type === "post" ? 198 : 168);
        card.style.setProperty("--w", Math.round(base * scale) + "px");
        const tint = ["--grad-cyan", "--grad-green", "--grad-blue", "--grad-teal"][d.i % 4];
        card.innerHTML =
          '<div class="fx-card__ph"><i style="background:var(' + tint + ')"></i></div>' +
          '<span class="fx-card__tag">' + esc(c.tag) + '</span>' +
          '<span class="fx-card__lab">' + esc(c.label) + '</span>';
        if (c.img) {
          const img = new Image();
          img.src = c.img;
          img.alt = "";
          img.addEventListener("load", () => {
            const ph = card.querySelector(".fx-card__ph");
            if (ph) ph.replaceWith(img);
          }, { once: true });
        }
        inner.appendChild(card);
      }

      /* profondita': i piani lontani sono piu' sfocati e piu' spenti */
      const far = Math.min(1, Math.max(0, (-d.z - 150) / 500));
      if (far > 0.05) inner.style.filter = "blur(" + (far * 2.2).toFixed(1) + "px)";

      item.style.opacity = "0";
      item.appendChild(inner);
      field.appendChild(item);

      items.push({
        el: item, xp: small ? d.x * 0.75 : d.x, z0: d.z, zt: d.zt,
        start: d.st, dur: 0.42,
        y0: 88, travel: 176,
        d0: 380 + items.length * 80,
        maxOp: 1 - far * 0.14,
        on: true
      });
    });

    return items;
  }

  function initHeroScroll() {
    const scroller = $("#heroScroll");
    const field = $("#heroField");
    const name = $("#heroName");
    const c3d = $("#hero3d");
    const cue = $("#scrollCue");
    if (!scroller || !field) return;

    if (REDUCED) { field.remove(); return; }

    const small = window.matchMedia("(max-width:680px)").matches;
    const items = buildField(field, small);
    if (!items.length) return;

    let vh = window.innerHeight, vw = window.innerWidth;
    let target = 0, cur = 0, raf = null, last = 0;

    /* entrata al caricamento: ogni elemento si avvicina e si accende */
    let t0 = performance.now();
    const introEnd = 380 + items.length * 80 + 900;
    let intro = 0;

    const read = () => {
      const total = scroller.offsetHeight - vh;
      const passed = -scroller.getBoundingClientRect().top;
      target = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
    };

    const draw = () => {
      const now = performance.now();
      intro = Math.min(1, (now - t0) / introEnd);

      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.0002) cur = target;
      const p = cur;

      for (let n = 0; n < items.length; n++) {
        const it = items[n];
        const t = (p - it.start) / it.dur;

        if (t < 0 || t > 1) {
          if (it.on) { it.el.style.opacity = "0"; it.on = false; }
          continue;
        }
        it.on = true;

        /* 0 → 1 mentre l'elemento entra in scena al caricamento */
        const raw = (now - t0 - it.d0) / 900;
        const e = Math.min(1, Math.max(0, raw));
        const ii = 1 - Math.pow(1 - e, 3);

        const y = (it.y0 - t * it.travel) * vh / 100 + (1 - ii) * 70;
        const z = it.z0 + t * it.zt - (1 - ii) * 240;
        const op = Math.min(1, t / 0.14) * Math.min(1, (1 - t) / 0.14) * it.maxOp * ii;

        it.el.style.transform =
          "translate3d(" + (it.xp * vw / 100).toFixed(1) + "px," +
          y.toFixed(1) + "px," + z.toFixed(1) + "px)";
        it.el.style.opacity = op.toFixed(3);
      }

      /* il nome si allontana e sfuma solo nell'ultimo tratto, per passare al Chi sono */
      const out = Math.min(1, Math.max(0, (p - 0.87) / 0.13));
      /* sul contenitore 3D cosi' il velo dietro al titolo sfuma insieme al nome */
      const host = c3d || name;
      host.style.setProperty("--nop", (1 - out).toFixed(3));
      host.style.setProperty("--nz", (-out * 300).toFixed(0) + "px");
      if (cue) cue.style.setProperty("--cue", Math.max(0, 1 - p * 8).toFixed(3));

      last = now;
      raf = (cur !== target || intro < 1) ? requestAnimationFrame(draw) : null;
    };

    /* Se i frame non arrivano (scheda in secondo piano, finestra coperta)
       la scena si riallinea di colpo invece di restare indietro. */
    const kick = () => {
      read();
      if (intro >= 1 && performance.now() - last > 220) { cur = target; raf = null; draw(); return; }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", () => {
      vh = window.innerHeight; vw = window.innerWidth;
      cur = target; raf = null; read(); draw();
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      /* se la pagina si apre in secondo piano l'entrata parte quando la si guarda;
         se invece era gia' iniziata non si riavvia */
      if (intro < 0.02) t0 = performance.now();
      read(); cur = target; raf = null;
      raf = requestAnimationFrame(draw);
    });

    read(); cur = target;
    raf = requestAnimationFrame(draw);

    /* Rete di sicurezza: se i frame non arrivano (finestra coperta, scheda
       rallentata) l'entrata avanza comunque a passo ridotto invece di
       lasciare la hero vuota. In condizioni normali non scatta mai. */
    const watchdog = setInterval(() => {
      if (intro >= 1) { clearInterval(watchdog); return; }
      if (performance.now() - last > 260) { raf = null; draw(); }
    }, 260);

    /* prospettiva: il piano 3D si inclina appena seguendo il mouse */
    if (CAN_HOVER && c3d) {
      window.addEventListener("pointermove", e => {
        const rx = (0.5 - e.clientY / vh) * 2.2;
        const ry = (e.clientX / vw - 0.5) * 2.6;
        c3d.style.setProperty("--tx", rx.toFixed(2) + "deg");
        c3d.style.setProperty("--ty", ry.toFixed(2) + "deg");
      }, { passive: true });
    }
  }

  /* ---------- 2e. BOTTONI MAGNETICI ---------- */
  function initMagnet() {
    if (REDUCED || !CAN_HOVER) return;
    $$("[data-magnet]").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.38 - 3;
        el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- 3. NAVBAR + MENU ---------- */
  function initNav() {
    const nav = $("#nav");
    const burger = $("#burger");
    const body = document.body;

    const onScroll = () => nav && nav.classList.toggle("is-stuck", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const close = () => { body.classList.remove("menu-open"); burger && burger.setAttribute("aria-expanded", "false"); };
    if (burger) {
      burger.addEventListener("click", () => {
        const open = body.classList.toggle("menu-open");
        burger.setAttribute("aria-expanded", String(open));
      });
    }
    $$("#menu a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) close(); });

    // link attivo in base alla sezione visibile
    const links = $$(".nav__link");
    const map = new Map(links.map(l => [l.getAttribute("href"), l]));
    const sections = [...map.keys()].map(h => $(h)).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          links.forEach(l => l.classList.remove("is-active"));
          const l = map.get("#" + en.target.id);
          if (l) l.classList.add("is-active");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(s => io.observe(s));
    }
  }

  /* ---------- 4. REVEAL AL SCROLL ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
  }

  /* ---------- 4b. TESTO ANIMATO: divisione in parole ---------- */
  /* Divide il testo in parole conservando <strong>, <span> e <br>. */
  function splitWords(el) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          if (!n.textContent.trim()) return;
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement("span");
            outer.className = "word";
            const inner = document.createElement("span");
            inner.className = "word__in";
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          walk(n);
        }
      });
    };
    walk(el);
    $$(".word", el).forEach((w, i) => w.style.setProperty("--w", i));
  }

  function initTextAnim() {
    const blocks = $$("[data-anim]");
    if (!blocks.length) return;

    if (REDUCED) { blocks.forEach(b => b.classList.add("is-in")); return; }

    blocks.forEach(b => {
      b.setAttribute("aria-label", (b.innerText || b.textContent).replace(/\s+/g, " ").trim());
      splitWords(b);
    });

    if (!("IntersectionObserver" in window)) {
      blocks.forEach(b => b.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        obs.unobserve(en.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    blocks.forEach(b => io.observe(b));
  }

  /* ---------- 5. CONTATORI ---------- */
  function initCounters() {
    const nums = $$("[data-count]");
    if (!nums.length || !("IntersectionObserver" in window)) {
      nums.forEach(n => n.textContent = n.dataset.count + (n.dataset.suffix || ""));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const end = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1300;
        const t0 = performance.now();
        const step = t => {
          const p = Math.min((t - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* ---------- 6. TILT SULLA CARD CONTATTI ---------- */
  function initTilt() {
    const card = $("#bizCard");
    if (!card || !window.matchMedia("(hover:hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reset = () => card.style.transform = "";
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", reset);
  }

  /* ---------- 7. FOTO RITRATTO ---------- */
  function initPortrait() {
    const frame = $("#portrait");
    if (!frame || typeof FOTO === "undefined" || !FOTO) return;
    const img = new Image();
    img.src = FOTO;
    img.alt = "Ritratto di Andrea Mariotti";
    img.className = "portrait__img";
    img.decoding = "async";
    img.addEventListener("load", () => {
      const fb = $(".portrait__fallback", frame);
      if (fb) fb.remove();
      frame.appendChild(img);
    }, { once: true });
  }

  /* ---------- AVVIO ---------- */
  function boot() {
    renderContenuti();
    renderSiti();
    initNav();
    initHeroName();
    initHeroScroll();
    initPortrait();
    initMagnet();
    initReveal();
    initTextAnim();
    initCounters();
    initTilt();
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
