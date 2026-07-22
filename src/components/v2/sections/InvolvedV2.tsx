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
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { useInvolve } from "@/lib/involve-context";

/** Version B get involved: gold-accented pill cards on a lavender panel. */
export function InvolvedV2() {
  const { openInvolve } = useInvolve();

  return (
    <section id="involved" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-lavender px-6 py-16 md:px-16 md:py-20">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-1.5 text-purple">
            <Sparkle className="h-3.5 w-3.5" />
            Get involved
          </p>
        </Reveal>
        <RevealText
          text={"Ways to help."}
          className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-tight text-purple md:text-6xl"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {INVOLVE_WAYS.map((way, i) => (
            <motion.button
              key={way.title}
              type="button"
              onClick={() => openInvolve(way.purpose)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
              className="group flex flex-col gap-4 rounded-[1.75rem] bg-cream p-7 text-left transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${INVOLVE_TAG_STYLES[way.tag]}`}
                >
                  {way.tag}
                </span>
                <span className="text-xs uppercase tracking-widest text-purple/50">
                  {way.meta}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-medium tracking-tight text-purple">
                {way.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-purple">
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
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-purple underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            <InstagramIcon className="h-4 w-4" />
            Or just DM us {INSTAGRAM_HANDLE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
