"use client";

import { INSTAGRAM_HANDLE, INSTAGRAM_URL, VALUES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Sparkle } from "@/components/ui/Sparkle";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

/** Version B "who we are": a warm lavender statement panel, founder pill. */
export function IntroV2() {
  return (
    <section id="about" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-lavender-soft px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-1.5 text-purple">
            <Sparkle className="h-3.5 w-3.5" />
            Who we are
          </p>
        </Reveal>

        <RevealText
          text={"We just do\nthe good."}
          className="mt-7 font-serif text-5xl font-medium leading-[0.98] tracking-tight text-purple md:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-md text-lg text-ink/70">
            Notes, kits, mentors, and an app for caregivers.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {VALUES.map((value) => (
              <span
                key={value}
                className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-purple"
              >
                {value}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 border-t border-purple/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <div className="inline-flex items-center gap-3">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-widest text-purple">
                Founder
              </span>
              <p className="font-serif text-lg italic text-ink">
                Arpi, Health Sciences.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-90"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow {INSTAGRAM_HANDLE}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
