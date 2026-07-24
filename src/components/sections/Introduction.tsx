"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CAMPUS_MOMENT, KINDNESS_MOMENT } from "@/lib/content";

export function Introduction() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="relative overflow-hidden bg-cream px-6 py-28 md:px-10 md:py-40"
    >
      <Sparkle className="absolute right-[10%] top-[16%] h-6 w-6" twinkle />
      <Sparkle className="absolute left-[6%] bottom-[20%] h-4 w-4" twinkle />

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-purple/70">
            <Sparkle className="h-3.5 w-3.5" />
            Who we are
          </p>
        </Reveal>

        <RevealText
          text={"We just do\nthe good."}
          className="mt-6 font-serif text-5xl font-medium leading-[0.98] tracking-tight text-ink md:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md text-lg text-ink/70">
            Notes, kits, mentors, and an app for caregivers.
          </p>
        </Reveal>

        {/* Dual image mask reveals · linked to Instagram posts */}
        <div className="mt-14 grid gap-5 sm:grid-cols-5">
          <MaskReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:col-span-3">
            <a
              href={CAMPUS_MOMENT.href}
              target="_blank"
              rel="noreferrer"
              className="group absolute inset-0 block"
              aria-label="Campus moment on Instagram"
            >
              <ImageOrPlaceholder
                src={CAMPUS_MOMENT.image}
                alt={CAMPUS_MOMENT.alt}
                label="Campus moment"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                <InstagramIcon className="h-3.5 w-3.5" />
                Campus moment
              </span>
            </a>
          </MaskReveal>
          <MaskReveal
            delay={0.12}
            className="relative aspect-[4/5] w-full self-end overflow-hidden rounded-3xl sm:col-span-2"
          >
            <a
              href={KINDNESS_MOMENT.href}
              target="_blank"
              rel="noreferrer"
              className="group absolute inset-0 block"
              aria-label="Kindness note on Instagram"
            >
              <ImageOrPlaceholder
                src={KINDNESS_MOMENT.image}
                alt={KINDNESS_MOMENT.alt}
                label="Kindness note"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                <InstagramIcon className="h-3.5 w-3.5" />
                Kindness note
              </span>
            </a>
          </MaskReveal>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-2 border-gold pl-4 font-serif text-lg italic text-ink"
          >
            Founded by Arpi, Health Sciences.
          </motion.p>
          <Reveal delay={0.1}>
            <a
              href="#pillars"
              className="inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              What we do
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
