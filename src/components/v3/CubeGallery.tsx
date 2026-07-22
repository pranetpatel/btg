"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useInvolve } from "@/lib/involve-context";
import {
  CAMPUS_MOMENT,
  CAMPUS_MOMENTS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  KINDNESS_MOMENT,
  KINDNESS_NOTE_2,
  LOGO,
  PILLARS,
} from "@/lib/content";

/* ── Photo map for Version C (each file used once — see BRAND.md §13) ──
   Order matches the nine scroll sections s0..s8. The cube has six physical
   faces; the scroll logic recycles faces and swaps the image so every
   section still shows its own unique photo. */
const FACE_IMAGES: { src: string; alt: string }[] = [
  { src: CAMPUS_MOMENT.image, alt: CAMPUS_MOMENT.alt }, // s0 hero
  { src: KINDNESS_MOMENT.image, alt: KINDNESS_MOMENT.alt }, // s1 who we are
  { src: CAMPUS_MOMENTS.concretePortrait.image, alt: CAMPUS_MOMENTS.concretePortrait.alt }, // s2 care
  { src: CAMPUS_MOMENTS.outdoorPortrait.image, alt: CAMPUS_MOMENTS.outdoorPortrait.alt }, // s3 community
  { src: CAMPUS_MOMENTS.atriumPortrait.image, alt: CAMPUS_MOMENTS.atriumPortrait.alt }, // s4 mentorship
  { src: CAMPUS_MOMENTS.uscPortrait.image, alt: CAMPUS_MOMENTS.uscPortrait.alt }, // s5 campus
  { src: CAMPUS_MOMENTS.libraryInterview.image, alt: CAMPUS_MOMENTS.libraryInterview.alt }, // s6 why
  { src: CAMPUS_MOMENTS.noteHandOff.image, alt: CAMPUS_MOMENTS.noteHandOff.alt }, // s7 join
  { src: KINDNESS_NOTE_2, alt: "Second handwritten kindness note" }, // s8 closing
];

const FACE_NAMES = [
  "WELCOME",
  "WHO WE ARE",
  "CARE",
  "COMMUNITY",
  "MENTORSHIP",
  "CAMPUS",
  "WHY",
  "JOIN",
  "BE THE GOOD",
];

const Arrow = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M1 6h10M6 1l5 5-5 5" />
  </svg>
);

const ArrowBack = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M11 6H1M6 11L1 6l5-5" />
  </svg>
);

const IgGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.15 15.2 2.15 12s.01-3.58.07-4.85C2.37 3.92 3.88 2.38 7.14 2.23 8.41 2.17 8.8 2.16 12 2.16Zm0 3.68a6.12 6.12 0 1 0 0 12.24 6.12 6.12 0 0 0 0-12.24ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
  </svg>
);

export function CubeGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { openInvolve } = useInvolve();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const IMAGE_SRCS = FACE_IMAGES.map((f) => f.src);
    const N = IMAGE_SRCS.length;
    const SWAP_RADIUS = 3;

    const q = <T extends Element>(sel: string) =>
      root.querySelector(sel) as T | null;
    const qa = <T extends Element>(sel: string) =>
      [...root.querySelectorAll(sel)] as T[];

    const cube = q<HTMLElement>("#cube");
    const faces = qa<HTMLElement>(".face");
    const sceneDots = qa<HTMLElement>(".scene-dot");
    const sections = qa<HTMLElement>("#scroll_container section");
    const hudPct = q<HTMLElement>("#hud_pct");
    const progFill = q<HTMLElement>("#prog_fill");
    const sceneName = q<HTMLElement>("#scene_name");
    const captionNum = q<HTMLElement>("#face_caption_num");
    const captionName = q<HTMLElement>("#face_caption_name");
    const themeToggle = q<HTMLButtonElement>("#theme_toggle");
    if (!cube) return;

    /* ── Cube rotation stops ─────────────────────────────────────────── */
    const buildStops = (n: number) => {
      const base = [
        { rx: 90, ry: 0 },
        { rx: 0, ry: 0 },
        { rx: 0, ry: -90 },
        { rx: 0, ry: -180 },
        { rx: 0, ry: -270 },
        { rx: -90, ry: -360 },
      ];
      const out = base.slice(0, Math.min(n, 6));
      for (let i = 6; i < n; i++) out.push({ rx: 0, ry: -360 - (i - 6) * 90 });
      return out;
    };
    const STOPS = buildStops(N);
    const stopIndex = (s: number) => Math.min(N - 1, Math.floor(s * (N - 1)));
    const faceAtStop = (i: number) => (i < 6 ? i : 1 + ((i - 2) % 4));

    /* ── Faces / images ──────────────────────────────────────────────── */
    const faceImgIdx = new Array(6).fill(-1);
    let currentStop = -1;

    IMAGE_SRCS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const setFaceImage = (faceIdx: number, imgIdx: number, force = false) => {
      if (!force && faceIdx === faceAtStop(currentStop)) return;
      if (!force && faceImgIdx[faceIdx] === imgIdx) return;
      faceImgIdx[faceIdx] = imgIdx;
      const face = faces[faceIdx];
      if (!face) return;
      let img = face.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        face.appendChild(img);
      }
      img.alt = FACE_IMAGES[imgIdx]?.alt ?? "";
      img.src = IMAGE_SRCS[imgIdx];
    };

    for (let i = 0; i < Math.min(N, 6); i++) {
      if (IMAGE_SRCS[i]) setFaceImage(i, i, true);
    }

    const checkImageSwaps = (smooth: number) => {
      const base = stopIndex(smooth);
      for (let offset = -SWAP_RADIUS; offset <= SWAP_RADIUS; offset++) {
        if (offset === 0) continue;
        const si = base + offset;
        if (si < 0 || si >= N) continue;
        setFaceImage(faceAtStop(si), si);
      }
    };

    /* ── HUD + caption ───────────────────────────────────────────────── */
    let sectionTops: number[] = [];
    const buildSectionTops = () => {
      sectionTops = sections.map(
        (s) => s.getBoundingClientRect().top + window.scrollY
      );
    };
    const sectionIndexFromScroll = (y: number) => {
      const mid = y + window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (mid >= sectionTops[i]) idx = i;
      }
      return Math.min(idx, N - 1);
    };

    let lastFaceIdx = -1;
    const updateHUD = (s: number) => {
      const p = Math.round(s * 100);
      const si = sectionIndexFromScroll(window.scrollY);
      currentStop = si;
      if (hudPct) hudPct.textContent = String(p).padStart(3, "0") + "%";
      if (progFill) progFill.style.width = `${p}%`;
      if (si !== lastFaceIdx) {
        lastFaceIdx = si;
        const name = FACE_NAMES[si] ?? "";
        if (sceneName) sceneName.textContent = name;
        if (captionNum) captionNum.textContent = String(si + 1).padStart(2, "0");
        if (captionName) captionName.textContent = name;
        sceneDots.forEach((d, i) => d.classList.toggle("active", i === si));
      }
    };

    const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const setCubeTransform = (s: number) => {
      if (N < 2 || STOPS.length < 2) return;
      const t = s * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = easeIO(t - i);
      const a = STOPS[i];
      const b = STOPS[i + 1];
      const rx = a.rx + (b.rx - a.rx) * f;
      const ry = a.ry + (b.ry - a.ry) * f;
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    /* ── Theme (UI chrome only; faces keep the same photo) ───────────── */
    const applyTheme = (theme: "dark" | "light") => {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
    };
    applyTheme("dark");
    const onToggle = () => {
      const cur = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(cur === "dark" ? "light" : "dark");
    };
    themeToggle?.addEventListener("click", onToggle);

    /* ── Scroll physics ──────────────────────────────────────────────── */
    let maxScroll = 1;
    let lastScrollHeight = 0;
    let lastInnerHeight = 0;
    const resize = () => {
      const h = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      if (h === lastScrollHeight && vh === lastInnerHeight) return;
      lastScrollHeight = h;
      lastInnerHeight = vh;
      maxScroll = Math.max(1, h - vh);
      buildSectionTops();
    };
    resize();

    let tgt = 0;
    let smooth = 0;
    let velocity = 0;
    const ease = 0.1;
    const dynamicFriction = (v: number) => (Math.abs(v) > 200 ? 0.8 : 0.9);

    const onResize = () => {
      resize();
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      smooth = tgt;
    };
    window.addEventListener("resize", onResize);

    let resizePending = false;
    const ro = new ResizeObserver(() => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resize();
        tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        smooth = tgt;
        resizePending = false;
      });
    });
    ro.observe(document.documentElement);

    const onScroll = () => {
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      tgt = Math.max(0, Math.min(1, tgt));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let anchorAnim: number | null = null;
    const stopAnchorAnim = () => {
      if (anchorAnim) {
        cancelAnimationFrame(anchorAnim);
        anchorAnim = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const linePx = 16;
      const pagePx = window.innerHeight * 0.9;
      const delta =
        e.deltaMode === 1
          ? e.deltaY * linePx
          : e.deltaMode === 2
          ? e.deltaY * pagePx
          : e.deltaY;
      if (Math.abs(delta) < 5) return;
      stopAnchorAnim();
      velocity += delta;
      velocity = Math.max(-600, Math.min(600, velocity));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    /* ── Reveal ──────────────────────────────────────────────────────── */
    const revealEls = qa<HTMLElement>(
      ".tag, h1, h2, .body-text, .stat-row, .cta, .cta-back, .h-line, .card-logo"
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));

    /* ── Anchor smooth scroll ────────────────────────────────────────── */
    const mqSmall = window.matchMedia("(max-width: 56.25em)");
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const smoothScrollToY = (targetY: number, duration = 900) => {
      stopAnchorAnim();
      velocity = 0;
      const startY = window.scrollY;
      const diff = targetY - startY;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const y = startY + diff * easeInOutCubic(p);
        window.scrollTo(0, y);
        tgt = y / maxScroll;
        smooth = tgt;
        if (p < 1) anchorAnim = requestAnimationFrame(tick);
        else anchorAnim = null;
      };
      anchorAnim = requestAnimationFrame(tick);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a[href^="#s"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      const dest = root.querySelector(href) as HTMLElement | null;
      if (!dest) return;
      e.preventDefault();
      const isHero = href === "#s0";
      const idx = sections.indexOf(dest);
      const baseY =
        idx >= 0
          ? sectionTops[idx]
          : dest.getBoundingClientRect().top + window.scrollY;
      const extraOffset =
        mqSmall.matches && !isHero
          ? Math.max(0, dest.offsetHeight - window.innerHeight)
          : 0;
      smoothScrollToY(Math.max(0, baseY + extraOffset));
    };
    root.addEventListener("click", onClick);

    const onInterrupt = () => stopAnchorAnim();
    window.addEventListener("touchstart", onInterrupt, { passive: true });
    window.addEventListener("mousedown", onInterrupt, { passive: true });
    window.addEventListener("keydown", onInterrupt);

    /* ── Frame loop ──────────────────────────────────────────────────── */
    let lastNow = performance.now();
    let rafId = 0;
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      if (document.hidden) {
        lastNow = now;
        return;
      }
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      velocity *= Math.pow(dynamicFriction(velocity), dt * 60);
      if (Math.abs(velocity) < 0.01) velocity = 0;

      if (Math.abs(velocity) > 0.2) {
        const next = Math.max(
          0,
          Math.min(window.scrollY + velocity * ease, maxScroll)
        );
        window.scrollTo(0, next);
        tgt = next / maxScroll;
      }

      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
      smooth = Math.max(0, Math.min(1, smooth));

      updateHUD(smooth);
      checkImageSwaps(smooth);
      setCubeTransform(smooth);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      stopAnchorAnim();
      themeToggle?.removeEventListener("click", onToggle);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onInterrupt);
      window.removeEventListener("mousedown", onInterrupt);
      window.removeEventListener("keydown", onInterrupt);
      root.removeEventListener("click", onClick);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const careStats = PILLARS[0].points;

  return (
    <div className="bg-gallery" ref={rootRef} data-theme="dark">
      {/* 3D cube — six faces, images injected by the scroll logic */}
      <div id="scene">
        <div id="cube">
          <div className="face" data-face="top">
            <span className="face-ph">BTG</span>
          </div>
          <div className="face" data-face="front">
            <span className="face-ph">BTG</span>
          </div>
          <div className="face" data-face="right">
            <span className="face-ph">BTG</span>
          </div>
          <div className="face" data-face="back">
            <span className="face-ph">BTG</span>
          </div>
          <div className="face" data-face="left">
            <span className="face-ph">BTG</span>
          </div>
          <div className="face" data-face="bottom">
            <span className="face-ph">BTG</span>
          </div>
        </div>
      </div>

      {/* Brand mark + version switcher */}
      <div id="brandbar">
        <a className="brand-logo" href="#s0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Be The Good" />
          <span className="brand-word">BE THE GOOD</span>
        </a>
        <nav className="vswitch" aria-label="Site versions">
          <Link href="/">A</Link>
          <span>/</span>
          <Link href="/v2">B</Link>
          <span>/</span>
          <Link href="/v3" className="active" aria-current="page">
            C
          </Link>
        </nav>
      </div>

      {/* HUD */}
      <div id="hud">
        <div id="hud_pct">000%</div>
        <div className="progress-bar">
          <div className="progress-fill" id="prog_fill" />
        </div>
        <div className="scene-label" id="scene_name">
          WELCOME
        </div>
      </div>

      {/* Theme toggle */}
      <button id="theme_toggle" type="button" aria-label="Toggle light and dark mode">
        <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      </button>

      {/* Section dots */}
      <div id="scene_strip">
        {FACE_NAMES.map((name, i) => (
          <a
            key={i}
            href={`#s${i}`}
            className={"scene-dot" + (i === 0 ? " active" : "")}
            aria-label={name}
          />
        ))}
      </div>

      {/* Face caption */}
      <div id="face_caption">
        <div id="face_caption_num">01</div>
        <div id="face_caption_name">WELCOME</div>
      </div>

      {/* ── Scroll story ─────────────────────────────────────────────── */}
      <div id="scroll_container">
        {/* s0 — Hero */}
        <section id="s0">
          <div className="text-card">
            <div className="tag">Western University · Student-led</div>
            <h1>
              BE
              <br />
              THE
              <br />
              GOOD
            </h1>
            <p className="body-text">
              Kindness that shows up. Scroll to see the work.
            </p>
            <div className="cta-row">
              <a className="cta solid" href="#s1">
                Enter <Arrow />
              </a>
              <button className="cta" type="button" onClick={() => openInvolve()}>
                Get involved
              </button>
            </div>
          </div>
        </section>

        {/* s1 — Who we are */}
        <section id="s1">
          <div className="text-card right">
            <div className="h-line" />
            <div className="tag">01 / Who we are</div>
            <h2>
              WE JUST
              <br />
              DO THE
              <br />
              GOOD
            </h2>
            <p className="body-text">
              Western students who show up. Notes on windshields, kits in hands,
              mentors in your corner.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s0">
                <ArrowBack /> Back
              </a>
              <a className="cta" href="#s2">
                What we do <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s2 — Be The Good Care */}
        <section id="s2">
          <div className="text-card">
            <div className="h-line" />
            <div className="tag">02 / What we do</div>
            <h2>
              BE THE
              <br />
              GOOD
              <br />
              CARE
            </h2>
            <p className="body-text">
              An app for caregiver burnout in clinical settings. Built with a
              friend who gets it. Demo lands here soon.
            </p>
            <div className="stat-row">
              {careStats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-num">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="cta-row">
              <a className="cta-back" href="#s1">
                <ArrowBack /> Back
              </a>
              <button
                className="cta"
                type="button"
                onClick={() => openInvolve("care")}
              >
                Join the product team
              </button>
              <a className="cta" href="#s3">
                Next <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s3 — Community care */}
        <section id="s3">
          <div className="text-card right">
            <div className="h-line" />
            <div className="tag">03 / What we do</div>
            <h2>
              KITS THAT
              <br />
              MEET
              <br />
              PEOPLE
            </h2>
            <p className="body-text">
              Food and hygiene kits for people facing hardship across London.
              Funded together.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s2">
                <ArrowBack /> Back
              </a>
              <button
                className="cta"
                type="button"
                onClick={() => openInvolve("sponsor")}
              >
                Sponsor a kit
              </button>
              <a className="cta" href="#s4">
                Next <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s4 — Mentorship */}
        <section id="s4">
          <div className="text-card">
            <div className="h-line" />
            <div className="tag">04 / What we do</div>
            <h2>
              WALK
              <br />
              WITH
              <br />
              YOU
            </h2>
            <p className="body-text">
              Peer support for incoming students. Belonging and guidance from
              people who have been there.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s3">
                <ArrowBack /> Back
              </a>
              <button
                className="cta"
                type="button"
                onClick={() => openInvolve("mentor")}
              >
                Become a mentor
              </button>
              <a className="cta" href="#s5">
                Next <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s5 — Campus */}
        <section id="s5">
          <div className="text-card right">
            <div className="h-line" />
            <div className="tag">05 / Campus</div>
            <h2>
              STRAIGHT
              <br />
              FROM
              <br />
              CAMPUS
            </h2>
            <p className="body-text">
              Kindness notes and street interviews. The good, straight from
              Western.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s4">
                <ArrowBack /> Back
              </a>
              <a
                className="cta"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <IgGlyph /> Follow
              </a>
              <a className="cta" href="#s6">
                Next <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s6 — Why */}
        <section id="s6">
          <div className="text-card">
            <div className="h-line" />
            <div className="tag">06 / Why Be The Good</div>
            <h2>
              WHY
              <br />
              BE THE
              <br />
              GOOD
            </h2>
            <p className="body-text">
              Show up. Give time. Find your people. Make someone&apos;s week.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s5">
                <ArrowBack /> Back
              </a>
              <a className="cta" href="#s7">
                Get involved <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* s7 — Join / Sponsor */}
        <section id="s7">
          <div className="text-card right">
            <div className="h-line" />
            <div className="tag">07 / Get involved</div>
            <h2>
              JOIN
              <br />
              THE
              <br />
              MOVEMENT
            </h2>
            <p className="body-text">
              Volunteer, mentor, or sponsor the work. Your support puts kits in
              circulation and helps student programs grow.
            </p>
            <div className="cta-row">
              <a className="cta-back" href="#s6">
                <ArrowBack /> Back
              </a>
              <button
                className="cta solid"
                type="button"
                onClick={() => openInvolve()}
              >
                Get involved
              </button>
              <button
                className="cta"
                type="button"
                onClick={() => openInvolve("sponsor")}
              >
                Sponsor
              </button>
            </div>
          </div>
        </section>

        {/* s8 — Closing */}
        <section id="s8">
          <div className="text-card center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="card-logo" src={LOGO} alt="Be The Good" />
            <div className="h-line" />
            <div className="tag">Be the good.</div>
            <h2>
              BE
              <br />
              THE
              <br />
              GOOD
            </h2>
            <p className="body-text">Even a few smiles count.</p>
            <div className="cta-row">
              <a
                className="cta solid"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <IgGlyph /> Follow {INSTAGRAM_HANDLE}
              </a>
              <button className="cta" type="button" onClick={() => openInvolve()}>
                Get involved
              </button>
              <a className="cta-back" href="#s0">
                <ArrowBack /> Begin again
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Vertical Instagram credit rail */}
      <div id="credit">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <IgGlyph /> {INSTAGRAM_HANDLE}
        </a>
      </div>
    </div>
  );
}
