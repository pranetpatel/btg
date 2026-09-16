"use client";

import { CopyButton } from "@/components/CopyButton";

export function PollLink({ id }: { id: string }) {
  return (
    <CopyButton
      label="Copy voting link"
      getText={() =>
        typeof window === "undefined" ? "" : `${window.location.origin}/polls/${id}`
      }
    />
  );
}
