"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PILLARS, VALUES, type Pillar } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

export function Pillars() {
  const [active, setActive] = useState<Pillar | null>(null);
  const { openInvolve } = useInvolve();

  return (
    <section
      id="pillars"
      className="bg-purple px-6 py-28 text-cream md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-lavender">
            <Sparkle className="h-3.5 w-3.5" />
            What we do
          </p>
        </Reveal>

        <RevealText
          text={"Three streams,\none movement."}
          className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lavender">
            Student-led good, made practical — on campus and beyond. Each stream
            turns kindness into something people can actually feel.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-12 flex flex-wrap gap-3">
            {VALUES.map((value) => (
              <li
                key={value}
                className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream/85"
              >
                {value}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-purple-deep transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <ImageOrPlaceholder
                  src={pillar.image}
                  alt={pillar.name}
                  label={pillar.name}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-purple">
                  {pillar.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-serif text-2xl font-medium tracking-tight">
                  {pillar.name}
                </h3>
                <p className="text-sm font-medium text-gold">
                  {pillar.tagline}
                </p>
                <p className="flex-1 text-sm text-lavender">
                  {pillar.description}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(pillar)}
                  className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-cream underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Learn more
                  <span aria-hidden>→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 backdrop-blur-sm md:items-center"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream p-8 text-ink md:rounded-3xl md:p-12"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-6 top-6 text-sm font-medium uppercase tracking-widest text-purple/60 transition-colors hover:text-purple"
              >
                Close
              </button>

              <p className="eyebrow text-purple/70">({active.status})</p>
              <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-4xl">
                {active.name}
              </h3>
              <p className="mt-2 font-medium text-gold">{active.tagline}</p>
              <p className="mt-5 max-w-lg leading-relaxed text-ink/75">
                {active.detail}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8">
                {active.points.map((p) => (
                  <div key={p.label}>
                    <dt className="text-xs uppercase tracking-widest text-ink/50">
                      {p.label}
                    </dt>
                    <dd className="mt-1 font-medium">{p.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
                <button
                  type="button"
                  onClick={() => {
                    openInvolve(active.ctaPurpose);
                    setActive(null);
                  }}
                  className="rounded-full bg-purple px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
                >
                  {active.ctaLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
