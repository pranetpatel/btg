"use client";

import {
  CAMPUS_MOMENT,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  KINDNESS_MOMENT,
  VALUES,
} from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

/** Version B "who we are": statement panel + campus / kindness photos. */
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

        <div className="mt-12 grid gap-4 sm:grid-cols-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:col-span-3">
            <a
              href={CAMPUS_MOMENT.href}
              target="_blank"
              rel="noreferrer"
              className="group absolute inset-0 block"
              aria-label="Campus moment on Instagram"
            >
              <ImageOrPlaceholder
                src={CAMPUS_MOMENT.image}
                alt={CAMPUS_MOMENT.alt}
                label="Campus moment"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                <InstagramIcon className="h-3.5 w-3.5" />
                Campus moment
              </span>
            </a>
          </Reveal>
          <Reveal
            delay={0.08}
            className="relative aspect-[4/5] self-end overflow-hidden rounded-[1.75rem] sm:col-span-2"
          >
            <a
              href={KINDNESS_MOMENT.href}
              target="_blank"
              rel="noreferrer"
              className="group absolute inset-0 block"
              aria-label="Kindness note on Instagram"
            >
              <ImageOrPlaceholder
                src={KINDNESS_MOMENT.image}
                alt={KINDNESS_MOMENT.alt}
                label="Kindness note"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                <InstagramIcon className="h-3.5 w-3.5" />
                Kindness note
              </span>
            </a>
          </Reveal>
        </div>

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
