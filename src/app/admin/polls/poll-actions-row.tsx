"use client";

import { useTransition } from "react";
import { setPollClosedAction, deletePollAction } from "./actions";

export function PollActionsRow({ id, closed }: { id: string; closed: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => setPollClosedAction(id, !closed))}
        className="rounded-full border border-purple/20 px-4 py-2 text-xs font-medium text-purple transition-colors hover:bg-purple/5 disabled:opacity-50"
      >
        {closed ? "Reopen" : "Close"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!confirm("Delete this poll and its responses?")) return;
          startTransition(() => deletePollAction(id));
        }}
        className="text-xs font-medium text-purple/60 underline underline-offset-2 transition-colors hover:text-purple disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
