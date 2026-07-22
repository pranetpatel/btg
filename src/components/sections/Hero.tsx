"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-ink"
    >
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2400&auto=format&fit=crop"
          alt="A capsule house glowing at dusk in the California desert"
          fill
          priority
          className="object-cover opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex w-full flex-col gap-8 px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight text-cream sm:text-6xl md:text-8xl"
        >
          Closer to
          <br />
          Nature—Closer
          <br />
          to Yourself
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="max-w-md text-base text-taupe md:text-lg"
        >
          Spend unforgettable and remarkable time in the Californian desert
          with—Capsules.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-taupe md:block"
      >
        <span className="animate-scroll-cue inline-block">(Scroll)</span>
      </motion.div>
    </section>
  );
}
