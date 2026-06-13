import Banner from "@/components/ui/Banner";
import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBrandsSection from "@/components/home/FeaturedBrandsSection";
import ChooseYourFeelingSection from "@/components/home/ChooseYourFeelingSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import EventsSection from "@/components/home/EventsSection";
import TrustSection from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalSection from "@/components/home/FinalSection";
import Reveal from "@/components/Reveal";

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
