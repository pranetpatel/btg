"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAPSULES, type Capsule } from "@/lib/content";
import { useReservation } from "@/lib/reservation-context";

type Step = "capsule" | "dates" | "summary" | "confirmed";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ReservationModal() {
  const { isOpen, closeReservation, presetCapsule } = useReservation();
  const [step, setStep] = useState<Step>("capsule");
  const [selectedSlug, setSelectedSlug] = useState<Capsule["slug"] | null>(
    null
  );
  const [nights, setNights] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setSelectedSlug(presetCapsule);
      setStep(presetCapsule ? "dates" : "capsule");
      setNights(3);
    }
  }, [isOpen, presetCapsule]);

  const selectedCapsule = useMemo(
    () => CAPSULES.find((c) => c.slug === selectedSlug) ?? null,
    [selectedSlug]
  );

  const checkIn = useMemo(() => addDays(new Date(), 14), []);
  const checkOut = useMemo(() => addDays(checkIn, nights), [checkIn, nights]);
  const totalCost = (selectedCapsule?.pricePerNight ?? 0) * nights;

  function handleClose() {
    closeReservation();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 md:items-center md:p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-cream p-8 text-ink md:rounded-3xl md:p-10"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow text-espresso/60">Reserve</p>
              <button
                type="button"
                onClick={handleClose}
                className="text-sm font-medium uppercase tracking-widest text-espresso/60"
              >
                Close
              </button>
            </div>

            {step === "capsule" && (
              <div className="mt-6">
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Make it memorable and reserve one of our—Capsules®
                </h3>
                <p className="mt-3 text-sm text-espresso">
                  Ready to start your journey to a desert adventure? Secure
                  your capsule by filling out the reservation form. We hope
                  to see you soon!
                </p>

                <p className="mt-8 text-sm font-medium text-espresso/70">
                  (1) Which capsule would you like to reserve?
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {CAPSULES.map((capsule) => (
                    <button
                      key={capsule.slug}
                      type="button"
                      onClick={() => setSelectedSlug(capsule.slug)}
                      className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                        selectedSlug === capsule.slug
                          ? "border-ink bg-ink text-cream"
                          : "border-ink/15 hover:border-ink/40"
                      }`}
                    >
                      <span className="font-medium">{capsule.name}</span>
                      <span
                        className={
                          selectedSlug === capsule.slug
                            ? "text-cream/70"
                            : "text-espresso/60"
                        }
                      >
                        {capsule.pricePerNight} USD / night
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!selectedSlug}
                  onClick={() => setStep("dates")}
                  className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-sm font-medium text-cream transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            )}

            {step === "dates" && selectedCapsule && (
              <div className="mt-6">
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                  How long would you like to stay?
                </h3>
                <p className="mt-3 text-sm text-espresso">
                  (2) Choose the length of your stay in the{" "}
                  {selectedCapsule.name}.
                </p>

                <div className="mt-8 flex items-center justify-between rounded-2xl border border-ink/15 px-5 py-4">
                  <span className="text-sm text-espresso/70">Stay</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-lg"
                    >
                      −
                    </button>
                    <span className="w-20 text-center font-medium">
                      {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(14, n + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm text-espresso/70">
                  {formatDate(checkIn)} — {formatDate(checkOut)}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
                  <span className="text-sm text-espresso/70">Cost</span>
                  <span className="text-xl font-medium">
                    {totalCost} USD
                  </span>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("capsule")}
                    className="w-1/3 rounded-full border border-ink/20 px-6 py-4 text-sm font-medium text-ink"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("summary")}
                    className="flex-1 rounded-full bg-ink px-6 py-4 text-sm font-medium text-cream"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === "summary" && selectedCapsule && (
              <div className="mt-6">
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Review your reservation
                </h3>

                <dl className="mt-8 flex flex-col gap-4 rounded-2xl border border-ink/15 p-5">
                  <Row label="Capsule" value={selectedCapsule.name} />
                  <Row
                    label="Dates"
                    value={`${formatDate(checkIn)} — ${formatDate(checkOut)}`}
                  />
                  <Row
                    label="Length of stay"
                    value={`${nights} ${nights === 1 ? "night" : "nights"}`}
                  />
                  <Row
                    label="Total cost"
                    value={`${totalCost} USD`}
                    emphasis
                  />
                </dl>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("dates")}
                    className="w-1/3 rounded-full border border-ink/20 px-6 py-4 text-sm font-medium text-ink"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("confirmed")}
                    className="flex-1 rounded-full bg-ink px-6 py-4 text-sm font-medium text-cream"
                  >
                    Confirm reservation
                  </button>
                </div>
              </div>
            )}

            {step === "confirmed" && selectedCapsule && (
              <div className="mt-6 flex flex-col items-center py-6 text-center">
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Request received
                </h3>
                <p className="mt-3 max-w-sm text-sm text-espresso">
                  Thank you for your interest in the {selectedCapsule.name}.
                  This concept build doesn&rsquo;t take real bookings, but a
                  live version would confirm your dates here.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 rounded-full bg-ink px-8 py-4 text-sm font-medium text-cream"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-espresso/60">{label}</span>
      <span className={emphasis ? "text-lg font-medium" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
