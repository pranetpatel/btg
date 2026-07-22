import { ACTIVITIES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "bg-taupe/20 text-taupe",
  Medium: "bg-taupe/30 text-cream",
  Hard: "bg-cream text-ink",
};

export function Activities() {
  return (
    <section id="activities" className="bg-espresso px-6 py-28 text-cream md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-taupe">Activities</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Ready for an adventure? Discover the desert activities
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-taupe">
            We want to make sure your stay is exciting and enjoyable.
            That&rsquo;s why we offer a variety of activities with different
            levels of engagement. Whether you seek thrills or tranquility,
            there&rsquo;s something for everyone to make your desert stay
            truly memorable.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-taupe/20 px-4 py-2 text-taupe">
              Easy — 3-5h duration
            </span>
            <span className="rounded-full bg-taupe/30 px-4 py-2 text-cream">
              Medium — 8-12h duration
            </span>
            <span className="rounded-full bg-cream px-4 py-2 text-ink">
              Hard — 24h duration
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {ACTIVITIES.map((activity, i) => (
            <Reveal key={activity.title} delay={0.1 * i}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-espresso-deep">
                <div className="relative h-64 w-full">
                  <ImageOrPlaceholder src={activity.image} alt={activity.title} />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${
                      DIFFICULTY_STYLES[activity.difficulty]
                    }`}
                  >
                    {activity.difficulty}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-medium tracking-tight">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-taupe">{activity.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
