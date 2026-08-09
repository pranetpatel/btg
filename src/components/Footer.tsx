import Image from "next/image";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOGO,
  NAV_LINKS,
  SPONSORS,
} from "@/lib/content";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  return (
    <footer data-nav-theme="light" className="bg-cream px-6 pb-10 pt-4 text-ink md:px-10">
      <div className="mx-auto max-w-6xl border-t border-purple/15 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src={LOGO}
                alt="Be The Good"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <p className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Be The Good
              </p>
            </div>
            <p className="mt-4 font-serif text-lg italic text-ink/70">
              Be the good.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple/25 px-5 py-2.5 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-cream"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70 md:justify-end">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-purple"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-purple/25 text-purple transition-colors hover:bg-purple hover:text-cream"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-purple/15 pt-8">
          <p className="eyebrow text-purple/60">Supported by</p>
          <div className="mt-4 flex flex-col gap-x-8 gap-y-4 md:flex-row md:flex-wrap md:items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-opacity hover:opacity-70"
                >
                  {sponsor.logo && (
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      width={96}
                      height={96}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                  )}
                  <span className="font-serif text-xl font-medium tracking-tight text-purple">
                    {sponsor.name}
                  </span>
                </a>
                <a
                  href={sponsor.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram ${sponsor.instagramHandle}`}
                  className="inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-purple"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {sponsor.instagramHandle}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-purple/15 pt-6 text-xs text-ink/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Be The Good · Western University</p>
          <p>Student-led nonprofit · London, Ontario</p>
        </div>
      </div>
    </footer>
  );
}
