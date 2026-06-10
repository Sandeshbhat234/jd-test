import WhatWeStandFor from "@/components/about/WhatWeStandFor";
import JungleStorySequence from "@/components/about/JungleStorySequence";
import JungleLocations from "@/components/about/JungleLocations";
import TheLineup from "@/components/about/TheLineup";
import FinalCTA from "@/components/about/FinalCTA";
import AboutHero from "@/components/about/AboutHero";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col bg-white text-[#182837]">
      <AboutHero />

      <WhatMakesUsDifferent />

      <WhatWeStandFor />

      <JungleStorySequence />

      <JungleLocations />

      <TheLineup />

      <FinalCTA />
    </main>
  );
}
