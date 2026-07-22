"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

export function Campus() {
  const { openInvolve } = useInvolve();

  return (
    <section id="campus" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-purple/70">
              <Sparkle className="h-3.5 w-3.5" />
              Campus
            </p>
          </Reveal>
          <RevealText
            text={"Rooted at\nWestern."}
            className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl"
          />
          <Reveal delay={0.12}>
            <p className="mt-8 font-serif text-2xl italic text-ink">
              Western University
              <br />
              London, Ontario
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <button
              type="button"
              onClick={() => openInvolve()}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Find us on campus
              <span aria-hidden>→</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            <ImageOrPlaceholder
              src={null}
              alt="Western University campus"
              label="Campus · Western"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent p-6 pt-20">
              <p className="font-serif text-lg text-cream">London, ON</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-lavender">
                Western University
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
