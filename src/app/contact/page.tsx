import type { Metadata } from "next";
import { CONTACT_COPY, FAQ_GROUPS } from "@/data/contact";
import ContactPageForm from "@/components/contact/ContactPageForm";
import StoreImage from "@/components/contact/StoreImage";
import VisitUs from "@/components/contact/VisitUs";
import FaqAccordion from "@/components/contact/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact — JD's Jungle",
  description:
    "Questions about your order, a recommendation, or green guidance? Reach the JD's Jungle team.",
};

function SectionHeader({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
      <h2 className="flex-1 font-serif text-[clamp(30px,5vw,52px)] leading-tight text-[rgba(1,1,1,0.8)]">
        {heading}
      </h2>
      <p className="flex-1 font-cy text-[clamp(15px,1.4vw,20px)] leading-relaxed text-[#1e1e1e]/70">
        {subtitle}
      </p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="w-full bg-[#fffef8] text-[#1e1e1e]">
      <section className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(64px,9vw,128px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        {/* Contact form */}
        <div className="flex flex-col gap-[clamp(32px,4vw,48px)]">
          <SectionHeader
            heading={CONTACT_COPY.formHeading}
            subtitle={CONTACT_COPY.formSubtitle}
          />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ContactPageForm />
            <StoreImage className="order-first h-[clamp(280px,40vw,619px)] lg:order-none lg:h-auto" />
          </div>
        </div>

        {/* Visit us in store */}
        <div className="flex flex-col gap-[clamp(32px,4vw,48px)]">
          <SectionHeader
            heading={CONTACT_COPY.visitHeading}
            subtitle={CONTACT_COPY.visitSubtitle}
          />
          <VisitUs />
        </div>

        {/* FAQs */}
        <div className="flex flex-col items-center gap-[clamp(32px,4vw,48px)]">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-serif text-[clamp(34px,6vw,64px)] leading-tight text-[rgba(1,1,1,0.8)]">
              {CONTACT_COPY.faqHeading}
            </h2>
            <p className="font-cy text-[clamp(15px,1.4vw,20px)] leading-relaxed text-[#1e1e1e]/70">
              {CONTACT_COPY.faqSubtitle}
            </p>
          </div>
          <div className="w-full max-w-[1057px]">
            <FaqAccordion groups={FAQ_GROUPS} />
          </div>
        </div>
      </section>
    </main>
  );
}
