import type { Metadata } from "next";
import WhatWeStandFor from "@/components/about/WhatWeStandFor";
import JungleLocations from "@/components/about/JungleLocations";
import TheLineup from "@/components/about/TheLineup";
import FinalCTA from "@/components/about/FinalCTA";
import AboutHero from "@/components/about/AboutHero";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";

export const metadata: Metadata = {
  title: "About Us — JD's Jungle",
  description:
    "Meet JD's Jungle: a New York cannabis dispensary built on transparency, expert curation and lab-tested quality. Learn what we stand for and where to find us.",
};

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col border-b border-black bg-[#FFFFF8] text-[#182837]">
      <AboutHero />

      <WhatMakesUsDifferent />

      <WhatWeStandFor />

      <JungleLocations />

      <TheLineup />

      <FinalCTA />
    </main>
  );
}
