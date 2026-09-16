"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInvolve } from "@/lib/involve-context";
import type { InvolvePurpose } from "@/lib/content";

const VALID_PURPOSES = new Set<InvolvePurpose>([
  "general",
  "volunteer",
  "mentor",
  "sponsor",
  "care",
]);

function InvolveAutoOpenInner() {
  const params = useSearchParams();
  const { openInvolve } = useInvolve();

  useEffect(() => {
    const raw = params.get("involve");
    if (raw && VALID_PURPOSES.has(raw as InvolvePurpose)) {
      openInvolve(raw as InvolvePurpose);
    }
    // Only ever auto-open once, off the URL present on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function InvolveAutoOpen() {
  return (
    <Suspense fallback={null}>
      <InvolveAutoOpenInner />
    </Suspense>
  );
}
