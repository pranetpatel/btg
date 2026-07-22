"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOGO,
  V2_HERO_PHOTOS,
} from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { Sparkle } from "@/components/ui/Sparkle";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Grid layout ──────────────────────────────────────────────────────
   A 5x3 grid. The center cell (col 3, row 2) is the "scaler": a solid brand
   color that starts covering the viewport and shrinks into place while the
   ring of tiles around it fades and scales in, staggered from the middle out.
   Every culture photo in /public lands on a tile; the rest are brand tiles.
   The big center stays a color on purpose (a full-bleed low-res photo looks
   rough). `photo` indexes into V2_HERO_PHOTOS. */
type Cell = {
  col: number;
  row: number;
  ring: number; // 0 = adjacent to center, 1 = outer. Drives stagger.
  photo?: number;
  tone?: "lavender" | "gold" | "purple" | "soft";
  motif?: "sparkle" | "word" | "heart";
};

const CELLS: Cell[] = [
  // Row 1
  { col: 1, row: 1, ring: 1, photo: 0 }, // campusmoment
  { col: 2, row: 1, ring: 1, tone: "purple", motif: "word" },
  { col: 3, row: 1, ring: 0, photo: 2 }, // campusmoments2
  { col: 4, row: 1, ring: 1, tone: "gold", motif: "sparkle" },
  { col: 5, row: 1, ring: 1, photo: 3 }, // campusmoments3
  // Row 2 (center row; col 3 is the scaler, rendered separately)
  { col: 1, row: 2, ring: 1, photo: 4 }, // campusmoments4
  { col: 2, row: 2, ring: 0, photo: 1 }, // kindnessnote
  { col: 4, row: 2, ring: 0, photo: 5 }, // campusmoments5
  { col: 5, row: 2, ring: 1, tone: "purple", motif: "word" },
  // Row 3
  { col: 1, row: 3, ring: 1, tone: "lavender", motif: "heart" },
  { col: 2, row: 3, ring: 1, photo: 6 }, // campusmoments6
  { col: 3, row: 3, ring: 0, photo: 8 }, // kindnessnote2
  { col: 4, row: 3, ring: 1, photo: 7 }, // campusmoments7
  { col: 5, row: 3, ring: 1, tone: "soft", motif: "sparkle" },
];

const TONE_CLASS: Record<NonNullable<Cell["tone"]>, string> = {
  lavender: "bg-lavender text-purple",
  gold: "bg-gold text-purple",
  purple: "bg-purple text-cream",
  soft: "bg-lavender-soft text-purple",
};

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef(4);
  const reduced = useReducedMotion();
  const { openInvolve } = useInvolve();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure how much the center cell must scale to cover the viewport.
  useEffect(() => {
    const compute = () => {
      const el = scalerRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      coverRef.current =
        Math.max(window.innerWidth / w, window.innerHeight / h) * 1.06;
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Center color block: shrinks from covering the viewport down to its cell.
  const scalerScale = useTransform(scrollYProgress, (p) => {
    const t = Math.min(Math.max(p / 0.5, 0), 1);
    const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
    return coverRef.current + (1 - coverRef.current) * e;
  });
  const scalerRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);

  // Hero copy sits over the color, then clears as the grid forms.
  const heroOpacity = useTransform(scrollYProgress, [0.04, 0.28], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-6%"]);
  const heroBlur = useTransform(scrollYProgress, [0.04, 0.28], [0, 6]);
  const heroFilter = useTransform(heroBlur, (b) => `blur(${b}px)`);

  // Texture on the center block fades as it shrinks into a small tile.
  const textureOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);

  // Closing tagline fades in once the grid is assembled.
  const tagOpacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0.55, 0.78], [24, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-cream"
      style={{ height: reduced ? "auto" : "260vh" }}
    >
      <div
        className={`${reduced ? "" : "sticky top-0"} flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 md:px-8`}
      >
        {/* Photo / brand grid */}
        <div className="relative grid w-full max-w-[1100px] grid-cols-5 gap-2.5 md:gap-4">
          {CELLS.map((cell) => (
            <Tile
              key={`${cell.col}-${cell.row}`}
              cell={cell}
              progress={scrollYProgress}
              reduced={!!reduced}
            />
          ))}

          {/* Center scaler (col 3, row 2) — a solid brand color, not a photo */}
          <motion.div
            ref={scalerRef}
            aria-hidden
            style={
              reduced
                ? { gridColumnStart: 3, gridRowStart: 2 }
                : {
                    gridColumnStart: 3,
                    gridRowStart: 2,
                    scale: scalerScale,
                    borderRadius: scalerRadius,
                    zIndex: 30,
                  }
            }
            className="relative z-30 aspect-[4/5] w-full origin-center overflow-hidden rounded-2xl bg-gradient-to-b from-purple via-purple-deep to-ink shadow-[0_30px_80px_-40px_rgba(26,18,36,0.8)]"
          >
            <motion.div
              style={reduced ? undefined : { opacity: textureOpacity }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_75%_25%,rgba(201,184,232,0.35)_0%,transparent_45%),radial-gradient(circle_at_15%_80%,rgba(201,162,39,0.2)_0%,transparent_40%)]" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero copy over the color */}
        <motion.div
          style={
            reduced
              ? undefined
              : { opacity: heroOpacity, y: heroY, filter: heroFilter }
          }
          className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-6 text-center text-cream"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="pointer-events-auto flex flex-col items-center gap-5"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-cream/12 backdrop-blur-sm md:h-24 md:w-24">
              <Image
                src={LOGO}
                alt="Be The Good, Western University"
                width={96}
                height={96}
                priority
                className="h-14 w-14 object-contain md:h-16 md:w-16"
              />
            </span>
            <span className="eyebrow inline-flex items-center gap-2 text-lavender">
              <Sparkle className="h-3.5 w-3.5" />
              Student-led · Western University
            </span>
            <h1 className="font-serif text-6xl font-medium leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
              Be the <span className="font-script text-gold">good.</span>
            </h1>
            <p className="max-w-md font-serif text-xl italic text-lavender md:text-2xl">
              Kindness that shows up.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openInvolve()}
                className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-purple transition-opacity hover:opacity-90"
              >
                Get involved
              </button>
              <button
                type="button"
                onClick={() => openInvolve("sponsor")}
                className="rounded-full border border-cream/50 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Sponsor the work
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-2 text-sm text-lavender transition-colors hover:text-cream"
              >
                <Sparkle className="h-4 w-4" />
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
            {!reduced && (
              <span className="mt-2 text-xs uppercase tracking-[0.3em] text-lavender">
                <span className="animate-scroll-cue inline-block">(Scroll)</span>
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Closing tagline once the grid is assembled */}
        {!reduced && (
          <motion.p
            style={{ opacity: tagOpacity, y: tagY }}
            className="pointer-events-none absolute bottom-10 left-1/2 z-40 -translate-x-1/2 text-center font-serif text-lg italic text-purple md:text-2xl"
          >
            From Western, for people who need it.
          </motion.p>
        )}
      </div>
    </section>
  );
}

function Tile({
  cell,
  progress,
  reduced,
}: {
  cell: Cell;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Inner ring reveals first, outer ring trails behind it.
  const start = cell.ring === 0 ? 0.14 : 0.26;
  const opacity = useTransform(progress, [start, start + 0.22], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.32], [0.45, 1]);

  const style = reduced
    ? { gridColumnStart: cell.col, gridRowStart: cell.row }
    : { gridColumnStart: cell.col, gridRowStart: cell.row, opacity, scale };

  const photo = cell.photo !== undefined ? V2_HERO_PHOTOS[cell.photo] : null;

  return (
    <motion.div
      style={style}
      className="relative aspect-[4/5] w-full origin-center overflow-hidden rounded-2xl"
    >
      {photo ? (
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="20vw"
          className="object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${TONE_CLASS[cell.tone ?? "soft"]}`}
        >
          {cell.motif === "sparkle" && (
            <Sparkle className="h-6 w-6 md:h-8 md:w-8" />
          )}
          {cell.motif === "heart" && (
            <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-9 md:w-9" aria-hidden>
              <path
                fill="currentColor"
                d="M12 21s-7.5-4.6-10-9.2C.4 8.6 1.7 5 5 5c2 0 3.2 1.2 4 2.4C9.8 6.2 11 5 13 5c3.3 0 4.6 3.6 3 6.8C19.5 16.4 12 21 12 21Z"
              />
            </svg>
          )}
          {cell.motif === "word" && (
            <span className="px-2 text-center font-script text-xl leading-none md:text-2xl">
              be the good
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
