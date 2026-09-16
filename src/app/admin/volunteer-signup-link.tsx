"use client";

import { CopyButton } from "@/components/CopyButton";

export function VolunteerSignupLink() {
  return (
    <CopyButton
      label="Copy volunteer signup link"
      getText={() =>
        typeof window === "undefined"
          ? ""
          : `${window.location.origin}/?involve=volunteer`
      }
    />
  );
}
