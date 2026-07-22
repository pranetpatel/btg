"use client";

import { VersionSwitch } from "@/components/ui/VersionSwitch";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-end px-4 py-3 text-cream md:px-10 md:py-5">
      <VersionSwitch current="A" />
    </header>
  );
}
