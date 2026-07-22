"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { Sparkle } from "@/components/ui/Sparkle";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openInvolve } = useInvolve();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-purple text-cream"
    >
      {/* Parallax glow + texture */}
      <motion.div
        style={{ scale: glowScale, y: glowY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple via-purple-deep to-ink" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_75%_25%,rgba(201,184,232,0.35)_0%,transparent_45%),radial-gradient(circle_at_15%_80%,rgba(201,162,39,0.18)_0%,transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </motion.div>

      {/* Floating sparkles */}
      <Sparkle className="absolute left-[12%] top-[24%] h-6 w-6 md:h-8 md:w-8" twinkle />
      <Sparkle className="absolute right-[22%] top-[40%] h-4 w-4" twinkle />
      <Sparkle className="absolute right-[12%] bottom-[30%] h-5 w-5 md:h-7 md:w-7" twinkle />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex w-full flex-col gap-7 px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-center gap-4"
        >
          <Image
            src="/logowhite.png"
            alt="Be The Good — Western University"
            width={128}
            height={128}
            priority
            className="h-20 w-20 object-contain md:h-28 md:w-28"
          />
          <span className="eyebrow text-lavender">
            Student-led · Western University
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-serif text-6xl font-medium leading-[0.92] tracking-tight sm:text-7xl md:text-[9rem]">
          {["Be", "the"].map((word, i) => (
            <span key={word} className="inline-flex overflow-hidden">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.08 }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
          <span className="inline-flex overflow-hidden">
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.41 }}
              className="inline-block font-script text-gold"
            >
              good.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="max-w-lg text-base text-lavender md:text-lg"
        >
          A student-led nonprofit at Western University — Be The Good Care for
          caregiver burnout, community food &amp; hygiene kits, and mentorship
          for incoming students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="flex flex-wrap items-center gap-3"
        >
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
            className="rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
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
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-lavender md:block"
      >
        <span className="animate-scroll-cue inline-block">(Scroll)</span>
      </motion.div>
    </section>
  );
}
