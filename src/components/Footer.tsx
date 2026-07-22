import { NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-cream px-6 pb-10 pt-4 text-ink md:px-10">
      <div className="mx-auto max-w-6xl border-t border-ink/10 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-medium tracking-tight md:text-3xl">
              Capsules®
            </p>
            <p className="mt-3 max-w-sm text-espresso">
              Meet Capsules®—modern and cozy houses, in the California
              desert.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-espresso">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-espresso/60 md:flex-row md:items-center md:justify-between">
          <p>All rights reserved © {new Date().getFullYear()} Capsules®</p>
          <p>This website is using cookies.</p>
        </div>
      </div>
    </footer>
  );
}
