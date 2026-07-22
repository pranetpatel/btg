"use client";

import { VersionSwitch } from "@/components/ui/VersionSwitch";

/**
 * Version B header: A / B / C switch only — matches Version A and C.
 */
export function HeaderV2() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-end px-4 py-3 text-purple md:px-6 md:py-4">
      <VersionSwitch current="B" />
    </header>
  );
}
