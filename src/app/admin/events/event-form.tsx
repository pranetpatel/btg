"use client";

import { useActionState } from "react";
import { createEventAction, type CreateEventFormState } from "./actions";

export function EventForm() {
  const [state, action, pending] = useActionState<CreateEventFormState, FormData>(
    createEventAction,
    null
  );

  return (
    <form action={action} className="mt-4 flex flex-wrap items-end gap-3">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Title
        </span>
        <input
          type="text"
          name="title"
          required
          placeholder="Kit build night"
          className="w-56 rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Date (optional)
        </span>
        <input
          type="date"
          name="eventDate"
          className="rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-purple"
        />
      </label>
      <label className="block flex-1">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Description (optional)
        </span>
        <input
          type="text"
          name="description"
          placeholder="What happened"
          className="w-full min-w-[12rem] rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-purple px-6 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Create event"}
      </button>
      {state?.error ? (
        <p className="w-full text-sm text-purple" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
