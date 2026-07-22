import Image from "next/image";
import { Sparkle } from "./Sparkle";

export function ImageOrPlaceholder({
  src,
  alt,
  label,
  className,
}: {
  src: string | null;
  alt: string;
  label?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple via-purple-deep to-ink ${className ?? ""}`}
      >
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,theme(colors.lavender)_0%,transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,theme(colors.lavender)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.lavender)_1px,transparent_1px)] [background-size:28px_28px]" />
        <Sparkle className="absolute right-5 top-5 h-4 w-4" twinkle />
        {label && (
          <span className="eyebrow relative z-10 flex items-center gap-2 text-cream/75">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className ?? ""}`}
    />
  );
}
