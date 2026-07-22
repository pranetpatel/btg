"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGO, NAV_LINKS } from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { Sparkle } from "@/components/ui/Sparkle";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { VersionSwitch } from "@/components/ui/VersionSwitch";

/**
 * Version B header: softer, social-first. Floating cream pill bar on a lavender
 * ground rather than the mix-blend bar used on Version A.
 */
export function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openInvolve } = useInvolve();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6 md:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-purple/10 bg-cream/85 px-4 py-2 text-ink shadow-[0_10px_40px_-20px_rgba(79,38,131,0.55)] backdrop-blur-md md:px-5">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-purple md:h-11 md:w-11">
              <Image
                src={LOGO}
                alt="Be The Good"
                width={44}
                height={44}
                className="h-8 w-8 object-contain md:h-9 md:w-9"
                priority
              />
            </span>
            <span className="font-serif text-lg font-medium tracking-tight text-purple">
              Be The Good
            </span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-purple">
              <VersionSwitch current="B" />
            </span>
            <button
              type="button"
              onClick={() => openInvolve()}
              className="hidden items-center rounded-full bg-purple px-5 py-2 text-sm font-medium text-cream transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Get involved
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-purple/25 text-purple transition-colors hover:bg-purple hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex flex-col bg-lavender-soft text-ink"
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <span className="flex items-center gap-2.5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-purple">
                  <Image
                    src={LOGO}
                    alt="Be The Good"
                    width={44}
                    height={44}
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <span className="font-serif text-lg font-medium tracking-tight text-purple">
                  Be The Good
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-purple/25 px-5 py-2 text-sm font-medium uppercase tracking-widest text-purple transition-colors hover:bg-purple hover:text-cream"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-1 px-6 md:px-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-4 font-serif text-4xl font-medium tracking-tight text-purple/70 transition-colors hover:text-purple md:text-6xl"
                >
                  <Sparkle className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 md:h-6 md:w-6" />
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-5 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openInvolve();
                  }}
                  className="rounded-full bg-purple px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-90"
                >
                  Get involved
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openInvolve("sponsor");
                  }}
                  className="rounded-full border border-purple/30 px-6 py-3 text-sm font-medium text-purple transition-colors hover:bg-purple/10"
                >
                  Sponsor the work
                </button>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-purple transition-opacity hover:opacity-70"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
