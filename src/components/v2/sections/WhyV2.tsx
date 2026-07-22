"use client";

import { motion } from "framer-motion";
import { KINDNESS_NOTE_2, WHY_POINTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";

/**
 * Version B "why": featured kindness note beside a numbered list.
 * Reuses kindnessnote2 (also in the hero grid) — fine for now.
 */
export function WhyV2() {
  return (
    <section id="why" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <ImageOrPlaceholder
              src={KINDNESS_NOTE_2}
              alt="Handwritten kindness note taped on campus"
              label="Kindness note"
              className="h-full w-full"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-1.5 text-purple">
              <Sparkle className="h-3.5 w-3.5" />
              Why Be The Good
            </p>
          </Reveal>
          <RevealText
            text={"You don't just care.\nYou do."}
            className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-tight text-purple md:text-5xl"
          />

          <ul className="mt-10 flex flex-col gap-4">
            {WHY_POINTS.map((point, i) => (
              <motion.li
                key={point.index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="flex items-center gap-5 rounded-2xl bg-lavender-soft px-5 py-4"
              >
                <span className="font-serif text-3xl font-medium text-gold md:text-4xl">
                  {point.index}
                </span>
                <span className="font-serif text-xl font-medium tracking-tight text-purple md:text-2xl">
                  {point.title}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
