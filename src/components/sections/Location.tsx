"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/lib/reservation-context";

export function Location() {
  const { openReservation } = useReservation();

  return (
    <section className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-espresso/60">Location</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              Closer than you think
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-espresso">
              Our Capsules® are located near Los Angeles with easy access by
              road.
            </p>
            <p className="mt-2 font-medium text-ink">
              Maricopa, CA 93252
              <br />
              United States
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => openReservation()}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Ready to reserve?
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-espresso">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,theme(colors.taupe)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.taupe)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="flex h-4 w-4 animate-ping rounded-full bg-cream/60" />
              <span className="-mt-4 h-3 w-3 rounded-full bg-cream" />
              <span className="mt-4 text-xs uppercase tracking-widest text-cream/80">
                Maricopa, CA
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
