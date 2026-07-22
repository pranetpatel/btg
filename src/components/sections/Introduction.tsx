import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Sparkle } from "@/components/ui/Sparkle";

export function Introduction() {
  return (
    <section id="about" className="bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-purple/70">
            <Sparkle className="h-3.5 w-3.5" />
            Who we are
          </p>
        </Reveal>

        <RevealText
          as="p"
          text={"We're Western students who believe\nkindness shouldn't stop at a caption."}
          className="mt-6 max-w-4xl font-serif text-3xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              Be The Good is a student-led nonprofit from Western University. We
              turn everyday kindness into real support — for caregivers, for
              people facing hardship in our community, and for students who need
              someone in their corner.
            </p>
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              We&rsquo;re not a glossy charity brand. We&rsquo;re campus-rooted,
              founder-led, and action-first: notes on windshields, kits for
              people without housing, mentorship for incoming students, and an
              app built to ease caregiver burnout.
            </p>
          </div>
        </Reveal>

        {/* Dual image mask reveals */}
        <div className="mt-16 grid gap-5 sm:grid-cols-5">
          <MaskReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:col-span-3">
            <ImageOrPlaceholder
              src={null}
              alt="Students packing kindness kits on campus"
              label="Campus moment"
              className="h-full w-full"
            />
          </MaskReveal>
          <MaskReveal
            delay={0.12}
            className="relative aspect-[4/5] w-full self-end overflow-hidden rounded-3xl sm:col-span-2"
          >
            <ImageOrPlaceholder
              src={null}
              alt="A handwritten kindness note"
              label="Kindness note"
              className="h-full w-full"
            />
          </MaskReveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 max-w-2xl border-l-2 border-gold pl-6">
            <p className="font-serif text-xl italic leading-snug text-ink md:text-2xl">
              &ldquo;Impact can be small and still count — smiles, notes, kits,
              mentors.&rdquo;
            </p>
            <p className="mt-3 text-sm text-ink/60">
              Founded by Arpi, Health Sciences — determined to bring out the
              best in herself and others.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="#pillars"
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            See what we do
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
