"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAPSULES, HOUSE_RULES, type Capsule } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { useReservation } from "@/lib/reservation-context";

export function Houses() {
  const [activeCapsule, setActiveCapsule] = useState<Capsule | null>(null);
  const { openReservation } = useReservation();

  return (
    <section id="houses" className="bg-espresso px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-taupe">Houses</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Choose the one you like best
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-taupe">
            You can choose one of three premium capsule houses in our offer.
            Each of our capsules provides the highest quality and meets the
            standards adjusted to your needs. Choose the one you like.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-14 text-sm font-medium uppercase tracking-widest text-taupe">
            All Capsules® houses—has built based on the same rules:
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className="mt-6 flex flex-wrap gap-3">
            {HOUSE_RULES.map((rule) => (
              <li
                key={rule}
                className="rounded-full border border-taupe/40 px-4 py-2 text-sm text-cream"
              >
                {rule}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {CAPSULES.map((capsule, i) => (
            <Reveal key={capsule.slug} delay={0.1 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-espresso-deep">
                <div className="relative h-72 w-full overflow-hidden">
                  <ImageOrPlaceholder
                    src={capsule.image}
                    alt={capsule.name}
                    label={capsule.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-xl font-medium tracking-tight">
                    {capsule.name}
                  </h3>
                  <p className="flex-1 text-sm text-taupe">
                    {capsule.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCapsule(capsule)}
                    className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-cream underline underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    Details
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 md:items-center"
            onClick={() => setActiveCapsule(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream p-8 text-ink md:rounded-3xl md:p-12"
            >
              <button
                type="button"
                onClick={() => setActiveCapsule(null)}
                className="absolute right-6 top-6 text-sm font-medium uppercase tracking-widest text-espresso/60"
              >
                Close
              </button>

              <p className="eyebrow text-espresso/60">
                ({activeCapsule.name})
              </p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                Details
              </h3>
              <p className="mt-4 max-w-md text-espresso">
                {activeCapsule.description}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
                <Spec label="Square footage" value={activeCapsule.squareFootage} />
                <Spec label="Bed" value={activeCapsule.bed} />
                <Spec
                  label="Shifting Window"
                  value={activeCapsule.shiftingWindow ? "Available" : "None"}
                />
                <Spec
                  label="Air Condition"
                  value={activeCapsule.airCondition ? "Available" : "None"}
                />
                <Spec
                  label="Jacuzzi"
                  value={activeCapsule.jacuzzi ? "Available" : "None"}
                />
                <Spec
                  label="Terrace"
                  value={activeCapsule.terrace ? "Available" : "None"}
                />
              </dl>

              <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-8">
                <div>
                  <p className="text-sm text-espresso/60">Cost</p>
                  <p className="text-2xl font-medium tracking-tight">
                    {activeCapsule.pricePerNight} USD{" "}
                    <span className="text-sm font-normal text-espresso/60">
                      / Night
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    openReservation(activeCapsule.slug);
                    setActiveCapsule(null);
                  }}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-80"
                >
                  Ready to reserve?
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-espresso/50">
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
