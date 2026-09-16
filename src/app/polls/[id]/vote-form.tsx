"use client";

import { useActionState } from "react";
import { voteAction, type VoteState } from "./actions";

export function VoteForm({ pollId, options }: { pollId: string; options: string[] }) {
  const boundAction = voteAction.bind(null, pollId);
  const [state, action, pending] = useActionState<VoteState, FormData>(
    boundAction,
    null
  );

  if (state && "ok" in state) {
    return (
      <div className="mt-8 flex flex-col items-center py-6 text-center">
        <span className="text-4xl text-gold">✦</span>
        <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight">
          Thanks — your vote is in.
        </h2>
      </div>
    );
  }

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        {options.map((option, i) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 transition-colors has-[:checked]:border-purple"
          >
            <input
              type="radio"
              name="option"
              value={i}
              required
              className="h-4 w-4 border-purple/30 text-purple focus:ring-purple/40"
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Name (optional)
        </span>
        <input
          type="text"
          name="name"
          placeholder="So we know who said what"
          className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Email (optional)
        </span>
        <input
          type="email"
          name="email"
          placeholder="you@uwo.ca"
          className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>

      {state && "error" in state ? (
        <p className="text-sm text-purple" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-purple px-6 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Vote"}
      </button>
    </form>
  );
}
