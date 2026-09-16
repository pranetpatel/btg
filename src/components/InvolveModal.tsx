"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PURPOSE_LABEL,
  VOLUNTEER_INTERESTS,
  type InvolvePurpose,
  type VolunteerInterest,
} from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { submitInvolveSignup } from "@/lib/signups/actions";

type Step = "choose" | "details" | "confirmed";

const PATHS: { value: InvolvePurpose; label: string; blurb: string }[] = [
  {
    value: "volunteer",
    label: "Volunteer",
    blurb: "Kit builds, kindness drops, food bank shifts",
  },
  {
    value: "mentor",
    label: "Become a mentor",
    blurb: "Peer support for incoming students",
  },
  {
    value: "sponsor",
    label: "Sponsor the work",
    blurb: "Fund kits, projects & programs",
  },
  {
    value: "care",
    label: "Be The Good Care team",
    blurb: "Help build the caregiver app",
  },
  {
    value: "general",
    label: "Just say hi",
    blurb: "Tell us how you'd like to help",
  },
];

export function InvolveModal() {
  const { isOpen, closeInvolve, presetPurpose } = useInvolve();

  return (
    <AnimatePresence>
      {isOpen && (
        <InvolveFlow
          key={presetPurpose ?? "choose"}
          presetPurpose={presetPurpose}
          closeInvolve={closeInvolve}
        />
      )}
    </AnimatePresence>
  );
}

function InvolveFlow({
  presetPurpose,
  closeInvolve,
}: {
  presetPurpose: InvolvePurpose | null;
  closeInvolve: () => void;
}) {
  const [step, setStep] = useState<Step>(presetPurpose ? "details" : "choose");
  const [purpose, setPurpose] = useState<InvolvePurpose | null>(presetPurpose);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [westernStudent, setWesternStudent] = useState<boolean | null>(null);
  const [interests, setInterests] = useState<VolunteerInterest[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<"created" | "duplicate">(
    "created"
  );
  const [pending, startTransition] = useTransition();

  function toggleInterest(value: VolunteerInterest) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!purpose || pending) return;

    setFormError(null);
    startTransition(async () => {
      const result = await submitInvolveSignup({
        name,
        email,
        note,
        purpose,
        phone: purpose === "volunteer" ? phone : undefined,
        westernStudent: purpose === "volunteer" ? westernStudent : undefined,
        interests: purpose === "volunteer" ? interests : undefined,
      });

      if (!result.ok) {
        setFormError(result.error);
        return;
      }

      setConfirmStatus(result.status);
      setStep("confirmed");
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={closeInvolve}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-cream p-8 text-ink md:rounded-3xl md:p-10"
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow text-purple/70">Get involved</p>
          <button
            type="button"
            onClick={closeInvolve}
            className="text-sm font-medium uppercase tracking-widest text-purple/60 transition-colors hover:text-purple"
          >
            Close
          </button>
        </div>

        {step === "choose" && (
          <div className="mt-6">
            <h3 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Be the good with us.
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Pick a way in. We’ll take it from there.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {PATHS.map((path) => (
                <button
                  key={path.value}
                  type="button"
                  onClick={() => {
                    setPurpose(path.value);
                    setFormError(null);
                    setStep("details");
                  }}
                  className="group flex items-center justify-between rounded-2xl border border-purple/15 px-5 py-4 text-left transition-colors hover:border-purple hover:bg-purple hover:text-cream"
                >
                  <span>
                    <span className="font-medium">{path.label}</span>
                    <span className="mt-0.5 block text-sm text-ink/55 transition-colors group-hover:text-cream/70">
                      {path.blurb}
                    </span>
                  </span>
                  <span className="ml-4 text-lg opacity-40 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "details" && purpose && (
          <form className="mt-6" onSubmit={onSubmit}>
            <h3 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {PURPOSE_LABEL[purpose]}
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Leave your details. We’ll take it from here.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@uwo.ca"
                  className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
                />
              </Field>

              {purpose === "volunteer" && (
                <>
                  <Field label="Phone (optional)">
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="If a text is easier"
                      className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
                    />
                  </Field>

                  <fieldset>
                    <legend className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
                      Western student?
                    </legend>
                    <div className="flex gap-2">
                      <ChoiceChip
                        selected={westernStudent === true}
                        onClick={() =>
                          setWesternStudent((current) =>
                            current === true ? null : true
                          )
                        }
                      >
                        Yes
                      </ChoiceChip>
                      <ChoiceChip
                        selected={westernStudent === false}
                        onClick={() =>
                          setWesternStudent((current) =>
                            current === false ? null : false
                          )
                        }
                      >
                        No
                      </ChoiceChip>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
                      Ways you’d like to help
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {VOLUNTEER_INTERESTS.map((item) => (
                        <ChoiceChip
                          key={item.value}
                          selected={interests.includes(item.value)}
                          onClick={() => toggleInterest(item.value)}
                        >
                          {item.label}
                        </ChoiceChip>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              <Field label="Anything you'd like to add?">
                <textarea
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Optional note"
                  className="w-full resize-none rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
                />
              </Field>
            </div>

            {formError ? (
              <p className="mt-4 text-sm text-purple" role="alert">
                {formError}
              </p>
            ) : null}

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="w-1/3 rounded-full border border-purple/20 px-6 py-4 text-sm font-medium text-purple transition-colors hover:bg-purple/5"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={pending}
                className="flex-1 rounded-full bg-purple px-6 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending ? "Sending…" : "Send it"}
              </button>
            </div>
          </form>
        )}

        {step === "confirmed" && (
          <div className="mt-6 flex flex-col items-center py-6 text-center">
            <span className="text-4xl text-gold">✦</span>
            <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {confirmStatus === "duplicate"
                ? "You’re already on the list."
                : "Thanks for being the good."}
            </h3>
            <p className="mt-3 max-w-sm text-sm text-ink/70">
              {confirmStatus === "duplicate"
                ? "We already have you. We’ll be in touch — or DM us if you want to add something."
                : "We got it. We’ll be in touch. If it’s easier, you can also DM us."}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 rounded-full bg-purple px-8 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-90"
            >
              DM us {INSTAGRAM_HANDLE}
            </a>
            <button
              type="button"
              onClick={closeInvolve}
              className="mt-4 text-sm font-medium text-purple/60 underline underline-offset-4 transition-colors hover:text-purple"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        selected
          ? "border-purple bg-purple text-cream"
          : "border-purple/15 text-ink hover:border-purple"
      }`}
    >
      {children}
    </button>
  );
}
