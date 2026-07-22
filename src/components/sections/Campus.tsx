"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
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
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-purple via-purple-deep to-ink">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,theme(colors.lavender)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.lavender)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_50%_45%,rgba(201,184,232,0.4)_0%,transparent_55%)]" />
            <Sparkle className="absolute left-8 top-10 h-5 w-5" twinkle />
            <Sparkle className="absolute right-10 bottom-14 h-4 w-4" twinkle />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="flex h-4 w-4 animate-ping rounded-full bg-cream/60" />
              <span className="-mt-4 h-3 w-3 rounded-full bg-cream" />
              <span className="mt-4 font-serif text-lg text-cream">
                London, ON
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-lavender">
                Western University
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
