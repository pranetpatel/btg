import { REVIEWS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-6 rounded-3xl bg-espresso-deep p-8 md:w-[400px]">
      <p className="text-base text-cream">&ldquo;{review.quote}&rdquo;</p>
      <div>
        <p className="font-medium text-cream">{review.name}</p>
        <p className="text-sm text-taupe">({review.location})</p>
      </div>
    </div>
  );
}

export function Reviews() {
  const row = [...REVIEWS, ...REVIEWS];

  return (
    <section id="feedback" className="bg-ink py-28 text-cream md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-taupe">Feedback</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Do people like us?
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="flex w-max gap-6 animate-marquee">
          {row.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
