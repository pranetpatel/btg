"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Capsule } from "./content";

type ReservationContextValue = {
  isOpen: boolean;
  openReservation: (capsuleSlug?: Capsule["slug"]) => void;
  closeReservation: () => void;
  presetCapsule: Capsule["slug"] | null;
};

const ReservationContext = createContext<ReservationContextValue | null>(
  null
);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetCapsule, setPresetCapsule] = useState<
    Capsule["slug"] | null
  >(null);

  const value = useMemo(
    () => ({
      isOpen,
      openReservation: (capsuleSlug?: Capsule["slug"]) => {
        setPresetCapsule(capsuleSlug ?? null);
        setIsOpen(true);
      },
      closeReservation: () => setIsOpen(false),
      presetCapsule,
    }),
    [isOpen, presetCapsule]
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error(
      "useReservation must be used within a ReservationProvider"
    );
  }
  return ctx;
}
