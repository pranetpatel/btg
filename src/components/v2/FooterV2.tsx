import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGO, NAV_LINKS } from "@/lib/content";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Sparkle } from "@/components/ui/Sparkle";

/** Version B footer: lavender panel, rounded, IG-forward. */
export function FooterV2() {
  return (
    <footer className="bg-lavender-soft px-4 pb-8 pt-4 text-ink md:px-6">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-purple px-6 py-14 text-cream md:px-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-cream/10">
                <Image
                  src={LOGO}
                  alt="Be The Good"
                  width={48}
                  height={48}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <p className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Be The Good
              </p>
            </div>
            <p className="mt-4 font-script text-3xl text-gold">Be the good.</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-purple transition-opacity hover:opacity-90"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70 md:justify-end">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream hover:text-purple"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2">
            <Sparkle className="h-3 w-3" />© {new Date().getFullYear()} Be The
            Good · Western University
          </p>
          <p>Student-led nonprofit · London, Ontario</p>
        </div>
      </div>
    </footer>
  );
}
