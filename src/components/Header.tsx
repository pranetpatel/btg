"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGO, NAV_LINKS } from "@/lib/content";
import { useInvolve } from "@/lib/involve-context";
import { Sparkle } from "@/components/ui/Sparkle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement>(null);
  const { openInvolve } = useInvolve();

  // Pick text/logo color from the background directly under the header, so the
  // nav never color-shifts (mix-blend-difference used to turn cream → green
  // over the purple sections).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const probeY = (headerRef.current?.offsetHeight ?? 72) + 8;
      const el = document.elementFromPoint(window.innerWidth / 2, probeY);
      const themed = el?.closest<HTMLElement>("[data-nav-theme]");
      const theme = themed?.dataset.navTheme;
      if (theme === "light" || theme === "dark") setNavTheme(theme);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-10 md:py-5 ${
          navTheme === "dark" ? "text-cream" : "text-ink"
        }`}
      >
        <a href="#home" className="flex items-center gap-3">
          <Image
            src={LOGO}
            alt="Be The Good"
            width={48}
            height={48}
            className={`h-11 w-11 object-contain transition-[filter] duration-300 md:h-12 md:w-12 ${
              navTheme === "light" ? "brightness-0" : ""
            }`}
            priority
          />
          <span className="font-serif text-lg font-medium tracking-tight">
            Be The Good
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => openInvolve("sponsor")}
            className="hidden items-center text-sm font-medium underline-offset-4 transition-opacity hover:opacity-70 md:inline-flex"
          >
            Sponsor
          </button>
          <button
            type="button"
            onClick={() => openInvolve()}
            className="hidden items-center rounded-full border border-current px-5 py-2 text-sm font-medium transition-opacity hover:opacity-70 md:inline-flex"
          >
            Get involved
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
            className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col bg-purple text-cream"
          >
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
              <span className="flex items-center gap-3">
                <Image
                  src={LOGO}
                  alt="Be The Good"
                  width={48}
                  height={48}
                  className="h-11 w-11 object-contain"
                />
                <span className="font-serif text-lg font-medium tracking-tight">
                  Be The Good
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-widest"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-6 md:px-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl font-medium tracking-tight text-cream/70 transition-colors hover:text-cream md:text-6xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-6 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openInvolve();
                  }}
                  className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-purple transition-opacity hover:opacity-90"
                >
                  Get involved
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openInvolve("sponsor");
                  }}
                  className="rounded-full border border-cream/40 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Sponsor the work
                </button>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
              >
                <Sparkle className="h-4 w-4" />
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
