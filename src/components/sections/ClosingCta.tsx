"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/lib/reservation-context";

export function ClosingCta() {
  const { openReservation } = useReservation();
  const tickerItems = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="mx-6 text-4xl font-medium tracking-tight md:text-6xl">
      Book your capsule—
    </span>
  ));

  return (
    <section className="bg-cream text-ink">
      <div className="px-6 pt-28 md:px-10 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-4xl font-medium leading-[0.95] tracking-tight md:text-7xl">
              Closer to
              <br />
              Nature—Closer
              <br />
              to Yourself
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-md text-espresso">
              Interested in an amazing adventure? Reserve one of our
              Capsules®.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => openReservation()}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-80"
            >
              Reserve one of our Capsules®
            </button>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 overflow-hidden border-y border-ink/10 py-6">
        <div className="flex w-max animate-marquee-reverse whitespace-nowrap text-espresso/30">
          {tickerItems}
          {tickerItems}
        </div>
      </div>
    </section>
  );
}
