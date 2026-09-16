"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createPollAction, type CreatePollFormState } from "./actions";

export function PollForm() {
  const [state, action, pending] = useActionState<CreatePollFormState, FormData>(
    createPollAction,
    null
  );
  const [optionCount, setOptionCount] = useState(2);

  return (
    <form action={action} className="mt-4 flex flex-col gap-3">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Question
        </span>
        <input
          type="text"
          name="question"
          required
          placeholder="What night works best for the next kit build?"
          className="w-full rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>

      <div className="flex flex-col gap-2">
        {Array.from({ length: optionCount }).map((_, i) => (
          <input
            key={i}
            type="text"
            name="option"
            required={i < 2}
            placeholder={`Option ${i + 1}`}
            className="w-full max-w-md rounded-2xl border border-purple/15 bg-white/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {optionCount < 10 ? (
          <button
            type="button"
            onClick={() => setOptionCount((n) => n + 1)}
            className="text-sm font-medium text-purple underline underline-offset-2"
          >
            + Add option
          </button>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="ml-auto rounded-full bg-purple px-6 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creating…" : "Create poll"}
        </button>
      </div>

      {state?.error ? (
        <p className="text-sm text-purple" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
