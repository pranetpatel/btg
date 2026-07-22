"use client";

import { motion } from "framer-motion";
import {
  INVOLVE_TAG_STYLES,
  INVOLVE_WAYS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

export function Involved() {
  const { openInvolve } = useInvolve();

  return (
    <section
      id="involved"
      className="bg-purple-deep px-6 py-28 text-cream md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-lavender">
            <Sparkle className="h-3.5 w-3.5" />
            Get involved
          </p>
        </Reveal>
        <RevealText
          text={"Ways to help."}
          className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />

        {/* Chip legend */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {(["Drop-in", "Ongoing", "Coming soon", "Partner"] as const).map(
              (tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-2 ${INVOLVE_TAG_STYLES[tag]}`}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {INVOLVE_WAYS.map((way, i) => (
            <motion.button
              key={way.title}
              type="button"
              onClick={() => openInvolve(way.purpose)}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05 }}
              className="group flex flex-col gap-4 rounded-3xl border border-cream/12 bg-purple p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-cream/30"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${INVOLVE_TAG_STYLES[way.tag]}`}
                >
                  {way.tag}
                </span>
                <span className="text-xs uppercase tracking-widest text-lavender">
                  {way.meta}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-3xl font-medium tracking-tight">
                {way.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-cream">
                Count me in
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </motion.button>
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
