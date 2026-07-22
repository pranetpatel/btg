import type { Metadata } from "next";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { HeroScroll } from "@/components/v2/sections/HeroScroll";
import { IntroV2 } from "@/components/v2/sections/IntroV2";
import { PillarsV2 } from "@/components/v2/sections/PillarsV2";
import { CampusV2 } from "@/components/v2/sections/CampusV2";
import { WhyV2 } from "@/components/v2/sections/WhyV2";
import { InvolvedV2 } from "@/components/v2/sections/InvolvedV2";
import { StoriesV2 } from "@/components/v2/sections/StoriesV2";
import { ClosingV2 } from "@/components/v2/sections/ClosingV2";

export const metadata: Metadata = {
  title: "Be The Good | Campus Warmth (Version B)",
  description:
    "Version B of the Be The Good site. A student-led nonprofit at Western University. Be The Good Care, community kits, and mentorship.",
};

export default function VersionB() {
  return (
    <div className="bg-cream">
      <HeaderV2 />
      <main>
        <HeroScroll />
        <IntroV2 />
        <PillarsV2 />
        <CampusV2 />
        <WhyV2 />
        <InvolvedV2 />
        <StoriesV2 />
        <ClosingV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
