"use client";

import { useTransition } from "react";
import { setAttendance } from "@/lib/events/actions";

export function AttendanceToggle({
  eventId,
  signupId,
  checked,
}: {
  eventId: string;
  signupId: string;
  checked: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      defaultChecked={checked}
      disabled={pending}
      onChange={(event) => {
        const attending = event.target.checked;
        startTransition(() => setAttendance(eventId, signupId, attending));
      }}
      className="h-4 w-4 rounded border-purple/30 text-purple focus:ring-purple/40"
    />
  );
}
