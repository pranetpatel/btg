import { STORIES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Sparkle } from "@/components/ui/Sparkle";

const KIND_STYLES: Record<string, string> = {
  "Kindness note": "bg-gold/25 text-purple",
  "Campus conversation": "bg-lavender text-purple",
  "Program moment": "bg-purple/10 text-purple/70",
};

function StoryCard({ story }: { story: (typeof STORIES)[number] }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-[1.75rem] bg-cream p-7 md:w-[380px]">
      <div>
        <p
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${KIND_STYLES[story.kind]}`}
        >
          <Sparkle className="h-3 w-3" />
          {story.kind}
        </p>
        <p className="mt-5 font-serif text-2xl font-medium leading-snug tracking-tight text-purple md:text-3xl">
          &ldquo;{story.body}&rdquo;
        </p>
      </div>
      <p className="text-sm text-ink/50">{story.meta}</p>
    </div>
  );
}

/** Version B stories: warm marquee of culture cards on a lavender-soft ground. */
export function StoriesV2() {
  const row = [...STORIES, ...STORIES];

  return (
    <section
      id="stories"
      className="overflow-hidden bg-lavender-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-1.5 text-purple">
            <Sparkle className="h-3.5 w-3.5" />
            Stories &amp; campus culture
          </p>
        </Reveal>
        <RevealText
          text={"Straight from\ncampus."}
          className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-tight text-purple md:text-6xl"
        />
      </div>

      <div className="mt-14 overflow-hidden">
        <div className="flex w-max gap-5 animate-marquee">
          {row.map((story, i) => (
            <StoryCard key={`${story.body}-${i}`} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
