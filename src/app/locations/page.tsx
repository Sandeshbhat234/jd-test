import type { Metadata } from "next";
import LocationsExplorer from "@/components/locations/LocationsExplorer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Locations — JD's Jungle",
  description:
    "Find a JD's Jungle dispensary near you. Browse our locations and visit in store.",
};

export default function LocationsPage() {
  return (
    <main className="w-full overflow-x-clip bg-[#fffef8] text-[#1e1e1e]">
      <section className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(32px,5vw,56px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        <Reveal direction="up">
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] leading-tight text-[rgba(1,1,1,0.8)]">
            Find a JD&apos;s Jungle Dispensary Near You
          </h1>
        </Reveal>
        <Reveal direction="up">
          <LocationsExplorer />
        </Reveal>
      </section>
    </main>
  );
}
