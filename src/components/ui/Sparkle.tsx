/**
 * Four-point gold sparkle — a core brand motif (BRAND.md §5).
 * Pure SVG so it inherits color via `text-*` / `fill-current`.
 */
export function Sparkle({
  className = "h-5 w-5",
  twinkle = false,
}: {
  className?: string;
  twinkle?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} ${twinkle ? "animate-twinkle" : ""} text-gold`}
    >
      <path
        fill="currentColor"
        d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z"
      />
    </svg>
  );
}
