import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Pillars } from "@/components/sections/Pillars";
import { Campus } from "@/components/sections/Campus";
import { Why } from "@/components/sections/Why";
import { Involved } from "@/components/sections/Involved";
import { Stories } from "@/components/sections/Stories";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { BrandTicker } from "@/components/ui/BrandTicker";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandTicker className="bg-purple py-5 text-cream" />
        <Introduction />
        <Pillars />
        <Campus />
        <Why />
        <Involved />
        <Stories />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
