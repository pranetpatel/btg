"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { InvolvePurpose } from "./content";

type InvolveContextValue = {
  isOpen: boolean;
  openInvolve: (purpose?: InvolvePurpose) => void;
  closeInvolve: () => void;
  presetPurpose: InvolvePurpose | null;
};

const InvolveContext = createContext<InvolveContextValue | null>(null);

export function InvolveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetPurpose, setPresetPurpose] = useState<InvolvePurpose | null>(
    null
  );

  const value = useMemo(
    () => ({
      isOpen,
      openInvolve: (purpose?: InvolvePurpose) => {
        setPresetPurpose(purpose ?? null);
        setIsOpen(true);
      },
      closeInvolve: () => setIsOpen(false),
      presetPurpose,
    }),
    [isOpen, presetPurpose]
  );

  return (
    <InvolveContext.Provider value={value}>
      {children}
    </InvolveContext.Provider>
  );
}

export function useInvolve() {
  const ctx = useContext(InvolveContext);
  if (!ctx) {
    throw new Error("useInvolve must be used within an InvolveProvider");
  }
  return ctx;
}
