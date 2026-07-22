import { WHY_CAPSULES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";

export function WhyCapsules() {
  return (
    <section id="why" className="bg-ink px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-taupe">Why Capsules®?</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Want to learn more about the benefits of—Capsules®?
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20">
          {WHY_CAPSULES.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div
                className={`grid gap-8 md:grid-cols-2 md:items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                  <ImageOrPlaceholder
                    src={item.image}
                    alt={item.title}
                    label="Why Capsules®"
                  />
                </div>
                <div>
                  <p className="eyebrow text-taupe">Why Capsules®?</p>
                  <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-taupe">{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
