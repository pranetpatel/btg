import Link from "next/link";

/**
 * Small A / B / C toggle so we can flip between the three design directions.
 * Uses currentColor so it reads on any header background (mix-blend, dark,
 * or light). Active side is full opacity; the others dim.
 */
const VERSIONS = [
  { id: "A", href: "/" },
  { id: "B", href: "/v2" },
  { id: "C", href: "/v3" },
] as const;

export function VersionSwitch({ current }: { current: "A" | "B" | "C" }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-current/40 px-3 py-1 text-xs font-medium tracking-wide">
      {VERSIONS.map((v, i) => (
        <span key={v.id} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="opacity-30">
              /
            </span>
          )}
          <Link
            href={v.href}
            aria-current={current === v.id ? "page" : undefined}
            className={
              current === v.id
                ? "opacity-100"
                : "opacity-45 transition-opacity hover:opacity-80"
            }
          >
            {v.id}
          </Link>
        </span>
      ))}
    </div>
  );
}
