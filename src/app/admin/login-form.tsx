"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, null);

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink/50">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="Team password"
          className="w-full rounded-2xl border border-purple/15 bg-white/60 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple"
        />
      </label>
      {state?.error ? (
        <p className="text-sm text-purple" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-purple px-6 py-4 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Open signups"}
      </button>
    </form>
  );
}
