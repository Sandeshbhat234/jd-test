import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — JD's Jungle",
  description:
    "New York cannabis laws and your rights: who can purchase, possession limits, where to consume, and the rules every adult should understand.",
};

const HEADING =
  "font-serif text-[clamp(24px,2.2vw,32px)] leading-[1.3] text-black";
const BODY =
  "font-cy text-[clamp(14px,1.25vw,18px)] leading-[1.55] text-black/75";

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: "New York Cannabis Laws & Your Rights",
    body: "Cannabis has been legal for adult use in New York since 2021. The law gives adults meaningful freedom – and comes with clear rules worth understanding. Here is what you need to know.",
  },
  {
    title: "Who can purchase cannabis in New York?",
    body: "Any adult 21 years or older with a valid, government-issued photo ID. No medical card required. No New York residency needed. Visitors from other states and countries can purchase legally – as long as you meet the age requirement.",
  },
  {
    title: "What are the possession limits?",
    body: "Adults 21 and older may legally possess up to 3 ounces of cannabis flower and up to 24 grams of concentrate at any time. Possession between 2 and 4 ounces is a civil violation subject to fines. Possession over 4 ounces is a misdemeanor. Possession over 16 ounces becomes a felony offense.",
  },
  {
    title: "Where can I consume?",
    body: "In private spaces – or any public space where tobacco consumption is permitted. When in doubt, consume at home.",
  },
  {
    title: "Can I consume in a vehicle?",
    body: "No. Driving under the influence of cannabis is illegal – and treated similarly to drunk driving. Penalties include license suspension, fines, and jail time. Open cannabis is not permitted in any vehicle. Passengers cannot consume while in a vehicle. If you have consumed, do not drive.",
  },
  {
    title: "Can I give cannabis to a friend?",
    body: "Adults 21 and older may share cannabis with other adults – free of charge – within legal possession limits. Any exchange involving money, goods, or anything of value is illegal without a license.",
  },
  {
    title: "What about cannabis and minors?",
    body: "Providing cannabis to anyone under 21 is illegal – under any circumstances, even with parental consent. Keep all products in child-resistant, locked packaging – stored out of reach of children.",
  },
  {
    title: "What about cannabis and pets?",
    body: "Cannabis is toxic to dogs and cats. Even small amounts can make pets seriously ill. Store all products securely. If a pet ingests cannabis, contact a veterinarian immediately.",
  },
  {
    title: "Can I travel with cannabis?",
    body: "Within New York State, you may transport up to legal possession limits – in a sealed container. Transporting cannabis across state lines is a federal offense – this applies even when traveling into another state where cannabis is legal. Do not fly with cannabis.",
  },
  {
    title: "What is a licensed dispensary and why does it matter?",
    body: "A licensed dispensary is authorized by the New York Office of Cannabis Management to sell cannabis to the public. All products sold at licensed dispensaries must pass lab testing for potency, pesticides, and contaminants before reaching shelves. Purchasing from unlicensed sellers is illegal – and the products carry no safety guarantee. Unlicensed sale is a felony in New York.",
  },
  {
    title: "Does my employer have rights around cannabis use?",
    body: "Yes. New York law protects employees from discrimination based on off-duty cannabis use. However, employers retain the right to maintain drug-free workplace policies, restrict use during work hours, and conduct testing in safety-sensitive industries. Know your employer's policy.",
  },
  {
    title: "Where do these laws come from?",
    body: (
      <>
        New York&rsquo;s adult-use cannabis program was established by the
        Marijuana Regulation and Taxation Act (MRTA) – signed into law in March
        2021 – and is regulated by the New York Office of Cannabis Management
        (OCM). Laws and regulations continue to evolve.
        <br aria-hidden />
        <br aria-hidden />
        For the most current information, visit{" "}
        <a
          href="https://cannabis.ny.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-opacity hover:opacity-70">
          cannabis.ny.gov
        </a>
        .
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="w-full border-b border-black bg-[#fffff8] text-black">
      <div className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(40px,5vw,64px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        <Reveal direction="up">
          <h1 className="font-serif text-[clamp(34px,5.4vw,64px)] leading-[1.15] text-black">
            Privacy Policy
          </h1>
        </Reveal>

        <div className="flex flex-col gap-[clamp(24px,3vw,32px)]">
          {SECTIONS.map((section) => (
            <Reveal
              key={section.title}
              direction="up"
              className="flex flex-col gap-[clamp(6px,1vw,8px)]">
              <h2 className={HEADING}>{section.title}</h2>
              <p className={BODY}>{section.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
