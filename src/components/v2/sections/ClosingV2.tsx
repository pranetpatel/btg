"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { BrandTicker } from "@/components/ui/BrandTicker";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGO } from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

/** Version B closing: purple ground, script tagline, brand ticker. */
export function ClosingV2() {
  const { openInvolve } = useInvolve();

  return (
    <section className="bg-purple text-cream">
      <div className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-cream/10 md:h-28 md:w-28"
            >
              <Image
                src={LOGO}
                alt="Be The Good"
                width={112}
                height={112}
                className="h-16 w-16 object-contain md:h-20 md:w-20"
              />
            </motion.div>
          </Reveal>

          <RevealText
            text={"Join the movement."}
            className="justify-center font-serif text-4xl font-medium leading-[1.0] tracking-tight md:text-7xl"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 font-script text-4xl text-gold md:text-5xl">
              Even a few smiles count.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openInvolve()}
                className="rounded-full bg-cream px-8 py-4 text-sm font-medium text-purple transition-opacity hover:opacity-90"
              >
                Get involved
              </button>
              <button
                type="button"
                onClick={() => openInvolve("sponsor")}
                className="rounded-full border border-cream/50 px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Sponsor the work
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-4 text-sm font-medium text-lavender underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <BrandTicker
        reverse
        className="mt-20 border-y border-cream/15 py-6 text-cream/25"
      />
    </section>
  );
}
