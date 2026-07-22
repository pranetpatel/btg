import Image from "next/image";

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
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-taupe/40 via-espresso to-espresso-deep ${className ?? ""}`}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,theme(colors.taupe)_0%,transparent_45%)]" />
        {label && (
          <span className="eyebrow relative text-cream/70">{label}</span>
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
