"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { useReservation } from "@/lib/reservation-context";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openReservation } = useReservation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 md:py-6 mix-blend-difference text-cream">
        <a href="#welcome" className="text-lg font-semibold tracking-tight">
          Capsules®
        </a>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => openReservation()}
            className="hidden md:inline-flex items-center rounded-full border border-current px-5 py-2 text-sm font-medium transition-opacity hover:opacity-70"
          >
            Reserve
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-sm font-medium uppercase tracking-widest"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-ink text-cream"
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
              <span className="text-lg font-semibold tracking-tight">
                Capsules®
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-widest"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-3 px-6 md:px-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="text-4xl md:text-6xl font-medium tracking-tight text-taupe transition-colors hover:text-cream"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 py-8 md:px-10">
              <p className="max-w-md text-sm text-taupe">
                Closer to Nature—Closer to Yourself.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
