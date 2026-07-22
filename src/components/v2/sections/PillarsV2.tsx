"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

/** Version B pillars: three soft cards, photo-led, details inline (no modal). */
export function PillarsV2() {
  const { openInvolve } = useInvolve();

  return (
    <section id="pillars" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-1.5 text-purple">
            <Sparkle className="h-3.5 w-3.5" />
            What we do
          </p>
        </Reveal>
        <RevealText
          text={"Three ways\nwe show up."}
          className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-tight text-purple md:text-6xl"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-lavender-soft transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="relative m-3 h-56 overflow-hidden rounded-3xl">
                {/* Placeholder until real program shots land (constant across
                    the site). Photos currently live only in the hero grid. */}
                <ImageOrPlaceholder
                  src={null}
                  alt={pillar.name}
                  label={pillar.name}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-purple">
                  {pillar.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-2">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-purple">
                  {pillar.name}
                </h3>
                <p className="font-medium text-ink/70">{pillar.blurb}</p>
                <p className="text-sm leading-relaxed text-ink/60">
                  {pillar.detail}
                </p>

                <dl className="mt-2 flex flex-wrap gap-2">
                  {pillar.points.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-full bg-cream px-3 py-1.5 text-xs"
                    >
                      <dt className="inline text-purple/50">{p.label}: </dt>
                      <dd className="inline font-medium text-purple">
                        {p.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => openInvolve(pillar.ctaPurpose)}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
                >
                  {pillar.ctaLabel}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
