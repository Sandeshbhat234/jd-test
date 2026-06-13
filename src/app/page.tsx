import type { Metadata } from "next";
import Banner from "@/components/ui/Banner";
import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBrandsSection from "@/components/home/FeaturedBrandsSection";
import ChooseYourFeelingSection from "@/components/home/ChooseYourFeelingSection";
// import BestSellersSection from "@/components/home/BestSellersSection"; // section currently disabled below
import EventsSection from "@/components/home/EventsSection";
import TrustSection from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalSection from "@/components/home/FinalSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "JD's Jungle — Premium Cannabis in New York",
  description:
    "Navigate the highs with JD's Jungle. Premium, lab-tested cannabis — flower, pre-rolls, vapes and edibles — from a licensed New York dispensary.",
};

export default function Home() {
  return (
    <main className="flex w-full flex-col overflow-x-clip">
      <Hero />
      <Banner message="10% OFF FIRST ORDER • CODE: NYCFIRST • VALID TILL MAY 15TH" />
      <Reveal direction="up">
        <CategoriesSection />
      </Reveal>
      <Reveal direction="up">
        <FeaturedBrandsSection />
      </Reveal>
      <Reveal direction="up">
        <ChooseYourFeelingSection />
      </Reveal>
      {/* <Reveal direction="up">
        <BestSellersSection />
      </Reveal> */}
      <Reveal direction="up">
        <EventsSection />
      </Reveal>
      <Reveal direction="up">
        <TrustSection />
      </Reveal>
      <Reveal direction="up">
        <TestimonialsSection />
      </Reveal>
      <Reveal direction="up">
        <FinalSection />
      </Reveal>
    </main>
  );
}
