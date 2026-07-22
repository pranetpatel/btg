"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

/**
 * A / B / C toggle between the three design directions.
 * Desktop: large pill with roomy tap targets.
 * Mobile: hamburger that opens the same three links (easier than tiny letters).
 */
const VERSIONS = [
  { id: "A", href: "/", label: "Version A" },
  { id: "B", href: "/v2", label: "Version B" },
  { id: "C", href: "/v3", label: "Version C" },
] as const;

const shell =
  "rounded-full border border-current/35 bg-ink/80 text-cream shadow-[0_12px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md";

export function VersionSwitch({ current }: { current: "A" | "B" | "C" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-50">
      {/* Desktop / tablet: big A / B / C pill */}
      <nav
        aria-label="Site versions"
        className={`hidden items-center gap-0.5 px-1.5 py-1 text-sm font-semibold tracking-wide sm:inline-flex md:gap-1 md:px-2 md:py-1.5 md:text-base ${shell}`}
      >
        {VERSIONS.map((v, i) => (
          <span key={v.id} className="inline-flex items-center gap-0.5 md:gap-1">
            {i > 0 && (
              <span aria-hidden className="px-0.5 text-cream/35">
                /
              </span>
            )}
            <Link
              href={v.href}
              aria-current={current === v.id ? "page" : undefined}
              aria-label={v.label}
              className={
                "grid min-h-11 min-w-11 place-items-center rounded-full transition-colors " +
                (current === v.id
                  ? "bg-cream/15 text-cream"
                  : "text-cream/55 hover:bg-cream/10 hover:text-cream")
              }
            >
              {v.id}
            </Link>
          </span>
        ))}
      </nav>

      {/* Mobile: hamburger → A / B / C menu */}
      <div className="sm:hidden">
        <button
          type="button"
          aria-label={open ? "Close version menu" : "Open version menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
          className={`grid h-12 w-12 place-items-center ${shell}`}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {open && (
          <nav
            id={menuId}
            aria-label="Site versions"
            className="absolute right-0 top-[calc(100%+0.5rem)] flex min-w-[11rem] flex-col overflow-hidden rounded-2xl border border-cream/20 bg-ink/95 text-cream shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-md"
          >
            {VERSIONS.map((v) => (
              <Link
                key={v.id}
                href={v.href}
                aria-current={current === v.id ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={
                  "flex min-h-12 items-center justify-between gap-4 px-4 text-base font-semibold tracking-wide transition-colors " +
                  (current === v.id
                    ? "bg-cream/15 text-cream"
                    : "text-cream/70 hover:bg-cream/10 hover:text-cream")
                }
              >
                <span>{v.label}</span>
                <span className="tabular-nums opacity-80">{v.id}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
