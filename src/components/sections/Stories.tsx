import { STORIES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Sparkle } from "@/components/ui/Sparkle";

const KIND_STYLES: Record<string, string> = {
  "Kindness note": "text-gold",
  "Campus conversation": "text-lavender",
  "Program moment": "text-cream/60",
};

function StoryCard({ story }: { story: (typeof STORIES)[number] }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-3xl bg-purple-deep p-8 md:w-[380px]">
      <div>
        <p
          className={`eyebrow flex items-center gap-2 ${KIND_STYLES[story.kind]}`}
        >
          <Sparkle className="h-3 w-3" />
          {story.kind}
        </p>
        <p className="mt-5 font-serif text-2xl font-medium leading-snug tracking-tight text-cream md:text-3xl">
          &ldquo;{story.body}&rdquo;
        </p>
      </div>
      <p className="text-sm text-lavender">{story.meta}</p>
    </div>
  );
}

export function Stories() {
  const rowA = [...STORIES, ...STORIES];

  return (
    <section id="stories" className="overflow-hidden bg-ink py-28 text-cream md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-lavender">
            <Sparkle className="h-3.5 w-3.5" />
            Stories &amp; campus culture
          </p>
        </Reveal>
        <RevealText
          text={"Small kindness,\nout loud."}
          className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lavender">
            Real moments from our windshields, our street interviews, and our
            crews. Photo-led stories drop in here as we document the work —
            placeholders below are clearly marked.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="flex w-max gap-6 animate-marquee">
          {rowA.map((story, i) => (
            <StoryCard key={`${story.body}-${i}`} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
