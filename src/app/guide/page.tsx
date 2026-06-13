import type { Metadata } from "next";
import ScrollScaleImage from "@/components/guide/ScrollScaleImage";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Beginner's Guide — JD's Jungle",
  description:
    "Navigate the highs with confidence. A straightforward blueprint to cannabinoids, product formats, dosing and your first visit to JD's Jungle.",
};

// Assets live in /public/Beginner_s Guide (spaces and & are URL-encoded).
const IMG = {
  leaves: "/Beginner_s%20Guide/01)%20Indica,%20Sativa,%20Hybrid.webp",
  cannabis: "/Beginner_s%20Guide/02)%20Cannabis.webp",
  retail: "/Beginner_s%20Guide/03)%20Retail%20Destination%20%26%20Rules.webp",
  safe: "/Beginner_s%20Guide/04)%20Safe%20Execution%20%26%20Common%20Mistakes.webp",
};

const BODY =
  "font-cy text-[clamp(15px,1.4vw,20px)] leading-[1.6] tracking-[0.01em] text-[#1e1e1e]";

type RichItem = { lead: string; body: string };

const THC_CBD: RichItem[] = [
  {
    lead: "THC:",
    body: 'The intoxicating compound responsible for the classic cannabis "high," euphoria, and muscle relaxation.',
  },
  {
    lead: "CBD:",
    body: "The non-intoxicating compound used to quiet mental chatter, ground the nervous system, and relieve physical tension.",
  },
  {
    lead: "The Beginner Profile:",
    body: "Look for a balanced 1:1 ratio (equal parts THC and CBD). CBD acts as a natural buffer, ensuring a smooth and predictable first experience.",
  },
];

const STRAINS: RichItem[] = [
  {
    lead: "Indica:",
    body: "Grounding and deeply relaxing. Best for nighttime use, deep sleep, and unwinding after a high-stress day.",
  },
  {
    lead: "Sativa:",
    body: "Uplifting, mental clarity, and cerebral energy. Best for daytime focus, creative projects, and socializing.",
  },
  {
    lead: "Hybrid:",
    body: "A curated middle-ground. Hybrids perfectly blend the traits of both Indica and Sativa, offering a balanced state of mind that works well at any hour.",
  },
];

const PRODUCTS = [
  {
    title: "Flower",
    body: "Raw, dried cannabis buds smoked in traditional joints, pipes, or bongs. Pure and classic, it lets you experience the plant's full profile.",
  },
  {
    title: "Pre-Rolls",
    body: "Ready-to-smoke joints expertly rolled for your convenience. Zero preparation required—this is a straightforward, classic option that is entirely ready to enjoy.",
  },
  {
    title: "Vapes",
    body: "Discreet cartridges filled with cannabis oil that attach easily to a battery device. A popular, clean, and entirely smoke-free product format.",
  },
  {
    title: "Edibles",
    body: "Infused foods, chocolates, or drinks. Highly convenient, flavorful, and discreet, delivering a powerful, prolonged experience for your body and mind.",
  },
  {
    title: "Tinctures",
    body: "Liquid cannabis extracts applied as drops directly under the tongue. Exceptional for rapid absorption, clean consumption, and easy, precise dosing control.",
  },
  {
    title: "Topicals",
    body: "Infused creams, balms, or lotions applied directly to the skin. Targets localized physical soreness or inflammation and never gets you high.",
  },
  {
    title: "Concentrates",
    body: "Highly potent extracts like wax or shatter consumed using special vaporizers. Strictly avoid these as a beginner due to their intensity.",
  },
  {
    title: "Accessories",
    body: "Functional lifestyle assets from precise metal grinders to aesthetic storage options. Everything you need to cleanly elevate your everyday ritual.",
  },
];

const NY_LAW: RichItem[] = [
  {
    lead: "The Age Gate:",
    body: "You must be 21 years or older to enter or purchase recreational cannabis.",
  },
  {
    lead: "The Verification:",
    body: "You must present a physical, valid government-issued photo ID (driver's license from any state, US passport, or military ID) every single visit. Digital copies or phone photos are legally rejected. New York residency is not required.",
  },
  {
    lead: "The Purchase Cap:",
    body: "You can legally buy up to 3 ounces of flower or 24 grams of concentrate per transaction.",
  },
  {
    lead: "The Payment:",
    body: "Most licensed dispensaries accept cash, debit cards, or credit cards (sometimes with small processing fees). ATMs are always accessible inside our showroom for convenience.",
  },
];

const WALKTHROUGH: RichItem[] = [
  {
    lead: "The Check-In:",
    body: "A security officer verifies and scans your physical ID in a secure outer lobby before letting you onto the main floor.",
  },
  {
    lead: "The Showroom:",
    body: "Browse available inventory safely on digital menus and counter tablets. All products are kept securely stored behind glass or in the vault.",
  },
  {
    lead: "The Consultation:",
    body: 'Tell your budtender directly what you want: your experience level, your format preference (like "no smoking"), and exactly how you want to feel.',
  },
  {
    lead: "The Fulfillment:",
    body: "Your products are brought out fresh from the vault and legally sealed inside an opaque, child-resistant exit bag.",
  },
  {
    lead: "The Departure:",
    body: "Pay cash at the register. Keep your bag entirely closed until you are home—consuming cannabis in public or near the store is strictly illegal.",
  },
];

const MISTAKES: RichItem[] = [
  {
    lead: "Start Low and Go Slow:",
    body: "Stick to a mild 10–15% THC range for flower, and wait a full 2 hours after an edible before considering a second dose.",
  },
  {
    lead: "Shop Exclusively Licensed:",
    body: "Only buy from state-licensed dispensaries to ensure your products are fully tested, safe, and accurately labeled.",
  },
  {
    lead: "Mind Your Surroundings:",
    body: "Consume in a comfortable, familiar environment. Avoid loud or chaotic settings that can easily trigger restlessness.",
  },
  {
    lead: "Know Where to Consume:",
    body: "Keep your purchase entirely sealed until you are home. Consuming in motor vehicles, public parks, or near the dispensary is illegal.",
  },
];

function RichList({ items }: { items: RichItem[] }) {
  return (
    <ul className={`flex list-disc flex-col gap-2 pl-[1.4em] ${BODY}`}>
      {items.map((item) => (
        <li key={item.lead}>
          <span className="font-cy font-medium">{item.lead} </span>
          {item.body}
        </li>
      ))}
    </ul>
  );
}

function SubSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[clamp(12px,1.4vw,20px)]">
      <h3 className="font-serif text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-[#1e1e1e]">
        {title}
      </h3>
      {intro ? <p className={BODY}>{intro}</p> : null}
      {children}
    </div>
  );
}

function SectionHeader({
  index,
  title,
  intro,
  img,
  imgAlt,
  aspect,
  priority,
}: {
  index: string;
  title: string;
  intro: string;
  img: string;
  imgAlt: string;
  aspect: string;
  priority?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[clamp(24px,3vw,48px)] lg:flex-row lg:items-center lg:gap-12">
      <Reveal
        direction="left"
        className="flex flex-1 flex-col gap-[clamp(16px,2vw,24px)]">
        <span className="font-serif text-[clamp(30px,3.6vw,48px)] leading-none text-black">
          {index}
        </span>
        <div className="flex flex-col gap-[clamp(8px,1vw,12px)]">
          <h2 className="font-serif text-[clamp(28px,3.6vw,48px)] leading-[1.18] text-black">
            {title}
          </h2>
          <p className={BODY}>{intro}</p>
        </div>
      </Reveal>
      <ScrollScaleImage
        src={img}
        alt={imgAlt}
        aspect={aspect}
        priority={priority}
      />
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-black/15" />;
}

export default function BeginnersGuidePage() {
  return (
    <main className="w-full overflow-x-clip bg-[#fffef8] text-[#1e1e1e]">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-[clamp(48px,7vw,96px)] px-[clamp(24px,5vw,96px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        {/* Hero */}
        <Reveal
          direction="up"
          className="flex flex-col gap-[clamp(28px,4vw,56px)] py-[clamp(8px,2vw,40px)]">
          <h1 className="max-w-[20ch] font-serif text-[clamp(34px,5.4vw,64px)] leading-[1.18] text-[#1e1e1e]">
            The Beginner&rsquo;s Guide to Navigate the Highs
          </h1>
          <p className={`${BODY} lg:max-w-[778px] lg:self-end`}>
            At JD&rsquo;s Jungle, we replace confusion with complete
            transparency. You don&rsquo;t need to be an expert to find the right
            product—you just need a clear starting point. This handbook strips
            away the industry jargon to break down the essentials of
            cannabinoids, product formats, and dosing. Consider it your
            straightforward blueprint for a confident first visit.
          </p>
        </Reveal>

        {/* (01) Understanding the Plant Baseline */}
        <section className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <SectionHeader
            index="(01)"
            title="Understanding the Plant Baseline"
            intro="Before choosing your products, it helps to understand how cannabis works. Your entire experience is shaped by how the plant's natural compounds interact with your body."
            img={IMG.leaves}
            imgAlt="Sativa, Indica and Hybrid cannabis leaves side by side"
            aspect="aspect-[943/480]"
            priority
          />
          <Reveal
            direction="up"
            className="flex flex-col gap-[clamp(20px,2.6vw,32px)]">
            <SubSection
              title="THC vs. CBD: The Two Core Elements"
              intro="Cannabis contains hundreds of natural compounds called cannabinoids. However, you only need to know these two to find your balance:">
              <RichList items={THC_CBD} />
            </SubSection>
            <SubSection
              title="Indica, Sativa, and Hybrid: Choose Your Tooling"
              intro="On our menu, you will see products categorized by their functional mood profiles rather than just botanical names:">
              <RichList items={STRAINS} />
            </SubSection>
          </Reveal>
        </section>

        <Divider />

        {/* (02) The Product Menu */}
        <section className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <SectionHeader
            index="(02)"
            title="The Product Menu"
            intro="You don't need a lighter to enjoy cannabis anymore. Modern form factors are clean, precise, and completely smoke-free if you prefer."
            img={IMG.cannabis}
            imgAlt="Hands holding a fresh cannabis bud"
            aspect="aspect-[625/320]"
          />
          <Reveal
            direction="up"
            className="flex flex-col gap-[clamp(16px,2vw,24px)]">
            {PRODUCTS.map((product) => (
              <div key={product.title} className="flex flex-col gap-1">
                <h3 className="font-serif text-[clamp(22px,2.6vw,36px)] leading-[1.35] text-[#1e1e1e]">
                  {product.title}
                </h3>
                <p className={BODY}>{product.body}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <Divider />

        {/* (03) The Retail Destination & Rules */}
        <section className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <SectionHeader
            index="(03)"
            title="The Retail Destination & Rules"
            intro="A licensed New York dispensary operates under strict regulatory guidelines to ensure every product on the shelf is safe, thoroughly clean, and accurately labelled."
            img={IMG.retail}
            imgAlt="Cannabis plant beside a judge's gavel"
            aspect="aspect-[573/320]"
          />
          <Reveal
            direction="up"
            className="flex flex-col gap-[clamp(20px,2.6vw,32px)]">
            <SubSection title="New York Law & Logistics">
              <RichList items={NY_LAW} />
            </SubSection>
            <SubSection title="Step-by-Step In-Store Walkthrough">
              <RichList items={WALKTHROUGH} />
            </SubSection>
          </Reveal>
        </section>

        <Divider />

        {/* (04) Safe Execution & Common Mistakes */}
        <section className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <SectionHeader
            index="(04)"
            title="Safe Execution & Common Mistakes"
            intro="Putting it all together comes down to a few simple habits. Avoid the most common first-timer pitfalls and keep every session deliberate and comfortable."
            img={IMG.safe}
            imgAlt="A person vaping outdoors with a restricted sign overlay"
            aspect="aspect-[573/320]"
          />
          <Reveal
            direction="up"
            className="flex flex-col gap-[clamp(20px,2.6vw,32px)]">
            <SubSection title="Overcoming First-Timer Mistakes">
              <RichList items={MISTAKES} />
            </SubSection>
            <SubSection title="The Golden Rule of Dosing">
              <p className={BODY}>
                The primary safety net for a deliberate, premium experience is
                simple:{" "}
                <span className="font-cy font-medium">
                  Start low, and go slow.
                </span>{" "}
                You can always add to your experience later, but you cannot
                subtract a dose once consumed.
              </p>
            </SubSection>
          </Reveal>
        </section>

        {/* Curious to know more — CTA */}
        <Reveal
          direction="up"
          className="flex flex-col items-center gap-[clamp(24px,3vw,36px)] rounded-2xl border border-black/40 p-[clamp(32px,5vw,60px)] text-center text-white shadow-[0px_1px_3.8px_rgba(0,0,0,0.25)]"
          style={{
            backgroundImage:
              "linear-gradient(184deg, #160581 0%, #04103f 68%, #011f45 135%)",
          }}>
          <div className="flex flex-col gap-[clamp(8px,1.4vw,16px)]">
            <h2 className="font-serif text-[clamp(28px,4vw,48px)] leading-[1.25]">
              Curious to know more?
            </h2>
            <p className="font-cy text-[clamp(15px,2vw,26px)] leading-[1.5] text-white/90">
              Skip the guesswork on your first visit and dive into the in-depth
              guide.
            </p>
          </div>
          <Button href="/blogs" variant="secondary">
            Read More
          </Button>
        </Reveal>
      </div>
    </main>
  );
}
