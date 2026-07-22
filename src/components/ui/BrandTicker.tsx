import { Sparkle } from "./Sparkle";

/**
 * Repeating "BE THE GOOD ✦" marquee - the brand's ticker-border motif
 * (BRAND.md §5). Duplicated inline so the loop is seamless.
 */
export function BrandTicker({
  className = "",
  reverse = false,
  variant = "outline",
}: {
  className?: string;
  reverse?: boolean;
  variant?: "outline" | "solid";
}) {
  const items = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="flex items-center">
      <span
        className={`mx-6 text-4xl font-medium tracking-tight md:text-6xl ${
          variant === "outline" ? "font-serif italic" : "font-serif"
        }`}
      >
        Be the good
      </span>
      <Sparkle className="h-5 w-5 shrink-0 md:h-7 md:w-7" />
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}
