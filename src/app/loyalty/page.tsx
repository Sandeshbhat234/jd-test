import type { Metadata } from "next";
import JungleRewardsCard from "@/components/loyalty/JungleRewardsCard";
import ReadyToEarn from "@/components/loyalty/ReadyToEarn";

export const metadata: Metadata = {
  title: "Loyalty Program — JD's Jungle",
  description:
    "Earn simply, redeem easily and feel valued every time you shop with JD's Jungle Rewards.",
};

const STEPS = [
  { title: "Join", body: "Free. Takes 10 seconds." },
  { title: "Earn", body: "1 point for every $1 you spend." },
  { title: "Redeem", body: "Points turn into discounts or free products." },
  { title: "Keep", body: "Points never expire as long as you shop with us." },
];

const TIERS = [
  "100 points → $5 off",
  "250 points → $15 off",
  "500 points → 10% off entire order",
  "1,000 points → Free product (up to $50 value)",
];

const PERKS = [
  "Early access to new product drops",
  "Invites to private events",
  "Exclusive member-only pricing",
];

function CheckIcon() {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[rgba(2,18,52,0.1)] text-[#021234]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="size-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.5 12.2l2.4 2.4 4.6-4.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[clamp(22px,3vw,34px)] leading-[1.25] text-black">
      {children}
    </h2>
  );
}

export default function LoyaltyPage() {
  return (
    <main className="w-full bg-[#fffef8] text-black">
      <section className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(40px,6vw,64px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        {/* Intro */}
        <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
          <h1 className="font-serif text-[clamp(30px,5vw,48px)] leading-tight text-[rgba(1,1,1,0.8)]">
            Loyalty Program
          </h1>
          <p className="max-w-[900px] font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.6] text-black/75">
            We started JD&apos;s Jungle because we believe loyalty should be
            rewarded – not ignored. But we noticed something – most dispensary
            loyalty programs feel complicated or forgettable. So we created our
            own. A program worth joining. A way to earn simply, redeem easily,
            and feel valued every time you shop. That&apos;s the Jungle Rewards
            program. Simple. Honest. Yours.
          </p>
        </div>

        {/* Body: left content + rewards card */}
        <div className="flex flex-col gap-[clamp(48px,6vw,64px)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,711px)] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-[clamp(48px,6vw,64px)]">
            {/* How It Works */}
            <div className="flex flex-col gap-6">
              <SectionHeading>How It Works</SectionHeading>
              <ol className="flex flex-col gap-4 font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.6]">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex flex-col gap-2">
                    <span className="font-medium">
                      {i + 1}. {step.title}
                    </span>
                    <span>{step.body}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Reward Tiers */}
            <div className="flex flex-col gap-6">
              <SectionHeading>Reward Tiers</SectionHeading>
              <ul className="flex flex-col font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.6]">
                {TIERS.map((tier, i) => (
                  <li
                    key={tier}
                    className={
                      i === 0
                        ? "pb-6"
                        : "border-t border-black/15 py-6 last:pb-0"
                    }>
                    {tier}
                  </li>
                ))}
              </ul>
            </div>

            {/* Member Perks */}
            <div className="flex flex-col gap-6">
              <SectionHeading>Member Perks</SectionHeading>
              <ul className="flex flex-col gap-4 font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.6]">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="font-medium">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.6]">
              Points never expire as long as you shop with us. Valid online and
              in-store at JD&apos;s Jungle Manhattan location.
            </p>
          </div>

          <div className="lg:pt-16">
            <JungleRewardsCard />
          </div>
        </div>

        <ReadyToEarn />
      </section>
    </main>
  );
}
