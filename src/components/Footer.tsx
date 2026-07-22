import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-cream px-6 pb-10 pt-4 text-ink md:px-10">
      <div className="mx-auto max-w-6xl border-t border-purple/15 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/logoblack.png"
                alt="Be The Good"
                width={48}
                height={48}
                className="h-11 w-11 object-contain"
              />
              <p className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                Be The Good
              </p>
            </div>
            <p className="mt-4 text-ink/70">
              Student-led good, made practical — on campus and beyond. A
              nonprofit from Western University.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple/25 px-5 py-2.5 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-cream"
            >
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
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
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-purple/15 pt-6 text-xs text-ink/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Be The Good · Western University</p>
          <p>Student-led nonprofit · London, Ontario</p>
        </div>
      </div>
    </footer>
  );
}
