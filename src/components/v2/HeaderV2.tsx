"use client";

import { VersionSwitch } from "@/components/ui/VersionSwitch";

/**
 * Version B header: a slim sticky pill bar holding only the A / B / C switch.
 * No logo or CTAs here — the hero carries the branding and actions.
 */
export function HeaderV2() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-end px-4 py-3 md:px-6 md:py-4">
      <div className="inline-flex items-center rounded-full border border-purple/10 bg-cream/85 px-2 py-1 text-purple shadow-[0_10px_40px_-20px_rgba(79,38,131,0.55)] backdrop-blur-md">
        <VersionSwitch current="B" />
      </div>
    </header>
  );
}
