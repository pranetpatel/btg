import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section id="introduction" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow text-espresso/60">Introduction</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-2xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
            Welcome to a world of wild California desert with Capsules®,
            where you will discover exquisite nature observing it from
            capsule houses, nestled in one of the most breathtaking
            destinations in the United States.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <p className="text-base text-espresso md:text-lg">
              A place where you can be with yourself and your loved ones.
            </p>
            <p className="text-base text-espresso md:text-lg">
              A place where you can experience unforgettable desert things.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#houses"
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Discover available Capsules®
          </a>
        </Reveal>
      </div>
    </section>
  );
}
