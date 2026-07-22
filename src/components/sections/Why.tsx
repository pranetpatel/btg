"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WHY_POINTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";

export function Why() {
  return (
    <section id="why" className="bg-ink px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-lavender">
            <Sparkle className="h-3.5 w-3.5" />
            Why Be The Good
          </p>
        </Reveal>
        <RevealText
          text={"You don't just care.\nYou do."}
          className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />

        {/* Sticky-stacked storytelling — each panel pins and stacks */}
        <div className="mt-20">
          {WHY_POINTS.map((point, i) => (
            <StickyPanel key={point.index} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyPanel({
  point,
  index,
}: {
  point: (typeof WHY_POINTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
      <motion.div
        style={{ scale, opacity }}
        className="mb-8 grid gap-8 overflow-hidden rounded-3xl bg-purple-deep p-6 md:grid-cols-2 md:items-center md:p-10"
      >
        <div className={index % 2 === 1 ? "md:order-2" : ""}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <ImageOrPlaceholder
              src={point.image}
              alt={point.title}
              label={`Be the good · ${point.index}`}
              className="h-full w-full"
            />
          </div>
        </div>
        <div className={index % 2 === 1 ? "md:order-1" : ""}>
          <span className="font-serif text-5xl font-medium text-gold/80 md:text-6xl">
            {point.index}
          </span>
          <h3 className="mt-4 font-serif text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            {point.title}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-lavender">
            {point.copy}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
