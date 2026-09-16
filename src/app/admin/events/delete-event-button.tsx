"use client";

import { useTransition } from "react";
import { deleteEventAction } from "./actions";

export function DeleteEventButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this event and its attendance records?")) return;
        startTransition(() => deleteEventAction(id));
      }}
      className="text-xs font-medium text-purple/60 underline underline-offset-2 transition-colors hover:text-purple disabled:opacity-50"
    >
      Delete
    </button>
  );
}
