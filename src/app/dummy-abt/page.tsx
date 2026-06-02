import JungleStorySequence from "@/components/about/JungleStorySequence";
import MetricsSection from "@/components/about/MetricsSection";

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col bg-[#fafaf7] text-[#182837]">
      <section className="flex h-screen items-center justify-center px-6 text-center">
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-bold leading-tight">
          About Us
        </h1>
      </section>

      <JungleStorySequence />

      {/* <MetricsSection /> */}
    </main>
  );
}
