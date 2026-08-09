"use client";

import Image from "next/image";
import { SPONSORS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Sparkle } from "@/components/ui/Sparkle";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { useInvolve } from "@/lib/involve-context";

export function Sponsors() {
  const { openInvolve } = useInvolve();

  return (
    <section
      id="sponsors"
      data-nav-theme="light"
      className="bg-lavender-soft px-6 py-28 text-ink md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-purple/70">
            <Sparkle className="h-3.5 w-3.5" />
            Sponsors
          </p>
        </Reveal>
        <RevealText
          text={"Backed by\ngood people."}
          className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md font-serif text-xl italic text-ink/70">
            Kits and campus projects run on partners like these.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SPONSORS.map((sponsor, i) => (
            <Reveal key={sponsor.name} delay={0.1 + i * 0.08}>
              <div className="flex h-full flex-col gap-6 rounded-3xl bg-cream p-8 md:p-10">
                <div className="flex min-h-24 items-center">
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={220}
                      height={96}
                      className="h-20 w-auto object-contain object-left"
                    />
                  ) : (
                    <p className="font-serif text-3xl font-medium leading-tight tracking-tight text-purple md:text-4xl">
                      {sponsor.name}
                    </p>
                  )}
                </div>

                <p className="text-lg text-ink/70">{sponsor.blurb}</p>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
                  >
                    {sponsor.websiteLabel}
                    <span aria-hidden>↗</span>
                  </a>
                  <a
                    href={sponsor.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-purple/25 px-5 py-2.5 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-cream"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    {sponsor.instagramHandle}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Open slot. Doubles as the sponsor CTA until more partners land. */}
          <Reveal delay={0.2 + SPONSORS.length * 0.08}>
            <button
              type="button"
              onClick={() => openInvolve("sponsor")}
              className="group flex h-full w-full flex-col justify-between gap-6 rounded-3xl border border-dashed border-purple/30 p-8 text-left transition-colors hover:border-purple/60 hover:bg-cream/60 md:p-10"
            >
              <p className="font-serif text-3xl font-medium leading-tight tracking-tight text-purple/50 md:text-4xl">
                Your name here.
              </p>
              <p className="text-lg text-ink/60">
                Fund a round of care packages and we will say it loud.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-purple">
                Sponsor the work
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
