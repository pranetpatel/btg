import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroScroll } from "@/components/sections/HeroScroll";
import { Introduction } from "@/components/sections/Introduction";
import { Campus } from "@/components/sections/Campus";
import { Involved } from "@/components/sections/Involved";
import { Stories } from "@/components/sections/Stories";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroScroll />
        <Introduction />
        <Campus />
        <Involved />
        <Stories />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
