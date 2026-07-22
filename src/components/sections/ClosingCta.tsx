"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { BrandTicker } from "@/components/ui/BrandTicker";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";

export function ClosingCta() {
  const { openInvolve } = useInvolve();

  return (
    <section className="bg-cream text-ink">
      <div className="px-6 pt-28 md:px-10 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-8 w-fit"
            >
              <Image
                src="/logoblack.png"
                alt="Be The Good"
                width={96}
                height={96}
                className="h-20 w-20 object-contain md:h-24 md:w-24"
              />
            </motion.div>
          </Reveal>

          <RevealText
            text={"Join the movement."}
            className="justify-center font-serif text-4xl font-medium leading-[1.0] tracking-tight md:text-7xl"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-lg leading-relaxed text-ink/70">
              Your time and sponsorship put food and hygiene kits into
              circulation, fuel campus kindness projects, and help student-led
              programs grow beyond what a small team can build alone.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openInvolve()}
                className="rounded-full bg-purple px-8 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-90"
              >
                Get involved
              </button>
              <button
                type="button"
                onClick={() => openInvolve("sponsor")}
                className="rounded-full border border-ink px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Sponsor the work
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-4 text-sm font-medium text-purple underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <BrandTicker
        reverse
        className="mt-24 border-y border-purple/15 py-6 text-purple/25"
      />
    </section>
  );
}
