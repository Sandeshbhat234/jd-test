import AboutHero from "@/components/about/AboutHero";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";
import WhatWeStandFor from "@/components/about/WhatWeStandFor";
import JungleStorySequence from "@/components/about/JungleStorySequence";

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col bg-white text-[#182837]">
      <AboutHero />

      <WhatMakesUsDifferent />

      <WhatWeStandFor />

      <JungleStorySequence />
    </main>
  );
}
