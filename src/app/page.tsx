import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Houses } from "@/components/sections/Houses";
import { Location } from "@/components/sections/Location";
import { WhyCapsules } from "@/components/sections/WhyCapsules";
import { Activities } from "@/components/sections/Activities";
import { Reviews } from "@/components/sections/Reviews";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Houses />
        <Location />
        <WhyCapsules />
        <Activities />
        <Reviews />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
