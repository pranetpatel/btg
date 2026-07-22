"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { useInvolve } from "@/lib/involve-context";

/** Version B campus: purple panel wrapping a rounded portrait slot. */
export function CampusV2() {
  const { openInvolve } = useInvolve();

  return (
    <section id="campus" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[2.5rem] bg-purple p-6 text-cream md:grid-cols-2 md:items-center md:p-10">
        <div className="px-2 md:px-6">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-lavender">
              <Sparkle className="h-3.5 w-3.5" />
              Campus
            </p>
          </Reveal>
          <RevealText
            text={"Rooted at\nWestern."}
            className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
          />
          <Reveal delay={0.12}>
            <p className="mt-7 font-serif text-2xl italic text-lavender">
              Western University
              <br />
              London, Ontario
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <button
              type="button"
              onClick={() => openInvolve()}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-purple transition-opacity hover:opacity-90"
            >
              Find us on campus
              <span aria-hidden>→</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            {/* Placeholder until a campus photo lands. Photos live only in the
                hero grid; placeholder style stays constant across the site. */}
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
