"use client";

import { useActionState } from "react";
import { PURPOSE_LABEL, type InvolvePurpose } from "@/lib/content";
import { addPersonAdmin, type AddPersonState } from "./actions";

const PURPOSES = Object.keys(PURPOSE_LABEL) as InvolvePurpose[];

export function AddPersonForm() {
  const [state, action, pending] = useActionState<AddPersonState, FormData>(
    addPersonAdmin,
    null
  );

  return (
    <form action={action} className="mt-4 flex flex-wrap items-end gap-3">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Name
        </span>
        <input
          type="text"
          name="name"
          required
          placeholder="Full name"
          className="w-44 rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Instagram
        </span>
        <input
          type="text"
          name="instagram"
          placeholder="handle"
          className="w-36 rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Email (optional)
        </span>
        <input
          type="email"
          name="email"
          placeholder="Leave blank if unknown"
          className="w-52 rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Path
        </span>
        <select
          name="purpose"
          defaultValue="volunteer"
          className="w-40 rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-purple"
        >
          {PURPOSES.map((value) => (
            <option key={value} value={value}>
              {PURPOSE_LABEL[value]}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-purple px-6 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add person"}
      </button>
      {state?.error ? (
        <p className="w-full text-sm text-purple" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
