"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  INVOLVE_TAG_STYLES,
  INVOLVE_WAYS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

export function Involved() {
  return (
    <section
      id="involved"
      className="bg-ink px-6 py-28 text-cream md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-lavender">
            <Sparkle className="h-3.5 w-3.5" />
            Get involved
          </p>
        </Reveal>
        <RevealText
          text={"Ways to\nshow up."}
          className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />

        {/* Sticky-stacked cards - each way pins and stacks, click to act */}
        <div className="mt-20">
          {INVOLVE_WAYS.map((way, i) => (
            <StickyWay key={way.title} way={way} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-cream underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            <Sparkle className="h-4 w-4" />
            Or just DM us {INSTAGRAM_HANDLE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function StickyWay({
  way,
  index,
}: {
  way: (typeof INVOLVE_WAYS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { openInvolve } = useInvolve();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Panels behind settle back slightly as the next one rises over them.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  return (
    <div
      ref={ref}
      className="sticky mx-auto"
      style={{ top: `${6 + index * 2.5}rem` }}
    >
      <motion.button
        type="button"
        onClick={() => openInvolve(way.purpose)}
        style={{ scale, opacity }}
        className="group mb-8 grid w-full gap-8 overflow-hidden rounded-3xl bg-purple-deep p-6 text-left transition-colors hover:bg-purple md:grid-cols-2 md:items-center md:p-10"
      >
        <div className={index % 2 === 1 ? "md:order-2" : ""}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <ImageOrPlaceholder
              src={way.image}
              alt={way.title}
              label={way.title}
              className="h-full w-full"
            />
          </div>
        </div>
        <div className={index % 2 === 1 ? "md:order-1" : ""}>
          <span className="font-serif text-6xl font-medium text-gold/80 md:text-7xl">
            {`0${index + 1}`}
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {way.title}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${INVOLVE_TAG_STYLES[way.tag]}`}
            >
              {way.tag}
            </span>
          </div>
          <p className="mt-3 text-lg text-lavender">{way.meta}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream">
            Count me in
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </motion.button>
    </div>
  );
}
