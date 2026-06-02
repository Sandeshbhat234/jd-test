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

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <Hero />
      <Banner message="10% OFF FIRST ORDER • CODE: NYCFIRST • VALID TILL MAY 15TH" />
      <CategoriesSection />
      <FeaturedBrandsSection />
      <ChooseYourFeelingSection />
      <BestSellersSection />
      <EventsSection />
      <TrustSection />
      <TestimonialsSection />
      <FinalSection />
    </main>
  );
}
